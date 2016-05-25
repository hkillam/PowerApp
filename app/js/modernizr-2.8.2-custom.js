window.Modernizr = function (e, t, n) {
    function r(e) {
        b.cssText = e
    }

    function o(e, t) {
        return r(x.join(e + ";") + (t || ""))
    }

    function i(e, t) {
        return typeof e === t
    }

    function a(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function c(e, t) {
        for (var r in e) {
            var o = e[r];
            if (!a(o, "-") && b[o] !== n) return "pfx" == t ? o : !0
        }
        return !1
    }

    function l(e, t, r) {
        for (var o in e) {
            var a = t[e[o]];
            if (a !== n) return r === !1 ? e[o] : i(a, "function") ? a.bind(r || t) : a
        }
        return !1
    }

    function s(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1),
            o = (e + " " + T.join(r + " ") + r).split(" ");
        return i(t, "string") || i(t, "undefined") ? c(o, t) : (o = (e + " " + C.join(r + " ") + r).split(" "), l(o, t, n))
    }

    function u() {
        m.input = function (n) {
            for (var r = 0, o = n.length; o > r; r++) z[n[r]] = n[r] in E;
            return z.list && (z.list = !!t.createElement("datalist") && !!e.HTMLDataListElement), z
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), m.inputtypes = function (e) {
            for (var r, o, i, a = 0, c = e.length; c > a; a++) E.setAttribute("type", o = e[a]), r = "text" !== E.type, r && (E.value = w, E.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(o) && E.style.WebkitAppearance !== n ? (g.appendChild(E), i = t.defaultView, r = i.getComputedStyle && "textfield" !== i.getComputedStyle(E, null).WebkitAppearance && 0 !== E.offsetHeight, g.removeChild(E)) : /^(search|tel)$/.test(o) || (r = /^(url|email)$/.test(o) ? E.checkValidity && E.checkValidity() === !1 : E.value != w)), k[e[a]] = !!r;
            return k
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }

    var d, f, p = "2.8.2",
        m = {},
        h = !0,
        g = t.documentElement,
        y = "modernizr",
        v = t.createElement(y),
        b = v.style,
        E = t.createElement("input"),
        w = ":)",
        x = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
        S = "Webkit Moz O ms",
        T = S.split(" "),
        C = S.toLowerCase().split(" "),
        M = {
            svg: "http://www.w3.org/2000/svg"
        },
        j = {},
        k = {},
        z = {},
        P = [],
        N = P.slice,
        A = function (e, n, r, o) {
            var i, a, c, l, s = t.createElement("div"),
                u = t.body,
                d = u || t.createElement("body");
            if (parseInt(r, 10))
                for (; r--;) c = t.createElement("div"), c.id = o ? o[r] : y + (r + 1), s.appendChild(c);
            return i = ["&#173;", '<style id="s', y, '">', e, "</style>"].join(""), s.id = y, (u ? s : d).innerHTML += i, d.appendChild(s), u || (d.style.background = "", d.style.overflow = "hidden", l = g.style.overflow, g.style.overflow = "hidden", g.appendChild(d)), a = n(s, e), u ? s.parentNode.removeChild(s) : (d.parentNode.removeChild(d), g.style.overflow = l), !!a
        },
        $ = function (t) {
            var n = e.matchMedia || e.msMatchMedia;
            if (n) return n(t) && n(t).matches || !1;
            var r;
            return A("@media " + t + " { #" + y + " { position: absolute; } }", function (t) {
                r = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
            }), r
        },
        F = function () {
            function e(e, o) {
                o = o || t.createElement(r[e] || "div"), e = "on" + e;
                var a = e in o;
                return a || (o.setAttribute || (o = t.createElement("div")), o.setAttribute && o.removeAttribute && (o.setAttribute(e, ""), a = i(o[e], "function"), i(o[e], "undefined") || (o[e] = n), o.removeAttribute(e))), o = null, a
            }

            var r = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return e
        }(),
        L = {}.hasOwnProperty;
    f = i(L, "undefined") || i(L.call, "undefined") ? function (e, t) {
        return t in e && i(e.constructor.prototype[t], "undefined")
    } : function (e, t) {
        return L.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function (e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError;
        var n = N.call(arguments, 1),
            r = function () {
                if (this instanceof r) {
                    var o = function () {
                    };
                    o.prototype = t.prototype;
                    var i = new o,
                        a = t.apply(i, n.concat(N.call(arguments)));
                    return Object(a) === a ? a : i
                }
                return t.apply(e, n.concat(N.call(arguments)))
            };
        return r
    }), j.touch = function () {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : A(["@media (", x.join("touch-enabled),("), y, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (e) {
            n = 9 === e.offsetTop
        }), n
    }, j.geolocation = function () {
        return "geolocation" in navigator
    }, j.hashchange = function () {
        return F("hashchange", e) && (t.documentMode === n || t.documentMode > 7)
    }, j.history = function () {
        return !!e.history && !!history.pushState
    }, j.rgba = function () {
        return r("background-color:rgba(150,255,150,.5)"), a(b.backgroundColor, "rgba")
    }, j.multiplebgs = function () {
        return r("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(b.background)
    }, j.backgroundsize = function () {
        return s("backgroundSize")
    }, j.borderradius = function () {
        return s("borderRadius")
    }, j.boxshadow = function () {
        return s("boxShadow")
    }, j.textshadow = function () {
        return "" === t.createElement("div").style.textShadow
    }, j.opacity = function () {
        return o("opacity:.55"), /^0.55$/.test(b.opacity)
    }, j.cssanimations = function () {
        return s("animationName")
    }, j.cssgradients = function () {
        var e = "background-image:",
            t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            n = "linear-gradient(left top,#9f9, white);";
        return r((e + "-webkit- ".split(" ").join(t + e) + x.join(n + e)).slice(0, -e.length)), a(b.backgroundImage, "gradient")
    }, j.csstransforms = function () {
        return !!s("transform")
    }, j.csstransforms3d = function () {
        var e = !!s("perspective");
        return e && "webkitPerspective" in g.style && A("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (t) {
            e = 9 === t.offsetLeft && 3 === t.offsetHeight
        }), e
    }, j.csstransitions = function () {
        return s("transition")
    }, j.generatedcontent = function () {
        var e;
        return A(["#", y, "{font:0/0 a}#", y, ':after{content:"', w, '";visibility:hidden;font:3px/1 a}'].join(""), function (t) {
            e = t.offsetHeight >= 3
        }), e
    }, j.video = function () {
        var e = t.createElement("video"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (r) {
        }
        return n
    }, j.audio = function () {
        var e = t.createElement("audio"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (r) {
        }
        return n
    }, j.svg = function () {
        return !!t.createElementNS && !!t.createElementNS(M.svg, "svg").createSVGRect
    }, j.inlinesvg = function () {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == M.svg
    };
    for (var O in j) f(j, O) && (d = O.toLowerCase(), m[d] = j[O](), P.push((m[d] ? "" : "no-") + d));
    return m.input || u(), m.addTest = function (e, t) {
        if ("object" == typeof e)
            for (var r in e) f(e, r) && m.addTest(r, e[r]);
        else {
            if (e = e.toLowerCase(), m[e] !== n) return m;
            t = "function" == typeof t ? t() : t, "undefined" != typeof h && h && (g.className += " " + (t ? "" : "no-") + e), m[e] = t
        }
        return m
    }, r(""), v = E = null,
        function (e, t) {
            function n(e, t) {
                var n = e.createElement("p"),
                    r = e.getElementsByTagName("head")[0] || e.documentElement;
                return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
            }

            function r() {
                var e = v.elements;
                return "string" == typeof e ? e.split(" ") : e
            }

            function o(e) {
                var t = y[e[h]];
                return t || (t = {}, g++, e[h] = g, y[g] = t), t
            }

            function i(e, n, r) {
                if (n || (n = t), u) return n.createElement(e);
                r || (r = o(n));
                var i;
                return i = r.cache[e] ? r.cache[e].cloneNode() : m.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !i.canHaveChildren || p.test(e) || i.tagUrn ? i : r.frag.appendChild(i)
            }

            function a(e, n) {
                if (e || (e = t), u) return e.createDocumentFragment();
                n = n || o(e);
                for (var i = n.frag.cloneNode(), a = 0, c = r(), l = c.length; l > a; a++) i.createElement(c[a]);
                return i
            }

            function c(e, t) {
                t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
                    return v.shivMethods ? i(n, e, t) : t.createElem(n)
                }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-]+/g, function (e) {
                        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                    }) + ");return n}")(v, t.frag)
            }

            function l(e) {
                e || (e = t);
                var r = o(e);
                return v.shivCSS && !s && !r.hasCSS && (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), u || c(e, r), e
            }

            var s, u, d = "3.7.0",
                f = e.html5 || {},
                p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                m = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                h = "_html5shiv",
                g = 0,
                y = {};
            !function () {
                try {
                    var e = t.createElement("a");
                    e.innerHTML = "<xyz></xyz>", s = "hidden" in e, u = 1 == e.childNodes.length || function () {
                            t.createElement("a");
                            var e = t.createDocumentFragment();
                            return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                        }()
                } catch (n) {
                    s = !0, u = !0
                }
            }();
            var v = {
                elements: f.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                version: d,
                shivCSS: f.shivCSS !== !1,
                supportsUnknownElements: u,
                shivMethods: f.shivMethods !== !1,
                type: "default",
                shivDocument: l,
                createElement: i,
                createDocumentFragment: a
            };
            e.html5 = v, l(t)
        }(this, t), m._version = p, m._prefixes = x, m._domPrefixes = C, m._cssomPrefixes = T, m.mq = $, m.hasEvent = F, m.testProp = function (e) {
        return c([e])
    }, m.testAllProps = s, m.testStyles = A, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + P.join(" ") : ""), m
}(this, this.document),
    function (e, t, n) {
        function r(e) {
            return "[object Function]" == g.call(e)
        }

        function o(e) {
            return "string" == typeof e
        }

        function i() {
        }

        function a(e) {
            return !e || "loaded" == e || "complete" == e || "uninitialized" == e
        }

        function c() {
            var e = y.shift();
            v = 1, e ? e.t ? m(function () {
                ("c" == e.t ? f.injectCss : f.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
            }, 0) : (e(), c()) : v = 0
        }

        function l(e, n, r, o, i, l, s) {
            function u(t) {
                if (!p && a(d.readyState) && (b.r = p = 1, !v && c(), d.onload = d.onreadystatechange = null, t)) {
                    "img" != e && m(function () {
                        w.removeChild(d)
                    }, 50);
                    for (var r in M[n]) M[n].hasOwnProperty(r) && M[n][r].onload()
                }
            }

            var s = s || f.errorTimeout,
                d = t.createElement(e),
                p = 0,
                g = 0,
                b = {
                    t: r,
                    s: n,
                    e: i,
                    a: l,
                    x: s
                };
            1 === M[n] && (g = 1, M[n] = []), "object" == e ? d.data = n : (d.src = n, d.type = e), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function () {
                u.call(this, g)
            }, y.splice(o, 0, b), "img" != e && (g || 2 === M[n] ? (w.insertBefore(d, E ? null : h), m(u, s)) : M[n].push(d))
        }

        function s(e, t, n, r, i) {
            return v = 0, t = t || "j", o(e) ? l("c" == t ? S : x, e, t, this.i++, n, r, i) : (y.splice(this.i++, 0, e), 1 == y.length && c()), this
        }

        function u() {
            var e = f;
            return e.loader = {
                load: s,
                i: 0
            }, e
        }

        var d, f, p = t.documentElement,
            m = e.setTimeout,
            h = t.getElementsByTagName("script")[0],
            g = {}.toString,
            y = [],
            v = 0,
            b = "MozAppearance" in p.style,
            E = b && !!t.createRange().compareNode,
            w = E ? p : h.parentNode,
            p = e.opera && "[object Opera]" == g.call(e.opera),
            p = !!t.attachEvent && !p,
            x = b ? "object" : p ? "script" : "img",
            S = p ? "script" : x,
            T = Array.isArray || function (e) {
                    return "[object Array]" == g.call(e)
                },
            C = [],
            M = {},
            j = {
                timeout: function (e, t) {
                    return t.length && (e.timeout = t[0]), e
                }
            };
        f = function (e) {
            function t(e) {
                var t, n, r, e = e.split("!"),
                    o = C.length,
                    i = e.pop(),
                    a = e.length,
                    i = {
                        url: i,
                        origUrl: i,
                        prefixes: e
                    };
                for (n = 0; a > n; n++) r = e[n].split("="), (t = j[r.shift()]) && (i = t(i, r));
                for (n = 0; o > n; n++) i = C[n](i);
                return i
            }

            function a(e, o, i, a, c) {
                var l = t(e),
                    s = l.autoCallback;
                l.url.split(".").pop().split("?").shift(), l.bypass || (o && (o = r(o) ? o : o[e] || o[a] || o[e.split("/").pop().split("?")[0]]), l.instead ? l.instead(e, o, i, a, c) : (M[l.url] ? l.noexec = !0 : M[l.url] = 1, i.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : n, l.noexec, l.attrs, l.timeout), (r(o) || r(s)) && i.load(function () {
                    u(), o && o(l.origUrl, c, a), s && s(l.origUrl, c, a), M[l.url] = 2
                })))
            }

            function c(e, t) {
                function n(e, n) {
                    if (e) {
                        if (o(e)) n || (d = function () {
                            var e = [].slice.call(arguments);
                            f.apply(this, e), p()
                        }), a(e, d, t, 0, s);
                        else if (Object(e) === e)
                            for (l in c = function () {
                                var t, n = 0;
                                for (t in e) e.hasOwnProperty(t) && n++;
                                return n
                            }(), e) e.hasOwnProperty(l) && (!n && !--c && (r(d) ? d = function () {
                                var e = [].slice.call(arguments);
                                f.apply(this, e), p()
                            } : d[l] = function (e) {
                                return function () {
                                    var t = [].slice.call(arguments);
                                    e && e.apply(this, t), p()
                                }
                            }(f[l])), a(e[l], d, t, l, s))
                    } else !n && p()
                }

                var c, l, s = !!e.test,
                    u = e.load || e.both,
                    d = e.callback || i,
                    f = d,
                    p = e.complete || i;
                n(s ? e.yep : e.nope, !!u), u && n(u)
            }

            var l, s, d = this.yepnope.loader;
            if (o(e)) a(e, 0, d, 0);
            else if (T(e))
                for (l = 0; l < e.length; l++) s = e[l], o(s) ? a(s, 0, d, 0) : T(s) ? f(s) : Object(s) === s && c(s, d);
            else Object(e) === e && c(e, d)
        }, f.addPrefix = function (e, t) {
            j[e] = t
        }, f.addFilter = function (e) {
            C.push(e)
        }, f.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", d = function () {
            t.removeEventListener("DOMContentLoaded", d, 0), t.readyState = "complete"
        }, 0)), e.yepnope = u(), e.yepnope.executeStack = c, e.yepnope.injectJs = function (e, n, r, o, l, s) {
            var u, d, p = t.createElement("script"),
                o = o || f.errorTimeout;
            p.src = e;
            for (d in r) p.setAttribute(d, r[d]);
            n = s ? c : n || i, p.onreadystatechange = p.onload = function () {
                !u && a(p.readyState) && (u = 1, n(), p.onload = p.onreadystatechange = null)
            }, m(function () {
                u || (u = 1, n(1))
            }, o), l ? p.onload() : h.parentNode.insertBefore(p, h)
        }, e.yepnope.injectCss = function (e, n, r, o, a, l) {
            var s, o = t.createElement("link"),
                n = l ? c : n || i;
            o.href = e, o.rel = "stylesheet", o.type = "text/css";
            for (s in r) o.setAttribute(s, r[s]);
            a || (h.parentNode.insertBefore(o, h), m(n, 0))
        }
    }(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, Modernizr.addTest("boxsizing", function () {
    return Modernizr.testAllProps("boxSizing") && (void 0 === document.documentMode || document.documentMode > 7)
}), Modernizr.addTest("overflowscrolling", function () {
    return Modernizr.testAllProps("overflowScrolling")
}), Modernizr.addTest("csspositionsticky", function () {
    var e = "position:",
        t = "sticky",
        n = document.createElement("modernizr"),
        r = n.style;
    return r.cssText = e + Modernizr._prefixes.join(t + ";" + e).slice(0, -e.length), -1 !== r.position.indexOf(t)
}), Modernizr.addTest("cssremunit", function () {
    var e = document.createElement("div");
    try {
        e.style.fontSize = "1rem"
    } catch (t) {
    }
    return /rem/.test(e.style.fontSize)
}), Modernizr.addTest("placeholder", function () {
    return "placeholder" in (Modernizr.input || document.createElement("input")) && "placeholder" in (Modernizr.textarea || document.createElement("textarea"))
});
