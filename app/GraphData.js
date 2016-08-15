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
                loadAndDrawGoogleChart: function ($chartArray, elemid, charttitle, axistitle, cumulative) {
                    cumulative = cumulative || false;

                    if (googleChartsLoaded == false) {
                        google.charts.load('current', {'packages': ['corechart']});
                        google.charts.setOnLoadCallback(function () {
                            drawGoogleChart($chartArray, elemid, charttitle, axistitle, cumulative);
                            googleChartsLoaded = true;
                        })
                    } else {
                        drawGoogleChart($chartArray, elemid, charttitle, axistitle, cumulative);
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

                    for (i = 0; i < $trendData.series.length; i++) {
                        // a row has all the values for a year.
                        var row = $trendData.series[i].data;
                        chartArray[0][i + 1] = $trendData.series[i].label;
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
            function drawGoogleChart($chartArray, elemid, charttitle, axistitle, cumulative) {
                cumulative = cumulative || false;

                try {
                    var data = google.visualization.arrayToDataTable($chartArray);
                } catch (err) {
                    console.log("google.visualization error: " + err.message);
                }

                var options = {
                    title: charttitle,
                    seriesType: 'bars',
                    vAxis: {title: axistitle},
                    legend: {position: 'bottom'},
                    lineWidth: 4,
                    colors: ['#005b85', '#66c2d9', '#c7e9e5', '#799d4b'],  // blues plus one green
                    series: {
                        3: {
                            type: 'line',
                            targetAxisIndex: 0
                        }
                    },
                    vAxes: {
                        3: {
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

                // if the main chart and the line overlay have different units, use a second axes on the right
                if (charttitle === "Usage Trend" || $chartArray[0][4] === "Demand" || $chartArray[0][4] === "Temperature") {
                    options.series[3].targetAxisIndex = 1;
                }

                if (cumulative) {
                    options.dataOpacity = 0.6;
                    options.seriesType = 'area';
                }

                var chart = new google.visualization.ComboChart(document.getElementById(elemid));
                chart.draw(data, options);
            }

            s
        }

        GraphData.$inject = [];
        return GraphData;
    }
);


