var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e4, t2) => () => (t2 || (e4((t2 = { exports: {} }).exports, t2), e4 = null), t2.exports), s = (e4, n2) => {
  let r2 = {};
  for (var i2 in e4) t(r2, i2, { get: e4[i2], enumerable: true });
  return n2 || t(r2, Symbol.toStringTag, { value: `Module` }), r2;
}, c = (e4, i2, o2, s2) => {
  if (i2 && typeof i2 == `object` || typeof i2 == `function`) for (var c2 = r(i2), l2 = 0, u2 = c2.length, d2; l2 < u2; l2++) d2 = c2[l2], !a.call(e4, d2) && d2 !== o2 && t(e4, d2, { get: ((e5) => i2[e5]).bind(null, d2), enumerable: !(s2 = n(i2, d2)) || s2.enumerable });
  return e4;
}, l = (n2, r2, o2) => (o2 = n2 == null ? {} : e(i(n2)), c(r2 || !n2 || !n2.__esModule || !a.call(n2, `default`) ? t(o2, `default`, { value: n2, enumerable: true }) : o2, n2));
(function() {
  let e4 = document.createElement(`link`).relList;
  if (e4 && e4.supports && e4.supports(`modulepreload`)) return;
  for (let e5 of document.querySelectorAll(`link[rel="modulepreload"]`)) n2(e5);
  new MutationObserver((e5) => {
    for (let t3 of e5) if (t3.type === `childList`) for (let e6 of t3.addedNodes) e6.tagName === `LINK` && e6.rel === `modulepreload` && n2(e6);
  }).observe(document, { childList: true, subtree: true });
  function t2(e5) {
    let t3 = {};
    return e5.integrity && (t3.integrity = e5.integrity), e5.referrerPolicy && (t3.referrerPolicy = e5.referrerPolicy), t3.credentials = e5.crossOrigin === `use-credentials` ? `include` : e5.crossOrigin === `anonymous` ? `omit` : `same-origin`, t3;
  }
  function n2(e5) {
    if (e5.ep) return;
    e5.ep = true;
    let n3 = t2(e5);
    fetch(e5.href, n3);
  }
})();
var u = o(((e4) => {
  var t2 = /* @__PURE__ */ Symbol.for(`react.transitional.element`), n2 = /* @__PURE__ */ Symbol.for(`react.portal`), r2 = /* @__PURE__ */ Symbol.for(`react.fragment`), i2 = /* @__PURE__ */ Symbol.for(`react.strict_mode`), a2 = /* @__PURE__ */ Symbol.for(`react.profiler`), o2 = /* @__PURE__ */ Symbol.for(`react.consumer`), s2 = /* @__PURE__ */ Symbol.for(`react.context`), c2 = /* @__PURE__ */ Symbol.for(`react.forward_ref`), l2 = /* @__PURE__ */ Symbol.for(`react.suspense`), u2 = /* @__PURE__ */ Symbol.for(`react.memo`), d2 = /* @__PURE__ */ Symbol.for(`react.lazy`), f2 = /* @__PURE__ */ Symbol.for(`react.activity`), p2 = /* @__PURE__ */ Symbol.for(`react.view_transition`), m2 = Symbol.iterator;
  function h2(e5) {
    return typeof e5 != `object` || !e5 ? null : (e5 = m2 && e5[m2] || e5[`@@iterator`], typeof e5 == `function` ? e5 : null);
  }
  var g2 = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, _2 = Object.assign, v2 = {};
  function y2(e5, t3, n3) {
    this.props = e5, this.context = t3, this.refs = v2, this.updater = n3 || g2;
  }
  y2.prototype.isReactComponent = {}, y2.prototype.setState = function(e5, t3) {
    if (typeof e5 != `object` && typeof e5 != `function` && e5 != null) throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);
    this.updater.enqueueSetState(this, e5, t3, `setState`);
  }, y2.prototype.forceUpdate = function(e5) {
    this.updater.enqueueForceUpdate(this, e5, `forceUpdate`);
  };
  function b2() {
  }
  b2.prototype = y2.prototype;
  function x2(e5, t3, n3) {
    this.props = e5, this.context = t3, this.refs = v2, this.updater = n3 || g2;
  }
  var ee2 = x2.prototype = new b2();
  ee2.constructor = x2, _2(ee2, y2.prototype), ee2.isPureReactComponent = true;
  var te2 = Array.isArray;
  function ne2() {
  }
  var S2 = { H: null, A: null, T: null, S: null }, re2 = Object.prototype.hasOwnProperty;
  function C2(e5, n3, r3) {
    var i3 = r3.ref;
    return { $$typeof: t2, type: e5, key: n3, ref: i3 === void 0 ? null : i3, props: r3 };
  }
  function ie2(e5, t3) {
    return C2(e5.type, t3, e5.props);
  }
  function ae2(e5) {
    return typeof e5 == `object` && !!e5 && e5.$$typeof === t2;
  }
  function oe2(e5) {
    var t3 = { "=": `=0`, ":": `=2` };
    return `$` + e5.replace(/[=:]/g, function(e6) {
      return t3[e6];
    });
  }
  var w2 = /\/+/g;
  function T2(e5, t3) {
    return typeof e5 == `object` && e5 && e5.key != null ? oe2(`` + e5.key) : t3.toString(36);
  }
  function se2(e5) {
    switch (e5.status) {
      case `fulfilled`:
        return e5.value;
      case `rejected`:
        throw e5.reason;
      default:
        switch (typeof e5.status == `string` ? e5.then(ne2, ne2) : (e5.status = `pending`, e5.then(function(t3) {
          e5.status === `pending` && (e5.status = `fulfilled`, e5.value = t3);
        }, function(t3) {
          e5.status === `pending` && (e5.status = `rejected`, e5.reason = t3);
        })), e5.status) {
          case `fulfilled`:
            return e5.value;
          case `rejected`:
            throw e5.reason;
        }
    }
    throw e5;
  }
  function ce2(e5, r3, i3, a3, o3) {
    var s3 = typeof e5;
    (s3 === `undefined` || s3 === `boolean`) && (e5 = null);
    var c3 = false;
    if (e5 === null) c3 = true;
    else switch (s3) {
      case `bigint`:
      case `string`:
      case `number`:
        c3 = true;
        break;
      case `object`:
        switch (e5.$$typeof) {
          case t2:
          case n2:
            c3 = true;
            break;
          case d2:
            return c3 = e5._init, ce2(c3(e5._payload), r3, i3, a3, o3);
        }
    }
    if (c3) return o3 = o3(e5), c3 = a3 === `` ? `.` + T2(e5, 0) : a3, te2(o3) ? (i3 = ``, c3 != null && (i3 = c3.replace(w2, `$&/`) + `/`), ce2(o3, r3, i3, ``, function(e6) {
      return e6;
    })) : o3 != null && (ae2(o3) && (o3 = ie2(o3, i3 + (o3.key == null || e5 && e5.key === o3.key ? `` : (`` + o3.key).replace(w2, `$&/`) + `/`) + c3)), r3.push(o3)), 1;
    c3 = 0;
    var l3 = a3 === `` ? `.` : a3 + `:`;
    if (te2(e5)) for (var u3 = 0; u3 < e5.length; u3++) a3 = e5[u3], s3 = l3 + T2(a3, u3), c3 += ce2(a3, r3, i3, s3, o3);
    else if (u3 = h2(e5), typeof u3 == `function`) for (e5 = u3.call(e5), u3 = 0; !(a3 = e5.next()).done; ) a3 = a3.value, s3 = l3 + T2(a3, u3++), c3 += ce2(a3, r3, i3, s3, o3);
    else if (s3 === `object`) {
      if (typeof e5.then == `function`) return ce2(se2(e5), r3, i3, a3, o3);
      throw r3 = String(e5), Error(`Objects are not valid as a React child (found: ` + (r3 === `[object Object]` ? `object with keys {` + Object.keys(e5).join(`, `) + `}` : r3) + `). If you meant to render a collection of children, use an array instead.`);
    }
    return c3;
  }
  function le2(e5, t3, n3) {
    if (e5 == null) return e5;
    var r3 = [], i3 = 0;
    return ce2(e5, r3, ``, ``, function(e6) {
      return t3.call(n3, e6, i3++);
    }), r3;
  }
  function ue2(e5) {
    if (e5._status === -1) {
      var t3 = e5._result, n3 = t3();
      n3.then(function(t4) {
        (e5._status === 0 || e5._status === -1) && (e5._status = 1, e5._result = t4, n3.status === void 0 && (n3.status = `fulfilled`, n3.value = t4));
      }, function(t4) {
        (e5._status === 0 || e5._status === -1) && (e5._status = 2, e5._result = t4, n3.status === void 0 && (n3.status = `rejected`, n3.reason = t4));
      }), e5._status === -1 && (e5._status = 0, e5._result = n3);
    }
    if (e5._status === 1) return e5._result.default;
    throw e5._result;
  }
  var de2 = typeof reportError == `function` ? reportError : function(e5) {
    if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
      var t3 = new window.ErrorEvent(`error`, { bubbles: true, cancelable: true, message: typeof e5 == `object` && e5 && typeof e5.message == `string` ? String(e5.message) : String(e5), error: e5 });
      if (!window.dispatchEvent(t3)) return;
    } else if (typeof process == `object` && typeof process.emit == `function`) {
      process.emit(`uncaughtException`, e5);
      return;
    }
    console.error(e5);
  };
  function fe2(e5) {
    var t3 = S2.T, n3 = {};
    n3.types = t3 === null ? null : t3.types, S2.T = n3;
    try {
      var r3 = e5(), i3 = S2.S;
      i3 !== null && i3(n3, r3), typeof r3 == `object` && r3 && typeof r3.then == `function` && r3.then(ne2, de2);
    } catch (e6) {
      de2(e6);
    } finally {
      t3 !== null && n3.types !== null && (t3.types = n3.types), S2.T = t3;
    }
  }
  function pe2(e5) {
    var t3 = S2.T;
    if (t3 !== null) {
      var n3 = t3.types;
      n3 === null ? t3.types = [e5] : n3.indexOf(e5) === -1 && n3.push(e5);
    } else fe2(pe2.bind(null, e5));
  }
  var me2 = { map: le2, forEach: function(e5, t3, n3) {
    le2(e5, function() {
      t3.apply(this, arguments);
    }, n3);
  }, count: function(e5) {
    var t3 = 0;
    return le2(e5, function() {
      t3++;
    }), t3;
  }, toArray: function(e5) {
    return le2(e5, function(e6) {
      return e6;
    }) || [];
  }, only: function(e5) {
    if (!ae2(e5)) throw Error(`React.Children.only expected to receive a single React element child.`);
    return e5;
  } };
  e4.Activity = f2, e4.Children = me2, e4.Component = y2, e4.Fragment = r2, e4.Profiler = a2, e4.PureComponent = x2, e4.StrictMode = i2, e4.Suspense = l2, e4.ViewTransition = p2, e4.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S2, e4.__COMPILER_RUNTIME = { __proto__: null, c: function(e5) {
    return S2.H.useMemoCache(e5);
  } }, e4.addTransitionType = pe2, e4.cache = function(e5) {
    return function() {
      return e5.apply(null, arguments);
    };
  }, e4.cacheSignal = function() {
    return null;
  }, e4.cloneElement = function(e5, t3, n3) {
    if (e5 == null) throw Error(`The argument must be a React element, but you passed ` + e5 + `.`);
    var r3 = _2({}, e5.props), i3 = e5.key;
    if (t3 != null) for (a3 in t3.key !== void 0 && (i3 = `` + t3.key), t3) !re2.call(t3, a3) || a3 === `key` || a3 === `__self` || a3 === `__source` || a3 === `ref` && t3.ref === void 0 || (r3[a3] = t3[a3]);
    var a3 = arguments.length - 2;
    if (a3 === 1) r3.children = n3;
    else if (1 < a3) {
      for (var o3 = Array(a3), s3 = 0; s3 < a3; s3++) o3[s3] = arguments[s3 + 2];
      r3.children = o3;
    }
    return C2(e5.type, i3, r3);
  }, e4.createContext = function(e5) {
    return e5 = { $$typeof: s2, _currentValue: e5, _currentValue2: e5, _threadCount: 0, Provider: null, Consumer: null }, e5.Provider = e5, e5.Consumer = { $$typeof: o2, _context: e5 }, e5;
  }, e4.createElement = function(e5, t3, n3) {
    var r3, i3 = {}, a3 = null;
    if (t3 != null) for (r3 in t3.key !== void 0 && (a3 = `` + t3.key), t3) re2.call(t3, r3) && r3 !== `key` && r3 !== `__self` && r3 !== `__source` && (i3[r3] = t3[r3]);
    var o3 = arguments.length - 2;
    if (o3 === 1) i3.children = n3;
    else if (1 < o3) {
      for (var s3 = Array(o3), c3 = 0; c3 < o3; c3++) s3[c3] = arguments[c3 + 2];
      i3.children = s3;
    }
    if (e5 && e5.defaultProps) for (r3 in o3 = e5.defaultProps, o3) i3[r3] === void 0 && (i3[r3] = o3[r3]);
    return C2(e5, a3, i3);
  }, e4.createRef = function() {
    return { current: null };
  }, e4.forwardRef = function(e5) {
    return { $$typeof: c2, render: e5 };
  }, e4.isValidElement = ae2, e4.lazy = function(e5) {
    return { $$typeof: d2, _payload: { _status: -1, _result: e5 }, _init: ue2 };
  }, e4.memo = function(e5, t3) {
    return { $$typeof: u2, type: e5, compare: t3 === void 0 ? null : t3 };
  }, e4.startTransition = fe2, e4.unstable_useCacheRefresh = function() {
    return S2.H.useCacheRefresh();
  }, e4.use = function(e5) {
    return S2.H.use(e5);
  }, e4.useActionState = function(e5, t3, n3) {
    return S2.H.useActionState(e5, t3, n3);
  }, e4.useCallback = function(e5, t3) {
    return S2.H.useCallback(e5, t3);
  }, e4.useContext = function(e5) {
    return S2.H.useContext(e5);
  }, e4.useDebugValue = function() {
  }, e4.useDeferredValue = function(e5, t3) {
    return S2.H.useDeferredValue(e5, t3);
  }, e4.useEffect = function(e5, t3) {
    return S2.H.useEffect(e5, t3);
  }, e4.useEffectEvent = function(e5) {
    return S2.H.useEffectEvent(e5);
  }, e4.useId = function() {
    return S2.H.useId();
  }, e4.useImperativeHandle = function(e5, t3, n3) {
    return S2.H.useImperativeHandle(e5, t3, n3);
  }, e4.useInsertionEffect = function(e5, t3) {
    return S2.H.useInsertionEffect(e5, t3);
  }, e4.useLayoutEffect = function(e5, t3) {
    return S2.H.useLayoutEffect(e5, t3);
  }, e4.useMemo = function(e5, t3) {
    return S2.H.useMemo(e5, t3);
  }, e4.useOptimistic = function(e5, t3) {
    return S2.H.useOptimistic(e5, t3);
  }, e4.useReducer = function(e5, t3, n3) {
    return S2.H.useReducer(e5, t3, n3);
  }, e4.useRef = function(e5) {
    return S2.H.useRef(e5);
  }, e4.useState = function(e5) {
    return S2.H.useState(e5);
  }, e4.useSyncExternalStore = function(e5, t3, n3) {
    return S2.H.useSyncExternalStore(e5, t3, n3);
  }, e4.useTransition = function() {
    return S2.H.useTransition();
  }, e4.version = `19.3.0`;
})), d = o(((e4, t2) => {
  t2.exports = u();
})), f = o(((e4) => {
  function t2(e5, t3) {
    var n3 = e5.length;
    e5.push(t3);
    a: for (; 0 < n3; ) {
      var r3 = n3 - 1 >>> 1, a3 = e5[r3];
      if (0 < i2(a3, t3)) e5[r3] = t3, e5[n3] = a3, n3 = r3;
      else break a;
    }
  }
  function n2(e5) {
    return e5.length === 0 ? null : e5[0];
  }
  function r2(e5) {
    if (e5.length === 0) return null;
    var t3 = e5[0], n3 = e5.pop();
    if (n3 !== t3) {
      e5[0] = n3;
      a: for (var r3 = 0, a3 = e5.length, o3 = a3 >>> 1; r3 < o3; ) {
        var s3 = 2 * (r3 + 1) - 1, c3 = e5[s3], l3 = s3 + 1, u3 = e5[l3];
        if (0 > i2(c3, n3)) l3 < a3 && 0 > i2(u3, c3) ? (e5[r3] = u3, e5[l3] = n3, r3 = l3) : (e5[r3] = c3, e5[s3] = n3, r3 = s3);
        else if (l3 < a3 && 0 > i2(u3, n3)) e5[r3] = u3, e5[l3] = n3, r3 = l3;
        else break a;
      }
    }
    return t3;
  }
  function i2(e5, t3) {
    var n3 = e5.sortIndex - t3.sortIndex;
    return n3 === 0 ? e5.id - t3.id : n3;
  }
  if (e4.unstable_now = void 0, typeof performance == `object` && typeof performance.now == `function`) {
    var a2 = performance;
    e4.unstable_now = function() {
      return a2.now();
    };
  } else {
    var o2 = Date, s2 = o2.now();
    e4.unstable_now = function() {
      return o2.now() - s2;
    };
  }
  var c2 = [], l2 = [], u2 = 1, d2 = null, f2 = 3, p2 = false, m2 = false, h2 = false, g2 = false, _2 = typeof setTimeout == `function` ? setTimeout : null, v2 = typeof clearTimeout == `function` ? clearTimeout : null, y2 = typeof setImmediate < `u` ? setImmediate : null;
  function b2(e5) {
    for (var i3 = n2(l2); i3 !== null; ) {
      if (i3.callback === null) r2(l2);
      else if (i3.startTime <= e5) r2(l2), i3.sortIndex = i3.expirationTime, t2(c2, i3);
      else break;
      i3 = n2(l2);
    }
  }
  function x2(e5) {
    if (h2 = false, b2(e5), !m2) {
      if (n2(c2) !== null) m2 = true, ee2 || (ee2 = true, ie2());
      else {
        var t3 = n2(l2);
        t3 !== null && w2(x2, t3.startTime - e5);
      }
    }
  }
  var ee2 = false, te2 = -1, ne2 = 5, S2 = -1;
  function re2() {
    return g2 ? true : !(e4.unstable_now() - S2 < ne2);
  }
  function C2() {
    if (g2 = false, ee2) {
      var t3 = e4.unstable_now();
      S2 = t3;
      var i3 = true;
      try {
        a: {
          m2 = false, h2 && (h2 = false, v2(te2), te2 = -1), p2 = true;
          var a3 = f2;
          try {
            b: {
              for (b2(t3), d2 = n2(c2); d2 !== null && !(d2.expirationTime > t3 && re2()); ) {
                var o3 = d2.callback;
                if (typeof o3 == `function`) {
                  d2.callback = null, f2 = d2.priorityLevel;
                  var s3 = o3(d2.expirationTime <= t3);
                  if (t3 = e4.unstable_now(), typeof s3 == `function`) {
                    d2.callback = s3, b2(t3), i3 = true;
                    break b;
                  }
                  d2 === n2(c2) && r2(c2), b2(t3);
                } else r2(c2);
                d2 = n2(c2);
              }
              if (d2 !== null) i3 = true;
              else {
                var u3 = n2(l2);
                u3 !== null && w2(x2, u3.startTime - t3), i3 = false;
              }
            }
            break a;
          } finally {
            d2 = null, f2 = a3, p2 = false;
          }
          i3 = void 0;
        }
      } finally {
        i3 ? ie2() : ee2 = false;
      }
    }
  }
  var ie2;
  if (typeof y2 == `function`) ie2 = function() {
    y2(C2);
  };
  else if (typeof MessageChannel < `u`) {
    var ae2 = new MessageChannel(), oe2 = ae2.port2;
    ae2.port1.onmessage = C2, ie2 = function() {
      oe2.postMessage(null);
    };
  } else ie2 = function() {
    _2(C2, 0);
  };
  function w2(t3, n3) {
    te2 = _2(function() {
      t3(e4.unstable_now());
    }, n3);
  }
  e4.unstable_IdlePriority = 5, e4.unstable_ImmediatePriority = 1, e4.unstable_LowPriority = 4, e4.unstable_NormalPriority = 3, e4.unstable_Profiling = null, e4.unstable_UserBlockingPriority = 2, e4.unstable_cancelCallback = function(e5) {
    e5.callback = null;
  }, e4.unstable_forceFrameRate = function(e5) {
    0 > e5 || 125 < e5 ? console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`) : ne2 = 0 < e5 ? Math.floor(1e3 / e5) : 5;
  }, e4.unstable_getCurrentPriorityLevel = function() {
    return f2;
  }, e4.unstable_next = function(e5) {
    switch (f2) {
      case 1:
      case 2:
      case 3:
        var t3 = 3;
        break;
      default:
        t3 = f2;
    }
    var n3 = f2;
    f2 = t3;
    try {
      return e5();
    } finally {
      f2 = n3;
    }
  }, e4.unstable_requestPaint = function() {
    g2 = true;
  }, e4.unstable_runWithPriority = function(e5, t3) {
    switch (e5) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e5 = 3;
    }
    var n3 = f2;
    f2 = e5;
    try {
      return t3();
    } finally {
      f2 = n3;
    }
  }, e4.unstable_scheduleCallback = function(r3, i3, a3) {
    var o3 = e4.unstable_now();
    switch (typeof a3 == `object` && a3 ? (a3 = a3.delay, a3 = typeof a3 == `number` && 0 < a3 ? o3 + a3 : o3) : a3 = o3, r3) {
      case 1:
        var s3 = -1;
        break;
      case 2:
        s3 = 250;
        break;
      case 5:
        s3 = 1073741823;
        break;
      case 4:
        s3 = 1e4;
        break;
      default:
        s3 = 5e3;
    }
    return s3 = a3 + s3, r3 = { id: u2++, callback: i3, priorityLevel: r3, startTime: a3, expirationTime: s3, sortIndex: -1 }, a3 > o3 ? (r3.sortIndex = a3, t2(l2, r3), n2(c2) === null && r3 === n2(l2) && (h2 ? (v2(te2), te2 = -1) : h2 = true, w2(x2, a3 - o3))) : (r3.sortIndex = s3, t2(c2, r3), m2 || p2 || (m2 = true, ee2 || (ee2 = true, ie2()))), r3;
  }, e4.unstable_shouldYield = re2, e4.unstable_wrapCallback = function(e5) {
    var t3 = f2;
    return function() {
      var n3 = f2;
      f2 = t3;
      try {
        return e5.apply(this, arguments);
      } finally {
        f2 = n3;
      }
    };
  };
})), p = o(((e4, t2) => {
  t2.exports = f();
})), m = o(((e4) => {
  var t2 = d();
  function n2(e5) {
    var t3 = `https://react.dev/errors/` + e5;
    if (1 < arguments.length) {
      t3 += `?args[]=` + encodeURIComponent(arguments[1]);
      for (var n3 = 2; n3 < arguments.length; n3++) t3 += `&args[]=` + encodeURIComponent(arguments[n3]);
    }
    return `Minified React error #` + e5 + `; visit ` + t3 + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
  }
  function r2() {
  }
  var i2 = { d: { f: r2, r: function() {
    throw Error(n2(522));
  }, D: r2, C: r2, L: r2, m: r2, X: r2, S: r2, M: r2 }, p: 0, findDOMNode: null }, a2 = /* @__PURE__ */ Symbol.for(`react.portal`), o2 = /* @__PURE__ */ Symbol.for(`react.recoverable`), s2 = /* @__PURE__ */ Symbol.for(`react.optimistic_key`);
  function c2(e5, t3, n3) {
    var r3 = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: a2, key: r3 == null ? null : r3 === s2 ? s2 : `` + r3, children: e5, containerInfo: t3, implementation: n3 };
  }
  var l2 = t2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function u2(e5, t3) {
    if (e5 === `font`) return ``;
    if (typeof t3 == `string`) return t3 === `use-credentials` ? t3 : ``;
  }
  e4.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i2, e4.browser = function(e5) {
    return { $$typeof: o2, _reason: e5 };
  }, e4.createPortal = function(e5, t3) {
    var r3 = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!t3 || t3.nodeType !== 1 && t3.nodeType !== 9 && t3.nodeType !== 11) throw Error(n2(299));
    return c2(e5, t3, null, r3);
  }, e4.flushSync = function(e5) {
    var t3 = l2.T, n3 = i2.p;
    try {
      if (l2.T = null, i2.p = 2, e5) return e5();
    } finally {
      l2.T = t3, i2.p = n3, i2.d.f();
    }
  }, e4.preconnect = function(e5, t3) {
    typeof e5 == `string` && (t3 ? (t3 = t3.crossOrigin, t3 = typeof t3 == `string` ? t3 === `use-credentials` ? t3 : `` : void 0) : t3 = null, i2.d.C(e5, t3));
  }, e4.prefetchDNS = function(e5) {
    typeof e5 == `string` && i2.d.D(e5);
  }, e4.preinit = function(e5, t3) {
    if (typeof e5 == `string` && t3 && typeof t3.as == `string`) {
      var n3 = t3.as, r3 = u2(n3, t3.crossOrigin), a3 = typeof t3.integrity == `string` ? t3.integrity : void 0, o3 = typeof t3.fetchPriority == `string` ? t3.fetchPriority : void 0;
      n3 === `style` ? i2.d.S(e5, typeof t3.precedence == `string` ? t3.precedence : void 0, { crossOrigin: r3, integrity: a3, fetchPriority: o3 }) : n3 === `script` && i2.d.X(e5, { crossOrigin: r3, integrity: a3, fetchPriority: o3, nonce: typeof t3.nonce == `string` ? t3.nonce : void 0 });
    }
  }, e4.preinitModule = function(e5, t3) {
    if (typeof e5 == `string`) {
      if (typeof t3 == `object` && t3) {
        if (t3.as == null || t3.as === `script`) {
          var n3 = u2(t3.as, t3.crossOrigin);
          i2.d.M(e5, { crossOrigin: n3, integrity: typeof t3.integrity == `string` ? t3.integrity : void 0, nonce: typeof t3.nonce == `string` ? t3.nonce : void 0, fetchPriority: typeof t3.fetchPriority == `string` ? t3.fetchPriority : void 0 });
        }
      } else t3 ?? i2.d.M(e5);
    }
  }, e4.preload = function(e5, t3) {
    if (typeof e5 == `string` && typeof t3 == `object` && t3 && typeof t3.as == `string`) {
      var n3 = t3.as, r3 = u2(n3, t3.crossOrigin);
      i2.d.L(e5, n3, { crossOrigin: r3, integrity: typeof t3.integrity == `string` ? t3.integrity : void 0, nonce: typeof t3.nonce == `string` ? t3.nonce : void 0, type: typeof t3.type == `string` ? t3.type : void 0, fetchPriority: typeof t3.fetchPriority == `string` ? t3.fetchPriority : void 0, referrerPolicy: typeof t3.referrerPolicy == `string` ? t3.referrerPolicy : void 0, imageSrcSet: typeof t3.imageSrcSet == `string` ? t3.imageSrcSet : void 0, imageSizes: typeof t3.imageSizes == `string` ? t3.imageSizes : void 0, media: typeof t3.media == `string` ? t3.media : void 0 });
    }
  }, e4.preloadModule = function(e5, t3) {
    if (typeof e5 == `string`) {
      if (t3) {
        var n3 = u2(t3.as, t3.crossOrigin);
        i2.d.m(e5, { as: typeof t3.as == `string` && t3.as !== `script` ? t3.as : void 0, crossOrigin: n3, integrity: typeof t3.integrity == `string` ? t3.integrity : void 0, nonce: typeof t3.nonce == `string` ? t3.nonce : void 0, fetchPriority: typeof t3.fetchPriority == `string` ? t3.fetchPriority : void 0 });
      } else i2.d.m(e5);
    }
  }, e4.requestFormReset = function(e5) {
    i2.d.r(e5);
  }, e4.unstable_batchedUpdates = function(e5, t3) {
    return e5(t3);
  }, e4.useFormState = function(e5, t3, n3) {
    return l2.H.useFormState(e5, t3, n3);
  }, e4.useFormStatus = function() {
    return l2.H.useHostTransitionStatus();
  }, e4.version = `19.3.0`;
})), h = o(((e4, t2) => {
  function n2() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u` && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == `function`) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n2);
    } catch (e5) {
      console.error(e5);
    }
  }
  n2(), t2.exports = m();
})), g = o(((e4) => {
  var t2 = p(), n2 = d(), r2 = h();
  function i2(e5) {
    var t3 = `https://react.dev/errors/` + e5;
    if (1 < arguments.length) {
      t3 += `?args[]=` + encodeURIComponent(arguments[1]);
      for (var n3 = 2; n3 < arguments.length; n3++) t3 += `&args[]=` + encodeURIComponent(arguments[n3]);
    }
    return `Minified React error #` + e5 + `; visit ` + t3 + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
  }
  function a2(e5) {
    return !(!e5 || e5.nodeType !== 1 && e5.nodeType !== 9 && e5.nodeType !== 11);
  }
  function o2(e5) {
    for (var t3 = e5, n3 = t3; n3 && !n3.alternate; ) t3 = n3, t3.flags & 4098 && (e5 = t3.return), n3 = t3.return;
    for (; t3.return; ) t3 = t3.return;
    return t3.tag === 3 ? e5 : null;
  }
  function s2(e5) {
    if (e5.tag === 13) {
      var t3 = e5.memoizedState;
      if (t3 === null && (e5 = e5.alternate, e5 !== null && (t3 = e5.memoizedState)), t3 !== null) return t3.dehydrated;
    }
    return null;
  }
  function c2(e5) {
    if (e5.tag === 31) {
      var t3 = e5.memoizedState;
      if (t3 === null && (e5 = e5.alternate, e5 !== null && (t3 = e5.memoizedState)), t3 !== null) return t3.dehydrated;
    }
    return null;
  }
  function l2(e5) {
    if (o2(e5) !== e5) throw Error(i2(188));
  }
  function u2(e5) {
    var t3 = e5.alternate;
    if (!t3) {
      if (t3 = o2(e5), t3 === null) throw Error(i2(188));
      return t3 === e5 ? e5 : null;
    }
    for (var n3 = e5, r3 = t3; ; ) {
      var a3 = n3.return;
      if (a3 === null) break;
      var s3 = a3.alternate;
      if (s3 === null) {
        if (r3 = a3.return, r3 !== null) {
          n3 = r3;
          continue;
        }
        break;
      }
      if (a3.child === s3.child) {
        for (s3 = a3.child; s3; ) {
          if (s3 === n3) return l2(a3), e5;
          if (s3 === r3) return l2(a3), t3;
          s3 = s3.sibling;
        }
        throw Error(i2(188));
      }
      if (n3.return !== r3.return) n3 = a3, r3 = s3;
      else {
        for (var c3 = false, u3 = a3.child; u3; ) {
          if (u3 === n3) {
            c3 = true, n3 = a3, r3 = s3;
            break;
          }
          if (u3 === r3) {
            c3 = true, r3 = a3, n3 = s3;
            break;
          }
          u3 = u3.sibling;
        }
        if (!c3) {
          for (u3 = s3.child; u3; ) {
            if (u3 === n3) {
              c3 = true, n3 = s3, r3 = a3;
              break;
            }
            if (u3 === r3) {
              c3 = true, r3 = s3, n3 = a3;
              break;
            }
            u3 = u3.sibling;
          }
          if (!c3) throw Error(i2(189));
        }
      }
      if (n3.alternate !== r3) throw Error(i2(190));
    }
    if (n3.tag !== 3) throw Error(i2(188));
    return n3.stateNode.current === n3 ? e5 : t3;
  }
  function f2(e5) {
    var t3 = e5.tag;
    if (t3 === 5 || t3 === 26 || t3 === 27 || t3 === 6) return e5;
    for (e5 = e5.child; e5 !== null; ) {
      if (t3 = f2(e5), t3 !== null) return t3;
      e5 = e5.sibling;
    }
    return null;
  }
  function m2(e5, t3, n3, r3, i3, a3) {
    for (; e5 !== null; ) {
      if ((e5.tag === 5 || e5.tag === 27 || e5.tag === 6) && n3(e5, r3, i3, a3) || (e5.tag !== 22 || e5.memoizedState === null) && (t3 || e5.tag !== 5 && e5.tag !== 27) && m2(e5.child, t3, n3, r3, i3, a3)) return true;
      e5 = e5.sibling;
    }
    return false;
  }
  function g2(e5) {
    for (e5 = e5.return; e5 !== null; ) {
      if (e5.tag === 3 || e5.tag === 5 || e5.tag === 27) return e5;
      e5 = e5.return;
    }
    return null;
  }
  function _2(e5) {
    var t3 = false;
    for (e5 = e5.return; e5 !== null && (e5.tag === 4 && (t3 = true), e5.tag !== 3 && e5.tag !== 5 && e5.tag !== 27); ) e5 = e5.return;
    return t3;
  }
  function v2(e5) {
    var t3 = [null, null], n3 = g2(e5);
    return n3 === null || y2(t3, e5, n3.child, { foundSelf: false }), t3;
  }
  function y2(e5, t3, n3, r3) {
    for (; n3 !== null; ) {
      if (n3 === t3) r3.foundSelf = true;
      else if (n3.tag === 5 || n3.tag === 27 || n3.tag === 6) {
        if (r3.foundSelf) return e5[1] = n3, true;
        e5[0] = n3;
      } else if ((n3.tag !== 22 || n3.memoizedState === null) && y2(e5, t3, n3.child, r3)) return true;
      n3 = n3.sibling;
    }
    return false;
  }
  function b2(e5) {
    switch (e5.tag) {
      case 5:
      case 27:
      case 6:
        return e5.stateNode;
      case 3:
        return e5.stateNode.containerInfo;
      default:
        throw Error(i2(559));
    }
  }
  var x2 = null, ee2 = null;
  function te2(e5, t3, n3) {
    return e5 === n3 || e5 === t3 && (x2 = e5, true);
  }
  function ne2(e5, t3, n3) {
    return e5 === n3 ? (ee2 = e5, false) : e5 === t3 && (ee2 !== null && (x2 = e5), true);
  }
  function S2(e5) {
    if (e5 === null) return null;
    do
      e5 = e5 === null ? null : e5.return;
    while (e5 && e5.tag !== 5 && e5.tag !== 27 && e5.tag !== 3);
    return e5 || null;
  }
  function re2(e5, t3, n3) {
    for (var r3 = 0, i3 = e5; i3; i3 = n3(i3)) r3++;
    i3 = 0;
    for (var a3 = t3; a3; a3 = n3(a3)) i3++;
    for (; 0 < r3 - i3; ) e5 = n3(e5), r3--;
    for (; 0 < i3 - r3; ) t3 = n3(t3), i3--;
    for (; r3--; ) {
      if (e5 === t3 || t3 !== null && e5 === t3.alternate) return e5;
      e5 = n3(e5), t3 = n3(t3);
    }
    return null;
  }
  var C2 = Object.assign, ie2 = /* @__PURE__ */ Symbol.for(`react.element`), ae2 = /* @__PURE__ */ Symbol.for(`react.transitional.element`), oe2 = /* @__PURE__ */ Symbol.for(`react.portal`), w2 = /* @__PURE__ */ Symbol.for(`react.fragment`), T2 = /* @__PURE__ */ Symbol.for(`react.strict_mode`), se2 = /* @__PURE__ */ Symbol.for(`react.profiler`), ce2 = /* @__PURE__ */ Symbol.for(`react.consumer`), le2 = /* @__PURE__ */ Symbol.for(`react.context`), ue2 = /* @__PURE__ */ Symbol.for(`react.forward_ref`), de2 = /* @__PURE__ */ Symbol.for(`react.suspense`), fe2 = /* @__PURE__ */ Symbol.for(`react.suspense_list`), pe2 = /* @__PURE__ */ Symbol.for(`react.memo`), me2 = /* @__PURE__ */ Symbol.for(`react.lazy`), he2 = /* @__PURE__ */ Symbol.for(`react.activity`), ge2 = /* @__PURE__ */ Symbol.for(`react.legacy_hidden`), _e2 = /* @__PURE__ */ Symbol.for(`react.memo_cache_sentinel`), ve2 = /* @__PURE__ */ Symbol.for(`react.view_transition`), ye2 = /* @__PURE__ */ Symbol.for(`react.recoverable`), be2 = Symbol.iterator;
  function xe2(e5) {
    return typeof e5 != `object` || !e5 ? null : (e5 = be2 && e5[be2] || e5[`@@iterator`], typeof e5 == `function` ? e5 : null);
  }
  var Se2 = /* @__PURE__ */ Symbol.for(`react.client.reference`);
  function Ce2(e5) {
    if (e5 == null) return null;
    if (typeof e5 == `function`) return e5.$$typeof === Se2 ? null : e5.displayName || e5.name || null;
    if (typeof e5 == `string`) return e5;
    switch (e5) {
      case w2:
        return `Fragment`;
      case se2:
        return `Profiler`;
      case T2:
        return `StrictMode`;
      case de2:
        return `Suspense`;
      case fe2:
        return `SuspenseList`;
      case he2:
        return `Activity`;
      case ve2:
        return `ViewTransition`;
    }
    if (typeof e5 == `object`) switch (e5.$$typeof) {
      case oe2:
        return `Portal`;
      case le2:
        return e5.displayName || `Context`;
      case ce2:
        return (e5._context.displayName || `Context`) + `.Consumer`;
      case ue2:
        var t3 = e5.render;
        return e5 = e5.displayName, e5 ||= (e5 = t3.displayName || t3.name || ``, e5 === `` ? `ForwardRef` : `ForwardRef(` + e5 + `)`), e5;
      case pe2:
        return t3 = e5.displayName || null, t3 === null ? Ce2(e5.type) || `Memo` : t3;
      case me2:
        t3 = e5._payload, e5 = e5._init;
        try {
          return Ce2(e5(t3));
        } catch {
        }
    }
    return null;
  }
  var we2 = Array.isArray, E2 = n2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D2 = r2.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Te2 = { pending: false, data: null, method: null, action: null }, Ee2 = [], De2 = -1;
  function Oe2(e5) {
    return { current: e5 };
  }
  function ke2(e5) {
    0 > De2 || (e5.current = Ee2[De2], Ee2[De2] = null, De2--);
  }
  function O2(e5, t3) {
    De2++, Ee2[De2] = e5.current, e5.current = t3;
  }
  var Ae2 = Oe2(null), je2 = Oe2(null), Me2 = Oe2(null), Ne2 = Oe2(null);
  function Pe2(e5, t3) {
    switch (O2(Me2, t3), O2(je2, e5), O2(Ae2, null), t3.nodeType) {
      case 9:
      case 11:
        e5 = (e5 = t3.documentElement) && (e5 = e5.namespaceURI) ? up(e5) : 0;
        break;
      default:
        if (e5 = t3.tagName, t3 = t3.namespaceURI) t3 = up(t3), e5 = dp(t3, e5);
        else switch (e5) {
          case `svg`:
            e5 = 1;
            break;
          case `math`:
            e5 = 2;
            break;
          default:
            e5 = 0;
        }
    }
    ke2(Ae2), O2(Ae2, e5);
  }
  function Fe2() {
    ke2(Ae2), ke2(je2), ke2(Me2);
  }
  function Ie2(e5) {
    var t3 = e5.memoizedState;
    t3 !== null && (sh._currentValue = t3.memoizedState, O2(Ne2, e5)), t3 = Ae2.current;
    var n3 = dp(t3, e5.type);
    t3 !== n3 && (O2(je2, e5), O2(Ae2, n3));
  }
  function Le2(e5) {
    je2.current === e5 && (ke2(Ae2), ke2(je2)), Ne2.current === e5 && (ke2(Ne2), sh._currentValue = Te2);
  }
  var Re2, ze2;
  function Be2(e5) {
    if (Re2 === void 0) try {
      throw Error();
    } catch (e6) {
      var t3 = e6.stack.trim().match(/\n( *(at )?)/);
      Re2 = t3 && t3[1] || ``, ze2 = -1 < e6.stack.indexOf(`
    at`) ? ` (<anonymous>)` : -1 < e6.stack.indexOf(`@`) ? `@unknown:0:0` : ``;
    }
    return `
` + Re2 + e5 + ze2;
  }
  var Ve2 = false;
  function He2(e5, t3) {
    if (!e5 || Ve2) return ``;
    Ve2 = true;
    var n3 = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r3 = { DetermineComponentFrameRoot: function() {
        try {
          if (t3) {
            var n4 = function() {
              throw Error();
            };
            if (Object.defineProperty(n4.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == `object` && Reflect.construct) {
              try {
                Reflect.construct(n4, []);
              } catch (e6) {
                var r4 = e6;
              }
              Reflect.construct(e5, [], n4);
            } else {
              try {
                n4.call();
              } catch (e6) {
                r4 = e6;
              }
              n4 = false;
              try {
                var i4 = Object.getOwnPropertyDescriptor(e5.prototype, `props`);
                Object.defineProperty(e5.prototype, "props", { configurable: true, set: function() {
                  throw Error();
                } }), n4 = true, new e5();
              } finally {
                n4 && (i4 === void 0 ? delete e5.prototype.props : Object.defineProperty(e5.prototype, "props", i4));
              }
            }
          } else {
            try {
              throw Error();
            } catch (e6) {
              r4 = e6;
            }
            (n4 = e5()) && typeof n4.catch == `function` && n4.catch(function() {
            });
          }
        } catch (e6) {
          if (e6 && r4 && typeof e6.stack == `string`) return [e6.stack, r4.stack];
        }
        return [null, null];
      } };
      r3.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
      var i3 = Object.getOwnPropertyDescriptor(r3.DetermineComponentFrameRoot, `name`);
      i3 && i3.configurable && Object.defineProperty(r3.DetermineComponentFrameRoot, "name", { value: `DetermineComponentFrameRoot` });
      var a3 = r3.DetermineComponentFrameRoot(), o3 = a3[0], s3 = a3[1];
      if (o3 && s3) {
        var c3 = o3.split(`
`), l3 = s3.split(`
`);
        for (i3 = r3 = 0; r3 < c3.length && !c3[r3].includes(`DetermineComponentFrameRoot`); ) r3++;
        for (; i3 < l3.length && !l3[i3].includes(`DetermineComponentFrameRoot`); ) i3++;
        if (r3 === c3.length || i3 === l3.length) for (r3 = c3.length - 1, i3 = l3.length - 1; 1 <= r3 && 0 <= i3 && c3[r3] !== l3[i3]; ) i3--;
        for (; 1 <= r3 && 0 <= i3; r3--, i3--) if (c3[r3] !== l3[i3]) {
          if (r3 !== 1 || i3 !== 1) do
            if (r3--, i3--, 0 > i3 || c3[r3] !== l3[i3]) {
              var u3 = `
` + c3[r3].replace(` at new `, ` at `);
              return e5.displayName && u3.includes(`<anonymous>`) && (u3 = u3.replace(`<anonymous>`, e5.displayName)), u3;
            }
          while (1 <= r3 && 0 <= i3);
          break;
        }
      }
    } finally {
      Ve2 = false, Error.prepareStackTrace = n3;
    }
    return (n3 = e5 ? e5.displayName || e5.name : ``) ? Be2(n3) : ``;
  }
  function Ue2(e5, t3) {
    switch (e5.tag) {
      case 26:
      case 27:
      case 5:
        return Be2(e5.type);
      case 16:
        return Be2(`Lazy`);
      case 13:
        return e5.child !== t3 && t3 !== null ? Be2(`Suspense Fallback`) : Be2(`Suspense`);
      case 19:
        return Be2(`SuspenseList`);
      case 0:
      case 15:
        return He2(e5.type, false);
      case 11:
        return He2(e5.type.render, false);
      case 1:
        return He2(e5.type, true);
      case 31:
        return Be2(`Activity`);
      case 30:
        return Be2(`ViewTransition`);
      default:
        return ``;
    }
  }
  function We2(e5) {
    try {
      var t3 = ``, n3 = null;
      do
        t3 += Ue2(e5, n3), n3 = e5, e5 = e5.return;
      while (e5);
      return t3;
    } catch (e6) {
      return `
Error generating stack: ` + e6.message + `
` + e6.stack;
    }
  }
  var Ge2 = Object.prototype.hasOwnProperty, Ke2 = t2.unstable_scheduleCallback, qe2 = t2.unstable_cancelCallback, Je2 = t2.unstable_shouldYield, Ye2 = t2.unstable_requestPaint, Xe2 = t2.unstable_now, Ze2 = t2.unstable_getCurrentPriorityLevel, Qe2 = t2.unstable_ImmediatePriority, $e2 = t2.unstable_UserBlockingPriority, et2 = t2.unstable_NormalPriority, tt2 = t2.unstable_LowPriority, nt2 = t2.unstable_IdlePriority, rt2 = t2.log, it2 = t2.unstable_setDisableYieldValue, at2 = null, ot2 = null;
  function st2(e5) {
    if (typeof rt2 == `function` && it2(e5), ot2 && typeof ot2.setStrictMode == `function`) try {
      ot2.setStrictMode(at2, e5);
    } catch {
    }
  }
  var ct2 = Math.clz32 ? Math.clz32 : dt2, lt2 = Math.log, ut2 = Math.LN2;
  function dt2(e5) {
    return e5 >>>= 0, e5 === 0 ? 32 : 31 - (lt2(e5) / ut2 | 0) | 0;
  }
  var ft2 = 256, pt2 = 262144, mt2 = 4194304;
  function ht2(e5) {
    var t3 = e5 & 42;
    if (t3 !== 0) return t3;
    switch (e5 & -e5) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e5 & -e5;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e5 & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e5 & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e5;
    }
  }
  function gt2(e5, t3, n3) {
    var r3 = e5.pendingLanes;
    if (r3 === 0) return 0;
    var i3 = 0, a3 = e5.suspendedLanes, o3 = e5.pingedLanes;
    e5 = e5.warmLanes;
    var s3 = r3 & 134217727;
    return s3 === 0 ? (s3 = r3 & ~a3, s3 === 0 ? o3 === 0 ? n3 || (n3 = r3 & ~e5, n3 !== 0 && (i3 = ht2(n3))) : i3 = ht2(o3) : i3 = ht2(s3)) : (r3 = s3 & ~a3, r3 === 0 ? (o3 &= s3, o3 === 0 ? n3 || (n3 = s3 & ~e5, n3 !== 0 && (i3 = ht2(n3))) : i3 = ht2(o3)) : i3 = ht2(r3)), i3 === 0 ? 0 : t3 !== 0 && t3 !== i3 && (t3 & a3) === 0 && (a3 = i3 & -i3, n3 = t3 & -t3, a3 >= n3 || a3 === 32 && n3 & 4194048) ? t3 : i3;
  }
  function _t2(e5, t3) {
    return (e5.pendingLanes & ~(e5.suspendedLanes & ~e5.pingedLanes) & t3) === 0;
  }
  function vt2(e5, t3) {
    t3 & 8 && (t3 |= t3 & 32);
    var n3 = e5.entangledLanes;
    if (n3 !== 0) for (e5 = e5.entanglements, n3 &= t3; 0 < n3; ) {
      var r3 = 31 - ct2(n3), i3 = 1 << r3;
      t3 |= e5[r3], n3 &= ~i3;
    }
    return t3;
  }
  function yt2(e5, t3) {
    switch (e5) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t3 + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t3 + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function bt2() {
    var e5 = mt2;
    return mt2 <<= 1, !(mt2 & 62914560) && (mt2 = 4194304), e5;
  }
  function xt2(e5) {
    for (var t3 = [], n3 = 0; 31 > n3; n3++) t3.push(e5);
    return t3;
  }
  function St2(e5, t3) {
    e5.pendingLanes |= t3, t3 !== 268435456 && (e5.suspendedLanes = 0, e5.pingedLanes = 0, e5.warmLanes = 0);
  }
  function Ct2(e5, t3, n3, r3, i3, a3) {
    var o3 = e5.pendingLanes;
    e5.pendingLanes = n3, e5.suspendedLanes = 0, e5.pingedLanes = 0, e5.warmLanes = 0, e5.expiredLanes &= n3, e5.entangledLanes &= n3, e5.errorRecoveryDisabledLanes &= n3, e5.shellSuspendCounter = 0;
    var s3 = e5.entanglements, c3 = e5.expirationTimes, l3 = e5.hiddenUpdates;
    for (n3 = o3 & ~n3; 0 < n3; ) {
      var u3 = 31 - ct2(n3), d2 = 1 << u3;
      s3[u3] = 0, c3[u3] = -1;
      var f3 = l3[u3];
      if (f3 !== null) for (l3[u3] = null, u3 = 0; u3 < f3.length; u3++) {
        var p2 = f3[u3];
        p2 !== null && (p2.lane &= -536870913);
      }
      n3 &= ~d2;
    }
    r3 !== 0 && wt2(e5, r3, 0), a3 !== 0 && i3 === 0 && e5.tag !== 0 && (e5.suspendedLanes |= a3 & ~(o3 & ~t3));
  }
  function wt2(e5, t3, n3) {
    e5.pendingLanes |= t3, e5.suspendedLanes &= ~t3;
    var r3 = 31 - ct2(t3);
    e5.entangledLanes |= t3, e5.entanglements[r3] = e5.entanglements[r3] | 1073741824 | n3 & 261930;
  }
  function Tt2(e5, t3) {
    var n3 = e5.entangledLanes |= t3;
    for (e5 = e5.entanglements; n3; ) {
      var r3 = 31 - ct2(n3), i3 = 1 << r3;
      i3 & t3 | e5[r3] & t3 && (e5[r3] |= t3), n3 &= ~i3;
    }
  }
  function Et2(e5, t3) {
    var n3 = t3 & -t3;
    return n3 = n3 & 42 ? 1 : Dt2(n3), (n3 & (e5.suspendedLanes | t3)) === 0 ? n3 : 0;
  }
  function Dt2(e5) {
    switch (e5) {
      case 2:
        e5 = 1;
        break;
      case 8:
        e5 = 4;
        break;
      case 32:
        e5 = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e5 = 128;
        break;
      case 268435456:
        e5 = 134217728;
        break;
      default:
        e5 = 0;
    }
    return e5;
  }
  function Ot2(e5) {
    return e5 &= -e5, 2 < e5 ? 8 < e5 ? e5 & 134217727 ? 32 : 268435456 : 8 : 2;
  }
  function kt2() {
    var e5 = D2.p;
    return e5 === 0 ? (e5 = window.event, e5 === void 0 ? 32 : Ch(e5.type)) : e5;
  }
  function At2(e5, t3) {
    var n3 = D2.p;
    try {
      return D2.p = e5, t3();
    } finally {
      D2.p = n3;
    }
  }
  var jt2 = Math.random().toString(36).slice(2), Mt2 = `__reactFiber$` + jt2, Nt2 = `__reactProps$` + jt2, Pt2 = `__reactContainer$` + jt2, Ft2 = `__reactEvents$` + jt2, It2 = `__reactListeners$` + jt2, Lt2 = `__reactHandles$` + jt2, Rt2 = `__reactResources$` + jt2, zt2 = `__reactMarker$` + jt2, Bt2 = `__reactLoad$` + jt2;
  function Vt2(e5) {
    delete e5[Mt2], delete e5[Nt2], delete e5[It2], delete e5[Lt2];
  }
  function Ht2(e5) {
    var t3;
    if (t3 = e5[Mt2]) return t3;
    for (var n3 = e5.parentNode; n3; ) {
      if (t3 = n3[Pt2] || n3[Mt2]) {
        if (n3 = t3.alternate, t3.child !== null || n3 !== null && n3.child !== null) for (e5 = fm(e5); e5 !== null; ) {
          if (n3 = e5[Mt2]) return n3;
          e5 = fm(e5);
        }
        return t3;
      }
      e5 = n3, n3 = e5.parentNode;
    }
    return null;
  }
  function Ut2(e5) {
    if (e5 = e5[Mt2] || e5[Pt2]) {
      var t3 = e5.tag;
      if (t3 === 5 || t3 === 6 || t3 === 13 || t3 === 31 || t3 === 26 || t3 === 27 || t3 === 3) return e5;
    }
    return null;
  }
  function Wt2(e5) {
    var t3 = e5.tag;
    if (t3 === 5 || t3 === 26 || t3 === 27 || t3 === 6) return e5.stateNode;
    throw Error(i2(33));
  }
  function Gt2(e5) {
    var t3 = e5[Rt2];
    return t3 ||= e5[Rt2] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }, t3;
  }
  function Kt2(e5) {
    e5[zt2] = true;
  }
  function qt2(e5) {
    e5[Bt2] = void 0;
  }
  var Jt2 = /* @__PURE__ */ new Set(), Yt2 = {};
  function Xt2(e5, t3) {
    Zt2(e5, t3), Zt2(e5 + `Capture`, t3);
  }
  function Zt2(e5, t3) {
    for (Yt2[e5] = t3, e5 = 0; e5 < t3.length; e5++) Jt2.add(t3[e5]);
  }
  var Qt2 = RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`), $t2 = {}, en2 = {};
  function tn2(e5) {
    return Ge2.call(en2, e5) ? true : Ge2.call($t2, e5) ? false : Qt2.test(e5) ? en2[e5] = true : ($t2[e5] = true, false);
  }
  var k2 = false;
  function nn2() {
    var e5 = k2;
    return k2 = false, e5;
  }
  function rn2(e5, t3, n3) {
    if (tn2(t3)) {
      if (n3 === null) e5.removeAttribute(t3);
      else {
        switch (typeof n3) {
          case `undefined`:
          case `function`:
          case `symbol`:
            e5.removeAttribute(t3);
            return;
          case `boolean`:
            var r3 = t3.toLowerCase().slice(0, 5);
            if (r3 !== `data-` && r3 !== `aria-`) {
              e5.removeAttribute(t3);
              return;
            }
        }
        e5.setAttribute(t3, n3);
      }
    }
  }
  function an2(e5, t3, n3) {
    if (n3 === null) e5.removeAttribute(t3);
    else {
      switch (typeof n3) {
        case `undefined`:
        case `function`:
        case `symbol`:
        case `boolean`:
          e5.removeAttribute(t3);
          return;
      }
      e5.setAttribute(t3, n3);
    }
  }
  function on2(e5, t3, n3, r3) {
    if (r3 === null) e5.removeAttribute(n3);
    else {
      switch (typeof r3) {
        case `undefined`:
        case `function`:
        case `symbol`:
        case `boolean`:
          e5.removeAttribute(n3);
          return;
      }
      e5.setAttributeNS(t3, n3, r3);
    }
  }
  function sn2(e5) {
    switch (typeof e5) {
      case `bigint`:
      case `boolean`:
      case `number`:
      case `string`:
      case `undefined`:
        return e5;
      case `object`:
        return e5;
      default:
        return ``;
    }
  }
  function cn2(e5) {
    var t3 = e5.type;
    return (e5 = e5.nodeName) && e5.toLowerCase() === `input` && (t3 === `checkbox` || t3 === `radio`);
  }
  function ln2(e5, t3, n3) {
    var r3 = Object.getOwnPropertyDescriptor(e5.constructor.prototype, t3);
    if (!e5.hasOwnProperty(t3) && r3 !== void 0 && typeof r3.get == `function` && typeof r3.set == `function`) {
      var i3 = r3.get, a3 = r3.set;
      return Object.defineProperty(e5, t3, { configurable: true, get: function() {
        return i3.call(this);
      }, set: function(e6) {
        n3 = `` + e6, a3.call(this, e6);
      } }), Object.defineProperty(e5, t3, { enumerable: r3.enumerable }), { getValue: function() {
        return n3;
      }, setValue: function(e6) {
        n3 = `` + e6;
      }, stopTracking: function() {
        e5._valueTracker = null, delete e5[t3];
      } };
    }
  }
  function un2(e5) {
    if (!e5._valueTracker) {
      var t3 = cn2(e5) ? `checked` : `value`;
      e5._valueTracker = ln2(e5, t3, `` + e5[t3]);
    }
  }
  function dn2(e5) {
    if (!e5) return false;
    var t3 = e5._valueTracker;
    if (!t3) return true;
    var n3 = t3.getValue(), r3 = ``;
    return e5 && (r3 = cn2(e5) ? e5.checked ? `true` : `false` : e5.value), e5 = r3, e5 !== n3 && (t3.setValue(e5), true);
  }
  var fn2 = /[\n"\\]/g;
  function pn2(e5) {
    return e5.replace(fn2, function(e6) {
      return `\\` + e6.charCodeAt(0).toString(16) + ` `;
    });
  }
  function mn2(e5, t3, n3, r3, i3, a3, o3, s3) {
    e5.name = ``, o3 != null && typeof o3 != `function` && typeof o3 != `symbol` && typeof o3 != `boolean` ? e5.type = o3 : e5.removeAttribute(`type`), t3 == null ? o3 !== `submit` && o3 !== `reset` || e5.removeAttribute(`value`) : o3 === `number` ? (t3 === 0 && e5.value === `` || e5.value != t3) && (e5.value = `` + sn2(t3)) : e5.value !== `` + sn2(t3) && (e5.value = `` + sn2(t3)), t3 == null ? n3 == null ? r3 != null && e5.removeAttribute(`value`) : gn2(e5, sn2(n3)) : o3 === `number` && e5.value == t3 ? gn2(e5, sn2(e5.value)) : gn2(e5, sn2(t3)), i3 == null && a3 != null && (e5.defaultChecked = !!a3), i3 != null && (e5.checked = i3 && typeof i3 != `function` && typeof i3 != `symbol`), s3 != null && typeof s3 != `function` && typeof s3 != `symbol` && typeof s3 != `boolean` ? e5.name = `` + sn2(s3) : e5.removeAttribute(`name`);
  }
  function hn2(e5, t3, n3, r3, i3, a3, o3, s3) {
    if (a3 != null && typeof a3 != `function` && typeof a3 != `symbol` && typeof a3 != `boolean` && (e5.type = a3), t3 != null || n3 != null) {
      if (!(a3 !== `submit` && a3 !== `reset` || t3 != null)) {
        un2(e5);
        return;
      }
      n3 = n3 == null ? `` : `` + sn2(n3), t3 = t3 == null ? n3 : `` + sn2(t3), s3 || t3 === e5.value || (e5.value = t3), e5.defaultValue = t3;
    }
    r3 ??= i3, r3 = typeof r3 != `function` && typeof r3 != `symbol` && !!r3, e5.checked = s3 ? e5.checked : !!r3, e5.defaultChecked = !!r3, o3 != null && typeof o3 != `function` && typeof o3 != `symbol` && typeof o3 != `boolean` && (e5.name = o3), un2(e5);
  }
  function gn2(e5, t3) {
    e5.defaultValue !== `` + t3 && (e5.defaultValue = `` + t3);
  }
  function _n2(e5, t3, n3, r3) {
    if (e5 = e5.options, t3) {
      t3 = {};
      for (var i3 = 0; i3 < n3.length; i3++) t3[`$` + n3[i3]] = true;
      for (n3 = 0; n3 < e5.length; n3++) i3 = t3.hasOwnProperty(`$` + e5[n3].value), e5[n3].selected !== i3 && (e5[n3].selected = i3), i3 && r3 && (e5[n3].defaultSelected = true);
    } else {
      for (n3 = `` + sn2(n3), t3 = null, i3 = 0; i3 < e5.length; i3++) {
        if (e5[i3].value === n3) {
          e5[i3].selected = true, r3 && (e5[i3].defaultSelected = true);
          return;
        }
        t3 !== null || e5[i3].disabled || (t3 = e5[i3]);
      }
      t3 !== null && (t3.selected = true);
    }
  }
  function vn2(e5, t3, n3) {
    if (t3 != null && (t3 = `` + sn2(t3), t3 !== e5.value && (e5.value = t3), n3 == null)) {
      e5.defaultValue !== t3 && (e5.defaultValue = t3);
      return;
    }
    e5.defaultValue = n3 == null ? `` : `` + sn2(n3);
  }
  function yn2(e5, t3, n3, r3) {
    if (t3 == null) {
      if (r3 != null) {
        if (n3 != null) throw Error(i2(92));
        if (we2(r3)) {
          if (1 < r3.length) throw Error(i2(93));
          r3 = r3[0];
        }
        n3 = r3;
      }
      n3 ??= ``, t3 = n3;
    }
    n3 = sn2(t3), e5.defaultValue = n3, r3 = e5.textContent, r3 === n3 && r3 !== `` && r3 !== null && (e5.value = r3), un2(e5);
  }
  function bn2(e5, t3) {
    if (t3) {
      var n3 = e5.firstChild;
      if (n3 && n3 === e5.lastChild && n3.nodeType === 3) {
        n3.nodeValue = t3;
        return;
      }
    }
    e5.textContent = t3;
  }
  var xn2 = new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));
  function Sn2(e5, t3, n3) {
    var r3 = t3.indexOf(`--`) === 0;
    n3 == null || typeof n3 == `boolean` || n3 === `` ? r3 ? e5.setProperty(t3, ``) : t3 === `float` ? e5.cssFloat = `` : e5[t3] = `` : r3 ? e5.setProperty(t3, n3) : typeof n3 != `number` || n3 === 0 || xn2.has(t3) ? t3 === `float` ? e5.cssFloat = n3 : e5[t3] = (`` + n3).trim() : e5[t3] = n3 + `px`;
  }
  function Cn2(e5, t3, n3) {
    if (t3 != null && typeof t3 != `object`) throw Error(i2(62));
    if (e5 = e5.style, n3 != null) {
      for (var r3 in n3) !n3.hasOwnProperty(r3) || t3 != null && t3.hasOwnProperty(r3) || (r3.indexOf(`--`) === 0 ? e5.setProperty(r3, ``) : r3 === `float` ? e5.cssFloat = `` : e5[r3] = ``, k2 = true);
      for (var a3 in t3) r3 = t3[a3], t3.hasOwnProperty(a3) && n3[a3] !== r3 && (Sn2(e5, a3, r3), k2 = true);
    } else for (var o3 in t3) t3.hasOwnProperty(o3) && Sn2(e5, o3, t3[o3]);
  }
  function wn2(e5) {
    if (e5.indexOf(`-`) === -1) return false;
    switch (e5) {
      case `annotation-xml`:
      case `color-profile`:
      case `font-face`:
      case `font-face-src`:
      case `font-face-uri`:
      case `font-face-format`:
      case `font-face-name`:
      case `missing-glyph`:
        return false;
      default:
        return true;
    }
  }
  var Tn2 = /* @__PURE__ */ new Map([[`acceptCharset`, `accept-charset`], [`htmlFor`, `for`], [`httpEquiv`, `http-equiv`], [`crossOrigin`, `crossorigin`], [`accentHeight`, `accent-height`], [`alignmentBaseline`, `alignment-baseline`], [`arabicForm`, `arabic-form`], [`baselineShift`, `baseline-shift`], [`capHeight`, `cap-height`], [`clipPath`, `clip-path`], [`clipRule`, `clip-rule`], [`colorInterpolation`, `color-interpolation`], [`colorInterpolationFilters`, `color-interpolation-filters`], [`colorProfile`, `color-profile`], [`colorRendering`, `color-rendering`], [`dominantBaseline`, `dominant-baseline`], [`enableBackground`, `enable-background`], [`fillOpacity`, `fill-opacity`], [`fillRule`, `fill-rule`], [`floodColor`, `flood-color`], [`floodOpacity`, `flood-opacity`], [`fontFamily`, `font-family`], [`fontSize`, `font-size`], [`fontSizeAdjust`, `font-size-adjust`], [`fontStretch`, `font-stretch`], [`fontStyle`, `font-style`], [`fontVariant`, `font-variant`], [`fontWeight`, `font-weight`], [`glyphName`, `glyph-name`], [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`], [`glyphOrientationVertical`, `glyph-orientation-vertical`], [`horizAdvX`, `horiz-adv-x`], [`horizOriginX`, `horiz-origin-x`], [`imageRendering`, `image-rendering`], [`letterSpacing`, `letter-spacing`], [`lightingColor`, `lighting-color`], [`markerEnd`, `marker-end`], [`markerMid`, `marker-mid`], [`markerStart`, `marker-start`], [`maskType`, `mask-type`], [`overlinePosition`, `overline-position`], [`overlineThickness`, `overline-thickness`], [`paintOrder`, `paint-order`], [`panose-1`, `panose-1`], [`pointerEvents`, `pointer-events`], [`renderingIntent`, `rendering-intent`], [`shapeRendering`, `shape-rendering`], [`stopColor`, `stop-color`], [`stopOpacity`, `stop-opacity`], [`strikethroughPosition`, `strikethrough-position`], [`strikethroughThickness`, `strikethrough-thickness`], [`strokeDasharray`, `stroke-dasharray`], [`strokeDashoffset`, `stroke-dashoffset`], [`strokeLinecap`, `stroke-linecap`], [`strokeLinejoin`, `stroke-linejoin`], [`strokeMiterlimit`, `stroke-miterlimit`], [`strokeOpacity`, `stroke-opacity`], [`strokeWidth`, `stroke-width`], [`textAnchor`, `text-anchor`], [`textDecoration`, `text-decoration`], [`textRendering`, `text-rendering`], [`transformOrigin`, `transform-origin`], [`underlinePosition`, `underline-position`], [`underlineThickness`, `underline-thickness`], [`unicodeBidi`, `unicode-bidi`], [`unicodeRange`, `unicode-range`], [`unitsPerEm`, `units-per-em`], [`vAlphabetic`, `v-alphabetic`], [`vHanging`, `v-hanging`], [`vIdeographic`, `v-ideographic`], [`vMathematical`, `v-mathematical`], [`vectorEffect`, `vector-effect`], [`vertAdvY`, `vert-adv-y`], [`vertOriginX`, `vert-origin-x`], [`vertOriginY`, `vert-origin-y`], [`wordSpacing`, `word-spacing`], [`writingMode`, `writing-mode`], [`xmlnsXlink`, `xmlns:xlink`], [`xHeight`, `x-height`]]), En2 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Dn2(e5) {
    return En2.test(`` + e5) ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')` : e5;
  }
  function On2() {
  }
  var kn2 = null;
  function An2(e5) {
    return e5 = e5.target || e5.srcElement || window, e5.correspondingUseElement && (e5 = e5.correspondingUseElement), e5.nodeType === 3 ? e5.parentNode : e5;
  }
  var jn2 = null, Mn2 = null;
  function Nn2(e5) {
    var t3 = Ut2(e5);
    if (t3 && (e5 = t3.stateNode)) {
      var n3 = e5[Nt2] || null;
      a: switch (e5 = t3.stateNode, t3.type) {
        case `input`:
          if (mn2(e5, n3.value, n3.defaultValue, n3.defaultValue, n3.checked, n3.defaultChecked, n3.type, n3.name), t3 = n3.name, n3.type === `radio` && t3 != null) {
            for (n3 = e5; n3.parentNode; ) n3 = n3.parentNode;
            for (n3 = n3.querySelectorAll(`input[name="` + pn2(`` + t3) + `"][type="radio"]`), t3 = 0; t3 < n3.length; t3++) {
              var r3 = n3[t3];
              if (r3 !== e5 && r3.form === e5.form) {
                var a3 = r3[Nt2] || null;
                if (!a3) throw Error(i2(90));
                mn2(r3, a3.value, a3.defaultValue, a3.defaultValue, a3.checked, a3.defaultChecked, a3.type, a3.name);
              }
            }
            for (t3 = 0; t3 < n3.length; t3++) r3 = n3[t3], r3.form === e5.form && dn2(r3);
          }
          break a;
        case `textarea`:
          vn2(e5, n3.value, n3.defaultValue);
          break a;
        case `select`:
          t3 = n3.value, t3 != null && _n2(e5, !!n3.multiple, t3, false);
      }
    }
  }
  var Pn2 = false;
  function Fn2(e5, t3, n3) {
    if (Pn2) return e5(t3, n3);
    Pn2 = true;
    try {
      return e5(t3);
    } finally {
      if (Pn2 = false, (jn2 !== null || Mn2 !== null) && (zd(), jn2 && (t3 = jn2, e5 = Mn2, Mn2 = jn2 = null, Nn2(t3), e5))) for (t3 = 0; t3 < e5.length; t3++) Nn2(e5[t3]);
    }
  }
  function A2(e5, t3) {
    var n3 = e5.stateNode;
    if (n3 === null) return null;
    var r3 = n3[Nt2] || null;
    if (r3 === null) return null;
    n3 = r3[t3];
    a: switch (t3) {
      case `onClick`:
      case `onClickCapture`:
      case `onDoubleClick`:
      case `onDoubleClickCapture`:
      case `onMouseDown`:
      case `onMouseDownCapture`:
      case `onMouseMove`:
      case `onMouseMoveCapture`:
      case `onMouseUp`:
      case `onMouseUpCapture`:
      case `onMouseEnter`:
        (r3 = !r3.disabled) || (e5 = e5.type, r3 = e5 !== `button` && e5 !== `input` && e5 !== `select` && e5 !== `textarea`), e5 = !r3;
        break a;
      default:
        e5 = false;
    }
    if (e5) return null;
    if (n3 && typeof n3 != `function`) throw Error(i2(231, t3, typeof n3));
    return n3;
  }
  var In2 = typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0, Ln2 = false;
  if (In2) try {
    var Rn2 = {};
    Object.defineProperty(Rn2, "passive", { get: function() {
      Ln2 = true;
    } }), window.addEventListener(`test`, Rn2, Rn2), window.removeEventListener(`test`, Rn2, Rn2);
  } catch {
    Ln2 = false;
  }
  var zn2 = null, Bn2 = null, Vn2 = null;
  function Hn2() {
    if (Vn2) return Vn2;
    var e5, t3 = Bn2, n3 = t3.length, r3, i3 = `value` in zn2 ? zn2.value : zn2.textContent, a3 = i3.length;
    for (e5 = 0; e5 < n3 && t3[e5] === i3[e5]; e5++) ;
    var o3 = n3 - e5;
    for (r3 = 1; r3 <= o3 && t3[n3 - r3] === i3[a3 - r3]; r3++) ;
    return Vn2 = i3.slice(e5, 1 < r3 ? 1 - r3 : void 0);
  }
  function Un2(e5) {
    var t3 = e5.keyCode;
    return `charCode` in e5 ? (e5 = e5.charCode, e5 === 0 && t3 === 13 && (e5 = 13)) : e5 = t3, e5 === 10 && (e5 = 13), 32 <= e5 || e5 === 13 ? e5 : 0;
  }
  function Wn2() {
    return true;
  }
  function Gn2() {
    return false;
  }
  function Kn2(e5) {
    function t3(t4, n3, r3, i3, a3) {
      for (var o3 in this._reactName = t4, this._targetInst = r3, this.type = n3, this.nativeEvent = i3, this.target = a3, this.currentTarget = null, e5) e5.hasOwnProperty(o3) && (t4 = e5[o3], this[o3] = t4 ? t4(i3) : i3[o3]);
      return this.isDefaultPrevented = (i3.defaultPrevented == null ? false === i3.returnValue : i3.defaultPrevented) ? Wn2 : Gn2, this.isPropagationStopped = Gn2, this;
    }
    return C2(t3.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var e6 = this.nativeEvent;
      e6 && (e6.preventDefault ? e6.preventDefault() : typeof e6.returnValue != `unknown` && (e6.returnValue = false), this.isDefaultPrevented = Wn2);
    }, stopPropagation: function() {
      var e6 = this.nativeEvent;
      e6 && (e6.stopPropagation ? e6.stopPropagation() : typeof e6.cancelBubble != `unknown` && (e6.cancelBubble = true), this.isPropagationStopped = Wn2);
    }, persist: function() {
    }, isPersistent: Wn2 }), t3;
  }
  var qn2 = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e5) {
    return e5.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Jn2 = Kn2(qn2), Yn2 = C2({}, qn2, { view: 0, detail: 0 }), Xn2 = Kn2(Yn2), Zn2, Qn2, $n2, er2 = C2({}, Yn2, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: dr2, button: 0, buttons: 0, relatedTarget: function(e5) {
    return e5.relatedTarget === void 0 ? e5.fromElement === e5.srcElement ? e5.toElement : e5.fromElement : e5.relatedTarget;
  }, movementX: function(e5) {
    return `movementX` in e5 ? e5.movementX : (e5 !== $n2 && ($n2 && e5.type === `mousemove` ? (Zn2 = e5.screenX - $n2.screenX, Qn2 = e5.screenY - $n2.screenY) : Qn2 = Zn2 = 0, $n2 = e5), Zn2);
  }, movementY: function(e5) {
    return `movementY` in e5 ? e5.movementY : Qn2;
  } }), tr2 = Kn2(er2), nr2 = Kn2(C2({}, er2, { dataTransfer: 0 })), rr2 = Kn2(C2({}, Yn2, { relatedTarget: 0 })), ir2 = Kn2(C2({}, qn2, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })), ar2 = Kn2(C2({}, qn2, { clipboardData: function(e5) {
    return `clipboardData` in e5 ? e5.clipboardData : window.clipboardData;
  } })), or2 = Kn2(C2({}, qn2, { data: 0 })), sr2 = { Esc: `Escape`, Spacebar: ` `, Left: `ArrowLeft`, Up: `ArrowUp`, Right: `ArrowRight`, Down: `ArrowDown`, Del: `Delete`, Win: `OS`, Menu: `ContextMenu`, Apps: `ContextMenu`, Scroll: `ScrollLock`, MozPrintableKey: `Unidentified` }, cr2 = { 8: `Backspace`, 9: `Tab`, 12: `Clear`, 13: `Enter`, 16: `Shift`, 17: `Control`, 18: `Alt`, 19: `Pause`, 20: `CapsLock`, 27: `Escape`, 32: ` `, 33: `PageUp`, 34: `PageDown`, 35: `End`, 36: `Home`, 37: `ArrowLeft`, 38: `ArrowUp`, 39: `ArrowRight`, 40: `ArrowDown`, 45: `Insert`, 46: `Delete`, 112: `F1`, 113: `F2`, 114: `F3`, 115: `F4`, 116: `F5`, 117: `F6`, 118: `F7`, 119: `F8`, 120: `F9`, 121: `F10`, 122: `F11`, 123: `F12`, 144: `NumLock`, 145: `ScrollLock`, 224: `Meta` }, lr2 = { Alt: `altKey`, Control: `ctrlKey`, Meta: `metaKey`, Shift: `shiftKey` };
  function ur2(e5) {
    var t3 = this.nativeEvent;
    return t3.getModifierState ? t3.getModifierState(e5) : (e5 = lr2[e5]) ? !!t3[e5] : false;
  }
  function dr2() {
    return ur2;
  }
  var fr2 = Kn2(C2({}, Yn2, { key: function(e5) {
    if (e5.key) {
      var t3 = sr2[e5.key] || e5.key;
      if (t3 !== `Unidentified`) return t3;
    }
    return e5.type === `keypress` ? (e5 = Un2(e5), e5 === 13 ? `Enter` : String.fromCharCode(e5)) : e5.type === `keydown` || e5.type === `keyup` ? cr2[e5.keyCode] || `Unidentified` : ``;
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: dr2, charCode: function(e5) {
    return e5.type === `keypress` ? Un2(e5) : 0;
  }, keyCode: function(e5) {
    return e5.type === `keydown` || e5.type === `keyup` ? e5.keyCode : 0;
  }, which: function(e5) {
    return e5.type === `keypress` ? Un2(e5) : e5.type === `keydown` || e5.type === `keyup` ? e5.keyCode : 0;
  } })), pr2 = Kn2(C2({}, er2, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), mr2 = Kn2(C2({}, qn2, { submitter: 0 })), hr2 = Kn2(C2({}, Yn2, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: dr2 })), gr2 = Kn2(C2({}, qn2, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })), _r2 = Kn2(C2({}, er2, { deltaX: function(e5) {
    return `deltaX` in e5 ? e5.deltaX : `wheelDeltaX` in e5 ? -e5.wheelDeltaX : 0;
  }, deltaY: function(e5) {
    return `deltaY` in e5 ? e5.deltaY : `wheelDeltaY` in e5 ? -e5.wheelDeltaY : `wheelDelta` in e5 ? -e5.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 })), vr2 = Kn2(C2({}, qn2, { newState: 0, oldState: 0, source: 0 })), yr2 = [9, 13, 27, 32], br2 = In2 && `CompositionEvent` in window, xr2 = null;
  In2 && `documentMode` in document && (xr2 = document.documentMode);
  var Sr2 = In2 && `TextEvent` in window && !xr2, Cr2 = In2 && (!br2 || xr2 && 8 < xr2 && 11 >= xr2), wr2 = ` `, Tr2 = false;
  function Er2(e5, t3) {
    switch (e5) {
      case `keyup`:
        return yr2.indexOf(t3.keyCode) !== -1;
      case `keydown`:
        return t3.keyCode !== 229;
      case `keypress`:
      case `mousedown`:
      case `focusout`:
        return true;
      default:
        return false;
    }
  }
  function Dr2(e5) {
    return e5 = e5.detail, typeof e5 == `object` && `data` in e5 ? e5.data : null;
  }
  var Or2 = false;
  function kr2(e5, t3) {
    switch (e5) {
      case `compositionend`:
        return Dr2(t3);
      case `keypress`:
        return t3.which === 32 ? (Tr2 = true, wr2) : null;
      case `textInput`:
        return e5 = t3.data, e5 === wr2 && Tr2 ? null : e5;
      default:
        return null;
    }
  }
  function Ar2(e5, t3) {
    if (Or2) return e5 === `compositionend` || !br2 && Er2(e5, t3) ? (e5 = Hn2(), Vn2 = Bn2 = zn2 = null, Or2 = false, e5) : null;
    switch (e5) {
      case `paste`:
        return null;
      case `keypress`:
        if (!(t3.ctrlKey || t3.altKey || t3.metaKey) || t3.ctrlKey && t3.altKey) {
          if (t3.char && 1 < t3.char.length) return t3.char;
          if (t3.which) return String.fromCharCode(t3.which);
        }
        return null;
      case `compositionend`:
        return Cr2 && t3.locale !== `ko` ? null : t3.data;
      default:
        return null;
    }
  }
  var jr2 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function Mr2(e5) {
    var t3 = e5 && e5.nodeName && e5.nodeName.toLowerCase();
    return t3 === `input` ? !!jr2[e5.type] : t3 === `textarea`;
  }
  function Nr2(e5, t3, n3, r3) {
    jn2 ? Mn2 ? Mn2.push(r3) : Mn2 = [r3] : jn2 = r3, t3 = Jf(t3, `onChange`), 0 < t3.length && (n3 = new Jn2(`onChange`, `change`, null, n3, r3), e5.push({ event: n3, listeners: t3 }));
  }
  var Pr2 = null, Fr2 = null;
  function Ir2(e5) {
    Vf(e5, 0);
  }
  function Lr2(e5) {
    if (dn2(Wt2(e5))) return e5;
  }
  function Rr2(e5, t3) {
    if (e5 === `change`) return t3;
  }
  var zr2 = false;
  if (In2) {
    var Br2;
    if (In2) {
      var Vr2 = `oninput` in document;
      if (!Vr2) {
        var Hr2 = document.createElement(`div`);
        Hr2.setAttribute(`oninput`, `return;`), Vr2 = typeof Hr2.oninput == `function`;
      }
      Br2 = Vr2;
    } else Br2 = false;
    zr2 = Br2 && (!document.documentMode || 9 < document.documentMode);
  }
  function Ur2() {
    Pr2 && (Pr2.detachEvent(`onpropertychange`, Wr2), Fr2 = Pr2 = null);
  }
  function Wr2(e5) {
    if (e5.propertyName === `value` && Lr2(Fr2)) {
      var t3 = [];
      Nr2(t3, Fr2, e5, An2(e5)), Fn2(Ir2, t3);
    }
  }
  function Gr2(e5, t3, n3) {
    e5 === `focusin` ? (Ur2(), Pr2 = t3, Fr2 = n3, Pr2.attachEvent(`onpropertychange`, Wr2)) : e5 === `focusout` && Ur2();
  }
  function Kr2(e5) {
    if (e5 === `selectionchange` || e5 === `keyup` || e5 === `keydown`) return Lr2(Fr2);
  }
  function qr2(e5, t3) {
    if (e5 === `click`) return Lr2(t3);
  }
  function Jr2(e5, t3) {
    if (e5 === `input` || e5 === `change`) return Lr2(t3);
  }
  function Yr2(e5, t3) {
    return e5 === t3 && (e5 !== 0 || 1 / e5 == 1 / t3) || e5 !== e5 && t3 !== t3;
  }
  var Xr2 = typeof Object.is == `function` ? Object.is : Yr2;
  function Zr2(e5, t3) {
    if (Xr2(e5, t3)) return true;
    if (typeof e5 != `object` || !e5 || typeof t3 != `object` || !t3) return false;
    var n3 = Object.keys(e5), r3 = Object.keys(t3);
    if (n3.length !== r3.length) return false;
    for (r3 = 0; r3 < n3.length; r3++) {
      var i3 = n3[r3];
      if (!Ge2.call(t3, i3) || !Xr2(e5[i3], t3[i3])) return false;
    }
    return true;
  }
  function Qr2(e5) {
    if (e5 ||= typeof document < `u` ? document : void 0, e5 === void 0) return null;
    try {
      return e5.activeElement || e5.body;
    } catch {
      return e5.body;
    }
  }
  function $r2(e5) {
    for (; e5 && e5.firstChild; ) e5 = e5.firstChild;
    return e5;
  }
  function ei2(e5, t3) {
    var n3 = $r2(e5);
    e5 = 0;
    for (var r3; n3; ) {
      if (n3.nodeType === 3) {
        if (r3 = e5 + n3.textContent.length, e5 <= t3 && r3 >= t3) return { node: n3, offset: t3 - e5 };
        e5 = r3;
      }
      a: {
        for (; n3; ) {
          if (n3.nextSibling) {
            n3 = n3.nextSibling;
            break a;
          }
          n3 = n3.parentNode;
        }
        n3 = void 0;
      }
      n3 = $r2(n3);
    }
  }
  function ti2(e5, t3) {
    return e5 && t3 ? e5 === t3 ? true : e5 && e5.nodeType === 3 ? false : t3 && t3.nodeType === 3 ? ti2(e5, t3.parentNode) : `contains` in e5 ? e5.contains(t3) : e5.compareDocumentPosition ? !!(e5.compareDocumentPosition(t3) & 16) : false : false;
  }
  function ni2(e5) {
    e5 = e5 != null && e5.ownerDocument != null && e5.ownerDocument.defaultView != null ? e5.ownerDocument.defaultView : window;
    for (var t3 = Qr2(e5.document); t3 instanceof e5.HTMLIFrameElement; ) {
      try {
        var n3 = typeof t3.contentWindow.location.href == `string`;
      } catch {
        n3 = false;
      }
      if (n3) e5 = t3.contentWindow;
      else break;
      t3 = Qr2(e5.document);
    }
    return t3;
  }
  function ri2(e5) {
    var t3 = e5 && e5.nodeName && e5.nodeName.toLowerCase();
    return t3 && (t3 === `input` && (e5.type === `text` || e5.type === `search` || e5.type === `tel` || e5.type === `url` || e5.type === `password`) || t3 === `textarea` || e5.contentEditable === `true`);
  }
  var ii2 = In2 && `documentMode` in document && 11 >= document.documentMode, ai2 = null, oi2 = null, si2 = null, ci2 = false;
  function li2(e5, t3, n3) {
    var r3 = n3.window === n3 ? n3.document : n3.nodeType === 9 ? n3 : n3.ownerDocument;
    ci2 || ai2 == null || ai2 !== Qr2(r3) || (r3 = ai2, `selectionStart` in r3 && ri2(r3) ? r3 = { start: r3.selectionStart, end: r3.selectionEnd } : (r3 = (r3.ownerDocument && r3.ownerDocument.defaultView || window).getSelection(), r3 = { anchorNode: r3.anchorNode, anchorOffset: r3.anchorOffset, focusNode: r3.focusNode, focusOffset: r3.focusOffset }), si2 && Zr2(si2, r3) || (si2 = r3, r3 = Jf(oi2, `onSelect`), 0 < r3.length && (t3 = new Jn2(`onSelect`, `select`, null, t3, n3), e5.push({ event: t3, listeners: r3 }), t3.target = ai2)));
  }
  function ui2(e5, t3) {
    var n3 = {};
    return n3[e5.toLowerCase()] = t3.toLowerCase(), n3[`Webkit` + e5] = `webkit` + t3, n3[`Moz` + e5] = `moz` + t3, n3;
  }
  var di2 = { animationend: ui2(`Animation`, `AnimationEnd`), animationiteration: ui2(`Animation`, `AnimationIteration`), animationstart: ui2(`Animation`, `AnimationStart`), transitionrun: ui2(`Transition`, `TransitionRun`), transitionstart: ui2(`Transition`, `TransitionStart`), transitioncancel: ui2(`Transition`, `TransitionCancel`), transitionend: ui2(`Transition`, `TransitionEnd`) }, fi2 = {}, j2 = {};
  In2 && (j2 = document.createElement(`div`).style, `AnimationEvent` in window || (delete di2.animationend.animation, delete di2.animationiteration.animation, delete di2.animationstart.animation), `TransitionEvent` in window || delete di2.transitionend.transition);
  function pi2(e5) {
    if (fi2[e5]) return fi2[e5];
    if (!di2[e5]) return e5;
    var t3 = di2[e5], n3;
    for (n3 in t3) if (t3.hasOwnProperty(n3) && n3 in j2) return fi2[e5] = t3[n3];
    return e5;
  }
  var mi2 = pi2(`animationend`), hi2 = pi2(`animationiteration`), gi2 = pi2(`animationstart`), _i2 = pi2(`transitionrun`), vi2 = pi2(`transitionstart`), yi2 = pi2(`transitioncancel`), bi2 = pi2(`transitionend`), xi2 = /* @__PURE__ */ new Map(), Si2 = `abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);
  Si2.push(`scrollEnd`);
  function Ci2(e5, t3) {
    xi2.set(e5, t3), Xt2(t3, [e5]);
  }
  var wi2 = 0;
  function Ti2(e5, t3) {
    if (e5.name != null && e5.name !== `auto`) return e5.name;
    if (t3.autoName !== null) return t3.autoName;
    e5 = bd.identifierPrefix;
    var n3 = wi2++;
    return e5 = `_` + e5 + `t_` + n3.toString(32) + `_`, t3.autoName = e5;
  }
  function Ei2(e5) {
    if (e5 == null || typeof e5 == `string`) return e5;
    var t3 = null, n3 = Od;
    if (n3 !== null) for (var r3 = 0; r3 < n3.length; r3++) {
      var i3 = e5[n3[r3]];
      if (i3 != null) {
        if (i3 === `none`) return `none`;
        t3 = t3 == null ? i3 : t3 + (` ` + i3);
      }
    }
    return t3 ?? e5.default;
  }
  function Di2(e5, t3) {
    return e5 = Ei2(e5), t3 = Ei2(t3), t3 == null ? e5 === `auto` ? null : e5 : t3 === `auto` ? null : t3;
  }
  var Oi2 = typeof reportError == `function` ? reportError : function(e5) {
    if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
      var t3 = new window.ErrorEvent(`error`, { bubbles: true, cancelable: true, message: typeof e5 == `object` && e5 && typeof e5.message == `string` ? String(e5.message) : String(e5), error: e5 });
      if (!window.dispatchEvent(t3)) return;
    } else if (typeof process == `object` && typeof process.emit == `function`) {
      process.emit(`uncaughtException`, e5);
      return;
    }
    console.error(e5);
  }, ki2 = [], Ai2 = 0, ji2 = 0;
  function Mi2() {
    for (var e5 = Ai2, t3 = ji2 = Ai2 = 0; t3 < e5; ) {
      var n3 = ki2[t3];
      ki2[t3++] = null;
      var r3 = ki2[t3];
      ki2[t3++] = null;
      var i3 = ki2[t3];
      ki2[t3++] = null;
      var a3 = ki2[t3];
      if (ki2[t3++] = null, r3 !== null && i3 !== null) {
        var o3 = r3.pending;
        o3 === null ? i3.next = i3 : (i3.next = o3.next, o3.next = i3), r3.pending = i3;
      }
      a3 !== 0 && Ii2(n3, i3, a3);
    }
  }
  function Ni2(e5, t3, n3, r3) {
    ki2[Ai2++] = e5, ki2[Ai2++] = t3, ki2[Ai2++] = n3, ki2[Ai2++] = r3, ji2 |= r3, e5.lanes |= r3, e5 = e5.alternate, e5 !== null && (e5.lanes |= r3);
  }
  function Pi2(e5, t3, n3, r3) {
    return Ni2(e5, t3, n3, r3), Li2(e5);
  }
  function Fi2(e5, t3) {
    return Ni2(e5, null, null, t3), Li2(e5);
  }
  function Ii2(e5, t3, n3) {
    e5.lanes |= n3;
    var r3 = e5.alternate;
    r3 !== null && (r3.lanes |= n3);
    for (var i3 = false, a3 = e5.return; a3 !== null; ) a3.childLanes |= n3, r3 = a3.alternate, r3 !== null && (r3.childLanes |= n3), a3.tag === 22 && (e5 = a3.stateNode, e5 === null || e5._visibility & 1 || (i3 = true)), e5 = a3, a3 = a3.return;
    return e5.tag === 3 ? (a3 = e5.stateNode, i3 && t3 !== null && (i3 = 31 - ct2(n3), e5 = a3.hiddenUpdates, r3 = e5[i3], r3 === null ? e5[i3] = [t3] : r3.push(t3), t3.lane = n3 | 536870912), a3) : null;
  }
  function Li2(e5) {
    if (50 < kd) throw kd = 0, Ad = null, Error(i2(185));
    for (var t3 = e5.return; t3 !== null; ) e5 = t3, t3 = e5.return;
    return e5.tag === 3 ? e5.stateNode : null;
  }
  var Ri2 = {};
  function zi2(e5, t3, n3, r3) {
    this.tag = e5, this.key = n3, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t3, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r3, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function M2(e5, t3, n3, r3) {
    return new zi2(e5, t3, n3, r3);
  }
  function Bi2(e5) {
    return e5 = e5.prototype, !(!e5 || !e5.isReactComponent);
  }
  function Vi2(e5, t3) {
    var n3 = e5.alternate;
    return n3 === null ? (n3 = M2(e5.tag, t3, e5.key, e5.mode), n3.elementType = e5.elementType, n3.type = e5.type, n3.stateNode = e5.stateNode, n3.alternate = e5, e5.alternate = n3) : (n3.pendingProps = t3, n3.type = e5.type, n3.flags = 0, n3.subtreeFlags = 0, n3.deletions = null), n3.flags = e5.flags & 1206910976, n3.childLanes = e5.childLanes, n3.lanes = e5.lanes, n3.child = e5.child, n3.memoizedProps = e5.memoizedProps, n3.memoizedState = e5.memoizedState, n3.updateQueue = e5.updateQueue, t3 = e5.dependencies, n3.dependencies = t3 === null ? null : { lanes: t3.lanes, firstContext: t3.firstContext }, n3.sibling = e5.sibling, n3.index = e5.index, n3.ref = e5.ref, n3.refCleanup = e5.refCleanup, n3;
  }
  function Hi2(e5, t3) {
    e5.flags &= 1206910978;
    var n3 = e5.alternate;
    return n3 === null ? (e5.childLanes = 0, e5.lanes = t3, e5.child = null, e5.subtreeFlags = 0, e5.memoizedProps = null, e5.memoizedState = null, e5.updateQueue = null, e5.dependencies = null, e5.stateNode = null) : (e5.childLanes = n3.childLanes, e5.lanes = n3.lanes, e5.child = n3.child, e5.subtreeFlags = 0, e5.deletions = null, e5.memoizedProps = n3.memoizedProps, e5.memoizedState = n3.memoizedState, e5.updateQueue = n3.updateQueue, e5.type = n3.type, t3 = n3.dependencies, e5.dependencies = t3 === null ? null : { lanes: t3.lanes, firstContext: t3.firstContext }), e5;
  }
  function Ui2(e5, t3, n3, r3, a3, o3) {
    var s3 = 0;
    if (r3 = e5, typeof r3 == `function`) Bi2(r3) && (s3 = 1);
    else if (typeof r3 == `string`) s3 = qm(e5, n3, Ae2.current) ? 26 : e5 === `html` || e5 === `head` || e5 === `body` ? 27 : 5;
    else a: switch (r3) {
      case he2:
        return e5 = M2(31, n3, t3, a3), e5.elementType = he2, e5.lanes = o3, e5;
      case w2:
        return Wi2(n3.children, a3, o3, t3);
      case T2:
        s3 = 8, a3 |= 24;
        break;
      case se2:
        return e5 = M2(12, n3, t3, a3 | 2), e5.elementType = se2, e5.lanes = o3, e5;
      case de2:
        return e5 = M2(13, n3, t3, a3), e5.elementType = de2, e5.lanes = o3, e5;
      case fe2:
        return e5 = M2(19, n3, t3, a3), e5.elementType = fe2, e5.lanes = o3, e5;
      case ge2:
      case ve2:
        return e5 = a3 | 32, e5 = M2(30, n3, t3, e5), e5.elementType = ve2, e5.lanes = o3, e5.stateNode = { autoName: null, paired: null, clones: null, ref: null }, e5;
      default:
        if (typeof r3 == `object` && r3) switch (r3.$$typeof) {
          case le2:
            s3 = 10;
            break a;
          case ce2:
            s3 = 9;
            break a;
          case ue2:
            s3 = 11;
            break a;
          case pe2:
            s3 = 14;
            break a;
          case me2:
            s3 = 16, r3 = null;
            break a;
        }
        s3 = 29, n3 = Error(i2(130, e5 === null ? `null` : typeof e5, ``)), r3 = null;
    }
    return t3 = M2(s3, n3, t3, a3), t3.elementType = e5, t3.type = r3, t3.lanes = o3, t3;
  }
  function Wi2(e5, t3, n3, r3) {
    return e5 = M2(7, e5, r3, t3), e5.lanes = n3, e5;
  }
  function Gi2(e5, t3, n3) {
    return e5 = M2(6, e5, null, t3), e5.lanes = n3, e5;
  }
  function Ki2(e5) {
    var t3 = M2(18, null, null, 0);
    return t3.stateNode = e5, t3;
  }
  function qi2(e5, t3, n3) {
    return t3 = M2(4, e5.children === null ? [] : e5.children, e5.key, t3), t3.lanes = n3, t3.stateNode = { containerInfo: e5.containerInfo, pendingChildren: null, implementation: e5.implementation }, t3;
  }
  var Ji2 = /* @__PURE__ */ new WeakMap();
  function Yi2(e5, t3) {
    if (typeof e5 == `object` && e5) {
      var n3 = Ji2.get(e5);
      return n3 === void 0 ? (t3 = { value: e5, source: t3, stack: We2(t3) }, Ji2.set(e5, t3), t3) : n3;
    }
    return { value: e5, source: t3, stack: We2(t3) };
  }
  var Xi2 = [], Zi2 = 0, Qi2 = null, $i2 = 0, ea2 = [], ta2 = 0, na2 = null, ra2 = 1, ia2 = ``;
  function aa2(e5, t3) {
    Xi2[Zi2++] = $i2, Xi2[Zi2++] = Qi2, Qi2 = e5, $i2 = t3;
  }
  function oa2(e5, t3, n3) {
    ea2[ta2++] = ra2, ea2[ta2++] = ia2, ea2[ta2++] = na2, na2 = e5;
    var r3 = ra2;
    e5 = ia2;
    var i3 = 32 - ct2(r3) - 1;
    r3 &= ~(1 << i3), n3 += 1;
    var a3 = 32 - ct2(t3) + i3;
    if (30 < a3) {
      var o3 = i3 - i3 % 5;
      a3 = (r3 & (1 << o3) - 1).toString(32), r3 >>= o3, i3 -= o3, ra2 = 1 << 32 - ct2(t3) + i3 | n3 << i3 | r3, ia2 = a3 + e5;
    } else ra2 = 1 << a3 | n3 << i3 | r3, ia2 = e5;
  }
  function sa2(e5) {
    e5.return !== null && (aa2(e5, 1), oa2(e5, 1, 0));
  }
  function ca2(e5) {
    for (; e5 === Qi2; ) Qi2 = Xi2[--Zi2], Xi2[Zi2] = null, $i2 = Xi2[--Zi2], Xi2[Zi2] = null;
    for (; e5 === na2; ) na2 = ea2[--ta2], ea2[ta2] = null, ia2 = ea2[--ta2], ea2[ta2] = null, ra2 = ea2[--ta2], ea2[ta2] = null;
  }
  function la2(e5, t3) {
    ea2[ta2++] = ra2, ea2[ta2++] = ia2, ea2[ta2++] = na2, ra2 = t3.id, ia2 = t3.overflow, na2 = e5;
  }
  var N2 = null, P2 = null, F2 = false, ua2 = null, da2 = false, fa2 = Error(i2(519));
  function pa2(e5) {
    throw ya2(Yi2(Error(i2(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? `text` : `HTML`, ``)), e5)), fa2;
  }
  function ma2(e5) {
    var t3 = e5.stateNode, n3 = e5.type, r3 = e5.memoizedProps;
    switch (t3[Mt2] = e5, t3[Nt2] = r3, n3) {
      case `dialog`:
        Q(`cancel`, t3), Q(`close`, t3);
        break;
      case `iframe`:
      case `object`:
      case `embed`:
        Q(`load`, t3);
        break;
      case `video`:
      case `audio`:
        for (n3 = 0; n3 < zf.length; n3++) Q(zf[n3], t3);
        break;
      case `source`:
        Q(`error`, t3);
        break;
      case `img`:
      case `image`:
      case `link`:
        Q(`error`, t3), Q(`load`, t3);
        break;
      case `details`:
        Q(`toggle`, t3);
        break;
      case `input`:
        Q(`invalid`, t3), hn2(t3, r3.value, r3.defaultValue, r3.checked, r3.defaultChecked, r3.type, r3.name, true);
        break;
      case `select`:
        Q(`invalid`, t3);
        break;
      case `textarea`:
        Q(`invalid`, t3), yn2(t3, r3.value, r3.defaultValue, r3.children);
    }
    n3 = r3.children, typeof n3 != `string` && typeof n3 != `number` && typeof n3 != `bigint` || t3.textContent === `` + n3 || true === r3.suppressHydrationWarning || ep(t3.textContent, n3) ? (r3.popover != null && (Q(`beforetoggle`, t3), Q(`toggle`, t3)), r3.onScroll != null && Q(`scroll`, t3), r3.onScrollEnd != null && Q(`scrollend`, t3), r3.onClick != null && (t3.onclick = On2), t3 = true) : t3 = false, t3 || pa2(e5, true);
  }
  function ha2(e5) {
    for (N2 = e5.return; N2; ) switch (N2.tag) {
      case 5:
      case 31:
      case 13:
        da2 = false;
        return;
      case 27:
      case 3:
        da2 = true;
        return;
      default:
        N2 = N2.return;
    }
  }
  function ga2(e5) {
    if (e5 !== N2) return false;
    if (!F2) return ha2(e5), F2 = true, false;
    var t3 = e5.tag, n3;
    if ((n3 = t3 !== 3 && t3 !== 27) && ((n3 = t3 === 5) && (n3 = e5.type, n3 = n3 === `form` || n3 === `button` || pp(e5.type, e5.memoizedProps)), n3 = !n3), n3 && P2 && pa2(e5), ha2(e5), t3 === 13) {
      if (e5 = e5.memoizedState, e5 = e5 === null ? null : e5.dehydrated, !e5) throw Error(i2(317));
      P2 = dm(e5);
    } else if (t3 === 31) {
      if (e5 = e5.memoizedState, e5 = e5 === null ? null : e5.dehydrated, !e5) throw Error(i2(317));
      P2 = dm(e5);
    } else t3 === 27 ? (t3 = P2, Sp(e5.type) ? (e5 = um, um = null, P2 = e5) : P2 = t3) : P2 = N2 ? lm(e5.stateNode.nextSibling) : null;
    return true;
  }
  function _a2() {
    P2 = N2 = null, F2 = false;
  }
  function va2() {
    var e5 = ua2;
    return e5 !== null && (pd === null ? pd = e5 : pd.push.apply(pd, e5), ua2 = null), e5;
  }
  function ya2(e5) {
    ua2 === null ? ua2 = [e5] : ua2.push(e5);
  }
  var ba2 = Oe2(null), xa2 = null, Sa2 = null;
  function Ca2(e5, t3, n3) {
    O2(ba2, t3._currentValue), t3._currentValue = n3;
  }
  function wa2(e5) {
    e5._currentValue = ba2.current, ke2(ba2);
  }
  function Ta2(e5, t3, n3) {
    for (; e5 !== null; ) {
      var r3 = e5.alternate;
      if ((e5.childLanes & t3) === t3 ? r3 !== null && (r3.childLanes & t3) !== t3 && (r3.childLanes |= t3) : (e5.childLanes |= t3, r3 !== null && (r3.childLanes |= t3)), e5 === n3) break;
      e5 = e5.return;
    }
  }
  function Ea2(e5, t3, n3, r3) {
    var a3 = e5.child;
    for (a3 !== null && (a3.return = e5); a3 !== null; ) {
      var o3 = a3.dependencies;
      if (o3 !== null) {
        var s3 = a3.child;
        o3 = o3.firstContext;
        a: for (; o3 !== null; ) {
          var c3 = o3;
          o3 = a3;
          for (var l3 = 0; l3 < t3.length; l3++) if (c3.context === t3[l3]) {
            o3.lanes |= n3, c3 = o3.alternate, c3 !== null && (c3.lanes |= n3), Ta2(o3.return, n3, e5), r3 || (s3 = null);
            break a;
          }
          o3 = c3.next;
        }
      } else if (a3.tag === 18) {
        if (s3 = a3.return, s3 === null) throw Error(i2(341));
        s3.lanes |= n3, o3 = s3.alternate, o3 !== null && (o3.lanes |= n3), Ta2(s3, n3, e5), s3 = null;
      } else a3.tag === 13 && a3.memoizedState !== null && a3.memoizedState.dehydrated === null ? (a3.lanes |= n3, s3 = a3.alternate, s3 !== null && (s3.lanes |= n3), Ta2(a3.return, n3, e5), s3 = a3.child, s3 = s3 === null ? null : s3.sibling) : s3 = a3.child;
      if (s3 !== null) s3.return = a3;
      else for (s3 = a3; s3 !== null; ) {
        if (s3 === e5) {
          s3 = null;
          break;
        }
        if (a3 = s3.sibling, a3 !== null) {
          a3.return = s3.return, s3 = a3;
          break;
        }
        s3 = s3.return;
      }
      a3 = s3;
    }
  }
  function Da2(e5, t3, n3, r3) {
    e5 = null;
    for (var a3 = t3, o3 = false; a3 !== null; ) {
      if (!o3) {
        if (a3.flags & 524288) o3 = true;
        else if (a3.flags & 262144) break;
      }
      if (a3.tag === 10) {
        var s3 = a3.alternate;
        if (s3 === null) throw Error(i2(387));
        if (s3 = s3.memoizedProps, s3 !== null) {
          var c3 = a3.type;
          Xr2(a3.pendingProps.value, s3.value) || (e5 === null ? e5 = [c3] : e5.push(c3));
        }
      } else if (a3 === Ne2.current) {
        if (s3 = a3.alternate, s3 === null) throw Error(i2(387));
        s3.memoizedState.memoizedState !== a3.memoizedState.memoizedState && (e5 === null ? e5 = [sh] : e5.push(sh));
      }
      a3 = a3.return;
    }
    return e5 !== null && Ea2(t3, e5, n3, r3), t3.flags |= 262144, e5 !== null;
  }
  function Oa2(e5) {
    for (e5 = e5.firstContext; e5 !== null; ) {
      if (!Xr2(e5.context._currentValue, e5.memoizedValue)) return true;
      e5 = e5.next;
    }
    return false;
  }
  function ka2(e5) {
    xa2 = e5, Sa2 = null, e5 = e5.dependencies, e5 !== null && (e5.firstContext = null);
  }
  function Aa2(e5) {
    return Ma2(xa2, e5);
  }
  function ja2(e5, t3) {
    return xa2 === null && ka2(e5), Ma2(e5, t3);
  }
  function Ma2(e5, t3) {
    var n3 = t3._currentValue;
    if (t3 = { context: t3, memoizedValue: n3, next: null }, Sa2 === null) {
      if (e5 === null) throw Error(i2(308));
      Sa2 = t3, e5.dependencies = { lanes: 0, firstContext: t3 }, e5.flags |= 524288;
    } else Sa2 = Sa2.next = t3;
    return n3;
  }
  var Na2 = typeof AbortController < `u` ? AbortController : function() {
    var e5 = [], t3 = this.signal = { aborted: false, addEventListener: function(t4, n3) {
      e5.push(n3);
    } };
    this.abort = function() {
      t3.aborted = true, e5.forEach(function(e6) {
        return e6();
      });
    };
  }, Pa2 = t2.unstable_scheduleCallback, Fa2 = t2.unstable_NormalPriority, Ia2 = { $$typeof: le2, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function La2() {
    return { controller: new Na2(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function Ra2(e5) {
    e5.refCount--, e5.refCount === 0 && Pa2(Fa2, function() {
      e5.controller.abort();
    });
  }
  function za2(e5, t3) {
    if (e5.pendingLanes & 4194048) {
      var n3 = e5.transitionTypes;
      for (n3 === null && (n3 = e5.transitionTypes = []), e5 = 0; e5 < t3.length; e5++) {
        var r3 = t3[e5];
        n3.indexOf(r3) === -1 && n3.push(r3);
      }
    }
  }
  var Ba2 = null;
  function Va2(e5) {
    var t3 = e5.transitionTypes;
    return e5.transitionTypes = null, t3;
  }
  var Ha2 = null, Ua2 = 0, Wa2 = 0, Ga2 = null;
  function Ka2(e5, t3) {
    if (Ha2 === null) {
      var n3 = Ha2 = [];
      Ua2 = 0, Wa2 = Pf(), Ga2 = { status: `pending`, value: void 0, then: function(e6) {
        n3.push(e6);
      } };
    }
    return Ua2++, t3.then(qa2, qa2), t3;
  }
  function qa2() {
    if (--Ua2 === 0 && (Ba2 = null, Ha2 !== null)) {
      Ga2 !== null && (Ga2.status = `fulfilled`);
      var e5 = Ha2;
      Ha2 = null, Wa2 = 0, Ga2 = null;
      for (var t3 = 0; t3 < e5.length; t3++) (0, e5[t3])();
    }
  }
  function Ja2(e5, t3) {
    var n3 = [], r3 = { status: `pending`, value: null, reason: null, then: function(e6) {
      n3.push(e6);
    } };
    return e5.then(function() {
      r3.status = `fulfilled`, r3.value = t3;
      for (var e6 = 0; e6 < n3.length; e6++) (0, n3[e6])(t3);
    }, function(e6) {
      for (r3.status = `rejected`, r3.reason = e6, e6 = 0; e6 < n3.length; e6++) (0, n3[e6])(void 0);
    }), r3;
  }
  var Ya2 = E2.S;
  E2.S = function(e5, t3) {
    if (gd = Xe2(), typeof t3 == `object` && t3 && typeof t3.then == `function` && Ka2(e5, t3), Ba2 !== null) for (var n3 = bf; n3 !== null; ) za2(n3, Ba2), n3 = n3.next;
    if (n3 = e5.types, n3 !== null) {
      for (var r3 = bf; r3 !== null; ) za2(r3, n3), r3 = r3.next;
      if (Wa2 !== 0) {
        r3 = Ba2, r3 === null && (r3 = Ba2 = []);
        for (var i3 = 0; i3 < n3.length; i3++) {
          var a3 = n3[i3];
          r3.indexOf(a3) === -1 && r3.push(a3);
        }
      }
    }
    Ya2 !== null && Ya2(e5, t3);
  };
  var Xa2 = Oe2(null);
  function Za2() {
    var e5 = Xa2.current;
    return e5 === null ? K.pooledCache : e5;
  }
  function Qa2(e5, t3) {
    t3 === null ? O2(Xa2, Xa2.current) : O2(Xa2, t3.pool);
  }
  function $a2() {
    var e5 = Za2();
    return e5 === null ? null : { parent: Ia2._currentValue, pool: e5 };
  }
  var eo2 = Error(i2(460)), to2 = Error(i2(474)), no2 = Error(i2(542)), ro2 = { then: function() {
  } };
  function io2(e5) {
    return e5 = e5.status, e5 === `fulfilled` || e5 === `rejected`;
  }
  function ao2(e5, t3, n3) {
    switch (n3 = e5[n3], n3 === void 0 ? e5.push(t3) : n3 !== t3 && (t3.then(On2, On2), t3 = n3), t3.status) {
      case `fulfilled`:
        return t3.value;
      case `rejected`:
        throw e5 = t3.reason, lo2(e5), e5 === void 0 && !(`reason` in t3) ? Error(i2(600)) : e5;
      default:
        if (typeof t3.status == `string`) t3.then(On2, On2);
        else {
          if (e5 = K, e5 !== null && 100 < e5.shellSuspendCounter) throw Error(i2(482));
          e5 = t3, e5.status = `pending`, e5.then(function(e6) {
            if (t3.status === `pending`) {
              var n4 = t3;
              n4.status = `fulfilled`, n4.value = e6;
            }
          }, function(e6) {
            if (t3.status === `pending`) {
              var n4 = t3;
              n4.status = `rejected`, n4.reason = e6;
            }
          });
        }
        switch (t3.status) {
          case `fulfilled`:
            return t3.value;
          case `rejected`:
            throw e5 = t3.reason, lo2(e5), e5;
        }
        throw so2 = t3, eo2;
    }
  }
  function oo2(e5) {
    try {
      var t3 = e5._init;
      return t3(e5._payload);
    } catch (e6) {
      throw typeof e6 == `object` && e6 && typeof e6.then == `function` ? (so2 = e6, eo2) : e6;
    }
  }
  var so2 = null;
  function co2() {
    if (so2 === null) throw Error(i2(459));
    var e5 = so2;
    return so2 = null, e5;
  }
  function lo2(e5) {
    if (e5 === eo2 || e5 === no2) throw Error(i2(483));
  }
  var uo2 = null, fo2 = 0;
  function po2(e5) {
    var t3 = fo2;
    return fo2 += 1, uo2 === null && (uo2 = []), ao2(uo2, e5, t3);
  }
  function mo2(e5, t3) {
    t3 = t3.props.ref, e5.ref = t3 === void 0 ? null : t3;
  }
  function ho2(e5, t3) {
    throw t3.$$typeof === ie2 ? Error(i2(525)) : (e5 = Object.prototype.toString.call(t3), Error(i2(31, e5 === `[object Object]` ? `object with keys {` + Object.keys(t3).join(`, `) + `}` : e5)));
  }
  function go2(e5) {
    function t3(t4, n4) {
      if (e5) {
        var r4 = t4.deletions;
        r4 === null ? (t4.deletions = [n4], t4.flags |= 16) : r4.push(n4);
      }
    }
    function n3(n4, r4) {
      if (!e5) return null;
      for (; r4 !== null; ) t3(n4, r4), r4 = r4.sibling;
      return null;
    }
    function r3(e6) {
      for (var t4 = /* @__PURE__ */ new Map(); e6 !== null; ) e6.key === null ? t4.set(e6.index, e6) : t4.set(e6.key, e6), e6 = e6.sibling;
      return t4;
    }
    function a3(e6, t4) {
      return e6 = Vi2(e6, t4), e6.index = 0, e6.sibling = null, e6;
    }
    function o3(t4, n4, r4) {
      return t4.index = r4, e5 ? (r4 = t4.alternate, r4 === null ? (t4.flags |= 134217730, n4) : (r4 = r4.index, r4 < n4 ? (t4.flags |= 2, n4) : r4)) : (t4.flags |= 1048576, n4);
    }
    function s3(t4) {
      return e5 && t4.alternate === null && (t4.flags |= 134217730), t4;
    }
    function c3(e6, t4, n4, r4) {
      return t4 === null || t4.tag !== 6 ? (t4 = Gi2(n4, e6.mode, r4), t4.return = e6, t4) : (t4 = a3(t4, n4), t4.return = e6, t4);
    }
    function l3(e6, t4, n4, r4) {
      var i3 = n4.type;
      return i3 === w2 ? (e6 = d2(e6, t4, n4.props.children, r4, n4.key), mo2(e6, n4), e6) : t4 !== null && (t4.elementType === i3 || typeof i3 == `object` && i3 && i3.$$typeof === me2 && oo2(i3) === t4.type) ? (t4 = a3(t4, n4.props), mo2(t4, n4), t4.return = e6, t4) : (t4 = Ui2(n4.type, n4.key, n4.props, null, e6.mode, r4), mo2(t4, n4), t4.return = e6, t4);
    }
    function u3(e6, t4, n4, r4) {
      return t4 === null || t4.tag !== 4 || t4.stateNode.containerInfo !== n4.containerInfo || t4.stateNode.implementation !== n4.implementation ? (t4 = qi2(n4, e6.mode, r4), t4.return = e6, t4) : (t4 = a3(t4, n4.children || []), t4.return = e6, t4);
    }
    function d2(e6, t4, n4, r4, i3) {
      return t4 === null || t4.tag !== 7 ? (t4 = Wi2(n4, e6.mode, r4, i3), t4.return = e6, t4) : (t4 = a3(t4, n4), t4.return = e6, t4);
    }
    function f3(e6, t4, n4) {
      if (typeof t4 == `string` && t4 !== `` || typeof t4 == `number` || typeof t4 == `bigint`) return t4 = Gi2(`` + t4, e6.mode, n4), t4.return = e6, t4;
      if (typeof t4 == `object` && t4) {
        switch (t4.$$typeof) {
          case ae2:
            return n4 = Ui2(t4.type, t4.key, t4.props, null, e6.mode, n4), mo2(n4, t4), n4.return = e6, n4;
          case oe2:
            return t4 = qi2(t4, e6.mode, n4), t4.return = e6, t4;
          case me2:
            return t4 = oo2(t4), f3(e6, t4, n4);
        }
        if (we2(t4) || xe2(t4)) return t4 = Wi2(t4, e6.mode, n4, null), t4.return = e6, t4;
        if (typeof t4.then == `function`) return f3(e6, po2(t4), n4);
        if (t4.$$typeof === le2) return f3(e6, ja2(e6, t4), n4);
        ho2(e6, t4);
      }
      return null;
    }
    function p2(e6, t4, n4, r4) {
      var i3 = t4 === null ? null : t4.key;
      if (typeof n4 == `string` && n4 !== `` || typeof n4 == `number` || typeof n4 == `bigint`) return i3 === null ? c3(e6, t4, `` + n4, r4) : null;
      if (typeof n4 == `object` && n4) {
        switch (n4.$$typeof) {
          case ae2:
            return n4.key === i3 ? l3(e6, t4, n4, r4) : null;
          case oe2:
            return n4.key === i3 ? u3(e6, t4, n4, r4) : null;
          case me2:
            return n4 = oo2(n4), p2(e6, t4, n4, r4);
        }
        if (we2(n4) || xe2(n4)) return i3 === null ? d2(e6, t4, n4, r4, null) : null;
        if (typeof n4.then == `function`) return p2(e6, t4, po2(n4), r4);
        if (n4.$$typeof === le2) return p2(e6, t4, ja2(e6, n4), r4);
        ho2(e6, n4);
      }
      return null;
    }
    function m3(e6, t4, n4, r4, i3) {
      if (typeof r4 == `string` && r4 !== `` || typeof r4 == `number` || typeof r4 == `bigint`) return e6 = e6.get(n4) || null, c3(t4, e6, `` + r4, i3);
      if (typeof r4 == `object` && r4) {
        switch (r4.$$typeof) {
          case ae2:
            return e6 = e6.get(r4.key === null ? n4 : r4.key) || null, l3(t4, e6, r4, i3);
          case oe2:
            return e6 = e6.get(r4.key === null ? n4 : r4.key) || null, u3(t4, e6, r4, i3);
          case me2:
            return r4 = oo2(r4), m3(e6, t4, n4, r4, i3);
        }
        if (we2(r4) || xe2(r4)) return e6 = e6.get(n4) || null, d2(t4, e6, r4, i3, null);
        if (typeof r4.then == `function`) return m3(e6, t4, n4, po2(r4), i3);
        if (r4.$$typeof === le2) return m3(e6, t4, n4, ja2(t4, r4), i3);
        ho2(t4, r4);
      }
      return null;
    }
    function h2(i3, a4, s4, c4) {
      for (var l4 = null, u4 = null, d3 = a4, h3 = a4 = 0, g4 = null; d3 !== null && h3 < s4.length; h3++) {
        d3.index > h3 ? (g4 = d3, d3 = null) : g4 = d3.sibling;
        var _4 = p2(i3, d3, s4[h3], c4);
        if (_4 === null) {
          d3 === null && (d3 = g4);
          break;
        }
        e5 && d3 && _4.alternate === null && t3(i3, d3), a4 = o3(_4, a4, h3), u4 === null ? l4 = _4 : u4.sibling = _4, u4 = _4, d3 = g4;
      }
      if (h3 === s4.length) return n3(i3, d3), F2 && aa2(i3, h3), l4;
      if (d3 === null) {
        for (; h3 < s4.length; h3++) d3 = f3(i3, s4[h3], c4), d3 !== null && (a4 = o3(d3, a4, h3), u4 === null ? l4 = d3 : u4.sibling = d3, u4 = d3);
        return F2 && aa2(i3, h3), l4;
      }
      for (d3 = r3(d3); h3 < s4.length; h3++) g4 = m3(d3, i3, h3, s4[h3], c4), g4 !== null && (e5 && (_4 = g4.alternate, _4 !== null && d3.delete(_4.key === null ? h3 : _4.key)), a4 = o3(g4, a4, h3), u4 === null ? l4 = g4 : u4.sibling = g4, u4 = g4);
      return e5 && d3.forEach(function(e6) {
        return t3(i3, e6);
      }), F2 && aa2(i3, h3), l4;
    }
    function g3(a4, s4, c4, l4) {
      if (c4 == null) throw Error(i2(151));
      for (var u4 = null, d3 = null, h3 = s4, g4 = s4 = 0, _4 = null, v3 = c4.next(); h3 !== null && !v3.done; g4++, v3 = c4.next()) {
        h3.index > g4 ? (_4 = h3, h3 = null) : _4 = h3.sibling;
        var y3 = p2(a4, h3, v3.value, l4);
        if (y3 === null) {
          h3 === null && (h3 = _4);
          break;
        }
        e5 && h3 && y3.alternate === null && t3(a4, h3), s4 = o3(y3, s4, g4), d3 === null ? u4 = y3 : d3.sibling = y3, d3 = y3, h3 = _4;
      }
      if (v3.done) return n3(a4, h3), F2 && aa2(a4, g4), u4;
      if (h3 === null) {
        for (; !v3.done; g4++, v3 = c4.next()) v3 = f3(a4, v3.value, l4), v3 !== null && (s4 = o3(v3, s4, g4), d3 === null ? u4 = v3 : d3.sibling = v3, d3 = v3);
        return F2 && aa2(a4, g4), u4;
      }
      for (h3 = r3(h3); !v3.done; g4++, v3 = c4.next()) v3 = m3(h3, a4, g4, v3.value, l4), v3 !== null && (e5 && (_4 = v3.alternate, _4 !== null && h3.delete(_4.key === null ? g4 : _4.key)), s4 = o3(v3, s4, g4), d3 === null ? u4 = v3 : d3.sibling = v3, d3 = v3);
      return e5 && h3.forEach(function(e6) {
        return t3(a4, e6);
      }), F2 && aa2(a4, g4), u4;
    }
    function _3(e6, r4, o4, c4) {
      if (typeof o4 == `object` && o4 && o4.type === w2 && o4.key === null && o4.props.ref === void 0 && (o4 = o4.props.children), typeof o4 == `object` && o4) {
        switch (o4.$$typeof) {
          case ae2:
            a: {
              for (var l4 = o4.key; r4 !== null; ) {
                if (r4.key === l4) {
                  if (l4 = o4.type, l4 === w2) {
                    if (r4.tag === 7) {
                      n3(e6, r4.sibling), c4 = a3(r4, o4.props.children), mo2(c4, o4), c4.return = e6, e6 = c4;
                      break a;
                    }
                  } else if (r4.elementType === l4 || typeof l4 == `object` && l4 && l4.$$typeof === me2 && oo2(l4) === r4.type) {
                    n3(e6, r4.sibling), c4 = a3(r4, o4.props), mo2(c4, o4), c4.return = e6, e6 = c4;
                    break a;
                  }
                  n3(e6, r4);
                  break;
                }
                t3(e6, r4), r4 = r4.sibling;
              }
              o4.type === w2 ? (c4 = Wi2(o4.props.children, e6.mode, c4, o4.key), mo2(c4, o4), c4.return = e6, e6 = c4) : (c4 = Ui2(o4.type, o4.key, o4.props, null, e6.mode, c4), mo2(c4, o4), c4.return = e6, e6 = c4);
            }
            return s3(e6);
          case oe2:
            a: {
              for (l4 = o4.key; r4 !== null; ) {
                if (r4.key === l4) {
                  if (r4.tag === 4 && r4.stateNode.containerInfo === o4.containerInfo && r4.stateNode.implementation === o4.implementation) {
                    n3(e6, r4.sibling), c4 = a3(r4, o4.children || []), c4.return = e6, e6 = c4;
                    break a;
                  }
                  n3(e6, r4);
                  break;
                }
                t3(e6, r4), r4 = r4.sibling;
              }
              c4 = qi2(o4, e6.mode, c4), c4.return = e6, e6 = c4;
            }
            return s3(e6);
          case me2:
            return o4 = oo2(o4), _3(e6, r4, o4, c4);
        }
        if (we2(o4)) return h2(e6, r4, o4, c4);
        if (xe2(o4)) {
          if (l4 = xe2(o4), typeof l4 != `function`) throw Error(i2(150));
          return o4 = l4.call(o4), g3(e6, r4, o4, c4);
        }
        if (typeof o4.then == `function`) return _3(e6, r4, po2(o4), c4);
        if (o4.$$typeof === le2) return _3(e6, r4, ja2(e6, o4), c4);
        ho2(e6, o4);
      }
      return typeof o4 == `string` && o4 !== `` || typeof o4 == `number` || typeof o4 == `bigint` ? (o4 = `` + o4, r4 !== null && r4.tag === 6 ? (n3(e6, r4.sibling), c4 = a3(r4, o4), c4.return = e6, e6 = c4) : (n3(e6, r4), c4 = Gi2(o4, e6.mode, c4), c4.return = e6, e6 = c4), s3(e6)) : n3(e6, r4);
    }
    return function(e6, t4, n4, r4) {
      try {
        fo2 = 0;
        var i3 = _3(e6, t4, n4, r4);
        return uo2 = null, i3;
      } catch (t5) {
        if (t5 === eo2 || t5 === no2) throw t5;
        var a4 = M2(29, t5, null, e6.mode);
        return a4.lanes = r4, a4.return = e6, a4;
      }
    };
  }
  var _o2 = go2(true), vo2 = go2(false), yo2 = false;
  function bo2(e5) {
    e5.updateQueue = { baseState: e5.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function xo2(e5, t3) {
    e5 = e5.updateQueue, t3.updateQueue === e5 && (t3.updateQueue = { baseState: e5.baseState, firstBaseUpdate: e5.firstBaseUpdate, lastBaseUpdate: e5.lastBaseUpdate, shared: e5.shared, callbacks: null });
  }
  function So2(e5) {
    return { lane: e5, tag: 0, payload: null, callback: null, next: null };
  }
  function Co2(e5, t3, n3) {
    var r3 = e5.updateQueue;
    if (r3 === null) return null;
    if (r3 = r3.shared, G & 2) {
      var i3 = r3.pending;
      return i3 === null ? t3.next = t3 : (t3.next = i3.next, i3.next = t3), r3.pending = t3, t3 = Li2(e5), Ii2(e5, null, n3), t3;
    }
    return Ni2(e5, r3, t3, n3), Li2(e5);
  }
  function wo2(e5, t3, n3) {
    if (t3 = t3.updateQueue, t3 !== null && (t3 = t3.shared, n3 & 4194048)) {
      var r3 = t3.lanes;
      r3 &= e5.pendingLanes, n3 |= r3, t3.lanes = n3, Tt2(e5, n3);
    }
  }
  function To2(e5, t3) {
    var n3 = e5.updateQueue, r3 = e5.alternate;
    if (r3 !== null && (r3 = r3.updateQueue, n3 === r3)) {
      var i3 = null, a3 = null;
      if (n3 = n3.firstBaseUpdate, n3 !== null) {
        do {
          var o3 = { lane: n3.lane, tag: n3.tag, payload: n3.payload, callback: null, next: null };
          a3 === null ? i3 = a3 = o3 : a3 = a3.next = o3, n3 = n3.next;
        } while (n3 !== null);
        a3 === null ? i3 = a3 = t3 : a3 = a3.next = t3;
      } else i3 = a3 = t3;
      n3 = { baseState: r3.baseState, firstBaseUpdate: i3, lastBaseUpdate: a3, shared: r3.shared, callbacks: r3.callbacks }, e5.updateQueue = n3;
      return;
    }
    e5 = n3.lastBaseUpdate, e5 === null ? n3.firstBaseUpdate = t3 : e5.next = t3, n3.lastBaseUpdate = t3;
  }
  var Eo2 = false;
  function Do2() {
    if (Eo2) {
      var e5 = Ga2;
      if (e5 !== null) throw e5;
    }
  }
  function Oo2(e5, t3, n3, r3) {
    Eo2 = false;
    var i3 = e5.updateQueue;
    yo2 = false;
    var a3 = i3.firstBaseUpdate, o3 = i3.lastBaseUpdate, s3 = i3.shared.pending;
    if (s3 !== null) {
      i3.shared.pending = null;
      var c3 = s3, l3 = c3.next;
      c3.next = null, o3 === null ? a3 = l3 : o3.next = l3, o3 = c3;
      var u3 = e5.alternate;
      u3 !== null && (u3 = u3.updateQueue, s3 = u3.lastBaseUpdate, s3 !== o3 && (s3 === null ? u3.firstBaseUpdate = l3 : s3.next = l3, u3.lastBaseUpdate = c3));
    }
    if (a3 !== null) {
      var d2 = i3.baseState;
      o3 = 0, u3 = l3 = c3 = null, s3 = a3;
      do {
        var f3 = s3.lane & -536870913, p2 = f3 !== s3.lane;
        if (p2 ? (J & f3) === f3 : (r3 & f3) === f3) {
          f3 !== 0 && f3 === Wa2 && (Eo2 = true), u3 !== null && (u3 = u3.next = { lane: 0, tag: s3.tag, payload: s3.payload, callback: null, next: null });
          a: {
            var m3 = e5, h2 = s3;
            f3 = t3;
            var g3 = n3;
            switch (h2.tag) {
              case 1:
                if (m3 = h2.payload, typeof m3 == `function`) {
                  d2 = m3.call(g3, d2, f3);
                  break a;
                }
                d2 = m3;
                break a;
              case 3:
                m3.flags = m3.flags & -65537 | 128;
              case 0:
                if (m3 = h2.payload, f3 = typeof m3 == `function` ? m3.call(g3, d2, f3) : m3, f3 == null) break a;
                d2 = C2({}, d2, f3);
                break a;
              case 2:
                yo2 = true;
            }
          }
          f3 = s3.callback, f3 !== null && (e5.flags |= 64, p2 && (e5.flags |= 8192), p2 = i3.callbacks, p2 === null ? i3.callbacks = [f3] : p2.push(f3));
        } else p2 = { lane: f3, tag: s3.tag, payload: s3.payload, callback: s3.callback, next: null }, u3 === null ? (l3 = u3 = p2, c3 = d2) : u3 = u3.next = p2, o3 |= f3;
        if (s3 = s3.next, s3 === null) {
          if (s3 = i3.shared.pending, s3 === null) break;
          p2 = s3, s3 = p2.next, p2.next = null, i3.lastBaseUpdate = p2, i3.shared.pending = null;
        }
      } while (1);
      u3 === null && (c3 = d2), i3.baseState = c3, i3.firstBaseUpdate = l3, i3.lastBaseUpdate = u3, a3 === null && (i3.shared.lanes = 0), sd |= o3, e5.lanes = o3, e5.memoizedState = d2;
    }
  }
  function ko2(e5, t3) {
    if (typeof e5 != `function`) throw Error(i2(191, e5));
    e5.call(t3);
  }
  function Ao2(e5, t3) {
    var n3 = e5.callbacks;
    if (n3 !== null) for (e5.callbacks = null, e5 = 0; e5 < n3.length; e5++) ko2(n3[e5], t3);
  }
  var I2 = Oe2(null), jo2 = Oe2(0);
  function Mo2(e5, t3) {
    e5 = ad, O2(jo2, e5), O2(I2, t3), ad = e5 | t3.baseLanes;
  }
  function No2() {
    O2(jo2, ad), O2(I2, I2.current);
  }
  function Po2() {
    ad = jo2.current, ke2(I2), ke2(jo2);
  }
  var Fo2 = Oe2(null), Io2 = null;
  function L2(e5) {
    var t3 = e5.alternate;
    O2(Vo2, Vo2.current & 1), O2(Fo2, e5), Io2 === null && (t3 === null || I2.current !== null || t3.memoizedState !== null) && (Io2 = e5);
  }
  function Lo2(e5) {
    O2(Vo2, Vo2.current), O2(Fo2, e5), Io2 === null && (Io2 = e5);
  }
  function Ro2(e5) {
    e5.tag === 22 ? (O2(Vo2, Vo2.current), O2(Fo2, e5), Io2 === null && (Io2 = e5)) : zo2();
  }
  function zo2() {
    O2(Vo2, Vo2.current), O2(Fo2, Fo2.current);
  }
  function Bo2(e5) {
    ke2(Fo2), Io2 === e5 && (Io2 = null), ke2(Vo2);
  }
  var Vo2 = Oe2(0);
  function R2(e5, t3) {
    O2(Fo2, Fo2.current), O2(Vo2, t3);
  }
  function Ho2(e5) {
    ke2(Vo2), ke2(Fo2), Io2 === e5 && (Io2 = null);
  }
  function Uo2(e5) {
    for (var t3 = e5; t3 !== null; ) {
      if (t3.tag === 13) {
        var n3 = t3.memoizedState;
        if (n3 !== null && (n3 = n3.dehydrated, n3 === null || om(n3) || sm(n3))) return t3;
      } else if (t3.tag === 19 && t3.memoizedProps.revealOrder !== `independent`) {
        if (t3.flags & 128) return t3;
      } else if (t3.child !== null) {
        t3.child.return = t3, t3 = t3.child;
        continue;
      }
      if (t3 === e5) break;
      for (; t3.sibling === null; ) {
        if (t3.return === null || t3.return === e5) return null;
        t3 = t3.return;
      }
      t3.sibling.return = t3.return, t3 = t3.sibling;
    }
    return null;
  }
  var Wo2 = 0, z2 = null, B2 = null, Go2 = null, Ko2 = false, qo2 = false, Jo2 = false, Yo2 = 0, Xo2 = 0, Zo2 = null, Qo2 = 0;
  function V2() {
    throw Error(i2(321));
  }
  function $o2(e5, t3) {
    if (t3 === null) return false;
    for (var n3 = 0; n3 < t3.length && n3 < e5.length; n3++) if (!Xr2(e5[n3], t3[n3])) return false;
    return true;
  }
  function es2(e5, t3, n3, r3, i3, a3) {
    return Wo2 = a3, z2 = t3, t3.memoizedState = null, t3.updateQueue = null, t3.lanes = 0, E2.H = e5 === null || e5.memoizedState === null ? _c : vc, Jo2 = false, a3 = n3(r3, i3), Jo2 = false, qo2 && (a3 = ns2(t3, n3, r3, i3)), ts2(e5), a3;
  }
  function ts2(e5) {
    E2.H = gc;
    var t3 = B2 !== null && B2.next !== null;
    if (Wo2 = 0, Go2 = B2 = z2 = null, Ko2 = false, Xo2 = 0, Zo2 = null, t3) throw Error(i2(300));
    e5 === null || Fc || (e5 = e5.dependencies, e5 !== null && Oa2(e5) && (Fc = true));
  }
  function ns2(e5, t3, n3, r3) {
    z2 = e5;
    var a3 = 0;
    do {
      if (qo2 && (Zo2 = null), Xo2 = 0, qo2 = false, 25 <= a3) throw Error(i2(301));
      if (a3 += 1, Go2 = B2 = null, e5.updateQueue != null) {
        var o3 = e5.updateQueue;
        o3.lastEffect = null, o3.events = null, o3.stores = null, o3.memoCache != null && (o3.memoCache.index = 0);
      }
      E2.H = yc, o3 = t3(n3, r3);
    } while (qo2);
    return o3;
  }
  function rs2() {
    var e5 = E2.H, t3 = e5.useState()[0];
    return t3 = typeof t3.then == `function` ? us2(t3) : t3, e5 = e5.useState()[0], (B2 === null ? null : B2.memoizedState) !== e5 && (z2.flags |= 1024), t3;
  }
  function is2() {
    var e5 = Yo2 !== 0;
    return Yo2 = 0, e5;
  }
  function as2(e5, t3, n3) {
    t3.updateQueue = e5.updateQueue, t3.flags &= -2053, e5.lanes &= ~n3;
  }
  function os2(e5) {
    if (Ko2) {
      for (e5 = e5.memoizedState; e5 !== null; ) {
        var t3 = e5.queue;
        t3 !== null && (t3.pending = null), e5 = e5.next;
      }
      Ko2 = false;
    }
    Wo2 = 0, Go2 = B2 = z2 = null, qo2 = false, Xo2 = Yo2 = 0, Zo2 = null;
  }
  function ss2() {
    var e5 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Go2 === null ? z2.memoizedState = Go2 = e5 : Go2 = Go2.next = e5, Go2;
  }
  function cs2() {
    if (B2 === null) {
      var e5 = z2.alternate;
      e5 = e5 === null ? null : e5.memoizedState;
    } else e5 = B2.next;
    var t3 = Go2 === null ? z2.memoizedState : Go2.next;
    if (t3 !== null) Go2 = t3, B2 = e5;
    else {
      if (e5 === null) throw z2.alternate === null ? Error(i2(467)) : Error(i2(310));
      B2 = e5, e5 = { memoizedState: B2.memoizedState, baseState: B2.baseState, baseQueue: B2.baseQueue, queue: B2.queue, next: null }, Go2 === null ? z2.memoizedState = Go2 = e5 : Go2 = Go2.next = e5;
    }
    return Go2;
  }
  function ls2() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function us2(e5) {
    var t3 = Xo2;
    return Xo2 += 1, Zo2 === null && (Zo2 = []), e5 = ao2(Zo2, e5, t3), t3 = z2, (Go2 === null ? t3.memoizedState : Go2.next) === null && (t3 = t3.alternate, E2.H = t3 === null || t3.memoizedState === null ? _c : vc), e5;
  }
  function ds2(e5) {
    if (typeof e5 == `object` && e5) {
      if (typeof e5.then == `function`) return us2(e5);
      if (e5.$$typeof === ye2) return;
      if (e5.$$typeof === le2) return Aa2(e5);
    }
    throw Error(i2(438, String(e5)));
  }
  function fs2(e5) {
    var t3 = null, n3 = z2.updateQueue;
    if (n3 !== null && (t3 = n3.memoCache), t3 == null) {
      var r3 = z2.alternate;
      r3 !== null && (r3 = r3.updateQueue, r3 !== null && (r3 = r3.memoCache, r3 != null && (t3 = { data: r3.data.map(function(e6) {
        return e6.slice();
      }), index: 0 })));
    }
    if (t3 ??= { data: [], index: 0 }, n3 === null && (n3 = ls2(), z2.updateQueue = n3), n3.memoCache = t3, n3 = t3.data[t3.index], n3 === void 0) for (n3 = t3.data[t3.index] = Array(e5), r3 = 0; r3 < e5; r3++) n3[r3] = _e2;
    return t3.index++, n3;
  }
  function ps2(e5, t3) {
    return typeof t3 == `function` ? t3(e5) : t3;
  }
  function ms2(e5) {
    return hs2(cs2(), B2, e5);
  }
  function hs2(e5, t3, n3) {
    var r3 = e5.queue;
    if (r3 === null) throw Error(i2(311));
    r3.lastRenderedReducer = n3;
    var a3 = e5.baseQueue, o3 = r3.pending;
    if (o3 !== null) {
      if (a3 !== null) {
        var s3 = a3.next;
        a3.next = o3.next, o3.next = s3;
      }
      t3.baseQueue = a3 = o3, r3.pending = null;
    }
    if (o3 = e5.baseState, a3 === null) e5.memoizedState = o3;
    else {
      t3 = a3.next;
      var c3 = s3 = null, l3 = null, u3 = t3, d2 = false;
      do {
        var f3 = u3.lane & -536870913;
        if (f3 === u3.lane ? (Wo2 & f3) === f3 : (J & f3) === f3) {
          var p2 = u3.revertLane;
          if (p2 === 0) l3 !== null && (l3 = l3.next = { lane: 0, revertLane: 0, gesture: null, action: u3.action, hasEagerState: u3.hasEagerState, eagerState: u3.eagerState, next: null }), f3 === Wa2 && (d2 = true);
          else if ((Wo2 & p2) === p2) {
            u3 = u3.next, p2 === Wa2 && (d2 = true);
            continue;
          } else f3 = { lane: 0, revertLane: u3.revertLane, gesture: null, action: u3.action, hasEagerState: u3.hasEagerState, eagerState: u3.eagerState, next: null }, l3 === null ? (c3 = l3 = f3, s3 = o3) : l3 = l3.next = f3, z2.lanes |= p2, sd |= p2;
          f3 = u3.action, Jo2 && n3(o3, f3), o3 = u3.hasEagerState ? u3.eagerState : n3(o3, f3);
        } else p2 = { lane: f3, revertLane: u3.revertLane, gesture: u3.gesture, action: u3.action, hasEagerState: u3.hasEagerState, eagerState: u3.eagerState, next: null }, l3 === null ? (c3 = l3 = p2, s3 = o3) : l3 = l3.next = p2, z2.lanes |= f3, sd |= f3;
        u3 = u3.next;
      } while (u3 !== null && u3 !== t3);
      if (l3 === null ? s3 = o3 : l3.next = c3, !Xr2(o3, e5.memoizedState) && (Fc = true, d2 && (n3 = Ga2, n3 !== null))) throw n3;
      e5.memoizedState = o3, e5.baseState = s3, e5.baseQueue = l3, r3.lastRenderedState = o3;
    }
    return a3 === null && (r3.lanes = 0), [e5.memoizedState, r3.dispatch];
  }
  function gs2(e5) {
    var t3 = cs2(), n3 = t3.queue;
    if (n3 === null) throw Error(i2(311));
    n3.lastRenderedReducer = e5;
    var r3 = n3.dispatch, a3 = n3.pending, o3 = t3.memoizedState;
    if (a3 !== null) {
      n3.pending = null;
      var s3 = a3 = a3.next;
      do
        o3 = e5(o3, s3.action), s3 = s3.next;
      while (s3 !== a3);
      Xr2(o3, t3.memoizedState) || (Fc = true), t3.memoizedState = o3, t3.baseQueue === null && (t3.baseState = o3), n3.lastRenderedState = o3;
    }
    return [o3, r3];
  }
  function _s2(e5, t3, n3) {
    var r3 = z2, a3 = cs2(), o3 = F2;
    if (o3) {
      if (n3 === void 0) throw Error(i2(407));
      n3 = n3();
    } else n3 = t3();
    var s3 = !Xr2((B2 || a3).memoizedState, n3);
    if (s3 && (a3.memoizedState = n3, Fc = true), a3 = a3.queue, Hs(bs2.bind(null, r3, a3, e5), [e5]), e5 = a3.getSnapshot !== t3 || s3 || Go2 !== null && !!(Go2.memoizedState.tag & 1), Ls(e5 ? 9 : 8, { destroy: void 0 }, ys2.bind(null, r3, a3, n3, t3), null), e5) {
      if (r3.flags |= 2048, K === null) throw Error(i2(349));
      o3 || Wo2 & 127 || vs2(r3, t3, n3);
    }
    return n3;
  }
  function vs2(e5, t3, n3) {
    e5.flags |= 16384, e5 = { getSnapshot: t3, value: n3 }, t3 = z2.updateQueue, t3 === null ? (t3 = ls2(), z2.updateQueue = t3, t3.stores = [e5]) : (n3 = t3.stores, n3 === null ? t3.stores = [e5] : n3.push(e5));
  }
  function ys2(e5, t3, n3, r3) {
    t3.value = n3, t3.getSnapshot = r3, xs2(t3) && Ss2(e5);
  }
  function bs2(e5, t3, n3) {
    return n3(function() {
      xs2(t3) && Ss2(e5);
    });
  }
  function xs2(e5) {
    var t3 = e5.getSnapshot;
    e5 = e5.value;
    try {
      var n3 = t3();
      return !Xr2(e5, n3);
    } catch {
      return true;
    }
  }
  function Ss2(e5) {
    var t3 = Fi2(e5, 2);
    t3 !== null && Pd(t3, e5, 2);
  }
  function Cs2(e5) {
    var t3 = ss2();
    if (typeof e5 == `function`) {
      var n3 = e5;
      if (e5 = n3(), Jo2) {
        st2(true);
        try {
          n3();
        } finally {
          st2(false);
        }
      }
    }
    return t3.memoizedState = t3.baseState = e5, t3.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ps2, lastRenderedState: e5 }, t3;
  }
  function ws2(e5, t3, n3, r3) {
    return e5.baseState = n3, hs2(e5, B2, typeof r3 == `function` ? r3 : ps2);
  }
  function Ts(e5, t3, n3, r3, a3) {
    if (pc(e5)) throw Error(i2(485));
    if (e5 = t3.action, e5 !== null) {
      var o3 = { payload: a3, action: e5, next: null, isTransition: true, status: `pending`, value: null, reason: null, listeners: [], then: function(e6) {
        o3.listeners.push(e6);
      } };
      E2.T === null ? o3.isTransition = false : n3(true), r3(o3), n3 = t3.pending, n3 === null ? (o3.next = t3.pending = o3, Es(t3, o3)) : (o3.next = n3.next, t3.pending = n3.next = o3);
    }
  }
  function Es(e5, t3) {
    var n3 = t3.action, r3 = t3.payload, i3 = e5.state;
    if (t3.isTransition) {
      var a3 = E2.T, o3 = {};
      o3.types = a3 === null ? null : a3.types, E2.T = o3;
      try {
        var s3 = n3(i3, r3), c3 = E2.S;
        c3 !== null && c3(o3, s3), Ds(e5, t3, s3);
      } catch (n4) {
        ks(e5, t3, n4);
      } finally {
        a3 !== null && o3.types !== null && (a3.types = o3.types), E2.T = a3;
      }
    } else try {
      a3 = n3(i3, r3), Ds(e5, t3, a3);
    } catch (n4) {
      ks(e5, t3, n4);
    }
  }
  function Ds(e5, t3, n3) {
    typeof n3 == `object` && n3 && typeof n3.then == `function` ? n3.then(function(n4) {
      Os(e5, t3, n4);
    }, function(n4) {
      return ks(e5, t3, n4);
    }) : Os(e5, t3, n3);
  }
  function Os(e5, t3, n3) {
    t3.status = `fulfilled`, t3.value = n3, As(t3), e5.state = n3, t3 = e5.pending, t3 !== null && (n3 = t3.next, n3 === t3 ? e5.pending = null : (n3 = n3.next, t3.next = n3, Es(e5, n3)));
  }
  function ks(e5, t3, n3) {
    var r3 = e5.pending;
    if (e5.pending = null, r3 !== null) {
      r3 = r3.next;
      do
        t3.status = `rejected`, t3.reason = n3, As(t3), t3 = t3.next;
      while (t3 !== r3);
    }
    e5.action = null;
  }
  function As(e5) {
    e5 = e5.listeners;
    for (var t3 = 0; t3 < e5.length; t3++) (0, e5[t3])();
  }
  function js(e5, t3) {
    return t3;
  }
  function Ms(e5, t3) {
    if (F2) {
      var n3 = K.formState;
      if (n3 !== null) {
        a: {
          var r3 = z2;
          if (F2) {
            if (P2) {
              b: {
                for (var i3 = P2, a3 = da2; i3.nodeType !== 8; ) {
                  if (!a3) {
                    i3 = null;
                    break b;
                  }
                  if (i3 = lm(i3.nextSibling), i3 === null) {
                    i3 = null;
                    break b;
                  }
                }
                a3 = i3.data, i3 = a3 === `F!` || a3 === `F` ? i3 : null;
              }
              if (i3) {
                P2 = lm(i3.nextSibling), r3 = i3.data === `F!`;
                break a;
              }
            }
            pa2(r3);
          }
          r3 = false;
        }
        r3 && (t3 = n3[0]);
      }
    }
    return n3 = ss2(), n3.memoizedState = n3.baseState = t3, r3 = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: js, lastRenderedState: t3 }, n3.queue = r3, n3 = uc.bind(null, z2, r3), r3.dispatch = n3, r3 = Cs2(false), a3 = fc.bind(null, z2, false, r3.queue), r3 = ss2(), i3 = { state: t3, dispatch: null, action: e5, pending: null }, r3.queue = i3, n3 = Ts.bind(null, z2, i3, a3, n3), i3.dispatch = n3, r3.memoizedState = e5, [t3, n3, false];
  }
  function Ns(e5) {
    return Ps(cs2(), B2, e5);
  }
  function Ps(e5, t3, n3) {
    if (t3 = hs2(e5, t3, js)[0], e5 = ms2(ps2)[0], typeof t3 == `object` && t3 && typeof t3.then == `function`) try {
      var r3 = us2(t3);
    } catch (e6) {
      throw e6 === eo2 ? no2 : e6;
    }
    else r3 = t3;
    t3 = cs2();
    var i3 = t3.queue, a3 = i3.dispatch;
    return n3 !== t3.memoizedState && (z2.flags |= 2048, Ls(9, { destroy: void 0 }, Fs.bind(null, i3, n3), null)), [r3, a3, e5];
  }
  function Fs(e5, t3) {
    e5.action = t3;
  }
  function Is(e5) {
    var t3 = cs2(), n3 = B2;
    if (n3 !== null) return Ps(t3, n3, e5);
    cs2(), t3 = t3.memoizedState, n3 = cs2();
    var r3 = n3.queue.dispatch;
    return n3.memoizedState = e5, [t3, r3, false];
  }
  function Ls(e5, t3, n3, r3) {
    return e5 = { tag: e5, create: n3, deps: r3, inst: t3, next: null }, t3 = z2.updateQueue, t3 === null && (t3 = ls2(), z2.updateQueue = t3), n3 = t3.lastEffect, n3 === null ? t3.lastEffect = e5.next = e5 : (r3 = n3.next, n3.next = e5, e5.next = r3, t3.lastEffect = e5), e5;
  }
  function Rs() {
    return cs2().memoizedState;
  }
  function zs(e5, t3, n3, r3) {
    var i3 = ss2();
    z2.flags |= e5, i3.memoizedState = Ls(1 | t3, { destroy: void 0 }, n3, r3 === void 0 ? null : r3);
  }
  function Bs(e5, t3, n3, r3) {
    var i3 = cs2();
    r3 = r3 === void 0 ? null : r3;
    var a3 = i3.memoizedState.inst;
    B2 !== null && r3 !== null && $o2(r3, B2.memoizedState.deps) ? i3.memoizedState = Ls(t3, a3, n3, r3) : (z2.flags |= e5, i3.memoizedState = Ls(1 | t3, a3, n3, r3));
  }
  function Vs(e5, t3) {
    zs(8390656, 8, e5, t3);
  }
  function Hs(e5, t3) {
    Bs(2048, 8, e5, t3);
  }
  function Us(e5) {
    z2.flags |= 4;
    var t3 = z2.updateQueue;
    if (t3 === null) t3 = ls2(), z2.updateQueue = t3, t3.events = [e5];
    else {
      var n3 = t3.events;
      n3 === null ? t3.events = [e5] : n3.push(e5);
    }
  }
  function Ws(e5) {
    var t3 = cs2().memoizedState;
    return Us({ ref: t3, nextImpl: e5 }), function() {
      if (G & 2) throw Error(i2(440));
      return t3.impl.apply(void 0, arguments);
    };
  }
  function Gs(e5, t3) {
    return Bs(4, 2, e5, t3);
  }
  function Ks(e5, t3) {
    return Bs(4, 4, e5, t3);
  }
  function qs(e5, t3) {
    if (typeof t3 == `function`) {
      e5 = e5();
      var n3 = t3(e5);
      return function() {
        typeof n3 == `function` ? n3() : t3(null);
      };
    }
    if (t3 != null) return e5 = e5(), t3.current = e5, function() {
      t3.current = null;
    };
  }
  function Js(e5, t3, n3) {
    n3 = n3 == null ? null : n3.concat([e5]), Bs(4, 4, qs.bind(null, t3, e5), n3);
  }
  function Ys() {
  }
  function Xs(e5, t3) {
    var n3 = cs2();
    t3 = t3 === void 0 ? null : t3;
    var r3 = n3.memoizedState;
    return t3 !== null && $o2(t3, r3[1]) ? r3[0] : (n3.memoizedState = [e5, t3], e5);
  }
  function Zs(e5, t3) {
    var n3 = cs2();
    t3 = t3 === void 0 ? null : t3;
    var r3 = n3.memoizedState;
    if (t3 !== null && $o2(t3, r3[1])) return r3[0];
    if (r3 = e5(), Jo2) {
      st2(true);
      try {
        e5();
      } finally {
        st2(false);
      }
    }
    return n3.memoizedState = [r3, t3], r3;
  }
  function Qs(e5, t3, n3) {
    return n3 === void 0 || Wo2 & 1073741824 && !(J & 261930) ? e5.memoizedState = t3 : (e5.memoizedState = n3, e5 = Md(), z2.lanes |= e5, sd |= e5, n3);
  }
  function $s(e5, t3, n3, r3) {
    return Xr2(n3, t3) ? n3 : I2.current === null ? !(Wo2 & 106) || Wo2 & 1073741824 && !(J & 261930) ? (Fc = true, e5.memoizedState = n3) : (e5 = Md(), z2.lanes |= e5, sd |= e5, t3) : (e5 = Qs(e5, n3, r3), Xr2(e5, t3) || (Fc = true), e5);
  }
  function ec(e5, t3, n3, r3, i3) {
    var a3 = D2.p;
    D2.p = a3 !== 0 && 8 > a3 ? a3 : 8;
    var o3 = E2.T, s3 = {};
    s3.types = o3 === null ? null : o3.types, E2.T = s3, fc(e5, false, t3, n3);
    try {
      var c3 = i3(), l3 = E2.S;
      l3 !== null && l3(s3, c3), typeof c3 == `object` && c3 && typeof c3.then == `function` ? dc(e5, t3, Ja2(c3, r3), jd(e5)) : dc(e5, t3, r3, jd(e5));
    } catch (n4) {
      dc(e5, t3, { then: function() {
      }, status: `rejected`, reason: n4 }, jd());
    } finally {
      D2.p = a3, o3 !== null && s3.types !== null && (o3.types = s3.types), E2.T = o3;
    }
  }
  function tc() {
  }
  function nc(e5, t3, n3, r3) {
    if (e5.tag !== 5) throw Error(i2(476));
    var a3 = rc(e5).queue;
    ec(e5, a3, t3, Te2, n3 === null ? tc : function() {
      return ic(e5), n3(r3);
    });
  }
  function rc(e5) {
    var t3 = e5.memoizedState;
    if (t3 !== null) return t3;
    t3 = { memoizedState: Te2, baseState: Te2, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ps2, lastRenderedState: Te2 }, next: null };
    var n3 = {};
    return t3.next = { memoizedState: n3, baseState: n3, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ps2, lastRenderedState: n3 }, next: null }, e5.memoizedState = t3, e5 = e5.alternate, e5 !== null && (e5.memoizedState = t3), t3;
  }
  function ic(e5) {
    var t3 = rc(e5);
    t3.next === null && (t3 = e5.alternate.memoizedState), dc(e5, t3.next.queue, {}, jd());
  }
  function ac() {
    return Aa2(sh);
  }
  function oc() {
    return cs2().memoizedState;
  }
  function sc() {
    return cs2().memoizedState;
  }
  function cc(e5) {
    for (var t3 = e5.return; t3 !== null; ) {
      switch (t3.tag) {
        case 24:
        case 3:
          var n3 = jd();
          e5 = So2(n3);
          var r3 = Co2(t3, e5, n3);
          r3 !== null && (Pd(r3, t3, n3), wo2(r3, t3, n3)), t3 = { cache: La2() }, e5.payload = t3;
          return;
      }
      t3 = t3.return;
    }
  }
  function lc(e5, t3, n3) {
    var r3 = jd();
    n3 = { lane: r3, revertLane: 0, gesture: null, action: n3, hasEagerState: false, eagerState: null, next: null }, pc(e5) ? mc(t3, n3) : (n3 = Pi2(e5, t3, n3, r3), n3 !== null && (Pd(n3, e5, r3), hc(n3, t3, r3)));
  }
  function uc(e5, t3, n3) {
    dc(e5, t3, n3, jd());
  }
  function dc(e5, t3, n3, r3) {
    var i3 = { lane: r3, revertLane: 0, gesture: null, action: n3, hasEagerState: false, eagerState: null, next: null };
    if (pc(e5)) mc(t3, i3);
    else {
      var a3 = e5.alternate;
      if (e5.lanes === 0 && (a3 === null || a3.lanes === 0) && (a3 = t3.lastRenderedReducer, a3 !== null)) try {
        var o3 = t3.lastRenderedState, s3 = a3(o3, n3);
        if (i3.hasEagerState = true, i3.eagerState = s3, Xr2(s3, o3)) return Ni2(e5, t3, i3, 0), K === null && Mi2(), false;
      } catch {
      }
      if (n3 = Pi2(e5, t3, i3, r3), n3 !== null) return Pd(n3, e5, r3), hc(n3, t3, r3), true;
    }
    return false;
  }
  function fc(e5, t3, n3, r3) {
    if (r3 = { lane: 2, revertLane: Pf(), gesture: null, action: r3, hasEagerState: false, eagerState: null, next: null }, pc(e5)) {
      if (t3) throw Error(i2(479));
    } else t3 = Pi2(e5, n3, r3, 2), t3 !== null && Pd(t3, e5, 2);
  }
  function pc(e5) {
    var t3 = e5.alternate;
    return e5 === z2 || t3 !== null && t3 === z2;
  }
  function mc(e5, t3) {
    qo2 = Ko2 = true;
    var n3 = e5.pending;
    n3 === null ? t3.next = t3 : (t3.next = n3.next, n3.next = t3), e5.pending = t3;
  }
  function hc(e5, t3, n3) {
    if (n3 & 4194048) {
      var r3 = t3.lanes;
      r3 &= e5.pendingLanes, n3 |= r3, t3.lanes = n3, Tt2(e5, n3);
    }
  }
  var gc = { readContext: Aa2, use: ds2, useCallback: V2, useContext: V2, useEffect: V2, useImperativeHandle: V2, useLayoutEffect: V2, useInsertionEffect: V2, useMemo: V2, useReducer: V2, useRef: V2, useState: V2, useDebugValue: V2, useDeferredValue: V2, useTransition: V2, useSyncExternalStore: V2, useId: V2, useHostTransitionStatus: V2, useFormState: V2, useActionState: V2, useOptimistic: V2, useMemoCache: V2, useCacheRefresh: V2, useEffectEvent: V2 }, _c = { readContext: Aa2, use: ds2, useCallback: function(e5, t3) {
    return ss2().memoizedState = [e5, t3 === void 0 ? null : t3], e5;
  }, useContext: Aa2, useEffect: Vs, useImperativeHandle: function(e5, t3, n3) {
    n3 = n3 == null ? null : n3.concat([e5]), zs(4194308, 4, qs.bind(null, t3, e5), n3);
  }, useLayoutEffect: function(e5, t3) {
    return zs(4194308, 4, e5, t3);
  }, useInsertionEffect: function(e5, t3) {
    zs(4, 2, e5, t3);
  }, useMemo: function(e5, t3) {
    var n3 = ss2();
    t3 = t3 === void 0 ? null : t3;
    var r3 = e5();
    if (Jo2) {
      st2(true);
      try {
        e5();
      } finally {
        st2(false);
      }
    }
    return n3.memoizedState = [r3, t3], r3;
  }, useReducer: function(e5, t3, n3) {
    var r3 = ss2();
    if (n3 !== void 0) {
      var i3 = n3(t3);
      if (Jo2) {
        st2(true);
        try {
          n3(t3);
        } finally {
          st2(false);
        }
      }
    } else i3 = t3;
    return r3.memoizedState = r3.baseState = i3, e5 = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: e5, lastRenderedState: i3 }, r3.queue = e5, e5 = e5.dispatch = lc.bind(null, z2, e5), [r3.memoizedState, e5];
  }, useRef: function(e5) {
    var t3 = ss2();
    return e5 = { current: e5 }, t3.memoizedState = e5;
  }, useState: function(e5) {
    e5 = Cs2(e5);
    var t3 = e5.queue, n3 = uc.bind(null, z2, t3);
    return t3.dispatch = n3, [e5.memoizedState, n3];
  }, useDebugValue: Ys, useDeferredValue: function(e5, t3) {
    return Qs(ss2(), e5, t3);
  }, useTransition: function() {
    var e5 = Cs2(false);
    return e5 = ec.bind(null, z2, e5.queue, true, false), ss2().memoizedState = e5, [false, e5];
  }, useSyncExternalStore: function(e5, t3, n3) {
    var r3 = z2, a3 = ss2();
    if (F2) {
      if (n3 === void 0) throw Error(i2(407));
      n3 = n3();
    } else {
      if (n3 = t3(), K === null) throw Error(i2(349));
      J & 127 || vs2(r3, t3, n3);
    }
    a3.memoizedState = n3;
    var o3 = { value: n3, getSnapshot: t3 };
    return a3.queue = o3, Vs(bs2.bind(null, r3, o3, e5), [e5]), r3.flags |= 2048, Ls(9, { destroy: void 0 }, ys2.bind(null, r3, o3, n3, t3), null), n3;
  }, useId: function() {
    var e5 = ss2(), t3 = K.identifierPrefix;
    if (F2) {
      var n3 = ia2, r3 = ra2;
      n3 = (r3 & ~(1 << 32 - ct2(r3) - 1)).toString(32) + n3, t3 = `_` + t3 + `R_` + n3, n3 = Yo2++, 0 < n3 && (t3 += `H` + n3.toString(32)), t3 += `_`;
    } else n3 = Qo2++, t3 = `_` + t3 + `r_` + n3.toString(32) + `_`;
    return e5.memoizedState = t3;
  }, useHostTransitionStatus: ac, useFormState: Ms, useActionState: Ms, useOptimistic: function(e5) {
    var t3 = ss2();
    t3.memoizedState = t3.baseState = e5;
    var n3 = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t3.queue = n3, t3 = fc.bind(null, z2, true, n3), n3.dispatch = t3, [e5, t3];
  }, useMemoCache: fs2, useCacheRefresh: function() {
    return ss2().memoizedState = cc.bind(null, z2);
  }, useEffectEvent: function(e5) {
    var t3 = ss2(), n3 = { impl: e5 };
    return t3.memoizedState = n3, function() {
      if (G & 2) throw Error(i2(440));
      return n3.impl.apply(void 0, arguments);
    };
  } }, vc = { readContext: Aa2, use: ds2, useCallback: Xs, useContext: Aa2, useEffect: Hs, useImperativeHandle: Js, useInsertionEffect: Gs, useLayoutEffect: Ks, useMemo: Zs, useReducer: ms2, useRef: Rs, useState: function() {
    return ms2(ps2);
  }, useDebugValue: Ys, useDeferredValue: function(e5, t3) {
    return $s(cs2(), B2.memoizedState, e5, t3);
  }, useTransition: function() {
    var e5 = ms2(ps2)[0], t3 = cs2().memoizedState;
    return [typeof e5 == `boolean` ? e5 : us2(e5), t3];
  }, useSyncExternalStore: _s2, useId: oc, useHostTransitionStatus: ac, useFormState: Ns, useActionState: Ns, useOptimistic: function(e5, t3) {
    return ws2(cs2(), B2, e5, t3);
  }, useMemoCache: fs2, useCacheRefresh: sc, useEffectEvent: Ws }, yc = { readContext: Aa2, use: ds2, useCallback: Xs, useContext: Aa2, useEffect: Hs, useImperativeHandle: Js, useInsertionEffect: Gs, useLayoutEffect: Ks, useMemo: Zs, useReducer: gs2, useRef: Rs, useState: function() {
    return gs2(ps2);
  }, useDebugValue: Ys, useDeferredValue: function(e5, t3) {
    var n3 = cs2();
    return B2 === null ? Qs(n3, e5, t3) : $s(n3, B2.memoizedState, e5, t3);
  }, useTransition: function() {
    var e5 = gs2(ps2)[0], t3 = cs2().memoizedState;
    return [typeof e5 == `boolean` ? e5 : us2(e5), t3];
  }, useSyncExternalStore: _s2, useId: oc, useHostTransitionStatus: ac, useFormState: Is, useActionState: Is, useOptimistic: function(e5, t3) {
    var n3 = cs2();
    return B2 === null ? (n3.baseState = e5, [e5, n3.queue.dispatch]) : ws2(n3, B2, e5, t3);
  }, useMemoCache: fs2, useCacheRefresh: sc, useEffectEvent: Ws };
  function bc(e5, t3, n3, r3) {
    t3 = e5.memoizedState, n3 = n3(r3, t3), n3 = n3 == null ? t3 : C2({}, t3, n3), e5.memoizedState = n3, e5.lanes === 0 && (e5.updateQueue.baseState = n3);
  }
  var xc = { enqueueSetState: function(e5, t3, n3) {
    e5 = e5._reactInternals;
    var r3 = jd(), i3 = So2(r3);
    i3.payload = t3, n3 != null && (i3.callback = n3), t3 = Co2(e5, i3, r3), t3 !== null && (Pd(t3, e5, r3), wo2(t3, e5, r3));
  }, enqueueReplaceState: function(e5, t3, n3) {
    e5 = e5._reactInternals;
    var r3 = jd(), i3 = So2(r3);
    i3.tag = 1, i3.payload = t3, n3 != null && (i3.callback = n3), t3 = Co2(e5, i3, r3), t3 !== null && (Pd(t3, e5, r3), wo2(t3, e5, r3));
  }, enqueueForceUpdate: function(e5, t3) {
    e5 = e5._reactInternals;
    var n3 = jd(), r3 = So2(n3);
    r3.tag = 2, t3 != null && (r3.callback = t3), t3 = Co2(e5, r3, n3), t3 !== null && (Pd(t3, e5, n3), wo2(t3, e5, n3));
  } };
  function Sc(e5, t3, n3, r3, i3, a3, o3) {
    return e5 = e5.stateNode, typeof e5.shouldComponentUpdate == `function` ? e5.shouldComponentUpdate(r3, a3, o3) : t3.prototype && t3.prototype.isPureReactComponent ? !Zr2(n3, r3) || !Zr2(i3, a3) : true;
  }
  function Cc(e5, t3, n3, r3) {
    e5 = t3.state, typeof t3.componentWillReceiveProps == `function` && t3.componentWillReceiveProps(n3, r3), typeof t3.UNSAFE_componentWillReceiveProps == `function` && t3.UNSAFE_componentWillReceiveProps(n3, r3), t3.state !== e5 && xc.enqueueReplaceState(t3, t3.state, null);
  }
  function wc(e5, t3) {
    var n3 = t3;
    if (`ref` in t3) for (var r3 in n3 = {}, t3) r3 !== `ref` && (n3[r3] = t3[r3]);
    if (e5 = e5.defaultProps) for (var i3 in n3 === t3 && (n3 = C2({}, n3)), e5) n3[i3] === void 0 && (n3[i3] = e5[i3]);
    return n3;
  }
  function Tc(e5) {
    Oi2(e5);
  }
  function Ec(e5) {
    console.error(e5);
  }
  function Dc(e5) {
    Oi2(e5);
  }
  function Oc(e5, t3) {
    try {
      var n3 = e5.onUncaughtError;
      n3(t3.value, { componentStack: t3.stack });
    } catch (e6) {
      setTimeout(function() {
        throw e6;
      });
    }
  }
  function kc(e5, t3, n3) {
    try {
      var r3 = e5.onCaughtError;
      r3(n3.value, { componentStack: n3.stack, errorBoundary: t3.tag === 1 ? t3.stateNode : null });
    } catch (e6) {
      setTimeout(function() {
        throw e6;
      });
    }
  }
  function Ac(e5, t3, n3) {
    return n3 = So2(n3), n3.tag = 3, n3.payload = { element: null }, n3.callback = function() {
      Oc(e5, t3);
    }, n3;
  }
  function jc(e5) {
    return e5 = So2(e5), e5.tag = 3, e5;
  }
  function Mc(e5, t3, n3, r3) {
    var i3 = n3.type.getDerivedStateFromError;
    if (typeof i3 == `function`) {
      var a3 = r3.value;
      e5.payload = function() {
        return i3(a3);
      }, e5.callback = function() {
        kc(t3, n3, r3);
      };
    }
    var o3 = n3.stateNode;
    o3 !== null && typeof o3.componentDidCatch == `function` && (e5.callback = function() {
      kc(t3, n3, r3), typeof i3 != `function` && (yd === null ? yd = /* @__PURE__ */ new Set([this]) : yd.add(this));
      var e6 = r3.stack;
      this.componentDidCatch(r3.value, { componentStack: e6 === null ? `` : e6 });
    });
  }
  function Nc(e5, t3, n3, r3, a3) {
    if (n3.flags |= 32768, typeof r3 == `object` && r3 && typeof r3.then == `function`) {
      if (t3 = n3.alternate, t3 !== null && Da2(t3, n3, a3, true), n3 = Fo2.current, n3 !== null) {
        switch (n3.tag) {
          case 31:
          case 13:
          case 19:
            return Io2 === null ? Kd() : n3.alternate === null && od === 0 && (od = 3), n3.flags &= -257, n3.flags |= 65536, n3.lanes = a3, r3 === ro2 ? n3.flags |= 16384 : (t3 = n3.updateQueue, t3 === null ? n3.updateQueue = /* @__PURE__ */ new Set([r3]) : t3.add(r3), mf(e5, r3, a3)), false;
          case 22:
            return n3.flags |= 65536, r3 === ro2 ? n3.flags |= 16384 : (t3 = n3.updateQueue, t3 === null ? (t3 = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([r3]) }, n3.updateQueue = t3) : (n3 = t3.retryQueue, n3 === null ? t3.retryQueue = /* @__PURE__ */ new Set([r3]) : n3.add(r3)), mf(e5, r3, a3)), false;
        }
        throw Error(i2(435, n3.tag));
      }
      return mf(e5, r3, a3), Kd(), false;
    }
    if (F2) return t3 = Fo2.current, t3 === null ? (r3 !== fa2 && (t3 = Error(i2(423), { cause: r3 }), ya2(Yi2(t3, n3))), e5 = e5.current.alternate, e5.flags |= 65536, a3 &= -a3, e5.lanes |= a3, r3 = Yi2(r3, n3), a3 = Ac(e5.stateNode, r3, a3), To2(e5, a3), od !== 4 && (od = 2)) : (!(t3.flags & 65536) && (t3.flags |= 256), t3.flags |= 65536, t3.lanes = a3, r3 !== fa2 && (e5 = Error(i2(422), { cause: r3 }), ya2(Yi2(e5, n3)))), false;
    var o3 = Error(i2(520), { cause: r3 });
    if (o3 = Yi2(o3, n3), fd === null ? fd = [o3] : fd.push(o3), od !== 4 && (od = 2), t3 === null) return true;
    r3 = Yi2(r3, n3), n3 = t3;
    do {
      switch (n3.tag) {
        case 3:
          return n3.flags |= 65536, e5 = a3 & -a3, n3.lanes |= e5, e5 = Ac(n3.stateNode, r3, e5), To2(n3, e5), false;
        case 1:
          if (t3 = n3.type, o3 = n3.stateNode, !(n3.flags & 128) && (typeof t3.getDerivedStateFromError == `function` || o3 !== null && typeof o3.componentDidCatch == `function` && (yd === null || !yd.has(o3)))) return n3.flags |= 65536, a3 &= -a3, n3.lanes |= a3, a3 = jc(a3), Mc(a3, e5, n3, r3), To2(n3, a3), false;
          break;
        case 22:
          if (n3.memoizedState !== null) return n3.flags |= 65536, false;
      }
      n3 = n3.return;
    } while (n3 !== null);
    return false;
  }
  var Pc = Error(i2(461)), Fc = false;
  function Ic(e5, t3, n3, r3) {
    t3.child = e5 === null ? vo2(t3, null, n3, r3) : _o2(t3, e5.child, n3, r3);
  }
  function Lc(e5, t3, n3, r3, i3) {
    n3 = n3.render;
    var a3 = t3.ref;
    if (`ref` in r3) {
      var o3 = {};
      for (var s3 in r3) s3 !== `ref` && (o3[s3] = r3[s3]);
    } else o3 = r3;
    return ka2(t3), r3 = es2(e5, t3, n3, o3, a3, i3), s3 = is2(), e5 !== null && !Fc ? (as2(e5, t3, i3), dl(e5, t3, i3)) : (F2 && s3 && sa2(t3), t3.flags |= 1, Ic(e5, t3, r3, i3), t3.child);
  }
  function Rc(e5, t3, n3, r3, i3) {
    if (e5 === null) {
      var a3 = n3.type;
      return typeof a3 == `function` && !Bi2(a3) && a3.defaultProps === void 0 && n3.compare === null ? (t3.tag = 15, t3.type = a3, zc(e5, t3, a3, r3, i3)) : (e5 = Ui2(n3.type, null, r3, t3, t3.mode, i3), e5.ref = t3.ref, e5.return = t3, t3.child = e5);
    }
    if (a3 = e5.child, !fl(e5, i3)) {
      var o3 = a3.memoizedProps;
      if (n3 = n3.compare, n3 = n3 === null ? Zr2 : n3, n3(o3, r3) && e5.ref === t3.ref) return dl(e5, t3, i3);
    }
    return t3.flags |= 1, e5 = Vi2(a3, r3), e5.ref = t3.ref, e5.return = t3, t3.child = e5;
  }
  function zc(e5, t3, n3, r3, i3) {
    if (e5 !== null) {
      var a3 = e5.memoizedProps;
      if (Zr2(a3, r3) && e5.ref === t3.ref) {
        if (Fc = false, t3.pendingProps = r3 = a3, fl(e5, i3)) e5.flags & 131072 && (Fc = true);
        else return t3.lanes = e5.lanes, dl(e5, t3, i3);
      }
    }
    return qc(e5, t3, n3, r3, i3);
  }
  function Bc(e5, t3, n3, r3) {
    var i3 = r3.children, a3 = e5 === null ? null : e5.memoizedState;
    if (e5 === null && t3.stateNode === null && (t3.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), r3.mode === `hidden`) {
      if (t3.flags & 128) {
        if (a3 = a3 === null ? n3 : a3.baseLanes | n3, e5 !== null) {
          for (r3 = t3.child = e5.child, i3 = 0; r3 !== null; ) i3 = i3 | r3.lanes | r3.childLanes, r3 = r3.sibling;
          r3 = i3 & ~a3;
        } else r3 = 0, t3.child = null;
        return Hc(e5, t3, a3, n3, r3);
      }
      if (n3 & 536870912) t3.memoizedState = { baseLanes: 0, cachePool: null }, e5 !== null && Qa2(t3, a3 === null ? null : a3.cachePool), a3 === null ? No2() : Mo2(t3, a3), Ro2(t3);
      else return r3 = t3.lanes = 536870912, Hc(e5, t3, a3 === null ? n3 : a3.baseLanes | n3, n3, r3);
    } else a3 === null ? (e5 !== null && Qa2(t3, null), No2(), zo2()) : (Qa2(t3, a3.cachePool), Mo2(t3, a3), zo2(), t3.memoizedState = null);
    return Ic(e5, t3, i3, n3), t3.child;
  }
  function Vc(e5, t3) {
    return e5 !== null && e5.tag === 22 || t3.stateNode !== null || (t3.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t3.sibling;
  }
  function Hc(e5, t3, n3, r3, i3) {
    var a3 = Za2();
    return a3 = a3 === null ? null : { parent: Ia2._currentValue, pool: a3 }, t3.memoizedState = { baseLanes: n3, cachePool: a3 }, e5 !== null && Qa2(t3, null), No2(), Ro2(t3), e5 !== null && Da2(e5, t3, r3, true), t3.childLanes = i3, null;
  }
  function Uc(e5, t3) {
    return t3 = nl({ mode: t3.mode, children: t3.children }, e5.mode), t3.ref = e5.ref, e5.child = t3, t3.return = e5, t3;
  }
  function Wc(e5, t3, n3) {
    return _o2(t3, e5.child, null, n3), e5 = Uc(t3, t3.pendingProps), e5.flags |= 2, Bo2(t3), t3.memoizedState = null, e5;
  }
  function Gc(e5, t3, n3) {
    var r3 = t3.pendingProps, a3 = !!(t3.flags & 128);
    if (t3.flags &= -129, e5 === null) {
      if (F2) {
        if (r3.mode === `hidden`) return e5 = Uc(t3, r3), t3.lanes = 536870912, e5.memoizedState = { baseLanes: 0, cachePool: null }, Vc(null, e5);
        if (Lo2(t3), (e5 = P2) ? (e5 = am(e5, da2), e5 = e5 !== null && e5.data === `&` ? e5 : null, e5 !== null && (t3.memoizedState = { dehydrated: e5, treeContext: na2 === null ? null : { id: ra2, overflow: ia2 }, retryLane: 536870912, hydrationErrors: null }, n3 = Ki2(e5), n3.return = t3, t3.child = n3, N2 = t3, P2 = null)) : e5 = null, e5 === null) throw pa2(t3);
        return t3.lanes = 536870912, null;
      }
      return Uc(t3, r3);
    }
    var o3 = e5.memoizedState;
    if (o3 !== null) {
      var s3 = o3.dehydrated;
      if (Lo2(t3), a3) {
        if (t3.flags & 256) t3.flags &= -257, t3 = Wc(e5, t3, n3);
        else if (t3.memoizedState !== null) t3.child = e5.child, t3.flags |= 128, t3 = null;
        else throw Error(i2(558));
      } else if (Fc || Da2(e5, t3, n3, false), a3 = (n3 & e5.childLanes) !== 0, Fc || a3) {
        if (I2.current === null) {
          if (r3 = K, r3 !== null && (s3 = Et2(r3, n3), s3 !== 0 && s3 !== o3.retryLane)) throw o3.retryLane = s3, Fi2(e5, s3), Pd(r3, e5, s3), Pc;
          Kd();
        }
        t3 = Wc(e5, t3, n3);
      } else e5 = o3.treeContext, P2 = lm(s3.nextSibling), N2 = t3, F2 = true, ua2 = null, da2 = false, e5 !== null && la2(t3, e5), t3 = Uc(t3, r3), t3.flags |= 134221824;
      return t3;
    }
    return e5 = Vi2(e5.child, { mode: r3.mode, children: r3.children }), e5.ref = t3.ref, t3.child = e5, e5.return = t3, e5;
  }
  function Kc(e5, t3) {
    var n3 = t3.ref;
    if (n3 === null) e5 !== null && e5.ref !== null && (t3.flags |= 4194816);
    else {
      if (typeof n3 != `function` && typeof n3 != `object`) throw Error(i2(284));
      (e5 === null || e5.ref !== n3) && (t3.flags |= 4194816);
    }
  }
  function qc(e5, t3, n3, r3, i3) {
    return ka2(t3), n3 = es2(e5, t3, n3, r3, void 0, i3), r3 = is2(), e5 !== null && !Fc ? (as2(e5, t3, i3), dl(e5, t3, i3)) : (F2 && r3 && sa2(t3), t3.flags |= 1, Ic(e5, t3, n3, i3), t3.child);
  }
  function Jc(e5, t3, n3, r3, i3, a3) {
    return ka2(t3), t3.updateQueue = null, n3 = ns2(t3, r3, n3, i3), ts2(e5), r3 = is2(), e5 !== null && !Fc ? (as2(e5, t3, a3), dl(e5, t3, a3)) : (F2 && r3 && sa2(t3), t3.flags |= 1, Ic(e5, t3, n3, a3), t3.child);
  }
  function Yc(e5, t3, n3, r3, i3) {
    if (ka2(t3), t3.stateNode === null) {
      var a3 = Ri2, o3 = n3.contextType;
      typeof o3 == `object` && o3 && (a3 = Aa2(o3)), a3 = new n3(r3, a3), t3.memoizedState = a3.state !== null && a3.state !== void 0 ? a3.state : null, a3.updater = xc, t3.stateNode = a3, a3._reactInternals = t3, a3 = t3.stateNode, a3.props = r3, a3.state = t3.memoizedState, a3.refs = {}, bo2(t3), o3 = n3.contextType, a3.context = typeof o3 == `object` && o3 ? Aa2(o3) : Ri2, a3.state = t3.memoizedState, o3 = n3.getDerivedStateFromProps, typeof o3 == `function` && (bc(t3, n3, o3, r3), a3.state = t3.memoizedState), typeof n3.getDerivedStateFromProps == `function` || typeof a3.getSnapshotBeforeUpdate == `function` || typeof a3.UNSAFE_componentWillMount != `function` && typeof a3.componentWillMount != `function` || (o3 = a3.state, typeof a3.componentWillMount == `function` && a3.componentWillMount(), typeof a3.UNSAFE_componentWillMount == `function` && a3.UNSAFE_componentWillMount(), o3 !== a3.state && xc.enqueueReplaceState(a3, a3.state, null), Oo2(t3, r3, a3, i3), Do2(), a3.state = t3.memoizedState), typeof a3.componentDidMount == `function` && (t3.flags |= 4194308), r3 = true;
    } else if (e5 === null) {
      a3 = t3.stateNode;
      var s3 = t3.memoizedProps, c3 = wc(n3, s3);
      a3.props = c3;
      var l3 = a3.context, u3 = n3.contextType;
      o3 = Ri2, typeof u3 == `object` && u3 && (o3 = Aa2(u3));
      var d2 = n3.getDerivedStateFromProps;
      u3 = typeof d2 == `function` || typeof a3.getSnapshotBeforeUpdate == `function`, s3 = t3.pendingProps !== s3, u3 || typeof a3.UNSAFE_componentWillReceiveProps != `function` && typeof a3.componentWillReceiveProps != `function` || (s3 || l3 !== o3) && Cc(t3, a3, r3, o3), yo2 = false;
      var f3 = t3.memoizedState;
      a3.state = f3, Oo2(t3, r3, a3, i3), Do2(), l3 = t3.memoizedState, s3 || f3 !== l3 || yo2 ? (typeof d2 == `function` && (bc(t3, n3, d2, r3), l3 = t3.memoizedState), (c3 = yo2 || Sc(t3, n3, c3, r3, f3, l3, o3)) ? (u3 || typeof a3.UNSAFE_componentWillMount != `function` && typeof a3.componentWillMount != `function` || (typeof a3.componentWillMount == `function` && a3.componentWillMount(), typeof a3.UNSAFE_componentWillMount == `function` && a3.UNSAFE_componentWillMount()), typeof a3.componentDidMount == `function` && (t3.flags |= 4194308)) : (typeof a3.componentDidMount == `function` && (t3.flags |= 4194308), t3.memoizedProps = r3, t3.memoizedState = l3), a3.props = r3, a3.state = l3, a3.context = o3, r3 = c3) : (typeof a3.componentDidMount == `function` && (t3.flags |= 4194308), r3 = false);
    } else {
      a3 = t3.stateNode, xo2(e5, t3), o3 = t3.memoizedProps, u3 = wc(n3, o3), a3.props = u3, d2 = t3.pendingProps, f3 = a3.context, l3 = n3.contextType, c3 = Ri2, typeof l3 == `object` && l3 && (c3 = Aa2(l3)), s3 = n3.getDerivedStateFromProps, (l3 = typeof s3 == `function` || typeof a3.getSnapshotBeforeUpdate == `function`) || typeof a3.UNSAFE_componentWillReceiveProps != `function` && typeof a3.componentWillReceiveProps != `function` || (o3 !== d2 || f3 !== c3) && Cc(t3, a3, r3, c3), yo2 = false, f3 = t3.memoizedState, a3.state = f3, Oo2(t3, r3, a3, i3), Do2();
      var p2 = t3.memoizedState;
      o3 !== d2 || f3 !== p2 || yo2 || e5 !== null && e5.dependencies !== null && Oa2(e5.dependencies) ? (typeof s3 == `function` && (bc(t3, n3, s3, r3), p2 = t3.memoizedState), (u3 = yo2 || Sc(t3, n3, u3, r3, f3, p2, c3) || e5 !== null && e5.dependencies !== null && Oa2(e5.dependencies)) ? (l3 || typeof a3.UNSAFE_componentWillUpdate != `function` && typeof a3.componentWillUpdate != `function` || (typeof a3.componentWillUpdate == `function` && a3.componentWillUpdate(r3, p2, c3), typeof a3.UNSAFE_componentWillUpdate == `function` && a3.UNSAFE_componentWillUpdate(r3, p2, c3)), typeof a3.componentDidUpdate == `function` && (t3.flags |= 4), typeof a3.getSnapshotBeforeUpdate == `function` && (t3.flags |= 1024)) : (typeof a3.componentDidUpdate != `function` || o3 === e5.memoizedProps && f3 === e5.memoizedState || (t3.flags |= 4), typeof a3.getSnapshotBeforeUpdate != `function` || o3 === e5.memoizedProps && f3 === e5.memoizedState || (t3.flags |= 1024), t3.memoizedProps = r3, t3.memoizedState = p2), a3.props = r3, a3.state = p2, a3.context = c3, r3 = u3) : (typeof a3.componentDidUpdate != `function` || o3 === e5.memoizedProps && f3 === e5.memoizedState || (t3.flags |= 4), typeof a3.getSnapshotBeforeUpdate != `function` || o3 === e5.memoizedProps && f3 === e5.memoizedState || (t3.flags |= 1024), r3 = false);
    }
    return a3 = r3, Kc(e5, t3), r3 = !!(t3.flags & 128), a3 || r3 ? (a3 = t3.stateNode, n3 = r3 && typeof n3.getDerivedStateFromError != `function` ? null : a3.render(), t3.flags |= 1, e5 !== null && r3 ? (t3.child = _o2(t3, e5.child, null, i3), t3.child = _o2(t3, null, n3, i3)) : Ic(e5, t3, n3, i3), t3.memoizedState = a3.state, e5 = t3.child) : e5 = dl(e5, t3, i3), e5;
  }
  function Xc(e5, t3, n3, r3) {
    return _a2(), t3.flags |= 256, Ic(e5, t3, n3, r3), t3.child;
  }
  var Zc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Qc(e5) {
    return { baseLanes: e5, cachePool: $a2() };
  }
  function $c(e5, t3, n3) {
    return e5 = e5 === null ? 0 : e5.childLanes & ~n3, t3 && (e5 |= ud), e5;
  }
  function el(e5, t3, n3) {
    var r3 = t3.pendingProps, i3 = false, a3 = !!(t3.flags & 128), o3;
    if ((o3 = a3) || (o3 = e5 !== null && e5.memoizedState === null ? false : !!(Vo2.current & 2)), o3 && (i3 = true, t3.flags &= -129), o3 = !!(t3.flags & 32), t3.flags &= -33, e5 === null) {
      if (F2) {
        if (i3 ? L2(t3) : zo2(), (e5 = P2) ? (e5 = am(e5, da2), e5 = e5 !== null && e5.data !== `&` ? e5 : null, e5 !== null && (t3.memoizedState = { dehydrated: e5, treeContext: na2 === null ? null : { id: ra2, overflow: ia2 }, retryLane: 536870912, hydrationErrors: null }, n3 = Ki2(e5), n3.return = t3, t3.child = n3, N2 = t3, P2 = null)) : e5 = null, e5 === null) throw pa2(t3);
        return t3.lanes = sm(e5) ? 32 : 536870912, null;
      }
      return a3 = r3.children, r3 = r3.fallback, i3 ? (zo2(), i3 = t3.mode, a3 = nl({ mode: `hidden`, children: a3 }, i3), r3 = Wi2(r3, i3, n3, null), a3.return = t3, r3.return = t3, a3.sibling = r3, t3.child = a3, r3 = t3.child, r3.memoizedState = Qc(n3), r3.childLanes = $c(e5, o3, n3), t3.memoizedState = Zc, Vc(null, r3)) : (L2(t3), tl(t3, a3));
    }
    var s3 = e5.memoizedState;
    if (s3 !== null) {
      var c3 = s3.dehydrated;
      if (c3 !== null) return il(e5, t3, a3, o3, r3, c3, s3, n3);
    }
    return i3 ? (zo2(), i3 = r3.fallback, a3 = t3.mode, s3 = e5.child, c3 = s3.sibling, r3 = Vi2(s3, { mode: `hidden`, children: r3.children }), r3.subtreeFlags = s3.subtreeFlags & 1206910976, c3 === null ? (i3 = Wi2(i3, a3, n3, null), i3.flags |= 2) : i3 = Vi2(c3, i3), i3.return = t3, r3.return = t3, r3.sibling = i3, t3.child = r3, Vc(null, r3), r3 = t3.child, i3 = e5.child.memoizedState, i3 === null ? i3 = Qc(n3) : (a3 = i3.cachePool, a3 === null ? a3 = $a2() : (s3 = Ia2._currentValue, a3 = a3.parent === s3 ? a3 : { parent: s3, pool: s3 }), i3 = { baseLanes: i3.baseLanes | n3, cachePool: a3 }), r3.memoizedState = i3, r3.childLanes = $c(e5, o3, n3), t3.memoizedState = Zc, Vc(e5.child, r3)) : (L2(t3), n3 = e5.child, e5 = n3.sibling, n3 = Vi2(n3, { mode: `visible`, children: r3.children }), n3.return = t3, n3.sibling = null, e5 !== null && (o3 = t3.deletions, o3 === null ? (t3.deletions = [e5], t3.flags |= 16) : o3.push(e5)), t3.child = n3, t3.memoizedState = null, n3);
  }
  function tl(e5, t3) {
    return t3 = nl({ mode: `visible`, children: t3 }, e5.mode), t3.return = e5, e5.child = t3;
  }
  function nl(e5, t3) {
    return e5 = M2(22, e5, null, t3), e5.lanes = 0, e5;
  }
  function rl(e5, t3, n3) {
    return _o2(t3, e5.child, null, n3), e5 = tl(t3, t3.pendingProps.children), e5.flags |= 2, t3.memoizedState = null, e5;
  }
  function il(e5, t3, n3, r3, a3, o3, s3, c3) {
    if (n3) return t3.flags & 256 ? (L2(t3), t3.flags &= -257, rl(e5, t3, c3)) : t3.memoizedState === null ? (zo2(), o3 = a3.fallback, s3 = t3.mode, a3 = nl({ mode: `visible`, children: a3.children }, s3), o3 = Wi2(o3, s3, c3, null), o3.flags |= 2, a3.return = t3, o3.return = t3, a3.sibling = o3, t3.child = a3, _o2(t3, e5.child, null, c3), a3 = t3.child, a3.memoizedState = Qc(c3), a3.childLanes = $c(e5, r3, c3), t3.memoizedState = Zc, Vc(null, a3)) : (zo2(), t3.child = e5.child, t3.flags |= 128, null);
    if (L2(t3), sm(o3)) {
      if (r3 = o3.nextSibling && o3.nextSibling.dataset, r3) var l3 = r3.dgst;
      return r3 = l3, r3 !== `` && (a3 = Error(i2(419)), a3.stack = ``, a3.digest = r3, ya2({ value: a3, source: null, stack: null })), rl(e5, t3, c3);
    }
    if (Fc || Da2(e5, t3, c3, false), r3 = (c3 & e5.childLanes) !== 0, Fc || r3) {
      if (I2.current !== null) return rl(e5, t3, c3);
      if (r3 = K, r3 !== null && (a3 = Et2(r3, c3), a3 !== 0 && a3 !== s3.retryLane)) throw s3.retryLane = a3, Fi2(e5, a3), Pd(r3, e5, a3), Pc;
      return om(o3) || Kd(), rl(e5, t3, c3);
    }
    return om(o3) ? (t3.flags |= 192, t3.child = e5.child, null) : (e5 = s3.treeContext, P2 = lm(o3.nextSibling), N2 = t3, F2 = true, ua2 = null, da2 = false, e5 !== null && la2(t3, e5), t3 = tl(t3, a3.children), t3.flags |= 134221824, t3);
  }
  function al(e5, t3, n3) {
    e5.lanes |= t3;
    var r3 = e5.alternate;
    r3 !== null && (r3.lanes |= t3), Ta2(e5.return, t3, n3);
  }
  function ol(e5) {
    for (var t3 = null; e5 !== null; ) {
      var n3 = e5.alternate;
      n3 !== null && Uo2(n3) === null && (t3 = e5), e5 = e5.sibling;
    }
    return t3;
  }
  function sl(e5, t3, n3, r3, i3, a3) {
    var o3 = e5.memoizedState;
    o3 === null ? e5.memoizedState = { isBackwards: t3, rendering: null, renderingStartTime: 0, last: r3, tail: n3, tailMode: i3, treeForkCount: a3 } : (o3.isBackwards = t3, o3.rendering = null, o3.renderingStartTime = 0, o3.last = r3, o3.tail = n3, o3.tailMode = i3, o3.treeForkCount = a3);
  }
  function cl(e5) {
    var t3 = e5.child;
    for (e5.child = null; t3 !== null; ) {
      var n3 = t3.sibling;
      t3.sibling = e5.child, e5.child = t3, t3 = n3;
    }
  }
  function ll(e5, t3, n3) {
    var r3 = t3.pendingProps, i3 = r3.revealOrder, a3 = r3.tail;
    r3 = r3.children;
    var o3 = Vo2.current;
    if (t3.flags & 128) return R2(t3, o3), null;
    var s3 = !!(o3 & 2);
    if (s3 ? (o3 = o3 & 1 | 2, t3.flags |= 128) : o3 &= 1, R2(t3, o3), i3 === `backwards` && e5 !== null ? (cl(e5), Ic(e5, t3, r3, n3), cl(e5)) : Ic(e5, t3, r3, n3), r3 = F2 ? $i2 : 0, !s3 && e5 !== null && e5.flags & 128) a: for (e5 = t3.child; e5 !== null; ) {
      if (e5.tag === 13) e5.memoizedState !== null && al(e5, n3, t3);
      else if (e5.tag === 19) al(e5, n3, t3);
      else if (e5.child !== null) {
        e5.child.return = e5, e5 = e5.child;
        continue;
      }
      if (e5 === t3) break a;
      for (; e5.sibling === null; ) {
        if (e5.return === null || e5.return === t3) break a;
        e5 = e5.return;
      }
      e5.sibling.return = e5.return, e5 = e5.sibling;
    }
    switch (i3) {
      case `backwards`:
        n3 = ol(t3.child), n3 === null ? (i3 = t3.child, t3.child = null) : (i3 = n3.sibling, n3.sibling = null, cl(t3)), sl(t3, true, i3, null, a3, r3);
        break;
      case `unstable_legacy-backwards`:
        for (n3 = null, i3 = t3.child, t3.child = null; i3 !== null; ) {
          if (e5 = i3.alternate, e5 !== null && Uo2(e5) === null) {
            t3.child = i3;
            break;
          }
          e5 = i3.sibling, i3.sibling = n3, n3 = i3, i3 = e5;
        }
        sl(t3, true, n3, null, a3, r3);
        break;
      case `together`:
        sl(t3, false, null, null, void 0, r3);
        break;
      case `independent`:
        t3.memoizedState = null;
        break;
      default:
        n3 = ol(t3.child), n3 === null ? (i3 = t3.child, t3.child = null) : (i3 = n3.sibling, n3.sibling = null), sl(t3, false, i3, n3, a3, r3);
    }
    return t3.child;
  }
  function ul(e5, t3, n3) {
    var r3 = t3.pendingProps;
    return Ca2(t3, t3.type, r3.value), Ic(e5, t3, r3.children, n3), t3.child;
  }
  function dl(e5, t3, n3) {
    if (e5 !== null && (t3.dependencies = e5.dependencies), sd |= t3.lanes, (n3 & t3.childLanes) === 0) {
      if (e5 !== null) {
        if (Da2(e5, t3, n3, false), (n3 & t3.childLanes) === 0) return null;
      } else return null;
    }
    if (e5 !== null && t3.child !== e5.child) throw Error(i2(153));
    if (t3.child !== null) {
      for (e5 = t3.child, n3 = Vi2(e5, e5.pendingProps), t3.child = n3, n3.return = t3; e5.sibling !== null; ) e5 = e5.sibling, n3 = n3.sibling = Vi2(e5, e5.pendingProps), n3.return = t3;
      n3.sibling = null;
    }
    return t3.child;
  }
  function fl(e5, t3) {
    return (e5.lanes & t3) !== 0 || (e5 = e5.dependencies, !!(e5 !== null && Oa2(e5)));
  }
  function pl(e5, t3, n3) {
    switch (t3.tag) {
      case 3:
        Pe2(t3, t3.stateNode.containerInfo), Ca2(t3, Ia2, e5.memoizedState.cache), _a2();
        break;
      case 27:
      case 5:
        Ie2(t3);
        break;
      case 4:
        Pe2(t3, t3.stateNode.containerInfo);
        break;
      case 10:
        Ca2(t3, t3.type, t3.memoizedProps.value);
        break;
      case 31:
        if (t3.memoizedState !== null) return t3.flags |= 128, Lo2(t3), null;
        break;
      case 13:
        var r3 = t3.memoizedState;
        if (r3 !== null) {
          if (r3.dehydrated !== null) return L2(t3), t3.flags |= 128, null;
          r3 = Da2(e5, t3, n3, false);
          var i3 = t3.child.childLanes;
          return r3 || (n3 & i3) !== 0 ? el(e5, t3, n3) : (L2(t3), e5 = dl(e5, t3, n3), e5 === null ? null : e5.sibling);
        }
        L2(t3);
        break;
      case 19:
        if (t3.flags & 128) return ll(e5, t3, n3);
        if (i3 = !!(e5.flags & 128), r3 = (n3 & t3.childLanes) !== 0, r3 ||= (Da2(e5, t3, n3, false), (n3 & t3.childLanes) !== 0), i3) {
          if (r3) return ll(e5, t3, n3);
          t3.flags |= 128;
        }
        if (i3 = t3.memoizedState, i3 !== null && (i3.rendering = null, i3.tail = null, i3.lastEffect = null), R2(t3, Vo2.current), r3) break;
        return null;
      case 22:
        return t3.lanes = 0, Bc(e5, t3, n3, t3.pendingProps);
      case 24:
        Ca2(t3, Ia2, e5.memoizedState.cache);
    }
    return dl(e5, t3, n3);
  }
  function ml(e5, t3, n3) {
    if (e5 !== null) {
      if (e5.memoizedProps !== t3.pendingProps) Fc = true;
      else {
        if (!fl(e5, n3) && !(t3.flags & 128)) return Fc = false, pl(e5, t3, n3);
        Fc = !!(e5.flags & 131072);
      }
    } else Fc = false, F2 && t3.flags & 1048576 && oa2(t3, $i2, t3.index);
    switch (t3.lanes = 0, t3.tag) {
      case 16:
        a: {
          var r3 = t3.pendingProps;
          if (e5 = oo2(t3.elementType), t3.type = e5, typeof e5 == `function`) Bi2(e5) ? (r3 = wc(e5, r3), t3.tag = 1, t3 = Yc(null, t3, e5, r3, n3)) : (t3.tag = 0, t3 = qc(null, t3, e5, r3, n3));
          else {
            if (e5 != null) {
              var a3 = e5.$$typeof;
              if (a3 === ue2) {
                t3.tag = 11, t3 = Lc(null, t3, e5, r3, n3);
                break a;
              }
              if (a3 === pe2) {
                t3.tag = 14, t3 = Rc(null, t3, e5, r3, n3);
                break a;
              }
              if (a3 === le2) {
                t3.tag = 10, t3.type = e5, t3 = ul(null, t3, n3);
                break a;
              }
            }
            throw t3 = Ce2(e5) || e5, Error(i2(306, t3, ``));
          }
        }
        return t3;
      case 0:
        return qc(e5, t3, t3.type, t3.pendingProps, n3);
      case 1:
        return r3 = t3.type, a3 = wc(r3, t3.pendingProps), Yc(e5, t3, r3, a3, n3);
      case 3:
        a: {
          if (Pe2(t3, t3.stateNode.containerInfo), e5 === null) throw Error(i2(387));
          r3 = t3.pendingProps;
          var o3 = t3.memoizedState;
          a3 = o3.element, xo2(e5, t3), Oo2(t3, r3, null, n3);
          var s3 = t3.memoizedState;
          if (r3 = s3.cache, Ca2(t3, Ia2, r3), r3 !== o3.cache && Ea2(t3, [Ia2], n3, true), Do2(), r3 = s3.element, o3.isDehydrated) {
            if (o3 = { element: r3, isDehydrated: false, cache: s3.cache }, t3.updateQueue.baseState = o3, t3.memoizedState = o3, t3.flags & 256) {
              t3 = Xc(e5, t3, r3, n3);
              break a;
            }
            if (r3 !== a3) {
              a3 = Yi2(Error(i2(424)), t3), ya2(a3), t3 = Xc(e5, t3, r3, n3);
              break a;
            }
            switch (e5 = t3.stateNode.containerInfo, e5.nodeType) {
              case 9:
                e5 = e5.body;
                break;
              default:
                e5 = e5.nodeName === `HTML` ? e5.ownerDocument.body : e5;
            }
            for (P2 = lm(e5.firstChild), N2 = t3, F2 = true, ua2 = null, da2 = true, n3 = vo2(t3, null, r3, n3), t3.child = n3; n3; ) n3.flags = n3.flags & -3 | 134221824, n3 = n3.sibling;
          } else {
            if (_a2(), r3 === a3) {
              t3 = dl(e5, t3, n3);
              break a;
            }
            Ic(e5, t3, r3, n3);
          }
          t3 = t3.child;
        }
        return t3;
      case 26:
        return Kc(e5, t3), e5 === null ? (n3 = Nm(t3.type, null, t3.pendingProps, null)) ? t3.memoizedState = n3 : F2 || (t3.stateNode = fp(t3.type, t3.pendingProps, Me2.current, t3)) : t3.memoizedState = Nm(t3.type, e5.memoizedProps, t3.pendingProps, e5.memoizedState), null;
      case 27:
        return Ie2(t3), e5 === null && F2 && (r3 = t3.stateNode = hm(t3.type, t3.pendingProps, Me2.current), N2 = t3, da2 = true, a3 = P2, Sp(t3.type) ? (um = a3, P2 = lm(r3.firstChild)) : P2 = a3), Ic(e5, t3, t3.pendingProps.children, n3), Kc(e5, t3), e5 === null && (t3.flags |= 4194304), t3.child;
      case 5:
        return e5 === null && F2 && ((a3 = r3 = P2) && (r3 = rm(r3, t3.type, t3.pendingProps, da2), r3 === null ? a3 = false : (t3.stateNode = r3, N2 = t3, P2 = lm(r3.firstChild), da2 = false, a3 = true)), a3 || pa2(t3)), Ie2(t3), a3 = t3.type, o3 = t3.pendingProps, s3 = e5 === null ? null : e5.memoizedProps, r3 = o3.children, pp(a3, o3) ? r3 = null : s3 !== null && pp(a3, s3) && (t3.flags |= 32), t3.memoizedState !== null && (a3 = es2(e5, t3, rs2, null, null, n3), sh._currentValue = a3), Kc(e5, t3), Ic(e5, t3, r3, n3), t3.child;
      case 6:
        return e5 === null && F2 && ((e5 = n3 = P2) && (n3 = im(n3, t3.pendingProps, da2), n3 === null ? e5 = false : (t3.stateNode = n3, N2 = t3, P2 = null, e5 = true)), e5 || pa2(t3)), null;
      case 13:
        return el(e5, t3, n3);
      case 4:
        return Pe2(t3, t3.stateNode.containerInfo), r3 = t3.pendingProps, e5 === null ? t3.child = _o2(t3, null, r3, n3) : Ic(e5, t3, r3, n3), t3.child;
      case 11:
        return Lc(e5, t3, t3.type, t3.pendingProps, n3);
      case 7:
        return r3 = t3.pendingProps, Kc(e5, t3), Ic(e5, t3, r3, n3), t3.child;
      case 8:
        return Ic(e5, t3, t3.pendingProps.children, n3), t3.child;
      case 12:
        return Ic(e5, t3, t3.pendingProps.children, n3), t3.child;
      case 10:
        return ul(e5, t3, n3);
      case 9:
        return a3 = t3.type._context, r3 = t3.pendingProps.children, ka2(t3), a3 = Aa2(a3), r3 = r3(a3), t3.flags |= 1, Ic(e5, t3, r3, n3), t3.child;
      case 14:
        return Rc(e5, t3, t3.type, t3.pendingProps, n3);
      case 15:
        return zc(e5, t3, t3.type, t3.pendingProps, n3);
      case 19:
        return ll(e5, t3, n3);
      case 31:
        return Gc(e5, t3, n3);
      case 22:
        return Bc(e5, t3, n3, t3.pendingProps);
      case 24:
        return ka2(t3), r3 = Aa2(Ia2), e5 === null ? (a3 = Za2(), a3 === null && (a3 = K, o3 = La2(), a3.pooledCache = o3, o3.refCount++, o3 !== null && (a3.pooledCacheLanes |= n3), a3 = o3), t3.memoizedState = { parent: r3, cache: a3 }, bo2(t3), Ca2(t3, Ia2, a3)) : ((e5.lanes & n3) !== 0 && (xo2(e5, t3), Oo2(t3, null, null, n3), Do2()), a3 = e5.memoizedState, o3 = t3.memoizedState, a3.parent === r3 ? (r3 = o3.cache, Ca2(t3, Ia2, r3), r3 !== a3.cache && Ea2(t3, [Ia2], n3, true)) : (a3 = { parent: r3, cache: r3 }, t3.memoizedState = a3, t3.lanes === 0 && (t3.memoizedState = t3.updateQueue.baseState = a3), Ca2(t3, Ia2, r3))), Ic(e5, t3, t3.pendingProps.children, n3), t3.child;
      case 30:
        return t3.stateNode === null && (t3.stateNode = { autoName: null, paired: null, clones: null, ref: null }), r3 = t3.pendingProps, r3.name != null && r3.name !== `auto` ? t3.flags |= e5 === null ? 18882560 : 18874368 : F2 && sa2(t3), e5 !== null && e5.memoizedProps.name !== r3.name ? t3.flags |= 4194816 : Kc(e5, t3), Ic(e5, t3, r3.children, n3), t3.child;
      case 29:
        throw t3.pendingProps;
    }
    throw Error(i2(156, t3.tag));
  }
  function hl(e5) {
    e5.flags |= 4;
  }
  function gl(e5, t3, n3, r3, i3) {
    var a3;
    if ((a3 = !!(e5.mode & 32)) && (a3 = n3 === null ? Jm(t3, r3) : Jm(t3, r3) && (r3.src !== n3.src || r3.srcSet !== n3.srcSet)), a3) {
      if (e5.flags |= 16777216, (i3 & 335544128) === i3) {
        if (e5.stateNode.complete) e5.flags |= 8192;
        else if (Ud()) e5.flags |= 8192;
        else throw so2 = ro2, to2;
      }
    } else e5.flags &= -16777217;
  }
  function _l(e5, t3) {
    if (t3.type !== `stylesheet` || t3.state.loading & 4) e5.flags &= -16777217;
    else if (e5.flags |= 16777216, !Ym(t3)) {
      if (Ud()) e5.flags |= 8192;
      else throw so2 = ro2, to2;
    }
  }
  function vl(e5, t3) {
    t3 !== null && (e5.flags |= 4), e5.flags & 16384 && (t3 = e5.tag === 22 ? 536870912 : bt2(), e5.lanes |= t3, dd |= t3);
  }
  function yl(e5, t3) {
    if (!F2) switch (e5.tailMode) {
      case `visible`:
        break;
      case `collapsed`:
        for (var n3 = e5.tail, r3 = null; n3 !== null; ) n3.alternate !== null && (r3 = n3), n3 = n3.sibling;
        r3 === null ? t3 || e5.tail === null ? e5.tail = null : e5.tail.sibling = null : r3.sibling = null;
        break;
      default:
        for (t3 = e5.tail, n3 = null; t3 !== null; ) t3.alternate !== null && (n3 = t3), t3 = t3.sibling;
        n3 === null ? e5.tail = null : n3.sibling = null;
    }
  }
  function H(e5) {
    var t3 = e5.alternate !== null && e5.alternate.child === e5.child, n3 = 0, r3 = 0;
    if (t3) for (var i3 = e5.child; i3 !== null; ) n3 |= i3.lanes | i3.childLanes, r3 |= i3.subtreeFlags & 1206910976, r3 |= i3.flags & 1206910976, i3.return = e5, i3 = i3.sibling;
    else for (i3 = e5.child; i3 !== null; ) n3 |= i3.lanes | i3.childLanes, r3 |= i3.subtreeFlags, r3 |= i3.flags, i3.return = e5, i3 = i3.sibling;
    return e5.subtreeFlags |= r3, e5.childLanes = n3, t3;
  }
  function bl(e5, t3, n3) {
    var r3 = t3.pendingProps;
    switch (ca2(t3), t3.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return H(t3), null;
      case 1:
        return H(t3), null;
      case 3:
        return n3 = t3.stateNode, r3 = null, e5 !== null && (r3 = e5.memoizedState.cache), t3.memoizedState.cache !== r3 && (t3.flags |= 2048), wa2(Ia2), Fe2(), n3.pendingContext && (n3.context = n3.pendingContext, n3.pendingContext = null), (e5 === null || e5.child === null) && (ga2(t3) ? hl(t3) : e5 === null || e5.memoizedState.isDehydrated && !(t3.flags & 256) || (t3.flags |= 1024, va2())), H(t3), null;
      case 26:
        var a3 = t3.type, o3 = t3.memoizedState;
        return e5 === null ? (hl(t3), o3 === null ? (H(t3), gl(t3, a3, null, r3, n3)) : (H(t3), _l(t3, o3))) : o3 ? o3 === e5.memoizedState ? (H(t3), t3.flags &= -16777217) : (hl(t3), H(t3), _l(t3, o3)) : (e5 = e5.memoizedProps, e5 !== r3 && hl(t3), H(t3), gl(t3, a3, e5, r3, n3)), null;
      case 27:
        if (Le2(t3), n3 = Me2.current, a3 = t3.type, e5 !== null && t3.stateNode != null) e5.memoizedProps !== r3 && hl(t3);
        else {
          if (!r3) {
            if (t3.stateNode === null) throw Error(i2(166));
            return H(t3), t3.subtreeFlags &= -33554433, null;
          }
          e5 = Ae2.current, ga2(t3) ? ma2(t3, e5) : (e5 = hm(a3, r3, n3), t3.stateNode = e5, hl(t3));
        }
        return H(t3), t3.subtreeFlags &= -33554433, null;
      case 5:
        if (Le2(t3), a3 = t3.type, e5 !== null && t3.stateNode != null) e5.memoizedProps !== r3 && hl(t3);
        else {
          if (!r3) {
            if (t3.stateNode === null) throw Error(i2(166));
            return H(t3), t3.subtreeFlags &= -33554433, null;
          }
          if (o3 = Ae2.current, ga2(t3)) ma2(t3, o3);
          else {
            var s3 = lp(Me2.current);
            switch (o3) {
              case 1:
                o3 = s3.createElementNS(`http://www.w3.org/2000/svg`, a3);
                break;
              case 2:
                o3 = s3.createElementNS(`http://www.w3.org/1998/Math/MathML`, a3);
                break;
              default:
                switch (a3) {
                  case `svg`:
                    o3 = s3.createElementNS(`http://www.w3.org/2000/svg`, a3);
                    break;
                  case `math`:
                    o3 = s3.createElementNS(`http://www.w3.org/1998/Math/MathML`, a3);
                    break;
                  case `script`:
                    o3 = s3.createElement(`div`), o3.innerHTML = `<script><\/script>`, o3 = o3.removeChild(o3.firstChild);
                    break;
                  case `select`:
                    o3 = typeof r3.is == `string` ? s3.createElement(`select`, { is: r3.is }) : s3.createElement(`select`), r3.multiple ? o3.multiple = true : r3.size && (o3.size = r3.size);
                    break;
                  default:
                    o3 = typeof r3.is == `string` ? s3.createElement(a3, { is: r3.is }) : s3.createElement(a3);
                }
            }
            o3[Mt2] = t3, o3[Nt2] = r3;
            a: for (s3 = t3.child; s3 !== null; ) {
              if (s3.tag === 5 || s3.tag === 6) o3.appendChild(s3.stateNode);
              else if (s3.tag !== 4 && s3.tag !== 27 && s3.child !== null) {
                s3.child.return = s3, s3 = s3.child;
                continue;
              }
              if (s3 === t3) break a;
              for (; s3.sibling === null; ) {
                if (s3.return === null || s3.return === t3) break a;
                s3 = s3.return;
              }
              s3.sibling.return = s3.return, s3 = s3.sibling;
            }
            t3.stateNode = o3;
            a: switch (np(o3, a3, r3), a3) {
              case `button`:
              case `input`:
              case `select`:
              case `textarea`:
                r3 = !!r3.autoFocus;
                break a;
              case `img`:
                r3 = true;
                break a;
              default:
                r3 = false;
            }
            r3 && hl(t3);
          }
        }
        return H(t3), t3.subtreeFlags &= -33554433, gl(t3, t3.type, e5 === null ? null : e5.memoizedProps, t3.pendingProps, n3), null;
      case 6:
        if (e5 && t3.stateNode != null) e5.memoizedProps !== r3 && hl(t3);
        else {
          if (typeof r3 != `string` && t3.stateNode === null) throw Error(i2(166));
          if (e5 = Me2.current, ga2(t3)) {
            if (e5 = t3.stateNode, n3 = t3.memoizedProps, r3 = null, a3 = N2, a3 !== null) switch (a3.tag) {
              case 27:
              case 5:
                r3 = a3.memoizedProps;
            }
            e5[Mt2] = t3, e5 = !!(e5.nodeValue === n3 || r3 !== null && true === r3.suppressHydrationWarning || ep(e5.nodeValue, n3)), e5 || pa2(t3, true);
          } else e5 = lp(e5).createTextNode(r3), e5[Mt2] = t3, t3.stateNode = e5;
        }
        return H(t3), null;
      case 31:
        if (n3 = t3.memoizedState, e5 === null || e5.memoizedState !== null) {
          if (r3 = ga2(t3), n3 !== null) {
            if (e5 === null) {
              if (!r3) throw Error(i2(318));
              if (e5 = t3.memoizedState, e5 = e5 === null ? null : e5.dehydrated, !e5) throw Error(i2(557));
              e5[Mt2] = t3;
            } else _a2(), !(t3.flags & 128) && (t3.memoizedState = null), t3.flags |= 4;
            H(t3), e5 = false;
          } else n3 = va2(), e5 !== null && e5.memoizedState !== null && (e5.memoizedState.hydrationErrors = n3), e5 = true;
          if (!e5) return t3.flags & 256 ? (Bo2(t3), t3) : (Bo2(t3), null);
          if (t3.flags & 128) throw Error(i2(558));
        }
        return H(t3), null;
      case 13:
        if (r3 = t3.memoizedState, e5 === null || e5.memoizedState !== null && e5.memoizedState.dehydrated !== null) {
          if (a3 = ga2(t3), r3 !== null && r3.dehydrated !== null) {
            if (e5 === null) {
              if (!a3) throw Error(i2(318));
              if (a3 = t3.memoizedState, a3 = a3 === null ? null : a3.dehydrated, !a3) throw Error(i2(317));
              a3[Mt2] = t3;
            } else _a2(), !(t3.flags & 128) && (t3.memoizedState = null), t3.flags |= 4;
            H(t3), a3 = false;
          } else a3 = va2(), e5 !== null && e5.memoizedState !== null && (e5.memoizedState.hydrationErrors = a3), a3 = true;
          if (!a3) return t3.flags & 256 ? (Bo2(t3), t3) : (Bo2(t3), null);
        }
        return Bo2(t3), t3.flags & 128 ? (t3.lanes = n3, t3) : (n3 = r3 !== null, e5 = e5 !== null && e5.memoizedState !== null, n3 && (r3 = t3.child, a3 = null, r3.alternate !== null && r3.alternate.memoizedState !== null && r3.alternate.memoizedState.cachePool !== null && (a3 = r3.alternate.memoizedState.cachePool.pool), o3 = null, r3.memoizedState !== null && r3.memoizedState.cachePool !== null && (o3 = r3.memoizedState.cachePool.pool), o3 !== a3 && (r3.flags |= 2048)), n3 !== e5 && n3 && (t3.child.flags |= 8192), vl(t3, t3.updateQueue), H(t3), null);
      case 4:
        return Fe2(), e5 === null && Wf(t3.stateNode.containerInfo), t3.flags |= 67108864, H(t3), null;
      case 10:
        return wa2(t3.type), H(t3), null;
      case 19:
        if (Ho2(t3), r3 = t3.memoizedState, r3 === null) return H(t3), null;
        if (a3 = !!(t3.flags & 128), o3 = r3.rendering, o3 === null) {
          if (a3) yl(r3, false);
          else {
            if (od !== 0 || e5 !== null && e5.flags & 128) for (e5 = t3.child; e5 !== null; ) {
              if (o3 = Uo2(e5), o3 !== null) {
                for (t3.flags |= 128, yl(r3, false), e5 = o3.updateQueue, t3.updateQueue = e5, vl(t3, e5), t3.subtreeFlags = 0, e5 = n3, n3 = t3.child; n3 !== null; ) Hi2(n3, e5), n3 = n3.sibling;
                return R2(t3, Vo2.current & 1 | 2), F2 && aa2(t3, r3.treeForkCount), t3.child;
              }
              e5 = e5.sibling;
            }
            r3.tail !== null && Xe2() > _d && (t3.flags |= 128, a3 = true, yl(r3, false), t3.lanes = 4194304);
          }
        } else {
          if (!a3) {
            if (e5 = Uo2(o3), e5 !== null) {
              if (t3.flags |= 128, a3 = true, e5 = e5.updateQueue, t3.updateQueue = e5, vl(t3, e5), yl(r3, true), r3.tail === null && r3.tailMode !== `collapsed` && r3.tailMode !== `visible` && !o3.alternate && !F2) return H(t3), null;
            } else 2 * Xe2() - r3.renderingStartTime > _d && n3 !== 536870912 && (t3.flags |= 128, a3 = true, yl(r3, false), t3.lanes = 4194304);
          }
          r3.isBackwards ? (o3.sibling = t3.child, t3.child = o3) : (e5 = r3.last, e5 === null ? t3.child = o3 : e5.sibling = o3, r3.last = o3);
        }
        if (r3.tail !== null) {
          e5 = r3.tail;
          a: {
            for (n3 = e5; n3 !== null; ) {
              if (n3.alternate !== null) {
                n3 = false;
                break a;
              }
              n3 = n3.sibling;
            }
            n3 = true;
          }
          return r3.rendering = e5, r3.tail = e5.sibling, r3.renderingStartTime = Xe2(), e5.sibling = null, o3 = Vo2.current, o3 = a3 ? o3 & 1 | 2 : o3 & 1, r3.tailMode === `visible` || r3.tailMode === `collapsed` || !n3 || F2 ? R2(t3, o3) : (n3 = o3, O2(Fo2, t3), O2(Vo2, n3), Io2 === null && (Io2 = t3)), F2 && aa2(t3, r3.treeForkCount), e5;
        }
        return H(t3), null;
      case 22:
      case 23:
        return Bo2(t3), Po2(), r3 = t3.memoizedState !== null, e5 === null ? r3 && (t3.flags |= 8192) : e5.memoizedState !== null !== r3 && (t3.flags |= 8192), r3 ? n3 & 536870912 && !(t3.flags & 128) && (H(t3), t3.subtreeFlags & 6 && (t3.flags |= 8192)) : H(t3), n3 = t3.updateQueue, n3 !== null && vl(t3, n3.retryQueue), n3 = null, e5 !== null && e5.memoizedState !== null && e5.memoizedState.cachePool !== null && (n3 = e5.memoizedState.cachePool.pool), r3 = null, t3.memoizedState !== null && t3.memoizedState.cachePool !== null && (r3 = t3.memoizedState.cachePool.pool), r3 !== n3 && (t3.flags |= 2048), e5 !== null && ke2(Xa2), null;
      case 24:
        return n3 = null, e5 !== null && (n3 = e5.memoizedState.cache), t3.memoizedState.cache !== n3 && (t3.flags |= 2048), wa2(Ia2), H(t3), null;
      case 25:
        return null;
      case 30:
        return t3.flags |= 33554432, H(t3), null;
    }
    throw Error(i2(156, t3.tag));
  }
  function xl(e5, t3) {
    switch (ca2(t3), t3.tag) {
      case 1:
        return e5 = t3.flags, e5 & 65536 ? (t3.flags = e5 & -65537 | 128, t3) : null;
      case 3:
        return wa2(Ia2), Fe2(), e5 = t3.flags, e5 & 65536 && !(e5 & 128) ? (t3.flags = e5 & -65537 | 128, t3) : null;
      case 26:
      case 27:
      case 5:
        return Le2(t3), null;
      case 31:
        if (t3.memoizedState !== null) {
          if (Bo2(t3), t3.alternate === null) throw Error(i2(340));
          _a2();
        }
        return e5 = t3.flags, e5 & 65536 ? (t3.flags = e5 & -65537 | 128, t3) : null;
      case 13:
        if (Bo2(t3), e5 = t3.memoizedState, e5 !== null && e5.dehydrated !== null) {
          if (t3.alternate === null) throw Error(i2(340));
          _a2();
        }
        return e5 = t3.flags, e5 & 65536 ? (t3.flags = e5 & -65537 | 128, t3) : null;
      case 19:
        return Ho2(t3), e5 = t3.flags, e5 & 65536 ? (t3.flags = e5 & -65537 | 128, e5 = t3.memoizedState, e5 !== null && (e5.rendering = null, e5.tail = null), t3.flags |= 4, t3) : null;
      case 4:
        return Fe2(), null;
      case 10:
        return wa2(t3.type), null;
      case 22:
      case 23:
        return Bo2(t3), Po2(), e5 !== null && ke2(Xa2), e5 = t3.flags, e5 & 65536 ? (t3.flags = e5 & -65537 | 128, t3) : null;
      case 24:
        return wa2(Ia2), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Sl(e5, t3) {
    switch (ca2(t3), t3.tag) {
      case 3:
        wa2(Ia2), Fe2();
        break;
      case 26:
      case 27:
      case 5:
        Le2(t3);
        break;
      case 4:
        Fe2();
        break;
      case 31:
        t3.memoizedState !== null && Bo2(t3);
        break;
      case 13:
        Bo2(t3);
        break;
      case 19:
        Ho2(t3);
        break;
      case 10:
        wa2(t3.type);
        break;
      case 22:
      case 23:
        Bo2(t3), Po2(), e5 !== null && ke2(Xa2);
        break;
      case 24:
        wa2(Ia2);
    }
  }
  function Cl(e5, t3) {
    try {
      var n3 = t3.updateQueue, r3 = n3 === null ? null : n3.lastEffect;
      if (r3 !== null) {
        var i3 = r3.next;
        n3 = i3;
        do {
          if ((n3.tag & e5) === e5) {
            r3 = void 0;
            var a3 = n3.create, o3 = n3.inst;
            r3 = a3(), o3.destroy = r3;
          }
          n3 = n3.next;
        } while (n3 !== i3);
      }
    } catch (e6) {
      Z(t3, t3.return, e6);
    }
  }
  function wl(e5, t3, n3) {
    try {
      var r3 = t3.updateQueue, i3 = r3 === null ? null : r3.lastEffect;
      if (i3 !== null) {
        var a3 = i3.next;
        r3 = a3;
        do {
          if ((r3.tag & e5) === e5) {
            var o3 = r3.inst, s3 = o3.destroy;
            if (s3 !== void 0) {
              o3.destroy = void 0, i3 = t3;
              var c3 = n3, l3 = s3;
              try {
                l3();
              } catch (e6) {
                Z(i3, c3, e6);
              }
            }
          }
          r3 = r3.next;
        } while (r3 !== a3);
      }
    } catch (e6) {
      Z(t3, t3.return, e6);
    }
  }
  function Tl(e5) {
    var t3 = e5.updateQueue;
    if (t3 !== null) {
      var n3 = e5.stateNode;
      try {
        Ao2(t3, n3);
      } catch (t4) {
        Z(e5, e5.return, t4);
      }
    }
  }
  function El(e5, t3, n3) {
    n3.props = wc(e5.type, e5.memoizedProps), n3.state = e5.memoizedState;
    try {
      n3.componentWillUnmount();
    } catch (n4) {
      Z(e5, t3, n4);
    }
  }
  function Dl(e5, t3) {
    try {
      var n3 = e5.ref;
      if (n3 !== null) {
        switch (e5.tag) {
          case 26:
          case 27:
          case 5:
            var r3 = e5.stateNode;
            break;
          case 30:
            var i3 = e5.stateNode, a3 = Ti2(e5.memoizedProps, i3);
            (i3.ref === null || i3.ref.name !== a3) && (i3.ref = Pp(a3)), r3 = i3.ref;
            break;
          case 7:
            if (e5.stateNode === null) {
              var o3 = new Fp(e5);
              m2(e5.child, false, Qp, o3, void 0, void 0), e5.stateNode = o3;
            }
            r3 = e5.stateNode;
            break;
          default:
            r3 = e5.stateNode;
        }
        typeof n3 == `function` ? e5.refCleanup = n3(r3) : n3.current = r3;
      }
    } catch (n4) {
      Z(e5, t3, n4);
    }
  }
  function Ol(e5, t3) {
    var n3 = e5.ref, r3 = e5.refCleanup;
    if (n3 !== null) {
      if (typeof r3 == `function`) try {
        r3();
      } catch (n4) {
        Z(e5, t3, n4);
      } finally {
        e5.refCleanup = null, e5 = e5.alternate, e5 != null && (e5.refCleanup = null);
      }
      else if (typeof n3 == `function`) try {
        n3(null);
      } catch (n4) {
        Z(e5, t3, n4);
      }
      else n3.current = null;
    }
  }
  function kl(e5, t3) {
    if ((e5.tag === 5 || e5.tag === 27 || e5.tag === 6) && e5.alternate === null && t3 !== null) for (var n3 = 0; n3 < t3.length; n3++) em(e5.stateNode, t3[n3]);
  }
  function Al(e5) {
    for (var t3 = e5.return; t3 !== null && (Nl(t3) && em(e5.stateNode, t3.stateNode), !Ml(t3)); ) t3 = t3.return;
  }
  function jl(e5) {
    for (var t3 = e5.return; t3 !== null && (Nl(t3) && tm(e5.stateNode, t3.stateNode), !Ml(t3)); ) t3 = t3.return;
  }
  function Ml(e5) {
    return e5.tag === 5 || e5.tag === 3 || e5.tag === 27;
  }
  function Nl(e5) {
    return e5 && e5.tag === 7 && e5.stateNode !== null;
  }
  function Pl(e5) {
    var t3 = e5.type, n3 = e5.memoizedProps, r3 = e5.stateNode;
    try {
      a: switch (t3) {
        case `button`:
        case `input`:
        case `select`:
        case `textarea`:
          n3.autoFocus && r3.focus();
          break a;
        case `img`:
          n3.src ? r3.src = n3.src : n3.srcSet && (r3.srcset = n3.srcSet);
      }
    } catch (t4) {
      Z(e5, e5.return, t4);
    }
  }
  function Fl(e5, t3, n3) {
    try {
      var r3 = e5.stateNode;
      ip(r3, e5.type, n3, t3), r3[Nt2] = t3;
    } catch (t4) {
      Z(e5, e5.return, t4);
    }
  }
  function Il(e5) {
    return e5.tag === 5 || e5.tag === 3 || e5.tag === 26 || e5.tag === 27 && Sp(e5.type) || e5.tag === 4;
  }
  function Ll(e5) {
    a: for (; ; ) {
      for (; e5.sibling === null; ) {
        if (e5.return === null || Il(e5.return)) return null;
        e5 = e5.return;
      }
      for (e5.sibling.return = e5.return, e5 = e5.sibling; e5.tag !== 5 && e5.tag !== 6 && e5.tag !== 18; ) {
        if (e5.tag === 27 && Sp(e5.type) || e5.flags & 2 || e5.child === null || e5.tag === 4) continue a;
        e5.child.return = e5, e5 = e5.child;
      }
      if (!(e5.flags & 2)) return e5.stateNode;
    }
  }
  function Rl(e5, t3, n3, r3) {
    var i3 = e5.tag;
    if (i3 === 5 || i3 === 6) i3 = e5.stateNode, t3 ? (n3.nodeType === 9 ? n3.body : n3.nodeName === `HTML` ? n3.ownerDocument.body : n3).insertBefore(i3, t3) : (t3 = n3.nodeType === 9 ? n3.body : n3.nodeName === `HTML` ? n3.ownerDocument.body : n3, t3.appendChild(i3), n3 = n3._reactRootContainer, n3 != null || t3.onclick !== null || (t3.onclick = On2)), kl(e5, r3), k2 = true;
    else if (i3 !== 4 && (i3 === 27 && (kl(e5, r3), r3 = null, Sp(e5.type) && (n3 = e5.stateNode, t3 = null)), e5 = e5.child, e5 !== null)) for (Rl(e5, t3, n3, r3), e5 = e5.sibling; e5 !== null; ) Rl(e5, t3, n3, r3), e5 = e5.sibling;
  }
  function zl(e5, t3, n3, r3) {
    var i3 = e5.tag;
    if (i3 === 5 || i3 === 6) i3 = e5.stateNode, t3 ? n3.insertBefore(i3, t3) : n3.appendChild(i3), kl(e5, r3), k2 = true;
    else if (i3 !== 4 && (i3 === 27 && (kl(e5, r3), r3 = null, Sp(e5.type) && (n3 = e5.stateNode)), e5 = e5.child, e5 !== null)) for (zl(e5, t3, n3, r3), e5 = e5.sibling; e5 !== null; ) zl(e5, t3, n3, r3), e5 = e5.sibling;
  }
  function Bl(e5) {
    var t3 = e5.stateNode, n3 = e5.memoizedProps;
    try {
      for (var r3 = e5.type, i3 = t3.attributes; i3.length; ) t3.removeAttributeNode(i3[0]);
      np(t3, r3, n3), t3[Mt2] = e5, t3[Nt2] = n3;
    } catch (t4) {
      Z(e5, e5.return, t4);
    }
  }
  var Vl = false, Hl = null;
  function Ul(e5) {
    (e5.tag === 30 || e5.subtreeFlags & 33554432) && (Vl = true);
  }
  var Wl = null;
  function Gl() {
    var e5 = Wl;
    return Wl = null, e5;
  }
  var Kl = 0;
  function ql(e5, t3, n3, r3, i3) {
    return Kl = 0, Jl(e5.child, t3, n3, r3, i3);
  }
  function Jl(e5, t3, n3, r3, i3) {
    for (var a3 = false; e5 !== null; ) {
      if (e5.tag === 5) {
        var o3 = e5.stateNode;
        if (r3 !== null) {
          var s3 = Op(o3);
          r3.push(s3), s3.view && (a3 = true);
        } else a3 || Op(o3).view && (a3 = true);
        Vl = true, Tp(o3, Kl === 0 ? t3 : t3 + `_` + Kl, n3), Kl++;
      } else (e5.tag !== 22 || e5.memoizedState === null) && (e5.tag === 30 && i3 || Jl(e5.child, t3, n3, r3, i3) && (a3 = true));
      e5 = e5.sibling;
    }
    return a3;
  }
  function Yl(e5, t3) {
    for (; e5 !== null; ) e5.tag === 5 ? Ep(e5.stateNode, e5.memoizedProps) : (e5.tag !== 22 || e5.memoizedState === null) && (e5.tag === 30 && t3 || Yl(e5.child, t3)), e5 = e5.sibling;
  }
  function Xl(e5) {
    if (e5.subtreeFlags & 18874368) for (e5 = e5.child; e5 !== null; ) {
      if ((e5.tag !== 22 || e5.memoizedState === null) && (Xl(e5), e5.tag === 30 && e5.flags & 18874368 && e5.stateNode.paired)) {
        var t3 = e5.memoizedProps;
        if (t3.name == null || t3.name === `auto`) throw Error(i2(544));
        var n3 = t3.name;
        t3 = Di2(t3.default, t3.share), t3 !== `none` && (ql(e5, n3, t3, null, false) || Yl(e5.child, false));
      }
      e5 = e5.sibling;
    }
  }
  function Zl(e5, t3) {
    if (e5.tag === 30) {
      var n3 = e5.stateNode, r3 = e5.memoizedProps, i3 = Ti2(r3, n3), a3 = Di2(r3.default, n3.paired ? r3.share : r3.enter);
      a3 === `none` ? Xl(e5) : ql(e5, i3, a3, null, false) ? (Xl(e5), n3.paired || t3 || Nd(e5, r3.onEnter)) : Yl(e5.child, false);
    } else if (e5.subtreeFlags & 33554432) for (e5 = e5.child; e5 !== null; ) Zl(e5, t3), e5 = e5.sibling;
    else Xl(e5);
  }
  function Ql(e5) {
    if (Hl !== null && Hl.size !== 0) {
      var t3 = Hl;
      if (e5.subtreeFlags & 18874368) for (e5 = e5.child; e5 !== null; ) {
        if (e5.tag !== 22 || e5.memoizedState === null) {
          if (e5.tag === 30 && e5.flags & 18874368) {
            var n3 = e5.memoizedProps, r3 = n3.name;
            if (r3 != null && r3 !== `auto`) {
              var i3 = t3.get(r3);
              if (i3 !== void 0) {
                var a3 = Di2(n3.default, n3.share);
                if (a3 !== `none` && (ql(e5, r3, a3, null, false) ? (a3 = e5.stateNode, i3.paired = a3, a3.paired = i3, Nd(e5, n3.onShare)) : Yl(e5.child, false)), t3.delete(r3), t3.size === 0) break;
              }
            }
          }
          Ql(e5);
        }
        e5 = e5.sibling;
      }
    }
  }
  function $l(e5) {
    if (e5.tag === 30) {
      var t3 = e5.memoizedProps, n3 = Ti2(t3, e5.stateNode), r3 = Hl === null ? void 0 : Hl.get(n3), i3 = Di2(t3.default, r3 === void 0 ? t3.exit : t3.share);
      i3 !== `none` && (ql(e5, n3, i3, null, false) ? r3 === void 0 ? Nd(e5, t3.onExit) : (i3 = e5.stateNode, r3.paired = i3, i3.paired = r3, Hl.delete(n3), Nd(e5, t3.onShare)) : Yl(e5.child, false)), Hl !== null && Ql(e5);
    } else if (e5.subtreeFlags & 33554432) for (e5 = e5.child; e5 !== null; ) $l(e5), e5 = e5.sibling;
    else Hl !== null && Ql(e5);
  }
  function eu(e5) {
    for (e5 = e5.child; e5 !== null; ) {
      if (e5.tag === 30) {
        var t3 = e5.memoizedProps, n3 = Ti2(t3, e5.stateNode);
        t3 = Di2(t3.default, t3.update), e5.flags &= -5, t3 !== `none` && ql(e5, n3, t3, e5.memoizedState = [], false);
      } else e5.subtreeFlags & 33554432 && eu(e5);
      e5 = e5.sibling;
    }
  }
  function tu(e5) {
    if (e5.subtreeFlags & 18874368) for (e5 = e5.child; e5 !== null; ) {
      if (e5.tag !== 22 || e5.memoizedState === null) {
        if (e5.tag === 30 && e5.flags & 18874368) {
          var t3 = e5.stateNode;
          t3.paired !== null && (t3.paired = null, Yl(e5.child, false));
        }
        tu(e5);
      }
      e5 = e5.sibling;
    }
  }
  function nu(e5) {
    if (e5.tag === 30) e5.stateNode.paired = null, Yl(e5.child, false), tu(e5);
    else if (e5.subtreeFlags & 33554432) for (e5 = e5.child; e5 !== null; ) nu(e5), e5 = e5.sibling;
    else tu(e5);
  }
  function ru(e5) {
    for (e5 = e5.child; e5 !== null; ) e5.tag === 30 ? Yl(e5.child, false) : e5.subtreeFlags & 33554432 && ru(e5), e5 = e5.sibling;
  }
  function iu(e5, t3, n3, r3, i3, a3, o3) {
    for (var s3 = false; t3 !== null; ) {
      if (t3.tag === 5) {
        var c3 = t3.stateNode;
        if (a3 !== null && Kl < a3.length) {
          var l3 = a3[Kl], u3 = Op(c3);
          (l3.view || u3.view) && (s3 = true);
          var d2;
          if (d2 = !(e5.flags & 4)) {
            if (u3.clip) d2 = true;
            else {
              d2 = l3.rect;
              var f3 = u3.rect;
              d2 = d2.y !== f3.y || d2.x !== f3.x || d2.height !== f3.height || d2.width !== f3.width;
            }
          }
          d2 && (e5.flags |= 4), u3.abs ? u3 = !l3.abs : (l3 = l3.rect, u3 = u3.rect, u3 = l3.height !== u3.height || l3.width !== u3.width), u3 && (e5.flags |= 32);
        } else e5.flags |= 32;
        e5.flags & 4 && Tp(c3, Kl === 0 ? n3 : n3 + `_` + Kl, i3), s3 && e5.flags & 4 || (Wl === null && (Wl = []), Wl.push(c3, Kl === 0 ? r3 : r3 + `_` + Kl, t3.memoizedProps)), Kl++;
      } else (t3.tag !== 22 || t3.memoizedState === null) && (t3.tag === 30 && o3 ? e5.flags |= t3.flags & 32 : iu(e5, t3.child, n3, r3, i3, a3, o3) && (s3 = true));
      t3 = t3.sibling;
    }
    return s3;
  }
  function au(e5, t3) {
    for (e5 = e5.child; e5 !== null; ) {
      if (e5.tag === 30) {
        var n3 = e5.memoizedProps, r3 = e5.stateNode, i3 = Ti2(n3, r3), a3 = Di2(n3.default, n3.update);
        if (t3) {
          r3 = r3.clones;
          var o3 = r3 === null ? null : r3.map(kp);
        } else o3 = e5.memoizedState, e5.memoizedState = null;
        r3 = e5;
        var s3 = e5.child;
        Kl = 0, i3 = iu(r3, s3, i3, i3, a3, o3, false), e5.flags & 4 && i3 && (t3 || Nd(e5, n3.onUpdate));
      } else e5.subtreeFlags & 33554432 && au(e5, t3);
      e5 = e5.sibling;
    }
  }
  var ou = false, U = false, su = false, cu = false, lu = typeof WeakSet == `function` ? WeakSet : Set, uu = null, du = false, fu = false, pu = false, mu = false;
  function hu(e5, t3, n3) {
    if (e5 = e5.containerInfo, sp = gh, e5 = ni2(e5), ri2(e5)) {
      if (`selectionStart` in e5) var r3 = { start: e5.selectionStart, end: e5.selectionEnd };
      else a: {
        r3 = (r3 = e5.ownerDocument) && r3.defaultView || window;
        var i3 = r3.getSelection && r3.getSelection();
        if (i3 && i3.rangeCount !== 0) {
          r3 = i3.anchorNode;
          var a3 = i3.anchorOffset, o3 = i3.focusNode;
          i3 = i3.focusOffset;
          try {
            r3.nodeType, o3.nodeType;
          } catch {
            r3 = null;
            break a;
          }
          var s3 = 0, c3 = -1, l3 = -1, u3 = 0, d2 = 0, f3 = e5, p2 = null;
          b: for (; ; ) {
            for (var m3; f3 !== r3 || a3 !== 0 && f3.nodeType !== 3 || (c3 = s3 + a3), f3 !== o3 || i3 !== 0 && f3.nodeType !== 3 || (l3 = s3 + i3), f3.nodeType === 3 && (s3 += f3.nodeValue.length), (m3 = f3.firstChild) !== null; ) p2 = f3, f3 = m3;
            for (; ; ) {
              if (f3 === e5) break b;
              if (p2 === r3 && ++u3 === a3 && (c3 = s3), p2 === o3 && ++d2 === i3 && (l3 = s3), (m3 = f3.nextSibling) !== null) break;
              f3 = p2, p2 = f3.parentNode;
            }
            f3 = m3;
          }
          r3 = c3 === -1 || l3 === -1 ? null : { start: c3, end: l3 };
        } else r3 = null;
      }
      r3 ||= { start: 0, end: 0 };
    } else r3 = null;
    for (cp = { focusedElem: e5, selectionRange: r3 }, gh = false, n3 = (n3 & 335544064) === n3, uu = t3, t3 = n3 ? 9270 : 1024; uu !== null; ) {
      if (e5 = uu, n3 && (r3 = e5.deletions, r3 !== null)) for (a3 = 0; a3 < r3.length; a3++) n3 && $l(r3[a3]);
      if (e5.alternate === null && e5.flags & 2) n3 && Ul(e5), gu(n3);
      else {
        if (e5.tag === 22) {
          if (r3 = e5.alternate, e5.memoizedState !== null) {
            r3 !== null && r3.memoizedState === null && n3 && $l(r3), gu(n3);
            continue;
          }
          if (r3 !== null && r3.memoizedState !== null) {
            n3 && Ul(e5), gu(n3);
            continue;
          }
        }
        r3 = e5.child, (e5.subtreeFlags & t3) !== 0 && r3 !== null ? (r3.return = e5, uu = r3) : (n3 && eu(e5), gu(n3));
      }
    }
    Hl = null;
  }
  function gu(e5) {
    for (; uu !== null; ) {
      var t3 = uu, n3 = e5, r3 = t3.alternate, a3 = t3.flags;
      switch (t3.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (a3 & 1024 && r3 !== null) {
            n3 = void 0, a3 = r3.memoizedProps, r3 = r3.memoizedState;
            var o3 = t3.stateNode;
            try {
              var s3 = wc(t3.type, a3);
              n3 = o3.getSnapshotBeforeUpdate(s3, r3), o3.__reactInternalSnapshotBeforeUpdate = n3;
            } catch (e6) {
              Z(t3, t3.return, e6);
            }
          }
          break;
        case 3:
          if (a3 & 1024) {
            if (r3 = t3.stateNode.containerInfo, n3 = r3.nodeType, n3 === 9) nm(r3);
            else if (n3 === 1) switch (r3.nodeName) {
              case `HEAD`:
              case `HTML`:
              case `BODY`:
                nm(r3);
                break;
              default:
                r3.textContent = ``;
            }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          n3 && r3 !== null && (n3 = Ti2(r3.memoizedProps, r3.stateNode), a3 = t3.memoizedProps, a3 = Di2(a3.default, a3.update), a3 !== `none` && ql(r3, n3, a3, r3.memoizedState = [], true));
          break;
        default:
          if (a3 & 1024) throw Error(i2(163));
      }
      if (r3 = t3.sibling, r3 !== null) {
        r3.return = t3.return, uu = r3;
        break;
      }
      uu = t3.return;
    }
  }
  function _u(e5, t3, n3) {
    var r3 = n3.flags;
    switch (n3.tag) {
      case 0:
      case 11:
      case 15:
        Iu(e5, n3), r3 & 4 && Cl(5, n3);
        break;
      case 1:
        if (Iu(e5, n3), r3 & 4) {
          if (e5 = n3.stateNode, t3 === null) try {
            e5.componentDidMount();
          } catch (e6) {
            Z(n3, n3.return, e6);
          }
          else {
            var i3 = wc(n3.type, t3.memoizedProps);
            t3 = t3.memoizedState;
            try {
              e5.componentDidUpdate(i3, t3, e5.__reactInternalSnapshotBeforeUpdate);
            } catch (e6) {
              Z(n3, n3.return, e6);
            }
          }
        }
        r3 & 64 && Tl(n3), r3 & 512 && Dl(n3, n3.return);
        break;
      case 3:
        if (Iu(e5, n3), r3 & 64 && (e5 = n3.updateQueue, e5 !== null)) {
          if (t3 = null, n3.child !== null) switch (n3.child.tag) {
            case 27:
            case 5:
              t3 = n3.child.stateNode;
              break;
            case 1:
              t3 = n3.child.stateNode;
          }
          try {
            Ao2(e5, t3);
          } catch (e6) {
            Z(n3, n3.return, e6);
          }
        }
        break;
      case 27:
        t3 === null && r3 & 4 && Bl(n3);
      case 26:
      case 5:
        Iu(e5, n3), t3 === null && r3 & 4 && Pl(n3), r3 & 512 && Dl(n3, n3.return);
        break;
      case 12:
        Iu(e5, n3);
        break;
      case 31:
        Iu(e5, n3), r3 & 4 && Tu(e5, n3);
        break;
      case 13:
        Iu(e5, n3), r3 & 4 && Eu(e5, n3), r3 & 64 && (e5 = n3.memoizedState, e5 !== null && (e5 = e5.dehydrated, e5 !== null && (n3 = _f.bind(null, n3), cm(e5, n3))));
        break;
      case 22:
        if (r3 = n3.memoizedState !== null || ou, !r3) {
          var a3 = t3 !== null && t3.memoizedState !== null || U;
          t3 = ou, i3 = U, ou = r3, (U = a3) && !i3 ? (r3 = 2, n3.subtreeFlags & 8772 && (r3 |= 1), Ru(e5, n3, r3)) : Iu(e5, n3), ou = t3, U = i3;
        }
        break;
      case 30:
        Iu(e5, n3), r3 & 512 && Dl(n3, n3.return);
        break;
      case 7:
        r3 & 512 && Dl(n3, n3.return);
      default:
        Iu(e5, n3);
    }
  }
  function vu(e5, t3) {
    for (e5 = e5.child; e5 !== null; ) yu(e5, t3), e5 = e5.sibling;
  }
  function yu(e5, t3) {
    switch (e5.tag) {
      case 5:
      case 26:
        try {
          var n3 = e5.stateNode;
          if (t3) {
            var r3 = n3.style;
            typeof r3.setProperty == `function` ? r3.setProperty(`display`, `none`, `important`) : r3.display = `none`;
          } else {
            var i3 = e5.stateNode, a3 = e5.memoizedProps.style, o3 = a3 != null && a3.hasOwnProperty(`display`) ? a3.display : null;
            i3.style.display = o3 == null || typeof o3 == `boolean` ? `` : (`` + o3).trim();
          }
        } catch (t4) {
          Z(e5, e5.return, t4);
        }
        bu(e5, t3);
        break;
      case 6:
        try {
          e5.stateNode.nodeValue = t3 ? `` : e5.memoizedProps, k2 = true;
        } catch (t4) {
          Z(e5, e5.return, t4);
        }
        break;
      case 18:
        try {
          var s3 = e5.stateNode;
          t3 ? wp(s3, true) : wp(e5.stateNode, false);
        } catch (t4) {
          Z(e5, e5.return, t4);
        }
        break;
      case 22:
      case 23:
        e5.memoizedState === null && vu(e5, t3);
        break;
      default:
        vu(e5, t3);
    }
  }
  function bu(e5, t3) {
    if (e5.subtreeFlags & 67108864) for (e5 = e5.child; e5 !== null; ) {
      a: {
        var n3 = e5, r3 = t3;
        switch (n3.tag) {
          case 4:
            yu(n3, r3);
            break a;
          case 22:
            n3.memoizedState === null && bu(n3, r3);
            break a;
          default:
            bu(n3, r3);
        }
      }
      e5 = e5.sibling;
    }
  }
  function xu(e5) {
    var t3 = e5.alternate;
    t3 !== null && (e5.alternate = null, xu(t3)), e5.child = null, e5.deletions = null, e5.sibling = null, e5.tag === 5 && (t3 = e5.stateNode, t3 !== null && Vt2(t3)), e5.stateNode = null, e5.return = null, e5.dependencies = null, e5.memoizedProps = null, e5.memoizedState = null, e5.pendingProps = null, e5.stateNode = null, e5.updateQueue = null;
  }
  var W = null, Su = false;
  function Cu(e5, t3, n3) {
    for (n3 = n3.child; n3 !== null; ) wu(e5, t3, n3), n3 = n3.sibling;
  }
  function wu(e5, t3, n3) {
    if (ot2 && typeof ot2.onCommitFiberUnmount == `function`) try {
      ot2.onCommitFiberUnmount(at2, n3);
    } catch {
    }
    switch (n3.tag) {
      case 26:
        U || Ol(n3, t3), Cu(e5, t3, n3), n3.memoizedState ? n3.memoizedState.count-- : n3.stateNode && !U && (n3 = n3.stateNode, n3.parentNode.removeChild(n3));
        break;
      case 27:
        U || Ol(n3, t3), jl(n3);
        var r3 = W, i3 = Su;
        Sp(n3.type) && (W = n3.stateNode, Su = false), Cu(e5, t3, n3), gm(n3.stateNode, n3.type, n3.memoizedProps), W = r3, Su = i3;
        break;
      case 5:
        U || Ol(n3, t3), jl(n3);
      case 6:
        if (n3.tag === 6 && jl(n3), r3 = W, i3 = Su, W = null, Cu(e5, t3, n3), W = r3, Su = i3, W !== null) {
          if (Su) try {
            (W.nodeType === 9 ? W.body : W.nodeName === `HTML` ? W.ownerDocument.body : W).removeChild(n3.stateNode), k2 = true;
          } catch (e6) {
            Z(n3, t3, e6);
          }
          else try {
            W.removeChild(n3.stateNode), k2 = true;
          } catch (e6) {
            Z(n3, t3, e6);
          }
        }
        break;
      case 18:
        W !== null && (Su ? (e5 = W, Cp(e5.nodeType === 9 ? e5.body : e5.nodeName === `HTML` ? e5.ownerDocument.body : e5, n3.stateNode), Hh(e5)) : Cp(W, n3.stateNode));
        break;
      case 4:
        r3 = W, i3 = Su, W = n3.stateNode.containerInfo, Su = true, Cu(e5, t3, n3), W = r3, Su = i3;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        wl(2, n3, t3), U || wl(4, n3, t3), Cu(e5, t3, n3);
        break;
      case 1:
        U || (Ol(n3, t3), r3 = n3.stateNode, typeof r3.componentWillUnmount == `function` && El(n3, t3, r3)), Cu(e5, t3, n3);
        break;
      case 21:
        Cu(e5, t3, n3);
        break;
      case 22:
        U = (r3 = U) || n3.memoizedState !== null, Cu(e5, t3, n3), U = r3;
        break;
      case 30:
        Ol(n3, t3), Cu(e5, t3, n3);
        break;
      case 7:
        U || Ol(n3, t3), Cu(e5, t3, n3);
        break;
      default:
        Cu(e5, t3, n3);
    }
  }
  function Tu(e5, t3) {
    if (t3.memoizedState === null && (e5 = t3.alternate, e5 !== null && (e5 = e5.memoizedState, e5 !== null))) {
      e5 = e5.dehydrated;
      try {
        Hh(e5);
      } catch (e6) {
        Z(t3, t3.return, e6);
      }
    }
  }
  function Eu(e5, t3) {
    if (t3.memoizedState === null && (e5 = t3.alternate, e5 !== null && (e5 = e5.memoizedState, e5 !== null && (e5 = e5.dehydrated, e5 !== null)))) try {
      Hh(e5);
    } catch (e6) {
      Z(t3, t3.return, e6);
    }
  }
  function Du(e5) {
    switch (e5.tag) {
      case 31:
      case 13:
      case 19:
        var t3 = e5.stateNode;
        return t3 === null && (t3 = e5.stateNode = new lu()), t3;
      case 22:
        return e5 = e5.stateNode, t3 = e5._retryCache, t3 === null && (t3 = e5._retryCache = new lu()), t3;
      default:
        throw Error(i2(435, e5.tag));
    }
  }
  function Ou(e5, t3) {
    var n3 = Du(e5);
    t3.forEach(function(t4) {
      if (!n3.has(t4)) {
        n3.add(t4);
        var r3 = vf.bind(null, e5, t4);
        t4.then(r3, r3);
      }
    });
  }
  function ku(e5, t3, n3) {
    var r3 = t3.deletions;
    if (r3 !== null) for (var a3 = 0; a3 < r3.length; a3++) {
      var o3 = r3[a3], s3 = e5, c3 = t3, l3 = c3;
      a: for (; l3 !== null; ) {
        switch (l3.tag) {
          case 27:
            if (Sp(l3.type)) {
              W = l3.stateNode, Su = false;
              break a;
            }
            break;
          case 5:
            W = l3.stateNode, Su = false;
            break a;
          case 3:
          case 4:
            W = l3.stateNode.containerInfo, Su = true;
            break a;
        }
        l3 = l3.return;
      }
      if (W === null) throw Error(i2(160));
      wu(s3, c3, o3), W = null, Su = false, s3 = o3.alternate, s3 !== null && (s3.return = null), o3.return = null;
    }
    if (t3.subtreeFlags & 13886) for (t3 = t3.child; t3 !== null; ) ju(t3, e5, n3), t3 = t3.sibling;
  }
  var Au = null;
  function ju(e5, t3, n3) {
    var r3 = e5.alternate, a3 = e5.flags;
    switch (e5.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (a3 & 4 && (r3 = e5.updateQueue, r3 = r3 === null ? null : r3.events, r3 !== null)) for (var o3 = 0; o3 < r3.length; o3++) {
          var s3 = r3[o3];
          s3.ref.impl = s3.nextImpl;
        }
        ku(t3, e5, n3), Mu(e5), a3 & 4 && (wl(3, e5, e5.return), Cl(3, e5), wl(5, e5, e5.return));
        break;
      case 1:
        ku(t3, e5, n3), Mu(e5), a3 & 512 && (U || r3 === null || Ol(r3, r3.return)), a3 & 64 && ou && (e5 = e5.updateQueue, e5 !== null && (t3 = e5.callbacks, t3 !== null && (n3 = e5.shared.hiddenCallbacks, e5.shared.hiddenCallbacks = n3 === null ? t3 : n3.concat(t3))));
        break;
      case 26:
        if (o3 = Au, ku(t3, e5, n3), Mu(e5), a3 & 512 && (U || r3 === null || Ol(r3, r3.return)), a3 & 4) {
          if (a3 = r3 === null ? null : r3.memoizedState, n3 = e5.memoizedState, r3 === null) {
            if (n3 === null) {
              if (e5.stateNode === null) {
                if (ou) e5.stateNode = fp(e5.type, e5.memoizedProps, t3.containerInfo, e5);
                else {
                  a: {
                    t3 = e5.type, n3 = e5.memoizedProps, a3 = o3.ownerDocument || o3;
                    b: switch (t3) {
                      case `title`:
                        r3 = a3.getElementsByTagName(`title`)[0], (!r3 || r3[zt2] || r3[Mt2] || r3.namespaceURI === `http://www.w3.org/2000/svg` || r3.hasAttribute(`itemprop`)) && (r3 = a3.createElement(t3), a3.head.insertBefore(r3, a3.querySelector(`head > title`))), np(r3, t3, n3), r3[Mt2] = e5, Kt2(r3), t3 = r3;
                        break a;
                      case `link`:
                        if (o3 = Gm(`link`, `href`, a3).get(t3 + (n3.href || ``))) {
                          for (s3 = 0; s3 < o3.length; s3++) if (r3 = o3[s3], r3.getAttribute(`href`) === (n3.href == null || n3.href === `` ? null : n3.href) && r3.getAttribute(`rel`) === (n3.rel == null ? null : n3.rel) && r3.getAttribute(`title`) === (n3.title == null ? null : n3.title) && r3.getAttribute(`crossorigin`) === (n3.crossOrigin == null ? null : n3.crossOrigin)) {
                            o3.splice(s3, 1);
                            break b;
                          }
                        }
                        r3 = a3.createElement(t3), np(r3, t3, n3), a3.head.appendChild(r3);
                        break;
                      case `meta`:
                        if (o3 = Gm(`meta`, `content`, a3).get(t3 + (n3.content || ``))) {
                          for (s3 = 0; s3 < o3.length; s3++) if (r3 = o3[s3], r3.getAttribute(`content`) === (n3.content == null ? null : `` + n3.content) && r3.getAttribute(`name`) === (n3.name == null ? null : n3.name) && r3.getAttribute(`property`) === (n3.property == null ? null : n3.property) && r3.getAttribute(`http-equiv`) === (n3.httpEquiv == null ? null : n3.httpEquiv) && r3.getAttribute(`charset`) === (n3.charSet == null ? null : n3.charSet)) {
                            o3.splice(s3, 1);
                            break b;
                          }
                        }
                        r3 = a3.createElement(t3), np(r3, t3, n3), a3.head.appendChild(r3);
                        break;
                      default:
                        throw Error(i2(468, t3));
                    }
                    r3[Mt2] = e5, Kt2(r3), t3 = r3;
                  }
                  e5.stateNode = t3;
                }
              } else ou || Km(o3, e5.type, e5.stateNode);
            } else e5.stateNode = Bm(o3, n3, e5.memoizedProps);
          } else a3 === n3 ? n3 === null && e5.stateNode !== null && Fl(e5, e5.memoizedProps, r3.memoizedProps) : (a3 === null ? (t3 = r3.stateNode, t3 === null || U || t3.parentNode.removeChild(t3)) : a3.count--, n3 === null ? ou || Km(o3, e5.type, e5.stateNode) : Bm(o3, n3, e5.memoizedProps));
        }
        break;
      case 27:
        ku(t3, e5, n3), Mu(e5), a3 & 512 && (U || r3 === null || Ol(r3, r3.return)), r3 !== null && a3 & 4 && Fl(e5, e5.memoizedProps, r3.memoizedProps);
        break;
      case 5:
        if (o3 = su, su = false, ku(t3, e5, n3), su = o3, Mu(e5), a3 & 512 && (U || r3 === null || Ol(r3, r3.return)), e5.flags & 32) {
          t3 = e5.stateNode;
          try {
            bn2(t3, ``), k2 = true;
          } catch (t4) {
            Z(e5, e5.return, t4);
          }
        }
        a3 & 4 && e5.stateNode != null && (t3 = e5.memoizedProps, Fl(e5, t3, r3 === null ? t3 : r3.memoizedProps)), a3 & 1024 && (cu = true);
        break;
      case 6:
        if (ku(t3, e5, n3), Mu(e5), a3 & 4) {
          if (e5.stateNode === null) throw Error(i2(162));
          t3 = e5.memoizedProps, n3 = e5.stateNode;
          try {
            n3.nodeValue = t3, k2 = true;
          } catch (t4) {
            Z(e5, e5.return, t4);
          }
        }
        break;
      case 3:
        if (k2 = false, Wm = null, o3 = Au, Au = bm(t3.containerInfo), ku(t3, e5, n3), Au = o3, Mu(e5), a3 & 4 && r3 !== null && r3.memoizedState.isDehydrated) try {
          Hh(t3.containerInfo);
        } catch (t4) {
          Z(e5, e5.return, t4);
        }
        cu && (cu = false, Nu(e5)), k2 = false;
        break;
      case 4:
        a3 = su, su = ou, r3 = nn2(), o3 = Au, Au = bm(e5.stateNode.containerInfo), ku(t3, e5, n3), Mu(e5), Au = o3, k2 && fu && (pu = true), k2 = r3, su = a3;
        break;
      case 12:
        ku(t3, e5, n3), Mu(e5);
        break;
      case 31:
        ku(t3, e5, n3), Mu(e5), a3 & 4 && (t3 = e5.updateQueue, t3 !== null && (e5.updateQueue = null, Ou(e5, t3)));
        break;
      case 13:
        ku(t3, e5, n3), Mu(e5), e5.child.flags & 8192 && e5.memoizedState !== null != (r3 !== null && r3.memoizedState !== null) && (hd = Xe2()), a3 & 4 && (t3 = e5.updateQueue, t3 !== null && (e5.updateQueue = null, Ou(e5, t3)));
        break;
      case 22:
        o3 = e5.memoizedState !== null, s3 = r3 !== null && r3.memoizedState !== null;
        var c3 = ou, l3 = U, u3 = su;
        ou = c3 || o3, su = u3 || o3, U = l3 || s3, ku(t3, e5, n3), U = l3, su = u3, ou = c3, Mu(e5), a3 & 8192 && (t3 = e5.stateNode, t3._visibility = o3 ? t3._visibility & -2 : t3._visibility | 1, !o3 || r3 === null || s3 || ou || U || (t3 = s3 || U, n3 = ou, r3 = U, ou = o3 || ou, U = t3, Lu(e5, 2), ou = n3, U = r3), !o3 && su || vu(e5, o3)), a3 & 4 && (t3 = e5.updateQueue, t3 !== null && (n3 = t3.retryQueue, n3 !== null && (t3.retryQueue = null, Ou(e5, n3))));
        break;
      case 19:
        ku(t3, e5, n3), Mu(e5), a3 & 4 && (t3 = e5.updateQueue, t3 !== null && (e5.updateQueue = null, Ou(e5, t3)));
        break;
      case 30:
        a3 & 512 && (U || r3 === null || Ol(r3, r3.return)), a3 = nn2(), o3 = fu, s3 = (n3 & 335544064) === n3, c3 = e5.memoizedProps, fu = s3 && Di2(c3.default, c3.update) !== `none`, ku(t3, e5, n3), Mu(e5), s3 && r3 !== null && k2 && (e5.flags |= 4), fu = o3, k2 = a3;
        break;
      case 21:
        break;
      case 7:
        a3 & 512 && (U || r3 === null || Ol(r3, r3.return)), r3 && r3.stateNode !== null && (r3.stateNode._fragmentFiber = e5);
      default:
        ku(t3, e5, n3), Mu(e5);
    }
  }
  function Mu(e5) {
    var t3 = e5.flags;
    if (t3 & 2) {
      try {
        for (var n3, r3 = e5.return; r3 !== null; ) {
          if (Il(r3)) {
            n3 = r3;
            break;
          }
          r3 = r3.return;
        }
        r3 = null;
        for (var a3 = e5.return; a3 !== null; ) {
          if (Nl(a3)) {
            var o3 = a3.stateNode;
            r3 === null ? r3 = [o3] : r3.push(o3);
          }
          if (Ml(a3)) break;
          a3 = a3.return;
        }
        var s3 = r3;
        if (n3 == null) throw Error(i2(160));
        switch (n3.tag) {
          case 27:
            var c3 = n3.stateNode;
            zl(e5, Ll(e5), c3, s3);
            break;
          case 5:
            var l3 = n3.stateNode;
            n3.flags & 32 && (bn2(l3, ``), n3.flags &= -33), zl(e5, Ll(e5), l3, s3);
            break;
          case 3:
          case 4:
            var u3 = n3.stateNode.containerInfo;
            Rl(e5, Ll(e5), u3, s3);
            break;
          default:
            throw Error(i2(161));
        }
      } catch (t4) {
        Z(e5, e5.return, t4);
      }
      e5.flags &= -3;
    }
    t3 & 4096 && (e5.flags &= -4097);
  }
  function Nu(e5) {
    if (e5.subtreeFlags & 1024) for (e5 = e5.child; e5 !== null; ) {
      var t3 = e5;
      Nu(t3), t3.tag === 5 && t3.flags & 1024 && (t3 = t3.stateNode, gh = true, t3.reset(), gh = false), e5 = e5.sibling;
    }
  }
  function Pu(e5, t3) {
    if (t3.subtreeFlags & 9270) for (t3 = t3.child; t3 !== null; ) Fu(t3, e5), t3 = t3.sibling;
    else au(t3, false);
  }
  function Fu(e5, t3) {
    var n3 = e5.alternate;
    if (n3 === null) Zl(e5, false);
    else switch (e5.tag) {
      case 3:
        if (mu = du = false, Gl(), Pu(t3, e5), !du && !pu) {
          if (e5 = Wl, e5 !== null) for (var r3 = 0; r3 < e5.length; r3 += 3) {
            n3 = e5[r3];
            var i3 = e5[r3 + 1];
            Ep(n3, e5[r3 + 2]), n3 = n3.ownerDocument.documentElement, n3 !== null && n3.animate({ opacity: [0, 0], pointerEvents: [`none`, `none`] }, { duration: 0, fill: `forwards`, pseudoElement: `::view-transition-group(` + i3 + `)` });
          }
          e5 = t3.containerInfo, e5 = e5.nodeType === 9 ? e5.documentElement : e5.ownerDocument.documentElement, e5 !== null && e5.style.viewTransitionName === `` && (e5.style.viewTransitionName = `none`, e5.animate({ opacity: [0, 0], pointerEvents: [`none`, `none`] }, { duration: 0, fill: `forwards`, pseudoElement: `::view-transition-group(root)` }), e5.animate({ width: [0, 0], height: [0, 0] }, { duration: 0, fill: `forwards`, pseudoElement: `::view-transition` })), mu = true;
        }
        Wl = null;
        break;
      case 5:
        Pu(t3, e5);
        break;
      case 4:
        r3 = du, du = false, Pu(t3, e5), du && (pu = true), du = r3;
        break;
      case 22:
        e5.memoizedState === null && (n3.memoizedState === null ? Pu(t3, e5) : Zl(e5, false));
        break;
      case 30:
        r3 = du, i3 = Gl(), du = false, Pu(t3, e5), du && (e5.flags |= 4);
        var a3 = e5.memoizedProps, o3 = e5.stateNode;
        t3 = Ti2(a3, o3), o3 = Ti2(n3.memoizedProps, o3);
        var s3 = Di2(a3.default, a3.update);
        s3 === `none` ? t3 = false : (a3 = n3.memoizedState, n3.memoizedState = null, n3 = e5.child, Kl = 0, t3 = iu(e5, n3, t3, o3, s3, a3, true), Kl !== (a3 === null ? 0 : a3.length) && (e5.flags |= 32)), e5.flags & 4 && t3 ? (Nd(e5, e5.memoizedProps.onUpdate), Wl = i3) : i3 !== null && (i3.push.apply(i3, Wl), Wl = i3), du = e5.flags & 32 ? true : r3;
        break;
      default:
        Pu(t3, e5);
    }
  }
  function Iu(e5, t3) {
    if (t3.subtreeFlags & 8772) for (t3 = t3.child; t3 !== null; ) _u(e5, t3.alternate, t3), t3 = t3.sibling;
  }
  function Lu(e5, t3) {
    for (e5 = e5.child; e5 !== null; ) {
      var n3 = e5, r3 = t3;
      switch (n3.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          wl(4, n3, n3.return), Lu(n3, r3);
          break;
        case 1:
          Ol(n3, n3.return);
          var i3 = n3.stateNode;
          typeof i3.componentWillUnmount == `function` && El(n3, n3.return, i3), Lu(n3, r3);
          break;
        case 27:
          r3 & 2 && gm(n3.stateNode, n3.type, n3.memoizedProps);
        case 5:
          Ol(n3, n3.return), n3.tag !== 5 && n3.tag !== 27 || jl(n3), Lu(n3, r3);
          break;
        case 6:
          jl(n3);
          break;
        case 26:
          Ol(n3, n3.return), i3 = n3.stateNode, n3.memoizedState !== null || i3 === null || U || i3.parentNode.removeChild(i3), Lu(n3, r3);
          break;
        case 22:
          n3.memoizedState === null && Lu(n3, r3);
          break;
        case 30:
          Ol(n3, n3.return), Lu(n3, r3);
          break;
        case 7:
          Ol(n3, n3.return);
        default:
          Lu(n3, r3);
      }
      e5 = e5.sibling;
    }
  }
  function Ru(e5, t3, n3) {
    for (n3 = t3.subtreeFlags & 8772 ? n3 : n3 & -2, t3 = t3.child; t3 !== null; ) {
      var r3 = t3.alternate, i3 = e5, a3 = t3, o3 = a3.flags, s3 = !!(n3 & 1);
      switch (a3.tag) {
        case 0:
        case 11:
        case 15:
          Ru(i3, a3, n3), Cl(4, a3);
          break;
        case 1:
          if (Ru(i3, a3, n3), r3 = a3, i3 = r3.stateNode, typeof i3.componentDidMount == `function`) try {
            i3.componentDidMount();
          } catch (e6) {
            Z(r3, r3.return, e6);
          }
          if (r3 = a3, i3 = r3.updateQueue, i3 !== null) {
            var c3 = r3.stateNode;
            try {
              var l3 = i3.shared.hiddenCallbacks;
              if (l3 !== null) for (i3.shared.hiddenCallbacks = null, i3 = 0; i3 < l3.length; i3++) ko2(l3[i3], c3);
            } catch (e6) {
              Z(r3, r3.return, e6);
            }
          }
          s3 && o3 & 64 && Tl(a3), Dl(a3, a3.return);
          break;
        case 27:
          n3 & 2 && Bl(a3);
        case 5:
          a3.tag !== 5 && a3.tag !== 27 || Al(a3), Ru(i3, a3, n3), s3 && r3 === null && o3 & 4 && Pl(a3), Dl(a3, a3.return);
          break;
        case 6:
          Al(a3);
          break;
        case 26:
          c3 = a3.stateNode, a3.memoizedState !== null || c3 === null || ou || Km(bm(c3.ownerDocument), a3.type, c3), Ru(i3, a3, n3), s3 && r3 === null && o3 & 4 && Pl(a3), Dl(a3, a3.return);
          break;
        case 12:
          Ru(i3, a3, n3);
          break;
        case 31:
          Ru(i3, a3, n3), s3 && o3 & 4 && Tu(i3, a3);
          break;
        case 13:
          Ru(i3, a3, n3), s3 && o3 & 4 && Eu(i3, a3);
          break;
        case 22:
          a3.memoizedState === null && Ru(i3, a3, n3), Dl(a3, a3.return);
          break;
        case 30:
          Ru(i3, a3, n3), Dl(a3, a3.return);
          break;
        case 7:
          Dl(a3, a3.return);
        default:
          Ru(i3, a3, n3);
      }
      t3 = t3.sibling;
    }
  }
  function zu(e5, t3) {
    var n3 = null;
    e5 !== null && e5.memoizedState !== null && e5.memoizedState.cachePool !== null && (n3 = e5.memoizedState.cachePool.pool), e5 = null, t3.memoizedState !== null && t3.memoizedState.cachePool !== null && (e5 = t3.memoizedState.cachePool.pool), e5 !== n3 && (e5 != null && e5.refCount++, n3 != null && Ra2(n3));
  }
  function Bu(e5, t3) {
    e5 = null, t3.alternate !== null && (e5 = t3.alternate.memoizedState.cache), t3 = t3.memoizedState.cache, t3 !== e5 && (t3.refCount++, e5 != null && Ra2(e5));
  }
  function Vu(e5, t3, n3, r3) {
    var i3 = (n3 & 335544064) === n3;
    if (t3.subtreeFlags & (i3 ? 10262 : 10256)) for (t3 = t3.child; t3 !== null; ) Hu(e5, t3, n3, r3), t3 = t3.sibling;
    else i3 && ru(t3);
  }
  function Hu(e5, t3, n3, r3) {
    var i3 = (n3 & 335544064) === n3;
    i3 && t3.alternate === null && t3.return !== null && t3.return.alternate !== null && nu(t3);
    var a3 = t3.flags;
    switch (t3.tag) {
      case 0:
      case 11:
      case 15:
        Vu(e5, t3, n3, r3), a3 & 2048 && Cl(9, t3);
        break;
      case 1:
        Vu(e5, t3, n3, r3);
        break;
      case 3:
        Vu(e5, t3, n3, r3), i3 && mu && (e5 = e5.containerInfo, e5 = e5.nodeType === 9 ? e5.body : e5.nodeName === `HTML` ? e5.ownerDocument.body : e5, e5.style.viewTransitionName === `root` && (e5.style.viewTransitionName = ``), e5 = e5.ownerDocument.documentElement, e5 !== null && e5.style.viewTransitionName === `none` && (e5.style.viewTransitionName = ``)), a3 & 2048 && (a3 = null, t3.alternate !== null && (a3 = t3.alternate.memoizedState.cache), t3 = t3.memoizedState.cache, t3 !== a3 && (t3.refCount++, a3 != null && Ra2(a3)));
        break;
      case 12:
        if (a3 & 2048) {
          Vu(e5, t3, n3, r3), a3 = t3.stateNode;
          try {
            var o3 = t3.memoizedProps, s3 = o3.id, c3 = o3.onPostCommit;
            typeof c3 == `function` && c3(s3, t3.alternate === null ? `mount` : `update`, a3.passiveEffectDuration, -0);
          } catch (e6) {
            Z(t3, t3.return, e6);
          }
        } else Vu(e5, t3, n3, r3);
        break;
      case 31:
        Vu(e5, t3, n3, r3);
        break;
      case 13:
        Vu(e5, t3, n3, r3);
        break;
      case 23:
        break;
      case 22:
        o3 = t3.stateNode, s3 = t3.alternate, t3.memoizedState === null ? (i3 && s3 !== null && s3.memoizedState !== null && nu(t3), o3._visibility & 2 ? Vu(e5, t3, n3, r3) : (o3._visibility |= 2, Uu(e5, t3, n3, r3, !!(t3.subtreeFlags & 10256) || false))) : (i3 && s3 !== null && s3.memoizedState === null && nu(s3), o3._visibility & 2 ? Vu(e5, t3, n3, r3) : Wu(e5, t3)), a3 & 2048 && zu(s3, t3);
        break;
      case 24:
        Vu(e5, t3, n3, r3), a3 & 2048 && Bu(t3.alternate, t3);
        break;
      case 30:
        i3 && (a3 = t3.alternate, a3 !== null && (Yl(a3.child, true), Yl(t3.child, true))), Vu(e5, t3, n3, r3);
        break;
      default:
        Vu(e5, t3, n3, r3);
    }
  }
  function Uu(e5, t3, n3, r3, i3) {
    for (i3 &&= !!(t3.subtreeFlags & 10256) || false, t3 = t3.child; t3 !== null; ) {
      var a3 = e5, o3 = t3, s3 = n3, c3 = r3, l3 = o3.flags;
      switch (o3.tag) {
        case 0:
        case 11:
        case 15:
          Uu(a3, o3, s3, c3, i3), Cl(8, o3);
          break;
        case 23:
          break;
        case 22:
          var u3 = o3.stateNode;
          o3.memoizedState === null ? (u3._visibility |= 2, Uu(a3, o3, s3, c3, i3)) : u3._visibility & 2 ? Uu(a3, o3, s3, c3, i3) : Wu(a3, o3), i3 && l3 & 2048 && zu(o3.alternate, o3);
          break;
        case 24:
          Uu(a3, o3, s3, c3, i3), i3 && l3 & 2048 && Bu(o3.alternate, o3);
          break;
        default:
          Uu(a3, o3, s3, c3, i3);
      }
      t3 = t3.sibling;
    }
  }
  function Wu(e5, t3) {
    if (t3.subtreeFlags & 10256) for (t3 = t3.child; t3 !== null; ) {
      var n3 = e5, r3 = t3, i3 = r3.flags;
      switch (r3.tag) {
        case 22:
          Wu(n3, r3), i3 & 2048 && zu(r3.alternate, r3);
          break;
        case 24:
          Wu(n3, r3), i3 & 2048 && Bu(r3.alternate, r3);
          break;
        default:
          Wu(n3, r3);
      }
      t3 = t3.sibling;
    }
  }
  var Gu = 8192;
  function Ku(e5, t3, n3) {
    if (e5.subtreeFlags & Gu) for (e5 = e5.child; e5 !== null; ) qu(e5, t3, n3), e5 = e5.sibling;
  }
  function qu(e5, t3, n3) {
    switch (e5.tag) {
      case 26:
        Ku(e5, t3, n3), e5.flags & Gu && (e5.memoizedState === null ? (e5 = e5.stateNode, (t3 & 335544128) === t3 && Zm(n3, e5)) : Qm(n3, Au, e5.memoizedState, e5.memoizedProps));
        break;
      case 5:
        Ku(e5, t3, n3), e5.flags & Gu && (e5 = e5.stateNode, (t3 & 335544128) === t3 && Zm(n3, e5));
        break;
      case 3:
      case 4:
        var r3 = Au;
        Au = bm(e5.stateNode.containerInfo), Ku(e5, t3, n3), Au = r3;
        break;
      case 22:
        e5.memoizedState === null && (r3 = e5.alternate, r3 !== null && r3.memoizedState !== null ? (r3 = Gu, Gu = 16777216, Ku(e5, t3, n3), Gu = r3) : Ku(e5, t3, n3));
        break;
      case 30:
        if ((e5.flags & Gu) !== 0 && (r3 = e5.memoizedProps.name, r3 != null && r3 !== `auto`)) {
          var i3 = e5.stateNode;
          i3.paired = null, Hl === null && (Hl = /* @__PURE__ */ new Map()), Hl.set(r3, i3);
        }
        Ku(e5, t3, n3);
        break;
      default:
        Ku(e5, t3, n3);
    }
  }
  function Ju(e5) {
    var t3 = e5.alternate;
    if (t3 !== null && (e5 = t3.child, e5 !== null)) {
      t3.child = null;
      do
        t3 = e5.sibling, e5.sibling = null, e5 = t3;
      while (e5 !== null);
    }
  }
  function Yu(e5) {
    var t3 = e5.deletions;
    if (e5.flags & 16) {
      if (t3 !== null) for (var n3 = 0; n3 < t3.length; n3++) {
        var r3 = t3[n3];
        uu = r3, Qu(r3, e5);
      }
      Ju(e5);
    }
    if (e5.subtreeFlags & 10256) for (e5 = e5.child; e5 !== null; ) Xu(e5), e5 = e5.sibling;
  }
  function Xu(e5) {
    switch (e5.tag) {
      case 0:
      case 11:
      case 15:
        Yu(e5), e5.flags & 2048 && wl(9, e5, e5.return);
        break;
      case 3:
        Yu(e5);
        break;
      case 12:
        Yu(e5);
        break;
      case 22:
        var t3 = e5.stateNode;
        e5.memoizedState !== null && t3._visibility & 2 && (e5.return === null || e5.return.tag !== 13) ? (t3._visibility &= -3, Zu(e5)) : Yu(e5);
        break;
      default:
        Yu(e5);
    }
  }
  function Zu(e5) {
    var t3 = e5.deletions;
    if (e5.flags & 16) {
      if (t3 !== null) for (var n3 = 0; n3 < t3.length; n3++) {
        var r3 = t3[n3];
        uu = r3, Qu(r3, e5);
      }
      Ju(e5);
    }
    for (e5 = e5.child; e5 !== null; ) {
      switch (t3 = e5, t3.tag) {
        case 0:
        case 11:
        case 15:
          wl(8, t3, t3.return), Zu(t3);
          break;
        case 22:
          n3 = t3.stateNode, n3._visibility & 2 && (n3._visibility &= -3, Zu(t3));
          break;
        default:
          Zu(t3);
      }
      e5 = e5.sibling;
    }
  }
  function Qu(e5, t3) {
    for (; uu !== null; ) {
      var n3 = uu;
      switch (n3.tag) {
        case 0:
        case 11:
        case 15:
          wl(8, n3, t3);
          break;
        case 23:
        case 22:
          if (n3.memoizedState !== null && n3.memoizedState.cachePool !== null) {
            var r3 = n3.memoizedState.cachePool.pool;
            r3 != null && r3.refCount++;
          }
          break;
        case 24:
          Ra2(n3.memoizedState.cache);
      }
      if (r3 = n3.child, r3 !== null) r3.return = n3, uu = r3;
      else a: for (n3 = e5; uu !== null; ) {
        r3 = uu;
        var i3 = r3.sibling, a3 = r3.return;
        if (xu(r3), r3 === n3) {
          uu = null;
          break a;
        }
        if (i3 !== null) {
          i3.return = a3, uu = i3;
          break a;
        }
        uu = a3;
      }
    }
  }
  var $u = { getCacheForType: function(e5) {
    var t3 = Aa2(Ia2), n3 = t3.data.get(e5);
    return n3 === void 0 && (n3 = e5(), t3.data.set(e5, n3)), n3;
  }, cacheSignal: function() {
    return Aa2(Ia2).controller.signal;
  } }, ed = typeof WeakMap == `function` ? WeakMap : Map, G = 0, K = null, q = null, J = 0, Y = 0, td = null, nd = false, rd = false, id = false, ad = 0, od = 0, sd = 0, cd = 0, ld = 0, ud = 0, dd = 0, fd = null, pd = null, md = false, hd = 0, gd = 0, _d = 1 / 0, vd = null, yd = null, X = 0, bd = null, xd = null, Sd = 0, Cd = 0, wd = null, Td = null, Ed = null, Dd = null, Od = null, kd = 0, Ad = null;
  function jd() {
    return G & 2 && J !== 0 ? J & -J : E2.T === null ? kt2() : Pf();
  }
  function Md() {
    if (ud === 0) {
      if (!(J & 536870912) || F2) {
        var e5 = pt2;
        pt2 <<= 1, !(pt2 & 3932160) && (pt2 = 262144), ud = e5;
      } else ud = 536870912;
    }
    return e5 = Fo2.current, e5 !== null && (e5.flags |= 32), ud;
  }
  function Nd(e5, t3) {
    if (t3 != null) {
      var n3 = e5.stateNode, r3 = n3.ref;
      r3 === null && (r3 = n3.ref = Pp(Ti2(e5.memoizedProps, n3))), Dd === null && (Dd = []), Dd.push(t3.bind(null, r3));
    }
  }
  function Pd(e5, t3, n3) {
    (e5 === K && (Y === 2 || Y === 9) || e5.cancelPendingCommit !== null) && (Vd(e5, 0), Rd(e5, J, ud, false)), St2(e5, n3), (!(G & 2) || e5 !== K) && (e5 === K && (!(G & 2) && (cd |= n3), od === 4 && Rd(e5, J, ud, false)), Ef(e5));
  }
  function Fd(e5, t3, n3) {
    if (G & 6) throw Error(i2(327));
    var r3 = !n3 && !(t3 & 127) && (t3 & e5.expiredLanes) === 0 || _t2(e5, t3), a3 = r3 ? Yd(e5, t3) : qd(e5, t3, true), o3 = r3;
    do {
      if (a3 === 0) {
        rd && !r3 && Rd(e5, t3, 0, false);
        break;
      }
      if (n3 = e5.current.alternate, o3 && !Ld(n3)) {
        a3 = qd(e5, t3, false), o3 = false;
        continue;
      }
      if (a3 === 2) {
        if (o3 = t3, e5.errorRecoveryDisabledLanes & o3) var s3 = 0;
        else s3 = e5.pendingLanes & -536870913, s3 = s3 === 0 ? s3 & 536870912 ? 536870912 : 0 : s3;
        if (s3 !== 0) {
          t3 = s3;
          a: {
            var c3 = e5;
            a3 = fd;
            var l3 = c3.current.memoizedState.isDehydrated;
            if (l3 && (Vd(c3, s3).flags |= 256), s3 = qd(c3, s3, false), s3 !== 2 && s3 !== 6) {
              if (id && !l3) {
                c3.errorRecoveryDisabledLanes |= o3, cd |= o3, a3 = 4;
                break a;
              }
              o3 = pd, pd = a3, o3 !== null && (pd === null ? pd = o3 : pd.push.apply(pd, o3));
            }
            a3 = s3;
          }
          if (o3 = false, a3 !== 2) continue;
        }
      }
      if (a3 === 1) {
        Vd(e5, 0), Rd(e5, t3, 0, true);
        break;
      }
      a: {
        switch (r3 = e5, o3 = a3, o3) {
          case 0:
          case 1:
            throw Error(i2(345));
          case 4:
            if ((t3 & 4194048) !== t3 && (t3 & 62914560) !== t3) break;
          case 6:
            Rd(r3, t3, ud, !nd);
            break a;
          case 2:
            pd = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(i2(329));
        }
        if ((t3 & 62914560) === t3 && (a3 = hd + 300 - Xe2(), 10 < a3)) {
          if (Rd(r3, t3, ud, !nd), gt2(r3, 0, true) !== 0) break a;
          Sd = t3, r3.timeoutHandle = gp(Id.bind(null, r3, n3, pd, vd, md, t3, ud, cd, dd, nd, o3, `Throttled`, -0, 0), a3);
          break a;
        }
        Id(r3, n3, pd, vd, md, t3, ud, cd, dd, nd, o3, null, -0, 0);
      }
      break;
    } while (1);
    Ef(e5);
  }
  function Id(e5, t3, n3, r3, i3, a3, o3, s3, c3, l3, u3, d2, f3, p2) {
    e5.timeoutHandle = -1;
    var m3 = t3.subtreeFlags, h2 = (a3 & 335544064) === a3;
    if (d2 = null, (h2 || m3 & 8192 || (m3 & 16785408) == 16785408) && (d2 = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: On2 }, Hl = null, qu(t3, a3, d2), h2 && (m3 = d2, h2 = e5.containerInfo, h2 = (h2.nodeType === 9 ? h2 : h2.ownerDocument).__reactViewTransition, h2 != null && (m3.count++, m3.waitingForViewTransition = true, m3 = nh.bind(m3), h2.finished.then(m3, m3))), m3 = (a3 & 62914560) === a3 ? hd - Xe2() : (a3 & 4194048) === a3 ? gd - Xe2() : 0, m3 = eh(d2, m3), m3 !== null)) {
      Sd = a3, e5.cancelPendingCommit = m3(nf.bind(null, e5, t3, a3, n3, r3, i3, o3, s3, c3, l3, u3, d2, null, f3, p2)), Rd(e5, a3, o3, !l3);
      return;
    }
    nf(e5, t3, a3, n3, r3, i3, o3, s3, c3, l3, u3, d2);
  }
  function Ld(e5) {
    for (var t3 = e5; ; ) {
      var n3 = t3.tag;
      if ((n3 === 0 || n3 === 11 || n3 === 15) && t3.flags & 16384 && (n3 = t3.updateQueue, n3 !== null && (n3 = n3.stores, n3 !== null))) for (var r3 = 0; r3 < n3.length; r3++) {
        var i3 = n3[r3], a3 = i3.getSnapshot;
        i3 = i3.value;
        try {
          if (!Xr2(a3(), i3)) return false;
        } catch {
          return false;
        }
      }
      if (n3 = t3.child, t3.subtreeFlags & 16384 && n3 !== null) n3.return = t3, t3 = n3;
      else {
        if (t3 === e5) break;
        for (; t3.sibling === null; ) {
          if (t3.return === null || t3.return === e5) return true;
          t3 = t3.return;
        }
        t3.sibling.return = t3.return, t3 = t3.sibling;
      }
    }
    return true;
  }
  function Rd(e5, t3, n3, r3) {
    t3 = vt2(e5, t3), t3 &= ~ld, t3 &= ~cd, e5.suspendedLanes |= t3, e5.pingedLanes &= ~t3, r3 && (e5.warmLanes |= t3), r3 = e5.expirationTimes;
    for (var i3 = t3; 0 < i3; ) {
      var a3 = 31 - ct2(i3), o3 = 1 << a3;
      r3[a3] = -1, i3 &= ~o3;
    }
    n3 !== 0 && wt2(e5, n3, t3);
  }
  function zd() {
    return G & 6 ? true : (Df(0, false), false);
  }
  function Bd() {
    if (q !== null) {
      if (Y === 0) var e5 = q.return;
      else e5 = q, Sa2 = xa2 = null, os2(e5), uo2 = null, fo2 = 0, e5 = q;
      for (; e5 !== null; ) Sl(e5.alternate, e5), e5 = e5.return;
      q = null;
    }
  }
  function Vd(e5, t3) {
    var n3 = e5.timeoutHandle;
    return n3 !== -1 && (e5.timeoutHandle = -1, _p(n3)), n3 = e5.cancelPendingCommit, n3 !== null && (e5.cancelPendingCommit = null, n3()), Sd = 0, Bd(), K = e5, q = n3 = Vi2(e5.current, null), J = t3, Y = 0, td = null, nd = false, rd = _t2(e5, t3), id = false, dd = ud = ld = cd = sd = od = 0, pd = fd = null, md = false, ad = vt2(e5, t3), Mi2(), n3;
  }
  function Hd(e5, t3) {
    z2 = null, E2.H = gc, t3 === eo2 || t3 === no2 ? (t3 = co2(), Y = 3) : t3 === to2 ? (t3 = co2(), Y = 4) : Y = t3 === Pc ? 8 : typeof t3 == `object` && t3 && typeof t3.then == `function` ? 6 : 1, td = t3, q === null && (od = 1, Oc(e5, Yi2(t3, e5.current)));
  }
  function Ud() {
    var e5 = Fo2.current;
    return e5 === null ? true : (J & 4194048) === J ? Io2 === null : (J & 62914560) === J || J & 536870912 ? e5 === Io2 : false;
  }
  function Wd() {
    var e5 = E2.H;
    return E2.H = gc, e5 === null ? gc : e5;
  }
  function Gd() {
    var e5 = E2.A;
    return E2.A = $u, e5;
  }
  function Kd() {
    od = 4, nd || (J & 4194048) !== J && Fo2.current !== null || (rd = true), !(sd & 134217727) && !(cd & 134217727) || K === null || Rd(K, J, ud, false);
  }
  function qd(e5, t3, n3) {
    var r3 = G;
    G |= 2;
    var i3 = Wd(), a3 = Gd();
    (K !== e5 || J !== t3) && (vd = null, Vd(e5, t3)), t3 = false;
    var o3 = od;
    a: do
      try {
        if (Y !== 0 && q !== null) {
          var s3 = q, c3 = td;
          switch (Y) {
            case 8:
              Bd(), o3 = 6;
              break a;
            case 3:
            case 2:
            case 9:
            case 6:
              Fo2.current === null && (t3 = true);
              var l3 = Y;
              if (Y = 0, td = null, $d(e5, s3, c3, l3), n3 && rd) {
                o3 = 0;
                break a;
              }
              break;
            default:
              l3 = Y, Y = 0, td = null, $d(e5, s3, c3, l3);
          }
        }
        Jd(), o3 = od;
        break;
      } catch (t4) {
        Hd(e5, t4);
      }
    while (1);
    return t3 && e5.shellSuspendCounter++, Sa2 = xa2 = null, G = r3, E2.H = i3, E2.A = a3, q === null && (K = null, J = 0, Mi2()), o3;
  }
  function Jd() {
    for (; q !== null; ) Zd(q);
  }
  function Yd(e5, t3) {
    var n3 = G;
    G |= 2;
    var r3 = Wd(), a3 = Gd();
    K !== e5 || J !== t3 ? (vd = null, _d = Xe2() + 500, Vd(e5, t3)) : rd = _t2(e5, t3);
    a: do
      try {
        if (Y !== 0 && q !== null) {
          t3 = q;
          var o3 = td;
          b: switch (Y) {
            case 1:
              Y = 0, td = null, $d(e5, t3, o3, 1);
              break;
            case 2:
            case 9:
              if (io2(o3)) {
                Y = 0, td = null, Qd(t3);
                break;
              }
              t3 = function() {
                Y !== 2 && Y !== 9 || K !== e5 || (Y = 7), Ef(e5);
              }, o3.then(t3, t3);
              break a;
            case 3:
              Y = 7;
              break a;
            case 4:
              Y = 5;
              break a;
            case 7:
              io2(o3) ? (Y = 0, td = null, Qd(t3)) : (Y = 0, td = null, $d(e5, t3, o3, 7));
              break;
            case 5:
              var s3 = null;
              switch (q.tag) {
                case 26:
                  s3 = q.memoizedState;
                case 5:
                case 27:
                  var c3 = q;
                  if (s3 ? Ym(s3) : c3.stateNode.complete) {
                    Y = 0, td = null;
                    var l3 = c3.sibling;
                    if (l3 !== null) q = l3;
                    else {
                      var u3 = c3.return;
                      u3 === null ? q = null : (q = u3, ef(u3));
                    }
                    break b;
                  }
              }
              Y = 0, td = null, $d(e5, t3, o3, 5);
              break;
            case 6:
              Y = 0, td = null, $d(e5, t3, o3, 6);
              break;
            case 8:
              Bd(), od = 6;
              break a;
            default:
              throw Error(i2(462));
          }
        }
        Xd();
        break;
      } catch (t4) {
        Hd(e5, t4);
      }
    while (1);
    return Sa2 = xa2 = null, E2.H = r3, E2.A = a3, G = n3, q === null ? (K = null, J = 0, Mi2(), od) : 0;
  }
  function Xd() {
    for (; q !== null && !Je2(); ) Zd(q);
  }
  function Zd(e5) {
    var t3 = ml(e5.alternate, e5, ad);
    e5.memoizedProps = e5.pendingProps, t3 === null ? ef(e5) : q = t3;
  }
  function Qd(e5) {
    var t3 = e5, n3 = t3.alternate;
    switch (t3.tag) {
      case 15:
      case 0:
        t3 = Jc(n3, t3, t3.pendingProps, t3.type, void 0, J);
        break;
      case 11:
        t3 = Jc(n3, t3, t3.pendingProps, t3.type.render, t3.ref, J);
        break;
      case 5:
        os2(t3);
        var r3 = t3;
        r3 === N2 && (F2 ? (ha2(r3), r3.tag === 5 && r3.stateNode != null && (P2 = r3.stateNode)) : (ha2(r3), F2 = true));
      default:
        Sl(n3, t3), t3 = q = Hi2(t3, ad), t3 = ml(n3, t3, ad);
    }
    e5.memoizedProps = e5.pendingProps, t3 === null ? ef(e5) : q = t3;
  }
  function $d(e5, t3, n3, r3) {
    Sa2 = xa2 = null, os2(t3), uo2 = null, fo2 = 0;
    var i3 = t3.return;
    try {
      if (Nc(e5, i3, t3, n3, J)) {
        od = 1, Oc(e5, Yi2(n3, e5.current)), q = null;
        return;
      }
    } catch (t4) {
      if (i3 !== null) throw q = i3, t4;
      od = 1, Oc(e5, Yi2(n3, e5.current)), q = null;
      return;
    }
    t3.flags & 32768 ? (F2 || r3 === 1 ? e5 = true : rd || J & 536870912 ? e5 = false : (nd = e5 = true, (r3 === 2 || r3 === 9 || r3 === 3 || r3 === 6) && (r3 = Fo2.current, r3 !== null && r3.tag === 13 && (r3.flags |= 16384))), tf(t3, e5)) : ef(t3);
  }
  function ef(e5) {
    var t3 = e5;
    do {
      if (t3.flags & 32768) {
        tf(t3, nd);
        return;
      }
      e5 = t3.return;
      var n3 = bl(t3.alternate, t3, ad);
      if (n3 !== null) {
        q = n3;
        return;
      }
      if (t3 = t3.sibling, t3 !== null) {
        q = t3;
        return;
      }
      q = t3 = e5;
    } while (t3 !== null);
    od === 0 && (od = 5);
  }
  function tf(e5, t3) {
    do {
      var n3 = xl(e5.alternate, e5);
      if (n3 !== null) {
        n3.flags &= 32767, q = n3;
        return;
      }
      if (n3 = e5.return, n3 !== null && (n3.flags |= 32768, n3.subtreeFlags = 0, n3.deletions = null), !t3 && (e5 = e5.sibling, e5 !== null)) {
        q = e5;
        return;
      }
      q = e5 = n3;
    } while (e5 !== null);
    od = 6, q = null;
  }
  function nf(e5, t3, n3, r3, a3, o3, s3, c3, l3, u3, d2, f3) {
    e5.cancelPendingCommit = null;
    do
      df();
    while (X !== 0);
    if (G & 6) throw Error(i2(327));
    if (t3 !== null) {
      if (t3 === e5.current) throw Error(i2(177));
      e5 === K && (q = K = null, J = 0), xd = t3, bd = e5, Sd = n3, wd = a3, Td = r3, rf(e5, t3, n3, s3, c3, l3, f3);
    }
  }
  function rf(e5, t3, n3, r3, i3, a3, o3) {
    var s3 = t3.lanes | t3.childLanes;
    if (Cd = s3, s3 |= ji2, Ct2(e5, n3, s3, r3, i3, a3), Dd = null, (n3 & 335544064) === n3 ? (Od = Va2(e5), r3 = 10262) : (Od = null, r3 = 10256), (t3.subtreeFlags & r3) !== 0 || (t3.flags & r3) !== 0 ? (e5.callbackNode = null, e5.callbackPriority = 0, yf(et2, function() {
      return ff(), null;
    })) : (e5.callbackNode = null, e5.callbackPriority = 0), Vl = false, r3 = !!(t3.flags & 13878), t3.subtreeFlags & 13878 || r3) {
      r3 = E2.T, E2.T = null, i3 = D2.p, D2.p = 2, a3 = G, G |= 4;
      try {
        hu(e5, t3, n3);
      } finally {
        G = a3, D2.p = i3, E2.T = r3;
      }
    }
    X = 1, Vl ? Ed = Mp(o3, e5.containerInfo, Od, sf, cf, of, lf, ff, af, null, null) : (sf(), cf(), lf());
  }
  function af(e5) {
    if (X !== 0) {
      var t3 = bd.onRecoverableError;
      t3(e5, { componentStack: null });
    }
  }
  function of() {
    X === 3 && (X = 0, Fu(xd, bd), X = 4);
  }
  function sf() {
    if (X === 1) {
      X = 0;
      var e5 = bd, t3 = xd, n3 = Sd, r3 = !!(t3.flags & 13878);
      if (t3.subtreeFlags & 13878 || r3) {
        r3 = E2.T, E2.T = null;
        var i3 = D2.p;
        D2.p = 2;
        var a3 = G;
        G |= 4;
        try {
          fu = pu = false, ju(t3, e5, n3), n3 = cp;
          var o3 = ni2(e5.containerInfo), s3 = n3.focusedElem, c3 = n3.selectionRange;
          if (o3 !== s3 && s3 && s3.ownerDocument && ti2(s3.ownerDocument.documentElement, s3)) {
            if (c3 !== null && ri2(s3)) {
              var l3 = c3.start, u3 = c3.end;
              if (u3 === void 0 && (u3 = l3), `selectionStart` in s3) s3.selectionStart = l3, s3.selectionEnd = Math.min(u3, s3.value.length);
              else {
                var d2 = s3.ownerDocument || document, f3 = d2 && d2.defaultView || window;
                if (f3.getSelection) {
                  var p2 = f3.getSelection(), m3 = s3.textContent.length, h2 = Math.min(c3.start, m3), g3 = c3.end === void 0 ? h2 : Math.min(c3.end, m3);
                  !p2.extend && h2 > g3 && (o3 = g3, g3 = h2, h2 = o3);
                  var _3 = ei2(s3, h2), v3 = ei2(s3, g3);
                  if (_3 && v3 && (p2.rangeCount !== 1 || p2.anchorNode !== _3.node || p2.anchorOffset !== _3.offset || p2.focusNode !== v3.node || p2.focusOffset !== v3.offset)) {
                    var y3 = d2.createRange();
                    y3.setStart(_3.node, _3.offset), p2.removeAllRanges(), h2 > g3 ? (p2.addRange(y3), p2.extend(v3.node, v3.offset)) : (y3.setEnd(v3.node, v3.offset), p2.addRange(y3));
                  }
                }
              }
            }
            for (d2 = [], p2 = s3; p2 = p2.parentNode; ) p2.nodeType === 1 && d2.push({ element: p2, left: p2.scrollLeft, top: p2.scrollTop });
            for (typeof s3.focus == `function` && s3.focus(), s3 = 0; s3 < d2.length; s3++) {
              var b3 = d2[s3];
              b3.element.scrollLeft = b3.left, b3.element.scrollTop = b3.top;
            }
          }
          gh = !!sp, cp = sp = null;
        } finally {
          G = a3, D2.p = i3, E2.T = r3;
        }
      }
      e5.current = t3, X = 2;
    }
  }
  function cf() {
    if (X === 2) {
      X = 0;
      var e5 = bd, t3 = xd, n3 = !!(t3.flags & 8772);
      if (t3.subtreeFlags & 8772 || n3) {
        n3 = E2.T, E2.T = null;
        var r3 = D2.p;
        D2.p = 2;
        var i3 = G;
        G |= 4;
        try {
          _u(e5, t3.alternate, t3);
        } finally {
          G = i3, D2.p = r3, E2.T = n3;
        }
      }
      X = 3;
    }
  }
  function lf() {
    if (X === 4 || X === 3) {
      X = 0;
      var e5 = Ed;
      Ed = null, Ye2();
      var t3 = bd, n3 = xd, r3 = Sd, i3 = Td, a3 = (r3 & 335544064) === r3 ? 10262 : 10256;
      if ((n3.subtreeFlags & a3) !== 0 || (n3.flags & a3) !== 0 ? X = 5 : (X = 0, xd = bd = null, uf(t3, t3.pendingLanes)), a3 = t3.pendingLanes, a3 === 0 && (yd = null), Ot2(r3), n3 = n3.stateNode, ot2 && typeof ot2.onCommitFiberRoot == `function`) try {
        ot2.onCommitFiberRoot(at2, n3, void 0, (n3.current.flags & 128) == 128);
      } catch {
      }
      if (i3 !== null) {
        n3 = E2.T, a3 = D2.p, D2.p = 2, E2.T = null;
        try {
          for (var o3 = t3.onRecoverableError, s3 = 0; s3 < i3.length; s3++) {
            var c3 = i3[s3];
            o3(c3.value, { componentStack: c3.stack });
          }
        } finally {
          E2.T = n3, D2.p = a3;
        }
      }
      if (i3 = Dd, o3 = Od, Od = null, i3 !== null && (Dd = null, o3 === null && (o3 = []), e5 !== null)) for (c3 = 0; c3 < i3.length; c3++) n3 = (0, i3[c3])(o3), n3 !== void 0 && e5.finished.finally(n3);
      Sd & 3 && df(), Ef(t3), a3 = t3.pendingLanes, r3 & 261930 && a3 & 42 ? t3 === Ad ? kd++ : (kd = 0, Ad = t3) : (kd = 0, Ad = null), Df(0, false);
    }
  }
  function uf(e5, t3) {
    (e5.pooledCacheLanes &= t3) === 0 && (t3 = e5.pooledCache, t3 != null && (e5.pooledCache = null, Ra2(t3)));
  }
  function df() {
    return Ed !== null && (Ed.skipTransition(), Ed = null), sf(), cf(), lf(), ff();
  }
  function ff() {
    if (X !== 5) return false;
    var e5 = bd, t3 = Cd;
    Cd = 0;
    var n3 = Ot2(Sd), r3 = E2.T, a3 = D2.p;
    try {
      D2.p = 32 > n3 ? 32 : n3, E2.T = null, n3 = wd, wd = null;
      var o3 = bd, s3 = Sd;
      if (X = 0, xd = bd = null, Sd = 0, G & 6) throw Error(i2(331));
      var c3 = G;
      if (G |= 4, Xu(o3.current), Hu(o3, o3.current, s3, n3), G = c3, Df(0, false), ot2 && typeof ot2.onPostCommitFiberRoot == `function`) try {
        ot2.onPostCommitFiberRoot(at2, o3);
      } catch {
      }
      return true;
    } finally {
      D2.p = a3, E2.T = r3, uf(e5, t3);
    }
  }
  function pf(e5, t3, n3) {
    t3 = Yi2(n3, t3), t3 = Ac(e5.stateNode, t3, 2), e5 = Co2(e5, t3, 2), e5 !== null && (St2(e5, 2), Ef(e5));
  }
  function Z(e5, t3, n3) {
    if (e5.tag === 3) pf(e5, e5, n3);
    else for (; t3 !== null; ) {
      if (t3.tag === 3) {
        pf(t3, e5, n3);
        break;
      }
      if (t3.tag === 1) {
        var r3 = t3.stateNode;
        if (typeof t3.type.getDerivedStateFromError == `function` || typeof r3.componentDidCatch == `function` && (yd === null || !yd.has(r3))) {
          e5 = Yi2(n3, e5), n3 = jc(2), r3 = Co2(t3, n3, 2), r3 !== null && (Mc(n3, r3, t3, e5), St2(r3, 2), Ef(r3));
          break;
        }
      }
      t3 = t3.return;
    }
  }
  function mf(e5, t3, n3) {
    var r3 = e5.pingCache;
    if (r3 === null) {
      r3 = e5.pingCache = new ed();
      var i3 = /* @__PURE__ */ new Set();
      r3.set(t3, i3);
    } else i3 = r3.get(t3), i3 === void 0 && (i3 = /* @__PURE__ */ new Set(), r3.set(t3, i3));
    i3.has(n3) || (id = true, i3.add(n3), e5 = hf.bind(null, e5, t3, n3), t3.then(e5, e5));
  }
  function hf(e5, t3, n3) {
    var r3 = e5.pingCache;
    r3 !== null && r3.delete(t3), e5.pingedLanes |= e5.suspendedLanes & n3, e5.warmLanes &= ~n3, K === e5 && (J & n3) === n3 && (od === 4 || od === 3 && (J & 62914560) === J && 300 > Xe2() - hd ? G & 2 ? ld |= n3 : Vd(e5, 0) : ld |= n3, dd === J && (dd = 0)), Ef(e5);
  }
  function gf(e5, t3) {
    t3 === 0 && (t3 = bt2()), e5 = Fi2(e5, t3), e5 !== null && (St2(e5, t3), Ef(e5));
  }
  function _f(e5) {
    var t3 = e5.memoizedState, n3 = 0;
    t3 !== null && (n3 = t3.retryLane), gf(e5, n3);
  }
  function vf(e5, t3) {
    var n3 = 0;
    switch (e5.tag) {
      case 31:
      case 13:
        var r3 = e5.stateNode, a3 = e5.memoizedState;
        a3 !== null && (n3 = a3.retryLane);
        break;
      case 19:
        r3 = e5.stateNode;
        break;
      case 22:
        r3 = e5.stateNode._retryCache;
        break;
      default:
        throw Error(i2(314));
    }
    r3 !== null && r3.delete(t3), gf(e5, n3);
  }
  function yf(e5, t3) {
    return Ke2(e5, t3);
  }
  var bf = null, xf = null, Sf = false, Cf = false, wf = false, Tf = 0;
  function Ef(e5) {
    e5 !== xf && e5.next === null && (xf === null ? bf = xf = e5 : xf = xf.next = e5), Cf = true, Sf || (Sf = true, Nf());
  }
  function Df(e5, t3) {
    if (!wf && Cf) {
      wf = true;
      do
        for (var n3 = false, r3 = bf; r3 !== null; ) {
          if (!t3) {
            if (e5 !== 0) {
              var i3 = r3.pendingLanes;
              if (i3 === 0) var a3 = 0;
              else {
                var o3 = r3.suspendedLanes, s3 = r3.pingedLanes;
                a3 = (1 << 31 - ct2(42 | e5) + 1) - 1, a3 &= i3 & ~(o3 & ~s3), a3 = a3 & 201326741 ? a3 & 201326741 | 1 : a3 ? a3 | 2 : 0;
              }
              a3 !== 0 && (n3 = true, Mf(r3, a3));
            } else a3 = J, a3 = gt2(r3, r3 === K ? a3 : 0, r3.cancelPendingCommit !== null || r3.timeoutHandle !== -1), !(a3 & 3) || _t2(r3, a3) || (n3 = true, Mf(r3, a3));
          }
          r3 = r3.next;
        }
      while (n3);
      wf = false;
    }
  }
  function Of() {
    kf();
  }
  function kf() {
    Cf = Sf = false;
    var e5 = 0;
    Tf !== 0 && hp() && (e5 = Tf);
    for (var t3 = Xe2(), n3 = null, r3 = bf; r3 !== null; ) {
      var i3 = r3.next, a3 = Af(r3, t3);
      a3 === 0 ? (r3.next = null, n3 === null ? bf = i3 : n3.next = i3, i3 === null && (xf = n3)) : (n3 = r3, (e5 !== 0 || a3 & 3) && (Cf = true)), r3 = i3;
    }
    X !== 0 && X !== 5 || Df(e5, false), Tf !== 0 && (Tf = 0);
  }
  function Af(e5, t3) {
    for (var n3 = e5.suspendedLanes, r3 = e5.pingedLanes, i3 = e5.expirationTimes, a3 = e5.pendingLanes & -62914561; 0 < a3; ) {
      var o3 = 31 - ct2(a3), s3 = 1 << o3, c3 = i3[o3];
      c3 === -1 ? ((s3 & n3) === 0 || (s3 & r3) !== 0) && (i3[o3] = yt2(s3, t3)) : c3 <= t3 && (e5.expiredLanes |= s3), a3 &= ~s3;
    }
    if (t3 = K, n3 = J, n3 = gt2(e5, e5 === t3 ? n3 : 0, e5.cancelPendingCommit !== null || e5.timeoutHandle !== -1), r3 = e5.callbackNode, n3 === 0 || e5 === t3 && (Y === 2 || Y === 9) || e5.cancelPendingCommit !== null) return r3 !== null && r3 !== null && qe2(r3), e5.callbackNode = null, e5.callbackPriority = 0;
    if (!(n3 & 3) || _t2(e5, n3)) {
      if (t3 = n3 & -n3, t3 === e5.callbackPriority) return t3;
      switch (r3 !== null && qe2(r3), Ot2(n3)) {
        case 2:
        case 8:
          n3 = $e2;
          break;
        case 32:
          n3 = et2;
          break;
        case 268435456:
          n3 = nt2;
          break;
        default:
          n3 = et2;
      }
      return r3 = jf.bind(null, e5), n3 = Ke2(n3, r3), e5.callbackPriority = t3, e5.callbackNode = n3, t3;
    }
    return r3 !== null && r3 !== null && qe2(r3), e5.callbackPriority = 2, e5.callbackNode = null, 2;
  }
  function jf(e5, t3) {
    if (X !== 0 && X !== 5) return e5.callbackNode = null, e5.callbackPriority = 0, null;
    var n3 = e5.callbackNode;
    if (df() && e5.callbackNode !== n3) return null;
    var r3 = J;
    return r3 = gt2(e5, e5 === K ? r3 : 0, e5.cancelPendingCommit !== null || e5.timeoutHandle !== -1), r3 === 0 ? null : (Fd(e5, r3, t3), Af(e5, Xe2()), e5.callbackNode != null && e5.callbackNode === n3 ? jf.bind(null, e5) : null);
  }
  function Mf(e5, t3) {
    if (df()) return null;
    Fd(e5, t3, true);
  }
  function Nf() {
    bp(function() {
      G & 6 ? Ke2(Qe2, Of) : kf();
    });
  }
  function Pf() {
    if (Tf === 0) {
      var e5 = Wa2;
      e5 === 0 && (e5 = ft2, ft2 <<= 1, !(ft2 & 261888) && (ft2 = 256)), Tf = e5;
    }
    return Tf;
  }
  function Ff(e5) {
    return e5 == null || typeof e5 == `symbol` || typeof e5 == `boolean` ? null : typeof e5 == `function` ? e5 : Dn2(e5);
  }
  function If(e5, t3, n3, r3, i3) {
    if (t3 === `submit` && n3 && n3.stateNode === i3) {
      var a3 = Ff((i3[Nt2] || null).action), o3 = r3.submitter;
      o3 && (t3 = (t3 = o3[Nt2] || null) ? Ff(t3.formAction) : o3.getAttribute(`formAction`), t3 !== null && (a3 = t3, o3 = null));
      var s3 = new Jn2(`action`, `action`, null, r3, i3);
      e5.push({ event: s3, listeners: [{ instance: null, listener: function() {
        if (r3.defaultPrevented) {
          if (Tf !== 0) {
            var e6 = new FormData(i3, o3);
            nc(n3, { pending: true, data: e6, method: i3.method, action: a3 }, null, e6);
          }
        } else typeof a3 == `function` && (s3.preventDefault(), e6 = new FormData(i3, o3), nc(n3, { pending: true, data: e6, method: i3.method, action: a3 }, a3, e6));
      }, currentTarget: i3 }] });
    }
  }
  for (var Lf = 0; Lf < Si2.length; Lf++) {
    var Rf = Si2[Lf];
    Ci2(Rf.toLowerCase(), `on` + (Rf[0].toUpperCase() + Rf.slice(1)));
  }
  Ci2(mi2, `onAnimationEnd`), Ci2(hi2, `onAnimationIteration`), Ci2(gi2, `onAnimationStart`), Ci2(`dblclick`, `onDoubleClick`), Ci2(`focusin`, `onFocus`), Ci2(`focusout`, `onBlur`), Ci2(_i2, `onTransitionRun`), Ci2(vi2, `onTransitionStart`), Ci2(yi2, `onTransitionCancel`), Ci2(bi2, `onTransitionEnd`), Zt2(`onMouseEnter`, [`mouseout`, `mouseover`]), Zt2(`onMouseLeave`, [`mouseout`, `mouseover`]), Zt2(`onPointerEnter`, [`pointerout`, `pointerover`]), Zt2(`onPointerLeave`, [`pointerout`, `pointerover`]), Xt2(`onChange`, `change click focusin focusout input keydown keyup selectionchange`.split(` `)), Xt2(`onSelect`, `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)), Xt2(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]), Xt2(`onCompositionEnd`, `compositionend focusout keydown keypress keyup mousedown`.split(` `)), Xt2(`onCompositionStart`, `compositionstart focusout keydown keypress keyup mousedown`.split(` `)), Xt2(`onCompositionUpdate`, `compositionupdate focusout keydown keypress keyup mousedown`.split(` `));
  var zf = `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `), Bf = new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));
  function Vf(e5, t3) {
    t3 = !!(t3 & 4);
    for (var n3 = 0; n3 < e5.length; n3++) {
      var r3 = e5[n3], i3 = r3.event;
      r3 = r3.listeners;
      a: {
        var a3 = void 0;
        if (t3) for (var o3 = r3.length - 1; 0 <= o3; o3--) {
          var s3 = r3[o3], c3 = s3.instance, l3 = s3.currentTarget;
          if (s3 = s3.listener, c3 !== a3 && i3.isPropagationStopped()) break a;
          a3 = s3, i3.currentTarget = l3;
          try {
            a3(i3);
          } catch (e6) {
            Oi2(e6);
          }
          i3.currentTarget = null, a3 = c3;
        }
        else for (o3 = 0; o3 < r3.length; o3++) {
          if (s3 = r3[o3], c3 = s3.instance, l3 = s3.currentTarget, s3 = s3.listener, c3 !== a3 && i3.isPropagationStopped()) break a;
          a3 = s3, i3.currentTarget = l3;
          try {
            a3(i3);
          } catch (e6) {
            Oi2(e6);
          }
          i3.currentTarget = null, a3 = c3;
        }
      }
    }
  }
  function Q(e5, t3) {
    var n3 = t3[Ft2];
    n3 === void 0 && (n3 = t3[Ft2] = /* @__PURE__ */ new Set());
    var r3 = e5 + `__bubble`;
    n3.has(r3) || (Gf(t3, e5, 2, false), n3.add(r3));
  }
  function Hf(e5, t3, n3) {
    var r3 = 0;
    t3 && (r3 |= 4), Gf(n3, e5, r3, t3);
  }
  var Uf = `_reactListening` + Math.random().toString(36).slice(2);
  function Wf(e5) {
    if (!e5[Uf]) {
      e5[Uf] = true, Jt2.forEach(function(t4) {
        t4 !== `selectionchange` && (Bf.has(t4) || Hf(t4, false, e5), Hf(t4, true, e5));
      });
      var t3 = e5.nodeType === 9 ? e5 : e5.ownerDocument;
      t3 === null || t3[Uf] || (t3[Uf] = true, Hf(`selectionchange`, false, t3));
    }
  }
  function Gf(e5, t3, n3, r3) {
    switch (Ch(t3)) {
      case 2:
        var i3 = _h;
        break;
      case 8:
        i3 = vh;
        break;
      default:
        i3 = yh;
    }
    n3 = i3.bind(null, t3, n3, e5), i3 = void 0, !Ln2 || t3 !== `touchstart` && t3 !== `touchmove` && t3 !== `wheel` || (i3 = true), r3 ? i3 === void 0 ? e5.addEventListener(t3, n3, true) : e5.addEventListener(t3, n3, { capture: true, passive: i3 }) : i3 === void 0 ? e5.addEventListener(t3, n3, false) : e5.addEventListener(t3, n3, { passive: i3 });
  }
  function Kf(e5, t3, n3, r3, i3) {
    var a3 = r3;
    if (!(t3 & 1) && !(t3 & 2) && r3 !== null) a: for (; ; ) {
      if (r3 === null) return;
      var s3 = r3.tag;
      if (s3 === 3 || s3 === 4) {
        var c3 = r3.stateNode.containerInfo;
        if (c3 === i3) break;
        if (s3 === 4) for (s3 = r3.return; s3 !== null; ) {
          var l3 = s3.tag;
          if ((l3 === 3 || l3 === 4) && s3.stateNode.containerInfo === i3) return;
          s3 = s3.return;
        }
        for (; c3 !== null; ) {
          if (s3 = Ht2(c3), s3 === null) return;
          if (l3 = s3.tag, l3 === 5 || l3 === 6 || l3 === 26 || l3 === 27) {
            r3 = a3 = s3;
            continue a;
          }
          c3 = c3.parentNode;
        }
      }
      r3 = r3.return;
    }
    Fn2(function() {
      var r4 = a3, i4 = An2(n3), s4 = [];
      a: {
        var c4 = xi2.get(e5);
        if (c4 !== void 0) {
          var l4 = Jn2, u3 = e5;
          switch (e5) {
            case `keypress`:
              if (Un2(n3) === 0) break a;
            case `keydown`:
            case `keyup`:
              l4 = fr2;
              break;
            case `focusin`:
              u3 = `focus`, l4 = rr2;
              break;
            case `focusout`:
              u3 = `blur`, l4 = rr2;
              break;
            case `beforeblur`:
            case `afterblur`:
              l4 = rr2;
              break;
            case `click`:
              if (n3.button === 2) break a;
            case `auxclick`:
            case `dblclick`:
            case `mousedown`:
            case `mousemove`:
            case `mouseup`:
            case `mouseout`:
            case `mouseover`:
            case `contextmenu`:
              l4 = tr2;
              break;
            case `drag`:
            case `dragend`:
            case `dragenter`:
            case `dragexit`:
            case `dragleave`:
            case `dragover`:
            case `dragstart`:
            case `drop`:
              l4 = nr2;
              break;
            case `touchcancel`:
            case `touchend`:
            case `touchmove`:
            case `touchstart`:
              l4 = hr2;
              break;
            case mi2:
            case hi2:
            case gi2:
              l4 = ir2;
              break;
            case bi2:
              l4 = gr2;
              break;
            case `scroll`:
            case `scrollend`:
              l4 = Xn2;
              break;
            case `wheel`:
              l4 = _r2;
              break;
            case `copy`:
            case `cut`:
            case `paste`:
              l4 = ar2;
              break;
            case `gotpointercapture`:
            case `lostpointercapture`:
            case `pointercancel`:
            case `pointerdown`:
            case `pointermove`:
            case `pointerout`:
            case `pointerover`:
            case `pointerup`:
              l4 = pr2;
              break;
            case `submit`:
              l4 = mr2;
              break;
            case `toggle`:
            case `beforetoggle`:
              l4 = vr2;
          }
          var d2 = !!(t3 & 4), f3 = !d2 && (e5 === `scroll` || e5 === `scrollend`), p2 = d2 ? c4 === null ? null : c4 + `Capture` : c4;
          d2 = [];
          for (var m3 = r4, h2; m3 !== null; ) {
            var g3 = m3;
            if (h2 = g3.stateNode, g3 = g3.tag, g3 !== 5 && g3 !== 26 && g3 !== 27 || h2 === null || p2 === null || (g3 = A2(m3, p2), g3 != null && d2.push(qf(m3, g3, h2))), f3) break;
            m3 = m3.return;
          }
          0 < d2.length && (c4 = new l4(c4, u3, null, n3, i4), s4.push({ event: c4, listeners: d2 }));
        }
      }
      if (!(t3 & 7)) {
        a: {
          if (l4 = e5 === `mouseover` || e5 === `pointerover`, c4 = e5 === `mouseout` || e5 === `pointerout`, l4 && n3 !== kn2 && (u3 = n3.relatedTarget || n3.fromElement) && (Ht2(u3) || u3[Pt2])) break a;
          (c4 || l4) && (u3 = i4.window === i4 ? i4 : (l4 = i4.ownerDocument) ? l4.defaultView || l4.parentWindow : window, c4 ? (l4 = n3.relatedTarget || n3.toElement, c4 = r4, l4 = l4 ? Ht2(l4) : null, l4 !== null && (f3 = o2(l4), d2 = l4.tag, l4 !== f3 || d2 !== 5 && d2 !== 27 && d2 !== 6) && (l4 = null)) : (c4 = null, l4 = r4), c4 !== l4 && (d2 = tr2, g3 = `onMouseLeave`, p2 = `onMouseEnter`, m3 = `mouse`, (e5 === `pointerout` || e5 === `pointerover`) && (d2 = pr2, g3 = `onPointerLeave`, p2 = `onPointerEnter`, m3 = `pointer`), f3 = c4 == null ? u3 : Wt2(c4), h2 = l4 == null ? u3 : Wt2(l4), u3 = new d2(g3, m3 + `leave`, c4, n3, i4), u3.target = f3, u3.relatedTarget = h2, g3 = null, Ht2(i4) === r4 && (d2 = new d2(p2, m3 + `enter`, l4, n3, i4), d2.target = h2, d2.relatedTarget = f3, g3 = d2), f3 = g3, d2 = c4 && l4 ? re2(c4, l4, Yf) : null, c4 !== null && Xf(s4, u3, c4, d2, false), l4 !== null && f3 !== null && Xf(s4, f3, l4, d2, true)));
        }
        a: {
          if (c4 = r4 ? Wt2(r4) : window, l4 = c4.nodeName && c4.nodeName.toLowerCase(), l4 === `select` || l4 === `input` && c4.type === `file`) var _3 = Rr2;
          else if (Mr2(c4)) {
            if (zr2) _3 = Jr2;
            else {
              _3 = Kr2;
              var v3 = Gr2;
            }
          } else l4 = c4.nodeName, !l4 || l4.toLowerCase() !== `input` || c4.type !== `checkbox` && c4.type !== `radio` ? r4 && wn2(r4.elementType) && (_3 = Rr2) : _3 = qr2;
          if (_3 &&= _3(e5, r4)) {
            Nr2(s4, _3, n3, i4);
            break a;
          }
          v3 && v3(e5, c4, r4);
        }
        switch (v3 = r4 ? Wt2(r4) : window, e5) {
          case `focusin`:
            (Mr2(v3) || v3.contentEditable === `true`) && (ai2 = v3, oi2 = r4, si2 = null);
            break;
          case `focusout`:
            si2 = oi2 = ai2 = null;
            break;
          case `mousedown`:
            ci2 = true;
            break;
          case `contextmenu`:
          case `mouseup`:
          case `dragend`:
            ci2 = false, li2(s4, n3, i4);
            break;
          case `selectionchange`:
            if (ii2) break;
          case `keydown`:
          case `keyup`:
            li2(s4, n3, i4);
        }
        var y3;
        if (br2) b: {
          switch (e5) {
            case `compositionstart`:
              var b3 = `onCompositionStart`;
              break b;
            case `compositionend`:
              b3 = `onCompositionEnd`;
              break b;
            case `compositionupdate`:
              b3 = `onCompositionUpdate`;
              break b;
          }
          b3 = void 0;
        }
        else Or2 ? Er2(e5, n3) && (b3 = `onCompositionEnd`) : e5 === `keydown` && n3.keyCode === 229 && (b3 = `onCompositionStart`);
        b3 && (Cr2 && n3.locale !== `ko` && (Or2 || b3 !== `onCompositionStart` ? b3 === `onCompositionEnd` && Or2 && (y3 = Hn2()) : (zn2 = i4, Bn2 = `value` in zn2 ? zn2.value : zn2.textContent, Or2 = true)), v3 = Jf(r4, b3), 0 < v3.length && (b3 = new or2(b3, e5, null, n3, i4), s4.push({ event: b3, listeners: v3 }), y3 ? b3.data = y3 : (y3 = Dr2(n3), y3 !== null && (b3.data = y3)))), (y3 = Sr2 ? kr2(e5, n3) : Ar2(e5, n3)) && (b3 = Jf(r4, `onBeforeInput`), 0 < b3.length && (v3 = new or2(`onBeforeInput`, `beforeinput`, null, n3, i4), s4.push({ event: v3, listeners: b3 }), v3.data = y3)), If(s4, e5, r4, n3, i4);
      }
      Vf(s4, t3);
    });
  }
  function qf(e5, t3, n3) {
    return { instance: e5, listener: t3, currentTarget: n3 };
  }
  function Jf(e5, t3) {
    for (var n3 = t3 + `Capture`, r3 = []; e5 !== null; ) {
      var i3 = e5, a3 = i3.stateNode;
      if (i3 = i3.tag, i3 !== 5 && i3 !== 26 && i3 !== 27 || a3 === null || (i3 = A2(e5, n3), i3 != null && r3.unshift(qf(e5, i3, a3)), i3 = A2(e5, t3), i3 != null && r3.push(qf(e5, i3, a3))), e5.tag === 3) return r3;
      e5 = e5.return;
    }
    return [];
  }
  function Yf(e5) {
    if (e5 === null) return null;
    do
      e5 = e5.return;
    while (e5 && e5.tag !== 5 && e5.tag !== 27);
    return e5 || null;
  }
  function Xf(e5, t3, n3, r3, i3) {
    for (var a3 = t3._reactName, o3 = []; n3 !== null && n3 !== r3; ) {
      var s3 = n3, c3 = s3.alternate, l3 = s3.stateNode;
      if (s3 = s3.tag, c3 !== null && c3 === r3) break;
      s3 !== 5 && s3 !== 26 && s3 !== 27 || l3 === null || (c3 = l3, i3 ? (l3 = A2(n3, a3), l3 != null && o3.unshift(qf(n3, l3, c3))) : i3 || (l3 = A2(n3, a3), l3 != null && o3.push(qf(n3, l3, c3)))), n3 = n3.return;
    }
    o3.length !== 0 && e5.push({ event: t3, listeners: o3 });
  }
  var Zf = /\r\n?/g, Qf = /\u0000|\uFFFD/g;
  function $f(e5) {
    return (typeof e5 == `string` ? e5 : `` + e5).replace(Zf, `
`).replace(Qf, ``);
  }
  function ep(e5, t3) {
    return t3 = $f(t3), $f(e5) === t3;
  }
  function $(e5, t3, n3, r3, a3, o3) {
    switch (n3) {
      case `children`:
        if (typeof r3 == `string`) t3 === `body` || t3 === `textarea` && r3 === `` || bn2(e5, r3);
        else if (typeof r3 == `number` || typeof r3 == `bigint`) t3 !== `body` && bn2(e5, `` + r3);
        else return;
        break;
      case `className`:
        an2(e5, `class`, r3);
        break;
      case `tabIndex`:
        an2(e5, `tabindex`, r3);
        break;
      case `dir`:
      case `role`:
      case `viewBox`:
      case `width`:
      case `height`:
        an2(e5, n3, r3);
        break;
      case `style`:
        Cn2(e5, r3, o3);
        return;
      case `data`:
        if (t3 !== `object`) {
          an2(e5, `data`, r3);
          break;
        }
      case `src`:
      case `href`:
        if (r3 === `` && (t3 !== `a` || n3 !== `href`)) {
          e5.removeAttribute(n3);
          break;
        }
        if (r3 == null || typeof r3 == `function` || typeof r3 == `symbol` || typeof r3 == `boolean`) {
          e5.removeAttribute(n3);
          break;
        }
        r3 = Dn2(r3), e5.setAttribute(n3, r3);
        break;
      case `action`:
      case `formAction`:
        if (typeof r3 == `function`) {
          e5.setAttribute(n3, `javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);
          break;
        }
        if (typeof o3 == `function` && (n3 === `formAction` ? (t3 !== `input` && $(e5, t3, `name`, a3.name, a3, null), $(e5, t3, `formEncType`, a3.formEncType, a3, null), $(e5, t3, `formMethod`, a3.formMethod, a3, null), $(e5, t3, `formTarget`, a3.formTarget, a3, null)) : ($(e5, t3, `encType`, a3.encType, a3, null), $(e5, t3, `method`, a3.method, a3, null), $(e5, t3, `target`, a3.target, a3, null))), r3 == null || typeof r3 == `symbol` || typeof r3 == `boolean`) {
          e5.removeAttribute(n3);
          break;
        }
        r3 = Dn2(r3), e5.setAttribute(n3, r3);
        break;
      case `onClick`:
        r3 != null && (e5.onclick = On2);
        return;
      case `onScroll`:
        r3 != null && Q(`scroll`, e5);
        return;
      case `onScrollEnd`:
        r3 != null && Q(`scrollend`, e5);
        return;
      case `dangerouslySetInnerHTML`:
        if (r3 != null) {
          if (typeof r3 != `object` || !(`__html` in r3)) throw Error(i2(61));
          if (n3 = r3.__html, n3 != null) {
            if (a3.children != null) throw Error(i2(60));
            o3?.__html !== n3 && (e5.innerHTML = n3);
          }
        }
        break;
      case `multiple`:
        e5.multiple = r3 && typeof r3 != `function` && typeof r3 != `symbol`;
        break;
      case `muted`:
        e5.muted = r3 && typeof r3 != `function` && typeof r3 != `symbol`;
        break;
      case `suppressContentEditableWarning`:
      case `suppressHydrationWarning`:
      case `defaultValue`:
      case `defaultChecked`:
      case `innerHTML`:
      case `ref`:
        break;
      case `autoFocus`:
        break;
      case `xlinkHref`:
        if (r3 == null || typeof r3 == `function` || typeof r3 == `boolean` || typeof r3 == `symbol`) {
          e5.removeAttribute(`xlink:href`);
          break;
        }
        n3 = Dn2(r3), e5.setAttributeNS(`http://www.w3.org/1999/xlink`, `xlink:href`, n3);
        break;
      case `contentEditable`:
      case `spellCheck`:
      case `draggable`:
      case `value`:
      case `autoReverse`:
      case `externalResourcesRequired`:
      case `focusable`:
      case `preserveAlpha`:
        r3 != null && typeof r3 != `function` && typeof r3 != `symbol` ? e5.setAttribute(n3, r3) : e5.removeAttribute(n3);
        break;
      case `inert`:
      case `allowFullScreen`:
      case `async`:
      case `autoPlay`:
      case `controls`:
      case `credentialless`:
      case `default`:
      case `defer`:
      case `disabled`:
      case `disablePictureInPicture`:
      case `disableRemotePlayback`:
      case `formNoValidate`:
      case `hidden`:
      case `loop`:
      case `noModule`:
      case `noValidate`:
      case `open`:
      case `playsInline`:
      case `readOnly`:
      case `required`:
      case `reversed`:
      case `scoped`:
      case `seamless`:
      case `itemScope`:
        r3 && typeof r3 != `function` && typeof r3 != `symbol` ? e5.setAttribute(n3, ``) : e5.removeAttribute(n3);
        break;
      case `capture`:
      case `download`:
        true === r3 ? e5.setAttribute(n3, ``) : false !== r3 && r3 != null && typeof r3 != `function` && typeof r3 != `symbol` ? e5.setAttribute(n3, r3) : e5.removeAttribute(n3);
        break;
      case `cols`:
      case `rows`:
      case `size`:
      case `span`:
        r3 != null && typeof r3 != `function` && typeof r3 != `symbol` && !isNaN(r3) && 1 <= r3 ? e5.setAttribute(n3, r3) : e5.removeAttribute(n3);
        break;
      case `rowSpan`:
      case `start`:
        r3 == null || typeof r3 == `function` || typeof r3 == `symbol` || isNaN(r3) ? e5.removeAttribute(n3) : e5.setAttribute(n3, r3);
        break;
      case `popover`:
        Q(`beforetoggle`, e5), Q(`toggle`, e5), rn2(e5, `popover`, r3);
        break;
      case `xlinkActuate`:
        on2(e5, `http://www.w3.org/1999/xlink`, `xlink:actuate`, r3);
        break;
      case `xlinkArcrole`:
        on2(e5, `http://www.w3.org/1999/xlink`, `xlink:arcrole`, r3);
        break;
      case `xlinkRole`:
        on2(e5, `http://www.w3.org/1999/xlink`, `xlink:role`, r3);
        break;
      case `xlinkShow`:
        on2(e5, `http://www.w3.org/1999/xlink`, `xlink:show`, r3);
        break;
      case `xlinkTitle`:
        on2(e5, `http://www.w3.org/1999/xlink`, `xlink:title`, r3);
        break;
      case `xlinkType`:
        on2(e5, `http://www.w3.org/1999/xlink`, `xlink:type`, r3);
        break;
      case `xmlBase`:
        on2(e5, `http://www.w3.org/XML/1998/namespace`, `xml:base`, r3);
        break;
      case `xmlLang`:
        on2(e5, `http://www.w3.org/XML/1998/namespace`, `xml:lang`, r3);
        break;
      case `xmlSpace`:
        on2(e5, `http://www.w3.org/XML/1998/namespace`, `xml:space`, r3);
        break;
      case `is`:
        rn2(e5, `is`, r3);
        break;
      case `innerText`:
      case `textContent`:
        return;
      default:
        if (!(2 < n3.length) || n3[0] !== `o` && n3[0] !== `O` || n3[1] !== `n` && n3[1] !== `N`) n3 = Tn2.get(n3) || n3, rn2(e5, n3, r3);
        else return;
    }
    k2 = true;
  }
  function tp(e5, t3, n3, r3, a3, o3) {
    switch (n3) {
      case `style`:
        Cn2(e5, r3, o3);
        return;
      case `dangerouslySetInnerHTML`:
        if (r3 != null) {
          if (typeof r3 != `object` || !(`__html` in r3)) throw Error(i2(61));
          if (n3 = r3.__html, n3 != null) {
            if (a3.children != null) throw Error(i2(60));
            o3?.__html !== n3 && (e5.innerHTML = n3);
          }
        }
        break;
      case `children`:
        if (typeof r3 == `string`) bn2(e5, r3);
        else if (typeof r3 == `number` || typeof r3 == `bigint`) bn2(e5, `` + r3);
        else return;
        break;
      case `onScroll`:
        r3 != null && Q(`scroll`, e5);
        return;
      case `onScrollEnd`:
        r3 != null && Q(`scrollend`, e5);
        return;
      case `onClick`:
        r3 != null && (e5.onclick = On2);
        return;
      case `suppressContentEditableWarning`:
      case `suppressHydrationWarning`:
      case `innerHTML`:
      case `ref`:
        return;
      case `innerText`:
      case `textContent`:
        return;
      default:
        if (!Yt2.hasOwnProperty(n3)) a: {
          if (n3[0] === `o` && n3[1] === `n` && (a3 = n3.endsWith(`Capture`), o3 = n3.slice(2, a3 ? n3.length - 7 : void 0), t3 = e5[Nt2] || null, t3 = t3 == null ? null : t3[n3], typeof t3 == `function` && e5.removeEventListener(o3, t3, a3), typeof r3 == `function`)) {
            typeof t3 != `function` && t3 !== null && (n3 in e5 ? e5[n3] = null : e5.hasAttribute(n3) && e5.removeAttribute(n3)), e5.addEventListener(o3, r3, a3);
            break a;
          }
          k2 = true, n3 in e5 ? e5[n3] = r3 : true === r3 ? e5.setAttribute(n3, ``) : rn2(e5, n3, r3);
        }
        return;
    }
    k2 = true;
  }
  function np(e5, t3, n3) {
    switch (t3) {
      case `div`:
      case `span`:
      case `svg`:
      case `path`:
      case `a`:
      case `g`:
      case `p`:
      case `li`:
        break;
      case `img`:
        Q(`error`, e5), Q(`load`, e5);
        var r3 = false, a3 = false, o3;
        for (o3 in n3) if (n3.hasOwnProperty(o3)) {
          var s3 = n3[o3];
          if (s3 != null) switch (o3) {
            case `src`:
              r3 = true;
              break;
            case `srcSet`:
              a3 = true;
              break;
            case `children`:
            case `dangerouslySetInnerHTML`:
              throw Error(i2(137, t3));
            default:
              $(e5, t3, o3, s3, n3, null);
          }
        }
        a3 && $(e5, t3, `srcSet`, n3.srcSet, n3, null), r3 && $(e5, t3, `src`, n3.src, n3, null);
        return;
      case `input`:
        Q(`invalid`, e5);
        var c3 = o3 = s3 = a3 = null, l3 = null, u3 = null;
        for (r3 in n3) if (n3.hasOwnProperty(r3)) {
          var d2 = n3[r3];
          if (d2 != null) switch (r3) {
            case `name`:
              a3 = d2;
              break;
            case `type`:
              s3 = d2;
              break;
            case `checked`:
              l3 = d2;
              break;
            case `defaultChecked`:
              u3 = d2;
              break;
            case `value`:
              o3 = d2;
              break;
            case `defaultValue`:
              c3 = d2;
              break;
            case `children`:
            case `dangerouslySetInnerHTML`:
              if (d2 != null) throw Error(i2(137, t3));
              break;
            default:
              $(e5, t3, r3, d2, n3, null);
          }
        }
        hn2(e5, o3, c3, l3, u3, s3, a3, false);
        return;
      case `select`:
        for (a3 in Q(`invalid`, e5), r3 = s3 = o3 = null, n3) if (n3.hasOwnProperty(a3) && (c3 = n3[a3], c3 != null)) switch (a3) {
          case `value`:
            o3 = c3;
            break;
          case `defaultValue`:
            s3 = c3;
            break;
          case `multiple`:
            r3 = c3;
          default:
            $(e5, t3, a3, c3, n3, null);
        }
        t3 = o3, n3 = s3, e5.multiple = !!r3, t3 == null ? n3 != null && _n2(e5, !!r3, n3, true) : _n2(e5, !!r3, t3, false);
        return;
      case `textarea`:
        for (s3 in Q(`invalid`, e5), o3 = a3 = r3 = null, n3) if (n3.hasOwnProperty(s3) && (c3 = n3[s3], c3 != null)) switch (s3) {
          case `value`:
            r3 = c3;
            break;
          case `defaultValue`:
            a3 = c3;
            break;
          case `children`:
            o3 = c3;
            break;
          case `dangerouslySetInnerHTML`:
            if (c3 != null) throw Error(i2(91));
            break;
          default:
            $(e5, t3, s3, c3, n3, null);
        }
        yn2(e5, r3, a3, o3);
        return;
      case `option`:
        for (l3 in n3) if (n3.hasOwnProperty(l3) && (r3 = n3[l3], r3 != null)) switch (l3) {
          case `selected`:
            e5.selected = r3 && typeof r3 != `function` && typeof r3 != `symbol`;
            break;
          default:
            $(e5, t3, l3, r3, n3, null);
        }
        return;
      case `dialog`:
        Q(`beforetoggle`, e5), Q(`toggle`, e5), Q(`cancel`, e5), Q(`close`, e5);
        break;
      case `iframe`:
      case `object`:
        Q(`load`, e5);
        break;
      case `video`:
      case `audio`:
        for (r3 = 0; r3 < zf.length; r3++) Q(zf[r3], e5);
        break;
      case `image`:
        Q(`error`, e5), Q(`load`, e5);
        break;
      case `details`:
        Q(`toggle`, e5);
        break;
      case `embed`:
      case `source`:
      case `link`:
        Q(`error`, e5), Q(`load`, e5);
      case `area`:
      case `base`:
      case `br`:
      case `col`:
      case `hr`:
      case `keygen`:
      case `meta`:
      case `param`:
      case `track`:
      case `wbr`:
      case `menuitem`:
        for (u3 in n3) if (n3.hasOwnProperty(u3) && (r3 = n3[u3], r3 != null)) switch (u3) {
          case `children`:
          case `dangerouslySetInnerHTML`:
            throw Error(i2(137, t3));
          default:
            $(e5, t3, u3, r3, n3, null);
        }
        return;
      default:
        if (wn2(t3)) {
          for (d2 in n3) n3.hasOwnProperty(d2) && (r3 = n3[d2], r3 !== void 0 && tp(e5, t3, d2, r3, n3, void 0));
          return;
        }
    }
    for (c3 in n3) n3.hasOwnProperty(c3) && (r3 = n3[c3], r3 != null && $(e5, t3, c3, r3, n3, null));
  }
  var rp = {};
  function ip(e5, t3, n3, r3) {
    switch (t3) {
      case `div`:
      case `span`:
      case `svg`:
      case `path`:
      case `a`:
      case `g`:
      case `p`:
      case `li`:
        break;
      case `input`:
        var a3 = null, o3 = null, s3 = null, c3 = null, l3 = null, u3 = null, d2 = null;
        for (m3 in n3) {
          var f3 = n3[m3];
          if (n3.hasOwnProperty(m3) && f3 != null) switch (m3) {
            case `checked`:
              break;
            case `value`:
              break;
            case `defaultValue`:
              l3 = f3;
            default:
              r3.hasOwnProperty(m3) || $(e5, t3, m3, null, r3, f3);
          }
        }
        for (var p2 in r3) {
          var m3 = r3[p2];
          if (f3 = n3[p2], r3.hasOwnProperty(p2) && (m3 != null || f3 != null)) switch (p2) {
            case `type`:
              m3 !== f3 && (k2 = true), o3 = m3;
              break;
            case `name`:
              m3 !== f3 && (k2 = true), a3 = m3;
              break;
            case `checked`:
              m3 !== f3 && (k2 = true), u3 = m3;
              break;
            case `defaultChecked`:
              m3 !== f3 && (k2 = true), d2 = m3;
              break;
            case `value`:
              m3 !== f3 && (k2 = true), s3 = m3;
              break;
            case `defaultValue`:
              m3 !== f3 && (k2 = true), c3 = m3;
              break;
            case `children`:
            case `dangerouslySetInnerHTML`:
              if (m3 != null) throw Error(i2(137, t3));
              break;
            default:
              m3 !== f3 && $(e5, t3, p2, m3, r3, f3);
          }
        }
        mn2(e5, s3, c3, l3, u3, d2, o3, a3);
        return;
      case `select`:
        for (o3 in m3 = s3 = c3 = p2 = null, n3) if (l3 = n3[o3], n3.hasOwnProperty(o3) && l3 != null) switch (o3) {
          case `value`:
            break;
          case `multiple`:
            m3 = l3;
          default:
            r3.hasOwnProperty(o3) || $(e5, t3, o3, null, r3, l3);
        }
        for (a3 in r3) if (o3 = r3[a3], l3 = n3[a3], r3.hasOwnProperty(a3) && (o3 != null || l3 != null)) switch (a3) {
          case `value`:
            o3 !== l3 && (k2 = true), p2 = o3;
            break;
          case `defaultValue`:
            o3 !== l3 && (k2 = true), c3 = o3;
            break;
          case `multiple`:
            o3 !== l3 && (k2 = true), s3 = o3;
          default:
            o3 !== l3 && $(e5, t3, a3, o3, r3, l3);
        }
        t3 = c3, n3 = s3, r3 = m3, p2 == null ? !!r3 != !!n3 && (t3 == null ? _n2(e5, !!n3, n3 ? [] : ``, false) : _n2(e5, !!n3, t3, true)) : _n2(e5, !!n3, p2, false);
        return;
      case `textarea`:
        for (c3 in m3 = p2 = null, n3) if (a3 = n3[c3], n3.hasOwnProperty(c3) && a3 != null && !r3.hasOwnProperty(c3)) switch (c3) {
          case `value`:
            break;
          case `children`:
            break;
          default:
            $(e5, t3, c3, null, r3, a3);
        }
        for (s3 in r3) if (a3 = r3[s3], o3 = n3[s3], r3.hasOwnProperty(s3) && (a3 != null || o3 != null)) switch (s3) {
          case `value`:
            a3 !== o3 && (k2 = true), p2 = a3;
            break;
          case `defaultValue`:
            a3 !== o3 && (k2 = true), m3 = a3;
            break;
          case `children`:
            break;
          case `dangerouslySetInnerHTML`:
            if (a3 != null) throw Error(i2(91));
            break;
          default:
            a3 !== o3 && $(e5, t3, s3, a3, r3, o3);
        }
        vn2(e5, p2, m3);
        return;
      case `option`:
        for (var h2 in n3) if (p2 = n3[h2], n3.hasOwnProperty(h2) && p2 != null && !r3.hasOwnProperty(h2)) switch (h2) {
          case `selected`:
            e5.selected = false;
            break;
          default:
            $(e5, t3, h2, null, r3, p2);
        }
        for (l3 in r3) if (p2 = r3[l3], m3 = n3[l3], r3.hasOwnProperty(l3) && p2 !== m3 && (p2 != null || m3 != null)) switch (l3) {
          case `selected`:
            p2 !== m3 && (k2 = true), e5.selected = p2 && typeof p2 != `function` && typeof p2 != `symbol`;
            break;
          default:
            $(e5, t3, l3, p2, r3, m3);
        }
        return;
      case `img`:
      case `link`:
      case `area`:
      case `base`:
      case `br`:
      case `col`:
      case `embed`:
      case `hr`:
      case `keygen`:
      case `meta`:
      case `param`:
      case `source`:
      case `track`:
      case `wbr`:
      case `menuitem`:
        for (var g3 in n3) p2 = n3[g3], n3.hasOwnProperty(g3) && p2 != null && !r3.hasOwnProperty(g3) && $(e5, t3, g3, null, r3, p2);
        for (u3 in r3) if (p2 = r3[u3], m3 = n3[u3], r3.hasOwnProperty(u3) && p2 !== m3 && (p2 != null || m3 != null)) switch (u3) {
          case `children`:
          case `dangerouslySetInnerHTML`:
            if (p2 != null) throw Error(i2(137, t3));
            break;
          default:
            $(e5, t3, u3, p2, r3, m3);
        }
        return;
      default:
        if (wn2(t3)) {
          for (var _3 in n3) p2 = n3[_3], n3.hasOwnProperty(_3) && p2 !== void 0 && !r3.hasOwnProperty(_3) && tp(e5, t3, _3, void 0, r3, p2);
          for (d2 in r3) p2 = r3[d2], m3 = n3[d2], !r3.hasOwnProperty(d2) || p2 === m3 || p2 === void 0 && m3 === void 0 || tp(e5, t3, d2, p2, r3, m3);
          return;
        }
    }
    for (var v3 in n3) p2 = n3[v3], n3.hasOwnProperty(v3) && p2 != null && !r3.hasOwnProperty(v3) && $(e5, t3, v3, null, r3, p2);
    for (f3 in r3) p2 = r3[f3], m3 = n3[f3], !r3.hasOwnProperty(f3) || p2 === m3 || p2 == null && m3 == null || $(e5, t3, f3, p2, r3, m3);
  }
  function ap(e5) {
    switch (e5) {
      case `css`:
      case `script`:
      case `font`:
      case `img`:
      case `image`:
      case `input`:
      case `link`:
        return true;
      default:
        return false;
    }
  }
  function op() {
    if (typeof performance.getEntriesByType == `function`) {
      for (var e5 = 0, t3 = 0, n3 = performance.getEntriesByType(`resource`), r3 = 0; r3 < n3.length; r3++) {
        var i3 = n3[r3], a3 = i3.transferSize, o3 = i3.initiatorType, s3 = i3.duration;
        if (a3 && s3 && ap(o3)) {
          for (o3 = 0, s3 = i3.responseEnd, r3 += 1; r3 < n3.length; r3++) {
            var c3 = n3[r3], l3 = c3.startTime;
            if (l3 > s3) break;
            var u3 = c3.transferSize, d2 = c3.initiatorType;
            u3 && ap(d2) && (c3 = c3.responseEnd, o3 += u3 * (c3 < s3 ? 1 : (s3 - l3) / (c3 - l3)));
          }
          if (--r3, t3 += 8 * (a3 + o3) / (i3.duration / 1e3), e5++, 10 < e5) break;
        }
      }
      if (0 < e5) return t3 / e5 / 1e6;
    }
    return navigator.connection && (e5 = navigator.connection.downlink, typeof e5 == `number`) ? e5 : 5;
  }
  var sp = null, cp = null;
  function lp(e5) {
    return e5.nodeType === 9 ? e5 : e5.ownerDocument;
  }
  function up(e5) {
    switch (e5) {
      case `http://www.w3.org/2000/svg`:
        return 1;
      case `http://www.w3.org/1998/Math/MathML`:
        return 2;
      default:
        return 0;
    }
  }
  function dp(e5, t3) {
    if (e5 === 0) switch (t3) {
      case `svg`:
        return 1;
      case `math`:
        return 2;
      default:
        return 0;
    }
    return e5 === 1 && t3 === `foreignObject` ? 0 : e5;
  }
  function fp(e5, t3, n3, r3) {
    return n3 = lp(n3).createElement(e5), n3[Mt2] = r3, n3[Nt2] = t3, np(n3, e5, t3), Kt2(n3), n3;
  }
  function pp(e5, t3) {
    return e5 === `textarea` || e5 === `noscript` || typeof t3.children == `string` || typeof t3.children == `number` || typeof t3.children == `bigint` || typeof t3.dangerouslySetInnerHTML == `object` && t3.dangerouslySetInnerHTML !== null && t3.dangerouslySetInnerHTML.__html != null;
  }
  var mp = null;
  function hp() {
    var e5 = window.event;
    return e5 && e5.type === `popstate` ? e5 !== mp && (mp = e5, true) : (mp = null, false);
  }
  var gp = typeof setTimeout == `function` ? setTimeout : void 0, _p = typeof clearTimeout == `function` ? clearTimeout : void 0, vp = typeof Promise == `function` ? Promise : void 0, yp = typeof requestAnimationFrame == `function` ? requestAnimationFrame : gp, bp = typeof queueMicrotask == `function` ? queueMicrotask : vp === void 0 ? gp : function(e5) {
    return vp.resolve(null).then(e5).catch(xp);
  };
  function xp(e5) {
    setTimeout(function() {
      throw e5;
    });
  }
  function Sp(e5) {
    return e5 === `head`;
  }
  function Cp(e5, t3) {
    var n3 = t3, r3 = 0;
    do {
      var i3 = n3.nextSibling;
      if (e5.removeChild(n3), i3 && i3.nodeType === 8) {
        if (n3 = i3.data, n3 === `/$` || n3 === `/&`) {
          if (r3 === 0) {
            e5.removeChild(i3), Hh(t3);
            return;
          }
          r3--;
        } else if (n3 === `$` || n3 === `$?` || n3 === `$~` || n3 === `$!` || n3 === `&`) r3++;
        else if (n3 === `html`) _m(e5.ownerDocument.documentElement);
        else if (n3 === `head`) {
          n3 = e5.ownerDocument.head, _m(n3);
          for (var a3 = n3.firstChild; a3; ) {
            var o3 = a3.nextSibling, s3 = a3.nodeName;
            a3[zt2] || s3 === `SCRIPT` || s3 === `STYLE` || s3 === `LINK` && a3.rel.toLowerCase() === `stylesheet` || n3.removeChild(a3), a3 = o3;
          }
        } else n3 === `body` && _m(e5.ownerDocument.body);
      }
      n3 = i3;
    } while (n3);
    Hh(t3);
  }
  function wp(e5, t3) {
    var n3 = e5;
    e5 = 0;
    do {
      var r3 = n3.nextSibling;
      if (n3.nodeType === 1 ? t3 ? (n3._stashedDisplay = n3.style.display, n3.style.display = `none`) : (n3.style.display = n3._stashedDisplay || ``, n3.getAttribute(`style`) === `` && n3.removeAttribute(`style`)) : n3.nodeType === 3 && (t3 ? (n3._stashedText = n3.nodeValue, n3.nodeValue = ``) : n3.nodeValue = n3._stashedText || ``), r3 && r3.nodeType === 8) {
        if (n3 = r3.data, n3 === `/$`) {
          if (e5 === 0) break;
          e5--;
        } else n3 !== `$` && n3 !== `$?` && n3 !== `$~` && n3 !== `$!` || e5++;
      }
      n3 = r3;
    } while (n3);
  }
  function Tp(e5, t3, n3) {
    if (t3 = CSS.escape(t3) === t3 ? t3 : `r-` + btoa(t3).replace(/=/g, ``), e5.style.viewTransitionName = t3, n3 != null && (e5.style.viewTransitionClass = n3), n3 = getComputedStyle(e5), n3.display === `inline`) {
      if (t3 = e5.getClientRects(), t3.length === 1) var r3 = 1;
      else for (var i3 = r3 = 0; i3 < t3.length; i3++) {
        var a3 = t3[i3];
        0 < a3.width && 0 < a3.height && r3++;
      }
      r3 === 1 && (e5 = e5.style, e5.display = t3.length === 1 ? `inline-block` : `block`, e5.marginTop = `-` + n3.paddingTop, e5.marginBottom = `-` + n3.paddingBottom);
    }
  }
  function Ep(e5, t3) {
    e5 = e5.style, t3 = t3.style;
    var n3 = t3 == null ? null : t3.hasOwnProperty(`viewTransitionName`) ? t3.viewTransitionName : t3.hasOwnProperty(`view-transition-name`) ? t3[`view-transition-name`] : null;
    e5.viewTransitionName = n3 == null || typeof n3 == `boolean` ? `` : (`` + n3).trim(), n3 = t3 == null ? null : t3.hasOwnProperty(`viewTransitionClass`) ? t3.viewTransitionClass : t3.hasOwnProperty(`view-transition-class`) ? t3[`view-transition-class`] : null, e5.viewTransitionClass = n3 == null || typeof n3 == `boolean` ? `` : (`` + n3).trim(), e5.display === `inline-block` && (t3 == null ? e5.display = e5.margin = `` : (n3 = t3.display, e5.display = n3 == null || typeof n3 == `boolean` ? `` : n3, n3 = t3.margin, n3 == null ? (n3 = t3.hasOwnProperty(`marginTop`) ? t3.marginTop : t3[`margin-top`], e5.marginTop = n3 == null || typeof n3 == `boolean` ? `` : n3, t3 = t3.hasOwnProperty(`marginBottom`) ? t3.marginBottom : t3[`margin-bottom`], e5.marginBottom = t3 == null || typeof t3 == `boolean` ? `` : t3) : e5.margin = n3));
  }
  function Dp(e5, t3, n3) {
    return n3 = n3.ownerDocument.defaultView, { rect: e5, abs: t3.position === `absolute` || t3.position === `fixed`, clip: t3.clipPath !== `none` || t3.overflow !== `visible` || t3.filter !== `none` || t3.mask !== `none` || t3.mask !== `none` || t3.borderRadius !== `0px`, view: 0 <= e5.bottom && 0 <= e5.right && e5.top <= n3.innerHeight && e5.left <= n3.innerWidth };
  }
  function Op(e5) {
    return Dp(e5.getBoundingClientRect(), getComputedStyle(e5), e5);
  }
  function kp(e5) {
    var t3 = e5.getBoundingClientRect();
    t3 = new DOMRect(t3.x + 2e4, t3.y + 2e4, t3.width, t3.height);
    var n3 = getComputedStyle(e5);
    return Dp(t3, n3, e5);
  }
  function Ap(e5) {
    return e5.documentElement.clientHeight;
  }
  function jp(e5) {
    this.addEventListener(`load`, e5), this.addEventListener(`error`, e5);
  }
  function Mp(e5, t3, n3, r3, i3, a3, o3, s3, c3) {
    var l3 = t3.nodeType === 9 ? t3 : t3.ownerDocument;
    try {
      var u3 = l3.startViewTransition({ update: function() {
        var t4 = l3.defaultView, n4 = t4.navigation && t4.navigation.transition, o4 = l3.fonts.status;
        r3();
        var s4 = [];
        if (o4 === `loaded` && (Ap(l3), l3.fonts.status === `loading` && s4.push(l3.fonts.ready)), o4 = s4.length, e5 !== null) for (var c4 = e5.suspenseyImages, u4 = 0, d3 = 0; d3 < c4.length; d3++) {
          var f3 = c4[d3];
          if (!f3.complete) {
            var p2 = f3.getBoundingClientRect();
            if (0 < p2.bottom && 0 < p2.right && p2.top < t4.innerHeight && p2.left < t4.innerWidth) {
              if (u4 += Xm(f3), u4 > $m) {
                s4.length = o4;
                break;
              }
              f3 = new Promise(jp.bind(f3)), s4.push(f3);
            }
          }
        }
        if (0 < s4.length) return t4 = Promise.race([Promise.all(s4), new Promise(function(e6) {
          return setTimeout(e6, 500);
        })]).then(i3, i3), (n4 ? Promise.allSettled([n4.finished, t4]) : t4).then(a3, a3);
        if (i3(), n4) return n4.finished.then(a3, a3);
        a3();
      }, types: n3 });
      l3.__reactViewTransition = u3;
      var d2 = [];
      return u3.ready.then(function() {
        for (var e6 = l3.documentElement.getAnimations({ subtree: true }), t4 = 0; t4 < e6.length; t4++) {
          var n4 = e6[t4], r4 = n4.effect, i4 = r4.pseudoElement;
          if (i4 != null && i4.startsWith(`::view-transition`)) {
            d2.push(n4), n4 = r4.getKeyframes();
            for (var a4 = i4 = void 0, s4 = true, c4 = 0; c4 < n4.length; c4++) {
              var u4 = n4[c4], f3 = u4.width;
              if (i4 === void 0) i4 = f3;
              else if (i4 !== f3) {
                s4 = false;
                break;
              }
              if (f3 = u4.height, a4 === void 0) a4 = f3;
              else if (a4 !== f3) {
                s4 = false;
                break;
              }
              delete u4.width, delete u4.height, u4.transform === `none` && delete u4.transform;
            }
            s4 && i4 !== void 0 && a4 !== void 0 && (r4.setKeyframes(n4), s4 = getComputedStyle(r4.target, r4.pseudoElement), s4.width !== i4 || s4.height !== a4) && (s4 = n4[0], s4.width = i4, s4.height = a4, s4 = n4[n4.length - 1], s4.width = i4, s4.height = a4, r4.setKeyframes(n4));
          }
        }
        o3();
      }, function(e6) {
        l3.__reactViewTransition === u3 && (l3.__reactViewTransition = null);
        try {
          if (typeof e6 == `object` && e6) switch (e6.name) {
            case `InvalidStateError`:
              (e6.message === `View transition was skipped because document visibility state is hidden.` || e6.message === `Skipping view transition because document visibility state has become hidden.` || e6.message === `Skipping view transition because viewport size changed.` || e6.message === `Transition was aborted because of invalid state`) && (e6 = null);
          }
          e6 !== null && c3(e6);
        } finally {
          r3(), i3(), o3();
        }
      }), u3.finished.finally(function() {
        for (var e6 = 0; e6 < d2.length; e6++) d2[e6].cancel();
        l3.__reactViewTransition === u3 && (l3.__reactViewTransition = null), s3();
      }), u3;
    } catch {
      return r3(), i3(), o3(), null;
    }
  }
  function Np(e5, t3) {
    this._scope = document.documentElement, this._selector = `::view-transition-` + e5 + `(` + t3 + `)`;
  }
  Np.prototype.animate = function(e5, t3) {
    return t3 = typeof t3 == `number` ? { duration: t3 } : C2({}, t3), t3.pseudoElement = this._selector, this._scope.animate(e5, t3);
  }, Np.prototype.getAnimations = function() {
    for (var e5 = this._scope, t3 = this._selector, n3 = e5.getAnimations({ subtree: true }), r3 = [], i3 = 0; i3 < n3.length; i3++) {
      var a3 = n3[i3].effect;
      a3 !== null && a3.target === e5 && a3.pseudoElement === t3 && r3.push(n3[i3]);
    }
    return r3;
  }, Np.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Pp(e5) {
    return { name: e5, group: new Np(`group`, e5), imagePair: new Np(`image-pair`, e5), old: new Np(`old`, e5), new: new Np(`new`, e5) };
  }
  function Fp(e5) {
    this._fragmentFiber = e5, this._observers = this._eventListeners = null;
  }
  Fp.prototype.addEventListener = function(e5, t3, n3) {
    var r3 = null, i3 = null;
    if (!(n3 != null && typeof n3 != `boolean` && (r3 = n3.signal || null, r3 !== null && r3.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var a3 = this._eventListeners;
      if (Bp(a3, e5, t3, n3) === -1) {
        var o3 = this, s3 = t3;
        n3 != null && typeof n3 != `boolean` && true === n3.once && (s3 = function(r4) {
          o3.removeEventListener(e5, t3, n3), typeof t3 == `function` ? t3.call(this, r4) : t3.handleEvent(r4);
        }), r3 !== null && (i3 = o3.removeEventListener.bind(o3, e5, t3, n3), r3.addEventListener(`abort`, i3, { once: true }), i3 = r3.removeEventListener.bind(r3, `abort`, i3)), r3 = Rp(n3), a3.push({ type: e5, listener: t3, optionsOrUseCapture: n3, attachedListener: s3, cleanup: i3 }), m2(this._fragmentFiber.child, false, Ip, e5, s3, r3);
      }
      this._eventListeners = a3;
    }
  };
  function Ip(e5, t3, n3, r3) {
    return b2(e5).addEventListener(t3, n3, r3), false;
  }
  Fp.prototype.removeEventListener = function(e5, t3, n3) {
    var r3 = this._eventListeners;
    if (r3 !== null && (t3 = Bp(r3, e5, t3, n3), t3 !== -1)) {
      var i3 = r3[t3];
      n3 = i3.attachedListener;
      var a3 = i3.cleanup;
      i3 = Rp(i3.optionsOrUseCapture), m2(this._fragmentFiber.child, false, Lp, e5, n3, i3), r3.splice(t3, 1), a3 !== null && a3();
    }
  };
  function Lp(e5, t3, n3, r3) {
    return b2(e5).removeEventListener(t3, n3, r3), false;
  }
  function Rp(e5) {
    return e5 != null && typeof e5 != `boolean` && (true === e5.once || e5.signal instanceof AbortSignal) ? { capture: e5.capture, passive: e5.passive } : e5;
  }
  function zp(e5) {
    return e5 == null ? `c=0` : typeof e5 == `boolean` ? `c=` + (e5 ? `1` : `0`) : `c=` + (e5.capture ? `1` : `0`);
  }
  function Bp(e5, t3, n3, r3) {
    if (e5.length === 0) return -1;
    r3 = zp(r3);
    for (var i3 = 0; i3 < e5.length; i3++) {
      var a3 = e5[i3];
      if (a3.type === t3 && a3.listener === n3 && zp(a3.optionsOrUseCapture) === r3) return i3;
    }
    return -1;
  }
  Fp.prototype.dispatchEvent = function(e5) {
    var t3 = g2(this._fragmentFiber);
    if (t3 === null) return true;
    t3 = b2(t3);
    var n3 = this._eventListeners;
    if (n3 !== null && 0 < n3.length || !e5.bubbles) {
      var r3 = t3.nodeType === 9 ? t3.createComment(``) : document.createTextNode(``);
      if (n3) for (var i3 = 0; i3 < n3.length; i3++) {
        var a3 = n3[i3];
        r3.addEventListener(a3.type, a3.attachedListener, Rp(a3.optionsOrUseCapture));
      }
      if (t3.appendChild(r3), e5 = r3.dispatchEvent(e5), n3) for (i3 = 0; i3 < n3.length; i3++) a3 = n3[i3], r3.removeEventListener(a3.type, a3.attachedListener, Rp(a3.optionsOrUseCapture));
      return t3.removeChild(r3), e5;
    }
    return t3.dispatchEvent(e5);
  }, Fp.prototype.focus = function(e5) {
    m2(this._fragmentFiber.child, true, Vp, e5, void 0, void 0);
  };
  function Vp(e5, t3) {
    return e5.tag !== 6 && (e5 = b2(e5), pm(e5, t3));
  }
  Fp.prototype.focusLast = function(e5) {
    var t3 = [];
    m2(this._fragmentFiber.child, true, Hp, t3, void 0, void 0);
    for (var n3 = t3.length - 1; 0 <= n3 && !Vp(t3[n3], e5); n3--) ;
  };
  function Hp(e5, t3) {
    return t3.push(e5), false;
  }
  Fp.prototype.blur = function() {
    var e5 = g2(this._fragmentFiber);
    e5 !== null && (e5 = b2(e5), e5 = lp(e5).activeElement, e5 !== null && m2(this._fragmentFiber.child, false, Up, e5, void 0, void 0));
  };
  function Up(e5, t3) {
    return e5.tag !== 6 && (e5 = b2(e5), e5 === t3 || e5.contains(t3) ? (t3.blur(), true) : false);
  }
  Fp.prototype.observeUsing = function(e5) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e5), m2(this._fragmentFiber.child, false, Wp, e5, void 0, void 0);
  };
  function Wp(e5, t3) {
    return e5.tag !== 6 && (e5 = b2(e5), t3.observe(e5), false);
  }
  Fp.prototype.unobserveUsing = function(e5) {
    var t3 = this._observers;
    if (t3 !== null && t3.has(e5)) {
      t3.delete(e5), m2(this._fragmentFiber.child, false, Gp, e5, void 0, void 0);
      for (var n3 = t3 = 0; n3 < Kp.length; n3++) {
        var r3 = Kp[n3];
        r3.fragmentInstance === this && r3.observer === e5 ? e5.unobserve(r3.instance) : Kp[t3++] = r3;
      }
      Kp.length = t3;
    }
  };
  function Gp(e5, t3) {
    return e5.tag !== 6 && (e5 = b2(e5), t3.unobserve(e5), false);
  }
  var Kp = [], qp = false;
  function Jp(e5, t3, n3) {
    Kp.push({ fragmentInstance: e5, observer: t3, instance: n3 }), qp || (qp = true, mm(function() {
      qp = false;
      var e6 = Kp;
      Kp = [];
      for (var t4 = 0; t4 < e6.length; t4++) {
        var n4 = e6[t4];
        n4.observer.unobserve(n4.instance);
      }
    }));
  }
  Fp.prototype.getClientRects = function() {
    var e5 = [];
    return m2(this._fragmentFiber.child, false, Yp, e5, void 0, void 0), e5;
  };
  function Yp(e5, t3) {
    if (e5.tag === 6) {
      e5 = e5.stateNode;
      var n3 = e5.ownerDocument.createRange();
      n3.selectNodeContents(e5), t3.push.apply(t3, n3.getClientRects());
    } else e5 = b2(e5), t3.push.apply(t3, e5.getClientRects());
    return false;
  }
  Fp.prototype.getRootNode = function(e5) {
    var t3 = g2(this._fragmentFiber);
    return t3 === null ? this : b2(t3).getRootNode(e5);
  }, Fp.prototype.compareDocumentPosition = function(e5) {
    var t3 = g2(this._fragmentFiber);
    if (t3 === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n3 = [];
    m2(this._fragmentFiber.child, false, Hp, n3, void 0, void 0);
    var r3 = b2(t3);
    if (n3.length === 0) {
      if (n3 = r3, _2(this._fragmentFiber)) {
        a: {
          for (t3 = this._fragmentFiber.return; t3 !== null; ) {
            if (t3.tag === 4) {
              t3 = t3.stateNode.containerInfo;
              break a;
            }
            if (t3.tag === 3 || t3.tag === 5 || t3.tag === 27) break;
            t3 = t3.return;
          }
          t3 = null;
        }
        t3 != null && (n3 = t3);
      }
      t3 = this._fragmentFiber;
      var i3 = r3 = n3.compareDocumentPosition(e5);
      return n3 === e5 ? i3 = Node.DOCUMENT_POSITION_CONTAINS : r3 & Node.DOCUMENT_POSITION_CONTAINED_BY && (n3 = v2(t3)[1], n3 === null ? i3 = Node.DOCUMENT_POSITION_PRECEDING : (e5 = b2(n3).compareDocumentPosition(e5), i3 = e5 === 0 || e5 & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i3 |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t3 = b2(n3[0]), i3 = b2(n3[n3.length - 1]);
    var a3 = _2(this._fragmentFiber) ? t3.parentElement : r3;
    if (a3 == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    r3 = a3.compareDocumentPosition(t3) & Node.DOCUMENT_POSITION_CONTAINED_BY, a3 = a3.compareDocumentPosition(i3) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var o3 = t3.compareDocumentPosition(e5), s3 = i3.compareDocumentPosition(e5), c3 = o3 & Node.DOCUMENT_POSITION_CONTAINED_BY || s3 & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return s3 = r3 && a3 && o3 & Node.DOCUMENT_POSITION_FOLLOWING && s3 & Node.DOCUMENT_POSITION_PRECEDING, t3 = r3 && t3 === e5 || a3 && i3 === e5 || c3 || s3 ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r3 && t3 === e5 || !a3 && i3 === e5 ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o3, t3 & Node.DOCUMENT_POSITION_DISCONNECTED || t3 & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t3, this._fragmentFiber, n3[0], n3[n3.length - 1], e5) ? t3 : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Xp(e5, t3, n3, r3, i3) {
    var a3 = Ht2(i3);
    if (e5 & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n3 = !!a3) a: {
        for (; a3 !== null; ) {
          if (a3.tag === 7 && (a3 === t3 || a3.alternate === t3)) {
            n3 = true;
            break a;
          }
          a3 = a3.return;
        }
        n3 = false;
      }
      return n3;
    }
    if (e5 & Node.DOCUMENT_POSITION_CONTAINS) {
      if (a3 === null) return a3 = i3.ownerDocument, i3 === a3 || i3 === a3.documentElement || i3 === a3.body;
      a: {
        for (a3 = t3, t3 = g2(t3); a3 !== null; ) {
          if (!(a3.tag !== 5 && a3.tag !== 3 && a3.tag !== 27 || a3 !== t3 && a3.alternate !== t3)) {
            a3 = true;
            break a;
          }
          a3 = a3.return;
        }
        a3 = false;
      }
      return a3;
    }
    return e5 & Node.DOCUMENT_POSITION_PRECEDING ? ((t3 = !!a3) && !(t3 = a3 === n3) && (t3 = re2(n3, a3, S2), t3 === null ? t3 = false : (m2(t3, true, te2, a3, n3), a3 = x2, x2 = null, t3 = a3 !== null)), t3) : e5 & Node.DOCUMENT_POSITION_FOLLOWING ? ((t3 = !!a3) && !(t3 = a3 === r3) && (t3 = re2(r3, a3, S2), t3 === null ? t3 = false : (m2(t3, true, ne2, a3, r3), a3 = x2, ee2 = x2 = null, t3 = a3 !== null)), t3) : false;
  }
  function Zp(e5, t3) {
    var n3 = e5.ownerDocument.createRange();
    n3.selectNodeContents(e5), e5 = n3.getBoundingClientRect(), window.scrollTo(window.scrollX + e5.left, t3 ? window.scrollY + e5.top : window.scrollY + e5.bottom - window.innerHeight);
  }
  Fp.prototype.scrollIntoView = function(e5) {
    if (typeof e5 == `object`) throw Error(i2(566));
    var t3 = [];
    m2(this._fragmentFiber.child, false, Hp, t3, void 0, void 0);
    var n3 = false !== e5;
    if (t3.length === 0) {
      var r3 = v2(this._fragmentFiber);
      if (r3 = n3 ? r3[1] || r3[0] || g2(this._fragmentFiber) : r3[0] || r3[1], r3 === null) return;
      if (r3.tag === 6) {
        e5 = b2(r3), Zp(e5, n3);
        return;
      }
      if (r3 = b2(r3), r3.nodeType !== 9) {
        if (r3.nodeType === 11) {
          n3 = `host` in r3 ? r3.host : null, n3 !== null && n3.scrollIntoView(e5);
          return;
        }
        r3.scrollIntoView(e5);
      }
    }
    for (r3 = n3 ? t3.length - 1 : 0; r3 !== (n3 ? -1 : t3.length); ) {
      var a3 = t3[r3];
      a3.tag === 6 ? (a3 = b2(a3), Zp(a3, n3)) : b2(a3).scrollIntoView(e5), r3 += n3 ? -1 : 1;
    }
  };
  function Qp(e5, t3) {
    return e5 = b2(e5), $p(e5, t3), false;
  }
  function $p(e5, t3) {
    e5.reactFragments ??= /* @__PURE__ */ new Set(), e5.reactFragments.add(t3);
  }
  function em(e5, t3) {
    var n3 = t3._eventListeners;
    if (n3 !== null) for (var r3 = 0; r3 < n3.length; r3++) {
      var i3 = n3[r3];
      e5.addEventListener(i3.type, i3.attachedListener, Rp(i3.optionsOrUseCapture));
    }
    e5.nodeType !== 3 && (n3 = t3._observers, n3 !== null && n3.forEach(function(n4) {
      for (var r4 = 0, i4 = 0; i4 < Kp.length; i4++) {
        var a3 = Kp[i4];
        (a3.fragmentInstance !== t3 || a3.observer !== n4 || a3.instance !== e5) && (Kp[r4++] = a3);
      }
      Kp.length = r4, n4.observe(e5);
    }), $p(e5, t3));
  }
  function tm(e5, t3) {
    var n3 = t3._eventListeners;
    if (n3 !== null) for (var r3 = 0; r3 < n3.length; r3++) {
      var i3 = n3[r3];
      e5.removeEventListener(i3.type, i3.attachedListener, Rp(i3.optionsOrUseCapture));
    }
    e5.nodeType !== 3 && (n3 = t3._observers, n3 !== null && n3.forEach(function(n4) {
      typeof n4.rootMargin == `string` ? Jp(t3, n4, e5) : n4.unobserve(e5);
    }), e5.reactFragments != null && e5.reactFragments.delete(t3));
  }
  function nm(e5) {
    var t3 = e5.firstChild;
    for (t3 && t3.nodeType === 10 && (t3 = t3.nextSibling); t3; ) {
      var n3 = t3;
      switch (t3 = t3.nextSibling, n3.nodeName) {
        case `HTML`:
        case `HEAD`:
        case `BODY`:
          nm(n3), Vt2(n3);
          continue;
        case `SCRIPT`:
        case `STYLE`:
          continue;
        case `LINK`:
          if (n3.rel.toLowerCase() === `stylesheet`) continue;
      }
      e5.removeChild(n3);
    }
  }
  function rm(e5, t3, n3, r3) {
    for (; e5.nodeType === 1; ) {
      var i3 = n3;
      if (e5.nodeName.toLowerCase() !== t3.toLowerCase()) {
        if (!r3 && (e5.nodeName !== `INPUT` || e5.type !== `hidden`)) break;
      } else if (!r3) {
        if (t3 === `input` && e5.type === `hidden`) {
          var a3 = i3.name == null ? null : `` + i3.name;
          if (i3.type === `hidden` && e5.getAttribute(`name`) === a3) return e5;
        } else return e5;
      } else if (!e5[zt2]) switch (t3) {
        case `meta`:
          if (!e5.hasAttribute(`itemprop`)) break;
          return e5;
        case `link`:
          if (a3 = e5.getAttribute(`rel`), a3 === `stylesheet` && e5.hasAttribute(`data-precedence`) || a3 !== i3.rel || e5.getAttribute(`href`) !== (i3.href == null || i3.href === `` ? null : i3.href) || e5.getAttribute(`crossorigin`) !== (i3.crossOrigin == null ? null : i3.crossOrigin) || e5.getAttribute(`title`) !== (i3.title == null ? null : i3.title)) break;
          return e5;
        case `style`:
          if (e5.hasAttribute(`data-precedence`)) break;
          return e5;
        case `script`:
          if (a3 = e5.getAttribute(`src`), (a3 !== (i3.src == null ? null : i3.src) || e5.getAttribute(`type`) !== (i3.type == null ? null : i3.type) || e5.getAttribute(`crossorigin`) !== (i3.crossOrigin == null ? null : i3.crossOrigin)) && a3 && e5.hasAttribute(`async`) && !e5.hasAttribute(`itemprop`)) break;
          return e5;
        default:
          return e5;
      }
      if (e5 = lm(e5.nextSibling), e5 === null) break;
    }
    return null;
  }
  function im(e5, t3, n3) {
    if (t3 === ``) return null;
    for (; e5.nodeType !== 3; ) if ((e5.nodeType !== 1 || e5.nodeName !== `INPUT` || e5.type !== `hidden`) && !n3 || (e5 = lm(e5.nextSibling), e5 === null)) return null;
    return e5;
  }
  function am(e5, t3) {
    for (; e5.nodeType !== 8; ) if ((e5.nodeType !== 1 || e5.nodeName !== `INPUT` || e5.type !== `hidden`) && !t3 || (e5 = lm(e5.nextSibling), e5 === null)) return null;
    return e5;
  }
  function om(e5) {
    return e5.data === `$?` || e5.data === `$~`;
  }
  function sm(e5) {
    return e5.data === `$!` || e5.data === `$?` && e5.ownerDocument.readyState !== `loading`;
  }
  function cm(e5, t3) {
    var n3 = e5.ownerDocument;
    if (e5.data === `$~`) e5._reactRetry = t3;
    else if (e5.data !== `$?` || n3.readyState !== `loading`) t3();
    else {
      var r3 = function() {
        t3(), n3.removeEventListener(`DOMContentLoaded`, r3);
      };
      n3.addEventListener(`DOMContentLoaded`, r3), e5._reactRetry = r3;
    }
  }
  function lm(e5) {
    for (; e5 != null; e5 = e5.nextSibling) {
      var t3 = e5.nodeType;
      if (t3 === 1 || t3 === 3) break;
      if (t3 === 8) {
        if (t3 = e5.data, t3 === `$` || t3 === `$!` || t3 === `$?` || t3 === `$~` || t3 === `&` || t3 === `F!` || t3 === `F`) break;
        if (t3 === `/$` || t3 === `/&`) return null;
      }
    }
    return e5;
  }
  var um = null;
  function dm(e5) {
    e5 = e5.nextSibling;
    for (var t3 = 0; e5; ) {
      if (e5.nodeType === 8) {
        var n3 = e5.data;
        if (n3 === `/$` || n3 === `/&`) {
          if (t3 === 0) return lm(e5.nextSibling);
          t3--;
        } else n3 !== `$` && n3 !== `$!` && n3 !== `$?` && n3 !== `$~` && n3 !== `&` || t3++;
      }
      e5 = e5.nextSibling;
    }
    return null;
  }
  function fm(e5) {
    e5 = e5.previousSibling;
    for (var t3 = 0; e5; ) {
      if (e5.nodeType === 8) {
        var n3 = e5.data;
        if (n3 === `$` || n3 === `$!` || n3 === `$?` || n3 === `$~` || n3 === `&`) {
          if (t3 === 0) return e5;
          t3--;
        } else n3 !== `/$` && n3 !== `/&` || t3++;
      }
      e5 = e5.previousSibling;
    }
    return null;
  }
  function pm(e5, t3) {
    function n3() {
      r3 = true;
    }
    if (e5.ownerDocument.activeElement === e5) return true;
    var r3 = false;
    try {
      e5.ownerDocument.addEventListener(`focus`, n3, true), (e5.focus || HTMLElement.prototype.focus).call(e5, t3);
    } finally {
      e5.ownerDocument.removeEventListener(`focus`, n3, true);
    }
    return r3;
  }
  function mm(e5) {
    yp(function() {
      yp(function(t3) {
        return e5(t3);
      });
    });
  }
  function hm(e5, t3, n3) {
    switch (t3 = lp(n3), e5) {
      case `html`:
        if (e5 = t3.documentElement, !e5) throw Error(i2(452));
        return e5;
      case `head`:
        if (e5 = t3.head, !e5) throw Error(i2(453));
        return e5;
      case `body`:
        if (e5 = t3.body, !e5) throw Error(i2(454));
        return e5;
      default:
        throw Error(i2(451));
    }
  }
  function gm(e5, t3, n3) {
    for (var r3 in n3) {
      var i3 = n3[r3];
      n3.hasOwnProperty(r3) && i3 != null && $(e5, t3, r3, null, rp, i3);
    }
    n3.dangerouslySetInnerHTML != null && (e5.textContent = ``), e5.onclick === On2 && (e5.onclick = null), Vt2(e5);
  }
  function _m(e5) {
    for (var t3 = e5.attributes; t3.length; ) e5.removeAttributeNode(t3[0]);
    Vt2(e5);
  }
  var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
  function bm(e5) {
    if (typeof e5.getRootNode == `function`) {
      var t3 = e5.getRootNode();
      if (t3.nodeType === 9 || t3.nodeType === 11) return t3;
    }
    return e5.nodeType === 9 ? e5 : e5.ownerDocument;
  }
  var xm = D2.d;
  D2.d = { f: Sm, r: Cm, D: Em, C: Dm, L: Om, m: km, X: jm, S: Am, M: Mm };
  function Sm() {
    var e5 = xm.f(), t3 = zd();
    return e5 || t3;
  }
  function Cm(e5) {
    var t3 = Ut2(e5);
    t3 !== null && t3.tag === 5 && t3.type === `form` ? ic(t3) : xm.r(e5);
  }
  var wm = typeof document > `u` ? null : document;
  function Tm(e5, t3, n3) {
    var r3 = wm;
    if (r3 && typeof t3 == `string` && t3) {
      var i3 = pn2(t3);
      i3 = `link[rel="` + e5 + `"][href="` + i3 + `"]`, typeof n3 == `string` && (i3 += `[crossorigin="` + n3 + `"]`), ym.has(i3) || (ym.add(i3), e5 = { rel: e5, crossOrigin: n3, href: t3 }, r3.querySelector(i3) === null && (t3 = r3.createElement(`link`), np(t3, `link`, e5), Kt2(t3), r3.head.appendChild(t3)));
    }
  }
  function Em(e5) {
    xm.D(e5), Tm(`dns-prefetch`, e5, null);
  }
  function Dm(e5, t3) {
    xm.C(e5, t3), Tm(`preconnect`, e5, t3);
  }
  function Om(e5, t3, n3) {
    xm.L(e5, t3, n3);
    var r3 = wm;
    if (r3 && e5 && t3) {
      var i3 = `link[rel="preload"][as="` + pn2(t3) + `"]`;
      t3 === `image` && n3 && n3.imageSrcSet ? (i3 += `[imagesrcset="` + pn2(n3.imageSrcSet) + `"]`, typeof n3.imageSizes == `string` && (i3 += `[imagesizes="` + pn2(n3.imageSizes) + `"]`)) : i3 += `[href="` + pn2(e5) + `"]`;
      var a3 = i3;
      switch (t3) {
        case `style`:
          a3 = Pm(e5);
          break;
        case `script`:
          a3 = Rm(e5);
      }
      if (!(vm.has(a3) || (e5 = C2({ rel: `preload`, href: t3 === `image` && n3 && n3.imageSrcSet ? void 0 : e5, as: t3 }, n3), vm.set(a3, e5), r3.querySelector(i3) !== null || t3 === `style` && r3.querySelector(Fm(a3)) || t3 === `script` && r3.querySelector(zm(a3))))) {
        var o3 = r3.createElement(`link`);
        np(o3, `link`, e5), t3 === `style` && (o3[Bt2] = true, o3.onload = o3.onerror = function() {
          qt2(o3);
        }), Kt2(o3), r3.head.appendChild(o3);
      }
    }
  }
  function km(e5, t3) {
    xm.m(e5, t3);
    var n3 = wm;
    if (n3 && e5) {
      var r3 = t3 && typeof t3.as == `string` ? t3.as : `script`, i3 = `link[rel="modulepreload"][as="` + pn2(r3) + `"][href="` + pn2(e5) + `"]`, a3 = i3;
      switch (r3) {
        case `audioworklet`:
        case `paintworklet`:
        case `serviceworker`:
        case `sharedworker`:
        case `worker`:
        case `script`:
          a3 = Rm(e5);
      }
      if (!vm.has(a3) && (e5 = C2({ rel: `modulepreload`, href: e5 }, t3), vm.set(a3, e5), n3.querySelector(i3) === null)) {
        switch (r3) {
          case `audioworklet`:
          case `paintworklet`:
          case `serviceworker`:
          case `sharedworker`:
          case `worker`:
          case `script`:
            if (n3.querySelector(zm(a3))) return;
        }
        r3 = n3.createElement(`link`), np(r3, `link`, e5), Kt2(r3), n3.head.appendChild(r3);
      }
    }
  }
  function Am(e5, t3, n3) {
    xm.S(e5, t3, n3);
    var r3 = wm;
    if (r3 && e5) {
      var i3 = Gt2(r3).hoistableStyles, a3 = Pm(e5);
      t3 ||= `default`;
      var o3 = i3.get(a3);
      if (!o3) {
        var s3 = { loading: 0, preload: null };
        if (o3 = r3.querySelector(Fm(a3))) s3.loading = 5;
        else {
          e5 = C2({ rel: `stylesheet`, href: e5, "data-precedence": t3 }, n3), (n3 = vm.get(a3)) && Hm(e5, n3);
          var c3 = o3 = r3.createElement(`link`);
          Kt2(c3), np(c3, `link`, e5), c3._p = new Promise(function(e6, t4) {
            c3.onload = e6, c3.onerror = t4;
          }), c3.addEventListener(`load`, function() {
            s3.loading |= 1;
          }), c3.addEventListener(`error`, function() {
            s3.loading |= 2;
          }), s3.loading |= 4, Vm(o3, t3, r3);
        }
        o3 = { type: `stylesheet`, instance: o3, count: 1, state: s3 }, i3.set(a3, o3);
      }
    }
  }
  function jm(e5, t3) {
    xm.X(e5, t3);
    var n3 = wm;
    if (n3 && e5) {
      var r3 = Gt2(n3).hoistableScripts, i3 = Rm(e5), a3 = r3.get(i3);
      a3 || (a3 = n3.querySelector(zm(i3)), a3 || (e5 = C2({ src: e5, async: true }, t3), (t3 = vm.get(i3)) && Um(e5, t3), a3 = n3.createElement(`script`), Kt2(a3), np(a3, `link`, e5), n3.head.appendChild(a3)), a3 = { type: `script`, instance: a3, count: 1, state: null }, r3.set(i3, a3));
    }
  }
  function Mm(e5, t3) {
    xm.M(e5, t3);
    var n3 = wm;
    if (n3 && e5) {
      var r3 = Gt2(n3).hoistableScripts, i3 = Rm(e5), a3 = r3.get(i3);
      a3 || (a3 = n3.querySelector(zm(i3)), a3 || (e5 = C2({ src: e5, async: true, type: `module` }, t3), (t3 = vm.get(i3)) && Um(e5, t3), a3 = n3.createElement(`script`), Kt2(a3), np(a3, `link`, e5), n3.head.appendChild(a3)), a3 = { type: `script`, instance: a3, count: 1, state: null }, r3.set(i3, a3));
    }
  }
  function Nm(e5, t3, n3, r3) {
    var a3 = (a3 = Me2.current) ? bm(a3) : null;
    if (!a3) throw Error(i2(446));
    switch (e5) {
      case `meta`:
      case `title`:
        return null;
      case `style`:
        return typeof n3.precedence == `string` && typeof n3.href == `string` ? (n3 = Pm(n3.href), t3 = Gt2(a3).hoistableStyles, r3 = t3.get(n3), r3 || (r3 = { type: `style`, instance: null, count: 0, state: null }, t3.set(n3, r3)), r3) : { type: `void`, instance: null, count: 0, state: null };
      case `link`:
        if (n3.rel === `stylesheet` && typeof n3.href == `string` && typeof n3.precedence == `string`) {
          e5 = Pm(n3.href);
          var o3 = Gt2(a3).hoistableStyles, s3 = o3.get(e5);
          if (s3 || (a3 = a3.ownerDocument || a3, s3 = { type: `stylesheet`, instance: null, count: 0, state: { loading: 0, preload: null } }, o3.set(e5, s3), (o3 = a3.querySelector(Fm(e5))) ? o3._p || (s3.instance = o3, s3.state.loading = 5) : (o3 = vm.get(e5), o3 || (o3 = { rel: `preload`, as: `style`, href: n3.href, crossOrigin: n3.crossOrigin, integrity: n3.integrity, media: n3.media, hrefLang: n3.hrefLang, referrerPolicy: n3.referrerPolicy }, vm.set(e5, o3)), Lm(a3, e5, o3, s3.state))), t3 && r3 === null) throw Error(i2(528, ``));
          return s3;
        }
        if (t3 && r3 !== null) throw Error(i2(529, ``));
        return null;
      case `script`:
        return t3 = n3.async, n3 = n3.src, typeof n3 == `string` && t3 && typeof t3 != `function` && typeof t3 != `symbol` ? (n3 = Rm(n3), t3 = Gt2(a3).hoistableScripts, r3 = t3.get(n3), r3 || (r3 = { type: `script`, instance: null, count: 0, state: null }, t3.set(n3, r3)), r3) : { type: `void`, instance: null, count: 0, state: null };
      default:
        throw Error(i2(444, e5));
    }
  }
  function Pm(e5) {
    return `href="` + pn2(e5) + `"`;
  }
  function Fm(e5) {
    return `link[rel="stylesheet"][` + e5 + `]`;
  }
  function Im(e5) {
    return C2({}, e5, { "data-precedence": e5.precedence, precedence: null });
  }
  function Lm(e5, t3, n3, r3) {
    if (t3 = e5.querySelector(`link[rel="preload"][as="style"][` + t3 + `]`)) {
      if (true !== t3[Bt2]) {
        r3.loading = 1;
        return;
      }
    } else t3 = e5.createElement(`link`), t3[Bt2] = true, t3.onload = t3.onerror = qt2.bind(null, t3), np(t3, `link`, n3), Kt2(t3), e5.head.appendChild(t3);
    r3.preload = t3, t3.addEventListener(`load`, function() {
      return r3.loading |= 1;
    }), t3.addEventListener(`error`, function() {
      return r3.loading |= 2;
    });
  }
  function Rm(e5) {
    return `[src="` + pn2(e5) + `"]`;
  }
  function zm(e5) {
    return `script[async]` + e5;
  }
  function Bm(e5, t3, n3) {
    if (t3.count++, t3.instance === null) switch (t3.type) {
      case `style`:
        var r3 = e5.querySelector(`style[data-href~="` + pn2(n3.href) + `"]`);
        if (r3) return t3.instance = r3, Kt2(r3), r3;
        var a3 = C2({}, n3, { "data-href": n3.href, "data-precedence": n3.precedence, href: null, precedence: null });
        return r3 = (e5.ownerDocument || e5).createElement(`style`), Kt2(r3), np(r3, `style`, a3), Vm(r3, n3.precedence, e5), t3.instance = r3;
      case `stylesheet`:
        a3 = Pm(n3.href);
        var o3 = e5.querySelector(Fm(a3));
        if (o3) return t3.state.loading |= 4, t3.instance = o3, Kt2(o3), o3;
        r3 = Im(n3), (a3 = vm.get(a3)) && Hm(r3, a3), o3 = (e5.ownerDocument || e5).createElement(`link`), Kt2(o3);
        var s3 = o3;
        return s3._p = new Promise(function(e6, t4) {
          s3.onload = e6, s3.onerror = t4;
        }), np(o3, `link`, r3), t3.state.loading |= 4, Vm(o3, n3.precedence, e5), t3.instance = o3;
      case `script`:
        return o3 = Rm(n3.src), (a3 = e5.querySelector(zm(o3))) ? (t3.instance = a3, Kt2(a3), a3) : (r3 = n3, (a3 = vm.get(o3)) && (r3 = C2({}, n3), Um(r3, a3)), e5 = e5.ownerDocument || e5, a3 = e5.createElement(`script`), Kt2(a3), np(a3, `link`, r3), e5.head.appendChild(a3), t3.instance = a3);
      case `void`:
        return null;
      default:
        throw Error(i2(443, t3.type));
    }
    else t3.type === `stylesheet` && !(t3.state.loading & 4) && (r3 = t3.instance, t3.state.loading |= 4, Vm(r3, n3.precedence, e5));
    return t3.instance;
  }
  function Vm(e5, t3, n3) {
    for (var r3 = n3.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`), i3 = r3.length ? r3[r3.length - 1] : null, a3 = i3, o3 = 0; o3 < r3.length; o3++) {
      var s3 = r3[o3];
      if (s3.dataset.precedence === t3) a3 = s3;
      else if (a3 !== i3) break;
    }
    a3 ? a3.parentNode.insertBefore(e5, a3.nextSibling) : (t3 = n3.nodeType === 9 ? n3.head : n3, t3.insertBefore(e5, t3.firstChild));
  }
  function Hm(e5, t3) {
    e5.crossOrigin ??= t3.crossOrigin, e5.referrerPolicy ??= t3.referrerPolicy, e5.title ??= t3.title;
  }
  function Um(e5, t3) {
    e5.crossOrigin ??= t3.crossOrigin, e5.referrerPolicy ??= t3.referrerPolicy, e5.integrity ??= t3.integrity;
  }
  var Wm = null;
  function Gm(e5, t3, n3) {
    if (Wm === null) {
      var r3 = /* @__PURE__ */ new Map(), i3 = Wm = /* @__PURE__ */ new Map();
      i3.set(n3, r3);
    } else i3 = Wm, r3 = i3.get(n3), r3 || (r3 = /* @__PURE__ */ new Map(), i3.set(n3, r3));
    if (r3.has(e5)) return r3;
    for (r3.set(e5, null), n3 = n3.getElementsByTagName(e5), i3 = 0; i3 < n3.length; i3++) {
      var a3 = n3[i3];
      if (!(a3[zt2] || a3[Mt2] || e5 === `link` && a3.getAttribute(`rel`) === `stylesheet`) && a3.namespaceURI !== `http://www.w3.org/2000/svg`) {
        var o3 = a3.getAttribute(t3) || ``;
        o3 = e5 + o3;
        var s3 = r3.get(o3);
        s3 ? s3.push(a3) : r3.set(o3, [a3]);
      }
    }
    return r3;
  }
  function Km(e5, t3, n3) {
    e5 = e5.ownerDocument || e5, e5.head.insertBefore(n3, t3 === `title` ? e5.querySelector(`head > title`) : null);
  }
  function qm(e5, t3, n3) {
    if (n3 === 1 || t3.itemProp != null) return false;
    switch (e5) {
      case `meta`:
      case `title`:
        return true;
      case `style`:
        if (typeof t3.precedence != `string` || typeof t3.href != `string` || t3.href === ``) break;
        return true;
      case `link`:
        if (typeof t3.rel != `string` || typeof t3.href != `string` || t3.href === `` || t3.onLoad || t3.onError) break;
        switch (t3.rel) {
          case `stylesheet`:
            return e5 = t3.disabled, typeof t3.precedence == `string` && e5 == null;
          default:
            return true;
        }
      case `script`:
        if (t3.async && typeof t3.async != `function` && typeof t3.async != `symbol` && !t3.onLoad && !t3.onError && t3.src && typeof t3.src == `string`) return true;
    }
    return false;
  }
  function Jm(e5, t3) {
    return e5 === `img` && t3.src != null && t3.src !== `` && t3.onLoad == null && t3.loading !== `lazy`;
  }
  function Ym(e5) {
    return !(e5.type === `stylesheet` && !(e5.state.loading & 3));
  }
  function Xm(e5) {
    return (e5.width || 100) * (e5.height || 100) * (typeof devicePixelRatio == `number` ? devicePixelRatio : 1) * 0.25;
  }
  function Zm(e5, t3) {
    typeof t3.decode == `function` && (e5.imgCount++, t3.complete || (e5.imgBytes += Xm(t3), e5.suspenseyImages.push(t3)), e5 = rh.bind(e5), t3.decode().then(e5, e5));
  }
  function Qm(e5, t3, n3, r3) {
    if (n3.type === `stylesheet` && (typeof r3.media != `string` || false !== matchMedia(r3.media).matches) && !(n3.state.loading & 4)) {
      if (n3.instance === null) {
        var i3 = Pm(r3.href), a3 = t3.querySelector(Fm(i3));
        if (a3) {
          t3 = a3._p, typeof t3 == `object` && t3 && typeof t3.then == `function` && (e5.count++, e5 = nh.bind(e5), t3.then(e5, e5)), n3.state.loading |= 4, n3.instance = a3, Kt2(a3);
          return;
        }
        a3 = t3.ownerDocument || t3, r3 = Im(r3), (i3 = vm.get(i3)) && Hm(r3, i3), a3 = a3.createElement(`link`), Kt2(a3);
        var o3 = a3;
        o3._p = new Promise(function(e6, t4) {
          o3.onload = e6, o3.onerror = t4;
        }), np(a3, `link`, r3), n3.instance = a3;
      }
      e5.stylesheets === null && (e5.stylesheets = /* @__PURE__ */ new Map()), e5.stylesheets.set(n3, t3), (t3 = n3.state.preload) && !(n3.state.loading & 3) && (e5.count++, n3 = nh.bind(e5), t3.addEventListener(`load`, n3), t3.addEventListener(`error`, n3));
    }
  }
  var $m = 0;
  function eh(e5, t3) {
    return e5.stylesheets && e5.count === 0 && ah(e5, e5.stylesheets), 0 < e5.count || 0 < e5.imgCount ? function(n3) {
      var r3 = setTimeout(function() {
        if (e5.stylesheets && ah(e5, e5.stylesheets), e5.unsuspend) {
          var t4 = e5.unsuspend;
          e5.unsuspend = null, t4();
        }
      }, 6e4 + t3);
      0 < e5.imgBytes && $m === 0 && ($m = 62500 * op());
      var i3 = setTimeout(function() {
        if (e5.waitingForImages = false, e5.count === 0 && (e5.stylesheets && ah(e5, e5.stylesheets), e5.unsuspend)) {
          var t4 = e5.unsuspend;
          e5.unsuspend = null, t4();
        }
      }, (e5.imgBytes > $m ? 50 : 800) + t3);
      return e5.unsuspend = n3, function() {
        e5.unsuspend = null, clearTimeout(r3), clearTimeout(i3);
      };
    } : null;
  }
  function th(e5) {
    if (e5.count === 0 && (e5.imgCount === 0 || !e5.waitingForImages)) {
      if (e5.stylesheets) ah(e5, e5.stylesheets);
      else if (e5.unsuspend) {
        var t3 = e5.unsuspend;
        e5.unsuspend = null, t3();
      }
    }
  }
  function nh() {
    this.count--, th(this);
  }
  function rh() {
    this.imgCount--, th(this);
  }
  var ih = null;
  function ah(e5, t3) {
    e5.stylesheets = null, e5.unsuspend !== null && (e5.count++, ih = /* @__PURE__ */ new Map(), t3.forEach(oh, e5), ih = null, nh.call(e5));
  }
  function oh(e5, t3) {
    if (!(t3.state.loading & 4)) {
      var n3 = ih.get(e5);
      if (n3) var r3 = n3.get(null);
      else {
        n3 = /* @__PURE__ */ new Map(), ih.set(e5, n3);
        for (var i3 = e5.querySelectorAll(`link[data-precedence],style[data-precedence]`), a3 = 0; a3 < i3.length; a3++) {
          var o3 = i3[a3];
          (o3.nodeName === `LINK` || o3.getAttribute(`media`) !== `not all`) && (n3.set(o3.dataset.precedence, o3), r3 = o3);
        }
        r3 && n3.set(null, r3);
      }
      i3 = t3.instance, o3 = i3.getAttribute(`data-precedence`), a3 = n3.get(o3) || r3, a3 === r3 && n3.set(null, i3), n3.set(o3, i3), this.count++, r3 = nh.bind(this), i3.addEventListener(`load`, r3), i3.addEventListener(`error`, r3), a3 ? a3.parentNode.insertBefore(i3, a3.nextSibling) : (e5 = e5.nodeType === 9 ? e5.head : e5, e5.insertBefore(i3, e5.firstChild)), t3.state.loading |= 4;
    }
  }
  var sh = { $$typeof: le2, Provider: null, Consumer: null, _currentValue: Te2, _currentValue2: Te2, _threadCount: 0 };
  function ch(e5, t3, n3, r3, i3, a3, o3, s3, c3) {
    this.tag = 1, this.containerInfo = e5, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = xt2(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = xt2(0), this.hiddenUpdates = xt2(null), this.identifierPrefix = r3, this.onUncaughtError = i3, this.onCaughtError = a3, this.onRecoverableError = o3, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c3, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function lh(e5, t3, n3, r3, i3, a3, o3, s3, c3, l3, u3, d2) {
    return e5 = new ch(e5, t3, n3, o3, c3, l3, u3, d2, s3), t3 = 1, true === a3 && (t3 |= 24), a3 = M2(3, null, null, t3), e5.current = a3, a3.stateNode = e5, t3 = La2(), t3.refCount++, e5.pooledCache = t3, t3.refCount++, a3.memoizedState = { element: r3, isDehydrated: n3, cache: t3 }, bo2(a3), e5;
  }
  function uh(e5) {
    return e5 ? (e5 = Ri2, e5) : Ri2;
  }
  function dh(e5, t3, n3, r3, i3, a3) {
    i3 = uh(i3), r3.context === null ? r3.context = i3 : r3.pendingContext = i3, r3 = So2(t3), r3.payload = { element: n3 }, a3 = a3 === void 0 ? null : a3, a3 !== null && (r3.callback = a3), n3 = Co2(e5, r3, t3), n3 !== null && (Pd(n3, e5, t3), wo2(n3, e5, t3));
  }
  function fh(e5, t3) {
    if (e5 = e5.memoizedState, e5 !== null && e5.dehydrated !== null) {
      var n3 = e5.retryLane;
      e5.retryLane = n3 !== 0 && n3 < t3 ? n3 : t3;
    }
  }
  function ph(e5, t3) {
    fh(e5, t3), (e5 = e5.alternate) && fh(e5, t3);
  }
  function mh(e5) {
    if (e5.tag === 13 || e5.tag === 31) {
      var t3 = Fi2(e5, 67108864);
      t3 !== null && Pd(t3, e5, 67108864), ph(e5, 67108864);
    }
  }
  function hh(e5) {
    if (e5.tag === 13 || e5.tag === 31) {
      var t3 = jd();
      t3 = Dt2(t3);
      var n3 = Fi2(e5, t3);
      n3 !== null && Pd(n3, e5, t3), ph(e5, t3);
    }
  }
  var gh = true;
  function _h(e5, t3, n3, r3) {
    var i3 = E2.T;
    E2.T = null;
    var a3 = D2.p;
    try {
      D2.p = 2, yh(e5, t3, n3, r3);
    } finally {
      D2.p = a3, E2.T = i3;
    }
  }
  function vh(e5, t3, n3, r3) {
    var i3 = E2.T;
    E2.T = null;
    var a3 = D2.p;
    try {
      D2.p = 8, yh(e5, t3, n3, r3);
    } finally {
      D2.p = a3, E2.T = i3;
    }
  }
  function yh(e5, t3, n3, r3) {
    if (gh) {
      var i3 = bh(r3);
      if (i3 === null) Kf(e5, t3, r3, xh, n3), Mh(e5, r3);
      else if (Ph(i3, e5, t3, n3, r3)) r3.stopPropagation();
      else if (Mh(e5, r3), t3 & 4 && -1 < jh.indexOf(e5)) {
        for (; i3 !== null; ) {
          var a3 = Ut2(i3);
          if (a3 !== null) switch (a3.tag) {
            case 3:
              if (a3 = a3.stateNode, a3.current.memoizedState.isDehydrated) {
                var o3 = ht2(a3.pendingLanes);
                if (o3 !== 0) {
                  var s3 = a3;
                  for (s3.pendingLanes |= 2, s3.entangledLanes |= 2; o3; ) {
                    var c3 = 1 << 31 - ct2(o3);
                    s3.entanglements[1] |= c3, o3 &= ~c3;
                  }
                  Ef(a3), !(G & 6) && (_d = Xe2() + 500, Df(0, false));
                }
              }
              break;
            case 31:
            case 13:
              s3 = Fi2(a3, 2), s3 !== null && Pd(s3, a3, 2), zd(), ph(a3, 2);
          }
          if (a3 = bh(r3), a3 === null && Kf(e5, t3, r3, xh, n3), a3 === i3) break;
          i3 = a3;
        }
        i3 !== null && r3.stopPropagation();
      } else Kf(e5, t3, r3, null, n3);
    }
  }
  function bh(e5) {
    return e5 = An2(e5), Sh(e5);
  }
  var xh = null;
  function Sh(e5) {
    if (xh = null, e5 = Ht2(e5), e5 !== null) {
      var t3 = o2(e5);
      if (t3 === null) e5 = null;
      else {
        var n3 = t3.tag;
        if (n3 === 13) {
          if (e5 = s2(t3), e5 !== null) return e5;
          e5 = null;
        } else if (n3 === 31) {
          if (e5 = c2(t3), e5 !== null) return e5;
          e5 = null;
        } else if (n3 === 3) {
          if (t3.stateNode.current.memoizedState.isDehydrated) return t3.tag === 3 ? t3.stateNode.containerInfo : null;
          e5 = null;
        } else t3 !== e5 && (e5 = null);
      }
    }
    return xh = e5, null;
  }
  function Ch(e5) {
    switch (e5) {
      case `beforetoggle`:
      case `cancel`:
      case `click`:
      case `close`:
      case `contextmenu`:
      case `copy`:
      case `cut`:
      case `auxclick`:
      case `dblclick`:
      case `dragend`:
      case `dragstart`:
      case `drop`:
      case `focusin`:
      case `focusout`:
      case `input`:
      case `invalid`:
      case `keydown`:
      case `keypress`:
      case `keyup`:
      case `mousedown`:
      case `mouseup`:
      case `paste`:
      case `pause`:
      case `play`:
      case `pointercancel`:
      case `pointerdown`:
      case `pointerup`:
      case `ratechange`:
      case `reset`:
      case `seeked`:
      case `submit`:
      case `toggle`:
      case `touchcancel`:
      case `touchend`:
      case `touchstart`:
      case `volumechange`:
      case `change`:
      case `selectionchange`:
      case `textInput`:
      case `compositionstart`:
      case `compositionend`:
      case `compositionupdate`:
      case `beforeblur`:
      case `afterblur`:
      case `beforeinput`:
      case `blur`:
      case `fullscreenchange`:
      case `fullscreenerror`:
      case `focus`:
      case `hashchange`:
      case `popstate`:
      case `select`:
      case `selectstart`:
        return 2;
      case `drag`:
      case `dragenter`:
      case `dragexit`:
      case `dragleave`:
      case `dragover`:
      case `mousemove`:
      case `mouseout`:
      case `mouseover`:
      case `pointermove`:
      case `pointerout`:
      case `pointerover`:
      case `resize`:
      case `scroll`:
      case `touchmove`:
      case `wheel`:
      case `mouseenter`:
      case `mouseleave`:
      case `pointerenter`:
      case `pointerleave`:
        return 8;
      case `message`:
        switch (Ze2()) {
          case Qe2:
            return 2;
          case $e2:
            return 8;
          case et2:
          case tt2:
            return 32;
          case nt2:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var wh = false, Th = null, Eh = null, Dh = null, Oh = /* @__PURE__ */ new Map(), kh = /* @__PURE__ */ new Map(), Ah = [], jh = `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);
  function Mh(e5, t3) {
    switch (e5) {
      case `focusin`:
      case `focusout`:
        Th = null;
        break;
      case `dragenter`:
      case `dragleave`:
        Eh = null;
        break;
      case `mouseover`:
      case `mouseout`:
        Dh = null;
        break;
      case `pointerover`:
      case `pointerout`:
        Oh.delete(t3.pointerId);
        break;
      case `gotpointercapture`:
      case `lostpointercapture`:
        kh.delete(t3.pointerId);
    }
  }
  function Nh(e5, t3, n3, r3, i3, a3) {
    return e5 === null || e5.nativeEvent !== a3 ? (e5 = { blockedOn: t3, domEventName: n3, eventSystemFlags: r3, nativeEvent: a3, targetContainers: [i3] }, t3 !== null && (t3 = Ut2(t3), t3 !== null && mh(t3)), e5) : (e5.eventSystemFlags |= r3, t3 = e5.targetContainers, i3 !== null && t3.indexOf(i3) === -1 && t3.push(i3), e5);
  }
  function Ph(e5, t3, n3, r3, i3) {
    switch (t3) {
      case `focusin`:
        return Th = Nh(Th, e5, t3, n3, r3, i3), true;
      case `dragenter`:
        return Eh = Nh(Eh, e5, t3, n3, r3, i3), true;
      case `mouseover`:
        return Dh = Nh(Dh, e5, t3, n3, r3, i3), true;
      case `pointerover`:
        var a3 = i3.pointerId;
        return Oh.set(a3, Nh(Oh.get(a3) || null, e5, t3, n3, r3, i3)), true;
      case `gotpointercapture`:
        return a3 = i3.pointerId, kh.set(a3, Nh(kh.get(a3) || null, e5, t3, n3, r3, i3)), true;
    }
    return false;
  }
  function Fh(e5) {
    var t3 = Ht2(e5.target);
    if (t3 !== null) {
      var n3 = o2(t3);
      if (n3 !== null) {
        if (t3 = n3.tag, t3 === 13) {
          if (t3 = s2(n3), t3 !== null) {
            e5.blockedOn = t3, At2(e5.priority, function() {
              hh(n3);
            });
            return;
          }
        } else if (t3 === 31) {
          if (t3 = c2(n3), t3 !== null) {
            e5.blockedOn = t3, At2(e5.priority, function() {
              hh(n3);
            });
            return;
          }
        } else if (t3 === 3 && n3.stateNode.current.memoizedState.isDehydrated) {
          e5.blockedOn = n3.tag === 3 ? n3.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e5.blockedOn = null;
  }
  function Ih(e5) {
    if (e5.blockedOn !== null) return false;
    for (var t3 = e5.targetContainers; 0 < t3.length; ) {
      var n3 = bh(e5.nativeEvent);
      if (n3 === null) {
        n3 = e5.nativeEvent;
        var r3 = new n3.constructor(n3.type, n3);
        kn2 = r3, n3.target.dispatchEvent(r3), kn2 = null;
      } else return t3 = Ut2(n3), t3 !== null && mh(t3), e5.blockedOn = n3, false;
      t3.shift();
    }
    return true;
  }
  function Lh(e5, t3, n3) {
    Ih(e5) && n3.delete(t3);
  }
  function Rh() {
    wh = false, Th !== null && Ih(Th) && (Th = null), Eh !== null && Ih(Eh) && (Eh = null), Dh !== null && Ih(Dh) && (Dh = null), Oh.forEach(Lh), kh.forEach(Lh);
  }
  function zh(e5, n3) {
    e5.blockedOn === n3 && (e5.blockedOn = null, wh || (wh = true, t2.unstable_scheduleCallback(t2.unstable_NormalPriority, Rh)));
  }
  var Bh = null;
  function Vh(e5) {
    Bh !== e5 && (Bh = e5, t2.unstable_scheduleCallback(t2.unstable_NormalPriority, function() {
      Bh === e5 && (Bh = null);
      for (var t3 = 0; t3 < e5.length; t3 += 3) {
        var n3 = e5[t3], r3 = e5[t3 + 1], i3 = e5[t3 + 2];
        if (typeof r3 != `function`) {
          if (Sh(r3 || n3) === null) continue;
          break;
        }
        var a3 = Ut2(n3);
        a3 !== null && (e5.splice(t3, 3), t3 -= 3, nc(a3, { pending: true, data: i3, method: n3.method, action: r3 }, r3, i3));
      }
    }));
  }
  function Hh(e5) {
    function t3(t4) {
      return zh(t4, e5);
    }
    Th !== null && zh(Th, e5), Eh !== null && zh(Eh, e5), Dh !== null && zh(Dh, e5), Oh.forEach(t3), kh.forEach(t3);
    for (var n3 = 0; n3 < Ah.length; n3++) {
      var r3 = Ah[n3];
      r3.blockedOn === e5 && (r3.blockedOn = null);
    }
    for (; 0 < Ah.length && (n3 = Ah[0], n3.blockedOn === null); ) Fh(n3), n3.blockedOn === null && Ah.shift();
    if (n3 = (e5.ownerDocument || e5).$$reactFormReplay, n3 != null) for (r3 = 0; r3 < n3.length; r3 += 3) {
      var i3 = n3[r3], a3 = n3[r3 + 1], o3 = i3[Nt2] || null;
      if (typeof a3 == `function`) o3 || Vh(n3);
      else if (o3) {
        var s3 = null;
        if (a3 && a3.hasAttribute(`formAction`)) {
          if (i3 = a3, o3 = a3[Nt2] || null) s3 = o3.formAction;
          else if (Sh(i3) !== null) continue;
        } else s3 = o3.action;
        typeof s3 == `function` ? n3[r3 + 1] = s3 : (n3.splice(r3, 3), r3 -= 3), Vh(n3);
      }
    }
  }
  function Uh() {
    function e5(e6) {
      e6.canIntercept && e6.info === `react-transition` && e6.intercept({ handler: function() {
        return new Promise(function(e7) {
          return i3 = e7;
        });
      }, focusReset: `manual`, scroll: `manual` });
    }
    function t3() {
      i3 !== null && (i3(), i3 = null), r3 || setTimeout(n3, 20);
    }
    function n3() {
      if (!r3 && !navigation.transition) {
        var e6 = navigation.currentEntry;
        e6 && e6.url != null && navigation.navigate(e6.url, { state: e6.getState(), info: `react-transition`, history: `replace` });
      }
    }
    if (typeof navigation == `object`) {
      var r3 = false, i3 = null;
      return navigation.addEventListener(`navigate`, e5), navigation.addEventListener(`navigatesuccess`, t3), navigation.addEventListener(`navigateerror`, t3), setTimeout(n3, 100), function() {
        r3 = true, navigation.removeEventListener(`navigate`, e5), navigation.removeEventListener(`navigatesuccess`, t3), navigation.removeEventListener(`navigateerror`, t3), i3 !== null && (i3(), i3 = null);
      };
    }
  }
  function Wh(e5) {
    this._internalRoot = e5;
  }
  Gh.prototype.render = Wh.prototype.render = function(e5) {
    var t3 = this._internalRoot;
    if (t3 === null) throw Error(i2(409));
    var n3 = t3.current;
    dh(n3, jd(), e5, t3, null, null);
  }, Gh.prototype.unmount = Wh.prototype.unmount = function() {
    var e5 = this._internalRoot;
    if (e5 !== null) {
      this._internalRoot = null;
      var t3 = e5.containerInfo;
      dh(e5.current, 2, null, e5, null, null), zd(), t3[Pt2] = null;
    }
  };
  function Gh(e5) {
    this._internalRoot = e5;
  }
  Gh.prototype.unstable_scheduleHydration = function(e5) {
    if (e5) {
      var t3 = kt2();
      e5 = { blockedOn: null, target: e5, priority: t3 };
      for (var n3 = 0; n3 < Ah.length && t3 !== 0 && t3 < Ah[n3].priority; n3++) ;
      Ah.splice(n3, 0, e5), n3 === 0 && Fh(e5);
    }
  };
  var Kh = n2.version;
  if (Kh !== `19.3.0`) throw Error(i2(527, Kh, `19.3.0`));
  D2.findDOMNode = function(e5) {
    var t3 = e5._reactInternals;
    if (t3 === void 0) throw typeof e5.render == `function` ? Error(i2(188)) : (e5 = Object.keys(e5).join(`,`), Error(i2(268, e5)));
    return e5 = u2(t3), e5 = e5 === null ? null : f2(e5), e5 = e5 === null ? null : e5.stateNode, e5;
  };
  var qh = { bundleType: 0, version: `19.3.0`, rendererPackageName: `react-dom`, currentDispatcherRef: E2, reconcilerVersion: `19.3.0` };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
    var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Jh.isDisabled && Jh.supportsFiber) try {
      at2 = Jh.inject(qh), ot2 = Jh;
    } catch {
    }
  }
  e4.createRoot = function(e5, t3) {
    if (!a2(e5)) throw Error(i2(299));
    var n3 = false, r3 = ``, o3 = Tc, s3 = Ec, c3 = Dc;
    return t3 != null && (true === t3.unstable_strictMode && (n3 = true), t3.identifierPrefix !== void 0 && (r3 = t3.identifierPrefix), t3.onUncaughtError !== void 0 && (o3 = t3.onUncaughtError), t3.onCaughtError !== void 0 && (s3 = t3.onCaughtError), t3.onRecoverableError !== void 0 && (c3 = t3.onRecoverableError)), t3 = lh(e5, 1, false, null, null, n3, r3, null, o3, s3, c3, Uh), e5[Pt2] = t3.current, Wf(e5), new Wh(t3);
  };
})), _ = o(((e4, t2) => {
  function n2() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u` && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == `function`) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n2);
    } catch (e5) {
      console.error(e5);
    }
  }
  n2(), t2.exports = g();
})), v = l(d(), 1), y = _(), b = `modulepreload`, x = function(e4) {
  return `/` + e4;
}, ee = {}, te = function(e4) {
  return e4.pathname.endsWith(`.css`);
}, ne = function(e4, t2, n2) {
  let r2 = Promise.resolve();
  if (t2 && t2.length > 0) {
    let o2 = function(e6) {
      return Promise.all(e6.map((e7) => Promise.resolve(e7).then((e8) => ({ status: `fulfilled`, value: e8 }), (e8) => ({ status: `rejected`, reason: e8 }))));
    }, s2 = function(e6) {
      return import.meta.resolve ? new URL(import.meta.resolve(e6)) : new URL(e6, import.meta.url);
    };
    let e5, i3 = document.querySelector(`meta[property=csp-nonce]`), a2 = i3?.nonce || i3?.getAttribute(`nonce`);
    r2 = o2(t2.map((t3) => {
      t3 = x(t3, n2);
      let r3 = s2(t3);
      if (r3.href in ee) return;
      ee[r3.href] = true;
      let i4 = te(r3);
      if (e5 === void 0) {
        e5 = { all: /* @__PURE__ */ new Set(), styles: /* @__PURE__ */ new Set() };
        let t4 = document.getElementsByTagName(`link`);
        for (let n3 = t4.length - 1; n3 >= 0; n3--) {
          let r4 = t4[n3];
          e5.all.add(r4.href), r4.rel === `stylesheet` && e5.styles.add(r4.href);
        }
      }
      if ((i4 ? e5.styles : e5.all).has(r3.href)) return;
      let o3 = document.createElement(`link`);
      if (o3.rel = i4 ? `stylesheet` : b, i4 || (o3.as = `script`), o3.crossOrigin = ``, o3.href = r3.href, a2 && o3.setAttribute(`nonce`, a2), document.head.appendChild(o3), i4) return new Promise((e6, t4) => {
        o3.addEventListener(`load`, e6), o3.addEventListener(`error`, () => t4(Error(`Unable to preload CSS for ${r3}`)));
      });
    }).filter((e6) => e6 !== void 0));
  }
  function i2(e5) {
    let t3 = new Event(`vite:preloadError`, { cancelable: true });
    if (t3.payload = e5, window.dispatchEvent(t3), !t3.defaultPrevented) throw e5;
  }
  return r2.then((t3) => {
    for (let e5 of t3 || []) e5.status === `rejected` && i2(e5.reason);
    return e4().catch(i2);
  });
}, S = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i, re = /^[\\/]{2}/;
function C(e4, t2) {
  return t2 + e4.replace(/\\/g, `/`);
}
var ie = `popstate`;
function ae(e4) {
  return typeof e4 == `object` && !!e4 && `pathname` in e4 && `search` in e4 && `hash` in e4 && `state` in e4 && `key` in e4;
}
function oe(e4 = {}) {
  function t2(e5, t3) {
    let n3 = t3.state?.masked, { pathname: r2, search: i2, hash: a2 } = n3 || e5.location;
    return le(``, { pathname: r2, search: i2, hash: a2 }, t3.state && t3.state.usr || null, t3.state && t3.state.key || `default`, n3 ? { pathname: e5.location.pathname, search: e5.location.search, hash: e5.location.hash } : void 0);
  }
  function n2(e5, t3) {
    return typeof t3 == `string` ? t3 : ue(t3);
  }
  return fe(t2, n2, null, e4);
}
function w(e4, t2) {
  if (e4 === false || e4 == null) throw Error(t2);
}
function T(e4, t2) {
  if (!e4) {
    typeof console < `u` && console.warn(t2);
    try {
      throw Error(t2);
    } catch {
    }
  }
}
function se() {
  return Math.random().toString(36).substring(2, 10);
}
function ce(e4, t2) {
  return { usr: e4.state, key: e4.key, idx: t2, masked: e4.mask ? { pathname: e4.pathname, search: e4.search, hash: e4.hash } : void 0 };
}
function le(e4, t2, n2 = null, r2, i2) {
  return { pathname: typeof e4 == `string` ? e4 : e4.pathname, search: ``, hash: ``, ...typeof t2 == `string` ? de(t2) : t2, state: n2, key: t2 && t2.key || r2 || se(), mask: i2 };
}
function ue({ pathname: e4 = `/`, search: t2 = ``, hash: n2 = `` }) {
  return t2 && t2 !== `?` && (e4 += t2.charAt(0) === `?` ? t2 : `?` + t2), n2 && n2 !== `#` && (e4 += n2.charAt(0) === `#` ? n2 : `#` + n2), e4;
}
function de(e4) {
  let t2 = {};
  if (e4) {
    let n2 = e4.indexOf(`#`);
    n2 >= 0 && (t2.hash = e4.substring(n2), e4 = e4.substring(0, n2));
    let r2 = e4.indexOf(`?`);
    r2 >= 0 && (t2.search = e4.substring(r2), e4 = e4.substring(0, r2)), e4 && (t2.pathname = e4);
  }
  return t2;
}
function fe(e4, t2, n2, r2 = {}) {
  let { window: i2 = document.defaultView, v5Compat: a2 = false } = r2, o2 = i2.history, s2 = `POP`, c2 = null, l2 = u2();
  l2 ?? (l2 = 0, o2.replaceState({ ...o2.state, idx: l2 }, ``));
  function u2() {
    return (o2.state || { idx: null }).idx;
  }
  function d2() {
    s2 = `POP`;
    let e5 = u2(), t3 = e5 == null ? null : e5 - l2;
    l2 = e5, c2 && c2({ action: s2, location: h2.location, delta: t3 });
  }
  function f2(e5, t3) {
    s2 = `PUSH`;
    let r3 = ae(e5) ? e5 : le(h2.location, e5, t3);
    n2 && n2(r3, e5), l2 = u2() + 1;
    let d3 = ce(r3, l2), f3 = h2.createHref(r3.mask || r3);
    try {
      o2.pushState(d3, ``, f3);
    } catch (e6) {
      if (e6 instanceof DOMException && e6.name === `DataCloneError`) throw e6;
      i2.location.assign(f3);
    }
    a2 && c2 && c2({ action: s2, location: h2.location, delta: 1 });
  }
  function p2(e5, t3) {
    s2 = `REPLACE`;
    let r3 = ae(e5) ? e5 : le(h2.location, e5, t3);
    n2 && n2(r3, e5), l2 = u2();
    let i3 = ce(r3, l2), d3 = h2.createHref(r3.mask || r3);
    o2.replaceState(i3, ``, d3), a2 && c2 && c2({ action: s2, location: h2.location, delta: 0 });
  }
  function m2(e5) {
    return pe(i2, e5);
  }
  let h2 = { get action() {
    return s2;
  }, get location() {
    return e4(i2, o2);
  }, listen(e5) {
    if (c2) throw Error(`A history only accepts one active listener`);
    return i2.addEventListener(ie, d2), c2 = e5, () => {
      i2.removeEventListener(ie, d2), c2 = null;
    };
  }, createHref(e5) {
    return t2(i2, e5);
  }, createURL: m2, encodeLocation(e5) {
    let t3 = m2(e5);
    return { pathname: t3.pathname, search: t3.search, hash: t3.hash };
  }, push: f2, replace: p2, go(e5) {
    return o2.go(e5);
  } };
  return h2;
}
function pe(e4, t2, n2 = false) {
  let r2 = `http://localhost`;
  e4 && (r2 = e4.location.origin === `null` ? e4.location.href : e4.location.origin), w(r2, `No window.location.(origin|href) available to create URL`);
  let i2 = typeof t2 == `string` ? t2 : ue(t2);
  return i2 = i2.replace(/ $/, `%20`), !n2 && re.test(i2) && (i2 = r2 + i2), new URL(i2, r2);
}
function me(e4, t2, n2 = `/`) {
  return he(e4, t2, n2, false);
}
function he(e4, t2, n2, r2, i2) {
  let a2 = je((typeof t2 == `string` ? de(t2) : t2).pathname || `/`, n2);
  if (a2 == null) return null;
  let o2 = i2 ?? ge(e4), s2 = null, c2 = Ae(a2);
  for (let e5 = 0; s2 == null && e5 < o2.length; ++e5) s2 = De(o2[e5], c2, r2);
  return s2;
}
function ge(e4) {
  let t2 = _e(e4);
  return ye(t2), t2;
}
function _e(e4, t2 = [], n2 = [], r2 = ``, i2 = false) {
  let a2 = (e5, a3, o2 = i2, s2) => {
    let c2 = { relativePath: s2 === void 0 ? e5.path || `` : s2, caseSensitive: e5.caseSensitive === true, childrenIndex: a3, route: e5 };
    if (c2.relativePath.startsWith(`/`)) {
      if (!c2.relativePath.startsWith(r2) && o2) return;
      w(c2.relativePath.startsWith(r2), `Absolute route path "${c2.relativePath}" nested under path "${r2}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`), c2.relativePath = c2.relativePath.slice(r2.length);
    }
    let l2 = ze([r2, c2.relativePath]), u2 = n2.concat(c2);
    e5.children && e5.children.length > 0 && (w(e5.index !== true, `Index routes must not have child routes. Please remove all child routes from route path "${l2}".`), _e(e5.children, t2, u2, l2, o2)), (e5.path != null || e5.index) && t2.push({ path: l2, score: Te(l2, e5.index), routesMeta: u2.map((e6, t3) => {
      let [n3, r3] = O(e6.relativePath, e6.caseSensitive, t3 === u2.length - 1);
      return { ...e6, matcher: n3, compiledParams: r3 };
    }) });
  };
  return e4.forEach((e5, t3) => {
    if (e5.path === `` || !e5.path?.includes(`?`)) a2(e5, t3);
    else for (let n3 of ve(e5.path)) a2(e5, t3, true, n3);
  }), t2;
}
function ve(e4) {
  let t2 = e4.split(`/`);
  if (t2.length === 0) return [];
  let [n2, ...r2] = t2, i2 = n2.endsWith(`?`), a2 = n2.replace(/\?$/, ``);
  if (r2.length === 0) return i2 ? [a2, ``] : [a2];
  let o2 = ve(r2.join(`/`)), s2 = [];
  return s2.push(...o2.map((e5) => e5 === `` ? a2 : [a2, e5].join(`/`))), i2 && s2.push(...o2), s2.map((t3) => e4.startsWith(`/`) && t3 === `` ? `/` : t3);
}
function ye(e4) {
  e4.sort((e5, t2) => e5.score === t2.score ? Ee(e5.routesMeta.map((e6) => e6.childrenIndex), t2.routesMeta.map((e6) => e6.childrenIndex)) : t2.score - e5.score);
}
var be = /^:[\w-]+$/, xe = 3, Se = 2, Ce = 1, we = 10, E = -2, D = (e4) => e4 === `*`;
function Te(e4, t2) {
  let n2 = e4.split(`/`), r2 = n2.length;
  return n2.some(D) && (r2 += E), t2 && (r2 += Se), n2.filter((e5) => !D(e5)).reduce((e5, t3) => e5 + (be.test(t3) ? xe : t3 === `` ? Ce : we), r2);
}
function Ee(e4, t2) {
  return e4.length === t2.length && e4.slice(0, -1).every((e5, n2) => e5 === t2[n2]) ? e4[e4.length - 1] - t2[t2.length - 1] : 0;
}
function De(e4, t2, n2 = false) {
  let { routesMeta: r2 } = e4, i2 = {}, a2 = `/`, o2 = [];
  for (let e5 = 0; e5 < r2.length; ++e5) {
    let s2 = r2[e5], c2 = e5 === r2.length - 1, l2 = a2 === `/` ? t2 : t2.slice(a2.length) || `/`, u2 = { path: s2.relativePath, caseSensitive: s2.caseSensitive, end: c2 }, d2 = s2.matcher && s2.compiledParams ? ke(u2, l2, s2.matcher, s2.compiledParams) : Oe(u2, l2), f2 = s2.route;
    if (!d2 && c2 && n2 && !r2[r2.length - 1].route.index && (d2 = Oe({ path: s2.relativePath, caseSensitive: s2.caseSensitive, end: false }, l2)), !d2) return null;
    Object.assign(i2, d2.params), o2.push({ params: i2, pathname: ze([a2, d2.pathname]), pathnameBase: Ve(ze([a2, d2.pathnameBase])), route: f2 }), d2.pathnameBase !== `/` && (a2 = ze([a2, d2.pathnameBase]));
  }
  return o2;
}
function Oe(e4, t2) {
  typeof e4 == `string` && (e4 = { path: e4, caseSensitive: false, end: true });
  let [n2, r2] = O(e4.path, e4.caseSensitive, e4.end);
  return ke(e4, t2, n2, r2);
}
function ke(e4, t2, n2, r2) {
  let i2 = t2.match(n2);
  if (!i2) return null;
  let a2 = i2[0], o2 = Be(a2, 1), s2 = i2.slice(1);
  return { params: r2.reduce((e5, { paramName: t3, isOptional: n3 }, r3) => {
    if (t3 === `*`) {
      let e6 = s2[r3] || ``;
      o2 = Be(a2.slice(0, a2.length - e6.length), 1);
    }
    let i3 = s2[r3];
    return e5[t3] = n3 && !i3 ? void 0 : (i3 || ``).replace(/%2F/g, `/`), e5;
  }, {}), pathname: a2, pathnameBase: o2, pattern: e4 };
}
function O(e4, t2 = false, n2 = true) {
  T(e4 === `*` || !e4.endsWith(`*`) || e4.endsWith(`/*`), `Route path "${e4}" will be treated as if it were "${e4.replace(/\*$/, `/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e4.replace(/\*$/, `/*`)}".`);
  let r2 = [], i2 = `^` + e4.replace(/\/*\*?$/, ``).replace(/^\/*/, `/`).replace(/[\\.*+^${}|()[\]]/g, `\\$&`).replace(/\/:([\w-]+)(\?)?/g, (e5, t3, n3, i3, a2) => {
    if (r2.push({ paramName: t3, isOptional: n3 != null }), n3) {
      let t4 = a2.charAt(i3 + e5.length);
      return t4 && t4 !== `/` ? `/([^\\/]*)` : `(?:/([^\\/]*))?`;
    }
    return `/([^\\/]+)`;
  }).replace(/\/([\w-]+)\?(\/|$)/g, `(/$1)?$2`);
  return e4.endsWith(`*`) ? (r2.push({ paramName: `*` }), i2 += e4 === `*` || e4 === `/*` ? `(.*)$` : `(?:\\/(.+)|\\/*)$`) : n2 ? i2 += `\\/*$` : e4 !== `` && e4 !== `/` && (i2 += `(?:(?=\\/|$))`), [new RegExp(i2, t2 ? void 0 : `i`), r2];
}
function Ae(e4) {
  try {
    return e4.split(`/`).map((e5) => decodeURIComponent(e5).replace(/\//g, `%2F`)).join(`/`);
  } catch (t2) {
    return T(false, `The URL path "${e4}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t2}).`), e4;
  }
}
function je(e4, t2) {
  if (t2 === `/`) return e4;
  if (!e4.toLowerCase().startsWith(t2.toLowerCase())) return null;
  let n2 = t2.endsWith(`/`) ? t2.length - 1 : t2.length, r2 = e4.charAt(n2);
  return r2 && r2 !== `/` ? null : e4.slice(n2) || `/`;
}
function Me(e4, t2 = `/`) {
  let { pathname: n2, search: r2 = ``, hash: i2 = `` } = typeof e4 == `string` ? de(e4) : e4, a2;
  return n2 ? (n2 = Re(n2), a2 = n2.startsWith(`/`) || n2.startsWith(`\\`) ? Ne(n2.substring(1), `/`) : Ne(n2, t2)) : a2 = t2, { pathname: a2, search: He(r2), hash: Ue(i2) };
}
function Ne(e4, t2) {
  let n2 = Be(t2).split(`/`);
  return e4.split(`/`).forEach((e5) => {
    e5 === `..` ? n2.length > 1 && n2.pop() : e5 !== `.` && n2.push(e5);
  }), n2.length > 1 ? n2.join(`/`) : `/`;
}
function Pe(e4, t2, n2, r2) {
  return `Cannot include a '${e4}' character in a manually specified \`to.${t2}\` field [${JSON.stringify(r2)}].  Please separate it out to the \`to.${n2}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Fe(e4) {
  return e4.filter((e5, t2) => t2 === 0 || e5.route.path && e5.route.path.length > 0);
}
function Ie(e4) {
  let t2 = Fe(e4);
  return t2.map((e5, n2) => n2 === t2.length - 1 ? e5.pathname : e5.pathnameBase);
}
function Le(e4, t2, n2, r2 = false) {
  let i2;
  typeof e4 == `string` ? i2 = de(e4) : (i2 = { ...e4 }, w(!i2.pathname || !i2.pathname.includes(`?`), Pe(`?`, `pathname`, `search`, i2)), w(!i2.pathname || !i2.pathname.includes(`#`), Pe(`#`, `pathname`, `hash`, i2)), w(!i2.search || !i2.search.includes(`#`), Pe(`#`, `search`, `hash`, i2)));
  let a2 = e4 === `` || i2.pathname === ``, o2 = a2 ? `/` : i2.pathname, s2;
  if (o2 == null) s2 = n2;
  else {
    let e5 = t2.length - 1;
    if (!r2 && o2.startsWith(`..`)) {
      let t3 = o2.split(`/`);
      for (; t3[0] === `..`; ) t3.shift(), --e5;
      i2.pathname = t3.join(`/`);
    }
    s2 = e5 >= 0 ? t2[e5] : `/`;
  }
  let c2 = Me(i2, s2), l2 = o2 && o2 !== `/` && o2.endsWith(`/`), u2 = (a2 || o2 === `.`) && n2.endsWith(`/`);
  return !c2.pathname.endsWith(`/`) && (l2 || u2) && (c2.pathname += `/`), c2;
}
var Re = (e4) => e4.replace(/[\\/]{2,}/g, `/`), ze = (e4) => Re(e4.join(`/`));
function Be(e4, t2 = 0) {
  let n2 = e4.length;
  for (; n2 > t2 && e4.charCodeAt(n2 - 1) === 47; ) n2--;
  return n2 === e4.length ? e4 : e4.slice(0, n2);
}
var Ve = (e4) => Be(e4).replace(/^\/*/, `/`), He = (e4) => !e4 || e4 === `?` ? `` : e4.startsWith(`?`) ? e4 : `?` + e4, Ue = (e4) => !e4 || e4 === `#` ? `` : e4.startsWith(`#`) ? e4 : `#` + e4, We = class {
  constructor(e4, t2, n2, r2 = false) {
    this.status = e4, this.statusText = t2 || ``, this.internal = r2, n2 instanceof Error ? (this.data = n2.toString(), this.error = n2) : this.data = n2;
  }
};
function Ge(e4) {
  return e4 != null && typeof e4.status == `number` && typeof e4.statusText == `string` && typeof e4.internal == `boolean` && `data` in e4;
}
function Ke(e4) {
  return ze(e4.map((e5) => e5.route.path).filter(Boolean)) || `/`;
}
var qe = typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0;
function Je(e4, t2) {
  let n2 = e4;
  if (typeof n2 != `string` || !S.test(n2)) return { absoluteURL: void 0, isExternal: false, to: n2 };
  let r2 = n2, i2 = false;
  if (qe) try {
    let e5 = new URL(window.location.href), r3 = re.test(n2) ? new URL(C(n2, e5.protocol)) : new URL(n2), a2 = je(r3.pathname, t2);
    r3.origin === e5.origin && a2 != null ? n2 = a2 + r3.search + r3.hash : i2 = true;
  } catch {
    T(false, `<Link to="${n2}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`);
  }
  return { absoluteURL: r2, isExternal: i2, to: n2 };
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
var Ye = new URL(`http://localhost`);
function Xe(e4) {
  if (e4.createURL) return e4.createURL(`/`);
  try {
    return new URL(e4.createHref(`/`), Ye);
  } catch {
    return Ye;
  }
}
function Ze(e4, t2) {
  return e4.origin === t2.origin && (e4.origin !== `null` || e4.protocol === t2.protocol && e4.host === t2.host);
}
function Qe(e4, t2) {
  if (e4.startsWith(`//`)) return true;
  let n2 = t2.protocol.toLowerCase();
  return e4.toLowerCase().startsWith(n2) ? t2.host === `` || e4.slice(n2.length).startsWith(`//`) : false;
}
function $e(e4, t2, n2, r2) {
  let i2 = null;
  try {
    i2 = e4 == null ? null : new URL(e4, n2);
  } catch {
  }
  let a2 = new URL(t2, n2), o2 = i2 != null && !Ze(i2, n2), s2 = !Ze(a2, n2);
  if (r2 === `reject`) {
    if (o2 || s2) throw Error(`External navigation is not allowed`);
  } else if (s2 && (i2 == null || !Qe(e4, i2) || !Ze(i2, a2))) throw Error(`External navigation is not allowed`);
}
var et = [`POST`, `PUT`, `PATCH`, `DELETE`];
new Set(et);
var tt = [`GET`, ...et];
new Set(tt);
var nt = [`about:`, `blob:`, `chrome:`, `chrome-untrusted:`, `content:`, `data:`, `devtools:`, `file:`, `filesystem:`, `javascript:`];
function rt(e4) {
  try {
    return nt.includes(new URL(e4).protocol);
  } catch {
    return false;
  }
}
var it = v.createContext(null);
it.displayName = `DataRouter`;
var at = v.createContext(null);
at.displayName = `DataRouterState`;
var ot = v.createContext(false);
function st() {
  return v.useContext(ot);
}
var ct = v.createContext({ isTransitioning: false });
ct.displayName = `ViewTransition`;
var lt = v.createContext(/* @__PURE__ */ new Map());
lt.displayName = `Fetchers`;
var ut = v.createContext(null);
ut.displayName = `Await`;
var dt = v.createContext(null);
dt.displayName = `Navigation`;
var ft = v.createContext(null);
ft.displayName = `Location`;
var pt = v.createContext({ outlet: null, matches: [], isDataRoute: false });
pt.displayName = `Route`;
var mt = v.createContext(null);
mt.displayName = `RouteError`;
var ht = `REACT_ROUTER_ERROR`, gt = `REDIRECT`, _t = `ROUTE_ERROR_RESPONSE`;
function vt(e4) {
  if (e4.startsWith(`${ht}:${gt}:{`)) try {
    let t2 = JSON.parse(e4.slice(28));
    if (typeof t2 == `object` && t2 && typeof t2.status == `number` && typeof t2.statusText == `string` && typeof t2.location == `string` && typeof t2.reloadDocument == `boolean` && typeof t2.replace == `boolean`) return t2;
  } catch {
  }
}
function yt(e4) {
  if (e4.startsWith(`${ht}:${_t}:{`)) try {
    let t2 = JSON.parse(e4.slice(40));
    if (typeof t2 == `object` && t2 && typeof t2.status == `number` && typeof t2.statusText == `string`) return new We(t2.status, t2.statusText, t2.data);
  } catch {
  }
}
function bt(e4, { relative: t2 } = {}) {
  w(xt(), `useHref() may be used only in the context of a <Router> component.`);
  let { basename: n2, navigator: r2 } = v.useContext(dt), { hash: i2, pathname: a2, search: o2 } = Ot(e4, { relative: t2 }), s2 = a2;
  return n2 !== `/` && (s2 = a2 === `/` ? n2 : ze([n2, a2])), r2.createHref({ pathname: s2, search: o2, hash: i2 });
}
function xt() {
  return v.useContext(ft) != null;
}
function St() {
  return w(xt(), `useLocation() may be used only in the context of a <Router> component.`), v.useContext(ft).location;
}
var Ct = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function wt(e4) {
  v.useContext(dt).static || v.useLayoutEffect(e4);
}
function Tt() {
  let { isDataRoute: e4 } = v.useContext(pt);
  return e4 ? Gt() : Et();
}
function Et() {
  w(xt(), `useNavigate() may be used only in the context of a <Router> component.`);
  let e4 = v.useContext(it), { basename: t2, navigator: n2 } = v.useContext(dt), { matches: r2 } = v.useContext(pt), { pathname: i2 } = St(), a2 = JSON.stringify(Ie(r2)), o2 = v.useRef(false);
  return wt(() => {
    o2.current = true;
  }), v.useCallback((r3, s2 = {}) => {
    if (T(o2.current, Ct), !o2.current) return;
    if (typeof r3 == `number`) {
      n2.go(r3);
      return;
    }
    let c2 = Le(r3, JSON.parse(a2), i2, s2.relative === `path`);
    e4 == null && t2 !== `/` && (c2.pathname = c2.pathname === `/` ? t2 : ze([t2, c2.pathname])), $e(typeof r3 == `string` ? r3 : ue(r3), n2.createHref(c2), Xe(n2), `reject`), (s2.replace ? n2.replace : n2.push)(c2, s2.state, s2);
  }, [t2, n2, a2, i2, e4]);
}
v.createContext(null);
function Dt() {
  let { matches: e4 } = v.useContext(pt);
  return e4[e4.length - 1]?.params ?? {};
}
function Ot(e4, { relative: t2 } = {}) {
  let { matches: n2 } = v.useContext(pt), { pathname: r2 } = St(), i2 = JSON.stringify(Ie(n2));
  return v.useMemo(() => Le(e4, JSON.parse(i2), r2, t2 === `path`), [e4, i2, r2, t2]);
}
function kt(e4, t2) {
  return At(e4, t2);
}
function At(e4, t2, n2) {
  w(xt(), `useRoutes() may be used only in the context of a <Router> component.`);
  let { navigator: r2 } = v.useContext(dt), { matches: i2 } = v.useContext(pt), a2 = i2[i2.length - 1], o2 = a2 ? a2.params : {}, s2 = a2 ? a2.pathname : `/`, c2 = a2 ? a2.pathnameBase : `/`, l2 = a2 && a2.route;
  {
    let e5 = l2 && l2.path || ``;
    qt(s2, !l2 || e5.endsWith(`*`) || e5.endsWith(`*?`), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s2}" (under <Route path="${e5}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e5}"> to <Route path="${e5 === `/` ? `*` : `${e5}/*`}">.`);
  }
  let u2 = St(), d2;
  if (t2) {
    let e5 = typeof t2 == `string` ? de(t2) : t2;
    w(c2 === `/` || e5.pathname?.startsWith(c2), `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c2}" but pathname "${e5.pathname}" was given in the \`location\` prop.`), d2 = e5;
  } else d2 = u2;
  let f2 = d2.pathname || `/`, p2 = f2;
  if (c2 !== `/`) {
    let e5 = c2.replace(/^\//, ``).split(`/`);
    p2 = `/` + f2.replace(/^\//, ``).split(`/`).slice(e5.length).join(`/`);
  }
  let m2 = n2 && n2.state.matches.length ? n2.state.matches.map((e5) => Object.assign(e5, { route: n2.manifest[e5.route.id] || e5.route })) : me(e4, { pathname: p2 });
  T(l2 || m2 != null, `No routes matched location "${d2.pathname}${d2.search}${d2.hash}" `), T(m2 == null || m2[m2.length - 1].route.element !== void 0 || m2[m2.length - 1].route.Component !== void 0 || m2[m2.length - 1].route.lazy !== void 0, `Matched leaf route at location "${d2.pathname}${d2.search}${d2.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
  let h2 = Lt(m2 && m2.map((e5) => Object.assign({}, e5, { params: Object.assign({}, o2, e5.params), pathname: ze([c2, r2.encodeLocation ? r2.encodeLocation(e5.pathname.replace(/%/g, `%25`).replace(/\?/g, `%3F`).replace(/#/g, `%23`)).pathname : e5.pathname]), pathnameBase: e5.pathnameBase === `/` ? c2 : ze([c2, r2.encodeLocation ? r2.encodeLocation(e5.pathnameBase.replace(/%/g, `%25`).replace(/\?/g, `%3F`).replace(/#/g, `%23`)).pathname : e5.pathnameBase]) })), i2, n2);
  return t2 && h2 ? v.createElement(ft.Provider, { value: { location: { pathname: `/`, search: ``, hash: ``, state: null, key: `default`, mask: void 0, ...d2 }, navigationType: `POP` } }, h2) : h2;
}
function jt() {
  let e4 = Wt(), t2 = Ge(e4) ? `${e4.status} ${e4.statusText}` : e4 instanceof Error ? e4.message : JSON.stringify(e4), n2 = e4 instanceof Error ? e4.stack : null, r2 = `rgba(200,200,200, 0.5)`, i2 = { padding: `0.5rem`, backgroundColor: r2 }, a2 = { padding: `2px 4px`, backgroundColor: r2 }, o2 = null;
  return console.error(`Error handled by React Router default ErrorBoundary:`, e4), o2 = v.createElement(v.Fragment, null, v.createElement(`p`, null, `💿 Hey developer 👋`), v.createElement(`p`, null, `You can provide a way better UX than this when your app throws errors by providing your own `, v.createElement(`code`, { style: a2 }, `ErrorBoundary`), ` or`, ` `, v.createElement(`code`, { style: a2 }, `errorElement`), ` prop on your route.`)), v.createElement(v.Fragment, null, v.createElement(`h2`, null, `Unexpected Application Error!`), v.createElement(`h3`, { style: { fontStyle: `italic` } }, t2), n2 ? v.createElement(`pre`, { style: i2 }, n2) : null, o2);
}
var Mt = v.createElement(jt, null), Nt = class extends v.Component {
  constructor(e4) {
    super(e4), this.state = { location: e4.location, revalidation: e4.revalidation, error: e4.error };
  }
  static getDerivedStateFromError(e4) {
    return { error: e4 };
  }
  static getDerivedStateFromProps(e4, t2) {
    return t2.location !== e4.location || t2.revalidation !== `idle` && e4.revalidation === `idle` ? { error: e4.error, location: e4.location, revalidation: e4.revalidation } : { error: e4.error === void 0 ? t2.error : e4.error, location: t2.location, revalidation: e4.revalidation || t2.revalidation };
  }
  componentDidCatch(e4, t2) {
    this.props.onError ? this.props.onError(e4, t2) : console.error(`React Router caught the following error during render`, e4);
  }
  render() {
    let e4 = this.state.error;
    if (this.context && typeof e4 == `object` && e4 && `digest` in e4 && typeof e4.digest == `string`) {
      let t3 = yt(e4.digest);
      t3 && (e4 = t3);
    }
    let t2 = e4 === void 0 ? this.props.children : v.createElement(pt.Provider, { value: this.props.routeContext }, v.createElement(mt.Provider, { value: e4, children: this.props.component }));
    return this.context ? v.createElement(Ft, { error: e4 }, t2) : t2;
  }
};
Nt.contextType = ot;
var Pt = /* @__PURE__ */ new WeakMap();
function Ft({ children: e4, error: t2 }) {
  let { basename: n2, navigator: r2 } = v.useContext(dt);
  if (typeof t2 == `object` && t2 && `digest` in t2 && typeof t2.digest == `string`) {
    let e5 = vt(t2.digest);
    if (e5) {
      let i2 = Pt.get(t2);
      if (i2) throw i2;
      let a2 = Je(e5.location, n2), o2 = a2.absoluteURL || a2.to;
      if ($e(e5.location, o2, Xe(r2), `allow-explicit`), rt(o2)) throw Error(`Invalid redirect location`);
      if (qe && !Pt.get(t2)) {
        if (a2.isExternal || e5.reloadDocument) window.location.href = o2;
        else {
          let n3 = Promise.resolve().then(() => window.__reactRouterDataRouter.navigate(a2.to, { replace: e5.replace }));
          throw Pt.set(t2, n3), n3;
        }
      }
      return v.createElement(`meta`, { httpEquiv: `refresh`, content: `0;url=${o2}` });
    }
  }
  return e4;
}
function It({ routeContext: e4, match: t2, children: n2 }) {
  let r2 = v.useContext(it);
  return r2 && r2.static && r2.staticContext && (t2.route.errorElement || t2.route.ErrorBoundary) && (r2.staticContext._deepestRenderedBoundaryId = t2.route.id), v.createElement(pt.Provider, { value: e4 }, n2);
}
function Lt(e4, t2 = [], n2) {
  let r2 = n2?.state;
  if (e4 == null) {
    if (!r2) return null;
    if (r2.errors) e4 = r2.matches;
    else if (t2.length === 0 && !r2.initialized && r2.matches.length > 0) e4 = r2.matches;
    else return null;
  }
  let i2 = e4, a2 = r2?.errors;
  if (a2 != null) {
    let e5 = i2.findIndex((e6) => e6.route.id && a2?.[e6.route.id] !== void 0);
    w(e5 >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(a2).join(`,`)}`), i2 = i2.slice(0, Math.min(i2.length, e5 + 1));
  }
  let o2 = false, s2 = -1;
  if (n2 && r2) {
    o2 = r2.renderFallback;
    for (let e5 = 0; e5 < i2.length; e5++) {
      let t3 = i2[e5];
      if ((t3.route.HydrateFallback || t3.route.hydrateFallbackElement) && (s2 = e5), t3.route.id) {
        let { loaderData: e6, errors: a3 } = r2, c3 = t3.route.loader && !e6.hasOwnProperty(t3.route.id) && (!a3 || a3[t3.route.id] === void 0);
        if (t3.route.lazy || c3) {
          n2.isStatic && (o2 = true), i2 = s2 >= 0 ? i2.slice(0, s2 + 1) : [i2[0]];
          break;
        }
      }
    }
  }
  let c2 = n2?.onError, l2 = r2 && c2 ? (e5, t3) => {
    c2(e5, { location: r2.location, params: r2.matches?.[0]?.params ?? {}, pattern: Ke(r2.matches), errorInfo: t3 });
  } : void 0;
  return i2.reduceRight((e5, n3, c3) => {
    let u2, d2 = false, f2 = null, p2 = null;
    r2 && (u2 = a2 && n3.route.id ? a2[n3.route.id] : void 0, f2 = n3.route.errorElement || Mt, o2 && (s2 < 0 && c3 === 0 ? (qt(`route-fallback`, false, "No `HydrateFallback` element provided to render during initial hydration"), d2 = true, p2 = null) : s2 === c3 && (d2 = true, p2 = n3.route.hydrateFallbackElement || null)));
    let m2 = t2.concat(i2.slice(0, c3 + 1)), h2 = () => {
      let t3;
      return t3 = u2 ? f2 : d2 ? p2 : n3.route.Component ? v.createElement(n3.route.Component, null) : n3.route.element ? n3.route.element : e5, v.createElement(It, { match: n3, routeContext: { outlet: e5, matches: m2, isDataRoute: r2 != null }, children: t3 });
    };
    return r2 && (n3.route.ErrorBoundary || n3.route.errorElement || c3 === 0) ? v.createElement(Nt, { location: r2.location, revalidation: r2.revalidation, component: f2, error: u2, children: h2(), routeContext: { outlet: null, matches: m2, isDataRoute: true }, onError: l2 }) : h2();
  }, null);
}
function Rt(e4) {
  return `${e4} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function zt(e4) {
  let t2 = v.useContext(it);
  return w(t2, Rt(e4)), t2;
}
function Bt(e4) {
  let t2 = v.useContext(at);
  return w(t2, Rt(e4)), t2;
}
function Vt(e4) {
  let t2 = v.useContext(pt);
  return w(t2, Rt(e4)), t2;
}
function Ht(e4) {
  let t2 = Vt(e4), n2 = t2.matches[t2.matches.length - 1];
  return w(n2.route.id, `${e4} can only be used on routes that contain a unique "id"`), n2.route.id;
}
function Ut() {
  return Ht(`useRouteId`);
}
function Wt() {
  let e4 = v.useContext(mt), t2 = Bt(`useRouteError`), n2 = Ht(`useRouteError`);
  return e4 === void 0 ? t2.errors?.[n2] : e4;
}
function Gt() {
  let { router: e4 } = zt(`useNavigate`), t2 = Ht(`useNavigate`), n2 = v.useRef(false);
  return wt(() => {
    n2.current = true;
  }), v.useCallback(async (r2, i2 = {}) => {
    T(n2.current, Ct), n2.current && (typeof r2 == `number` ? await e4.navigate(r2) : await e4.navigate(r2, { fromRouteId: t2, ...i2 }));
  }, [e4, t2]);
}
var Kt = {};
function qt(e4, t2, n2) {
  !t2 && !Kt[e4] && (Kt[e4] = true, T(false, n2));
}
v.memo(Jt);
function Jt({ routes: e4, manifest: t2, future: n2, state: r2, isStatic: i2, onError: a2 }) {
  return At(e4, void 0, { manifest: t2, state: r2, isStatic: i2, onError: a2, future: n2 });
}
function Yt(e4) {
  w(false, `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`);
}
function Xt({ basename: e4 = `/`, children: t2 = null, location: n2, navigationType: r2 = `POP`, navigator: i2, static: a2 = false, useTransitions: o2 }) {
  w(!xt(), `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);
  let s2 = e4.replace(/^\/*/, `/`), c2 = v.useMemo(() => ({ basename: s2, navigator: i2, static: a2, useTransitions: o2, future: {} }), [s2, i2, a2, o2]);
  typeof n2 == `string` && (n2 = de(n2));
  let { pathname: l2 = `/`, search: u2 = ``, hash: d2 = ``, state: f2 = null, key: p2 = `default`, mask: m2 } = n2, h2 = v.useMemo(() => {
    let e5 = je(l2, s2);
    return e5 == null ? null : { location: { pathname: e5, search: u2, hash: d2, state: f2, key: p2, mask: m2 }, navigationType: r2 };
  }, [s2, l2, u2, d2, f2, p2, r2, m2]);
  return T(h2 != null, `<Router basename="${s2}"> is not able to match the URL "${l2}${u2}${d2}" because it does not start with the basename, so the <Router> won't render anything.`), h2 == null ? null : v.createElement(dt.Provider, { value: c2 }, v.createElement(ft.Provider, { children: t2, value: h2 }));
}
function Zt({ children: e4, location: t2 }) {
  return kt(Qt(e4), t2);
}
v.Component;
function Qt(e4, t2 = []) {
  let n2 = [];
  return v.Children.forEach(e4, (e5, r2) => {
    if (!v.isValidElement(e5)) return;
    let i2 = [...t2, r2];
    if (e5.type === v.Fragment) {
      n2.push.apply(n2, Qt(e5.props.children, i2));
      return;
    }
    w(e5.type === Yt, `[${typeof e5.type == `string` ? e5.type : e5.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`), w(!e5.props.index || !e5.props.children, `An index route cannot have child routes.`);
    let a2 = { id: e5.props.id || i2.join(`-`), caseSensitive: e5.props.caseSensitive, element: e5.props.element, Component: e5.props.Component, index: e5.props.index, path: e5.props.path, middleware: e5.props.middleware, loader: e5.props.loader, action: e5.props.action, hydrateFallbackElement: e5.props.hydrateFallbackElement, HydrateFallback: e5.props.HydrateFallback, errorElement: e5.props.errorElement, ErrorBoundary: e5.props.ErrorBoundary, hasErrorBoundary: e5.props.hasErrorBoundary === true || e5.props.ErrorBoundary != null || e5.props.errorElement != null, shouldRevalidate: e5.props.shouldRevalidate, handle: e5.props.handle, lazy: e5.props.lazy };
    e5.props.children && (a2.children = Qt(e5.props.children, i2)), n2.push(a2);
  }), n2;
}
var $t = `get`, en = `application/x-www-form-urlencoded`;
function tn(e4) {
  return typeof HTMLElement < `u` && e4 instanceof HTMLElement;
}
function k(e4) {
  return tn(e4) && e4.tagName.toLowerCase() === `button`;
}
function nn(e4) {
  return tn(e4) && e4.tagName.toLowerCase() === `form`;
}
function rn(e4) {
  return tn(e4) && e4.tagName.toLowerCase() === `input`;
}
function an(e4) {
  return !!(e4.metaKey || e4.altKey || e4.ctrlKey || e4.shiftKey);
}
function on(e4, t2) {
  return e4.button === 0 && (!t2 || t2 === `_self`) && !an(e4);
}
var sn = null;
function cn() {
  if (sn === null) try {
    new FormData(document.createElement(`form`), 0), sn = false;
  } catch {
    sn = true;
  }
  return sn;
}
var ln = /* @__PURE__ */ new Set([`application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`]);
function un(e4) {
  return e4 != null && !ln.has(e4) ? (T(false, `"${e4}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${en}"`), null) : e4;
}
function dn(e4, t2) {
  let n2, r2, i2, a2, o2;
  if (nn(e4)) {
    let o3 = e4.getAttribute(`action`);
    r2 = o3 ? je(o3, t2) : null, n2 = e4.getAttribute(`method`) || $t, i2 = un(e4.getAttribute(`enctype`)) || en, a2 = new FormData(e4);
  } else if (k(e4) || rn(e4) && (e4.type === `submit` || e4.type === `image`)) {
    let o3 = e4.form;
    if (o3 == null) throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);
    let s2 = e4.getAttribute(`formaction`) || o3.getAttribute(`action`);
    if (r2 = s2 ? je(s2, t2) : null, n2 = e4.getAttribute(`formmethod`) || o3.getAttribute(`method`) || $t, i2 = un(e4.getAttribute(`formenctype`)) || un(o3.getAttribute(`enctype`)) || en, a2 = new FormData(o3, e4), !cn()) {
      let { name: t3, type: n3, value: r3 } = e4;
      if (n3 === `image`) {
        let e5 = t3 ? `${t3}.` : ``;
        a2.append(`${e5}x`, `0`), a2.append(`${e5}y`, `0`);
      } else t3 && a2.append(t3, r3);
    }
  } else if (tn(e4)) throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);
  else n2 = $t, r2 = null, i2 = en, o2 = e4;
  return a2 && i2 === `text/plain` && (o2 = a2, a2 = void 0), { action: r2, method: n2.toLowerCase(), encType: i2, formData: a2, body: o2 };
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
function fn(e4, t2) {
  if (e4 === false || e4 == null) throw Error(t2);
}
function pn(e4, t2, n2, r2) {
  let i2 = typeof e4 == `string` ? new URL(e4, typeof window > `u` ? `server://singlefetch/` : window.location.origin) : e4;
  return i2.pathname = n2 ? i2.pathname.endsWith(`/`) ? `${i2.pathname}_.${r2}` : `${i2.pathname}.${r2}` : i2.pathname === `/` ? `_root.${r2}` : t2 && je(i2.pathname, t2) === `/` ? `${Be(t2)}/_root.${r2}` : `${Be(i2.pathname)}.${r2}`, i2;
}
async function mn(e4, t2) {
  if (e4.id in t2) return t2[e4.id];
  try {
    let n2 = await ne(() => import(e4.module), []);
    return t2[e4.id] = n2, n2;
  } catch (t3) {
    return console.error(`Error loading route module \`${e4.module}\`, reloading page...`), console.error(t3), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function hn(e4) {
  return e4 != null && typeof e4.page == `string`;
}
function gn(e4) {
  return e4 == null ? false : e4.href == null ? e4.rel === `preload` && typeof e4.imageSrcSet == `string` && typeof e4.imageSizes == `string` : typeof e4.rel == `string` && typeof e4.href == `string`;
}
async function _n(e4, t2, n2) {
  return Sn((await Promise.all(e4.map(async (e5) => {
    let r2 = t2.routes[e5.route.id];
    if (r2) {
      let e6 = await mn(r2, n2);
      return e6.links ? e6.links() : [];
    }
    return [];
  }))).flat(1).filter(gn).filter((e5) => e5.rel === `stylesheet` || e5.rel === `preload`).map((e5) => e5.rel === `stylesheet` ? { ...e5, rel: `prefetch`, as: `style` } : { ...e5, rel: `prefetch` }));
}
function vn(e4, t2, n2, r2, i2, a2) {
  let o2 = (e5, t3) => !n2[t3] || e5.route.id !== n2[t3].route.id, s2 = (e5, t3) => n2[t3].pathname !== e5.pathname || n2[t3].route.path?.endsWith(`*`) && n2[t3].params[`*`] !== e5.params[`*`];
  return a2 === `assets` ? t2.filter((e5, t3) => o2(e5, t3) || s2(e5, t3)) : a2 === `data` ? t2.filter((t3, a3) => {
    let c2 = r2.routes[t3.route.id];
    if (!c2 || !c2.hasLoader) return false;
    if (o2(t3, a3) || s2(t3, a3)) return true;
    if (t3.route.shouldRevalidate) {
      let r3 = t3.route.shouldRevalidate({ currentUrl: new URL(i2.pathname + i2.search + i2.hash, window.origin), currentParams: n2[0]?.params || {}, nextUrl: new URL(e4, window.origin), nextParams: t3.params, defaultShouldRevalidate: true });
      if (typeof r3 == `boolean`) return r3;
    }
    return true;
  }) : [];
}
function yn(e4, t2, { includeHydrateFallback: n2 } = {}) {
  return bn(e4.map((e5) => {
    let r2 = t2.routes[e5.route.id];
    if (!r2) return [];
    let i2 = [r2.module];
    return r2.clientActionModule && (i2 = i2.concat(r2.clientActionModule)), r2.clientLoaderModule && (i2 = i2.concat(r2.clientLoaderModule)), n2 && r2.hydrateFallbackModule && (i2 = i2.concat(r2.hydrateFallbackModule)), r2.imports && (i2 = i2.concat(r2.imports)), i2;
  }).flat(1));
}
function bn(e4) {
  return [...new Set(e4)];
}
function xn(e4) {
  let t2 = {}, n2 = Object.keys(e4).sort();
  for (let r2 of n2) t2[r2] = e4[r2];
  return t2;
}
function Sn(e4, t2) {
  let n2 = /* @__PURE__ */ new Set(), r2 = new Set(t2);
  return e4.reduce((e5, i2) => {
    if (t2 && !hn(i2) && i2.as === `script` && i2.href && r2.has(i2.href)) return e5;
    let a2 = JSON.stringify(xn(i2));
    return n2.has(a2) || (n2.add(a2), e5.push({ key: a2, link: i2 })), e5;
  }, []);
}
function Cn() {
  let e4 = v.useContext(it);
  return fn(e4, `You must render this element inside a <DataRouterContext.Provider> element`), e4;
}
function wn() {
  let e4 = v.useContext(at);
  return fn(e4, `You must render this element inside a <DataRouterStateContext.Provider> element`), e4;
}
var Tn = v.createContext(void 0);
Tn.displayName = `FrameworkContext`;
function En() {
  let e4 = v.useContext(Tn);
  return fn(e4, `You must render this element inside a <HydratedRouter> element`), e4;
}
function Dn(e4, t2) {
  let n2 = v.useContext(Tn), [r2, i2] = v.useState(false), [a2, o2] = v.useState(false), { onFocus: s2, onBlur: c2, onMouseEnter: l2, onMouseLeave: u2, onTouchStart: d2 } = t2, f2 = v.useRef(null);
  v.useEffect(() => {
    if (e4 === `render` && o2(true), e4 === `viewport`) {
      let e5 = new IntersectionObserver((e6) => {
        e6.forEach((e7) => {
          o2(e7.isIntersecting);
        });
      }, { threshold: 0.5 });
      return f2.current && e5.observe(f2.current), () => {
        e5.disconnect();
      };
    }
  }, [e4]), v.useEffect(() => {
    if (r2) {
      let e5 = setTimeout(() => {
        o2(true);
      }, 100);
      return () => {
        clearTimeout(e5);
      };
    }
  }, [r2]);
  let p2 = () => {
    i2(true);
  }, m2 = () => {
    i2(false), o2(false);
  };
  return n2 ? e4 === `intent` ? [a2, f2, { onFocus: On(s2, p2), onBlur: On(c2, m2), onMouseEnter: On(l2, p2), onMouseLeave: On(u2, m2), onTouchStart: On(d2, p2) }] : [a2, f2, {}] : [false, f2, {}];
}
function On(e4, t2) {
  return (n2) => {
    e4 && e4(n2), n2.defaultPrevented || t2(n2);
  };
}
function kn({ page: e4, ...t2 }) {
  let n2 = st(), { nonce: r2 } = En(), { router: i2 } = Cn(), a2 = v.useMemo(() => me(i2.routes, e4, i2.basename), [i2.routes, e4, i2.basename]);
  return a2 ? (t2.nonce == null && r2 && (t2 = { ...t2, nonce: r2 }), n2 ? v.createElement(jn, { page: e4, matches: a2, ...t2 }) : v.createElement(Mn, { page: e4, matches: a2, ...t2 })) : null;
}
function An(e4) {
  let { manifest: t2, routeModules: n2 } = En(), [r2, i2] = v.useState([]);
  return v.useEffect(() => {
    let r3 = false;
    return _n(e4, t2, n2).then((e5) => {
      r3 || i2(e5);
    }), () => {
      r3 = true;
    };
  }, [e4, t2, n2]), r2;
}
function jn({ page: e4, matches: t2, ...n2 }) {
  let r2 = St(), { future: i2 } = En(), { basename: a2 } = Cn(), o2 = v.useMemo(() => {
    if (e4 === r2.pathname + r2.search + r2.hash) return [];
    let n3 = pn(e4, a2, i2.v8_trailingSlashAwareDataRequests, `rsc`), o3 = false, s2 = [];
    for (let e5 of t2) typeof e5.route.shouldRevalidate == `function` ? o3 = true : s2.push(e5.route.id);
    return o3 && s2.length > 0 && n3.searchParams.set(`_routes`, s2.join(`,`)), [n3.pathname + n3.search];
  }, [a2, i2.v8_trailingSlashAwareDataRequests, e4, r2, t2]);
  return v.createElement(v.Fragment, null, o2.map((e5) => v.createElement(`link`, { key: e5, rel: `prefetch`, as: `fetch`, href: e5, ...n2 })));
}
function Mn({ page: e4, matches: t2, ...n2 }) {
  let r2 = St(), { future: i2, manifest: a2, routeModules: o2 } = En(), { basename: s2 } = Cn(), { loaderData: c2, matches: l2 } = wn(), u2 = v.useMemo(() => vn(e4, t2, l2, a2, r2, `data`), [e4, t2, l2, a2, r2]), d2 = v.useMemo(() => vn(e4, t2, l2, a2, r2, `assets`), [e4, t2, l2, a2, r2]), f2 = v.useMemo(() => {
    if (e4 === r2.pathname + r2.search + r2.hash) return [];
    let n3 = /* @__PURE__ */ new Set(), l3 = false;
    if (t2.forEach((e5) => {
      let t3 = a2.routes[e5.route.id];
      t3 && t3.hasLoader && (!u2.some((t4) => t4.route.id === e5.route.id) && e5.route.id in c2 && o2[e5.route.id]?.shouldRevalidate || t3.hasClientLoader ? l3 = true : n3.add(e5.route.id));
    }), n3.size === 0) return [];
    let d3 = pn(e4, s2, i2.v8_trailingSlashAwareDataRequests, `data`);
    return l3 && n3.size > 0 && d3.searchParams.set(`_routes`, t2.filter((e5) => n3.has(e5.route.id)).map((e5) => e5.route.id).join(`,`)), [d3.pathname + d3.search];
  }, [s2, i2.v8_trailingSlashAwareDataRequests, c2, r2, a2, u2, t2, e4, o2]), p2 = v.useMemo(() => yn(d2, a2), [d2, a2]), m2 = An(d2);
  return v.createElement(v.Fragment, null, f2.map((e5) => v.createElement(`link`, { key: e5, rel: `prefetch`, as: `fetch`, href: e5, ...n2 })), p2.map((e5) => v.createElement(`link`, { key: e5, rel: `modulepreload`, href: e5, ...n2 })), m2.map(({ key: e5, link: t3 }) => v.createElement(`link`, { key: e5, nonce: n2.nonce, ...t3, crossOrigin: t3.crossOrigin ?? n2.crossOrigin })));
}
function Nn(...e4) {
  return (t2) => {
    e4.forEach((e5) => {
      typeof e5 == `function` ? e5(t2) : e5 != null && (e5.current = t2);
    });
  };
}
v.Component;
var Pn = typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0;
try {
  Pn && (window.__reactRouterVersion = `7.18.4`);
} catch {
}
function Fn({ basename: e4, children: t2, useTransitions: n2, window: r2 }) {
  let i2 = v.useRef();
  i2.current ??= oe({ window: r2, v5Compat: true });
  let a2 = i2.current, [o2, s2] = v.useState({ action: a2.action, location: a2.location }), c2 = v.useCallback((e5) => {
    n2 === false ? s2(e5) : v.startTransition(() => s2(e5));
  }, [n2]);
  return v.useLayoutEffect(() => a2.listen(c2), [a2, c2]), v.createElement(Xt, { basename: e4, children: t2, location: o2.location, navigationType: o2.action, navigator: a2, useTransitions: n2 });
}
var A = v.forwardRef(function({ onClick: e4, discover: t2 = `render`, prefetch: n2 = `none`, relative: r2, reloadDocument: i2, replace: a2, mask: o2, state: s2, target: c2, to: l2, preventScrollReset: u2, viewTransition: d2, defaultShouldRevalidate: f2, ...p2 }, m2) {
  let { basename: h2, navigator: g2, useTransitions: _2 } = v.useContext(dt), y2 = typeof l2 == `string` && S.test(l2), b2 = Je(l2, h2);
  l2 = b2.to;
  let x2 = bt(l2, { relative: r2 }), ee2 = St(), te2 = null;
  if (o2) {
    let e5 = Le(o2, [], ee2.mask ? ee2.mask.pathname : `/`, true);
    h2 !== `/` && (e5.pathname = e5.pathname === `/` ? h2 : ze([h2, e5.pathname])), te2 = g2.createHref(e5);
  }
  let [ne2, re2, C2] = Dn(n2, p2), ie2 = Bn(l2, { replace: a2, mask: o2, state: s2, target: c2, preventScrollReset: u2, relative: r2, viewTransition: d2, defaultShouldRevalidate: f2, useTransitions: _2 });
  function ae2(t3) {
    e4 && e4(t3), t3.defaultPrevented || ie2(t3);
  }
  let oe2 = !(b2.isExternal || i2), w2 = v.createElement(`a`, { ...p2, ...C2, href: (oe2 ? te2 : void 0) || b2.absoluteURL || x2, onClick: oe2 ? ae2 : e4, ref: Nn(m2, re2), target: c2, "data-discover": !y2 && t2 === `render` ? `true` : void 0 });
  return ne2 && !y2 ? v.createElement(v.Fragment, null, w2, v.createElement(kn, { page: x2 })) : w2;
});
A.displayName = `Link`;
var In = v.forwardRef(function({ "aria-current": e4 = `page`, caseSensitive: t2 = false, className: n2 = ``, end: r2 = false, style: i2, to: a2, viewTransition: o2, children: s2, ...c2 }, l2) {
  let u2 = Ot(a2, { relative: c2.relative }), d2 = St(), f2 = v.useContext(at), { navigator: p2, basename: m2 } = v.useContext(dt), h2 = f2 != null && Gn(u2) && o2 === true, g2 = p2.encodeLocation ? p2.encodeLocation(u2).pathname : u2.pathname, _2 = d2.pathname, y2 = f2 && f2.navigation && f2.navigation.location ? f2.navigation.location.pathname : null;
  t2 || (_2 = _2.toLowerCase(), y2 = y2 ? y2.toLowerCase() : null, g2 = g2.toLowerCase()), y2 && m2 && (y2 = je(y2, m2) || y2);
  let b2 = g2 !== `/` && g2.endsWith(`/`) ? g2.length - 1 : g2.length, x2 = _2 === g2 || !r2 && _2.startsWith(g2) && _2.charAt(b2) === `/`, ee2 = y2 != null && (y2 === g2 || !r2 && y2.startsWith(g2) && y2.charAt(g2.length) === `/`), te2 = { isActive: x2, isPending: ee2, isTransitioning: h2 }, ne2 = x2 ? e4 : void 0, S2;
  S2 = typeof n2 == `function` ? n2(te2) : [n2, x2 ? `active` : null, ee2 ? `pending` : null, h2 ? `transitioning` : null].filter(Boolean).join(` `);
  let re2 = typeof i2 == `function` ? i2(te2) : i2;
  return v.createElement(A, { ...c2, "aria-current": ne2, className: S2, ref: l2, style: re2, to: a2, viewTransition: o2 }, typeof s2 == `function` ? s2(te2) : s2);
});
In.displayName = `NavLink`;
var Ln = v.forwardRef(({ discover: e4 = `render`, fetcherKey: t2, navigate: n2, reloadDocument: r2, replace: i2, state: a2, method: o2 = $t, action: s2, onSubmit: c2, relative: l2, preventScrollReset: u2, viewTransition: d2, defaultShouldRevalidate: f2, ...p2 }, m2) => {
  let { useTransitions: h2 } = v.useContext(dt), g2 = Un(), _2 = Wn(s2, { relative: l2 }), y2 = o2.toLowerCase() === `get` ? `get` : `post`, b2 = typeof s2 == `string` && S.test(s2);
  return v.createElement(`form`, { ref: m2, method: y2, action: _2, onSubmit: r2 ? c2 : (e5) => {
    if (c2 && c2(e5), e5.defaultPrevented) return;
    e5.preventDefault();
    let r3 = e5.nativeEvent.submitter, s3 = r3?.getAttribute(`formmethod`) || o2, p3 = () => g2(r3 || e5.currentTarget, { fetcherKey: t2, method: s3, navigate: n2, replace: i2, state: a2, relative: l2, preventScrollReset: u2, viewTransition: d2, defaultShouldRevalidate: f2 });
    h2 && n2 !== false ? v.startTransition(() => p3()) : p3();
  }, ...p2, "data-discover": !b2 && e4 === `render` ? `true` : void 0 });
});
Ln.displayName = `Form`;
function Rn(e4) {
  return `${e4} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function zn(e4) {
  let t2 = v.useContext(it);
  return w(t2, Rn(e4)), t2;
}
function Bn(e4, { target: t2, replace: n2, mask: r2, state: i2, preventScrollReset: a2, relative: o2, viewTransition: s2, defaultShouldRevalidate: c2, useTransitions: l2 } = {}) {
  let u2 = Tt(), d2 = St(), f2 = Ot(e4, { relative: o2 });
  return v.useCallback((p2) => {
    if (on(p2, t2)) {
      p2.preventDefault();
      let t3 = n2 === void 0 ? ue(d2) === ue(f2) : n2, m2 = () => u2(e4, { replace: t3, mask: r2, state: i2, preventScrollReset: a2, relative: o2, viewTransition: s2, defaultShouldRevalidate: c2 });
      l2 ? v.startTransition(() => m2()) : m2();
    }
  }, [d2, u2, f2, n2, r2, i2, t2, e4, a2, o2, s2, c2, l2]);
}
var Vn = 0, Hn = () => `__${String(++Vn)}__`;
function Un() {
  let { router: e4 } = zn(`useSubmit`), { basename: t2 } = v.useContext(dt), n2 = Ut(), r2 = e4.fetch, i2 = e4.navigate;
  return v.useCallback(async (e5, a2 = {}) => {
    let { action: o2, method: s2, encType: c2, formData: l2, body: u2 } = dn(e5, t2);
    if (a2.navigate === false) {
      let e6 = a2.fetcherKey || Hn();
      await r2(e6, n2, a2.action || o2, { defaultShouldRevalidate: a2.defaultShouldRevalidate, preventScrollReset: a2.preventScrollReset, formData: l2, body: u2, formMethod: a2.method || s2, formEncType: a2.encType || c2, flushSync: a2.flushSync });
    } else await i2(a2.action || o2, { defaultShouldRevalidate: a2.defaultShouldRevalidate, preventScrollReset: a2.preventScrollReset, formData: l2, body: u2, formMethod: a2.method || s2, formEncType: a2.encType || c2, replace: a2.replace, state: a2.state, fromRouteId: n2, flushSync: a2.flushSync, viewTransition: a2.viewTransition });
  }, [r2, i2, t2, n2]);
}
function Wn(e4, { relative: t2 } = {}) {
  let { basename: n2 } = v.useContext(dt), r2 = v.useContext(pt);
  w(r2, `useFormAction must be used inside a RouteContext`);
  let [i2] = r2.matches.slice(-1), a2 = { ...Ot(e4 || `.`, { relative: t2 }) }, o2 = St();
  if (e4 == null) {
    a2.search = o2.search;
    let e5 = new URLSearchParams(a2.search), t3 = e5.getAll(`index`);
    if (t3.some((e6) => e6 === ``)) {
      e5.delete(`index`), t3.filter((e6) => e6).forEach((t4) => e5.append(`index`, t4));
      let n3 = e5.toString();
      a2.search = n3 ? `?${n3}` : ``;
    }
  }
  return (!e4 || e4 === `.`) && i2.route.index && (a2.search = a2.search ? a2.search.replace(/^\?/, `?index&`) : `?index`), n2 !== `/` && (a2.pathname = a2.pathname === `/` ? n2 : ze([n2, a2.pathname])), ue(a2);
}
function Gn(e4, { relative: t2 } = {}) {
  let n2 = v.useContext(ct);
  w(n2 != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let { basename: r2 } = zn(`useViewTransitionState`), i2 = Ot(e4, { relative: t2 });
  if (!n2.isTransitioning) return false;
  let a2 = je(n2.currentLocation.pathname, r2) || n2.currentLocation.pathname, o2 = je(n2.nextLocation.pathname, r2) || n2.nextLocation.pathname;
  return Oe(i2.pathname, o2) != null || Oe(i2.pathname, a2) != null;
}
function Kn(e4, t2) {
  return function() {
    return e4.apply(t2, arguments);
  };
}
var { toString: qn } = Object.prototype, { getPrototypeOf: Jn } = Object, { iterator: Yn, toStringTag: Xn } = Symbol, Zn = (({ hasOwnProperty: e4 }) => (t2, n2) => e4.call(t2, n2))(Object.prototype), Qn = (e4) => typeof e4 == `string` && (e4 === `__proto__` || e4 === `constructor` || e4 === `prototype`), $n = (e4, t2, n2) => e4 === Object.prototype || !n2 && t2 === null, er = (e4) => {
  if (!Object.isExtensible(e4)) return false;
  let t2 = Object.getOwnPropertyNames(e4);
  return Object.getOwnPropertySymbols && t2.push(...Object.getOwnPropertySymbols(e4)), t2.every((t3) => {
    if (Qn(t3)) return false;
    let n2 = Object.getOwnPropertyDescriptor(e4, t3);
    return !!n2 && n2.configurable && n2.writable === true;
  });
}, tr = (e4, t2) => {
  let n2 = e4, r2 = [];
  for (; n2 != null; ) {
    if (r2.indexOf(n2) !== -1) return false;
    r2.push(n2);
    let i2 = Jn(n2);
    if ($n(n2, i2, n2 === e4)) return false;
    if (Zn(n2, t2)) return true;
    n2 = i2;
  }
  return false;
}, nr = (e4, t2) => e4 != null && tr(e4, t2) ? e4[t2] : void 0, rr = (e4) => {
  if (e4 == null || typeof e4 != `object` && typeof e4 != `function`) return e4;
  let t2 = Jn(e4);
  if (t2 === null && er(e4)) return e4;
  let n2 = /* @__PURE__ */ Object.create(null), r2 = /* @__PURE__ */ Object.create(null), i2 = [], a2 = e4;
  for (; a2 != null && i2.indexOf(a2) === -1; ) {
    i2.push(a2);
    let o2 = a2 === e4 ? t2 : Jn(a2);
    if ($n(a2, o2, a2 === e4)) break;
    let s2 = Object.getOwnPropertyNames(a2);
    Object.getOwnPropertySymbols && s2.push(...Object.getOwnPropertySymbols(a2));
    for (let t3 of s2) Qn(t3) || Zn(r2, t3) || (n2[t3] = e4[t3], r2[t3] = true);
    a2 = o2;
  }
  return n2;
}, ir = /* @__PURE__ */ ((e4) => (t2) => {
  let n2 = qn.call(t2);
  return e4[n2] || (e4[n2] = n2.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ar = (e4) => (e4 = e4.toLowerCase(), (t2) => ir(t2) === e4), or = (e4) => (t2) => typeof t2 === e4, { isArray: sr } = Array, cr = or(`undefined`);
function lr(e4) {
  return e4 !== null && !cr(e4) && e4.constructor !== null && !cr(e4.constructor) && pr(e4.constructor.isBuffer) && e4.constructor.isBuffer(e4);
}
var ur = ar(`ArrayBuffer`);
function dr(e4) {
  let t2;
  return t2 = typeof ArrayBuffer < `u` && ArrayBuffer.isView ? ArrayBuffer.isView(e4) : e4 && e4.buffer && ur(e4.buffer), t2;
}
var fr = or(`string`), pr = or(`function`), mr = or(`number`), hr = (e4) => typeof e4 == `object` && !!e4, gr = (e4) => e4 === true || e4 === false, _r = (e4) => {
  if (!hr(e4)) return false;
  let t2 = Jn(e4);
  return (t2 === null || t2 === Object.prototype || Jn(t2) === null) && !tr(e4, Xn) && !tr(e4, Yn);
}, vr = (e4) => {
  if (!hr(e4) || lr(e4)) return false;
  try {
    return Object.keys(e4).length === 0 && Object.getPrototypeOf(e4) === Object.prototype;
  } catch {
    return false;
  }
}, yr = ar(`Date`), br = ar(`File`), xr = (e4) => !!(e4 && e4.uri !== void 0), Sr = (e4) => e4 && e4.getParts !== void 0, Cr = ar(`Blob`), wr = ar(`FileList`), Tr = ar(`Set`), Er = (e4) => hr(e4) && pr(e4.pipe);
function Dr() {
  return typeof globalThis < `u` ? globalThis : typeof self < `u` ? self : typeof window < `u` ? window : typeof global < `u` ? global : {};
}
var Or = Dr(), kr = Or.FormData === void 0 ? void 0 : Or.FormData, Ar = (e4) => {
  if (!e4) return false;
  if (kr && e4 instanceof kr) return true;
  let t2 = Jn(e4);
  if (!t2 || t2 === Object.prototype || !pr(e4.append)) return false;
  let n2 = ir(e4);
  return n2 === `formdata` || n2 === `object` && pr(e4.toString) && e4.toString() === `[object FormData]`;
}, jr = ar(`URLSearchParams`), [Mr, Nr, Pr, Fr] = [`ReadableStream`, `Request`, `Response`, `Headers`].map(ar), Ir = (e4) => e4.trim ? e4.trim() : e4.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ``);
function Lr(e4, t2, { allOwnKeys: n2 = false } = {}) {
  if (e4 == null) return;
  let r2, i2;
  if (typeof e4 != `object` && (e4 = [e4]), sr(e4)) for (r2 = 0, i2 = e4.length; r2 < i2; r2++) t2.call(null, e4[r2], r2, e4);
  else {
    if (lr(e4)) return;
    let i3 = n2 ? Object.getOwnPropertyNames(e4) : Object.keys(e4), a2 = i3.length, o2;
    for (r2 = 0; r2 < a2; r2++) o2 = i3[r2], t2.call(null, e4[o2], o2, e4);
  }
}
function Rr(e4, t2) {
  if (lr(e4)) return null;
  t2 = t2.toLowerCase();
  let n2 = Object.keys(e4), r2 = n2.length, i2;
  for (; r2-- > 0; ) if (i2 = n2[r2], t2 === i2.toLowerCase()) return i2;
  return null;
}
var zr = typeof globalThis < `u` ? globalThis : typeof self < `u` ? self : typeof window < `u` ? window : global, Br = (e4) => !cr(e4) && e4 !== zr;
function Vr(...e4) {
  let { caseless: t2, skipUndefined: n2 } = Br(this) && this || {}, r2 = {}, i2 = (e5, i3) => {
    if (i3 === `__proto__` || i3 === `constructor` || i3 === `prototype`) return;
    let a2 = t2 && typeof i3 == `string` && Rr(r2, i3) || i3, o2 = Zn(r2, a2) ? r2[a2] : void 0;
    _r(o2) && _r(e5) ? r2[a2] = Vr(o2, e5) : _r(e5) ? r2[a2] = Vr({}, e5) : sr(e5) ? r2[a2] = e5.slice() : (!n2 || !cr(e5)) && (r2[a2] = e5);
  };
  for (let t3 = 0, n3 = e4.length; t3 < n3; t3++) {
    let n4 = e4[t3];
    if (!n4 || lr(n4) || (Lr(n4, i2), typeof n4 != `object` || sr(n4))) continue;
    let r3 = Object.getOwnPropertySymbols(n4);
    for (let e5 = 0; e5 < r3.length; e5++) {
      let t4 = r3[e5];
      $r.call(n4, t4) && i2(n4[t4], t4);
    }
  }
  return r2;
}
var Hr = (e4, t2, n2, { allOwnKeys: r2 } = {}) => (Lr(t2, (t3, r3) => {
  n2 && pr(t3) ? Object.defineProperty(e4, r3, { __proto__: null, value: Kn(t3, n2), writable: true, enumerable: true, configurable: true }) : Object.defineProperty(e4, r3, { __proto__: null, value: t3, writable: true, enumerable: true, configurable: true });
}, { allOwnKeys: r2 }), e4), Ur = (e4) => (e4.charCodeAt(0) === 65279 && (e4 = e4.slice(1)), e4), Wr = (e4, t2, n2, r2) => {
  e4.prototype = Object.create(t2.prototype, r2), Object.defineProperty(e4.prototype, "constructor", { __proto__: null, value: e4, writable: true, enumerable: false, configurable: true }), Object.defineProperty(e4, "super", { __proto__: null, value: t2.prototype }), n2 && Object.assign(e4.prototype, n2);
}, Gr = (e4, t2, n2, r2) => {
  let i2, a2, o2, s2 = {};
  if (t2 ||= {}, e4 == null) return t2;
  do {
    for (i2 = Object.getOwnPropertyNames(e4), a2 = i2.length; a2-- > 0; ) o2 = i2[a2], (!r2 || r2(o2, e4, t2)) && !s2[o2] && (t2[o2] = e4[o2], s2[o2] = true);
    e4 = n2 !== false && Jn(e4);
  } while (e4 && (!n2 || n2(e4, t2)) && e4 !== Object.prototype);
  return t2;
}, Kr = (e4, t2, n2) => {
  e4 = String(e4), (n2 === void 0 || n2 > e4.length) && (n2 = e4.length), n2 -= t2.length;
  let r2 = e4.indexOf(t2, n2);
  return r2 !== -1 && r2 === n2;
}, qr = (e4) => {
  if (!e4) return null;
  if (sr(e4)) return e4;
  let t2 = e4.length;
  if (!mr(t2)) return null;
  let n2 = Array(t2);
  for (; t2-- > 0; ) n2[t2] = e4[t2];
  return n2;
}, Jr = /* @__PURE__ */ ((e4) => (t2) => e4 && t2 instanceof e4)(typeof Uint8Array < `u` && Jn(Uint8Array)), Yr = (e4, t2) => {
  let n2 = (e4 && e4[Yn]).call(e4), r2;
  for (; (r2 = n2.next()) && !r2.done; ) {
    let n3 = r2.value;
    t2.call(e4, n3[0], n3[1]);
  }
}, Xr = (e4, t2) => {
  let n2, r2 = [];
  for (; (n2 = e4.exec(t2)) !== null; ) r2.push(n2);
  return r2;
}, Zr = ar(`HTMLFormElement`), Qr = (e4) => e4.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e5, t2, n2) {
  return t2.toUpperCase() + n2;
}), { propertyIsEnumerable: $r } = Object.prototype, ei = ar(`RegExp`), ti = (e4, t2) => {
  let n2 = Object.getOwnPropertyDescriptors(e4), r2 = {};
  Lr(n2, (n3, i2) => {
    let a2;
    (a2 = t2(n3, i2, e4)) !== false && (r2[i2] = a2 || n3);
  }), Object.defineProperties(e4, r2);
}, ni = (e4) => {
  ti(e4, (t2, n2) => {
    if (pr(e4) && [`arguments`, `caller`, `callee`].includes(n2)) return false;
    let r2 = e4[n2];
    if (pr(r2)) {
      if (t2.enumerable = false, `writable` in t2) {
        t2.writable = false;
        return;
      }
      t2.set ||= () => {
        throw Error(`Can not rewrite read-only method '` + n2 + `'`);
      };
    }
  });
}, ri = (e4, t2) => {
  let n2 = {}, r2 = (e5) => {
    e5.forEach((e6) => {
      n2[e6] = true;
    });
  };
  return sr(e4) ? r2(e4) : r2(String(e4).split(t2)), n2;
}, ii = () => {
}, ai = (e4, t2) => e4 != null && Number.isFinite(e4 = +e4) ? e4 : t2;
function oi(e4) {
  return !!(e4 && pr(e4.append) && e4[Xn] === `FormData` && e4[Yn]);
}
var si = (e4) => {
  let t2 = /* @__PURE__ */ new WeakSet(), n2 = (e5) => {
    if (hr(e5)) {
      if (t2.has(e5)) return;
      if (lr(e5)) return e5;
      if (!(`toJSON` in e5)) {
        t2.add(e5);
        let r2;
        if (Tr(e5)) {
          r2 = [];
          for (let t3 of e5) {
            let e6 = n2(t3);
            !cr(e6) && r2.push(e6);
          }
        } else r2 = sr(e5) ? [] : {}, Lr(e5, (e6, t3) => {
          let i2 = n2(e6);
          !cr(i2) && (r2[t3] = i2);
        });
        return t2.delete(e5), r2;
      }
    }
    return e5;
  };
  return n2(e4);
}, ci = ar(`AsyncFunction`), li = (e4) => e4 && (hr(e4) || pr(e4)) && pr(e4.then) && pr(e4.catch), ui = ((e4, t2) => e4 ? setImmediate : t2 ? ((e5, t3) => (zr.addEventListener(`message`, ({ source: n2, data: r2 }) => {
  n2 === zr && r2 === e5 && t3.length && t3.shift()();
}, false), (n2) => {
  t3.push(n2), zr.postMessage(e5, `*`);
}))(`axios@${Math.random()}`, []) : (e5) => setTimeout(e5))(typeof setImmediate == `function`, pr(zr.postMessage)), di = typeof queueMicrotask < `u` ? queueMicrotask.bind(zr) : typeof process < `u` && process.nextTick || ui, fi = (e4) => e4 != null && pr(e4[Yn]), j = { isArray: sr, isArrayBuffer: ur, isBuffer: lr, isFormData: Ar, isArrayBufferView: dr, isString: fr, isNumber: mr, isBoolean: gr, isObject: hr, isPlainObject: _r, isEmptyObject: vr, isReadableStream: Mr, isRequest: Nr, isResponse: Pr, isHeaders: Fr, isUndefined: cr, isDate: yr, isFile: br, isReactNativeBlob: xr, isReactNative: Sr, isBlob: Cr, isRegExp: ei, isFunction: pr, isStream: Er, isURLSearchParams: jr, isTypedArray: Jr, isFileList: wr, forEach: Lr, merge: Vr, extend: Hr, trim: Ir, stripBOM: Ur, inherits: Wr, toFlatObject: Gr, kindOf: ir, kindOfTest: ar, endsWith: Kr, toArray: qr, forEachEntry: Yr, matchAll: Xr, isHTMLForm: Zr, hasOwnProperty: Zn, hasOwnProp: Zn, hasOwnInPrototypeChain: tr, getSafeProp: nr, toSafeFlatObject: rr, reduceDescriptors: ti, freezeMethods: ni, toObjectSet: ri, toCamelCase: Qr, noop: ii, toFiniteNumber: ai, findKey: Rr, global: zr, isContextDefined: Br, isSpecCompliantForm: oi, toJSONObject: si, isAsyncFn: ci, isThenable: li, setImmediate: ui, asap: di, isIterable: fi, isSafeIterable: (e4) => e4 != null && tr(e4, Yn) && fi(e4) }, pi = j.toObjectSet([`age`, `authorization`, `content-length`, `content-type`, `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`, `last-modified`, `location`, `max-forwards`, `proxy-authorization`, `referer`, `retry-after`, `user-agent`]), mi = (e4) => {
  let t2 = {}, n2, r2, i2;
  return e4 && e4.split(`
`).forEach(function(e5) {
    i2 = e5.indexOf(`:`), n2 = e5.substring(0, i2).trim().toLowerCase(), r2 = e5.substring(i2 + 1).trim();
    let a2 = j.hasOwnProp(t2, n2);
    !n2 || a2 && j.hasOwnProp(pi, n2) || (n2 === `set-cookie` ? a2 ? t2[n2].push(r2) : t2[n2] = [r2] : t2[n2] = a2 ? t2[n2] + `, ` + r2 : r2);
  }), t2;
};
function hi(e4) {
  let t2 = 0, n2 = e4.length;
  for (; t2 < n2; ) {
    let n3 = e4.charCodeAt(t2);
    if (n3 !== 9 && n3 !== 32) break;
    t2 += 1;
  }
  for (; n2 > t2; ) {
    let t3 = e4.charCodeAt(n2 - 1);
    if (t3 !== 9 && t3 !== 32) break;
    --n2;
  }
  return t2 === 0 && n2 === e4.length ? e4 : e4.slice(t2, n2);
}
var gi = RegExp(`[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+`, `g`), _i = RegExp(`[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+`, `g`);
function vi(e4, t2) {
  return j.isArray(e4) ? e4.map((e5) => vi(e5, t2)) : hi(String(e4).replace(t2, ``));
}
var yi = (e4) => vi(e4, gi), bi = (e4) => vi(e4, _i);
function xi(e4) {
  let t2 = /* @__PURE__ */ Object.create(null);
  return j.forEach(e4.toJSON(), (e5, n2) => {
    t2[n2] = bi(e5);
  }), t2;
}
var Si = /* @__PURE__ */ Symbol(`internals`);
function Ci(e4) {
  return e4 && String(e4).trim().toLowerCase();
}
function wi(e4) {
  return e4 === false || e4 == null ? e4 : j.isArray(e4) ? e4.map(wi) : yi(String(e4));
}
function Ti(e4) {
  let t2 = /* @__PURE__ */ Object.create(null), n2 = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, r2;
  for (; r2 = n2.exec(e4); ) t2[r2[1]] = r2[2];
  return t2;
}
var Ei = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function Di(e4) {
  let t2 = 0, n2 = e4.length;
  for (; t2 < n2; ) {
    let n3 = e4.charCodeAt(t2);
    if (n3 !== 9 && n3 !== 32) break;
    t2 += 1;
  }
  for (; n2 > t2; ) {
    let t3 = e4.charCodeAt(n2 - 1);
    if (t3 !== 9 && t3 !== 32) break;
    --n2;
  }
  return t2 === 0 && n2 === e4.length ? e4 : e4.slice(t2, n2);
}
function Oi(e4) {
  let t2 = e4.length - 1;
  if (t2 < 1 || e4.charCodeAt(0) !== 34 || e4.charCodeAt(t2) !== 34) return e4;
  let n2 = ``;
  for (let r2 = 1; r2 < t2; r2++) {
    let i2 = e4.charCodeAt(r2);
    if (i2 === 34 || i2 === 92 && (r2 += 1, r2 >= t2)) return e4;
    n2 += e4[r2];
  }
  return n2;
}
function ki(e4) {
  let t2 = /* @__PURE__ */ Object.create(null), n2 = String(e4), r2 = 0, i2 = false, a2 = false;
  function o2(e5) {
    let i3 = Di(n2.slice(r2, e5)), a3 = i3.indexOf(`=`);
    if (a3 < 1) return;
    let o3 = Di(i3.slice(0, a3));
    if (!Ei.test(o3)) return;
    let s2 = o3.toLowerCase();
    if (s2 === `__proto__` || s2 === `constructor` || s2 === `prototype`) return;
    let c2 = Di(i3.slice(a3 + 1));
    t2[s2] = Oi(c2);
  }
  for (let e5 = 0; e5 < n2.length; e5++) {
    let t3 = n2.charCodeAt(e5);
    i2 ? a2 ? a2 = false : t3 === 92 ? a2 = true : t3 === 34 && (i2 = false) : t3 === 34 ? i2 = true : (t3 === 44 || t3 === 59) && (o2(e5), r2 = e5 + 1);
  }
  return o2(n2.length), t2;
}
var Ai = (e4) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e4.trim());
function ji(e4, t2, n2, r2, i2) {
  if (j.isFunction(r2)) return r2.call(this, t2, n2);
  if (i2 && (t2 = n2), j.isString(t2)) {
    if (j.isString(r2)) return t2.indexOf(r2) !== -1;
    if (j.isRegExp(r2)) return r2.test(t2);
  }
}
function Mi(e4) {
  return e4.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e5, t2, n2) => t2.toUpperCase() + n2);
}
function Ni(e4, t2) {
  let n2 = j.toCamelCase(` ` + t2);
  [`get`, `set`, `has`].forEach((r2) => {
    Object.defineProperty(e4, r2 + n2, { __proto__: null, value: function(e5, n3, i2) {
      return this[r2].call(this, t2, e5, n3, i2);
    }, configurable: true });
  });
}
var Pi = class {
  constructor(e4) {
    e4 && this.set(e4);
  }
  set(e4, t2, n2) {
    let r2 = this;
    function i2(e5, t3, n3) {
      let i3 = Ci(t3);
      if (!i3) return;
      let a3 = j.findKey(r2, i3);
      (!a3 || r2[a3] === void 0 || n3 === true || n3 === void 0 && r2[a3] !== false) && (r2[a3 || t3] = wi(e5));
    }
    let a2 = (e5, t3) => j.forEach(e5, (e6, n3) => i2(e6, n3, t3));
    if (j.isPlainObject(e4) || e4 instanceof this.constructor) a2(e4, t2);
    else if (j.isString(e4) && (e4 = e4.trim()) && !Ai(e4)) a2(mi(e4), t2);
    else if (j.isObject(e4) && j.isSafeIterable(e4)) {
      let n3 = /* @__PURE__ */ Object.create(null), r3, i3;
      for (let t3 of e4) {
        if (!j.isArray(t3)) throw TypeError(`Object iterator must return a key-value pair`);
        i3 = t3[0], j.hasOwnProp(n3, i3) ? (r3 = n3[i3], n3[i3] = j.isArray(r3) ? [...r3, t3[1]] : [r3, t3[1]]) : n3[i3] = t3[1];
      }
      a2(n3, t2);
    } else e4 != null && i2(t2, e4, n2);
    return this;
  }
  get(e4, t2) {
    if (e4 = Ci(e4), e4) {
      let n2 = j.findKey(this, e4);
      if (n2) {
        let e5 = this[n2];
        if (!t2) return e5;
        if (t2 === true) return Ti(e5);
        if (j.isFunction(t2)) return t2.call(this, e5, n2);
        if (j.isRegExp(t2)) return t2.exec(e5);
        throw TypeError(`parser must be boolean|regexp|function`);
      }
    }
  }
  has(e4, t2) {
    if (e4 = Ci(e4), e4) {
      let n2 = j.findKey(this, e4);
      return !(!n2 || this[n2] === void 0 || t2 && !ji(this, this[n2], n2, t2));
    }
    return false;
  }
  delete(e4, t2) {
    let n2 = this, r2 = false;
    function i2(e5) {
      if (e5 = Ci(e5), e5) {
        let i3 = j.findKey(n2, e5);
        i3 && (!t2 || ji(n2, n2[i3], i3, t2)) && (delete n2[i3], r2 = true);
      }
    }
    return j.isArray(e4) ? e4.forEach(i2) : i2(e4), r2;
  }
  clear(e4) {
    let t2 = Object.keys(this), n2 = t2.length, r2 = false;
    for (; n2--; ) {
      let i2 = t2[n2];
      (!e4 || ji(this, this[i2], i2, e4, true)) && (delete this[i2], r2 = true);
    }
    return r2;
  }
  normalize(e4) {
    let t2 = this, n2 = {};
    return j.forEach(this, (r2, i2) => {
      let a2 = j.findKey(n2, i2);
      if (a2) {
        t2[a2] = wi(r2), delete t2[i2];
        return;
      }
      let o2 = e4 ? Mi(i2) : String(i2).trim();
      o2 !== i2 && delete t2[i2], t2[o2] = wi(r2), n2[o2] = true;
    }), this;
  }
  concat(...e4) {
    return this.constructor.concat(this, ...e4);
  }
  toJSON(e4) {
    let t2 = /* @__PURE__ */ Object.create(null);
    return j.forEach(this, (n2, r2) => {
      n2 != null && n2 !== false && (t2[r2] = e4 && j.isArray(n2) ? n2.join(`, `) : n2);
    }), t2;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e4, t2]) => e4 + `: ` + t2).join(`
`);
  }
  getSetCookie() {
    let e4 = this.get(`set-cookie`);
    return j.isArray(e4) ? e4 : e4 == null || e4 === false ? [] : [e4];
  }
  get [Symbol.toStringTag]() {
    return `AxiosHeaders`;
  }
  static from(e4) {
    return e4 instanceof this ? e4 : new this(e4);
  }
  static parseParameters(e4) {
    return ki(e4);
  }
  static concat(e4, ...t2) {
    let n2 = new this(e4);
    return t2.forEach((e5) => n2.set(e5)), n2;
  }
  static accessor(e4) {
    let t2 = (this[Si] = this[Si] = { accessors: {} }).accessors, n2 = this.prototype;
    function r2(e5) {
      let r3 = Ci(e5);
      t2[r3] || (Ni(n2, e5), t2[r3] = true);
    }
    return j.isArray(e4) ? e4.forEach(r2) : r2(e4), this;
  }
};
Pi.accessor([`Content-Type`, `Content-Length`, `Accept`, `Accept-Encoding`, `User-Agent`, `Authorization`]), j.reduceDescriptors(Pi.prototype, ({ value: e4 }, t2) => {
  let n2 = t2[0].toUpperCase() + t2.slice(1);
  return { get: () => e4, set(e5) {
    this[n2] = e5;
  } };
}), j.freezeMethods(Pi);
var Fi = `[REDACTED ****]`;
function Ii(e4) {
  if (j.hasOwnProp(e4, `toJSON`)) return true;
  let t2 = Object.getPrototypeOf(e4);
  for (; t2 && t2 !== Object.prototype; ) {
    if (j.hasOwnProp(t2, `toJSON`)) return true;
    t2 = Object.getPrototypeOf(t2);
  }
  return false;
}
function Li(e4, t2) {
  let n2 = new Set(t2.map((e5) => String(e5).toLowerCase())), r2 = [], i2 = (e5) => {
    if (typeof e5 != `object` || !e5 || j.isBuffer(e5)) return e5;
    if (r2.indexOf(e5) !== -1) return;
    e5 instanceof Pi && (e5 = e5.toJSON()), r2.push(e5);
    let t3;
    if (j.isArray(e5)) t3 = [], e5.forEach((e6, n3) => {
      let r3 = i2(e6);
      j.isUndefined(r3) || (t3[n3] = r3);
    });
    else {
      if (!j.isPlainObject(e5) && Ii(e5)) return r2.pop(), e5;
      t3 = /* @__PURE__ */ Object.create(null);
      for (let [r3, a2] of Object.entries(e5)) {
        let e6 = n2.has(r3.toLowerCase()) ? Fi : i2(a2);
        j.isUndefined(e6) || (t3[r3] = e6);
      }
    }
    return r2.pop(), t3;
  };
  return i2(e4);
}
function Ri(e4) {
  try {
    return String(e4);
  } catch {
    return ``;
  }
}
function zi(e4) {
  return e4.errors.map((e5) => {
    try {
      return e5 && e5.message ? Ri(e5.message) : Ri(e5);
    } catch {
      return ``;
    }
  }).filter(Boolean).join(`; `) || e4.name || `AggregateError`;
}
var M = class e2 extends Error {
  static from(t2, n2, r2, i2, a2, o2) {
    let s2 = t2.message;
    !s2 && j.isArray(t2.errors) && t2.errors.length && (s2 = zi(t2));
    let c2 = new e2(s2, n2 || t2.code, r2, i2, a2);
    return Object.defineProperty(c2, "cause", { __proto__: null, value: t2, writable: true, enumerable: false, configurable: true }), c2.name = t2.name, t2.status != null && c2.status == null && (c2.status = t2.status), o2 && Object.assign(c2, o2), c2;
  }
  constructor(e4, t2, n2, r2, i2) {
    super(e4), Object.defineProperty(this, "message", { __proto__: null, value: e4, enumerable: true, writable: true, configurable: true }), this.name = `AxiosError`, this.isAxiosError = true, t2 && (this.code = t2), n2 && (this.config = n2), r2 && (this.request = r2), i2 && (this.response = i2, this.status = i2.status);
  }
  toJSON() {
    let e4 = this.config, t2 = e4 && j.hasOwnProp(e4, `redact`) ? e4.redact : void 0, n2 = j.isArray(t2) && t2.length > 0 ? Li(e4, t2) : j.toJSONObject(e4);
    return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: n2, code: this.code, status: this.status };
  }
};
M.ERR_BAD_OPTION_VALUE = `ERR_BAD_OPTION_VALUE`, M.ERR_BAD_OPTION = `ERR_BAD_OPTION`, M.ECONNABORTED = `ECONNABORTED`, M.ETIMEDOUT = `ETIMEDOUT`, M.ECONNREFUSED = `ECONNREFUSED`, M.ERR_NETWORK = `ERR_NETWORK`, M.ERR_FR_TOO_MANY_REDIRECTS = `ERR_FR_TOO_MANY_REDIRECTS`, M.ERR_DEPRECATED = `ERR_DEPRECATED`, M.ERR_BAD_RESPONSE = `ERR_BAD_RESPONSE`, M.ERR_BAD_REQUEST = `ERR_BAD_REQUEST`, M.ERR_CANCELED = `ERR_CANCELED`, M.ERR_NOT_SUPPORT = `ERR_NOT_SUPPORT`, M.ERR_INVALID_URL = `ERR_INVALID_URL`, M.ERR_FORM_DATA_DEPTH_EXCEEDED = `ERR_FORM_DATA_DEPTH_EXCEEDED`;
function Bi(e4) {
  return j.isPlainObject(e4) || j.isArray(e4);
}
function Vi(e4) {
  return j.endsWith(e4, `[]`) ? e4.slice(0, -2) : e4;
}
function Hi(e4, t2, n2) {
  return e4 ? e4.concat(t2).map(function(e5, t3) {
    return e5 = Vi(e5), !n2 && t3 ? `[` + e5 + `]` : e5;
  }).join(n2 ? `.` : ``) : t2;
}
function Ui(e4) {
  return j.isArray(e4) && !e4.some(Bi);
}
var Wi = j.toFlatObject(j, {}, null, function(e4) {
  return /^is[A-Z]/.test(e4);
});
function Gi(e4, t2, n2) {
  if (!j.isObject(e4)) throw TypeError(`target must be an object`);
  t2 ||= new FormData();
  let r2 = (e5, t3) => {
    let r3 = j.getSafeProp(n2, e5);
    return j.isUndefined(r3) ? t3 : r3;
  }, i2 = r2(`metaTokens`, true), a2 = r2(`visitor`) || h2, o2 = r2(`dots`, false), s2 = r2(`indexes`, false), c2 = r2(`Blob`) || typeof Blob < `u` && Blob, l2 = r2(`maxDepth`, 100), u2 = c2 && j.isSpecCompliantForm(t2), d2 = [];
  if (!j.isFunction(a2)) throw TypeError(`visitor must be a function`);
  function f2(e5) {
    if (e5 === null) return ``;
    if (j.isDate(e5)) return e5.toISOString();
    if (j.isBoolean(e5)) return e5.toString();
    if (!u2 && j.isBlob(e5)) throw new M(`Blob is not supported. Use a Buffer instead.`);
    if (j.isArrayBuffer(e5) || j.isTypedArray(e5)) {
      if (u2 && typeof c2 == `function`) return new c2([e5]);
      throw new M(`Blob is not supported. Use a Buffer instead.`, M.ERR_NOT_SUPPORT);
    }
    return e5;
  }
  function p2(e5) {
    if (e5 > l2) throw new M(`Object is too deeply nested (` + e5 + ` levels). Max depth: ` + l2, M.ERR_FORM_DATA_DEPTH_EXCEEDED);
  }
  function m2(e5, t3) {
    if (l2 === 1 / 0) return JSON.stringify(e5);
    let n3 = [];
    return JSON.stringify(e5, function(e6, r3) {
      if (!j.isObject(r3)) return r3;
      for (; n3.length && n3[n3.length - 1] !== this; ) n3.pop();
      return n3.push(r3), p2(t3 + n3.length - 1), r3;
    });
  }
  function h2(e5, n3, r3) {
    let a3 = e5;
    if (j.isReactNative(t2) && j.isReactNativeBlob(e5)) return t2.append(Hi(r3, n3, o2), f2(e5)), false;
    if (e5 && !r3 && typeof e5 == `object`) {
      if (j.endsWith(n3, `{}`)) n3 = i2 ? n3 : n3.slice(0, -2), e5 = m2(e5, 1);
      else if (j.isArray(e5) && Ui(e5) || (j.isFileList(e5) || j.endsWith(n3, `[]`)) && (a3 = j.toArray(e5))) return n3 = Vi(n3), a3.forEach(function(e6, r4) {
        !(j.isUndefined(e6) || e6 === null) && t2.append(s2 === true ? Hi([n3], r4, o2) : s2 === null ? n3 : n3 + `[]`, f2(e6));
      }), false;
    }
    return Bi(e5) ? true : (t2.append(Hi(r3, n3, o2), f2(e5)), false);
  }
  let g2 = Object.assign(Wi, { defaultVisitor: h2, convertValue: f2, isVisitable: Bi });
  function _2(e5, n3, r3 = 0) {
    if (!j.isUndefined(e5)) {
      if (p2(r3), d2.indexOf(e5) !== -1) throw Error(`Circular reference detected in ` + n3.join(`.`));
      d2.push(e5), j.forEach(e5, function(e6, i3) {
        (!(j.isUndefined(e6) || e6 === null) && a2.call(t2, e6, j.isString(i3) ? i3.trim() : i3, n3, g2)) === true && _2(e6, n3 ? n3.concat(i3) : [i3], r3 + 1);
      }), d2.pop();
    }
  }
  if (!j.isObject(e4)) throw TypeError(`data must be an object`);
  return _2(e4), t2;
}
function Ki(e4) {
  let t2 = { "!": `%21`, "'": `%27`, "(": `%28`, ")": `%29`, "~": `%7E`, "%20": `+` };
  return encodeURIComponent(e4).replace(/[!'()~]|%20/g, function(e5) {
    return t2[e5];
  });
}
function qi(e4, t2) {
  this._pairs = [], e4 && Gi(e4, this, t2);
}
var Ji = qi.prototype;
Ji.append = function(e4, t2) {
  this._pairs.push([e4, t2]);
}, Ji.toString = function(e4) {
  let t2 = e4 ? (t3) => e4.call(this, t3, Ki) : Ki;
  return this._pairs.map(function(e5) {
    return t2(e5[0]) + `=` + t2(e5[1]);
  }, ``).join(`&`);
};
function Yi(e4) {
  return encodeURIComponent(e4).replace(/%3A/gi, `:`).replace(/%24/g, `$`).replace(/%2C/gi, `,`).replace(/%20/g, `+`);
}
function Xi(e4, t2, n2) {
  if (!t2) return e4;
  e4 ||= ``;
  let r2 = j.isFunction(n2) ? { serialize: n2 } : n2, i2 = j.getSafeProp(r2, `encode`) || Yi, a2 = j.getSafeProp(r2, `serialize`), o2;
  if (o2 = a2 ? a2(t2, r2) : j.isURLSearchParams(t2) ? t2.toString() : new qi(t2, r2).toString(i2), o2) {
    let t3 = e4.indexOf(`#`);
    t3 !== -1 && (e4 = e4.slice(0, t3)), e4 += (e4.indexOf(`?`) === -1 ? `?` : `&`) + o2;
  }
  return e4;
}
var Zi = /* @__PURE__ */ Symbol(`internals`);
function Qi(e4) {
  return e4 ? e4.length : 0;
}
function $i(e4) {
  if (e4) for (; e4.length && e4[e4.length - 1] === null; ) e4.pop();
}
function ea(e4, t2) {
  let n2 = e4.handlers, r2 = Qi(n2);
  n2 === t2.handlersRef ? r2 !== t2.handlersLength && (r2 ? t2.handlerEntries.forEach(function(e5, r3) {
    n2[e5.index] !== e5.handler && t2.handlerEntries.delete(r3);
  }) : t2.handlerEntries.clear()) : (t2.handlersRef = n2, t2.handlerEntries.clear()), t2.handlersLength = r2;
}
var ta = class {
  constructor() {
    this.handlers = [], this[Zi] = { handlersRef: this.handlers, handlersLength: this.handlers.length, handlerEntries: /* @__PURE__ */ new Map(), iterationDepth: 0, nextId: 0 };
  }
  use(e4, t2, n2) {
    let r2 = { fulfilled: e4, rejected: t2, synchronous: n2 ? n2.synchronous : false, runWhen: n2 ? n2.runWhen : null }, i2 = this[Zi];
    this.handlers ??= [], ea(this, i2);
    let a2 = i2.nextId++;
    return this.handlers.push(r2), i2.handlerEntries.set(a2, { handler: r2, index: this.handlers.length - 1 }), i2.handlersLength = this.handlers.length, a2;
  }
  eject(e4) {
    let t2 = this[Zi];
    ea(this, t2);
    let n2 = t2.handlerEntries.get(e4);
    if (n2) {
      if (t2.handlerEntries.delete(e4), this.handlers[n2.index] !== n2.handler) return;
      this.handlers[n2.index] = null, t2.iterationDepth || ($i(this.handlers), t2.handlersLength = this.handlers.length);
    }
  }
  clear() {
    this.handlers && (this.handlers = [], ea(this, this[Zi]));
  }
  forEach(e4) {
    let t2 = this[Zi];
    ea(this, t2), t2.iterationDepth++;
    try {
      j.forEach(this.handlers, function(t3) {
        t3 !== null && e4(t3);
      });
    } finally {
      --t2.iterationDepth || (ea(this, t2), $i(this.handlers), t2.handlersLength = Qi(this.handlers));
    }
  }
}, na = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false, legacyInterceptorReqResOrdering: true, advertiseZstdAcceptEncoding: false, validateStatusUndefinedResolves: true }, ra = { isBrowser: true, classes: { URLSearchParams: typeof URLSearchParams < `u` ? URLSearchParams : qi, FormData: typeof FormData < `u` ? FormData : null, Blob: typeof Blob < `u` ? Blob : null }, protocols: [`http`, `https`, `file`, `blob`, `url`, `data`] }, ia = s({ hasBrowserEnv: () => aa, hasStandardBrowserEnv: () => sa, hasStandardBrowserWebWorkerEnv: () => ca, navigator: () => oa, origin: () => la }), aa = typeof window < `u` && typeof document < `u`, oa = typeof navigator == `object` && navigator || void 0, sa = aa && (!oa || [`ReactNative`, `NativeScript`, `NS`].indexOf(oa.product) < 0), ca = typeof WorkerGlobalScope < `u` && self instanceof WorkerGlobalScope && typeof self.importScripts == `function`, la = aa && window.location.href || `http://localhost`, N = { ...ia, ...ra };
function P(e4, t2) {
  return Gi(e4, new N.classes.URLSearchParams(), { visitor: function(e5, t3, n2, r2) {
    return N.isNode && j.isBuffer(e5) ? (this.append(t3, e5.toString(`base64`)), false) : r2.defaultVisitor.apply(this, arguments);
  }, ...t2 });
}
var F = 100;
function ua(e4) {
  if (e4 > F) throw new M(`FormData field is too deeply nested (` + e4 + ` levels). Max depth: ` + F, M.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
function da(e4) {
  let t2 = [], n2 = /[^.[\]]+|\[([^.[\]]*)]/g, r2;
  for (; (r2 = n2.exec(e4)) !== null; ) ua(t2.length), t2.push(r2[0] === `[]` ? `` : r2[1] || r2[0]);
  return t2;
}
function fa(e4) {
  let t2 = {}, n2 = Object.keys(e4), r2, i2 = n2.length, a2;
  for (r2 = 0; r2 < i2; r2++) a2 = n2[r2], t2[a2] = e4[a2];
  return t2;
}
function pa(e4) {
  function t2(e5, n2, r2, i2) {
    ua(i2);
    let a2 = e5[i2++];
    if (a2 === `__proto__`) return true;
    let o2 = Number.isFinite(+a2), s2 = i2 >= e5.length;
    return a2 = !a2 && j.isArray(r2) ? r2.length : a2, s2 ? (j.hasOwnProp(r2, a2) ? r2[a2] = j.isArray(r2[a2]) ? r2[a2].concat(n2) : [r2[a2], n2] : r2[a2] = n2, !o2) : ((!j.hasOwnProp(r2, a2) || !j.isObject(r2[a2])) && (r2[a2] = []), t2(e5, n2, r2[a2], i2) && j.isArray(r2[a2]) && (r2[a2] = fa(r2[a2])), !o2);
  }
  if (j.isFormData(e4) && j.isFunction(e4.entries)) {
    let n2 = {};
    return j.forEachEntry(e4, (e5, r2) => {
      t2(da(e5), r2, n2, 0);
    }), n2;
  }
  return null;
}
var ma = Object.freeze([`get`, `delete`, `head`, `options`, `post`, `put`, `patch`, `purge`, `link`, `unlink`, `query`]), ha = (e4, t2) => e4 != null && j.hasOwnProp(e4, t2) ? e4[t2] : void 0;
function ga(e4, t2, n2) {
  if (j.isString(e4)) try {
    return (t2 || JSON.parse)(e4), j.trim(e4);
  } catch (e5) {
    if (e5.name !== `SyntaxError`) throw e5;
  }
  return (n2 || JSON.stringify)(e4);
}
var _a = { transitional: na, adapter: [`xhr`, `http`, `fetch`], transformRequest: [function(e4, t2) {
  let n2 = t2.getContentType() || ``, r2 = n2.indexOf(`application/json`) > -1, i2 = j.isObject(e4);
  if (i2 && j.isHTMLForm(e4) && (e4 = new FormData(e4)), j.isFormData(e4)) return r2 ? JSON.stringify(pa(e4)) : e4;
  if (j.isArrayBuffer(e4) || j.isBuffer(e4) || j.isStream(e4) || j.isFile(e4) || j.isBlob(e4) || j.isReadableStream(e4)) return e4;
  if (j.isArrayBufferView(e4)) return e4.buffer;
  if (j.isURLSearchParams(e4)) return t2.setContentType(`application/x-www-form-urlencoded;charset=utf-8`, false), e4.toString();
  let a2;
  if (i2) {
    let t3 = ha(this, `formSerializer`);
    if (n2.indexOf(`application/x-www-form-urlencoded`) > -1) return P(e4, t3).toString();
    if ((a2 = j.isFileList(e4)) || n2.indexOf(`multipart/form-data`) > -1) {
      let n3 = ha(this, `env`), r3 = n3 && n3.FormData;
      return Gi(a2 ? { "files[]": e4 } : e4, r3 && new r3(), t3);
    }
  }
  return i2 || r2 ? (t2.setContentType(`application/json`, false), ga(e4)) : e4;
}], transformResponse: [function(e4) {
  let t2 = ha(this, `transitional`) || _a.transitional, n2 = t2 && t2.forcedJSONParsing, r2 = ha(this, `responseType`), i2 = r2 === `json`;
  if (j.isResponse(e4) || j.isReadableStream(e4)) return e4;
  if (e4 && j.isString(e4) && (n2 && !r2 || i2)) {
    let n3 = !(t2 && t2.silentJSONParsing) && i2;
    try {
      return JSON.parse(e4, ha(this, `parseReviver`));
    } catch (e5) {
      if (n3) throw e5.name === `SyntaxError` ? M.from(e5, M.ERR_BAD_RESPONSE, this, null, ha(this, `response`)) : e5;
    }
  }
  return e4;
}], timeout: 0, xsrfCookieName: `XSRF-TOKEN`, xsrfHeaderName: `X-XSRF-TOKEN`, maxContentLength: -1, maxBodyLength: -1, env: { FormData: N.classes.FormData, Blob: N.classes.Blob }, validateStatus: function(e4) {
  return e4 >= 200 && e4 < 300;
}, headers: { common: { Accept: `application/json, text/plain, */*`, "Content-Type": void 0 } } };
j.forEach(ma, (e4) => {
  _a.headers[e4] = {};
});
function va(e4, t2) {
  let n2 = this || _a, r2 = t2 || n2, i2 = Pi.from(r2.headers), a2 = r2.data;
  return j.forEach(e4, function(e5) {
    a2 = e5.call(n2, a2, i2.normalize(), t2 ? t2.status : void 0);
  }), i2.normalize(), a2;
}
function ya(e4) {
  return !!(e4 && e4.__CANCEL__);
}
var ba = class extends M {
  constructor(e4, t2, n2) {
    super(e4 ?? `canceled`, M.ERR_CANCELED, t2, n2), this.name = `CanceledError`, this.__CANCEL__ = true;
  }
};
function xa(e4, t2, n2) {
  let r2 = n2.config.validateStatus;
  !n2.status || !r2 || r2(n2.status) ? e4(n2) : t2(new M(`Request failed with status code ` + n2.status, n2.status >= 400 && n2.status < 500 ? M.ERR_BAD_REQUEST : M.ERR_BAD_RESPONSE, n2.config, n2.request, n2));
}
var Sa = /[\t\n\r]/g;
function Ca(e4) {
  if (typeof e4 != `string`) return e4;
  let t2 = 0;
  for (; t2 < e4.length && e4.charCodeAt(t2) <= 32; ) t2++;
  return e4.slice(t2).replace(Sa, ``);
}
function wa(e4) {
  let t2 = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e4);
  return t2 && t2[1] || ``;
}
function Ta(e4, t2) {
  e4 ||= 10;
  let n2 = Array(e4), r2 = Array(e4), i2 = 0, a2 = 0, o2;
  return t2 = t2 === void 0 ? 1e3 : t2, function(s2) {
    let c2 = Date.now(), l2 = r2[a2];
    o2 ||= c2, n2[i2] = s2, r2[i2] = c2;
    let u2 = a2, d2 = 0;
    for (; u2 !== i2; ) d2 += n2[u2++], u2 %= e4;
    if (i2 = (i2 + 1) % e4, i2 === a2 && (a2 = (a2 + 1) % e4), c2 - o2 < t2) return;
    let f2 = l2 && c2 - l2;
    return f2 ? Math.round(d2 * 1e3 / f2) : void 0;
  };
}
function Ea(e4, t2) {
  let n2 = 0, r2 = 1e3 / t2, i2, a2, o2 = (t3, r3 = Date.now()) => {
    n2 = r3, i2 = null, a2 &&= (clearTimeout(a2), null), e4(...t3);
  };
  return [(...e5) => {
    let t3 = Date.now(), s2 = t3 - n2;
    s2 >= r2 ? o2(e5, t3) : (i2 = e5, a2 ||= setTimeout(() => {
      a2 = null, o2(i2);
    }, r2 - s2));
  }, () => i2 && o2(i2), (...e5) => o2(e5)];
}
var Da = (e4, t2, n2 = 3) => {
  let r2 = 0, i2 = Ta(50, 250);
  return Ea((n3) => {
    if (!n3 || !j.isNumber(n3.loaded)) return;
    let a2 = n3.loaded, o2 = n3.lengthComputable ? n3.total : void 0, s2 = Math.max(0, o2 == null ? a2 : Math.min(a2, o2)), c2 = Math.max(0, s2 - r2), l2 = i2(c2);
    r2 = Math.max(r2, s2), e4({ loaded: s2, total: o2, progress: o2 ? s2 / o2 : void 0, bytes: c2, rate: l2 || void 0, estimated: l2 && o2 ? (o2 - s2) / l2 : void 0, event: n3, lengthComputable: o2 != null, [t2 ? `download` : `upload`]: true });
  }, n2);
}, Oa = (e4, t2) => {
  let n2 = e4 != null;
  return [(r2) => t2[0]({ lengthComputable: n2, total: e4, loaded: r2 }), t2[1]];
}, ka = (e4, t2 = j.asap) => (...n2) => t2(() => e4(...n2)), Aa = N.hasStandardBrowserEnv ? /* @__PURE__ */ ((e4, t2) => (n2) => (n2 = new URL(n2, N.origin), e4.protocol === n2.protocol && e4.host === n2.host && (t2 || e4.port === n2.port)))(new URL(N.origin), N.navigator && /(msie|trident)/i.test(N.navigator.userAgent)) : () => true, ja = N.hasStandardBrowserEnv ? { write(e4, t2, n2, r2, i2, a2, o2) {
  if (typeof document > `u`) return;
  let s2 = [`${e4}=${encodeURIComponent(t2)}`];
  j.isNumber(n2) && s2.push(`expires=${new Date(n2).toUTCString()}`), j.isString(r2) && s2.push(`path=${r2}`), j.isString(i2) && s2.push(`domain=${i2}`), a2 === true && s2.push(`secure`), j.isString(o2) && s2.push(`SameSite=${o2}`), document.cookie = s2.join(`; `);
}, read(e4) {
  if (typeof document > `u`) return null;
  let t2 = document.cookie.split(`;`);
  for (let n2 = 0; n2 < t2.length; n2++) {
    let r2 = t2[n2].replace(/^\s+/, ``), i2 = r2.indexOf(`=`);
    if (i2 !== -1 && r2.slice(0, i2) === e4) try {
      return decodeURIComponent(r2.slice(i2 + 1));
    } catch {
      return r2.slice(i2 + 1);
    }
  }
  return null;
}, remove(e4) {
  this.write(e4, ``, Date.now() - 864e5, `/`);
} } : { write() {
}, read() {
  return null;
}, remove() {
} };
function Ma(e4) {
  return typeof e4 == `string` && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e4);
}
function Na(e4, t2) {
  if (!t2) return e4;
  let n2 = e4.length;
  for (; n2 > 0 && e4.charCodeAt(n2 - 1) === 47; ) n2--;
  return e4.slice(0, n2) + `/` + t2.replace(/^\/+/, ``);
}
var Pa = /^https?:(?!\/\/)/i;
function Fa(e4) {
  return e4 && e4.replace(/(^|&)([^=&]*=)?[^&]+/g, (e5, t2, n2 = ``) => `${t2}${n2}${Fi}`);
}
function Ia(e4) {
  let t2 = e4.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${Fi}@`), n2 = t2.indexOf(`#`), r2 = (n2 === -1 ? t2 : t2.slice(0, n2)).replace(/([?&][^=&#]*=)[^&#]*/g, `$1${Fi}`);
  return n2 === -1 ? r2 : `${r2}#${Fa(t2.slice(n2 + 1))}`;
}
function La(e4, t2) {
  if (typeof e4 == `string`) {
    let n2 = Ca(e4);
    if (Pa.test(n2)) throw new M(`Invalid URL ${JSON.stringify(Ia(n2))}: missing "//" after protocol`, M.ERR_INVALID_URL, t2);
  }
}
function Ra(e4, t2, n2, r2) {
  La(t2, r2);
  let i2 = !Ma(t2);
  return e4 && (i2 || n2 === false) ? (La(e4, r2), Na(e4, t2)) : t2;
}
var za = (e4) => e4 instanceof Pi ? { ...e4 } : e4, Ba = (e4) => Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor ? Object.keys(e4).concat(Object.getOwnPropertySymbols(e4).filter((t2) => Object.getOwnPropertyDescriptor(e4, t2).enumerable)) : Object.keys(e4);
function Va(e4, t2) {
  e4 ||= {}, t2 ||= {};
  let n2 = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(n2, "hasOwnProperty", { __proto__: null, value: Object.prototype.hasOwnProperty, enumerable: false, writable: true, configurable: true });
  function r2(e5, t3, n3, r3) {
    return j.isPlainObject(e5) && j.isPlainObject(t3) ? j.merge.call({ caseless: r3 }, e5, t3) : j.isPlainObject(t3) ? j.merge({}, t3) : j.isArray(t3) ? t3.slice() : t3;
  }
  function i2(e5, t3, n3, i3) {
    if (!j.isUndefined(t3)) return r2(e5, t3, n3, i3);
    if (!j.isUndefined(e5)) return r2(void 0, e5, n3, i3);
  }
  function a2(e5, t3) {
    if (!j.isUndefined(t3)) return r2(void 0, t3);
  }
  function o2(e5, t3) {
    if (!j.isUndefined(t3)) return r2(void 0, t3);
    if (!j.isUndefined(e5)) return r2(void 0, e5);
  }
  function s2(n3) {
    let r3 = j.hasOwnProp(t2, `transitional`) ? t2.transitional : void 0;
    if (!j.isUndefined(r3)) {
      if (j.isPlainObject(r3)) {
        if (j.hasOwnProp(r3, n3)) return r3[n3];
      } else return;
    }
    let i3 = j.hasOwnProp(e4, `transitional`) ? e4.transitional : void 0;
    if (j.isPlainObject(i3) && j.hasOwnProp(i3, n3)) return i3[n3];
  }
  function c2(n3, i3, a3) {
    if (j.hasOwnProp(t2, a3)) return r2(n3, i3);
    if (j.hasOwnProp(e4, a3)) return r2(void 0, n3);
  }
  let l2 = { url: a2, method: a2, data: a2, baseURL: o2, transformRequest: o2, transformResponse: o2, paramsSerializer: o2, timeout: o2, timeoutErrorMessage: o2, withCredentials: o2, withXSRFToken: o2, adapter: o2, responseType: o2, xsrfCookieName: o2, xsrfHeaderName: o2, onUploadProgress: o2, onDownloadProgress: o2, decompress: o2, maxContentLength: o2, maxBodyLength: o2, beforeRedirect: o2, transport: o2, httpAgent: o2, httpsAgent: o2, cancelToken: o2, socketPath: o2, allowedSocketPaths: o2, responseEncoding: o2, validateStatus: c2, headers: (e5, t3, n3) => i2(za(e5), za(t3), n3, true) };
  return j.forEach(Ba({ ...e4, ...t2 }), function(r3) {
    if (r3 === `__proto__` || r3 === `constructor` || r3 === `prototype`) return;
    let a3 = j.hasOwnProp(l2, r3) ? l2[r3] : i2, o3 = a3(j.hasOwnProp(e4, r3) ? e4[r3] : void 0, j.hasOwnProp(t2, r3) ? t2[r3] : void 0, r3);
    j.isUndefined(o3) && a3 !== c2 || (n2[r3] = o3);
  }), j.hasOwnProp(t2, `validateStatus`) && j.isUndefined(t2.validateStatus) && s2(`validateStatusUndefinedResolves`) === false && (j.hasOwnProp(e4, `validateStatus`) ? n2.validateStatus = r2(void 0, e4.validateStatus) : delete n2.validateStatus), n2;
}
var Ha = [`content-type`, `content-length`];
function Ua(e4, t2, n2) {
  if (n2 !== `content-only`) {
    e4.set(t2);
    return;
  }
  Object.entries(t2 || {}).forEach(([t3, n3]) => {
    Ha.includes(t3.toLowerCase()) && e4.set(t3, n3);
  });
}
var Wa = (e4) => encodeURIComponent(e4).replace(/%([0-9A-F]{2})/gi, (e5, t2) => String.fromCharCode(parseInt(t2, 16)));
function Ga(e4) {
  let t2 = Va({}, e4), n2 = (e5) => j.hasOwnProp(t2, e5) ? t2[e5] : void 0, r2 = n2(`data`), i2 = n2(`withXSRFToken`), a2 = n2(`xsrfHeaderName`), o2 = n2(`xsrfCookieName`), s2 = n2(`headers`), c2 = n2(`auth`), l2 = n2(`baseURL`), u2 = n2(`allowAbsoluteUrls`), d2 = n2(`url`);
  if (t2.headers = s2 = Pi.from(s2), t2.url = Xi(Ra(l2, d2, u2, t2), n2(`params`), n2(`paramsSerializer`)), c2) {
    let t3 = j.getSafeProp(c2, `username`) || ``, n3 = j.getSafeProp(c2, `password`) || ``;
    try {
      s2.set(`Authorization`, `Basic ` + btoa(t3 + `:` + (n3 ? Wa(n3) : ``)));
    } catch (t4) {
      throw M.from(t4, M.ERR_BAD_OPTION_VALUE, e4);
    }
  }
  if (j.isFormData(r2)) {
    let e5 = j.getSafeProp(r2, `getHeaders`);
    N.hasStandardBrowserEnv || N.hasStandardBrowserWebWorkerEnv || j.isReactNative(r2) ? s2.setContentType(void 0) : j.isFunction(e5) && Ua(s2, e5.call(r2), n2(`formDataHeaderPolicy`));
  }
  if (N.hasStandardBrowserEnv && (j.isFunction(i2) && (i2 = i2(t2)), i2 === true || i2 == null && Aa(t2.url))) {
    let e5 = a2 && o2 && ja.read(o2);
    e5 && s2.set(a2, e5);
  }
  return t2;
}
var Ka = typeof XMLHttpRequest < `u` && function(e4) {
  return new Promise(function(t2, n2) {
    let r2 = Ga(e4), i2 = r2.data, a2 = Pi.from(r2.headers).normalize(), { responseType: o2, onUploadProgress: s2, onDownloadProgress: c2 } = r2, l2, u2, d2, f2, p2, m2;
    function h2() {
      f2 && f2(), p2 && p2(), r2.cancelToken && r2.cancelToken.unsubscribe(l2), r2.signal && r2.signal.removeEventListener(`abort`, l2);
    }
    let g2 = new XMLHttpRequest();
    g2.open(r2.method.toUpperCase(), r2.url, true), g2.timeout = r2.timeout;
    function _2(i3) {
      if (!g2) return;
      if (g2.status === 0 && (wa(Ca(r2.url)) || wa(N.origin)) !== `file` && !(g2.responseURL && g2.responseURL.startsWith(`file:`))) {
        n2(new M(`Request aborted`, M.ECONNABORTED, e4, g2)), h2(), g2 = null;
        return;
      }
      try {
        i3 ? m2 && m2(i3) : p2 && p2();
      } catch (e5) {
        setTimeout(() => {
          throw e5;
        });
      }
      if (!g2) return;
      let a3 = Pi.from(`getAllResponseHeaders` in g2 && g2.getAllResponseHeaders());
      xa(function(e5) {
        t2(e5), h2();
      }, function(e5) {
        n2(e5), h2();
      }, { data: !o2 || o2 === `text` || o2 === `json` ? g2.responseText : g2.response, status: g2.status, statusText: g2.statusText, headers: a3, config: e4, request: g2 }), g2 = null;
    }
    `onloadend` in g2 ? g2.onloadend = _2 : g2.onreadystatechange = function() {
      g2 && g2.readyState === 4 && (g2.status !== 0 || g2.responseURL && g2.responseURL.startsWith(`file:`)) && setTimeout(_2);
    }, g2.onabort = function() {
      g2 &&= (n2(new M(`Request aborted`, M.ECONNABORTED, e4, g2)), h2(), null);
    }, g2.onerror = function(t3) {
      let r3 = new M(t3 && t3.message ? t3.message : `Network Error`, M.ERR_NETWORK, e4, g2);
      r3.event = t3 || null, n2(r3), h2(), g2 = null;
    }, g2.ontimeout = function() {
      let t3 = r2.timeout ? `timeout of ` + r2.timeout + `ms exceeded` : `timeout exceeded`, i3 = r2.transitional || na;
      r2.timeoutErrorMessage && (t3 = r2.timeoutErrorMessage), n2(new M(t3, i3.clarifyTimeoutError ? M.ETIMEDOUT : M.ECONNABORTED, e4, g2)), h2(), g2 = null;
    }, i2 === void 0 && a2.setContentType(null), `setRequestHeader` in g2 && j.forEach(xi(a2), function(e5, t3) {
      g2.setRequestHeader(t3, e5);
    }), j.isUndefined(r2.withCredentials) || (g2.withCredentials = !!r2.withCredentials), o2 && o2 !== `json` && (g2.responseType = r2.responseType), c2 && ([d2, p2, m2] = Da(c2, true), g2.addEventListener(`progress`, d2)), s2 && g2.upload && ([u2, f2] = Da(s2), g2.upload.addEventListener(`progress`, u2), g2.upload.addEventListener(`loadend`, f2)), (r2.cancelToken || r2.signal) && (l2 = (t3) => {
      g2 &&= (n2(!t3 || t3.type ? new ba(null, e4, g2) : t3), g2.abort(), h2(), null);
    }, r2.cancelToken && r2.cancelToken.subscribe(l2), r2.signal && (r2.signal.aborted ? l2() : r2.signal.addEventListener(`abort`, l2)));
    let v2 = wa(r2.url);
    if (v2 && !N.protocols.includes(v2)) {
      n2(new M(`Unsupported protocol ` + v2 + `:`, M.ERR_BAD_REQUEST, e4)), h2();
      return;
    }
    g2.send(i2 || null);
  });
}, qa = (e4, t2) => {
  if (e4 = e4 ? e4.filter(Boolean) : [], !t2 && !e4.length) return;
  let n2 = new AbortController(), r2 = false, i2 = function(e5) {
    if (!r2) {
      r2 = true, o2();
      let t3 = e5 instanceof Error ? e5 : this.reason;
      n2.abort(t3 instanceof M ? t3 : new ba(t3 instanceof Error ? t3.message : t3));
    }
  }, a2 = t2 && setTimeout(() => {
    a2 = null, i2(new M(`timeout of ${t2}ms exceeded`, M.ETIMEDOUT));
  }, t2), o2 = () => {
    e4 &&= (a2 && clearTimeout(a2), a2 = null, e4.forEach((e5) => {
      e5.unsubscribe ? e5.unsubscribe(i2) : e5.removeEventListener(`abort`, i2);
    }), null);
  };
  e4.forEach((e5) => {
    if (!r2) {
      if (e5.aborted) {
        i2.call(e5);
        return;
      }
      e5.addEventListener(`abort`, i2, { once: true });
    }
  });
  let { signal: s2 } = n2;
  return s2.unsubscribe = () => j.asap(o2), s2;
}, Ja = function* (e4, t2) {
  let n2 = e4.byteLength;
  if (!t2 || n2 < t2) {
    yield e4;
    return;
  }
  let r2 = 0, i2;
  for (; r2 < n2; ) i2 = r2 + t2, yield e4.slice(r2, i2), r2 = i2;
}, Ya = async function* (e4, t2) {
  for await (let n2 of Xa(e4)) yield* Ja(n2, t2);
}, Xa = async function* (e4) {
  if (e4[Symbol.asyncIterator]) {
    yield* e4;
    return;
  }
  let t2 = e4.getReader();
  try {
    for (; ; ) {
      let { done: e5, value: n2 } = await t2.read();
      if (e5) break;
      yield n2;
    }
  } finally {
    await t2.cancel();
  }
}, Za = (e4, t2, n2, r2) => {
  let i2 = Ya(e4, t2), a2 = 0, o2, s2 = (e5) => {
    o2 || (o2 = true, r2 && r2(e5));
  };
  return new ReadableStream({ async pull(e5) {
    try {
      let { done: t3, value: r3 } = await i2.next();
      if (t3) {
        s2(), e5.close();
        return;
      }
      let o3 = r3.byteLength;
      n2 && n2(a2 += o3), e5.enqueue(new Uint8Array(r3));
    } catch (e6) {
      throw s2(e6), e6;
    }
  }, cancel(e5) {
    return s2(e5), i2.return();
  } }, { highWaterMark: 2 });
}, Qa = (e4) => e4 >= 48 && e4 <= 57 || e4 >= 65 && e4 <= 70 || e4 >= 97 && e4 <= 102, $a = (e4, t2, n2) => t2 + 2 < n2 && Qa(e4.charCodeAt(t2 + 1)) && Qa(e4.charCodeAt(t2 + 2)), eo = (e4) => e4 <= 57 ? e4 - 48 : (e4 & 223) - 55, to = (e4) => e4 >= 65 && e4 <= 90 || e4 >= 97 && e4 <= 122 || e4 >= 48 && e4 <= 57 || e4 === 43 || e4 === 47 || e4 === 45 || e4 === 95, no = (e4) => e4 === 9 || e4 === 10 || e4 === 12 || e4 === 13 || e4 === 32, ro = (e4) => {
  let t2 = Math.floor(e4 / 4), n2 = e4 % 4;
  return t2 * 3 + (n2 === 2 ? 1 : n2 === 3 ? 2 : 0);
}, io = (e4) => {
  let t2 = e4.length, n2 = 0;
  return t2 > 0 && e4.charCodeAt(t2 - 1) === 61 && (n2++, t2 > 1 && e4.charCodeAt(t2 - 2) === 61 && n2++), Math.floor((t2 - n2) * 3 / 4);
}, ao = (e4) => {
  let t2 = e4.length, n2 = 0, r2 = 0, i2 = false;
  for (let a2 = 0; a2 < t2; a2++) {
    let o2 = e4.charCodeAt(a2);
    if (o2 === 37 && $a(e4, a2, t2) && (o2 = eo(e4.charCodeAt(a2 + 1)) * 16 + eo(e4.charCodeAt(a2 + 2)), a2 += 2), !no(o2)) {
      if (o2 === 61) {
        r2++;
        continue;
      }
      if (!to(o2) || r2 > 0) {
        i2 = true;
        continue;
      }
      n2++;
    }
  }
  return i2 || r2 > 2 || r2 > 0 && (n2 + r2) % 4 != 0 || n2 % 4 == 1 ? io(e4) : ro(n2);
}, oo = (e4, t2) => {
  if (!e4 || typeof e4 != `string` || !e4.startsWith(`data:`)) return 0;
  let n2 = e4.indexOf(`,`);
  if (n2 < 0) return 0;
  let r2 = e4.slice(5, n2), i2 = e4.slice(n2 + 1);
  if (/;base64/i.test(r2)) return t2(i2);
  let a2 = 0;
  for (let e5 = 0, t3 = i2.length; e5 < t3; e5++) {
    let n3 = i2.charCodeAt(e5);
    if (n3 === 37 && $a(i2, e5, t3)) a2 += 1, e5 += 2;
    else if (n3 < 128) a2 += 1;
    else if (n3 < 2048) a2 += 2;
    else if (n3 >= 55296 && n3 <= 56319 && e5 + 1 < t3) {
      let t4 = i2.charCodeAt(e5 + 1);
      t4 >= 56320 && t4 <= 57343 ? (a2 += 4, e5++) : a2 += 3;
    } else a2 += 3;
  }
  return a2;
};
function so(e4) {
  let t2 = typeof e4 == `string` ? e4.indexOf(`#`) : -1;
  return oo(t2 === -1 ? e4 : e4.slice(0, t2), ao);
}
var co = `1.20.0`, lo = 65536, uo = { cache: `default`, redirect: `follow`, referrer: `about:client`, referrerPolicy: ``, mode: `cors`, integrity: ``, keepalive: false, priority: `auto`, window: null }, { isFunction: fo } = j, po = (e4) => encodeURIComponent(e4).replace(/%([0-9A-F]{2})/gi, (e5, t2) => String.fromCharCode(parseInt(t2, 16))), mo = (e4) => {
  if (!j.isString(e4)) return e4;
  try {
    return decodeURIComponent(e4);
  } catch {
    return e4;
  }
}, ho = (e4, ...t2) => {
  try {
    return !!e4(...t2);
  } catch {
    return false;
  }
}, go = (e4) => {
  let t2 = e4.indexOf(`://`), n2 = e4;
  return t2 !== -1 && (n2 = n2.slice(t2 + 3)), n2.includes(`@`) || n2.includes(`:`);
}, _o = (e4) => {
  let t2 = j.global !== void 0 && j.global !== null ? j.global : globalThis, { ReadableStream: n2, TextEncoder: r2 } = t2;
  e4 = j.merge.call({ skipUndefined: true }, { Request: t2.Request, Response: t2.Response }, e4);
  let { fetch: i2, Request: a2, Response: o2 } = e4, s2 = i2 ? fo(i2) : typeof fetch == `function`, c2 = fo(a2), l2 = fo(o2);
  if (!s2) return false;
  let u2 = s2 && fo(n2), d2 = s2 && (typeof r2 == `function` ? /* @__PURE__ */ ((e5) => (t3) => e5.encode(t3))(new r2()) : async (e5) => new Uint8Array(await new a2(e5).arrayBuffer())), f2 = c2 && u2 && ho(() => {
    let e5 = false, t3 = new a2(N.origin, { body: new n2(), method: `POST`, get duplex() {
      return e5 = true, `half`;
    } }), r3 = t3.headers.has(`Content-Type`);
    return t3.body != null && t3.body.cancel(), e5 && !r3;
  }), p2 = l2 && u2 && ho(() => j.isReadableStream(new o2(``).body)), m2 = { stream: p2 && ((e5) => e5.body) };
  s2 && [`text`, `arrayBuffer`, `blob`, `formData`, `stream`].forEach((e5) => {
    !m2[e5] && (m2[e5] = (t3, n3) => {
      let r3 = t3 && t3[e5];
      if (r3) return r3.call(t3);
      throw new M(`Response type '${e5}' is not supported`, M.ERR_NOT_SUPPORT, n3);
    });
  });
  let h2 = async (e5) => {
    if (e5 == null) return 0;
    if (j.isBlob(e5)) return e5.size;
    if (j.isSpecCompliantForm(e5)) return (await new a2(N.origin, { method: `POST`, body: e5 }).arrayBuffer()).byteLength;
    if (j.isArrayBufferView(e5) || j.isArrayBuffer(e5)) return e5.byteLength;
    if (j.isURLSearchParams(e5) && (e5 += ``), j.isString(e5)) return (await d2(e5)).byteLength;
  }, g2 = async (e5, t3) => j.toFiniteNumber(e5.getContentLength()) ?? h2(t3);
  return async (e5) => {
    let { url: t3, method: n3, data: s3, signal: l3, cancelToken: d3, timeout: _2, onDownloadProgress: v2, onUploadProgress: y2, responseType: b2, headers: x2, withCredentials: ee2 = `same-origin`, fetchOptions: te2, maxContentLength: ne2, maxBodyLength: S2, maxRedirects: re2 } = Ga(e5), C2 = j.isNumber(ne2) && ne2 > -1, ie2 = j.isNumber(S2) && S2 > -1, ae2 = (t4) => j.hasOwnProp(e5, t4) ? e5[t4] : void 0, oe2 = i2 || fetch;
    b2 = b2 ? (b2 + ``).toLowerCase() : `text`;
    let w2 = qa([l3, d3 && d3.toAbortSignal()], _2), T2 = null, se2 = w2 && w2.unsubscribe && (() => {
      w2.unsubscribe();
    }), ce2, le2 = null, ue2 = () => new M(`Request body larger than maxBodyLength limit`, M.ERR_BAD_REQUEST, e5, T2);
    try {
      let i3, l4 = ae2(`auth`);
      if (l4 && (i3 = { username: j.getSafeProp(l4, `username`) || ``, password: j.getSafeProp(l4, `password`) || `` }), go(t3)) {
        let e6 = new URL(t3, N.origin);
        !i3 && (e6.username || e6.password) && (i3 = { username: mo(e6.username), password: mo(e6.password) }), (e6.username || e6.password) && (e6.username = ``, e6.password = ``, t3 = e6.href);
      }
      if (i3 && (x2.delete(`authorization`), x2.set(`Authorization`, `Basic ` + btoa(po((i3.username || ``) + `:` + (i3.password || ``))))), C2 && typeof t3 == `string` && t3.startsWith(`data:`) && so(t3) > ne2) throw new M(`maxContentLength size of ` + ne2 + ` exceeded`, M.ERR_BAD_RESPONSE, e5, T2);
      if (ie2 && n3 !== `get` && n3 !== `head`) {
        let e6 = await h2(s3);
        if (typeof e6 == `number` && isFinite(e6) && (ce2 = e6, e6 > S2)) throw ue2();
      }
      let d4 = ie2 && (j.isReadableStream(s3) || j.isStream(s3)), _3 = (e6, t4, n4) => Za(e6, lo, (e7) => {
        if (ie2 && e7 > S2) throw le2 = ue2();
        t4 && t4(e7);
      }, n4);
      if (f2 && n3 !== `get` && n3 !== `head` && (y2 || d4)) {
        if (ce2 ??= await g2(x2, s3), ce2 !== 0 || d4) {
          let e6 = new a2(t3, { method: `POST`, body: s3, duplex: `half` }), n4;
          if (j.isFormData(s3) && (n4 = e6.headers.get(`content-type`)) && x2.setContentType(n4), e6.body) {
            let [t4, n5] = y2 && Oa(ce2, Da(ka(y2))) || [];
            s3 = _3(e6.body, t4, n5);
          }
        }
      } else if (d4 && !c2 && u2 && n3 !== `get` && n3 !== `head`) s3 = _3(s3);
      else if (d4 && c2 && !f2 && n3 !== `get` && n3 !== `head`) throw new M(`Stream request bodies are not supported by the current fetch implementation`, M.ERR_NOT_SUPPORT, e5, T2);
      j.isString(ee2) || (ee2 = ee2 ? `include` : `omit`);
      let de2 = c2 && `credentials` in a2.prototype;
      if (j.isFormData(s3)) {
        let e6 = x2.getContentType();
        e6 && /^multipart\/form-data/i.test(e6) && !/boundary=/i.test(e6) && x2.delete(`content-type`);
      }
      x2.set(`User-Agent`, `axios/` + co, false);
      let fe2 = te2 == null ? te2 : Object.assign(/* @__PURE__ */ Object.create(null), te2);
      fe2 && (delete fe2.body, delete fe2.headers, delete fe2.method, delete fe2.signal, delete fe2.duplex, delete fe2.credentials);
      let pe2 = Object.assign(/* @__PURE__ */ Object.create(null), fe2, { signal: w2, method: n3.toUpperCase(), headers: xi(x2.normalize()), body: s3, duplex: `half`, credentials: de2 ? ee2 : void 0 });
      c2 && (j.forEach(uo, (e6, t4) => {
        pe2[t4] === void 0 && (pe2[t4] = e6);
      }), pe2.signal === void 0 && (pe2.signal = null), pe2.body === void 0 && (pe2.body = null)), re2 === 0 && (pe2.redirect = `manual`, fe2 && (fe2.redirect = `manual`)), T2 = c2 && new a2(t3, pe2);
      let me2 = await (c2 ? oe2(T2, fe2) : oe2(t3, pe2)), he2 = Pi.from(me2.headers);
      if (C2) {
        let t4 = j.toFiniteNumber(he2.getContentLength());
        if (t4 != null && t4 > ne2) throw new M(`maxContentLength size of ` + ne2 + ` exceeded`, M.ERR_BAD_RESPONSE, e5, T2);
      }
      let ge2 = p2 && (b2 === `stream` || b2 === `response`);
      if (p2 && me2.body && (v2 || C2 || ge2 && se2)) {
        let t4 = {};
        [`status`, `statusText`, `headers`].forEach((e6) => {
          t4[e6] = me2[e6];
        });
        let n4 = j.toFiniteNumber(he2.getContentLength()), [r3, i4] = v2 && Oa(n4, Da(ka(v2), true)) || [], a3 = 0;
        me2 = new o2(Za(me2.body, lo, (t5) => {
          if (C2 && (a3 = t5, a3 > ne2)) throw new M(`maxContentLength size of ` + ne2 + ` exceeded`, M.ERR_BAD_RESPONSE, e5, T2);
          r3 && r3(t5);
        }, () => {
          i4 && i4(), se2 && se2();
        }), t4);
      }
      b2 ||= `text`;
      let _e2 = await m2[j.findKey(m2, b2) || `text`](me2, e5);
      if (C2 && !p2 && !ge2) {
        let t4;
        if (_e2 != null && (typeof _e2.byteLength == `number` ? t4 = _e2.byteLength : typeof _e2.size == `number` ? t4 = _e2.size : typeof _e2 == `string` && (t4 = typeof r2 == `function` ? new r2().encode(_e2).byteLength : _e2.length)), typeof t4 == `number` && t4 > ne2) throw new M(`maxContentLength size of ` + ne2 + ` exceeded`, M.ERR_BAD_RESPONSE, e5, T2);
      }
      return !ge2 && se2 && se2(), await new Promise((t4, n4) => {
        xa(t4, n4, { data: _e2, headers: Pi.from(me2.headers), status: me2.status, statusText: me2.statusText, config: e5, request: T2 });
      });
    } catch (t4) {
      if (se2 && se2(), w2 && w2.aborted && w2.reason instanceof M) {
        let n4 = w2.reason;
        throw n4.config = e5, T2 && (n4.request = T2), t4 !== n4 && Object.defineProperty(n4, "cause", { __proto__: null, value: t4, writable: true, enumerable: false, configurable: true }), n4;
      }
      if (le2) throw T2 && !le2.request && (le2.request = T2), le2;
      if (t4 instanceof M) throw T2 && !t4.request && (t4.request = T2), t4;
      if (t4 && t4.name === `TypeError` && /Load failed|fetch/i.test(t4.message)) {
        let n4 = new M(`Network Error`, M.ERR_NETWORK, e5, T2, t4 && t4.response);
        throw Object.defineProperty(n4, "cause", { __proto__: null, value: t4.cause || t4, writable: true, enumerable: false, configurable: true }), n4;
      }
      throw M.from(t4, t4 && t4.code, e5, T2, t4 && t4.response);
    }
  };
}, vo = /* @__PURE__ */ new Map(), yo = (e4) => {
  let t2 = e4 && e4.env || {}, { fetch: n2, Request: r2, Response: i2 } = t2, a2 = [r2, i2, n2], o2 = a2.length, s2, c2, l2 = vo;
  for (; o2--; ) s2 = a2[o2], c2 = l2.get(s2), c2 === void 0 && l2.set(s2, c2 = o2 ? /* @__PURE__ */ new Map() : _o(t2)), l2 = c2;
  return c2;
};
yo();
var bo = { http: null, xhr: Ka, fetch: { get: yo } };
j.forEach(bo, (e4, t2) => {
  if (e4) {
    try {
      Object.defineProperty(e4, "name", { __proto__: null, value: t2 });
    } catch {
    }
    Object.defineProperty(e4, "adapterName", { __proto__: null, value: t2 });
  }
});
var xo = (e4) => `- ${e4}`, So = (e4) => j.isFunction(e4) || e4 === null || e4 === false;
function Co(e4, t2) {
  e4 = j.isArray(e4) ? e4 : [e4];
  let { length: n2 } = e4, r2, i2, a2 = {};
  for (let o2 = 0; o2 < n2; o2++) {
    r2 = e4[o2];
    let n3;
    if (i2 = r2, !So(r2) && (i2 = bo[(n3 = String(r2)).toLowerCase()], i2 === void 0)) throw new M(`Unknown adapter '${n3}'`);
    if (i2 && (j.isFunction(i2) || (i2 = i2.get(t2)))) break;
    a2[n3 || `#` + o2] = i2;
  }
  if (!i2) {
    let e5 = Object.entries(a2).map(([e6, t3]) => `adapter ${e6} ` + (t3 === false ? `is not supported by the environment` : `is not available in the build`));
    throw new M(`There is no suitable adapter to dispatch the request ` + (n2 ? e5.length > 1 ? `since :
` + e5.map(xo).join(`
`) : ` ` + xo(e5[0]) : `as no adapter specified`), M.ERR_NOT_SUPPORT);
  }
  return i2;
}
var wo = { getAdapter: Co, adapters: bo };
function To(e4) {
  if (e4.cancelToken && e4.cancelToken.throwIfRequested(), e4.signal && e4.signal.aborted) throw new ba(null, e4);
}
function Eo(e4) {
  let t2 = j.toSafeFlatObject(e4);
  return To(t2), t2.headers = Pi.from(j.getSafeProp(t2, `headers`)), t2.data = va.call(t2, t2.transformRequest), [`post`, `put`, `patch`].indexOf(t2.method) !== -1 && t2.headers.setContentType(`application/x-www-form-urlencoded`, false), wo.getAdapter(t2.adapter || _a.adapter, t2)(t2).then(function(e5) {
    To(t2), t2.response = e5;
    try {
      e5.data = va.call(t2, t2.transformResponse, e5);
    } finally {
      delete t2.response;
    }
    return e5.headers = Pi.from(e5.headers), e5;
  }, function(e5) {
    if (!ya(e5) && (To(t2), e5 && e5.response)) {
      t2.response = e5.response;
      try {
        e5.response.data = va.call(t2, t2.transformResponse, e5.response);
      } finally {
        delete t2.response;
      }
      e5.response.headers = Pi.from(e5.response.headers);
    }
    return Promise.reject(e5);
  });
}
var Do = {};
[`object`, `boolean`, `number`, `function`, `string`, `symbol`].forEach((e4, t2) => {
  Do[e4] = function(n2) {
    return typeof n2 === e4 || `a` + (t2 < 1 ? `n ` : ` `) + e4;
  };
});
var Oo = {};
Do.transitional = function(e4, t2, n2) {
  function r2(e5, t3) {
    return `[Axios v` + co + `] Transitional option '` + e5 + `'` + t3 + (n2 ? `. ` + n2 : ``);
  }
  return (n3, i2, a2) => {
    if (e4 === false) throw new M(r2(i2, ` has been removed` + (t2 ? ` in ` + t2 : ``)), M.ERR_DEPRECATED);
    return t2 && !Oo[i2] && (Oo[i2] = true, console.warn(r2(i2, ` has been deprecated since v` + t2 + ` and will be removed in the near future`))), !e4 || e4(n3, i2, a2);
  };
}, Do.spelling = function(e4) {
  return (t2, n2) => (console.warn(`${n2} is likely a misspelling of ${e4}`), true);
};
function ko(e4, t2, n2) {
  if (typeof e4 != `object` || !e4) throw new M(`options must be an object`, M.ERR_BAD_OPTION_VALUE);
  let r2 = Object.keys(e4), i2 = r2.length;
  for (; i2-- > 0; ) {
    let a2 = r2[i2], o2 = Object.prototype.hasOwnProperty.call(t2, a2) ? t2[a2] : void 0;
    if (o2) {
      let t3 = e4[a2], n3 = t3 === void 0 || o2(t3, a2, e4);
      if (n3 !== true) throw new M(`option ` + a2 + ` must be ` + n3, M.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n2 !== true) throw new M(`Unknown option ` + a2, M.ERR_BAD_OPTION);
  }
}
var Ao = { assertOptions: ko, validators: Do }, I = Ao.validators, jo = class {
  constructor(e4) {
    this.defaults = e4 || {}, this.interceptors = { request: new ta(), response: new ta() };
  }
  async request(e4, t2) {
    try {
      return await this._request(e4, t2);
    } catch (e5) {
      if (e5 instanceof Error) try {
        let t3 = {};
        Error.captureStackTrace ? Error.captureStackTrace(t3) : t3 = Error();
        let n2 = t3.stack, r2 = ``;
        if (typeof n2 == `string`) {
          let e6 = n2.indexOf(`
`);
          r2 = e6 === -1 ? `` : n2.slice(e6 + 1);
        }
        if (!e5.stack) e5.stack = r2;
        else if (r2) {
          let t4 = r2.indexOf(`
`), n3 = t4 === -1 ? -1 : r2.indexOf(`
`, t4 + 1), i2 = n3 === -1 ? `` : r2.slice(n3 + 1);
          String(e5.stack).endsWith(i2) || (e5.stack += `
` + r2);
        }
      } catch {
      }
      throw e5;
    }
  }
  _request(e4, t2) {
    typeof e4 == `string` ? (t2 ||= {}, t2.url = e4) : t2 = e4 || {}, t2 = Va(this.defaults, t2);
    let { transitional: n2, paramsSerializer: r2, headers: i2 } = t2;
    n2 !== void 0 && Ao.assertOptions(n2, { silentJSONParsing: I.transitional(I.boolean), forcedJSONParsing: I.transitional(I.boolean), clarifyTimeoutError: I.transitional(I.boolean), legacyInterceptorReqResOrdering: I.transitional(I.boolean), advertiseZstdAcceptEncoding: I.transitional(I.boolean), validateStatusUndefinedResolves: I.transitional(I.boolean) }, false), r2 != null && (j.isFunction(r2) ? t2.paramsSerializer = { serialize: r2 } : Ao.assertOptions(r2, { encode: I.function, serialize: I.function }, true)), t2.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls === void 0 ? t2.allowAbsoluteUrls = true : t2.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls), Ao.assertOptions(t2, { baseUrl: I.spelling(`baseURL`), withXsrfToken: I.spelling(`withXSRFToken`) }, true), t2.method = (j.getSafeProp(t2, `method`) || j.getSafeProp(this.defaults, `method`) || `get`).toLowerCase();
    let a2 = i2 && j.merge(i2.common, i2[t2.method]);
    i2 && j.forEach(ma.concat(`common`), (e5) => {
      delete i2[e5];
    }), t2.headers = Pi.concat(a2, i2);
    let o2 = [], s2 = true;
    this.interceptors.request.forEach(function(e5) {
      if (typeof e5.runWhen == `function` && e5.runWhen(t2) === false) return;
      s2 &&= e5.synchronous;
      let n3 = t2.transitional || na;
      n3 && n3.legacyInterceptorReqResOrdering ? o2.unshift(e5.fulfilled, e5.rejected) : o2.push(e5.fulfilled, e5.rejected);
    });
    let c2 = [];
    this.interceptors.response.forEach(function(e5) {
      c2.push(e5.fulfilled, e5.rejected);
    });
    let l2, u2 = 0, d2;
    if (!s2) {
      let e5 = [Eo.bind(this), void 0];
      for (e5.unshift(...o2), e5.push(...c2), d2 = e5.length, l2 = Promise.resolve(t2); u2 < d2; ) l2 = l2.then(e5[u2++], e5[u2++]);
      return l2;
    }
    d2 = o2.length;
    let f2 = t2;
    for (; u2 < d2; ) {
      let e5 = o2[u2++], t3 = o2[u2++];
      try {
        f2 = e5 ? e5(f2) : f2;
      } catch (e6) {
        if (!t3) {
          l2 = Promise.reject(e6);
          break;
        }
        try {
          let n3 = t3.call(this, e6);
          j.isThenable(n3) && (l2 = Promise.resolve(n3).then(() => Eo.call(this, f2)));
        } catch (e7) {
          l2 = Promise.reject(e7);
        }
        break;
      }
    }
    if (!l2) try {
      l2 = Eo.call(this, f2);
    } catch (e5) {
      l2 = Promise.reject(e5);
    }
    for (u2 = 0, d2 = c2.length; u2 < d2; ) l2 = l2.then(c2[u2++], c2[u2++]);
    return l2;
  }
  getUri(e4) {
    return e4 = Va(this.defaults, e4), Xi(Ra(e4.baseURL, e4.url, e4.allowAbsoluteUrls, e4), e4.params, e4.paramsSerializer);
  }
};
j.forEach([`delete`, `get`, `head`, `options`], function(e4) {
  jo.prototype[e4] = function(t2, n2) {
    return this.request(Va(n2 || {}, { method: e4, url: t2, data: n2 && j.hasOwnProp(n2, `data`) ? n2.data : void 0 }));
  };
}), j.forEach([`post`, `put`, `patch`, `query`], function(e4) {
  function t2(t3) {
    return function(n2, r2, i2) {
      return this.request(Va(i2 || {}, { method: e4, headers: t3 ? { "Content-Type": `multipart/form-data` } : {}, url: n2, data: r2 }));
    };
  }
  jo.prototype[e4] = t2(), e4 !== `query` && (jo.prototype[e4 + `Form`] = t2(true));
});
var Mo = class e3 {
  constructor(e4) {
    if (typeof e4 != `function`) throw TypeError(`executor must be a function.`);
    let t2;
    this.promise = new Promise(function(e5) {
      t2 = e5;
    });
    let n2 = this;
    this.promise.then((e5) => {
      if (!n2._listeners) return;
      let t3 = n2._listeners.length;
      for (; t3-- > 0; ) n2._listeners[t3](e5);
      n2._listeners = null;
    }), this.promise.then = (e5) => {
      let t3, r2 = new Promise((e6) => {
        n2.subscribe(e6), t3 = e6;
      }).then(e5);
      return r2.cancel = function() {
        n2.unsubscribe(t3);
      }, r2;
    }, e4(function(e5, r2, i2) {
      n2.reason || (n2.reason = new ba(e5, r2, i2), t2(n2.reason));
    });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e4) {
    if (this.reason) {
      e4(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e4) : this._listeners = [e4];
  }
  unsubscribe(e4) {
    if (!this._listeners) return;
    let t2 = this._listeners.indexOf(e4);
    t2 !== -1 && this._listeners.splice(t2, 1);
  }
  toAbortSignal() {
    let e4 = new AbortController(), t2 = (t3) => {
      e4.abort(t3);
    };
    return this.subscribe(t2), e4.signal.unsubscribe = () => this.unsubscribe(t2), e4.signal;
  }
  static source() {
    let t2;
    return { token: new e3(function(e4) {
      t2 = e4;
    }), cancel: t2 };
  }
};
function No(e4) {
  return function(t2) {
    return e4.apply(null, t2);
  };
}
function Po(e4) {
  return j.isObject(e4) && e4.isAxiosError === true;
}
var Fo = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, ContentTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, UnprocessableContent: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511, WebServerReturnsAnUnknownError: 520, WebServerIsDown: 521, ConnectionTimedOut: 522, OriginIsUnreachable: 523, TimeoutOccurred: 524, SslHandshakeFailed: 525, InvalidSslCertificate: 526 };
Object.entries(Fo).forEach(([e4, t2]) => {
  Fo[t2] === void 0 && (Fo[t2] = e4);
});
function Io(e4) {
  let t2 = new jo(e4), n2 = Kn(jo.prototype.request, t2);
  return j.extend(n2, jo.prototype, t2, { allOwnKeys: true }), j.extend(n2, t2, null, { allOwnKeys: true }), n2.create = function(t3) {
    return Io(Va(e4, t3));
  }, n2;
}
var L = Io(_a);
L.Axios = jo, L.CanceledError = ba, L.CancelToken = Mo, L.isCancel = ya, L.VERSION = co, L.toFormData = Gi, L.AxiosError = M, L.Cancel = L.CanceledError, L.all = function(e4) {
  return Promise.all(e4);
}, L.spread = No, L.isAxiosError = Po, L.mergeConfig = Va, L.AxiosHeaders = Pi, L.formToJSON = (e4) => pa(j.isHTMLForm(e4) ? new FormData(e4) : e4), L.getAdapter = wo.getAdapter, L.HttpStatusCode = Fo, L.default = L;
var Lo = L.create({ baseURL: `http://localhost:5000/api`, headers: { "Content-Type": `application/json` }, timeout: 8e3 });
Lo.interceptors.request.use((e4) => {
  let t2 = localStorage.getItem(`todayly_token`);
  return t2 && (e4.headers.Authorization = `Bearer ${t2}`), e4;
}, (e4) => Promise.reject(e4)), Lo.interceptors.response.use((e4) => e4, (e4) => (e4.response && e4.response.status, Promise.reject(e4)));
var Ro = { date: `Thứ Năm, 24 Tháng 10, 2024`, location: `Đà Nẵng, Việt Nam`, weather: { temp: `29°C`, condition: `Trời nắng nhẹ, gió mát ven biển 🌤`, humidity: `68% Dễ chịu`, airQuality: `Tốt (AQI 32)` }, stats: { activeHours: `7.5 giờ`, estimatedCost: `~180.000đ`, targetSteps: `6.200 bước`, completionRate: `2/6 việc (33%)` }, timeline: [{ id: `sch-1`, time: `08:00 – 09:30`, title: `💻 Học lập trình React & Tailwind CSS`, location: `Góc học tập tại nhà`, note: `Hoàn thành 2 bài thực hành`, status: `completed`, type: `task`, badge: `Đã hoàn thành`, color: `primary` }, { id: `sch-2`, time: `11:30 – 12:30`, title: `🍜 Ăn trưa Mì Quảng Ếch cùng đồng nghiệp`, location: `Quán Bà Mua • 850m`, note: `Dự trù 55.000đ`, status: `upcoming`, type: `food`, badge: `Gợi ý từ Lịch trình`, color: `secondary` }, { id: `sch-3`, time: `14:00 – 16:00`, title: `📚 Làm bài tập thiết kế hệ thống Design System UI/UX`, location: `Không gian làm việc yên tĩnh`, note: `Figma & Component Library`, status: `upcoming`, type: `task`, badge: `Ưu tiên cao`, color: `primary` }, { id: `sch-4`, time: `17:00 – 18:30`, title: `🌊 Đi dạo biển Mỹ Khê & ngắm hoàng hôn`, location: `Bãi biển Mỹ Khê`, note: `Đi bộ nhẹ 5.000 bước • Tận hưởng gió biển chiều`, status: `upcoming`, type: `place`, badge: `Tái tạo năng lượng`, color: `tertiary` }, { id: `sch-5`, time: `19:30 – 21:00`, title: `🍽 Ăn tối & trò chuyện tại quán cafe acoustic`, location: `Quán cafe quen đường Bạch Đằng`, note: `Nhạc nhẹ thư giãn`, status: `upcoming`, type: `food`, badge: `Gặp gỡ bạn bè`, color: `secondary` }] }, zo = { name: `Mai Linh`, email: `mailinh@todayly.vn`, avatar: `https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5`, bio: `Yêu thích lối sống tối giản, thảnh thơi và tích cực mỗi ngày.`, city: `Đà Nẵng`, wakeUpTime: `06:30`, sleepTime: `23:00`, dietaryPreference: `Thanh đạm, ít ngọt`, favoriteStyle: `Smart-Casual`, transportation: `Xe máy & Đi bộ` }, Bo = { login: async (e4) => {
  try {
    let t2 = await Lo.post(`/auth/login`, e4);
    return t2.data?.token && (localStorage.setItem(`todayly_token`, t2.data.token), localStorage.setItem(`todayly_user`, JSON.stringify(t2.data.user))), t2.data;
  } catch (t2) {
    if (e4.email) {
      let t3 = `mock_jwt_token_` + Date.now(), n2 = { ...zo, email: e4.email };
      return localStorage.setItem(`todayly_token`, t3), localStorage.setItem(`todayly_user`, JSON.stringify(n2)), { token: t3, user: n2 };
    }
    throw t2;
  }
}, register: async (e4) => {
  try {
    let t2 = await Lo.post(`/auth/register`, e4);
    return t2.data?.token && (localStorage.setItem(`todayly_token`, t2.data.token), localStorage.setItem(`todayly_user`, JSON.stringify(t2.data.user))), t2.data;
  } catch {
    let t2 = `mock_jwt_token_` + Date.now(), n2 = { ...zo, ...e4 };
    return localStorage.setItem(`todayly_token`, t2), localStorage.setItem(`todayly_user`, JSON.stringify(n2)), { token: t2, user: n2 };
  }
}, getCurrentUser: async () => {
  try {
    return (await Lo.get(`/auth/me`)).data;
  } catch {
    let e4 = localStorage.getItem(`todayly_user`);
    return e4 ? JSON.parse(e4) : zo;
  }
}, logout: () => {
  localStorage.removeItem(`todayly_token`), localStorage.removeItem(`todayly_user`);
} }, Vo = o(((e4) => {
  var t2 = /* @__PURE__ */ Symbol.for(`react.transitional.element`);
  function n2(e5, n3, r2) {
    var i2 = null;
    if (r2 !== void 0 && (i2 = `` + r2), n3.key !== void 0 && (i2 = `` + n3.key), `key` in n3) for (var a2 in r2 = {}, n3) a2 !== `key` && (r2[a2] = n3[a2]);
    else r2 = n3;
    return n3 = r2.ref, { $$typeof: t2, type: e5, key: i2, ref: n3 === void 0 ? null : n3, props: r2 };
  }
  e4.jsx = n2, e4.jsxs = n2;
})), R = o(((e4, t2) => {
  t2.exports = Vo();
}))(), Ho = (0, v.createContext)(), Uo = ({ children: e4 }) => {
  let [t2, n2] = (0, v.useState)(zo), [r2, i2] = (0, v.useState)(localStorage.getItem(`todayly_token`) || `demo_token`), [a2, o2] = (0, v.useState)(true);
  return (0, v.useEffect)(() => {
    (async () => {
      try {
        let e5 = await Bo.getCurrentUser();
        n2(e5);
      } catch {
        n2(zo);
      } finally {
        o2(false);
      }
    })();
  }, []), (0, R.jsx)(Ho.Provider, { value: { user: t2, token: r2, isAuthenticated: !!t2, login: async (e5) => {
    let t3 = await Bo.login(e5);
    return n2(t3.user), i2(t3.token), t3;
  }, register: async (e5) => {
    let t3 = await Bo.register(e5);
    return n2(t3.user), i2(t3.token), t3;
  }, logout: () => {
    Bo.logout(), n2(null), i2(null);
  }, loading: a2, setUser: n2 }, children: e4 });
}, Wo = () => (0, v.useContext)(Ho);
function z() {
  let { user: e4, logout: t2 } = Wo(), [n2, r2] = (0, v.useState)(false), [i2, a2] = (0, v.useState)(false), o2 = Tt(), s2 = [{ to: `/`, label: `Trang chủ` }, { to: `/planner`, label: `Lịch trình` }, { to: `/tasks`, label: `Hôm nay làm gì?` }, { to: `/food`, label: `Hôm nay ăn gì?` }, { to: `/drinks`, label: `Hôm nay uống gì?` }, { to: `/places`, label: `Hôm nay đi đâu?` }, { to: `/outfit`, label: `Hôm nay mặc gì?` }, { to: `/wheel`, label: `Vòng quay` }, { to: `/favorites`, label: `Yêu thích` }];
  return (0, R.jsxs)(`header`, { className: `fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]`, children: [(0, R.jsxs)(`div`, { className: `h-20 w-full px-gutter flex items-center justify-between gap-space-md max-w-7xl mx-auto`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-space-lg`, children: [(0, R.jsxs)(A, { to: `/`, className: `flex items-center gap-space-sm cursor-pointer`, children: [(0, R.jsx)(`img`, { alt: `Todayly Logo`, className: `h-8 w-auto object-contain`, src: `/todayly-logo.png` }), (0, R.jsx)(`span`, { className: `font-headline-md text-headline-md tracking-tight text-on-surface font-bold`, children: `Todayly` }), (0, R.jsx)(`span`, { className: `px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary text-label-sm font-label-sm uppercase tracking-wider`, children: `Beta` })] }), (0, R.jsx)(`nav`, { className: `hidden 2xl:flex items-center gap-1`, children: s2.map((e5) => (0, R.jsx)(In, { to: e5.to, className: ({ isActive: e6 }) => `px-3 py-1.5 rounded-full font-label-md text-label-md transition-all ${e6 ? `bg-surface-container text-primary font-bold shadow-[0_2px_8px_rgba(53,37,205,0.08)]` : `text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface`}`, children: e5.label }, e5.to)) })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-space-sm`, children: [(0, R.jsxs)(`div`, { className: `hidden md:flex items-center gap-space-xs bg-surface-container-low px-3 py-2 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.03)]`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-outline text-[18px]`, children: `search` }), (0, R.jsx)(`input`, { className: `bg-transparent border-0 outline-none text-on-surface font-body-sm text-body-sm w-36 lg:w-48 placeholder:text-outline`, placeholder: `Tìm kiếm điểm đến, món ăn...`, type: `text` })] }), (0, R.jsxs)(A, { to: `/planner`, className: `flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-4 py-2 rounded-full font-label-md text-label-md transition-all shadow-[0_4px_14px_rgba(79,70,229,0.25)]`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `auto_awesome` }), (0, R.jsx)(`span`, { className: `hidden sm:inline`, children: `Lập kế hoạch hôm nay` })] }), (0, R.jsx)(`div`, { className: `relative flex items-center justify-center`, children: (0, R.jsxs)(`button`, { "aria-label": `Thông báo`, className: `p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all relative`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[22px]`, children: `notifications` }), (0, R.jsx)(`span`, { className: `absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-secondary-container ring-2 ring-surface` })] }) }), (0, R.jsx)(`div`, { className: `relative pl-1`, children: e4 ? (0, R.jsxs)(`div`, { children: [(0, R.jsxs)(`button`, { "aria-label": `Hồ sơ người dùng`, onClick: () => r2(!n2), className: `flex items-center gap-2 rounded-full p-1 hover:bg-surface-container-high transition-all`, children: [(0, R.jsx)(`img`, { alt: e4.name || `User`, className: `w-8 h-8 rounded-full object-cover ring-2 ring-primary/20`, src: e4.avatar || `https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5` }), (0, R.jsx)(`span`, { className: `hidden xl:inline font-label-md text-label-md text-on-surface font-semibold`, children: e4.name }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-outline text-[16px]`, children: `expand_more` })] }), n2 && (0, R.jsxs)(`div`, { className: `absolute right-0 top-full mt-2 w-48 rounded-xl bg-surface-container-lowest p-2 shadow-[0_12px_30px_-4px_rgba(15,23,42,0.12)] z-50 flex flex-col gap-1 border border-outline-variant/30`, onMouseLeave: () => r2(false), children: [(0, R.jsxs)(A, { to: `/profile`, onClick: () => r2(false), className: `flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `person` }), `Hồ sơ & Sở thích`] }), (0, R.jsxs)(A, { to: `/journal`, onClick: () => r2(false), className: `flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `book` }), `Nhật ký cuối ngày`] }), (0, R.jsxs)(A, { to: `/favorites`, onClick: () => r2(false), className: `flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `bookmark` }), `Bộ sưu tập đã lưu`] }), (0, R.jsx)(`div`, { className: `h-[1px] bg-surface-container my-1` }), (0, R.jsxs)(`button`, { onClick: () => {
    t2(), r2(false), o2(`/login`);
  }, className: `flex items-center gap-2 px-3 py-2 rounded-lg text-error font-label-md text-label-md hover:bg-error-container hover:text-on-error-container transition-colors w-full text-left`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `logout` }), `Đăng xuất`] })] })] }) : (0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(A, { to: `/login`, className: `px-3 py-1.5 text-on-surface font-label-md text-label-md hover:text-primary transition-colors`, children: `Đăng nhập` }), (0, R.jsx)(A, { to: `/register`, className: `px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors`, children: `Đăng ký` })] }) }), (0, R.jsx)(`button`, { onClick: () => a2(!i2), className: `todayly-mobile-menu p-2 rounded-full hover:bg-surface-container 2xl:hidden text-on-surface`, "aria-label": `Menu`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: i2 ? `close` : `menu` }) })] })] }), i2 && (0, R.jsx)(`div`, { className: `2xl:hidden bg-surface-container-lowest border-t border-surface-container px-6 py-4 flex flex-col gap-2 shadow-lg`, children: s2.map((e5) => (0, R.jsxs)(In, { to: e5.to, onClick: () => a2(false), className: ({ isActive: e6 }) => `px-4 py-2.5 rounded-xl font-label-md text-label-md flex items-center justify-between ${e6 ? `bg-surface-container text-primary font-bold` : `text-on-surface-variant hover:bg-surface-container-low`}`, children: [(0, R.jsx)(`span`, { children: e5.label }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `chevron_right` })] }, e5.to)) })] });
}
function B() {
  return (0, R.jsx)(`footer`, { className: `w-full bg-surface-container-low text-on-surface-variant mt-space-xl`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-12 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-space-sm`, children: [(0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: `Todayly` }), (0, R.jsx)(`span`, { className: `px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm`, children: `Lifestyle AI` })] }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant leading-relaxed`, children: `Người bạn đồng hành thảnh thơi mỗi ngày cho người Việt trẻ. Cân bằng công việc, ẩm thực, trải nghiệm và thời trang trong từng phút giây.` }), (0, R.jsxs)(`div`, { className: `flex items-center gap-space-sm pt-1`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-secondary text-[16px]`, children: `wb_sunny` }), (0, R.jsx)(`span`, { children: `Đà Nẵng 29°C` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[16px]`, children: `location_city` }), (0, R.jsx)(`span`, { children: `TP. Hồ Chí Minh 31°C` })] })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-2`, children: [(0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold mb-1`, children: `Bốn Trụ Cột Sống` }), (0, R.jsxs)(A, { to: `/tasks`, className: `font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `w-2 h-2 rounded-full bg-primary` }), `Làm gì: Kế hoạch & Mục tiêu ngày`] }), (0, R.jsxs)(A, { to: `/food`, className: `font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `w-2 h-2 rounded-full bg-secondary-container` }), `Ăn gì: Quán ngon & Công thức nhẹ`] }), (0, R.jsxs)(A, { to: `/places`, className: `font-body-sm text-body-sm text-on-surface-variant hover:text-tertiary transition-colors flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `w-2 h-2 rounded-full bg-tertiary` }), `Đi đâu: Cà phê & Điểm hẹn cuối tuần`] }), (0, R.jsxs)(A, { to: `/outfit`, className: `font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `w-2 h-2 rounded-full bg-primary-fixed-dim` }), `Mặc gì: Gợi ý phối đồ theo thời tiết`] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-2`, children: [(0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold mb-1`, children: `Trải Nghiệm` }), (0, R.jsx)(A, { to: `/planner`, className: `font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors`, children: `Dòng thời gian thông minh (Timeline)` }), (0, R.jsx)(A, { to: `/wheel`, className: `font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors`, children: `Vòng quay may mắn (Lucky Wheel)` }), (0, R.jsx)(A, { to: `/journal`, className: `font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors`, children: `Nhật ký tâm trạng & Cảm hứng sáng` }), (0, R.jsx)(A, { to: `/favorites`, className: `font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors`, children: `Bộ sưu tập đã lưu` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-3`, children: [(0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold mb-1`, children: `Tải Ứng Dụng Di Động` }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant`, children: `Nhận thông báo nhắc lịch và gợi ý mặc đẹp, quán ngon ngay trên điện thoại.` }), (0, R.jsxs)(`div`, { className: `flex flex-col sm:flex-row gap-2 pt-1`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: `phone_iphone` }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-outline`, children: `Tải trên` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md font-semibold`, children: `App Store` })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: `android` }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-outline`, children: `Tải trên` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md font-semibold`, children: `Google Play` })] })] })] })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-surface-container text-on-surface-variant font-body-sm text-body-sm`, children: [(0, R.jsx)(`p`, { children: `© 2024 Todayly. Thiết kế cho nhịp sống tích cực mỗi ngày.` }), (0, R.jsxs)(`div`, { className: `flex items-center gap-4 mt-3 sm:mt-0`, children: [(0, R.jsx)(`a`, { className: `hover:text-on-surface transition-colors`, href: `#`, children: `Điều khoản` }), (0, R.jsx)(`a`, { className: `hover:text-on-surface transition-colors`, href: `#`, children: `Bảo mật` }), (0, R.jsx)(`a`, { className: `hover:text-on-surface transition-colors`, href: `#`, children: `Góp ý kiến` })] })] })] }) });
}
function Go({ weather: e4 = { date: `Thứ Năm, 24 Tháng 10, 2024`, location: `Đà Nẵng, Việt Nam`, temp: `29°C`, condition: `Trời nắng nhẹ, gió mát ven biển 🌤`, humidity: `68% Dễ chịu`, airQuality: `Tốt (AQI 32)` } }) {
  return (0, R.jsxs)(`div`, { className: `rounded-2xl bg-surface-container-low p-5 sm:p-6 flex flex-col gap-4 shadow-sm`, children: [(0, R.jsxs)(`div`, { className: `flex items-start justify-between`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface-variant`, children: e4.date }), (0, R.jsxs)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-secondary text-[18px]`, children: `location_on` }), e4.location] })] }), (0, R.jsx)(`div`, { className: `w-12 h-12 rounded-2xl bg-secondary-fixed/50 flex items-center justify-center text-secondary`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[28px]`, children: `wb_sunny` }) })] }), (0, R.jsxs)(`div`, { className: `flex items-baseline gap-3`, children: [(0, R.jsx)(`span`, { className: `font-display-lg text-display-lg text-on-surface font-extrabold`, children: e4.temp }), (0, R.jsx)(`span`, { className: `font-label-lg text-label-lg text-secondary font-medium`, children: e4.condition })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-2 gap-3 pt-2`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[20px]`, children: `humidity_mid` }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-outline`, children: `Độ ẩm` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface font-semibold`, children: e4.humidity })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-tertiary text-[20px]`, children: `air` }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-outline`, children: `Không khí` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-tertiary font-semibold`, children: e4.airQuality })] })] })] })] });
}
function Ko() {
  let [e4, t2] = (0, v.useState)(`vui`);
  return (0, R.jsxs)(`div`, { className: `w-full rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-3`, children: [(0, R.jsx)(`div`, { className: `w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[22px]`, children: `sentiment_satisfied` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold`, children: `Tâm trạng sáng nay của bạn?` }), (0, R.jsx)(`span`, { className: `font-body-sm text-body-sm text-on-surface-variant`, children: `Chọn để ứng dụng tối ưu hóa nhịp điệu sinh hoạt` })] })] }), (0, R.jsx)(`div`, { className: `flex flex-wrap items-center gap-2`, children: [{ id: `vui`, emoji: `✨`, label: `Vui vẻ & Năng động` }, { id: `yen`, emoji: `🌿`, label: `Bình yên, tĩnh lặng` }, { id: `ban`, emoji: `⚡`, label: `Tập trung cao độ` }, { id: `chill`, emoji: `☕`, label: `Thảnh thơi, chill` }].map((n2) => {
    let r2 = e4 === n2.id;
    return (0, R.jsxs)(`button`, { onClick: () => t2(n2.id), className: `px-4 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${r2 ? `bg-primary text-on-primary shadow-sm` : `bg-surface-container text-on-surface hover:bg-surface-container-high`}`, children: [(0, R.jsx)(`span`, { children: n2.emoji }), (0, R.jsx)(`span`, { children: n2.label })] }, n2.id);
  }) })] });
}
function qo() {
  return (0, R.jsxs)(`div`, { className: `grid grid-cols-1 md:grid-cols-2 gap-6`, children: [(0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `checklist` }), (0, R.jsx)(`span`, { children: `Làm gì hôm nay?` })] }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-semibold`, children: `Ưu tiên cao` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, R.jsx)(`h2`, { className: `font-headline-md text-headline-md text-on-surface font-bold`, children: `Công việc & Kế hoạch` }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant`, children: `Quản lý công việc trọng tâm và hoàn thành mục tiêu ngày mới nhẹ nhàng.` })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2.5`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface font-medium`, children: `Tiến độ hôm nay` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-primary font-bold`, children: `2/6 việc (33%)` })] }), (0, R.jsx)(`div`, { className: `w-full h-2.5 rounded-full bg-surface-container-highest overflow-hidden`, children: (0, R.jsx)(`div`, { className: `h-full bg-primary rounded-full transition-all duration-500`, style: { width: `33%` } }) })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm`, children: [(0, R.jsx)(`div`, { className: `w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `laptop_mac` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col flex-1 min-w-0`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-primary font-semibold`, children: `Sắp diễn ra lúc 10:00` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface font-semibold truncate`, children: `Họp review thiết kế giao diện UI/UX` })] }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-outline text-[20px]`, children: `chevron_right` })] })] }), (0, R.jsx)(`div`, { className: `pt-6`, children: (0, R.jsxs)(A, { to: `/tasks`, className: `w-full py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-colors`, children: [(0, R.jsx)(`span`, { children: `Xem danh sách công việc` }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `arrow_forward` })] }) })] }), (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary font-label-md text-label-md`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `restaurant` }), (0, R.jsx)(`span`, { children: `Ăn gì hôm nay?` })] }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-low text-secondary font-semibold`, children: `Gợi ý bữa trưa` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, R.jsx)(`h2`, { className: `font-headline-md text-headline-md text-on-surface font-bold`, children: `Món ngon & Ẩm thực` }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant`, children: `Khám phá hương vị bản địa hợp khẩu vị, thời tiết và năng lượng.` })] }), (0, R.jsxs)(`div`, { className: `rounded-2xl bg-surface-container-low p-4 flex gap-4 items-center`, children: [(0, R.jsx)(`img`, { className: `w-24 h-24 rounded-xl object-cover shrink-0`, alt: `Mì Quảng Ếch Bà Mua`, src: `https://lh3.googleusercontent.com/aida-public/AB6AXuDSVL1oxnkisdSn-4ugM2unO7de_AlEUuYoD888osAFfrLwgjNOP4mohiwvsE7Uz-_ieIDIagV4vCkFm2pkaY72SOf3nGLLr4VLYbhtsVGxWH_9jcf18br9w0GMTFGQXobfSyZy1xm-_qt4iCzYq-93FLoD77Z4J4EAertqQ78lHGNIOVFNMSibrPqP79F-uo2Cr2uegdCMEUbt_ZEPu8i7acmCzCotYRbevmNae2BcIYjcQylYjvc8` }), (0, R.jsxs)(`div`, { className: `flex flex-col min-w-0 flex-1 gap-1`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 text-secondary`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `star` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md font-bold`, children: `4.7` }), (0, R.jsx)(`span`, { className: `font-body-sm text-body-sm text-outline`, children: `(128 đánh giá)` })] }), (0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold truncate`, children: `Mì Quảng Ếch Bà Mua` }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant truncate`, children: `Đặc sản Đà Nẵng • Bữa trưa lý tưởng` }), (0, R.jsxs)(`div`, { className: `flex items-center justify-between pt-1 font-label-sm text-label-sm`, children: [(0, R.jsx)(`span`, { className: `text-secondary font-bold`, children: `40.000 – 60.000đ` }), (0, R.jsx)(`span`, { className: `text-outline`, children: `📍 Cách 850m` })] })] })] })] }), (0, R.jsxs)(`div`, { className: `pt-6 grid grid-cols-2 gap-3`, children: [(0, R.jsxs)(A, { to: `/food`, className: `py-3 px-3 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors shadow-sm`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `check_circle` }), (0, R.jsx)(`span`, { children: `Ăn món này` })] }), (0, R.jsxs)(A, { to: `/wheel`, className: `py-3 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `autorenew` }), (0, R.jsx)(`span`, { children: `Quay chọn món` })] })] })] }), (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed/60 text-tertiary font-label-md text-label-md`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `explore` }), (0, R.jsx)(`span`, { children: `Đi đâu hôm nay?` })] }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-low text-tertiary font-semibold`, children: `Thư giãn chiều` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, R.jsx)(`h2`, { className: `font-headline-md text-headline-md text-on-surface font-bold`, children: `Điểm hẹn & Dạo mát` }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant`, children: `Tận hưởng không khí trong lành tại các điểm đến yên bình gần bạn.` })] }), (0, R.jsxs)(`div`, { className: `rounded-2xl bg-surface-container-low p-4 flex gap-4 items-center`, children: [(0, R.jsx)(`img`, { className: `w-24 h-24 rounded-xl object-cover shrink-0`, alt: `Biển Mỹ Khê`, src: `https://lh3.googleusercontent.com/aida-public/AB6AXuCw4GY1i-xONjgDPAL9H4nUjNqNUSF8bglzWtb1Tq5Psfjq8b7Jtoor-dpenhYE6Xb1xOK9cxKvzLGgyLEQbMFyyupdwsz58RXAIPdFAZZ4XtalP6gz6k5kbDN-s_l9q7j63XkZ2ehxD7ECmm0IgiH8OwMiTUixNhnJD5hc8-nu8lF08_IiZAUUvG4v1B_qZoVeNOpZtmnYP9MTH9XFWuBM1MDXpE1ioCJ2e5L_9Se8cwpN6kKdSvd6` }), (0, R.jsxs)(`div`, { className: `flex flex-col min-w-0 flex-1 gap-1`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 text-tertiary`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `star` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md font-bold`, children: `4.8` }), (0, R.jsx)(`span`, { className: `font-body-sm text-body-sm text-outline`, children: `• Cách 2.4 km` })] }), (0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold truncate`, children: `Biển Mỹ Khê` }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant truncate`, children: `Check-in biển • Dạo bộ & Thể thao` }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-tertiary font-medium`, children: `🌤 Rất hợp tiết trời nắng nhẹ chiều nay` })] })] })] }), (0, R.jsx)(`div`, { className: `pt-6`, children: (0, R.jsxs)(A, { to: `/places`, className: `w-full py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-tertiary font-label-md text-label-md flex items-center justify-center gap-2 transition-colors`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `map` }), (0, R.jsx)(`span`, { children: `Khám phá điểm đến ngay` })] }) })] }), (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-label-md`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `checkroom` }), (0, R.jsx)(`span`, { children: `Mặc gì hôm nay?` })] }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-low text-primary font-semibold`, children: `Theo thời tiết 29°C` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, R.jsx)(`h2`, { className: `font-headline-md text-headline-md text-on-surface font-bold`, children: `Trang phục & Phối đồ` }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant`, children: `Phong cách Smart-Casual thoáng mát, thoải mái cho cả làm việc lẫn dạo phố.` })] }), (0, R.jsxs)(`div`, { className: `rounded-2xl bg-surface-container-low p-4 flex flex-col gap-2.5`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2 text-primary font-label-sm text-label-sm`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `wb_sunny` }), (0, R.jsx)(`span`, { children: `Gợi ý chuẩn: Nắng ráo & thoáng khí` })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-2 gap-2`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2 p-2 rounded-xl bg-surface-container-lowest text-on-surface`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-outline text-[16px]`, children: `dry_cleaning` }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm truncate`, children: `Áo thun cotton mát` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 p-2 rounded-xl bg-surface-container-lowest text-on-surface`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-outline text-[16px]`, children: `styler` }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm truncate`, children: `Short linen be` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 p-2 rounded-xl bg-surface-container-lowest text-on-surface`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-outline text-[16px]`, children: `steps` }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm truncate`, children: `Sneaker trắng êm` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 p-2 rounded-xl bg-surface-container-lowest text-on-surface`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-outline text-[16px]`, children: `video_file` }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm truncate`, children: `Kính râm chống UV` })] })] })] })] }), (0, R.jsx)(`div`, { className: `pt-6`, children: (0, R.jsxs)(A, { to: `/outfit`, className: `w-full py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-colors`, children: [(0, R.jsx)(`span`, { children: `Xem toàn bộ outfit hôm nay` }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `arrow_forward` })] }) })] })] });
}
function Jo({ stats: e4 = { activeHours: `7.5 giờ`, estimatedCost: `~180.000đ`, targetSteps: `6.200 bước` } }) {
  return (0, R.jsxs)(`div`, { className: `w-full rounded-2xl bg-surface-container-high p-5 lg:p-6 flex flex-col sm:flex-row items-center justify-between gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-3 w-full sm:w-auto`, children: [(0, R.jsx)(`div`, { className: `w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: `insights` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold`, children: `Tóm tắt mục tiêu ngày` }), (0, R.jsx)(`span`, { className: `font-body-sm text-body-sm text-on-surface-variant`, children: `Lịch trình cân đối giữa làm việc và nạp năng lượng` })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-wrap items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-outline`, children: `Thời gian hoạt động` }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: e4.activeHours })] }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-outline`, children: `Chi phí ước tính` }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-secondary font-bold`, children: e4.estimatedCost })] }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-outline`, children: `Vận động mục tiêu` }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-tertiary font-bold`, children: e4.targetSteps })] })] })] });
}
function Yo({ onOpenAddModal: e4 }) {
  let [t2, n2] = (0, v.useState)(`today`), [r2, i2] = (0, v.useState)(Ro.timeline), a2 = (e5) => {
    i2((t3) => t3.map((t4) => t4.id === e5 ? { ...t4, status: t4.status === `completed` ? `upcoming` : `completed` } : t4));
  }, o2 = (e5) => e5.status === `completed` ? `bg-primary-container ring-surface-container-lowest` : e5.type === `food` ? `bg-secondary-container ring-surface-container-lowest` : e5.type === `place` ? `bg-tertiary-container ring-surface-container-lowest` : `bg-primary ring-surface-container-lowest`;
  return (0, R.jsxs)(`div`, { className: `w-full rounded-3xl bg-surface-container-lowest p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col sm:flex-row sm:items-center justify-between gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`h2`, { className: `font-headline-lg text-headline-lg text-on-surface font-bold`, children: `Lịch trình hôm nay` }), (0, R.jsxs)(`span`, { className: `px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold`, children: [r2.length, ` hoạt động`] })] }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant`, children: `Dòng thời gian đồng bộ từ thói quen sinh hoạt và thời tiết địa phương.` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-3`, children: [(0, R.jsxs)(`div`, { className: `flex items-center p-1 rounded-full bg-surface-container-low`, children: [(0, R.jsx)(`button`, { onClick: () => n2(`today`), className: `px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${t2 === `today` ? `bg-surface-container-lowest text-primary shadow-sm font-semibold` : `text-on-surface-variant hover:text-on-surface`}`, children: `Hôm nay` }), (0, R.jsx)(`button`, { onClick: () => n2(`tomorrow`), className: `px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${t2 === `tomorrow` ? `bg-surface-container-lowest text-primary shadow-sm font-semibold` : `text-on-surface-variant hover:text-on-surface`}`, children: `Ngày mai` }), (0, R.jsx)(`button`, { onClick: () => n2(`week`), className: `px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${t2 === `week` ? `bg-surface-container-lowest text-primary shadow-sm font-semibold` : `text-on-surface-variant hover:text-on-surface`}`, children: `Lịch tuần` })] }), (0, R.jsxs)(`button`, { onClick: e4, className: `flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-colors cursor-pointer`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `add` }), (0, R.jsx)(`span`, { className: `hidden sm:inline`, children: `Thêm hoạt động` })] })] })] }), (0, R.jsx)(`div`, { className: `relative flex flex-col gap-6 pl-4 sm:pl-8 before:absolute before:left-4 sm:before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-surface-container-high`, children: r2.map((e5) => {
    let t3 = e5.status === `completed`;
    return (0, R.jsxs)(`div`, { className: `relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl shadow-sm -ml-4 sm:-ml-8 pl-10 sm:pl-14 transition-all hover:shadow-md group ${t3 ? `bg-surface-container-low` : `bg-surface-container-lowest`}`, children: [(0, R.jsx)(`div`, { className: `absolute left-2.5 sm:left-6 top-6 sm:top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-4 flex items-center justify-center ${o2(e5)}`, children: (0, R.jsx)(`div`, { className: `w-2 h-2 rounded-full bg-white` }) }), (0, R.jsxs)(`div`, { className: `flex items-start sm:items-center gap-4 flex-1`, children: [(0, R.jsx)(`button`, { onClick: () => a2(e5.id), className: `mt-0.5 sm:mt-0 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${t3 ? `bg-primary text-on-primary` : `bg-surface-container-high text-outline hover:bg-primary hover:text-on-primary`}`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px] ${t3 ? `opacity-100` : `opacity-0 hover:opacity-100`}`, children: `check` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `font-label-md text-label-md ${e5.type === `food` ? `text-secondary font-bold` : e5.type === `place` ? `text-tertiary font-bold` : `text-on-surface-variant`}`, children: e5.time }), (0, R.jsx)(`span`, { className: `px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${t3 ? `bg-surface-container text-tertiary` : e5.type === `food` ? `bg-secondary-fixed/50 text-secondary` : e5.type === `place` ? `bg-tertiary-fixed/60 text-tertiary` : `bg-surface-container text-primary`}`, children: e5.badge })] }), (0, R.jsx)(`h4`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold ${t3 ? `line-through opacity-75` : ``}`, children: e5.title }), (0, R.jsxs)(`span`, { className: `font-body-sm text-body-sm text-on-surface-variant`, children: [e5.location, ` • `, e5.note] })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 self-end sm:self-center`, children: [(0, R.jsx)(`button`, { className: `p-2 rounded-full hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors`, title: `Chỉnh sửa`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `edit` }) }), (0, R.jsx)(`button`, { onClick: () => i2((t4) => t4.filter((t5) => t5.id !== e5.id)), className: `p-2 rounded-full hover:bg-surface-container-highest text-outline hover:text-error transition-colors`, title: `Xóa`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `delete` }) })] })] }, e5.id);
  }) }), (0, R.jsxs)(`div`, { className: `w-full pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant font-body-sm text-body-sm border-t border-surface-container`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[18px]`, children: `schedule` }), (0, R.jsx)(`span`, { children: `Khoảng trống tự do: 12:30 - 14:00 (Nghỉ trưa 90 phút)` })] }), (0, R.jsxs)(`button`, { onClick: () => alert(`Đã tự động tối ưu hóa lịch trình hôm nay theo nhịp sinh học!`), className: `hover:text-primary transition-colors flex items-center gap-1 font-label-md text-label-md cursor-pointer`, children: [(0, R.jsx)(`span`, { children: `Tự động sắp xếp lại lịch trình` }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `sync` })] })] })] });
}
function Xo({ isOpen: e4, onClose: t2, title: n2, children: r2, maxWidth: i2 = `max-w-xl` }) {
  return (0, v.useEffect)(() => {
    let n3 = (n4) => {
      n4.key === `Escape` && e4 && t2();
    };
    return window.addEventListener(`keydown`, n3), () => window.removeEventListener(`keydown`, n3);
  }, [e4, t2]), e4 ? (0, R.jsx)(`div`, { className: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-md overflow-y-auto`, children: (0, R.jsxs)(`div`, { className: `relative w-full ${i2} bg-surface-container-lowest rounded-[28px] shadow-2xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 border border-outline-variant/30`, children: [(0, R.jsxs)(`div`, { className: `px-6 py-5 flex items-center justify-between border-b border-surface-container`, children: [(0, R.jsx)(`h2`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: n2 }), (0, R.jsx)(`button`, { onClick: t2, className: `p-2 rounded-full text-outline hover:text-on-surface hover:bg-surface-container transition-all`, "aria-label": `Đóng modal`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `close` }) })] }), (0, R.jsx)(`div`, { className: `p-6 overflow-y-auto max-h-[80vh]`, children: r2 })] }) }) : null;
}
function Zo() {
  let { user: e4 } = Wo(), [t2, n2] = (0, v.useState)(false), [r2, i2] = (0, v.useState)({ title: ``, time: `10:00 – 11:30`, location: ``, type: `task` });
  return (0, R.jsxs)(`div`, { className: `w-full`, children: [(0, R.jsxs)(`div`, { className: `w-full px-gutter md:px-margin max-w-7xl mx-auto py-space-lg flex flex-col gap-space-xl`, children: [(0, R.jsxs)(`div`, { className: `relative w-full rounded-3xl bg-surface-container-lowest p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden`, children: [(0, R.jsx)(`div`, { className: `absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none` }), (0, R.jsx)(`div`, { className: `absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none` }), (0, R.jsxs)(`div`, { className: `relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center`, children: [(0, R.jsxs)(`div`, { className: `lg:col-span-7 flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low text-primary w-fit`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `verified` }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm uppercase tracking-wider font-semibold`, children: `Đã sẵn sàng gợi ý ngày mới` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5`, children: [(0, R.jsxs)(`h1`, { className: `font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight font-extrabold`, children: [`Chào buổi sáng, `, e4?.name || `Mai Linh`, `! 👋`] }), (0, R.jsx)(`p`, { className: `font-headline-md text-headline-sm md:text-headline-md text-on-surface-variant font-normal`, children: `Bạn muốn hôm nay của mình như thế nào?` })] }), (0, R.jsxs)(`div`, { className: `flex flex-wrap items-center gap-3 pt-2`, children: [(0, R.jsxs)(A, { to: `/planner`, className: `inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-container text-on-primary transition-all duration-200 shadow-md hover:-translate-y-0.5 font-label-lg text-label-lg group`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12`, children: `auto_awesome` }), (0, R.jsx)(`span`, { children: `Lập kế hoạch hôm nay` }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `arrow_forward` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 px-4 py-3 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md`, children: [(0, R.jsx)(`span`, { className: `w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse` }), (0, R.jsx)(`span`, { children: `4/5 hoạt động khớp nhịp sinh học` })] })] })] }), (0, R.jsx)(`div`, { className: `lg:col-span-5 w-full`, children: (0, R.jsx)(Go, {}) })] })] }), (0, R.jsx)(Ko, {}), (0, R.jsx)(qo, {}), (0, R.jsx)(Jo, {}), (0, R.jsx)(Yo, { onOpenAddModal: () => n2(true) })] }), (0, R.jsx)(Xo, { isOpen: t2, onClose: () => n2(false), title: `Thêm hoạt động vào Lịch trình`, children: (0, R.jsxs)(`form`, { onSubmit: (e5) => {
    e5.preventDefault(), r2.title && (alert(`Đã thêm hoạt động: "${r2.title}" vào lịch trình hôm nay!`), n2(false), i2({ title: ``, time: `10:00 – 11:30`, location: ``, type: `task` }));
  }, className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Tên hoạt động` }), (0, R.jsx)(`input`, { type: `text`, required: true, placeholder: `VD: Cà phê sáng cùng team, Họp dự án...`, value: r2.title, onChange: (e5) => i2({ ...r2, title: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface` })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-2 gap-3`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Khung giờ` }), (0, R.jsx)(`input`, { type: `text`, placeholder: `VD: 14:00 – 15:30`, value: r2.time, onChange: (e5) => i2({ ...r2, time: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface` })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Phân loại` }), (0, R.jsxs)(`select`, { value: r2.type, onChange: (e5) => i2({ ...r2, type: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface`, children: [(0, R.jsx)(`option`, { value: `task`, children: `Công việc (Làm gì)` }), (0, R.jsx)(`option`, { value: `food`, children: `Ăn uống (Ăn gì)` }), (0, R.jsx)(`option`, { value: `place`, children: `Điểm hẹn (Đi đâu)` })] })] })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Địa điểm / Ghi chú` }), (0, R.jsx)(`input`, { type: `text`, placeholder: `VD: Quán The May Cafe, 63 Lê Hồng Phong...`, value: r2.location, onChange: (e5) => i2({ ...r2, location: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface` })] }), (0, R.jsxs)(`div`, { className: `flex items-center justify-end gap-3 pt-4 border-t border-surface-container`, children: [(0, R.jsx)(`button`, { type: `button`, onClick: () => n2(false), className: `px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-label-md`, children: `Hủy` }), (0, R.jsx)(`button`, { type: `submit`, className: `px-5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md font-semibold transition-all shadow-sm`, children: `Thêm ngay` })] })] }) })] });
}
function Qo() {
  return (0, R.jsx)(`section`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col gap-3`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between flex-wrap gap-2`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[20px]`, children: `view_timeline` }), (0, R.jsx)(`h2`, { className: `font-headline-sm text-headline-sm font-bold text-on-surface`, children: `Dòng Chảy Thời Gian (08:30 — 18:00)` }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium`, children: `Nhịp sinh học êm dịu` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-4 text-label-sm font-label-sm text-on-surface-variant flex-wrap`, children: [(0, R.jsxs)(`span`, { className: `flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `w-3 h-3 rounded bg-primary` }), `Tập trung sâu`] }), (0, R.jsxs)(`span`, { className: `flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `w-3 h-3 rounded bg-surface-variant` }), `Họp & Trao đổi`] }), (0, R.jsxs)(`span`, { className: `flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `w-3 h-3 rounded bg-tertiary-fixed-dim` }), `Khoảng nghỉ / Ăn trưa`] }), (0, R.jsxs)(`span`, { className: `flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `w-3 h-3 rounded bg-secondary-fixed` }), `Việc nhẹ & Đọc`] })] })] }), (0, R.jsxs)(`div`, { className: `w-full h-8 bg-surface-container-low rounded-xl overflow-hidden flex p-1 gap-1 relative shadow-inner`, children: [(0, R.jsx)(`div`, { className: `h-full rounded-lg bg-secondary-fixed/70 text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm px-2 truncate cursor-pointer hover:opacity-90`, style: { width: `8%` }, title: `08:30 - 09:00: Cà phê & Khởi động ngày`, children: `☕ Khởi động` }), (0, R.jsx)(`div`, { className: `h-full rounded-lg bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm px-2 truncate font-semibold shadow-sm cursor-pointer hover:bg-primary-container transition-colors`, style: { width: `25%` }, title: `09:00 - 10:30: Deep Work - Slide Đối tác (3 Pomo)`, children: `⚡ Slide Đối tác (3 Pomo)` }), (0, R.jsx)(`div`, { className: `h-full rounded-lg bg-tertiary-fixed/60 text-on-tertiary-fixed-variant flex items-center justify-center font-label-sm text-label-sm px-1 cursor-pointer`, style: { width: `4%` }, title: `10:30 - 10:45: Nghỉ giải lao 15p`, children: `🌿` }), (0, R.jsx)(`div`, { className: `h-full rounded-lg bg-surface-container-highest text-primary font-semibold flex items-center justify-center font-label-sm text-label-sm px-2 truncate cursor-pointer`, style: { width: `13%` }, title: `10:45 - 11:30: Review thiết kế Frontend`, children: `🎨 Review Figma` }), (0, R.jsx)(`div`, { className: `h-full rounded-lg bg-tertiary-fixed-dim/80 text-on-tertiary-fixed flex items-center justify-center font-label-sm text-label-sm px-2 truncate font-bold cursor-pointer animate-pulse`, style: { width: `22%` }, title: `11:30 - 13:00: KHOẢNG TRỐNG THẢNH THƠI (Bún Chả Cá & Nghỉ trưa)`, children: `🍜 1h30m Trống: Bún Chả Cá` }), (0, R.jsx)(`div`, { className: `h-full rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm px-1 cursor-pointer`, style: { width: `7%` }, title: `13:00 - 13:30: Khởi động đầu giờ chiều`, children: `⚡` }), (0, R.jsx)(`div`, { className: `h-full rounded-lg bg-primary/80 text-on-primary flex items-center justify-center font-label-sm text-label-sm px-2 truncate cursor-pointer`, style: { width: `21%` }, title: `13:30 - 16:00: Code Backend & Database`, children: `💻 Code API Backend` })] })] }) });
}
function V() {
  let [e4, t2] = (0, v.useState)(1500), [n2, r2] = (0, v.useState)(false), [i2, a2] = (0, v.useState)(2);
  (0, v.useEffect)(() => {
    let i3 = null;
    return n2 && e4 > 0 ? i3 = setInterval(() => {
      t2((e5) => e5 - 1);
    }, 1e3) : e4 === 0 && (r2(false), a2((e5) => e5 + 1), alert(`🎉 Chúc mừng! Bạn đã hoàn thành 1 phiên Pomodoro tập trung.`), t2(1500)), () => clearInterval(i3);
  }, [n2, e4]);
  let o2 = () => r2(!n2), s2 = () => {
    r2(false), t2(1500);
  }, c2 = Math.floor(e4 / 60), l2 = e4 % 60, u2 = `${c2.toString().padStart(2, `0`)}:${l2.toString().padStart(2, `0`)}`, d2 = (1500 - e4) / 1500 * 100;
  return (0, R.jsxs)(`div`, { className: `bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-4 border border-outline-variant/30`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`div`, { className: `w-8 h-8 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `timer` }) }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: `Pomodoro Tập Trung` })] }), (0, R.jsxs)(`span`, { className: `font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold`, children: [i2, ` phiên hôm nay`] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col items-center justify-center py-4 relative`, children: [(0, R.jsx)(`div`, { className: `text-5xl font-extrabold tracking-tight text-on-surface font-sans`, children: u2 }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface-variant mt-1`, children: n2 ? `Đang tập trung sâu... 🎧` : `Sẵn sàng cho phiên mới ✨` }), (0, R.jsx)(`div`, { className: `w-48 h-2 rounded-full bg-surface-container-high mt-4 overflow-hidden`, children: (0, R.jsx)(`div`, { className: `h-full bg-secondary-container transition-all duration-300`, style: { width: `${d2}%` } }) })] }), (0, R.jsxs)(`div`, { className: `flex items-center justify-center gap-3`, children: [(0, R.jsxs)(`button`, { onClick: o2, className: `flex items-center gap-2 px-5 py-2.5 rounded-full font-label-md text-label-md transition-all shadow-sm cursor-pointer ${n2 ? `bg-secondary-container text-on-secondary hover:bg-secondary` : `bg-primary text-on-primary hover:bg-primary-container`}`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: n2 ? `pause` : `play_arrow` }), (0, R.jsx)(`span`, { children: n2 ? `Tạm dừng` : `Bắt đầu 25p` })] }), (0, R.jsx)(`button`, { onClick: s2, className: `p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer`, title: `Đặt lại`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `replay` }) })] })] });
}
function $o({ tasks: e4 = [] }) {
  let t2 = e4.filter((e5) => e5.matrixQuadrant === `important_urgent`), n2 = e4.filter((e5) => e5.matrixQuadrant === `important_not_urgent`), r2 = e4.filter((e5) => e5.matrixQuadrant === `not_important_urgent`), i2 = e4.filter((e5) => e5.matrixQuadrant === `not_important_not_urgent`);
  return (0, R.jsxs)(`div`, { className: `bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-4 border border-outline-variant/30`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`div`, { className: `w-8 h-8 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `grid_view` }) }), (0, R.jsx)(`h2`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: `Ma Trận Eisenhower` })] }), (0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-on-surface-variant`, children: `Ưu tiên thông minh` })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 sm:grid-cols-2 gap-3.5`, children: [(0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-error-container/20 border border-error/20 flex flex-col gap-2`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-error font-bold uppercase tracking-wider`, children: `Khẩn cấp & Quan trọng` }), (0, R.jsx)(`span`, { className: `w-5 h-5 rounded-full bg-error text-white font-bold text-xs flex items-center justify-center`, children: t2.length })] }), (0, R.jsx)(`p`, { className: `font-label-sm text-label-sm text-on-surface-variant`, children: `Làm ngay hôm nay` }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5 mt-1`, children: [t2.map((e5) => (0, R.jsxs)(`div`, { className: `p-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm truncate shadow-2xs`, children: [`🔴 `, e5.title] }, e5.id)), t2.length === 0 && (0, R.jsx)(`span`, { className: `text-outline font-body-sm text-xs italic`, children: `Không có việc khẩn cấp` })] })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-primary-fixed/30 border border-primary/20 flex flex-col gap-2`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider`, children: `Quan trọng • Không khẩn cấp` }), (0, R.jsx)(`span`, { className: `w-5 h-5 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center`, children: n2.length })] }), (0, R.jsx)(`p`, { className: `font-label-sm text-label-sm text-on-surface-variant`, children: `Lên kế hoạch tập trung` }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5 mt-1`, children: [n2.map((e5) => (0, R.jsxs)(`div`, { className: `p-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm truncate shadow-2xs`, children: [`🔵 `, e5.title] }, e5.id)), n2.length === 0 && (0, R.jsx)(`span`, { className: `text-outline font-body-sm text-xs italic`, children: `Không có việc trong mục này` })] })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-secondary-fixed/40 border border-secondary/20 flex flex-col gap-2`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider`, children: `Khẩn cấp • Ít quan trọng` }), (0, R.jsx)(`span`, { className: `w-5 h-5 rounded-full bg-secondary text-white font-bold text-xs flex items-center justify-center`, children: r2.length })] }), (0, R.jsx)(`p`, { className: `font-label-sm text-label-sm text-on-surface-variant`, children: `Giải quyết nhanh hoặc tự động` }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5 mt-1`, children: [r2.map((e5) => (0, R.jsxs)(`div`, { className: `p-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm truncate shadow-2xs`, children: [`🟠 `, e5.title] }, e5.id)), r2.length === 0 && (0, R.jsx)(`span`, { className: `text-outline font-body-sm text-xs italic`, children: `Trống` })] })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-tertiary-fixed/30 border border-tertiary/20 flex flex-col gap-2`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider`, children: `Không khẩn • Không quan trọng` }), (0, R.jsx)(`span`, { className: `w-5 h-5 rounded-full bg-tertiary text-white font-bold text-xs flex items-center justify-center`, children: i2.length })] }), (0, R.jsx)(`p`, { className: `font-label-sm text-label-sm text-on-surface-variant`, children: `Thư giãn hoặc loại bỏ` }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5 mt-1`, children: [i2.map((e5) => (0, R.jsxs)(`div`, { className: `p-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm truncate shadow-2xs`, children: [`🟢 `, e5.title] }, e5.id)), i2.length === 0 && (0, R.jsx)(`span`, { className: `text-outline font-body-sm text-xs italic`, children: `Trống` })] })] })] })] });
}
function es({ task: e4, onToggleComplete: t2, onDelete: n2 }) {
  let r2 = e4.completed;
  return (0, R.jsxs)(`div`, { className: `p-4 sm:p-5 rounded-2xl shadow-sm transition-all duration-200 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${r2 ? `bg-surface-container-low border-outline-variant/30 opacity-75` : `bg-surface-container-lowest border-outline-variant/20 hover:shadow-md`}`, children: [(0, R.jsxs)(`div`, { className: `flex items-start sm:items-center gap-4 flex-1`, children: [(0, R.jsx)(`button`, { onClick: () => t2(e4.id, !r2), className: `mt-0.5 sm:mt-0 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${r2 ? `bg-primary text-on-primary` : `bg-surface-container-high text-outline hover:bg-primary hover:text-on-primary`}`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px] ${r2 ? `opacity-100` : `opacity-0 hover:opacity-100`}`, children: `check` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, R.jsxs)(`div`, { className: `flex flex-wrap items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface-variant`, children: e4.time || `${e4.startTime} – ${e4.endTime}` }), (0, R.jsx)(`span`, { className: `px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-xs font-medium`, children: e4.category }), ((e5) => {
    switch (e5) {
      case `high`:
        return (0, R.jsx)(`span`, { className: `px-2.5 py-0.5 rounded-full bg-error-container/30 text-error font-label-sm text-xs font-semibold`, children: `Ưu tiên cao` });
      case `medium`:
        return (0, R.jsx)(`span`, { className: `px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary font-label-sm text-xs font-semibold`, children: `Trung bình` });
      default:
        return (0, R.jsx)(`span`, { className: `px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs`, children: `Thấp` });
    }
  })(e4.priority)] }), (0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold ${r2 ? `line-through text-outline` : ``}`, children: e4.title }), (0, R.jsxs)(`div`, { className: `flex flex-wrap items-center gap-3 text-body-sm text-on-surface-variant text-xs`, children: [e4.location && (0, R.jsxs)(`span`, { className: `flex items-center gap-1`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[14px]`, children: `location_on` }), e4.location] }), e4.note && (0, R.jsx)(`span`, { children: e4.note }), e4.pomodoroTarget > 0 && (0, R.jsxs)(`span`, { className: `flex items-center gap-1 text-secondary font-semibold`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[14px]`, children: `timer` }), e4.pomodoroCompleted, `/`, e4.pomodoroTarget, ` Pomo`] })] })] })] }), (0, R.jsx)(`div`, { className: `flex items-center gap-2 self-end sm:self-center`, children: (0, R.jsx)(`button`, { onClick: () => n2(e4.id), className: `p-2 rounded-full hover:bg-surface-container-highest text-outline hover:text-error transition-colors cursor-pointer`, title: `Xóa công việc`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `delete` }) }) })] });
}
var ts = [{ id: `t-1`, title: `Học lập trình React & Tailwind CSS`, time: `08:00 – 09:30`, startTime: `08:00`, endTime: `09:30`, category: `Học tập`, priority: `high`, matrixQuadrant: `important_urgent`, completed: true, pomodoroTarget: 3, pomodoroCompleted: 3, location: `Góc học tập tại nhà`, note: `Hoàn thành 2 bài thực hành về component và state` }, { id: `t-2`, title: `Ăn trưa Mì Quảng Ếch cùng đồng nghiệp`, time: `11:30 – 12:30`, startTime: `11:30`, endTime: `12:30`, category: `Ăn uống`, priority: `medium`, matrixQuadrant: `not_important_not_urgent`, completed: false, pomodoroTarget: 0, pomodoroCompleted: 0, location: `Quán Bà Mua • 850m`, note: `Dự trù 55.000đ` }, { id: `t-3`, title: `Làm bài tập thiết kế hệ thống Design System UI/UX`, time: `14:00 – 16:00`, startTime: `14:00`, endTime: `16:00`, category: `Công việc`, priority: `high`, matrixQuadrant: `important_not_urgent`, completed: false, pomodoroTarget: 4, pomodoroCompleted: 2, location: `Không gian làm việc yên tĩnh`, note: `Figma & Component Library tokens` }, { id: `t-4`, title: `Đi dạo biển Mỹ Khê & ngắm hoàng hôn`, time: `17:00 – 18:30`, startTime: `17:00`, endTime: `18:30`, category: `Thư giãn`, priority: `low`, matrixQuadrant: `not_important_not_urgent`, completed: false, pomodoroTarget: 0, pomodoroCompleted: 0, location: `Bãi biển Mỹ Khê`, note: `Đi bộ nhẹ 5.000 bước • Tận hưởng gió biển chiều` }, { id: `t-5`, title: `Ăn tối & trò chuyện tại quán cafe acoustic`, time: `19:30 – 21:00`, startTime: `19:30`, endTime: `21:00`, category: `Gặp gỡ`, priority: `medium`, matrixQuadrant: `not_important_urgent`, completed: false, pomodoroTarget: 0, pomodoroCompleted: 0, location: `Quán cafe quen đường Bạch Đằng`, note: `Nhạc nhẹ thư giãn cuối ngày` }], ns = { getAll: async () => {
  try {
    let e4 = await Lo.get(`/tasks`);
    return e4.data && e4.data.length > 0 ? e4.data : ts;
  } catch {
    return ts;
  }
}, create: async (e4) => {
  try {
    return (await Lo.post(`/tasks`, e4)).data;
  } catch {
    return { id: `t-` + Date.now(), ...e4, completed: false };
  }
}, update: async (e4, t2) => {
  try {
    return (await Lo.put(`/tasks/${e4}`, t2)).data;
  } catch {
    return { id: e4, ...t2 };
  }
}, toggleComplete: async (e4, t2) => {
  try {
    return (await Lo.patch(`/tasks/${e4}/toggle`, { completed: t2 })).data;
  } catch {
    return { id: e4, completed: t2 };
  }
}, delete: async (e4) => {
  try {
    return await Lo.delete(`/tasks/${e4}`), { success: true };
  } catch {
    return { success: true, id: e4 };
  }
} };
function rs() {
  let [e4, t2] = (0, v.useState)([]), [n2, r2] = (0, v.useState)(`all`), [i2, a2] = (0, v.useState)(false), [o2, s2] = (0, v.useState)({ title: ``, time: `14:00 – 15:30`, category: `Công việc`, priority: `high`, matrixQuadrant: `important_urgent`, location: ``, note: ``, pomodoroTarget: 2 });
  (0, v.useEffect)(() => {
    (async () => {
      let e5 = await ns.getAll();
      t2(e5);
    })();
  }, []);
  let c2 = async (e5, n3) => {
    t2((t3) => t3.map((t4) => t4.id === e5 ? { ...t4, completed: n3 } : t4)), await ns.toggleComplete(e5, n3);
  }, l2 = async (e5) => {
    t2((t3) => t3.filter((t4) => t4.id !== e5)), await ns.delete(e5);
  }, u2 = async (e5) => {
    if (e5.preventDefault(), !o2.title) return;
    let n3 = await ns.create(o2);
    t2((e6) => [n3, ...e6]), a2(false), s2({ title: ``, time: `14:00 – 15:30`, category: `Công việc`, priority: `high`, matrixQuadrant: `important_urgent`, location: ``, note: ``, pomodoroTarget: 2 });
  }, d2 = e4.filter((e5) => n2 === `high` ? e5.priority === `high` : n2 === `work` ? e5.category === `Công việc` : n2 === `study` ? e5.category === `Học tập` : n2 !== `relax` || e5.category === `Thư giãn` || e5.category === `Ăn uống`), f2 = e4.filter((e5) => e5.completed).length, p2 = e4.length > 0 ? Math.round(f2 / e4.length * 100) : 0;
  return (0, R.jsxs)(`div`, { className: `w-full`, children: [(0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-6 flex flex-col gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex flex-wrap items-center justify-between gap-3`, children: [(0, R.jsxs)(`nav`, { className: `flex items-center gap-2 font-label-md text-label-md text-on-surface-variant`, children: [(0, R.jsxs)(A, { to: `/`, className: `hover:text-primary transition-colors flex items-center gap-1`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `home` }), (0, R.jsx)(`span`, { children: `Trang chủ` })] }), (0, R.jsx)(`span`, { className: `text-outline-variant`, children: `/` }), (0, R.jsx)(`span`, { className: `text-primary font-semibold`, children: `Hôm nay làm gì?` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsxs)(`button`, { onClick: () => alert(`Đã kết nối và đồng bộ lịch trình với Google Calendar!`), className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm cursor-pointer`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px] text-tertiary`, children: `sync` }), (0, R.jsx)(`span`, { children: `Đồng bộ Google Calendar` })] }), (0, R.jsxs)(`button`, { onClick: () => a2(true), className: `flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-[0_4px_14px_rgba(79,70,229,0.28)] hover:shadow-md transition-all cursor-pointer`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `add` }), (0, R.jsx)(`span`, { children: `+ Thêm việc mới` })] })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col xl:flex-row xl:items-end justify-between gap-4 bg-surface-container-lowest p-6 rounded-3xl shadow-[0_4px_24px_-2px_rgba(15,23,42,0.04)] relative overflow-hidden`, children: [(0, R.jsx)(`div`, { className: `absolute -right-16 -top-20 w-72 h-72 rounded-full bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent blur-3xl pointer-events-none` }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5 max-w-3xl relative z-10`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-wide font-semibold`, children: `Làm gì • Mindful Productivity` }), (0, R.jsxs)(`span`, { className: `text-outline text-label-sm font-label-sm flex items-center gap-1`, children: [(0, R.jsx)(`span`, { className: `w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim` }), `Thứ Ba, 24 Tháng 10`] })] }), (0, R.jsxs)(`h1`, { className: `font-display-lg text-display-lg text-on-surface tracking-tight font-extrabold flex items-center gap-2`, children: [`Hôm Nay Làm Gì? `, (0, R.jsx)(`span`, { className: `text-secondary-container inline-block`, children: `✨` })] }), (0, R.jsx)(`p`, { className: `font-body-md text-body-md text-on-surface-variant leading-relaxed`, children: `Sắp xếp công việc theo ma trận ưu tiên Eisenhower, đồng bộ nhịp thở thảnh thơi cùng bộ đếm Pomodoro và phát hiện khoảng trống tái tạo năng lượng.` })] }), (0, R.jsxs)(`div`, { className: `flex flex-wrap items-center gap-2.5 relative z-10`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-surface-container-low shadow-sm`, children: [(0, R.jsx)(`div`, { className: `w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `task_alt` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-outline`, children: `Tiến độ ngày` }), (0, R.jsxs)(`span`, { className: `font-label-lg text-label-lg font-bold text-on-surface`, children: [f2, `/`, e4.length, ` việc (`, p2, `%)`] })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-surface-container-low shadow-sm`, children: [(0, R.jsx)(`div`, { className: `w-8 h-8 rounded-xl bg-secondary-container/15 text-secondary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `timer` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-outline`, children: `Đã tập trung` }), (0, R.jsx)(`span`, { className: `font-label-lg text-label-lg font-bold text-on-surface`, children: `3h 45m` })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-tertiary-fixed/30 shadow-sm`, children: [(0, R.jsx)(`div`, { className: `w-8 h-8 rounded-xl bg-tertiary-container text-on-tertiary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `nature_people` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-label-sm text-on-tertiary-fixed-variant`, children: `Khoảng trống` }), (0, R.jsx)(`span`, { className: `font-label-lg text-label-lg font-bold text-tertiary`, children: `2 Slots (2h15)` })] })] })] })] }), (0, R.jsx)(Qo, {}), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 lg:grid-cols-12 gap-8 items-start`, children: [(0, R.jsxs)(`div`, { className: `lg:col-span-8 flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none`, children: [(0, R.jsxs)(`button`, { onClick: () => r2(`all`), className: `px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${n2 === `all` ? `bg-on-background text-on-primary font-bold shadow-sm` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: [`Tất cả (`, e4.length, `)`] }), (0, R.jsx)(`button`, { onClick: () => r2(`high`), className: `px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${n2 === `high` ? `bg-on-background text-on-primary font-bold shadow-sm` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Ưu tiên cao 🔴` }), (0, R.jsx)(`button`, { onClick: () => r2(`work`), className: `px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${n2 === `work` ? `bg-on-background text-on-primary font-bold shadow-sm` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Công việc 💼` }), (0, R.jsx)(`button`, { onClick: () => r2(`study`), className: `px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${n2 === `study` ? `bg-on-background text-on-primary font-bold shadow-sm` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Học tập 📚` }), (0, R.jsx)(`button`, { onClick: () => r2(`relax`), className: `px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${n2 === `relax` ? `bg-on-background text-on-primary font-bold shadow-sm` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Thư giãn & Ăn uống 🌿` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-3`, children: [d2.map((e5) => (0, R.jsx)(es, { task: e5, onToggleComplete: c2, onDelete: l2 }, e5.id)), d2.length === 0 && (0, R.jsx)(`div`, { className: `p-8 text-center bg-surface-container-lowest rounded-2xl text-on-surface-variant`, children: `Không có công việc nào trong danh mục này.` })] })] }), (0, R.jsxs)(`div`, { className: `lg:col-span-4 flex flex-col gap-6`, children: [(0, R.jsx)(V, {}), (0, R.jsx)($o, { tasks: e4 })] })] })] }), (0, R.jsx)(Xo, { isOpen: i2, onClose: () => a2(false), title: `Thêm Công Việc Mới`, children: (0, R.jsxs)(`form`, { onSubmit: u2, className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Tên công việc *` }), (0, R.jsx)(`input`, { type: `text`, required: true, placeholder: `VD: Họp review thiết kế UI/UX...`, value: o2.title, onChange: (e5) => s2({ ...o2, title: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface` })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-2 gap-3`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Khung giờ` }), (0, R.jsx)(`input`, { type: `text`, placeholder: `10:00 – 11:30`, value: o2.time, onChange: (e5) => s2({ ...o2, time: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface` })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Mức độ ưu tiên` }), (0, R.jsxs)(`select`, { value: o2.priority, onChange: (e5) => s2({ ...o2, priority: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface`, children: [(0, R.jsx)(`option`, { value: `high`, children: `Cao (Gấp)` }), (0, R.jsx)(`option`, { value: `medium`, children: `Trung bình` }), (0, R.jsx)(`option`, { value: `low`, children: `Thấp` })] })] })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-2 gap-3`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Phân loại` }), (0, R.jsxs)(`select`, { value: o2.category, onChange: (e5) => s2({ ...o2, category: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface`, children: [(0, R.jsx)(`option`, { value: `Công việc`, children: `Công việc` }), (0, R.jsx)(`option`, { value: `Học tập`, children: `Học tập` }), (0, R.jsx)(`option`, { value: `Cá nhân`, children: `Cá nhân` }), (0, R.jsx)(`option`, { value: `Sức khỏe`, children: `Sức khỏe` })] })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Ma trận Eisenhower` }), (0, R.jsxs)(`select`, { value: o2.matrixQuadrant, onChange: (e5) => s2({ ...o2, matrixQuadrant: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface`, children: [(0, R.jsx)(`option`, { value: `important_urgent`, children: `Khẩn cấp & Quan trọng` }), (0, R.jsx)(`option`, { value: `important_not_urgent`, children: `Quan trọng • Không khẩn` }), (0, R.jsx)(`option`, { value: `not_important_urgent`, children: `Khẩn • Ít quan trọng` }), (0, R.jsx)(`option`, { value: `not_important_not_urgent`, children: `Không khẩn • Không quan trọng` })] })] })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Địa điểm / Ghi chú` }), (0, R.jsx)(`input`, { type: `text`, placeholder: `VD: Phòng họp A, Figma workspace...`, value: o2.location, onChange: (e5) => s2({ ...o2, location: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface` })] }), (0, R.jsxs)(`div`, { className: `flex items-center justify-end gap-3 pt-4 border-t border-surface-container`, children: [(0, R.jsx)(`button`, { type: `button`, onClick: () => a2(false), className: `px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-label-md`, children: `Hủy` }), (0, R.jsx)(`button`, { type: `submit`, className: `px-5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md font-semibold transition-all shadow-sm`, children: `Lưu công việc` })] })] }) })] });
}
function is({ food: e4, onSaveFavorite: t2 }) {
  let [n2, r2] = (0, v.useState)(false);
  return (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group border border-outline-variant/20`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `relative w-full h-48 rounded-2xl overflow-hidden`, children: [(0, R.jsx)(`img`, { alt: e4.name, className: `w-full h-full object-cover group-hover:scale-105 transition-transform duration-500`, src: e4.image }), (0, R.jsx)(`div`, { className: `absolute top-3 left-3 flex items-center gap-1.5`, children: (0, R.jsx)(`span`, { className: `px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-xs font-semibold`, children: e4.openHours }) }), (0, R.jsx)(`button`, { onClick: (i2) => {
    i2.preventDefault(), i2.stopPropagation(), r2(!n2), t2 && t2(e4);
  }, "aria-label": `Lưu món ăn`, className: `absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface hover:text-secondary flex items-center justify-center transition-all shadow-sm cursor-pointer`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px] ${n2 ? `text-secondary` : ``}`, children: n2 ? `bookmark` : `bookmark_border` }) })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-1 text-secondary`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `star` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md font-bold`, children: e4.rating }), (0, R.jsxs)(`span`, { className: `font-body-sm text-body-sm text-outline`, children: [`(`, e4.reviewsCount, `)`] })] }), (0, R.jsxs)(`span`, { className: `font-label-sm text-xs text-outline flex items-center gap-0.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[14px]`, children: `near_me` }), e4.distance] })] }), (0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold truncate`, children: e4.name }), (0, R.jsx)(`p`, { className: `font-body-sm text-body-sm text-on-surface-variant line-clamp-2`, children: e4.description }), (0, R.jsxs)(`div`, { className: `flex items-center justify-between pt-1`, children: [(0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-secondary font-bold`, children: e4.priceRange }), (0, R.jsx)(`span`, { className: `px-2.5 py-0.5 rounded-full bg-secondary-fixed/40 text-secondary font-label-sm text-xs font-medium`, children: e4.category })] })] })] }), (0, R.jsxs)(`div`, { className: `pt-4 mt-2 border-t border-surface-container flex items-center gap-2`, children: [(0, R.jsxs)(A, { to: `/detail/food/${e4.id}`, className: `flex-1 py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-1 transition-colors text-center`, children: [(0, R.jsx)(`span`, { children: `Xem chi tiết` }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `arrow_forward` })] }), (0, R.jsx)(A, { to: `/planner`, className: `p-2.5 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary transition-colors`, title: `Thêm vào lịch trình`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `add` }) })] })] });
}
function as({ food: e4 }) {
  let [t2, n2] = (0, v.useState)(false);
  return e4 ? (0, R.jsxs)(`div`, { className: `flex flex-col bg-surface-container-lowest rounded-[28px] shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 border border-outline-variant/30`, children: [(0, R.jsxs)(`div`, { className: `relative w-full h-72 md:h-96 overflow-hidden`, children: [(0, R.jsx)(`img`, { alt: e4.name, className: `w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out`, src: e4.image }), (0, R.jsx)(`div`, { className: `absolute inset-0 bg-gradient-to-t from-on-background/85 via-on-background/30 to-transparent` }), (0, R.jsxs)(`div`, { className: `absolute top-4 left-4 flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm font-semibold tracking-wide uppercase shadow-sm`, children: `Món ngon hôm nay 👑` }), (0, R.jsxs)(`span`, { className: `flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm font-medium`, children: [(0, R.jsx)(`span`, { className: `w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse` }), `Đang mở cửa (`, e4.openHours, `)`] })] }), (0, R.jsx)(`button`, { onClick: () => n2(!t2), "aria-label": `Lưu món ăn`, className: `absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container-lowest/85 backdrop-blur-md hover:bg-surface-container-lowest text-on-surface flex items-center justify-center transition-all shadow-sm cursor-pointer`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px] ${t2 ? `text-secondary` : ``}`, children: t2 ? `bookmark` : `bookmark_border` }) }), (0, R.jsxs)(`div`, { className: `absolute bottom-4 left-4 right-4 text-white`, children: [(0, R.jsx)(`span`, { className: `font-label-md text-label-md text-secondary-fixed opacity-90 block mb-1`, children: `Gợi ý bữa trưa lý tưởng` }), (0, R.jsx)(`h2`, { className: `font-headline-lg text-headline-lg font-bold tracking-tight`, children: e4.name })] })] }), (0, R.jsxs)(`div`, { className: `p-6 md:p-8 flex flex-col gap-6`, children: [(0, R.jsxs)(`div`, { className: `grid grid-cols-2 sm:grid-cols-4 gap-3`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-secondary text-[20px]`, children: `star` }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Đánh giá` }), (0, R.jsxs)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: [e4.rating, ` ⭐`] })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[20px]`, children: `payments` }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Khoảng giá` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface font-bold truncate`, children: e4.priceRange })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-tertiary text-[20px]`, children: `near_me` }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Khoảng cách` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface font-bold`, children: e4.distance })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-secondary-container text-[20px]`, children: `wb_sunny` }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Độ phù hợp` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-secondary font-bold`, children: `98% với 29°C` })] })] })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2`, children: [(0, R.jsxs)(`span`, { className: `font-label-sm text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `auto_awesome` }), `Tại sao món này hoàn hảo cho bạn hôm nay?`] }), (0, R.jsx)(`p`, { className: `font-body-md text-body-md text-on-surface-variant leading-relaxed`, children: e4.description })] }), (0, R.jsxs)(`div`, { className: `flex flex-wrap items-center gap-3`, children: [(0, R.jsxs)(A, { to: `/planner`, className: `flex-1 min-w-[200px] py-3.5 px-6 rounded-2xl bg-secondary-container hover:bg-secondary text-on-secondary font-label-md text-label-md font-bold flex items-center justify-center gap-2 transition-all shadow-md`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `restaurant` }), (0, R.jsx)(`span`, { children: `Thêm vào lịch trình ăn trưa` })] }), (0, R.jsxs)(A, { to: `/detail/food/${e4.id}`, className: `py-3.5 px-6 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-all`, children: [(0, R.jsx)(`span`, { children: `Xem quán & chỉ đường` }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `directions` })] })] })] })] }) : null;
}
var os = [{ id: `f-1`, name: `Bún Chả Cá Đà Nẵng - Quán Bà Phiến`, category: `Ăn trưa`, mealType: `lunch`, rating: 4.8, reviewsCount: 236, priceRange: `35.000 – 65.000đ`, minPrice: 35e3, maxPrice: 65e3, distance: `1.2 km`, distanceNum: 1.2, openHours: `06:00 - 22:00`, isOpen: true, address: `63 Lê Hồng Phong, Hải Châu, Đà Nẵng`, image: `https://lh3.googleusercontent.com/aida-public/AB6AXuC_5KeFSUOMCPzUXXmKrm6ss5TBFPLg0zsgZbj028GekOT5sXMjLWbOU_VMw-zTBREbqeECNdQaPVHONoVOJXRaQ6ZJai0ZgJEMZZeVX1xdqYHt7hIgLerPhfOBnP-kleD-0F4G68Ju9BONUNv3a-A3_Yv-zE5d4JPTAWHAglR560ohp-6N6PHTRqe6rTsAQzuuKBLPv54XiI94F5ASQfwK8SknzngApn2xsidGumEG84qIRbwAVyRy`, tags: [`Đặc sản`, `Bữa trưa`, `Nước dùng ngọt thanh`], isFeatured: true, description: `Bún chả cá thơm ngọt đậm đà từ bí đỏ, bắp cải và xương cá thu tươi, chả cá chiên và hấp dai giòn thủ công.` }, { id: `f-2`, name: `Mì Quảng Ếch Bà Mua`, category: `Ăn trưa`, mealType: `lunch`, rating: 4.7, reviewsCount: 128, priceRange: `40.000 – 60.000đ`, minPrice: 4e4, maxPrice: 6e4, distance: `850m`, distanceNum: 0.85, openHours: `06:30 - 21:30`, isOpen: true, address: `19 Trần Bình Trọng, Hải Châu, Đà Nẵng`, image: `https://lh3.googleusercontent.com/aida-public/AB6AXuDSVL1oxnkisdSn-4ugM2unO7de_AlEUuYoD888osAFfrLwgjNOP4mohiwvsE7Uz-_ieIDIagV4vCkFm2pkaY72SOf3nGLLr4VLYbhtsVGxWH_9jcf18br9w0GMTFGQXobfSyZy1xm-_qt4iCzYq-93FLoD77Z4J4EAertqQ78lHGNIOVFNMSibrPqP79F-uo2Cr2uegdCMEUbt_ZEPu8i7acmCzCotYRbevmNae2BcIYjcQylYjvc8`, tags: [`Đặc sản Đà Nẵng`, `Mì Quảng`, `Thịt ếch om sả`], isFeatured: false, description: `Sợi mì vàng óng ăn kèm ếch đồng om sả ớt trong thố đất nghi ngút khói, bánh tráng nướng mè giòn rụm.` }, { id: `f-3`, name: `Bánh Mì Kẹp Thịt Nướng Cô Tiên`, category: `Ăn sáng`, mealType: `breakfast`, rating: 4.9, reviewsCount: 310, priceRange: `20.000 – 30.000đ`, minPrice: 2e4, maxPrice: 3e4, distance: `450m`, distanceNum: 0.45, openHours: `06:00 - 10:30`, isOpen: true, address: `Chợ Hàn, Hải Châu, Đà Nẵng`, image: `https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80`, tags: [`Ăn sáng nhanh`, `Bánh mì giòn rụm`], isFeatured: false, description: `Vỏ bánh nóng giòn tan, nhân pate béo bùi thủ công, thịt nướng than hoa thơm lừng và đồ chua tươi giòn.` }, { id: `f-4`, name: `Bánh Xèo & Nem Lụi Bà Dưỡng`, category: `Ăn tối`, mealType: `dinner`, rating: 4.6, reviewsCount: 520, priceRange: `50.000 – 100.000đ`, minPrice: 5e4, maxPrice: 1e5, distance: `2.1 km`, distanceNum: 2.1, openHours: `09:30 - 22:00`, isOpen: true, address: `Kiệt 280/23 Hoàng Diệu, Hải Châu, Đà Nẵng`, image: `https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80`, tags: [`Ăn tối no nê`, `Bánh xèo giòn tan`, `Nước chấm gan đậu phộng`], isFeatured: false, description: `Bánh xèo vàng ươm vỏ giòn mỏng, tôm thịt tươi rói cuộn bánh tráng rau sống chấm cùng nước lèo gan bùi thơm nức tiếng.` }, { id: `f-5`, name: `Chè Sầu Liên - Đặc Sản Đà Thành`, category: `Ăn vặt`, mealType: `snack`, rating: 4.8, reviewsCount: 680, priceRange: `30.000 – 45.000đ`, minPrice: 3e4, maxPrice: 45e3, distance: `1.5 km`, distanceNum: 1.5, openHours: `08:00 - 23:00`, isOpen: true, address: `189 Hoàng Diệu, Nam Dương, Hải Châu`, image: `https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80`, tags: [`Tráng miệng`, `Chè Thái sầu riêng`, `Thơm mát`], isFeatured: false, description: `Bát chè mát lạnh ngập tràn cơm sầu riêng tươi béo ngậy, thạch cốt dừa dẻo thơm và mít thái giòn ngọt.` }], ss = { getAll: async (e4 = {}) => {
  try {
    let t2 = await Lo.get(`/foods`, { params: e4 });
    return t2.data && t2.data.length > 0 ? t2.data : os;
  } catch {
    return os;
  }
}, getById: async (e4) => {
  try {
    return (await Lo.get(`/foods/${e4}`)).data;
  } catch {
    return os.find((t2) => t2.id === e4) || os[0];
  }
} };
function cs() {
  let [e4, t2] = (0, v.useState)([]), [n2, r2] = (0, v.useState)(`all`), [i2, a2] = (0, v.useState)(`all`);
  (0, v.useEffect)(() => {
    (async () => {
      let e5 = await ss.getAll();
      t2(e5);
    })();
  }, []);
  let o2 = e4.find((e5) => e5.isFeatured) || e4[0], s2 = e4.filter((e5) => !(n2 === `breakfast` && e5.mealType !== `breakfast` || n2 === `lunch` && e5.mealType !== `lunch` || n2 === `dinner` && e5.mealType !== `dinner` || n2 === `snack` && e5.mealType !== `snack` || i2 === `near` && e5.distanceNum > 1.5 || i2 === `budget` && e5.maxPrice > 5e4 || i2 === `rating` && e5.rating < 4.8));
  return (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col md:flex-row items-start md:items-end justify-between gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3 max-w-2xl`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/15 text-secondary font-label-md text-label-md w-fit font-semibold`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `restaurant` }), (0, R.jsx)(`span`, { children: `Trụ cột Ăn gì • Phong vị địa phương tươi mới` })] }), (0, R.jsxs)(`h1`, { className: `font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold`, children: [`Hôm nay ăn gì? `, (0, R.jsx)(`span`, { className: `inline-block hover:rotate-12 transition-transform`, children: `🍜` })] }), (0, R.jsx)(`p`, { className: `font-body-lg text-body-lg text-on-surface-variant`, children: `Không biết ăn gì? Để chúng tôi gợi ý cho bạn dựa theo thời tiết, sở thích và khoảng cách.` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-3`, children: [(0, R.jsxs)(A, { to: `/wheel`, className: `flex items-center gap-2 px-5 py-3 rounded-full bg-secondary-container hover:bg-secondary text-on-secondary font-label-md text-label-md font-bold transition-all shadow-md`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `casino` }), (0, R.jsx)(`span`, { children: `Quay ngẫu nhiên` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-3 bg-surface-container-lowest p-3 rounded-2xl shadow-sm border border-outline-variant/20`, children: [(0, R.jsx)(`div`, { className: `w-10 h-10 rounded-xl bg-secondary-container/15 text-secondary flex items-center justify-center`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[22px]`, children: `wb_sunny` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline uppercase tracking-wider`, children: `Thời tiết` }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: `29°C Nắng nhẹ` })] })] })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-3`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none`, children: [(0, R.jsx)(`button`, { onClick: () => r2(`all`), className: `px-5 py-2.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${n2 === `all` ? `bg-on-background text-on-primary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Tất cả` }), (0, R.jsx)(`button`, { onClick: () => r2(`breakfast`), className: `px-5 py-2.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${n2 === `breakfast` ? `bg-on-background text-on-primary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Ăn sáng 🍳` }), (0, R.jsx)(`button`, { onClick: () => r2(`lunch`), className: `px-5 py-2.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${n2 === `lunch` ? `bg-on-background text-on-primary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Ăn trưa 🍜` }), (0, R.jsx)(`button`, { onClick: () => r2(`dinner`), className: `px-5 py-2.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${n2 === `dinner` ? `bg-on-background text-on-primary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Ăn tối 🍲` }), (0, R.jsx)(`button`, { onClick: () => r2(`snack`), className: `px-5 py-2.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${n2 === `snack` ? `bg-on-background text-on-primary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Ăn vặt 🧋` })] }), (0, R.jsxs)(`div`, { className: `flex items-center flex-wrap gap-2.5`, children: [(0, R.jsxs)(`button`, { onClick: () => a2(i2 === `near` ? `all` : `near`), className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-sm text-xs shadow-sm transition-all cursor-pointer ${i2 === `near` ? `bg-secondary-container text-on-secondary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container`}`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[15px]`, children: `near_me` }), (0, R.jsx)(`span`, { children: `Khoảng cách (< 1.5km)` })] }), (0, R.jsxs)(`button`, { onClick: () => a2(i2 === `budget` ? `all` : `budget`), className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-sm text-xs shadow-sm transition-all cursor-pointer ${i2 === `budget` ? `bg-secondary-container text-on-secondary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container`}`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[15px]`, children: `payments` }), (0, R.jsx)(`span`, { children: `Khoảng giá (< 50k)` })] }), (0, R.jsxs)(`button`, { onClick: () => a2(i2 === `rating` ? `all` : `rating`), className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-sm text-xs shadow-sm transition-all cursor-pointer ${i2 === `rating` ? `bg-secondary-container text-on-secondary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container`}`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[15px]`, children: `star` }), (0, R.jsx)(`span`, { children: `Đánh giá 4.8+ ⭐` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-tertiary-container/15 text-tertiary font-label-sm text-xs font-semibold shadow-sm`, children: [(0, R.jsx)(`span`, { className: `w-2 h-2 rounded-full bg-tertiary animate-pulse` }), (0, R.jsx)(`span`, { children: `Đang mở cửa` })] })] })] }), o2 && (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsx)(as, { food: o2 }) }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`h2`, { className: `font-headline-md text-headline-md text-on-surface font-bold`, children: `Danh Sách Món Ngon Khuyên Dùng` }), (0, R.jsxs)(`span`, { className: `font-label-sm text-on-surface-variant`, children: [s2.length, ` địa điểm`] })] }), (0, R.jsx)(`div`, { className: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`, children: s2.map((e5) => (0, R.jsx)(is, { food: e5 }, e5.id)) })] })] }) });
}
var ls = [{ id: `d-1`, name: `Trà Đào Cam Sả Mật Ong & Nha Đam`, storeName: `Tiệm Trà & Cà Phê Tháng Năm (The May Cafe)`, category: `Trà trái cây`, drinkType: `tea`, rating: 4.9, reviewsCount: 310, priceRange: `38.000 – 48.000đ`, minPrice: 38e3, maxPrice: 48e3, distance: `650m (4 phút đi bộ)`, distanceNum: 0.65, calories: `120 kcal`, sweetness: `70% đường đá`, image: `https://lh3.googleusercontent.com/aida-public/AB6AXuA_D0GEorR6GYPpNiR8LsymDWVMn-x_0r3BgDjNUk0cBLkBQ3MhNT0uV5_UnSbWoHXplpTdAI29SrqZ6ebmjM-nJ5dhHtymLEwXSeXpzJVg6b1VTvWMdqzjHj4N42yu_oFqgtgos0CIri5QmlR8zxXOiSiDooDF7vq--9zp9dW4OOuYGRQUW_04usxLL1nSvhtY5XGatJM4MTyg0_yDDzadYuKkKRsmRstKUj3aDYiPnJIgYeeXbFfd`, tags: [`Thanh nhiệt`, `Hot Trend`, `Không gây mất ngủ`], isFeatured: true, description: `Nhiệt độ ngoài trời 29°C nắng khô nhẹ vào buổi chiều. Vị chua thanh của cam vàng, hương sả nồng nàn thơm ngát kết hợp mật ong ngọt dịu giúp bù nước tức thì.` }, { id: `d-2`, name: `Cà Phê Muối Kem Béo Đà Nẵng`, storeName: `Cà Phê Muối Chú Long`, category: `Cà phê`, drinkType: `coffee`, rating: 4.8, reviewsCount: 420, priceRange: `25.000 – 35.000đ`, minPrice: 25e3, maxPrice: 35e3, distance: `1.1 km`, distanceNum: 1.1, calories: `180 kcal`, sweetness: `Chuẩn vị`, image: `https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80`, tags: [`Đậm đà`, `Bừng tỉnh`, `Cà phê`], isFeatured: false, description: `Vị đắng êm dịu của hạt cà phê Robusta Việt Nam hòa quyện cùng lớp kem muối mặn béo ngậy độc đáo.` }, { id: `d-3`, name: `Cold Brew Cam Vàng & Quế`, storeName: `43 Factory Coffee Roaster`, category: `Cold Brew`, drinkType: `coffee`, rating: 4.9, reviewsCount: 195, priceRange: `60.000 – 75.000đ`, minPrice: 6e4, maxPrice: 75e3, distance: `1.8 km`, distanceNum: 1.8, calories: `45 kcal`, sweetness: `Không đường`, image: `https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80`, tags: [`Specialty Coffee`, `Tươi mát`, `Low calorie`], isFeatured: false, description: `Cà phê ủ lạnh 16 tiếng chiết xuất hương vị hoa quả tươi, thêm lát cam vàng mọng nước và thanh quế thơm dịu.` }, { id: `d-4`, name: `Sinh Tố Bơ Sầu Riêng Sữa Hạt`, storeName: `Juice & Smoothie Bar`, category: `Sinh tố`, drinkType: `smoothie`, rating: 4.7, reviewsCount: 156, priceRange: `45.000 – 55.000đ`, minPrice: 45e3, maxPrice: 55e3, distance: `900m`, distanceNum: 0.9, calories: `260 kcal`, sweetness: `Vừa ngọt`, image: `https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80`, tags: [`Bổ dưỡng`, `Healthy`, `Sinh tố`], isFeatured: false, description: `Bơ sáp Đắk Lắk béo ngậy xay mịn màng cùng sữa hạt hạnh nhân và một chút sầu riêng thơm nức mũi.` }];
function us() {
  let [e4, t2] = (0, v.useState)(ls), [n2, r2] = (0, v.useState)(`all`), [i2, a2] = (0, v.useState)(1250), o2 = 2e3, s2 = e4.find((e5) => e5.isFeatured) || e4[0], c2 = e4.filter((e5) => n2 === `tea` ? e5.drinkType === `tea` : n2 === `coffee` ? e5.drinkType === `coffee` : n2 !== `smoothie` || e5.drinkType === `smoothie`), l2 = (e5) => {
    a2((t3) => Math.min(o2, t3 + e5));
  }, u2 = Math.min(100, Math.round(i2 / o2 * 100));
  return (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col md:flex-row items-start md:items-end justify-between gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3 max-w-2xl`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/15 text-secondary font-label-md text-label-md w-fit font-semibold`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `local_cafe` }), (0, R.jsx)(`span`, { children: `Trụ cột Uống gì • Năng lượng & Thảnh thơi` })] }), (0, R.jsxs)(`h1`, { className: `font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold`, children: [`Hôm nay uống gì? `, (0, R.jsx)(`span`, { className: `inline-block hover:rotate-12 transition-transform`, children: `🧋` })] }), (0, R.jsx)(`p`, { className: `font-body-lg text-body-lg text-on-surface-variant`, children: `Tối ưu lượng nước, cà phê giải tỏa căng thẳng và trà thảo mộc thanh nhiệt theo thời tiết.` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col sm:flex-row items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-3`, children: [(0, R.jsx)(`div`, { className: `w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: `water_drop` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Nước đã nạp` }), (0, R.jsxs)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: [i2, ` / `, o2, ` ml`] }), (0, R.jsx)(`div`, { className: `w-32 h-1.5 rounded-full bg-surface-container mt-1 overflow-hidden`, children: (0, R.jsx)(`div`, { className: `h-full bg-primary transition-all duration-300`, style: { width: `${u2}%` } }) })] })] }), (0, R.jsx)(`button`, { onClick: () => l2(250), className: `px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-xs font-bold transition-colors cursor-pointer`, children: `+250ml Nước 💧` })] })] }), s2 && (0, R.jsxs)(`div`, { className: `grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch`, children: [(0, R.jsxs)(`div`, { className: `lg:col-span-8 rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden border border-outline-variant/30`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex flex-wrap items-center justify-between gap-3`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsxs)(`span`, { className: `px-3 py-1 rounded-full bg-secondary-container text-on-secondary font-label-sm text-xs uppercase tracking-wider flex items-center gap-1 font-bold`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[14px]`, children: `local_fire_department` }), `Hot Trend Tuần Này`] }), (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-semibold`, children: `Thanh nhiệt mùa hè` })] }), (0, R.jsxs)(`span`, { className: `font-label-sm text-xs text-outline flex items-center gap-1`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `location_on` }), s2.distance] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col sm:flex-row gap-6 items-center`, children: [(0, R.jsx)(`div`, { className: `relative w-full sm:w-56 h-56 shrink-0 rounded-2xl overflow-hidden shadow-sm`, children: (0, R.jsx)(`img`, { alt: s2.name, className: `w-full h-full object-cover transform hover:scale-105 transition-transform duration-500`, src: s2.image }) }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-2.5 w-full`, children: [(0, R.jsxs)(`span`, { className: `font-label-md text-label-md text-primary font-semibold flex items-center gap-1`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `storefront` }), s2.storeName] }), (0, R.jsx)(`h2`, { className: `font-headline-lg text-headline-lg text-on-surface font-bold leading-tight`, children: s2.name }), (0, R.jsxs)(`div`, { className: `flex flex-wrap items-center gap-3 pt-1`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-secondary-container text-[16px]`, children: `star` }), (0, R.jsx)(`span`, { className: `font-bold`, children: s2.rating }), (0, R.jsxs)(`span`, { className: `text-on-surface-variant font-normal`, children: [`(`, s2.reviewsCount, `)`] })] }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-secondary font-bold`, children: s2.priceRange })] }), (0, R.jsxs)(`div`, { className: `p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5 mt-2`, children: [(0, R.jsxs)(`span`, { className: `font-label-sm text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[14px]`, children: `auto_awesome` }), `Phù hợp cho hôm nay`] }), (0, R.jsx)(`p`, { className: `font-body-sm text-xs text-on-surface-variant leading-relaxed`, children: s2.description })] })] })] })] }), (0, R.jsxs)(`div`, { className: `pt-6 mt-4 border-t border-surface-container flex flex-wrap items-center gap-3`, children: [(0, R.jsxs)(A, { to: `/planner`, className: `flex-1 py-3 px-6 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary font-label-md text-label-md font-bold flex items-center justify-center gap-2 transition-all shadow-sm`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `add_circle` }), (0, R.jsx)(`span`, { children: `Thêm vào lịch trình hôm nay` })] }), (0, R.jsx)(A, { to: `/detail/drink/${s2.id}`, className: `py-3 px-6 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-all`, children: (0, R.jsx)(`span`, { children: `Xem menu quán` }) })] })] }), (0, R.jsxs)(`div`, { className: `lg:col-span-4 rounded-3xl bg-surface-container-lowest p-6 shadow-sm flex flex-col justify-between border border-outline-variant/30`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`div`, { className: `w-10 h-10 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `casino` }) }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: `Không Biết Uống Gì?` }), (0, R.jsx)(`p`, { className: `font-body-sm text-xs text-on-surface-variant`, children: `Để AI quay ngẫu nhiên` })] })] }), (0, R.jsx)(`p`, { className: `font-body-sm text-on-surface-variant leading-relaxed`, children: `Quá nhiều lựa chọn khiến bạn đắn đo? Hãy dùng vòng quay may mắn để chọn đồ uống hợp tâm trạng chỉ trong 3 giây.` }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs font-bold text-primary uppercase`, children: `💡 Mẹo sống khỏe` }), (0, R.jsx)(`p`, { className: `font-body-sm text-xs text-on-surface-variant`, children: `Nên hạn chế đồ ngọt và caffeine sau 16:00 chiều để đảm bảo giấc ngủ sâu tự nhiên vào ban đêm.` })] })] }), (0, R.jsx)(`div`, { className: `pt-4`, children: (0, R.jsxs)(A, { to: `/wheel`, className: `w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 transition-all shadow-md text-center`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `casino` }), (0, R.jsx)(`span`, { children: `Vào vòng quay may mắn` })] }) })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between flex-wrap gap-2`, children: [(0, R.jsx)(`h2`, { className: `font-headline-md text-headline-md text-on-surface font-bold`, children: `Thức Uống Được Yêu Thích Khác` }), (0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 p-1 rounded-full bg-surface-container-low`, children: [(0, R.jsx)(`button`, { onClick: () => r2(`all`), className: `px-3 py-1 rounded-full font-label-sm text-xs cursor-pointer ${n2 === `all` ? `bg-surface-container-lowest text-primary font-bold shadow-sm` : `text-on-surface-variant`}`, children: `Tất cả` }), (0, R.jsx)(`button`, { onClick: () => r2(`tea`), className: `px-3 py-1 rounded-full font-label-sm text-xs cursor-pointer ${n2 === `tea` ? `bg-surface-container-lowest text-primary font-bold shadow-sm` : `text-on-surface-variant`}`, children: `Trà 🍵` }), (0, R.jsx)(`button`, { onClick: () => r2(`coffee`), className: `px-3 py-1 rounded-full font-label-sm text-xs cursor-pointer ${n2 === `coffee` ? `bg-surface-container-lowest text-primary font-bold shadow-sm` : `text-on-surface-variant`}`, children: `Cà phê ☕` }), (0, R.jsx)(`button`, { onClick: () => r2(`smoothie`), className: `px-3 py-1 rounded-full font-label-sm text-xs cursor-pointer ${n2 === `smoothie` ? `bg-surface-container-lowest text-primary font-bold shadow-sm` : `text-on-surface-variant`}`, children: `Sinh tố 🥑` })] })] }), (0, R.jsx)(`div`, { className: `grid grid-cols-1 md:grid-cols-3 gap-6`, children: c2.map((e5) => (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/20`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3`, children: [(0, R.jsxs)(`div`, { className: `relative w-full h-44 rounded-2xl overflow-hidden`, children: [(0, R.jsx)(`img`, { alt: e5.name, className: `w-full h-full object-cover`, src: e5.image }), (0, R.jsx)(`span`, { className: `absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-surface-container-lowest/90 font-label-sm text-xs font-bold text-secondary`, children: e5.calories })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-primary font-semibold`, children: e5.storeName }), (0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold truncate`, children: e5.name }), (0, R.jsx)(`p`, { className: `font-body-sm text-xs text-on-surface-variant line-clamp-2`, children: e5.description })] })] }), (0, R.jsxs)(`div`, { className: `pt-4 mt-2 border-t border-surface-container flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-secondary font-bold`, children: e5.priceRange }), (0, R.jsx)(A, { to: `/detail/drink/${e5.id}`, className: `p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `arrow_forward` }) })] })] }, e5.id)) })] })] }) });
}
var ds = [{ id: `p-1`, name: `The May Cafe - Tiệm Trà & Cà Phê Tháng Năm`, category: `Cà phê làm việc & thư giãn`, tag: `Làm việc & Thư giãn`, rating: 4.8, reviewsCount: 184, distance: `650m`, distanceNum: 0.65, openHours: `07:00 – 22:30`, isOpen: true, address: `Hải Châu, Đà Nẵng`, image: `https://lh3.googleusercontent.com/aida-public/AB6AXuAh91qV8uWTTgpduGxay-aCMm8UGwfU7KaZPTZF_yTYpOM7pe-cdWX8h4P4wV2PSnyRJa0fGYvCIo76l8BzHEZzX723QuUgOXiNSgNyfjhyPvJ4mMHrO341prwc2VEVRwiiwc_m3AEmRWHVAru2O7bIv_Q3nImgjgNQddAzKQzYfUHJ4iNypqRwYC-1AScuPWOp-cmHqWXe7nygYpXwxm1OEwMyW8eHWSh4SLlWslqAy6ayCKcZVSR4`, tags: [`Yên tĩnh`, `Cắm sạc thoải mái`, `Nhiều cây xanh`, `Wifi mạnh`], isFeatured: true, description: `Khu vườn nhiệt đới ngập nắng giữa lòng thành phố, không gian gỗ mộc tối giản, thích hợp đọc sách và làm việc tập trung.` }, { id: `p-2`, name: `Biển Mỹ Khê - Cung đường dạo bộ bờ biển`, category: `Dạo mát & Thiên nhiên`, tag: `Dạo mát & Thể thao`, rating: 4.9, reviewsCount: 1250, distance: `2.4 km`, distanceNum: 2.4, openHours: `Cả ngày (24/24)`, isOpen: true, address: `Võ Nguyên Giáp, Sơn Trà, Đà Nẵng`, image: `https://lh3.googleusercontent.com/aida-public/AB6AXuCw4GY1i-xONjgDPAL9H4nUjNqNUSF8bglzWtb1Tq5Psfjq8b7Jtoor-dpenhYE6Xb1xOK9cxKvzLGgyLEQbMFyyupdwsz58RXAIPdFAZZ4XtalP6gz6k5kbDN-s_l9q7j63XkZ2ehxD7ECmm0IgiH8OwMiTUixNhnJD5hc8-nu8lF08_IiZAUUvG4v1B_qZoVeNOpZtmnYP9MTH9XFWuBM1MDXpE1ioCJ2e5L_9Se8cwpN6kKdSvd6`, tags: [`Gió biển mát`, `Ngắm hoàng hôn`, `5000 bước chân`], isFeatured: false, description: `Một trong những bãi biển quyến rũ nhất hành tinh với bãi cát trắng mịn, rặng dừa xanh mướt và không khí biển trong lành xua tan mọi áp lực.` }, { id: `p-3`, name: `Cầu Rồng & Bờ Kè Sông Hàn`, category: `Check-in & Đi dạo tối`, tag: `Khám phá về đêm`, rating: 4.8, reviewsCount: 890, distance: `1.5 km`, distanceNum: 1.5, openHours: `Cả ngày`, isOpen: true, address: `Đường Bạch Đằng, Hải Châu, Đà Nẵng`, image: `https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80`, tags: [`Gió sông mát`, `Nhạc acoustic ven đường`, `Cầu phun lửa cuối tuần`], isFeatured: false, description: `Biểu tượng tràn đầy sức sống của Đà Nẵng, tản bộ ngắm ánh đèn lung linh phản chiếu trên mặt nước sông Hàn.` }, { id: `p-4`, name: `Bán Đảo Sơn Trà - Đỉnh Bàn Cờ & Cây Đa Ngàn Năm`, category: `Dã ngoại & Check-in`, tag: `Thiên nhiên hùng vĩ`, rating: 4.9, reviewsCount: 640, distance: `8.5 km`, distanceNum: 8.5, openHours: `06:00 - 18:00`, isOpen: true, address: `Bán đảo Sơn Trà, Đà Nẵng`, image: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80`, tags: [`Ngắm toàn cảnh thành phố`, `Không khí trong lành`, `Voọc chà vá chân nâu`], isFeatured: false, description: `Lá phổi xanh nguyên sơ của thành phố, nơi bạn có thể phóng tầm mắt ngắm trọn vẹn vịnh biển và toàn cảnh Đà Nẵng từ trên cao.` }], fs = { getAll: async (e4 = {}) => {
  try {
    let t2 = await Lo.get(`/places`, { params: e4 });
    return t2.data && t2.data.length > 0 ? t2.data : ds;
  } catch {
    return ds;
  }
}, getById: async (e4) => {
  try {
    return (await Lo.get(`/places/${e4}`)).data;
  } catch {
    return ds.find((t2) => t2.id === e4) || ds[0];
  }
} };
function ps() {
  let [e4, t2] = (0, v.useState)([]), [n2, r2] = (0, v.useState)(`all`), [i2, a2] = (0, v.useState)({});
  (0, v.useEffect)(() => {
    (async () => {
      let e5 = await fs.getAll();
      t2(e5);
    })();
  }, []);
  let o2 = (e5) => {
    a2((t3) => ({ ...t3, [e5]: !t3[e5] }));
  }, s2 = e4.filter((e5) => n2 === `work` ? e5.category.includes(`làm việc`) || e5.tags.includes(`Yên tĩnh`) : n2 === `nature` ? e5.category.includes(`Thiên nhiên`) || e5.category.includes(`Dã ngoại`) || e5.tags.includes(`Gió biển mát`) : n2 !== `night` || e5.category.includes(`về đêm`) || e5.category.includes(`tối`));
  return (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col md:flex-row items-start md:items-end justify-between gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3 max-w-2xl`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-fixed/60 text-tertiary font-label-md text-label-md w-fit font-semibold`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `explore` }), (0, R.jsx)(`span`, { children: `Trụ cột Đi đâu • Trải nghiệm & Kết nối` })] }), (0, R.jsxs)(`h1`, { className: `font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold`, children: [`Hôm nay đi đâu? `, (0, R.jsx)(`span`, { className: `inline-block hover:rotate-12 transition-transform`, children: `🌿` })] }), (0, R.jsx)(`p`, { className: `font-body-lg text-body-lg text-on-surface-variant`, children: `Khám phá không gian làm việc xanh mát, cung đường dạo bộ bờ biển và điểm hẹn bình yên gần bạn.` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-3`, children: [(0, R.jsxs)(A, { to: `/wheel`, className: `flex items-center gap-2 px-5 py-3 rounded-full bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-md text-label-md font-bold transition-all shadow-md`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `casino` }), (0, R.jsx)(`span`, { children: `Quay chọn điểm đến` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 px-4 py-3 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20`, children: [(0, R.jsx)(`span`, { className: `w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface font-semibold`, children: `Đà Nẵng • 29°C Gió mát` })] })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none`, children: [(0, R.jsx)(`button`, { onClick: () => r2(`all`), className: `px-5 py-2.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${n2 === `all` ? `bg-on-background text-on-primary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Tất cả điểm đến` }), (0, R.jsx)(`button`, { onClick: () => r2(`work`), className: `px-5 py-2.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${n2 === `work` ? `bg-on-background text-on-primary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Làm việc & Yên tĩnh 💻` }), (0, R.jsx)(`button`, { onClick: () => r2(`nature`), className: `px-5 py-2.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${n2 === `nature` ? `bg-on-background text-on-primary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Dạo mát bờ biển & Thiên nhiên 🌊` }), (0, R.jsx)(`button`, { onClick: () => r2(`night`), className: `px-5 py-2.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${n2 === `night` ? `bg-on-background text-on-primary font-bold` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Hẹn hò & Check-in tối 🌉` })] }), (0, R.jsx)(`div`, { className: `grid grid-cols-1 md:grid-cols-2 gap-8`, children: s2.map((e5) => {
    let t3 = !!i2[e5.id];
    return (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group border border-outline-variant/20`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `relative w-full h-64 rounded-2xl overflow-hidden shadow-sm`, children: [(0, R.jsx)(`img`, { alt: e5.name, className: `w-full h-full object-cover group-hover:scale-105 transition-transform duration-700`, src: e5.image }), (0, R.jsx)(`div`, { className: `absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-black/10` }), (0, R.jsx)(`div`, { className: `absolute top-3 left-3 flex items-center gap-2`, children: (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-tertiary-container font-label-sm text-xs font-bold shadow-sm`, children: e5.openHours }) }), (0, R.jsx)(`button`, { onClick: () => o2(e5.id), className: `absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface hover:text-tertiary flex items-center justify-center transition-all shadow-sm cursor-pointer`, title: `Lưu điểm hẹn`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px] ${t3 ? `text-tertiary` : ``}`, children: t3 ? `bookmark` : `bookmark_border` }) }), (0, R.jsxs)(`div`, { className: `absolute bottom-3 left-4 right-4 text-white`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 mb-1`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-secondary text-[16px]`, children: `star` }), (0, R.jsx)(`span`, { className: `font-bold text-sm`, children: e5.rating }), (0, R.jsxs)(`span`, { className: `text-xs opacity-80`, children: [`(`, e5.reviewsCount, ` đánh giá)`] }), (0, R.jsx)(`span`, { className: `mx-1`, children: `•` }), (0, R.jsxs)(`span`, { className: `text-xs opacity-90`, children: [`📍 `, e5.distance] })] }), (0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm font-bold truncate`, children: e5.name })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-2`, children: [(0, R.jsx)(`p`, { className: `font-body-md text-body-md text-on-surface-variant`, children: e5.description }), (0, R.jsx)(`div`, { className: `flex flex-wrap items-center gap-1.5 pt-1`, children: e5.tags.map((e6, t4) => (0, R.jsxs)(`span`, { className: `px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-xs`, children: [`#`, e6] }, t4)) })] })] }), (0, R.jsxs)(`div`, { className: `pt-6 mt-2 border-t border-surface-container grid grid-cols-2 gap-3`, children: [(0, R.jsx)(A, { to: `/detail/place/${e5.id}`, className: `py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors text-center`, children: (0, R.jsx)(`span`, { children: `Xem không gian & map` }) }), (0, R.jsxs)(A, { to: `/planner`, className: `py-3 px-4 rounded-xl bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm text-center`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `add_location_alt` }), (0, R.jsx)(`span`, { children: `Thêm vào lịch trình` })] })] })] }, e5.id);
  }) })] }) });
}
var ms = [{ id: `o-1`, styleName: `Smart-Casual Thoải Mái`, weatherCondition: `Nắng nhẹ • 29°C • Gió mát ven biển`, suitableFor: `Làm việc linh hoạt & Cà phê chiều`, colorPalette: [`#ffffff`, `#e5eeff`, `#d3e4fe`, `#fd761a`], colorNames: [`Trắng cotton`, `Xanh pastel`, `Be nhẹ`, `Cam ấm`], items: [{ name: `Áo thun cotton mát`, category: `Áo`, icon: `dry_cleaning`, note: `Thấm hút mồ hôi, thoáng khí` }, { name: `Quần short linen be`, category: `Quần`, icon: `styler`, note: `Form rộng rãi, chất vải tự nhiên` }, { name: `Sneaker trắng êm`, category: `Giày`, icon: `steps`, note: `Đế đệm khí êm chân đi bộ 5.000 bước` }, { name: `Kính râm chống UV`, category: `Phụ kiện`, icon: `video_file`, note: `Bảo vệ mắt dưới ánh nắng Đà Nẵng` }], tips: `Tránh các chất liệu nỉ dày hay polyester bí bách vào buổi chiều khi ra ngoài đường.`, isFeatured: true }, { id: `o-2`, styleName: `Năng Động Thể Thao Bờ Biển`, weatherCondition: `Hoàng hôn mát mẻ • 27°C`, suitableFor: `Dạo bộ biển Mỹ Khê & Tập thể dục`, colorPalette: [`#1e293b`, `#38bdf8`, `#ffffff`], colorNames: [`Đen than`, `Xanh biển`, `Trắng`], items: [{ name: `Áo ba lỗ thể thao dri-fit`, category: `Áo`, icon: `dry_cleaning`, note: `Siêu nhẹ, khô nhanh` }, { name: `Quần dù running 2 lớp`, category: `Quần`, icon: `styler`, note: `Co giãn 4 chiều tiện vận động` }, { name: `Giày chạy bộ êm ái`, category: `Giày`, icon: `steps`, note: `Bám cát tốt và hỗ trợ cổ chân` }, { name: `Mũ lưỡi trai thoáng khí`, category: `Phụ kiện`, icon: `checkroom`, note: `Che nắng chiều xiên góc` }], tips: `Đem theo bình nước giữ nhiệt 500ml để bù khoáng sau khi đi bộ.`, isFeatured: false }, { id: `o-3`, styleName: `Lịch Thiệp Tinh Tế Cho Buổi Hẹn`, weatherCondition: `Tối mát • 26°C`, suitableFor: `Ăn tối & Cafe acoustic ven sông Hàn`, colorPalette: [`#0f172a`, `#f1f5f9`, `#94a3b8`], colorNames: [`Xanh navy`, `Trắng kem`, `Xám bạc`], items: [{ name: `Áo sơ mi linen cổ trụ cộc tay`, category: `Áo`, icon: `dry_cleaning`, note: `Thanh lịch nhưng vẫn trẻ trung` }, { name: `Quần chinos ống đứng màu be`, category: `Quần`, icon: `styler`, note: `Tôn dáng, thoải mái khi ngồi cafe` }, { name: `Giày lười Loafer da mềm`, category: `Giày`, icon: `steps`, note: `Lịch thiệp, dễ mang tháo` }, { name: `Đồng hồ dây da tối giản`, category: `Phụ kiện`, icon: `watch`, note: `Điểm nhấn tinh tế` }], tips: `Xịt nhẹ nước hoa hương cam chanh hoặc gỗ tuyết tùng nhẹ nhàng.`, isFeatured: false }];
function hs() {
  let [e4, t2] = (0, v.useState)(ms), [n2, r2] = (0, v.useState)(ms[0]), [i2, a2] = (0, v.useState)({}), o2 = (e5) => {
    a2((t3) => ({ ...t3, [e5]: !t3[e5] }));
  };
  return (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col md:flex-row items-start md:items-end justify-between gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3 max-w-2xl`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-label-md text-label-md w-fit font-semibold`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `checkroom` }), (0, R.jsx)(`span`, { children: `Trụ cột Mặc gì • Tự tin & Hài hòa thời tiết` })] }), (0, R.jsxs)(`h1`, { className: `font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold`, children: [`Hôm nay mặc gì? `, (0, R.jsx)(`span`, { className: `inline-block hover:rotate-12 transition-transform`, children: `✨` })] }), (0, R.jsx)(`p`, { className: `font-body-lg text-body-lg text-on-surface-variant`, children: `Gợi ý phối đồ thoáng mát, chuẩn form theo nhiệt độ 29°C và lịch trình di chuyển trong ngày của bạn.` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-3 bg-surface-container-lowest p-3.5 rounded-2xl shadow-sm border border-outline-variant/20`, children: [(0, R.jsx)(`div`, { className: `w-10 h-10 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[22px]`, children: `wb_sunny` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline uppercase tracking-wider`, children: `Thời tiết hiện tại` }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: `29°C • Nắng khô dịu` })] })] })] }), (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm flex flex-col gap-8 border border-outline-variant/30`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container pb-6`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-bold uppercase tracking-wider`, children: `Gợi ý hàng đầu` }), (0, R.jsx)(`span`, { className: `text-secondary font-label-sm text-xs font-semibold`, children: n2.weatherCondition })] }), (0, R.jsx)(`h2`, { className: `font-headline-lg text-headline-lg text-on-surface font-extrabold mt-1`, children: n2.styleName }), (0, R.jsxs)(`p`, { className: `font-body-md text-on-surface-variant`, children: [`Mục đích: `, n2.suitableFor] })] }), (0, R.jsxs)(`button`, { onClick: () => o2(n2.id), className: `flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-sm transition-colors cursor-pointer self-start sm:self-center`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px] ${i2[n2.id] ? `text-primary` : ``}`, children: i2[n2.id] ? `bookmark` : `bookmark_border` }), (0, R.jsx)(`span`, { children: i2[n2.id] ? `Đã lưu` : `Lưu set đồ` })] })] }), (0, R.jsx)(`div`, { className: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`, children: n2.items.map((e5, t3) => (0, R.jsxs)(`div`, { className: `p-5 rounded-2xl bg-surface-container-low flex flex-col gap-3 border border-outline-variant/20 hover:shadow-sm transition-all`, children: [(0, R.jsx)(`div`, { className: `w-12 h-12 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: e5.icon }) }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline uppercase font-semibold`, children: e5.category }), (0, R.jsx)(`h4`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5`, children: e5.name }), (0, R.jsx)(`p`, { className: `font-body-sm text-xs text-on-surface-variant mt-1`, children: e5.note })] })] }, t3)) }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-container`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-2`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline uppercase font-bold tracking-wider`, children: `Bảng màu gợi ý cho set đồ` }), (0, R.jsx)(`div`, { className: `flex items-center gap-3`, children: n2.colorPalette.map((e5, t3) => (0, R.jsxs)(`div`, { className: `flex flex-col items-center gap-1`, children: [(0, R.jsx)(`div`, { className: `w-12 h-12 rounded-2xl shadow-sm border border-outline-variant/40`, style: { backgroundColor: e5 } }), (0, R.jsx)(`span`, { className: `font-label-sm text-xs text-on-surface-variant`, children: n2.colorNames[t3] })] }, t3)) })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex flex-col gap-1.5 justify-center`, children: [(0, R.jsxs)(`span`, { className: `font-label-sm text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `tips_and_updates` }), `Lời khuyên thời trang hôm nay`] }), (0, R.jsx)(`p`, { className: `font-body-sm text-sm text-on-surface-variant`, children: n2.tips })] })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsx)(`h3`, { className: `font-headline-md text-headline-md text-on-surface font-bold`, children: `Chọn Phong Cách Khác Cho Ngày Hôm Nay` }), (0, R.jsx)(`div`, { className: `grid grid-cols-1 md:grid-cols-3 gap-6`, children: e4.map((e5) => {
    let t3 = n2.id === e5.id;
    return (0, R.jsxs)(`div`, { onClick: () => r2(e5), className: `p-6 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between gap-4 border ${t3 ? `bg-surface-container-lowest border-primary shadow-md ring-2 ring-primary/20` : `bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant`}`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-2`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`span`, { className: `font-label-sm text-xs px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-semibold`, children: [e5.items.length, ` món đồ`] }), t3 && (0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[20px]`, children: `check_circle` })] }), (0, R.jsx)(`h4`, { className: `font-headline-sm text-headline-sm text-on-surface font-bold`, children: e5.styleName }), (0, R.jsx)(`p`, { className: `font-body-sm text-xs text-on-surface-variant`, children: e5.suitableFor })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 pt-2 border-t border-surface-container`, children: [e5.colorPalette.map((e6, t4) => (0, R.jsx)(`span`, { className: `w-5 h-5 rounded-full border border-outline-variant/40`, style: { backgroundColor: e6 } }, t4)), (0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline ml-auto`, children: t3 ? `Đang chọn` : `Bấm để xem` })] })] }, e5.id);
  }) })] })] }) });
}
function gs() {
  let [e4, t2] = (0, v.useState)(Ro.timeline), [n2, r2] = (0, v.useState)(false), [i2, a2] = (0, v.useState)({ title: ``, time: `15:00 – 16:30`, location: ``, note: ``, type: `task`, badge: `Tự chọn` }), o2 = (e5) => {
    t2((t3) => t3.map((t4) => t4.id === e5 ? { ...t4, status: t4.status === `completed` ? `upcoming` : `completed` } : t4));
  }, s2 = (e5) => {
    t2((t3) => t3.filter((t4) => t4.id !== e5));
  };
  return (0, R.jsxs)(`div`, { className: `w-full`, children: [(0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col md:flex-row items-start md:items-end justify-between gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3 max-w-2xl`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-label-md text-label-md w-fit font-semibold`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `calendar_today` }), (0, R.jsx)(`span`, { children: `Lịch Trình Chi Tiết • Tích Hợp 4 Trụ Cột` })] }), (0, R.jsx)(`h1`, { className: `font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold`, children: `Kế Hoạch Ngày Hôm Nay 🗓️` }), (0, R.jsx)(`p`, { className: `font-body-lg text-body-lg text-on-surface-variant`, children: `Kết hợp hài hòa giữa mục tiêu công việc, món ngon nạp năng lượng, điểm hẹn thư giãn và trang phục thoải mái.` })] }), (0, R.jsx)(`div`, { className: `flex items-center gap-3`, children: (0, R.jsxs)(`button`, { onClick: () => r2(true), className: `flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold transition-all shadow-md cursor-pointer`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `add` }), (0, R.jsx)(`span`, { children: `Thêm vào lịch trình` })] }) })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`, children: [(0, R.jsxs)(`div`, { className: `p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex items-center gap-4`, children: [(0, R.jsx)(`div`, { className: `w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: `task_alt` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Công việc cần làm` }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm font-bold text-on-surface`, children: `5 hoạt động` })] })] }), (0, R.jsxs)(`div`, { className: `p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex items-center gap-4`, children: [(0, R.jsx)(`div`, { className: `w-12 h-12 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: `restaurant` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Dự trù ẩm thực` }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm font-bold text-secondary`, children: `~180.000đ` })] })] }), (0, R.jsxs)(`div`, { className: `p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex items-center gap-4`, children: [(0, R.jsx)(`div`, { className: `w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: `directions_walk` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Vận động bước chân` }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm font-bold text-tertiary`, children: `6.200 bước` })] })] }), (0, R.jsxs)(`div`, { className: `p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex items-center gap-4`, children: [(0, R.jsx)(`div`, { className: `w-12 h-12 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: `wb_sunny` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Thời tiết hôm nay` }), (0, R.jsx)(`span`, { className: `font-headline-sm text-headline-sm font-bold text-on-surface`, children: `29°C Nắng dịu` })] })] })] }), (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 sm:p-10 shadow-sm border border-outline-variant/30 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`h2`, { className: `font-headline-md text-headline-md font-bold text-on-surface`, children: `Dòng Thời Gian Chi Tiết` }), (0, R.jsx)(`span`, { className: `font-label-md text-label-md text-on-surface-variant`, children: `Thứ Năm, 24 Tháng 10, 2024` })] }), (0, R.jsx)(`div`, { className: `relative flex flex-col gap-6 pl-4 sm:pl-8 before:absolute before:left-4 sm:before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-surface-container-high`, children: e4.map((e5) => {
    let t3 = e5.status === `completed`;
    return (0, R.jsxs)(`div`, { className: `relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl shadow-sm -ml-4 sm:-ml-8 pl-10 sm:pl-14 transition-all hover:shadow-md border ${t3 ? `bg-surface-container-low border-outline-variant/20 opacity-80` : `bg-surface-container-lowest border-outline-variant/30`}`, children: [(0, R.jsx)(`div`, { className: `absolute left-2.5 sm:left-6 top-6 sm:top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-surface-container-lowest flex items-center justify-center`, children: (0, R.jsx)(`div`, { className: `w-2 h-2 rounded-full bg-white` }) }), (0, R.jsxs)(`div`, { className: `flex items-start sm:items-center gap-4 flex-1`, children: [(0, R.jsx)(`button`, { onClick: () => o2(e5.id), className: `mt-0.5 sm:mt-0 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${t3 ? `bg-primary text-on-primary` : `bg-surface-container-high text-outline hover:bg-primary hover:text-on-primary`}`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px] ${t3 ? `opacity-100` : `opacity-0 hover:opacity-100`}`, children: `check` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `font-label-md text-label-md font-bold text-primary`, children: e5.time }), (0, R.jsx)(`span`, { className: `px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-xs font-semibold text-on-surface-variant`, children: e5.badge })] }), (0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm text-on-surface font-semibold ${t3 ? `line-through text-outline` : ``}`, children: e5.title }), (0, R.jsxs)(`span`, { className: `font-body-sm text-xs text-on-surface-variant`, children: [`📍 `, e5.location, ` • `, e5.note] })] })] }), (0, R.jsx)(`div`, { className: `flex items-center gap-2 self-end sm:self-center`, children: (0, R.jsx)(`button`, { onClick: () => s2(e5.id), className: `p-2 rounded-full hover:bg-surface-container text-outline hover:text-error transition-colors cursor-pointer`, title: `Xóa`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `delete` }) }) })] }, e5.id);
  }) })] })] }), (0, R.jsx)(Xo, { isOpen: n2, onClose: () => r2(false), title: `Thêm Hoạt Động Vào Kế Hoạch`, children: (0, R.jsxs)(`form`, { onSubmit: (e5) => {
    if (e5.preventDefault(), !i2.title) return;
    let n3 = { id: `sch-` + Date.now(), ...i2, status: `upcoming`, color: i2.type === `food` ? `secondary` : i2.type === `place` ? `tertiary` : `primary` };
    t2((e6) => [...e6, n3]), r2(false), a2({ title: ``, time: `15:00 – 16:30`, location: ``, note: ``, type: `task`, badge: `Tự chọn` });
  }, className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Tên hoạt động *` }), (0, R.jsx)(`input`, { type: `text`, required: true, placeholder: `VD: Cà phê sáng, Hoàn thành báo cáo...`, value: i2.title, onChange: (e5) => a2({ ...i2, title: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface` })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-2 gap-3`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Khung giờ` }), (0, R.jsx)(`input`, { type: `text`, placeholder: `15:00 – 16:30`, value: i2.time, onChange: (e5) => a2({ ...i2, time: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface` })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Trụ cột lối sống` }), (0, R.jsxs)(`select`, { value: i2.type, onChange: (e5) => a2({ ...i2, type: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface`, children: [(0, R.jsx)(`option`, { value: `task`, children: `Làm gì (Công việc)` }), (0, R.jsx)(`option`, { value: `food`, children: `Ăn gì (Ẩm thực)` }), (0, R.jsx)(`option`, { value: `place`, children: `Đi đâu (Điểm hẹn)` })] })] })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`, children: `Địa điểm & Ghi chú` }), (0, R.jsx)(`input`, { type: `text`, placeholder: `VD: Quán The May Cafe, Hải Châu...`, value: i2.location, onChange: (e5) => a2({ ...i2, location: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface` })] }), (0, R.jsxs)(`div`, { className: `flex items-center justify-end gap-3 pt-4 border-t border-surface-container`, children: [(0, R.jsx)(`button`, { type: `button`, onClick: () => r2(false), className: `px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-label-md`, children: `Hủy` }), (0, R.jsx)(`button`, { type: `submit`, className: `px-5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md font-semibold transition-all shadow-sm`, children: `Thêm vào lịch` })] })] }) })] });
}
function _s() {
  let [e4, t2] = (0, v.useState)(`food`), [n2, r2] = (0, v.useState)(false), [i2, a2] = (0, v.useState)(22.5), [o2, s2] = (0, v.useState)(os[0]), c2 = { food: [{ name: `Mì Quảng Ếch`, icon: `🍜`, color: `#ffb690`, item: os[1] }, { name: `Bún Chả Cá`, icon: `🍲`, color: `#ffd0b0`, item: os[0] }, { name: `Bánh Mì`, icon: `🥖`, color: `#ffdbca`, item: os[2] }, { name: `Bánh Xèo`, icon: `🥞`, color: `#ffc8a8`, item: os[3] }, { name: `Cơm Gà`, icon: `🍗`, color: `#ffdbca`, item: os[0] }, { name: `Bún Thịt Nướng`, icon: `🥗`, color: `#ffd0b0`, item: os[1] }, { name: `Chè Sầu`, icon: `🍧`, color: `#ffb690`, item: os[4] }, { name: `Bún Mắm Nêm`, icon: `🥘`, color: `#ffc8a8`, item: os[0] }], drink: [{ name: `Trà Đào Cam Sả`, icon: `🍹`, color: `#ffb690`, item: ls[0] }, { name: `Cà Phê Muối`, icon: `☕`, color: `#ffd0b0`, item: ls[1] }, { name: `Cold Brew Cam`, icon: `🧊`, color: `#ffdbca`, item: ls[2] }, { name: `Sinh Tố Bơ`, icon: `🥑`, color: `#ffc8a8`, item: ls[3] }, { name: `Trà Sen Vàng`, icon: `🧋`, color: `#ffdbca`, item: ls[0] }, { name: `Nước Dừa Tươi`, icon: `🥥`, color: `#ffd0b0`, item: ls[1] }, { name: `Matcha Latte`, icon: `🍵`, color: `#ffb690`, item: ls[2] }, { name: `Bạc Xỉu Đá`, icon: `🥛`, color: `#ffc8a8`, item: ls[0] }], place: [{ name: `The May Cafe`, icon: `☕`, color: `#6ffbbe`, item: ds[0] }, { name: `Biển Mỹ Khê`, icon: `🌊`, color: `#4edea3`, item: ds[1] }, { name: `Cầu Rồng`, icon: `🐉`, color: `#a7f3d0`, item: ds[2] }, { name: `Bán Đảo Sơn Trà`, icon: `⛰️`, color: `#6ee7b7`, item: ds[3] }, { name: `Bảo Tàng Chăm`, icon: `🏛️`, color: `#4edea3`, item: ds[0] }, { name: `Công Viên APEC`, icon: `🌳`, color: `#a7f3d0`, item: ds[1] }, { name: `Bờ Kè Sông Hàn`, icon: `🌉`, color: `#6ffbbe`, item: ds[2] }, { name: `Chợ Đêm Sơn Trà`, icon: `🛍️`, color: `#6ee7b7`, item: ds[3] }] }[e4], l2 = () => {
    if (n2) return;
    r2(true);
    let e5 = Math.floor(Math.random() * c2.length), t3 = 5 + Math.floor(Math.random() * 4), i3 = 360 / c2.length, o3 = 360 * t3 + (360 - e5 * i3 - i3 / 2);
    a2(o3), setTimeout(() => {
      r2(false), s2(c2[e5].item);
    }, 4200);
  };
  return (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8`, children: [(0, R.jsx)(`div`, { className: `flex flex-col md:flex-row items-start md:items-end justify-between gap-4`, children: (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`div`, { className: `flex items-center gap-2`, children: (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-xs font-bold uppercase tracking-wider`, children: `Lifestyle AI • Quyết định nhanh` }) }), (0, R.jsx)(`h1`, { className: `font-headline-lg text-display-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight mt-1`, children: `Vòng Quay May Mắn Hôm Nay! 🎰` }), (0, R.jsx)(`p`, { className: `font-body-md text-on-surface-variant max-w-2xl mt-1`, children: `Băn khoăn vì quá nhiều lựa chọn? Để vũ trụ và AI chọn giúp bạn món ngon hoặc điểm hẹn chuẩn gu trong 1 nốt nhạc!` })] }) }), (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 lg:p-10 shadow-sm border border-outline-variant/30 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `w-full max-w-md mx-auto flex items-center p-1 bg-surface-container-low rounded-full gap-1`, children: [(0, R.jsxs)(`button`, { onClick: () => {
    t2(`food`), s2(os[0]);
  }, className: `flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full font-label-md text-label-md font-bold transition-all cursor-pointer ${e4 === `food` ? `bg-surface-container-lowest text-primary shadow-sm` : `text-on-surface-variant hover:text-on-surface`}`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[17px]`, children: `ramen_dining` }), (0, R.jsx)(`span`, { children: `Ăn gì?` })] }), (0, R.jsxs)(`button`, { onClick: () => {
    t2(`drink`), s2(ls[0]);
  }, className: `flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full font-label-md text-label-md font-bold transition-all cursor-pointer ${e4 === `drink` ? `bg-surface-container-lowest text-primary shadow-sm` : `text-on-surface-variant hover:text-on-surface`}`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[17px]`, children: `local_cafe` }), (0, R.jsx)(`span`, { children: `Uống gì?` })] }), (0, R.jsxs)(`button`, { onClick: () => {
    t2(`place`), s2(ds[0]);
  }, className: `flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full font-label-md text-label-md font-bold transition-all cursor-pointer ${e4 === `place` ? `bg-surface-container-lowest text-primary shadow-sm` : `text-on-surface-variant hover:text-on-surface`}`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[17px]`, children: `near_me` }), (0, R.jsx)(`span`, { children: `Đi đâu?` })] })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`, children: [(0, R.jsx)(`div`, { className: `lg:col-span-6 flex flex-col items-center justify-center`, children: (0, R.jsxs)(`div`, { className: `relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center`, children: [(0, R.jsx)(`div`, { className: `absolute inset-1 rounded-full bg-gradient-to-tr from-primary-fixed/60 via-secondary-fixed/50 to-tertiary-fixed/60 blur-xl opacity-75` }), (0, R.jsx)(`div`, { className: `absolute inset-0 rounded-full bg-surface-container-lowest shadow-[0_12px_36px_rgba(15,23,42,0.12)] p-2.5 flex items-center justify-center`, children: (0, R.jsx)(`svg`, { className: `w-full h-full rounded-full select-none`, style: { transform: `rotate(${i2}deg)`, transition: n2 ? `transform 4.2s cubic-bezier(0.15, 0.9, 0.2, 1)` : `none` }, viewBox: `0 0 400 400`, children: (0, R.jsx)(`g`, { transform: `translate(200, 200)`, children: c2.map((e5, t3) => {
    let n3 = 360 / c2.length, r3 = t3 * n3 * Math.PI / 180, i3 = (t3 + 1) * n3 * Math.PI / 180, a3 = 190 * Math.cos(r3), o3 = 190 * Math.sin(r3), s3 = 190 * Math.cos(i3), l3 = 190 * Math.sin(i3), u2 = t3 * n3 + n3 / 2;
    return (0, R.jsxs)(`g`, { children: [(0, R.jsx)(`path`, { d: `M 0 0 L ${a3} ${o3} A 190 190 0 0 1 ${s3} ${l3} Z`, fill: e5.color, stroke: `#ffffff`, strokeWidth: `2` }), (0, R.jsxs)(`text`, { transform: `rotate(${u2}) translate(110, 5)`, textAnchor: `middle`, fill: `#0b1c30`, fontSize: `13`, fontWeight: `700`, fontFamily: `Plus Jakarta Sans`, children: [e5.icon, ` `, e5.name] })] }, t3);
  }) }) }) }), (0, R.jsx)(`div`, { className: `absolute z-20 flex items-center justify-center`, children: (0, R.jsxs)(`button`, { onClick: l2, disabled: n2, className: `w-20 h-20 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-80 cursor-pointer`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[24px]`, children: `casino` }), (0, R.jsx)(`span`, { className: `text-xs uppercase`, children: n2 ? `Quay...` : `QUAY` })] }) }), (0, R.jsx)(`div`, { className: `absolute -top-3 z-30 flex flex-col items-center pointer-events-none`, children: (0, R.jsx)(`div`, { className: `w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-error filter drop-shadow-md` }) })] }) }), (0, R.jsx)(`div`, { className: `lg:col-span-6 flex flex-col gap-6`, children: (0, R.jsxs)(`div`, { className: `p-6 rounded-3xl bg-surface-container-low flex flex-col gap-4 border border-outline-variant/30`, children: [(0, R.jsx)(`div`, { className: `flex items-center gap-2`, children: (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-xs font-bold uppercase tracking-wider`, children: n2 ? `Đang chọn ngẫu nhiên...` : `Gợi ý vũ trụ ban tặng ✨` }) }), o2 && (0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `relative w-full h-52 rounded-2xl overflow-hidden shadow-sm`, children: [(0, R.jsx)(`img`, { alt: o2.name, className: `w-full h-full object-cover`, src: o2.image }), (0, R.jsx)(`div`, { className: `absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-black/10` }), (0, R.jsxs)(`div`, { className: `absolute bottom-3 left-4 right-4 text-white`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs opacity-90 block`, children: o2.category || o2.openHours }), (0, R.jsx)(`h3`, { className: `font-headline-md text-headline-md font-bold`, children: o2.name })] })] }), (0, R.jsx)(`p`, { className: `font-body-md text-on-surface-variant`, children: o2.description }), (0, R.jsxs)(`div`, { className: `flex items-center justify-between font-label-sm text-sm pt-2 border-t border-surface-container`, children: [(0, R.jsx)(`span`, { className: `text-secondary font-bold`, children: o2.priceRange || o2.address }), (0, R.jsxs)(`span`, { className: `text-outline`, children: [`📍 `, o2.distance || o2.openHours] })] })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-2 gap-3 pt-2`, children: [(0, R.jsxs)(A, { to: `/planner`, className: `py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm text-center`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `add` }), (0, R.jsx)(`span`, { children: `Thêm vào lịch trình` })] }), (0, R.jsxs)(`button`, { onClick: l2, disabled: n2, className: `py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `replay` }), (0, R.jsx)(`span`, { children: `Quay lại` })] })] })] }) })] })] })] }) });
}
function vs() {
  let { type: e4, id: t2 } = Dt(), n2 = Tt(), [r2, i2] = (0, v.useState)(`menu`), [a2, o2] = (0, v.useState)(false), s2 = null;
  return s2 = e4 === `food` ? os.find((e5) => e5.id === t2) || os[0] : e4 === `drink` ? ls.find((e5) => e5.id === t2) || ls[0] : ds.find((e5) => e5.id === t2) || ds[0], (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-6xl mx-auto px-gutter py-8 flex flex-col gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`button`, { onClick: () => n2(-1), className: `flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-sm transition-colors cursor-pointer`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `arrow_back` }), (0, R.jsx)(`span`, { children: `Quay lại` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`button`, { onClick: () => o2(!a2), className: `p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer`, title: `Lưu vào yêu thích`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px] ${a2 ? `text-secondary` : ``}`, children: a2 ? `bookmark` : `bookmark_border` }) }), (0, R.jsx)(`button`, { onClick: () => navigator.clipboard?.writeText(window.location.href), className: `p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer`, title: `Chia sẻ`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `share` }) })] })] }), (0, R.jsxs)(`div`, { className: `rounded-[28px] bg-surface-container-lowest shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col`, children: [(0, R.jsxs)(`div`, { className: `relative w-full h-80 sm:h-96 overflow-hidden`, children: [(0, R.jsx)(`img`, { alt: s2.name, className: `w-full h-full object-cover`, src: s2.image }), (0, R.jsx)(`div`, { className: `absolute inset-0 bg-gradient-to-t from-on-surface/90 via-black/20 to-transparent` }), (0, R.jsxs)(`div`, { className: `absolute top-4 left-4 flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-xs font-bold`, children: s2.openHours || `07:00 – 22:30` }), (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-secondary-container text-on-secondary font-label-sm text-xs font-bold`, children: `Hot Trend Tuần Này` })] }), (0, R.jsxs)(`div`, { className: `absolute bottom-4 left-4 right-4 text-white`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2 mb-1 text-xs opacity-90`, children: [(0, R.jsx)(`span`, { className: `px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-semibold`, children: s2.category || `Địa điểm` }), (0, R.jsx)(`span`, { children: s2.address || `Hải Châu, Đà Nẵng` })] }), (0, R.jsx)(`h1`, { className: `font-headline-lg text-2xl sm:text-3xl font-extrabold tracking-tight`, children: s2.name })] })] }), (0, R.jsxs)(`div`, { className: `px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-surface-container`, children: [(0, R.jsxs)(`div`, { className: `flex flex-wrap items-center gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px] text-secondary`, children: `star` }), (0, R.jsx)(`span`, { className: `font-bold text-sm`, children: s2.rating || 4.9 }), (0, R.jsxs)(`span`, { className: `text-xs text-secondary opacity-80`, children: [`(`, s2.reviewsCount || 340, ` đánh giá)`] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 text-sm text-on-surface-variant`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px] text-primary`, children: `near_me` }), (0, R.jsx)(`span`, { className: `font-semibold text-on-surface`, children: s2.distance || `650m` }), (0, R.jsx)(`span`, { children: `• 4 phút đi xe` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-1.5 text-sm text-on-surface-variant`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px] text-tertiary`, children: `payments` }), (0, R.jsx)(`span`, { className: `font-semibold text-on-surface`, children: s2.priceRange || `35.000đ - 65.000đ` })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary text-xs font-bold shadow-sm`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `favorite` }), (0, R.jsx)(`span`, { children: `Match 96% với gu của bạn` })] })] }), (0, R.jsx)(`div`, { className: `p-6`, children: (0, R.jsx)(`div`, { className: `rounded-2xl bg-gradient-to-r from-primary-fixed/60 via-surface-container to-surface-container-high p-5 shadow-sm`, children: (0, R.jsxs)(`div`, { className: `flex items-start gap-3`, children: [(0, R.jsx)(`div`, { className: `w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `auto_awesome` }) }), (0, R.jsxs)(`div`, { className: `flex-1`, children: [(0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm font-bold text-on-surface`, children: `Tại sao AI đề xuất lựa chọn này cho bạn hôm nay?` }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 md:grid-cols-2 gap-3 mt-3`, children: [(0, R.jsxs)(`div`, { className: `bg-surface-container-lowest/80 backdrop-blur-sm p-3.5 rounded-xl text-sm`, children: [(0, R.jsx)(`span`, { className: `font-bold text-on-surface`, children: `Thời tiết 29°C: ` }), `Không gian mát mẻ, điều hòa 24°C hoặc sân vườn nhiều bóng cây xanh tản bộ lý tưởng.`] }), (0, R.jsxs)(`div`, { className: `bg-surface-container-lowest/80 backdrop-blur-sm p-3.5 rounded-xl text-sm`, children: [(0, R.jsx)(`span`, { className: `font-bold text-on-surface`, children: `Đúng sở thích cá nhân: ` }), s2.description || `Thực đơn nhẹ nhàng, thanh đạm, không gian yên tĩnh cắm sạc làm việc.`] })] })] })] }) }) }), (0, R.jsx)(`div`, { className: `px-6`, children: (0, R.jsxs)(`div`, { className: `flex items-center gap-2 p-1 rounded-2xl bg-surface-container-low overflow-x-auto`, children: [(0, R.jsx)(`button`, { onClick: () => i2(`menu`), className: `px-4 py-2 rounded-xl font-label-md text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${r2 === `menu` ? `bg-surface-container-lowest text-primary shadow-sm` : `text-on-surface-variant`}`, children: `Menu & Món Nổi Bật` }), (0, R.jsx)(`button`, { onClick: () => i2(`amenities`), className: `px-4 py-2 rounded-xl font-label-md text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${r2 === `amenities` ? `bg-surface-container-lowest text-primary shadow-sm` : `text-on-surface-variant`}`, children: `Tiện Ích & Không Gian` }), (0, R.jsxs)(`button`, { onClick: () => i2(`reviews`), className: `px-4 py-2 rounded-xl font-label-md text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${r2 === `reviews` ? `bg-surface-container-lowest text-primary shadow-sm` : `text-on-surface-variant`}`, children: [`Đánh Giá (`, s2.reviewsCount || 342, `)`] }), (0, R.jsx)(`button`, { onClick: () => i2(`map`), className: `px-4 py-2 rounded-xl font-label-md text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${r2 === `map` ? `bg-surface-container-lowest text-primary shadow-sm` : `text-on-surface-variant`}`, children: `Bản Đồ & Chỉ Đường` })] }) }), (0, R.jsxs)(`div`, { className: `p-6`, children: [r2 === `menu` && (0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsx)(`h4`, { className: `font-headline-sm font-bold text-on-surface`, children: `Món Ăn & Thức Uống Khuyên Dùng` }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 md:grid-cols-2 gap-4`, children: [(0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`h5`, { className: `font-bold text-on-surface`, children: `Món đặc trưng thương hiệu` }), (0, R.jsx)(`p`, { className: `text-xs text-on-surface-variant mt-0.5`, children: `Chế biến tươi mới mỗi ngày` })] }), (0, R.jsx)(`span`, { className: `font-bold text-secondary`, children: s2.priceRange || `45.000đ` })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`h5`, { className: `font-bold text-on-surface`, children: `Trà trái cây nhiệt đới` }), (0, R.jsx)(`p`, { className: `text-xs text-on-surface-variant mt-0.5`, children: `Giảm 50% đường ngọt tự nhiên` })] }), (0, R.jsx)(`span`, { className: `font-bold text-secondary`, children: `38.000đ` })] })] })] }), r2 === `amenities` && (0, R.jsxs)(`div`, { className: `grid grid-cols-2 sm:grid-cols-3 gap-3`, children: [(0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex items-center gap-2.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary`, children: `wifi` }), (0, R.jsx)(`span`, { className: `text-sm font-semibold`, children: `Wifi tốc độ cao` })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex items-center gap-2.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary`, children: `power` }), (0, R.jsx)(`span`, { className: `text-sm font-semibold`, children: `Ổ cắm điện 90% bàn` })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex items-center gap-2.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary`, children: `ac_unit` }), (0, R.jsx)(`span`, { className: `text-sm font-semibold`, children: `Điều hòa 2 tầng mát sâu` })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex items-center gap-2.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary`, children: `local_parking` }), (0, R.jsx)(`span`, { className: `text-sm font-semibold`, children: `Bãi giữ xe miễn phí` })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex items-center gap-2.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary`, children: `yard` }), (0, R.jsx)(`span`, { className: `text-sm font-semibold`, children: `Sân vườn nhiều cây xanh` })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex items-center gap-2.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary`, children: `credit_card` }), (0, R.jsx)(`span`, { className: `text-sm font-semibold`, children: `Thanh toán chuyển khoản/thẻ` })] })] }), r2 === `reviews` && (0, R.jsxs)(`div`, { className: `flex flex-col gap-3`, children: [(0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex flex-col gap-1.5`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-bold text-sm text-on-surface`, children: `Minh Quân • 2 ngày trước` }), (0, R.jsx)(`span`, { className: `text-secondary font-bold text-xs`, children: `5.0 ⭐` })] }), (0, R.jsx)(`p`, { className: `text-xs text-on-surface-variant`, children: `Quán rất yên tĩnh, nước uống thanh đạm đúng gu. Rất thích hợp để mang laptop đến làm việc cả buổi sáng.` })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex flex-col gap-1.5`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-bold text-sm text-on-surface`, children: `Thu Trang • 5 ngày trước` }), (0, R.jsx)(`span`, { className: `text-secondary font-bold text-xs`, children: `4.8 ⭐` })] }), (0, R.jsx)(`p`, { className: `text-xs text-on-surface-variant`, children: `Nhân viên thân thiện, trà đào cam sả vị rất tươi. Sẽ quay lại thường xuyên!` })] })] }), r2 === `map` && (0, R.jsxs)(`div`, { className: `p-6 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center gap-3 text-center`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[48px]`, children: `map` }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`h4`, { className: `font-bold text-on-surface`, children: s2.address || `Đà Nẵng, Việt Nam` }), (0, R.jsxs)(`p`, { className: `text-xs text-on-surface-variant mt-1`, children: [`Cách bạn `, s2.distance || `650m`, ` • Tuyến đường thuận tiện, ít kẹt xe`] })] }), (0, R.jsx)(`a`, { href: `https://maps.google.com/?q=${encodeURIComponent(s2.name + ` Đà Nẵng`)}`, target: `_blank`, rel: `noreferrer`, className: `px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-sm font-bold shadow-sm`, children: `Mở trên Google Maps ↗` })] })] }), (0, R.jsxs)(`div`, { className: `p-6 bg-surface-container-low border-t border-surface-container flex flex-wrap items-center justify-between gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline`, children: `Dự trù trải nghiệm` }), (0, R.jsx)(`span`, { className: `font-headline-sm font-bold text-secondary`, children: s2.priceRange || `35.000đ – 65.000đ` })] }), (0, R.jsx)(`div`, { className: `flex items-center gap-3`, children: (0, R.jsxs)(A, { to: `/planner`, className: `px-6 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold transition-all shadow-md flex items-center gap-1.5`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `add` }), (0, R.jsx)(`span`, { children: `Thêm vào Lịch trình hôm nay` })] }) })] })] })] }) });
}
function ys() {
  let [e4, t2] = (0, v.useState)(`tuyet_voi`), [n2, r2] = (0, v.useState)(85), [i2, a2] = (0, v.useState)(`Được hít thở không khí trong lành tại bãi biển Mỹ Khê buổi chiều.`), [o2, s2] = (0, v.useState)(`Hoàn thành trọn vẹn slide bài thuyết trình thiết kế giao diện.`), [c2, l2] = (0, v.useState)(`Bữa trưa mì Quảng ếch thơm ngon đúng khẩu vị.`), [u2, d2] = (0, v.useState)(false);
  return (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col md:flex-row items-start md:items-end justify-between gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-2 max-w-2xl`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-fixed text-secondary font-label-md text-label-md w-fit font-semibold`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `book` }), (0, R.jsx)(`span`, { children: `Nhật Ký & Tổng Kết Cuối Ngày` })] }), (0, R.jsx)(`h1`, { className: `font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold`, children: `Lắng Đọng Một Ngày Đã Qua 🌙` }), (0, R.jsx)(`p`, { className: `font-body-lg text-on-surface-variant`, children: `Dành 3 phút buổi tối để ghi nhận những nỗ lực, cảm xúc và gửi lời cảm ơn đến chính bản thân bạn.` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[20px]`, children: `calendar_today` }), (0, R.jsx)(`span`, { className: `font-label-md font-semibold text-on-surface`, children: `Thứ Năm, 24 Tháng 10` })] })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch`, children: [(0, R.jsxs)(`div`, { className: `lg:col-span-8 p-6 lg:p-8 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-6`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`h2`, { className: `font-headline-md text-headline-md font-bold text-on-surface`, children: `Hôm nay bạn cảm thấy thế nào?` }), (0, R.jsx)(`p`, { className: `font-body-sm text-on-surface-variant mt-1`, children: `Lựa chọn biểu tượng diễn tả chân thật nhất trạng thái tâm hồn bạn tối nay` })] }), (0, R.jsx)(`div`, { className: `grid grid-cols-2 sm:grid-cols-5 gap-3`, children: [{ id: `tuyet_voi`, emoji: `🌟`, label: `Tuyệt vời & Rực rỡ` }, { id: `hai_long`, emoji: `😊`, label: `Hài lòng & Vui vẻ` }, { id: `can_bang`, emoji: `🌿`, label: `Cân bằng & Bình yên` }, { id: `met_moi`, emoji: `🥱`, label: `Hơi mệt mỏi` }, { id: `nghi_ngoi`, emoji: `🌧️`, label: `Cần nghỉ ngơi` }].map((n3) => {
    let r3 = e4 === n3.id;
    return (0, R.jsxs)(`button`, { onClick: () => t2(n3.id), className: `flex flex-col items-center justify-center p-4 rounded-2xl transition-all text-center gap-2 cursor-pointer border ${r3 ? `bg-primary-fixed/40 border-primary text-primary font-bold shadow-sm ring-2 ring-primary/20` : `bg-surface-container-low border-transparent hover:bg-surface-container text-on-surface-variant`}`, children: [(0, R.jsx)(`span`, { className: `text-3xl filter transition-transform hover:scale-110`, children: n3.emoji }), (0, R.jsx)(`span`, { className: `font-label-sm text-xs`, children: n3.label })] }, n3.id);
  }) }), (0, R.jsxs)(`div`, { className: `flex flex-wrap items-center gap-2 pt-2 border-t border-surface-container`, children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline font-semibold`, children: `Tags cảm xúc:` }), (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-semibold`, children: `#ThảnhThơi` }), (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-sm text-xs font-semibold`, children: `#HoànThànhDeadline` }), (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-xs font-semibold`, children: `#BiểnChiềuMát` }), (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-xs font-semibold`, children: `#ĂnNgon` })] })] }), (0, R.jsxs)(`div`, { className: `lg:col-span-4 p-6 lg:p-8 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `w-8 h-8 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `bolt` }) }), (0, R.jsx)(`h3`, { className: `font-headline-sm font-bold text-on-surface`, children: `Chỉ Số Năng Lượng` })] }), (0, R.jsx)(`span`, { className: `w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-label-md text-on-surface-variant`, children: `Mức năng lượng còn lại` }), (0, R.jsxs)(`span`, { className: `font-headline-sm text-secondary font-bold`, children: [n2, ` / 100`] })] }), (0, R.jsx)(`input`, { type: `range`, min: `0`, max: `100`, value: n2, onChange: (e5) => r2(Number(e5.target.value)), className: `w-full h-2.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary` }), (0, R.jsx)(`span`, { className: `font-body-sm text-xs text-outline`, children: n2 > 70 ? `Tuyệt vời! Bạn duy trì năng lượng rất tốt suốt ngày.` : `Hãy dành thời gian nghỉ ngơi thư giãn và ngủ sớm nhé!` })] }), (0, R.jsxs)(`div`, { className: `p-4 rounded-2xl bg-surface-container-low flex items-center justify-between gap-3`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`span`, { className: `font-label-sm text-xs text-outline uppercase font-semibold`, children: `Hài hòa công việc - sống` }), (0, R.jsxs)(`div`, { className: `flex items-baseline gap-1 mt-0.5`, children: [(0, R.jsx)(`span`, { className: `text-2xl font-extrabold text-primary`, children: `9.2` }), (0, R.jsx)(`span`, { className: `text-xs text-on-surface-variant`, children: `/ 10` })] })] }), (0, R.jsx)(`span`, { className: `text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary-fixed`, children: `Cân đối 92%` })] })] })] }), (0, R.jsxs)(`div`, { className: `p-6 lg:p-8 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col gap-6`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-3`, children: [(0, R.jsx)(`div`, { className: `w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[22px]`, children: `favorite` }) }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`h3`, { className: `font-headline-sm text-headline-sm font-bold text-on-surface`, children: `3 Điều Bạn Biết Ơn Hôm Nay ✨` }), (0, R.jsx)(`p`, { className: `font-body-sm text-xs text-on-surface-variant`, children: `Ghi nhận những niềm vui nhỏ bé nuôi dưỡng tâm hồn tích cực` })] })] }), (0, R.jsxs)(`form`, { onSubmit: (e5) => {
    e5.preventDefault(), d2(true), setTimeout(() => d2(false), 3e3);
  }, className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex items-center gap-3`, children: [(0, R.jsx)(`span`, { className: `w-8 h-8 rounded-full bg-secondary-fixed text-secondary font-bold text-sm flex items-center justify-center shrink-0`, children: `1` }), (0, R.jsx)(`input`, { type: `text`, value: i2, onChange: (e5) => a2(e5.target.value), className: `flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-3`, children: [(0, R.jsx)(`span`, { className: `w-8 h-8 rounded-full bg-secondary-fixed text-secondary font-bold text-sm flex items-center justify-center shrink-0`, children: `2` }), (0, R.jsx)(`input`, { type: `text`, value: o2, onChange: (e5) => s2(e5.target.value), className: `flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary` })] }), (0, R.jsxs)(`div`, { className: `flex items-center gap-3`, children: [(0, R.jsx)(`span`, { className: `w-8 h-8 rounded-full bg-secondary-fixed text-secondary font-bold text-sm flex items-center justify-center shrink-0`, children: `3` }), (0, R.jsx)(`input`, { type: `text`, value: c2, onChange: (e5) => l2(e5.target.value), className: `flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary` })] }), (0, R.jsxs)(`div`, { className: `flex items-center justify-between pt-4 border-t border-surface-container mt-2`, children: [(0, R.jsx)(`span`, { className: `text-xs text-on-surface-variant`, children: u2 ? `✅ Đã lưu nhật ký hôm nay thành công!` : `Tự động lưu vào lịch sử cá nhân.` }), (0, R.jsx)(`button`, { type: `submit`, className: `px-6 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold transition-all shadow-md cursor-pointer`, children: `Lưu nhật ký ngày` })] })] })] })] }) });
}
function bs() {
  let [e4, t2] = (0, v.useState)(`all`);
  return (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8`, children: [(0, R.jsx)(`div`, { className: `flex flex-col md:flex-row items-start md:items-end justify-between gap-4`, children: (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`div`, { className: `flex items-center gap-2`, children: (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-sm text-xs font-bold uppercase tracking-wider`, children: `Bộ Sưu Tập Của Tôi` }) }), (0, R.jsx)(`h1`, { className: `font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold mt-1`, children: `Địa Điểm & Món Ngon Yêu Thích ❤️` }), (0, R.jsx)(`p`, { className: `font-body-md text-on-surface-variant mt-1`, children: `Những địa điểm, quán ngon và phong cách trang phục bạn đã đánh dấu để trải nghiệm.` })] }) }), (0, R.jsxs)(`div`, { className: `flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none`, children: [(0, R.jsx)(`button`, { onClick: () => t2(`all`), className: `px-5 py-2.5 rounded-full font-label-md text-sm font-bold shadow-sm transition-all cursor-pointer ${e4 === `all` ? `bg-on-background text-on-primary` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Tất cả đã lưu` }), (0, R.jsx)(`button`, { onClick: () => t2(`food`), className: `px-5 py-2.5 rounded-full font-label-md text-sm font-bold shadow-sm transition-all cursor-pointer ${e4 === `food` ? `bg-on-background text-on-primary` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Món ăn & Quán ngon 🍜` }), (0, R.jsx)(`button`, { onClick: () => t2(`place`), className: `px-5 py-2.5 rounded-full font-label-md text-sm font-bold shadow-sm transition-all cursor-pointer ${e4 === `place` ? `bg-on-background text-on-primary` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Điểm hẹn & Cà phê ☕` }), (0, R.jsx)(`button`, { onClick: () => t2(`outfit`), className: `px-5 py-2.5 rounded-full font-label-md text-sm font-bold shadow-sm transition-all cursor-pointer ${e4 === `outfit` ? `bg-on-background text-on-primary` : `bg-surface-container-lowest text-on-surface-variant hover:text-on-surface`}`, children: `Set đồ outfit 👕` })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 md:grid-cols-3 gap-6`, children: [(e4 === `all` || e4 === `food`) && os.slice(0, 2).map((e5) => (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-5 flex flex-col justify-between shadow-sm border border-outline-variant/20 hover:shadow-md transition-all`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3`, children: [(0, R.jsxs)(`div`, { className: `relative w-full h-44 rounded-2xl overflow-hidden`, children: [(0, R.jsx)(`img`, { alt: e5.name, className: `w-full h-full object-cover`, src: e5.image }), (0, R.jsx)(`span`, { className: `absolute top-3 right-3 p-1.5 rounded-full bg-surface-container-lowest text-secondary shadow-sm`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `bookmark` }) })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`span`, { className: `text-xs text-secondary font-bold`, children: e5.category }), (0, R.jsx)(`h3`, { className: `font-headline-sm font-bold text-on-surface truncate`, children: e5.name }), (0, R.jsx)(`p`, { className: `text-xs text-on-surface-variant line-clamp-2 mt-1`, children: e5.description })] })] }), (0, R.jsxs)(`div`, { className: `pt-4 mt-2 border-t border-surface-container flex items-center justify-between`, children: [(0, R.jsx)(`span`, { className: `font-bold text-secondary text-sm`, children: e5.priceRange }), (0, R.jsx)(A, { to: `/detail/food/${e5.id}`, className: `p-2 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-colors`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `arrow_forward` }) })] })] }, e5.id)), (e4 === `all` || e4 === `place`) && ds.slice(0, 2).map((e5) => (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-5 flex flex-col justify-between shadow-sm border border-outline-variant/20 hover:shadow-md transition-all`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3`, children: [(0, R.jsxs)(`div`, { className: `relative w-full h-44 rounded-2xl overflow-hidden`, children: [(0, R.jsx)(`img`, { alt: e5.name, className: `w-full h-full object-cover`, src: e5.image }), (0, R.jsx)(`span`, { className: `absolute top-3 right-3 p-1.5 rounded-full bg-surface-container-lowest text-tertiary shadow-sm`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `bookmark` }) })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`span`, { className: `text-xs text-tertiary font-bold`, children: e5.category }), (0, R.jsx)(`h3`, { className: `font-headline-sm font-bold text-on-surface truncate`, children: e5.name }), (0, R.jsx)(`p`, { className: `text-xs text-on-surface-variant line-clamp-2 mt-1`, children: e5.description })] })] }), (0, R.jsxs)(`div`, { className: `pt-4 mt-2 border-t border-surface-container flex items-center justify-between`, children: [(0, R.jsxs)(`span`, { className: `text-xs text-outline`, children: [`📍 `, e5.distance] }), (0, R.jsx)(A, { to: `/detail/place/${e5.id}`, className: `p-2 rounded-xl bg-surface-container text-tertiary hover:bg-surface-container-high transition-colors`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `arrow_forward` }) })] })] }, e5.id)), (e4 === `all` || e4 === `outfit`) && (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm border border-outline-variant/20`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-3`, children: [(0, R.jsx)(`span`, { className: `text-xs text-primary font-bold uppercase`, children: `Set đồ trang phục` }), (0, R.jsx)(`h3`, { className: `font-headline-sm font-bold text-on-surface`, children: ms[0].styleName }), (0, R.jsx)(`p`, { className: `text-xs text-on-surface-variant`, children: ms[0].tips }), (0, R.jsx)(`div`, { className: `flex items-center gap-2 mt-2`, children: ms[0].colorPalette.map((e5, t3) => (0, R.jsx)(`span`, { className: `w-6 h-6 rounded-full border border-outline-variant/40`, style: { backgroundColor: e5 } }, t3)) })] }), (0, R.jsx)(`div`, { className: `pt-4 mt-2 border-t border-surface-container`, children: (0, R.jsxs)(A, { to: `/outfit`, className: `w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs font-bold flex items-center justify-center gap-1 transition-colors`, children: [(0, R.jsx)(`span`, { children: `Xem chi tiết outfit` }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `arrow_forward` })] }) })] })] })] }) });
}
function xs() {
  let { user: e4, setUser: t2 } = Wo(), [n2, r2] = (0, v.useState)({ name: e4?.name || `Mai Linh`, email: e4?.email || `mailinh@todayly.vn`, bio: e4?.bio || `Yêu thích lối sống tối giản, thảnh thơi và tích cực mỗi ngày.`, city: e4?.city || `Đà Nẵng`, wakeUpTime: e4?.wakeUpTime || `06:30`, sleepTime: e4?.sleepTime || `23:00`, dietaryPreference: e4?.dietaryPreference || `Thanh đạm, ít ngọt`, favoriteStyle: e4?.favoriteStyle || `Smart-Casual`, transportation: e4?.transportation || `Xe máy & Đi bộ` }), [i2, a2] = (0, v.useState)(false);
  return (0, R.jsx)(`div`, { className: `w-full`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-4xl mx-auto px-gutter py-8 flex flex-col gap-8`, children: [(0, R.jsx)(`div`, { className: `flex items-center justify-between`, children: (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`div`, { className: `flex items-center gap-2`, children: (0, R.jsx)(`span`, { className: `px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-bold uppercase tracking-wider`, children: `Cá nhân hóa` }) }), (0, R.jsx)(`h1`, { className: `font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold mt-1`, children: `Hồ Sơ & Cài Đặt Sở Thích ⚙️` }), (0, R.jsx)(`p`, { className: `font-body-md text-on-surface-variant mt-1`, children: `Tùy chỉnh thói quen sinh hoạt để thuật toán AI đưa ra gợi ý khớp nhất với nhịp sống của bạn.` })] }) }), (0, R.jsxs)(`div`, { className: `rounded-3xl bg-surface-container-lowest p-6 sm:p-10 shadow-sm border border-outline-variant/30 flex flex-col gap-8`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-surface-container`, children: [(0, R.jsxs)(`div`, { className: `relative`, children: [(0, R.jsx)(`img`, { alt: n2.name, className: `w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 shadow-md`, src: e4?.avatar || `https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5` }), (0, R.jsx)(`button`, { type: `button`, className: `absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-white hover:bg-primary-container shadow-sm cursor-pointer`, title: `Thay ảnh đại diện`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[16px]`, children: `edit` }) })] }), (0, R.jsxs)(`div`, { className: `flex flex-col text-center sm:text-left gap-1`, children: [(0, R.jsx)(`h2`, { className: `font-headline-md text-headline-md font-bold text-on-surface`, children: n2.name }), (0, R.jsx)(`span`, { className: `font-body-sm text-sm text-on-surface-variant`, children: n2.email }), (0, R.jsx)(`span`, { className: `font-label-sm text-xs px-2.5 py-0.5 rounded-full bg-secondary-fixed text-secondary font-bold w-fit mx-auto sm:mx-0`, children: `Thành viên Lifestyle Pro ✨` })] })] }), (0, R.jsxs)(`form`, { onSubmit: (r3) => {
    r3.preventDefault(), t2({ ...e4, ...n2 }), localStorage.setItem(`todayly_user`, JSON.stringify({ ...e4, ...n2 })), a2(true), setTimeout(() => a2(false), 3e3);
  }, className: `flex flex-col gap-6`, children: [(0, R.jsxs)(`div`, { className: `grid grid-cols-1 sm:grid-cols-2 gap-4`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-sm font-semibold mb-1.5`, children: `Họ và tên` }), (0, R.jsx)(`input`, { type: `text`, value: n2.name, onChange: (e5) => r2({ ...n2, name: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm` })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-sm font-semibold mb-1.5`, children: `Thành phố hiện tại` }), (0, R.jsx)(`input`, { type: `text`, value: n2.city, onChange: (e5) => r2({ ...n2, city: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm` })] })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-md text-sm font-semibold mb-1.5`, children: `Giới thiệu ngắn` }), (0, R.jsx)(`textarea`, { rows: 2, value: n2.bio, onChange: (e5) => r2({ ...n2, bio: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm` })] }), (0, R.jsxs)(`div`, { className: `pt-4 border-t border-surface-container`, children: [(0, R.jsxs)(`h3`, { className: `font-headline-sm font-bold text-on-surface mb-3 flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[20px]`, children: `bedtime` }), `Nhịp Sinh Học Cá Nhân`] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 sm:grid-cols-2 gap-4`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-sm text-xs font-semibold mb-1.5`, children: `Giờ thức dậy thông thường` }), (0, R.jsx)(`input`, { type: `time`, value: n2.wakeUpTime, onChange: (e5) => r2({ ...n2, wakeUpTime: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm` })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-sm text-xs font-semibold mb-1.5`, children: `Giờ đi ngủ mục tiêu` }), (0, R.jsx)(`input`, { type: `time`, value: n2.sleepTime, onChange: (e5) => r2({ ...n2, sleepTime: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm` })] })] })] }), (0, R.jsxs)(`div`, { className: `pt-4 border-t border-surface-container`, children: [(0, R.jsxs)(`h3`, { className: `font-headline-sm font-bold text-on-surface mb-3 flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-secondary text-[20px]`, children: `tune` }), `Sở Thích Lối Sống`] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 sm:grid-cols-3 gap-4`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-sm text-xs font-semibold mb-1.5`, children: `Khẩu vị ẩm thực` }), (0, R.jsxs)(`select`, { value: n2.dietaryPreference, onChange: (e5) => r2({ ...n2, dietaryPreference: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm`, children: [(0, R.jsx)(`option`, { value: `Thanh đạm, ít ngọt`, children: `Thanh đạm, ít ngọt` }), (0, R.jsx)(`option`, { value: `Ăn chay / Thuần chay`, children: `Ăn chay / Thuần chay` }), (0, R.jsx)(`option`, { value: `Đậm đà truyền thống`, children: `Đậm đà truyền thống` }), (0, R.jsx)(`option`, { value: `Eat clean & Healthy`, children: `Eat clean & Healthy` })] })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-sm text-xs font-semibold mb-1.5`, children: `Phong cách trang phục` }), (0, R.jsxs)(`select`, { value: n2.favoriteStyle, onChange: (e5) => r2({ ...n2, favoriteStyle: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm`, children: [(0, R.jsx)(`option`, { value: `Smart-Casual`, children: `Smart-Casual (Thoải mái lịch sự)` }), (0, R.jsx)(`option`, { value: `Minimalist`, children: `Minimalist (Tối giản tinh tế)` }), (0, R.jsx)(`option`, { value: `Sporty`, children: `Sporty (Năng động thể thao)` }), (0, R.jsx)(`option`, { value: `Vintage`, children: `Vintage cổ điển` })] })] }), (0, R.jsxs)(`div`, { children: [(0, R.jsx)(`label`, { className: `block text-on-surface font-label-sm text-xs font-semibold mb-1.5`, children: `Phương tiện di chuyển chính` }), (0, R.jsxs)(`select`, { value: n2.transportation, onChange: (e5) => r2({ ...n2, transportation: e5.target.value }), className: `w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm`, children: [(0, R.jsx)(`option`, { value: `Xe máy & Đi bộ`, children: `Xe máy & Đi bộ` }), (0, R.jsx)(`option`, { value: `Ô tô cá nhân`, children: `Ô tô cá nhân` }), (0, R.jsx)(`option`, { value: `Xe đạp & Đi bộ`, children: `Xe đạp & Đi bộ` }), (0, R.jsx)(`option`, { value: `Xe công nghệ (Grab)`, children: `Xe công nghệ (Grab)` })] })] })] })] }), (0, R.jsxs)(`div`, { className: `flex items-center justify-between pt-4 border-t border-surface-container mt-2`, children: [(0, R.jsx)(`span`, { className: `text-xs text-on-surface-variant`, children: i2 ? `✅ Đã lưu thay đổi thành công!` : `` }), (0, R.jsx)(`button`, { type: `submit`, className: `px-6 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold transition-all shadow-md cursor-pointer`, children: `Lưu cài đặt sở thích` })] })] })] })] }) });
}
function Ss() {
  let [e4, t2] = (0, v.useState)(`mailinh@todayly.vn`), [n2, r2] = (0, v.useState)(`123456`), [i2, a2] = (0, v.useState)(false), [o2, s2] = (0, v.useState)(``), [c2, l2] = (0, v.useState)(false), { login: u2 } = Wo(), d2 = Tt();
  return (0, R.jsx)(`div`, { className: `w-full min-h-[calc(100vh-160px)] flex items-center justify-center px-gutter py-10`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center`, children: [(0, R.jsx)(`div`, { className: `lg:col-span-6 flex flex-col justify-center`, children: (0, R.jsxs)(`div`, { className: `bg-surface-container-lowest p-6 sm:p-10 rounded-3xl shadow-sm border border-outline-variant/30 flex flex-col gap-6`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`div`, { className: `inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-bold uppercase tracking-wider mb-2`, children: `Chào mừng bạn quay lại` }), (0, R.jsx)(`h1`, { className: `font-headline-lg text-headline-lg font-extrabold text-on-surface tracking-tight`, children: `Đăng Nhập Todayly 👋` }), (0, R.jsx)(`p`, { className: `font-body-md text-on-surface-variant mt-1`, children: `Tiếp tục ngày mới cùng lịch trình và gợi ý lối sống thông minh.` })] }), o2 && (0, R.jsxs)(`div`, { className: `p-3.5 rounded-xl bg-error-container text-error text-xs font-semibold flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `error` }), (0, R.jsx)(`span`, { children: o2 })] }), (0, R.jsxs)(`form`, { onSubmit: async (t3) => {
    t3.preventDefault(), s2(``), l2(true);
    try {
      await u2({ email: e4, password: n2 }), d2(`/`);
    } catch (e5) {
      s2(e5.response?.data?.message || `Đăng nhập không thành công, vui lòng thử lại.`);
    } finally {
      l2(false);
    }
  }, className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5`, children: [(0, R.jsx)(`label`, { className: `font-label-md text-sm font-semibold text-on-surface`, htmlFor: `login-email`, children: `Địa chỉ Email` }), (0, R.jsxs)(`div`, { className: `relative flex items-center`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined absolute left-4 text-outline text-[20px]`, children: `mail` }), (0, R.jsx)(`input`, { id: `login-email`, type: `email`, required: true, value: e4, onChange: (e5) => t2(e5.target.value), placeholder: `mailinh@todayly.vn`, className: `w-full pl-11 pr-4 py-3.5 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary` })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5`, children: [(0, R.jsxs)(`div`, { className: `flex items-center justify-between`, children: [(0, R.jsx)(`label`, { className: `font-label-md text-sm font-semibold text-on-surface`, htmlFor: `login-password`, children: `Mật khẩu` }), (0, R.jsx)(`a`, { href: `#`, className: `font-label-md text-xs text-primary hover:underline font-semibold`, children: `Quên mật khẩu?` })] }), (0, R.jsxs)(`div`, { className: `relative flex items-center`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined absolute left-4 text-outline text-[20px]`, children: `lock` }), (0, R.jsx)(`input`, { id: `login-password`, type: i2 ? `text` : `password`, required: true, value: n2, onChange: (e5) => r2(e5.target.value), placeholder: `••••••••`, className: `w-full pl-11 pr-12 py-3.5 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary` }), (0, R.jsx)(`button`, { type: `button`, onClick: () => a2(!i2), className: `absolute right-3.5 p-1 text-outline hover:text-on-surface cursor-pointer`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: i2 ? `visibility_off` : `visibility` }) })] })] }), (0, R.jsx)(`div`, { className: `flex items-center justify-between pt-1`, children: (0, R.jsxs)(`label`, { className: `flex items-center gap-2 cursor-pointer select-none`, children: [(0, R.jsx)(`input`, { type: `checkbox`, defaultChecked: true, className: `w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer accent-primary` }), (0, R.jsx)(`span`, { className: `text-xs text-on-surface-variant`, children: `Duy trì đăng nhập trên thiết bị này` })] }) }), (0, R.jsxs)(`button`, { type: `submit`, disabled: c2, className: `w-full mt-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70`, children: [(0, R.jsx)(`span`, { children: c2 ? `Đang xác thực...` : `Đăng nhập ngay` }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `login` })] })] }), (0, R.jsx)(`div`, { className: `text-center pt-4 border-t border-surface-container`, children: (0, R.jsxs)(`p`, { className: `text-xs text-on-surface-variant`, children: [`Chưa có tài khoản hôm nay?`, ` `, (0, R.jsx)(A, { to: `/register`, className: `text-primary font-bold hover:underline`, children: `Đăng ký miễn phí` })] }) })] }) }), (0, R.jsx)(`div`, { className: `lg:col-span-6 relative flex flex-col justify-center`, children: (0, R.jsx)(`div`, { className: `relative bg-surface-container-lowest rounded-3xl p-4 sm:p-7 shadow-sm border border-outline-variant/30 overflow-hidden`, children: (0, R.jsxs)(`div`, { className: `relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden group`, children: [(0, R.jsx)(`img`, { alt: `Aesthetic lifestyle`, className: `w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out`, src: `https://lh3.googleusercontent.com/aida-public/AB6AXuB5GDg42O8_Pj0HFuLSVIcYFzhfi-Osyh5FIJEnQqPLt0fpXDytH8Ysbvst1Pc6mXxwqvb-vpCeU2Cs74ZQICZBnnPEDUaZnaAFRo7AYyWA3ISLYq8VM7StZOzgRarvORjHpMHRj1-WvIjzvh_IXUuUh2jhEJIflKR6uY-ounNpkMs6EeNe5M5j7sPAOspTuC2kGNRU8VqFhQ8S_ZovRB1hy--6kGeQEs5bcuWPFbSu1RiQXjHq-mkf` }), (0, R.jsxs)(`div`, { className: `absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/30 to-transparent flex flex-col justify-end p-6 sm:p-8`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md self-start mb-3`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-secondary text-[16px]`, children: `format_quote` }), (0, R.jsx)(`span`, { className: `font-label-sm text-xs text-on-surface font-bold`, children: `Cảm hứng sáng nay` })] }), (0, R.jsx)(`p`, { className: `font-headline-md text-lg sm:text-xl text-white font-bold leading-snug`, children: `"Mỗi ngày mới là một cơ hội để sống trọn vẹn từng khoảnh khắc."` }), (0, R.jsx)(`span`, { className: `text-xs text-white/80 mt-1`, children: `Lắng nghe nhịp điệu của tâm trí • Lên lịch trình thảnh thơi` })] }), (0, R.jsxs)(`div`, { className: `absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md flex items-center gap-2`, children: [(0, R.jsx)(`div`, { className: `w-8 h-8 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary`, children: (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `wb_sunny` }) }), (0, R.jsxs)(`div`, { className: `flex flex-col`, children: [(0, R.jsx)(`span`, { className: `font-bold text-xs text-on-surface`, children: `29°C` }), (0, R.jsx)(`span`, { className: `text-[10px] text-outline`, children: `Nắng nhẹ` })] })] })] }) }) })] }) });
}
function Cs() {
  let [e4, t2] = (0, v.useState)({ name: ``, email: ``, password: ``, confirmPassword: ``, primaryInterest: `Làm việc & Ẩm thực` }), [n2, r2] = (0, v.useState)(``), [i2, a2] = (0, v.useState)(false), { register: o2 } = Wo(), s2 = Tt();
  return (0, R.jsx)(`div`, { className: `w-full min-h-[calc(100vh-160px)] flex items-center justify-center px-gutter py-10`, children: (0, R.jsxs)(`div`, { className: `w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center`, children: [(0, R.jsx)(`div`, { className: `lg:col-span-6 flex flex-col justify-center`, children: (0, R.jsxs)(`div`, { className: `bg-surface-container-lowest p-6 sm:p-10 rounded-3xl shadow-sm border border-outline-variant/30 flex flex-col gap-6`, children: [(0, R.jsxs)(`div`, { children: [(0, R.jsx)(`div`, { className: `inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-sm text-xs font-bold uppercase tracking-wider mb-2`, children: `Bắt đầu hành trình` }), (0, R.jsx)(`h1`, { className: `font-headline-lg text-headline-lg font-extrabold text-on-surface tracking-tight`, children: `Tạo Tài Khoản Mới ✨` }), (0, R.jsx)(`p`, { className: `font-body-md text-on-surface-variant mt-1`, children: `Gia nhập cộng đồng Todayly để nhận lịch trình thông minh mỗi sáng.` })] }), n2 && (0, R.jsxs)(`div`, { className: `p-3.5 rounded-xl bg-error-container text-error text-xs font-semibold flex items-center gap-2`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-[18px]`, children: `error` }), (0, R.jsx)(`span`, { children: n2 })] }), (0, R.jsxs)(`form`, { onSubmit: async (t3) => {
    if (t3.preventDefault(), r2(``), e4.password !== e4.confirmPassword) {
      r2(`Mật khẩu xác nhận không khớp.`);
      return;
    }
    a2(true);
    try {
      await o2({ name: e4.name, email: e4.email, password: e4.password }), s2(`/`);
    } catch (e5) {
      r2(e5.response?.data?.message || `Đăng ký không thành công, vui lòng thử lại.`);
    } finally {
      a2(false);
    }
  }, className: `flex flex-col gap-4`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5`, children: [(0, R.jsx)(`label`, { className: `font-label-md text-sm font-semibold text-on-surface`, children: `Họ và tên của bạn *` }), (0, R.jsxs)(`div`, { className: `relative flex items-center`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined absolute left-4 text-outline text-[20px]`, children: `person` }), (0, R.jsx)(`input`, { type: `text`, required: true, placeholder: `Nguyễn Mai Linh`, value: e4.name, onChange: (n3) => t2({ ...e4, name: n3.target.value }), className: `w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary` })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5`, children: [(0, R.jsx)(`label`, { className: `font-label-md text-sm font-semibold text-on-surface`, children: `Địa chỉ Email *` }), (0, R.jsxs)(`div`, { className: `relative flex items-center`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined absolute left-4 text-outline text-[20px]`, children: `mail` }), (0, R.jsx)(`input`, { type: `email`, required: true, placeholder: `mailinh@example.com`, value: e4.email, onChange: (n3) => t2({ ...e4, email: n3.target.value }), className: `w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary` })] })] }), (0, R.jsxs)(`div`, { className: `grid grid-cols-1 sm:grid-cols-2 gap-3`, children: [(0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5`, children: [(0, R.jsx)(`label`, { className: `font-label-md text-sm font-semibold text-on-surface`, children: `Mật khẩu *` }), (0, R.jsx)(`input`, { type: `password`, required: true, placeholder: `••••••••`, value: e4.password, onChange: (n3) => t2({ ...e4, password: n3.target.value }), className: `w-full px-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary` })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5`, children: [(0, R.jsx)(`label`, { className: `font-label-md text-sm font-semibold text-on-surface`, children: `Nhập lại mật khẩu *` }), (0, R.jsx)(`input`, { type: `password`, required: true, placeholder: `••••••••`, value: e4.confirmPassword, onChange: (n3) => t2({ ...e4, confirmPassword: n3.target.value }), className: `w-full px-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary` })] })] }), (0, R.jsxs)(`div`, { className: `flex flex-col gap-1.5`, children: [(0, R.jsx)(`label`, { className: `font-label-md text-sm font-semibold text-on-surface`, children: `Trụ cột quan tâm nhất` }), (0, R.jsxs)(`select`, { value: e4.primaryInterest, onChange: (n3) => t2({ ...e4, primaryInterest: n3.target.value }), className: `w-full px-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface border border-transparent focus:border-primary`, children: [(0, R.jsx)(`option`, { value: `Làm việc & Ẩm thực`, children: `Cân bằng làm việc & ăn ngon` }), (0, R.jsx)(`option`, { value: `Khám phá điểm hẹn`, children: `Quán cafe & Dạo mát bờ biển` }), (0, R.jsx)(`option`, { value: `Thời trang theo thời tiết`, children: `Mặc đẹp mỗi ngày` }), (0, R.jsx)(`option`, { value: `Quản lý thời gian`, children: `Pomodoro & Kế hoạch chi tiết` })] })] }), (0, R.jsxs)(`button`, { type: `submit`, disabled: i2, className: `w-full mt-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70`, children: [(0, R.jsx)(`span`, { children: i2 ? `Đang tạo tài khoản...` : `Đăng ký ngay` }), (0, R.jsx)(`span`, { className: `material-symbols-outlined text-[20px]`, children: `how_to_reg` })] })] }), (0, R.jsx)(`div`, { className: `text-center pt-4 border-t border-surface-container`, children: (0, R.jsxs)(`p`, { className: `text-xs text-on-surface-variant`, children: [`Đã có tài khoản Todayly?`, ` `, (0, R.jsx)(A, { to: `/login`, className: `text-primary font-bold hover:underline`, children: `Đăng nhập` })] }) })] }) }), (0, R.jsx)(`div`, { className: `lg:col-span-6 relative flex flex-col justify-center`, children: (0, R.jsx)(`div`, { className: `relative bg-surface-container-lowest rounded-3xl p-4 sm:p-7 shadow-sm border border-outline-variant/30 overflow-hidden`, children: (0, R.jsxs)(`div`, { className: `relative w-full h-[320px] sm:h-[440px] rounded-2xl overflow-hidden group`, children: [(0, R.jsx)(`img`, { alt: `Mindful living`, className: `w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out`, src: `https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80` }), (0, R.jsxs)(`div`, { className: `absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/30 to-transparent flex flex-col justify-end p-6 sm:p-8`, children: [(0, R.jsxs)(`div`, { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md self-start mb-3`, children: [(0, R.jsx)(`span`, { className: `material-symbols-outlined text-primary text-[16px]`, children: `eco` }), (0, R.jsx)(`span`, { className: `font-label-sm text-xs text-on-surface font-bold`, children: `Lối sống tích cực` })] }), (0, R.jsx)(`p`, { className: `font-headline-md text-lg sm:text-xl text-white font-bold leading-snug`, children: `"Bắt đầu ngày mới với sự thảnh thơi, không còn nỗi lo 'Hôm nay ăn gì, đi đâu, làm gì'."` }), (0, R.jsx)(`span`, { className: `text-xs text-white/80 mt-1`, children: `Đồng hành cùng hơn 10.000 bạn trẻ tại Việt Nam` })] })] }) }) })] }) });
}
function ws() {
  return (0, R.jsx)(Uo, { children: (0, R.jsx)(Fn, { children: (0, R.jsxs)(`div`, { className: `flex flex-col min-h-screen bg-background text-on-surface`, children: [(0, R.jsx)(z, {}), (0, R.jsx)(`main`, { className: `flex-1 pt-20`, children: (0, R.jsxs)(Zt, { children: [(0, R.jsx)(Yt, { path: `/`, element: (0, R.jsx)(Zo, {}) }), (0, R.jsx)(Yt, { path: `/tasks`, element: (0, R.jsx)(rs, {}) }), (0, R.jsx)(Yt, { path: `/food`, element: (0, R.jsx)(cs, {}) }), (0, R.jsx)(Yt, { path: `/drinks`, element: (0, R.jsx)(us, {}) }), (0, R.jsx)(Yt, { path: `/places`, element: (0, R.jsx)(ps, {}) }), (0, R.jsx)(Yt, { path: `/outfit`, element: (0, R.jsx)(hs, {}) }), (0, R.jsx)(Yt, { path: `/planner`, element: (0, R.jsx)(gs, {}) }), (0, R.jsx)(Yt, { path: `/wheel`, element: (0, R.jsx)(_s, {}) }), (0, R.jsx)(Yt, { path: `/detail/:type/:id`, element: (0, R.jsx)(vs, {}) }), (0, R.jsx)(Yt, { path: `/journal`, element: (0, R.jsx)(ys, {}) }), (0, R.jsx)(Yt, { path: `/favorites`, element: (0, R.jsx)(bs, {}) }), (0, R.jsx)(Yt, { path: `/profile`, element: (0, R.jsx)(xs, {}) }), (0, R.jsx)(Yt, { path: `/login`, element: (0, R.jsx)(Ss, {}) }), (0, R.jsx)(Yt, { path: `/register`, element: (0, R.jsx)(Cs, {}) }), (0, R.jsx)(Yt, { path: `*`, element: (0, R.jsx)(Zo, {}) })] }) }), (0, R.jsx)(B, {})] }) }) });
}
(0, y.createRoot)(document.getElementById(`root`)).render((0, R.jsx)(v.StrictMode, { children: (0, R.jsx)(ws, {}) }));
