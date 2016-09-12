/**
 * A set of functions and methods to take the meter data, perform calculations,
 * and create data arrays that are ready to chart.
 */


define([], function (app) {
        'use strict';

// will make further calls to make sure the Google module is loaded, and to call the next steps (drawGoogleChart)
//
        function GraphData() {
            var googleChartsLoaded = false;
            var gd = {

                // after an array is prepared, make sure google charts is loaded and draw it.
                loadAndDrawGoogleChart: function ($chartArray, elemid, legend, cumulative) {
                    cumulative = cumulative || false;

                    if (googleChartsLoaded == false) {
                        google.charts.load('current', {'packages': ['corechart']});
                        google.charts.setOnLoadCallback(function () {
                            drawGoogleChart($chartArray, elemid, legend, cumulative);
                            googleChartsLoaded = true;
                        })
                    } else {
                        drawGoogleChart($chartArray, elemid, legend, cumulative);
                    }
                },

                // prepares an array of billing trend data for every meter
                // pulls data from account summary, and not from meter data, so the initial view loads quickly
                // loads usage data for all devices in the account
                prepareBillingTrendForAllMeters: function ($trendData) {

                    // our data arrives as a combination of 0 (number) and "23.45" (string)
                    // we need to clean it, to be all numbers, when building this array.
                    // we also need to add the labels to the beginning of each row.
                    // enumeration is important, so for-in can't be used (order isn't guaranteed)

                    // google charts are grouped by row.  Our rows are by year.  We want it to be grouped by month.
                    // we need to flip the table (╯°□°）╯︵ ┻━┻


                    var chartArray = new Array($trendData.labels.length + 1);
                    for (var i = 0; i < chartArray.length; i++) {
                        chartArray[i] = new Array($trendData.series.length + 1);
                    }
                    chartArray[0][0] = "Month";

                    var series = $trendData.series.sort(function (a, b) {
                        return a.label - b.label
                    });

                    for (i = 0; i < series.length; i++) {
                        // a row has all the values for a year.
                        var row = series[i].data;
                        chartArray[0][i + 1] = series[i].label;
                        for (var j = 0; j < row.length; j++) {
                            chartArray[j + 1][0] = $trendData.labels[j];
                            chartArray[j + 1][i + 1] = parseFloat(row[j]);
                        }
                    }

                    return chartArray;
                },


                // create a pie chart for this month's usage, a slice for each meter
                drawUsageChart: function ($chartArray) {
                    var options = {
                        title: 'Usage (kWh)',
                        //legend: {position: 'bottom'},
                        is3D: true,
                        legend: 'none',
                        pieSliceText: 'label',
                        // bondi blue, naples yellow, jelly bean, palm leaf, dark coral, cyber grape
                        colors: ['#0093B4', '#f9dc5c', '#db504a', '#799D4B', '#cf5c36', '#684b7f', '#FF7F00', '#1200c3'],
                        animation: {
                            startup: true,
                            easing: "in",
                            duration: 500
                        }
                    };

                    var chart = new google.visualization.PieChart(document.getElementById('usage_chart_div'));
                    chart.draw($chartArray, options);
                },
                drawDemandChart: function ($chartArray) {
                    var options = {
                        title: 'Demand + Cost pre square foot',
                        vAxis: {title: 'kW'},
                        seriesType: 'bars',
                        legend: {position: 'bottom'},
                        colors: ['#66c2d9', '#005b85'],
                        series: {
                            1: {
                                type: 'line',
                                targetAxisIndex: 1
                            }
                        },
                        vAxes: {
                            1: {
                                title: 'Cost / sq. ft.',
                                textStyle: {color: '#005b85'}
                            }
                        },
                        animation: {
                            startup: true,
                            easing: "in",
                            duration: 500
                        }
                    };

                    var chart = new google.visualization.ComboChart(document.getElementById('demand_chart_div'));
                    chart.draw($chartArray, options);
                }


            };

            return gd;

            // All google-sepecific things are here.
            // Called from loadAndDrawGoogleChart so that Google is loaded properly.
            function drawGoogleChart($chartArray, elemid, legend, cumulative) {
                cumulative = cumulative || false;

                try {
                    var data = google.visualization.arrayToDataTable($chartArray);
                } catch (err) {
                    console.log("google.visualization error: " + err.message);
                }

                var options = {
                    title: legend.charttitle,
                    seriesType: 'bars',
                    vAxis: {title: legend.axistitle},
                    textStyle: {fontName: 'MuseoSans-300'},
                    legend: 'none',
                    lineWidth: 4,
                    colors: [],
                    series: {
                        0: {
                            type: 'line',
                            targetAxisIndex: 0
                        },
                        1: {
                            type: 'line',
                            targetAxisIndex: 0
                        },
                        2: {
                            type: 'line',
                            targetAxisIndex: 0
                        },
                        3: {
                            type: 'line',
                            targetAxisIndex: 0
                        },
                        4: {
                            type: 'line',
                            targetAxisIndex: 0
                        },
                        5: {
                            type: 'line',
                            targetAxisIndex: 0
                        }
                    },
                    vAxes: {

                        1: {
                            format: '# kW',
                            title: legend.axis2title
                        }
                    },
                    animation: {
                        startup: true,
                        easing: "in",
                        duration: 500
                    }
                };

                // start by treating everything like a line chart, and add bars in if they are enabled.
                // this avoids messy logic around which ones to set as line charts.

                // if the main chart and the line overlay have different units, use a second axes on the right
                if (legend.charttitle === "Usage Trend" || $chartArray[0][4] === "Demand" || $chartArray[0][4] === "Temperature") {
                    for (i in options.series)
                        options.series[i].targetAxisIndex = 1;
                }

                // Check the legend settings to see how many series are in bars
                var barsets = 0;
                for (i = 2; i >= 0; i--) {
                    if (legend.items[i].enabled)  barsets++;
                }
                for (i = 0; i < barsets; i++) {
                    options.series[i].type = 'bar';
                    options.series[i].targetAxisIndex = 0;
                }

                // chart colours come from the legend
                for (var i in legend.items) {
                    if (legend.items[i].enabled && legend.items[i].exists)
                        options.colors.push(legend.items[i].color);
                }

                // aa few extra colours, just to make sure google doesn't choke
                options.colors.push('#0093B4', '#f9dc5c', '#db504a', '#799D4B', '#cf5c36', '#684b7f', '#FF7F00', '#1200c3');

                if (cumulative) {
                    options.dataOpacity = 0.6;
                    options.seriesType = 'area';
                    for (i = 0; i < barsets; i++) {
                        options.series[i].type = 'area';
                    }
                }

                var chart = new google.visualization.ComboChart(document.getElementById(elemid));
                chart.draw(data, options);
            }
        }

        GraphData.$inject = [];
        return GraphData;
    }
);


