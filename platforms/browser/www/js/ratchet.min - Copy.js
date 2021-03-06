/*!
 * =====================================================
 * Ratchet v2.0.2 (http://goratchet.com)
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 *
 * v2.0.2 designed by @connors.
 * =====================================================
 */
! function () {
    "use strict";
    var a = function (a) {
            for (var b, c = document.querySelectorAll("a"); a && a !== document; a = a.parentNode)
                for (b = c.length; b--;)
                    if (c[b] === a) return a
        }
        , b = function (b) {
            var c = a(b.target);
            return c && c.hash ? document.querySelector(c.hash) : void 0
        };
    window.addEventListener("touchend", function (a) {
        var c = b(a);
        c && (c && c.classList.contains("modal") && c.classList.toggle("active"), a.preventDefault())
    })
}(), ! function () {
    "use strict";
    var a, b = function (a) {
            for (var b, c = document.querySelectorAll("a"); a && a !== document; a = a.parentNode)
                for (b = c.length; b--;)
                    if (c[b] === a) return a
        }
        , c = function () {
            a.style.display = "none", a.removeEventListener("webkitTransitionEnd", c)
        }
        , d = function () {
            var b = document.createElement("div");
            return b.classList.add("backdrop"), b.addEventListener("touchend", function () {
                a.addEventListener("webkitTransitionEnd", c), a.classList.remove("visible"), a.parentNode.removeChild(d)
            }), b
        }()
        , e = function (c) {
            var d = b(c.target);
            if (d && d.hash && !(d.hash.indexOf("/") > 0)) {
                try {
                    a = document.querySelector(d.hash)
                }
                catch (e) {
                    a = null
                }
                if (null !== a && a && a.classList.contains("popover")) return a
            }
        }
        , f = function (a) {
            var b = e(a);
            b && (b.style.display = "block", b.offsetHeight, b.classList.add("visible"), b.parentNode.appendChild(d))
        };
    window.addEventListener("touchend", f)
}(), ! function () {
    "use strict";
    var a, b = function () {}
        , c = 20
        , d = sessionStorage
        , e = {}
        , f = {
            slideIn: "slide-out"
            , slideOut: "slide-in"
            , fade: "fade"
        }
        , g = {
            bartab: ".bar-tab"
            , barnav: ".bar-nav"
            , barfooter: ".bar-footer"
            , barheadersecondary: ".bar-header-secondary"
        }
        , h = function (a, b) {
            o.id = a.id, b && (a = k(a.id)), d[a.id] = JSON.stringify(a), window.history.replaceState(a.id, a.title, a.url), e[a.id] = document.body.cloneNode(!0)
        }
        , i = function () {
            var a = o.id
                , b = JSON.parse(d.cacheForwardStack || "[]")
                , e = JSON.parse(d.cacheBackStack || "[]");
            for (e.push(a); b.length;) delete d[b.shift()];
            for (; e.length > c;) delete d[e.shift()];
            window.history.pushState(null, "", d[o.id].url), d.cacheForwardStack = JSON.stringify(b), d.cacheBackStack = JSON.stringify(e)
        }
        , j = function (a, b) {
            var c = "forward" === b
                , e = JSON.parse(d.cacheForwardStack || "[]")
                , f = JSON.parse(d.cacheBackStack || "[]")
                , g = c ? f : e
                , h = c ? e : f;
            o.id && g.push(o.id), h.pop(), d.cacheForwardStack = JSON.stringify(e), d.cacheBackStack = JSON.stringify(f)
        }
        , k = function (a) {
            return JSON.parse(d[a] || null) || {}
        }
        , l = function (b) {
            var c = t(b.target);
            if (!(!c || b.which > 1 || b.metaKey || b.ctrlKey || a || location.protocol !== c.protocol || location.host !== c.host || !c.hash && /#/.test(c.href) || c.hash && c.href.replace(c.hash, "") === location.href.replace(location.hash, "") || "push" === c.getAttribute("data-ignore"))) return c
        }
        , m = function (a) {
            var b = l(a);
            b && (a.preventDefault(), o({
                url: b.href
                , hash: b.hash
                , timeout: b.getAttribute("data-timeout")
                , transition: b.getAttribute("data-transition")
            }))
        }
        , n = function (a) {
            var b, c, h, i, l, m, n, p, q = a.state;
            if (q && d[q]) {
                if (l = o.id < q ? "forward" : "back", j(q, l), h = k(q), i = e[q], h.title && (document.title = h.title), "back" === l ? (n = JSON.parse("back" === l ? d.cacheForwardStack : d.cacheBackStack), p = k(n[n.length - 1])) : p = h, "back" === l && !p.id) return o.id = q;
                if (m = "back" === l ? f[p.transition] : p.transition, !i) return o({
                    id: h.id
                    , url: h.url
                    , title: h.title
                    , timeout: h.timeout
                    , transition: m
                    , ignorePush: !0
                });
                if (p.transition) {
                    h = v(h, ".content", i.cloneNode(!0));
                    for (b in g) g.hasOwnProperty(b) && (c = document.querySelector(g[b]), h[b] ? r(h[b], c) : c && c.parentNode.removeChild(c))
                }
                r((h.contents || i).cloneNode(!0), document.querySelector(".content"), m), o.id = q, document.body.offsetHeight
            }
        }
        , o = function (a) {
            var c, d = o.xhr;
            a.container = a.container || a.transition ? document.querySelector(".content") : document.body;
            for (c in g) g.hasOwnProperty(c) && (a[c] = a[c] || document.querySelector(g[c]));
            d && d.readyState < 4 && (d.onreadystatechange = b, d.abort()), d = new XMLHttpRequest, d.open("GET", a.url, !0), d.setRequestHeader("X-PUSH", "true"), d.onreadystatechange = function () {
                a._timeout && clearTimeout(a._timeout), 4 === d.readyState && (200 === d.status ? p(d, a) : q(a.url))
            }, o.id || h({
                id: +new Date
                , url: window.location.href
                , title: document.title
                , timeout: a.timeout
                , transition: null
            }), a.timeout && (a._timeout = setTimeout(function () {
                d.abort("timeout")
            }, a.timeout)), d.send(), d.readyState && !a.ignorePush && i()
        }
        , p = function (a, b) {
            var c, d, e = w(a, b);
            if (!e.contents) return u(b.url);
            if (e.title && (document.title = e.title), b.transition)
                for (c in g) g.hasOwnProperty(c) && (d = document.querySelector(g[c]), e[c] ? r(e[c], d) : d && d.parentNode.removeChild(d));
            r(e.contents, b.container, b.transition, function () {
                h({
                    id: b.id || +new Date
                    , url: e.url
                    , title: e.title
                    , timeout: b.timeout
                    , transition: b.transition
                }, b.id), s()
            }), !b.ignorePush && window._gaq && _gaq.push(["_trackPageview"]), !b.hash
        }
        , q = function (a) {
            throw new Error("Could not get: " + a)
        }
        , r = function (a, b, c, d) {
            var e, f, g;
            if (c ? (e = /in$/.test(c), "fade" === c && (b.classList.add("in"), b.classList.add("fade"), a.classList.add("fade")), /slide/.test(c) && (a.classList.add("sliding-in", e ? "right" : "left"), a.classList.add("sliding"), b.classList.add("sliding")), b.parentNode.insertBefore(a, b)) : b ? b.innerHTML = a.innerHTML : a.classList.contains("content") ? document.body.appendChild(a) : document.body.insertBefore(a, document.querySelector(".content")), c || d && d(), "fade" === c) {
                b.offsetWidth, b.classList.remove("in");
                var h = function () {
                        b.removeEventListener("webkitTransitionEnd", h), a.classList.add("in"), a.addEventListener("webkitTransitionEnd", i)
                    }
                    , i = function () {
                        a.removeEventListener("webkitTransitionEnd", i), b.parentNode.removeChild(b), a.classList.remove("fade"), a.classList.remove("in"), d && d()
                    };
                b.addEventListener("webkitTransitionEnd", h)
            }
            if (/slide/.test(c)) {
                var j = function () {
                    a.removeEventListener("webkitTransitionEnd", j), a.classList.remove("sliding", "sliding-in"), a.classList.remove(g), b.parentNode.removeChild(b), d && d()
                };
                b.offsetWidth, g = e ? "right" : "left", f = e ? "left" : "right", b.classList.add(f), a.classList.remove(g), a.addEventListener("webkitTransitionEnd", j)
            }
        }
        , s = function () {
            var a = new CustomEvent("push", {
                detail: {
                    state: k(o.id)
                }
                , bubbles: !0
                , cancelable: !0
            });
            window.dispatchEvent(a)
        }
        , t = function (a) {
            for (var b, c = document.querySelectorAll("a"); a && a !== document; a = a.parentNode)
                for (b = c.length; b--;)
                    if (c[b] === a) return a
        }
        , u = function (a) {
            window.history.replaceState(null, "", "#"), window.location.replace(a)
        }
        , v = function (a, b, c) {
            var d, e = {};
            for (d in a) a.hasOwnProperty(d) && (e[d] = a[d]);
            return Object.keys(g).forEach(function (a) {
                var b = c.querySelector(g[a]);
                b && b.parentNode.removeChild(b), e[a] = b
            }), e.contents = c.querySelector(b), e
        }
        , w = function (a, b) {
            var c, d, e = {}
                , f = a.responseText;
            if (e.url = b.url, !f) return e;
            /<html/i.test(f) ? (c = document.createElement("div"), d = document.createElement("div"), c.innerHTML = f.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0], d.innerHTML = f.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]) : (c = d = document.createElement("div"), c.innerHTML = f), e.title = c.querySelector("title");
            var g = "innerText" in e.title ? "innerText" : "textContent";
            return e.title = e.title && e.title[g].trim(), b.transition ? e = v(e, ".content", d) : e.contents = d, e
        };
    window.addEventListener("touchstart", function () {
        a = !1
    }), window.addEventListener("touchmove", function () {
        a = !0
    }), window.addEventListener("touchend", m), window.addEventListener("click", function (a) {
        l(a) && a.preventDefault()
    }), window.addEventListener("popstate", n), window.PUSH = o
}(), ! function () {
    "use strict";
    var a = function (a) {
        for (var b, c = document.querySelectorAll(".segmented-control .control-item"); a && a !== document; a = a.parentNode)
            for (b = c.length; b--;)
                if (c[b] === a) return a
    };
    window.addEventListener("touchend", function (b) {
        var c, d, e, f = a(b.target)
            , g = "active"
            , h = "." + g;
        if (f && (c = f.parentNode.querySelector(h), c && c.classList.remove(g), f.classList.add(g), f.hash && (e = document.querySelector(f.hash)))) {
            d = e.parentNode.querySelectorAll(h);
            for (var i = 0; i < d.length; i++) d[i].classList.remove(g);
            e.classList.add(g)
        }
    }), window.addEventListener("click", function (b) {
        a(b.target) && b.preventDefault()
    })
}(), ! function () {
    "use strict";
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n = function (a) {
            for (var b, c = document.querySelectorAll(".slider > .slide-group"); a && a !== document; a = a.parentNode)
                for (b = c.length; b--;)
                    if (c[b] === a) return a
        }
        , o = function () {
            if ("webkitTransform" in c.style) {
                var a = c.style.webkitTransform.match(/translate3d\(([^,]*)/)
                    , b = a ? a[1] : 0;
                return parseInt(b, 10)
            }
        }
        , p = function (a) {
            var b = a ? 0 > d ? "ceil" : "floor" : "round";
            k = Math[b](o() / (m / c.children.length)), k += a, k = Math.min(k, 0), k = Math.max(-(c.children.length - 1), k)
        }
        , q = function (f) {
            if (c = n(f.target)) {
                var k = c.querySelector(".slide");
                m = k.offsetWidth * c.children.length, l = void 0, j = c.offsetWidth, i = 1, g = -(c.children.length - 1), h = +new Date, a = f.touches[0].pageX, b = f.touches[0].pageY, d = 0, e = 0, p(0), c.style["-webkit-transition-duration"] = 0
            }
        }
        , r = function (h) {
            h.touches.length > 1 || !c || (d = h.touches[0].pageX - a, e = h.touches[0].pageY - b, a = h.touches[0].pageX, b = h.touches[0].pageY, "undefined" == typeof l && (l = Math.abs(e) > Math.abs(d)), l || (f = d / i + o(), h.preventDefault(), i = 0 === k && d > 0 ? a / j + 1.25 : k === g && 0 > d ? Math.abs(a) / j + 1.25 : 1, c.style.webkitTransform = "translate3d(" + f + "px,0,0)"))
        }
        , s = function (a) {
            c && !l && (p(+new Date - h < 1e3 && Math.abs(d) > 15 ? 0 > d ? -1 : 1 : 0), f = k * j, c.style["-webkit-transition-duration"] = ".2s", c.style.webkitTransform = "translate3d(" + f + "px,0,0)", a = new CustomEvent("slide", {
                detail: {
                    slideNumber: Math.abs(k)
                }
                , bubbles: !0
                , cancelable: !0
            }), c.parentNode.dispatchEvent(a))
        };
    window.addEventListener("touchstart", q), window.addEventListener("touchmove", r), window.addEventListener("touchend", s)
}(), ! function () {
    "use strict";
    var a = {}
        , b = !1
        , c = !1
        , d = !1
        , e = function (a) {
            for (var b, c = document.querySelectorAll(".toggle"); a && a !== document; a = a.parentNode)
                for (b = c.length; b--;)
                    if (c[b] === a) return a
        };
    window.addEventListener("touchstart", function (c) {
        if (c = c.originalEvent || c, d = e(c.target)) {
            var f = d.querySelector(".toggle-handle")
                , g = d.clientWidth
                , h = f.clientWidth
                , i = d.classList.contains("active") ? g - h : 0;
            a = {
                pageX: c.touches[0].pageX - i
                , pageY: c.touches[0].pageY
            }, b = !1
        }
    }), window.addEventListener("touchmove", function (e) {
        if (e = e.originalEvent || e, !(e.touches.length > 1) && d) {
            var f = d.querySelector(".toggle-handle")
                , g = e.touches[0]
                , h = d.clientWidth
                , i = f.clientWidth
                , j = h - i;
            if (b = !0, c = g.pageX - a.pageX, !(Math.abs(c) < Math.abs(g.pageY - a.pageY))) {
                if (e.preventDefault(), 0 > c) return f.style.webkitTransform = "translate3d(0,0,0)";
                if (c > j) return f.style.webkitTransform = "translate3d(" + j + "px,0,0)";
                f.style.webkitTransform = "translate3d(" + c + "px,0,0)", d.classList[c > h / 2 - i / 2 ? "add" : "remove"]("active")
            }
        }
    }), window.addEventListener("touchend", function (a) {
        if (d) {
            var e = d.querySelector(".toggle-handle")
                , f = d.clientWidth
                , g = e.clientWidth
                , h = f - g
                , i = !b && !d.classList.contains("active") || b && c > f / 2 - g / 2;
            e.style.webkitTransform = i ? "translate3d(" + h + "px,0,0)" : "translate3d(0,0,0)", d.classList[i ? "add" : "remove"]("active"), a = new CustomEvent("toggle", {
                detail: {
                    isActive: i
                }
                , bubbles: !0
                , cancelable: !0
            }), d.dispatchEvent(a), b = !1, d = !1
        }
    })
}();