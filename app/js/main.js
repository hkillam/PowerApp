!function t(e, a, i) {
    function s(o, l) {
        if (!a[o]) {
            if (!e[o]) {
                var r = "function" == typeof require && require;
                if (!l && r) return r(o, !0);
                if (n) return n(o, !0);
                var h = new Error("Cannot find module '" + o + "'");
                throw h.code = "MODULE_NOT_FOUND", h
            }
            var c = a[o] = {
                exports: {}
            };
            e[o][0].call(c.exports, function (t) {
                var a = e[o][1][t];
                return s(a ? a : t)
            }, c, c.exports, t, e, a, i)
        }
        return a[o].exports
    }

    for (var n = "function" == typeof require && require, o = 0; o < i.length; o++) s(i[o]);
    return s
}({
    1: [
        function (t, e) {
            "use strict";
            var a = t("./modules/manageAccounts"),
                i = t("./modules/accountOverview"),
                s = t("./modules/sst"),
                n = t("./modules/myBills"),
                o = t("./modules/myUsage"),
                l = t("./modules/ui"),
                r = {
                    init: function (t) {
                        return t = window[t] = {}, a.init(t), i.init(t), s.init(t), n.init(t), l.init(t), o.init(t), "app initialized"
                    }
                };
            e.exports = r
        }, {
            "./modules/accountOverview": 3,
            "./modules/manageAccounts": 5,
            "./modules/myBills": 6,
            "./modules/myUsage": 7,
            "./modules/sst": 8,
            "./modules/ui": 10
        }
    ],
    2: [
        function (t) {
            "use strict";
            _.templateSettings.evaluate = /<\@([\s\S]+?)\@>/g, _.templateSettings.interpolate = /<\@=([\s\S]+?)\@>/g, _.templateSettings.escape = /<\@-([\s\S]+?)\@>/g;
            var e = t("./app");
            e.init("XE")
        }, {
            "./app": 1
        }
    ],
    3: [
        function (t, e) {
            "use strict";

            function a(t, e, a, i) {
                t.append($('<div class="' + (i ? "col-md-12 stacked" : "col-md-6") + ' col-xs-12 program"></div>').html($('<div class="program-element"></div>').html($("<a></a>").attr("href", a).html(e))))
            }

            function i(t, e, i, s) {
                var n = 0;
                return _(e).each(function (e, o) {
                    e || (n++, o = t.programs[o], a(i, o.text, o.url, s))
                }), n > 0 ? !1 : !0
            }

            var s = t("./trendChart"),
                n = {
                    callstack: [],
                    data: {},
                    init: function (t) {
                        t.accountOverview = {
                            BillSummary: this.BillSummary(this),
                            EnergySummary: this.EnergySummary(this)
                        }
                    },
                    getAccountData: function (t, e, a, i) {
                        this.data[i] ? e(this.data[i]) : (0 === this.callstack.length && $.ajax({
                            context: this,
                            url: t,
                            data: {
                                account: i
                            },
                            success: function (t) {
                                var e = this;
                                for (e.data[i] = t; e.callstack.length > 0;) e.callstack.shift()(t)
                            },
                            error: function (t, e, a) {
                                console.error(a, e), 5 === Math.round(t.status / 100) && new XE.ui.Alert($('[data-ui="ajaxAlertContainer"]'), {
                                    message: "Error fetching data. Please refresh the page.",
                                    type: "error"
                                })
                            }
                        }), this.callstack.push(e))
                    },
                    BillSummary: function (t) {
                        return function (e, a, n, o) {
                            var l = this,
                                r = $('[data-ui="showPromoBox"]', e),
                                h = new XE.ui.Spinner(e);
                            this.buildUI = function (t) {
                                var a = $('[data-ui="alertContainer"]', e),
                                    n = $('[data-ui="overdue"]', e),
                                    r = $('[data-ui="currentBalance"]', e),
                                    c = $('[data-ui="dueDate"]', e),
                                    d = $('[data-ui="lastPaymentAmt"]', e),
                                    u = $('[data-ui="lastPaymentDate"]', e),
                                    p = $('[data-ui="programsList"]', e),
                                    m = $('[data-ui="billTrendChart"]', e),
                                    g = $('[data-ui="payNowButton"]', e),
                                    k = $('[data-ui="nextSchedPaymentAmt"]', e),
                                    v = $('[data-ui="nextSchedPaymentDate"]', e),
                                    y = $('[data-ui="nextSchedStatus"]', e),
                                    q = $('[data-ui="hasManySchedPayments"]', e),
                                    f = $('[data-ui="selectedAcctValue"]', e);
                                t.disabled ? g.addClass("disabled").removeClass("btn-primary").addClass("btn-secondary").css("color", " #d3d3d3").attr("onMouseOver", 'this.style.color="#d3d3d3"').attr("onMouseOut", 'this.style.color="#d3d3d3"').removeAttr("href").removeAttr("data-modal").removeAttr("onclick") : g.removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary").css("color", "#ffffff").attr("onMouseOver", 'this.style.color="#a11011"').attr("onMouseOut", 'this.style.color="#ffffff"').attr("href", "payBillFromOverview.req").attr("data-modal", '[data-ui="payNowWarningModal"]').attr("onclick", "virtualTitlePay()"), g.click(function (e) {
                                    f.text() === t.number && (t.programs.autoPay || t.programs.ebillAutoPay) && (e.preventDefault(), $(g.attr("data-modal")).modal("show"))
                                }), a.empty(), t.alert && XE.ui.Alert(a, {
                                    type: "info",
                                    message: t.alert
                                }),
                                    q.text(t.hasManySchedPayments), y.text(t.nextSchedStatus),
                                    t.nextSchedStatus === null || t.nextSchedStatus === 'null' ? ($('#nextScheduledPaymentDateInfo').addClass('hidden'), $('#lastPaymentDateInfo').removeClass('hidden')) : ($('#nextScheduledPaymentDateInfo').removeClass('hidden'), $('#lastPaymentDateInfo').addClass('hidden')),

                                    t.hasManySchedPayments > 1 ? ($('#noPaymentSchedule').addClass("hidden"), $('#noPaymentScheduleMobile').addClass('hidden'), $('#muliplePaymentSched').removeClass('hidden'), $('#muliplePaymentSchedMobile').removeClass('hidden'), $('#noPaymentSched').removeClass('hidden'), $('#noPaymentSchedMobile').removeClass('hidden'), $('#singlePaymentSched').addClass('hidden'), $('#singlePaymentSchedMobile').addClass('hidden')) : (t.hasManySchedPayments == 1 ? ($('#noPaymentSched').addClass('hidden'), $('#noPaymentSchedMobile').addClass('hidden'), $('#muliplePaymentSchedMobile').addClass('hidden'), $('#singlePaymentSched').removeClass('hidden'), $('#singlePaymentSchedMobile').removeClass('hidden')) : ($('#noPaymentSchedule').removeClass('hidden'), $('#noPaymentScheduleMobile').removeClass('hidden'), $('#muliplePaymentSched').addClass('hidden'), $('#muliplePaymentSchedMobile').addClass('hidden'), $('#singlePaymentSched').addClass('hidden'), $('#singlePaymentSchedMobile').addClass('hidden'))),
                                    r.html(numeral(t.currentBalance).format("$0,0.00")), t.overdue ? (r.parent().addClass("overdue"), c.parent().addClass("overdue"), n.html("Overdue Bill")) : (r.parent().removeClass("overdue"), c.parent().removeClass("overdue"), n.empty()), c.parent().toggleClass("hidden", !t.dueDate), c.text(moment.utc(new Date(t.dueDate)).format("MMMM D, YYYY")), d.html(numeral(t.lastPaymentAmt).format("$0,0.00")), k.html(numeral(t.nextSchedPaymentAmt).format("$0,0.00")), ($("span", u).text(moment.utc(new Date(t.lastPaymentDate)).format("MMMM D, YYYY"))), ($("span", v).text(moment.utc(new Date(t.nextSchedPaymentDate)).format("MMMM D, YYYY"))), p.empty(), $(".more-ways-to-save", e).remove(), i(o.accountPrograms, t.programs, p, !0) && (t.premises ? i(o.premisePrograms, t.premises[0].programs, p, !0) && p.after($('<div class="col-xs-12 more-ways-to-save"></div>').html($('<a href="https://www.xcelenergy.com/Energy_Solutions"></a>').html("Find more ways to save money"))) : p.after($('<div class="col-xs-12 more-ways-to-save"></div>').html($('<a href="https://www.xcelenergy.com/Energy_Solutions"></a>').html("Find more ways to save money")))), l.chart && l.chart.destroy(), l.chart = s.init(m, {
                                    labels: t.trendData.labels,
                                    datasets: _.map(t.trendData.series, function (t, e) {
                                        return t.fillColor = ["rgba(199,233,229,1)", "rgba(102,194,217,1)", "rgba(0,91,133,1)"][e % 3], t
                                    }),
                                    currentIndex: t.trendData.labels.indexOf(moment.utc(new Date(t.lastStatementDate)).format("MMM"))
                                }), m.siblings(".bartrend-legend").remove(), m.after(l.chart.generateLegend()), $(".chart-area", e).toggleClass("hidden-xs", !(t.trendData.series && t.trendData.series.length)), $('[data-ui="energyOutreachContainer"]').toggleClass("hidden", !t.energyOutreach),
                                    $('[data-ui="lastPaymentAmt"]').filter(function () {
                                        return "$0.00" === $(this).text()
                                    }).parent().addClass("hidden"), h.hide()
                            }, this.changeAccount = function (e) {
                                $('p[paymentInfo="paymentDetails"]').addClass("hidden"),
                                    h.show(), t.getAccountData(a, l.buildUI, this, e), $.ajax({
                                    type: "GET",
                                    url: "/oam/setAccountBackendSession.req",
                                    data: {
                                        account: e
                                    },
                                    success: function (t) {
                                        "success" === t.status && $.ajax({
                                            type: "GET",
                                            url: "/oam/user/getPromoBoxRecord.req",
                                            data: {
                                                accountid: e
                                            },
                                            success: function (t) {
                                                r.text(t.displayPromoBox)
                                            },
                                            error: function () {
                                                r.text("error")
                                            }
                                        })
                                    }
                                })
                            }, n.change(function (t) {
                                l.changeAccount($(t.target).val())
                            }), l.changeAccount(n.val())
                        }
                    },
                    PremiseSelector: function (t, e) {
                        if (t.premises) {
                            var a = $('[data-ui="premiseSelectorBlock"]', e),
                                i = $('[data-ui="premiseSelector"]', e),
                                s = $('[data-ui="premiseLabel"]', e);
                            i.empty(), _(t.premises).each(function (t, e) {
                                $("<option></option>").attr("value", e).text(t.addressLine1 + " " + t.addressLine2 + " " + t.addressLine3).attr("name", t).appendTo(i)
                            }), s.html("<p>" + t.premises[0].addressLine1 + " " + t.premises[0].addressLine2 + " " + t.premises[0].addressLine3 + "</p>"), t.premises.length > 1 ? (s.addClass("hidden"), a.removeClass("hidden")) : (s.removeClass("hidden"), a.addClass("hidden"))
                        }
                    },
                    ProgramList: function (t, e, a, s) {
                        e.addClass("col-md-" + 12 / (s ? 2 : 1));
                        var n = $('[data-ui="programsList"]', e);
                        n.empty(), $(".more-ways-to-save", e).remove(), i(a, t.programs, n, s) && n.after($('<div class="col-xs-12 more-ways-to-save"></div>').html($('<a href="https://www.xcelenergy.com/Energy_Solutions"></a>').html("Find more ways to save money")))
                    },
                    PremiseList: function (t, e) {
                        t.empty(), _(e.premises).each(function (a) {
                            t.append($("<tr></tr>").html($("<td>" + a.addressLine1 + " " + a.addressLine2 + " " + a.addressLine3 + "</td><td>" + a.cost + "</td>")).append('<td><a href="/oam/user/loadPremiseGraph.req?accountId=' + e.number.replace(/-/g, "") + "&premiseId=" + a.number + '" class="icon-angle-right-thin"></a></td>'))
                        })
                    },
                    ComparisonChart: function (t, e) {
                        var a = this,
                            i = $('[data-ui="comparisonChartSelect"]', e);
                        this.buildUI = function (t, a, s) {
                            if (t && t.length) {
                                s && (i.empty(), $(t).each(function (t, e) {
                                    i.append('<option value="' + t + '">' + e.name + "</option>")
                                }));
                                var n = +t[a].efficientNeighbors,
                                    o = +t[a].allNeighbors,
                                    l = +t[a].you,
                                    r = t[a].unitLabel,
                                    h = $(".eff .bar", e),
                                    c = $(".all .bar", e),
                                    d = $(".you .bar", e);
                                h.html(n + " " + r), c.html(o + " " + r), d.html(l + " " + r), n > o && n > l ? (h.attr("style", "width: 100%"), o = o / n * 100, c.attr("style", "width: " + o + "%"), l = l / n * 100, d.attr("style", "width: " + l + "%")) : o > n && o > l ? (c.attr("style", "width: 100%"), n = n / o * 100, h.attr("style", "width: " + n + "%"), l = l / o * 100, d.attr("style", "width: " + l + "%")) : (d.attr("style", "width: 100%"), o = o / l * 100, c.attr("style", "width: " + o + "%"), n = n / l * 100, h.attr("style", "width: " + n + "%")), e.removeClass("hidden")
                            } else e.addClass("hidden")
                        }, a.buildUI(t, 0, !0), i.change(function (e) {
                            a.buildUI(t, $(e.target).val(), !1)
                        })
                    },
                    EnergySummary: function (t) {
                        return function (e, a, i, s) {
                            var n = this,
                                o = new XE.ui.Spinner(e);
                            this.options = _.defaults(s || {}, {
                                programs: {
                                    saverSwitch: {
                                        url: "/saverSwitch.html",
                                        text: "Saver Switch"
                                    },
                                    energyConsult: {
                                        url: "/energyConsult.html",
                                        text: "Energy Consult"
                                    },
                                    windSource: {
                                        url: "/windSource.html",
                                        text: "Wind Source"
                                    },
                                    averageMonthlyPayment: {
                                        url: "/averageMonthlyPayment.html",
                                        text: "Average Monthly Payment"
                                    }
                                },
                                usageUrl: "/"
                            });
                            var l = $('[data-ui="energyPremiseSelector"]', e);
                            this.buildUI = function (a, i, s) {
                                if (a.premises && a.premises.length) {
                                    e.removeClass("hidden");
                                    var r = $('[data-ui="comparisonChart"]', e),
                                        h = $('[data-ui="programListContainer"]', e),
                                        c = $('[data-ui="premiseList"]', e),
                                        d = i.comparisons ? !0 : !1;
                                    s && t.PremiseSelector(a, l);
                                    var u = $('[data-ui="usageDetails"]', e);
                                    u.click(function () {
                                        var t = $('<form class="hidden" action="' + n.options.usageUrl + '" method="post"><input type="text" name="accountId" value="' + $('[data-ui="accountSelector"]').val() + '" /><input type="text" name="premiseId" value="' + i.number + '" /></form>');
                                        $("body").append(t), t.submit()
                                    }), t.PremiseList(c, a), t.ProgramList(i, h, n.options, d), t.ComparisonChart(i.comparisons, r), o.hide()
                                } else e.addClass("hidden")
                            }, this.changeAccount = function (e) {
                                o.show(), t.getAccountData(a, function (t) {
                                    n.buildUI(t, t.premises ? t.premises[0] : null, !0), l.change(function (e) {
                                        n.buildUI(t, t.premises[$(e.target).val()])
                                    })
                                }, this, e)
                            }, $('[data-ui="expandButton"]', e).click(function () {
                                $(this).children("i").toggleClass("fa-plus fa-minus")
                            }), i.change(function (t) {
                                n.changeAccount($(t.target).val() || 0)
                            }), n.changeAccount(i.val() || 0)
                        }
                    }
                };
            e.exports = n
        }, {
            "./trendChart": 9
        }
    ],
    4: [
        function (t, e) {
            "use strict";
            Chart.types.BarTrend.extend({
                name: "LineOverBar",
                defaults: Chart.helpers.merge(Chart.types.Bar.prototype.defaults, Chart.helpers.merge(Chart.types.Line.prototype.defaults, {})),
                initialize: function (t) {
                    var e = this,
                        a = this.options;
                    this.ScaleClass = Chart.Scale.extend({
                        offsetGridLines: !0,
                        calculateBarX: function (t, e, i) {
                            var s = this.calculateBaseWidth(),
                                n = this.calculateX(i) - s / 2,
                                o = this.calculateBarWidth(t);
                            return n + o * e + e * a.barDatasetSpacing + o / 2
                        },
                        calculateBaseWidth: function () {
                            return this.calculateX(1) - this.calculateX(0) - 2 * a.barValueSpacing
                        },
                        calculateBarWidth: function (t) {
                            var e = this.calculateBaseWidth() - (t - 1) * a.barDatasetSpacing;
                            return e / t
                        },
                        calculateX: function (t) {
                            var e = (this.xLabelRotation > 0, this.width - 2 * (this.xScalePaddingLeft + this.xScalePaddingRight)),
                                a = e / (this.valuesCount - (this.offsetGridLines ? 0 : 1)),
                                i = a * t + this.xScalePaddingLeft;
                            return this.offsetGridLines && (i += a / 2), Math.round(i)
                        },
                        calculateY: function (t) {
                            var e = this.drawingArea() / (this.min - this.max) * 10;
                            return this.endPoint - e * (t - this.min)
                        },
                        drawLineY: function () {
                            var t = this.ctx,
                                e = (this.endPoint - this.startPoint) / this.steps,
                                a = (Math.round(this.width - this.xScalePaddingLeft), this.width - this.xScalePaddingLeft - this.xScalePaddingRight);
                            t.moveTo(a, this.endPoint), t.lineTo(a, this.startPoint - 3), t.stroke(), t.closePath(), t.fillStyle = "rgba(230,118,0,1)", t.font = this.font, Chart.helpers.each(this.yLabels, function (i, s) {
                                var n = this.endPoint - e * s,
                                    o = Math.round(n);
                                t.textAlign = "left", t.textBaseline = "middle", this.showLabels && t.fillText(i, a + 12, n), t.beginPath(), s > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), o += Chart.helpers.aliasPixel(t.lineWidth), t.closePath(), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(a + 5, o), t.lineTo(a, o), t.stroke(), t.closePath()
                            }, this)
                        },
                        draw: function () {
                            var t = this.ctx,
                                e = (this.endPoint - this.startPoint) / this.steps,
                                a = Math.round(this.xScalePaddingLeft);
                            this.display && (t.fillStyle = "rgba(0,179,153,1)", t.font = this.font, Chart.helpers.each(this.yLabels, function (i, s) {
                                var n = this.endPoint - e * s,
                                    o = Math.round(n);
                                t.textAlign = "right", t.textBaseline = "middle", this.showLabels && t.fillText(i, a - 10, n), t.beginPath(), s > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), o += Chart.helpers.aliasPixel(t.lineWidth), t.moveTo(a, o), t.lineTo(this.width - this.xScalePaddingLeft - this.xScalePaddingRight, o), t.stroke(), t.closePath(), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(a - 5, o), t.lineTo(a, o), t.stroke(), t.closePath()
                            }, this), t.fillStyle = this.textColor, Chart.helpers.each(this.xLabels, function (e, a) {
                                var i = this.calculateX(a) + Chart.helpers.aliasPixel(this.lineWidth),
                                    s = this.calculateX(a - (this.offsetGridLines ? .5 : 0)) + Chart.helpers.aliasPixel(this.lineWidth),
                                    n = this.xLabelRotation > 0;
                                t.beginPath(), a > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), t.moveTo(s, this.endPoint), t.lineTo(s, this.startPoint - 3), t.stroke(), t.closePath(), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(s, this.endPoint), t.lineTo(s, this.endPoint + 5), t.stroke(), t.closePath(), t.save(), t.translate(i, n ? this.endPoint + 12 : this.endPoint + 8), t.rotate(-1 * Chart.helpers.radians(this.xLabelRotation)), t.font = this.font, t.textAlign = n ? "right" : "center", t.textBaseline = n ? "middle" : "top", t.fillText(e, 0, 0), t.restore()
                            }, this), this.HighlightClass = Chart.Rectangle.extend({
                                strokeWidth: 1,
                                ctx: this.ctx,
                                draw: function () {
                                    var t = this.ctx,
                                        e = this.width / 2,
                                        a = this.x,
                                        i = this.x + this.width,
                                        s = this.base - (this.base - this.y),
                                        n = this.strokeWidth / 2;
                                    this.showStroke && (a += n, i -= n, s += n, this.base -= n), t.beginPath(), t.fillStyle = this.fillColor, t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.moveTo(a, this.base), t.lineTo(a, s), t.lineTo(i, s), t.lineTo(i, this.base), t.lineTo(a, this.base), t.fill(), t.stroke(), t.fillStyle = "rgba(196,196,196,1)", t.textAlign = "center", t.font = this.font, t.fillText("CURRENT", a + e, s + 10)
                                }
                            }), this.HighlightClass.prototype.base = this.endPoint + 25, this.highlight = new this.HighlightClass({
                                width: this.calculateBarWidth(1) + 15,
                                y: 1,
                                x: this.calculateX(this.currentIndex - (this.offsetGridLines ? .5 : 0)) + Chart.helpers.aliasPixel(this.lineWidth),
                                strokeColor: "rgba(196,196,196,1)",
                                fillColor: "rgba(0,0,0,0)",
                                font: '8px "museo_sans300", "Helvetica Neue", Helvetica, Arial, sans-serif'
                            }), this.highlight.draw())
                        }
                    }), this.datasets = [], this.bardatasets = [], this.linedatasets = [], this.options.showTooltips && Chart.helpers.bindEvents(this, this.options.tooltipEvents, function (t) {
                        var e = "mouseout" !== t.type ? this.getBarsAtEvent(t) : [],
                            a = "mouseout" !== t.type ? this.getPointsAtEvent(t) : [];
                        this.showTooltip(a.concat(e))
                    }), this.BarClass = Chart.Rectangle.extend({
                        strokeWidth: this.options.barStrokeWidth,
                        showStroke: this.options.barShowStroke,
                        ctx: this.chart.ctx
                    }), this.PointClass = Chart.Point.extend({
                        ctx: this.chart.ctx
                    }), Chart.helpers.each(t.datasets, function (e) {
                        var a, i;
                        "bar" === e.type ? Chart.helpers.each(e.data, function (i) {
                            a = {
                                label: e.label || null,
                                name: e.name || null,
                                bars: []
                            }, this.bardatasets.push(a), Chart.helpers.each(i.data, function (e, s) {
                                a.bars.push(new this.BarClass({
                                    value: e,
                                    label: t.labels[s],
                                    datasetLabel: i.label,
                                    strokeColor: i.strokeColor,
                                    fillColor: i.fillColor,
                                    highlightFill: i.highlightFill || i.fillColor,
                                    highlightStroke: i.highlightStroke || i.strokeColor
                                }))
                            }, this)
                        }, this) : Chart.helpers.each(e.data, function (a) {
                            i = {
                                label: e.label || null,
                                fillColor: e.fillColor,
                                strokeColor: a.strokeColor,
                                name: e.name || null,
                                points: []
                            }, this.linedatasets.push(i), Chart.helpers.each(a.data, function (e, s) {
                                i.points.push(new this.BarClass({
                                    value: e,
                                    label: t.labels[s],
                                    datasetLabel: a.label,
                                    strokeColor: a.strokeColor,
                                    fillColor: a.fillColor,
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff"
                                }))
                            }, this)
                        }, this)
                    }, this), this.buildBarScale(t.labels, t.currentIndex), this.buildLineScale(t.labels, t.currentIndex), this.BarClass.prototype.base = this.barscale.endPoint, this.eachBars(function (t, e, a) {
                        Chart.helpers.extend(t, {
                            width: this.barscale.calculateBarWidth(this.bardatasets.length),
                            x: this.barscale.calculateBarX(this.bardatasets.length, a, e),
                            y: this.barscale.endPoint
                        }), t.save()
                    }, this), this.eachPoints(function (t, e) {
                        Chart.helpers.extend(t, {
                            x: this.barscale.calculateX(e),
                            y: this.linescale.endPoint,
                            radius: this.options.pointDotRadius,
                            hitDetectionRadius: this.options.pointHitDetectionRadius,
                            inRange: function (t, e) {
                                return Math.pow(t - this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2) && Math.pow(e - this.y, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2)
                            }
                        }), t.save()
                    }, this), this.linedatasets.reverse(), setTimeout(function () {
                        e.draw()
                    }, 0)
                },
                showTooltip: function (t, e) {
                    "undefined" == typeof this.activeElements && (this.activeElements = []);
                    var a = function (t) {
                        var e = !1;
                        return t.length !== this.activeElements.length ? e = !0 : (Chart.helpers.each(t, function (t, a) {
                            t !== this.activeElements[a] && (e = !0)
                        }, this), e)
                    }.call(this, t);
                    if (a || e) {
                        if (this.activeElements = t, this.draw(), t.length > 0)
                            if (this.datasets = this.bardatasets.concat(this.linedatasets), this.datasets && this.datasets.length > 1) {
                                for (var i, s, n = this.datasets.length - 1; n >= 0 && (i = this.datasets[n].points || this.datasets[n].bars || this.datasets[n].segments, s = Chart.helpers.indexOf(i, t[0]), -1 === s); n--);
                                var o = [],
                                    l = [],
                                    r = function () {
                                        var t, e, a, i, n, r = [],
                                            h = [],
                                            c = [];
                                        return Chart.helpers.each(this.datasets, function (e) {
                                            t = e.points || e.bars || e.segments, t[s] && r.push(t[s])
                                        }), Chart.helpers.each(r, function (t) {
                                            t.value && (h.push(t.x), c.push(t.y), o.push(Chart.helpers.template(this.options.multiTooltipTemplate, t)), l.push({
                                                fill: t._saved.fillColor || t.fillColor || t.strokeColor,
                                                stroke: t._saved.strokeColor || t.strokeColor
                                            }))
                                        }, this), n = Chart.helpers.min(c), a = Chart.helpers.max(c), i = Chart.helpers.min(h), e = Chart.helpers.max(h), {
                                            x: i > this.chart.width / 2 ? i : e,
                                            y: (n + a) / 2
                                        }
                                    }.call(this, s);
                                new Chart.MultiTooltip({
                                    x: r.x,
                                    y: r.y,
                                    xPadding: this.options.tooltipXPadding,
                                    yPadding: this.options.tooltipYPadding,
                                    xOffset: this.options.tooltipXOffset,
                                    fillColor: this.options.tooltipFillColor,
                                    textColor: this.options.tooltipFontColor,
                                    fontFamily: this.options.tooltipFontFamily,
                                    fontStyle: this.options.tooltipFontStyle,
                                    fontSize: this.options.tooltipFontSize,
                                    titleTextColor: this.options.tooltipTitleFontColor,
                                    titleFontFamily: this.options.tooltipTitleFontFamily,
                                    titleFontStyle: this.options.tooltipTitleFontStyle,
                                    titleFontSize: this.options.tooltipTitleFontSize,
                                    cornerRadius: this.options.tooltipCornerRadius,
                                    labels: o,
                                    legendColors: l,
                                    legendColorBackground: this.options.multiTooltipKeyBackground,
                                    title: t[0].label,
                                    chart: this.chart,
                                    ctx: this.chart.ctx
                                }).draw()
                            } else Chart.helpers.each(t, function (t) {
                                var e = t.tooltipPosition();
                                new Chart.Tooltip({
                                    x: Math.round(e.x),
                                    y: Math.round(e.y),
                                    xPadding: this.options.tooltipXPadding,
                                    yPadding: this.options.tooltipYPadding,
                                    fillColor: this.options.tooltipFillColor,
                                    textColor: this.options.tooltipFontColor,
                                    fontFamily: this.options.tooltipFontFamily,
                                    fontStyle: this.options.tooltipFontStyle,
                                    fontSize: this.options.tooltipFontSize,
                                    caretHeight: this.options.tooltipCaretSize,
                                    cornerRadius: this.options.tooltipCornerRadius,
                                    text: Chart.helpers.template(this.options.tooltipTemplate, t),
                                    chart: this.chart
                                }).draw()
                            }, this);
                        return this
                    }
                },
                eachBars: function (t) {
                    Chart.helpers.each(this.bardatasets, function (e, a) {
                        Chart.helpers.each(e.bars, t, this, a)
                    }, this)
                },
                eachPoints: function (t) {
                    Chart.helpers.each(this.linedatasets, function (e) {
                        Chart.helpers.each(e.points, t, this)
                    }, this)
                },
                getBarsAtEvent: function (t) {
                    for (var e, a = [], i = Chart.helpers.getRelativePosition(t), s = function (t) {
                        a.push(t.bars[e])
                    }, n = 0; n < this.bardatasets.length; n++)
                        for (e = 0; e < this.bardatasets[n].bars.length; e++)
                            if (this.bardatasets[n].bars[e].inRange(i.x, i.y)) return Chart.helpers.each(this.bardatasets, s), a;
                    return a
                },
                getPointsAtEvent: function (t) {
                    var e = [],
                        a = Chart.helpers.getRelativePosition(t);
                    return Chart.helpers.each(this.linedatasets, function (t) {
                        Chart.helpers.each(t.points, function (t) {
                            t.inRange(a.x, a.y) && e.push(t)
                        })
                    }, this), e
                },
                draw: function () {
                    this.clear(), this.barscale.draw(), this.linescale.drawLineY(), this.datasets = this.bardatasets, this.drawbar(.1), this.datasets = this.linedatasets, this.drawline(.1)
                },
                drawline: function (t) {
                    var e = t || 1,
                        a = this.chart.ctx,
                        i = this;
                    Chart.helpers.each(this.linedatasets, function (t) {
                        Chart.helpers.each(t.points, function (t, a) {
                            null !== t.value && t.transition({
                                y: this.linescale.calculateY(t.value),
                                x: this.barscale.calculateX(a)
                            }, e)
                        }, this), this.options.bezierCurve && Chart.helpers.each(t.points, function (e, a) {
                            e.controlPoints = 0 === a ? Chart.helpers.splineCurve(e, e, t.points[a + 1], 0) : a >= t.points.length - 1 ? Chart.helpers.splineCurve(t.points[a - 1], e, e, 0) : Chart.helpers.splineCurve(t.points[a - 1], e, t.points[a + 1], this.options.bezierCurveTension)
                        }, this), a.lineWidth = this.options.datasetStrokeWidth;
                        var s, n = !1;
                        Chart.helpers.each(t.points, function (e, i) {
                            null !== e.value ? (i > 0 && s ? this.options.bezierCurve ? a.bezierCurveTo(t.points[i - 1].controlPoints.outer.x, t.points[i - 1].controlPoints.outer.y, e.controlPoints.inner.x, e.controlPoints.inner.y, e.x, e.y) : (a.beginPath(), a.moveTo(s.x, s.y), a.lineTo(e.x, e.y), a.strokeStyle = n ? "rgba(200,200,200,1)" : t.strokeColor, a.stroke(), n = !1) : a.moveTo(e.x, e.y), s = e) : i > 0 && s && (n = !0)
                        }, this), this.options.datasetFill && (a.lineTo(t.points[t.points.length - 1].x, this.scale.endPoint), a.lineTo(this.scale.calculateX(0), this.scale.endPoint), a.fillStyle = t.fillColor, a.closePath(), a.fill()), Chart.helpers.each(t.points, function (e) {
                            e.ctx.strokeStyle = t.strokeColor, e.ctx.pointDot = !0, null !== e.value && i.drawpoints(e, i.barscale.width / 150)
                        })
                    }, this)
                },
                drawpoints: function (t, e) {
                    var a = this.chart.ctx;
                    a.strokeStyle = this.strokeColor, a.lineWidth = e / 1.5, a.fillStyle = "rgba(255,255,255,1)", a.beginPath(), a.arc(t.x, t.y, e, 0, 2 * Math.PI), a.closePath(), a.fill(), a.stroke()
                },
                drawbar: function (t) {
                    var e = t || 1;
                    this.chart.ctx, Chart.helpers.each(this.datasets, function (t, a) {
                        Chart.helpers.each(t.bars, function (t, i) {
                            null !== t.value && (t.base = this.barscale.endPoint, t.transition({
                                x: this.barscale.calculateBarX(this.datasets.length, a, i),
                                y: this.barscale.calculateY(t.value),
                                width: this.barscale.calculateBarWidth(this.datasets.length)
                            }, e).draw())
                        }, this)
                    }, this)
                },
                reflow: function () {
                    Chart.helpers.extend(this.BarClass.prototype, {
                        y: this.barscale.endPoint,
                        base: this.barscale.endPoint
                    });
                    var t = Chart.helpers.extend({
                        height: this.chart.height,
                        width: this.chart.width
                    });
                    this.barscale.update(t)
                },
                buildBarScale: function (t, e) {
                    var a = this,
                        i = function () {
                            var t = [];
                            return a.eachBars(function (e) {
                                t.push(e.value)
                            }), t
                        }, s = {
                            templateString: this.options.scaleLabel,
                            height: this.chart.height,
                            width: this.chart.width,
                            ctx: this.chart.ctx,
                            textColor: this.options.scaleFontColor,
                            fontSize: this.options.scaleFontSize,
                            fontStyle: this.options.scaleFontStyle,
                            fontFamily: this.options.scaleFontFamily,
                            valuesCount: t.length,
                            beginAtZero: this.options.scaleBeginAtZero,
                            integersOnly: this.options.scaleIntegersOnly,
                            calculateYRange: function (t) {
                                var e = Chart.helpers.calculateScaleRange(i(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                                Chart.helpers.extend(this, e)
                            },
                            xLabels: t,
                            font: Chart.helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                            lineWidth: this.options.scaleLineWidth,
                            lineColor: this.options.scaleLineColor,
                            gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                            gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                            padding: this.options.showScale ? 10 : this.options.barShowStroke ? this.options.barStrokeWidth : 0,
                            showLabels: this.options.scaleShowLabels,
                            display: this.options.showScale,
                            datasetCount: this.datasets.length,
                            currentIndex: e
                        };
                    this.options.scaleOverride && Chart.helpers.extend(s, {
                        calculateYRange: Chart.helpers.noop,
                        steps: this.options.scaleSteps,
                        stepValue: this.options.scaleStepWidth,
                        min: this.options.scaleStartValue,
                        max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
                    }), this.barscale = new this.ScaleClass(s)
                },
                buildLineScale: function (t, e) {
                    var a = this,
                        i = function () {
                            var t = [];
                            return a.eachPoints(function (e) {
                                t.push(e.value)
                            }), t
                        }, s = {
                            templateString: this.options.scaleLabel,
                            height: this.chart.height,
                            width: this.chart.width,
                            ctx: this.chart.ctx,
                            textColor: this.options.scaleFontColor,
                            fontSize: this.options.scaleFontSize,
                            fontStyle: this.options.scaleFontStyle,
                            fontFamily: this.options.scaleFontFamily,
                            valuesCount: t.length,
                            beginAtZero: this.options.scaleBeginAtZero,
                            integersOnly: this.options.scaleIntegersOnly,
                            calculateYRange: function (t) {
                                var e = Chart.helpers.calculateScaleRange(i(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                                Chart.helpers.extend(this, e)
                            },
                            xLabels: t,
                            font: Chart.helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                            lineWidth: this.options.scaleLineWidth,
                            lineColor: this.options.scaleLineColor,
                            gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                            gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                            padding: this.options.showScale ? 10 : this.options.barShowStroke ? this.options.barStrokeWidth : 0,
                            showLabels: this.options.scaleShowLabels,
                            display: this.options.showScale,
                            datasetCount: this.datasets.length,
                            currentIndex: e
                        };
                    this.options.scaleOverride && Chart.helpers.extend(s, {
                        calculateYRange: Chart.helpers.noop,
                        steps: this.options.scaleSteps,
                        stepValue: this.options.scaleStepWidth,
                        min: this.options.scaleStartValue,
                        max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
                    }), this.linescale = new this.ScaleClass(s)
                }
            });
            var a = {
                init: function (t, e, a) {
                    var i = t.get()[0].getContext("2d");
                    return a = _.defaults(a || {}, {
                        scaleBeginAtZero: !1,
                        scaleIntegersOnly: !1,
                        barValueSpacing: 7.5,
                        delay: 1e3,
                        scaleLabel: "<%=value%>",
                        multiTooltipTemplate: "<%=value%>",
                        responsive: !0,
                        barShowStroke: !1,
                        scaleFontFamily: "'museo_sans300', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                        scaleShowGridLines: !1,
                        bezierCurve: !1,
                        bezierCurveTension: .35,
                        pointDot: !0,
                        pointDotRadius: 4,
                        pointDotStrokeWidth: 1,
                        pointHitDetectionRadius: 20,
                        datasetStroke: !0,
                        datasetStrokeWidth: 3,
                        datasetFill: !1,
                        showTooltips: !0,
                        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend list-inline"><% for (var i=0; i<bardatasets.length; i++){%><li><span style="background-color:<%=bardatasets[i].bars[0].fillColor%>"></span><%if(bardatasets[i].name && bardatasets[i].bars[0].datasetLabel){%><%=bardatasets[i].name%> <%= bardatasets[i].bars[0].datasetLabel%><%}%></li><%}%>        <% for (var i=0; i<linedatasets.length; i++){%><li><span style="background-color:<%=linedatasets[i].points[0].strokeColor%>"></span><%if(linedatasets[i].name && linedatasets[i].points[0].datasetLabel){%><%=linedatasets[i].name%> <%= linedatasets[i].points[0].datasetLabel%><%}%></li><%}%><li><span style="background-color: rgba(200,200,200,1)"></span>Data Not Available</li></ul>'
                    }), new Chart(i).LineOverBar(e, a)
                }
            };
            e.exports = a
        }, {}
    ],
    5: [
        function (t, e) {
            "use strict";
            var a = {
                callstack: [],
                init: function (t) {
                    t.manageAccounts = {
                        AccountsTable: this.AccountsTable(this)
                    }
                },
                getAccountData: function (t, e, a, i) {
                    this.data && !i ? e(this.data) : (0 === this.callstack.length && $.ajax({
                        context: this,
                        url: t,
                        success: function (t) {
                            for (this.data = t; this.callstack.length > 0;) this.callstack.shift()(t)
                        },
                        error: function (t, e, a) {
                            console.error(a, e), 5 === Math.round(t.status / 100) && new XE.ui.Alert($('[data-ui="ajaxAlertContainer"]'), {
                                message: "Error fetching data. Please refresh the page.",
                                type: "error"
                            })
                        }
                    }), this.callstack.push(e))
                },
                AccountsTable: function (t) {
                    return function (e, a) {
                        var i = this,
                            s = new XE.ui.Spinner($('[data-ui="manageAccountsContainer"]')),
                            n = $(".accounts-pagination"),
                            o = $("#accountModal");
                        this.buildRow = function (t) {
                            var a = $(_.template($('[data-template="accountRow-template"]', e).html(), t, {
                                imports: {
                                    moment: moment
                                }
                            }));
                            $('[data-ui="premise-modal"]', a).click(t, this.showModal), $(".table-body", e).append(a)
                        }, this.showModal = function (t) {
                            var e = t.data,
                                a = $('[data-template="accountModalHeader-template"]', o).html(),
                                i = $('[data-template="accountModalHeaderRow-template"]', o).html(),
                                s = $('[data-template="accountModalRow-template"]', o).html();
                            $(".modal-header", o).html(_.template(a, e)), $(".modal-body .account-header", o).html(_.template(i, e, {
                                imports: {
                                    moment: moment
                                }
                            }));
                            var n = function (t, e) {
                                var a = $(".modal-body .table-premises>tbody", o),
                                    i = 20;
                                this.lastPage = Math.ceil(t.length / i), this.paginate = function () {
                                    a.empty();
                                    for (var n = (this.page - 1) * i; n < this.page * i && n < t.length; n++) {
                                        var l = t[n];
                                        l.accountNumber = e, a.append(_.template(s, l))
                                    }
                                    $('[data-ui="currentPage"]', o).html(this.page), $('[data-ui="totalPages"]', o).html(this.lastPage), $('[data-ui="first"], [data-ui="previous"]', o).prop("disabled", 1 === this.page), $('[data-ui="last"], [data-ui="next"]', o).prop("disabled", this.page === this.lastPage)
                                }, this.setPage = function (t) {
                                    this.page = t, this.paginate()
                                }
                            }, l = new n(e.premises, e.number);
                            $('[data-ui="first"]', o).click(function () {
                                l.setPage(1)
                            }), $('[data-ui="previous"]', o).click(function () {
                                l.setPage(l.page - 1)
                            }), $('[data-ui="next"]', o).click(function () {
                                l.setPage(l.page + 1)
                            }), $('[data-ui="last"]', o).click(function () {
                                l.setPage(l.lastPage)
                            }), l.setPage(1), o.modal()
                        }, this.paginate = function () {
                            var t = 10;
                            this.lastPage = Math.ceil(this.accounts.length / t), $(".table-body", e).empty();
                            for (var a = (this.page - 1) * t; a < this.page * t && a < this.accounts.length; a++) this.buildRow(this.accounts[a]);
                            $('[data-ui="currentPage"]', n).html(this.page), $('[data-ui="totalPages"]', n).html(this.lastPage), $('[data-ui="first"], [data-ui="previous"]', n).prop("disabled", 1 === this.page), $('[data-ui="last"], [data-ui="next"]', n).prop("disabled", this.page === this.lastPage)
                        }, this.setPage = function (t) {
                            this.page = t, this.paginate()
                        }, this.sort = function (t, e) {
                            this.accounts = _.sortBy(this.accounts, function (e) {
                                switch (t) {
                                    case "nickName":
                                        return e[t];
                                    case "number":
                                        return +e[t];
                                    case "currentBalance":
                                        return +e[t];
                                    case "dueDate":
                                        return +moment.utc(new Date(e[t])).format("X");
                                    default:
                                        return new Date(e[t])
                                }
                                return e[t]
                            }), e && this.accounts.reverse(), this.setPage(1)
                        }, this.toggleRemoveVisibility = function () {
                            "false" === e.attr("data-remove-state") ? ($(".overlay , [data-remove]", e).removeClass("hidden"), $('[data-ui="overlayText"]', e).addClass("overlay"), e.attr("data-remove-state", "true")) : ($('[data-ui="overlayText"]', e).removeClass("overlay"), $(".overlay , [data-remove]", e).addClass("hidden"), e.attr("data-remove-state", "false"))
                        }, s.show(), t.getAccountData(a, function (t) {
                            $('[data-ui="removeAccount"]'), i.accounts = t.accounts, _(i.accounts).each(function (t) {
                                t.currentBalance = parseFloat(Math.round(100 * t.currentBalance) / 100).toFixed(2), t.currentBalanceHTML = numeral(t.currentBalance).format("$0,0.00")
                            }), $('[data-ui="totalAccounts"]', n).html(i.accounts.length), i.setPage(1), $('[data-ui="first"]', n).click(function () {
                                i.setPage(1)
                            }), $('[data-ui="previous"]', n).click(function () {
                                i.setPage(i.page - 1)
                            }), $('[data-ui="next"]', n).click(function () {
                                i.setPage(i.page + 1)
                            }), $('[data-ui="last"]', n).click(function () {
                                i.setPage(i.lastPage)
                            }), $("[data-sort]", e).click(function () {
                                var t = $(this).hasClass("sort-asc");
                                $("[data-sort]", e).removeClass("sort-asc sort-desc"), t ? (i.sort($(this).data().sort, !0), $(this).addClass("sort-desc")) : (i.sort($(this).data().sort), $(this).addClass("sort-asc"))
                            }), $.each($(".collapse", e), function () {
                                $(this).on("show.bs.collapse hide.bs.collapse", function (t) {
                                    var a = $(t.target).data("account");
                                    $.each($("[data-target=\"[data-account='" + a + "']\"]", e), function () {
                                        $("i", this).toggleClass("fa-plus fa-minus")
                                    }), $.each($(".premises-button-mobile[data-target=\"[data-account='" + a + "']\"]", e), function () {
                                        $(this).html("show" === t.type ? "Hide Premises -" : "Show Premises +")
                                    })
                                })
                            }), e.ready(function () {
                                $.each($(".current-balance"), function () {
                                    "-" === $(this).text().charAt(0) ? $(this).html($(this).text().substr(1)) : $(this).text()
                                })
                            }), $('[data-ui="removeAccount"]').click(function () {
                                var t = $(this);
                                "false" === t.attr("data-active") ? ($(".collapse.in", e).collapse("hide"), $(this).html('<i class="fa fa-times"></i> Done'), $(".row", e).addClass("overlay-active"), t.attr("data-active", "true")) : ($(this).html('<i class="fa fa-minus"></i> Remove Account'), $(".row", e).removeClass("overlay-active"), t.attr("data-active", "false"))
                            }), $("[data-remove]", e).click(function () {
                                var t = $(this),
                                    a = $("[data-message]");
                                if (a.empty(), $(".row-account", e).length > 1) {
                                    t.attr("disabled", "true");
                                    var i = $("[data-row-id=" + t.attr("data-remove") + "]", e);
                                    i.addClass("remove"), $.ajax({
                                        type: "POST",
                                        url: "removeAccount.req?accountId=" + t.data().remove,
                                        data: i.attr("data-row-id"),
                                        dataType: "json",
                                        success: function (t) {
                                            i.remove(), new XE.ui.Alert(a, {
                                                type: "success",
                                                message: t.message
                                            })
                                        },
                                        error: function (e) {
                                            i.removeClass("remove"), t.removeAttr("disabled"), new XE.ui.Alert(a, {
                                                type: "error",
                                                message: e.errorMessage
                                            })
                                        }
                                    })
                                } else new XE.ui.Alert(a, {
                                    type: "error",
                                    message: "Cannot remove last account."
                                })
                            }), s.hide()
                        }, this)
                    }
                }
            };
            e.exports = a
        }, {}
    ],
    6: [
        function (t, e) {
            "use strict";
            var a = {
                callstack: [],
                data: {},
                init: function (t) {
                    t.myBills = {
                        PayNow: this.PayNow(this),
                        SummaryOfCharges: this.SummaryOfCharges(this),
                        ComparisonInformation: this.ComparisonInformation(this),
                        Programs: this.Programs(this),
                        AverageMonthlyPayment: this.AverageMonthlyPayment(this),
                        ScheduledPayments: this.ScheduledPayments(this),
                        ScheduledPaymentsMobile: this.ScheduledPaymentsMobile(this),
                        BillHistory: this.BillHistory(this),
                        QuickViewMobileModal: this.QuickViewMobileModal(this)
                    }
                },
                getAccountData: function (t, e, a, i) {
                    this.data[i] ? e(this.data[i]) : (0 === this.callstack.length && $.ajax({
                        context: this,
                        url: t,
                        data: {
                            account: i
                        },
                        success: function (t) {
                            for (this.data[i] = t; this.callstack.length > 0;) this.callstack.shift()(t)
                        },
                        error: function (t, e, a) {
                            console.error(a, e), 5 === Math.round(t.status / 100) && new XE.ui.Alert($('[data-ui="ajaxAlertContainer"]'), {
                                message: "Error fetching data. Please refresh the page.",
                                type: "error"
                            })
                        }
                    }), this.callstack.push(e))
                },
                PayNow: function (t) {
                    return function (e, a, i) {
                        var s = this,
                            n = new XE.ui.Spinner($('[data-ui="currentBill"]'));
                        this.buildUI = function (t) {
                            var a = $('[data-ui="currentBalance"]', e),
                                p = $('[data-ui="overdue"]', e),
                                i = $('[data-ui="dueDate"]', e),
                                s = $('[data-ui="payButton"]', e),
                                o = $('[data-ui="nextPayment"]', e),
                                l = $('[data-ui="nextPayment"] span', e),
                                r = $('[data-ui="statementDate"]', e),
                                h = $('[data-ui="acctState"]', e),
                                c = $('[data-ui="noStatement"]', e),
                                d = $('[data-ui="payNowButton"]', e),
                                z = $('[data-ui="printCurrBill"]', e),
                                w = $('[data-ui="lastPaymentAmt"]', e),
                                x = $('[data-ui="lastPaymentDate"]', e),
                                k = $('[data-ui="nextScheduledPaymentAmount"]', e),
                                m = $('[data-ui="nextScheduledPaymentDate"]', e),
                                v = $('[data-ui="nextScheduledPaymentStatus"]', e),
                                q = $('[data-ui="hasManySchedPayments"]', e),
                                y = $('[data-ui="selectedAcctValue"]', e);

                            t.disabled ? d.addClass('disabled').removeClass('btn-primary').addClass('btn-secondary').css('color', ' #d3d3d3').attr('onMouseOver', 'this.style.color="#d3d3d3"').attr('onMouseOut', 'this.style.color="#d3d3d3"').removeAttr('href').removeAttr('data-modal').removeAttr('onclick') : d.removeClass('disabled').removeClass('btn-secondary').addClass('btn-primary').css('color', '#ffffff').attr('onMouseOver', 'this.style.color="#a11011"').attr('onMouseOut', 'this.style.color="#ffffff"').attr('href', 'payBillFromOverview.req').attr('data-modal', '[data-ui="payNowWarningModal"]').attr('onclick', 'virtualTitlePay()'),
                                d.click(function (e) {
                                    ($("#selectedAcctId").text() === t.number && t.isRapOrAutoPay && (e.preventDefault(), $(d.attr("data-modal")).modal("show")))
                                }),


                                q.text(t.hasManySchedPayments), z.html('<a href="showpdf.req?isPopUp=true&stmtDate=' + moment.utc(new Date(t.lastStmtDate)).format("YYYY-MM-DD") + '&stmtNum=' + t.lastStmtNum + '" target="_blank">Print current bill</a>').toggleClass("hidden", !t.reportAvailable),

                                a.html(numeral(t.currentBalance).format('$0,0.00')),


                                t.overdue ? (a.parent().addClass('overdue').css('color', ' #ce1518'), i.parent().addClass('overdue').css('color', ' #ce1518'), p.html('Overdue Bill').css('color', ' #ce1518')) : (a.parent().removeClass('overdue').css('color', ' #3a3a3a'), i.parent().removeClass('overdue').css('color', ' #3a3a3a'), p.empty().css('color', ' #3a3a3a')),


                                //t.dueDate ? (i.html("Due: " + moment.utc(new Date(t.dueDate)).format("MMMM D, YYYY")), i.removeClass("hidden")) : i.addClass("hidden"), s.toggleClass("hidden", t.disabled), t.statements && t.statements[0].date ? (r.html("Statement Date: " + moment.utc(new Date(t.statements[0].date)).format("MM/DD/YYYY")), r.removeClass("hidden")) : r.addClass("hidden"), t.nextPaymentDate ? (o.removeClass("hidden"), l.html(moment.utc(new Date(t.nextPaymentDate)).format("MMMM D, YYYY"))) : o.addClass("hidden"), h.html(t.state), n.hide()

                                i.parent().toggleClass('hidden', !t.dueDate),
                                i.text(moment.utc(new Date(t.dueDate)).format('MMMM D, YYYY')),
                                w.html(numeral(t.lastPaymentAmt).format('$0,0.00')), k.html(numeral(t.nextScheduledPaymentAmount).format('$0,0.00')),
                                t.nextScheduledPaymentDate ? ($('span', m).text(moment.utc(new Date(t.nextScheduledPaymentDate)).format('MMMM D, YYYY')), m.removeClass('hidden')) : (m.addClass('hidden')), v.text(t.nextSchedStatus),
                                t.lastPaymentDate ? ($('span', x).text(moment.utc(new Date(t.lastPaymentDate)).format('MMMM D, YYYY')), x.removeClass('hidden')) : (x.addClass('hidden')), h.html(t.state), n.hide(),
                                t.nextSchedStatus === null || t.nextSchedStatus === 'null' ? ($('#nextScheduledPaymentDateInfo').addClass('hidden'), $('#lastPaymentDateInfo').removeClass('hidden'), $('#lastPaymentDateInfoMobile').removeClass('hidden')) : ($('#nextScheduledPaymentDateInfo').removeClass('hidden'), $('#nextScheduledPaymentDateInfoMobile').removeClass('hidden'), $('#lastPaymentDateInfo').addClass('hidden'), $('#lastPaymentDateInfoMobile').addClass('hidden')),
                                t.hasManySchedPayments > 1 ? ($('#muliplePaymentSched').removeClass('hidden'), $('#muliplePaymentSchedMobile').removeClass('hidden'), $('#singlePaymentSched').addClass('hidden'), $('#singlePaymentSchedMobile').addClass('hidden')) : (t.hasManySchedPayments == 1 ? ($('#muliplePaymentSched').addClass('hidden'), $('#muliplePaymentSchedMobile').addClass('hidden'), $('#singlePaymentSched').removeClass('hidden'), $('#singlePaymentSchedMobile').removeClass('hidden')) : ($('#muliplePaymentSched').addClass('hidden'), $('#muliplePaymentSchedMobile').addClass('hidden'), $('#singlePaymentSched').addClass('hidden'), $('#singlePaymentSchedMobile').addClass('hidden'))),

                                $('[data-ui="lastPaymentAmt"]').filter(function () {
                                    return "$0.00" === $(this).text()
                                }).parent().addClass("hidden")
                        }, this.changeAccount = function (e) {
                            $('p[paymentInfo="paymentDetails"]').addClass("hidden"),
                                n.show(), t.getAccountData(a, s.buildUI, this, e), $.get("/oam/setAccountBackendSession.req", {
                                account: e
                            })
                        }, i.change(function (t) {
                            s.changeAccount($(t.target).val())
                        }), s.changeAccount(i.val())
                    }
                },
                SummaryOfCharges: function (t) {
                    return function (e, a, i) {
                        var s = this;
                        this.buildUI = function (t) {
                            var a = $('[data-ui="chargeTable"]', e);
                            if (a.empty(), t.currentCharges) {
                                var i = 0;
                                a.empty(), a.append("<h4><tr><td>Statement Date: </td></tr><td>" + moment.utc(new Date(t.lastStmtDate)).format("MM/DD/YYYY") + "</td></tr></h4>"),
                                    _(t.currentCharges).each(function (t) {
                                        i += t.amount, a.append("<tr><td>" + t.name + '</td><td class="numeric">' + numeral(t.amount).format("$0,0.00") + "</td></tr>")
                                    }), a.append('<tr class="totalRow"><td class="totalTd">Current Charges</td><td class="totalTd numeric">' + numeral(i).format("$0,0.00") + "</td></tr>")
                            } else a.append('<tr><td class="totalTd" colspan="2">No Statement Available</td></tr>')
                        }, this.changeAccount = function (e) {
                            t.getAccountData(a, s.buildUI, this, e)
                        }, i.change(function (t) {
                            s.changeAccount($(t.target).val())
                        }), s.changeAccount(i.val())
                    }
                },
                ComparisonInformation: function (t) {
                    return function (e, a, i) {
                        var s = this;
                        this.buildUI = function (t) {
                            var a = $('[data-ui="comparisonInfoTable"]', e);
                            if (t.statements && t.statements[0].comparison) {
                                var i = $(_.template($('[data-template="comparisonInformationTable-template"]').html(), t.statements[0], {
                                    imports: {
                                        moment: moment,
                                        numeral: numeral
                                    }
                                }));
                                a.empty(), a.html(i)
                            } else a.html('<table class="subtable"><tbody><tr><td colspan="3">No Comparison Data Available</td></tr>')
                        }, this.changeAccount = function (e) {
                            t.getAccountData(a, s.buildUI, this, e)
                        }, i.change(function (t) {
                            s.changeAccount($(t.target).val())
                        }), s.changeAccount(i.val())
                    }
                },
                Programs: function (t) {
                    return function (e, a, i, s) {
                        var n = this;
                        this.options = _.defaults(i || {}, {
                            programs: {
                                autoPay: {
                                    url: "#",
                                    text: "Recurring Auto-Payment"
                                },
                                eBill: {
                                    url: "#",
                                    text: "eBill"
                                },
                                eBillAutoPay: {
                                    url: "#",
                                    text: "eBill Auto-Payment"
                                },
                                manualPay: {
                                    url: "#",
                                    text: "Manual Payment"
                                },
                                syncBill: {
                                    url: "#",
                                    text: "Sync Bill"
                                }
                            }
                        }), this.buildUI = function (t) {
                            var a = $('[data-ui="enrolledPrograms"]', e),
                                i = $('[data-ui="programOpportunities"]', e);
                            a.empty(), i.empty();
                            var s = 0,
                                o = 0,
                                pos = 0;
                            _(t.programs).each(function (t, e) {

                                t ?

                                    (

                                        e = n.options.programsEnrolled[e],

                                            e.text == "eBill" ? pos = 1 : '',
                                            e.text == "Recurring Payment Plan" ? pos = 2 : '',
                                            e.text == "Auto Pay" ? pos = 3 : '',
                                            e.text == "Averaged Monthly Payment" ? pos = 4 : '',
                                            e.text == "Windsource" ? pos = 5 : '',
                                            e.text == "Saver's Switch" ? pos = 6 : '',
                                            e.text == "Energy Consult" ? pos = 7 : '',


                                            a.append($("<li class='progEnrolled' data-position=" + pos + "></li>").html($("<a></a>").attr("href", e.url).html(e.text))),
                                            pos = 0,
                                            s++
                                    )

                                    :

                                    (
                                        e = n.options.programsAvailable[e],

                                            e.text == "eBill" ? pos = 1 : '',
                                            e.text == "Recurring Payment Plan" ? pos = 2 : '',
                                            e.text == "Auto Pay" ? pos = 3 : '',
                                            e.text == "Averaged Monthly Payment" ? pos = 4 : '',
                                            e.text == "Windsource" ? pos = 5 : '',
                                            e.text == "Saver's Switch" ? pos = 6 : '',
                                            e.text == "Energy Consult" ? pos = 7 : '',

                                            i.append($("<li class='progAvailable' data-position=" + pos + "></li>").html($("<a></a>").attr("href", e.url).html(e.text))),
                                            pos = 0,
                                            o++
                                    )

                            }), 0 === s && a.append($("<li></li>").html($("<p></p>").html("You are currently not enrolled in any programs"))), 0 === o && i.append($("<li></li>").html($("<p></p>").html("There are currently no programs for you to enroll in")))
                        }, this.changeAccount = function (e) {
                            t.getAccountData(a, n.buildUI, this, e)
                        }, s.change(function (t) {
                            n.changeAccount($(t.target).val())
                        }), n.changeAccount(s.val())
                    }
                },
                AverageMonthlyPayment: function (t) {
                    return function (e, a, i) {
                        var s = this;
                        this.buildUI = function (t) {
                            var a = $('[data-ui="previousBalanceDate"]', e),
                                i = $('[data-ui="previousBalanceActual"]', e),
                                s = $('[data-ui="previousBalanceAmp"]', e),
                                n = $('[data-ui="paymentReceivedDate"]', e),
                                o = $('[data-ui="paymentReceivedActual"]', e),
                                l = $('[data-ui="paymentReceivedAmp"]', e),
                                r = $('[data-ui="balanceForwardActual"]', e),
                                h = $('[data-ui="balanceForwardAmp"]', e),
                                c = $('[data-ui="currentChargesActual"]', e),
                                d = $('[data-ui="currentChargesAmp"]', e);
                            t.avgMonthlyPayment ? (t.avgMonthlyPayment.previousBalance.date && a.html("As of " + moment.utc(new Date(t.avgMonthlyPayment.previousBalance.date)).format("MM/DD")), i.html(numeral(t.avgMonthlyPayment.previousBalance.actual).format("$0,0.00")), $(".cr", i.parent()).toggleClass("hidden", t.avgMonthlyPayment.previousBalance.actual >= 0), s.html(numeral(t.avgMonthlyPayment.previousBalance.amp).format("$0,0.00")), $(".cr", s.parent()).toggleClass("hidden", t.avgMonthlyPayment.previousBalance.amp >= 0), t.avgMonthlyPayment.paymentReceived.date && n.html("As of " + moment.utc(new Date(t.avgMonthlyPayment.paymentReceived.date)).format("MM/DD")), o.html(numeral(t.avgMonthlyPayment.paymentReceived.actual).format("$0,0.00")), $(".cr", o.parent()).toggleClass("hidden", t.avgMonthlyPayment.paymentReceived.actual >= 0), l.html(numeral(t.avgMonthlyPayment.paymentReceived.amp).format("$0,0.00")), $(".cr", l.parent()).toggleClass("hidden", t.avgMonthlyPayment.paymentReceived.amp >= 0), r.html(numeral(t.avgMonthlyPayment.balanceForward.actual).format("$0,0.00")), $(".cr", r.parent()).toggleClass("hidden", t.avgMonthlyPayment.balanceForward.actual >= 0), h.html(numeral(t.avgMonthlyPayment.balanceForward.amp).format("$0,0.00")), $(".cr", h.parent()).toggleClass("hidden", t.avgMonthlyPayment.balanceForward.amp >= 0), c.html(numeral(t.avgMonthlyPayment.currentCharges.actual).format("$0,0.00")), $(".cr", c.parent()).toggleClass("hidden", t.avgMonthlyPayment.currentCharges.actual >= 0), d.html(numeral(t.avgMonthlyPayment.currentCharges.amp).format("$0,0.00")), $(".cr", d.parent()).toggleClass("hidden", t.avgMonthlyPayment.currentCharges.amp >= 0)) : e.parent().addClass("hidden")
                        }, this.changeAccount = function (i) {
                            t.getAccountData(a, function (t) {
                                t.avgMonthlyPayment ? (e.show(), s.buildUI(t)) : e.hide(), $('[data-ui="ampAccordion"]').toggleClass("hidden", !t.avgMonthlyPayment)
                            }, this, i)
                        }, i.change(function (t) {
                            s.changeAccount($(t.target).val())
                        }), s.changeAccount(i.val())
                    }
                },
                BillHistory: function (t) {
                    return function (e, a, i, s) {
                        var n = this,
                            o = new XE.ui.Spinner($('[data-ui="billHistory"]')),
                            l = $('[data-ui="togglePayments"]'),
                            z = $('[data-ui="togglePaymentsMobile"]'),
                            r = $('[data-ui="monthSpan"]');
                        this.buildUI = function (t) {
                            var i = $('[data-ui="billHistoryBody"]', e),
                                s = $('[data-ui="billHistoryTable"]', e),
                                n = $('[data-ui="billHistoryListMobile"]', a),
                                h = $('[data-ui="downloadBillHistory"]'),
                                c = +r.val(),
                                d = moment.utc().subtract(c, "M").subtract(0, "d").format("X");
                            if (t.reportAvailable ? h.removeClass("hidden") : h.addClass("hidden"), n.empty(), i.empty(), $(".quickview-trigger").unbind(), t.statements || t.payments)
                                if (z.prop("checked") || l.prop("checked")) {
                                    var u;
                                    u = t.payments ? t.statements ? t.statements.concat(t.payments) : t.payments : t.statements, u = _.sortBy(u, function (t) {
                                        return moment.utc(new Date(t.date)).format("X")
                                    }), u = _.filter(u, function (t) {
                                        return moment.utc(new Date(t.date)).format("X") > d
                                    }), u.length > 0 ? _(u.reverse()).each(function (t, e) {
                                        var o = "gray";
                                        if (e % 2 && (o = "white"), t.billNumber) {
                                            t.rowClass = o;
                                            var l = $(_.template($('[data-template="billHistory-template"]', s).html(), t, {
                                                imports: {
                                                    moment: moment
                                                }
                                            }));
                                            $(i).append(l);
                                            var r = $(_.template($('[data-template="billHistory-Quickview-template"]', s).html(), t, {
                                                imports: {
                                                    moment: moment
                                                }
                                            }));
                                            $(i).append(r);
                                            var h = $('[data-ui-quickview-list="' + t.billNumber + '"]');
                                            _(t.quickview).each(function (t) {
                                                var e = $(_.template($('[data-template="quickviewListLi-template"]', s).html(), t));
                                                h.append(e)
                                            });
                                            var c = $('[data-ui="comparisonInfoTable-' + t.billNumber + '"]', s);
                                            if (t.comparison) {
                                                var d = $(_.template($('[data-template="comparisonInformationTable-template"]', $(".comparisonInfoTable")).html(), t, {
                                                    imports: {
                                                        moment: moment
                                                    }
                                                }));
                                                c.empty(), c.html(d), c.removeClass("hidden")
                                            } else c.addClass("hidden");
                                            var u = $(_.template($('[data-template="billHistory-tile-template"]', a).html(), t, {
                                                imports: {
                                                    moment: moment,
                                                    numeral: numeral
                                                }
                                            }));
                                            n.append(u)
                                        } else {
                                            t.rowClass = o;
                                            var p = $(_.template($('[data-template="quickviewPayment-template"]', s).html(), t, {
                                                imports: {
                                                    moment: moment
                                                }
                                            }));
                                            $(i).append(p);
                                            var m = $(_.template($('[data-template="billHistoryPayment-tile-template"]', a).html(), t, {
                                                imports: {
                                                    moment: moment
                                                }
                                            }));
                                            if (z.prop("checked")) {
                                                n.append(m)
                                            }
                                        }
                                    }) : $(i).append('<tr><td colspan="5">No Statements Available</td></tr>');
                                } else {
                                    var p = _.filter(t.statements, function (t) {
                                        return moment.utc(new Date(t.date)).format("X") > d
                                    });
                                    p.length > 0 ? _(p).each(function (t, e) {
                                        var o = "gray";
                                        e % 2 && (o = "white"), t.rowClass = o;
                                        var l = $(_.template($('[data-template="billHistory-template"]', s).html(), t, {
                                            imports: {
                                                moment: moment,
                                                numeral: numeral
                                            }
                                        }));
                                        $(i).append(l);
                                        var r = $(_.template($('[data-template="billHistory-Quickview-template"]', s).html(), t, {
                                            imports: {
                                                moment: moment
                                            }
                                        }));
                                        $(i).append(r);
                                        var h = $('[data-ui-quickview-list="' + t.billNumber + '"]');
                                        if (_(t.quickview).each(function (t) {
                                                var e = $(_.template($('[data-template="quickviewListLi-template"]', s).html(), t));
                                                h.append(e)
                                            }), t.comparison) {
                                            var c = $('[data-ui="comparisonInfoTable-' + t.billNumber + '"]', s),
                                                d = $(_.template($('[data-template="comparisonInformationTable-template"]').html(), t, {
                                                    imports: {
                                                        moment: moment,
                                                        numeral: numeral
                                                    }
                                                }));
                                            c.empty(), c.html(d)
                                        }
                                        var u = $(_.template($('[data-template="billHistory-tile-template"]', a).html(), t, {
                                            imports: {
                                                moment: moment,
                                                numeral: numeral
                                            }
                                        }));
                                        n.append(u)
                                    }) : $(i).append('<tr><td colspan="5">No Statements Available</td></tr>')
                                } else $(i).append('<tr><td colspan="5">No Statements Available</td></tr>');
                            $(".quickview-trigger").on("click", function (t) {
                                t.preventDefault();
                                var e = $(this).attr("data-id");
                                $(".quickview-tr[data-ui=" + e + "]").slideToggle()
                            }), $(".quickview-tr").hide(), o.hide()
                        }, this.changeAccount = function (e) {
                            o.show(), t.getAccountData(i, function (t) {
                                n.buildUI(t), l.change(function () {
                                    $(this).prop("checked") ? l.prop("checked", !0) : l.prop("checked", !1), n.buildUI(t)
                                }), z.change(function () {
                                    $(this).prop("checked") ? z.prop("checked", !0) : z.prop("checked", !1), n.buildUI(t)
                                }), r.change(function () {
                                    var e = $(this).val();
                                    r.val(e), n.buildUI(t)
                                })
                            }, this, e)
                        }, s.change(function (t) {
                            n.changeAccount($(t.target).val())
                        }), n.changeAccount(s.val())
                    }
                },
                ScheduledPayments: function (t) {
                    return function (e, a, i) {
                        var s = this,
                            n = $('[data-template="scheduledPaymentRow-template"]', e).html(),
                            o = new XE.ui.Spinner($(".payment-schedule-container"));
                        this.buildUI = function (t) {
                            var a = $('[data-ui="paymentScheduleList"]', e),
                                i = (t.scheduledPayments, $('[data-ui="payNowButton2"]', e));
                            t.disabled ? i.addClass("hidden") : i.removeClass("hidden"), i.click(function (e) {
                                $("#selectedAcctId").text() === t.number && t.isRapOrAutoPay && (e.preventDefault(), $(i.attr("data-modal")).modal("show"))
                            }), $('[data-ui="addPaymentButton"]').toggleClass("hidden", t.disabled), $('[data-ui="cancelBtn"]').toggleClass("hidden", t.viewOnly), $('[data-ui="editBtn"]').toggleClass("hidden", t.viewOnly), a.empty(), t.scheduledPayments.length ? _(t.scheduledPayments).each(function (e) {
                                e.disabled = t.disabled;
                                var i = $(_.template(n, e, {
                                    imports: {
                                        moment: moment
                                    }
                                }));
                                a.append(i)
                            }) : a.append('<tr><td colspan="6">No scheduled payments</td></tr>'), o.hide()
                        }, this.changeAccount = function (e) {
                            o.show(), t.getAccountData(a, s.buildUI, this, e)
                        }, i.change(function (t) {
                            s.changeAccount($(t.target).val())
                        }), s.changeAccount(i.val())
                    }
                },
                ScheduledPaymentsMobile: function (t) {
                    return function (e, a, i) {
                        var s = this,
                            n = $('[data-template="scheduledPaymentTile-template"]', e).html(),
                            o = new XE.ui.Spinner($(".mobile"));
                        this.buildUI = function (t) {
                            var a = $('[data-ui="paymentScheduleList"]', e),
                                i = (t.scheduledPayments, $('[data-ui="addPaymentButton"]', e));
                            t.disabled ? i.addClass("hidden") : i.removeClass("hidden"), i.click(function (e) {
                                $("#selectedAcctId").text() === t.number && t.isRapOrAutoPay && (e.preventDefault(), $(i.attr("data-modal")).modal("show"))
                            }), $('[data-ui="addPaymentButton"]', e).toggleClass("hidden", t.disabled), $('[data-ui="cancelBtn"]').toggleClass("hidden", t.viewOnly), $('[data-ui="editBtn"]').toggleClass("hidden", t.viewOnly), a.empty(), t.scheduledPayments.length ? _(t.scheduledPayments).each(function (e) {
                                e.disabled = t.disabled;
                                var i = $(_.template(n, e, {
                                    imports: {
                                        moment: moment
                                    }
                                }));
                                a.append(i)
                            }) : a.append($('<div class="scheduled-payments-tile tile">No scheduled payments</div>')), o.hide()
                        }, this.changeAccount = function (e) {
                            o.show(), t.getAccountData(a, s.buildUI, this, e)
                        }, i.change(function (t) {
                            s.changeAccount($(t.target).val())
                        }), s.changeAccount(i.val())
                    }
                },
                QuickViewMobileModal: function (t) {
                    return function (e, a, i) {
                        var s = this,
                            n = $("[data-ui-quickview-list]"),
                            o = $('[data-template="quickviewListRow-template"]', e).html();
                        this.buildUI = function (t) {
                            $('[data-ui="quick-view-modal-title"]', e).html("Bill Number #" + t.billNumber), n.empty(), _(t.quickview).each(function (t) {
                                var e = $(_.template(o, t, {
                                    imports: {
                                        moment: moment
                                    }
                                }));
                                e.appendTo(n)
                            });
                            var a = $('[data-ui="comparisonInfoTable"]', e);
                            if (a.empty(), t.comparison) {
                                var i = $(_.template($('[data-template="comparisonInformationTable-template"]').html(), t, {
                                    imports: {
                                        moment: moment
                                    }
                                }));
                                a.html(i), a.prepend("Comparison Information")
                            }
                            e.modal()
                        }, this.changeAccount = function (e) {
                            t.getAccountData(a, function (t) {
                                var e = function () {
                                    $("[data-ui-mobile-quickview-modal-trigger]").click(function () {
                                        var e = +$(this).attr("data-ui-mobile-quickview-modal-trigger");
                                        s.buildUI(_(t.statements).find({
                                            billNumber: e
                                        }))
                                    })
                                };
                                $('[data-ui="togglePayments"]').change(e),
                                    $('[data-ui="togglePaymentsMobile"]').change(e), $('[data-ui="monthSpan"]').change(e), e()
                            }, this, e)
                        }, i.change(function (t) {
                            s.changeAccount($(t.target).val())
                        }), s.changeAccount(i.val())
                    }
                }
            };
            e.exports = a
        }, {}
    ],
    7: [
        function (t, e) {
            "use strict";
            var a = t("./lineOverBarChart"),
                i = {
                    accountCallstack: [],
                    premiseCallstack: [],
                    data: {
                        accounts: {},
                        premises: {}
                    },
                    init: function (t) {
                        t.myUsage = {
                            PremiseSelector: this.PremiseSelector(this),
                            PremiseEnergyOverview: this.PremiseEnergyOverview(this),
                            GreenEnergyPrograms: this.GreenEnergyPrograms(this),
                            PremiseInformation: this.PremiseInformation(this),
                            PremiseReadsTable: this.PremiseReadsTable(this),
                            UsageChart: this.UsageChart(this)
                        }
                    },
                    getAccountData: function (t, e, a, i) {
                        if (this.data.accounts[i]) e(this.data.accounts[i]);
                        else {
                            if (0 === this.accountCallstack.length) {
                                var s = new XE.ui.Spinner($('[data-ui="spinnerContainer"]'));
                                s.show(), $.ajax({
                                    context: this,
                                    url: t,
                                    data: {
                                        account: i
                                    },
                                    success: function (t) {
                                        for (s.hide(), this.data.accounts[i] = t; this.accountCallstack.length > 0;) this.accountCallstack.shift()(t)
                                    },
                                    error: function (t, e, a) {
                                        console.error(a, e), 5 === Math.round(t.status / 100) && new XE.ui.Alert($('[data-ui="ajaxAlertContainer"]'), {
                                            message: "Error fetching data. Please refresh the page.",
                                            type: "error"
                                        })
                                    }
                                })
                            }
                            this.accountCallstack.push(e)
                        }
                    },
                    getPremiseData: function (t, e, a, i) {
                        if (this.data.premises[i]) e(this.data.premises[i]);
                        else {
                            if (0 === this.premiseCallstack.length) {
                                var s = new XE.ui.Spinner($('[data-ui="spinnerContainer"]'));
                                s.show(), $.ajax({
                                    context: this,
                                    url: t,
                                    data: {
                                        premise: i
                                    },
                                    success: function (t) {
                                        for (s.hide(), this.data.premises[i] = t; this.premiseCallstack.length > 0;) this.premiseCallstack.shift()(t)
                                    },
                                    error: function (t, e, a) {
                                        console.error(a, e), 5 === Math.round(t.status / 100) && new XE.ui.Alert($('[data-ui="ajaxAlertContainer"]'), {
                                            message: "Error fetching data. Please refresh the page.",
                                            type: "error"
                                        })
                                    }
                                })
                            }
                            this.premiseCallstack.push(e)
                        }
                        $("#downloadReportModal form").attr("data-premise", i)
                    },
                    PremiseSelector: function (t) {
                        return function (e, a, i) {
                            var s = this;
                            this.buildUI = function (t) {
                                if (t.premises && t.premises.length) {
                                    var a = $('[data-ui="premiseSelector"]', e);
                                    a.empty(), _(t.premises).each(function (t, e) {
                                        $("<option></option>").attr("value", e).text(t.addressLine1 + " " + t.addressLine2 + " " + t.addressLine3).attr("name", t.number).appendTo(a)
                                    }), a.trigger("change"), a.change(function (t) {
                                        t.complex ? $("#downloadReportModal form").attr("data-usagetype", "complex") : $("#downloadReportModal form").attr("data-usagetype", "simple"), "BUSINESS" === t.accountType || t.complex || !t.current ? ($('[data-ui="downloadReport"]').addClass("hidden"), $("#downloadReportModal form").attr("download-report", "hide")) : ($('[data-ui="downloadReport"]').removeClass("hidden"), $("#downloadReportModal form").attr("download-report", "show")), "BUSINESS" !== t.accountType && !t.complex && t.twelveMonthDataAvailable && ($('[data-ui="downloadReport"]').removeClass("hidden"), $("#downloadReportModal form").attr("download-report", "show"))
                                    })
                                }
                                $('[data-toggle="noPremises"]').toggleClass("hidden", !(!t.premises || !t.premises.length)), $('[data-toggle="premiseData"]').toggleClass("hidden", !(t.premises && t.premises.length))
                            }, this.changeAccount = function (e) {
                                t.getAccountData(a, s.buildUI, this, e), $.get("/oam/setAccountBackendSession.req", {
                                    account: e
                                })
                            }, i.change(function () {
                                s.changeAccount(i.val())
                            }), s.changeAccount(i.val())
                        }
                    },
                    PremiseEnergyOverview: function (t) {
                        return function (e, a, i) {
                            var s = this,
                                n = $('[data-ui="premiseSelector"]', ".premise-selector"),
                                o = $('[data-template="energyOverviewRow-template"]').html(),
                                l = $('[data-template="energyOverviewTableMobile-template"]').html();
                            this.buildUI = function (t) {
                                var a = $('[data-ui="overview-table-body"]', e),
                                    i = $('[data-ui="overview-container"]', e);
                                i.empty(), a.empty(), _(t.overview).each(function (t) {
                                    var e = $(_.template(o, t, {
                                        imports: {
                                            numeral: numeral
                                        }
                                    }));
                                    a.append(e);
                                    var s = $(_.template(l, t));
                                    i.append(s)
                                })
                            }, this.changeAccount = function (e) {
                                t.getAccountData(a, function (e) {
                                    if (e.premises && e.premises.length) {
                                        var i = function (e) {
                                            $.get("/oam/setPremiseBackendSession.req", {
                                                premiseId: e
                                            }), t.getPremiseData(a, function (t) {
                                                s.buildUI(t)
                                            }, this, e)
                                        };
                                        i(e.premises[n.val()].number)
                                    }
                                }, this, e)
                            }, s.changeAccount(i.val()), n.change(function () {
                                s.changeAccount(i.val())
                            })
                        }
                    },
                    GreenEnergyPrograms: function (t) {
                        return function (e, a, i) {
                            var s = this,
                                n = $('[data-ui="premiseSelector"]', ".premise-selector");
                            this.buildUI = function (t) {
                                var a = $('[data-ui="green-energy-programs"]', e),
                                    i = $("tbody", a);
                                t.greenEnergy && t.greenEnergy.length ? (a.show(), i.empty(), _(t.greenEnergy).each(function (t) {
                                    t.amountUnitString = "$" === t.amountUnitString && "$" === t.unit ? t.amount < 0 ? '-<sup class="currency">$</sup>' + -1 * t.amount : '<sup class="currency">$</sup>' + t.amount : t.amount + " " + t.unit;
                                    var e = $(_.template($('[data-template="greenEnergyRow-template"]').html(), t));
                                    i.append(e)
                                })) : a.hide()
                            }, this.changeAccount = function (e) {
                                t.getAccountData(a, function (e) {
                                    if (e.premises && e.premises.length) {
                                        var i = function (e) {
                                            t.getPremiseData(a, function (t) {
                                                s.buildUI(t)
                                            }, this, e)
                                        };
                                        i(e.premises[n.val()].number)
                                    }
                                }, this, e)
                            }, s.changeAccount(i.val()), n.change(function () {
                                s.changeAccount(i.val())
                            })
                        }
                    },
                    PremiseInformation: function (t) {
                        return function (e, a, i) {
                            var s = this,
                                n = $('[data-ui="premiseSelector"]', ".premise-selector");
                            this.buildUI = function (t) {
                                t.endDate = t.endDate || null;
                                var a = $('[data-ui="premise-information-body"]', e);
                                a.empty();
                                var i = $(_.template($('[data-template="premise-information-template"]', e).html(), t, {
                                    imports: {
                                        moment: moment
                                    }
                                }));
                                a.append(i), $('[data-ui="visitMyEnergy"]', e).toggleClass("hidden", !t.current)
                            }, this.changeAccount = function (e) {
                                t.getAccountData(a, function (e) {
                                    if (e.premises && e.premises.length) {
                                        var i = function (e) {
                                            t.getPremiseData(a, function (t) {
                                                s.buildUI(t)
                                            }, this, e)
                                        };
                                        i(e.premises[n.val()].number)
                                    }
                                }, this, e)
                            }, s.changeAccount(i.val()), n.change(function () {
                                s.changeAccount(i.val())
                            })
                        }
                    },
                    PremiseReadsTable: function (t) {
                        return function (e, a, i) {
                            var s, n = this,
                                o = $('[data-ui="premiseSelector"]', ".premise-selector"),
                                l = $('[data-ui="servicesFilter"]', e),
                                r = $('[data-ui="timeFilter"]', e);
                            this.buildUI = function (t) {
                                t.complex ? $("#downloadReportModal form").attr("data-usagetype", "complex") : $("#downloadReportModal form").attr("data-usagetype", "simple"), "BUSINESS" === t.accountType || t.complex || !t.current ? ($('[data-ui="downloadReport"]').addClass("hidden"), $("#downloadReportModal form").attr("download-report", "hide")) : ($('[data-ui="downloadReport"]').removeClass("hidden"), $("#downloadReportModal form").attr("download-report", "show")), "BUSINESS" !== t.accountType && !t.complex && t.twelveMonthDataAvailable && ($('[data-ui="downloadReport"]').removeClass("hidden"), $("#downloadReportModal form").attr("download-report", "show"));
                                var a = [];
                                t.services && t.services.length && (a = _(t.services).filter({
                                    name: l.val()
                                }).value()[0].reads), a = _(a).filter(function (t) {
                                    return moment(t.lastReadDate).isAfter(moment().subtract(+r.val() + 1, "months"), "month")
                                });
                                var i = $('[data-ui="read-table-body"]', e);
                                i.empty();
                                var s = $('[data-ui="read-table-body-mobile"]', e);
                                s.empty(), _(a).each(function (t, a) {
                                    var n = "gray";
                                    a % 2 !== 0 && (n = "white"), t.key = a, t.colorClass = n;
                                    var o = $(_.template($('[data-template="read-table-rows-template"]', e).html(), t, {
                                            imports: {
                                                moment: moment
                                            }
                                        })),
                                        l = $(_.template($('[data-template="read-table-rows-mobile-template"]', e).html(), t, {
                                            imports: {
                                                moment: moment
                                            }
                                        }));
                                    i.append(o), s.append(l);
                                    var r = $("#showDetails" + a, e),
                                        h = $("#showDetailsMobile" + a, e);
                                    _(t.details).each(function (t) {
                                        var e = "";
                                        e = "$" === t.unit ? '<div class="col-md-6"><span class="heavy">' + t.label + ": </span>" + numeral(t.amount).format("$0.00") + "</div>" : "Average Temperature" === t.label || "Cooling Degree Days" === t.label || "Heating Degree Days" === t.label ? '<div class="col-md-6"><span class="heavy">' + t.label + ": </span>" + t.amount + " " + t.unit + "</div>" : '<div class="col-md-6"><span class="heavy">' + t.label + ": </span>" + numeral(t.amount).format("0.00") + " " + t.unit + "</div>", r.append(e), h.append(e)
                                    })
                                }), $('[data-ui="show-detail-row"]', '[data-ui="read-table"]').hide(), $("i", '[data-ui="read-table"]').click(function () {
                                    $(this).toggleClass("fa-plus fa-minus");
                                    var t = $(this).attr("data-ui");
                                    $("#" + t).slideToggle()
                                })
                            }, this.changeAccount = function (e) {
                                t.getAccountData(a, function (e) {
                                    if (e.premises && e.premises.length) {
                                        var i = function (e) {
                                            t.getPremiseData(a, function (t) {
                                                l.empty(), _(t.services).each(function (t) {
                                                    l.append($('<option value="' + t.name + '">' + t.name + "</option>"))
                                                }), s = t, n.buildUI(s)
                                            }, this, e)
                                        };
                                        i(e.premises[o.val()].number)
                                    }
                                }, this, e)
                            }, i.change(function (t) {
                                n.changeAccount($(t.target).val())
                            }), l.change(function () {
                                n.buildUI(s)
                            }), r.change(function () {
                                n.buildUI(s)
                            }), n.changeAccount(i.val()), o.change(function () {
                                n.changeAccount(i.val())
                            })
                        }
                    },
                    UsageChart: function (t) {
                        return function (e, i, s, n) {
                            var o, l, r = this,
                                h = $(".controls", e),
                                c = $('[data-ui="premiseSelector"]', ".premise-selector"),
                                d = $('[data-ui="service-selector"]', h),
                                u = $('[data-ui="reportType-selector"]', h),
                                p = $('[data-ui="overlay-selector"]', h),
                                m = $('[name="overlay-radio"]:checked', e),
                                g = $('[data-ui="timeFilter"]', h),
                                f = [],
                                v = [];
                            this.buildUI = function (t, i, s) {
                                if (t.data.services && t.data.services.length) {
                                    i && (d.empty(), _(t.data.services).each(function (t, e) {
                                        var a = '<option name="' + t.name + '" value="' + e + '">' + t.name + "</option>";
                                        d.append(a)
                                    })), s && (u.empty(), n && p.empty(), _(t.data.services[d.val()].data).each(function (t, e) {
                                        var a = '<option name="' + t.name + '" value="' + e + '">' + t.name + "</option>";
                                        u.append(a), 1 === e && (a = '<option name="' + t.name + '" selected value="' + e + '">' + t.name + "</option>"), n && p.append(a)
                                    }));
                                    var h = g.val(),
                                        c = t.data.services[d.val()].data[0].series;
                                    n && (c = t.data.services[d.val()].data[u.val()].series);
                                    var y;
                                    if (n ? y = t.data.services[d.val()].data[p.val()].series : (y = t.data.services[d.val()].data[$('[name="overlay-radio"]:checked', e).val()].series, "Temperature" === t.data.services[d.val()].data[m.val()].name ? $("#downloadReportModal form").attr("data-graphtype", "temperature") : $("#downloadReportModal form").attr("data-graphtype", "charges")), 12 > h) {
                                        var b, C, w, P = 0,
                                            S = t.data.labels.slice(),
                                            x = S.indexOf(moment.utc(new Date).format("MMM")),
                                            k = 0;
                                        for (0 === x ? (P = 0, b = 1, w = -h) : 1 === x ? (k = 0, b = 2, w = -h) : 2 === x ? (k = 0, b = 3, w = -h) : 3 === x ? (k = 0, b = 4, w = -h) : 4 === x ? (k = 0, b = 6, w = h) : 5 === x ? (k = 0, b = 7, w = h) : 6 === x ? (k = 1, b = 7, w = h) : 7 === x ? (k = 2, b = 7, w = h) : 8 === x ? (k = 3, b = 7, w = h) : 9 === x ? (k = 4, b = 7, w = h) : 10 === x ? (k = 5, b = 7, w = h) : 11 === x && (k = 6, b = 7, w = h), o = S.slice(k, x + 1), o.length > h && (o = S.slice(-h)); o.length < h;) o.unshift(S.pop());
                                        l = o.indexOf(moment.utc(new Date).format("MMM"))
                                    } else o = t.data.labels, l = t.data.labels.indexOf(moment.utc(new Date).format("MMM"));
                                    f = [], v = [];
                                    var A = 0;
                                    if (12 > h)
                                        for (; h > 0 && A < c.length;)
                                            if (0 === A) {
                                                var T = c[A].data.slice(0, +moment.utc(new Date).format("M")),
                                                    M = y[A].data.slice(0, +moment.utc(new Date).format("M"));
                                                for (T.length > h && (T = T.slice(-h)); T.length < h;) T.unshift(null);
                                                for (M.length > h && (M = M.slice(-h)); M.length < h;) M.unshift(null);
                                                f.push({
                                                    label: c[A].label,
                                                    data: T
                                                }), v.push({
                                                    label: y[A].label,
                                                    data: M
                                                }), h -= f.length, A++
                                            } else f.push({
                                                label: c[A].label,
                                                data: c[A].data.slice(w + b)
                                            }), v.push({
                                                label: y[A].label,
                                                data: y[A].data.slice(w + b)
                                            }), h = 0, A++;
                                    else
                                        for (; h > 0 && A < c.length;)
                                            if (12 > h) {
                                                var B = [];
                                                if (A > 0)
                                                    for (var L = -1; L < o.length - h; L++) B.push(null);
                                                f.push({
                                                    label: c[A].label,
                                                    data: B.concat(c[A].data.slice(c[A].data.length - h + 1))
                                                }), v.push({
                                                    label: y[A].label,
                                                    data: B.concat(y[A].data.slice(y[A].data.length - h + 1))
                                                }), h -= c[A].data.length, A++
                                            } else f.push(c[A]), v.push(y[A]), h -= 0 === A ? l : 12, A++;
                                    $('[data-ui="bar-label"]', e).html(t.data.services[d.val()].data[u.val() || 0].label), $('[data-ui="line-label"]', e).html(n ? t.data.services[d.val()].data[p.val()].label : t.data.services[d.val()].data[$('[name="overlay-radio"]:checked', e).val()].label);
                                    var D;
                                    D = n ? t.data.services[d.val()].data[p.val()].name : t.data.services[d.val()].data[$('[name="overlay-radio"]:checked', e).val()].name;
                                    var R = {
                                        labels: o,
                                        datasets: [{
                                            type: "bar",
                                            data: _.map(f, function (t, e) {
                                                return t.fillColor = ["rgba(45,90,75,1)", "rgba(0,179,153,1)", "rgba(191,226,221,1)"][e % 3], t
                                            }),
                                            name: t.data.services[d.val()].data[u.val() || 0].name
                                        }, {
                                            type: "line",
                                            data: _.map(v, function (t, e) {
                                                return t.strokeColor = ["rgba(164,101,34,1)", "rgba(230,118,0,1)", "rgba(252,196,137,1)"][e % 3], t
                                            }),
                                            name: D
                                        }],
                                        currentIndex: l
                                    }, F = $('[data-ui="usage-graph"]', e);
                                    F.is(":visible") && (r.chart && r.chart.destroy(), r.chart = a.init(F, R), $(".lineoverbar-legend", e).remove(), F.after(r.chart.generateLegend())), t.complex ? n ? e.show() : e.hide() : n ? e.hide() : e.show(), $('[data-ui="graphtableContainer"]').removeClass("hidden"), $('[data-ui="noData"]').addClass("hidden")
                                } else $('[data-ui="graphtableContainer"]').addClass("hidden"), $('[data-ui="noData"]').removeClass("hidden")
                            }, this.changeAccount = function (e) {
                                t.getAccountData(i, function (e) {
                                    if (e.premises && e.premises.length) {
                                        var a = function (e) {
                                            t.getPremiseData(i, function (t) {
                                                r.buildUI(t, !0, !0), d.off(), p.off(), u.off(), g.off(), d.change(function () {
                                                    r.buildUI(t, !1, !0)
                                                }), p.change(function () {
                                                    r.buildUI(t, !1, !1)
                                                }), u.change(function () {
                                                    r.buildUI(t, !1, !1)
                                                }), g.change(function () {
                                                    r.buildUI(t, !1, !1)
                                                }), $(window).resize(function () {
                                                    r.buildUI(t, !1, !1)
                                                })
                                            }, this, e)
                                        };
                                        a(e.premises[c.val()].number)
                                    }
                                }, this, e)
                            }, r.changeAccount(s.val()), c.change(function () {
                                r.changeAccount(s.val())
                            })
                        }
                    }
                };
            e.exports = i
        }, {
            "./lineOverBarChart": 4
        }
    ],
    8: [
        function (t, e) {
            "use strict";
            var a = {
                init: function (t) {
                    t.sst = {
                        SSTForm: this.SSTForm(this)
                    }
                },
                updateConfirmation: function (t, e) {
                    e = e || {};
                    for (var a = {
                        customerType: void 0,
                        firstName: void 0,
                        middleName: void 0,
                        lastName: void 0,
                        suffix: void 0,
                        homePhone: void 0,
                        cellPhone: void 0,
                        emailAddress: void 0,
                        identityType: void 0,
                        idNumber: void 0,
                        idState: void 0,
                        authorizedCreditCheck: void 0,
                        billingAccountNumber: void 0,
                        premise: void 0,
                        startServiceDate: void 0,
                        stopServiceDate: void 0,
                        startAddress1: void 0,
                        startAddress2: void 0,
                        startCity: void 0,
                        startState: void 0,
                        startZipCode: void 0,
                        stopAddress1: void 0,
                        stopAddress2: void 0,
                        stopCity: void 0,
                        stopState: void 0,
                        stopZipCode: void 0,
                        startPropertyOwnerName: void 0,
                        startPropertyOwnerPhone: void 0,
                        stopPropertyOwnerName: void 0,
                        stopPropertyOwnerPhone: void 0,
                        mailingAddress1: void 0,
                        mailingAddress2: void 0,
                        mailingCity: void 0,
                        mailingState: void 0,
                        mailingZipCode: void 0,
                        otherResident: void 0,
                        otherResidentState: void 0,
                        otherResidentName: void 0,
                        otherResidentId: void 0,
                        otherResidentIdNumber: void 0,
                        otherResidentIdentityType: void 0,
                        otherResidentPhone: void 0,
                        forwardingAddress1: void 0,
                        forwardingAddress2: void 0,
                        forwardingCity: void 0,
                        forwardingState: void 0,
                        forwardingZipCode: void 0,
                        businessName: void 0,
                        businessPhone: void 0,
                        contactName: void 0,
                        contactJobTitle: void 0,
                        contactPhone: void 0,
                        attentionTo: void 0,
                        attentionTo1: void 0,
                        attentionTo2: void 0,
                        contact1FirstName: void 0,
                        contact1LastName: void 0,
                        contact1Position: void 0,
                        contact1WorkPhone: void 0,
                        contact1CellPhone: void 0,
                        contact1Email: void 0,
                        contact2FirstName: void 0,
                        contact2LastName: void 0,
                        contact2Position: void 0,
                        contact2WorkPhone: void 0,
                        contact2CellPhone: void 0,
                        contact2Email: void 0,
                        firstPremise: void 0,
                        RTPvalue: void 0,
                        paymentReminderEmail: void 0,
                        paymentReminderText: void 0,
                        paymentReminderNumOfDays: void 0,
                        paymentAppliedEmail: void 0,
                        paymentAppliedText: void 0,
                        outageAlertEmail: void 0,
                        outageAlertText: void 0,
                        outageAlertPhone: void 0,
                        outageAlertTimeframe: void 0
                    }, i = function (t) {
                        return t.replace(/-([a-z])/g, function (t) {
                            return t[1].toUpperCase()
                        })
                    }, s = 0; s < e.length; s++) a[i(e[s].name)] = e[s].value;
                    var n = /(\d{3})(\d{3})(\d{4})/,
                        o = /(\d{3})(\d{2})(\d{4})/,
                        l = /(\d{2})(\d{7})/,
                        r = /(\d{5})(\d{4})/;
                    a.homePhone && (a.homePhone = a.homePhone.replace(n, "$1-$2-$3")), a.cellPhone && (a.cellPhone = a.cellPhone.replace(n, "$1-$2-$3")), a.businessPhone && (a.businessPhone = a.businessPhone.replace(n, "$1-$2-$3")), a.startPropertyOwnerPhone && (a.startPropertyOwnerPhone = a.startPropertyOwnerPhone.replace(n, "$1-$2-$3")), a.stopPropertyOwnerPhone && (a.stopPropertyOwnerPhone = a.stopPropertyOwnerPhone.replace(n, "$1-$2-$3")), a.otherResidentPhone && (a.otherResidentPhone = a.otherResidentPhone.replace(n, "$1-$2-$3")), a.contactPhone && (a.contactPhone = a.contactPhone.replace(n, "$1-$2-$3")), a.contact1WorkPhone && (a.contact1WorkPhone = a.contact1WorkPhone.replace(n, "$1-$2-$3")), a.contact1CellPhone && (a.contact1CellPhone = a.contact1CellPhone.replace(n, "$1-$2-$3")), a.contact2WorkPhone && (a.contact2WorkPhone = a.contact2WorkPhone.replace(n, "$1-$2-$3")), a.contact2CellPhone && (a.contact2CellPhone = a.contact2CellPhone.replace(n, "$1-$2-$3")), "Social Security Number" === a.identityType && a.idNumber && (a.idNumber = a.idNumber.replace(o, "$1-$2-$3")), "Social Security Number" === a.otherResidentIdentityType && a.otherResidentIdNumber && (a.otherResidentIdNumber = a.otherResidentIdNumber.replace(o, "$1-$2-$3")), "Federal Tax ID" === a.otherResidentIdentityType && a.otherResidentIdNumber && (a.otherResidentIdNumber = a.otherResidentIdNumber.replace(l, "$1-$2")), a.startZipCode && 9 === a.startZipCode.length && (a.startZipCode = a.startZipCode.replace(r, "$1-$2")), a.stopZipCode && 9 === a.stopZipCode.length && (a.stopZipCode = a.stopZipCode.replace(r, "$1-$2")), a.mailingZipCode && 9 === a.mailingZipCode.length && (a.mailingZipCode = a.mailingZipCode.replace(r, "$1-$2")), a.forwardingZipCode && 9 === a.forwardingZipCode.length && (a.forwardingZipCode = a.forwardingZipCode.replace(r, "$1-$2")), _(t).each(function (t) {
                        t.$container.html(_.template(t.template, a))
                    })
                },
                SSTForm: function (t) {
                    return function (e, a) {
                        var i = this;
                        this.global = t, this.validator = new Parsley(e), $("[data-validate-step]", e).click(function (t) {
                            t.preventDefault(), t.stopPropagation();
                            var s = $(this),
                                n = void 0 !== $(t.target).data().submit;
                            if (i.validator.step = $(t.target).data().validateStep, i.validator.validate($(this).data().validateStep))
                                if (n) $(e).submit();
                                else if (void 0 !== s.attr("data-check")) {
                                    var q = "null";
                                    var t = "null";
                                    $("#billingPaymentLabel").removeClass("error");
                                    $("#reqMsgBPValidation").remove();
                                    $("#electricOutageLabel").removeClass("error");
                                    $("#reqMsgOutageValidation").remove();

                                    if ("#preferenceCheck" === s.attr("data-check")) {
                                        if (!$("#billingPaymentOption").is(":hidden") && $("#billingPaymentOption").is(":checked")) {
                                            q = "false";
                                            $('input[prefChannel="cbxPayment"]').each(function () {
                                                if ($(this).is(':checked')) {
                                                    q = "true";
                                                    return false;
                                                }
                                            })
                                        }
                                        if (!$("#electricOutageOption").is(":hidden") && $("#electricOutageOption").is(":checked")) {
                                            t = "false";
                                            $('input[prefChannel="cbxOutage"]').each(function () {
                                                if ($(this).is(':checked')) {
                                                    t = "true";
                                                    return false;
                                                }
                                            })
                                            $('input[prefChannel="radOutage"]').each(function () {
                                                if ($(this).is(':checked')) {
                                                    t = "true";
                                                    return false;
                                                }
                                            })
                                        }
                                    }


                                    if (t === "false" || q === "false") {
                                        if (q === "false") {
                                            s.removeAttr("data-target");
                                            $("#billingPaymentLabel").after('<ul id="reqMsgBPValidation" class="errors-container filled"><li class="error parsley-required">Please select your preference channel below.</li></ul>');
                                            $("#billingPaymentLabel").addClass("error");
                                            i.global.updateConfirmation(a.templates, e.serializeArray());
                                            $('html, body').scrollTop($('#billingPaymentLabel').offset().top);
                                        }
                                        if (t === "false") {
                                            s.removeAttr("data-target");
                                            $("#electricOutageLabel").after('<ul id="reqMsgOutageValidation" class="errors-container filled"><li class="error parsley-required">Please select your preference channel below.</li></ul>');
                                            $("#electricOutageLabel").addClass("error");
                                            i.global.updateConfirmation(a.templates, e.serializeArray());
                                            if (q != "false") {
                                                $('html, body').scrollTop($('#electricOutageLabel').offset().top);
                                            }
                                        }
                                    } else {
                                        if (q === "true" || q === "null") {
                                            $("#billingPaymentLabel").removeClass("error");
                                            $("#reqMsgBPValidation").remove();
                                        }
                                        if (t === "true" || t === "null") {
                                            $("#electricOutageLabel").removeClass("error");
                                            $("#reqMsgOutageValidation").remove();
                                        }
                                        $(this).tab("show");
                                        i.global.updateConfirmation(a.templates, e.serializeArray());
                                    }


                                } else if (void 0 !== s.attr("data-modal-trigger")) {
                                    var o = !0;
                                    "#forgotIDModal" === s.attr("data-modal-trigger") && $('[name="identityType"]', e).each(function () {
                                        if ($(this).prop("checked"))
                                            for (var t = $('[name="idNumber"]', e).val(), a = 0, i = t.length; i > a; a++)
                                                if (" " !== t[a]) {
                                                    o = !1;
                                                    break
                                                }
                                    }), o ? (s.removeAttr("data-target"), $(s.attr("data-modal-trigger")).modal(), i.global.updateConfirmation(a.templates, e.serializeArray())) : ($(this).tab("show"), i.global.updateConfirmation(a.templates, e.serializeArray()))
                                } else $(this).tab("show"), i.global.updateConfirmation(a.templates, e.serializeArray())
                        }), this.global.updateConfirmation(a.templates)
                    }
                }
            };
            e.exports = a
        }, {}
    ],
    9: [
        function (t, e) {
            "use strict";
            Chart.types.Bar.extend({
                name: "BarTrend",
                initialize: function (t) {
                    var e = this,
                        a = this.options;
                    this.ScaleClass = Chart.Scale.extend({
                        offsetGridLines: !0,
                        calculateBarX: function (t, e, i) {
                            var s = this.calculateBaseWidth(),
                                n = this.calculateX(i) - s / 2,
                                o = this.calculateBarWidth(t);
                            return n + o * e + e * a.barDatasetSpacing + o / 2
                        },
                        calculateBaseWidth: function () {
                            return this.calculateX(1) - this.calculateX(0) - 2 * a.barValueSpacing
                        },
                        calculateBarWidth: function (t) {
                            var e = this.calculateBaseWidth() - (t - 1) * a.barDatasetSpacing;
                            return e / t
                        },
                        draw: function () {
                            var t = this.ctx,
                                e = (this.endPoint - this.startPoint) / this.steps,
                                a = Math.round(this.xScalePaddingLeft);
                            this.display && (t.fillStyle = this.textColor, t.font = this.font, Chart.helpers.each(this.yLabels, function (i, s) {
                                var n = this.endPoint - e * s,
                                    o = Math.round(n);
                                t.textAlign = "right", t.textBaseline = "middle", this.showLabels && t.fillText(i, a - 10, n), t.beginPath(), s > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), o += Chart.helpers.aliasPixel(t.lineWidth), t.moveTo(a, o), t.lineTo(this.width, o), t.stroke(), t.closePath(), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(a - 5, o), t.lineTo(a, o), t.stroke(), t.closePath()
                            }, this), Chart.helpers.each(this.xLabels, function (e, a) {
                                var i = this.calculateX(a) + Chart.helpers.aliasPixel(this.lineWidth),
                                    s = this.calculateX(a - (this.offsetGridLines ? .5 : 0)) + Chart.helpers.aliasPixel(this.lineWidth),
                                    n = this.xLabelRotation > 0;
                                t.beginPath(), a > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), t.moveTo(s, this.endPoint), t.lineTo(s, this.startPoint - 3), t.stroke(), t.closePath(), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(s, this.endPoint), t.lineTo(s, this.endPoint + 5), t.stroke(), t.closePath(), t.save(), t.translate(i, n ? this.endPoint + 12 : this.endPoint + 8), t.rotate(-1 * Chart.helpers.radians(this.xLabelRotation)), t.font = this.font, t.textAlign = n ? "right" : "center", t.textBaseline = n ? "middle" : "top", t.fillText(e, 0, 0), t.restore()
                            }, this), this.HighlightClass = Chart.Rectangle.extend({
                                strokeWidth: 1,
                                ctx: this.ctx,
                                draw: function () {
                                    var t = this.ctx,
                                        e = this.width / 2,
                                        a = this.x - e,
                                        i = this.x + e,
                                        s = this.base - (this.base - this.y),
                                        n = this.strokeWidth / 2;
                                    this.showStroke && (a += n, i -= n, s += n, this.base -= n), t.beginPath(), t.fillStyle = this.fillColor, t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.moveTo(a, this.base), t.lineTo(a, s), t.lineTo(i, s), t.lineTo(i, this.base), t.lineTo(a, this.base), t.fill(), t.stroke(), t.fillStyle = "rgba(196,196,196,1)", t.textAlign = "center", t.font = this.font, t.fillText("CURRENT", a + e, s + 10)
                                }
                            }), this.HighlightClass.prototype.base = this.endPoint + 25, this.highlight = new this.HighlightClass({
                                width: this.calculateBarWidth(1) + 15,
                                y: 1,
                                x: this.calculateBarX(2, 0, this.currentIndex) + 8,
                                strokeColor: "rgba(196,196,196,1)",
                                fillColor: "rgba(0,0,0,0)",
                                font: '8px "museo_sans300", "Helvetica Neue", Helvetica, Arial, sans-serif'
                            }), this.highlight.draw())
                        }
                    }), this.datasets = [], this.options.showTooltips && Chart.helpers.bindEvents(this, this.options.tooltipEvents, function (t) {
                        var e = "mouseout" !== t.type ? this.getBarsAtEvent(t) : [];
                        this.eachBars(function (t) {
                            t.restore(["fillColor", "strokeColor"])
                        }), Chart.helpers.each(e, function (t) {
                            t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                        }), this.showTooltip(e)
                    }), this.BarClass = Chart.Rectangle.extend({
                        strokeWidth: this.options.barStrokeWidth,
                        showStroke: this.options.barShowStroke,
                        ctx: this.chart.ctx
                    }), Chart.helpers.each(t.datasets, function (e) {
                        var a = {
                            label: e.label || null,
                            fillColor: e.fillColor,
                            strokeColor: e.strokeColor,
                            bars: []
                        };
                        this.datasets.push(a), Chart.helpers.each(e.data, function (i, s) {
                            Chart.helpers.isNumber(i) && a.bars.push(new this.BarClass({
                                value: i,
                                label: t.labels[s],
                                datasetLabel: e.label,
                                strokeColor: e.strokeColor,
                                fillColor: e.fillColor,
                                highlightFill: e.highlightFill || e.fillColor,
                                highlightStroke: e.highlightStroke || e.strokeColor
                            }))
                        }, this)
                    }, this), this.buildScale(t.labels, t.currentIndex), this.BarClass.prototype.base = this.scale.endPoint, this.eachBars(function (t, e, a) {
                        Chart.helpers.extend(t, {
                            width: this.scale.calculateBarWidth(this.datasets.length),
                            x: this.scale.calculateBarX(this.datasets.length, a, e),
                            y: this.scale.endPoint
                        }), t.save()
                    }, this), this.scale.draw(), setTimeout(function () {
                        e.render(), e.reflow()
                    }, this.options.delay || 0)
                },
                buildScale: function (t, e) {
                    var a = this,
                        i = function () {
                            var t = [];
                            return a.eachBars(function (e) {
                                t.push(e.value)
                            }), t
                        }, s = {
                            templateString: this.options.scaleLabel,
                            height: this.chart.height,
                            width: this.chart.width,
                            ctx: this.chart.ctx,
                            textColor: this.options.scaleFontColor,
                            fontSize: this.options.scaleFontSize,
                            fontStyle: this.options.scaleFontStyle,
                            fontFamily: this.options.scaleFontFamily,
                            valuesCount: t.length,
                            beginAtZero: this.options.scaleBeginAtZero,
                            integersOnly: this.options.scaleIntegersOnly,
                            calculateYRange: function (t) {
                                var e = Chart.helpers.calculateScaleRange(i(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                                Chart.helpers.extend(this, e)
                            },
                            xLabels: t,
                            font: Chart.helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                            lineWidth: this.options.scaleLineWidth,
                            lineColor: this.options.scaleLineColor,
                            gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                            gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                            padding: this.options.showScale ? 10 : this.options.barShowStroke ? this.options.barStrokeWidth : 0,
                            showLabels: this.options.scaleShowLabels,
                            display: this.options.showScale,
                            datasetCount: this.datasets.length,
                            currentIndex: e
                        };
                    this.options.scaleOverride && Chart.helpers.extend(s, {
                        calculateYRange: Chart.helpers.noop,
                        steps: this.options.scaleSteps,
                        stepValue: this.options.scaleStepWidth,
                        min: this.options.scaleStartValue,
                        max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
                    }), this.scale = new this.ScaleClass(s)
                },
                showTooltip: function (t, e) {
                    "undefined" == typeof this.activeElements && (this.activeElements = []);
                    var a = function (t) {
                        var e = !1;
                        return t.length !== this.activeElements.length ? e = !0 : (Chart.helpers.each(t, function (t, a) {
                            t !== this.activeElements[a] && (e = !0)
                        }, this), e)
                    }.call(this, t);
                    if (a || e) {
                        if (this.activeElements = t, this.draw(), t.length > 0)
                            if (this.datasets && this.datasets.length > 0) {
                                for (var i, s, n = this.datasets.length - 1; n >= 0 && (i = this.datasets[n].points || this.datasets[n].bars || this.datasets[n].segments, s = Chart.helpers.indexOf(i, t[0]), -1 === s); n--);
                                var o = [],
                                    l = [],
                                    r = function () {
                                        var t, e, a, i, n, r = [],
                                            h = [],
                                            c = [];
                                        return Chart.helpers.each(this.datasets, function (e) {
                                            t = e.points || e.bars || e.segments, t[s] && r.push(t[s])
                                        }), Chart.helpers.each(r, function (t) {
                                            t.value && (h.push(t.x), c.push(t.y), o.push(Chart.helpers.template(this.options.multiTooltipTemplate, t)), l.push({
                                                fill: t._saved.fillColor || t.fillColor,
                                                stroke: t._saved.strokeColor || t.strokeColor
                                            }))
                                        }, this), n = Chart.helpers.min(c), a = Chart.helpers.max(c), i = Chart.helpers.min(h), e = Chart.helpers.max(h), {
                                            x: i > this.chart.width / 2 ? i : e,
                                            y: (n + a) / 2
                                        }
                                    }.call(this, s);
                                new Chart.MultiTooltip({
                                    x: r.x,
                                    y: r.y,
                                    xPadding: this.options.tooltipXPadding,
                                    yPadding: this.options.tooltipYPadding,
                                    xOffset: this.options.tooltipXOffset,
                                    fillColor: this.options.tooltipFillColor,
                                    textColor: this.options.tooltipFontColor,
                                    fontFamily: this.options.tooltipFontFamily,
                                    fontStyle: this.options.tooltipFontStyle,
                                    fontSize: this.options.tooltipFontSize,
                                    titleTextColor: this.options.tooltipTitleFontColor,
                                    titleFontFamily: this.options.tooltipTitleFontFamily,
                                    titleFontStyle: this.options.tooltipTitleFontStyle,
                                    titleFontSize: this.options.tooltipTitleFontSize,
                                    cornerRadius: this.options.tooltipCornerRadius,
                                    labels: o,
                                    legendColors: l,
                                    legendColorBackground: this.options.multiTooltipKeyBackground,
                                    title: t[0].label,
                                    chart: this.chart,
                                    ctx: this.chart.ctx
                                }).draw()
                            } else Chart.helpers.each(t, function (t) {
                                var e = t.tooltipPosition();
                                new Chart.Tooltip({
                                    x: Math.round(e.x),
                                    y: Math.round(e.y),
                                    xPadding: this.options.tooltipXPadding,
                                    yPadding: this.options.tooltipYPadding,
                                    fillColor: this.options.tooltipFillColor,
                                    textColor: this.options.tooltipFontColor,
                                    fontFamily: this.options.tooltipFontFamily,
                                    fontStyle: this.options.tooltipFontStyle,
                                    fontSize: this.options.tooltipFontSize,
                                    caretHeight: this.options.tooltipCaretSize,
                                    cornerRadius: this.options.tooltipCornerRadius,
                                    text: Chart.helpers.template(this.options.tooltipTemplate, t),
                                    chart: this.chart
                                }).draw()
                            }, this);
                        return this
                    }
                }
            });
            var a = {
                init: function (t, e, a) {
                    var i = t.get()[0].getContext("2d");
                    return a = _.defaults(a || {}, {
                        scaleBeginAtZero: !1,
                        barValueSpacing: 7.5,
                        delay: 1e3,
                        scaleLabel: "$<%=value%>",
                        multiTooltipTemplate: "$<%=value%>",
                        responsive: !0,
                        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend list-inline"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                        barShowStroke: !1,
                        scaleFontFamily: "'museo_sans300', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                        scaleShowGridLines: !1,
                        showTooltips: !0
                    }), new Chart(i).BarTrend(e, a)
                }
            };
            e.exports = a
        }, {}
    ],
    10: [
        function (t, e) {
            "use strict";
            var a = {
                init: function (t) {
                    t.ui = {
                        Alert: this.Alert(this),
                        Spinner: this.Spinner(this)
                    }
                },
                Alert: function () {
                    return function (t, e) {
                        var a = function (t) {
                            var e = $("<div></div>").addClass("alert");
                            if (t.title) {
                                var a = $("<span></span>").addClass("alert-title").html(t.title);
                                e.append(a)
                            }
                            switch (t.message && e.append($("<p></p>").html(t.message)), t.type) {
                                case "success":
                                    e.addClass("alert-success");
                                    break;
                                case "error":
                                    e.addClass("alert-warning");
                                    break;
                                default:
                                    e.addClass("alert-info")
                            }
                            return e
                        };
                        t.html(a(e)).removeClass("hidden")
                    }
                },
                Spinner: function () {
                    return function (t) {
                        var e = $("<div></div>").addClass("spinner-container").append($('<div class="spinner"></div>'));
                        return this.show = function () {
                            t.prepend(e)
                        }, this.hide = function () {
                            $(".spinner-container", t).remove()
                        }, this
                    }
                }
            };
            e.exports = a
        }, {}
    ]
}, {}, [2]);
