/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */
!function (a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document)throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
    function c(a) {
        var b = a.length, c = eb.type(a);
        return "function" === c || eb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    function d(a, b, c) {
        if (eb.isFunction(b))return eb.grep(a, function (a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType)return eb.grep(a, function (a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (mb.test(b))return eb.filter(b, a, c);
            b = eb.filter(b, a)
        }
        return eb.grep(a, function (a) {
            return eb.inArray(a, b) >= 0 !== c
        })
    }

    function e(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function f(a) {
        var b = ub[a] = {};
        return eb.each(a.match(tb) || [], function (a, c) {
            b[c] = !0
        }), b
    }

    function g() {
        ob.addEventListener ? (ob.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (ob.detachEvent("onreadystatechange", h), a.detachEvent("onload", h))
    }

    function h() {
        (ob.addEventListener || "load" === event.type || "complete" === ob.readyState) && (g(), eb.ready())
    }

    function i(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(zb, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : yb.test(c) ? eb.parseJSON(c) : c
                } catch (e) {
                }
                eb.data(a, b, c)
            } else c = void 0
        }
        return c
    }

    function j(a) {
        var b;
        for (b in a)if (("data" !== b || !eb.isEmptyObject(a[b])) && "toJSON" !== b)return !1;
        return !0
    }

    function k(a, b, c, d) {
        if (eb.acceptData(a)) {
            var e, f, g = eb.expando, h = a.nodeType, i = h ? eb.cache : a, j = h ? a[g] : a[g] && g;
            if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b)return j || (j = h ? a[g] = W.pop() || eb.guid++ : g), i[j] || (i[j] = h ? {} : {toJSON: eb.noop}), ("object" == typeof b || "function" == typeof b) && (d ? i[j] = eb.extend(i[j], b) : i[j].data = eb.extend(i[j].data, b)), f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[eb.camelCase(b)] = c), "string" == typeof b ? (e = f[b], null == e && (e = f[eb.camelCase(b)])) : e = f, e
        }
    }

    function l(a, b, c) {
        if (eb.acceptData(a)) {
            var d, e, f = a.nodeType, g = f ? eb.cache : a, h = f ? a[eb.expando] : eb.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    eb.isArray(b) ? b = b.concat(eb.map(b, eb.camelCase)) : b in d ? b = [b] : (b = eb.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    for (; e--;)delete d[b[e]];
                    if (c ? !j(d) : !eb.isEmptyObject(d))return
                }
                (c || (delete g[h].data, j(g[h]))) && (f ? eb.cleanData([a], !0) : cb.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
            }
        }
    }

    function m() {
        return !0
    }

    function n() {
        return !1
    }

    function o() {
        try {
            return ob.activeElement
        } catch (a) {
        }
    }

    function p(a) {
        var b = Kb.split("|"), c = a.createDocumentFragment();
        if (c.createElement)for (; b.length;)c.createElement(b.pop());
        return c
    }

    function q(a, b) {
        var c, d, e = 0, f = typeof a.getElementsByTagName !== xb ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== xb ? a.querySelectorAll(b || "*") : void 0;
        if (!f)for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)!b || eb.nodeName(d, b) ? f.push(d) : eb.merge(f, q(d, b));
        return void 0 === b || b && eb.nodeName(a, b) ? eb.merge([a], f) : f
    }

    function r(a) {
        Eb.test(a.type) && (a.defaultChecked = a.checked)
    }

    function s(a, b) {
        return eb.nodeName(a, "table") && eb.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function t(a) {
        return a.type = (null !== eb.find.attr(a, "type")) + "/" + a.type, a
    }

    function u(a) {
        var b = Vb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function v(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++)eb._data(c, "globalEval", !b || eb._data(b[d], "globalEval"))
    }

    function w(a, b) {
        if (1 === b.nodeType && eb.hasData(a)) {
            var c, d, e, f = eb._data(a), g = eb._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)for (d = 0, e = h[c].length; e > d; d++)eb.event.add(b, c, h[c][d])
            }
            g.data && (g.data = eb.extend({}, g.data))
        }
    }

    function x(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !cb.noCloneEvent && b[eb.expando]) {
                e = eb._data(b);
                for (d in e.events)eb.removeEvent(b, d, e.handle);
                b.removeAttribute(eb.expando)
            }
            "script" === c && b.text !== a.text ? (t(b).text = a.text, u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), cb.html5Clone && a.innerHTML && !eb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Eb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }

    function y(b, c) {
        var d, e = eb(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : eb.css(e[0], "display");
        return e.detach(), f
    }

    function z(a) {
        var b = ob, c = _b[a];
        return c || (c = y(a, b), "none" !== c && c || ($b = ($b || eb("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = ($b[0].contentWindow || $b[0].contentDocument).document, b.write(), b.close(), c = y(a, b), $b.detach()), _b[a] = c), c
    }

    function A(a, b) {
        return {
            get: function () {
                var c = a();
                if (null != c)return c ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    function B(a, b) {
        if (b in a)return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = mc.length; e--;)if (b = mc[e] + c, b in a)return b;
        return d
    }

    function C(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)d = a[g], d.style && (f[g] = eb._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Cb(d) && (f[g] = eb._data(d, "olddisplay", z(d.nodeName)))) : (e = Cb(d), (c && "none" !== c || !e) && eb._data(d, "olddisplay", e ? c : eb.css(d, "display"))));
        for (g = 0; h > g; g++)d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function D(a, b, c) {
        var d = ic.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function E(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)"margin" === c && (g += eb.css(a, c + Bb[f], !0, e)), d ? ("content" === c && (g -= eb.css(a, "padding" + Bb[f], !0, e)), "margin" !== c && (g -= eb.css(a, "border" + Bb[f] + "Width", !0, e))) : (g += eb.css(a, "padding" + Bb[f], !0, e), "padding" !== c && (g += eb.css(a, "border" + Bb[f] + "Width", !0, e)));
        return g
    }

    function F(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = ac(a), g = cb.boxSizing && "border-box" === eb.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = bc(a, b, f), (0 > e || null == e) && (e = a.style[b]), dc.test(e))return e;
            d = g && (cb.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function G(a, b, c, d, e) {
        return new G.prototype.init(a, b, c, d, e)
    }

    function H() {
        return setTimeout(function () {
            nc = void 0
        }), nc = eb.now()
    }

    function I(a, b) {
        var c, d = {height: a}, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b)c = Bb[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function J(a, b, c) {
        for (var d, e = (tc[b] || []).concat(tc["*"]), f = 0, g = e.length; g > f; f++)if (d = e[f].call(c, b, a))return d
    }

    function K(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = {}, n = a.style, o = a.nodeType && Cb(a), p = eb._data(a, "fxshow");
        c.queue || (h = eb._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
            h.unqueued || i()
        }), h.unqueued++, l.always(function () {
            l.always(function () {
                h.unqueued--, eb.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = eb.css(a, "display"), k = "none" === j ? eb._data(a, "olddisplay") || z(a.nodeName) : j, "inline" === k && "none" === eb.css(a, "float") && (cb.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", cb.shrinkWrapBlocks() || l.always(function () {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
        }));
        for (d in b)if (e = b[d], pc.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                if ("show" !== e || !p || void 0 === p[d])continue;
                o = !0
            }
            m[d] = p && p[d] || eb.style(a, d)
        } else j = void 0;
        if (eb.isEmptyObject(m))"inline" === ("none" === j ? z(a.nodeName) : j) && (n.display = j); else {
            p ? "hidden" in p && (o = p.hidden) : p = eb._data(a, "fxshow", {}), f && (p.hidden = !o), o ? eb(a).show() : l.done(function () {
                eb(a).hide()
            }), l.done(function () {
                var b;
                eb._removeData(a, "fxshow");
                for (b in m)eb.style(a, b, m[b])
            });
            for (d in m)g = J(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function L(a, b) {
        var c, d, e, f, g;
        for (c in a)if (d = eb.camelCase(c), e = b[d], f = a[c], eb.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = eb.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f)c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }

    function M(a, b, c) {
        var d, e, f = 0, g = sc.length, h = eb.Deferred().always(function () {
            delete i.elem
        }), i = function () {
            if (e)return !1;
            for (var b = nc || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        }, j = h.promise({
            elem: a,
            props: eb.extend({}, b),
            opts: eb.extend(!0, {specialEasing: {}}, c),
            originalProperties: b,
            originalOptions: c,
            startTime: nc || H(),
            duration: c.duration,
            tweens: [],
            createTween: function (b, c) {
                var d = eb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d
            },
            stop: function (b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e)return this;
                for (e = !0; d > c; c++)j.tweens[c].run(1);
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
            }
        }), k = j.props;
        for (L(k, j.opts.specialEasing); g > f; f++)if (d = sc[f].call(j, a, k, j.opts))return d;
        return eb.map(k, J, j), eb.isFunction(j.opts.start) && j.opts.start.call(a, j), eb.fx.timer(eb.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function N(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(tb) || [];
            if (eb.isFunction(c))for (; d = f[e++];)"+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function O(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, eb.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
            }), i
        }

        var f = {}, g = a === Rc;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function P(a, b) {
        var c, d, e = eb.ajaxSettings.flatOptions || {};
        for (d in b)void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && eb.extend(!0, a, c), a
    }

    function Q(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0];)i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)for (g in h)if (h[g] && h[g].test(e)) {
            i.unshift(g);
            break
        }
        if (i[0] in c)f = i[0]; else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function R(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1])for (g in a.converters)j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())if ("*" === f)f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)for (e in j)if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break
            }
            if (g !== !0)if (g && a["throws"])b = g(b); else try {
                b = g(b)
            } catch (l) {
                return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
            }
        }
        return {state: "success", data: b}
    }

    function S(a, b, c, d) {
        var e;
        if (eb.isArray(b))eb.each(b, function (b, e) {
            c || Vc.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        }); else if (c || "object" !== eb.type(b))d(a, b); else for (e in b)S(a + "[" + e + "]", b[e], c, d)
    }

    function T() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function U() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function V(a) {
        return eb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    var W = [], X = W.slice, Y = W.concat, Z = W.push, $ = W.indexOf, _ = {}, ab = _.toString, bb = _.hasOwnProperty, cb = {}, db = "1.11.1", eb = function (a, b) {
        return new eb.fn.init(a, b)
    }, fb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, gb = /^-ms-/, hb = /-([\da-z])/gi, ib = function (a, b) {
        return b.toUpperCase()
    };
    eb.fn = eb.prototype = {
        jquery: db, constructor: eb, selector: "", length: 0, toArray: function () {
            return X.call(this)
        }, get: function (a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : X.call(this)
        }, pushStack: function (a) {
            var b = eb.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        }, each: function (a, b) {
            return eb.each(this, a, b)
        }, map: function (a) {
            return this.pushStack(eb.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, slice: function () {
            return this.pushStack(X.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: Z, sort: W.sort, splice: W.splice
    }, eb.extend = eb.fn.extend = function () {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || eb.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)if (null != (e = arguments[h]))for (d in e)a = g[d], c = e[d], g !== c && (j && c && (eb.isPlainObject(c) || (b = eb.isArray(c))) ? (b ? (b = !1, f = a && eb.isArray(a) ? a : []) : f = a && eb.isPlainObject(a) ? a : {}, g[d] = eb.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }, eb.extend({
        expando: "jQuery" + (db + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
            throw new Error(a)
        }, noop: function () {
        }, isFunction: function (a) {
            return "function" === eb.type(a)
        }, isArray: Array.isArray || function (a) {
            return "array" === eb.type(a)
        }, isWindow: function (a) {
            return null != a && a == a.window
        }, isNumeric: function (a) {
            return !eb.isArray(a) && a - parseFloat(a) >= 0
        }, isEmptyObject: function (a) {
            var b;
            for (b in a)return !1;
            return !0
        }, isPlainObject: function (a) {
            var b;
            if (!a || "object" !== eb.type(a) || a.nodeType || eb.isWindow(a))return !1;
            try {
                if (a.constructor && !bb.call(a, "constructor") && !bb.call(a.constructor.prototype, "isPrototypeOf"))return !1
            } catch (c) {
                return !1
            }
            if (cb.ownLast)for (b in a)return bb.call(a, b);
            for (b in a);
            return void 0 === b || bb.call(a, b)
        }, type: function (a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[ab.call(a)] || "object" : typeof a
        }, globalEval: function (b) {
            b && eb.trim(b) && (a.execScript || function (b) {
                a.eval.call(a, b)
            })(b)
        }, camelCase: function (a) {
            return a.replace(gb, "ms-").replace(hb, ib)
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }, each: function (a, b, d) {
            var e, f = 0, g = a.length, h = c(a);
            if (d) {
                if (h)for (; g > f && (e = b.apply(a[f], d), e !== !1); f++); else for (f in a)if (e = b.apply(a[f], d), e === !1)break
            } else if (h)for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++); else for (f in a)if (e = b.call(a[f], f, a[f]), e === !1)break;
            return a
        }, trim: function (a) {
            return null == a ? "" : (a + "").replace(fb, "")
        }, makeArray: function (a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? eb.merge(d, "string" == typeof a ? [a] : a) : Z.call(d, a)), d
        }, inArray: function (a, b, c) {
            var d;
            if (b) {
                if ($)return $.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)if (c in b && b[c] === a)return c
            }
            return -1
        }, merge: function (a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d;)a[e++] = b[d++];
            if (c !== c)for (; void 0 !== b[d];)a[e++] = b[d++];
            return a.length = e, a
        }, grep: function (a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        }, map: function (a, b, d) {
            var e, f = 0, g = a.length, h = c(a), i = [];
            if (h)for (; g > f; f++)e = b(a[f], f, d), null != e && i.push(e); else for (f in a)e = b(a[f], f, d), null != e && i.push(e);
            return Y.apply([], i)
        }, guid: 1, proxy: function (a, b) {
            var c, d, e;
            return "string" == typeof b && (e = a[b], b = a, a = e), eb.isFunction(a) ? (c = X.call(arguments, 2), d = function () {
                return a.apply(b || this, c.concat(X.call(arguments)))
            }, d.guid = a.guid = a.guid || eb.guid++, d) : void 0
        }, now: function () {
            return +new Date
        }, support: cb
    }), eb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
        _["[object " + b + "]"] = b.toLowerCase()
    });
    var jb = /*!
     * Sizzle CSS Selector Engine v1.10.19
     * http://sizzlejs.com/
     *
     * Copyright 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2014-04-18
     */
        function (a) {
            function b(a, b, c, d) {
                var e, f, g, h, i, j, l, n, o, p;
                if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a)return c;
                if (1 !== (h = b.nodeType) && 9 !== h)return [];
                if (I && !d) {
                    if (e = sb.exec(a))if (g = e[1]) {
                        if (9 === h) {
                            if (f = b.getElementById(g), !f || !f.parentNode)return c;
                            if (f.id === g)return c.push(f), c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g)return c.push(f), c
                    } else {
                        if (e[2])return _.apply(c, b.getElementsByTagName(a)), c;
                        if ((g = e[3]) && v.getElementsByClassName && b.getElementsByClassName)return _.apply(c, b.getElementsByClassName(g)), c
                    }
                    if (v.qsa && (!J || !J.test(a))) {
                        if (n = l = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                            for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ub, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;)j[i] = n + m(j[i]);
                            o = tb.test(a) && k(b.parentNode) || b, p = j.join(",")
                        }
                        if (p)try {
                            return _.apply(c, o.querySelectorAll(p)), c
                        } catch (q) {
                        } finally {
                            l || b.removeAttribute("id")
                        }
                    }
                }
                return B(a.replace(ib, "$1"), b, c, d)
            }

            function c() {
                function a(c, d) {
                    return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
                }

                var b = [];
                return a
            }

            function d(a) {
                return a[N] = !0, a
            }

            function e(a) {
                var b = G.createElement("div");
                try {
                    return !!a(b)
                } catch (c) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }

            function f(a, b) {
                for (var c = a.split("|"), d = a.length; d--;)w.attrHandle[c[d]] = b
            }

            function g(a, b) {
                var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
                if (d)return d;
                if (c)for (; c = c.nextSibling;)if (c === b)return -1;
                return a ? 1 : -1
            }

            function h(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return "input" === c && b.type === a
                }
            }

            function i(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }

            function j(a) {
                return d(function (b) {
                    return b = +b, d(function (c, d) {
                        for (var e, f = a([], c.length, b), g = f.length; g--;)c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }

            function k(a) {
                return a && typeof a.getElementsByTagName !== V && a
            }

            function l() {
            }

            function m(a) {
                for (var b = 0, c = a.length, d = ""; c > b; b++)d += a[b].value;
                return d
            }

            function n(a, b, c) {
                var d = b.dir, e = c && "parentNode" === d, f = Q++;
                return b.first ? function (b, c, f) {
                    for (; b = b[d];)if (1 === b.nodeType || e)return a(b, c, f)
                } : function (b, c, g) {
                    var h, i, j = [P, f];
                    if (g) {
                        for (; b = b[d];)if ((1 === b.nodeType || e) && a(b, c, g))return !0
                    } else for (; b = b[d];)if (1 === b.nodeType || e) {
                        if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f)return j[2] = h[2];
                        if (i[d] = j, j[2] = a(b, c, g))return !0
                    }
                }
            }

            function o(a) {
                return a.length > 1 ? function (b, c, d) {
                    for (var e = a.length; e--;)if (!a[e](b, c, d))return !1;
                    return !0
                } : a[0]
            }

            function p(a, c, d) {
                for (var e = 0, f = c.length; f > e; e++)b(a, c[e], d);
                return d
            }

            function q(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
                return g
            }

            function r(a, b, c, e, f, g) {
                return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function (d, g, h, i) {
                    var j, k, l, m = [], n = [], o = g.length, r = d || p(b || "*", h.nodeType ? [h] : h, []), s = !a || !d && b ? r : q(r, m, a, h, i), t = c ? f || (d ? a : o || e) ? [] : g : s;
                    if (c && c(s, t, h, i), e)for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                    if (d) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                                f(null, t = [], j, i)
                            }
                            for (k = t.length; k--;)(l = t[k]) && (j = f ? bb.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                        }
                    } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : _.apply(g, t)
                })
            }

            function s(a) {
                for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function (a) {
                    return a === b
                }, g, !0), j = n(function (a) {
                    return bb.call(b, a) > -1
                }, g, !0), k = [function (a, c, d) {
                    return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                }]; e > h; h++)if (c = w.relative[a[h].type])k = [n(o(k), c)]; else {
                    if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                        for (d = ++h; e > d && !w.relative[a[d].type]; d++);
                        return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({value: " " === a[h - 2].type ? "*" : ""})).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
                    }
                    k.push(c)
                }
                return o(k)
            }

            function t(a, c) {
                var e = c.length > 0, f = a.length > 0, g = function (d, g, h, i, j) {
                    var k, l, m, n = 0, o = "0", p = d && [], r = [], s = C, t = d || f && w.find.TAG("*", j), u = P += null == s ? 1 : Math.random() || .1, v = t.length;
                    for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0; m = a[l++];)if (m(k, g, h)) {
                                i.push(k);
                                break
                            }
                            j && (P = u)
                        }
                        e && ((k = !m && k) && n--, d && p.push(k))
                    }
                    if (n += o, e && o !== n) {
                        for (l = 0; m = c[l++];)m(p, r, g, h);
                        if (d) {
                            if (n > 0)for (; o--;)p[o] || r[o] || (r[o] = Z.call(i));
                            r = q(r)
                        }
                        _.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                    }
                    return j && (P = u, C = s), p
                };
                return e ? d(g) : g
            }

            var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date, O = a.document, P = 0, Q = 0, R = c(), S = c(), T = c(), U = function (a, b) {
                return a === b && (E = !0), 0
            }, V = "undefined", W = 1 << 31, X = {}.hasOwnProperty, Y = [], Z = Y.pop, $ = Y.push, _ = Y.push, ab = Y.slice, bb = Y.indexOf || function (a) {
                    for (var b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
                    return -1
                }, cb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", db = "[\\x20\\t\\r\\n\\f]", eb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", fb = eb.replace("w", "w#"), gb = "\\[" + db + "*(" + eb + ")(?:" + db + "*([*^$|!~]?=)" + db + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + fb + "))|)" + db + "*\\]", hb = ":(" + eb + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + gb + ")*)|.*)\\)|)", ib = new RegExp("^" + db + "+|((?:^|[^\\\\])(?:\\\\.)*)" + db + "+$", "g"), jb = new RegExp("^" + db + "*," + db + "*"), kb = new RegExp("^" + db + "*([>+~]|" + db + ")" + db + "*"), lb = new RegExp("=" + db + "*([^\\]'\"]*?)" + db + "*\\]", "g"), mb = new RegExp(hb), nb = new RegExp("^" + fb + "$"), ob = {
                ID: new RegExp("^#(" + eb + ")"),
                CLASS: new RegExp("^\\.(" + eb + ")"),
                TAG: new RegExp("^(" + eb.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + gb),
                PSEUDO: new RegExp("^" + hb),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + db + "*(even|odd|(([+-]|)(\\d*)n|)" + db + "*(?:([+-]|)" + db + "*(\\d+)|))" + db + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + cb + ")$", "i"),
                needsContext: new RegExp("^" + db + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + db + "*((?:-\\d)?\\d*)" + db + "*\\)|)(?=[^-]|$)", "i")
            }, pb = /^(?:input|select|textarea|button)$/i, qb = /^h\d$/i, rb = /^[^{]+\{\s*\[native \w/, sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, tb = /[+~]/, ub = /'|\\/g, vb = new RegExp("\\\\([\\da-f]{1,6}" + db + "?|(" + db + ")|.)", "ig"), wb = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            };
            try {
                _.apply(Y = ab.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType
            } catch (xb) {
                _ = {
                    apply: Y.length ? function (a, b) {
                        $.apply(a, ab.call(b))
                    } : function (a, b) {
                        for (var c = a.length, d = 0; a[c++] = b[d++];);
                        a.length = c - 1
                    }
                }
            }
            v = b.support = {}, y = b.isXML = function (a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return b ? "HTML" !== b.nodeName : !1
            }, F = b.setDocument = function (a) {
                var b, c = a ? a.ownerDocument || a : O, d = c.defaultView;
                return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !y(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function () {
                    F()
                }, !1) : d.attachEvent && d.attachEvent("onunload", function () {
                    F()
                })), v.attributes = e(function (a) {
                    return a.className = "i", !a.getAttribute("className")
                }), v.getElementsByTagName = e(function (a) {
                    return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
                }), v.getElementsByClassName = rb.test(c.getElementsByClassName) && e(function (a) {
                        return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                    }), v.getById = e(function (a) {
                    return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length
                }), v.getById ? (w.find.ID = function (a, b) {
                    if (typeof b.getElementById !== V && I) {
                        var c = b.getElementById(a);
                        return c && c.parentNode ? [c] : []
                    }
                }, w.filter.ID = function (a) {
                    var b = a.replace(vb, wb);
                    return function (a) {
                        return a.getAttribute("id") === b
                    }
                }) : (delete w.find.ID, w.filter.ID = function (a) {
                    var b = a.replace(vb, wb);
                    return function (a) {
                        var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }), w.find.TAG = v.getElementsByTagName ? function (a, b) {
                    return typeof b.getElementsByTagName !== V ? b.getElementsByTagName(a) : void 0
                } : function (a, b) {
                    var c, d = [], e = 0, f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (; c = f[e++];)1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, w.find.CLASS = v.getElementsByClassName && function (a, b) {
                        return typeof b.getElementsByClassName !== V && I ? b.getElementsByClassName(a) : void 0
                    }, K = [], J = [], (v.qsa = rb.test(c.querySelectorAll)) && (e(function (a) {
                    a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && J.push("[*^$]=" + db + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + db + "*(?:value|" + cb + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
                }), e(function (a) {
                    var b = c.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + db + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
                })), (v.matchesSelector = rb.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function (a) {
                    v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", hb)
                }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = rb.test(H.compareDocumentPosition), M = b || rb.test(H.contains) ? function (a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function (a, b) {
                    if (b)for (; b = b.parentNode;)if (b === a)return !0;
                    return !1
                }, U = b ? function (a, b) {
                    if (a === b)return E = !0, 0;
                    var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !v.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0 : 4 & d ? -1 : 1)
                } : function (a, b) {
                    if (a === b)return E = !0, 0;
                    var d, e = 0, f = a.parentNode, h = b.parentNode, i = [a], j = [b];
                    if (!f || !h)return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0;
                    if (f === h)return g(a, b);
                    for (d = a; d = d.parentNode;)i.unshift(d);
                    for (d = b; d = d.parentNode;)j.unshift(d);
                    for (; i[e] === j[e];)e++;
                    return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
                }, c) : G
            }, b.matches = function (a, c) {
                return b(a, null, null, c)
            }, b.matchesSelector = function (a, c) {
                if ((a.ownerDocument || a) !== G && F(a), c = c.replace(lb, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c)))try {
                    var d = L.call(a, c);
                    if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType)return d
                } catch (e) {
                }
                return b(c, G, null, [a]).length > 0
            }, b.contains = function (a, b) {
                return (a.ownerDocument || a) !== G && F(a), M(a, b)
            }, b.attr = function (a, b) {
                (a.ownerDocument || a) !== G && F(a);
                var c = w.attrHandle[b.toLowerCase()], d = c && X.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
                return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }, b.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, b.uniqueSort = function (a) {
                var b, c = [], d = 0, e = 0;
                if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                    for (; b = a[e++];)b === a[e] && (d = c.push(e));
                    for (; d--;)a.splice(c[d], 1)
                }
                return D = null, a
            }, x = b.getText = function (a) {
                var b, c = "", d = 0, e = a.nodeType;
                if (e) {
                    if (1 === e || 9 === e || 11 === e) {
                        if ("string" == typeof a.textContent)return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling)c += x(a)
                    } else if (3 === e || 4 === e)return a.nodeValue
                } else for (; b = a[d++];)c += x(b);
                return c
            }, w = b.selectors = {
                cacheLength: 50,
                createPseudo: d,
                match: ob,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {dir: "parentNode", first: !0},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: !0},
                    "~": {dir: "previousSibling"}
                },
                preFilter: {
                    ATTR: function (a) {
                        return a[1] = a[1].replace(vb, wb), a[3] = (a[3] || a[4] || a[5] || "").replace(vb, wb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    }, CHILD: function (a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                    }, PSEUDO: function (a) {
                        var b, c = !a[6] && a[2];
                        return ob.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && mb.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (a) {
                        var b = a.replace(vb, wb).toLowerCase();
                        return "*" === a ? function () {
                            return !0
                        } : function (a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    }, CLASS: function (a) {
                        var b = R[a + " "];
                        return b || (b = new RegExp("(^|" + db + ")" + a + "(" + db + "|$)")) && R(a, function (a) {
                                return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
                            })
                    }, ATTR: function (a, c, d) {
                        return function (e) {
                            var f = b.attr(e, a);
                            return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                        }
                    }, CHILD: function (a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                        return 1 === d && 0 === e ? function (a) {
                            return !!a.parentNode
                        } : function (b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                            if (q) {
                                if (f) {
                                    for (; p;) {
                                        for (l = b; l = l[p];)if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [P, n, m];
                                        break
                                    }
                                } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P)m = j[1]; else for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                                return m -= e, m === d || m % d === 0 && m / d >= 0
                            }
                        }
                    }, PSEUDO: function (a, c) {
                        var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                        return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
                            for (var d, e = f(a, c), g = e.length; g--;)d = bb.call(a, e[g]), a[d] = !(b[d] = e[g])
                        }) : function (a) {
                            return f(a, 0, e)
                        }) : f
                    }
                },
                pseudos: {
                    not: d(function (a) {
                        var b = [], c = [], e = A(a.replace(ib, "$1"));
                        return e[N] ? d(function (a, b, c, d) {
                            for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function (a, d, f) {
                            return b[0] = a, e(b, null, f, c), !c.pop()
                        }
                    }), has: d(function (a) {
                        return function (c) {
                            return b(a, c).length > 0
                        }
                    }), contains: d(function (a) {
                        return function (b) {
                            return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                        }
                    }), lang: d(function (a) {
                        return nb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(vb, wb).toLowerCase(), function (b) {
                            var c;
                            do if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                    }), target: function (b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    }, root: function (a) {
                        return a === H
                    }, focus: function (a) {
                        return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                    }, enabled: function (a) {
                        return a.disabled === !1
                    }, disabled: function (a) {
                        return a.disabled === !0
                    }, checked: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                    }, selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    }, empty: function (a) {
                        for (a = a.firstChild; a; a = a.nextSibling)if (a.nodeType < 6)return !1;
                        return !0
                    }, parent: function (a) {
                        return !w.pseudos.empty(a)
                    }, header: function (a) {
                        return qb.test(a.nodeName)
                    }, input: function (a) {
                        return pb.test(a.nodeName)
                    }, button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    }, text: function (a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                    }, first: j(function () {
                        return [0]
                    }), last: j(function (a, b) {
                        return [b - 1]
                    }), eq: j(function (a, b, c) {
                        return [0 > c ? c + b : c]
                    }), even: j(function (a, b) {
                        for (var c = 0; b > c; c += 2)a.push(c);
                        return a
                    }), odd: j(function (a, b) {
                        for (var c = 1; b > c; c += 2)a.push(c);
                        return a
                    }), lt: j(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; --d >= 0;)a.push(d);
                        return a
                    }), gt: j(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; ++d < b;)a.push(d);
                        return a
                    })
                }
            }, w.pseudos.nth = w.pseudos.eq;
            for (u in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})w.pseudos[u] = h(u);
            for (u in{submit: !0, reset: !0})w.pseudos[u] = i(u);
            return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function (a, c) {
                var d, e, f, g, h, i, j, k = S[a + " "];
                if (k)return c ? 0 : k.slice(0);
                for (h = a, i = [], j = w.preFilter; h;) {
                    (!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = kb.exec(h)) && (d = e.shift(), f.push({
                        value: d,
                        type: e[0].replace(ib, " ")
                    }), h = h.slice(d.length));
                    for (g in w.filter)!(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                        value: d,
                        type: g,
                        matches: e
                    }), h = h.slice(d.length));
                    if (!d)break
                }
                return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
            }, A = b.compile = function (a, b) {
                var c, d = [], e = [], f = T[a + " "];
                if (!f) {
                    for (b || (b = z(a)), c = b.length; c--;)f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                    f = T(a, t(e, d)), f.selector = a
                }
                return f
            }, B = b.select = function (a, b, c, d) {
                var e, f, g, h, i, j = "function" == typeof a && a, l = !d && z(a = j.selector || a);
                if (c = c || [], 1 === l.length) {
                    if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                        if (b = (w.find.ID(g.matches[0].replace(vb, wb), b) || [])[0], !b)return c;
                        j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                    }
                    for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)if ((i = w.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
                        if (f.splice(e, 1), a = d.length && m(f), !a)return _.apply(c, d), c;
                        break
                    }
                }
                return (j || A(a, l))(d, b, !I, c, tb.test(a) && k(b.parentNode) || b), c
            }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function (a) {
                return 1 & a.compareDocumentPosition(G.createElement("div"))
            }), e(function (a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || f("type|href|height|width", function (a, b, c) {
                return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), v.attributes && e(function (a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || f("value", function (a, b, c) {
                return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
            }), e(function (a) {
                return null == a.getAttribute("disabled")
            }) || f(cb, function (a, b, c) {
                var d;
                return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), b
        }(a);
    eb.find = jb, eb.expr = jb.selectors, eb.expr[":"] = eb.expr.pseudos, eb.unique = jb.uniqueSort, eb.text = jb.getText, eb.isXMLDoc = jb.isXML, eb.contains = jb.contains;
    var kb = eb.expr.match.needsContext, lb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, mb = /^.[^:#\[\.,]*$/;
    eb.filter = function (a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? eb.find.matchesSelector(d, a) ? [d] : [] : eb.find.matches(a, eb.grep(b, function (a) {
            return 1 === a.nodeType
        }))
    }, eb.fn.extend({
        find: function (a) {
            var b, c = [], d = this, e = d.length;
            if ("string" != typeof a)return this.pushStack(eb(a).filter(function () {
                for (b = 0; e > b; b++)if (eb.contains(d[b], this))return !0
            }));
            for (b = 0; e > b; b++)eb.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? eb.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
        }, filter: function (a) {
            return this.pushStack(d(this, a || [], !1))
        }, not: function (a) {
            return this.pushStack(d(this, a || [], !0))
        }, is: function (a) {
            return !!d(this, "string" == typeof a && kb.test(a) ? eb(a) : a || [], !1).length
        }
    });
    var nb, ob = a.document, pb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, qb = eb.fn.init = function (a, b) {
        var c, d;
        if (!a)return this;
        if ("string" == typeof a) {
            if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : pb.exec(a), !c || !c[1] && b)return !b || b.jquery ? (b || nb).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof eb ? b[0] : b, eb.merge(this, eb.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : ob, !0)), lb.test(c[1]) && eb.isPlainObject(b))for (c in b)eb.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this
            }
            if (d = ob.getElementById(c[2]), d && d.parentNode) {
                if (d.id !== c[2])return nb.find(a);
                this.length = 1, this[0] = d
            }
            return this.context = ob, this.selector = a, this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : eb.isFunction(a) ? "undefined" != typeof nb.ready ? nb.ready(a) : a(eb) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), eb.makeArray(a, this))
    };
    qb.prototype = eb.fn, nb = eb(ob);
    var rb = /^(?:parents|prev(?:Until|All))/, sb = {children: !0, contents: !0, next: !0, prev: !0};
    eb.extend({
        dir: function (a, b, c) {
            for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !eb(e).is(c));)1 === e.nodeType && d.push(e), e = e[b];
            return d
        }, sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), eb.fn.extend({
        has: function (a) {
            var b, c = eb(a, this), d = c.length;
            return this.filter(function () {
                for (b = 0; d > b; b++)if (eb.contains(this, c[b]))return !0
            })
        }, closest: function (a, b) {
            for (var c, d = 0, e = this.length, f = [], g = kb.test(a) || "string" != typeof a ? eb(a, b || this.context) : 0; e > d; d++)for (c = this[d]; c && c !== b; c = c.parentNode)if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && eb.find.matchesSelector(c, a))) {
                f.push(c);
                break
            }
            return this.pushStack(f.length > 1 ? eb.unique(f) : f)
        }, index: function (a) {
            return a ? "string" == typeof a ? eb.inArray(this[0], eb(a)) : eb.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (a, b) {
            return this.pushStack(eb.unique(eb.merge(this.get(), eb(a, b))))
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), eb.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        }, parents: function (a) {
            return eb.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return eb.dir(a, "parentNode", c)
        }, next: function (a) {
            return e(a, "nextSibling")
        }, prev: function (a) {
            return e(a, "previousSibling")
        }, nextAll: function (a) {
            return eb.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return eb.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return eb.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return eb.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return eb.sibling((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return eb.sibling(a.firstChild)
        }, contents: function (a) {
            return eb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : eb.merge([], a.childNodes)
        }
    }, function (a, b) {
        eb.fn[a] = function (c, d) {
            var e = eb.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = eb.filter(d, e)), this.length > 1 && (sb[a] || (e = eb.unique(e)), rb.test(a) && (e = e.reverse())), this.pushStack(e)
        }
    });
    var tb = /\S+/g, ub = {};
    eb.Callbacks = function (a) {
        a = "string" == typeof a ? ub[a] || f(a) : eb.extend({}, a);
        var b, c, d, e, g, h, i = [], j = !a.once && [], k = function (f) {
            for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && e > g; g++)if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                c = !1;
                break
            }
            b = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable())
        }, l = {
            add: function () {
                if (i) {
                    var d = i.length;
                    !function f(b) {
                        eb.each(b, function (b, c) {
                            var d = eb.type(c);
                            "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
                        })
                    }(arguments), b ? e = i.length : c && (h = d, k(c))
                }
                return this
            }, remove: function () {
                return i && eb.each(arguments, function (a, c) {
                    for (var d; (d = eb.inArray(c, i, d)) > -1;)i.splice(d, 1), b && (e >= d && e--, g >= d && g--)
                }), this
            }, has: function (a) {
                return a ? eb.inArray(a, i) > -1 : !(!i || !i.length)
            }, empty: function () {
                return i = [], e = 0, this
            }, disable: function () {
                return i = j = c = void 0, this
            }, disabled: function () {
                return !i
            }, lock: function () {
                return j = void 0, c || l.disable(), this
            }, locked: function () {
                return !j
            }, fireWith: function (a, c) {
                return !i || d && !j || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? j.push(c) : k(c)), this
            }, fire: function () {
                return l.fireWith(this, arguments), this
            }, fired: function () {
                return !!d
            }
        };
        return l
    }, eb.extend({
        Deferred: function (a) {
            var b = [["resolve", "done", eb.Callbacks("once memory"), "resolved"], ["reject", "fail", eb.Callbacks("once memory"), "rejected"], ["notify", "progress", eb.Callbacks("memory")]], c = "pending", d = {
                state: function () {
                    return c
                }, always: function () {
                    return e.done(arguments).fail(arguments), this
                }, then: function () {
                    var a = arguments;
                    return eb.Deferred(function (c) {
                        eb.each(b, function (b, f) {
                            var g = eb.isFunction(a[b]) && a[b];
                            e[f[1]](function () {
                                var a = g && g.apply(this, arguments);
                                a && eb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                            })
                        }), a = null
                    }).promise()
                }, promise: function (a) {
                    return null != a ? eb.extend(a, d) : d
                }
            }, e = {};
            return d.pipe = d.then, eb.each(b, function (a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function () {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        }, when: function (a) {
            var b, c, d, e = 0, f = X.call(arguments), g = f.length, h = 1 !== g || a && eb.isFunction(a.promise) ? g : 0, i = 1 === h ? a : eb.Deferred(), j = function (a, c, d) {
                return function (e) {
                    c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                }
            };
            if (g > 1)for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++)f[e] && eb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    });
    var vb;
    eb.fn.ready = function (a) {
        return eb.ready.promise().done(a), this
    }, eb.extend({
        isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? eb.readyWait++ : eb.ready(!0)
        }, ready: function (a) {
            if (a === !0 ? !--eb.readyWait : !eb.isReady) {
                if (!ob.body)return setTimeout(eb.ready);
                eb.isReady = !0, a !== !0 && --eb.readyWait > 0 || (vb.resolveWith(ob, [eb]), eb.fn.triggerHandler && (eb(ob).triggerHandler("ready"), eb(ob).off("ready")))
            }
        }
    }), eb.ready.promise = function (b) {
        if (!vb)if (vb = eb.Deferred(), "complete" === ob.readyState)setTimeout(eb.ready); else if (ob.addEventListener)ob.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1); else {
            ob.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
            var c = !1;
            try {
                c = null == a.frameElement && ob.documentElement
            } catch (d) {
            }
            c && c.doScroll && !function e() {
                if (!eb.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    g(), eb.ready()
                }
            }()
        }
        return vb.promise(b)
    };
    var wb, xb = "undefined";
    for (wb in eb(cb))break;
    cb.ownLast = "0" !== wb, cb.inlineBlockNeedsLayout = !1, eb(function () {
        var a, b, c, d;
        c = ob.getElementsByTagName("body")[0], c && c.style && (b = ob.createElement("div"), d = ob.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xb && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", cb.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
    }), function () {
        var a = ob.createElement("div");
        if (null == cb.deleteExpando) {
            cb.deleteExpando = !0;
            try {
                delete a.test
            } catch (b) {
                cb.deleteExpando = !1
            }
        }
        a = null
    }(), eb.acceptData = function (a) {
        var b = eb.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    };
    var yb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, zb = /([A-Z])/g;
    eb.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (a) {
            return a = a.nodeType ? eb.cache[a[eb.expando]] : a[eb.expando], !!a && !j(a)
        },
        data: function (a, b, c) {
            return k(a, b, c)
        },
        removeData: function (a, b) {
            return l(a, b)
        },
        _data: function (a, b, c) {
            return k(a, b, c, !0)
        },
        _removeData: function (a, b) {
            return l(a, b, !0)
        }
    }), eb.fn.extend({
        data: function (a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = eb.data(f), 1 === f.nodeType && !eb._data(f, "parsedAttrs"))) {
                    for (c = g.length; c--;)g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = eb.camelCase(d.slice(5)), i(f, d, e[d])));
                    eb._data(f, "parsedAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function () {
                eb.data(this, a)
            }) : arguments.length > 1 ? this.each(function () {
                eb.data(this, a, b)
            }) : f ? i(f, a, eb.data(f, a)) : void 0
        }, removeData: function (a) {
            return this.each(function () {
                eb.removeData(this, a)
            })
        }
    }), eb.extend({
        queue: function (a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = eb._data(a, b), c && (!d || eb.isArray(c) ? d = eb._data(a, b, eb.makeArray(c)) : d.push(c)), d || []) : void 0
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = eb.queue(a, b), d = c.length, e = c.shift(), f = eb._queueHooks(a, b), g = function () {
                eb.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        }, _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return eb._data(a, c) || eb._data(a, c, {
                    empty: eb.Callbacks("once memory").add(function () {
                        eb._removeData(a, b + "queue"), eb._removeData(a, c)
                    })
                })
        }
    }), eb.fn.extend({
        queue: function (a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? eb.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                var c = eb.queue(this, a, b);
                eb._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && eb.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                eb.dequeue(this, a)
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, b) {
            var c, d = 1, e = eb.Deferred(), f = this, g = this.length, h = function () {
                --d || e.resolveWith(f, [f])
            };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;)c = eb._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var Ab = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Bb = ["Top", "Right", "Bottom", "Left"], Cb = function (a, b) {
        return a = b || a, "none" === eb.css(a, "display") || !eb.contains(a.ownerDocument, a)
    }, Db = eb.access = function (a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === eb.type(c)) {
            e = !0;
            for (h in c)eb.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, eb.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
                return j.call(eb(a), c)
            })), b))for (; i > h; h++)b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }, Eb = /^(?:checkbox|radio)$/i;
    !function () {
        var a = ob.createElement("input"), b = ob.createElement("div"), c = ob.createDocumentFragment();
        if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", cb.leadingWhitespace = 3 === b.firstChild.nodeType, cb.tbody = !b.getElementsByTagName("tbody").length, cb.htmlSerialize = !!b.getElementsByTagName("link").length, cb.html5Clone = "<:nav></:nav>" !== ob.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), cb.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", cb.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", cb.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, cb.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () {
                cb.noCloneEvent = !1
            }), b.cloneNode(!0).click()), null == cb.deleteExpando) {
            cb.deleteExpando = !0;
            try {
                delete b.test
            } catch (d) {
                cb.deleteExpando = !1
            }
        }
    }(), function () {
        var b, c, d = ob.createElement("div");
        for (b in{
            submit: !0,
            change: !0,
            focusin: !0
        })c = "on" + b, (cb[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), cb[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null
    }();
    var Fb = /^(?:input|select|textarea)$/i, Gb = /^key/, Hb = /^(?:mouse|pointer|contextmenu)|click/, Ib = /^(?:focusinfocus|focusoutblur)$/, Jb = /^([^.]*)(?:\.(.+)|)$/;
    eb.event = {
        global: {},
        add: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = eb._data(a);
            if (q) {
                for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = eb.guid++), (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function (a) {
                    return typeof eb === xb || a && eb.event.triggered === a.type ? void 0 : eb.event.dispatch.apply(k.elem, arguments)
                }, k.elem = a), b = (b || "").match(tb) || [""], h = b.length; h--;)f = Jb.exec(b[h]) || [], n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = eb.event.special[n] || {}, n = (e ? j.delegateType : j.bindType) || n, j = eb.event.special[n] || {}, l = eb.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && eb.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), eb.event.global[n] = !0);
                a = null
            }
        },
        remove: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = eb.hasData(a) && eb._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(tb) || [""], j = b.length; j--;)if (h = Jb.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    for (l = eb.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;)g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || eb.removeEvent(a, n, q.handle), delete k[n])
                } else for (n in k)eb.event.remove(a, n + b[j], c, d, !0);
                eb.isEmptyObject(k) && (delete q.handle, eb._removeData(a, "events"))
            }
        },
        trigger: function (b, c, d, e) {
            var f, g, h, i, j, k, l, m = [d || ob], n = bb.call(b, "type") ? b.type : b, o = bb.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = k = d = d || ob, 3 !== d.nodeType && 8 !== d.nodeType && !Ib.test(n + eb.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[eb.expando] ? b : new eb.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : eb.makeArray(c, [b]), j = eb.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
                if (!e && !j.noBubble && !eb.isWindow(d)) {
                    for (i = j.delegateType || n, Ib.test(i + n) || (h = h.parentNode); h; h = h.parentNode)m.push(h), k = h;
                    k === (d.ownerDocument || ob) && m.push(k.defaultView || k.parentWindow || a)
                }
                for (l = 0; (h = m[l++]) && !b.isPropagationStopped();)b.type = l > 1 ? i : j.bindType || n, f = (eb._data(h, "events") || {})[b.type] && eb._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && eb.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && eb.acceptData(d) && g && d[n] && !eb.isWindow(d)) {
                    k = d[g], k && (d[g] = null), eb.event.triggered = n;
                    try {
                        d[n]()
                    } catch (p) {
                    }
                    eb.event.triggered = void 0, k && (d[g] = k)
                }
                return b.result
            }
        },
        dispatch: function (a) {
            a = eb.event.fix(a);
            var b, c, d, e, f, g = [], h = X.call(arguments), i = (eb._data(this, "events") || {})[a.type] || [], j = eb.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = eb.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped();)for (a.currentTarget = e.elem, f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(d.namespace)) && (a.handleObj = d, a.data = d.data, c = ((eb.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result
            }
        },
        handlers: function (a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))for (; i != this; i = i.parentNode || this)if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                for (e = [], f = 0; h > f; f++)d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? eb(c, this).index(i) >= 0 : eb.find(c, this, null, [i]).length), e[c] && e.push(d);
                e.length && g.push({elem: i, handlers: e})
            }
            return h < b.length && g.push({elem: this, handlers: b.slice(h)}), g
        },
        fix: function (a) {
            if (a[eb.expando])return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Hb.test(e) ? this.mouseHooks : Gb.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new eb.Event(f), b = d.length; b--;)c = d[b], a[c] = f[c];
            return a.target || (a.target = f.srcElement || ob), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, b) {
                var c, d, e, f = b.button, g = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || ob, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== o() && this.focus)try {
                        return this.focus(), !1
                    } catch (a) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === o() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return eb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (a) {
                    return eb.nodeName(a.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = eb.extend(new eb.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
            d ? eb.event.trigger(e, null, b) : eb.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, eb.removeEvent = ob.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === xb && (a[d] = null), a.detachEvent(d, c))
    }, eb.Event = function (a, b) {
        return this instanceof eb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? m : n) : this.type = a, b && eb.extend(this, b), this.timeStamp = a && a.timeStamp || eb.now(), void(this[eb.expando] = !0)) : new eb.Event(a, b)
    }, eb.Event.prototype = {
        isDefaultPrevented: n,
        isPropagationStopped: n,
        isImmediatePropagationStopped: n,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = m, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = m, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = m, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, eb.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (a, b) {
        eb.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !eb.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), cb.submitBubbles || (eb.event.special.submit = {
        setup: function () {
            return eb.nodeName(this, "form") ? !1 : void eb.event.add(this, "click._submit keypress._submit", function (a) {
                var b = a.target, c = eb.nodeName(b, "input") || eb.nodeName(b, "button") ? b.form : void 0;
                c && !eb._data(c, "submitBubbles") && (eb.event.add(c, "submit._submit", function (a) {
                    a._submit_bubble = !0
                }), eb._data(c, "submitBubbles", !0))
            })
        }, postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && eb.event.simulate("submit", this.parentNode, a, !0))
        }, teardown: function () {
            return eb.nodeName(this, "form") ? !1 : void eb.event.remove(this, "._submit")
        }
    }), cb.changeBubbles || (eb.event.special.change = {
        setup: function () {
            return Fb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (eb.event.add(this, "propertychange._change", function (a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), eb.event.add(this, "click._change", function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), eb.event.simulate("change", this, a, !0)
            })), !1) : void eb.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                Fb.test(b.nodeName) && !eb._data(b, "changeBubbles") && (eb.event.add(b, "change._change", function (a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || eb.event.simulate("change", this.parentNode, a, !0)
                }), eb._data(b, "changeBubbles", !0))
            })
        }, handle: function (a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return eb.event.remove(this, "._change"), !Fb.test(this.nodeName)
        }
    }), cb.focusinBubbles || eb.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = function (a) {
            eb.event.simulate(b, a.target, eb.event.fix(a), !0)
        };
        eb.event.special[b] = {
            setup: function () {
                var d = this.ownerDocument || this, e = eb._data(d, b);
                e || d.addEventListener(a, c, !0), eb._data(d, b, (e || 0) + 1)
            }, teardown: function () {
                var d = this.ownerDocument || this, e = eb._data(d, b) - 1;
                e ? eb._data(d, b, e) : (d.removeEventListener(a, c, !0), eb._removeData(d, b))
            }
        }
    }), eb.fn.extend({
        on: function (a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (f in a)this.on(f, b, c, a[f], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)d = n; else if (!d)return this;
            return 1 === e && (g = d, d = function (a) {
                return eb().off(a), g.apply(this, arguments)
            }, d.guid = g.guid || (g.guid = eb.guid++)), this.each(function () {
                eb.event.add(this, a, d, c, b)
            })
        }, one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        }, off: function (a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj)return d = a.handleObj, eb(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a)this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = n), this.each(function () {
                eb.event.remove(this, a, c, b)
            })
        }, trigger: function (a, b) {
            return this.each(function () {
                eb.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            var c = this[0];
            return c ? eb.event.trigger(a, b, c, !0) : void 0
        }
    });
    var Kb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Lb = / jQuery\d+="(?:null|\d+)"/g, Mb = new RegExp("<(?:" + Kb + ")[\\s/>]", "i"), Nb = /^\s+/, Ob = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Pb = /<([\w:]+)/, Qb = /<tbody/i, Rb = /<|&#?\w+;/, Sb = /<(?:script|style|link)/i, Tb = /checked\s*(?:[^=]|=\s*.checked.)/i, Ub = /^$|\/(?:java|ecma)script/i, Vb = /^true\/(.*)/, Wb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Xb = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: cb.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, Yb = p(ob), Zb = Yb.appendChild(ob.createElement("div"));
    Xb.optgroup = Xb.option, Xb.tbody = Xb.tfoot = Xb.colgroup = Xb.caption = Xb.thead, Xb.th = Xb.td, eb.extend({
        clone: function (a, b, c) {
            var d, e, f, g, h, i = eb.contains(a.ownerDocument, a);
            if (cb.html5Clone || eb.isXMLDoc(a) || !Mb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Zb.innerHTML = a.outerHTML, Zb.removeChild(f = Zb.firstChild)), !(cb.noCloneEvent && cb.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || eb.isXMLDoc(a)))for (d = q(f), h = q(a), g = 0; null != (e = h[g]); ++g)d[g] && x(e, d[g]);
            if (b)if (c)for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++)w(e, d[g]); else w(a, f);
            return d = q(f, "script"), d.length > 0 && v(d, !i && q(a, "script")), d = h = e = null, f
        }, buildFragment: function (a, b, c, d) {
            for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++)if (f = a[o], f || 0 === f)if ("object" === eb.type(f))eb.merge(n, f.nodeType ? [f] : f); else if (Rb.test(f)) {
                for (h = h || m.appendChild(b.createElement("div")), i = (Pb.exec(f) || ["", ""])[1].toLowerCase(), k = Xb[i] || Xb._default, h.innerHTML = k[1] + f.replace(Ob, "<$1></$2>") + k[2], e = k[0]; e--;)h = h.lastChild;
                if (!cb.leadingWhitespace && Nb.test(f) && n.push(b.createTextNode(Nb.exec(f)[0])), !cb.tbody)for (f = "table" !== i || Qb.test(f) ? "<table>" !== k[1] || Qb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;)eb.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                for (eb.merge(n, h.childNodes), h.textContent = ""; h.firstChild;)h.removeChild(h.firstChild);
                h = m.lastChild
            } else n.push(b.createTextNode(f));
            for (h && m.removeChild(h), cb.appendChecked || eb.grep(q(n, "input"), r), o = 0; f = n[o++];)if ((!d || -1 === eb.inArray(f, d)) && (g = eb.contains(f.ownerDocument, f), h = q(m.appendChild(f), "script"), g && v(h), c))for (e = 0; f = h[e++];)Ub.test(f.type || "") && c.push(f);
            return h = null, m
        }, cleanData: function (a, b) {
            for (var c, d, e, f, g = 0, h = eb.expando, i = eb.cache, j = cb.deleteExpando, k = eb.event.special; null != (c = a[g]); g++)if ((b || eb.acceptData(c)) && (e = c[h], f = e && i[e])) {
                if (f.events)for (d in f.events)k[d] ? eb.event.remove(c, d) : eb.removeEvent(c, d, f.handle);
                i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== xb ? c.removeAttribute(h) : c[h] = null, W.push(e))
            }
        }
    }), eb.fn.extend({
        text: function (a) {
            return Db(this, function (a) {
                return void 0 === a ? eb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ob).createTextNode(a))
            }, null, a, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = s(this, a);
                    b.appendChild(a)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = s(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        }, remove: function (a, b) {
            for (var c, d = a ? eb.filter(a, this) : this, e = 0; null != (c = d[e]); e++)b || 1 !== c.nodeType || eb.cleanData(q(c)), c.parentNode && (b && eb.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
            return this
        }, empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && eb.cleanData(q(a, !1)); a.firstChild;)a.removeChild(a.firstChild);
                a.options && eb.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        }, clone: function (a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                return eb.clone(this, a, b)
            })
        }, html: function (a) {
            return Db(this, function (a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a)return 1 === b.nodeType ? b.innerHTML.replace(Lb, "") : void 0;
                if (!("string" != typeof a || Sb.test(a) || !cb.htmlSerialize && Mb.test(a) || !cb.leadingWhitespace && Nb.test(a) || Xb[(Pb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Ob, "<$1></$2>");
                    try {
                        for (; d > c; c++)b = this[c] || {}, 1 === b.nodeType && (eb.cleanData(q(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {
                    }
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function () {
            var a = arguments[0];
            return this.domManip(arguments, function (b) {
                a = this.parentNode, eb.cleanData(q(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, b) {
            a = Y.apply([], a);
            var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0], n = eb.isFunction(m);
            if (n || j > 1 && "string" == typeof m && !cb.checkClone && Tb.test(m))return this.each(function (c) {
                var d = k.eq(c);
                n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
            });
            if (j && (h = eb.buildFragment(a, this[0].ownerDocument, !1, this), c = h.firstChild, 1 === h.childNodes.length && (h = c), c)) {
                for (f = eb.map(q(h, "script"), t), e = f.length; j > i; i++)d = h, i !== l && (d = eb.clone(d, !0, !0), e && eb.merge(f, q(d, "script"))), b.call(this[i], d, i);
                if (e)for (g = f[f.length - 1].ownerDocument, eb.map(f, u), i = 0; e > i; i++)d = f[i], Ub.test(d.type || "") && !eb._data(d, "globalEval") && eb.contains(g, d) && (d.src ? eb._evalUrl && eb._evalUrl(d.src) : eb.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Wb, "")));
                h = c = null
            }
            return this
        }
    }), eb.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        eb.fn[a] = function (a) {
            for (var c, d = 0, e = [], f = eb(a), g = f.length - 1; g >= d; d++)c = d === g ? this : this.clone(!0), eb(f[d])[b](c), Z.apply(e, c.get());
            return this.pushStack(e)
        }
    });
    var $b, _b = {};
    !function () {
        var a;
        cb.shrinkWrapBlocks = function () {
            if (null != a)return a;
            a = !1;
            var b, c, d;
            return c = ob.getElementsByTagName("body")[0], c && c.style ? (b = ob.createElement("div"), d = ob.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xb && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(ob.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
        }
    }();
    var ac, bc, cc = /^margin/, dc = new RegExp("^(" + Ab + ")(?!px)[a-z%]+$", "i"), ec = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (ac = function (a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null)
    }, bc = function (a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || ac(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || eb.contains(a.ownerDocument, a) || (g = eb.style(a, b)), dc.test(g) && cc.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
    }) : ob.documentElement.currentStyle && (ac = function (a) {
        return a.currentStyle
    }, bc = function (a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || ac(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), dc.test(g) && !ec.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
    }), function () {
        function b() {
            var b, c, d, e;
            c = ob.getElementsByTagName("body")[0], c && c.style && (b = ob.createElement("div"), d = ob.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f = g = !1, i = !0, a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(b, null) || {}).top, g = "4px" === (a.getComputedStyle(b, null) || {width: "4px"}).width, e = b.appendChild(ob.createElement("div")), e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", b.style.width = "1px", i = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = b.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", h = 0 === e[0].offsetHeight, h && (e[0].style.display = "", e[1].style.display = "none", h = 0 === e[0].offsetHeight), c.removeChild(d))
        }

        var c, d, e, f, g, h, i;
        c = ob.createElement("div"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = c.getElementsByTagName("a")[0], d = e && e.style, d && (d.cssText = "float:left;opacity:.5", cb.opacity = "0.5" === d.opacity, cb.cssFloat = !!d.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", cb.clearCloneStyle = "content-box" === c.style.backgroundClip, cb.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing, eb.extend(cb, {
            reliableHiddenOffsets: function () {
                return null == h && b(), h
            }, boxSizingReliable: function () {
                return null == g && b(), g
            }, pixelPosition: function () {
                return null == f && b(), f
            }, reliableMarginRight: function () {
                return null == i && b(), i
            }
        }))
    }(), eb.swap = function (a, b, c, d) {
        var e, f, g = {};
        for (f in b)g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b)a.style[f] = g[f];
        return e
    };
    var fc = /alpha\([^)]*\)/i, gc = /opacity\s*=\s*([^)]*)/, hc = /^(none|table(?!-c[ea]).+)/, ic = new RegExp("^(" + Ab + ")(.*)$", "i"), jc = new RegExp("^([+-])=(" + Ab + ")", "i"), kc = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, lc = {letterSpacing: "0", fontWeight: "400"}, mc = ["Webkit", "O", "Moz", "ms"];
    eb.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = bc(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": cb.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = eb.camelCase(b), i = a.style;
                if (b = eb.cssProps[h] || (eb.cssProps[h] = B(i, h)), g = eb.cssHooks[b] || eb.cssHooks[h], void 0 === c)return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = jc.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(eb.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || eb.cssNumber[h] || (c += "px"), cb.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))try {
                    i[b] = c
                } catch (j) {
                }
            }
        },
        css: function (a, b, c, d) {
            var e, f, g, h = eb.camelCase(b);
            return b = eb.cssProps[h] || (eb.cssProps[h] = B(a.style, h)), g = eb.cssHooks[b] || eb.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = bc(a, b, d)), "normal" === f && b in lc && (f = lc[b]), "" === c || c ? (e = parseFloat(f), c === !0 || eb.isNumeric(e) ? e || 0 : f) : f
        }
    }), eb.each(["height", "width"], function (a, b) {
        eb.cssHooks[b] = {
            get: function (a, c, d) {
                return c ? hc.test(eb.css(a, "display")) && 0 === a.offsetWidth ? eb.swap(a, kc, function () {
                    return F(a, b, d)
                }) : F(a, b, d) : void 0
            }, set: function (a, c, d) {
                var e = d && ac(a);
                return D(a, c, d ? E(a, b, d, cb.boxSizing && "border-box" === eb.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), cb.opacity || (eb.cssHooks.opacity = {
        get: function (a, b) {
            return gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        }, set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = eb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === eb.trim(f.replace(fc, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = fc.test(f) ? f.replace(fc, e) : f + " " + e)
        }
    }), eb.cssHooks.marginRight = A(cb.reliableMarginRight, function (a, b) {
        return b ? eb.swap(a, {display: "inline-block"}, bc, [a, "marginRight"]) : void 0
    }), eb.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        eb.cssHooks[a + b] = {
            expand: function (c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)e[a + Bb[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, cc.test(a) || (eb.cssHooks[a + b].set = D)
    }), eb.fn.extend({
        css: function (a, b) {
            return Db(this, function (a, b, c) {
                var d, e, f = {}, g = 0;
                if (eb.isArray(b)) {
                    for (d = ac(a), e = b.length; e > g; g++)f[b[g]] = eb.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? eb.style(a, b, c) : eb.css(a, b)
            }, a, b, arguments.length > 1)
        }, show: function () {
            return C(this, !0)
        }, hide: function () {
            return C(this)
        }, toggle: function (a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                Cb(this) ? eb(this).show() : eb(this).hide()
            })
        }
    }), eb.Tween = G, G.prototype = {
        constructor: G, init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (eb.cssNumber[c] ? "" : "px")
        }, cur: function () {
            var a = G.propHooks[this.prop];
            return a && a.get ? a.get(this) : G.propHooks._default.get(this)
        }, run: function (a) {
            var b, c = G.propHooks[this.prop];
            return this.pos = b = this.options.duration ? eb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : G.propHooks._default.set(this), this
        }
    }, G.prototype.init.prototype = G.prototype, G.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = eb.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            }, set: function (a) {
                eb.fx.step[a.prop] ? eb.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[eb.cssProps[a.prop]] || eb.cssHooks[a.prop]) ? eb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, G.propHooks.scrollTop = G.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, eb.easing = {
        linear: function (a) {
            return a
        }, swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, eb.fx = G.prototype.init, eb.fx.step = {};
    var nc, oc, pc = /^(?:toggle|show|hide)$/, qc = new RegExp("^(?:([+-])=|)(" + Ab + ")([a-z%]*)$", "i"), rc = /queueHooks$/, sc = [K], tc = {
        "*": [function (a, b) {
            var c = this.createTween(a, b), d = c.cur(), e = qc.exec(b), f = e && e[3] || (eb.cssNumber[a] ? "" : "px"), g = (eb.cssNumber[a] || "px" !== f && +d) && qc.exec(eb.css(c.elem, a)), h = 1, i = 20;
            if (g && g[3] !== f) {
                f = f || g[3], e = e || [], g = +d || 1;
                do h = h || ".5", g /= h, eb.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
            }
            return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
        }]
    };
    eb.Animation = eb.extend(M, {
        tweener: function (a, b) {
            eb.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++)c = a[d], tc[c] = tc[c] || [], tc[c].unshift(b)
        }, prefilter: function (a, b) {
            b ? sc.unshift(a) : sc.push(a)
        }
    }), eb.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? eb.extend({}, a) : {
            complete: c || !c && b || eb.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !eb.isFunction(b) && b
        };
        return d.duration = eb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in eb.fx.speeds ? eb.fx.speeds[d.duration] : eb.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            eb.isFunction(d.old) && d.old.call(this), d.queue && eb.dequeue(this, d.queue)
        }, d
    }, eb.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(Cb).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            var e = eb.isEmptyObject(a), f = eb.speed(b, c, d), g = function () {
                var b = M(this, eb.extend({}, a), f);
                (e || eb._data(this, "finish")) && b.stop(!0)
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        }, stop: function (a, b, c) {
            var d = function (a) {
                var b = a.stop;
                delete a.stop, b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                var b = !0, e = null != a && a + "queueHooks", f = eb.timers, g = eb._data(this);
                if (e)g[e] && g[e].stop && d(g[e]); else for (e in g)g[e] && g[e].stop && rc.test(e) && d(g[e]);
                for (e = f.length; e--;)f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                (b || !c) && eb.dequeue(this, a)
            })
        }, finish: function (a) {
            return a !== !1 && (a = a || "fx"), this.each(function () {
                var b, c = eb._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = eb.timers, g = d ? d.length : 0;
                for (c.finish = !0, eb.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++)d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), eb.each(["toggle", "show", "hide"], function (a, b) {
        var c = eb.fn[b];
        eb.fn[b] = function (a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e)
        }
    }), eb.each({
        slideDown: I("show"),
        slideUp: I("hide"),
        slideToggle: I("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        eb.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), eb.timers = [], eb.fx.tick = function () {
        var a, b = eb.timers, c = 0;
        for (nc = eb.now(); c < b.length; c++)a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || eb.fx.stop(), nc = void 0
    }, eb.fx.timer = function (a) {
        eb.timers.push(a), a() ? eb.fx.start() : eb.timers.pop()
    }, eb.fx.interval = 13, eb.fx.start = function () {
        oc || (oc = setInterval(eb.fx.tick, eb.fx.interval))
    }, eb.fx.stop = function () {
        clearInterval(oc), oc = null
    }, eb.fx.speeds = {slow: 600, fast: 200, _default: 400}, eb.fn.delay = function (a, b) {
        return a = eb.fx ? eb.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
            var d = setTimeout(b, a);
            c.stop = function () {
                clearTimeout(d)
            }
        })
    }, function () {
        var a, b, c, d, e;
        b = ob.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = ob.createElement("select"), e = c.appendChild(ob.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", cb.getSetAttribute = "t" !== b.className, cb.style = /top/.test(d.getAttribute("style")), cb.hrefNormalized = "/a" === d.getAttribute("href"), cb.checkOn = !!a.value, cb.optSelected = e.selected, cb.enctype = !!ob.createElement("form").enctype, c.disabled = !0, cb.optDisabled = !e.disabled, a = ob.createElement("input"), a.setAttribute("value", ""), cb.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), cb.radioValue = "t" === a.value
    }();
    var uc = /\r/g;
    eb.fn.extend({
        val: function (a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length)return d = eb.isFunction(a), this.each(function (c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, eb(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : eb.isArray(e) && (e = eb.map(e, function (a) {
                        return null == a ? "" : a + ""
                    })), b = eb.valHooks[this.type] || eb.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e)return b = eb.valHooks[e.type] || eb.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(uc, "") : null == c ? "" : c)
            }
        }
    }), eb.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = eb.find.attr(a, "value");
                    return null != b ? b : eb.trim(eb.text(a))
                }
            }, select: {
                get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)if (c = d[i], !(!c.selected && i !== e || (cb.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && eb.nodeName(c.parentNode, "optgroup"))) {
                        if (b = eb(c).val(), f)return b;
                        g.push(b)
                    }
                    return g
                }, set: function (a, b) {
                    for (var c, d, e = a.options, f = eb.makeArray(b), g = e.length; g--;)if (d = e[g], eb.inArray(eb.valHooks.option.get(d), f) >= 0)try {
                        d.selected = c = !0
                    } catch (h) {
                        d.scrollHeight
                    } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e
                }
            }
        }
    }), eb.each(["radio", "checkbox"], function () {
        eb.valHooks[this] = {
            set: function (a, b) {
                return eb.isArray(b) ? a.checked = eb.inArray(eb(a).val(), b) >= 0 : void 0
            }
        }, cb.checkOn || (eb.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var vc, wc, xc = eb.expr.attrHandle, yc = /^(?:checked|selected)$/i, zc = cb.getSetAttribute, Ac = cb.input;
    eb.fn.extend({
        attr: function (a, b) {
            return Db(this, eb.attr, a, b, arguments.length > 1)
        }, removeAttr: function (a) {
            return this.each(function () {
                eb.removeAttr(this, a)
            })
        }
    }), eb.extend({
        attr: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f)return typeof a.getAttribute === xb ? eb.prop(a, b, c) : (1 === f && eb.isXMLDoc(a) || (b = b.toLowerCase(), d = eb.attrHooks[b] || (eb.expr.match.bool.test(b) ? wc : vc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = eb.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void eb.removeAttr(a, b))
        }, removeAttr: function (a, b) {
            var c, d, e = 0, f = b && b.match(tb);
            if (f && 1 === a.nodeType)for (; c = f[e++];)d = eb.propFix[c] || c, eb.expr.match.bool.test(c) ? Ac && zc || !yc.test(c) ? a[d] = !1 : a[eb.camelCase("default-" + c)] = a[d] = !1 : eb.attr(a, c, ""), a.removeAttribute(zc ? c : d)
        }, attrHooks: {
            type: {
                set: function (a, b) {
                    if (!cb.radioValue && "radio" === b && eb.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), wc = {
        set: function (a, b, c) {
            return b === !1 ? eb.removeAttr(a, c) : Ac && zc || !yc.test(c) ? a.setAttribute(!zc && eb.propFix[c] || c, c) : a[eb.camelCase("default-" + c)] = a[c] = !0, c
        }
    }, eb.each(eb.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = xc[b] || eb.find.attr;
        xc[b] = Ac && zc || !yc.test(b) ? function (a, b, d) {
            var e, f;
            return d || (f = xc[b], xc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, xc[b] = f), e
        } : function (a, b, c) {
            return c ? void 0 : a[eb.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    }), Ac && zc || (eb.attrHooks.value = {
        set: function (a, b, c) {
            return eb.nodeName(a, "input") ? void(a.defaultValue = b) : vc && vc.set(a, b, c)
        }
    }), zc || (vc = {
        set: function (a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
        }
    }, xc.id = xc.name = xc.coords = function (a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }, eb.valHooks.button = {
        get: function (a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0
        }, set: vc.set
    }, eb.attrHooks.contenteditable = {
        set: function (a, b, c) {
            vc.set(a, "" === b ? !1 : b, c)
        }
    }, eb.each(["width", "height"], function (a, b) {
        eb.attrHooks[b] = {
            set: function (a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        }
    })), cb.style || (eb.attrHooks.style = {
        get: function (a) {
            return a.style.cssText || void 0
        }, set: function (a, b) {
            return a.style.cssText = b + ""
        }
    });
    var Bc = /^(?:input|select|textarea|button|object)$/i, Cc = /^(?:a|area)$/i;
    eb.fn.extend({
        prop: function (a, b) {
            return Db(this, eb.prop, a, b, arguments.length > 1)
        }, removeProp: function (a) {
            return a = eb.propFix[a] || a, this.each(function () {
                try {
                    this[a] = void 0, delete this[a]
                } catch (b) {
                }
            })
        }
    }), eb.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g)return f = 1 !== g || !eb.isXMLDoc(a), f && (b = eb.propFix[b] || b, e = eb.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        }, propHooks: {
            tabIndex: {
                get: function (a) {
                    var b = eb.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : Bc.test(a.nodeName) || Cc.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    }), cb.hrefNormalized || eb.each(["href", "src"], function (a, b) {
        eb.propHooks[b] = {
            get: function (a) {
                return a.getAttribute(b, 4)
            }
        }
    }), cb.optSelected || (eb.propHooks.selected = {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }), eb.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        eb.propFix[this.toLowerCase()] = this
    }), cb.enctype || (eb.propFix.enctype = "encoding");
    var Dc = /[\t\r\n\f]/g;
    eb.fn.extend({
        addClass: function (a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
            if (eb.isFunction(a))return this.each(function (b) {
                eb(this).addClass(a.call(this, b, this.className))
            });
            if (j)for (b = (a || "").match(tb) || []; i > h; h++)if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Dc, " ") : " ")) {
                for (f = 0; e = b[f++];)d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                g = eb.trim(d), c.className !== g && (c.className = g)
            }
            return this
        }, removeClass: function (a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a;
            if (eb.isFunction(a))return this.each(function (b) {
                eb(this).removeClass(a.call(this, b, this.className))
            });
            if (j)for (b = (a || "").match(tb) || []; i > h; h++)if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Dc, " ") : "")) {
                for (f = 0; e = b[f++];)for (; d.indexOf(" " + e + " ") >= 0;)d = d.replace(" " + e + " ", " ");
                g = a ? eb.trim(d) : "", c.className !== g && (c.className = g)
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(eb.isFunction(a) ? function (c) {
                eb(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function () {
                if ("string" === c)for (var b, d = 0, e = eb(this), f = a.match(tb) || []; b = f[d++];)e.hasClass(b) ? e.removeClass(b) : e.addClass(b); else(c === xb || "boolean" === c) && (this.className && eb._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : eb._data(this, "__className__") || "")
            })
        }, hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Dc, " ").indexOf(b) >= 0)return !0;
            return !1
        }
    }), eb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        eb.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), eb.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var Ec = eb.now(), Fc = /\?/, Gc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    eb.parseJSON = function (b) {
        if (a.JSON && a.JSON.parse)return a.JSON.parse(b + "");
        var c, d = null, e = eb.trim(b + "");
        return e && !eb.trim(e.replace(Gc, function (a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
        })) ? Function("return " + e)() : eb.error("Invalid JSON: " + b)
    }, eb.parseXML = function (b) {
        var c, d;
        if (!b || "string" != typeof b)return null;
        try {
            a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || eb.error("Invalid XML: " + b), c
    };
    var Hc, Ic, Jc = /#.*$/, Kc = /([?&])_=[^&]*/, Lc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Mc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Nc = /^(?:GET|HEAD)$/, Oc = /^\/\//, Pc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Qc = {}, Rc = {}, Sc = "*/".concat("*");
    try {
        Ic = location.href
    } catch (Tc) {
        Ic = ob.createElement("a"), Ic.href = "", Ic = Ic.href
    }
    Hc = Pc.exec(Ic.toLowerCase()) || [], eb.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ic,
            type: "GET",
            isLocal: Mc.test(Hc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Sc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": eb.parseJSON, "text xml": eb.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (a, b) {
            return b ? P(P(a, eb.ajaxSettings), b) : P(eb.ajaxSettings, a)
        },
        ajaxPrefilter: N(Qc),
        ajaxTransport: N(Rc),
        ajax: function (a, b) {
            function c(a, b, c, d) {
                var e, k, r, s, u, w = b;
                2 !== t && (t = 2, h && clearTimeout(h), j = void 0, g = d || "", v.readyState = a > 0 ? 4 : 0, e = a >= 200 && 300 > a || 304 === a, c && (s = Q(l, v, c)), s = R(l, s, v, e), e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (eb.lastModified[f] = u), u = v.getResponseHeader("etag"), u && (eb.etag[f] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, e = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]), p.fireWith(m, [v, w]), i && (n.trigger("ajaxComplete", [v, l]), --eb.active || eb.event.trigger("ajaxStop")))
            }

            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var d, e, f, g, h, i, j, k, l = eb.ajaxSetup({}, b), m = l.context || l, n = l.context && (m.nodeType || m.jquery) ? eb(m) : eb.event, o = eb.Deferred(), p = eb.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                readyState: 0,
                getResponseHeader: function (a) {
                    var b;
                    if (2 === t) {
                        if (!k)for (k = {}; b = Lc.exec(g);)k[b[1].toLowerCase()] = b[2];
                        b = k[a.toLowerCase()]
                    }
                    return null == b ? null : b
                },
                getAllResponseHeaders: function () {
                    return 2 === t ? g : null
                },
                setRequestHeader: function (a, b) {
                    var c = a.toLowerCase();
                    return t || (a = s[c] = s[c] || a, r[a] = b), this
                },
                overrideMimeType: function (a) {
                    return t || (l.mimeType = a), this
                },
                statusCode: function (a) {
                    var b;
                    if (a)if (2 > t)for (b in a)q[b] = [q[b], a[b]]; else v.always(a[v.status]);
                    return this
                },
                abort: function (a) {
                    var b = a || u;
                    return j && j.abort(b), c(0, b), this
                }
            };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || Ic) + "").replace(Jc, "").replace(Oc, Hc[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = eb.trim(l.dataType || "*").toLowerCase().match(tb) || [""], null == l.crossDomain && (d = Pc.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Hc[1] && d[2] === Hc[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Hc[3] || ("http:" === Hc[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = eb.param(l.data, l.traditional)), O(Qc, l, b, v), 2 === t)return v;
            i = l.global, i && 0 === eb.active++ && eb.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Nc.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fc.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Kc.test(f) ? f.replace(Kc, "$1_=" + Ec++) : f + (Fc.test(f) ? "&" : "?") + "_=" + Ec++)), l.ifModified && (eb.lastModified[f] && v.setRequestHeader("If-Modified-Since", eb.lastModified[f]), eb.etag[f] && v.setRequestHeader("If-None-Match", eb.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Sc + "; q=0.01" : "") : l.accepts["*"]);
            for (e in l.headers)v.setRequestHeader(e, l.headers[e]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t))return v.abort();
            u = "abort";
            for (e in{success: 1, error: 1, complete: 1})v[e](l[e]);
            if (j = O(Rc, l, b, v)) {
                v.readyState = 1, i && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function () {
                    v.abort("timeout")
                }, l.timeout));
                try {
                    t = 1, j.send(r, c)
                } catch (w) {
                    if (!(2 > t))throw w;
                    c(-1, w)
                }
            } else c(-1, "No Transport");
            return v
        },
        getJSON: function (a, b, c) {
            return eb.get(a, b, c, "json")
        },
        getScript: function (a, b) {
            return eb.get(a, void 0, b, "script")
        }
    }), eb.each(["get", "post"], function (a, b) {
        eb[b] = function (a, c, d, e) {
            return eb.isFunction(c) && (e = e || d, d = c, c = void 0), eb.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), eb.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        eb.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), eb._evalUrl = function (a) {
        return eb.ajax({url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, eb.fn.extend({
        wrapAll: function (a) {
            if (eb.isFunction(a))return this.each(function (b) {
                eb(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = eb(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            return this.each(eb.isFunction(a) ? function (b) {
                eb(this).wrapInner(a.call(this, b))
            } : function () {
                var b = eb(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = eb.isFunction(a);
            return this.each(function (c) {
                eb(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                eb.nodeName(this, "body") || eb(this).replaceWith(this.childNodes)
            }).end()
        }
    }), eb.expr.filters.hidden = function (a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !cb.reliableHiddenOffsets() && "none" === (a.style && a.style.display || eb.css(a, "display"))
    }, eb.expr.filters.visible = function (a) {
        return !eb.expr.filters.hidden(a)
    };
    var Uc = /%20/g, Vc = /\[\]$/, Wc = /\r?\n/g, Xc = /^(?:submit|button|image|reset|file)$/i, Yc = /^(?:input|select|textarea|keygen)/i;
    eb.param = function (a, b) {
        var c, d = [], e = function (a, b) {
            b = eb.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = eb.ajaxSettings && eb.ajaxSettings.traditional), eb.isArray(a) || a.jquery && !eb.isPlainObject(a))eb.each(a, function () {
            e(this.name, this.value)
        }); else for (c in a)S(c, a[c], b, e);
        return d.join("&").replace(Uc, "+")
    }, eb.fn.extend({
        serialize: function () {
            return eb.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var a = eb.prop(this, "elements");
                return a ? eb.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !eb(this).is(":disabled") && Yc.test(this.nodeName) && !Xc.test(a) && (this.checked || !Eb.test(a))
            }).map(function (a, b) {
                var c = eb(this).val();
                return null == c ? null : eb.isArray(c) ? eb.map(c, function (a) {
                    return {name: b.name, value: a.replace(Wc, "\r\n")}
                }) : {name: b.name, value: c.replace(Wc, "\r\n")}
            }).get()
        }
    }), eb.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U()
    } : T;
    var Zc = 0, $c = {}, _c = eb.ajaxSettings.xhr();
    a.ActiveXObject && eb(a).on("unload", function () {
        for (var a in $c)$c[a](void 0, !0)
    }), cb.cors = !!_c && "withCredentials" in _c, _c = cb.ajax = !!_c, _c && eb.ajaxTransport(function (a) {
        if (!a.crossDomain || cb.cors) {
            var b;
            return {
                send: function (c, d) {
                    var e, f = a.xhr(), g = ++Zc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)for (e in a.xhrFields)f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c)void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                    f.send(a.hasContent && a.data || null), b = function (c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState))if (delete $c[g], b = void 0, f.onreadystatechange = eb.noop, e)4 !== f.readyState && f.abort(); else {
                            j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                            try {
                                i = f.statusText
                            } catch (k) {
                                i = ""
                            }
                            h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                        }
                        j && d(h, i, j, f.getAllResponseHeaders())
                    }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = $c[g] = b : b()
                }, abort: function () {
                    b && b(void 0, !0)
                }
            }
        }
    }), eb.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (a) {
                return eb.globalEval(a), a
            }
        }
    }), eb.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), eb.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c = ob.head || eb("head")[0] || ob.documentElement;
            return {
                send: function (d, e) {
                    b = ob.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                    }, c.insertBefore(b, c.firstChild)
                }, abort: function () {
                    b && b.onload(void 0, !0)
                }
            }
        }
    });
    var ad = [], bd = /(=)\?(?=&|$)|\?\?/;
    eb.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var a = ad.pop() || eb.expando + "_" + Ec++;
            return this[a] = !0, a
        }
    }), eb.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (bd.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bd.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = eb.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(bd, "$1" + e) : b.jsonp !== !1 && (b.url += (Fc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
            return g || eb.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
            g = arguments
        }, d.always(function () {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, ad.push(e)), g && eb.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), eb.parseHTML = function (a, b, c) {
        if (!a || "string" != typeof a)return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || ob;
        var d = lb.exec(a), e = !c && [];
        return d ? [b.createElement(d[1])] : (d = eb.buildFragment([a], b, e), e && e.length && eb(e).remove(), eb.merge([], d.childNodes))
    };
    var cd = eb.fn.load;
    eb.fn.load = function (a, b, c) {
        if ("string" != typeof a && cd)return cd.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = eb.trim(a.slice(h, a.length)), a = a.slice(0, h)), eb.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && eb.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function (a) {
            e = arguments, g.html(d ? eb("<div>").append(eb.parseHTML(a)).find(d) : a)
        }).complete(c && function (a, b) {
                g.each(c, e || [a.responseText, b, a])
            }), this
    }, eb.expr.filters.animated = function (a) {
        return eb.grep(eb.timers, function (b) {
            return a === b.elem
        }).length
    };
    var dd = a.document.documentElement;
    eb.offset = {
        setOffset: function (a, b, c) {
            var d, e, f, g, h, i, j, k = eb.css(a, "position"), l = eb(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = eb.css(a, "top"), i = eb.css(a, "left"), j = ("absolute" === k || "fixed" === k) && eb.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), eb.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, eb.fn.extend({
        offset: function (a) {
            if (arguments.length)return void 0 === a ? this : this.each(function (b) {
                eb.offset.setOffset(this, a, b)
            });
            var b, c, d = {top: 0, left: 0}, e = this[0], f = e && e.ownerDocument;
            if (f)return b = f.documentElement, eb.contains(b, e) ? (typeof e.getBoundingClientRect !== xb && (d = e.getBoundingClientRect()), c = V(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d
        }, position: function () {
            if (this[0]) {
                var a, b, c = {top: 0, left: 0}, d = this[0];
                return "fixed" === eb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), eb.nodeName(a[0], "html") || (c = a.offset()), c.top += eb.css(a[0], "borderTopWidth", !0), c.left += eb.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - eb.css(d, "marginTop", !0),
                    left: b.left - c.left - eb.css(d, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || dd; a && !eb.nodeName(a, "html") && "static" === eb.css(a, "position");)a = a.offsetParent;
                return a || dd
            })
        }
    }), eb.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
        var c = /Y/.test(b);
        eb.fn[a] = function (d) {
            return Db(this, function (a, d, e) {
                var f = V(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? eb(f).scrollLeft() : e, c ? e : eb(f).scrollTop()) : a[d] = e)
            }, a, d, arguments.length, null)
        }
    }), eb.each(["top", "left"], function (a, b) {
        eb.cssHooks[b] = A(cb.pixelPosition, function (a, c) {
            return c ? (c = bc(a, b), dc.test(c) ? eb(a).position()[b] + "px" : c) : void 0
        })
    }), eb.each({Height: "height", Width: "width"}, function (a, b) {
        eb.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
            eb.fn[d] = function (d, e) {
                var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                return Db(this, function (b, c, d) {
                    var e;
                    return eb.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? eb.css(b, c, g) : eb.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), eb.fn.size = function () {
        return this.length
    }, eb.fn.andSelf = eb.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return eb
    });
    var ed = a.jQuery, fd = a.$;
    return eb.noConflict = function (b) {
        return a.$ === eb && (a.$ = fd), b && a.jQuery === eb && (a.jQuery = ed), eb
    }, typeof b === xb && (a.jQuery = a.$ = eb), eb
}), /*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
    function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
    }(function (a) {
        function b(a) {
            return h.raw ? a : encodeURIComponent(a)
        }

        function c(a) {
            return h.raw ? a : decodeURIComponent(a)
        }

        function d(a) {
            return b(h.json ? JSON.stringify(a) : String(a))
        }

        function e(a) {
            0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return a = decodeURIComponent(a.replace(g, " ")), h.json ? JSON.parse(a) : a
            } catch (b) {
            }
        }

        function f(b, c) {
            var d = h.raw ? b : e(b);
            return a.isFunction(c) ? c(d) : d
        }

        var g = /\+/g, h = a.cookie = function (e, g, i) {
            if (void 0 !== g && !a.isFunction(g)) {
                if (i = a.extend({}, h.defaults, i), "number" == typeof i.expires) {
                    var j = i.expires, k = i.expires = new Date;
                    k.setTime(+k + 864e5 * j)
                }
                return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
            }
            for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
                var p = m[n].split("="), q = c(p.shift()), r = p.join("=");
                if (e && e === q) {
                    l = f(r, g);
                    break
                }
                e || void 0 === (r = f(r)) || (l[q] = r)
            }
            return l
        };
        h.defaults = {}, a.removeCookie = function (b, c) {
            return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({}, c, {expires: -1})), !a.cookie(b))
        }
    }), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var c = a(this), e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }

    var c = '[data-dismiss="alert"]', d = function (b) {
        a(b).on("click", c, this.close)
    };
    d.VERSION = "3.2.0", d.prototype.close = function (b) {
        function c() {
            f.detach().trigger("closed.bs.alert").remove()
        }

        var d = a(this), e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
            !e && f.toggle && "show" == b && (b = !b), e || d.data("bs.collapse", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {toggle: !0}, c.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, c.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var c = a.Event("show.bs.collapse");
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                var d = this.$parent && this.$parent.find("> .panel > .in");
                if (d && d.length) {
                    var e = d.data("bs.collapse");
                    if (e && e.transitioning)return;
                    b.call(d, "hide"), e || d.data("bs.collapse", null)
                }
                var f = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1;
                var g = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition)return g.call(this);
                var h = a.camelCase(["scroll", f].join("-"));
                this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h])
            }
        }
    }, c.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function () {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
            }
        }
    }, c.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var d = a.fn.collapse;
    a.fn.collapse = b, a.fn.collapse.Constructor = c, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = d, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (c) {
        var d, e = a(this), f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""), g = a(f), h = g.data("bs.collapse"), i = h ? "toggle" : e.data(), j = e.attr("data-parent"), k = j && a(j);
        h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), b.call(g, i)
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b, d) {
        return this.each(function () {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }

    var c = function (b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function (b) {
        var c = this, d = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(c.$body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {relatedTarget: b});
            d ? c.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                c.$element.trigger("focus").trigger(e)
            }).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e)
        }))
    }, c.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, c.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function (b) {
        var c = this, d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            if (this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b)return;
            e ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var f = function () {
                c.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f()
        } else b && b()
    }, c.prototype.checkScrollbar = function () {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
    }, c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "")
    }, c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
        var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), g = f.data("bs.modal") ? "toggle" : a.extend({remote: !/#/.test(e) && e}, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b) {
        this.element = a(b)
    };
    c.VERSION = "3.2.0", c.prototype.show = function () {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", {relatedTarget: e});
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.closest("li"), c), this.activate(g, g.parent(), function () {
                    b.trigger({type: "shown.bs.tab", relatedTarget: e})
                })
            }
        }
    }, c.prototype.activate = function (b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }

        var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
        g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = d, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (c) {
        c.preventDefault(), b.call(a(this), "show")
    })
}(jQuery), +function (a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b)if (void 0 !== a.style[c])return {end: b[c]};
        return !1
    }

    a.fn.emulateTransitionEnd = function (b) {
        var c = !1, d = this;
        a(this).one("bsTransitionEnd", function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), function () {
    function a(a, b, c) {
        for (var d = (c || 0) - 1, e = a ? a.length : 0; ++d < e;)if (a[d] === b)return d;
        return -1
    }

    function b(b, c) {
        var d = typeof c;
        if (b = b.cache, "boolean" == d || null == c)return b[c] ? 0 : -1;
        "number" != d && "string" != d && (d = "object");
        var e = "number" == d ? c : r + c;
        return b = (b = b[d]) && b[e], "object" == d ? b && a(b, c) > -1 ? 0 : -1 : b ? 0 : -1
    }

    function c(a) {
        var b = this.cache, c = typeof a;
        if ("boolean" == c || null == a)b[a] = !0; else {
            "number" != c && "string" != c && (c = "object");
            var d = "number" == c ? a : r + a, e = b[c] || (b[c] = {});
            "object" == c ? (e[d] || (e[d] = [])).push(a) : e[d] = !0
        }
    }

    function d(a) {
        return a.charCodeAt(0)
    }

    function e(a, b) {
        for (var c = a.criteria, d = b.criteria, e = -1, f = c.length; ++e < f;) {
            var g = c[e], h = d[e];
            if (g !== h) {
                if (g > h || "undefined" == typeof g)return 1;
                if (h > g || "undefined" == typeof h)return -1
            }
        }
        return a.index - b.index
    }

    function f(a) {
        var b = -1, d = a.length, e = a[0], f = a[d / 2 | 0], g = a[d - 1];
        if (e && "object" == typeof e && f && "object" == typeof f && g && "object" == typeof g)return !1;
        var h = i();
        h["false"] = h["null"] = h["true"] = h.undefined = !1;
        var j = i();
        for (j.array = a, j.cache = h, j.push = c; ++b < d;)j.push(a[b]);
        return j
    }

    function g(a) {
        return "\\" + V[a]
    }

    function h() {
        return o.pop() || []
    }

    function i() {
        return p.pop() || {
                array: null,
                cache: null,
                criteria: null,
                "false": !1,
                index: 0,
                "null": !1,
                number: null,
                object: null,
                push: null,
                string: null,
                "true": !1,
                undefined: !1,
                value: null
            }
    }

    function j(a) {
        a.length = 0, o.length < t && o.push(a)
    }

    function k(a) {
        var b = a.cache;
        b && k(b), a.array = a.cache = a.criteria = a.object = a.number = a.string = a.value = null, p.length < t && p.push(a)
    }

    function l(a, b, c) {
        b || (b = 0), "undefined" == typeof c && (c = a ? a.length : 0);
        for (var d = -1, e = c - b || 0, f = Array(0 > e ? 0 : e); ++d < e;)f[d] = a[b + d];
        return f
    }

    function m(c) {
        function o(a) {
            return a && "object" == typeof a && !Zd(a) && Hd.call(a, "__wrapped__") ? a : new p(a)
        }

        function p(a, b) {
            this.__chain__ = !!b, this.__wrapped__ = a
        }

        function t(a) {
            function b() {
                if (d) {
                    var a = l(d);
                    Id.apply(a, arguments)
                }
                if (this instanceof b) {
                    var f = X(c.prototype), g = c.apply(f, a || arguments);
                    return Eb(g) ? g : f
                }
                return c.apply(e, a || arguments)
            }

            var c = a[0], d = a[2], e = a[4];
            return Yd(b, a), b
        }

        function V(a, b, c, d, e) {
            if (c) {
                var f = c(a);
                if ("undefined" != typeof f)return f
            }
            var g = Eb(a);
            if (!g)return a;
            var i = Ad.call(a);
            if (!R[i])return a;
            var k = Wd[i];
            switch (i) {
                case K:
                case L:
                    return new k(+a);
                case N:
                case Q:
                    return new k(a);
                case P:
                    return f = k(a.source, z.exec(a)), f.lastIndex = a.lastIndex, f
            }
            var m = Zd(a);
            if (b) {
                var n = !d;
                d || (d = h()), e || (e = h());
                for (var o = d.length; o--;)if (d[o] == a)return e[o];
                f = m ? k(a.length) : {}
            } else f = m ? l(a) : ee({}, a);
            return m && (Hd.call(a, "index") && (f.index = a.index), Hd.call(a, "input") && (f.input = a.input)), b ? (d.push(a), e.push(f), (m ? Yb : he)(a, function (a, g) {
                f[g] = V(a, b, c, d, e)
            }), n && (j(d), j(e)), f) : f
        }

        function X(a) {
            return Eb(a) ? Nd(a) : {}
        }

        function Y(a, b, c) {
            if ("function" != typeof a)return Zc;
            if ("undefined" == typeof b || !("prototype" in a))return a;
            var d = a.__bindData__;
            if ("undefined" == typeof d && (Xd.funcNames && (d = !a.name), d = d || !Xd.funcDecomp, !d)) {
                var e = Fd.call(a);
                Xd.funcNames || (d = !A.test(e)), d || (d = E.test(e), Yd(a, d))
            }
            if (d === !1 || d !== !0 && 1 & d[1])return a;
            switch (c) {
                case 1:
                    return function (c) {
                        return a.call(b, c)
                    };
                case 2:
                    return function (c, d) {
                        return a.call(b, c, d)
                    };
                case 3:
                    return function (c, d, e) {
                        return a.call(b, c, d, e)
                    };
                case 4:
                    return function (c, d, e, f) {
                        return a.call(b, c, d, e, f)
                    }
            }
            return Ic(a, b)
        }

        function Z(a) {
            function b() {
                var a = i ? g : this;
                if (e) {
                    var o = l(e);
                    Id.apply(o, arguments)
                }
                if ((f || k) && (o || (o = l(arguments)), f && Id.apply(o, f), k && o.length < h))return d |= 16, Z([c, m ? d : -4 & d, o, null, g, h]);
                if (o || (o = arguments), j && (c = a[n]), this instanceof b) {
                    a = X(c.prototype);
                    var p = c.apply(a, o);
                    return Eb(p) ? p : a
                }
                return c.apply(a, o)
            }

            var c = a[0], d = a[1], e = a[2], f = a[3], g = a[4], h = a[5], i = 1 & d, j = 2 & d, k = 4 & d, m = 8 & d, n = c;
            return Yd(b, a), b
        }

        function $(c, d) {
            var e = -1, g = ib(), h = c ? c.length : 0, i = h >= s && g === a, j = [];
            if (i) {
                var l = f(d);
                l ? (g = b, d = l) : i = !1
            }
            for (; ++e < h;) {
                var m = c[e];
                g(d, m) < 0 && j.push(m)
            }
            return i && k(d), j
        }

        function ab(a, b, c, d) {
            for (var e = (d || 0) - 1, f = a ? a.length : 0, g = []; ++e < f;) {
                var h = a[e];
                if (h && "object" == typeof h && "number" == typeof h.length && (Zd(h) || mb(h))) {
                    b || (h = ab(h, b, c));
                    var i = -1, j = h.length, k = g.length;
                    for (g.length += j; ++i < j;)g[k++] = h[i]
                } else c || g.push(h)
            }
            return g
        }

        function bb(a, b, c, d, e, f) {
            if (c) {
                var g = c(a, b);
                if ("undefined" != typeof g)return !!g
            }
            if (a === b)return 0 !== a || 1 / a == 1 / b;
            var i = typeof a, k = typeof b;
            if (!(a !== a || a && U[i] || b && U[k]))return !1;
            if (null == a || null == b)return a === b;
            var l = Ad.call(a), m = Ad.call(b);
            if (l == I && (l = O), m == I && (m = O), l != m)return !1;
            switch (l) {
                case K:
                case L:
                    return +a == +b;
                case N:
                    return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                case P:
                case Q:
                    return a == vd(b)
            }
            var n = l == J;
            if (!n) {
                var o = Hd.call(a, "__wrapped__"), p = Hd.call(b, "__wrapped__");
                if (o || p)return bb(o ? a.__wrapped__ : a, p ? b.__wrapped__ : b, c, d, e, f);
                if (l != O)return !1;
                var q = a.constructor, r = b.constructor;
                if (q != r && !(Db(q) && q instanceof q && Db(r) && r instanceof r) && "constructor" in a && "constructor" in b)return !1
            }
            var s = !e;
            e || (e = h()), f || (f = h());
            for (var t = e.length; t--;)if (e[t] == a)return f[t] == b;
            var u = 0;
            if (g = !0, e.push(a), f.push(b), n) {
                if (t = a.length, u = b.length, g = u == t, g || d)for (; u--;) {
                    var v = t, w = b[u];
                    if (d)for (; v-- && !(g = bb(a[v], w, c, d, e, f));); else if (!(g = bb(a[u], w, c, d, e, f)))break
                }
            } else ge(b, function (b, h, i) {
                return Hd.call(i, h) ? (u++, g = Hd.call(a, h) && bb(a[h], b, c, d, e, f)) : void 0
            }), g && !d && ge(a, function (a, b, c) {
                return Hd.call(c, b) ? g = --u > -1 : void 0
            });
            return e.pop(), f.pop(), s && (j(e), j(f)), g
        }

        function cb(a, b, c, d, e) {
            (Zd(b) ? Yb : he)(b, function (b, f) {
                var g, h, i = b, j = a[f];
                if (b && ((h = Zd(b)) || ie(b))) {
                    for (var k = d.length; k--;)if (g = d[k] == b) {
                        j = e[k];
                        break
                    }
                    if (!g) {
                        var l;
                        c && (i = c(j, b), (l = "undefined" != typeof i) && (j = i)), l || (j = h ? Zd(j) ? j : [] : ie(j) ? j : {}), d.push(b), e.push(j), l || cb(j, b, c, d, e)
                    }
                } else c && (i = c(j, b), "undefined" == typeof i && (i = b)), "undefined" != typeof i && (j = i);
                a[f] = j
            })
        }

        function db(a, b) {
            return a + Ed(Vd() * (b - a + 1))
        }

        function eb(c, d, e) {
            var g = -1, i = ib(), l = c ? c.length : 0, m = [], n = !d && l >= s && i === a, o = e || n ? h() : m;
            if (n) {
                var p = f(o);
                i = b, o = p
            }
            for (; ++g < l;) {
                var q = c[g], r = e ? e(q, g, c) : q;
                (d ? !g || o[o.length - 1] !== r : i(o, r) < 0) && ((e || n) && o.push(r), m.push(q))
            }
            return n ? (j(o.array), k(o)) : e && j(o), m
        }

        function fb(a) {
            return function (b, c, d) {
                var e = {};
                c = o.createCallback(c, d, 3);
                var f = -1, g = b ? b.length : 0;
                if ("number" == typeof g)for (; ++f < g;) {
                    var h = b[f];
                    a(e, h, c(h, f, b), b)
                } else he(b, function (b, d, f) {
                    a(e, b, c(b, d, f), f)
                });
                return e
            }
        }

        function gb(a, b, c, d, e, f) {
            var g = 1 & b, h = 2 & b, i = 4 & b, j = 16 & b, k = 32 & b;
            if (!h && !Db(a))throw new wd;
            j && !c.length && (b &= -17, j = c = !1), k && !d.length && (b &= -33, k = d = !1);
            var m = a && a.__bindData__;
            if (m && m !== !0)return m = l(m), m[2] && (m[2] = l(m[2])), m[3] && (m[3] = l(m[3])), !g || 1 & m[1] || (m[4] = e), !g && 1 & m[1] && (b |= 8), !i || 4 & m[1] || (m[5] = f), j && Id.apply(m[2] || (m[2] = []), c), k && Ld.apply(m[3] || (m[3] = []), d), m[1] |= b, gb.apply(null, m);
            var n = 1 == b || 17 === b ? t : Z;
            return n([a, b, c, d, e, f])
        }

        function hb(a) {
            return ae[a]
        }

        function ib() {
            var b = (b = o.indexOf) === rc ? a : b;
            return b
        }

        function jb(a) {
            return "function" == typeof a && Bd.test(a)
        }

        function kb(a) {
            var b, c;
            return a && Ad.call(a) == O && (b = a.constructor, !Db(b) || b instanceof b) ? (ge(a, function (a, b) {
                c = b
            }), "undefined" == typeof c || Hd.call(a, c)) : !1
        }

        function lb(a) {
            return be[a]
        }

        function mb(a) {
            return a && "object" == typeof a && "number" == typeof a.length && Ad.call(a) == I || !1
        }

        function nb(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = b, b = !1), V(a, b, "function" == typeof c && Y(c, d, 1))
        }

        function ob(a, b, c) {
            return V(a, !0, "function" == typeof b && Y(b, c, 1))
        }

        function pb(a, b) {
            var c = X(a);
            return b ? ee(c, b) : c
        }

        function qb(a, b, c) {
            var d;
            return b = o.createCallback(b, c, 3), he(a, function (a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }), d
        }

        function rb(a, b, c) {
            var d;
            return b = o.createCallback(b, c, 3), tb(a, function (a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }), d
        }

        function sb(a, b, c) {
            var d = [];
            ge(a, function (a, b) {
                d.push(b, a)
            });
            var e = d.length;
            for (b = Y(b, c, 3); e-- && b(d[e--], d[e], a) !== !1;);
            return a
        }

        function tb(a, b, c) {
            var d = _d(a), e = d.length;
            for (b = Y(b, c, 3); e--;) {
                var f = d[e];
                if (b(a[f], f, a) === !1)break
            }
            return a
        }

        function ub(a) {
            var b = [];
            return ge(a, function (a, c) {
                Db(a) && b.push(c)
            }), b.sort()
        }

        function vb(a, b) {
            return a ? Hd.call(a, b) : !1
        }

        function wb(a) {
            for (var b = -1, c = _d(a), d = c.length, e = {}; ++b < d;) {
                var f = c[b];
                e[a[f]] = f
            }
            return e
        }

        function xb(a) {
            return a === !0 || a === !1 || a && "object" == typeof a && Ad.call(a) == K || !1
        }

        function yb(a) {
            return a && "object" == typeof a && Ad.call(a) == L || !1
        }

        function zb(a) {
            return a && 1 === a.nodeType || !1
        }

        function Ab(a) {
            var b = !0;
            if (!a)return b;
            var c = Ad.call(a), d = a.length;
            return c == J || c == Q || c == I || c == O && "number" == typeof d && Db(a.splice) ? !d : (he(a, function () {
                return b = !1
            }), b)
        }

        function Bb(a, b, c, d) {
            return bb(a, b, "function" == typeof c && Y(c, d, 2))
        }

        function Cb(a) {
            return Pd(a) && !Qd(parseFloat(a))
        }

        function Db(a) {
            return "function" == typeof a
        }

        function Eb(a) {
            return !(!a || !U[typeof a])
        }

        function Fb(a) {
            return Hb(a) && a != +a
        }

        function Gb(a) {
            return null === a
        }

        function Hb(a) {
            return "number" == typeof a || a && "object" == typeof a && Ad.call(a) == N || !1
        }

        function Ib(a) {
            return a && "object" == typeof a && Ad.call(a) == P || !1
        }

        function Jb(a) {
            return "string" == typeof a || a && "object" == typeof a && Ad.call(a) == Q || !1
        }

        function Kb(a) {
            return "undefined" == typeof a
        }

        function Lb(a, b, c) {
            var d = {};
            return b = o.createCallback(b, c, 3), he(a, function (a, c, e) {
                d[c] = b(a, c, e)
            }), d
        }

        function Mb(a) {
            var b = arguments, c = 2;
            if (!Eb(a))return a;
            if ("number" != typeof b[2] && (c = b.length), c > 3 && "function" == typeof b[c - 2])var d = Y(b[--c - 1], b[c--], 2); else c > 2 && "function" == typeof b[c - 1] && (d = b[--c]);
            for (var e = l(arguments, 1, c), f = -1, g = h(), i = h(); ++f < c;)cb(a, e[f], d, g, i);
            return j(g), j(i), a
        }

        function Nb(a, b, c) {
            var d = {};
            if ("function" != typeof b) {
                var e = [];
                ge(a, function (a, b) {
                    e.push(b)
                }), e = $(e, ab(arguments, !0, !1, 1));
                for (var f = -1, g = e.length; ++f < g;) {
                    var h = e[f];
                    d[h] = a[h]
                }
            } else b = o.createCallback(b, c, 3), ge(a, function (a, c, e) {
                b(a, c, e) || (d[c] = a)
            });
            return d
        }

        function Ob(a) {
            for (var b = -1, c = _d(a), d = c.length, e = nd(d); ++b < d;) {
                var f = c[b];
                e[b] = [f, a[f]]
            }
            return e
        }

        function Pb(a, b, c) {
            var d = {};
            if ("function" != typeof b)for (var e = -1, f = ab(arguments, !0, !1, 1), g = Eb(a) ? f.length : 0; ++e < g;) {
                var h = f[e];
                h in a && (d[h] = a[h])
            } else b = o.createCallback(b, c, 3), ge(a, function (a, c, e) {
                b(a, c, e) && (d[c] = a)
            });
            return d
        }

        function Qb(a, b, c, d) {
            var e = Zd(a);
            if (null == c)if (e)c = []; else {
                var f = a && a.constructor, g = f && f.prototype;
                c = X(g)
            }
            return b && (b = o.createCallback(b, d, 4), (e ? Yb : he)(a, function (a, d, e) {
                return b(c, a, d, e)
            })), c
        }

        function Rb(a) {
            for (var b = -1, c = _d(a), d = c.length, e = nd(d); ++b < d;)e[b] = a[c[b]];
            return e
        }

        function Sb(a) {
            for (var b = arguments, c = -1, d = ab(b, !0, !1, 1), e = b[2] && b[2][b[1]] === a ? 1 : d.length, f = nd(e); ++c < e;)f[c] = a[d[c]];
            return f
        }

        function Tb(a, b, c) {
            var d = -1, e = ib(), f = a ? a.length : 0, g = !1;
            return c = (0 > c ? Sd(0, f + c) : c) || 0, Zd(a) ? g = e(a, b, c) > -1 : "number" == typeof f ? g = (Jb(a) ? a.indexOf(b, c) : e(a, b, c)) > -1 : he(a, function (a) {
                return ++d >= c ? !(g = a === b) : void 0
            }), g
        }

        function Ub(a, b, c) {
            var d = !0;
            b = o.createCallback(b, c, 3);
            var e = -1, f = a ? a.length : 0;
            if ("number" == typeof f)for (; ++e < f && (d = !!b(a[e], e, a));); else he(a, function (a, c, e) {
                return d = !!b(a, c, e)
            });
            return d
        }

        function Vb(a, b, c) {
            var d = [];
            b = o.createCallback(b, c, 3);
            var e = -1, f = a ? a.length : 0;
            if ("number" == typeof f)for (; ++e < f;) {
                var g = a[e];
                b(g, e, a) && d.push(g)
            } else he(a, function (a, c, e) {
                b(a, c, e) && d.push(a)
            });
            return d
        }

        function Wb(a, b, c) {
            b = o.createCallback(b, c, 3);
            var d = -1, e = a ? a.length : 0;
            if ("number" != typeof e) {
                var f;
                return he(a, function (a, c, d) {
                    return b(a, c, d) ? (f = a, !1) : void 0
                }), f
            }
            for (; ++d < e;) {
                var g = a[d];
                if (b(g, d, a))return g
            }
        }

        function Xb(a, b, c) {
            var d;
            return b = o.createCallback(b, c, 3), Zb(a, function (a, c, e) {
                return b(a, c, e) ? (d = a, !1) : void 0
            }), d
        }

        function Yb(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            if (b = b && "undefined" == typeof c ? b : Y(b, c, 3), "number" == typeof e)for (; ++d < e && b(a[d], d, a) !== !1;); else he(a, b);
            return a
        }

        function Zb(a, b, c) {
            var d = a ? a.length : 0;
            if (b = b && "undefined" == typeof c ? b : Y(b, c, 3), "number" == typeof d)for (; d-- && b(a[d], d, a) !== !1;); else {
                var e = _d(a);
                d = e.length, he(a, function (a, c, f) {
                    return c = e ? e[--d] : --d, b(f[c], c, f)
                })
            }
            return a
        }

        function $b(a, b) {
            var c = l(arguments, 2), d = -1, e = "function" == typeof b, f = a ? a.length : 0, g = nd("number" == typeof f ? f : 0);
            return Yb(a, function (a) {
                g[++d] = (e ? b : a[b]).apply(a, c)
            }), g
        }

        function _b(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            if (b = o.createCallback(b, c, 3), "number" == typeof e)for (var f = nd(e); ++d < e;)f[d] = b(a[d], d, a); else f = [], he(a, function (a, c, e) {
                f[++d] = b(a, c, e)
            });
            return f
        }

        function ac(a, b, c) {
            var e = -1 / 0, f = e;
            if ("function" != typeof b && c && c[b] === a && (b = null), null == b && Zd(a))for (var g = -1, h = a.length; ++g < h;) {
                var i = a[g];
                i > f && (f = i)
            } else b = null == b && Jb(a) ? d : o.createCallback(b, c, 3), Yb(a, function (a, c, d) {
                var g = b(a, c, d);
                g > e && (e = g, f = a)
            });
            return f
        }

        function bc(a, b, c) {
            var e = 1 / 0, f = e;
            if ("function" != typeof b && c && c[b] === a && (b = null), null == b && Zd(a))for (var g = -1, h = a.length; ++g < h;) {
                var i = a[g];
                f > i && (f = i)
            } else b = null == b && Jb(a) ? d : o.createCallback(b, c, 3), Yb(a, function (a, c, d) {
                var g = b(a, c, d);
                e > g && (e = g, f = a)
            });
            return f
        }

        function cc(a, b, c, d) {
            if (!a)return c;
            var e = arguments.length < 3;
            b = o.createCallback(b, d, 4);
            var f = -1, g = a.length;
            if ("number" == typeof g)for (e && (c = a[++f]); ++f < g;)c = b(c, a[f], f, a); else he(a, function (a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f)
            });
            return c
        }

        function dc(a, b, c, d) {
            var e = arguments.length < 3;
            return b = o.createCallback(b, d, 4), Zb(a, function (a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f)
            }), c
        }

        function ec(a, b, c) {
            return b = o.createCallback(b, c, 3), Vb(a, function (a, c, d) {
                return !b(a, c, d)
            })
        }

        function fc(a, b, c) {
            if (a && "number" != typeof a.length && (a = Rb(a)), null == b || c)return a ? a[db(0, a.length - 1)] : n;
            var d = gc(a);
            return d.length = Td(Sd(0, b), d.length), d
        }

        function gc(a) {
            var b = -1, c = a ? a.length : 0, d = nd("number" == typeof c ? c : 0);
            return Yb(a, function (a) {
                var c = db(0, ++b);
                d[b] = d[c], d[c] = a
            }), d
        }

        function hc(a) {
            var b = a ? a.length : 0;
            return "number" == typeof b ? b : _d(a).length
        }

        function ic(a, b, c) {
            var d;
            b = o.createCallback(b, c, 3);
            var e = -1, f = a ? a.length : 0;
            if ("number" == typeof f)for (; ++e < f && !(d = b(a[e], e, a));); else he(a, function (a, c, e) {
                return !(d = b(a, c, e))
            });
            return !!d
        }

        function jc(a, b, c) {
            var d = -1, f = Zd(b), g = a ? a.length : 0, l = nd("number" == typeof g ? g : 0);
            for (f || (b = o.createCallback(b, c, 3)), Yb(a, function (a, c, e) {
                var g = l[++d] = i();
                f ? g.criteria = _b(b, function (b) {
                    return a[b]
                }) : (g.criteria = h())[0] = b(a, c, e), g.index = d, g.value = a
            }), g = l.length, l.sort(e); g--;) {
                var m = l[g];
                l[g] = m.value, f || j(m.criteria), k(m)
            }
            return l
        }

        function kc(a) {
            return a && "number" == typeof a.length ? l(a) : Rb(a)
        }

        function lc(a) {
            for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
                var e = a[b];
                e && d.push(e)
            }
            return d
        }

        function mc(a) {
            return $(a, ab(arguments, !0, !0, 1))
        }

        function nc(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            for (b = o.createCallback(b, c, 3); ++d < e;)if (b(a[d], d, a))return d;
            return -1
        }

        function oc(a, b, c) {
            var d = a ? a.length : 0;
            for (b = o.createCallback(b, c, 3); d--;)if (b(a[d], d, a))return d;
            return -1
        }

        function pc(a, b, c) {
            var d = 0, e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = -1;
                for (b = o.createCallback(b, c, 3); ++f < e && b(a[f], f, a);)d++
            } else if (d = b, null == d || c)return a ? a[0] : n;
            return l(a, 0, Td(Sd(0, d), e))
        }

        function qc(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null : b, b = !1), null != c && (a = _b(a, c, d)), ab(a, b)
        }

        function rc(b, c, d) {
            if ("number" == typeof d) {
                var e = b ? b.length : 0;
                d = 0 > d ? Sd(0, e + d) : d || 0
            } else if (d) {
                var f = Ac(b, c);
                return b[f] === c ? f : -1
            }
            return a(b, c, d)
        }

        function sc(a, b, c) {
            var d = 0, e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = o.createCallback(b, c, 3); f-- && b(a[f], f, a);)d++
            } else d = null == b || c ? 1 : b || d;
            return l(a, 0, Td(Sd(0, e - d), e))
        }

        function tc() {
            for (var c = [], d = -1, e = arguments.length, g = h(), i = ib(), l = i === a, m = h(); ++d < e;) {
                var n = arguments[d];
                (Zd(n) || mb(n)) && (c.push(n), g.push(l && n.length >= s && f(d ? c[d] : m)))
            }
            var o = c[0], p = -1, q = o ? o.length : 0, r = [];
            a:for (; ++p < q;) {
                var t = g[0];
                if (n = o[p], (t ? b(t, n) : i(m, n)) < 0) {
                    for (d = e, (t || m).push(n); --d;)if (t = g[d], (t ? b(t, n) : i(c[d], n)) < 0)continue a;
                    r.push(n)
                }
            }
            for (; e--;)t = g[e], t && k(t);
            return j(g), j(m), r
        }

        function uc(a, b, c) {
            var d = 0, e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = o.createCallback(b, c, 3); f-- && b(a[f], f, a);)d++
            } else if (d = b, null == d || c)return a ? a[e - 1] : n;
            return l(a, Sd(0, e - d))
        }

        function vc(a, b, c) {
            var d = a ? a.length : 0;
            for ("number" == typeof c && (d = (0 > c ? Sd(0, d + c) : Td(c, d - 1)) + 1); d--;)if (a[d] === b)return d;
            return -1
        }

        function wc(a) {
            for (var b = arguments, c = 0, d = b.length, e = a ? a.length : 0; ++c < d;)for (var f = -1, g = b[c]; ++f < e;)a[f] === g && (Kd.call(a, f--, 1), e--);
            return a
        }

        function xc(a, b, c) {
            a = +a || 0, c = "number" == typeof c ? c : +c || 1, null == b && (b = a, a = 0);
            for (var d = -1, e = Sd(0, Cd((b - a) / (c || 1))), f = nd(e); ++d < e;)f[d] = a, a += c;
            return f
        }

        function yc(a, b, c) {
            var d = -1, e = a ? a.length : 0, f = [];
            for (b = o.createCallback(b, c, 3); ++d < e;) {
                var g = a[d];
                b(g, d, a) && (f.push(g), Kd.call(a, d--, 1), e--)
            }
            return f
        }

        function zc(a, b, c) {
            if ("number" != typeof b && null != b) {
                var d = 0, e = -1, f = a ? a.length : 0;
                for (b = o.createCallback(b, c, 3); ++e < f && b(a[e], e, a);)d++
            } else d = null == b || c ? 1 : Sd(0, b);
            return l(a, d)
        }

        function Ac(a, b, c, d) {
            var e = 0, f = a ? a.length : e;
            for (c = c ? o.createCallback(c, d, 1) : Zc, b = c(b); f > e;) {
                var g = e + f >>> 1;
                c(a[g]) < b ? e = g + 1 : f = g
            }
            return e
        }

        function Bc() {
            return eb(ab(arguments, !0, !0))
        }

        function Cc(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null : b, b = !1), null != c && (c = o.createCallback(c, d, 3)), eb(a, b, c)
        }

        function Dc(a) {
            return $(a, l(arguments, 1))
        }

        function Ec() {
            for (var a = -1, b = arguments.length; ++a < b;) {
                var c = arguments[a];
                if (Zd(c) || mb(c))var d = d ? eb($(d, c).concat($(c, d))) : c
            }
            return d || []
        }

        function Fc() {
            for (var a = arguments.length > 1 ? arguments : arguments[0], b = -1, c = a ? ac(me(a, "length")) : 0, d = nd(0 > c ? 0 : c); ++b < c;)d[b] = me(a, b);
            return d
        }

        function Gc(a, b) {
            var c = -1, d = a ? a.length : 0, e = {};
            for (b || !d || Zd(a[0]) || (b = []); ++c < d;) {
                var f = a[c];
                b ? e[f] = b[c] : f && (e[f[0]] = f[1])
            }
            return e
        }

        function Hc(a, b) {
            if (!Db(b))throw new wd;
            return function () {
                return --a < 1 ? b.apply(this, arguments) : void 0
            }
        }

        function Ic(a, b) {
            return arguments.length > 2 ? gb(a, 17, l(arguments, 2), null, b) : gb(a, 1, null, null, b)
        }

        function Jc(a) {
            for (var b = arguments.length > 1 ? ab(arguments, !0, !1, 1) : ub(a), c = -1, d = b.length; ++c < d;) {
                var e = b[c];
                a[e] = gb(a[e], 1, null, null, a)
            }
            return a
        }

        function Kc(a, b) {
            return arguments.length > 2 ? gb(b, 19, l(arguments, 2), null, a) : gb(b, 3, null, null, a)
        }

        function Lc() {
            for (var a = arguments, b = a.length; b--;)if (!Db(a[b]))throw new wd;
            return function () {
                for (var b = arguments, c = a.length; c--;)b = [a[c].apply(this, b)];
                return b[0]
            }
        }

        function Mc(a, b) {
            return b = "number" == typeof b ? b : +b || a.length, gb(a, 4, null, null, null, b)
        }

        function Nc(a, b, c) {
            var d, e, f, g, h, i, j, k = 0, l = !1, m = !0;
            if (!Db(a))throw new wd;
            if (b = Sd(0, b) || 0, c === !0) {
                var o = !0;
                m = !1
            } else Eb(c) && (o = c.leading, l = "maxWait" in c && (Sd(b, c.maxWait) || 0), m = "trailing" in c ? c.trailing : m);
            var p = function () {
                var c = b - (oe() - g);
                if (0 >= c) {
                    e && Dd(e);
                    var l = j;
                    e = i = j = n, l && (k = oe(), f = a.apply(h, d), i || e || (d = h = null))
                } else i = Jd(p, c)
            }, q = function () {
                i && Dd(i), e = i = j = n, (m || l !== b) && (k = oe(), f = a.apply(h, d), i || e || (d = h = null))
            };
            return function () {
                if (d = arguments, g = oe(), h = this, j = m && (i || !o), l === !1)var c = o && !i; else {
                    e || o || (k = g);
                    var n = l - (g - k), r = 0 >= n;
                    r ? (e && (e = Dd(e)), k = g, f = a.apply(h, d)) : e || (e = Jd(q, n))
                }
                return r && i ? i = Dd(i) : i || b === l || (i = Jd(p, b)), c && (r = !0, f = a.apply(h, d)), !r || i || e || (d = h = null), f
            }
        }

        function Oc(a) {
            if (!Db(a))throw new wd;
            var b = l(arguments, 1);
            return Jd(function () {
                a.apply(n, b)
            }, 1)
        }

        function Pc(a, b) {
            if (!Db(a))throw new wd;
            var c = l(arguments, 2);
            return Jd(function () {
                a.apply(n, c)
            }, b)
        }

        function Qc(a, b) {
            if (!Db(a))throw new wd;
            var c = function () {
                var d = c.cache, e = b ? b.apply(this, arguments) : r + arguments[0];
                return Hd.call(d, e) ? d[e] : d[e] = a.apply(this, arguments)
            };
            return c.cache = {}, c
        }

        function Rc(a) {
            var b, c;
            if (!Db(a))throw new wd;
            return function () {
                return b ? c : (b = !0, c = a.apply(this, arguments), a = null, c)
            }
        }

        function Sc(a) {
            return gb(a, 16, l(arguments, 1))
        }

        function Tc(a) {
            return gb(a, 32, null, l(arguments, 1))
        }

        function Uc(a, b, c) {
            var d = !0, e = !0;
            if (!Db(a))throw new wd;
            return c === !1 ? d = !1 : Eb(c) && (d = "leading" in c ? c.leading : d, e = "trailing" in c ? c.trailing : e), S.leading = d, S.maxWait = b, S.trailing = e, Nc(a, b, S)
        }

        function Vc(a, b) {
            return gb(b, 16, [a])
        }

        function Wc(a) {
            return function () {
                return a
            }
        }

        function Xc(a, b, c) {
            var d = typeof a;
            if (null == a || "function" == d)return Y(a, b, c);
            if ("object" != d)return bd(a);
            var e = _d(a), f = e[0], g = a[f];
            return 1 != e.length || g !== g || Eb(g) ? function (b) {
                for (var c = e.length, d = !1; c-- && (d = bb(b[e[c]], a[e[c]], null, !0)););
                return d
            } : function (a) {
                var b = a[f];
                return g === b && (0 !== g || 1 / g == 1 / b)
            }
        }

        function Yc(a) {
            return null == a ? "" : vd(a).replace(de, hb)
        }

        function Zc(a) {
            return a
        }

        function $c(a, b, c) {
            var d = !0, e = b && ub(b);
            b && (c || e.length) || (null == c && (c = b), f = p, b = a, a = o, e = ub(b)), c === !1 ? d = !1 : Eb(c) && "chain" in c && (d = c.chain);
            var f = a, g = Db(f);
            Yb(e, function (c) {
                var e = a[c] = b[c];
                g && (f.prototype[c] = function () {
                    var b = this.__chain__, c = this.__wrapped__, g = [c];
                    Id.apply(g, arguments);
                    var h = e.apply(a, g);
                    if (d || b) {
                        if (c === h && Eb(h))return this;
                        h = new f(h), h.__chain__ = b
                    }
                    return h
                })
            })
        }

        function _c() {
            return c._ = zd, this
        }

        function ad() {
        }

        function bd(a) {
            return function (b) {
                return b[a]
            }
        }

        function cd(a, b, c) {
            var d = null == a, e = null == b;
            if (null == c && ("boolean" == typeof a && e ? (c = a, a = 1) : e || "boolean" != typeof b || (c = b, e = !0)), d && e && (b = 1), a = +a || 0, e ? (b = a, a = 0) : b = +b || 0, c || a % 1 || b % 1) {
                var f = Vd();
                return Td(a + f * (b - a + parseFloat("1e-" + ((f + "").length - 1))), b)
            }
            return db(a, b)
        }

        function dd(a, b) {
            if (a) {
                var c = a[b];
                return Db(c) ? a[b]() : c
            }
        }

        function ed(a, b, c) {
            var d = o.templateSettings;
            a = vd(a || ""), c = fe({}, c, d);
            var e, f = fe({}, c.imports, d.imports), h = _d(f), i = Rb(f), j = 0, k = c.interpolate || D, l = "__p += '", m = ud((c.escape || D).source + "|" + k.source + "|" + (k === B ? y : D).source + "|" + (c.evaluate || D).source + "|$", "g");
            a.replace(m, function (b, c, d, f, h, i) {
                return d || (d = f), l += a.slice(j, i).replace(F, g), c && (l += "' +\n__e(" + c + ") +\n'"), h && (e = !0, l += "';\n" + h + ";\n__p += '"), d && (l += "' +\n((__t = (" + d + ")) == null ? '' : __t) +\n'"), j = i + b.length, b
            }), l += "';\n";
            var p = c.variable, q = p;
            q || (p = "obj", l = "with (" + p + ") {\n" + l + "\n}\n"), l = (e ? l.replace(v, "") : l).replace(w, "$1").replace(x, "$1;"), l = "function(" + p + ") {\n" + (q ? "" : p + " || (" + p + " = {});\n") + "var __t, __p = '', __e = _.escape" + (e ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + l + "return __p\n}";
            var r = "\n/*\n//# sourceURL=" + (c.sourceURL || "/lodash/template/source[" + H++ + "]") + "\n*/";
            try {
                var s = qd(h, "return " + l + r).apply(n, i)
            } catch (t) {
                throw t.source = l, t
            }
            return b ? s(b) : (s.source = l, s)
        }

        function fd(a, b, c) {
            a = (a = +a) > -1 ? a : 0;
            var d = -1, e = nd(a);
            for (b = Y(b, c, 1); ++d < a;)e[d] = b(d);
            return e
        }

        function gd(a) {
            return null == a ? "" : vd(a).replace(ce, lb)
        }

        function hd(a) {
            var b = ++q;
            return vd(null == a ? "" : a) + b
        }

        function id(a) {
            return a = new p(a), a.__chain__ = !0, a
        }

        function jd(a, b) {
            return b(a), a
        }

        function kd() {
            return this.__chain__ = !0, this
        }

        function ld() {
            return vd(this.__wrapped__)
        }

        function md() {
            return this.__wrapped__
        }

        c = c ? _.defaults(W.Object(), c, _.pick(W, G)) : W;
        var nd = c.Array, od = c.Boolean, pd = c.Date, qd = c.Function, rd = c.Math, sd = c.Number, td = c.Object, ud = c.RegExp, vd = c.String, wd = c.TypeError, xd = [], yd = td.prototype, zd = c._, Ad = yd.toString, Bd = ud("^" + vd(Ad).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"), Cd = rd.ceil, Dd = c.clearTimeout, Ed = rd.floor, Fd = qd.prototype.toString, Gd = jb(Gd = td.getPrototypeOf) && Gd, Hd = yd.hasOwnProperty, Id = xd.push, Jd = c.setTimeout, Kd = xd.splice, Ld = xd.unshift, Md = function () {
            try {
                var a = {}, b = jb(b = td.defineProperty) && b, c = b(a, a, a) && b
            } catch (d) {
            }
            return c
        }(), Nd = jb(Nd = td.create) && Nd, Od = jb(Od = nd.isArray) && Od, Pd = c.isFinite, Qd = c.isNaN, Rd = jb(Rd = td.keys) && Rd, Sd = rd.max, Td = rd.min, Ud = c.parseInt, Vd = rd.random, Wd = {};
        Wd[J] = nd, Wd[K] = od, Wd[L] = pd, Wd[M] = qd, Wd[O] = td, Wd[N] = sd, Wd[P] = ud, Wd[Q] = vd, p.prototype = o.prototype;
        var Xd = o.support = {};
        Xd.funcDecomp = !jb(c.WinRTError) && E.test(m), Xd.funcNames = "string" == typeof qd.name, o.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: B,
            variable: "",
            imports: {_: o}
        }, Nd || (X = function () {
            function a() {
            }

            return function (b) {
                if (Eb(b)) {
                    a.prototype = b;
                    var d = new a;
                    a.prototype = null
                }
                return d || c.Object()
            }
        }());
        var Yd = Md ? function (a, b) {
            T.value = b, Md(a, "__bindData__", T)
        } : ad, Zd = Od || function (a) {
                return a && "object" == typeof a && "number" == typeof a.length && Ad.call(a) == J || !1
            }, $d = function (a) {
            var b, c = a, d = [];
            if (!c)return d;
            if (!U[typeof a])return d;
            for (b in c)Hd.call(c, b) && d.push(b);
            return d
        }, _d = Rd ? function (a) {
            return Eb(a) ? Rd(a) : []
        } : $d, ae = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }, be = wb(ae), ce = ud("(" + _d(be).join("|") + ")", "g"), de = ud("[" + _d(ae).join("") + "]", "g"), ee = function (a, b, c) {
            var d, e = a, f = e;
            if (!e)return f;
            var g = arguments, h = 0, i = "number" == typeof c ? 2 : g.length;
            if (i > 3 && "function" == typeof g[i - 2])var j = Y(g[--i - 1], g[i--], 2); else i > 2 && "function" == typeof g[i - 1] && (j = g[--i]);
            for (; ++h < i;)if (e = g[h], e && U[typeof e])for (var k = -1, l = U[typeof e] && _d(e), m = l ? l.length : 0; ++k < m;)d = l[k], f[d] = j ? j(f[d], e[d]) : e[d];
            return f
        }, fe = function (a, b, c) {
            var d, e = a, f = e;
            if (!e)return f;
            for (var g = arguments, h = 0, i = "number" == typeof c ? 2 : g.length; ++h < i;)if (e = g[h], e && U[typeof e])for (var j = -1, k = U[typeof e] && _d(e), l = k ? k.length : 0; ++j < l;)d = k[j], "undefined" == typeof f[d] && (f[d] = e[d]);
            return f
        }, ge = function (a, b, c) {
            var d, e = a, f = e;
            if (!e)return f;
            if (!U[typeof e])return f;
            b = b && "undefined" == typeof c ? b : Y(b, c, 3);
            for (d in e)if (b(e[d], d, a) === !1)return f;
            return f
        }, he = function (a, b, c) {
            var d, e = a, f = e;
            if (!e)return f;
            if (!U[typeof e])return f;
            b = b && "undefined" == typeof c ? b : Y(b, c, 3);
            for (var g = -1, h = U[typeof e] && _d(e), i = h ? h.length : 0; ++g < i;)if (d = h[g], b(e[d], d, a) === !1)return f;
            return f
        }, ie = Gd ? function (a) {
            if (!a || Ad.call(a) != O)return !1;
            var b = a.valueOf, c = jb(b) && (c = Gd(b)) && Gd(c);
            return c ? a == c || Gd(a) == c : kb(a)
        } : kb, je = fb(function (a, b, c) {
            Hd.call(a, c) ? a[c]++ : a[c] = 1
        }), ke = fb(function (a, b, c) {
            (Hd.call(a, c) ? a[c] : a[c] = []).push(b)
        }), le = fb(function (a, b, c) {
            a[c] = b
        }), me = _b, ne = Vb, oe = jb(oe = pd.now) && oe || function () {
                return (new pd).getTime()
            }, pe = 8 == Ud(u + "08") ? Ud : function (a, b) {
            return Ud(Jb(a) ? a.replace(C, "") : a, b || 0)
        };
        return o.after = Hc, o.assign = ee, o.at = Sb, o.bind = Ic, o.bindAll = Jc, o.bindKey = Kc, o.chain = id, o.compact = lc, o.compose = Lc, o.constant = Wc, o.countBy = je, o.create = pb, o.createCallback = Xc, o.curry = Mc, o.debounce = Nc, o.defaults = fe, o.defer = Oc, o.delay = Pc, o.difference = mc, o.filter = Vb, o.flatten = qc, o.forEach = Yb, o.forEachRight = Zb, o.forIn = ge, o.forInRight = sb, o.forOwn = he, o.forOwnRight = tb, o.functions = ub, o.groupBy = ke, o.indexBy = le, o.initial = sc, o.intersection = tc, o.invert = wb, o.invoke = $b, o.keys = _d, o.map = _b, o.mapValues = Lb, o.max = ac, o.memoize = Qc, o.merge = Mb, o.min = bc, o.omit = Nb, o.once = Rc, o.pairs = Ob, o.partial = Sc, o.partialRight = Tc, o.pick = Pb, o.pluck = me, o.property = bd, o.pull = wc, o.range = xc, o.reject = ec, o.remove = yc, o.rest = zc, o.shuffle = gc, o.sortBy = jc, o.tap = jd, o.throttle = Uc, o.times = fd, o.toArray = kc, o.transform = Qb, o.union = Bc, o.uniq = Cc, o.values = Rb, o.where = ne, o.without = Dc, o.wrap = Vc, o.xor = Ec, o.zip = Fc, o.zipObject = Gc, o.collect = _b, o.drop = zc, o.each = Yb, o.eachRight = Zb, o.extend = ee, o.methods = ub, o.object = Gc, o.select = Vb, o.tail = zc, o.unique = Cc, o.unzip = Fc, $c(o), o.clone = nb, o.cloneDeep = ob, o.contains = Tb, o.escape = Yc, o.every = Ub, o.find = Wb, o.findIndex = nc, o.findKey = qb, o.findLast = Xb, o.findLastIndex = oc, o.findLastKey = rb, o.has = vb, o.identity = Zc, o.indexOf = rc, o.isArguments = mb, o.isArray = Zd, o.isBoolean = xb, o.isDate = yb, o.isElement = zb,o.isEmpty = Ab,o.isEqual = Bb,o.isFinite = Cb,o.isFunction = Db,o.isNaN = Fb,o.isNull = Gb,o.isNumber = Hb,o.isObject = Eb,o.isPlainObject = ie,o.isRegExp = Ib,o.isString = Jb,o.isUndefined = Kb,o.lastIndexOf = vc,o.mixin = $c,o.noConflict = _c,o.noop = ad,o.now = oe,o.parseInt = pe,o.random = cd,o.reduce = cc,o.reduceRight = dc,o.result = dd,o.runInContext = m,o.size = hc,o.some = ic,o.sortedIndex = Ac,o.template = ed,o.unescape = gd,o.uniqueId = hd,o.all = Ub,o.any = ic,o.detect = Wb,o.findWhere = Wb,o.foldl = cc,o.foldr = dc,o.include = Tb,o.inject = cc,$c(function () {
            var a = {};
            return he(o, function (b, c) {
                o.prototype[c] || (a[c] = b)
            }), a
        }(), !1),o.first = pc,o.last = uc,o.sample = fc,o.take = pc,o.head = pc,he(o, function (a, b) {
            var c = "sample" !== b;
            o.prototype[b] || (o.prototype[b] = function (b, d) {
                var e = this.__chain__, f = a(this.__wrapped__, b, d);
                return e || null != b && (!d || c && "function" == typeof b) ? new p(f, e) : f
            })
        }),o.VERSION = "2.4.1",o.prototype.chain = kd,o.prototype.toString = ld,o.prototype.value = md,o.prototype.valueOf = md,Yb(["join", "pop", "shift"], function (a) {
            var b = xd[a];
            o.prototype[a] = function () {
                var a = this.__chain__, c = b.apply(this.__wrapped__, arguments);
                return a ? new p(c, a) : c
            }
        }),Yb(["push", "reverse", "sort", "unshift"], function (a) {
            var b = xd[a];
            o.prototype[a] = function () {
                return b.apply(this.__wrapped__, arguments), this
            }
        }),Yb(["concat", "slice", "splice"], function (a) {
            var b = xd[a];
            o.prototype[a] = function () {
                return new p(b.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }),o
    }

    var n, o = [], p = [], q = 0, r = +new Date + "", s = 75, t = 40, u = " 	\fÂ ï»¿\n\r\u2028\u2029áš€á Žâ€€â€�â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯â�Ÿã€€", v = /\b__p \+= '';/g, w = /\b(__p \+=) '' \+/g, x = /(__e\(.*?\)|\b__t\)) \+\n'';/g, y = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, z = /\w*$/, A = /^\s*function[ \n\r\t]+\w/, B = /<%=([\s\S]+?)%>/g, C = RegExp("^[" + u + "]*0+(?=.$)"), D = /($^)/, E = /\bthis\b/, F = /['\n\r\t\u2028\u2029\\]/g, G = ["Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"], H = 0, I = "[object Arguments]", J = "[object Array]", K = "[object Boolean]", L = "[object Date]", M = "[object Function]", N = "[object Number]", O = "[object Object]", P = "[object RegExp]", Q = "[object String]", R = {};
    R[M] = !1, R[I] = R[J] = R[K] = R[L] = R[N] = R[O] = R[P] = R[Q] = !0;
    var S = {leading: !1, maxWait: 0, trailing: !1}, T = {
        configurable: !1,
        enumerable: !1,
        value: null,
        writable: !1
    }, U = {"boolean": !1, "function": !0, object: !0, number: !1, string: !1, undefined: !1}, V = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, W = U[typeof window] && window || this, X = U[typeof exports] && exports && !exports.nodeType && exports, Y = U[typeof module] && module && !module.nodeType && module, Z = Y && Y.exports === X && X, $ = U[typeof global] && global;
    !$ || $.global !== $ && $.window !== $ || (W = $);
    var _ = m();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (W._ = _, define(function () {
        return _
    })) : X && Y ? Z ? (Y.exports = _)._ = _ : X._ = _ : W._ = _
}.call(this),//! moment.js
//! version : 2.8.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
    function (a) {
        function b(a, b, c) {
            switch (arguments.length) {
                case 2:
                    return null != a ? a : b;
                case 3:
                    return null != a ? a : null != b ? b : c;
                default:
                    throw new Error("Implement me")
            }
        }

        function c(a, b) {
            return zb.call(a, b)
        }

        function d() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1
            }
        }

        function e(a) {
            tb.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
        }

        function f(a, b) {
            var c = !0;
            return m(function () {
                return c && (e(a), c = !1), b.apply(this, arguments)
            }, b)
        }

        function g(a, b) {
            qc[a] || (e(b), qc[a] = !0)
        }

        function h(a, b) {
            return function (c) {
                return p(a.call(this, c), b)
            }
        }

        function i(a, b) {
            return function (c) {
                return this.localeData().ordinal(a.call(this, c), b)
            }
        }

        function j() {
        }

        function k(a, b) {
            b !== !1 && F(a), n(this, a), this._d = new Date(+a._d)
        }

        function l(a) {
            var b = y(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0, h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0;
            this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = tb.localeData(), this._bubble()
        }

        function m(a, b) {
            for (var d in b)c(b, d) && (a[d] = b[d]);
            return c(b, "toString") && (a.toString = b.toString), c(b, "valueOf") && (a.valueOf = b.valueOf), a
        }

        function n(a, b) {
            var c, d, e;
            if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = b._pf), "undefined" != typeof b._locale && (a._locale = b._locale), Ib.length > 0)for (c in Ib)d = Ib[c], e = b[d], "undefined" != typeof e && (a[d] = e);
            return a
        }

        function o(a) {
            return 0 > a ? Math.ceil(a) : Math.floor(a)
        }

        function p(a, b, c) {
            for (var d = "" + Math.abs(a), e = a >= 0; d.length < b;)d = "0" + d;
            return (e ? c ? "+" : "" : "-") + d
        }

        function q(a, b) {
            var c = {milliseconds: 0, months: 0};
            return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
        }

        function r(a, b) {
            var c;
            return b = K(b, a), a.isBefore(b) ? c = q(a, b) : (c = q(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c
        }

        function s(a, b) {
            return function (c, d) {
                var e, f;
                return null === d || isNaN(+d) || (g(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = tb.duration(c, d), t(this, e, a), this
            }
        }

        function t(a, b, c, d) {
            var e = b._milliseconds, f = b._days, g = b._months;
            d = null == d ? !0 : d, e && a._d.setTime(+a._d + e * c), f && nb(a, "Date", mb(a, "Date") + f * c), g && lb(a, mb(a, "Month") + g * c), d && tb.updateOffset(a, f || g)
        }

        function u(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }

        function v(a) {
            return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
        }

        function w(a, b, c) {
            var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0;
            for (d = 0; e > d; d++)(c && a[d] !== b[d] || !c && A(a[d]) !== A(b[d])) && g++;
            return g + f
        }

        function x(a) {
            if (a) {
                var b = a.toLowerCase().replace(/(.)s$/, "$1");
                a = jc[a] || kc[b] || b
            }
            return a
        }

        function y(a) {
            var b, d, e = {};
            for (d in a)c(a, d) && (b = x(d), b && (e[b] = a[d]));
            return e
        }

        function z(b) {
            var c, d;
            if (0 === b.indexOf("week"))c = 7, d = "day"; else {
                if (0 !== b.indexOf("month"))return;
                c = 12, d = "month"
            }
            tb[b] = function (e, f) {
                var g, h, i = tb._locale[b], j = [];
                if ("number" == typeof e && (f = e, e = a), h = function (a) {
                        var b = tb().utc().set(d, a);
                        return i.call(tb._locale, b, e || "")
                    }, null != f)return h(f);
                for (g = 0; c > g; g++)j.push(h(g));
                return j
            }
        }

        function A(a) {
            var b = +a, c = 0;
            return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)), c
        }

        function B(a, b) {
            return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
        }

        function C(a, b, c) {
            return hb(tb([a, 11, 31 + b - c]), b, c).week
        }

        function D(a) {
            return E(a) ? 366 : 365
        }

        function E(a) {
            return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
        }

        function F(a) {
            var b;
            a._a && -2 === a._pf.overflow && (b = a._a[Bb] < 0 || a._a[Bb] > 11 ? Bb : a._a[Cb] < 1 || a._a[Cb] > B(a._a[Ab], a._a[Bb]) ? Cb : a._a[Db] < 0 || a._a[Db] > 24 || 24 === a._a[Db] && (0 !== a._a[Eb] || 0 !== a._a[Fb] || 0 !== a._a[Gb]) ? Db : a._a[Eb] < 0 || a._a[Eb] > 59 ? Eb : a._a[Fb] < 0 || a._a[Fb] > 59 ? Fb : a._a[Gb] < 0 || a._a[Gb] > 999 ? Gb : -1, a._pf._overflowDayOfYear && (Ab > b || b > Cb) && (b = Cb), a._pf.overflow = b)
        }

        function G(b) {
            return null == b._isValid && (b._isValid = !isNaN(b._d.getTime()) && b._pf.overflow < 0 && !b._pf.empty && !b._pf.invalidMonth && !b._pf.nullInput && !b._pf.invalidFormat && !b._pf.userInvalidated, b._strict && (b._isValid = b._isValid && 0 === b._pf.charsLeftOver && 0 === b._pf.unusedTokens.length && b._pf.bigHour === a)), b._isValid
        }

        function H(a) {
            return a ? a.toLowerCase().replace("_", "-") : a
        }

        function I(a) {
            for (var b, c, d, e, f = 0; f < a.length;) {
                for (e = H(a[f]).split("-"), b = e.length, c = H(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                    if (d = J(e.slice(0, b).join("-")))return d;
                    if (c && c.length >= b && w(e, c, !0) >= b - 1)break;
                    b--
                }
                f++
            }
            return null
        }

        function J(a) {
            var b = null;
            if (!Hb[a] && Jb)try {
                b = tb.locale(), require("./locale/" + a), tb.locale(b)
            } catch (c) {
            }
            return Hb[a]
        }

        function K(a, b) {
            var c, d;
            return b._isUTC ? (c = b.clone(), d = (tb.isMoment(a) || v(a) ? +a : +tb(a)) - +c, c._d.setTime(+c._d + d), tb.updateOffset(c, !1), c) : tb(a).local()
        }

        function L(a) {
            return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
        }

        function M(a) {
            var b, c, d = a.match(Nb);
            for (b = 0, c = d.length; c > b; b++)d[b] = pc[d[b]] ? pc[d[b]] : L(d[b]);
            return function (e) {
                var f = "";
                for (b = 0; c > b; b++)f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
                return f
            }
        }

        function N(a, b) {
            return a.isValid() ? (b = O(b, a.localeData()), lc[b] || (lc[b] = M(b)), lc[b](a)) : a.localeData().invalidDate()
        }

        function O(a, b) {
            function c(a) {
                return b.longDateFormat(a) || a
            }

            var d = 5;
            for (Ob.lastIndex = 0; d >= 0 && Ob.test(a);)a = a.replace(Ob, c), Ob.lastIndex = 0, d -= 1;
            return a
        }

        function P(a, b) {
            var c, d = b._strict;
            switch (a) {
                case"Q":
                    return Zb;
                case"DDDD":
                    return _b;
                case"YYYY":
                case"GGGG":
                case"gggg":
                    return d ? ac : Rb;
                case"Y":
                case"G":
                case"g":
                    return cc;
                case"YYYYYY":
                case"YYYYY":
                case"GGGGG":
                case"ggggg":
                    return d ? bc : Sb;
                case"S":
                    if (d)return Zb;
                case"SS":
                    if (d)return $b;
                case"SSS":
                    if (d)return _b;
                case"DDD":
                    return Qb;
                case"MMM":
                case"MMMM":
                case"dd":
                case"ddd":
                case"dddd":
                    return Ub;
                case"a":
                case"A":
                    return b._locale._meridiemParse;
                case"x":
                    return Xb;
                case"X":
                    return Yb;
                case"Z":
                case"ZZ":
                    return Vb;
                case"T":
                    return Wb;
                case"SSSS":
                    return Tb;
                case"MM":
                case"DD":
                case"YY":
                case"GG":
                case"gg":
                case"HH":
                case"hh":
                case"mm":
                case"ss":
                case"ww":
                case"WW":
                    return d ? $b : Pb;
                case"M":
                case"D":
                case"d":
                case"H":
                case"h":
                case"m":
                case"s":
                case"w":
                case"W":
                case"e":
                case"E":
                    return Pb;
                case"Do":
                    return d ? b._locale._ordinalParse : b._locale._ordinalParseLenient;
                default:
                    return c = new RegExp(Y(X(a.replace("\\", "")), "i"))
            }
        }

        function Q(a) {
            a = a || "";
            var b = a.match(Vb) || [], c = b[b.length - 1] || [], d = (c + "").match(hc) || ["-", 0, 0], e = +(60 * d[1]) + A(d[2]);
            return "+" === d[0] ? -e : e
        }

        function R(a, b, c) {
            var d, e = c._a;
            switch (a) {
                case"Q":
                    null != b && (e[Bb] = 3 * (A(b) - 1));
                    break;
                case"M":
                case"MM":
                    null != b && (e[Bb] = A(b) - 1);
                    break;
                case"MMM":
                case"MMMM":
                    d = c._locale.monthsParse(b, a, c._strict), null != d ? e[Bb] = d : c._pf.invalidMonth = b;
                    break;
                case"D":
                case"DD":
                    null != b && (e[Cb] = A(b));
                    break;
                case"Do":
                    null != b && (e[Cb] = A(parseInt(b.match(/\d{1,2}/)[0], 10)));
                    break;
                case"DDD":
                case"DDDD":
                    null != b && (c._dayOfYear = A(b));
                    break;
                case"YY":
                    e[Ab] = tb.parseTwoDigitYear(b);
                    break;
                case"YYYY":
                case"YYYYY":
                case"YYYYYY":
                    e[Ab] = A(b);
                    break;
                case"a":
                case"A":
                    c._isPm = c._locale.isPM(b);
                    break;
                case"h":
                case"hh":
                    c._pf.bigHour = !0;
                case"H":
                case"HH":
                    e[Db] = A(b);
                    break;
                case"m":
                case"mm":
                    e[Eb] = A(b);
                    break;
                case"s":
                case"ss":
                    e[Fb] = A(b);
                    break;
                case"S":
                case"SS":
                case"SSS":
                case"SSSS":
                    e[Gb] = A(1e3 * ("0." + b));
                    break;
                case"x":
                    c._d = new Date(A(b));
                    break;
                case"X":
                    c._d = new Date(1e3 * parseFloat(b));
                    break;
                case"Z":
                case"ZZ":
                    c._useUTC = !0, c._tzm = Q(b);
                    break;
                case"dd":
                case"ddd":
                case"dddd":
                    d = c._locale.weekdaysParse(b), null != d ? (c._w = c._w || {}, c._w.d = d) : c._pf.invalidWeekday = b;
                    break;
                case"w":
                case"ww":
                case"W":
                case"WW":
                case"d":
                case"e":
                case"E":
                    a = a.substr(0, 1);
                case"gggg":
                case"GGGG":
                case"GGGGG":
                    a = a.substr(0, 2), b && (c._w = c._w || {}, c._w[a] = A(b));
                    break;
                case"gg":
                case"GG":
                    c._w = c._w || {}, c._w[a] = tb.parseTwoDigitYear(b)
            }
        }

        function S(a) {
            var c, d, e, f, g, h, i;
            c = a._w, null != c.GG || null != c.W || null != c.E ? (g = 1, h = 4, d = b(c.GG, a._a[Ab], hb(tb(), 1, 4).year), e = b(c.W, 1), f = b(c.E, 1)) : (g = a._locale._week.dow, h = a._locale._week.doy, d = b(c.gg, a._a[Ab], hb(tb(), g, h).year), e = b(c.w, 1), null != c.d ? (f = c.d, g > f && ++e) : f = null != c.e ? c.e + g : g), i = ib(d, e, f, h, g), a._a[Ab] = i.year, a._dayOfYear = i.dayOfYear
        }

        function T(a) {
            var c, d, e, f, g = [];
            if (!a._d) {
                for (e = V(a), a._w && null == a._a[Cb] && null == a._a[Bb] && S(a), a._dayOfYear && (f = b(a._a[Ab], e[Ab]), a._dayOfYear > D(f) && (a._pf._overflowDayOfYear = !0), d = db(f, 0, a._dayOfYear), a._a[Bb] = d.getUTCMonth(), a._a[Cb] = d.getUTCDate()), c = 0; 3 > c && null == a._a[c]; ++c)a._a[c] = g[c] = e[c];
                for (; 7 > c; c++)a._a[c] = g[c] = null == a._a[c] ? 2 === c ? 1 : 0 : a._a[c];
                24 === a._a[Db] && 0 === a._a[Eb] && 0 === a._a[Fb] && 0 === a._a[Gb] && (a._nextDay = !0, a._a[Db] = 0), a._d = (a._useUTC ? db : cb).apply(null, g), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() + a._tzm), a._nextDay && (a._a[Db] = 24)
            }
        }

        function U(a) {
            var b;
            a._d || (b = y(a._i), a._a = [b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], T(a))
        }

        function V(a) {
            var b = new Date;
            return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
        }

        function W(b) {
            if (b._f === tb.ISO_8601)return void $(b);
            b._a = [], b._pf.empty = !0;
            var c, d, e, f, g, h = "" + b._i, i = h.length, j = 0;
            for (e = O(b._f, b._locale).match(Nb) || [], c = 0; c < e.length; c++)f = e[c], d = (h.match(P(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && b._pf.unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), pc[f] ? (d ? b._pf.empty = !1 : b._pf.unusedTokens.push(f), R(f, d, b)) : b._strict && !d && b._pf.unusedTokens.push(f);
            b._pf.charsLeftOver = i - j, h.length > 0 && b._pf.unusedInput.push(h), b._pf.bigHour === !0 && b._a[Db] <= 12 && (b._pf.bigHour = a), b._isPm && b._a[Db] < 12 && (b._a[Db] += 12), b._isPm === !1 && 12 === b._a[Db] && (b._a[Db] = 0), T(b), F(b)
        }

        function X(a) {
            return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
                return b || c || d || e
            })
        }

        function Y(a) {
            return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function Z(a) {
            var b, c, e, f, g;
            if (0 === a._f.length)return a._pf.invalidFormat = !0, void(a._d = new Date(0 / 0));
            for (f = 0; f < a._f.length; f++)g = 0, b = n({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._pf = d(), b._f = a._f[f], W(b), G(b) && (g += b._pf.charsLeftOver, g += 10 * b._pf.unusedTokens.length, b._pf.score = g, (null == e || e > g) && (e = g, c = b));
            m(a, c || b)
        }

        function $(a) {
            var b, c, d = a._i, e = dc.exec(d);
            if (e) {
                for (a._pf.iso = !0, b = 0, c = fc.length; c > b; b++)if (fc[b][1].exec(d)) {
                    a._f = fc[b][0] + (e[6] || " ");
                    break
                }
                for (b = 0, c = gc.length; c > b; b++)if (gc[b][1].exec(d)) {
                    a._f += gc[b][0];
                    break
                }
                d.match(Vb) && (a._f += "Z"), W(a)
            } else a._isValid = !1
        }

        function _(a) {
            $(a), a._isValid === !1 && (delete a._isValid, tb.createFromInputFallback(a))
        }

        function ab(a, b) {
            var c, d = [];
            for (c = 0; c < a.length; ++c)d.push(b(a[c], c));
            return d
        }

        function bb(b) {
            var c, d = b._i;
            d === a ? b._d = new Date : v(d) ? b._d = new Date(+d) : null !== (c = Kb.exec(d)) ? b._d = new Date(+c[1]) : "string" == typeof d ? _(b) : u(d) ? (b._a = ab(d.slice(0), function (a) {
                return parseInt(a, 10)
            }), T(b)) : "object" == typeof d ? U(b) : "number" == typeof d ? b._d = new Date(d) : tb.createFromInputFallback(b)
        }

        function cb(a, b, c, d, e, f, g) {
            var h = new Date(a, b, c, d, e, f, g);
            return 1970 > a && h.setFullYear(a), h
        }

        function db(a) {
            var b = new Date(Date.UTC.apply(null, arguments));
            return 1970 > a && b.setUTCFullYear(a), b
        }

        function eb(a, b) {
            if ("string" == typeof a)if (isNaN(a)) {
                if (a = b.weekdaysParse(a), "number" != typeof a)return null
            } else a = parseInt(a, 10);
            return a
        }

        function fb(a, b, c, d, e) {
            return e.relativeTime(b || 1, !!c, a, d)
        }

        function gb(a, b, c) {
            var d = tb.duration(a).abs(), e = yb(d.as("s")), f = yb(d.as("m")), g = yb(d.as("h")), h = yb(d.as("d")), i = yb(d.as("M")), j = yb(d.as("y")), k = e < mc.s && ["s", e] || 1 === f && ["m"] || f < mc.m && ["mm", f] || 1 === g && ["h"] || g < mc.h && ["hh", g] || 1 === h && ["d"] || h < mc.d && ["dd", h] || 1 === i && ["M"] || i < mc.M && ["MM", i] || 1 === j && ["y"] || ["yy", j];
            return k[2] = b, k[3] = +a > 0, k[4] = c, fb.apply({}, k)
        }

        function hb(a, b, c) {
            var d, e = c - b, f = c - a.day();
            return f > e && (f -= 7), e - 7 > f && (f += 7), d = tb(a).add(f, "d"), {
                week: Math.ceil(d.dayOfYear() / 7),
                year: d.year()
            }
        }

        function ib(a, b, c, d, e) {
            var f, g, h = db(a, 0, 1).getUTCDay();
            return h = 0 === h ? 7 : h, c = null != c ? c : e, f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0), g = 7 * (b - 1) + (c - e) + f + 1, {
                year: g > 0 ? a : a - 1,
                dayOfYear: g > 0 ? g : D(a - 1) + g
            }
        }

        function jb(b) {
            var c, d = b._i, e = b._f;
            return b._locale = b._locale || tb.localeData(b._l), null === d || e === a && "" === d ? tb.invalid({nullInput: !0}) : ("string" == typeof d && (b._i = d = b._locale.preparse(d)), tb.isMoment(d) ? new k(d, !0) : (e ? u(e) ? Z(b) : W(b) : bb(b), c = new k(b), c._nextDay && (c.add(1, "d"), c._nextDay = a), c))
        }

        function kb(a, b) {
            var c, d;
            if (1 === b.length && u(b[0]) && (b = b[0]), !b.length)return tb();
            for (c = b[0], d = 1; d < b.length; ++d)b[d][a](c) && (c = b[d]);
            return c
        }

        function lb(a, b) {
            var c;
            return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), B(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a)
        }

        function mb(a, b) {
            return a._d["get" + (a._isUTC ? "UTC" : "") + b]()
        }

        function nb(a, b, c) {
            return "Month" === b ? lb(a, c) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
        }

        function ob(a, b) {
            return function (c) {
                return null != c ? (nb(this, a, c), tb.updateOffset(this, b), this) : mb(this, a)
            }
        }

        function pb(a) {
            return 400 * a / 146097
        }

        function qb(a) {
            return 146097 * a / 400
        }

        function rb(a) {
            tb.duration.fn[a] = function () {
                return this._data[a]
            }
        }

        function sb(a) {
            "undefined" == typeof ender && (ub = xb.moment, xb.moment = a ? f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", tb) : tb)
        }

        for (var tb, ub, vb, wb = "2.8.4", xb = "undefined" != typeof global ? global : this, yb = Math.round, zb = Object.prototype.hasOwnProperty, Ab = 0, Bb = 1, Cb = 2, Db = 3, Eb = 4, Fb = 5, Gb = 6, Hb = {}, Ib = [], Jb = "undefined" != typeof module && module && module.exports, Kb = /^\/?Date\((\-?\d+)/i, Lb = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Mb = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Nb = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, Ob = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Pb = /\d\d?/, Qb = /\d{1,3}/, Rb = /\d{1,4}/, Sb = /[+\-]?\d{1,6}/, Tb = /\d+/, Ub = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Vb = /Z|[\+\-]\d\d:?\d\d/gi, Wb = /T/i, Xb = /[\+\-]?\d+/, Yb = /[\+\-]?\d+(\.\d{1,3})?/, Zb = /\d/, $b = /\d\d/, _b = /\d{3}/, ac = /\d{4}/, bc = /[+-]?\d{6}/, cc = /[+-]?\d+/, dc = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, ec = "YYYY-MM-DDTHH:mm:ssZ", fc = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], gc = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], hc = /([\+\-]|\d\d)/gi, ic = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
            Milliseconds: 1,
            Seconds: 1e3,
            Minutes: 6e4,
            Hours: 36e5,
            Days: 864e5,
            Months: 2592e6,
            Years: 31536e6
        }), jc = {
            ms: "millisecond",
            s: "second",
            m: "minute",
            h: "hour",
            d: "day",
            D: "date",
            w: "week",
            W: "isoWeek",
            M: "month",
            Q: "quarter",
            y: "year",
            DDD: "dayOfYear",
            e: "weekday",
            E: "isoWeekday",
            gg: "weekYear",
            GG: "isoWeekYear"
        }, kc = {
            dayofyear: "dayOfYear",
            isoweekday: "isoWeekday",
            isoweek: "isoWeek",
            weekyear: "weekYear",
            isoweekyear: "isoWeekYear"
        }, lc = {}, mc = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        }, nc = "DDD w W M D d".split(" "), oc = "M D H h m s w W".split(" "), pc = {
            M: function () {
                return this.month() + 1
            }, MMM: function (a) {
                return this.localeData().monthsShort(this, a)
            }, MMMM: function (a) {
                return this.localeData().months(this, a)
            }, D: function () {
                return this.date()
            }, DDD: function () {
                return this.dayOfYear()
            }, d: function () {
                return this.day()
            }, dd: function (a) {
                return this.localeData().weekdaysMin(this, a)
            }, ddd: function (a) {
                return this.localeData().weekdaysShort(this, a)
            }, dddd: function (a) {
                return this.localeData().weekdays(this, a)
            }, w: function () {
                return this.week()
            }, W: function () {
                return this.isoWeek()
            }, YY: function () {
                return p(this.year() % 100, 2)
            }, YYYY: function () {
                return p(this.year(), 4)
            }, YYYYY: function () {
                return p(this.year(), 5)
            }, YYYYYY: function () {
                var a = this.year(), b = a >= 0 ? "+" : "-";
                return b + p(Math.abs(a), 6)
            }, gg: function () {
                return p(this.weekYear() % 100, 2)
            }, gggg: function () {
                return p(this.weekYear(), 4)
            }, ggggg: function () {
                return p(this.weekYear(), 5)
            }, GG: function () {
                return p(this.isoWeekYear() % 100, 2)
            }, GGGG: function () {
                return p(this.isoWeekYear(), 4)
            }, GGGGG: function () {
                return p(this.isoWeekYear(), 5)
            }, e: function () {
                return this.weekday()
            }, E: function () {
                return this.isoWeekday()
            }, a: function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), !0)
            }, A: function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), !1)
            }, H: function () {
                return this.hours()
            }, h: function () {
                return this.hours() % 12 || 12
            }, m: function () {
                return this.minutes()
            }, s: function () {
                return this.seconds()
            }, S: function () {
                return A(this.milliseconds() / 100)
            }, SS: function () {
                return p(A(this.milliseconds() / 10), 2)
            }, SSS: function () {
                return p(this.milliseconds(), 3)
            }, SSSS: function () {
                return p(this.milliseconds(), 3)
            }, Z: function () {
                var a = -this.zone(), b = "+";
                return 0 > a && (a = -a, b = "-"), b + p(A(a / 60), 2) + ":" + p(A(a) % 60, 2)
            }, ZZ: function () {
                var a = -this.zone(), b = "+";
                return 0 > a && (a = -a, b = "-"), b + p(A(a / 60), 2) + p(A(a) % 60, 2)
            }, z: function () {
                return this.zoneAbbr()
            }, zz: function () {
                return this.zoneName()
            }, x: function () {
                return this.valueOf()
            }, X: function () {
                return this.unix()
            }, Q: function () {
                return this.quarter()
            }
        }, qc = {}, rc = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"]; nc.length;)vb = nc.pop(), pc[vb + "o"] = i(pc[vb], vb);
        for (; oc.length;)vb = oc.pop(), pc[vb + vb] = h(pc[vb], 2);
        pc.DDDD = h(pc.DDD, 3), m(j.prototype, {
            set: function (a) {
                var b, c;
                for (c in a)b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b;
                this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
            },
            _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            months: function (a) {
                return this._months[a.month()]
            },
            _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            monthsShort: function (a) {
                return this._monthsShort[a.month()]
            },
            monthsParse: function (a, b, c) {
                var d, e, f;
                for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
                    if (e = tb.utc([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a))return d;
                    if (c && "MMM" === b && this._shortMonthsParse[d].test(a))return d;
                    if (!c && this._monthsParse[d].test(a))return d
                }
            },
            _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdays: function (a) {
                return this._weekdays[a.day()]
            },
            _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysShort: function (a) {
                return this._weekdaysShort[a.day()]
            },
            _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            weekdaysMin: function (a) {
                return this._weekdaysMin[a.day()]
            },
            weekdaysParse: function (a) {
                var b, c, d;
                for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)if (this._weekdaysParse[b] || (c = tb([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a))return b
            },
            _longDateFormat: {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY LT",
                LLLL: "dddd, MMMM D, YYYY LT"
            },
            longDateFormat: function (a) {
                var b = this._longDateFormat[a];
                return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (a) {
                    return a.slice(1)
                }), this._longDateFormat[a] = b), b
            },
            isPM: function (a) {
                return "p" === (a + "").toLowerCase().charAt(0)
            },
            _meridiemParse: /[ap]\.?m?\.?/i,
            meridiem: function (a, b, c) {
                return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
            },
            _calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            calendar: function (a, b, c) {
                var d = this._calendar[a];
                return "function" == typeof d ? d.apply(b, [c]) : d
            },
            _relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            relativeTime: function (a, b, c, d) {
                var e = this._relativeTime[c];
                return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
            },
            pastFuture: function (a, b) {
                var c = this._relativeTime[a > 0 ? "future" : "past"];
                return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
            },
            ordinal: function (a) {
                return this._ordinal.replace("%d", a)
            },
            _ordinal: "%d",
            _ordinalParse: /\d{1,2}/,
            preparse: function (a) {
                return a
            },
            postformat: function (a) {
                return a
            },
            week: function (a) {
                return hb(a, this._week.dow, this._week.doy).week
            },
            _week: {dow: 0, doy: 6},
            _invalidDate: "Invalid date",
            invalidDate: function () {
                return this._invalidDate
            }
        }), tb = function (b, c, e, f) {
            var g;
            return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._i = b, g._f = c, g._l = e, g._strict = f, g._isUTC = !1, g._pf = d(), jb(g)
        }, tb.suppressDeprecationWarnings = !1, tb.createFromInputFallback = f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (a) {
            a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
        }), tb.min = function () {
            var a = [].slice.call(arguments, 0);
            return kb("isBefore", a)
        }, tb.max = function () {
            var a = [].slice.call(arguments, 0);
            return kb("isAfter", a)
        }, tb.utc = function (b, c, e, f) {
            var g;
            return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._useUTC = !0, g._isUTC = !0, g._l = e, g._i = b, g._f = c, g._strict = f, g._pf = d(), jb(g).utc()
        }, tb.unix = function (a) {
            return tb(1e3 * a)
        }, tb.duration = function (a, b) {
            var d, e, f, g, h = a, i = null;
            return tb.isDuration(a) ? h = {
                ms: a._milliseconds,
                d: a._days,
                M: a._months
            } : "number" == typeof a ? (h = {}, b ? h[b] = a : h.milliseconds = a) : (i = Lb.exec(a)) ? (d = "-" === i[1] ? -1 : 1, h = {
                y: 0,
                d: A(i[Cb]) * d,
                h: A(i[Db]) * d,
                m: A(i[Eb]) * d,
                s: A(i[Fb]) * d,
                ms: A(i[Gb]) * d
            }) : (i = Mb.exec(a)) ? (d = "-" === i[1] ? -1 : 1, f = function (a) {
                var b = a && parseFloat(a.replace(",", "."));
                return (isNaN(b) ? 0 : b) * d
            }, h = {
                y: f(i[2]),
                M: f(i[3]),
                d: f(i[4]),
                h: f(i[5]),
                m: f(i[6]),
                s: f(i[7]),
                w: f(i[8])
            }) : "object" == typeof h && ("from" in h || "to" in h) && (g = r(tb(h.from), tb(h.to)), h = {}, h.ms = g.milliseconds, h.M = g.months), e = new l(h), tb.isDuration(a) && c(a, "_locale") && (e._locale = a._locale), e
        }, tb.version = wb, tb.defaultFormat = ec, tb.ISO_8601 = function () {
        }, tb.momentProperties = Ib, tb.updateOffset = function () {
        }, tb.relativeTimeThreshold = function (b, c) {
            return mc[b] === a ? !1 : c === a ? mc[b] : (mc[b] = c, !0)
        }, tb.lang = f("moment.lang is deprecated. Use moment.locale instead.", function (a, b) {
            return tb.locale(a, b)
        }), tb.locale = function (a, b) {
            var c;
            return a && (c = "undefined" != typeof b ? tb.defineLocale(a, b) : tb.localeData(a), c && (tb.duration._locale = tb._locale = c)), tb._locale._abbr
        }, tb.defineLocale = function (a, b) {
            return null !== b ? (b.abbr = a, Hb[a] || (Hb[a] = new j), Hb[a].set(b), tb.locale(a), Hb[a]) : (delete Hb[a], null)
        }, tb.langData = f("moment.langData is deprecated. Use moment.localeData instead.", function (a) {
            return tb.localeData(a)
        }), tb.localeData = function (a) {
            var b;
            if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a)return tb._locale;
            if (!u(a)) {
                if (b = J(a))return b;
                a = [a]
            }
            return I(a)
        }, tb.isMoment = function (a) {
            return a instanceof k || null != a && c(a, "_isAMomentObject")
        }, tb.isDuration = function (a) {
            return a instanceof l
        };
        for (vb = rc.length - 1; vb >= 0; --vb)z(rc[vb]);
        tb.normalizeUnits = function (a) {
            return x(a)
        }, tb.invalid = function (a) {
            var b = tb.utc(0 / 0);
            return null != a ? m(b._pf, a) : b._pf.userInvalidated = !0, b
        }, tb.parseZone = function () {
            return tb.apply(null, arguments).parseZone()
        }, tb.parseTwoDigitYear = function (a) {
            return A(a) + (A(a) > 68 ? 1900 : 2e3)
        }, m(tb.fn = k.prototype, {
            clone: function () {
                return tb(this)
            },
            valueOf: function () {
                return +this._d + 6e4 * (this._offset || 0)
            },
            unix: function () {
                return Math.floor(+this / 1e3)
            },
            toString: function () {
                return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            },
            toDate: function () {
                return this._offset ? new Date(+this) : this._d
            },
            toISOString: function () {
                var a = tb(this).utc();
                return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : N(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : N(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            },
            toArray: function () {
                var a = this;
                return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
            },
            isValid: function () {
                return G(this)
            },
            isDSTShifted: function () {
                return this._a ? this.isValid() && w(this._a, (this._isUTC ? tb.utc(this._a) : tb(this._a)).toArray()) > 0 : !1
            },
            parsingFlags: function () {
                return m({}, this._pf)
            },
            invalidAt: function () {
                return this._pf.overflow
            },
            utc: function (a) {
                return this.zone(0, a)
            },
            local: function (a) {
                return this._isUTC && (this.zone(0, a), this._isUTC = !1, a && this.add(this._dateTzOffset(), "m")), this
            },
            format: function (a) {
                var b = N(this, a || tb.defaultFormat);
                return this.localeData().postformat(b)
            },
            add: s(1, "add"),
            subtract: s(-1, "subtract"),
            diff: function (a, b, c) {
                var d, e, f, g = K(a, this), h = 6e4 * (this.zone() - g.zone());
                return b = x(b), "year" === b || "month" === b ? (d = 432e5 * (this.daysInMonth() + g.daysInMonth()), e = 12 * (this.year() - g.year()) + (this.month() - g.month()), f = this - tb(this).startOf("month") - (g - tb(g).startOf("month")), f -= 6e4 * (this.zone() - tb(this).startOf("month").zone() - (g.zone() - tb(g).startOf("month").zone())), e += f / d, "year" === b && (e /= 12)) : (d = this - g, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - h) / 864e5 : "week" === b ? (d - h) / 6048e5 : d), c ? e : o(e)
            },
            from: function (a, b) {
                return tb.duration({to: this, from: a}).locale(this.locale()).humanize(!b)
            },
            fromNow: function (a) {
                return this.from(tb(), a)
            },
            calendar: function (a) {
                var b = a || tb(), c = K(b, this).startOf("day"), d = this.diff(c, "days", !0), e = -6 > d ? "sameElse" : -1 > d ? "lastWeek" : 0 > d ? "lastDay" : 1 > d ? "sameDay" : 2 > d ? "nextDay" : 7 > d ? "nextWeek" : "sameElse";
                return this.format(this.localeData().calendar(e, this, tb(b)))
            },
            isLeapYear: function () {
                return E(this.year())
            },
            isDST: function () {
                return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
            },
            day: function (a) {
                var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != a ? (a = eb(a, this.localeData()), this.add(a - b, "d")) : b
            },
            month: ob("Month", !0),
            startOf: function (a) {
                switch (a = x(a)) {
                    case"year":
                        this.month(0);
                    case"quarter":
                    case"month":
                        this.date(1);
                    case"week":
                    case"isoWeek":
                    case"day":
                        this.hours(0);
                    case"hour":
                        this.minutes(0);
                    case"minute":
                        this.seconds(0);
                    case"second":
                        this.milliseconds(0)
                }
                return "week" === a ? this.weekday(0) : "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
            },
            endOf: function (b) {
                return b = x(b), b === a || "millisecond" === b ? this : this.startOf(b).add(1, "isoWeek" === b ? "week" : b).subtract(1, "ms")
            },
            isAfter: function (a, b) {
                var c;
                return b = x("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = tb.isMoment(a) ? a : tb(a), +this > +a) : (c = tb.isMoment(a) ? +a : +tb(a), c < +this.clone().startOf(b))
            },
            isBefore: function (a, b) {
                var c;
                return b = x("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = tb.isMoment(a) ? a : tb(a), +a > +this) : (c = tb.isMoment(a) ? +a : +tb(a), +this.clone().endOf(b) < c)
            },
            isSame: function (a, b) {
                var c;
                return b = x(b || "millisecond"), "millisecond" === b ? (a = tb.isMoment(a) ? a : tb(a), +this === +a) : (c = +tb(a), +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))
            },
            min: f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function (a) {
                return a = tb.apply(null, arguments), this > a ? this : a
            }),
            max: f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function (a) {
                return a = tb.apply(null, arguments), a > this ? this : a
            }),
            zone: function (a, b) {
                var c, d = this._offset || 0;
                return null == a ? this._isUTC ? d : this._dateTzOffset() : ("string" == typeof a && (a = Q(a)), Math.abs(a) < 16 && (a = 60 * a), !this._isUTC && b && (c = this._dateTzOffset()), this._offset = a, this._isUTC = !0, null != c && this.subtract(c, "m"), d !== a && (!b || this._changeInProgress ? t(this, tb.duration(d - a, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, tb.updateOffset(this, !0), this._changeInProgress = null)), this)
            },
            zoneAbbr: function () {
                return this._isUTC ? "UTC" : ""
            },
            zoneName: function () {
                return this._isUTC ? "Coordinated Universal Time" : ""
            },
            parseZone: function () {
                return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), this
            },
            hasAlignedHourOffset: function (a) {
                return a = a ? tb(a).zone() : 0, (this.zone() - a) % 60 === 0
            },
            daysInMonth: function () {
                return B(this.year(), this.month())
            },
            dayOfYear: function (a) {
                var b = yb((tb(this).startOf("day") - tb(this).startOf("year")) / 864e5) + 1;
                return null == a ? b : this.add(a - b, "d")
            },
            quarter: function (a) {
                return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
            },
            weekYear: function (a) {
                var b = hb(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
                return null == a ? b : this.add(a - b, "y")
            },
            isoWeekYear: function (a) {
                var b = hb(this, 1, 4).year;
                return null == a ? b : this.add(a - b, "y")
            },
            week: function (a) {
                var b = this.localeData().week(this);
                return null == a ? b : this.add(7 * (a - b), "d")
            },
            isoWeek: function (a) {
                var b = hb(this, 1, 4).week;
                return null == a ? b : this.add(7 * (a - b), "d")
            },
            weekday: function (a) {
                var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
                return null == a ? b : this.add(a - b, "d")
            },
            isoWeekday: function (a) {
                return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
            },
            isoWeeksInYear: function () {
                return C(this.year(), 1, 4)
            },
            weeksInYear: function () {
                var a = this.localeData()._week;
                return C(this.year(), a.dow, a.doy)
            },
            get: function (a) {
                return a = x(a), this[a]()
            },
            set: function (a, b) {
                return a = x(a), "function" == typeof this[a] && this[a](b), this
            },
            locale: function (b) {
                var c;
                return b === a ? this._locale._abbr : (c = tb.localeData(b), null != c && (this._locale = c), this)
            },
            lang: f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (b) {
                return b === a ? this.localeData() : this.locale(b)
            }),
            localeData: function () {
                return this._locale
            },
            _dateTzOffset: function () {
                return 15 * Math.round(this._d.getTimezoneOffset() / 15)
            }
        }), tb.fn.millisecond = tb.fn.milliseconds = ob("Milliseconds", !1), tb.fn.second = tb.fn.seconds = ob("Seconds", !1), tb.fn.minute = tb.fn.minutes = ob("Minutes", !1), tb.fn.hour = tb.fn.hours = ob("Hours", !0), tb.fn.date = ob("Date", !0), tb.fn.dates = f("dates accessor is deprecated. Use date instead.", ob("Date", !0)), tb.fn.year = ob("FullYear", !0), tb.fn.years = f("years accessor is deprecated. Use year instead.", ob("FullYear", !0)), tb.fn.days = tb.fn.day, tb.fn.months = tb.fn.month, tb.fn.weeks = tb.fn.week, tb.fn.isoWeeks = tb.fn.isoWeek, tb.fn.quarters = tb.fn.quarter, tb.fn.toJSON = tb.fn.toISOString, m(tb.duration.fn = l.prototype, {
            _bubble: function () {
                var a, b, c, d = this._milliseconds, e = this._days, f = this._months, g = this._data, h = 0;
                g.milliseconds = d % 1e3, a = o(d / 1e3), g.seconds = a % 60, b = o(a / 60), g.minutes = b % 60, c = o(b / 60), g.hours = c % 24, e += o(c / 24), h = o(pb(e)), e -= o(qb(h)), f += o(e / 30), e %= 30, h += o(f / 12), f %= 12, g.days = e, g.months = f, g.years = h
            },
            abs: function () {
                return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
            },
            weeks: function () {
                return o(this.days() / 7)
            },
            valueOf: function () {
                return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * A(this._months / 12)
            },
            humanize: function (a) {
                var b = gb(this, !a, this.localeData());
                return a && (b = this.localeData().pastFuture(+this, b)), this.localeData().postformat(b)
            },
            add: function (a, b) {
                var c = tb.duration(a, b);
                return this._milliseconds += c._milliseconds, this._days += c._days, this._months += c._months, this._bubble(), this
            },
            subtract: function (a, b) {
                var c = tb.duration(a, b);
                return this._milliseconds -= c._milliseconds, this._days -= c._days, this._months -= c._months, this._bubble(), this
            },
            get: function (a) {
                return a = x(a), this[a.toLowerCase() + "s"]()
            },
            as: function (a) {
                var b, c;
                if (a = x(a), "month" === a || "year" === a)return b = this._days + this._milliseconds / 864e5, c = this._months + 12 * pb(b), "month" === a ? c : c / 12;
                switch (b = this._days + Math.round(qb(this._months / 12)), a) {
                    case"week":
                        return b / 7 + this._milliseconds / 6048e5;
                    case"day":
                        return b + this._milliseconds / 864e5;
                    case"hour":
                        return 24 * b + this._milliseconds / 36e5;
                    case"minute":
                        return 24 * b * 60 + this._milliseconds / 6e4;
                    case"second":
                        return 24 * b * 60 * 60 + this._milliseconds / 1e3;
                    case"millisecond":
                        return Math.floor(24 * b * 60 * 60 * 1e3) + this._milliseconds;
                    default:
                        throw new Error("Unknown unit " + a)
                }
            },
            lang: tb.fn.lang,
            locale: tb.fn.locale,
            toIsoString: f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function () {
                return this.toISOString()
            }),
            toISOString: function () {
                var a = Math.abs(this.years()), b = Math.abs(this.months()), c = Math.abs(this.days()), d = Math.abs(this.hours()), e = Math.abs(this.minutes()), f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
                return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"
            },
            localeData: function () {
                return this._locale
            }
        }), tb.duration.fn.toString = tb.duration.fn.toISOString;
        for (vb in ic)c(ic, vb) && rb(vb.toLowerCase());
        tb.duration.fn.asMilliseconds = function () {
            return this.as("ms")
        }, tb.duration.fn.asSeconds = function () {
            return this.as("s")
        }, tb.duration.fn.asMinutes = function () {
            return this.as("m")
        }, tb.duration.fn.asHours = function () {
            return this.as("h")
        }, tb.duration.fn.asDays = function () {
            return this.as("d")
        }, tb.duration.fn.asWeeks = function () {
            return this.as("weeks")
        }, tb.duration.fn.asMonths = function () {
            return this.as("M")
        }, tb.duration.fn.asYears = function () {
            return this.as("y")
        }, tb.locale("en", {
            ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (a) {
                var b = a % 10, c = 1 === A(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
                return a + c
            }
        }), Jb ? module.exports = tb : "function" == typeof define && define.amd ? (define("moment", function (a, b, c) {
            return c.config && c.config() && c.config().noGlobal === !0 && (xb.moment = ub), tb
        }), sb(!0)) : sb()
    }.call(this), /*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
    function () {
        function a(a) {
            this._value = a
        }

        function b(a, b, c, d) {
            var e, f, g = Math.pow(10, b);
            return f = (c(a * g) / g).toFixed(b), d && (e = new RegExp("0{1," + d + "}$"), f = f.replace(e, "")), f
        }

        function c(a, b, c) {
            var d;
            return d = b.indexOf("$") > -1 ? e(a, b, c) : b.indexOf("%") > -1 ? f(a, b, c) : b.indexOf(":") > -1 ? g(a, b) : i(a._value, b, c)
        }

        function d(a, b) {
            var c, d, e, f, g, i = b, j = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], k = !1;
            if (b.indexOf(":") > -1)a._value = h(b); else if (b === q)a._value = 0; else {
                for ("." !== o[p].delimiters.decimal && (b = b.replace(/\./g, "").replace(o[p].delimiters.decimal, ".")), c = new RegExp("[^a-zA-Z]" + o[p].abbreviations.thousand + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), d = new RegExp("[^a-zA-Z]" + o[p].abbreviations.million + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), e = new RegExp("[^a-zA-Z]" + o[p].abbreviations.billion + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), f = new RegExp("[^a-zA-Z]" + o[p].abbreviations.trillion + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), g = 0; g <= j.length && !(k = b.indexOf(j[g]) > -1 ? Math.pow(1024, g + 1) : !1); g++);
                a._value = (k ? k : 1) * (i.match(c) ? Math.pow(10, 3) : 1) * (i.match(d) ? Math.pow(10, 6) : 1) * (i.match(e) ? Math.pow(10, 9) : 1) * (i.match(f) ? Math.pow(10, 12) : 1) * (b.indexOf("%") > -1 ? .01 : 1) * ((b.split("-").length + Math.min(b.split("(").length - 1, b.split(")").length - 1)) % 2 ? 1 : -1) * Number(b.replace(/[^0-9\.]+/g, "")), a._value = k ? Math.ceil(a._value) : a._value
            }
            return a._value
        }

        function e(a, b, c) {
            var d, e, f = b.indexOf("$"), g = b.indexOf("("), h = b.indexOf("-"), j = "";
            return b.indexOf(" $") > -1 ? (j = " ", b = b.replace(" $", "")) : b.indexOf("$ ") > -1 ? (j = " ", b = b.replace("$ ", "")) : b = b.replace("$", ""), e = i(a._value, b, c), 1 >= f ? e.indexOf("(") > -1 || e.indexOf("-") > -1 ? (e = e.split(""), d = 1, (g > f || h > f) && (d = 0), e.splice(d, 0, o[p].currency.symbol + j), e = e.join("")) : e = o[p].currency.symbol + j + e : e.indexOf(")") > -1 ? (e = e.split(""), e.splice(-1, 0, j + o[p].currency.symbol), e = e.join("")) : e = e + j + o[p].currency.symbol, e
        }

        function f(a, b, c) {
            var d, e = "", f = 100 * a._value;
            return b.indexOf(" %") > -1 ? (e = " ", b = b.replace(" %", "")) : b = b.replace("%", ""), d = i(f, b, c), d.indexOf(")") > -1 ? (d = d.split(""), d.splice(-1, 0, e + "%"), d = d.join("")) : d = d + e + "%", d
        }

        function g(a) {
            var b = Math.floor(a._value / 60 / 60), c = Math.floor((a._value - 60 * b * 60) / 60), d = Math.round(a._value - 60 * b * 60 - 60 * c);
            return b + ":" + (10 > c ? "0" + c : c) + ":" + (10 > d ? "0" + d : d)
        }

        function h(a) {
            var b = a.split(":"), c = 0;
            return 3 === b.length ? (c += 60 * Number(b[0]) * 60, c += 60 * Number(b[1]), c += Number(b[2])) : 2 === b.length && (c += 60 * Number(b[0]), c += Number(b[1])), Number(c)
        }

        function i(a, c, d) {
            var e, f, g, h, i, j, k = !1, l = !1, m = !1, n = "", r = !1, s = !1, t = !1, u = !1, v = !1, w = "", x = "", y = Math.abs(a), z = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], A = "", B = !1;
            if (0 === a && null !== q)return q;
            if (c.indexOf("(") > -1 ? (k = !0, c = c.slice(1, -1)) : c.indexOf("+") > -1 && (l = !0, c = c.replace(/\+/g, "")), c.indexOf("a") > -1 && (r = c.indexOf("aK") >= 0, s = c.indexOf("aM") >= 0, t = c.indexOf("aB") >= 0, u = c.indexOf("aT") >= 0, v = r || s || t || u, c.indexOf(" a") > -1 ? (n = " ", c = c.replace(" a", "")) : c = c.replace("a", ""), y >= Math.pow(10, 12) && !v || u ? (n += o[p].abbreviations.trillion, a /= Math.pow(10, 12)) : y < Math.pow(10, 12) && y >= Math.pow(10, 9) && !v || t ? (n += o[p].abbreviations.billion, a /= Math.pow(10, 9)) : y < Math.pow(10, 9) && y >= Math.pow(10, 6) && !v || s ? (n += o[p].abbreviations.million, a /= Math.pow(10, 6)) : (y < Math.pow(10, 6) && y >= Math.pow(10, 3) && !v || r) && (n += o[p].abbreviations.thousand, a /= Math.pow(10, 3))), c.indexOf("b") > -1)for (c.indexOf(" b") > -1 ? (w = " ", c = c.replace(" b", "")) : c = c.replace("b", ""), g = 0; g <= z.length; g++)if (e = Math.pow(1024, g), f = Math.pow(1024, g + 1), a >= e && f > a) {
                w += z[g], e > 0 && (a /= e);
                break
            }
            return c.indexOf("o") > -1 && (c.indexOf(" o") > -1 ? (x = " ", c = c.replace(" o", "")) : c = c.replace("o", ""), x += o[p].ordinal(a)), c.indexOf("[.]") > -1 && (m = !0, c = c.replace("[.]", ".")), h = a.toString().split(".")[0], i = c.split(".")[1], j = c.indexOf(","), i ? (i.indexOf("[") > -1 ? (i = i.replace("]", ""), i = i.split("["), A = b(a, i[0].length + i[1].length, d, i[1].length)) : A = b(a, i.length, d), h = A.split(".")[0], A = A.split(".")[1].length ? o[p].delimiters.decimal + A.split(".")[1] : "", m && 0 === Number(A.slice(1)) && (A = "")) : h = b(a, null, d), h.indexOf("-") > -1 && (h = h.slice(1), B = !0), j > -1 && (h = h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + o[p].delimiters.thousands)), 0 === c.indexOf(".") && (h = ""), (k && B ? "(" : "") + (!k && B ? "-" : "") + (!B && l ? "+" : "") + h + A + (x ? x : "") + (n ? n : "") + (w ? w : "") + (k && B ? ")" : "")
        }

        function j(a, b) {
            o[a] = b
        }

        function k(a) {
            var b = a.toString().split(".");
            return b.length < 2 ? 1 : Math.pow(10, b[1].length)
        }

        function l() {
            var a = Array.prototype.slice.call(arguments);
            return a.reduce(function (a, b) {
                var c = k(a), d = k(b);
                return c > d ? c : d
            }, -1 / 0)
        }

        var m, n = "1.5.3", o = {}, p = "en", q = null, r = "0,0", s = "undefined" != typeof module && module.exports;
        m = function (b) {
            return m.isNumeral(b) ? b = b.value() : 0 === b || "undefined" == typeof b ? b = 0 : Number(b) || (b = m.fn.unformat(b)), new a(Number(b))
        }, m.version = n, m.isNumeral = function (b) {
            return b instanceof a
        }, m.language = function (a, b) {
            if (!a)return p;
            if (a && !b) {
                if (!o[a])throw new Error("Unknown language : " + a);
                p = a
            }
            return (b || !o[a]) && j(a, b), m
        }, m.languageData = function (a) {
            if (!a)return o[p];
            if (!o[a])throw new Error("Unknown language : " + a);
            return o[a]
        }, m.language("en", {
            delimiters: {thousands: ",", decimal: "."},
            abbreviations: {thousand: "k", million: "m", billion: "b", trillion: "t"},
            ordinal: function (a) {
                var b = a % 10;
                return 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th"
            },
            currency: {symbol: "$"}
        }), m.zeroFormat = function (a) {
            q = "string" == typeof a ? a : null
        }, m.defaultFormat = function (a) {
            r = "string" == typeof a ? a : "0.0"
        }, "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function (a, b) {
            "use strict";
            if (null === this || "undefined" == typeof this)throw new TypeError("Array.prototype.reduce called on null or undefined");
            if ("function" != typeof a)throw new TypeError(a + " is not a function");
            var c, d, e = this.length >>> 0, f = !1;
            for (1 < arguments.length && (d = b, f = !0), c = 0; e > c; ++c)this.hasOwnProperty(c) && (f ? d = a(d, this[c], c, this) : (d = this[c], f = !0));
            if (!f)throw new TypeError("Reduce of empty array with no initial value");
            return d
        }), m.fn = a.prototype = {
            clone: function () {
                return m(this)
            }, format: function (a, b) {
                return c(this, a ? a : r, void 0 !== b ? b : Math.round)
            }, unformat: function (a) {
                return "[object Number]" === Object.prototype.toString.call(a) ? a : d(this, a ? a : r)
            }, value: function () {
                return this._value
            }, valueOf: function () {
                return this._value
            }, set: function (a) {
                return this._value = Number(a), this
            }, add: function (a) {
                function b(a, b) {
                    return a + c * b
                }

                var c = l.call(null, this._value, a);
                return this._value = [this._value, a].reduce(b, 0) / c, this
            }, subtract: function (a) {
                function b(a, b) {
                    return a - c * b
                }

                var c = l.call(null, this._value, a);
                return this._value = [a].reduce(b, this._value * c) / c, this
            }, multiply: function (a) {
                function b(a, b) {
                    var c = l(a, b);
                    return a * c * b * c / (c * c)
                }

                return this._value = [this._value, a].reduce(b, 1), this
            }, divide: function (a) {
                function b(a, b) {
                    var c = l(a, b);
                    return a * c / (b * c)
                }

                return this._value = [this._value, a].reduce(b), this
            }, difference: function (a) {
                return Math.abs(m(this._value).subtract(a).value())
            }
        }, s && (module.exports = m), "undefined" == typeof ender && (this.numeral = m), "function" == typeof define && define.amd && define([], function () {
            return m
        })
    }.call(this), /*!
 * jquery.inputmask.bundle
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 - 2015 Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 3.1.57
 */
    !function (a) {
        function b(a) {
            var b = document.createElement("input"), c = "on" + a, d = c in b;
            return d || (b.setAttribute(c, "return;"), d = "function" == typeof b[c]), b = null, d
        }

        function c(a) {
            var b = "text" == a || "tel" == a;
            if (!b) {
                var c = document.createElement("input");
                c.setAttribute("type", a), b = "text" === c.type, c = null
            }
            return b
        }

        function d(b, c, e) {
            var f = e.aliases[b];
            return f ? (f.alias && d(f.alias, void 0, e), a.extend(!0, e, f), a.extend(!0, e, c), !0) : !1
        }

        function e(b) {
            function c(c) {
                function d(a, b, c, d) {
                    this.matches = [], this.isGroup = a || !1, this.isOptional = b || !1, this.isQuantifier = c || !1, this.isAlternator = d || !1, this.quantifier = {
                        min: 1,
                        max: 1
                    }
                }

                function e(c, d, e) {
                    var f = b.definitions[d], g = 0 == c.matches.length;
                    if (e = void 0 != e ? e : c.matches.length, f && !m) {
                        f.placeholder = a.isFunction(f.placeholder) ? f.placeholder.call(this, b) : f.placeholder;
                        for (var h = f.prevalidator, i = h ? h.length : 0, j = 1; j < f.cardinality; j++) {
                            var k = i >= j ? h[j - 1] : [], l = k.validator, n = k.cardinality;
                            c.matches.splice(e++, 0, {
                                fn: l ? "string" == typeof l ? new RegExp(l) : new function () {
                                    this.test = l
                                } : new RegExp("."),
                                cardinality: n ? n : 1,
                                optionality: c.isOptional,
                                newBlockMarker: g,
                                casing: f.casing,
                                def: f.definitionSymbol || d,
                                placeholder: f.placeholder,
                                mask: d
                            })
                        }
                        c.matches.splice(e++, 0, {
                            fn: f.validator ? "string" == typeof f.validator ? new RegExp(f.validator) : new function () {
                                this.test = f.validator
                            } : new RegExp("."),
                            cardinality: f.cardinality,
                            optionality: c.isOptional,
                            newBlockMarker: g,
                            casing: f.casing,
                            def: f.definitionSymbol || d,
                            placeholder: f.placeholder,
                            mask: d
                        })
                    } else c.matches.splice(e++, 0, {
                        fn: null,
                        cardinality: 0,
                        optionality: c.isOptional,
                        newBlockMarker: g,
                        casing: null,
                        def: d,
                        placeholder: void 0,
                        mask: d
                    }), m = !1
                }

                for (var f, g, h, i, j, k, l = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g, m = !1, n = new d, o = [], p = []; f = l.exec(c);)switch (g = f[0], g.charAt(0)) {
                    case b.optionalmarker.end:
                    case b.groupmarker.end:
                        if (h = o.pop(), o.length > 0) {
                            if (i = o[o.length - 1], i.matches.push(h), i.isAlternator) {
                                j = o.pop();
                                for (var q = 0; q < j.matches.length; q++)j.matches[q].isGroup = !1;
                                o.length > 0 ? (i = o[o.length - 1], i.matches.push(j)) : n.matches.push(j)
                            }
                        } else n.matches.push(h);
                        break;
                    case b.optionalmarker.start:
                        o.push(new d(!1, !0));
                        break;
                    case b.groupmarker.start:
                        o.push(new d(!0));
                        break;
                    case b.quantifiermarker.start:
                        var r = new d(!1, !1, !0);
                        g = g.replace(/[{}]/g, "");
                        var s = g.split(","), t = isNaN(s[0]) ? s[0] : parseInt(s[0]), u = 1 == s.length ? t : isNaN(s[1]) ? s[1] : parseInt(s[1]);
                        if (("*" == u || "+" == u) && (t = "*" == u ? 0 : 1), r.quantifier = {
                                min: t,
                                max: u
                            }, o.length > 0) {
                            var v = o[o.length - 1].matches;
                            if (f = v.pop(), !f.isGroup) {
                                var w = new d(!0);
                                w.matches.push(f), f = w
                            }
                            v.push(f), v.push(r)
                        } else {
                            if (f = n.matches.pop(), !f.isGroup) {
                                var w = new d(!0);
                                w.matches.push(f), f = w
                            }
                            n.matches.push(f), n.matches.push(r)
                        }
                        break;
                    case b.escapeChar:
                        m = !0;
                        break;
                    case b.alternatormarker:
                        o.length > 0 ? (i = o[o.length - 1], k = i.matches.pop()) : k = n.matches.pop(), k.isAlternator ? o.push(k) : (j = new d(!1, !1, !1, !0), j.matches.push(k), o.push(j));
                        break;
                    default:
                        if (o.length > 0) {
                            if (i = o[o.length - 1], i.matches.length > 0 && (k = i.matches[i.matches.length - 1], k.isGroup && (k.isGroup = !1, e(k, b.groupmarker.start, 0), e(k, b.groupmarker.end))), e(i, g), i.isAlternator) {
                                j = o.pop();
                                for (var q = 0; q < j.matches.length; q++)j.matches[q].isGroup = !1;
                                o.length > 0 ? (i = o[o.length - 1], i.matches.push(j)) : n.matches.push(j)
                            }
                        } else n.matches.length > 0 && (k = n.matches[n.matches.length - 1], k.isGroup && (k.isGroup = !1, e(k, b.groupmarker.start, 0), e(k, b.groupmarker.end))), e(n, g)
                }
                return n.matches.length > 0 && (k = n.matches[n.matches.length - 1], k.isGroup && (k.isGroup = !1, e(k, b.groupmarker.start, 0), e(k, b.groupmarker.end)), p.push(n)), p
            }

            function d(d, e) {
                if (void 0 == d || "" == d)return void 0;
                if (1 == d.length && 0 == b.greedy && 0 != b.repeat && (b.placeholder = ""), b.repeat > 0 || "*" == b.repeat || "+" == b.repeat) {
                    var f = "*" == b.repeat ? 0 : "+" == b.repeat ? 1 : b.repeat;
                    d = b.groupmarker.start + d + b.groupmarker.end + b.quantifiermarker.start + f + "," + b.repeat + b.quantifiermarker.end
                }
                return void 0 == a.inputmask.masksCache[d] && (a.inputmask.masksCache[d] = {
                    mask: d,
                    maskToken: c(d),
                    validPositions: {},
                    _buffer: void 0,
                    buffer: void 0,
                    tests: {},
                    metadata: e
                }), a.extend(!0, {}, a.inputmask.masksCache[d])
            }

            function e(a) {
                if (a = a.toString(), b.numericInput) {
                    a = a.split("").reverse();
                    for (var c = 0; c < a.length; c++)a[c] == b.optionalmarker.start ? a[c] = b.optionalmarker.end : a[c] == b.optionalmarker.end ? a[c] = b.optionalmarker.start : a[c] == b.groupmarker.start ? a[c] = b.groupmarker.end : a[c] == b.groupmarker.end && (a[c] = b.groupmarker.start);
                    a = a.join("")
                }
                return a
            }

            var f = void 0;
            if (a.isFunction(b.mask) && (b.mask = b.mask.call(this, b)), a.isArray(b.mask)) {
                if (b.mask.length > 1) {
                    b.keepStatic = void 0 == b.keepStatic ? !0 : b.keepStatic;
                    var g = "(";
                    return a.each(b.mask, function (b, c) {
                        g.length > 1 && (g += ")|("), g += e(void 0 == c.mask || a.isFunction(c.mask) ? c : c.mask)
                    }), g += ")", d(g, b.mask)
                }
                b.mask = b.mask.pop()
            }
            return b.mask && (f = void 0 == b.mask.mask || a.isFunction(b.mask.mask) ? d(e(b.mask), b.mask) : d(e(b.mask.mask), b.mask)), f
        }

        function f(d, e, f) {
            function g(a, b, c) {
                b = b || 0;
                var d, e, f, g = [], h = 0;
                do {
                    if (a === !0 && k().validPositions[h]) {
                        var i = k().validPositions[h];
                        e = i.match, d = i.locator.slice(), g.push(c === !0 ? i.input : F(h, e))
                    } else f = p(h, d, h - 1), e = f.match, d = f.locator.slice(), g.push(F(h, e));
                    h++
                } while ((void 0 == db || db > h - 1) && null != e.fn || null == e.fn && "" != e.def || b >= h);
                return g.pop(), g
            }

            function k() {
                return e
            }

            function l(a) {
                var b = k();
                b.buffer = void 0, b.tests = {}, a !== !0 && (b._buffer = void 0, b.validPositions = {}, b.p = 0)
            }

            function m(a) {
                var b = k(), c = -1, d = b.validPositions;
                void 0 == a && (a = -1);
                var e = c, f = c;
                for (var g in d) {
                    var h = parseInt(g);
                    (-1 == a || null != d[h].match.fn) && (a >= h && (e = h), h >= a && (f = h))
                }
                return c = -1 != e && a - e > 1 || a > f ? e : f
            }

            function n(b, c, d) {
                if (f.insertMode && void 0 != k().validPositions[b] && void 0 == d) {
                    var e, g = a.extend(!0, {}, k().validPositions), h = m();
                    for (e = b; h >= e; e++)delete k().validPositions[e];
                    k().validPositions[b] = c;
                    var i, j = !0;
                    for (e = b; h >= e; e++) {
                        var l = g[e];
                        if (void 0 != l) {
                            var n = k().validPositions;
                            i = !f.keepStatic && n[e] && (void 0 != n[e + 1] && s(e + 1, n[e].locator.slice(), e).length > 1 || void 0 != n[e].alternation) ? e + 1 : B(e), j = r(i, l.match.def) ? j && y(i, l.input, !0, !0) !== !1 : null == l.match.fn
                        }
                        if (!j)break
                    }
                    if (!j)return k().validPositions = a.extend(!0, {}, g), !1
                } else k().validPositions[b] = c;
                return !0
            }

            function o(a, b, c, d) {
                var e, g = a;
                for (k().p = a, void 0 != k().validPositions[a] && k().validPositions[a].input == f.radixPoint && (b++, g++), e = g; b > e; e++)void 0 != k().validPositions[e] && (c === !0 || 0 != f.canClearPosition(k(), e, m(), d, f)) && delete k().validPositions[e];
                for (l(!0), e = g + 1; e <= m();) {
                    for (; void 0 != k().validPositions[g];)g++;
                    var h = k().validPositions[g];
                    g > e && (e = g + 1);
                    var i = k().validPositions[e];
                    void 0 != i && void 0 == h ? (r(g, i.match.def) && y(g, i.input, !0) !== !1 && (delete k().validPositions[e], e++), g++) : e++
                }
                var j = m();
                j >= a && void 0 != k().validPositions[j] && k().validPositions[j].input == f.radixPoint && delete k().validPositions[j], l(!0)
            }

            function p(a, b, c) {
                for (var d, e = s(a, b, c), g = m(), h = k().validPositions[g] || s(0)[0], i = void 0 != h.alternation ? h.locator[h.alternation].split(",") : [], j = 0; j < e.length && (d = e[j], !(d.match && (f.greedy && d.match.optionalQuantifier !== !0 || (d.match.optionality === !1 || d.match.newBlockMarker === !1) && d.match.optionalQuantifier !== !0) && (void 0 == h.alternation || void 0 != d.locator[h.alternation] && x(d.locator[h.alternation].toString().split(","), i)))); j++);
                return d
            }

            function q(a) {
                return k().validPositions[a] ? k().validPositions[a].match : s(a)[0].match
            }

            function r(a, b) {
                for (var c = !1, d = s(a), e = 0; e < d.length; e++)if (d[e].match && d[e].match.def == b) {
                    c = !0;
                    break
                }
                return c
            }

            function s(b, c, d) {
                function e(c, d, f, h) {
                    function l(f, h, n) {
                        if (g > 1e4)return alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + k().mask), !0;
                        if (g == b && void 0 == f.matches)return i.push({match: f, locator: h.reverse()}), !0;
                        if (void 0 != f.matches) {
                            if (f.isGroup && n !== !0) {
                                if (f = l(c.matches[m + 1], h))return !0
                            } else if (f.isOptional) {
                                var o = f;
                                if (f = e(f, d, h, n)) {
                                    var p = i[i.length - 1].match, q = 0 == a.inArray(p, o.matches);
                                    q && (j = !0), g = b
                                }
                            } else if (f.isAlternator) {
                                var r, s = f, t = [], u = i.slice(), v = h.length, w = d.length > 0 ? d.shift() : -1;
                                if (-1 == w || "string" == typeof w) {
                                    var x, y = g, z = d.slice();
                                    "string" == typeof w && (x = w.split(","));
                                    for (var A = 0; A < s.matches.length; A++) {
                                        i = [], f = l(s.matches[A], [A].concat(h), n) || f, r = i.slice(), g = y, i = [];
                                        for (var B = 0; B < z.length; B++)d[B] = z[B];
                                        for (var C = 0; C < r.length; C++)for (var D = r[C], E = 0; E < t.length; E++) {
                                            var F = t[E];
                                            if (D.match.mask == F.match.mask && ("string" != typeof w || -1 != a.inArray(D.locator[v].toString(), x))) {
                                                r.splice(C, 1), F.locator[v] = F.locator[v] + "," + D.locator[v], F.alternation = v;
                                                break
                                            }
                                        }
                                        t = t.concat(r)
                                    }
                                    "string" == typeof w && (t = a.map(t, function (b, c) {
                                        if (isFinite(c)) {
                                            var d, e = b.locator[v].toString().split(",");
                                            b.locator[v] = void 0, b.alternation = void 0;
                                            for (var f = 0; f < e.length; f++)d = -1 != a.inArray(e[f], x), d && (void 0 != b.locator[v] ? (b.locator[v] += ",", b.alternation = v, b.locator[v] += e[f]) : b.locator[v] = parseInt(e[f]));
                                            if (void 0 != b.locator[v])return b
                                        }
                                    })), i = u.concat(t), j = !0
                                } else f = l(s.matches[w], [w].concat(h), n);
                                if (f)return !0
                            } else if (f.isQuantifier && n !== !0)for (var G = f, H = d.length > 0 && n !== !0 ? d.shift() : 0; H < (isNaN(G.quantifier.max) ? H + 1 : G.quantifier.max) && b >= g; H++) {
                                var I = c.matches[a.inArray(G, c.matches) - 1];
                                if (f = l(I, [H].concat(h), !0)) {
                                    var p = i[i.length - 1].match;
                                    p.optionalQuantifier = H > G.quantifier.min - 1;
                                    var q = 0 == a.inArray(p, I.matches);
                                    if (q) {
                                        if (H > G.quantifier.min - 1) {
                                            j = !0, g = b;
                                            break
                                        }
                                        return !0
                                    }
                                    return !0
                                }
                            } else if (f = e(f, d, h, n))return !0
                        } else g++
                    }

                    for (var m = d.length > 0 ? d.shift() : 0; m < c.matches.length; m++)if (c.matches[m].isQuantifier !== !0) {
                        var n = l(c.matches[m], [m].concat(f), h);
                        if (n && g == b)return n;
                        if (g > b)break
                    }
                }

                var f = k().maskToken, g = c ? d : 0, h = c || [0], i = [], j = !1;
                if (void 0 == c) {
                    for (var l, m = b - 1; void 0 == (l = k().validPositions[m]) && m > -1;)m--;
                    if (void 0 != l && m > -1)g = m, h = l.locator.slice(); else {
                        for (m = b - 1; void 0 == (l = k().tests[m]) && m > -1;)m--;
                        void 0 != l && m > -1 && (g = m, h = l[0].locator.slice())
                    }
                }
                for (var n = h.shift(); n < f.length; n++) {
                    var o = e(f[n], h, [n]);
                    if (o && g == b || g > b)break
                }
                return (0 == i.length || j) && i.push({
                    match: {
                        fn: null,
                        cardinality: 0,
                        optionality: !0,
                        casing: null,
                        def: ""
                    }, locator: []
                }), k().tests[b] = a.extend(!0, [], i), k().tests[b]
            }

            function t() {
                return void 0 == k()._buffer && (k()._buffer = g(!1, 1)), k()._buffer
            }

            function u() {
                return void 0 == k().buffer && (k().buffer = g(!0, m(), !0)), k().buffer
            }

            function v(a, b, c) {
                if (c = c || u().slice(), a === !0)l(), a = 0, b = c.length; else for (var d = a; b > d; d++)delete k().validPositions[d], delete k().tests[d];
                for (var d = a; b > d; d++)c[d] != f.skipOptionalPartCharacter && y(d, c[d], !0, !0)
            }

            function w(a, b) {
                switch (b.casing) {
                    case"upper":
                        a = a.toUpperCase();
                        break;
                    case"lower":
                        a = a.toLowerCase()
                }
                return a
            }

            function x(b, c) {
                for (var d = f.greedy ? c : c.slice(0, 1), e = !1, g = 0; g < b.length; g++)if (-1 != a.inArray(b[g], d)) {
                    e = !0;
                    break
                }
                return e
            }

            function y(b, c, d, e) {
                function g(b, c, d, e) {
                    var g = !1;
                    return a.each(s(b), function (h, i) {
                        for (var j = i.match, p = c ? 1 : 0, q = "", r = (u(), j.cardinality); r > p; r--)q += D(b - (r - 1));
                        if (c && (q += c), g = null != j.fn ? j.fn.test(q, k(), b, d, f) : c != j.def && c != f.skipOptionalPartCharacter || "" == j.def ? !1 : {
                                c: j.def,
                                pos: b
                            }, g !== !1) {
                            var s = void 0 != g.c ? g.c : c;
                            s = s == f.skipOptionalPartCharacter && null === j.fn ? j.def : s;
                            var t = b;
                            if (void 0 != g.remove && o(g.remove, g.remove + 1, !0), g.refreshFromBuffer) {
                                var x = g.refreshFromBuffer;
                                if (d = !0, v(x === !0 ? x : x.start, x.end), void 0 == g.pos && void 0 == g.c)return g.pos = m(), !1;
                                if (t = void 0 != g.pos ? g.pos : b, t != b)return g = a.extend(g, y(t, s, !0)), !1
                            } else if (g !== !0 && void 0 != g.pos && g.pos != b && (t = g.pos, v(b, t), t != b))return g = a.extend(g, y(t, s, !0)), !1;
                            return 1 != g && void 0 == g.pos && void 0 == g.c ? !1 : (h > 0 && l(!0), n(t, a.extend({}, i, {input: w(s, j)}), e) || (g = !1), !1)
                        }
                    }), g
                }

                function h(b, c, d, e) {
                    var g, h, i = a.extend(!0, {}, k().validPositions);
                    for (g = m(); g >= 0; g--)if (k().validPositions[g] && void 0 != k().validPositions[g].alternation) {
                        h = k().validPositions[g].alternation;
                        break
                    }
                    if (void 0 != h)for (var j in k().validPositions)if (parseInt(j) > parseInt(g) && void 0 === k().validPositions[j].alternation) {
                        for (var n = k().validPositions[j], o = n.locator[h], p = k().validPositions[g].locator[h].split(","), q = 0; q < p.length; q++)if (o < p[q]) {
                            for (var r, s, t = j - 1; t >= 0; t--)if (r = k().validPositions[t], void 0 != r) {
                                s = r.locator[h], r.locator[h] = p[q];
                                break
                            }
                            if (o != r.locator[h]) {
                                for (var v = u().slice(), w = j; w < m() + 1; w++)delete k().validPositions[w], delete k().tests[w];
                                l(!0), f.keepStatic = !f.keepStatic;
                                for (var w = j; w < v.length; w++)v[w] != f.skipOptionalPartCharacter && y(m() + 1, v[w], !1, !0);
                                r.locator[h] = s;
                                var x = y(b, c, d, e);
                                if (f.keepStatic = !f.keepStatic, x)return x;
                                l(), k().validPositions = a.extend(!0, {}, i)
                            }
                        }
                        break
                    }
                    return !1
                }

                function i(b, c) {
                    for (var d = k().validPositions[c], e = d.locator, f = e.length, g = b; c > g; g++)if (!z(g)) {
                        var h = s(g), i = h[0], j = -1;
                        a.each(h, function (a, b) {
                            for (var c = 0; f > c; c++)b.locator[c] && x(b.locator[c].toString().split(","), e[c].toString().split(",")) && c > j && (j = c, i = b)
                        }), n(g, a.extend({}, i, {input: i.match.def}), !0)
                    }
                }

                d = d === !0;
                for (var j = u(), p = b - 1; p > -1 && !k().validPositions[p]; p--);
                for (p++; b > p; p++)void 0 == k().validPositions[p] && ((!z(p) || j[p] != F(p)) && s(p).length > 1 || j[p] == f.radixPoint || "0" == j[p] && a.inArray(f.radixPoint, j) < p) && g(p, j[p], !0);
                var q = b, r = !1, t = a.extend(!0, {}, k().validPositions);
                if (q < A() && (r = g(q, c, d, e), !d && r === !1)) {
                    var C = k().validPositions[q];
                    if (!C || null != C.match.fn || C.match.def != c && c != f.skipOptionalPartCharacter) {
                        if ((f.insertMode || void 0 == k().validPositions[B(q)]) && !z(q))for (var E = q + 1, G = B(q); G >= E; E++)if (r = g(E, c, d, e), r !== !1) {
                            i(q, E), q = E;
                            break
                        }
                    } else r = {caret: B(q)}
                }
                if (r === !1 && f.keepStatic && N(j) && (r = h(b, c, d, e)), r === !0 && (r = {pos: q}), a.isFunction(f.postValidation) && 0 != r && !d) {
                    l(!0);
                    var H = f.postValidation(u(), f);
                    if (!H)return l(!0), k().validPositions = a.extend(!0, {}, t), !1
                }
                return r
            }

            function z(a) {
                var b = q(a);
                return null != b.fn ? b.fn : !1
            }

            function A() {
                var a;
                db = cb.prop("maxLength"), -1 == db && (db = void 0);
                var b, c = m(), d = k().validPositions[c], e = void 0 != d ? d.locator.slice() : void 0;
                for (b = c + 1; void 0 == d || null != d.match.fn || null == d.match.fn && "" != d.match.def; b++)d = p(b, e, b - 1), e = d.locator.slice();
                return a = b, void 0 == db || db > a ? a : db
            }

            function B(a) {
                var b = A();
                if (a >= b)return b;
                for (var c = a; ++c < b && !z(c) && (f.nojumps !== !0 || f.nojumpsThreshold > c););
                return c
            }

            function C(a) {
                var b = a;
                if (0 >= b)return 0;
                for (; --b > 0 && !z(b););
                return b
            }

            function D(a) {
                return void 0 == k().validPositions[a] ? F(a) : k().validPositions[a].input
            }

            function E(b, c, d, e, g) {
                if (e && a.isFunction(f.onBeforeWrite)) {
                    var h = f.onBeforeWrite.call(b, e, c, d, f);
                    if (h) {
                        if (h.refreshFromBuffer) {
                            var i = h.refreshFromBuffer;
                            v(i === !0 ? i : i.start, i.end, h.buffer), l(!0), c = u()
                        }
                        d = h.caret || d
                    }
                }
                b._valueSet(c.join("")), void 0 != d && K(b, d), g === !0 && (gb = !0, a(b).trigger("input"))
            }

            function F(a, b) {
                return b = b || q(a), void 0 != b.placeholder ? b.placeholder : null == b.fn ? b.def : f.placeholder.charAt(a % f.placeholder.length)
            }

            function G(b, c, d, e) {
                function f() {
                    var a = !1, b = t().slice(n, B(n)).join("").indexOf(j);
                    if (-1 != b && !z(n)) {
                        a = !0;
                        for (var c = t().slice(n, n + b), d = 0; d < c.length; d++)if (" " != c[d]) {
                            a = !1;
                            break
                        }
                    }
                    return a
                }

                var g = void 0 != e ? e.slice() : b._valueGet().split("");
                l(), k().p = B(-1), c && b._valueSet("");
                var h = t().slice(0, B(-1)).join(""), i = g.join("").match(new RegExp(H(h), "g"));
                i && i.length > 0 && g.splice(0, h.length * i.length);
                var j = "", n = 0;
                a.each(g, function (c, e) {
                    var g = a.Event("keypress");
                    g.which = e.charCodeAt(0), j += e;
                    var h = m(), i = k().validPositions[h], l = p(h + 1, i ? i.locator.slice() : void 0, h);
                    if (!f() || d) {
                        var o = d ? c : null == l.match.fn && l.match.optionality && h + 1 < k().p ? h + 1 : k().p;
                        T.call(b, g, !0, !1, d, o), n = o + 1, j = ""
                    } else T.call(b, g, !0, !1, !0, h + 1)
                }), c && E(b, u(), a(b).is(":focus") ? B(m(0)) : void 0, a.Event("checkval"))
            }

            function H(b) {
                return a.inputmask.escapeRegex.call(this, b)
            }

            function I(b) {
                if (b.data("_inputmask") && !b.hasClass("hasDatepicker")) {
                    var c = [], d = k().validPositions;
                    for (var e in d)d[e].match && null != d[e].match.fn && c.push(d[e].input);
                    var g = (eb ? c.reverse() : c).join(""), h = (eb ? u().slice().reverse() : u()).join("");
                    return a.isFunction(f.onUnMask) && (g = f.onUnMask.call(b, h, g, f) || g), g
                }
                return b[0]._valueGet()
            }

            function J(a) {
                if (eb && "number" == typeof a && (!f.greedy || "" != f.placeholder)) {
                    var b = u().length;
                    a = b - a
                }
                return a
            }

            function K(b, c, d) {
                var e, g = b.jquery && b.length > 0 ? b[0] : b;
                if ("number" != typeof c)return g.setSelectionRange ? (c = g.selectionStart, d = g.selectionEnd) : document.selection && document.selection.createRange && (e = document.selection.createRange(), c = 0 - e.duplicate().moveStart("character", -1e5), d = c + e.text.length), {
                    begin: J(c),
                    end: J(d)
                };
                if (c = J(c), d = J(d), d = "number" == typeof d ? d : c, a(g).is(":visible")) {
                    var h = a(g).css("font-size").replace("px", "") * d;
                    g.scrollLeft = h > g.scrollWidth ? h : 0, 0 == f.insertMode && c == d && d++, g.setSelectionRange ? (g.selectionStart = c, g.selectionEnd = d) : g.createTextRange && (e = g.createTextRange(), e.collapse(!0), e.moveEnd("character", d), e.moveStart("character", c), e.select())
                }
            }

            function L(b) {
                var c, d, e = u(), f = e.length, g = m(), h = {}, i = k().validPositions[g], j = void 0 != i ? i.locator.slice() : void 0;
                for (c = g + 1; c < e.length; c++)d = p(c, j, c - 1), j = d.locator.slice(), h[c] = a.extend(!0, {}, d);
                var l = i && void 0 != i.alternation ? i.locator[i.alternation].split(",") : [];
                for (c = f - 1; c > g && (d = h[c].match, (d.optionality || d.optionalQuantifier || i && void 0 != i.alternation && void 0 != h[c].locator[i.alternation] && -1 != a.inArray(h[c].locator[i.alternation].toString(), l)) && e[c] == F(c, d)); c--)f--;
                return b ? {l: f, def: h[f] ? h[f].match : void 0} : f
            }

            function M(a) {
                for (var b = L(), c = a.length - 1; c > b && !z(c); c--);
                a.splice(b, c + 1 - b)
            }

            function N(b) {
                if (a.isFunction(f.isComplete))return f.isComplete.call(cb, b, f);
                if ("*" == f.repeat)return void 0;
                var c = !1, d = L(!0), e = C(d.l), g = m();
                if (g == e && (void 0 == d.def || d.def.newBlockMarker || d.def.optionalQuantifier)) {
                    c = !0;
                    for (var h = 0; e >= h; h++) {
                        var i = z(h);
                        if (i && (void 0 == b[h] || b[h] == F(h)) || !i && b[h] != F(h)) {
                            c = !1;
                            break
                        }
                    }
                }
                return c
            }

            function O(a, b) {
                return eb ? a - b > 1 || a - b == 1 && f.insertMode : b - a > 1 || b - a == 1 && f.insertMode
            }

            function P(b) {
                var c = a._data(b).events;
                a.each(c, function (b, c) {
                    a.each(c, function (a, b) {
                        if ("inputmask" == b.namespace && "setvalue" != b.type) {
                            var c = b.handler;
                            b.handler = function (a) {
                                if (!this.disabled && (!this.readOnly || "keydown" == a.type && a.ctrlKey && 67 == a.keyCode)) {
                                    switch (a.type) {
                                        case"input":
                                            if (gb === !0)return gb = !1, a.preventDefault();
                                            break;
                                        case"keydown":
                                            fb = !1;
                                            break;
                                        case"keypress":
                                            if (fb === !0)return a.preventDefault();
                                            fb = !0;
                                            break;
                                        case"compositionstart":
                                            break;
                                        case"compositionupdate":
                                            gb = !0;
                                            break;
                                        case"compositionend":
                                    }
                                    return c.apply(this, arguments)
                                }
                                a.preventDefault()
                            }
                        }
                    })
                })
            }

            function Q(b) {
                function c(b) {
                    if (void 0 == a.valHooks[b] || 1 != a.valHooks[b].inputmaskpatch) {
                        var c = a.valHooks[b] && a.valHooks[b].get ? a.valHooks[b].get : function (a) {
                            return a.value
                        }, d = a.valHooks[b] && a.valHooks[b].set ? a.valHooks[b].set : function (a, b) {
                            return a.value = b, a
                        };
                        a.valHooks[b] = {
                            get: function (b) {
                                var d = a(b);
                                if (d.data("_inputmask")) {
                                    if (d.data("_inputmask").opts.autoUnmask)return d.inputmask("unmaskedvalue");
                                    var e = c(b), f = d.data("_inputmask"), g = f.maskset, h = g._buffer;
                                    return h = h ? h.join("") : "", e != h ? e : ""
                                }
                                return c(b)
                            }, set: function (b, c) {
                                var e, f = a(b), g = f.data("_inputmask");
                                return g ? (e = d(b, a.isFunction(g.opts.onBeforeMask) ? g.opts.onBeforeMask.call(nb, c, g.opts) || c : c), f.triggerHandler("setvalue.inputmask")) : e = d(b, c), e
                            }, inputmaskpatch: !0
                        }
                    }
                }

                function d() {
                    var b = a(this), c = a(this).data("_inputmask");
                    return c ? c.opts.autoUnmask ? b.inputmask("unmaskedvalue") : h.call(this) != t().join("") ? h.call(this) : "" : h.call(this)
                }

                function e(b) {
                    var c = a(this).data("_inputmask");
                    c ? (i.call(this, a.isFunction(c.opts.onBeforeMask) ? c.opts.onBeforeMask.call(nb, b, c.opts) || b : b), a(this).triggerHandler("setvalue.inputmask")) : i.call(this, b)
                }

                function g(b) {
                    a(b).bind("mouseenter.inputmask", function () {
                        var b = a(this), c = this, d = c._valueGet();
                        "" != d && d != u().join("") && (this._valueSet(a.isFunction(f.onBeforeMask) ? f.onBeforeMask.call(nb, d, f) || d : d), b.triggerHandler("setvalue.inputmask"))
                    });//!! the bound handlers are executed in the order they where bound
                    var c = a._data(b).events, d = c.mouseover;
                    if (d) {
                        for (var e = d[d.length - 1], g = d.length - 1; g > 0; g--)d[g] = d[g - 1];
                        d[0] = e
                    }
                }

                var h, i;
                b._valueGet || (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(b, "value"), document.__lookupGetter__ && b.__lookupGetter__("value") ? (h = b.__lookupGetter__("value"), i = b.__lookupSetter__("value"), b.__defineGetter__("value", d), b.__defineSetter__("value", e)) : (h = function () {
                    return b.value
                }, i = function (a) {
                    b.value = a
                }, c(b.type), g(b)), b._valueGet = function (a) {
                    return eb && a !== !0 ? h.call(this).split("").reverse().join("") : h.call(this)
                }, b._valueSet = function (a) {
                    i.call(this, eb ? a.split("").reverse().join("") : a)
                })
            }

            function R(b, c, d, e) {
                function g() {
                    if (f.keepStatic) {
                        l(!0);
                        var c, d = [];
                        for (c = m(); c >= 0; c--)if (k().validPositions[c]) {
                            if (void 0 != k().validPositions[c].alternation)break;
                            d.push(k().validPositions[c].input), delete k().validPositions[c]
                        }
                        if (c > 0)for (; d.length > 0;) {
                            k().p = B(m());
                            var e = a.Event("keypress");
                            e.which = d.pop().charCodeAt(0), T.call(b, e, !0, !1, !1, k().p)
                        }
                    }
                }

                if ((f.numericInput || eb) && (c == a.inputmask.keyCode.BACKSPACE ? c = a.inputmask.keyCode.DELETE : c == a.inputmask.keyCode.DELETE && (c = a.inputmask.keyCode.BACKSPACE), eb)) {
                    var h = d.end;
                    d.end = d.begin, d.begin = h
                }
                if (c == a.inputmask.keyCode.BACKSPACE && (d.end - d.begin < 1 || 0 == f.insertMode) ? d.begin = C(d.begin) : c == a.inputmask.keyCode.DELETE && d.begin == d.end && d.end++, o(d.begin, d.end, !1, e), e !== !0) {
                    g();
                    var i = m(d.begin);
                    i < d.begin ? (-1 == i && l(), k().p = B(i)) : k().p = d.begin
                }
            }

            function S(c) {
                var d = this, e = a(d), g = c.keyCode, i = K(d);
                g == a.inputmask.keyCode.BACKSPACE || g == a.inputmask.keyCode.DELETE || h && 127 == g || c.ctrlKey && 88 == g && !b("cut") ? (c.preventDefault(), 88 == g && (_ = u().join("")), R(d, g, i), E(d, u(), k().p, c, _ != u().join("")), d._valueGet() == t().join("") ? e.trigger("cleared") : N(u()) === !0 && e.trigger("complete"), f.showTooltip && e.prop("title", k().mask)) : g == a.inputmask.keyCode.END || g == a.inputmask.keyCode.PAGE_DOWN ? setTimeout(function () {
                    var a = B(m());
                    f.insertMode || a != A() || c.shiftKey || a--, K(d, c.shiftKey ? i.begin : a, a)
                }, 0) : g == a.inputmask.keyCode.HOME && !c.shiftKey || g == a.inputmask.keyCode.PAGE_UP ? K(d, 0, c.shiftKey ? i.begin : 0) : f.undoOnEscape && g == a.inputmask.keyCode.ESCAPE || 90 == g && c.ctrlKey ? (G(d, !0, !1, _.split("")), e.click()) : g != a.inputmask.keyCode.INSERT || c.shiftKey || c.ctrlKey ? 0 != f.insertMode || c.shiftKey || (g == a.inputmask.keyCode.RIGHT ? setTimeout(function () {
                    var a = K(d);
                    K(d, a.begin)
                }, 0) : g == a.inputmask.keyCode.LEFT && setTimeout(function () {
                    var a = K(d);
                    K(d, eb ? a.begin + 1 : a.begin - 1)
                }, 0)) : (f.insertMode = !f.insertMode, K(d, f.insertMode || i.begin != A() ? i.begin : i.begin - 1)), hb = -1 != a.inArray(g, f.ignorables)
            }

            function T(b, c, d, e, g) {
                var h = this, i = a(h), j = b.which || b.charCode || b.keyCode;
                if (!(c === !0 || b.ctrlKey && b.altKey) && (b.ctrlKey || b.metaKey || hb))return !0;
                if (j) {
                    46 == j && 0 == b.shiftKey && "," == f.radixPoint && (j = 44);
                    var m, o = c ? {begin: g, end: g} : K(h), p = String.fromCharCode(j), q = O(o.begin, o.end);
                    q && (k().undoPositions = a.extend(!0, {}, k().validPositions), R(h, a.inputmask.keyCode.DELETE, o, !0), o.begin = k().p, f.insertMode || (f.insertMode = !f.insertMode, n(o.begin, e), f.insertMode = !f.insertMode), q = !f.multi), k().writeOutBuffer = !0;
                    var r = eb && !q ? o.end : o.begin, t = y(r, p, e);
                    if (t !== !1) {
                        if (t !== !0 && (r = void 0 != t.pos ? t.pos : r, p = void 0 != t.c ? t.c : p), l(!0), void 0 != t.caret)m = t.caret; else {
                            var w = k().validPositions;
                            m = !f.keepStatic && (void 0 != w[r + 1] && s(r + 1, w[r].locator.slice(), r).length > 1 || void 0 != w[r].alternation) ? r + 1 : B(r)
                        }
                        k().p = m
                    }
                    if (d !== !1) {
                        var x = this;
                        if (setTimeout(function () {
                                f.onKeyValidation.call(x, t, f)
                            }, 0), k().writeOutBuffer && t !== !1) {
                            var z = u();
                            E(h, z, c ? void 0 : f.numericInput ? C(m) : m, b, c !== !0), c !== !0 && setTimeout(function () {
                                N(z) === !0 && i.trigger("complete")
                            }, 0)
                        } else q && (k().buffer = void 0, k().validPositions = k().undoPositions)
                    } else q && (k().buffer = void 0, k().validPositions = k().undoPositions);
                    if (f.showTooltip && i.prop("title", k().mask), c && a.isFunction(f.onBeforeWrite)) {
                        var A = f.onBeforeWrite.call(this, b, u(), m, f);
                        if (A && A.refreshFromBuffer) {
                            var D = A.refreshFromBuffer;
                            v(D === !0 ? D : D.start, D.end, A.buffer), l(!0), A.caret && (k().p = A.caret)
                        }
                    }
                    b.preventDefault()
                }
            }

            function U(b) {
                var c = (a(this), b.keyCode, u());
                f.onKeyUp.call(this, b, c, f)
            }

            function V(b) {
                var c = this, d = a(c), e = c._valueGet(!0), g = K(c);
                if ("propertychange" == b.type && c._valueGet().length <= A())return !0;
                if ("paste" == b.type) {
                    var h = e.substr(0, g.begin), i = e.substr(g.end, e.length);
                    h == t().slice(0, g.begin).join("") && (h = ""), i == t().slice(g.end).join("") && (i = ""), window.clipboardData && window.clipboardData.getData ? e = h + window.clipboardData.getData("Text") + i : b.originalEvent && b.originalEvent.clipboardData && b.originalEvent.clipboardData.getData && (e = h + b.originalEvent.clipboardData.getData("text/plain") + i)
                }
                var j = a.isFunction(f.onBeforePaste) ? f.onBeforePaste.call(c, e, f) || e : e;
                return G(c, !0, !1, eb ? j.split("").reverse() : j.split("")), d.click(), N(u()) === !0 && d.trigger("complete"), !1
            }

            function W(b) {
                var c = this;
                G(c, !0, !1), N(u()) === !0 && a(c).trigger("complete"), b.preventDefault()
            }

            function X(a) {
                var b = this;
                _ = u().join(""), ("" == bb || 0 != a.originalEvent.data.indexOf(bb)) && (ab = K(b))
            }

            function Y(b) {
                var c = this, d = ab || K(c);
                0 == b.originalEvent.data.indexOf(bb) && (l(), d = {begin: 0, end: 0});
                var e = b.originalEvent.data;
                K(c, d.begin, d.end);
                for (var g = 0; g < e.length; g++) {
                    var h = a.Event("keypress");
                    h.which = e.charCodeAt(g), fb = !1, hb = !1, T.call(c, h)
                }
                setTimeout(function () {
                    var a = k().p;
                    E(c, u(), f.numericInput ? C(a) : a)
                }, 0), bb = b.originalEvent.data
            }

            function Z() {
            }

            function $(b) {
                if (cb = a(b), cb.is(":input") && c(cb.attr("type"))) {
                    if (cb.data("_inputmask", {
                            maskset: e,
                            opts: f,
                            isRTL: !1
                        }), f.showTooltip && cb.prop("title", k().mask), ("rtl" == b.dir || f.rightAlign) && cb.css("text-align", "right"), "rtl" == b.dir || f.numericInput) {
                        b.dir = "ltr", cb.removeAttr("dir");
                        var d = cb.data("_inputmask");
                        d.isRTL = !0, cb.data("_inputmask", d), eb = !0
                    }
                    cb.unbind(".inputmask"), cb.closest("form").bind("submit", function () {
                        _ != u().join("") && cb.change(), cb[0]._valueGet && cb[0]._valueGet() == t().join("") && cb[0]._valueSet(""), f.removeMaskOnSubmit && cb.inputmask("remove")
                    }).bind("reset", function () {
                        setTimeout(function () {
                            cb.triggerHandler("setvalue.inputmask")
                        }, 0)
                    }), cb.bind("mouseenter.inputmask", function () {
                        var b = a(this), c = this;
                        !b.is(":focus") && f.showMaskOnHover && c._valueGet() != u().join("") && E(c, u())
                    }).bind("blur.inputmask", function (b) {
                        var c = a(this), d = this;
                        if (c.data("_inputmask")) {
                            var e = d._valueGet(), g = u().slice();
                            ib = !0, _ != g.join("") && (c.change(), _ = g.join("")), "" != e && (f.clearMaskOnLostFocus && (e == t().join("") ? g = [] : M(g)), N(g) === !1 && (c.trigger("incomplete"), f.clearIncomplete && (l(), g = f.clearMaskOnLostFocus ? [] : t().slice())), E(d, g, void 0, b))
                        }
                    }).bind("focus.inputmask", function () {
                        var b = (a(this), this), c = b._valueGet();
                        f.showMaskOnFocus && (!f.showMaskOnHover || f.showMaskOnHover && "" == c) && b._valueGet() != u().join("") && E(b, u(), B(m())), _ = u().join("")
                    }).bind("mouseleave.inputmask", function () {
                        var b = a(this), c = this;
                        if (f.clearMaskOnLostFocus) {
                            var d = u().slice(), e = c._valueGet();
                            b.is(":focus") || e == b.attr("placeholder") || "" == e || (e == t().join("") ? d = [] : M(d), E(c, d))
                        }
                    }).bind("click.inputmask", function () {
                        var b = a(this), c = this;
                        if (b.is(":focus")) {
                            var d = K(c);
                            if (d.begin == d.end)if (f.radixFocus && "" != f.radixPoint && -1 != a.inArray(f.radixPoint, u()) && (ib || u().join("") == t().join("")))K(c, a.inArray(f.radixPoint, u())), ib = !1; else {
                                var e = eb ? J(d.begin) : d.begin, g = B(m(e));
                                g > e ? K(c, z(e) ? e : B(e)) : K(c, g)
                            }
                        }
                    }).bind("dblclick.inputmask", function () {
                        var a = this;
                        setTimeout(function () {
                            K(a, 0, B(m()))
                        }, 0)
                    }).bind(j + ".inputmask dragdrop.inputmask drop.inputmask", V).bind("setvalue.inputmask", function () {
                        var a = this;
                        G(a, !0, !1), _ = u().join(""), (f.clearMaskOnLostFocus || f.clearIncomplete) && a._valueGet() == t().join("") && a._valueSet("")
                    }).bind("cut.inputmask", function (b) {
                        gb = !0;
                        var c = this, d = a(c), e = K(c);
                        R(c, a.inputmask.keyCode.DELETE, e), E(c, u(), k().p, b, _ != u().join("")), c._valueGet() == t().join("") && d.trigger("cleared"), f.showTooltip && d.prop("title", k().mask)
                    }).bind("complete.inputmask", f.oncomplete).bind("incomplete.inputmask", f.onincomplete).bind("cleared.inputmask", f.oncleared), cb.bind("keydown.inputmask", S).bind("keypress.inputmask", T).bind("keyup.inputmask", U), i || cb.bind("compositionstart.inputmask", X).bind("compositionupdate.inputmask", Y).bind("compositionend.inputmask", Z), "paste" === j && cb.bind("input.inputmask", W), Q(b);
                    var g = a.isFunction(f.onBeforeMask) ? f.onBeforeMask.call(b, b._valueGet(), f) || b._valueGet() : b._valueGet();
                    G(b, !0, !1, g.split(""));
                    var h = u().slice();
                    _ = h.join("");
                    var n;
                    try {
                        n = document.activeElement
                    } catch (o) {
                    }
                    N(h) === !1 && f.clearIncomplete && l(), f.clearMaskOnLostFocus && (h.join("") == t().join("") ? h = [] : M(h)), E(b, h), n === b && K(b, B(m())), P(b)
                }
            }

            var _, ab, bb, cb, db, eb = !1, fb = !1, gb = !1, hb = !1, ib = !0;
            if (void 0 != d)switch (d.action) {
                case"isComplete":
                    return cb = a(d.el), e = cb.data("_inputmask").maskset, f = cb.data("_inputmask").opts, N(d.buffer);
                case"unmaskedvalue":
                    return cb = d.$input, e = cb.data("_inputmask").maskset, f = cb.data("_inputmask").opts, eb = d.$input.data("_inputmask").isRTL, I(d.$input);
                case"mask":
                    _ = u().join(""), $(d.el);
                    break;
                case"format":
                    cb = a({}), cb.data("_inputmask", {
                        maskset: e,
                        opts: f,
                        isRTL: f.numericInput
                    }), f.numericInput && (eb = !0);
                    var jb = (a.isFunction(f.onBeforeMask) ? f.onBeforeMask.call(cb, d.value, f) || d.value : d.value).split("");
                    return G(cb, !1, !1, eb ? jb.reverse() : jb), a.isFunction(f.onBeforeWrite) && f.onBeforeWrite.call(this, void 0, u(), 0, f), d.metadata ? {
                        value: eb ? u().slice().reverse().join("") : u().join(""),
                        metadata: cb.inputmask("getmetadata")
                    } : eb ? u().slice().reverse().join("") : u().join("");
                case"isValid":
                    cb = a({}), cb.data("_inputmask", {
                        maskset: e,
                        opts: f,
                        isRTL: f.numericInput
                    }), f.numericInput && (eb = !0);
                    var jb = d.value.split("");
                    G(cb, !1, !0, eb ? jb.reverse() : jb);
                    for (var kb = u(), lb = L(), mb = kb.length - 1; mb > lb && !z(mb); mb--);
                    return kb.splice(lb, mb + 1 - lb), N(kb) && d.value == kb.join("");
                case"getemptymask":
                    return cb = a(d.el), e = cb.data("_inputmask").maskset, f = cb.data("_inputmask").opts, t();
                case"remove":
                    var nb = d.el;
                    cb = a(nb), e = cb.data("_inputmask").maskset, f = cb.data("_inputmask").opts, nb._valueSet(I(cb)), cb.unbind(".inputmask"), cb.removeData("_inputmask");
                    var ob;
                    Object.getOwnPropertyDescriptor && (ob = Object.getOwnPropertyDescriptor(nb, "value")), ob && ob.get ? nb._valueGet && Object.defineProperty(nb, "value", {
                        get: nb._valueGet,
                        set: nb._valueSet
                    }) : document.__lookupGetter__ && nb.__lookupGetter__("value") && nb._valueGet && (nb.__defineGetter__("value", nb._valueGet), nb.__defineSetter__("value", nb._valueSet));
                    try {
                        delete nb._valueGet, delete nb._valueSet
                    } catch (pb) {
                        nb._valueGet = void 0, nb._valueSet = void 0
                    }
                    break;
                case"getmetadata":
                    if (cb = a(d.el), e = cb.data("_inputmask").maskset, f = cb.data("_inputmask").opts, a.isArray(e.metadata)) {
                        for (var qb, rb = m(), sb = rb; sb >= 0; sb--)if (k().validPositions[sb] && void 0 != k().validPositions[sb].alternation) {
                            qb = k().validPositions[sb].alternation;
                            break
                        }
                        return void 0 != qb ? e.metadata[k().validPositions[rb].locator[qb]] : e.metadata[0]
                    }
                    return e.metadata
            }
        }

        if (void 0 === a.fn.inputmask) {
            var g = navigator.userAgent, h = null !== g.match(new RegExp("iphone", "i")), i = (null !== g.match(new RegExp("android.*safari.*", "i")), null !== g.match(new RegExp("android.*chrome.*", "i")), null !== g.match(new RegExp("android.*firefox.*", "i"))), j = (/Kindle/i.test(g) || /Silk/i.test(g) || /KFTT/i.test(g) || /KFOT/i.test(g) || /KFJWA/i.test(g) || /KFJWI/i.test(g) || /KFSOWI/i.test(g) || /KFTHWA/i.test(g) || /KFTHWI/i.test(g) || /KFAPWA/i.test(g) || /KFAPWI/i.test(g), b("paste") ? "paste" : b("input") ? "input" : "propertychange");
            a.inputmask = {
                defaults: {
                    placeholder: "_",
                    optionalmarker: {start: "[", end: "]"},
                    quantifiermarker: {start: "{", end: "}"},
                    groupmarker: {start: "(", end: ")"},
                    alternatormarker: "|",
                    escapeChar: "\\",
                    mask: null,
                    oncomplete: a.noop,
                    onincomplete: a.noop,
                    oncleared: a.noop,
                    repeat: 0,
                    greedy: !0,
                    autoUnmask: !1,
                    removeMaskOnSubmit: !1,
                    clearMaskOnLostFocus: !0,
                    insertMode: !0,
                    clearIncomplete: !1,
                    aliases: {},
                    alias: null,
                    onKeyUp: a.noop,
                    onBeforeMask: void 0,
                    onBeforePaste: void 0,
                    onBeforeWrite: void 0,
                    onUnMask: void 0,
                    showMaskOnFocus: !0,
                    showMaskOnHover: !0,
                    onKeyValidation: a.noop,
                    skipOptionalPartCharacter: " ",
                    showTooltip: !1,
                    numericInput: !1,
                    rightAlign: !1,
                    undoOnEscape: !0,
                    radixPoint: "",
                    radixFocus: !1,
                    nojumps: !1,
                    nojumpsThreshold: 0,
                    keepStatic: void 0,
                    definitions: {
                        9: {validator: "[0-9]", cardinality: 1, definitionSymbol: "*"},
                        a: {validator: "[A-Za-zÐ�-Ñ�Ð�Ñ‘Ã€-Ã¿Âµ]", cardinality: 1, definitionSymbol: "*"},
                        "*": {validator: "[0-9A-Za-zÐ�-Ñ�Ð�Ñ‘Ã€-Ã¿Âµ]", cardinality: 1}
                    },
                    ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                    isComplete: void 0,
                    canClearPosition: a.noop,
                    postValidation: void 0
                },
                keyCode: {
                    ALT: 18,
                    BACKSPACE: 8,
                    CAPS_LOCK: 20,
                    COMMA: 188,
                    COMMAND: 91,
                    COMMAND_LEFT: 91,
                    COMMAND_RIGHT: 93,
                    CONTROL: 17,
                    DELETE: 46,
                    DOWN: 40,
                    END: 35,
                    ENTER: 13,
                    ESCAPE: 27,
                    HOME: 36,
                    INSERT: 45,
                    LEFT: 37,
                    MENU: 93,
                    NUMPAD_ADD: 107,
                    NUMPAD_DECIMAL: 110,
                    NUMPAD_DIVIDE: 111,
                    NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106,
                    NUMPAD_SUBTRACT: 109,
                    PAGE_DOWN: 34,
                    PAGE_UP: 33,
                    PERIOD: 190,
                    RIGHT: 39,
                    SHIFT: 16,
                    SPACE: 32,
                    TAB: 9,
                    UP: 38,
                    WINDOWS: 91
                },
                masksCache: {},
                escapeRegex: function (a) {
                    var b = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
                    return a.replace(new RegExp("(\\" + b.join("|\\") + ")", "gim"), "\\$1")
                },
                format: function (b, c, g) {
                    var h = a.extend(!0, {}, a.inputmask.defaults, c);
                    return d(h.alias, c, h), f({action: "format", value: b, metadata: g}, e(h), h)
                },
                isValid: function (b, c) {
                    var g = a.extend(!0, {}, a.inputmask.defaults, c);
                    return d(g.alias, c, g), f({action: "isValid", value: b}, e(g), g)
                }
            }, a.fn.inputmask = function (b, c) {
                function g(b, c, e) {
                    var f = a(b);
                    f.data("inputmask-alias") && d(f.data("inputmask-alias"), {}, c);
                    for (var g in c) {
                        var h = f.data("inputmask-" + g.toLowerCase());
                        void 0 != h && ("mask" == g && 0 == h.indexOf("[") ? (c[g] = h.replace(/[\s[\]]/g, "").split("','"), c[g][0] = c[g][0].replace("'", ""), c[g][c[g].length - 1] = c[g][c[g].length - 1].replace("'", "")) : c[g] = "boolean" == typeof h ? h : h.toString(), e && (e[g] = c[g]))
                    }
                    return c
                }

                var h, i = a.extend(!0, {}, a.inputmask.defaults, c);
                if ("string" == typeof b)switch (b) {
                    case"mask":
                        return d(i.alias, c, i), h = e(i), void 0 == h ? this : this.each(function () {
                            f({action: "mask", el: this}, a.extend(!0, {}, h), g(this, i))
                        });
                    case"unmaskedvalue":
                        var j = a(this);
                        return j.data("_inputmask") ? f({action: "unmaskedvalue", $input: j}) : j.val();
                    case"remove":
                        return this.each(function () {
                            var b = a(this);
                            b.data("_inputmask") && f({action: "remove", el: this})
                        });
                    case"getemptymask":
                        return this.data("_inputmask") ? f({action: "getemptymask", el: this}) : "";
                    case"hasMaskedValue":
                        return this.data("_inputmask") ? !this.data("_inputmask").opts.autoUnmask : !1;
                    case"isComplete":
                        return this.data("_inputmask") ? f({
                            action: "isComplete",
                            buffer: this[0]._valueGet().split(""),
                            el: this
                        }) : !0;
                    case"getmetadata":
                        return this.data("_inputmask") ? f({action: "getmetadata", el: this}) : void 0;
                    default:
                        return d(i.alias, c, i), d(b, c, i) || (i.mask = b), h = e(i), void 0 == h ? this : this.each(function () {
                            f({action: "mask", el: this}, a.extend(!0, {}, h), g(this, i))
                        })
                } else {
                    if ("object" == typeof b)return i = a.extend(!0, {}, a.inputmask.defaults, b), d(i.alias, b, i), h = e(i), void 0 == h ? this : this.each(function () {
                        f({action: "mask", el: this}, a.extend(!0, {}, h), g(this, i))
                    });
                    if (void 0 == b)return this.each(function () {
                        var b = a(this).attr("data-inputmask");
                        if (b && "" != b)try {
                            b = b.replace(new RegExp("'", "g"), '"');
                            var e = a.parseJSON("{" + b + "}");
                            a.extend(!0, e, c), i = a.extend(!0, {}, a.inputmask.defaults, e), i = g(this, i), d(i.alias, e, i), i.alias = void 0, a(this).inputmask("mask", i)
                        } catch (f) {
                        }
                        if (a(this).attr("data-inputmask-mask") || a(this).attr("data-inputmask-alias")) {
                            i = a.extend(!0, {}, a.inputmask.defaults, {});
                            var h = {};
                            i = g(this, i, h), d(i.alias, h, i), i.alias = void 0, a(this).inputmask("mask", i)
                        }
                    })
                }
            }
        }
        return a.fn.inputmask
    }(jQuery), function (a) {
    return a.extend(a.inputmask.defaults.definitions, {
        h: {
            validator: "[01][0-9]|2[0-3]",
            cardinality: 2,
            prevalidator: [{validator: "[0-2]", cardinality: 1}]
        },
        s: {validator: "[0-5][0-9]", cardinality: 2, prevalidator: [{validator: "[0-5]", cardinality: 1}]},
        d: {validator: "0[1-9]|[12][0-9]|3[01]", cardinality: 2, prevalidator: [{validator: "[0-3]", cardinality: 1}]},
        m: {validator: "0[1-9]|1[012]", cardinality: 2, prevalidator: [{validator: "[01]", cardinality: 1}]},
        y: {
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [{validator: "[12]", cardinality: 1}, {
                validator: "(19|20)",
                cardinality: 2
            }, {validator: "(19|20)\\d", cardinality: 3}]
        }
    }), a.extend(a.inputmask.defaults.aliases, {
        "dd/mm/yyyy": {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"), val1: new RegExp("0[1-9]|[12][0-9]|3[01]"), val2pre: function (b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[1-9]|[12][0-9]|3[01])" + c + "[01])")
                }, val2: function (b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[1-9]|[12][0-9])" + c + "(0[1-9]|1[012]))|(30" + c + "(0[13-9]|1[012]))|(31" + c + "(0[13578]|1[02]))")
                }
            },
            leapday: "29/02/",
            separator: "/",
            yearrange: {minyear: 1900, maxyear: 2099},
            isInYearRange: function (a, b, c) {
                if (isNaN(a))return !1;
                var d = parseInt(a.concat(b.toString().slice(a.length))), e = parseInt(a.concat(c.toString().slice(a.length)));
                return (isNaN(d) ? !1 : d >= b && c >= d) || (isNaN(e) ? !1 : e >= b && c >= e)
            },
            determinebaseyear: function (a, b, c) {
                var d = (new Date).getFullYear();
                if (a > d)return a;
                if (d > b) {
                    for (var e = b.toString().slice(0, 2), f = b.toString().slice(2, 4); e + c > b;)e--;
                    var g = e + f;
                    return a > g ? a : g
                }
                return d
            },
            onKeyUp: function (b) {
                var c = a(this);
                if (b.ctrlKey && b.keyCode == a.inputmask.keyCode.RIGHT) {
                    var d = new Date;
                    c.val(d.getDate().toString() + (d.getMonth() + 1).toString() + d.getFullYear().toString()), c.triggerHandler("setvalue.inputmask")
                }
            },
            getFrontValue: function (a, b, c) {
                for (var d = 0, e = 0, f = 0; f < a.length && "2" != a.charAt(f); f++) {
                    var g = c.definitions[a.charAt(f)];
                    g ? (d += e, e = g.cardinality) : e++
                }
                return b.join("").substr(d, e)
            },
            definitions: {
                1: {
                    validator: function (a, b, c, d, e) {
                        var f = e.regex.val1.test(a);
                        return d || f || a.charAt(1) != e.separator && -1 == "-./".indexOf(a.charAt(1)) || !(f = e.regex.val1.test("0" + a.charAt(0))) ? f : (b.buffer[c - 1] = "0", {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            }, pos: c, c: a.charAt(0)
                        })
                    }, cardinality: 2, prevalidator: [{
                        validator: function (a, b, c, d, e) {
                            isNaN(b.buffer[c + 1]) || (a += b.buffer[c + 1]);
                            var f = 1 == a.length ? e.regex.val1pre.test(a) : e.regex.val1.test(a);
                            return d || f || !(f = e.regex.val1.test("0" + a)) ? f : (b.buffer[c] = "0", c++, {pos: c})
                        }, cardinality: 1
                    }]
                }, 2: {
                    validator: function (a, b, c, d, e) {
                        var f = e.getFrontValue(b.mask, b.buffer, e);
                        -1 != f.indexOf(e.placeholder[0]) && (f = "01" + e.separator);
                        var g = e.regex.val2(e.separator).test(f + a);
                        if (!d && !g && (a.charAt(1) == e.separator || -1 != "-./".indexOf(a.charAt(1))) && (g = e.regex.val2(e.separator).test(f + "0" + a.charAt(0))))return b.buffer[c - 1] = "0", {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            }, pos: c, c: a.charAt(0)
                        };
                        if (e.mask.indexOf("2") == e.mask.length - 1 && g) {
                            var h = b.buffer.join("").substr(4, 4) + a;
                            if (h != e.leapday)return !0;
                            var i = parseInt(b.buffer.join("").substr(0, 4), 10);
                            return i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1
                        }
                        return g
                    }, cardinality: 2, prevalidator: [{
                        validator: function (a, b, c, d, e) {
                            isNaN(b.buffer[c + 1]) || (a += b.buffer[c + 1]);
                            var f = e.getFrontValue(b.mask, b.buffer, e);
                            -1 != f.indexOf(e.placeholder[0]) && (f = "01" + e.separator);
                            var g = 1 == a.length ? e.regex.val2pre(e.separator).test(f + a) : e.regex.val2(e.separator).test(f + a);
                            return d || g || !(g = e.regex.val2(e.separator).test(f + "0" + a)) ? g : (b.buffer[c] = "0", c++, {pos: c})
                        }, cardinality: 1
                    }]
                }, y: {
                    validator: function (a, b, c, d, e) {
                        if (e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear)) {
                            var f = b.buffer.join("").substr(0, 6);
                            if (f != e.leapday)return !0;
                            var g = parseInt(a, 10);
                            return g % 4 === 0 ? g % 100 === 0 ? g % 400 === 0 ? !0 : !1 : !0 : !1
                        }
                        return !1
                    }, cardinality: 4, prevalidator: [{
                        validator: function (a, b, c, d, e) {
                            var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                            if (!d && !f) {
                                var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0").toString().slice(0, 1);
                                if (f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear))return b.buffer[c++] = g.charAt(0), {pos: c};
                                if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0").toString().slice(0, 2), f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear))return b.buffer[c++] = g.charAt(0), b.buffer[c++] = g.charAt(1), {pos: c}
                            }
                            return f
                        }, cardinality: 1
                    }, {
                        validator: function (a, b, c, d, e) {
                            var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                            if (!d && !f) {
                                var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2);
                                if (f = e.isInYearRange(a[0] + g[1] + a[1], e.yearrange.minyear, e.yearrange.maxyear))return b.buffer[c++] = g.charAt(1), {pos: c};
                                if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2), e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) {
                                    var h = b.buffer.join("").substr(0, 6);
                                    if (h != e.leapday)f = !0; else {
                                        var i = parseInt(a, 10);
                                        f = i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1
                                    }
                                } else f = !1;
                                if (f)return b.buffer[c - 1] = g.charAt(0), b.buffer[c++] = g.charAt(1), b.buffer[c++] = a.charAt(0), {
                                    refreshFromBuffer: {
                                        start: c - 3,
                                        end: c
                                    }, pos: c
                                }
                            }
                            return f
                        }, cardinality: 2
                    }, {
                        validator: function (a, b, c, d, e) {
                            return e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear)
                        }, cardinality: 3
                    }]
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        "mm/dd/yyyy": {
            placeholder: "mm/dd/yyyy", alias: "dd/mm/yyyy", regex: {
                val2pre: function (b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])")
                }, val2: function (b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)")
                }, val1pre: new RegExp("[01]"), val1: new RegExp("0[1-9]|1[012]")
            }, leapday: "02/29/", onKeyUp: function (b) {
                var c = a(this);
                if (b.ctrlKey && b.keyCode == a.inputmask.keyCode.RIGHT) {
                    var d = new Date;
                    c.val((d.getMonth() + 1).toString() + d.getDate().toString() + d.getFullYear().toString()), c.triggerHandler("setvalue.inputmask")
                }
            }
        },
        "yyyy/mm/dd": {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyUp: function (b) {
                var c = a(this);
                if (b.ctrlKey && b.keyCode == a.inputmask.keyCode.RIGHT) {
                    var d = new Date;
                    c.val(d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString()), c.triggerHandler("setvalue.inputmask")
                }
            }
        },
        "dd.mm.yyyy": {
            mask: "1.2.y",
            placeholder: "dd.mm.yyyy",
            leapday: "29.02.",
            separator: ".",
            alias: "dd/mm/yyyy"
        },
        "dd-mm-yyyy": {
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "29-02-",
            separator: "-",
            alias: "dd/mm/yyyy"
        },
        "mm.dd.yyyy": {
            mask: "1.2.y",
            placeholder: "mm.dd.yyyy",
            leapday: "02.29.",
            separator: ".",
            alias: "mm/dd/yyyy"
        },
        "mm-dd-yyyy": {
            mask: "1-2-y",
            placeholder: "mm-dd-yyyy",
            leapday: "02-29-",
            separator: "-",
            alias: "mm/dd/yyyy"
        },
        "yyyy.mm.dd": {
            mask: "y.1.2",
            placeholder: "yyyy.mm.dd",
            leapday: ".02.29",
            separator: ".",
            alias: "yyyy/mm/dd"
        },
        "yyyy-mm-dd": {
            mask: "y-1-2",
            placeholder: "yyyy-mm-dd",
            leapday: "-02-29",
            separator: "-",
            alias: "yyyy/mm/dd"
        },
        datetime: {
            mask: "1/2/y h:s",
            placeholder: "dd/mm/yyyy hh:mm",
            alias: "dd/mm/yyyy",
            regex: {
                hrspre: new RegExp("[012]"),
                hrs24: new RegExp("2[0-4]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-4]"),
                ampm: new RegExp("^[a|p|A|P][m|M]"),
                mspre: new RegExp("[0-5]"),
                ms: new RegExp("[0-5][0-9]")
            },
            timeseparator: ":",
            hourFormat: "24",
            definitions: {
                h: {
                    validator: function (a, b, c, d, e) {
                        if ("24" == e.hourFormat && 24 == parseInt(a, 10))return b.buffer[c - 1] = "0", b.buffer[c] = "0", {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            }, c: "0"
                        };
                        var f = e.regex.hrs.test(a);
                        if (!d && !f && (a.charAt(1) == e.timeseparator || -1 != "-.:".indexOf(a.charAt(1))) && (f = e.regex.hrs.test("0" + a.charAt(0))))return b.buffer[c - 1] = "0", b.buffer[c] = a.charAt(0), c++, {
                            refreshFromBuffer: {
                                start: c - 2,
                                end: c
                            }, pos: c, c: e.timeseparator
                        };
                        if (f && "24" !== e.hourFormat && e.regex.hrs24.test(a)) {
                            var g = parseInt(a, 10);
                            return 24 == g ? (b.buffer[c + 5] = "a", b.buffer[c + 6] = "m") : (b.buffer[c + 5] = "p", b.buffer[c + 6] = "m"), g -= 12, 10 > g ? (b.buffer[c] = g.toString(), b.buffer[c - 1] = "0") : (b.buffer[c] = g.toString().charAt(1), b.buffer[c - 1] = g.toString().charAt(0)), {
                                refreshFromBuffer: {
                                    start: c - 1,
                                    end: c + 6
                                }, c: b.buffer[c]
                            }
                        }
                        return f
                    }, cardinality: 2, prevalidator: [{
                        validator: function (a, b, c, d, e) {
                            var f = e.regex.hrspre.test(a);
                            return d || f || !(f = e.regex.hrs.test("0" + a)) ? f : (b.buffer[c] = "0", c++, {pos: c})
                        }, cardinality: 1
                    }]
                }, s: {
                    validator: "[0-5][0-9]", cardinality: 2, prevalidator: [{
                        validator: function (a, b, c, d, e) {
                            var f = e.regex.mspre.test(a);
                            return d || f || !(f = e.regex.ms.test("0" + a)) ? f : (b.buffer[c] = "0", c++, {pos: c})
                        }, cardinality: 1
                    }]
                }, t: {
                    validator: function (a, b, c, d, e) {
                        return e.regex.ampm.test(a + "m")
                    }, casing: "lower", cardinality: 1
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        datetime12: {mask: "1/2/y h:s t\\m", placeholder: "dd/mm/yyyy hh:mm xm", alias: "datetime", hourFormat: "12"},
        "hh:mm t": {mask: "h:s t\\m", placeholder: "hh:mm xm", alias: "datetime", hourFormat: "12"},
        "h:s t": {mask: "h:s t\\m", placeholder: "hh:mm xm", alias: "datetime", hourFormat: "12"},
        "hh:mm:ss": {mask: "h:s:s", placeholder: "hh:mm:ss", alias: "datetime", autoUnmask: !1},
        "hh:mm": {mask: "h:s", placeholder: "hh:mm", alias: "datetime", autoUnmask: !1},
        date: {alias: "dd/mm/yyyy"},
        "mm/yyyy": {mask: "1/y", placeholder: "mm/yyyy", leapday: "donotuse", separator: "/", alias: "mm/dd/yyyy"}
    }), a.fn.inputmask
}(jQuery), function (a) {
    return a.extend(a.inputmask.defaults.definitions, {
        A: {
            validator: "[A-Za-zÐ�-Ñ�Ð�Ñ‘Ã€-Ã¿Âµ]",
            cardinality: 1,
            casing: "upper"
        }, "#": {validator: "[0-9A-Za-zÐ�-Ñ�Ð�Ñ‘Ã€-Ã¿Âµ]", cardinality: 1, casing: "upper"}
    }), a.extend(a.inputmask.defaults.aliases, {
        url: {
            mask: "ir",
            placeholder: "",
            separator: "",
            defaultPrefix: "http://",
            regex: {
                urlpre1: new RegExp("[fh]"),
                urlpre2: new RegExp("(ft|ht)"),
                urlpre3: new RegExp("(ftp|htt)"),
                urlpre4: new RegExp("(ftp:|http|ftps)"),
                urlpre5: new RegExp("(ftp:/|ftps:|http:|https)"),
                urlpre6: new RegExp("(ftp://|ftps:/|http:/|https:)"),
                urlpre7: new RegExp("(ftp://|ftps://|http://|https:/)"),
                urlpre8: new RegExp("(ftp://|ftps://|http://|https://)")
            },
            definitions: {
                i: {
                    validator: function () {
                        return !0
                    }, cardinality: 8, prevalidator: function () {
                        for (var a = [], b = 8, c = 0; b > c; c++)a[c] = function () {
                            var a = c;
                            return {
                                validator: function (b, c, d, e, f) {
                                    if (f.regex["urlpre" + (a + 1)]) {
                                        var g, h = b;
                                        a + 1 - b.length > 0 && (h = c.buffer.join("").substring(0, a + 1 - b.length) + "" + h);
                                        var i = f.regex["urlpre" + (a + 1)].test(h);
                                        if (!e && !i) {
                                            for (d -= a, g = 0; g < f.defaultPrefix.length; g++)c.buffer[d] = f.defaultPrefix[g], d++;
                                            for (g = 0; g < h.length - 1; g++)c.buffer[d] = h[g], d++;
                                            return {pos: d}
                                        }
                                        return i
                                    }
                                    return !1
                                }, cardinality: a
                            }
                        }();
                        return a
                    }()
                }, r: {validator: ".", cardinality: 50}
            },
            insertMode: !1,
            autoUnmask: !1
        },
        ip: {
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]", definitions: {
                i: {
                    validator: function (a, b, c) {
                        return c - 1 > -1 && "." != b.buffer[c - 1] ? (a = b.buffer[c - 1] + a, a = c - 2 > -1 && "." != b.buffer[c - 2] ? b.buffer[c - 2] + a : "0" + a) : a = "00" + a, new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(a)
                    }, cardinality: 1
                }
            }
        },
        email: {
            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",
            greedy: !1,
            onBeforePaste: function (a) {
                return a = a.toLowerCase(), a.replace("mailto:", "")
            },
            definitions: {"*": {validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]", cardinality: 1, casing: "lower"}}
        }
    }), a.fn.inputmask
}(jQuery), function (a) {
    return a.extend(a.inputmask.defaults.aliases, {
        numeric: {
            mask: function (a) {
                function b(b) {
                    for (var c = "", d = 0; d < b.length; d++)c += a.definitions[b[d]] ? "\\" + b[d] : b[d];
                    return c
                }

                if (0 !== a.repeat && isNaN(a.integerDigits) && (a.integerDigits = a.repeat), a.repeat = 0, a.groupSeparator == a.radixPoint && (a.groupSeparator = "." == a.radixPoint ? "," : "," == a.radixPoint ? "." : ""), " " === a.groupSeparator && (a.skipOptionalPartCharacter = void 0), a.autoGroup = a.autoGroup && "" != a.groupSeparator, a.autoGroup && ("string" == typeof a.groupSize && isFinite(a.groupSize) && (a.groupSize = parseInt(a.groupSize)), isFinite(a.integerDigits))) {
                    var c = Math.floor(a.integerDigits / a.groupSize), d = a.integerDigits % a.groupSize;
                    a.integerDigits = parseInt(a.integerDigits) + (0 == d ? c - 1 : c)
                }
                a.radixFocus = a.radixFocus && "0" == a.placeholder, a.definitions[";"] = a.definitions["~"];
                var e = b(a.prefix);
                return e += "[+]", e += "~{1," + a.integerDigits + "}", void 0 != a.digits && (isNaN(a.digits) || parseInt(a.digits) > 0) && (e += a.digitsOptional ? "[" + (a.decimalProtect ? ":" : a.radixPoint) + ";{" + a.digits + "}]" : (a.decimalProtect ? ":" : a.radixPoint) + ";{" + a.digits + "}"), e += b(a.suffix), e += "[-]", a.greedy = !1, e
            },
            placeholder: "",
            greedy: !1,
            digits: "*",
            digitsOptional: !0,
            groupSeparator: "",
            radixPoint: ".",
            radixFocus: !0,
            groupSize: 3,
            autoGroup: !1,
            allowPlus: !0,
            allowMinus: !0,
            negationSymbol: {front: "-", back: ""},
            integerDigits: "+",
            prefix: "",
            suffix: "",
            rightAlign: !0,
            decimalProtect: !0,
            min: void 0,
            max: void 0,
            postFormat: function (b, c, d, e) {
                c = c >= b.length ? b.length - 1 : c < e.prefix.length ? e.prefix.length : c;
                var f = !1, g = b[c];
                if ("" == e.groupSeparator || -1 != a.inArray(e.radixPoint, b) && c >= a.inArray(e.radixPoint, b) || new RegExp("[-+]").test(g))return {pos: c};
                var h = b.slice();
                g == e.groupSeparator && (h.splice(c--, 1), g = h[c]), d ? h[c] = "?" : h.splice(c, 0, "?");
                var i = h.join(""), j = i;
                if (i.length > 0 && e.autoGroup || d && -1 != i.indexOf(e.groupSeparator)) {
                    var k = a.inputmask.escapeRegex.call(this, e.groupSeparator);
                    f = 0 == i.indexOf(e.groupSeparator), i = i.replace(new RegExp(k, "g"), "");
                    var l = i.split(e.radixPoint);
                    if (i = "" == e.radixPoint ? i : l[0], i != e.prefix + "?0" && i.length >= e.groupSize + e.prefix.length)for (var m = new RegExp("([-+]?[\\d?]+)([\\d?]{" + e.groupSize + "})"); m.test(i);)i = i.replace(m, "$1" + e.groupSeparator + "$2"), i = i.replace(e.groupSeparator + e.groupSeparator, e.groupSeparator);
                    "" != e.radixPoint && l.length > 1 && (i += e.radixPoint + l[1])
                }
                f = j != i, b.length = i.length;
                for (var n = 0, o = i.length; o > n; n++)b[n] = i.charAt(n);
                var p = a.inArray("?", b);
                return d ? b[p] = g : b.splice(p, 1), {pos: p, refreshFromBuffer: f, buffer: b}
            },
            onBeforeWrite: function (b, c, d, e) {
                if (b && "blur" == b.type) {
                    var f = c.join(""), g = f.replace(e.prefix, "");
                    if (g = g.replace(e.suffix, ""), g = g.replace(new RegExp(a.inputmask.escapeRegex.call(this, e.groupSeparator), "g"), ""), g = g.replace(a.inputmask.escapeRegex.call(this, e.radixPoint), "."), isFinite(g) && isFinite(e.min) && parseFloat(g) < parseFloat(e.min))return e.postFormat((e.prefix + e.min).split(""), 0, !0, e);
                    var h = "" != e.radixPoint ? c.join("").split(e.radixPoint) : [c.join("")], i = h[0].match(e.regex.integerPart(e)), j = 2 == h.length ? h[1].match(e.regex.integerNPart(e)) : void 0;
                    i && "-0" == i[0] && (void 0 == j || j[0].match(/^0+$/)) && c.splice(i.index, 1);
                    var k = a.inArray(e.radixPoint, c);
                    if (-1 != k && isFinite(e.digits) && !e.digitsOptional) {
                        for (var l = 1; l <= e.digits; l++)(void 0 == c[k + l] || c[k + l] == e.placeholder.charAt(0)) && (c[k + l] = "0");
                        return {refreshFromBuffer: !0, buffer: c}
                    }
                }
                if (e.autoGroup) {
                    var m = e.postFormat(c, d - 1, !0, e);
                    return m.caret = 0 == d ? d : m.pos + 1, m
                }
            },
            regex: {
                integerPart: function (a) {
                    return new RegExp("[" + a.negationSymbol.front + "+]?\\d+")
                }, integerNPart: function (b) {
                    return new RegExp("[\\d" + a.inputmask.escapeRegex.call(this, b.groupSeparator) + "]+")
                }
            },
            signHandler: function (a, b, c, d, e) {
                if (!d && e.allowMinus && "-" === a || e.allowPlus && "+" === a) {
                    var f = b.buffer.join("").match(e.regex.integerPart(e));
                    if (f && f[0].length > 0)return b.buffer[f.index] == ("-" === a ? "+" : e.negationSymbol.front) ? {
                        pos: f.index,
                        c: "-" === a ? e.negationSymbol.front : "+",
                        remove: f.index,
                        caret: c
                    } : b.buffer[f.index] == ("-" === a ? e.negationSymbol.front : "+") ? {
                        remove: f.index,
                        caret: c - 1
                    } : {pos: f.index, c: "-" === a ? e.negationSymbol.front : "+", caret: c + 1}
                }
                return !1
            },
            radixHandler: function (b, c, d, e, f) {
                if (!e && b === f.radixPoint && f.digits > 0) {
                    var g = a.inArray(f.radixPoint, c.buffer), h = c.buffer.join("").match(f.regex.integerPart(f));
                    if (-1 != g && c.validPositions[g])return c.validPositions[g - 1] ? {caret: g + 1} : {
                        pos: h.index,
                        c: h[0],
                        caret: g + 1
                    };
                    if (!h || "0" == h[0] && h.index + 1 != d)return c.buffer[h ? h.index : d] = "0", {pos: (h ? h.index : d) + 1}
                }
                return !1
            },
            leadingZeroHandler: function (b, c, d, e, f) {
                var g = c.buffer.join("").match(f.regex.integerNPart(f)), h = a.inArray(f.radixPoint, c.buffer);
                if (g && !e && (-1 == h || h >= d))if (0 == g[0].indexOf("0")) {
                    d < f.prefix.length && (d = g.index);
                    var i = a.inArray(f.radixPoint, c._buffer), j = c._buffer && c.buffer.slice(h).join("") == c._buffer.slice(i).join("") || 0 == parseInt(c.buffer.slice(h + 1).join("")), k = c._buffer && c.buffer.slice(g.index, h).join("") == c._buffer.slice(f.prefix.length, i).join("") || "0" == c.buffer.slice(g.index, h).join("");
                    if (-1 == h || j && k)return c.buffer.splice(g.index, 1), d = d > g.index ? d - 1 : g.index, {
                        pos: d,
                        remove: g.index
                    };
                    if (g.index + 1 == d || "0" == b)return c.buffer.splice(g.index, 1), d = g.index, {
                        pos: d,
                        remove: g.index
                    }
                } else if ("0" === b && d <= g.index)return !1;
                return !0
            },
            postValidation: function (b, c) {
                var d = !0, e = b.join(""), f = e.replace(c.prefix, "");
                return f = f.replace(c.suffix, ""), f = f.replace(new RegExp(a.inputmask.escapeRegex.call(this, c.groupSeparator), "g"), ""), f = f.replace(a.inputmask.escapeRegex.call(this, c.radixPoint), "."), isFinite(f) && isFinite(c.max) && (d = parseFloat(f) <= parseFloat(c.max)), d
            },
            definitions: {
                "~": {
                    validator: function (b, c, d, e, f) {
                        var g = f.signHandler(b, c, d, e, f);
                        if (!g && (g = f.radixHandler(b, c, d, e, f), !g && (g = e ? new RegExp("[0-9" + a.inputmask.escapeRegex.call(this, f.groupSeparator) + "]").test(b) : new RegExp("[0-9]").test(b), g === !0 && (g = f.leadingZeroHandler(b, c, d, e, f), g === !0)))) {
                            var h = a.inArray(f.radixPoint, c.buffer);
                            g = f.digitsOptional === !1 && d > h && !e ? {pos: d, remove: d} : {pos: d}
                        }
                        return g
                    }, cardinality: 1, prevalidator: null
                }, "+": {
                    validator: function (a, b, c, d, e) {
                        var f = e.signHandler(a, b, c, d, e);
                        return !f && (d && e.allowMinus && a === e.negationSymbol.front || e.allowMinus && "-" == a || e.allowPlus && "+" == a) && (f = !0), f
                    }, cardinality: 1, prevalidator: null, placeholder: ""
                }, "-": {
                    validator: function (a, b, c, d, e) {
                        var f = e.signHandler(a, b, c, d, e);
                        return !f && d && e.allowMinus && a === e.negationSymbol.back && (f = !0), f
                    }, cardinality: 1, prevalidator: null, placeholder: ""
                }, ":": {
                    validator: function (b, c, d, e, f) {
                        var g = f.signHandler(b, c, d, e, f);
                        if (!g) {
                            var h = "[" + a.inputmask.escapeRegex.call(this, f.radixPoint) + "]";
                            g = new RegExp(h).test(b), g && c.validPositions[d] && c.validPositions[d].match.placeholder == f.radixPoint && (g = {caret: d + 1})
                        }
                        return g
                    }, cardinality: 1, prevalidator: null, placeholder: function (a) {
                        return a.radixPoint
                    }
                }
            },
            insertMode: !0,
            autoUnmask: !1,
            onUnMask: function (b, c, d) {
                var e = b.replace(d.prefix, "");
                return e = e.replace(d.suffix, ""), e = e.replace(new RegExp(a.inputmask.escapeRegex.call(this, d.groupSeparator), "g"), "")
            },
            isComplete: function (b, c) {
                var d = b.join(""), e = b.slice();
                if (c.postFormat(e, 0, !0, c), e.join("") != d)return !1;
                var f = d.replace(c.prefix, "");
                return f = f.replace(c.suffix, ""), f = f.replace(new RegExp(a.inputmask.escapeRegex.call(this, c.groupSeparator), "g"), ""), f = f.replace(a.inputmask.escapeRegex.call(this, c.radixPoint), "."), isFinite(f)
            },
            onBeforeMask: function (b, c) {
                if ("" != c.radixPoint && isFinite(b))b = b.toString().replace(".", c.radixPoint); else {
                    var d = b.match(/,/g), e = b.match(/\./g);
                    e && d ? e.length > d.length ? (b = b.replace(/\./g, ""), b = b.replace(",", c.radixPoint)) : d.length > e.length ? (b = b.replace(/,/g, ""), b = b.replace(".", c.radixPoint)) : b = b.indexOf(".") < b.indexOf(",") ? b.replace(/\./g, "") : b = b.replace(/,/g, "") : b = b.replace(new RegExp(a.inputmask.escapeRegex.call(this, c.groupSeparator), "g"), "")
                }
                return 0 == c.digits && (-1 != b.indexOf(".") ? b = b.substring(0, b.indexOf(".")) : -1 != b.indexOf(",") && (b = b.substring(0, b.indexOf(",")))), b
            },
            canClearPosition: function (b, c, d, e, f) {
                var g = b.validPositions[c].input, h = g != f.radixPoint && isFinite(g) || c == d || g == f.groupSeparator;
                if (h && isFinite(g)) {
                    var i = b.buffer.join("").substr(0, c).match(f.regex.integerNPart(f));
                    if (!e) {
                        var j = c + 1, k = null == i || 0 == parseInt(i[0].replace(new RegExp(a.inputmask.escapeRegex.call(this, f.groupSeparator), "g"), ""));
                        if (k)for (; b.validPositions[j] && (b.validPositions[j].input == f.groupSeparator || "0" == b.validPositions[j].input);)delete b.validPositions[j], j++
                    }
                    var l = [];
                    for (var m in b.validPositions)l.push(b.validPositions[m].input);
                    if (i = l.join("").match(f.regex.integerNPart(f)), radixPosition = a.inArray(f.radixPoint, b.buffer), i && (-1 == radixPosition || c <= radixPosition))if (0 == i[0].indexOf("0"))h = i.index != c || -1 == radixPosition; else {
                        var n = parseInt(i[0].replace(new RegExp(a.inputmask.escapeRegex.call(this, f.groupSeparator), "g"), ""));
                        -1 != radixPosition && 10 > n && "0" == f.placeholder.charAt(0) && (b.validPositions[c].input = "0", b.p = f.prefix.length + 1, h = !1)
                    }
                }
                return h
            }
        },
        currency: {
            prefix: "$ ",
            groupSeparator: ",",
            alias: "numeric",
            placeholder: "0",
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1
        },
        decimal: {alias: "numeric"},
        integer: {alias: "numeric", digits: "0", radixPoint: ""}
    }), a.fn.inputmask
}(jQuery), function (a) {
    return a.extend(a.inputmask.defaults.aliases, {
        phone: {
            url: "phone-codes/phone-codes.js",
            maskInit: "+pp(pp)pppppppp",
            countrycode: "",
            mask: function (b) {
                b.definitions = {
                    p: {
                        validator: function () {
                            return !1
                        }, cardinality: 1
                    }, "#": {validator: "[0-9]", cardinality: 1}
                };
                var c = [];
                return a.ajax({
                    url: b.url, async: !1, dataType: "json", success: function (a) {
                        c = a
                    }, error: function (a, c, d) {
                        alert(d + " - " + b.url)
                    }
                }), c = c.sort(function (a, b) {
                    return (a.mask || a) < (b.mask || b) ? -1 : 1
                }), "" != b.countrycode && (b.maskInit = "+" + b.countrycode + b.maskInit.substring(3)), c.splice(0, 0, b.maskInit), c
            },
            nojumps: !0,
            nojumpsThreshold: 1,
            onBeforeMask: function (a, b) {
                var c = a.replace(/^0/g, "");
                return (c.indexOf(b.countrycode) > 1 || -1 == c.indexOf(b.countrycode)) && (c = "+" + b.countrycode + c), c
            }
        }, phonebe: {alias: "phone", url: "phone-codes/phone-be.js", countrycode: "32", nojumpsThreshold: 4}
    }), a.fn.inputmask
}(jQuery), function (a) {
    return a.extend(a.inputmask.defaults.aliases, {
        Regex: {
            mask: "r",
            greedy: !1,
            repeat: "*",
            regex: null,
            regexTokens: null,
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            isComplete: function (a, b) {
                return new RegExp(b.regex).test(a.join(""))
            },
            definitions: {
                r: {
                    validator: function (b, c, d, e, f) {
                        function g(a, b) {
                            this.matches = [], this.isGroup = a || !1, this.isQuantifier = b || !1, this.quantifier = {
                                min: 1,
                                max: 1
                            }, this.repeaterPart = void 0
                        }

                        function h() {
                            var a, b, c = new g, d = [];
                            for (f.regexTokens = []; a = f.tokenizer.exec(f.regex);)switch (b = a[0], b.charAt(0)) {
                                case"(":
                                    d.push(new g(!0));
                                    break;
                                case")":
                                    var e = d.pop();
                                    d.length > 0 ? d[d.length - 1].matches.push(e) : c.matches.push(e);
                                    break;
                                case"{":
                                case"+":
                                case"*":
                                    var h = new g(!1, !0);
                                    b = b.replace(/[{}]/g, "");
                                    var i = b.split(","), j = isNaN(i[0]) ? i[0] : parseInt(i[0]), k = 1 == i.length ? j : isNaN(i[1]) ? i[1] : parseInt(i[1]);
                                    if (h.quantifier = {min: j, max: k}, d.length > 0) {
                                        var l = d[d.length - 1].matches;
                                        if (a = l.pop(), !a.isGroup) {
                                            var e = new g(!0);
                                            e.matches.push(a), a = e
                                        }
                                        l.push(a), l.push(h)
                                    } else {
                                        if (a = c.matches.pop(), !a.isGroup) {
                                            var e = new g(!0);
                                            e.matches.push(a), a = e
                                        }
                                        c.matches.push(a), c.matches.push(h)
                                    }
                                    break;
                                default:
                                    d.length > 0 ? d[d.length - 1].matches.push(b) : c.matches.push(b)
                            }
                            c.matches.length > 0 && f.regexTokens.push(c)
                        }

                        function i(b, c) {
                            var d = !1;
                            c && (k += "(", m++);
                            for (var e = 0; e < b.matches.length; e++) {
                                var f = b.matches[e];
                                if (1 == f.isGroup)d = i(f, !0); else if (1 == f.isQuantifier) {
                                    var g = a.inArray(f, b.matches), h = b.matches[g - 1], j = k;
                                    if (isNaN(f.quantifier.max)) {
                                        for (; f.repeaterPart && f.repeaterPart != k && f.repeaterPart.length > k.length && !(d = i(h, !0)););
                                        d = d || i(h, !0), d && (f.repeaterPart = k), k = j + f.quantifier.max
                                    } else {
                                        for (var l = 0, o = f.quantifier.max - 1; o > l && !(d = i(h, !0)); l++);
                                        k = j + "{" + f.quantifier.min + "," + f.quantifier.max + "}"
                                    }
                                } else if (void 0 != f.matches)for (var p = 0; p < f.length && !(d = i(f[p], c)); p++); else {
                                    var q;
                                    if ("[" == f.charAt(0)) {
                                        q = k, q += f;
                                        for (var r = 0; m > r; r++)q += ")";
                                        var s = new RegExp("^(" + q + ")$");
                                        d = s.test(n)
                                    } else for (var t = 0, u = f.length; u > t; t++)if ("\\" != f.charAt(t)) {
                                        q = k, q += f.substr(0, t + 1), q = q.replace(/\|$/, "");
                                        for (var r = 0; m > r; r++)q += ")";
                                        var s = new RegExp("^(" + q + ")$");
                                        if (d = s.test(n))break
                                    }
                                    k += f
                                }
                                if (d)break
                            }
                            return c && (k += ")", m--), d
                        }

                        null == f.regexTokens && h();
                        var j = c.buffer.slice(), k = "", l = !1, m = 0;
                        j.splice(d, 0, b);
                        for (var n = j.join(""), o = 0; o < f.regexTokens.length; o++) {
                            var g = f.regexTokens[o];
                            if (l = i(g, g.isGroup))break
                        }
                        return l
                    }, cardinality: 1
                }
            }
        }
    }), a.fn.inputmask
}(jQuery), $.extend($.inputmask.defaults, {autoUnmask: !0}), $.extend($.inputmask.defaults.aliases, {
    dateService: {
        alias: "mm/dd/yyyy",
        onBeforeMask: function (a) {
            return moment(a).format("MM/DD/YYYY")
        }
    }, zipcode: {
        mask: "99999[-9999]", greedy: !1, onBeforePaste: function (a, b) {
            return a.length > 10 && (b.greedy = !0), a
        }
    }, money: {
        mask: "$9{+}.99", placeholder: "0", onUnMask: function (a, b) {
            var b = a.substr(1);
            return +b > 0 ? b : ""
        }
    }
}), $(document).ready(function () {
    $("[data-inputmask]").inputmask()
}), window.ParsleyConfig = {
    namespace: "data-validate-",
    errorClass: "error",
    successClass: "success",
    errorsWrapper: '<ul class="errors-container"></ul>',
    errorTemplate: '<li class="error"></li>',
    validators: {
        preventpartialcompletion: {
            fn: function (a, b) {
                var c = !1;
                return $('[data-validate-preventpartialcompletion="' + b + '"]').each(function () {
                    a = $(this).val(), a && (c = !0)
                }), c ? !!a : !a
            }
        }, preventsameanswer: {
            fn: function (a, b) {
                var c = !0, d = $("[data-validate-preventsameanswer]");
                return d.each(function (d, e) {
                    b !== $(e).context.dataset.validatePreventsameanswer && a && $(e).val() && $(e).val() === a && (c = !1)
                }), c
            }
        }, conditionalRequirement: {
            fn: function (a, b) {
                var c = !0, d = $('[data-validate-conditionalRequirementCondition="' + b + '"]');
                if ("SSN" === b) {
                    var e = $('[data-validate-conditionalRequirementConditional="' + b + '"][type="radio"]'), f = $('[data-validate-conditionalRequirementConditional="' + b + '"][type="text"]');
                    return !d.prop("checked") || f.val() && e.prop("checked") || (c = !1), c
                }
            }
        }, mindate: {
            fn: function (a, b) {
                {
                    var c = Date.parse(a);
                    Date.parse(b)
                }
                return this.requirements = moment(new Date(this.requirements)).format("MM/DD/YYYY"), isNaN(c) ? !1 : !moment(a).isBefore(b, "days")
            }
        }, maxdate: {
            fn: function (a, b) {
                {
                    var c = Date.parse(a);
                    Date.parse(b)
                }
                return this.requirements = moment(new Date(this.requirements)).format("MM/DD/YYYY"), isNaN(c) ? !1 : !moment(a).isAfter(b, "days")
            }
        }
    },
    i18n: {
        en: {
            mindate: "This date must be on or after %s.",
            maxdate: "This date must be on or before %s.",
            preventsameanswer: "Answer to security questions can't be the same"
        }
    },
    classHandler: function (a) {
        return a.$element.parent()
    }
}, numeral.language("en", {
    delimiters: {thousands: ",", decimal: "."},
    abbreviations: {thousand: "k", million: "m", billion: "b", trillion: "t"},
    ordinal: function (a) {
        var b = a % 10;
        return 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th"
    },
    currency: {symbol: '<sup class="currency">$</sup>'}
}), numeral.language("en"), /*!
 * Parsleyjs
 * Guillaume Potier - <guillaume@wisembly.com>
 * Version 2.0.6 - built Sat Jan 24 2015 14:44:37
 * MIT Licensed
 *
 */
    !function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
    }(function (a) {
        "undefined" == typeof a && "undefined" != typeof window.jQuery && (a = window.jQuery);
        var b = {
            attr: function (a, b, c) {
                var d, e = {}, f = this.msieversion(), g = new RegExp("^" + b, "i");
                if ("undefined" == typeof a || "undefined" == typeof a[0])return {};
                for (var h in a[0].attributes)if (d = a[0].attributes[h], "undefined" != typeof d && null !== d && (!f || f >= 8 || d.specified) && g.test(d.name)) {
                    if ("undefined" != typeof c && new RegExp(c + "$", "i").test(d.name))return !0;
                    e[this.camelize(d.name.replace(b, ""))] = this.deserializeValue(d.value)
                }
                return "undefined" == typeof c ? e : !1
            }, setAttr: function (a, b, c, d) {
                a[0].setAttribute(this.dasherize(b + c), String(d))
            }, get: function (a, b) {
                for (var c = 0, d = (b || "").split("."); this.isObject(a) || this.isArray(a);)if (a = a[d[c++]], c === d.length)return a;
                return void 0
            }, hash: function (a) {
                return String(Math.random()).substring(2, a ? a + 2 : 9)
            }, isArray: function (a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }, isObject: function (a) {
                return a === Object(a)
            }, deserializeValue: function (b) {
                var c;
                try {
                    return b ? "true" == b || ("false" == b ? !1 : "null" == b ? null : isNaN(c = Number(b)) ? /^[\[\{]/.test(b) ? a.parseJSON(b) : b : c) : b
                } catch (d) {
                    return b
                }
            }, camelize: function (a) {
                return a.replace(/-+(.)?/g, function (a, b) {
                    return b ? b.toUpperCase() : ""
                })
            }, dasherize: function (a) {
                return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            }, msieversion: function () {
                var a = window.navigator.userAgent, b = a.indexOf("MSIE ");
                return b > 0 || navigator.userAgent.match(/Trident.*rv\:11\./) ? parseInt(a.substring(b + 5, a.indexOf(".", b)), 10) : 0
            }
        }, c = {
            namespace: "data-parsley-",
            inputs: "input, textarea, select",
            excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
            priorityEnabled: !0,
            uiEnabled: !0,
            validationThreshold: 3,
            focus: "first",
            trigger: !1,
            errorClass: "parsley-error",
            successClass: "parsley-success",
            classHandler: function () {
            },
            errorsContainer: function () {
            },
            errorsWrapper: '<ul class="parsley-errors-list"></ul>',
            errorTemplate: "<li></li>"
        }, d = function () {
        };
        d.prototype = {
            asyncSupport: !1, actualizeOptions: function () {
                return this.options = this.OptionsFactory.get(this), this
            }, validateThroughValidator: function (a, b, c) {
                return window.ParsleyValidator.validate(a, b, c)
            }, subscribe: function (b, c) {
                return a.listenTo(this, b.toLowerCase(), c), this
            }, unsubscribe: function (b) {
                return a.unsubscribeTo(this, b.toLowerCase()), this
            }, reset: function () {
                if ("ParsleyForm" !== this.__class__)return a.emit("parsley:field:reset", this);
                for (var b = 0; b < this.fields.length; b++)a.emit("parsley:field:reset", this.fields[b]);
                a.emit("parsley:form:reset", this)
            }, destroy: function () {
                if ("ParsleyForm" !== this.__class__)return this.$element.removeData("Parsley"), this.$element.removeData("ParsleyFieldMultiple"), void a.emit("parsley:field:destroy", this);
                for (var b = 0; b < this.fields.length; b++)this.fields[b].destroy();
                this.$element.removeData("Parsley"), a.emit("parsley:form:destroy", this)
            }
        };
        /*!
         * validator.js
         * Guillaume Potier - <guillaume@wisembly.com>
         * Version 1.0.1 - built Mon Aug 25 2014 16:10:10
         * MIT Licensed
         *
         */
        var e = function () {
            var a = {}, b = function (a) {
                this.__class__ = "Validator", this.__version__ = "1.0.1", this.options = a || {}, this.bindingKey = this.options.bindingKey || "_validatorjsConstraint"
            };
            b.prototype = {
                constructor: b, validate: function (a, b, c) {
                    if ("string" != typeof a && "object" != typeof a)throw new Error("You must validate an object or a string");
                    return "string" == typeof a || g(a) ? this._validateString(a, b, c) : this.isBinded(a) ? this._validateBindedObject(a, b) : this._validateObject(a, b, c)
                }, bind: function (a, b) {
                    if ("object" != typeof a)throw new Error("Must bind a Constraint to an object");
                    return a[this.bindingKey] = new c(b), this
                }, unbind: function (a) {
                    return "undefined" == typeof a._validatorjsConstraint ? this : (delete a[this.bindingKey], this)
                }, isBinded: function (a) {
                    return "undefined" != typeof a[this.bindingKey]
                }, getBinded: function (a) {
                    return this.isBinded(a) ? a[this.bindingKey] : null
                }, _validateString: function (a, b, c) {
                    var f, h = [];
                    g(b) || (b = [b]);
                    for (var i = 0; i < b.length; i++) {
                        if (!(b[i] instanceof e))throw new Error("You must give an Assert or an Asserts array to validate a string");
                        f = b[i].check(a, c), f instanceof d && h.push(f)
                    }
                    return h.length ? h : !0
                }, _validateObject: function (a, b, d) {
                    if ("object" != typeof b)throw new Error("You must give a constraint to validate an object");
                    return b instanceof c ? b.check(a, d) : new c(b).check(a, d)
                }, _validateBindedObject: function (a, b) {
                    return a[this.bindingKey].check(a, b)
                }
            }, b.errorCode = {
                must_be_a_string: "must_be_a_string",
                must_be_an_array: "must_be_an_array",
                must_be_a_number: "must_be_a_number",
                must_be_a_string_or_array: "must_be_a_string_or_array"
            };
            var c = function (a, b) {
                if (this.__class__ = "Constraint", this.options = b || {}, this.nodes = {}, a)try {
                    this._bootstrap(a)
                } catch (c) {
                    throw new Error("Should give a valid mapping object to Constraint", c, a)
                }
            };
            c.prototype = {
                constructor: c, check: function (a, b) {
                    var c, d = {};
                    for (var h in this.nodes) {
                        for (var i = !1, j = this.get(h), k = g(j) ? j : [j], l = k.length - 1; l >= 0; l--)"Required" !== k[l].__class__ || (i = k[l].requiresValidation(b));
                        if (this.has(h, a) || this.options.strict || i)try {
                            this.has(h, this.options.strict || i ? a : void 0) || (new e).HaveProperty(h).validate(a), c = this._check(h, a[h], b), (g(c) && c.length > 0 || !g(c) && !f(c)) && (d[h] = c)
                        } catch (m) {
                            d[h] = m
                        }
                    }
                    return f(d) ? !0 : d
                }, add: function (a, b) {
                    if (b instanceof e || g(b) && b[0] instanceof e)return this.nodes[a] = b, this;
                    if ("object" == typeof b && !g(b))return this.nodes[a] = b instanceof c ? b : new c(b), this;
                    throw new Error("Should give an Assert, an Asserts array, a Constraint", b)
                }, has: function (a, b) {
                    return b = "undefined" != typeof b ? b : this.nodes, "undefined" != typeof b[a]
                }, get: function (a, b) {
                    return this.has(a) ? this.nodes[a] : b || null
                }, remove: function (a) {
                    var b = [];
                    for (var c in this.nodes)c !== a && (b[c] = this.nodes[c]);
                    return this.nodes = b, this
                }, _bootstrap: function (a) {
                    if (a instanceof c)return this.nodes = a.nodes;
                    for (var b in a)this.add(b, a[b])
                }, _check: function (a, b, d) {
                    if (this.nodes[a] instanceof e)return this._checkAsserts(b, [this.nodes[a]], d);
                    if (g(this.nodes[a]))return this._checkAsserts(b, this.nodes[a], d);
                    if (this.nodes[a] instanceof c)return this.nodes[a].check(b, d);
                    throw new Error("Invalid node", this.nodes[a])
                }, _checkAsserts: function (a, b, c) {
                    for (var d, e = [], f = 0; f < b.length; f++)d = b[f].check(a, c), "undefined" != typeof d && !0 !== d && e.push(d);
                    return e
                }
            };
            var d = function (a, b, c) {
                if (this.__class__ = "Violation", !(a instanceof e))throw new Error("Should give an assertion implementing the Assert interface");
                this.assert = a, this.value = b, "undefined" != typeof c && (this.violation = c)
            };
            d.prototype = {
                show: function () {
                    var a = {assert: this.assert.__class__, value: this.value};
                    return this.violation && (a.violation = this.violation), a
                }, __toString: function () {
                    return "undefined" != typeof this.violation && (this.violation = '", ' + this.getViolation().constraint + " expected was " + this.getViolation().expected), this.assert.__class__ + ' assert failed for "' + this.value + this.violation || ""
                }, getViolation: function () {
                    var a, b;
                    for (a in this.violation)b = this.violation[a];
                    return {constraint: a, expected: b}
                }
            };
            var e = function (a) {
                this.__class__ = "Assert", this.__parentClass__ = this.__class__, this.groups = [], "undefined" != typeof a && this.addGroup(a)
            };
            e.prototype = {
                construct: e, requiresValidation: function (a) {
                    return a && !this.hasGroup(a) ? !1 : !a && this.hasGroups() ? !1 : !0
                }, check: function (a, b) {
                    if (this.requiresValidation(b))try {
                        return this.validate(a, b)
                    } catch (c) {
                        return c
                    }
                }, hasGroup: function (a) {
                    return g(a) ? this.hasOneOf(a) : "Any" === a ? !0 : this.hasGroups() ? -1 !== this.groups.indexOf(a) : "Default" === a
                }, hasOneOf: function (a) {
                    for (var b = 0; b < a.length; b++)if (this.hasGroup(a[b]))return !0;
                    return !1
                }, hasGroups: function () {
                    return this.groups.length > 0
                }, addGroup: function (a) {
                    return g(a) ? this.addGroups(a) : (this.hasGroup(a) || this.groups.push(a), this)
                }, removeGroup: function (a) {
                    for (var b = [], c = 0; c < this.groups.length; c++)a !== this.groups[c] && b.push(this.groups[c]);
                    return this.groups = b, this
                }, addGroups: function (a) {
                    for (var b = 0; b < a.length; b++)this.addGroup(a[b]);
                    return this
                }, HaveProperty: function (a) {
                    return this.__class__ = "HaveProperty", this.node = a, this.validate = function (a) {
                        if ("undefined" == typeof a[this.node])throw new d(this, a, {value: this.node});
                        return !0
                    }, this
                }, Blank: function () {
                    return this.__class__ = "Blank", this.validate = function (a) {
                        if ("string" != typeof a)throw new d(this, a, {value: b.errorCode.must_be_a_string});
                        if ("" !== a.replace(/^\s+/g, "").replace(/\s+$/g, ""))throw new d(this, a);
                        return !0
                    }, this
                }, Callback: function (a) {
                    if (this.__class__ = "Callback", this.arguments = Array.prototype.slice.call(arguments), 1 === this.arguments.length ? this.arguments = [] : this.arguments.splice(0, 1), "function" != typeof a)throw new Error("Callback must be instanciated with a function");
                    return this.fn = a, this.validate = function (a) {
                        var b = this.fn.apply(this, [a].concat(this.arguments));
                        if (!0 !== b)throw new d(this, a, {result: b});
                        return !0
                    }, this
                }, Choice: function (a) {
                    if (this.__class__ = "Choice", !g(a) && "function" != typeof a)throw new Error("Choice must be instanciated with an array or a function");
                    return this.list = a, this.validate = function (a) {
                        for (var b = "function" == typeof this.list ? this.list() : this.list, c = 0; c < b.length; c++)if (a === b[c])return !0;
                        throw new d(this, a, {choices: b})
                    }, this
                }, Collection: function (a) {
                    return this.__class__ = "Collection", this.constraint = "undefined" != typeof a ? a instanceof e ? a : new c(a) : !1, this.validate = function (a, c) {
                        var e, h = new b, i = 0, j = {}, k = this.groups.length ? this.groups : c;
                        if (!g(a))throw new d(this, a, {value: b.errorCode.must_be_an_array});
                        for (var l = 0; l < a.length; l++)e = this.constraint ? h.validate(a[l], this.constraint, k) : h.validate(a[l], k), f(e) || (j[i] = e), i++;
                        return f(j) ? !0 : j
                    }, this
                }, Count: function (a) {
                    return this.__class__ = "Count", this.count = a, this.validate = function (a) {
                        if (!g(a))throw new d(this, a, {value: b.errorCode.must_be_an_array});
                        var c = "function" == typeof this.count ? this.count(a) : this.count;
                        if (isNaN(Number(c)))throw new Error("Count must be a valid interger", c);
                        if (c !== a.length)throw new d(this, a, {count: c});
                        return !0
                    }, this
                }, Email: function () {
                    return this.__class__ = "Email", this.validate = function (a) {
                        var c = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
                        if ("string" != typeof a)throw new d(this, a, {value: b.errorCode.must_be_a_string});
                        if (!c.test(a))throw new d(this, a);
                        return !0
                    }, this
                }, EqualTo: function (a) {
                    if (this.__class__ = "EqualTo", "undefined" == typeof a)throw new Error("EqualTo must be instanciated with a value or a function");
                    return this.reference = a, this.validate = function (a) {
                        var b = "function" == typeof this.reference ? this.reference(a) : this.reference;
                        if (b !== a)throw new d(this, a, {value: b});
                        return !0
                    }, this
                }, GreaterThan: function (a) {
                    if (this.__class__ = "GreaterThan", "undefined" == typeof a)throw new Error("Should give a threshold value");
                    return this.threshold = a, this.validate = function (a) {
                        if ("" === a || isNaN(Number(a)))throw new d(this, a, {value: b.errorCode.must_be_a_number});
                        if (this.threshold >= a)throw new d(this, a, {threshold: this.threshold});
                        return !0
                    }, this
                }, GreaterThanOrEqual: function (a) {
                    if (this.__class__ = "GreaterThanOrEqual", "undefined" == typeof a)throw new Error("Should give a threshold value");
                    return this.threshold = a, this.validate = function (a) {
                        if ("" === a || isNaN(Number(a)))throw new d(this, a, {value: b.errorCode.must_be_a_number});
                        if (this.threshold > a)throw new d(this, a, {threshold: this.threshold});
                        return !0
                    }, this
                }, InstanceOf: function (a) {
                    if (this.__class__ = "InstanceOf", "undefined" == typeof a)throw new Error("InstanceOf must be instanciated with a value");
                    return this.classRef = a, this.validate = function (a) {
                        if (!0 != a instanceof this.classRef)throw new d(this, a, {classRef: this.classRef});
                        return !0
                    }, this
                }, Length: function (a) {
                    if (this.__class__ = "Length", !a.min && !a.max)throw new Error("Lenth assert must be instanciated with a { min: x, max: y } object");
                    return this.min = a.min, this.max = a.max, this.validate = function (a) {
                        if ("string" != typeof a && !g(a))throw new d(this, a, {value: b.errorCode.must_be_a_string_or_array});
                        if ("undefined" != typeof this.min && this.min === this.max && a.length !== this.min)throw new d(this, a, {
                            min: this.min,
                            max: this.max
                        });
                        if ("undefined" != typeof this.max && a.length > this.max)throw new d(this, a, {max: this.max});
                        if ("undefined" != typeof this.min && a.length < this.min)throw new d(this, a, {min: this.min});
                        return !0
                    }, this
                }, LessThan: function (a) {
                    if (this.__class__ = "LessThan", "undefined" == typeof a)throw new Error("Should give a threshold value");
                    return this.threshold = a, this.validate = function (a) {
                        if ("" === a || isNaN(Number(a)))throw new d(this, a, {value: b.errorCode.must_be_a_number});
                        if (this.threshold <= a)throw new d(this, a, {threshold: this.threshold});
                        return !0
                    }, this
                }, LessThanOrEqual: function (a) {
                    if (this.__class__ = "LessThanOrEqual", "undefined" == typeof a)throw new Error("Should give a threshold value");
                    return this.threshold = a, this.validate = function (a) {
                        if ("" === a || isNaN(Number(a)))throw new d(this, a, {value: b.errorCode.must_be_a_number});
                        if (this.threshold < a)throw new d(this, a, {threshold: this.threshold});
                        return !0
                    }, this
                }, NotNull: function () {
                    return this.__class__ = "NotNull", this.validate = function (a) {
                        if (null === a || "undefined" == typeof a)throw new d(this, a);
                        return !0
                    }, this
                }, NotBlank: function () {
                    return this.__class__ = "NotBlank", this.validate = function (a) {
                        if ("string" != typeof a)throw new d(this, a, {value: b.errorCode.must_be_a_string});
                        if ("" === a.replace(/^\s+/g, "").replace(/\s+$/g, ""))throw new d(this, a);
                        return !0
                    }, this
                }, Null: function () {
                    return this.__class__ = "Null", this.validate = function (a) {
                        if (null !== a)throw new d(this, a);
                        return !0
                    }, this
                }, Range: function (a, b) {
                    if (this.__class__ = "Range", "undefined" == typeof a || "undefined" == typeof b)throw new Error("Range assert expects min and max values");
                    return this.min = a, this.max = b, this.validate = function (a) {
                        try {
                            return "string" == typeof a && isNaN(Number(a)) || g(a) ? (new e).Length({
                                min: this.min,
                                max: this.max
                            }).validate(a) : (new e).GreaterThanOrEqual(this.min).validate(a) && (new e).LessThanOrEqual(this.max).validate(a), !0
                        } catch (b) {
                            throw new d(this, a, b.violation)
                        }
                        return !0
                    }, this
                }, Regexp: function (a, c) {
                    if (this.__class__ = "Regexp", "undefined" == typeof a)throw new Error("You must give a regexp");
                    return this.regexp = a, this.flag = c || "", this.validate = function (a) {
                        if ("string" != typeof a)throw new d(this, a, {value: b.errorCode.must_be_a_string});
                        if (!new RegExp(this.regexp, this.flag).test(a))throw new d(this, a, {
                            regexp: this.regexp,
                            flag: this.flag
                        });
                        return !0
                    }, this
                }, Required: function () {
                    return this.__class__ = "Required", this.validate = function (a) {
                        if ("undefined" == typeof a)throw new d(this, a);
                        try {
                            "string" == typeof a ? (new e).NotNull().validate(a) && (new e).NotBlank().validate(a) : !0 === g(a) && (new e).Length({min: 1}).validate(a)
                        } catch (b) {
                            throw new d(this, a)
                        }
                        return !0
                    }, this
                }, Unique: function (a) {
                    return this.__class__ = "Unique", "object" == typeof a && (this.key = a.key), this.validate = function (a) {
                        var c, e = [];
                        if (!g(a))throw new d(this, a, {value: b.errorCode.must_be_an_array});
                        for (var f = 0; f < a.length; f++)if (c = "object" == typeof a[f] ? a[f][this.key] : a[f], "undefined" != typeof c) {
                            if (-1 !== e.indexOf(c))throw new d(this, a, {value: c});
                            e.push(c)
                        }
                        return !0
                    }, this
                }
            }, a.Assert = e, a.Validator = b, a.Violation = d, a.Constraint = c, Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
                if (null === this)throw new TypeError;
                var b = Object(this), c = b.length >>> 0;
                if (0 === c)return -1;
                var d = 0;
                if (arguments.length > 1 && (d = Number(arguments[1]), d != d ? d = 0 : 0 !== d && 1 / 0 != d && d != -1 / 0 && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), d >= c)return -1;
                for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++)if (e in b && b[e] === a)return e;
                return -1
            });
            var f = function (a) {
                for (var b in a)return !1;
                return !0
            }, g = function (a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            };
            return "function" == typeof define && define.amd ? define("vendors/validator.js/dist/validator", [], function () {
                return a
            }) : "undefined" != typeof module && module.exports ? module.exports = a : window["undefined" != typeof validatorjs_ns ? validatorjs_ns : "Validator"] = a, a
        }();
        e = "undefined" != typeof e ? e : "undefined" != typeof module ? module.exports : null;
        var f = function (a, b) {
            this.__class__ = "ParsleyValidator", this.Validator = e, this.locale = "en", this.init(a || {}, b || {})
        };
        f.prototype = {
            init: function (b, c) {
                this.catalog = c;
                for (var d in b)this.addValidator(d, b[d].fn, b[d].priority, b[d].requirementsTransformer);
                a.emit("parsley:validator:init")
            }, setLocale: function (a) {
                if ("undefined" == typeof this.catalog[a])throw new Error(a + " is not available in the catalog");
                return this.locale = a, this
            }, addCatalog: function (a, b, c) {
                return "object" == typeof b && (this.catalog[a] = b), !0 === c ? this.setLocale(a) : this
            }, addMessage: function (a, b, c) {
                return "undefined" == typeof this.catalog[a] && (this.catalog[a] = {}), this.catalog[a][b.toLowerCase()] = c, this
            }, validate: function () {
                return (new this.Validator.Validator).validate.apply(new e.Validator, arguments)
            }, addValidator: function (b, c, d, f) {
                return this.validators[b.toLowerCase()] = function (b) {
                    return a.extend((new e.Assert).Callback(c, b), {priority: d, requirementsTransformer: f})
                }, this
            }, updateValidator: function (a, b, c, d) {
                return this.addValidator(a, b, c, d)
            }, removeValidator: function (a) {
                return delete this.validators[a], this
            }, getErrorMessage: function (a) {
                var b;
                return b = "type" === a.name ? this.catalog[this.locale][a.name][a.requirements] : this.formatMessage(this.catalog[this.locale][a.name], a.requirements), "" !== b ? b : this.catalog[this.locale].defaultMessage
            }, formatMessage: function (a, b) {
                if ("object" == typeof b) {
                    for (var c in b)a = this.formatMessage(a, b[c]);
                    return a
                }
                return "string" == typeof a ? a.replace(new RegExp("%s", "i"), b) : ""
            }, validators: {
                notblank: function () {
                    return a.extend((new e.Assert).NotBlank(), {priority: 2})
                }, required: function () {
                    return a.extend((new e.Assert).Required(), {priority: 512})
                }, type: function (b) {
                    var c;
                    switch (b) {
                        case"email":
                            c = (new e.Assert).Email();
                            break;
                        case"range":
                        case"number":
                            c = (new e.Assert).Regexp("^-?(?:\\d+|\\d{1,3}(?:,\\d{3})+)?(?:\\.\\d+)?$");
                            break;
                        case"integer":
                            c = (new e.Assert).Regexp("^-?\\d+$");
                            break;
                        case"digits":
                            c = (new e.Assert).Regexp("^\\d+$");
                            break;
                        case"alphanum":
                            c = (new e.Assert).Regexp("^\\w+$", "i");
                            break;
                        case"url":
                            c = (new e.Assert).Regexp("(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,24}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)", "i");
                            break;
                        default:
                            throw new Error("validator type `" + b + "` is not supported")
                    }
                    return a.extend(c, {priority: 256})
                }, pattern: function (b) {
                    var c = "";
                    return /^\/.*\/(?:[gimy]*)$/.test(b) && (c = b.replace(/.*\/([gimy]*)$/, "$1"), b = b.replace(new RegExp("^/(.*?)/" + c + "$"), "$1")), a.extend((new e.Assert).Regexp(b, c), {priority: 64})
                }, minlength: function (b) {
                    return a.extend((new e.Assert).Length({min: b}), {
                        priority: 30, requirementsTransformer: function () {
                            return "string" != typeof b || isNaN(b) ? b : parseInt(b, 10)
                        }
                    })
                }, maxlength: function (b) {
                    return a.extend((new e.Assert).Length({max: b}), {
                        priority: 30, requirementsTransformer: function () {
                            return "string" != typeof b || isNaN(b) ? b : parseInt(b, 10)
                        }
                    })
                }, length: function (b) {
                    return a.extend((new e.Assert).Length({min: b[0], max: b[1]}), {priority: 32})
                }, mincheck: function (a) {
                    return this.minlength(a)
                }, maxcheck: function (a) {
                    return this.maxlength(a)
                }, check: function (a) {
                    return this.length(a)
                }, min: function (b) {
                    return a.extend((new e.Assert).GreaterThanOrEqual(b), {
                        priority: 30, requirementsTransformer: function () {
                            return "string" != typeof b || isNaN(b) ? b : parseInt(b, 10)
                        }
                    })
                }, max: function (b) {
                    return a.extend((new e.Assert).LessThanOrEqual(b), {
                        priority: 30, requirementsTransformer: function () {
                            return "string" != typeof b || isNaN(b) ? b : parseInt(b, 10)
                        }
                    })
                }, range: function (b) {
                    return a.extend((new e.Assert).Range(b[0], b[1]), {
                        priority: 32, requirementsTransformer: function () {
                            for (var a = 0; a < b.length; a++)b[a] = "string" != typeof b[a] || isNaN(b[a]) ? b[a] : parseInt(b[a], 10);
                            return b
                        }
                    })
                }, equalto: function (b) {
                    return a.extend((new e.Assert).EqualTo(b), {
                        priority: 256, requirementsTransformer: function () {
                            return a(b).length ? a(b).val() : b
                        }
                    })
                }
            }
        };
        var g = function () {
            this.__class__ = "ParsleyUI"
        };
        g.prototype = {
            listen: function () {
                return a.listen("parsley:form:init", this, this.setupForm), a.listen("parsley:field:init", this, this.setupField), a.listen("parsley:field:validated", this, this.reflow), a.listen("parsley:form:validated", this, this.focus), a.listen("parsley:field:reset", this, this.reset), a.listen("parsley:form:destroy", this, this.destroy), a.listen("parsley:field:destroy", this, this.destroy), this
            }, reflow: function (a) {
                if ("undefined" != typeof a._ui && !1 !== a._ui.active) {
                    var b = this._diff(a.validationResult, a._ui.lastValidationResult);
                    a._ui.lastValidationResult = a.validationResult, a._ui.validatedOnce = !0, this.manageStatusClass(a), this.manageErrorsMessages(a, b), this.actualizeTriggers(a), (b.kept.length || b.added.length) && "undefined" == typeof a._ui.failedOnce && this.manageFailingFieldTrigger(a)
                }
            }, getErrorsMessages: function (a) {
                if (!0 === a.validationResult)return [];
                for (var b = [], c = 0; c < a.validationResult.length; c++)b.push(this._getErrorMessage(a, a.validationResult[c].assert));
                return b
            }, manageStatusClass: function (a) {
                !0 === a.validationResult ? this._successClass(a) : a.validationResult.length > 0 ? this._errorClass(a) : this._resetClass(a)
            }, manageErrorsMessages: function (b, c) {
                if ("undefined" == typeof b.options.errorsMessagesDisabled) {
                    if ("undefined" != typeof b.options.errorMessage)return c.added.length || c.kept.length ? (0 === b._ui.$errorsWrapper.find(".parsley-custom-error-message").length && b._ui.$errorsWrapper.append(a(b.options.errorTemplate).addClass("parsley-custom-error-message")), b._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(b.options.errorMessage)) : b._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
                    for (var d = 0; d < c.removed.length; d++)this.removeError(b, c.removed[d].assert.name, !0);
                    for (d = 0; d < c.added.length; d++)this.addError(b, c.added[d].assert.name, void 0, c.added[d].assert, !0);
                    for (d = 0; d < c.kept.length; d++)this.updateError(b, c.kept[d].assert.name, void 0, c.kept[d].assert, !0)
                }
            }, addError: function (b, c, d, e, f) {
                b._ui.$errorsWrapper.addClass("filled").append(a(b.options.errorTemplate).addClass("parsley-" + c).html(d || this._getErrorMessage(b, e))), !0 !== f && this._errorClass(b)
            }, updateError: function (a, b, c, d, e) {
                a._ui.$errorsWrapper.addClass("filled").find(".parsley-" + b).html(c || this._getErrorMessage(a, d)), !0 !== e && this._errorClass(a)
            }, removeError: function (a, b, c) {
                a._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + b).remove(), !0 !== c && this.manageStatusClass(a)
            }, focus: function (a) {
                if (!0 === a.validationResult || "none" === a.options.focus)return a._focusedField = null;
                a._focusedField = null;
                for (var b = 0; b < a.fields.length; b++)if (!0 !== a.fields[b].validationResult && a.fields[b].validationResult.length > 0 && "undefined" == typeof a.fields[b].options.noFocus) {
                    if ("first" === a.options.focus)return a._focusedField = a.fields[b].$element, a._focusedField.focus();
                    a._focusedField = a.fields[b].$element
                }
                return null === a._focusedField ? null : a._focusedField.focus()
            }, _getErrorMessage: function (a, b) {
                var c = b.name + "Message";
                return "undefined" != typeof a.options[c] ? window.ParsleyValidator.formatMessage(a.options[c], b.requirements) : window.ParsleyValidator.getErrorMessage(b)
            }, _diff: function (a, b, c) {
                for (var d = [], e = [], f = 0; f < a.length; f++) {
                    for (var g = !1, h = 0; h < b.length; h++)if (a[f].assert.name === b[h].assert.name) {
                        g = !0;
                        break
                    }
                    g ? e.push(a[f]) : d.push(a[f])
                }
                return {kept: e, added: d, removed: c ? [] : this._diff(b, a, !0).added}
            }, setupForm: function (b) {
                b.$element.on("submit.Parsley", !1, a.proxy(b.onSubmitValidate, b)), !1 !== b.options.uiEnabled && b.$element.attr("novalidate", "")
            }, setupField: function (b) {
                var c = {active: !1};
                !1 !== b.options.uiEnabled && (c.active = !0, b.$element.attr(b.options.namespace + "id", b.__id__), c.$errorClassHandler = this._manageClassHandler(b), c.errorsWrapperId = "parsley-id-" + ("undefined" != typeof b.options.multiple ? "multiple-" + b.options.multiple : b.__id__), c.$errorsWrapper = a(b.options.errorsWrapper).attr("id", c.errorsWrapperId), c.lastValidationResult = [], c.validatedOnce = !1, c.validationInformationVisible = !1, b._ui = c, b.$element.is(b.options.excluded) || this._insertErrorWrapper(b), this.actualizeTriggers(b))
            }, _manageClassHandler: function (b) {
                if ("string" == typeof b.options.classHandler && a(b.options.classHandler).length)return a(b.options.classHandler);
                var c = b.options.classHandler(b);
                return "undefined" != typeof c && c.length ? c : "undefined" == typeof b.options.multiple || b.$element.is("select") ? b.$element : b.$element.parent()
            }, _insertErrorWrapper: function (b) {
                var c;
                if ("string" == typeof b.options.errorsContainer) {
                    if (a(b.options.errorsContainer).length)return a(b.options.errorsContainer).append(b._ui.$errorsWrapper);
                    window.console && window.console.warn && window.console.warn("The errors container `" + b.options.errorsContainer + "` does not exist in DOM")
                } else"function" == typeof b.options.errorsContainer && (c = b.options.errorsContainer(b));
                return "undefined" != typeof c && c.length ? c.append(b._ui.$errorsWrapper) : "undefined" == typeof b.options.multiple ? b.$element.after(b._ui.$errorsWrapper) : b.$element.parent().after(b._ui.$errorsWrapper)
            }, actualizeTriggers: function (b) {
                var c = b.$element;
                if (b.options.multiple && (c = a("[" + b.options.namespace + 'multiple="' + b.options.multiple + '"]')), c.off(".Parsley"), !1 !== b.options.trigger) {
                    var d = b.options.trigger.replace(/^\s+/g, "").replace(/\s+$/g, "");
                    "" !== d && c.on(d.split(" ").join(".Parsley ") + ".Parsley", a.proxy("function" == typeof b.eventValidate ? b.eventValidate : this.eventValidate, b))
                }
            }, eventValidate: function (a) {
                new RegExp("key").test(a.type) && !this._ui.validationInformationVisible && this.getValue().length <= this.options.validationThreshold || (this._ui.validatedOnce = !0, this.validate())
            }, manageFailingFieldTrigger: function (b) {
                return b._ui.failedOnce = !0, b.options.multiple && a("[" + b.options.namespace + 'multiple="' + b.options.multiple + '"]').each(function () {
                    return new RegExp("change", "i").test(a(this).parsley().options.trigger || "") ? void 0 : a(this).on("change.ParsleyFailedOnce", !1, a.proxy(b.validate, b))
                }), b.$element.is("select") && !new RegExp("change", "i").test(b.options.trigger || "") ? b.$element.on("change.ParsleyFailedOnce", !1, a.proxy(b.validate, b)) : new RegExp("keyup", "i").test(b.options.trigger || "") ? void 0 : b.$element.on("keyup.ParsleyFailedOnce", !1, a.proxy(b.validate, b))
            }, reset: function (a) {
                a.$element.off(".Parsley"), a.$element.off(".ParsleyFailedOnce"), "undefined" != typeof a._ui && "ParsleyForm" !== a.__class__ && (a._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(a), a._ui.validatedOnce = !1, a._ui.lastValidationResult = [], a._ui.validationInformationVisible = !1)
            }, destroy: function (a) {
                this.reset(a), "ParsleyForm" !== a.__class__ && ("undefined" != typeof a._ui && a._ui.$errorsWrapper.remove(), delete a._ui)
            }, _successClass: function (a) {
                a._ui.validationInformationVisible = !0, a._ui.$errorClassHandler.removeClass(a.options.errorClass).addClass(a.options.successClass)
            }, _errorClass: function (a) {
                a._ui.validationInformationVisible = !0, a._ui.$errorClassHandler.removeClass(a.options.successClass).addClass(a.options.errorClass)
            }, _resetClass: function (a) {
                a._ui.$errorClassHandler.removeClass(a.options.successClass).removeClass(a.options.errorClass)
            }
        };
        var h = function (c, d, e, f) {
            this.__class__ = "OptionsFactory", this.__id__ = b.hash(4), this.formOptions = null, this.fieldOptions = null, this.staticOptions = a.extend(!0, {}, c, d, e, {namespace: f})
        };
        h.prototype = {
            get: function (a) {
                if ("undefined" == typeof a.__class__)throw new Error("Parsley Instance expected");
                switch (a.__class__) {
                    case"Parsley":
                        return this.staticOptions;
                    case"ParsleyForm":
                        return this.getFormOptions(a);
                    case"ParsleyField":
                    case"ParsleyFieldMultiple":
                        return this.getFieldOptions(a);
                    default:
                        throw new Error("Instance " + a.__class__ + " is not supported")
                }
            }, getFormOptions: function (c) {
                return this.formOptions = b.attr(c.$element, this.staticOptions.namespace), a.extend({}, this.staticOptions, this.formOptions)
            }, getFieldOptions: function (c) {
                return this.fieldOptions = b.attr(c.$element, this.staticOptions.namespace), null === this.formOptions && "undefined" != typeof c.parent && (this.formOptions = this.getFormOptions(c.parent)), a.extend({}, this.staticOptions, this.formOptions, this.fieldOptions)
            }
        };
        var i = function (c, d) {
            if (this.__class__ = "ParsleyForm", this.__id__ = b.hash(4), "OptionsFactory" !== b.get(d, "__class__"))throw new Error("You must give an OptionsFactory instance");
            this.OptionsFactory = d, this.$element = a(c), this.validationResult = null, this.options = this.OptionsFactory.get(this)
        };
        i.prototype = {
            onSubmitValidate: function (b) {
                return this.validate(void 0, void 0, b), !1 === this.validationResult && b instanceof a.Event && (b.stopImmediatePropagation(), b.preventDefault()), this
            }, validate: function (b, c, d) {
                this.submitEvent = d, this.validationResult = !0;
                var e = [];
                a.emit("parsley:form:validate", this), this._refreshFields();
                for (var f = 0; f < this.fields.length; f++)(!b || this._isFieldInGroup(this.fields[f], b)) && (e = this.fields[f].validate(c), !0 !== e && e.length > 0 && this.validationResult && (this.validationResult = !1));
                return a.emit("parsley:form:" + (this.validationResult ? "success" : "error"), this), a.emit("parsley:form:validated", this), this.validationResult
            }, isValid: function (a, b) {
                this._refreshFields();
                for (var c = 0; c < this.fields.length; c++)if ((!a || this._isFieldInGroup(this.fields[c], a)) && !1 === this.fields[c].isValid(b))return !1;
                return !0
            }, _isFieldInGroup: function (c, d) {
                return b.isArray(c.options.group) ? -1 !== a.inArray(d, c.options.group) : c.options.group === d
            }, _refreshFields: function () {
                return this.actualizeOptions()._bindFields()
            }, _bindFields: function () {
                var a = this;
                return this.fields = [], this.fieldsMappedById = {}, this.$element.find(this.options.inputs).each(function () {
                    var b = new window.Parsley(this, {}, a);
                    "ParsleyField" !== b.__class__ && "ParsleyFieldMultiple" !== b.__class__ || b.$element.is(b.options.excluded) || "undefined" == typeof a.fieldsMappedById[b.__class__ + "-" + b.__id__] && (a.fieldsMappedById[b.__class__ + "-" + b.__id__] = b, a.fields.push(b))
                }), this
            }
        };
        var j = function (c, d, e, f, g) {
            var h = {};
            if (!new RegExp("ParsleyField").test(b.get(c, "__class__")))throw new Error("ParsleyField or ParsleyFieldMultiple instance expected");
            if ("function" == typeof window.ParsleyValidator.validators[d] && (h = window.ParsleyValidator.validators[d](e)), "Assert" !== h.__parentClass__)throw new Error("Valid validator expected");
            var i = function () {
                return "undefined" != typeof c.options[d + "Priority"] ? c.options[d + "Priority"] : b.get(h, "priority") || 2
            };
            return f = f || i(), "function" == typeof h.requirementsTransformer && (e = h.requirementsTransformer(), h = window.ParsleyValidator.validators[d](e)), a.extend(h, {
                name: d,
                requirements: e,
                priority: f,
                groups: [f],
                isDomConstraint: g || b.attr(c.$element, c.options.namespace, d)
            })
        }, k = function (c, d, e) {
            this.__class__ = "ParsleyField", this.__id__ = b.hash(4), this.$element = a(c), "undefined" != typeof e ? (this.parent = e, this.OptionsFactory = this.parent.OptionsFactory, this.options = this.OptionsFactory.get(this)) : (this.OptionsFactory = d, this.options = this.OptionsFactory.get(this)), this.constraints = [], this.constraintsByName = {}, this.validationResult = [], this._bindConstraints()
        };
        k.prototype = {
            validate: function (b) {
                return this.value = this.getValue(), a.emit("parsley:field:validate", this), a.emit("parsley:field:" + (this.isValid(b, this.value) ? "success" : "error"), this), a.emit("parsley:field:validated", this), this.validationResult
            }, isValid: function (a, b) {
                this.refreshConstraints();
                var c = this._getConstraintsSortedPriorities();
                if (0 === c.length)return this.validationResult = [];
                if (("undefined" == typeof b || null === b) && (b = this.getValue()), !b.length && !this._isRequired() && "undefined" == typeof this.options.validateIfEmpty && !0 !== a)return this.validationResult = [];
                if (!1 === this.options.priorityEnabled)return !0 === (this.validationResult = this.validateThroughValidator(b, this.constraints, "Any"));
                for (var d = 0; d < c.length; d++)if (!0 !== (this.validationResult = this.validateThroughValidator(b, this.constraints, c[d])))return !1;
                return !0
            }, getValue: function () {
                var a;
                return a = "undefined" != typeof this.options.value ? this.options.value : this.$element.val(), "undefined" == typeof a || null === a ? "" : !0 === this.options.trimValue ? a.replace(/^\s+|\s+$/g, "") : a
            }, refreshConstraints: function () {
                return this.actualizeOptions()._bindConstraints()
            }, addConstraint: function (a, b, c, d) {
                if (a = a.toLowerCase(), "function" == typeof window.ParsleyValidator.validators[a]) {
                    var e = new j(this, a, b, c, d);
                    "undefined" !== this.constraintsByName[e.name] && this.removeConstraint(e.name), this.constraints.push(e), this.constraintsByName[e.name] = e
                }
                return this
            }, removeConstraint: function (a) {
                for (var b = 0; b < this.constraints.length; b++)if (a === this.constraints[b].name) {
                    this.constraints.splice(b, 1);
                    break
                }
                return delete this.constraintsByName[a], this
            }, updateConstraint: function (a, b, c) {
                return this.removeConstraint(a).addConstraint(a, b, c)
            }, _bindConstraints: function () {
                for (var a = [], b = {}, c = 0; c < this.constraints.length; c++)!1 === this.constraints[c].isDomConstraint && (a.push(this.constraints[c]), b[this.constraints[c].name] = this.constraints[c]);
                this.constraints = a, this.constraintsByName = b;
                for (var d in this.options)this.addConstraint(d, this.options[d]);
                return this._bindHtml5Constraints()
            }, _bindHtml5Constraints: function () {
                (this.$element.hasClass("required") || this.$element.attr("required")) && this.addConstraint("required", !0, void 0, !0), "string" == typeof this.$element.attr("pattern") && this.addConstraint("pattern", this.$element.attr("pattern"), void 0, !0), "undefined" != typeof this.$element.attr("min") && "undefined" != typeof this.$element.attr("max") ? this.addConstraint("range", [this.$element.attr("min"), this.$element.attr("max")], void 0, !0) : "undefined" != typeof this.$element.attr("min") ? this.addConstraint("min", this.$element.attr("min"), void 0, !0) : "undefined" != typeof this.$element.attr("max") && this.addConstraint("max", this.$element.attr("max"), void 0, !0), "undefined" != typeof this.$element.attr("minlength") && "undefined" != typeof this.$element.attr("maxlength") ? this.addConstraint("length", [this.$element.attr("minlength"), this.$element.attr("maxlength")], void 0, !0) : "undefined" != typeof this.$element.attr("minlength") ? this.addConstraint("minlength", this.$element.attr("minlength"), void 0, !0) : "undefined" != typeof this.$element.attr("maxlength") && this.addConstraint("maxlength", this.$element.attr("maxlength"), void 0, !0);
                var a = this.$element.attr("type");
                return "undefined" == typeof a ? this : "number" === a ? "undefined" == typeof this.$element.attr("step") || 0 === parseFloat(this.$element.attr("step")) % 1 ? this.addConstraint("type", "integer", void 0, !0) : this.addConstraint("type", "number", void 0, !0) : new RegExp(a, "i").test("email url range") ? this.addConstraint("type", a, void 0, !0) : this
            }, _isRequired: function () {
                return "undefined" == typeof this.constraintsByName.required ? !1 : !1 !== this.constraintsByName.required.requirements
            }, _getConstraintsSortedPriorities: function () {
                for (var a = [], b = 0; b < this.constraints.length; b++)-1 === a.indexOf(this.constraints[b].priority) && a.push(this.constraints[b].priority);
                return a.sort(function (a, b) {
                    return b - a
                }), a
            }
        };
        var l = function () {
            this.__class__ = "ParsleyFieldMultiple"
        };
        l.prototype = {
            addElement: function (a) {
                return this.$elements.push(a), this
            }, refreshConstraints: function () {
                var b;
                if (this.constraints = [], this.$element.is("select"))return this.actualizeOptions()._bindConstraints(), this;
                for (var c = 0; c < this.$elements.length; c++)if (a("html").has(this.$elements[c]).length) {
                    b = this.$elements[c].data("ParsleyFieldMultiple").refreshConstraints().constraints;
                    for (var d = 0; d < b.length; d++)this.addConstraint(b[d].name, b[d].requirements, b[d].priority, b[d].isDomConstraint)
                } else this.$elements.splice(c, 1);
                return this
            }, getValue: function () {
                if ("undefined" != typeof this.options.value)return this.options.value;
                if (this.$element.is("input[type=radio]"))return a("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]:checked').val() || "";
                if (this.$element.is("input[type=checkbox]")) {
                    var b = [];
                    return a("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]:checked').each(function () {
                        b.push(a(this).val())
                    }), b.length ? b : []
                }
                return this.$element.is("select") && null === this.$element.val() ? [] : this.$element.val()
            }, _init: function (a) {
                return this.$elements = [this.$element], this.options.multiple = a, this
            }
        };
        var m = a({}), n = {};
        a.listen = function (a) {
            if ("undefined" == typeof n[a] && (n[a] = []), "function" == typeof arguments[1])return n[a].push({fn: arguments[1]});
            if ("object" == typeof arguments[1] && "function" == typeof arguments[2])return n[a].push({
                fn: arguments[2],
                ctxt: arguments[1]
            });
            throw new Error("Wrong parameters")
        }, a.listenTo = function (a, b, c) {
            if ("undefined" == typeof n[b] && (n[b] = []), !(a instanceof k || a instanceof i))throw new Error("Must give Parsley instance");
            if ("string" != typeof b || "function" != typeof c)throw new Error("Wrong parameters");
            n[b].push({instance: a, fn: c})
        }, a.unsubscribe = function (a, b) {
            if ("undefined" != typeof n[a]) {
                if ("string" != typeof a || "function" != typeof b)throw new Error("Wrong arguments");
                for (var c = 0; c < n[a].length; c++)if (n[a][c].fn === b)return n[a].splice(c, 1)
            }
        }, a.unsubscribeTo = function (a, b) {
            if ("undefined" != typeof n[b]) {
                if (!(a instanceof k || a instanceof i))throw new Error("Must give Parsley instance");
                for (var c = 0; c < n[b].length; c++)if ("undefined" != typeof n[b][c].instance && n[b][c].instance.__id__ === a.__id__)return n[b].splice(c, 1)
            }
        }, a.unsubscribeAll = function (a) {
            "undefined" != typeof n[a] && delete n[a]
        }, a.emit = function (a, b) {
            if ("undefined" != typeof n[a])for (var c = 0; c < n[a].length; c++)if ("undefined" != typeof n[a][c].instance) {
                if (b instanceof k || b instanceof i)if (n[a][c].instance.__id__ !== b.__id__) {
                    if (n[a][c].instance instanceof i && b instanceof k)for (var d = 0; d < n[a][c].instance.fields.length; d++)if (n[a][c].instance.fields[d].__id__ === b.__id__) {
                        n[a][c].fn.apply(m, Array.prototype.slice.call(arguments, 1));
                        continue
                    }
                } else n[a][c].fn.apply(m, Array.prototype.slice.call(arguments, 1))
            } else n[a][c].fn.apply("undefined" != typeof n[a][c].ctxt ? n[a][c].ctxt : m, Array.prototype.slice.call(arguments, 1))
        }, a.subscribed = function () {
            return n
        }, window.ParsleyConfig = window.ParsleyConfig || {}, window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {}, window.ParsleyConfig.i18n.en = a.extend(window.ParsleyConfig.i18n.en || {}, {
            defaultMessage: "This value seems to be invalid.",
            type: {
                email: "This value should be a valid email.",
                url: "This value should be a valid url.",
                number: "This value should be a valid number.",
                integer: "This value should be a valid integer.",
                digits: "This value should be digits.",
                alphanum: "This value should be alphanumeric."
            },
            notblank: "This value should not be blank.",
            required: "This value is required.",
            pattern: "This value seems to be invalid.",
            min: "This value should be greater than or equal to %s.",
            max: "This value should be lower than or equal to %s.",
            range: "This value should be between %s and %s.",
            minlength: "This value is too short. It should have %s characters or more.",
            maxlength: "This value is too long. It should have %s characters or fewer.",
            length: "This value length is invalid. It should be between %s and %s characters long.",
            mincheck: "You must select at least %s choices.",
            maxcheck: "You must select %s choices or fewer.",
            check: "You must select between %s and %s choices.",
            equalto: "This value should be the same."
        }), "undefined" != typeof window.ParsleyValidator && window.ParsleyValidator.addCatalog("en", window.ParsleyConfig.i18n.en, !0);
        var o = function (c, d, e) {
            if (this.__class__ = "Parsley", this.__version__ = "2.0.6", this.__id__ = b.hash(4), "undefined" == typeof c)throw new Error("You must give an element");
            if ("undefined" != typeof e && "ParsleyForm" !== e.__class__)throw new Error("Parent instance must be a ParsleyForm instance");
            return this.init(a(c), d, e)
        };
        o.prototype = {
            init: function (a, d, e) {
                if (!a.length)throw new Error("You must bind Parsley on an existing element.");
                if (this.$element = a, this.$element.data("Parsley")) {
                    var f = this.$element.data("Parsley");
                    return "undefined" != typeof e && (f.parent = e), f
                }
                return this.OptionsFactory = new h(c, b.get(window, "ParsleyConfig") || {}, d, this.getNamespace(d)), this.options = this.OptionsFactory.get(this), this.$element.is("form") || b.attr(this.$element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.$element.is(this.options.inputs) && !this.$element.is(this.options.excluded) ? this.isMultiple() ? this.handleMultiple(e) : this.bind("parsleyField", e) : this
            }, isMultiple: function () {
                return this.$element.is("input[type=radio], input[type=checkbox]") && "undefined" == typeof this.options.multiple || this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple")
            }, handleMultiple: function (c) {
                var d, e, f, g = this;
                if (this.options = a.extend(this.options, c ? c.OptionsFactory.get(c) : {}, b.attr(this.$element, this.options.namespace)), this.options.multiple ? e = this.options.multiple : "undefined" != typeof this.$element.attr("name") && this.$element.attr("name").length ? e = d = this.$element.attr("name") : "undefined" != typeof this.$element.attr("id") && this.$element.attr("id").length && (e = this.$element.attr("id")), this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple"))return this.bind("parsleyFieldMultiple", c, e || this.__id__);
                if ("undefined" == typeof e)return window.console && window.console.warn && window.console.warn("To be binded by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;
                if (e = e.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), "undefined" != typeof d && a('input[name="' + d + '"]').each(function () {
                        a(this).is("input[type=radio], input[type=checkbox]") && a(this).attr(g.options.namespace + "multiple", e)
                    }), a("[" + this.options.namespace + "multiple=" + e + "]").length)for (var h = 0; h < a("[" + this.options.namespace + "multiple=" + e + "]").length; h++)if ("undefined" != typeof a(a("[" + this.options.namespace + "multiple=" + e + "]").get(h)).data("Parsley")) {
                    f = a(a("[" + this.options.namespace + "multiple=" + e + "]").get(h)).data("Parsley"), this.$element.data("ParsleyFieldMultiple") || (f.addElement(this.$element), this.$element.attr(this.options.namespace + "id", f.__id__));
                    break
                }
                return this.bind("parsleyField", c, e, !0), f || this.bind("parsleyFieldMultiple", c, e)
            }, getNamespace: function (a) {
                return "undefined" != typeof this.$element.data("parsleyNamespace") ? this.$element.data("parsleyNamespace") : "undefined" != typeof b.get(a, "namespace") ? a.namespace : "undefined" != typeof b.get(window, "ParsleyConfig.namespace") ? window.ParsleyConfig.namespace : c.namespace
            }, bind: function (c, e, f, g) {
                var h;
                switch (c) {
                    case"parsleyForm":
                        h = a.extend(new i(this.$element, this.OptionsFactory), new d, window.ParsleyExtend)._bindFields();
                        break;
                    case"parsleyField":
                        h = a.extend(new k(this.$element, this.OptionsFactory, e), new d, window.ParsleyExtend);
                        break;
                    case"parsleyFieldMultiple":
                        h = a.extend(new k(this.$element, this.OptionsFactory, e), new d, new l, window.ParsleyExtend)._init(f);
                        break;
                    default:
                        throw new Error(c + "is not a supported Parsley type")
                }
                return "undefined" != typeof f && b.setAttr(this.$element, this.options.namespace, "multiple", f), "undefined" != typeof g ? (this.$element.data("ParsleyFieldMultiple", h), h) : (new RegExp("ParsleyF", "i").test(h.__class__) && (this.$element.data("Parsley", h), a.emit("parsley:" + ("parsleyForm" === c ? "form" : "field") + ":init", h)), h)
            }
        }, a.fn.parsley = a.fn.psly = function (b) {
            if (this.length > 1) {
                var c = [];
                return this.each(function () {
                    c.push(a(this).parsley(b))
                }), c
            }
            return a(this).length ? new o(this, b) : void(window.console && window.console.warn && window.console.warn("You must bind Parsley on an existing element."))
        }, window.ParsleyUI = "function" == typeof b.get(window, "ParsleyConfig.ParsleyUI") ? (new window.ParsleyConfig.ParsleyUI).listen() : (new g).listen(), "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}), "undefined" == typeof window.ParsleyConfig && (window.ParsleyConfig = {}), window.Parsley = window.psly = o, window.ParsleyUtils = b, window.ParsleyValidator = new f(window.ParsleyConfig.validators, window.ParsleyConfig.i18n), !1 !== b.get(window, "ParsleyConfig.autoBind") && a(function () {
            a("[data-parsley-validate]").length && a("[data-parsley-validate]").parsley()
        })
    }), /*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.1-beta.3
 *
 * Copyright 2014 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
    function () {
        "use strict";
        var a = this, b = a.Chart, c = function (a) {
            this.canvas = a.canvas, this.ctx = a;
            this.width = a.canvas.width, this.height = a.canvas.height;
            return this.aspectRatio = this.width / this.height, d.retinaScale(this), this
        };
        c.defaults = {
            global: {
                animation: !0,
                animationSteps: 60,
                animationEasing: "easeOutQuart",
                showScale: !0,
                scaleOverride: !1,
                scaleSteps: null,
                scaleStepWidth: null,
                scaleStartValue: null,
                scaleLineColor: "rgba(0,0,0,.1)",
                scaleLineWidth: 1,
                scaleShowLabels: !0,
                scaleLabel: "<%=value%>",
                scaleIntegersOnly: !0,
                scaleBeginAtZero: !1,
                scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                scaleFontSize: 12,
                scaleFontStyle: "normal",
                scaleFontColor: "#666",
                responsive: !1,
                maintainAspectRatio: !0,
                showTooltips: !0,
                tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
                tooltipFillColor: "rgba(0,0,0,0.8)",
                tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                tooltipFontSize: 14,
                tooltipFontStyle: "normal",
                tooltipFontColor: "#fff",
                tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                tooltipTitleFontSize: 14,
                tooltipTitleFontStyle: "bold",
                tooltipTitleFontColor: "#fff",
                tooltipYPadding: 6,
                tooltipXPadding: 6,
                tooltipCaretSize: 8,
                tooltipCornerRadius: 6,
                tooltipXOffset: 10,
                tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
                multiTooltipTemplate: "<%= value %>",
                multiTooltipKeyBackground: "#fff",
                onAnimationProgress: function () {
                },
                onAnimationComplete: function () {
                }
            }
        }, c.types = {};
        var d = c.helpers = {}, e = d.each = function (a, b, c) {
            var d = Array.prototype.slice.call(arguments, 3);
            if (a)if (a.length === +a.length) {
                var e;
                for (e = 0; e < a.length; e++)b.apply(c, [a[e], e].concat(d))
            } else for (var f in a)b.apply(c, [a[f], f].concat(d))
        }, f = d.clone = function (a) {
            var b = {};
            return e(a, function (c, d) {
                a.hasOwnProperty(d) && (b[d] = c)
            }), b
        }, g = d.extend = function (a) {
            return e(Array.prototype.slice.call(arguments, 1), function (b) {
                e(b, function (c, d) {
                    b.hasOwnProperty(d) && (a[d] = c)
                })
            }), a
        }, h = d.merge = function () {
            var a = Array.prototype.slice.call(arguments, 0);
            return a.unshift({}), g.apply(null, a)
        }, i = d.indexOf = function (a, b) {
            if (Array.prototype.indexOf)return a.indexOf(b);
            for (var c = 0; c < a.length; c++)if (a[c] === b)return c;
            return -1
        }, j = d.inherits = function (a) {
            var b = this, c = a && a.hasOwnProperty("constructor") ? a.constructor : function () {
                return b.apply(this, arguments)
            }, d = function () {
                this.constructor = c
            };
            return d.prototype = b.prototype, c.prototype = new d, c.extend = j, a && g(c.prototype, a), c.__super__ = b.prototype, c
        }, k = d.noop = function () {
        }, l = d.uid = function () {
            var a = 0;
            return function () {
                return "chart-" + a++
            }
        }(), m = d.warn = function (a) {
            window.console && "function" == typeof window.console.warn && console.warn(a)
        }, n = d.amd = "function" == typeof a.define && a.define.amd, o = d.isNumber = function (a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        }, p = d.max = function (a) {
            return Math.max.apply(Math, a)
        }, q = d.min = function (a) {
            return Math.min.apply(Math, a)
        }, r = (d.cap = function (a, b, c) {
            if (o(b)) {
                if (a > b)return b
            } else if (o(c) && c > a)return c;
            return a
        }, d.getDecimalPlaces = function (a) {
            return a % 1 !== 0 && o(a) ? a.toString().split(".")[1].length : 0
        }), s = d.radians = function (a) {
            return a * (Math.PI / 180)
        }, t = (d.getAngleFromPoint = function (a, b) {
            var c = b.x - a.x, d = b.y - a.y, e = Math.sqrt(c * c + d * d), f = 2 * Math.PI + Math.atan2(d, c);
            return 0 > c && 0 > d && (f += 2 * Math.PI), {angle: f, distance: e}
        }, d.aliasPixel = function (a) {
            return a % 2 === 0 ? 0 : .5
        }), u = (d.splineCurve = function (a, b, c, d) {
            var e = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)), f = Math.sqrt(Math.pow(c.x - b.x, 2) + Math.pow(c.y - b.y, 2)), g = d * e / (e + f), h = d * f / (e + f);
            return {
                inner: {x: b.x - g * (c.x - a.x), y: b.y - g * (c.y - a.y)},
                outer: {x: b.x + h * (c.x - a.x), y: b.y + h * (c.y - a.y)}
            }
        }, d.calculateOrderOfMagnitude = function (a) {
            return Math.floor(Math.log(a) / Math.LN10)
        }), v = (d.calculateScaleRange = function (a, b, c, d, e) {
            var f = 2, g = Math.floor(b / (1.5 * c)), h = f >= g, i = p(a), j = q(a);
            i === j && (i += .5, j >= .5 && !d ? j -= .5 : i += .5);
            for (var k = Math.abs(i - j), l = u(k), m = Math.ceil(i / (1 * Math.pow(10, l))) * Math.pow(10, l), n = d ? 0 : Math.floor(j / (1 * Math.pow(10, l))) * Math.pow(10, l), o = m - n, r = Math.pow(10, l), s = Math.round(o / r); (s > g || g > 2 * s) && !h;)if (s > g)r *= 2, s = Math.round(o / r), s % 1 !== 0 && (h = !0); else if (e && l >= 0) {
                if (r / 2 % 1 !== 0)break;
                r /= 2, s = Math.round(o / r)
            } else r /= 2, s = Math.round(o / r);
            return h && (s = f, r = o / s), {steps: s, stepValue: r, min: n, max: n + s * r}
        }, d.template = function (a, b) {
            function c(a, b) {
                var c = /\W/.test(a) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : d[a] = d[a];
                return b ? c(b) : c
            }

            if (a instanceof Function)return a(b);
            var d = {};
            return c(a, b)
        }), w = (d.generateLabels = function (a, b, c, d) {
            var f = new Array(b);
            return labelTemplateString && e(f, function (b, e) {
                f[e] = v(a, {value: c + d * (e + 1)})
            }), f
        }, d.easingEffects = {
            linear: function (a) {
                return a
            }, easeInQuad: function (a) {
                return a * a
            }, easeOutQuad: function (a) {
                return -1 * a * (a - 2)
            }, easeInOutQuad: function (a) {
                return (a /= .5) < 1 ? .5 * a * a : -0.5 * (--a * (a - 2) - 1)
            }, easeInCubic: function (a) {
                return a * a * a
            }, easeOutCubic: function (a) {
                return 1 * ((a = a / 1 - 1) * a * a + 1)
            }, easeInOutCubic: function (a) {
                return (a /= .5) < 1 ? .5 * a * a * a : .5 * ((a -= 2) * a * a + 2)
            }, easeInQuart: function (a) {
                return a * a * a * a
            }, easeOutQuart: function (a) {
                return -1 * ((a = a / 1 - 1) * a * a * a - 1)
            }, easeInOutQuart: function (a) {
                return (a /= .5) < 1 ? .5 * a * a * a * a : -0.5 * ((a -= 2) * a * a * a - 2)
            }, easeInQuint: function (a) {
                return 1 * (a /= 1) * a * a * a * a
            }, easeOutQuint: function (a) {
                return 1 * ((a = a / 1 - 1) * a * a * a * a + 1)
            }, easeInOutQuint: function (a) {
                return (a /= .5) < 1 ? .5 * a * a * a * a * a : .5 * ((a -= 2) * a * a * a * a + 2)
            }, easeInSine: function (a) {
                return -1 * Math.cos(a / 1 * (Math.PI / 2)) + 1
            }, easeOutSine: function (a) {
                return 1 * Math.sin(a / 1 * (Math.PI / 2))
            }, easeInOutSine: function (a) {
                return -0.5 * (Math.cos(Math.PI * a / 1) - 1)
            }, easeInExpo: function (a) {
                return 0 === a ? 1 : 1 * Math.pow(2, 10 * (a / 1 - 1))
            }, easeOutExpo: function (a) {
                return 1 === a ? 1 : 1 * (-Math.pow(2, -10 * a / 1) + 1)
            }, easeInOutExpo: function (a) {
                return 0 === a ? 0 : 1 === a ? 1 : (a /= .5) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (-Math.pow(2, -10 * --a) + 2)
            }, easeInCirc: function (a) {
                return a >= 1 ? a : -1 * (Math.sqrt(1 - (a /= 1) * a) - 1)
            }, easeOutCirc: function (a) {
                return 1 * Math.sqrt(1 - (a = a / 1 - 1) * a)
            }, easeInOutCirc: function (a) {
                return (a /= .5) < 1 ? -0.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
            }, easeInElastic: function (a) {
                var b = 1.70158, c = 0, d = 1;
                return 0 === a ? 0 : 1 == (a /= 1) ? 1 : (c || (c = .3), d < Math.abs(1) ? (d = 1, b = c / 4) : b = c / (2 * Math.PI) * Math.asin(1 / d), -(d * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (1 * a - b) * Math.PI / c)))
            }, easeOutElastic: function (a) {
                var b = 1.70158, c = 0, d = 1;
                return 0 === a ? 0 : 1 == (a /= 1) ? 1 : (c || (c = .3), d < Math.abs(1) ? (d = 1, b = c / 4) : b = c / (2 * Math.PI) * Math.asin(1 / d), d * Math.pow(2, -10 * a) * Math.sin(2 * (1 * a - b) * Math.PI / c) + 1)
            }, easeInOutElastic: function (a) {
                var b = 1.70158, c = 0, d = 1;
                return 0 === a ? 0 : 2 == (a /= .5) ? 1 : (c || (c = .3 * 1.5), d < Math.abs(1) ? (d = 1, b = c / 4) : b = c / (2 * Math.PI) * Math.asin(1 / d), 1 > a ? -.5 * d * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (1 * a - b) * Math.PI / c) : d * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (1 * a - b) * Math.PI / c) * .5 + 1)
            }, easeInBack: function (a) {
                var b = 1.70158;
                return 1 * (a /= 1) * a * ((b + 1) * a - b)
            }, easeOutBack: function (a) {
                var b = 1.70158;
                return 1 * ((a = a / 1 - 1) * a * ((b + 1) * a + b) + 1)
            }, easeInOutBack: function (a) {
                var b = 1.70158;
                return (a /= .5) < 1 ? .5 * a * a * (((b *= 1.525) + 1) * a - b) : .5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2)
            }, easeInBounce: function (a) {
                return 1 - w.easeOutBounce(1 - a)
            }, easeOutBounce: function (a) {
                return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : 2 / 2.75 > a ? 1 * (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 * (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
            }, easeInOutBounce: function (a) {
                return .5 > a ? .5 * w.easeInBounce(2 * a) : .5 * w.easeOutBounce(2 * a - 1) + .5
            }
        }), x = d.requestAnimFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
                    return window.setTimeout(a, 1e3 / 60)
                }
        }(), y = (d.cancelAnimFrame = function () {
            return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (a) {
                    return window.clearTimeout(a, 1e3 / 60)
                }
        }(), d.animationLoop = function (a, b, c, d, e, f) {
            var g = 0, h = w[c] || w.linear, i = function () {
                g++;
                var c = g / b, j = h(c);
                a.call(f, j, c, g), d.call(f, j, c), b > g ? f.animationFrame = x(i) : e.apply(f)
            };
            x(i)
        }, d.getRelativePosition = function (a) {
            var b, c, d = a.originalEvent || a, e = a.currentTarget || a.srcElement, f = e.getBoundingClientRect();
            return d.touches ? (b = d.touches[0].clientX - f.left, c = d.touches[0].clientY - f.top) : (b = d.clientX - f.left, c = d.clientY - f.top), {
                x: b,
                y: c
            }
        }, d.addEvent = function (a, b, c) {
            a.addEventListener ? a.addEventListener(b, c) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
        }), z = d.removeEvent = function (a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = k
        }, A = (d.bindEvents = function (a, b, c) {
            a.events || (a.events = {}), e(b, function (b) {
                a.events[b] = function () {
                    c.apply(a, arguments)
                }, y(a.chart.canvas, b, a.events[b])
            })
        }, d.unbindEvents = function (a, b) {
            e(b, function (b, c) {
                z(a.chart.canvas, c, b)
            })
        }), B = d.getMaximumWidth = function (a) {
            var b = a.parentNode;
            return b.clientWidth
        }, C = d.getMaximumHeight = function (a) {
            var b = a.parentNode;
            return b.clientHeight
        }, D = (d.getMaximumSize = d.getMaximumWidth, d.retinaScale = function (a) {
            var b = a.ctx, c = a.canvas.width, d = a.canvas.height;
            window.devicePixelRatio && (b.canvas.style.width = c + "px", b.canvas.style.height = d + "px", b.canvas.height = d * window.devicePixelRatio, b.canvas.width = c * window.devicePixelRatio, b.scale(window.devicePixelRatio, window.devicePixelRatio))
        }), E = d.clear = function (a) {
            a.ctx.clearRect(0, 0, a.width, a.height)
        }, F = d.fontString = function (a, b, c) {
            return b + " " + a + "px " + c
        }, G = d.longestText = function (a, b, c) {
            a.font = b;
            var d = 0;
            return e(c, function (b) {
                var c = a.measureText(b).width;
                d = c > d ? c : d
            }), d
        }, H = d.drawRoundedRectangle = function (a, b, c, d, e, f) {
            a.beginPath(), a.moveTo(b + f, c), a.lineTo(b + d - f, c), a.quadraticCurveTo(b + d, c, b + d, c + f), a.lineTo(b + d, c + e - f), a.quadraticCurveTo(b + d, c + e, b + d - f, c + e), a.lineTo(b + f, c + e), a.quadraticCurveTo(b, c + e, b, c + e - f), a.lineTo(b, c + f), a.quadraticCurveTo(b, c, b + f, c), a.closePath()
        };
        c.instances = {}, c.Type = function (a, b, d) {
            this.options = b, this.chart = d, this.id = l(), c.instances[this.id] = this, b.responsive && this.resize(), this.initialize.call(this, a)
        }, g(c.Type.prototype, {
            initialize: function () {
                return this
            }, clear: function () {
                return E(this.chart), this
            }, stop: function () {
                return d.cancelAnimFrame.call(a, this.animationFrame), this
            }, resize: function (a) {
                this.stop();
                var b = this.chart.canvas, c = B(this.chart.canvas), d = this.options.maintainAspectRatio ? c / this.chart.aspectRatio : C(this.chart.canvas);
                return b.width = this.chart.width = c, b.height = this.chart.height = d, D(this.chart), "function" == typeof a && a.apply(this, Array.prototype.slice.call(arguments, 1)), this
            }, reflow: k, render: function (a) {
                return a && this.reflow(), this.options.animation && !a ? d.animationLoop(this.draw, this.options.animationSteps, this.options.animationEasing, this.options.onAnimationProgress, this.options.onAnimationComplete, this) : (this.draw(), this.options.onAnimationComplete.call(this)), this
            }, generateLegend: function () {
                return v(this.options.legendTemplate, this)
            }, destroy: function () {
                this.clear(), A(this, this.events), delete c.instances[this.id]
            }, showTooltip: function (a, b) {
                "undefined" == typeof this.activeElements && (this.activeElements = []);
                var f = function (a) {
                    var b = !1;
                    return a.length !== this.activeElements.length ? b = !0 : (e(a, function (a, c) {
                        a !== this.activeElements[c] && (b = !0)
                    }, this), b)
                }.call(this, a);
                if (f || b) {
                    if (this.activeElements = a, this.draw(), a.length > 0)if (this.datasets && this.datasets.length > 1) {
                        for (var g, h, j = this.datasets.length - 1; j >= 0 && (g = this.datasets[j].points || this.datasets[j].bars || this.datasets[j].segments, h = i(g, a[0]), -1 === h); j--);
                        var k = [], l = [], m = function () {
                            var a, b, c, e, f, g = [], i = [], j = [];
                            return d.each(this.datasets, function (b) {
                                a = b.points || b.bars || b.segments, a[h] && g.push(a[h])
                            }), d.each(g, function (a) {
                                i.push(a.x), j.push(a.y), k.push(d.template(this.options.multiTooltipTemplate, a)), l.push({
                                    fill: a._saved.fillColor || a.fillColor,
                                    stroke: a._saved.strokeColor || a.strokeColor
                                })
                            }, this), f = q(j), c = p(j), e = q(i), b = p(i), {
                                x: e > this.chart.width / 2 ? e : b,
                                y: (f + c) / 2
                            }
                        }.call(this, h);
                        new c.MultiTooltip({
                            x: m.x,
                            y: m.y,
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
                            labels: k,
                            legendColors: l,
                            legendColorBackground: this.options.multiTooltipKeyBackground,
                            title: a[0].label,
                            chart: this.chart,
                            ctx: this.chart.ctx
                        }).draw()
                    } else e(a, function (a) {
                        var b = a.tooltipPosition();
                        new c.Tooltip({
                            x: Math.round(b.x),
                            y: Math.round(b.y),
                            xPadding: this.options.tooltipXPadding,
                            yPadding: this.options.tooltipYPadding,
                            fillColor: this.options.tooltipFillColor,
                            textColor: this.options.tooltipFontColor,
                            fontFamily: this.options.tooltipFontFamily,
                            fontStyle: this.options.tooltipFontStyle,
                            fontSize: this.options.tooltipFontSize,
                            caretHeight: this.options.tooltipCaretSize,
                            cornerRadius: this.options.tooltipCornerRadius,
                            text: v(this.options.tooltipTemplate, a),
                            chart: this.chart
                        }).draw()
                    }, this);
                    return this
                }
            }, toBase64Image: function () {
                return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
            }
        }), c.Type.extend = function (a) {
            var b = this, d = function () {
                return b.apply(this, arguments)
            };
            if (d.prototype = f(b.prototype), g(d.prototype, a), d.extend = c.Type.extend, a.name || b.prototype.name) {
                var e = a.name || b.prototype.name, i = c.defaults[b.prototype.name] ? f(c.defaults[b.prototype.name]) : {};
                c.defaults[e] = g(i, a.defaults), c.types[e] = d, c.prototype[e] = function (a, b) {
                    var f = h(c.defaults.global, c.defaults[e], b || {});
                    return new d(a, f, this)
                }
            } else m("Name not provided for this chart, so it hasn't been registered");
            return b
        }, c.Element = function (a) {
            g(this, a), this.initialize.apply(this, arguments), this.save()
        }, g(c.Element.prototype, {
            initialize: function () {
            }, restore: function (a) {
                return a ? e(a, function (a) {
                    this[a] = this._saved[a]
                }, this) : g(this, this._saved), this
            }, save: function () {
                return this._saved = f(this), delete this._saved._saved, this
            }, update: function (a) {
                return e(a, function (a, b) {
                    this._saved[b] = this[b], this[b] = a
                }, this), this
            }, transition: function (a, b) {
                return e(a, function (a, c) {
                    this[c] = (a - this._saved[c]) * b + this._saved[c]
                }, this), this
            }, tooltipPosition: function () {
                return {x: this.x, y: this.y}
            }
        }), c.Element.extend = j, c.Point = c.Element.extend({
            display: !0, inRange: function (a, b) {
                var c = this.hitDetectionRadius + this.radius;
                return Math.pow(a - this.x, 2) + Math.pow(b - this.y, 2) < Math.pow(c, 2)
            }, draw: function () {
                if (this.display) {
                    var a = this.ctx;
                    a.beginPath(), a.arc(this.x, this.y, this.radius, 0, 2 * Math.PI), a.closePath(), a.strokeStyle = this.strokeColor, a.lineWidth = this.strokeWidth, a.fillStyle = this.fillColor, a.fill(), a.stroke()
                }
            }
        }), c.Arc = c.Element.extend({
            inRange: function (a, b) {
                var c = d.getAngleFromPoint(this, {
                    x: a,
                    y: b
                }), e = c.angle >= this.startAngle && c.angle <= this.endAngle, f = c.distance >= this.innerRadius && c.distance <= this.outerRadius;
                return e && f
            }, tooltipPosition: function () {
                var a = this.startAngle + (this.endAngle - this.startAngle) / 2, b = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
                return {x: this.x + Math.cos(a) * b, y: this.y + Math.sin(a) * b}
            }, draw: function (a) {
                var b = this.ctx;
                b.beginPath(), b.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle), b.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, !0), b.closePath(), b.strokeStyle = this.strokeColor, b.lineWidth = this.strokeWidth, b.fillStyle = this.fillColor, b.fill(), b.lineJoin = "bevel", this.showStroke && b.stroke()
            }
        }), c.Rectangle = c.Element.extend({
            draw: function () {
                var a = this.ctx, b = this.width / 2, c = this.x - b, d = this.x + b, e = this.base - (this.base - this.y), f = this.strokeWidth / 2;
                this.showStroke && (c += f, d -= f, e += f), a.beginPath(), a.fillStyle = this.fillColor, a.strokeStyle = this.strokeColor, a.lineWidth = this.strokeWidth, a.moveTo(c, this.base), a.lineTo(c, e), a.lineTo(d, e), a.lineTo(d, this.base), a.fill(), this.showStroke && a.stroke()
            }, height: function () {
                return this.base - this.y
            }, inRange: function (a, b) {
                return a >= this.x - this.width / 2 && a <= this.x + this.width / 2 && b >= this.y && b <= this.base
            }
        }), c.Tooltip = c.Element.extend({
            draw: function () {
                var a = this.chart.ctx;
                a.font = F(this.fontSize, this.fontStyle, this.fontFamily), this.xAlign = "center", this.yAlign = "above";
                var b = 2, c = a.measureText(this.text).width + 2 * this.xPadding, d = this.fontSize + 2 * this.yPadding, e = d + this.caretHeight + b;
                this.x + c / 2 > this.chart.width ? this.xAlign = "left" : this.x - c / 2 < 0 && (this.xAlign = "right"), this.y - e < 0 && (this.yAlign = "below");
                var f = this.x - c / 2, g = this.y - e;
                switch (a.fillStyle = this.fillColor, this.yAlign) {
                    case"above":
                        a.beginPath(), a.moveTo(this.x, this.y - b), a.lineTo(this.x + this.caretHeight, this.y - (b + this.caretHeight)), a.lineTo(this.x - this.caretHeight, this.y - (b + this.caretHeight)), a.closePath(), a.fill();
                        break;
                    case"below":
                        g = this.y + b + this.caretHeight, a.beginPath(), a.moveTo(this.x, this.y + b), a.lineTo(this.x + this.caretHeight, this.y + b + this.caretHeight), a.lineTo(this.x - this.caretHeight, this.y + b + this.caretHeight), a.closePath(), a.fill()
                }
                switch (this.xAlign) {
                    case"left":
                        f = this.x - c + (this.cornerRadius + this.caretHeight);
                        break;
                    case"right":
                        f = this.x - (this.cornerRadius + this.caretHeight)
                }
                H(a, f, g, c, d, this.cornerRadius), a.fill(), a.fillStyle = this.textColor, a.textAlign = "center", a.textBaseline = "middle", a.fillText(this.text, f + c / 2, g + d / 2)
            }
        }), c.MultiTooltip = c.Element.extend({
            initialize: function () {
                this.font = F(this.fontSize, this.fontStyle, this.fontFamily), this.titleFont = F(this.titleFontSize, this.titleFontStyle, this.titleFontFamily), this.height = this.labels.length * this.fontSize + (this.labels.length - 1) * (this.fontSize / 2) + 2 * this.yPadding + 1.5 * this.titleFontSize, this.ctx.font = this.titleFont;
                var a = this.ctx.measureText(this.title).width, b = G(this.ctx, this.font, this.labels) + this.fontSize + 3, c = p([b, a]);
                this.width = c + 2 * this.xPadding;
                var d = this.height / 2;
                this.y - d < 0 ? this.y = d : this.y + d > this.chart.height && (this.y = this.chart.height - d), this.x > this.chart.width / 2 ? this.x -= this.xOffset + this.width : this.x += this.xOffset
            }, getLineHeight: function (a) {
                var b = this.y - this.height / 2 + this.yPadding, c = a - 1;
                return 0 === a ? b + this.titleFontSize / 2 : b + (1.5 * this.fontSize * c + this.fontSize / 2) + 1.5 * this.titleFontSize
            }, draw: function () {
                H(this.ctx, this.x, this.y - this.height / 2, this.width, this.height, this.cornerRadius);
                var a = this.ctx;
                a.fillStyle = this.fillColor, a.fill(), a.closePath(), a.textAlign = "left", a.textBaseline = "middle", a.fillStyle = this.titleTextColor, a.font = this.titleFont, a.fillText(this.title, this.x + this.xPadding, this.getLineHeight(0)), a.font = this.font, d.each(this.labels, function (b, c) {
                    a.fillStyle = this.textColor, a.fillText(b, this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(c + 1)), a.fillStyle = this.legendColorBackground, a.fillRect(this.x + this.xPadding, this.getLineHeight(c + 1) - this.fontSize / 2, this.fontSize, this.fontSize), a.fillStyle = this.legendColors[c].fill, a.fillRect(this.x + this.xPadding, this.getLineHeight(c + 1) - this.fontSize / 2, this.fontSize, this.fontSize)
                }, this)
            }
        }), c.Scale = c.Element.extend({
            initialize: function () {
                this.fit()
            }, buildYLabels: function () {
                this.yLabels = [];
                for (var a = r(this.stepValue), b = 0; b <= this.steps; b++)this.yLabels.push(v(this.templateString, {value: (this.min + b * this.stepValue).toFixed(a)}));
                this.yLabelWidth = this.display && this.showLabels ? G(this.ctx, this.font, this.yLabels) : 0
            }, addXLabel: function (a) {
                this.xLabels.push(a), this.valuesCount++, this.fit()
            }, removeXLabel: function () {
                this.xLabels.shift(), this.valuesCount--, this.fit()
            }, fit: function () {
                this.startPoint = this.display ? this.fontSize : 0, this.endPoint = this.display ? this.height - 1.5 * this.fontSize - 5 : this.height, this.startPoint += this.padding, this.endPoint -= this.padding;
                var a, b = this.endPoint - this.startPoint;
                for (this.calculateYRange(b), this.buildYLabels(), this.calculateXLabelRotation(); b > this.endPoint - this.startPoint;)b = this.endPoint - this.startPoint, a = this.yLabelWidth, this.calculateYRange(b), this.buildYLabels(), a < this.yLabelWidth && this.calculateXLabelRotation()
            }, calculateXLabelRotation: function () {
                this.ctx.font = this.font;
                var a, b, c = this.ctx.measureText(this.xLabels[0]).width, d = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width;
                if (this.xScalePaddingRight = d / 2 + 3, this.xScalePaddingLeft = c / 2 > this.yLabelWidth + 10 ? c / 2 : this.yLabelWidth + 10, this.xLabelRotation = 0, this.display) {
                    var e, f = G(this.ctx, this.font, this.xLabels);
                    this.xLabelWidth = f;
                    for (var g = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6; this.xLabelWidth > g && 0 === this.xLabelRotation || this.xLabelWidth > g && this.xLabelRotation <= 90 && this.xLabelRotation > 0;)e = Math.cos(s(this.xLabelRotation)), a = e * c, b = e * d, a + this.fontSize / 2 > this.yLabelWidth + 8 && (this.xScalePaddingLeft = a + this.fontSize / 2), this.xScalePaddingRight = this.fontSize / 2, this.xLabelRotation++, this.xLabelWidth = e * f;
                    this.xLabelRotation > 0 && (this.endPoint -= Math.sin(s(this.xLabelRotation)) * f + 3)
                } else this.xLabelWidth = 0, this.xScalePaddingRight = this.padding, this.xScalePaddingLeft = this.padding
            }, calculateYRange: k, drawingArea: function () {
                return this.startPoint - this.endPoint
            }, calculateY: function (a) {
                var b = this.drawingArea() / (this.min - this.max);
                return this.endPoint - b * (a - this.min)
            }, calculateX: function (a) {
                var b = (this.xLabelRotation > 0, this.width - (this.xScalePaddingLeft + this.xScalePaddingRight)), c = b / (this.valuesCount - (this.offsetGridLines ? 0 : 1)), d = c * a + this.xScalePaddingLeft;
                return this.offsetGridLines && (d += c / 2), Math.round(d)
            }, update: function (a) {
                d.extend(this, a), this.fit()
            }, draw: function () {
                var a = this.ctx, b = (this.endPoint - this.startPoint) / this.steps, c = Math.round(this.xScalePaddingLeft);
                this.display && (a.fillStyle = this.textColor, a.font = this.font, e(this.yLabels, function (e, f) {
                    var g = this.endPoint - b * f, h = Math.round(g);
                    a.textAlign = "right", a.textBaseline = "middle", this.showLabels && a.fillText(e, c - 10, g), a.beginPath(), f > 0 ? (a.lineWidth = this.gridLineWidth, a.strokeStyle = this.gridLineColor) : (a.lineWidth = this.lineWidth, a.strokeStyle = this.lineColor), h += d.aliasPixel(a.lineWidth), a.moveTo(c, h), a.lineTo(this.width, h), a.stroke(), a.closePath(), a.lineWidth = this.lineWidth, a.strokeStyle = this.lineColor, a.beginPath(), a.moveTo(c - 5, h), a.lineTo(c, h), a.stroke(), a.closePath()
                }, this), e(this.xLabels, function (b, c) {
                    var d = this.calculateX(c) + t(this.lineWidth), e = this.calculateX(c - (this.offsetGridLines ? .5 : 0)) + t(this.lineWidth), f = this.xLabelRotation > 0;
                    a.beginPath(), c > 0 ? (a.lineWidth = this.gridLineWidth, a.strokeStyle = this.gridLineColor) : (a.lineWidth = this.lineWidth, a.strokeStyle = this.lineColor), a.moveTo(e, this.endPoint), a.lineTo(e, this.startPoint - 3), a.stroke(), a.closePath(), a.lineWidth = this.lineWidth, a.strokeStyle = this.lineColor, a.beginPath(), a.moveTo(e, this.endPoint), a.lineTo(e, this.endPoint + 5), a.stroke(), a.closePath(), a.save(), a.translate(d, f ? this.endPoint + 12 : this.endPoint + 8), a.rotate(-1 * s(this.xLabelRotation)), a.font = this.font, a.textAlign = f ? "right" : "center", a.textBaseline = f ? "middle" : "top", a.fillText(b, 0, 0), a.restore()
                }, this))
            }
        }), c.RadialScale = c.Element.extend({
            initialize: function () {
                this.size = q([this.height, this.width]), this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2
            }, calculateCenterOffset: function (a) {
                var b = this.drawingArea / (this.max - this.min);
                return (a - this.min) * b
            }, update: function () {
                this.lineArc ? this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2 : this.setScaleSize(), this.buildYLabels()
            }, buildYLabels: function () {
                this.yLabels = [];
                for (var a = r(this.stepValue), b = 0; b <= this.steps; b++)this.yLabels.push(v(this.templateString, {value: (this.min + b * this.stepValue).toFixed(a)}))
            }, getCircumference: function () {
                return 2 * Math.PI / this.valuesCount
            }, setScaleSize: function () {
                var a, b, c, d, e, f, g, h, i, j, k, l, m = q([this.height / 2 - this.pointLabelFontSize - 5, this.width / 2]), n = this.width, p = 0;
                for (this.ctx.font = F(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), b = 0; b < this.valuesCount; b++)a = this.getPointPosition(b, m), c = this.ctx.measureText(v(this.templateString, {value: this.labels[b]})).width + 5, 0 === b || b === this.valuesCount / 2 ? (d = c / 2, a.x + d > n && (n = a.x + d, e = b), a.x - d < p && (p = a.x - d, g = b)) : b < this.valuesCount / 2 ? a.x + c > n && (n = a.x + c, e = b) : b > this.valuesCount / 2 && a.x - c < p && (p = a.x - c, g = b);
                i = p, j = Math.ceil(n - this.width), f = this.getIndexAngle(e), h = this.getIndexAngle(g), k = j / Math.sin(f + Math.PI / 2), l = i / Math.sin(h + Math.PI / 2), k = o(k) ? k : 0, l = o(l) ? l : 0, this.drawingArea = m - (l + k) / 2, this.setCenterPoint(l, k)
            }, setCenterPoint: function (a, b) {
                var c = this.width - b - this.drawingArea, d = a + this.drawingArea;
                this.xCenter = (d + c) / 2, this.yCenter = this.height / 2
            }, getIndexAngle: function (a) {
                var b = 2 * Math.PI / this.valuesCount;
                return a * b - Math.PI / 2
            }, getPointPosition: function (a, b) {
                var c = this.getIndexAngle(a);
                return {x: Math.cos(c) * b + this.xCenter, y: Math.sin(c) * b + this.yCenter}
            }, draw: function () {
                if (this.display) {
                    var a = this.ctx;
                    if (e(this.yLabels, function (b, c) {
                            if (c > 0) {
                                var d, e = c * (this.drawingArea / this.steps), f = this.yCenter - e;
                                if (this.lineWidth > 0)if (a.strokeStyle = this.lineColor, a.lineWidth = this.lineWidth, this.lineArc)a.beginPath(), a.arc(this.xCenter, this.yCenter, e, 0, 2 * Math.PI), a.closePath(), a.stroke(); else {
                                    a.beginPath();
                                    for (var g = 0; g < this.valuesCount; g++)d = this.getPointPosition(g, this.calculateCenterOffset(this.min + c * this.stepValue)), 0 === g ? a.moveTo(d.x, d.y) : a.lineTo(d.x, d.y);
                                    a.closePath(), a.stroke()
                                }
                                if (this.showLabels) {
                                    if (a.font = F(this.fontSize, this.fontStyle, this.fontFamily), this.showLabelBackdrop) {
                                        var h = a.measureText(b).width;
                                        a.fillStyle = this.backdropColor, a.fillRect(this.xCenter - h / 2 - this.backdropPaddingX, f - this.fontSize / 2 - this.backdropPaddingY, h + 2 * this.backdropPaddingX, this.fontSize + 2 * this.backdropPaddingY)
                                    }
                                    a.textAlign = "center", a.textBaseline = "middle", a.fillStyle = this.fontColor, a.fillText(b, this.xCenter, f)
                                }
                            }
                        }, this), !this.lineArc) {
                        a.lineWidth = this.angleLineWidth, a.strokeStyle = this.angleLineColor;
                        for (var b = this.valuesCount - 1; b >= 0; b--) {
                            if (this.angleLineWidth > 0) {
                                var c = this.getPointPosition(b, this.calculateCenterOffset(this.max));
                                a.beginPath(), a.moveTo(this.xCenter, this.yCenter), a.lineTo(c.x, c.y), a.stroke(), a.closePath()
                            }
                            var d = this.getPointPosition(b, this.calculateCenterOffset(this.max) + 5);
                            a.font = F(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), a.fillStyle = this.pointLabelFontColor;
                            var f = this.labels.length, g = this.labels.length / 2, h = g / 2, i = h > b || b > f - h, j = b === h || b === f - h;
                            a.textAlign = 0 === b ? "center" : b === g ? "center" : g > b ? "left" : "right", a.textBaseline = j ? "middle" : i ? "bottom" : "top", a.fillText(this.labels[b], d.x, d.y)
                        }
                    }
                }
            }
        }), d.addEvent(window, "resize", function () {
            var a;
            return function () {
                clearTimeout(a), a = setTimeout(function () {
                    e(c.instances, function (a) {
                        a.options.responsive && a.resize(a.render, !0)
                    })
                }, 50)
            }
        }()), n ? define(function () {
            return c
        }) : "object" == typeof module && module.exports && (module.exports = c), a.Chart = c, c.noConflict = function () {
            return a.Chart = b, c
        }
    }.call(this), function () {
    "use strict";
    var a = this, b = a.Chart, c = b.helpers, d = {
        scaleBeginAtZero: !0,
        scaleShowGridLines: !0,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        barShowStroke: !0,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
    b.Type.extend({
        name: "Bar", defaults: d, initialize: function (a) {
            var d = this.options;
            this.ScaleClass = b.Scale.extend({
                offsetGridLines: !0, calculateBarX: function (a, b, c) {
                    var e = this.calculateBaseWidth(), f = this.calculateX(c) - e / 2, g = this.calculateBarWidth(a);
                    return f + g * b + b * d.barDatasetSpacing + g / 2
                }, calculateBaseWidth: function () {
                    return this.calculateX(1) - this.calculateX(0) - 2 * d.barValueSpacing
                }, calculateBarWidth: function (a) {
                    var b = this.calculateBaseWidth() - (a - 1) * d.barDatasetSpacing;
                    return b / a
                }
            }), this.datasets = [], this.options.showTooltips && c.bindEvents(this, this.options.tooltipEvents, function (a) {
                var b = "mouseout" !== a.type ? this.getBarsAtEvent(a) : [];
                this.eachBars(function (a) {
                    a.restore(["fillColor", "strokeColor"])
                }), c.each(b, function (a) {
                    a.fillColor = a.highlightFill, a.strokeColor = a.highlightStroke
                }), this.showTooltip(b)
            }), this.BarClass = b.Rectangle.extend({
                strokeWidth: this.options.barStrokeWidth,
                showStroke: this.options.barShowStroke,
                ctx: this.chart.ctx
            }), c.each(a.datasets, function (b) {
                var d = {label: b.label || null, fillColor: b.fillColor, strokeColor: b.strokeColor, bars: []};
                this.datasets.push(d), c.each(b.data, function (e, f) {
                    c.isNumber(e) && d.bars.push(new this.BarClass({
                        value: e,
                        label: a.labels[f],
                        datasetLabel: b.label,
                        strokeColor: b.strokeColor,
                        fillColor: b.fillColor,
                        highlightFill: b.highlightFill || b.fillColor,
                        highlightStroke: b.highlightStroke || b.strokeColor
                    }))
                }, this)
            }, this), this.buildScale(a.labels), this.BarClass.prototype.base = this.scale.endPoint, this.eachBars(function (a, b, d) {
                c.extend(a, {
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    x: this.scale.calculateBarX(this.datasets.length, d, b),
                    y: this.scale.endPoint
                }), a.save()
            }, this), this.render()
        }, update: function () {
            this.scale.update(), c.each(this.activeElements, function (a) {
                a.restore(["fillColor", "strokeColor"])
            }), this.eachBars(function (a) {
                a.save()
            }), this.render()
        }, eachBars: function (a) {
            c.each(this.datasets, function (b, d) {
                c.each(b.bars, a, this, d)
            }, this)
        }, getBarsAtEvent: function (a) {
            for (var b, d = [], e = c.getRelativePosition(a), f = function (a) {
                d.push(a.bars[b])
            }, g = 0; g < this.datasets.length; g++)for (b = 0; b < this.datasets[g].bars.length; b++)if (this.datasets[g].bars[b].inRange(e.x, e.y))return c.each(this.datasets, f), d;
            return d
        }, buildScale: function (a) {
            var b = this, d = function () {
                var a = [];
                return b.eachBars(function (b) {
                    a.push(b.value)
                }), a
            }, e = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: a.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function (a) {
                    var b = c.calculateScaleRange(d(), a, this.fontSize, this.beginAtZero, this.integersOnly);
                    c.extend(this, b)
                },
                xLabels: a,
                font: c.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                padding: this.options.showScale ? 0 : this.options.barShowStroke ? this.options.barStrokeWidth : 0,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            this.options.scaleOverride && c.extend(e, {
                calculateYRange: c.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }), this.scale = new this.ScaleClass(e)
        }, addData: function (a, b) {
            c.each(a, function (a, d) {
                c.isNumber(a) && this.datasets[d].bars.push(new this.BarClass({
                    value: a,
                    label: b,
                    x: this.scale.calculateBarX(this.datasets.length, d, this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    base: this.scale.endPoint,
                    strokeColor: this.datasets[d].strokeColor,
                    fillColor: this.datasets[d].fillColor
                }))
            }, this), this.scale.addXLabel(b), this.update()
        }, removeData: function () {
            this.scale.removeXLabel(), c.each(this.datasets, function (a) {
                a.bars.shift()
            }, this), this.update()
        }, reflow: function () {
            c.extend(this.BarClass.prototype, {y: this.scale.endPoint, base: this.scale.endPoint});
            var a = c.extend({height: this.chart.height, width: this.chart.width});
            this.scale.update(a)
        }, draw: function (a) {
            var b = a || 1;
            this.clear();
            this.chart.ctx;
            this.scale.draw(b), c.each(this.datasets, function (a, d) {
                c.each(a.bars, function (a, c) {
                    a.base = this.scale.endPoint, a.transition({
                        x: this.scale.calculateBarX(this.datasets.length, d, c),
                        y: this.scale.calculateY(a.value),
                        width: this.scale.calculateBarWidth(this.datasets.length)
                    }, b).draw()
                }, this)
            }, this)
        }
    })
}.call(this), function () {
    "use strict";
    var a = this, b = a.Chart, c = b.helpers, d = {
        segmentShowStroke: !0,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 50,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: !0,
        animateScale: !1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };
    b.Type.extend({
        name: "Doughnut", defaults: d, initialize: function (a) {
            this.segments = [], this.outerRadius = (c.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, this.SegmentArc = b.Arc.extend({
                ctx: this.chart.ctx,
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.options.showTooltips && c.bindEvents(this, this.options.tooltipEvents, function (a) {
                var b = "mouseout" !== a.type ? this.getSegmentsAtEvent(a) : [];
                c.each(this.segments, function (a) {
                    a.restore(["fillColor"])
                }), c.each(b, function (a) {
                    a.fillColor = a.highlightColor
                }), this.showTooltip(b)
            }), this.calculateTotal(a), c.each(a, function (a, b) {
                this.addData(a, b, !0)
            }, this), this.render()
        }, getSegmentsAtEvent: function (a) {
            var b = [], d = c.getRelativePosition(a);
            return c.each(this.segments, function (a) {
                a.inRange(d.x, d.y) && b.push(a)
            }, this), b
        }, addData: function (a, b, c) {
            var d = b || this.segments.length;
            this.segments.splice(d, 0, new this.SegmentArc({
                value: a.value,
                outerRadius: this.options.animateScale ? 0 : this.outerRadius,
                innerRadius: this.options.animateScale ? 0 : this.outerRadius / 100 * this.options.percentageInnerCutout,
                fillColor: a.color,
                highlightColor: a.highlight || a.color,
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                startAngle: 1.5 * Math.PI,
                circumference: this.options.animateRotate ? 0 : this.calculateCircumference(a.value),
                label: a.label
            })), c || (this.reflow(), this.update())
        }, calculateCircumference: function (a) {
            return 2 * Math.PI * (a / this.total)
        }, calculateTotal: function (a) {
            this.total = 0, c.each(a, function (a) {
                this.total += a.value
            }, this)
        }, update: function () {
            this.calculateTotal(this.segments), c.each(this.activeElements, function (a) {
                a.restore(["fillColor"])
            }), c.each(this.segments, function (a) {
                a.save()
            }), this.render()
        }, removeData: function (a) {
            var b = c.isNumber(a) ? a : this.segments.length - 1;
            this.segments.splice(b, 1), this.reflow(), this.update()
        }, reflow: function () {
            c.extend(this.SegmentArc.prototype, {
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.outerRadius = (c.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, c.each(this.segments, function (a) {
                a.update({
                    outerRadius: this.outerRadius,
                    innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                })
            }, this)
        }, draw: function (a) {
            var b = a ? a : 1;
            this.clear(), c.each(this.segments, function (a, c) {
                a.transition({
                    circumference: this.calculateCircumference(a.value),
                    outerRadius: this.outerRadius,
                    innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                }, b), a.endAngle = a.startAngle + a.circumference, a.draw(), 0 === c && (a.startAngle = 1.5 * Math.PI), c < this.segments.length - 1 && (this.segments[c + 1].startAngle = a.endAngle)
            }, this)
        }
    }), b.types.Doughnut.extend({name: "Pie", defaults: c.merge(d, {percentageInnerCutout: 0})})
}.call(this), function () {
    "use strict";
    var a = this, b = a.Chart, c = b.helpers, d = {
        scaleShowGridLines: !0,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        bezierCurve: !0,
        bezierCurveTension: .4,
        pointDot: !0,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: !0,
        datasetStrokeWidth: 2,
        datasetFill: !0,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
    b.Type.extend({
        name: "Line", defaults: d, initialize: function (a) {
            this.PointClass = b.Point.extend({
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx,
                inRange: function (a) {
                    return Math.pow(a - this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2)
                }
            }), this.datasets = [], this.options.showTooltips && c.bindEvents(this, this.options.tooltipEvents, function (a) {
                var b = "mouseout" !== a.type ? this.getPointsAtEvent(a) : [];
                this.eachPoints(function (a) {
                    a.restore(["fillColor", "strokeColor"])
                }), c.each(b, function (a) {
                    a.fillColor = a.highlightFill, a.strokeColor = a.highlightStroke
                }), this.showTooltip(b)
            }), c.each(a.datasets, function (b) {
                var d = {
                    label: b.label || null,
                    fillColor: b.fillColor,
                    strokeColor: b.strokeColor,
                    pointColor: b.pointColor,
                    pointStrokeColor: b.pointStrokeColor,
                    points: []
                };
                this.datasets.push(d), c.each(b.data, function (e, f) {
                    c.isNumber(e) && d.points.push(new this.PointClass({
                        value: e,
                        label: a.labels[f],
                        datasetLabel: b.label,
                        strokeColor: b.pointStrokeColor,
                        fillColor: b.pointColor,
                        highlightFill: b.pointHighlightFill || b.pointColor,
                        highlightStroke: b.pointHighlightStroke || b.pointStrokeColor
                    }))
                }, this), this.buildScale(a.labels), this.eachPoints(function (a, b) {
                    c.extend(a, {x: this.scale.calculateX(b), y: this.scale.endPoint}), a.save()
                }, this)
            }, this), this.render()
        }, update: function () {
            this.scale.update(), c.each(this.activeElements, function (a) {
                a.restore(["fillColor", "strokeColor"])
            }), this.eachPoints(function (a) {
                a.save()
            }), this.render()
        }, eachPoints: function (a) {
            c.each(this.datasets, function (b) {
                c.each(b.points, a, this)
            }, this)
        }, getPointsAtEvent: function (a) {
            var b = [], d = c.getRelativePosition(a);
            return c.each(this.datasets, function (a) {
                c.each(a.points, function (a) {
                    a.inRange(d.x, d.y) && b.push(a)
                })
            }, this), b
        }, buildScale: function (a) {
            var d = this, e = function () {
                var a = [];
                return d.eachPoints(function (b) {
                    a.push(b.value)
                }), a
            }, f = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: a.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function (a) {
                    var b = c.calculateScaleRange(e(), a, this.fontSize, this.beginAtZero, this.integersOnly);
                    c.extend(this, b)
                },
                xLabels: a,
                font: c.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                padding: this.options.showScale ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            this.options.scaleOverride && c.extend(f, {
                calculateYRange: c.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }), this.scale = new b.Scale(f)
        }, addData: function (a, b) {
            c.each(a, function (a, d) {
                c.isNumber(a) && this.datasets[d].points.push(new this.PointClass({
                    value: a,
                    label: b,
                    x: this.scale.calculateX(this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    strokeColor: this.datasets[d].pointStrokeColor,
                    fillColor: this.datasets[d].pointColor
                }))
            }, this), this.scale.addXLabel(b), this.update()
        }, removeData: function () {
            this.scale.removeXLabel(), c.each(this.datasets, function (a) {
                a.points.shift()
            }, this), this.update()
        }, reflow: function () {
            var a = c.extend({height: this.chart.height, width: this.chart.width});
            this.scale.update(a)
        }, draw: function (a) {
            var b = a || 1;
            this.clear();
            var d = this.chart.ctx;
            this.scale.draw(b), c.each(this.datasets, function (a) {
                c.each(a.points, function (a, c) {
                    a.transition({y: this.scale.calculateY(a.value), x: this.scale.calculateX(c)}, b)
                }, this), this.options.bezierCurve && c.each(a.points, function (b, d) {
                    b.controlPoints = 0 === d ? c.splineCurve(b, b, a.points[d + 1], 0) : d >= a.points.length - 1 ? c.splineCurve(a.points[d - 1], b, b, 0) : c.splineCurve(a.points[d - 1], b, a.points[d + 1], this.options.bezierCurveTension)
                }, this), d.lineWidth = this.options.datasetStrokeWidth, d.strokeStyle = a.strokeColor, d.beginPath(), c.each(a.points, function (b, c) {
                    c > 0 ? this.options.bezierCurve ? d.bezierCurveTo(a.points[c - 1].controlPoints.outer.x, a.points[c - 1].controlPoints.outer.y, b.controlPoints.inner.x, b.controlPoints.inner.y, b.x, b.y) : d.lineTo(b.x, b.y) : d.moveTo(b.x, b.y)
                }, this), d.stroke(), this.options.datasetFill && (d.lineTo(a.points[a.points.length - 1].x, this.scale.endPoint), d.lineTo(this.scale.calculateX(0), this.scale.endPoint), d.fillStyle = a.fillColor, d.closePath(), d.fill()), c.each(a.points, function (a) {
                    a.draw()
                })
            }, this)
        }
    })
}.call(this), function () {
    "use strict";
    var a = this, b = a.Chart, c = b.helpers, d = {
        scaleShowLabelBackdrop: !0,
        scaleBackdropColor: "rgba(255,255,255,0.75)",
        scaleBeginAtZero: !0,
        scaleBackdropPaddingY: 2,
        scaleBackdropPaddingX: 2,
        scaleShowLine: !0,
        segmentShowStroke: !0,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: !0,
        animateScale: !1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };
    b.Type.extend({
        name: "PolarArea", defaults: d, initialize: function (a) {
            this.segments = [], this.SegmentArc = b.Arc.extend({
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                ctx: this.chart.ctx,
                innerRadius: 0,
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.scale = new b.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth : 0,
                lineColor: this.options.scaleLineColor,
                lineArc: !0,
                width: this.chart.width,
                height: this.chart.height,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                valuesCount: a.length
            }), this.updateScaleRange(a), this.scale.update(), c.each(a, function (a, b) {
                this.addData(a, b, !0)
            }, this), this.options.showTooltips && c.bindEvents(this, this.options.tooltipEvents, function (a) {
                var b = "mouseout" !== a.type ? this.getSegmentsAtEvent(a) : [];
                c.each(this.segments, function (a) {
                    a.restore(["fillColor"])
                }), c.each(b, function (a) {
                    a.fillColor = a.highlightColor
                }), this.showTooltip(b)
            }), this.render()
        }, getSegmentsAtEvent: function (a) {
            var b = [], d = c.getRelativePosition(a);
            return c.each(this.segments, function (a) {
                a.inRange(d.x, d.y) && b.push(a)
            }, this), b
        }, addData: function (a, b, c) {
            var d = b || this.segments.length;
            this.segments.splice(d, 0, new this.SegmentArc({
                fillColor: a.color,
                highlightColor: a.highlight || a.color,
                label: a.label,
                value: a.value,
                outerRadius: this.options.animateScale ? 0 : this.scale.calculateCenterOffset(a.value),
                circumference: this.options.animateRotate ? 0 : this.scale.getCircumference(),
                startAngle: 1.5 * Math.PI
            })), c || (this.reflow(), this.update())
        }, removeData: function (a) {
            var b = c.isNumber(a) ? a : this.segments.length - 1;
            this.segments.splice(b, 1), this.reflow(), this.update()
        }, calculateTotal: function (a) {
            this.total = 0, c.each(a, function (a) {
                this.total += a.value
            }, this), this.scale.valuesCount = this.segments.length
        }, updateScaleRange: function (a) {
            var b = [];
            c.each(a, function (a) {
                b.push(a.value)
            });
            var d = this.options.scaleOverride ? {
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            } : c.calculateScaleRange(b, c.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            c.extend(this.scale, d, {
                size: c.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            })
        }, update: function () {
            this.calculateTotal(this.segments), c.each(this.segments, function (a) {
                a.save()
            }), this.render()
        }, reflow: function () {
            c.extend(this.SegmentArc.prototype, {
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.updateScaleRange(this.segments), this.scale.update(), c.extend(this.scale, {
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            }), c.each(this.segments, function (a) {
                a.update({outerRadius: this.scale.calculateCenterOffset(a.value)})
            }, this)
        }, draw: function (a) {
            var b = a || 1;
            this.clear(), c.each(this.segments, function (a, c) {
                a.transition({
                    circumference: this.scale.getCircumference(),
                    outerRadius: this.scale.calculateCenterOffset(a.value)
                }, b), a.endAngle = a.startAngle + a.circumference, 0 === c && (a.startAngle = 1.5 * Math.PI), c < this.segments.length - 1 && (this.segments[c + 1].startAngle = a.endAngle), a.draw()
            }, this), this.scale.draw()
        }
    })
}.call(this), function () {
    "use strict";
    var a = this, b = a.Chart, c = b.helpers;
    b.Type.extend({
        name: "Radar",
        defaults: {
            scaleShowLine: !0,
            angleShowLineOut: !0,
            scaleShowLabels: !1,
            scaleBeginAtZero: !0,
            angleLineColor: "rgba(0,0,0,.1)",
            angleLineWidth: 1,
            pointLabelFontFamily: "'Arial'",
            pointLabelFontStyle: "normal",
            pointLabelFontSize: 10,
            pointLabelFontColor: "#666",
            pointDot: !0,
            pointDotRadius: 3,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: !0,
            datasetStrokeWidth: 2,
            datasetFill: !0,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        },
        initialize: function (a) {
            this.PointClass = b.Point.extend({
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx
            }), this.datasets = [], this.buildScale(a), this.options.showTooltips && c.bindEvents(this, this.options.tooltipEvents, function (a) {
                var b = "mouseout" !== a.type ? this.getPointsAtEvent(a) : [];
                this.eachPoints(function (a) {
                    a.restore(["fillColor", "strokeColor"])
                }), c.each(b, function (a) {
                    a.fillColor = a.highlightFill, a.strokeColor = a.highlightStroke
                }), this.showTooltip(b)
            }), c.each(a.datasets, function (b) {
                var d = {
                    label: b.label || null,
                    fillColor: b.fillColor,
                    strokeColor: b.strokeColor,
                    pointColor: b.pointColor,
                    pointStrokeColor: b.pointStrokeColor,
                    points: []
                };
                this.datasets.push(d), c.each(b.data, function (e, f) {
                    if (c.isNumber(e)) {
                        var g;
                        this.scale.animation || (g = this.scale.getPointPosition(f, this.scale.calculateCenterOffset(e))), d.points.push(new this.PointClass({
                            value: e,
                            label: a.labels[f],
                            datasetLabel: b.label,
                            x: this.options.animation ? this.scale.xCenter : g.x,
                            y: this.options.animation ? this.scale.yCenter : g.y,
                            strokeColor: b.pointStrokeColor,
                            fillColor: b.pointColor,
                            highlightFill: b.pointHighlightFill || b.pointColor,
                            highlightStroke: b.pointHighlightStroke || b.pointStrokeColor
                        }))
                    }
                }, this)
            }, this), this.render()
        },
        eachPoints: function (a) {
            c.each(this.datasets, function (b) {
                c.each(b.points, a, this)
            }, this)
        },
        getPointsAtEvent: function (a) {
            var b = c.getRelativePosition(a), d = c.getAngleFromPoint({
                x: this.scale.xCenter,
                y: this.scale.yCenter
            }, b), e = 2 * Math.PI / this.scale.valuesCount, f = Math.round((d.angle - 1.5 * Math.PI) / e), g = [];
            return (f >= this.scale.valuesCount || 0 > f) && (f = 0), d.distance <= this.scale.drawingArea && c.each(this.datasets, function (a) {
                g.push(a.points[f])
            }), g
        },
        buildScale: function (a) {
            this.scale = new b.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth : 0,
                lineColor: this.options.scaleLineColor,
                angleLineColor: this.options.angleLineColor,
                angleLineWidth: this.options.angleShowLineOut ? this.options.angleLineWidth : 0,
                pointLabelFontColor: this.options.pointLabelFontColor,
                pointLabelFontSize: this.options.pointLabelFontSize,
                pointLabelFontFamily: this.options.pointLabelFontFamily,
                pointLabelFontStyle: this.options.pointLabelFontStyle,
                height: this.chart.height,
                width: this.chart.width,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                labels: a.labels,
                valuesCount: a.datasets[0].data.length
            }), this.scale.setScaleSize(), this.updateScaleRange(a.datasets), this.scale.buildYLabels()
        },
        updateScaleRange: function (a) {
            var b = function () {
                var b = [];
                return c.each(a, function (a) {
                    a.data ? b = b.concat(a.data) : c.each(a.points, function (a) {
                        b.push(a.value)
                    })
                }), b
            }(), d = this.options.scaleOverride ? {
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            } : c.calculateScaleRange(b, c.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            c.extend(this.scale, d)
        },
        addData: function (a, b) {
            this.scale.valuesCount++, c.each(a, function (a, d) {
                if (c.isNumber(a)) {
                    var e = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(a));
                    this.datasets[d].points.push(new this.PointClass({
                        value: a,
                        label: b,
                        x: e.x,
                        y: e.y,
                        strokeColor: this.datasets[d].pointStrokeColor,
                        fillColor: this.datasets[d].pointColor
                    }))
                }
            }, this), this.scale.labels.push(b), this.reflow(), this.update()
        },
        removeData: function () {
            this.scale.valuesCount--, this.scale.labels.shift(), c.each(this.datasets, function (a) {
                a.points.shift()
            }, this), this.reflow(), this.update()
        },
        update: function () {
            this.eachPoints(function (a) {
                a.save()
            }), this.reflow(), this.render()
        },
        reflow: function () {
            c.extend(this.scale, {
                width: this.chart.width,
                height: this.chart.height,
                size: c.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            }), this.updateScaleRange(this.datasets), this.scale.setScaleSize(), this.scale.buildYLabels()
        },
        draw: function (a) {
            var b = a || 1, d = this.chart.ctx;
            this.clear(), this.scale.draw(), c.each(this.datasets, function (a) {
                c.each(a.points, function (a, c) {
                    a.transition(this.scale.getPointPosition(c, this.scale.calculateCenterOffset(a.value)), b)
                }, this), d.lineWidth = this.options.datasetStrokeWidth, d.strokeStyle = a.strokeColor, d.beginPath(), c.each(a.points, function (a, b) {
                    0 === b ? d.moveTo(a.x, a.y) : d.lineTo(a.x, a.y)
                }, this), d.closePath(), d.stroke(), d.fillStyle = a.fillColor, d.fill(), c.each(a.points, function (a) {
                    a.draw()
                })
            }, this)
        }
    })
}.call(this), /*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
    function (a) {
        "use strict";
        a.picturefill = function () {
            for (var b = a.document.getElementsByTagName("span"), c = 0, d = b.length; d > c; c++)if (null !== b[c].getAttribute("data-picture")) {
                for (var e = b[c].getElementsByTagName("span"), f = [], g = 0, h = e.length; h > g; g++) {
                    var i = e[g].getAttribute("data-media");
                    (!i || a.matchMedia && a.matchMedia(i).matches) && f.push(e[g])
                }
                var j = b[c].getElementsByTagName("img")[0];
                if (f.length) {
                    var k = f.pop();
                    if (j && "NOSCRIPT" !== j.parentNode.nodeName) {
                        if (k === j.parentNode)continue
                    } else j = a.document.createElement("img"), j.alt = b[c].getAttribute("data-alt");
                    j.src = k.getAttribute("data-src"), k.appendChild(j), j.removeAttribute("width"), j.removeAttribute("height")
                } else j && j.parentNode.removeChild(j)
            }
        }, a.addEventListener ? (a.addEventListener("resize", a.picturefill, !1), a.addEventListener("DOMContentLoaded", function () {
            a.picturefill(), a.removeEventListener("load", a.picturefill, !1)
        }, !1), a.addEventListener("load", a.picturefill, !1)) : a.attachEvent && a.attachEvent("onload", a.picturefill)
    }(this), $(document).ready(function () {
    $("[data-toggler]").click(function (a) {
        a.preventDefault(), a.stopPropagation();
        var b = $(this).data(), c = b.toggleClass.substring(1);
        $(b.toggleTrigger).toggleClass(c), b.toggleRemote && $(b.toggleTarget).toggleClass(c), b.toggleFocus && $(b.toggleFocus).focus()
    })
}), function () {
    for (var a, b = function () {
    }, c = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], d = c.length, e = window.console = window.console || {}; d--;)a = c[d], e[a] || (e[a] = b)
}(), /*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
    function (a) {
        "use strict";
        a.picturefill = function () {
            for (var b = a.document.getElementsByTagName("span"), c = 0, d = b.length; d > c; c++)if (null !== b[c].getAttribute("data-picture")) {
                for (var e = b[c].getElementsByTagName("span"), f = [], g = 0, h = e.length; h > g; g++) {
                    var i = e[g].getAttribute("data-media");
                    (!i || a.matchMedia && a.matchMedia(i).matches) && f.push(e[g])
                }
                var j = b[c].getElementsByTagName("img")[0];
                if (f.length) {
                    var k = f.pop();
                    if (j && "NOSCRIPT" !== j.parentNode.nodeName) {
                        if (k === j.parentNode)continue
                    } else j = a.document.createElement("img"), j.alt = b[c].getAttribute("data-alt");
                    j.src = k.getAttribute("data-src"), k.appendChild(j), j.removeAttribute("width"), j.removeAttribute("height")
                } else j && j.parentNode.removeChild(j)
            }
        }, a.addEventListener ? (a.addEventListener("resize", a.picturefill, !1), a.addEventListener("DOMContentLoaded", function () {
            a.picturefill(), a.removeEventListener("load", a.picturefill, !1)
        }, !1), a.addEventListener("load", a.picturefill, !1)) : a.attachEvent && a.attachEvent("onload", a.picturefill)
    }(this), /*! Tappy! - a lightweight normalized tap event. Copyright 2013 @scottjehl, Filament Group, Inc. Licensed MIT */
    function (a, b) {
        a.tapHandling = !1;
        var c = function (c) {
            return c.each(function () {
                function c(a) {
                    b(a.target).trigger("tap", [a, b(a.target).attr("href")]), a.stopImmediatePropagation()
                }

                function d(a) {
                    var b = a.originalEvent || a, c = b.touches || b.targetTouches;
                    return c ? [c[0].pageX, c[0].pageY] : null
                }

                function e(a) {
                    if (a.touches && a.touches.length > 1 || a.targetTouches && a.targetTouches.length > 1)return !1;
                    var b = d(a);
                    j = b[0], i = b[1]
                }

                function f(a) {
                    if (!k) {
                        var b = d(a);
                        b && (Math.abs(i - b[1]) > m || Math.abs(j - b[0]) > m) && (k = !0)
                    }
                }

                function g(b) {
                    if (clearTimeout(h), h = setTimeout(function () {
                            a.tapHandling = !1, k = !1
                        }, 1e3), !b.ctrlKey && !b.metaKey) {
                        if (b.preventDefault(), k || a.tapHandling && a.tapHandling !== b.type)return void(k = !1);
                        a.tapHandling = b.type, c(b)
                    }
                }

                var h, i, j, k, l = b(this), m = 10;
                l.bind("touchstart MSPointerDown", e).bind("touchmove MSPointerMove", f).bind("touchend MSPointerUp", g).bind("click", g)
            })
        };
        if (b.event && b.event.special)b.event.special.tap = {
            add: function () {
                c(b(this), !0)
            }, remove: function () {
                c(b(this), !1)
            }
        }; else {
            var d = b.fn.bind;
            b.fn.bind = function (a) {
                return /(^| )tap( |$)/.test(a) && c(this), d.apply(this, arguments)
            }
        }
    }(this, jQuery), $(function () {
    $("span.js-inline-svg").each(function () {
        var a = $(this).data().imgAlt, b = Modernizr.inlinesvg ? $(this).data().svgSrc : $(this).data().svgSrc.replace("svg", "png"), c = $(this).attr("class");
        $(this).hide(), $(this).after('<img class="' + c + '" src="' + b + '" alt="' + a + '">'), $(this).remove()
    })
}), function () {
    "use strict";
    var a = function (a) {
        var b = a.data();
        return this.slideTarget = b.slideTarget, this.toggleTarget = b.toggleTarget, this.focus = b.toggleFocus, this.toggleRemote = b.toggleRemote, this.toggleSelf = 0 != b.toggleSelf, this.toggleClass = b.toggleClass.replace(".", ""), this.shouldTerminateEvent = 1 != b.terminateEvent, this.find = $.proxy(void 0 === this.toggleRemote ? a.find : $, a), this.toggle = $.proxy(this.toggle, this), this.$el = a, this.find(b.toggleTrigger).off("click").on("click", this.toggle), this
    };
    a.prototype.toggle = function () {
        var a = this.find(this.toggleTarget);
        return a.toggleClass(this.toggleClass), this.toggleSelf && this.$el.toggleClass(this.toggleClass), this.slideTarget && this.find(this.slideTarget).slideToggle(600, function () {
        }), this.focus && a.hasClass(this.toggleClass) && this.find(this.focus).focus(), this.shouldTerminateEvent
    }, window.Toggler = a
}(window), $(function () {
    $(".js-alert-switch-trigger").click(function () {
        var a = $('[data-alert-item="true"]'), b = $('[data-alert-selected="true"]'), c = a.index(b), d = $(a[++c % a.length]);
        b.hide(), b.attr("data-alert-selected", !1), d.show(), d.attr("data-alert-selected", !0)
    })
}), $(function () {
    $("[data-toggler]").each(function () {
        new Toggler($(this))
    }), navigator.userAgent.match(/iPhone|iPad|iPod/i) && ($(document).on("focus", "input, textarea", function () {
        $(".external-header-container").addClass("clearfix").css({position: "fixed", width: "100%"}).fadeOut()
    }), $(document).on("blur", "input, textarea", function () {
        $(".external-header-container").addClass("clearfix").css({
            position: "static",
            "z-index": "0"
        }).fadeIn(), $(".container").css({"z-index": "1"})
    }), $(document).on("focus", 'input[name="search"]', function () {
        $(".external-header-container").stop().css({position: "static"})
    }), $(document).on("blur", 'input[name="search"]', function () {
        $(".external-header-container").stop().css({position: "static"})
    }))
});
//# sourceMappingURL=vendor.map
