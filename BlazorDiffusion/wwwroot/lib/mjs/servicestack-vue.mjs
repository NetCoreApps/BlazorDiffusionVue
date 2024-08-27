var fo = Object.defineProperty;
var vo = (e, t, s) => t in e ? fo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var Le = (e, t, s) => (vo(e, typeof t != "symbol" ? t + "" : t, s), s);
import { defineComponent as ce, computed as v, openBlock as o, createElementBlock as r, normalizeClass as b, createElementVNode as l, createCommentVNode as x, renderSlot as K, ref as I, toDisplayString as j, inject as Ue, nextTick as _t, isRef as sn, unref as ee, mergeProps as Ae, withModifiers as qe, h as gt, resolveComponent as W, createBlock as oe, withCtx as Ce, useAttrs as po, createVNode as xe, createTextVNode as _e, watchEffect as bs, normalizeStyle as ll, Fragment as Ie, renderList as De, withDirectives as $t, vModelCheckbox as nl, withKeys as ln, createStaticVNode as Cs, vModelSelect as mo, useSlots as ol, getCurrentInstance as Be, onMounted as st, createSlots as al, normalizeProps as Ot, guardReactiveProps as ws, vModelDynamic as ho, onUnmounted as Ht, watch as Vt, vModelText as go, resolveDynamicComponent as nn, provide as ts, resolveDirective as yo } from "vue";
import { errorResponseExcept as bo, dateFmt as on, toTime as wo, omit as ft, enc as Qs, appendQueryString as Pt, lastLeftPart as an, setQueryString as ko, nameOf as _o, ApiResult as Xe, lastRightPart as Ct, leftPart as xs, map as Qe, toDate as St, toDateTime as $o, toCamelCase as Co, mapGet as we, chop as xo, fromXsdDuration as rn, isDate as Ls, timeFmt12 as Lo, apiValue as Vo, indexOfAny as So, createBus as Mo, toKebabCase as Kl, sanitize as Ao, humanize as ze, delaySet as un, rightPart as ps, queryString as Ks, combinePaths as To, toPascalCase as ot, errorResponse as pt, trimEnd as Fo, $1 as ks, ResponseStatus as Ns, ResponseError as Zl, HttpMethods as rl, omitEmpty as Io, uniqueKeys as Zs, humanify as dn, each as Do } from "@servicestack/client";
const jo = { class: "flex items-center" }, Oo = {
  key: 0,
  class: "flex-shrink-0 mr-3"
}, Po = {
  key: 0,
  class: "h-5 w-5 text-yellow-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Bo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
  "clip-rule": "evenodd"
}, null, -1), Ro = [
  Bo
], Eo = {
  key: 1,
  class: "h-5 w-5 text-red-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Ho = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z",
  "clip-rule": "evenodd"
}, null, -1), zo = [
  Ho
], No = {
  key: 2,
  class: "h-5 w-5 text-blue-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Uo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z",
  "clip-rule": "evenodd"
}, null, -1), qo = [
  Uo
], Qo = {
  key: 3,
  class: "h-5 w-5 text-green-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Ko = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  "clip-rule": "evenodd"
}, null, -1), Zo = [
  Ko
], Go = /* @__PURE__ */ ce({
  __name: "Alert",
  props: {
    type: { default: "warn" },
    hideIcon: { type: Boolean }
  },
  setup(e) {
    const t = e, s = v(() => t.type == "info" ? "bg-blue-50 dark:bg-blue-200" : t.type == "error" ? "bg-red-50 dark:bg-red-200" : t.type == "success" ? "bg-green-50 dark:bg-green-200" : "bg-yellow-50 dark:bg-yellow-200"), n = v(() => t.type == "info" ? "border-blue-400" : t.type == "error" ? "border-red-400" : t.type == "success" ? "border-green-400" : "border-yellow-400"), a = v(() => t.type == "info" ? "text-blue-700" : t.type == "error" ? "text-red-700" : t.type == "success" ? "text-green-700" : "text-yellow-700");
    return (i, d) => (o(), r("div", {
      class: b([s.value, n.value, "border-l-4 p-4"])
    }, [
      l("div", jo, [
        i.hideIcon ? x("", !0) : (o(), r("div", Oo, [
          i.type == "warn" ? (o(), r("svg", Po, Ro)) : i.type == "error" ? (o(), r("svg", Eo, zo)) : i.type == "info" ? (o(), r("svg", No, qo)) : i.type == "success" ? (o(), r("svg", Qo, Zo)) : x("", !0)
        ])),
        l("div", null, [
          l("p", {
            class: b([a.value, "text-sm"])
          }, [
            K(i.$slots, "default")
          ], 2)
        ])
      ])
    ], 2));
  }
}), Wo = {
  key: 0,
  class: "rounded-md bg-green-50 dark:bg-green-200 p-4",
  role: "alert"
}, Jo = { class: "flex" }, Xo = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-green-400 dark:text-green-500",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 13l4 4L19 7"
    })
  ])
], -1), Yo = { class: "ml-3" }, ea = { class: "text-sm font-medium text-green-800" }, ta = { key: 0 }, sa = { class: "ml-auto pl-3" }, la = { class: "-mx-1.5 -my-1.5" }, na = /* @__PURE__ */ l("span", { class: "sr-only" }, "Dismiss", -1), oa = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
], -1), aa = [
  na,
  oa
], ra = /* @__PURE__ */ ce({
  __name: "AlertSuccess",
  props: {
    message: {}
  },
  setup(e) {
    const t = I(!1);
    return (s, n) => t.value ? x("", !0) : (o(), r("div", Wo, [
      l("div", Jo, [
        Xo,
        l("div", Yo, [
          l("h3", ea, [
            s.message ? (o(), r("span", ta, j(s.message), 1)) : K(s.$slots, "default", { key: 1 })
          ])
        ]),
        l("div", sa, [
          l("div", la, [
            l("button", {
              type: "button",
              class: "inline-flex rounded-md bg-green-50 dark:bg-green-200 p-1.5 text-green-500 dark:text-green-600 hover:bg-green-100 dark:hover:bg-green-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 dark:ring-offset-green-200",
              onClick: n[0] || (n[0] = (a) => t.value = !0)
            }, aa)
          ])
        ])
      ])
    ]));
  }
}), ia = { class: "flex" }, ua = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-red-400",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, [
    /* @__PURE__ */ l("path", {
      fill: "currentColor",
      d: "M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
    })
  ])
], -1), da = { class: "ml-3" }, ca = { class: "text-sm text-red-700 dark:text-red-200" }, fa = /* @__PURE__ */ ce({
  __name: "ErrorSummary",
  props: {
    status: {},
    except: {},
    class: {}
  },
  setup(e) {
    const t = e;
    let s = Ue("ApiState", void 0);
    const n = v(() => t.status || s != null && s.error.value ? bo.call({ responseStatus: t.status ?? (s == null ? void 0 : s.error.value) }, t.except ?? []) : null);
    return (a, i) => n.value ? (o(), r("div", {
      key: 0,
      class: b(`bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${a.$props.class}`)
    }, [
      l("div", ia, [
        ua,
        l("div", da, [
          l("p", ca, j(n.value), 1)
        ])
      ])
    ], 2)) : x("", !0);
  }
}), va = ["id", "aria-describedby"], pa = /* @__PURE__ */ ce({
  __name: "InputDescription",
  props: {
    id: {},
    description: {}
  },
  setup(e) {
    return (t, s) => t.description ? (o(), r("div", {
      key: "description",
      class: "mt-2 text-sm text-gray-500",
      id: `${t.id}-description`,
      "aria-describedby": `${t.id}-description`
    }, [
      l("div", null, j(t.description), 1)
    ], 8, va)) : x("", !0);
  }
});
function Vs(e) {
  return on(e).replace(/\//g, "-");
}
function cn(e) {
  return e == null ? "" : wo(e);
}
function fn(e, t) {
  e.value = null, _t(() => e.value = t);
}
function Ft(e) {
  return Object.keys(e).forEach((t) => {
    const s = e[t];
    e[t] = sn(s) ? ee(s) : s;
  }), e;
}
function xt(e, t, s) {
  s ? (t.value = e.entering.cls + " " + e.entering.from, setTimeout(() => t.value = e.entering.cls + " " + e.entering.to, 0)) : (t.value = e.leaving.cls + " " + e.leaving.from, setTimeout(() => t.value = e.leaving.cls + " " + e.leaving.to, 0));
}
function ms(e) {
  if (typeof document > "u")
    return;
  let t = (e == null ? void 0 : e.after) || document.activeElement, s = t && t.form;
  if (s) {
    let n = ':not([disabled]):not([tabindex="-1"])', a = s.querySelectorAll(`a:not([disabled]), button${n}, input[type=text]${n}, [tabindex]${n}`), i = Array.prototype.filter.call(
      a,
      (u) => u.offsetWidth > 0 || u.offsetHeight > 0 || u === t
    ), d = i.indexOf(t);
    d > -1 && (i[d + 1] || i[0]).focus();
  }
}
function zt(e) {
  if (!e)
    return null;
  if (typeof e == "string")
    return e;
  const t = typeof e == "function" ? new e() : typeof e == "object" ? e : null;
  if (!t)
    throw new Error(`Invalid DTO Type '${typeof e}'`);
  if (typeof t.getTypeName != "function")
    throw new Error(`${JSON.stringify(t)} is not a Request DTO`);
  const s = t.getTypeName();
  if (!s)
    throw new Error("DTO Required");
  return s;
}
function dt(e, t, s) {
  s || (s = {});
  let n = s.cls || s.className || s.class;
  return n && (s = ft(s, ["cls", "class", "className"]), s.class = n), t == null ? `<${e}` + Gs(s) + "/>" : `<${e}` + Gs(s) + `>${t || ""}</${e}>`;
}
function Gs(e) {
  return Object.keys(e).reduce((t, s) => `${t} ${s}="${Qs(e[s])}"`, "");
}
function Ss(e) {
  return Object.assign({ target: "_blank", rel: "noopener", class: "text-blue-600" }, e);
}
function jt(e) {
  return Ll(e);
}
let ma = ["string", "number", "boolean", "null", "undefined"];
function Lt(e) {
  return ma.indexOf(typeof e) >= 0 || e instanceof Date;
}
function Jt(e) {
  return !Lt(e);
}
class vn {
  get length() {
    return typeof localStorage > "u" ? 0 : localStorage.length;
  }
  getItem(t) {
    return typeof localStorage > "u" ? null : localStorage.getItem(t);
  }
  setItem(t, s) {
    typeof localStorage > "u" || localStorage.setItem(t, s);
  }
  removeItem(t) {
    typeof localStorage > "u" || localStorage.removeItem(t);
  }
  clear() {
    typeof localStorage > "u" || localStorage.clear();
  }
  key(t) {
    return typeof localStorage > "u" ? null : localStorage.key(t);
  }
}
function _s(e) {
  return typeof e == "string" ? JSON.parse(e) : null;
}
function il(e, t) {
  if (typeof history < "u") {
    const s = t ? Pt(an(location.href, "?"), e) : ko(location.href, e);
    history.pushState({}, "", s);
  }
}
function ul(e, t) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const n = Object.assign(
    Object.keys(globalThis).reduce((a, i) => (a[i] = void 0, a), {}),
    t
  );
  return new Function("with(this) { return (" + e + ") }").call(n);
}
function Ws(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function dl(e) {
  const t = ne.config.storage.getItem(e);
  return t ? JSON.parse(t) : null;
}
function Ms(e, t) {
  return Pt(`swr.${_o(e)}`, t ? Object.assign({}, e, t) : e);
}
function ha(e) {
  if (e.request) {
    const t = Ms(e.request, e.args);
    ne.config.storage.removeItem(t);
  }
}
async function pn(e, t, s, n, a) {
  const i = Ms(t, n);
  s(new Xe({ response: dl(i) }));
  const d = await e.api(t, n, a);
  if (d.succeeded && d.response) {
    d.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const u = JSON.stringify(d.response);
    ne.config.storage.setItem(i, u), s(d);
  }
  return d;
}
function mn(e, t) {
  let s = null;
  return (...n) => {
    s && clearTimeout(s), s = setTimeout(() => {
      e(...n);
    }, t || 100);
  };
}
function yt(e) {
  return typeof e == "string" ? e.split(",") : e || [];
}
function kt(e, t) {
  const s = yt(t);
  return e.reduce((n, a) => (n[a] = !s.includes(a), n), {});
}
function hn() {
  return {
    LocalStore: vn,
    dateInputFormat: Vs,
    timeInputFormat: cn,
    setRef: fn,
    unRefs: Ft,
    transition: xt,
    focusNextElement: ms,
    getTypeName: zt,
    htmlTag: dt,
    htmlAttrs: Gs,
    linkAttrs: Ss,
    toAppUrl: jt,
    isPrimitive: Lt,
    isComplexType: Jt,
    pushState: il,
    scopedExpr: ul,
    copyText: Ws,
    fromCache: dl,
    swrCacheKey: Ms,
    swrClear: ha,
    swrApi: pn,
    asStrings: yt,
    asOptions: kt,
    createDebounce: mn
  };
}
const gn = "png,jpg,jpeg,jfif,gif,svg,webp".split(","), yn = {
  img: "png,jpg,jpeg,gif,svg,webp,png,jpg,jpeg,gif,bmp,tif,tiff,webp,ai,psd,ps".split(","),
  vid: "avi,m4v,mov,mp4,mpg,mpeg,wmv,webm".split(","),
  aud: "mp3,mpa,ogg,wav,wma,mid,webm".split(","),
  ppt: "key,odp,pps,ppt,pptx".split(","),
  xls: "xls,xlsm,xlsx,ods,csv,tsv".split(","),
  doc: "doc,docx,pdf,rtf,tex,txt,md,rst,xls,xlsm,xlsx,ods,key,odp,pps,ppt,pptx".split(","),
  zip: "zip,tar,gz,7z,rar,gzip,deflate,br,iso,dmg,z,lz,lz4,lzh,s7z,apl,arg,jar,war".split(","),
  exe: "exe,bat,sh,cmd,com,app,msi,run,vb,vbs,js,ws,wsh".split(","),
  att: "bin,oct,dat".split(",")
  //attachment
}, Gl = Object.keys(yn), vt = (e, t) => `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='${e}'>${t}</svg>`, hs = {
  img: vt("4 4 16 16", "<path fill='currentColor' d='M20 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-2 0H6v6.38l2.19-2.19l5.23 5.23l1-1a1.59 1.59 0 0 1 2.11.11L18 16V6zm-5 3.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z'/>"),
  vid: vt("0 0 24 24", "<path fill='currentColor' d='m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-2-2l-2.5-1.7V18H8v-5h5.5v1.7L16 13v5Z'/>"),
  aud: vt("0 0 24 24", "<path fill='currentColor' d='M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4v3.88a2.247 2.247 0 0 0-3.5 1.87c0 1.24 1.01 2.25 2.25 2.25S13 17.99 13 16.75V13h3v-2z'/>"),
  ppt: vt("0 0 48 48", "<g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='4'><path d='M4 8h40'/><path d='M8 8h32v26H8V8Z' clip-rule='evenodd'/><path d='m22 16l5 5l-5 5m-6 16l8-8l8 8'/></g>"),
  xls: vt("0 0 256 256", "<path fill='currentColor' d='M200 26H72a14 14 0 0 0-14 14v26H40a14 14 0 0 0-14 14v96a14 14 0 0 0 14 14h18v26a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V40a14 14 0 0 0-14-14Zm-42 76h44v52h-44Zm44-62v50h-44V80a14 14 0 0 0-14-14h-2V38h58a2 2 0 0 1 2 2ZM70 40a2 2 0 0 1 2-2h58v28H70ZM38 176V80a2 2 0 0 1 2-2h104a2 2 0 0 1 2 2v96a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2Zm32 40v-26h60v28H72a2 2 0 0 1-2-2Zm130 2h-58v-28h2a14 14 0 0 0 14-14v-10h44v50a2 2 0 0 1-2 2ZM69.2 148.4L84.5 128l-15.3-20.4a6 6 0 1 1 9.6-7.2L92 118l13.2-17.6a6 6 0 0 1 9.6 7.2L99.5 128l15.3 20.4a6 6 0 0 1-9.6 7.2L92 138l-13.2 17.6a6 6 0 1 1-9.6-7.2Z'/>"),
  doc: vt("0 0 32 32", "<path fill='currentColor' d='M26 30H11a2.002 2.002 0 0 1-2-2v-6h2v6h15V6h-9V4h9a2.002 2.002 0 0 1 2 2v22a2.002 2.002 0 0 1-2 2Z'/><path fill='currentColor' d='M17 10h7v2h-7zm-1 5h8v2h-8zm-1 5h9v2h-9zm-6-1a5.005 5.005 0 0 1-5-5V3h2v11a3 3 0 0 0 6 0V5a1 1 0 0 0-2 0v10H8V5a3 3 0 0 1 6 0v9a5.005 5.005 0 0 1-5 5z'/>"),
  zip: vt("0 0 16 16", "<g fill='currentColor'><path d='M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598l.93.62l.93-.62l-.4-1.598a1 1 0 0 1-.03-.243V7.5z'/><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1V1z'/></g>"),
  exe: vt("0 0 16 16", "<path fill='currentColor' fill-rule='evenodd' d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575v-.647ZM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983l-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992L6.31 11.85Zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z'/>"),
  att: vt("0 0 24 24", "<path fill='currentColor' d='M14 0a5 5 0 0 1 5 5v12a7 7 0 1 1-14 0V9h2v8a5 5 0 0 0 10 0V5a3 3 0 1 0-6 0v12a1 1 0 1 0 2 0V6h2v11a3 3 0 1 1-6 0V5a5 5 0 0 1 5-5Z'/>")
}, ga = /[\r\n%#()<>?[\\\]^`{|}]/g, Wl = 1024, ya = ["Bytes", "KB", "MB", "GB", "TB"], ba = (() => {
  const e = "application/", t = e + "vnd.openxmlformats-officedocument.", s = "image/", n = "text/", a = "audio/", i = "video/", d = {
    jpg: s + "jpeg",
    tif: s + "tiff",
    svg: s + "svg+xml",
    ico: s + "x-icon",
    ts: n + "typescript",
    py: n + "x-python",
    sh: n + "x-sh",
    mp3: a + "mpeg3",
    mpg: i + "mpeg",
    ogv: i + "ogg",
    xlsx: t + "spreadsheetml.sheet",
    xltx: t + "spreadsheetml.template",
    docx: t + "wordprocessingml.document",
    dotx: t + "wordprocessingml.template",
    pptx: t + "presentationml.presentation",
    potx: t + "presentationml.template",
    ppsx: t + "presentationml.slideshow",
    mdb: e + "vnd.ms-access"
  };
  function u(f, p) {
    f.split(",").forEach(($) => d[$] = p);
  }
  function c(f, p) {
    f.split(",").forEach(($) => d[$] = p($));
  }
  return c("jpeg,gif,png,tiff,bmp,webp", (f) => s + f), c("jsx,csv,css", (f) => n + f), c("aac,ac3,aiff,m4a,m4b,m4p,mid,midi,wav", (f) => a + f), c("3gpp,avi,dv,divx,ogg,mp4,webm", (f) => i + f), c("rtf,pdf", (f) => e + f), u("htm,html,shtm", n + "html"), u("js,mjs,cjs", n + "javascript"), u("yml,yaml", e + "yaml"), u("bat,cmd", e + "bat"), u("xml,csproj,fsproj,vbproj", n + "xml"), u("txt,ps1", n + "plain"), u("qt,mov", i + "quicktime"), u("doc,dot", e + "msword"), u("xls,xlt,xla", e + "excel"), u("ppt,oit,pps,ppa", e + "vnd.ms-powerpoint"), u("cer,crt,der", e + "x-x509-ca-cert"), u("gz,tgz,zip,rar,lzh,z", e + "x-compressed"), u("aaf,aca,asd,bin,cab,chm,class,cur,db,dat,deploy,dll,dsp,exe,fla,ics,inf,mix,msi,mso,obj,ocx,prm,prx,psd,psp,qxd,sea,snp,so,sqlite,toc,ttf,u32,xmp,xsn,xtp", e + "octet-stream"), d;
})();
let Js = [];
function bn(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(ga, encodeURIComponent);
}
function cl(e) {
  return "data:image/svg+xml;utf8," + bn(e);
}
function wn(e) {
  let t = URL.createObjectURL(e);
  return Js.push(t), t;
}
function kn() {
  Js.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (t) {
      console.error("URL.revokeObjectURL", t);
    }
  }), Js = [];
}
function fl(e) {
  if (!e)
    return null;
  let t = xs(e, "?");
  return Ct(t, "/");
}
function ss(e) {
  let t = fl(e);
  return t == null || t.indexOf(".") === -1 ? null : Ct(t, ".").toLowerCase();
}
function vl(e) {
  let t = ss(e.name);
  return t && gn.indexOf(t) >= 0 ? wn(e) : bt(e.name);
}
function pl(e) {
  if (!e)
    return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let t = ss(e);
  return t && gn.indexOf(t) >= 0 || !1;
}
function bt(e) {
  if (!e)
    return null;
  let t = ss(e);
  return t == null || pl(e) ? e : Wt(t) || cl(hs.doc);
}
function Wt(e) {
  let t = _n(e);
  return t && cl(t) || null;
}
function _n(e) {
  if (hs[e])
    return hs[e];
  for (let t = 0; t < Gl.length; t++) {
    let s = Gl[t];
    if (yn[s].indexOf(e) >= 0)
      return hs[s];
  }
  return null;
}
function ml(e, t = 2) {
  if (e === 0)
    return "0 Bytes";
  const s = t < 0 ? 0 : t, n = Math.floor(Math.log(e) / Math.log(Wl));
  return parseFloat((e / Math.pow(Wl, n)).toFixed(s)) + " " + ya[n];
}
function wa(e) {
  return e.files && Array.from(e.files).map((t) => ({ fileName: t.name, contentLength: t.size, filePath: vl(t) }));
}
function As(e, t) {
  e.onerror = null, e.src = hl(e.src, t) || "";
}
function hl(e, t) {
  return Wt(Ct(e, ".").toLowerCase()) || (t ? Wt(t) || t : null) || Wt("doc");
}
function Xs(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const t = Ct(e, ".").toLowerCase();
  return ba[t] || "application/" + t;
}
function Lm() {
  return {
    extSvg: _n,
    extSrc: Wt,
    getExt: ss,
    encodeSvg: bn,
    canPreview: pl,
    getFileName: fl,
    getMimeType: Xs,
    formatBytes: ml,
    filePathUri: bt,
    svgToDataUri: cl,
    fileImageUri: vl,
    objectUrl: wn,
    flush: kn,
    inputFiles: wa,
    iconOnError: As,
    iconFallbackSrc: hl
  };
}
class ka {
  constructor(t) {
    Le(this, "view");
    Le(this, "includeTypes");
    Object.assign(this, t);
  }
  getTypeName() {
    return "MetadataApp";
  }
  getMethod() {
    return "GET";
  }
  createResponse() {
    return {};
  }
}
const Bt = "/metadata/app.json", _a = {
  Boolean: "checkbox",
  DateTime: "date",
  DateOnly: "date",
  DateTimeOffset: "date",
  TimeSpan: "time",
  TimeOnly: "time",
  Byte: "number",
  Short: "number",
  Int64: "number",
  Int32: "number",
  UInt16: "number",
  UInt32: "number",
  UInt64: "number",
  Single: "number",
  Double: "number",
  Decimal: "number",
  String: "text",
  Guid: "text",
  Uri: "text"
}, $a = {
  number: "Int32",
  checkbox: "Boolean",
  date: "DateTime",
  "datetime-local": "DateTime",
  time: "TimeSpan"
}, Ys = {
  Byte: "byte",
  Int16: "short",
  Int32: "int",
  Int64: "long",
  UInt16: "ushort",
  Unt32: "uint",
  UInt64: "ulong",
  Single: "float",
  Double: "double",
  Decimal: "decimal"
};
[...Object.keys(Ys), ...Object.values(Ys)];
const Ca = {
  String: "string",
  Boolean: "bool",
  ...Ys
};
function cs(e) {
  return Ca[e] || e;
}
function $n(e, t) {
  return e ? (t || (t = []), e === "Nullable`1" ? cs(t[0]) + "?" : e.endsWith("[]") ? `List<${cs(e.substring(0, e.length - 2))}>` : t.length === 0 ? cs(e) : xs(cs(e), "`") + "<" + t.join(",") + ">") : "";
}
function xa(e) {
  return e && $n(e.name, e.genericArgs);
}
class Rt {
  constructor() {
    Le(this, "Query");
    Le(this, "QueryInto");
    Le(this, "Create");
    Le(this, "Update");
    Le(this, "Patch");
    Le(this, "Delete");
  }
  get AnyQuery() {
    return this.Query || this.QueryInto;
  }
  get AnyUpdate() {
    return this.Patch || this.Update;
  }
  toArray() {
    return [this.Query, this.QueryInto, this.Create, this.Update, this.Patch, this.Delete].filter((s) => !!s).map((s) => s);
  }
  get empty() {
    return !this.Query && !this.QueryInto && !this.Create && !this.Update && !this.Patch && !this.Delete;
  }
  add(t) {
    Ne.isQueryInto(t) && !this.QueryInto ? this.QueryInto = t : Ne.isQuery(t) && !this.Query ? this.Query = t : Ne.isCreate(t) && !this.Create ? this.Create = t : Ne.isUpdate(t) && !this.Update ? this.Update = t : Ne.isPatch(t) && !this.Patch ? this.Patch = t : Ne.isDelete(t) && !this.Delete && (this.Delete = t);
  }
  static from(t) {
    const s = new Rt();
    return t.forEach((n) => {
      s.add(n);
    }), s;
  }
  static forType(t, s) {
    var a;
    let n = new Rt();
    return t && (s ?? (s = (a = ne.metadata.value) == null ? void 0 : a.api), s == null || s.operations.forEach((i) => {
      var d;
      ((d = i.dataModel) == null ? void 0 : d.name) == t && n.add(i);
    })), n;
  }
}
const Ne = {
  Create: "ICreateDb`1",
  Update: "IUpdateDb`1",
  Patch: "IPatchDb`1",
  Delete: "IDeleteDb`1",
  AnyRead: ["QueryDb`1", "QueryDb`2"],
  AnyWrite: ["ICreateDb`1", "IUpdateDb`1", "IPatchDb`1", "IDeleteDb`1"],
  isAnyQuery: (e) => Qe(e.request.inherits, (t) => Ne.AnyRead.indexOf(t.name) >= 0),
  isQuery: (e) => Qe(e.request.inherits, (t) => t.name === "QueryDb`1"),
  isQueryInto: (e) => Qe(e.request.inherits, (t) => t.name === "QueryDb`2"),
  isCrud: (e) => {
    var t;
    return (t = e.request.implements) == null ? void 0 : t.some((s) => Ne.AnyWrite.indexOf(s.name) >= 0);
  },
  isCreate: (e) => fs(e, Ne.Create),
  isUpdate: (e) => fs(e, Ne.Update),
  isPatch: (e) => fs(e, Ne.Patch),
  isDelete: (e) => fs(e, Ne.Delete),
  model: (e) => {
    var t, s, n;
    return e ? Qe(e.inherits, (a) => Ne.AnyRead.indexOf(a.name) >= 0) ? (t = e.inherits) == null ? void 0 : t.genericArgs[0] : (n = (s = e.implements) == null ? void 0 : s.find((a) => Ne.AnyWrite.indexOf(a.name) >= 0)) == null ? void 0 : n.genericArgs[0] : null;
  }
};
function La(e) {
  var t;
  return ((t = e.input) == null ? void 0 : t.type) || Ts(gl(e));
}
function Cn(e) {
  return e.endsWith("?") ? xo(e, 1) : e;
}
function Ts(e) {
  return _a[Cn(e)];
}
function Va(e) {
  return e && $a[e] || "String";
}
function gl(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function el(e) {
  return e && Ts(e) == "number" || !1;
}
function xn(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function Sa(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function Ln(e) {
  if (!(e != null && e.type))
    return !1;
  const t = gl(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum ? !1 : Ts(e.type) == null;
}
function Vn(e) {
  var s, n, a, i;
  if (!(e != null && e.type))
    return !1;
  const t = gl(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum || ((s = e.input) == null ? void 0 : s.type) == "hidden" || ((n = e.input) == null ? void 0 : n.type) == "file" || ((a = e.input) == null ? void 0 : a.type) == "tag" || ((i = e.input) == null ? void 0 : i.type) == "combobox" ? !0 : Ts(e.type) != null;
}
function Xt(e, t) {
  let s = typeof e == "string" ? Fs(e) : e;
  s || (console.warn(`Metadata not found for: ${e}`), s = { request: { name: e } });
  let n = (
    /** @class */
    function() {
      return function(i) {
        Object.assign(this, i);
      };
    }()
  ), a = (
    /** @class */
    function() {
      function i(d) {
        Object.assign(this, d);
      }
      return i.prototype.createResponse = function() {
        return s.returnsVoid ? void 0 : new n();
      }, i.prototype.getTypeName = function() {
        return s.request.name;
      }, i.prototype.getMethod = function() {
        return s.method || "POST";
      }, i;
    }()
  );
  return new a(t);
}
function Ma(e, t, s = {}) {
  let n = (
    /** @class */
    function() {
      return function(i) {
        Object.assign(this, i);
      };
    }()
  ), a = (
    /** @class */
    function() {
      function i(d) {
        Object.assign(this, d);
      }
      return i.prototype.createResponse = function() {
        return typeof s.createResponse == "function" ? s.createResponse() : new n();
      }, i.prototype.getTypeName = function() {
        return e;
      }, i.prototype.getMethod = function() {
        return s.method || "POST";
      }, i;
    }()
  );
  return new a(t);
}
function gs(e, t) {
  return e ? (Object.keys(e).forEach((s) => {
    let n = e[s];
    typeof n == "string" ? n.startsWith("/Date") && (e[s] = Vs(St(n))) : n != null && typeof n == "object" && (Array.isArray(n) ? e[s] = Array.from(n) : e[s] = Object.assign({}, n));
  }), e) : {};
}
function Aa(e, t) {
  let s = {};
  return Array.from(e.elements).forEach((n) => {
    var p;
    let a = n;
    if (!a.id || a.value == null || a.value === "")
      return;
    const i = a.id.toLowerCase(), d = t && t.find(($) => $.name.toLowerCase() == i);
    let u = d == null ? void 0 : d.type, c = (p = d == null ? void 0 : d.genericArgs) == null ? void 0 : p[0], f = a.type === "checkbox" ? a.checked : a.value;
    el(u) ? f = Number(f) : u === "List`1" && typeof f == "string" && (f = f.split(",").map(($) => el(c) ? Number($) : $)), s[a.id] = f;
  }), s;
}
function yl(e) {
  var t;
  return ((t = e == null ? void 0 : e.api) == null ? void 0 : t.operations) && e.api.operations.length > 0;
}
function Ta(e) {
  if (!bl() && (e != null && e.assert) && !ne.metadata.value)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return ne.metadata.value;
}
function Yt(e) {
  return e && yl(e) ? (e.date = $o(/* @__PURE__ */ new Date()), ne.metadata.value = e, typeof localStorage < "u" && localStorage.setItem(Bt, JSON.stringify(e)), !0) : !1;
}
function Fa() {
  ne.metadata.value = null, typeof localStorage < "u" && localStorage.removeItem(Bt);
}
function bl() {
  if (ne.metadata.value != null)
    return !0;
  let e = globalThis.Server;
  if (yl(e))
    Yt(e);
  else {
    const t = typeof localStorage < "u" ? localStorage.getItem(Bt) : null;
    if (t)
      try {
        Yt(JSON.parse(t));
      } catch {
        console.error(`Could not JSON.parse ${Bt} from localStorage`);
      }
  }
  return ne.metadata.value != null;
}
async function Jl(e, t) {
  let s = t ? await t() : await fetch(e);
  if (s.ok) {
    let n = await s.text();
    Yt(JSON.parse(n));
  } else
    console.error(`Could not download ${t ? "AppMetadata" : e}: ${s.statusText}`);
  yl(ne.metadata.value) || console.warn("AppMetadata is not available");
}
async function Ia(e) {
  var i;
  const { olderThan: t, resolvePath: s, resolve: n } = e || {};
  let a = bl() && t !== 0;
  if (a && t) {
    let d = St((i = ne.metadata.value) == null ? void 0 : i.date);
    (!d || (/* @__PURE__ */ new Date()).getTime() - d.getTime() > t) && (a = !1);
  }
  if (!a) {
    if ((s || n) && (await Jl(s || Bt, n), ne.metadata.value != null))
      return;
    const d = Ue("client");
    if (d != null) {
      const u = await d.api(new ka());
      u.succeeded && Yt(u.response);
    }
    if (ne.metadata.value != null)
      return;
    await Jl(Bt);
  }
  return ne.metadata.value;
}
function at(e, t) {
  var d;
  let s = (d = ne.metadata.value) == null ? void 0 : d.api;
  if (!s || !e)
    return null;
  let n = s.types.find((u) => u.name.toLowerCase() === e.toLowerCase() && (!t || u.namespace == t));
  if (n)
    return n;
  let a = Fs(e);
  if (a)
    return a.request;
  let i = s.operations.find((u) => u.response && u.response.name.toLowerCase() === e.toLowerCase() && (!t || u.response.namespace == t));
  return i ? i.response : null;
}
function Fs(e) {
  var n;
  let t = (n = ne.metadata.value) == null ? void 0 : n.api;
  return t ? t.operations.find((a) => a.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function Da({ dataModel: e }) {
  var n;
  const t = (n = ne.metadata.value) == null ? void 0 : n.api;
  if (!t)
    return [];
  let s = t.operations;
  if (e) {
    const a = typeof e == "string" ? at(e) : e;
    s = s.filter((i) => Sn(i.dataModel, a));
  }
  return s;
}
function wl(e) {
  return e ? at(e.name, e.namespace) : null;
}
function Sn(e, t) {
  return e && t && e.name === t.name && (!e.namespace || !t.namespace || e.namespace === t.namespace);
}
function ja(e, t) {
  let s = at(e);
  return s && s.properties && s.properties.find((a) => a.name.toLowerCase() === t.toLowerCase());
}
function Mn(e) {
  return An(at(e));
}
function An(e) {
  if (e && e.isEnum && e.enumNames != null) {
    let t = {};
    for (let s = 0; s < e.enumNames.length; s++) {
      const n = (e.enumDescriptions ? e.enumDescriptions[s] : null) || e.enumNames[s], a = (e.enumValues != null ? e.enumValues[s] : null) || e.enumNames[s];
      t[a] = n;
    }
    return t;
  }
  return null;
}
function Tn(e) {
  if (!e)
    return null;
  let t = {}, s = e.input && e.input.allowableEntries;
  if (s) {
    for (let a = 0; a < s.length; a++) {
      let i = s[a];
      t[i.key] = i.value;
    }
    return t;
  }
  let n = e.allowableValues || (e.input ? e.input.allowableValues : null);
  if (n) {
    for (let a = 0; a < n.length; a++) {
      let i = n[a];
      t[i] = i;
    }
    return t;
  }
  if (e.isEnum) {
    const a = e.genericArgs && e.genericArgs.length == 1 ? e.genericArgs[0] : e.type, i = at(a);
    if (i)
      return An(i);
  }
  return null;
}
function kl(e) {
  if (!e)
    return;
  const t = [];
  return Object.keys(e).forEach((s) => t.push({ key: s, value: e[s] })), t;
}
function Oa(e, t) {
  const n = ((a, i) => Object.assign({
    id: a,
    name: a,
    type: i
  }, t))(e.name, (t == null ? void 0 : t.type) || La(e) || "text");
  return e.isEnum && (n.type = "select", n.allowableEntries = kl(Tn(e))), n;
}
function Pa(e) {
  let t = [];
  if (e) {
    const s = tt(e), n = Fs(e.name), a = wl(n == null ? void 0 : n.dataModel);
    s.forEach((i) => {
      var u, c, f;
      if (!Vn(i))
        return;
      const d = Oa(i, i.input);
      if (d.id = Co(d.id), d.type == "file" && i.uploadTo && !d.accept) {
        const p = (c = (u = ne.metadata.value) == null ? void 0 : u.plugins.filesUpload) == null ? void 0 : c.locations.find(($) => $.name == i.uploadTo);
        p && !d.accept && p.allowExtensions && (d.accept = p.allowExtensions.map(($) => $.startsWith(".") ? $ : `.${$}`).join(","));
      }
      if (a) {
        const p = (f = a.properties) == null ? void 0 : f.find(($) => $.name == i.name);
        i.ref || (i.ref = p == null ? void 0 : p.ref);
      }
      if (d.options)
        try {
          const p = {
            input: d,
            $typeFields: s.map((m) => m.name),
            $dataModelFields: a ? tt(a).map((m) => m.name) : [],
            ...ne.config.scopeWhitelist
          }, $ = ul(d.options, p);
          Object.keys($).forEach((m) => {
            d[m] = $[m];
          });
        } catch {
          console.error(`failed to evaluate '${d.options}'`);
        }
      t.push(d);
    });
  }
  return t;
}
function _l(e, t) {
  var a, i;
  if (!t.type)
    return console.error("enumDescriptions missing {type:'EnumType'} options"), [`${e}`];
  const s = at(t.type);
  if (!(s != null && s.enumValues))
    return console.error(`Could not find metadata for ${t.type}`), [`${e}`];
  const n = [];
  for (let d = 0; d < s.enumValues.length; d++) {
    const u = parseInt(s.enumValues[d]);
    u > 0 && (u & e) === u && n.push(((a = s.enumDescriptions) == null ? void 0 : a[d]) || ((i = s.enumNames) == null ? void 0 : i[d]) || `${e}`);
  }
  return n;
}
function Fn(e) {
  return (t) => typeof t == "number" ? _l(t, { type: e }) : t;
}
function tt(e) {
  if (!e)
    return [];
  let t = [], s = {};
  function n(a) {
    a.forEach((i) => {
      s[i.name] || (s[i.name] = 1, t.push(i));
    });
  }
  for (; e; )
    e.properties && n(e.properties), e = e.inherits ? wl(e.inherits) : null;
  return t.map((a) => a.type.endsWith("[]") ? { ...a, type: "List`1", genericArgs: [a.type.substring(0, a.type.length - 2)] } : a);
}
function fs(e, t) {
  var s;
  return ((s = e.request.implements) == null ? void 0 : s.some((n) => n.name === t)) || !1;
}
function ls(e) {
  return e ? In(e, tt(e)) : null;
}
function In(e, t) {
  let s = t.find((i) => i.name.toLowerCase() === "id");
  if (s && s.isPrimaryKey)
    return s;
  let a = t.find((i) => i.isPrimaryKey) || s;
  if (!a) {
    let i = Ne.model(e);
    if (i)
      return Qe(at(i), (d) => ls(d));
    console.error(`Primary Key not found in ${e.name}`);
  }
  return a || null;
}
function Ba(e, t) {
  return Qe(ls(e), (s) => we(t, s.name));
}
function Dn(e, t, s) {
  return e && e.valueType === "none" ? "" : s.key === "%In" || s.key === "%Between" ? `(${s.value})` : Ra(t, s.value);
}
function Ra(e, t) {
  return e ? (e = Cn(e), el(e) || e === "Boolean" ? t : Sa(e) ? `[${t}]` : `'${t}'`) : t;
}
function rt() {
  const e = v(() => {
    var n;
    return ((n = ne.metadata.value) == null ? void 0 : n.app) || null;
  }), t = v(() => {
    var n;
    return ((n = ne.metadata.value) == null ? void 0 : n.api) || null;
  }), s = v(() => {
    var n;
    return ((n = ne.metadata.value) == null ? void 0 : n.plugins.autoQuery.viewerConventions) || [];
  });
  return bl(), {
    loadMetadata: Ia,
    getMetadata: Ta,
    setMetadata: Yt,
    clearMetadata: Fa,
    metadataApp: e,
    metadataApi: t,
    filterDefinitions: s,
    typeOf: at,
    typeOfRef: wl,
    typeEquals: Sn,
    apiOf: Fs,
    findApis: Da,
    typeName: xa,
    typeName2: $n,
    property: ja,
    enumOptions: Mn,
    propertyOptions: Tn,
    createFormLayout: Pa,
    typeProperties: tt,
    supportsProp: Vn,
    Crud: Ne,
    Apis: Rt,
    getPrimaryKey: ls,
    getPrimaryKeyByProps: In,
    getId: Ba,
    createDto: Xt,
    makeDto: Ma,
    toFormValues: gs,
    formValues: Aa,
    isComplexProp: Ln,
    asKvps: kl,
    expandEnumFlags: _l,
    enumFlagsConverter: Fn
  };
}
const Ye = class Ye {
  static async getOrFetchValue(t, s, n, a, i, d, u) {
    const c = Ye.getValue(n, u, i);
    return c ?? (await Ye.fetchLookupIds(t, s, n, a, i, d, [u]), Ye.getValue(n, u, i));
  }
  static getValue(t, s, n) {
    const a = Ye.Lookup[t];
    if (a) {
      const i = a[s];
      if (i)
        return n = n.toLowerCase(), i[n];
    }
  }
  static setValue(t, s, n, a) {
    const i = Ye.Lookup[t] ?? (Ye.Lookup[t] = {}), d = i[s] ?? (i[s] = {});
    n = n.toLowerCase(), d[n] = a;
  }
  static setRefValue(t, s) {
    const n = we(s, t.refId);
    if (n == null || t.refLabel == null)
      return null;
    const a = we(s, t.refLabel);
    return Ye.setValue(t.model, n, t.refLabel, a), a;
  }
  static async fetchLookupIds(t, s, n, a, i, d, u) {
    const c = s.operations.find((f) => {
      var p;
      return Ne.isAnyQuery(f) && ((p = f.dataModel) == null ? void 0 : p.name) == n;
    });
    if (c) {
      const f = Ye.Lookup[n] ?? (Ye.Lookup[n] = {}), p = [];
      Object.keys(f).forEach((O) => {
        const H = f[O];
        we(H, i) && p.push(O);
      });
      const $ = u.filter((O) => !p.includes(O));
      if ($.length == 0)
        return;
      const m = d ? null : `${a},${i}`, k = {
        [a + "In"]: $.join(",")
      };
      m && (k.fields = m);
      const g = Xt(c, k), w = await t.api(g, { jsconfig: "edv,eccn" });
      if (w.succeeded)
        (we(w.response, "results") || []).forEach((H) => {
          if (!we(H, a)) {
            console.error(`result[${a}] == null`, H);
            return;
          }
          const ae = `${we(H, a)}`, F = we(H, i);
          i = i.toLowerCase();
          const T = f[ae] ?? (f[ae] = {});
          T[i] = `${F}`;
        });
      else {
        console.error(`Failed to call ${c.request.name}`);
        return;
      }
    }
  }
};
Le(Ye, "Lookup", {});
let It = Ye, tl = () => (/* @__PURE__ */ new Date()).getTime(), Ea = ["/", "T", ":", "-"], ct = {
  //locale: null,
  assumeUtc: !0,
  //number: null,
  date: {
    method: "Intl.DateTimeFormat",
    options: "{dateStyle:'medium'}"
  },
  maxFieldLength: 150,
  maxNestedFields: 2,
  maxNestedFieldLength: 30
}, Ha = new Intl.RelativeTimeFormat(ct.locale, {}), Xl = 24 * 60 * 60 * 1e3 * 365, Us = {
  year: Xl,
  month: Xl / 12,
  day: 24 * 60 * 60 * 1e3,
  hour: 60 * 60 * 1e3,
  minute: 60 * 1e3,
  second: 1e3
}, wt = {
  currency: On,
  bytes: Pn,
  link: Bn,
  linkTel: Rn,
  linkMailTo: En,
  icon: Hn,
  iconRounded: zn,
  attachment: Nn,
  hidden: Un,
  time: qn,
  relativeTime: Cl,
  relativeTimeFromMs: Is,
  enumFlags: Kn,
  formatDate: Nt,
  formatNumber: $l
};
"iconOnError" in globalThis || (globalThis.iconOnError = As);
class Ke {
}
Le(Ke, "currency", { method: "currency" }), Le(Ke, "bytes", { method: "bytes" }), Le(Ke, "link", { method: "link" }), Le(Ke, "linkTel", { method: "linkTel" }), Le(Ke, "linkMailTo", { method: "linkMailTo" }), Le(Ke, "icon", { method: "icon" }), Le(Ke, "iconRounded", { method: "iconRounded" }), Le(Ke, "attachment", { method: "attachment" }), Le(Ke, "time", { method: "time" }), Le(Ke, "relativeTime", { method: "relativeTime" }), Le(Ke, "relativeTimeFromMs", { method: "relativeTimeFromMs" }), Le(Ke, "date", { method: "formatDate" }), Le(Ke, "number", { method: "formatNumber" }), Le(Ke, "hidden", { method: "hidden" }), Le(Ke, "enumFlags", { method: "enumFlags" });
function za(e) {
  ct = Object.assign({}, ct, e);
}
function Na(e) {
  Object.keys(e || {}).forEach((t) => {
    typeof e[t] == "function" && (wt[t] = e[t]);
  });
}
function jn() {
  return wt;
}
function ns(e, t) {
  return t ? dt("span", e, t) : e;
}
function On(e, t) {
  const s = ft(t, ["currency"]);
  return ns(new Intl.NumberFormat(void 0, { style: "currency", currency: (t == null ? void 0 : t.currency) || "USD" }).format(e), s);
}
function Pn(e, t) {
  return ns(ml(e), t);
}
function Bn(e, t) {
  return dt("a", e, Ss({ ...t, href: e }));
}
function Rn(e, t) {
  return dt("a", e, Ss({ ...t, href: `tel:${e}` }));
}
function En(e, t) {
  t || (t = {});
  let { subject: s, body: n } = t, a = ft(t, ["subject", "body"]), i = {};
  return s && (i.subject = s), n && (i.body = n), dt("a", e, Ss({ ...a, href: `mailto:${Pt(e, i)}` }));
}
function Hn(e, t) {
  return dt("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: jt(e), onerror: "iconOnError(this)" }, t));
}
function zn(e, t) {
  return dt("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: jt(e), onerror: "iconOnError(this)" }, t));
}
function Nn(e, t) {
  let s = fl(e), a = ss(s) == null || pl(e) ? jt(e) : hl(e);
  const i = jt(a);
  let d = t && (t["icon-class"] || t.iconClass), u = dt("img", void 0, Object.assign({ class: "w-6 h-6", src: i, onerror: "iconOnError(this,'att')" }, d ? { class: d } : null)), c = `<span class="pl-1">${s}</span>`;
  return dt("a", u + c, Object.assign({ class: "flex", href: jt(e), title: e }, t ? ft(t, ["icon-class", "iconClass"]) : null));
}
function Un(e) {
  return "";
}
function qn(e, t) {
  let s = typeof e == "string" ? new Date(rn(e) * 1e3) : Ls(e) ? St(e) : null;
  return ns(s ? Lo(s) : e, t);
}
function Nt(e, t) {
  if (e == null)
    return "";
  let s = typeof e == "number" ? new Date(e) : typeof e == "string" ? St(e) : e;
  if (!Ls(s))
    return console.warn(`${s} is not a Date value`), e == null ? "" : `${e}`;
  let n = ct.date ? Ds(ct.date) : null;
  return ns(typeof n == "function" ? n(s) : on(s), t);
}
function $l(e, t) {
  if (typeof e != "number")
    return e;
  let s = ct.number ? Ds(ct.number) : null, n = typeof s == "function" ? s(e) : `${e}`;
  return n === "" && (console.warn(`formatNumber(${e}) => ${n}`, s), n = `${e}`), ns(n, t);
}
function Qn(e, t, s) {
  let n = Vo(e), a = t ? Ds(t) : null;
  if (typeof a == "function") {
    let d = s;
    if (t != null && t.options)
      try {
        d = ul(t.options, s);
      } catch (u) {
        console.error(`Could not evaluate '${t.options}'`, u, ", with scope:", s);
      }
    return a(e, d);
  }
  let i = n != null ? Ls(n) ? Nt(n, s) : typeof n == "number" ? $l(n, s) : n : null;
  return i ?? "";
}
function es(e, t, s) {
  return Lt(e) ? Qn(e, t, s) : Za(e, t, s);
}
function Ua(e) {
  if (e == null)
    return NaN;
  if (typeof e == "number")
    return e;
  if (Ls(e))
    return e.getTime() - tl();
  if (typeof e == "string") {
    let t = Number(e);
    if (!isNaN(t))
      return t;
    if (e[0] === "P" || e.startsWith("-P"))
      return rn(e) * 1e3 * -1;
    if (So(e, Ea) >= 0)
      return St(e).getTime() - tl();
  }
  return NaN;
}
function Is(e, t) {
  for (let s in Us)
    if (Math.abs(e) > Us[s] || s === "second")
      return (t || Ha).format(Math.round(e / Us[s]), s);
}
function Cl(e, t) {
  let s = Ua(e);
  return isNaN(s) ? "" : Is(s, t);
}
function qa(e, t) {
  return Is(e.getTime() - (t ? t.getTime() : tl()));
}
function Kn(e, t) {
  return _l(e, t).join(", ");
}
function Ds(e) {
  if (!e)
    return null;
  let { method: t, options: s } = e, n = `${t}(${s})`, a = wt[n] || wt[t];
  if (typeof a == "function")
    return a;
  let i = e.locale || ct.locale;
  if (t.startsWith("Intl.")) {
    let d = i ? `'${i}'` : "undefined", u = `return new ${t}(${d},${s || "undefined"})`;
    try {
      let c = Function(u)();
      return a = t === "Intl.DateTimeFormat" ? (f) => c.format(St(f)) : t === "Intl.NumberFormat" ? (f) => c.format(Number(f)) : t === "Intl.RelativeTimeFormat" ? (f) => Cl(f, c) : (f) => c.format(f), wt[n] = a;
    } catch (c) {
      console.error(`Invalid format: ${u}`, c);
    }
  } else {
    let d = globalThis[t];
    if (typeof d == "function") {
      let u = s != null ? Function("return " + s)() : void 0;
      return a = (c) => d(c, u, i), wt[n] = a;
    }
    console.error(`No '${t}' function exists`, Object.keys(wt));
  }
  return null;
}
function Zn(e, t) {
  return e ? e.length > t ? e.substring(0, t) + "..." : e : "";
}
function Gn(e) {
  return e.substring(0, 6) === "/Date(" ? Nt(St(e)) : e;
}
function Qa(e) {
  return xl(Et(e)).replace(/"/g, "");
}
function Wn(e) {
  if (e == null || e === "")
    return "";
  if (typeof e == "string")
    try {
      return JSON.parse(e);
    } catch {
      console.warn("couldn't parse as JSON", e);
    }
  return e;
}
function xl(e, t = 4) {
  return e = Wn(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : JSON.stringify(e, void 0, t);
}
function Ka(e) {
  return e = Wn(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = Et(e), xl(e));
}
function Et(e) {
  if (e == null)
    return null;
  if (typeof e == "string")
    return Gn(e);
  if (Lt(e))
    return e;
  if (e instanceof Date)
    return Nt(e);
  if (Array.isArray(e))
    return e.map(Et);
  if (typeof e == "object") {
    let t = {};
    return Object.keys(e).forEach((s) => {
      s != "__type" && (t[s] = Et(e[s]));
    }), t;
  }
  return e;
}
function Za(e, t, s) {
  let n = e;
  if (Array.isArray(e)) {
    if (Lt(e[0]))
      return n.join(",");
    e[0] != null && (n = e[0]);
  }
  if (n == null)
    return "";
  if (n instanceof Date)
    return Nt(n, s);
  let a = Object.keys(n), i = [];
  for (let d = 0; d < Math.min(ct.maxNestedFields, a.length); d++) {
    let u = a[d], c = `${Et(n[u])}`;
    i.push(`<b class="font-medium">${u}</b>: ${Qs(Zn(Gn(c), ct.maxNestedFieldLength))}`);
  }
  return a.length > 2 && i.push("..."), dt("span", "{ " + i.join(", ") + " }", Object.assign({ title: Qs(Qa(e)) }, s));
}
function Vm() {
  return {
    Formats: Ke,
    setDefaultFormats: za,
    getFormatters: jn,
    setFormatters: Na,
    formatValue: es,
    formatter: Ds,
    dateInputFormat: Vs,
    currency: On,
    bytes: Pn,
    link: Bn,
    linkTel: Rn,
    linkMailTo: En,
    icon: Hn,
    iconRounded: zn,
    attachment: Nn,
    hidden: Un,
    time: qn,
    relativeTime: Cl,
    relativeTimeFromDate: qa,
    relativeTimeFromMs: Is,
    enumFlags: Kn,
    formatDate: Nt,
    formatNumber: $l,
    indentJson: xl,
    prettyJson: Ka,
    scrub: Et,
    truncate: Zn,
    apiValueFmt: Qn,
    iconOnError: As
  };
}
const Ga = ["title"], Wa = /* @__PURE__ */ ce({
  __name: "RouterLink",
  props: {
    to: {}
  },
  setup(e) {
    const t = e, { config: s } = Mt(), n = () => s.value.navigate(t.to ?? "/");
    return (a, i) => (o(), r("a", Ae({
      onClick: qe(n, ["prevent"]),
      title: a.to,
      href: "javascript:void(0)"
    }, a.$attrs), [
      K(a.$slots, "default")
    ], 16, Ga));
  }
});
class Ja {
  constructor() {
    Le(this, "callbacks", {});
  }
  register(t, s) {
    this.callbacks[t] = s;
  }
  has(t) {
    return !!this.callbacks[t];
  }
  invoke(t, s) {
    const n = this.callbacks[t];
    typeof n == "function" && n(t, s);
  }
}
const et = class et {
  static component(t) {
    const s = et.components[t];
    if (s)
      return s;
    const n = Kl(t), a = Object.keys(et.components).find((i) => Kl(i) === n);
    return a && et.components[a] || null;
  }
};
Le(et, "config", {
  redirectSignIn: "/signin",
  redirectSignOut: "/auth/logout",
  navigate: (t) => location.href = t,
  assetsPathResolver: (t) => t,
  fallbackPathResolver: (t) => t,
  storage: new vn(),
  tableIcon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>" },
  scopeWhitelist: {
    enumFlagsConverter: Fn,
    ...jn()
  }
}), Le(et, "autoQueryGridDefaults", {
  deny: [],
  hide: [],
  toolbarButtonClass: void 0,
  tableStyle: "stripedRows",
  take: 25,
  maxFieldLength: 150
}), Le(et, "events", Mo()), Le(et, "user", I(null)), Le(et, "metadata", I(null)), Le(et, "components", {
  RouterLink: Wa
}), Le(et, "interceptors", new Ja());
let ne = et;
function Xa(e) {
  ne.config = Object.assign(ne.config, e);
}
function Ya(e) {
  ne.autoQueryGridDefaults = Object.assign(ne.autoQueryGridDefaults, e);
}
function Ll(e) {
  return e && ne.config.assetsPathResolver ? ne.config.assetsPathResolver(e) : e;
}
function er(e) {
  return e && ne.config.fallbackPathResolver ? ne.config.fallbackPathResolver(e) : e;
}
function tr(e, t) {
  ne.interceptors.register(e, t);
}
function Mt() {
  const e = v(() => ne.config), t = v(() => ne.autoQueryGridDefaults), s = ne.events;
  return {
    config: e,
    setConfig: Xa,
    events: s,
    autoQueryGridDefaults: t,
    setAutoQueryGridDefaults: Ya,
    assetsPathResolver: Ll,
    fallbackPathResolver: er,
    registerInterceptor: tr
  };
}
const Jn = ce({
  inheritAttrs: !1,
  props: {
    image: Object,
    svg: String,
    src: String,
    alt: String,
    type: String
  },
  setup(e, { attrs: t }) {
    return () => {
      let s = e.image;
      if (e.type) {
        const { typeOf: i } = rt(), d = i(e.type);
        d || console.warn(`Type ${e.type} does not exist`), d != null && d.icon ? s = d == null ? void 0 : d.icon : console.warn(`Type ${e.type} does not have a [Svg] icon`);
      }
      let n = e.svg || (s == null ? void 0 : s.svg) || "";
      if (n.startsWith("<svg ")) {
        let d = xs(n, ">").indexOf("class="), u = `${(s == null ? void 0 : s.cls) || ""} ${t.class || ""}`;
        if (d == -1)
          n = `<svg class="${u}" ${n.substring(4)}`;
        else {
          const c = d + 6 + 1;
          n = `${n.substring(0, c) + u} ${n.substring(c)}`;
        }
        return gt("span", { innerHTML: n });
      } else
        return gt("img", {
          class: [s == null ? void 0 : s.cls, t.class],
          src: Ll(e.src || (s == null ? void 0 : s.uri)),
          onError: (i) => As(i.target)
        });
    };
  }
}), sr = { class: "text-2xl font-semibold text-gray-900 dark:text-gray-300" }, lr = { class: "flex" }, nr = /* @__PURE__ */ l("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1), or = /* @__PURE__ */ l("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "currentFill"
}, null, -1), ar = [
  nr,
  or
], rr = /* @__PURE__ */ ce({
  __name: "Loading",
  props: {
    imageClass: { default: "w-6 h-6" }
  },
  setup(e) {
    return (t, s) => (o(), r("div", sr, [
      l("div", lr, [
        (o(), r("svg", {
          class: b(["self-center inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300", t.imageClass]),
          role: "status",
          viewBox: "0 0 100 101",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, ar, 2)),
        l("span", null, [
          K(t.$slots, "default")
        ])
      ])
    ]));
  }
}), ir = ["href", "onClick"], ur = ["type"], Yl = "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 disabled:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 hover:dark:bg-gray-900 disabled:hover:bg-white dark:disabled:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black", dr = /* @__PURE__ */ ce({
  __name: "OutlineButton",
  props: {
    type: { default: "submit" },
    href: {}
  },
  setup(e) {
    return (t, s) => {
      const n = W("router-link");
      return t.href ? (o(), oe(n, {
        key: 0,
        to: t.href
      }, {
        default: Ce(({ navigate: a }) => [
          l("button", {
            class: b(Yl),
            href: t.href,
            onClick: a
          }, [
            K(t.$slots, "default")
          ], 8, ir)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Ae({
        key: 1,
        type: t.type,
        class: Yl
      }, t.$attrs), [
        K(t.$slots, "default")
      ], 16, ur));
    };
  }
}), cr = ["href", "onClick"], fr = ["type"], vr = /* @__PURE__ */ ce({
  __name: "PrimaryButton",
  props: {
    type: { default: "submit" },
    href: {},
    color: { default: "indigo" }
  },
  setup(e) {
    const t = e, s = {
      blue: "focus:ring-indigo-500 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      purple: "focus:ring-indigo-500 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      red: "focus:ring-red-500 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:hover:bg-red-400 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500",
      green: "focus:ring-green-500 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:hover:bg-green-400 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500",
      sky: "focus:ring-sky-500 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 disabled:hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-500",
      cyan: "focus:ring-cyan-500 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-500",
      indigo: "focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    }, n = v(() => "inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black text-white " + (s[t.color] || s.indigo));
    return (a, i) => {
      const d = W("router-link");
      return a.href ? (o(), oe(d, {
        key: 0,
        to: a.href
      }, {
        default: Ce(({ navigate: u }) => [
          l("button", {
            class: b(n.value),
            href: a.href,
            onClick: u
          }, [
            K(a.$slots, "default")
          ], 10, cr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Ae({
        key: 1,
        type: a.type,
        class: n.value
      }, a.$attrs), [
        K(a.$slots, "default")
      ], 16, fr));
    };
  }
}), pr = ["type", "href", "onClick"], mr = ["type"], en = "inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black", hr = /* @__PURE__ */ ce({
  __name: "SecondaryButton",
  props: {
    type: {},
    href: {}
  },
  setup(e) {
    return (t, s) => {
      const n = W("router-link");
      return t.href ? (o(), oe(n, {
        key: 0,
        to: t.href
      }, {
        default: Ce(({ navigate: a }) => [
          l("button", {
            type: t.type ?? "button",
            class: b(en),
            href: t.href,
            onClick: a
          }, [
            K(t.$slots, "default")
          ], 8, pr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Ae({
        key: 1,
        type: t.type ?? "button",
        class: en
      }, t.$attrs), [
        K(t.$slots, "default")
      ], 16, mr));
    };
  }
});
function We(e, t) {
  return Array.isArray(e) ? e.indexOf(t) >= 0 : e == t || e.includes(t);
}
const $s = {
  blue: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200",
  purple: "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200",
  red: "text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200",
  green: "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200",
  sky: "text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200",
  cyan: "text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200",
  indigo: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
}, nt = {
  base: "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
  invalid: "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500",
  valid: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600"
}, Gt = {
  panelClass: "shadow sm:rounded-md",
  formClass: "space-y-6 bg-white dark:bg-black py-6 px-4 sm:p-6",
  headingClass: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400"
}, Dt = {
  panelClass: "pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg",
  formClass: "flex h-full flex-col divide-y divide-gray-200 dark:divide-gray-700 shadow-xl bg-white dark:bg-black",
  titlebarClass: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6",
  headingClass: "text-lg font-medium text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400",
  closeButtonClass: "rounded-md bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
}, sl = {
  modalClass: "relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8",
  sizeClass: "sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full"
}, Ze = {
  panelClass(e = "slideOver") {
    return e == "card" ? Gt.panelClass : Dt.panelClass;
  },
  formClass(e = "slideOver") {
    return e == "card" ? Gt.formClass : Dt.formClass;
  },
  headingClass(e = "slideOver") {
    return e == "card" ? Gt.headingClass : Dt.headingClass;
  },
  subHeadingClass(e = "slideOver") {
    return e == "card" ? Gt.subHeadingClass : Dt.subHeadingClass;
  },
  buttonsClass: "mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between",
  legendClass: "text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4"
}, he = {
  getGridClass(e = "stripedRows") {
    return he.gridClass;
  },
  getGrid2Class(e = "stripedRows") {
    return We(e, "fullWidth") ? "overflow-x-auto" : he.grid2Class;
  },
  getGrid3Class(e = "stripedRows") {
    return We(e, "fullWidth") ? "inline-block min-w-full py-2 align-middle" : he.grid3Class;
  },
  getGrid4Class(e = "stripedRows") {
    return We(e, "whiteBackground") ? "" : We(e, "fullWidth") ? "overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5" : he.grid4Class;
  },
  getTableClass(e = "stripedRows") {
    return We(e, "fullWidth") || We(e, "verticalLines") ? "min-w-full divide-y divide-gray-300" : he.tableClass;
  },
  getTheadClass(e = "stripedRows") {
    return We(e, "whiteBackground") ? "" : he.theadClass;
  },
  getTheadRowClass(e = "stripedRows") {
    return he.theadRowClass + (We(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  getTheadCellClass(e = "stripedRows") {
    return he.theadCellClass + (We(e, "uppercaseHeadings") ? " uppercase" : "");
  },
  getTbodyClass(e = "stripedRows") {
    return (We(e, "whiteBackground") || We(e, "verticalLines") ? "divide-y divide-gray-200 dark:divide-gray-800" : he.tableClass) + (We(e, "verticalLines") ? " bg-white" : "");
  },
  getTableRowClass(e = "stripedRows", t, s, n) {
    return (n ? "cursor-pointer " : "") + (s ? "bg-indigo-100 dark:bg-blue-800" : (n ? "hover:bg-yellow-50 dark:hover:bg-blue-900 " : "") + (We(e, "stripedRows") ? t % 2 == 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-black")) + (We(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  gridClass: "flex flex-col",
  //original -margins + padding forces scroll bars when parent is w-full for no clear benefits?
  //original: -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8
  grid2Class: "",
  //original: inline-block min-w-full py-2 align-middle md:px-6 lg:px-8
  grid3Class: "inline-block min-w-full py-2 align-middle",
  grid4Class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg",
  tableClass: "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
  theadClass: "bg-gray-50 dark:bg-gray-900",
  tableCellClass: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
  theadRowClass: "select-none",
  theadCellClass: "px-6 py-4 text-left text-sm font-medium tracking-wider whitespace-nowrap",
  toolbarButtonClass: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"
}, gr = {
  colspans: "col-span-3 sm:col-span-3"
}, Sm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a: $s,
  card: Gt,
  dummy: gr,
  form: Ze,
  grid: he,
  input: nt,
  modal: sl,
  slideOver: Dt
}, Symbol.toStringTag, { value: "Module" })), yr = /* @__PURE__ */ ce({
  __name: "TextLink",
  props: {
    color: { default: "blue" }
  },
  setup(e) {
    const t = po(), s = e, n = v(() => ($s[s.color] || $s.blue) + (t.href ? "" : " cursor-pointer"));
    return (a, i) => (o(), r("a", {
      class: b(n.value)
    }, [
      K(a.$slots, "default")
    ], 2));
  }
}), br = {
  class: "flex",
  "aria-label": "Breadcrumb"
}, wr = {
  role: "list",
  class: "flex items-center space-x-4"
}, kr = ["href", "title"], _r = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6 flex-shrink-0",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z",
    "clip-rule": "evenodd"
  })
], -1), $r = { class: "sr-only" }, Cr = /* @__PURE__ */ ce({
  __name: "Breadcrumbs",
  props: {
    homeHref: { default: "/" },
    homeLabel: { default: "Home" }
  },
  setup(e) {
    return (t, s) => (o(), r("nav", br, [
      l("ol", wr, [
        l("li", null, [
          l("div", null, [
            l("a", {
              href: t.homeHref,
              class: "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400",
              title: t.homeLabel
            }, [
              _r,
              l("span", $r, j(t.homeLabel), 1)
            ], 8, kr)
          ])
        ]),
        K(t.$slots, "default")
      ])
    ]));
  }
}), xr = { class: "flex items-center" }, Lr = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6 flex-shrink-0 text-gray-400 dark:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
    "clip-rule": "evenodd"
  })
], -1), Vr = ["href", "title"], Sr = ["title"], Mr = /* @__PURE__ */ ce({
  __name: "Breadcrumb",
  props: {
    href: {},
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("li", null, [
      l("div", xr, [
        Lr,
        t.href ? (o(), r("a", {
          key: 0,
          href: t.href,
          class: "ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
          title: t.title
        }, [
          K(t.$slots, "default")
        ], 8, Vr)) : (o(), r("span", {
          key: 1,
          class: "ml-4 text-lg font-medium text-gray-700 dark:text-gray-300",
          title: t.title
        }, [
          K(t.$slots, "default")
        ], 8, Sr))
      ])
    ]));
  }
}), Ar = {
  key: 0,
  class: "text-base font-semibold text-gray-500 dark:text-gray-400"
}, Tr = {
  role: "list",
  class: "mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800"
}, Fr = /* @__PURE__ */ ce({
  __name: "NavList",
  props: {
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("div", null, [
      t.title ? (o(), r("h2", Ar, j(t.title), 1)) : x("", !0),
      l("ul", Tr, [
        K(t.$slots, "default")
      ])
    ]));
  }
}), Ir = { class: "relative flex items-start space-x-4 py-6" }, Dr = { class: "flex-shrink-0" }, jr = { class: "flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900" }, Or = { class: "min-w-0 flex-1" }, Pr = { class: "text-base font-medium text-gray-900 dark:text-gray-100" }, Br = { class: "rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2" }, Rr = ["href"], Er = /* @__PURE__ */ l("span", {
  class: "absolute inset-0",
  "aria-hidden": "true"
}, null, -1), Hr = { class: "text-base text-gray-500" }, zr = /* @__PURE__ */ l("div", { class: "flex-shrink-0 self-center" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-gray-400",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ l("path", {
      "fill-rule": "evenodd",
      d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
      "clip-rule": "evenodd"
    })
  ])
], -1), Nr = /* @__PURE__ */ ce({
  __name: "NavListItem",
  props: {
    title: {},
    href: {},
    icon: {},
    iconSvg: {},
    iconSrc: {},
    iconAlt: {}
  },
  setup(e) {
    return (t, s) => {
      const n = W("Icon");
      return o(), r("li", Ir, [
        l("div", Dr, [
          l("span", jr, [
            xe(n, {
              class: "w-6 h-6 text-indigo-700 dark:text-indigo-300",
              image: t.icon,
              src: t.iconSrc,
              svg: t.iconSvg,
              alt: t.iconAlt
            }, null, 8, ["image", "src", "svg", "alt"])
          ])
        ]),
        l("div", Or, [
          l("h3", Pr, [
            l("span", Br, [
              l("a", {
                href: t.href,
                class: "focus:outline-none"
              }, [
                Er,
                _e(" " + j(t.title), 1)
              ], 8, Rr)
            ])
          ]),
          l("p", Hr, [
            K(t.$slots, "default")
          ])
        ]),
        zr
      ]);
    };
  }
});
function Xn(e) {
  return e && e.SessionId ? Ao(e) : e;
}
function Ur(e) {
  ne.user.value = Xn(e), ne.events.publish("signIn", e);
}
function qr() {
  ne.user.value = null, ne.events.publish("signOut", null);
}
const Vl = (e) => (e == null ? void 0 : e.roles) || [], Sl = (e) => (e == null ? void 0 : e.permissions) || [];
function Yn(e) {
  return Vl(ne.user.value).indexOf(e) >= 0;
}
function Qr(e) {
  return Sl(ne.user.value).indexOf(e) >= 0;
}
function Ml() {
  return Yn("Admin");
}
function ys(e) {
  if (!e)
    return !1;
  if (!e.requiresAuth)
    return !0;
  const t = ne.user.value;
  if (!t)
    return !1;
  if (Ml())
    return !0;
  let [s, n] = [Vl(t), Sl(t)], [a, i, d, u] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ];
  return !(!a.every((c) => s.indexOf(c) >= 0) || d.length > 0 && !d.some((c) => s.indexOf(c) >= 0) || !i.every((c) => n.indexOf(c) >= 0) || u.length > 0 && !u.every((c) => n.indexOf(c) >= 0));
}
function Kr(e) {
  if (!e || !e.requiresAuth)
    return null;
  const t = ne.user.value;
  if (!t)
    return `<b>${e.request.name}</b> requires Authentication`;
  if (Ml())
    return null;
  let [s, n] = [Vl(t), Sl(t)], [a, i, d, u] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ], c = a.filter((p) => s.indexOf(p) < 0);
  if (c.length > 0)
    return `Requires ${c.map((p) => "<b>" + p + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "");
  let f = i.filter((p) => n.indexOf(p) < 0);
  return f.length > 0 ? `Requires ${f.map((p) => "<b>" + p + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : d.length > 0 && !d.some((p) => s.indexOf(p) >= 0) ? `Requires any ${d.filter((p) => s.indexOf(p) < 0).map((p) => "<b>" + p + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "") : u.length > 0 && !u.every((p) => n.indexOf(p) >= 0) ? `Requires any ${u.filter((p) => n.indexOf(p) < 0).map((p) => "<b>" + p + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : null;
}
function Al() {
  const e = v(() => ne.user.value || null), t = v(() => ne.user.value != null);
  return { signIn: Ur, signOut: qr, user: e, toAuth: Xn, isAuthenticated: t, hasRole: Yn, hasPermission: Qr, isAdmin: Ml, canAccess: ys, invalidAccessMessage: Kr };
}
const Zr = { key: 0 }, Gr = { class: "md:p-4" }, eo = /* @__PURE__ */ ce({
  __name: "EnsureAccess",
  props: {
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    const { isAuthenticated: t } = Al(), { config: s } = Mt(), n = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const d = Pt(s.value.redirectSignIn, { redirect: i });
      s.value.navigate(d);
    }, a = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const d = Pt(s.value.redirectSignOut, { ReturnUrl: i });
      s.value.navigate(d);
    };
    return (i, d) => {
      const u = W("Alert"), c = W("SecondaryButton");
      return i.invalidAccess ? (o(), r("div", Zr, [
        xe(u, {
          class: b(i.alertClass),
          innerHTML: i.invalidAccess
        }, null, 8, ["class", "innerHTML"]),
        l("div", Gr, [
          ee(t) ? (o(), oe(c, {
            key: 1,
            onClick: a
          }, {
            default: Ce(() => [
              _e("Sign Out")
            ]),
            _: 1
          })) : (o(), oe(c, {
            key: 0,
            onClick: n
          }, {
            default: Ce(() => [
              _e("Sign In")
            ]),
            _: 1
          }))
        ])
      ])) : x("", !0);
    };
  }
}), Wr = { class: "absolute top-0 right-0 bg-white dark:bg-black border dark:border-gray-800 rounded normal-case text-sm shadow w-80" }, Jr = { class: "p-4" }, Xr = /* @__PURE__ */ l("h3", { class: "text-base font-medium mb-3 dark:text-gray-100" }, "Sort", -1), Yr = { class: "flex w-full justify-center" }, ei = /* @__PURE__ */ l("svg", {
  class: "w-6 h-6",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
}, [
  /* @__PURE__ */ l("g", { fill: "currentColor" }, [
    /* @__PURE__ */ l("path", {
      "fill-rule": "evenodd",
      d: "M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
    }),
    /* @__PURE__ */ l("path", { d: "M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999l.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" })
  ])
], -1), ti = /* @__PURE__ */ l("span", null, "ASC", -1), si = [
  ei,
  ti
], li = /* @__PURE__ */ Cs('<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="currentColor"><path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"></path><path fill-rule="evenodd" d="M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"></path><path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"></path></g></svg><span>DESC</span>', 2), ni = [
  li
], oi = /* @__PURE__ */ l("h3", { class: "text-base font-medium mt-4 mb-2" }, " Filter ", -1), ai = { key: 0 }, ri = ["id", "value"], ii = ["for"], ui = { key: 1 }, di = { class: "mb-2" }, ci = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, fi = ["onClick"], vi = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), pi = [
  vi
], mi = { class: "flex" }, hi = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
    "clip-rule": "evenodd"
  })
], -1), gi = [
  hi
], yi = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Tl = /* @__PURE__ */ ce({
  __name: "FilterColumn",
  props: {
    definitions: {},
    column: {},
    topLeft: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = I(), i = I(""), d = I(""), u = I([]), c = v(() => s.column.meta.isEnum == !0), f = v(() => at(s.column.meta.type === "Nullable`1" ? s.column.meta.genericArgs[0] : s.column.meta.type)), p = v(() => s.column.meta.isEnum == !0 ? kl(Mn(f.value.name)) : []), $ = v(() => {
      var V;
      return ((V = g(s.column.type)) == null ? void 0 : V.map((z) => ({ key: z.value, value: z.name }))) || [];
    }), m = I({ filters: [] }), k = v(() => m.value.filters);
    bs(() => m.value = Object.assign({}, s.column.settings, {
      filters: Array.from(s.column.settings.filters)
    })), bs(() => {
      var z, Q, te, R, Z;
      let V = ((te = (Q = (z = s.column.settings.filters) == null ? void 0 : z[0]) == null ? void 0 : Q.value) == null ? void 0 : te.split(",")) || [];
      if (V.length > 0 && ((R = f.value) != null && R.isEnumInt)) {
        const J = parseInt(V[0]);
        V = ((Z = f.value.enumValues) == null ? void 0 : Z.filter((U) => (J & parseInt(U)) > 0)) || [];
      }
      u.value = V;
    });
    function g(V) {
      let z = s.definitions;
      return xn(V) || (z = z.filter((Q) => Q.types !== "string")), z;
    }
    function w(V, z) {
      return g(V).find((Q) => Q.value === z);
    }
    function O() {
      var z;
      if (!i.value)
        return;
      let V = (z = w(s.column.type, i.value)) == null ? void 0 : z.name;
      V && (m.value.filters.push({ key: i.value, name: V, value: d.value }), i.value = d.value = "");
    }
    function H(V) {
      m.value.filters.splice(V, 1);
    }
    function ae(V) {
      return Dn(w(s.column.type, V.key), s.column.type, V);
    }
    function F() {
      n("done");
    }
    function T() {
      var V;
      i.value = "%", (V = a.value) == null || V.focus();
    }
    function A() {
      var V;
      if (d.value && O(), c.value) {
        let z = Object.values(u.value).filter((Q) => Q);
        m.value.filters = z.length > 0 ? (V = f.value) != null && V.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: z.map((Q) => parseInt(Q)).reduce((Q, te) => Q + te, 0).toString() }] : [{ key: "%In", name: "In", value: z.join(",") }] : [];
      }
      n("save", m.value), n("done");
    }
    function ue(V) {
      m.value.sort = V === m.value.sort ? void 0 : V, _t(A);
    }
    return (V, z) => {
      var J;
      const Q = W("SelectInput"), te = W("TextInput"), R = W("PrimaryButton"), Z = W("SecondaryButton");
      return o(), r("div", {
        class: "fixed z-20 inset-0 overflow-y-auto",
        onClick: F,
        onVnodeMounted: T
      }, [
        l("div", {
          class: "absolute",
          style: ll(`top:${V.topLeft.y}px;left:${V.topLeft.x}px`),
          onClick: z[5] || (z[5] = qe(() => {
          }, ["stop"]))
        }, [
          l("div", Wr, [
            l("div", Jr, [
              Xr,
              l("div", Yr, [
                l("button", {
                  type: "button",
                  title: "Sort Ascending",
                  onClick: z[0] || (z[0] = (U) => ue("ASC")),
                  class: b(`${m.value.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, si, 2),
                l("button", {
                  type: "button",
                  title: "Sort Descending",
                  onClick: z[1] || (z[1] = (U) => ue("DESC")),
                  class: b(`${m.value.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, ni, 2)
              ]),
              oi,
              c.value ? (o(), r("div", ai, [
                (o(!0), r(Ie, null, De(p.value, (U) => (o(), r("div", {
                  key: U.key,
                  class: "flex items-center"
                }, [
                  $t(l("input", {
                    type: "checkbox",
                    id: U.key,
                    value: U.key,
                    "onUpdate:modelValue": z[2] || (z[2] = (M) => u.value = M),
                    class: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  }, null, 8, ri), [
                    [nl, u.value]
                  ]),
                  l("label", {
                    for: U.key,
                    class: "ml-3"
                  }, j(U.value), 9, ii)
                ]))), 128))
              ])) : (o(), r("div", ui, [
                (o(!0), r(Ie, null, De(k.value, (U, M) => (o(), r("div", di, [
                  l("span", ci, [
                    _e(j(V.column.name) + " " + j(U.name) + " " + j(ae(U)) + " ", 1),
                    l("button", {
                      type: "button",
                      onClick: (Y) => H(M),
                      class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    }, pi, 8, fi)
                  ])
                ]))), 256)),
                l("div", mi, [
                  xe(Q, {
                    id: "filterRule",
                    class: "w-32 mr-1",
                    modelValue: i.value,
                    "onUpdate:modelValue": z[3] || (z[3] = (U) => i.value = U),
                    entries: $.value,
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue", "entries"]),
                  ((J = w(V.column.type, i.value)) == null ? void 0 : J.valueType) !== "none" ? (o(), oe(te, {
                    key: 0,
                    ref_key: "txtFilter",
                    ref: a,
                    id: "filterValue",
                    class: "w-32 mr-1",
                    type: "text",
                    modelValue: d.value,
                    "onUpdate:modelValue": z[4] || (z[4] = (U) => d.value = U),
                    onKeyup: ln(O, ["enter"]),
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue"])) : x("", !0),
                  l("div", { class: "pt-1" }, [
                    l("button", {
                      type: "button",
                      onClick: O,
                      class: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }, gi)
                  ])
                ])
              ]))
            ]),
            l("div", yi, [
              xe(R, {
                onClick: A,
                color: "red",
                class: "ml-2"
              }, {
                default: Ce(() => [
                  _e(" Save ")
                ]),
                _: 1
              }),
              xe(Z, { onClick: F }, {
                default: Ce(() => [
                  _e(" Cancel ")
                ]),
                _: 1
              })
            ])
          ])
        ], 4)
      ], 512);
    };
  }
}), bi = { class: "px-4 sm:px-6 lg:px-8 text-sm" }, wi = { class: "flex flex-wrap" }, ki = { class: "group pr-4 sm:pr-6 lg:pr-8" }, _i = { class: "flex justify-between w-full font-medium" }, $i = { class: "w-6 flex justify-end" }, Ci = { class: "hidden group-hover:inline" }, xi = ["onClick", "title"], Li = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), Vi = [
  Li
], Si = {
  key: 0,
  class: "pt-2"
}, Mi = { class: "ml-2" }, Ai = { key: 1 }, Ti = { class: "pt-2" }, Fi = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, Ii = ["onClick"], Di = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), ji = [
  Di
], Oi = /* @__PURE__ */ l("span", null, "Clear All", -1), Pi = [
  Oi
], Fl = /* @__PURE__ */ ce({
  __name: "FilterViews",
  props: {
    definitions: {},
    columns: {}
  },
  emits: ["done", "change"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = v(() => s.columns.filter((m) => m.settings.filters.length > 0));
    function i(m) {
      var k, g;
      return (g = (k = m == null ? void 0 : m[0]) == null ? void 0 : k.value) == null ? void 0 : g.split(",");
    }
    function d(m) {
      let k = s.definitions;
      return xn(m) || (k = k.filter((g) => g.types !== "string")), k;
    }
    function u(m, k) {
      return d(m).find((g) => g.value === k);
    }
    function c(m, k) {
      return Dn(u(m.type, k.value), m.type, k);
    }
    function f(m) {
      m.settings.filters = [], n("change", m);
    }
    function p(m, k) {
      m.settings.filters.splice(k, 1), n("change", m);
    }
    function $() {
      s.columns.forEach((m) => {
        m.settings.filters = [], n("change", m);
      }), n("done");
    }
    return (m, k) => (o(), r("div", bi, [
      l("div", wi, [
        (o(!0), r(Ie, null, De(a.value, (g) => (o(), r("fieldset", ki, [
          l("legend", _i, [
            l("span", null, j(ee(ze)(g.name)), 1),
            l("span", $i, [
              l("span", Ci, [
                l("button", {
                  onClick: (w) => f(g),
                  title: `Clear all ${ee(ze)(g.name)} filters`,
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                }, Vi, 8, xi)
              ])
            ])
          ]),
          g.meta.isEnum ? (o(), r("div", Si, [
            (o(!0), r(Ie, null, De(i(g.settings.filters), (w) => (o(), r("div", {
              key: w,
              class: "flex items-center"
            }, [
              l("label", Mi, j(w), 1)
            ]))), 128))
          ])) : (o(), r("div", Ai, [
            (o(!0), r(Ie, null, De(g.settings.filters, (w, O) => (o(), r("div", Ti, [
              l("span", Fi, [
                _e(j(g.name) + " " + j(w.name) + " " + j(c(g, w)) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (H) => p(g, O),
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                }, ji, 8, Ii)
              ])
            ]))), 256))
          ]))
        ]))), 256))
      ]),
      l("div", { class: "flex justify-center pt-4" }, [
        l("button", {
          type: "button",
          onClick: $,
          class: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }, Pi)
      ])
    ]));
  }
}), Bi = { class: "bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Ri = { class: "" }, Ei = { class: "mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left" }, Hi = /* @__PURE__ */ l("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" }, "Query Preferences", -1), zi = { class: "mt-4" }, Ni = ["for"], Ui = ["id"], qi = ["value", "selected"], Qi = { class: "mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800" }, Ki = ["id", "checked"], Zi = ["for"], Gi = { class: "mt-4" }, Wi = { class: "pb-2 px-4" }, Ji = { class: "" }, Xi = ["id", "value"], Yi = ["for"], eu = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Il = /* @__PURE__ */ ce({
  __name: "QueryPrefs",
  props: {
    id: { default: "QueryPrefs" },
    columns: {},
    prefs: {},
    maxLimit: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const { autoQueryGridDefaults: s } = Mt(), n = e, a = t, i = I({});
    bs(() => i.value = Object.assign({
      take: s.value.take,
      selectedColumns: []
    }, n.prefs));
    const d = [10, 25, 50, 100, 250, 500, 1e3];
    function u() {
      a("done");
    }
    function c() {
      a("save", i.value);
    }
    return (f, p) => {
      const $ = W("PrimaryButton"), m = W("SecondaryButton"), k = W("ModalDialog");
      return o(), oe(k, {
        id: f.id,
        onDone: u,
        "size-class": "w-full sm:max-w-prose"
      }, {
        default: Ce(() => [
          l("div", Bi, [
            l("div", Ri, [
              l("div", Ei, [
                Hi,
                l("div", zi, [
                  l("label", {
                    for: `${f.id}-take`,
                    class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                  }, "Results per page", 8, Ni),
                  $t(l("select", {
                    id: `${f.id}-take`,
                    "onUpdate:modelValue": p[0] || (p[0] = (g) => i.value.take = g),
                    class: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  }, [
                    (o(!0), r(Ie, null, De(d.filter((g) => n.maxLimit == null || g <= n.maxLimit), (g) => (o(), r("option", {
                      value: g,
                      selected: g === i.value.take
                    }, j(g), 9, qi))), 256))
                  ], 8, Ui), [
                    [mo, i.value.take]
                  ])
                ]),
                l("div", Qi, [
                  l("input", {
                    type: "radio",
                    id: `${f.id}-allColumns`,
                    onClick: p[1] || (p[1] = (g) => i.value.selectedColumns = []),
                    checked: i.value.selectedColumns.length === 0,
                    class: "focus:ring-indigo-500 h-4 w-4 bg-white dark:bg-black text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700"
                  }, null, 8, Ki),
                  l("label", {
                    class: "ml-3 block text-gray-700 dark:text-gray-300",
                    for: `${f.id}-allColumns`
                  }, "View all columns", 8, Zi)
                ]),
                l("div", Gi, [
                  l("div", Wi, [
                    l("div", Ji, [
                      (o(!0), r(Ie, null, De(f.columns, (g) => (o(), r("div", {
                        key: g.name,
                        class: "flex items-center"
                      }, [
                        $t(l("input", {
                          type: "checkbox",
                          id: g.name,
                          value: g.name,
                          "onUpdate:modelValue": p[2] || (p[2] = (w) => i.value.selectedColumns = w),
                          class: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
                        }, null, 8, Xi), [
                          [nl, i.value.selectedColumns]
                        ]),
                        l("label", {
                          for: g.name,
                          class: "ml-3"
                        }, j(g.name), 9, Yi)
                      ]))), 128))
                    ])
                  ])
                ])
              ])
            ])
          ]),
          l("div", eu, [
            xe($, {
              onClick: c,
              color: "red",
              class: "ml-2"
            }, {
              default: Ce(() => [
                _e(" Save ")
              ]),
              _: 1
            }),
            xe(m, { onClick: u }, {
              default: Ce(() => [
                _e(" Cancel ")
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["id"]);
    };
  }
}), tu = { key: 0 }, su = { key: 1 }, lu = {
  key: 2,
  class: "pt-1"
}, nu = { key: 0 }, ou = { key: 1 }, au = { key: 3 }, ru = { class: "pl-1 pt-1 flex flex-wrap" }, iu = { class: "flex mt-1" }, uu = ["title"], du = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("g", {
    "stroke-width": "1.5",
    fill: "none"
  }, [
    /* @__PURE__ */ l("path", {
      d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18",
      stroke: "currentColor"
    })
  ])
], -1), cu = [
  du
], fu = ["disabled"], vu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), pu = [
  vu
], mu = ["disabled"], hu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), gu = [
  hu
], yu = ["disabled"], bu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), wu = [
  bu
], ku = ["disabled"], _u = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), $u = [
  _u
], Cu = {
  key: 0,
  class: "flex mt-1"
}, xu = { class: "px-4 text-lg text-black dark:text-white" }, Lu = { key: 0 }, Vu = { key: 1 }, Su = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), Mu = { key: 2 }, Au = { class: "flex flex-wrap" }, Tu = {
  key: 0,
  class: "pl-2 mt-1"
}, Fu = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "none",
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M20 20v-5h-5M4 4v5h5m10.938 2A8.001 8.001 0 0 0 5.07 8m-1.008 5a8.001 8.001  0 0 0 14.868 3"
  })
], -1), Iu = [
  Fu
], Du = {
  key: 1,
  class: "pl-2 mt-1"
}, ju = /* @__PURE__ */ Cs('<svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.162 1.162 0 0 0 30 25.349V5.5a1.162 1.162 0 0 0-1.219-1.095zm.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411z" fill="#20744a" fill-rule="evenodd"></path><path fill="#20744a" d="M22.487 7.439h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 10.94h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 14.441h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 17.942h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 21.443h4.323v2.2h-4.323z"></path><path fill="#fff" fill-rule="evenodd" d="M6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663l-2.238-4.993z"></path></svg><span class="text-green-900 dark:text-green-100">Excel</span>', 2), Ou = [
  ju
], Pu = {
  key: 2,
  class: "pl-2 mt-1"
}, Bu = {
  key: 0,
  class: "w-5 h-5 mr-1 text-green-600 dark:text-green-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Ru = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M5 13l4 4L19 7"
}, null, -1), Eu = [
  Ru
], Hu = {
  key: 1,
  class: "w-5 h-5 mr-1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, zu = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }),
  /* @__PURE__ */ l("path", {
    d: "M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), Nu = [
  zu
], Uu = /* @__PURE__ */ l("span", { class: "whitespace-nowrap" }, "Copy URL", -1), qu = {
  key: 3,
  class: "pl-2 mt-1"
}, Qu = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), Ku = [
  Qu
], Zu = {
  key: 4,
  class: "pl-2 mt-1"
}, Gu = /* @__PURE__ */ l("svg", {
  class: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
    "clip-rule": "evenodd"
  })
], -1), Wu = { class: "mr-1" }, Ju = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Xu = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), Yu = [
  Xu
], ed = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, td = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), sd = [
  td
], ld = {
  key: 5,
  class: "pl-2 mt-1"
}, nd = ["title"], od = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: "currentColor"
  })
], -1), ad = { class: "whitespace-nowrap" }, rd = { key: 7 }, id = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, ud = { class: "mr-1 select-none" }, dd = {
  key: 1,
  class: "flex justify-between items-center"
}, cd = { class: "mr-1 select-none" }, vs = 25, fd = /* @__PURE__ */ ce({
  __name: "AutoQueryGrid",
  props: {
    filterDefinitions: {},
    id: { default: "AutoQueryGrid" },
    apis: {},
    type: {},
    prefs: {},
    deny: {},
    hide: {},
    selectedColumns: {},
    toolbarButtonClass: {},
    tableStyle: {},
    gridClass: {},
    grid2Class: {},
    grid3Class: {},
    grid4Class: {},
    tableClass: {},
    theadClass: {},
    tbodyClass: {},
    theadRowClass: {},
    theadCellClass: {},
    headerTitle: {},
    headerTitles: {},
    visibleFrom: {},
    rowClass: {},
    rowStyle: {},
    modelTitle: {},
    newButtonLabel: {},
    apiPrefs: {},
    canFilter: {},
    disableKeyBindings: {},
    configureField: {},
    skip: { default: 0 },
    create: { type: Boolean },
    edit: {},
    filters: {}
  },
  emits: ["headerSelected", "rowSelected", "nav"],
  setup(e, { expose: t, emit: s }) {
    const { config: n, autoQueryGridDefaults: a } = Mt(), i = a, d = n.value.storage, u = e, c = s, f = Ue("client"), p = "filtering,queryString,queryFilters".split(","), $ = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar".split(","), m = v(() => u.deny ? kt(p, u.deny) : kt(p, i.value.deny)), k = v(() => u.hide ? kt($, u.hide) : kt($, i.value.hide));
    function g(_) {
      return m.value[_];
    }
    function w(_) {
      return k.value[_];
    }
    const O = v(() => u.tableStyle ?? i.value.tableStyle), H = v(() => u.gridClass ?? he.getGridClass(O.value)), ae = v(() => u.grid2Class ?? he.getGrid2Class(O.value)), F = v(() => u.grid3Class ?? he.getGrid3Class(O.value)), T = v(() => u.grid4Class ?? he.getGrid4Class(O.value)), A = v(() => u.tableClass ?? he.getTableClass(O.value)), ue = v(() => u.theadClass ?? he.getTheadClass(O.value)), V = v(() => u.theadRowClass ?? he.getTheadRowClass(O.value)), z = v(() => u.theadCellClass ?? he.getTheadCellClass(O.value)), Q = v(() => u.toolbarButtonClass ?? he.toolbarButtonClass);
    function te(_, P) {
      var Fe;
      if (u.rowClass)
        return u.rowClass(_, P);
      const ve = !!ke.value.AnyUpdate, be = ((Fe = Ve.value) != null && Fe.name ? we(_, Ve.value.name) : null) == G.value;
      return he.getTableRowClass(u.tableStyle, P, be, ve);
    }
    const R = ol(), Z = v(() => {
      var _;
      return Es(((_ = ke.value.AnyQuery.viewModel) == null ? void 0 : _.name) || ke.value.AnyQuery.dataModel.name);
    }), J = v(() => {
      const _ = Object.keys(R).map((P) => P.toLowerCase());
      return tt(Z.value).filter((P) => _.includes(P.name.toLowerCase()) || _.includes(P.name.toLowerCase() + "-header")).map((P) => P.name);
    });
    function U() {
      let _ = yt(u.selectedColumns);
      return _.length > 0 ? _ : J.value.length > 0 ? J.value : [];
    }
    const M = v(() => {
      let P = U().map((re) => re.toLowerCase());
      const ve = tt(Z.value);
      return P.length > 0 ? P.map((re) => ve.find((be) => be.name.toLowerCase() === re)).filter((re) => re != null) : ve;
    }), Y = v(() => {
      let _ = M.value.map((ve) => ve.name), P = yt(pe.value.selectedColumns).map((ve) => ve.toLowerCase());
      return P.length > 0 ? _.filter((ve) => P.includes(ve.toLowerCase())) : _;
    }), y = I([]), N = I(new Xe()), E = I(new Xe()), h = I(), C = I(!1), G = I(), X = I(), se = I(!1), D = I(), L = I(u.skip), fe = I(!1), pe = I({ take: vs }), ie = I(!1), me = v(() => y.value.some((_) => _.settings.filters.length > 0 || !!_.settings.sort) || pe.value.selectedColumns), S = v(() => y.value.map((_) => _.settings.filters.length).reduce((_, P) => _ + P, 0)), de = v(() => {
      var _;
      return tt(Es(Tt.value || ((_ = ke.value.AnyQuery) == null ? void 0 : _.dataModel.name)));
    }), Ve = v(() => {
      var _;
      return ls(Es(Tt.value || ((_ = ke.value.AnyQuery) == null ? void 0 : _.dataModel.name)));
    }), Se = v(() => pe.value.take ?? vs), ge = v(() => N.value.response ? we(N.value.response, "results") : []), B = v(() => {
      var _;
      return ((_ = N.value.response) == null ? void 0 : _.total) ?? ge.value.length ?? 0;
    }), q = v(() => L.value > 0), le = v(() => L.value > 0), ye = v(() => ge.value.length >= Se.value), $e = v(() => ge.value.length >= Se.value), Me = I(), Re = I(), Te = {
      NoQuery: "No Query API was found"
    };
    t({
      update: lt,
      search: jl,
      createRequestArgs: Bs,
      reset: ql,
      createDone: Kt,
      createSave: zs,
      editDone: Qt,
      editSave: us,
      forceUpdate: Ps,
      setEdit: Os,
      edit: X,
      createForm: Me,
      editForm: Re
    }), ne.interceptors.has("AutoQueryGrid.new") && ne.interceptors.invoke("AutoQueryGrid.new", { props: u });
    function Oe(_) {
      if (_) {
        if (u.canFilter)
          return u.canFilter(_);
        const P = de.value.find((ve) => ve.name.toLowerCase() == _.toLowerCase());
        if (P)
          return !Ln(P);
      }
      return !1;
    }
    function je(_) {
      c("nav", _), g("queryString") && il(_);
    }
    async function Ge(_) {
      L.value += _, L.value < 0 && (L.value = 0);
      const P = Math.floor(B.value / Se.value) * Se.value;
      L.value > P && (L.value = P), je({ skip: L.value || void 0 }), await lt();
    }
    async function Ee(_, P) {
      var be, Fe;
      if (X.value = null, G.value = P, !_ || !P)
        return;
      let ve = Xt(ke.value.AnyQuery, { [_]: P });
      const re = await f.api(ve);
      if (re.succeeded) {
        let He = (be = we(re.response, "results")) == null ? void 0 : be[0];
        He || console.warn(`API ${(Fe = ke.value.AnyQuery) == null ? void 0 : Fe.request.name}(${_}:${P}) returned no results`), X.value = He;
      }
    }
    async function it(_, P) {
      var be;
      c("rowSelected", _, P);
      const ve = (be = Ve.value) == null ? void 0 : be.name, re = ve ? we(_, ve) : null;
      !ve || !re || (je({ edit: re }), Ee(ve, re));
    }
    function At(_, P) {
      var re;
      if (!g("filtering"))
        return;
      let ve = P.target;
      if (Oe(_) && (ve == null ? void 0 : ve.tagName) !== "TD") {
        let be = (re = ve == null ? void 0 : ve.closest("TABLE")) == null ? void 0 : re.getBoundingClientRect(), Fe = y.value.find((He) => He.name.toLowerCase() == _.toLowerCase());
        if (Fe && be) {
          let He = 318, ut = be.x + He + 10;
          D.value = {
            column: Fe,
            topLeft: {
              x: Math.max(Math.floor(P.clientX + He / 2), ut),
              y: be.y + 45
            }
          };
        }
      }
      c("headerSelected", _, P);
    }
    function mt() {
      D.value = null;
    }
    async function os(_) {
      var ve;
      let P = (ve = D.value) == null ? void 0 : ve.column;
      P && (P.settings = _, d.setItem(rs(P.name), JSON.stringify(P.settings)), await lt()), D.value = null;
    }
    async function as(_) {
      d.setItem(rs(_.name), JSON.stringify(_.settings)), await lt();
    }
    async function to(_) {
      se.value = !1, pe.value = _, d.setItem(Rs(), JSON.stringify(_)), await lt();
    }
    function Dl(_) {
      var P;
      Me.value && (Object.assign((P = Me.value) == null ? void 0 : P.model, _), Ps());
    }
    function Os(_) {
      Object.assign(X.value, _), Ps();
    }
    function Ps() {
      var P, ve, re;
      (P = Me.value) == null || P.forceUpdate(), (ve = Re.value) == null || ve.forceUpdate();
      const _ = Be();
      (re = _ == null ? void 0 : _.proxy) == null || re.$forceUpdate();
    }
    async function lt() {
      await jl(Bs());
    }
    async function so() {
      await lt();
    }
    async function jl(_) {
      const P = ke.value.AnyQuery;
      if (!P) {
        console.error(Te.NoQuery);
        return;
      }
      let ve = Xt(P, _), re = un((He) => {
        N.value.response = N.value.error = void 0, ie.value = He;
      }), be = await f.api(ve);
      re(), _t(() => N.value = be);
      let Fe = we(be.response, "results") || [];
      !be.succeeded || Fe.label == 0;
    }
    function Bs() {
      let _ = {
        include: "total",
        take: Se.value
      }, P = yt(pe.value.selectedColumns || u.selectedColumns);
      if (P.length > 0) {
        let re = Ve.value;
        re && !P.includes(re.name) && (P = [re.name, ...P]);
        const be = de.value, Fe = [];
        P.forEach((He) => {
          var ds;
          const ut = be.find((Pe) => Pe.name.toLowerCase() == He.toLowerCase());
          (ds = ut == null ? void 0 : ut.ref) != null && ds.selfId && Fe.push(ut.ref.selfId), we(R, He) && Fe.push(...be.filter((Pe) => {
            var ht, Zt;
            return ((Zt = (ht = Pe.ref) == null ? void 0 : ht.selfId) == null ? void 0 : Zt.toLowerCase()) == He.toLowerCase();
          }).map((Pe) => Pe.name));
        }), Fe.forEach((He) => {
          P.includes(He) || P.push(He);
        }), _.fields = P.join(",");
      }
      let ve = [];
      if (y.value.forEach((re) => {
        re.settings.sort && ve.push((re.settings.sort === "DESC" ? "-" : "") + re.name), re.settings.filters.forEach((be) => {
          let Fe = be.key.replace("%", re.name);
          _[Fe] = be.value;
        });
      }), u.filters && Object.keys(u.filters).forEach((re) => {
        _[re] = u.filters[re];
      }), g("queryString") && g("queryFilters")) {
        const re = location.search ? location.search : location.hash.includes("?") ? "?" + ps(location.hash, "?") : "";
        let be = Ks(re);
        if (Object.keys(be).forEach((Fe) => {
          M.value.find((ut) => ut.name.toLowerCase() === Fe.toLowerCase()) && (_[Fe] = be[Fe]);
        }), typeof be.skip < "u") {
          const Fe = parseInt(be.skip);
          isNaN(Fe) || (L.value = _.skip = Fe);
        }
      }
      return typeof _.skip > "u" && L.value > 0 && (_.skip = L.value), ve.length > 0 && (_.orderBy = ve.join(",")), _;
    }
    function lo() {
      const _ = Ol("csv");
      Ws(_), typeof window < "u" && window.open(_);
    }
    function no() {
      const _ = Ol("json");
      Ws(_), fe.value = !0, setTimeout(() => fe.value = !1, 3e3);
    }
    function Ol(_ = "json") {
      var Fe;
      const P = Bs(), ve = `/api/${(Fe = ke.value.AnyQuery) == null ? void 0 : Fe.request.name}`, re = To(f.baseUrl, Pt(ve, { ...P, jsconfig: "edv" }));
      return re.indexOf("?") >= 0 ? xs(re, "?") + "." + _ + "?" + ps(re, "?") : re + ".json";
    }
    async function oo() {
      y.value.forEach((_) => {
        _.settings = { filters: [] }, d.removeItem(rs(_.name));
      }), pe.value = { take: vs }, d.removeItem(Rs()), await lt();
    }
    function ao() {
      C.value = !0, je({ create: null });
    }
    const Tt = v(() => zt(u.type)), Ut = v(() => {
      var _;
      return Tt.value || ((_ = ke.value.AnyQuery) == null ? void 0 : _.dataModel.name);
    }), qt = v(() => u.modelTitle || Ut.value), ro = v(() => u.newButtonLabel || `New ${qt.value}`), Rs = () => {
      var _;
      return `${u.id}/ApiPrefs/${Tt.value || ((_ = ke.value.AnyQuery) == null ? void 0 : _.dataModel.name)}`;
    }, rs = (_) => {
      var P;
      return `Column/${u.id}:${Tt.value || ((P = ke.value.AnyQuery) == null ? void 0 : P.dataModel.name)}.${_}`;
    }, { metadataApi: Pl, typeOf: Es, apiOf: Bl, filterDefinitions: io } = rt(), { invalidAccessMessage: Hs } = Al(), Rl = v(() => u.filterDefinitions || io.value), ke = v(() => {
      let _ = yt(u.apis);
      return _.length > 0 ? Rt.from(_.map((P) => Bl(P)).filter((P) => P != null).map((P) => P)) : Rt.forType(Tt.value, Pl.value);
    }), is = (_) => `<span class="text-yellow-700">${_}</span>`, El = v(() => {
      if (!Pl.value)
        return is(`AppMetadata not loaded, see <a class="${$s.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
      let P = yt(u.apis).map((re) => Bl(re) == null ? re : null).filter((re) => re != null);
      if (P.length > 0)
        return is(`Unknown API${P.length > 1 ? "s" : ""}: ${P.join(", ")}`);
      let ve = ke.value;
      return ve.empty ? is("Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : ve.AnyQuery ? null : is(Te.NoQuery);
    }), Hl = v(() => ke.value.AnyQuery && Hs(ke.value.AnyQuery)), zl = v(() => ke.value.Create && Hs(ke.value.Create)), Nl = v(() => ke.value.AnyUpdate && Hs(ke.value.AnyUpdate)), uo = v(() => ys(ke.value.Create));
    v(() => ys(ke.value.AnyUpdate));
    const Ul = v(() => ys(ke.value.Delete));
    function Qt() {
      X.value = null, G.value = null, je({ edit: void 0 });
    }
    function Kt() {
      C.value = !1, je({ create: void 0 });
    }
    async function us() {
      await lt(), Qt();
    }
    async function zs() {
      await lt(), Kt();
    }
    function ql() {
      var ve;
      N.value = new Xe(), E.value = new Xe(), C.value = !1, G.value = null, X.value = null, se.value = !1, D.value = null, L.value = u.skip, fe.value = !1, pe.value = { take: vs }, ie.value = !1;
      const _ = u.prefs || _s(d.getItem(Rs()));
      _ && (pe.value = _), y.value = M.value.map((re) => ({
        name: re.name,
        type: re.type,
        meta: re,
        settings: Object.assign(
          {
            filters: []
          },
          _s(d.getItem(rs(re.name)))
        )
      })), isNaN(u.skip) || (L.value = u.skip);
      let P = (ve = Ve.value) == null ? void 0 : ve.name;
      if (g("queryString")) {
        const re = location.search ? location.search : location.hash.includes("?") ? "?" + ps(location.hash, "?") : "";
        let be = Ks(re);
        typeof be.create < "u" ? C.value = typeof be.create < "u" : P && (typeof be.edit == "string" || typeof be.edit == "number") && Ee(P, be.edit);
      }
      u.create === !0 && (C.value = !0), P && u.edit != null && Ee(P, u.edit);
    }
    return st(async () => {
      ql(), await lt();
    }), (_, P) => {
      const ve = W("Alert"), re = W("EnsureAccessDialog"), be = W("AutoCreateForm"), Fe = W("AutoEditForm"), He = W("ErrorSummary"), ut = W("Loading"), Ql = W("SettingsIcons"), ds = W("DataGrid");
      return El.value ? (o(), r("div", tu, [
        xe(ve, { innerHTML: El.value }, null, 8, ["innerHTML"])
      ])) : Hl.value ? (o(), r("div", su, [
        xe(eo, { "invalid-access": Hl.value }, null, 8, ["invalid-access"])
      ])) : (o(), r("div", lu, [
        C.value && ke.value.Create ? (o(), r("div", nu, [
          zl.value ? (o(), oe(re, {
            key: 0,
            title: `Create ${qt.value}`,
            "invalid-access": zl.value,
            "alert-class": "text-yellow-700",
            onDone: Kt
          }, null, 8, ["title", "invalid-access"])) : ee(R).createform ? K(_.$slots, "createform", {
            key: 1,
            type: ke.value.Create.request.name,
            configure: _.configureField,
            done: Kt,
            save: zs
          }) : (o(), oe(be, {
            key: 2,
            ref_key: "createForm",
            ref: Me,
            type: ke.value.Create.request.name,
            configure: _.configureField,
            onDone: Kt,
            onSave: zs
          }, {
            header: Ce(() => [
              K(_.$slots, "formheader", {
                form: "create",
                formInstance: Me.value,
                apis: ke.value,
                type: Ut.value,
                updateModel: Dl
              })
            ]),
            footer: Ce(() => [
              K(_.$slots, "formfooter", {
                form: "create",
                formInstance: Me.value,
                apis: ke.value,
                type: Ut.value,
                updateModel: Dl
              })
            ]),
            _: 3
          }, 8, ["type", "configure"]))
        ])) : X.value && ke.value.AnyUpdate ? (o(), r("div", ou, [
          Nl.value ? (o(), oe(re, {
            key: 0,
            title: `Update ${qt.value}`,
            "invalid-access": Nl.value,
            "alert-class": "text-yellow-700",
            onDone: Qt
          }, null, 8, ["title", "invalid-access"])) : ee(R).editform ? K(_.$slots, "editform", {
            key: 1,
            model: X.value,
            type: ke.value.AnyUpdate.request.name,
            deleteType: Ul.value ? ke.value.Delete.request.name : null,
            configure: _.configureField,
            done: Qt,
            save: us
          }) : (o(), oe(Fe, {
            key: 2,
            ref_key: "editForm",
            ref: Re,
            modelValue: X.value,
            "onUpdate:modelValue": P[0] || (P[0] = (Pe) => X.value = Pe),
            type: ke.value.AnyUpdate.request.name,
            deleteType: Ul.value ? ke.value.Delete.request.name : null,
            configure: _.configureField,
            onDone: Qt,
            onSave: us,
            onDelete: us
          }, {
            header: Ce(() => [
              K(_.$slots, "formheader", {
                form: "edit",
                formInstance: Re.value,
                apis: ke.value,
                type: Ut.value,
                model: X.value,
                id: G.value,
                updateModel: Os
              })
            ]),
            footer: Ce(() => [
              K(_.$slots, "formfooter", {
                form: "edit",
                formInstance: Re.value,
                apis: ke.value,
                type: Ut.value,
                model: X.value,
                id: G.value,
                updateModel: Os
              })
            ]),
            _: 3
          }, 8, ["modelValue", "type", "deleteType", "configure"]))
        ])) : x("", !0),
        ee(R).toolbar ? K(_.$slots, "toolbar", { key: 2 }) : w("toolbar") ? (o(), r("div", au, [
          se.value ? (o(), oe(Il, {
            key: 0,
            columns: M.value,
            prefs: pe.value,
            onDone: P[1] || (P[1] = (Pe) => se.value = !1),
            onSave: to
          }, null, 8, ["columns", "prefs"])) : x("", !0),
          l("div", ru, [
            l("div", iu, [
              w("preferences") ? (o(), r("button", {
                key: 0,
                type: "button",
                class: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                title: `${qt.value} Preferences`,
                onClick: P[2] || (P[2] = (Pe) => se.value = !se.value)
              }, cu, 8, uu)) : x("", !0),
              w("pagingNav") ? (o(), r("button", {
                key: 1,
                type: "button",
                class: b(["pl-2", q.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "First page",
                disabled: !q.value,
                onClick: P[3] || (P[3] = (Pe) => Ge(-B.value))
              }, pu, 10, fu)) : x("", !0),
              w("pagingNav") ? (o(), r("button", {
                key: 2,
                type: "button",
                class: b(["pl-2", le.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Previous page",
                disabled: !le.value,
                onClick: P[4] || (P[4] = (Pe) => Ge(-Se.value))
              }, gu, 10, mu)) : x("", !0),
              w("pagingNav") ? (o(), r("button", {
                key: 3,
                type: "button",
                class: b(["pl-2", ye.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Next page",
                disabled: !ye.value,
                onClick: P[5] || (P[5] = (Pe) => Ge(Se.value))
              }, wu, 10, yu)) : x("", !0),
              w("pagingNav") ? (o(), r("button", {
                key: 4,
                type: "button",
                class: b(["pl-2", $e.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Last page",
                disabled: !$e.value,
                onClick: P[6] || (P[6] = (Pe) => Ge(B.value))
              }, $u, 10, ku)) : x("", !0)
            ]),
            w("pagingInfo") ? (o(), r("div", Cu, [
              l("div", xu, [
                ie.value ? (o(), r("span", Lu, "Querying...")) : x("", !0),
                ge.value.length ? (o(), r("span", Vu, [
                  Su,
                  _e(" " + j(L.value + 1) + " - " + j(Math.min(L.value + ge.value.length, B.value)) + " ", 1),
                  l("span", null, " of " + j(B.value), 1)
                ])) : N.value.completed ? (o(), r("span", Mu, "No Results")) : x("", !0)
              ])
            ])) : x("", !0),
            l("div", Au, [
              w("refresh") ? (o(), r("div", Tu, [
                l("button", {
                  type: "button",
                  onClick: so,
                  title: "Refresh",
                  class: b(Q.value)
                }, Iu, 2)
              ])) : x("", !0),
              w("downloadCsv") ? (o(), r("div", Du, [
                l("button", {
                  type: "button",
                  onClick: lo,
                  title: "Download CSV",
                  class: b(Q.value)
                }, Ou, 2)
              ])) : x("", !0),
              w("copyApiUrl") ? (o(), r("div", Pu, [
                l("button", {
                  type: "button",
                  onClick: no,
                  title: "Copy API URL",
                  class: b(Q.value)
                }, [
                  fe.value ? (o(), r("svg", Bu, Eu)) : (o(), r("svg", Hu, Nu)),
                  Uu
                ], 2)
              ])) : x("", !0),
              me.value && w("resetPreferences") ? (o(), r("div", qu, [
                l("button", {
                  type: "button",
                  onClick: oo,
                  title: "Reset Preferences & Filters",
                  class: b(Q.value)
                }, Ku, 2)
              ])) : x("", !0),
              w("filtersView") && S.value > 0 ? (o(), r("div", Zu, [
                l("button", {
                  type: "button",
                  onClick: P[7] || (P[7] = (Pe) => h.value = h.value == "filters" ? null : "filters"),
                  class: b(Q.value),
                  "aria-expanded": "false"
                }, [
                  Gu,
                  l("span", Wu, j(S.value) + " " + j(S.value == 1 ? "Filter" : "Filters"), 1),
                  h.value != "filters" ? (o(), r("svg", Ju, Yu)) : (o(), r("svg", ed, sd))
                ], 2)
              ])) : x("", !0),
              w("newItem") && ke.value.Create && uo.value ? (o(), r("div", ld, [
                l("button", {
                  type: "button",
                  onClick: ao,
                  title: qt.value,
                  class: b(Q.value)
                }, [
                  od,
                  l("span", ad, j(ro.value), 1)
                ], 10, nd)
              ])) : x("", !0),
              ee(R).toolbarbuttons ? K(_.$slots, "toolbarbuttons", {
                key: 6,
                toolbarButtonClass: Q.value
              }) : x("", !0)
            ])
          ])
        ])) : x("", !0),
        h.value == "filters" ? (o(), oe(Fl, {
          key: 4,
          class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: Rl.value,
          columns: y.value,
          onDone: P[8] || (P[8] = (Pe) => h.value = null),
          onChange: as
        }, null, 8, ["definitions", "columns"])) : x("", !0),
        E.value.error ?? N.value.error ? (o(), oe(He, {
          key: 5,
          status: E.value.error ?? N.value.error
        }, null, 8, ["status"])) : ie.value ? (o(), oe(ut, {
          key: 6,
          class: "p-2"
        })) : x("", !0),
        D.value ? (o(), r("div", rd, [
          xe(Tl, {
            definitions: Rl.value,
            column: D.value.column,
            "top-left": D.value.topLeft,
            onDone: mt,
            onSave: os
          }, null, 8, ["definitions", "column", "top-left"])
        ])) : x("", !0),
        ge.value.length ? (o(), oe(ds, {
          key: 8,
          id: _.id,
          items: ge.value,
          type: _.type,
          "selected-columns": Y.value,
          class: "mt-1",
          onFiltersChanged: lt,
          tableStyle: O.value,
          gridClass: H.value,
          grid2Class: ae.value,
          grid3Class: F.value,
          grid4Class: T.value,
          tableClass: A.value,
          theadClass: ue.value,
          theadRowClass: V.value,
          theadCellClass: z.value,
          tbodyClass: _.tbodyClass,
          rowClass: te,
          onRowSelected: it,
          rowStyle: _.rowStyle,
          headerTitle: _.headerTitle,
          headerTitles: _.headerTitles,
          visibleFrom: _.visibleFrom,
          onHeaderSelected: At
        }, al({
          header: Ce(({ column: Pe, label: ht }) => {
            var Zt;
            return [
              g("filtering") && Oe(Pe) ? (o(), r("div", id, [
                l("span", ud, j(ht), 1),
                xe(Ql, {
                  column: y.value.find((co) => co.name.toLowerCase() === Pe.toLowerCase()),
                  "is-open": ((Zt = D.value) == null ? void 0 : Zt.column.name) === Pe
                }, null, 8, ["column", "is-open"])
              ])) : (o(), r("div", dd, [
                l("span", cd, j(ht), 1)
              ]))
            ];
          }),
          _: 2
        }, [
          De(Object.keys(ee(R)), (Pe) => ({
            name: Pe,
            fn: Ce((ht) => [
              K(_.$slots, Pe, Ot(ws(ht)))
            ])
          }))
        ]), 1032, ["id", "items", "type", "selected-columns", "tableStyle", "gridClass", "grid2Class", "grid3Class", "grid4Class", "tableClass", "theadClass", "theadRowClass", "theadCellClass", "tbodyClass", "rowStyle", "headerTitle", "headerTitles", "visibleFrom"])) : x("", !0)
      ]));
    };
  }
}), vd = { class: "flex" }, pd = {
  key: 0,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, md = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), hd = [
  md
], gd = /* @__PURE__ */ l("path", {
  d: "M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6L406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z",
  fill: "currentColor"
}, null, -1), yd = /* @__PURE__ */ l("path", {
  d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",
  fill: "currentColor"
}, null, -1), bd = [
  gd,
  yd
], wd = {
  key: 2,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, kd = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M8.998 4.71L6.354 7.354a.5.5 0 1 1-.708-.707L9.115 3.18A.499.499 0 0 1 9.498 3H9.5a.5.5 0 0 1 .354.147l.01.01l3.49 3.49a.5.5 0 1 1-.707.707l-2.65-2.649V16.5a.5.5 0 0 1-1 0V4.71z",
    fill: "currentColor"
  })
], -1), _d = [
  kd
], $d = {
  key: 3,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, Cd = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M10.002 15.29l2.645-2.644a.5.5 0 0 1 .707.707L9.886 16.82a.5.5 0 0 1-.384.179h-.001a.5.5 0 0 1-.354-.147l-.01-.01l-3.49-3.49a.5.5 0 1 1 .707-.707l2.648 2.649V3.5a.5.5 0 0 1 1 0v11.79z",
    fill: "currentColor"
  })
], -1), xd = [
  Cd
], Ld = /* @__PURE__ */ ce({
  __name: "SettingsIcons",
  props: {
    column: {},
    isOpen: { type: Boolean }
  },
  setup(e) {
    return (t, s) => {
      var n, a, i, d, u, c, f;
      return o(), r("div", vd, [
        (i = (a = (n = t.column) == null ? void 0 : n.settings) == null ? void 0 : a.filters) != null && i.length ? (o(), r("svg", pd, hd)) : (o(), r("svg", {
          key: 1,
          class: b(["w-4 h-4 transition-transform", t.isOpen ? "rotate-180" : ""]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, bd, 2)),
        ((u = (d = t.column) == null ? void 0 : d.settings) == null ? void 0 : u.sort) === "ASC" ? (o(), r("svg", wd, _d)) : ((f = (c = t.column) == null ? void 0 : c.settings) == null ? void 0 : f.sort) === "DESC" ? (o(), r("svg", $d, xd)) : x("", !0)
      ]);
    };
  }
}), Vd = /* @__PURE__ */ ce({
  __name: "EnsureAccessDialog",
  props: {
    title: {},
    subtitle: {},
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    return (t, s) => {
      const n = W("EnsureAccess"), a = W("SlideOver");
      return t.invalidAccess ? (o(), oe(a, {
        key: 0,
        title: t.title,
        onDone: s[0] || (s[0] = (i) => t.$emit("done")),
        "content-class": "relative flex-1"
      }, al({
        default: Ce(() => [
          xe(n, {
            alertClass: t.alertClass,
            invalidAccess: t.invalidAccess
          }, null, 8, ["alertClass", "invalidAccess"])
        ]),
        _: 2
      }, [
        t.subtitle ? {
          name: "subtitle",
          fn: Ce(() => [
            _e(j(t.subtitle), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["title"])) : x("", !0);
    };
  }
}), Sd = ["for"], Md = { class: "mt-1 relative rounded-md shadow-sm" }, Ad = ["type", "name", "id", "placeholder", "value", "aria-invalid", "aria-describedby"], Td = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Fd = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), Id = [
  Fd
], Dd = ["id"], jd = ["id"], Od = {
  inheritAttrs: !1
}, Pd = /* @__PURE__ */ ce({
  ...Od,
  __name: "TextInput",
  props: {
    status: {},
    id: {},
    type: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {}
  },
  setup(e, { expose: t }) {
    const s = (m) => m.value, n = e;
    t({
      focus: i
    });
    const a = I();
    function i() {
      var m;
      (m = a.value) == null || m.focus();
    }
    const d = v(() => n.type || "text"), u = v(() => n.label ?? ze(ot(n.id))), c = v(() => n.placeholder ?? u.value);
    let f = Ue("ApiState", void 0);
    const p = v(() => pt.call({ responseStatus: n.status ?? (f == null ? void 0 : f.error.value) }, n.id)), $ = v(() => [nt.base, p.value ? nt.invalid : nt.valid, n.inputClass]);
    return (m, k) => (o(), r("div", {
      class: b([m.$attrs.class])
    }, [
      K(m.$slots, "header", Ae({
        inputElement: a.value,
        id: m.id,
        modelValue: m.modelValue,
        status: m.status
      }, m.$attrs)),
      u.value ? (o(), r("label", {
        key: 0,
        for: m.id,
        class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${m.labelClass ?? ""}`)
      }, j(u.value), 11, Sd)) : x("", !0),
      l("div", Md, [
        l("input", Ae({
          ref_key: "inputElement",
          ref: a,
          type: d.value,
          name: m.id,
          id: m.id,
          class: $.value,
          placeholder: c.value,
          value: m.modelValue,
          onInput: k[0] || (k[0] = (g) => m.$emit("update:modelValue", s(g.target))),
          "aria-invalid": p.value != null,
          "aria-describedby": `${m.id}-error`,
          step: "any"
        }, ee(ft)(m.$attrs, ["class"])), null, 16, Ad),
        p.value ? (o(), r("div", Td, Id)) : x("", !0)
      ]),
      p.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${m.id}-error`
      }, j(p.value), 9, Dd)) : m.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${m.id}-description`
      }, j(m.help), 9, jd)) : x("", !0),
      K(m.$slots, "footer", Ae({
        inputElement: a.value,
        id: m.id,
        modelValue: m.modelValue,
        status: m.status
      }, m.$attrs))
    ], 2));
  }
}), Bd = ["for"], Rd = { class: "mt-1 relative rounded-md shadow-sm" }, Ed = ["name", "id", "placeholder", "aria-invalid", "aria-describedby"], Hd = ["id"], zd = ["id"], Nd = {
  inheritAttrs: !1
}, Ud = /* @__PURE__ */ ce({
  ...Nd,
  __name: "TextareaInput",
  props: {
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {}
  },
  setup(e) {
    const t = (c) => c.value, s = e, n = v(() => s.label ?? ze(ot(s.id))), a = v(() => s.placeholder ?? n.value);
    let i = Ue("ApiState", void 0);
    const d = v(() => pt.call({ responseStatus: s.status ?? (i == null ? void 0 : i.error.value) }, s.id)), u = v(() => ["shadow-sm " + nt.base, d.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + nt.valid, s.inputClass]);
    return (c, f) => (o(), r("div", {
      class: b([c.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: c.id,
        class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${c.labelClass ?? ""}`)
      }, j(n.value), 11, Bd)) : x("", !0),
      l("div", Rd, [
        l("textarea", Ae({
          name: c.id,
          id: c.id,
          class: u.value,
          placeholder: a.value,
          onInput: f[0] || (f[0] = (p) => c.$emit("update:modelValue", t(p.target))),
          "aria-invalid": d.value != null,
          "aria-describedby": `${c.id}-error`
        }, ee(ft)(c.$attrs, ["class"])), j(c.modelValue), 17, Ed)
      ]),
      d.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${c.id}-error`
      }, j(d.value), 9, Hd)) : c.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${c.id}-description`
      }, j(c.help), 9, zd)) : x("", !0)
    ], 2));
  }
}), qd = ["for"], Qd = ["id", "name", "value", "aria-invalid", "aria-describedby"], Kd = ["value"], Zd = ["id"], Gd = {
  inheritAttrs: !1
}, Wd = /* @__PURE__ */ ce({
  ...Gd,
  __name: "SelectInput",
  props: {
    status: {},
    id: {},
    modelValue: {},
    inputClass: {},
    label: {},
    labelClass: {},
    options: {},
    values: {},
    entries: {}
  },
  setup(e) {
    const t = (u) => u.value, s = e, n = v(() => s.label ?? ze(ot(s.id)));
    let a = Ue("ApiState", void 0);
    const i = v(() => pt.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id)), d = v(() => s.entries || (s.values ? s.values.map((u) => ({ key: u, value: u })) : s.options ? Object.keys(s.options).map((u) => ({ key: u, value: s.options[u] })) : []));
    return (u, c) => (o(), r("div", {
      class: b([u.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: u.id,
        class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${u.labelClass ?? ""}`)
      }, j(n.value), 11, qd)) : x("", !0),
      l("select", Ae({
        id: u.id,
        name: u.id,
        class: [
          "mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md dark:text-white dark:bg-gray-900 dark:border-gray-600",
          i.value ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500",
          u.inputClass
        ],
        value: u.modelValue,
        onInput: c[0] || (c[0] = (f) => u.$emit("update:modelValue", t(f.target))),
        "aria-invalid": i.value != null,
        "aria-describedby": `${u.id}-error`
      }, ee(ft)(u.$attrs, ["class"])), [
        (o(!0), r(Ie, null, De(d.value, (f) => (o(), r("option", {
          value: f.key
        }, j(f.value), 9, Kd))), 256))
      ], 16, Qd),
      i.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${u.id}-error`
      }, j(i.value), 9, Zd)) : x("", !0)
    ], 2));
  }
}), Jd = { class: "flex items-center h-5" }, Xd = ["id", "name", "checked"], Yd = { class: "ml-3 text-sm" }, ec = ["for"], tc = {
  key: 0,
  class: "mt-2 text-sm text-red-500",
  id: "`${id}-error`"
}, sc = {
  key: 1,
  class: "mt-2 text-sm text-gray-500",
  id: "`${id}-description`"
}, lc = {
  inheritAttrs: !1
}, nc = /* @__PURE__ */ ce({
  ...lc,
  __name: "CheckboxInput",
  props: {
    modelValue: { type: Boolean },
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = v(() => s.label ?? ze(ot(s.id)));
    let a = Ue("ApiState", void 0);
    const i = v(() => pt.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id));
    return (d, u) => (o(), r("div", {
      class: b(["relative flex items-start", d.$attrs.class])
    }, [
      l("div", Jd, [
        l("input", Ae({
          id: d.id,
          name: d.id,
          type: "checkbox",
          checked: d.modelValue,
          onInput: u[0] || (u[0] = (c) => d.$emit("update:modelValue", c.target.checked)),
          class: ["focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800", d.inputClass]
        }, ee(ft)(d.$attrs, ["class"])), null, 16, Xd)
      ]),
      l("div", Yd, [
        l("label", {
          for: d.id,
          class: b(`font-medium text-gray-700 dark:text-gray-300 ${d.labelClass ?? ""}`)
        }, j(n.value), 11, ec),
        i.value ? (o(), r("p", tc, j(i.value), 1)) : d.help ? (o(), r("p", sc, j(d.help), 1)) : x("", !0)
      ])
    ], 2));
  }
}), oc = ["id"], ac = ["for"], rc = { class: "mt-1 relative rounded-md shadow-sm" }, ic = ["id", "name", "value"], uc = { class: "flex flex-wrap pb-1.5" }, dc = { class: "pt-1.5 pl-1" }, cc = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300" }, fc = ["onClick"], vc = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), pc = [
  vc
], mc = { class: "pt-1.5 pl-1 shrink" }, hc = ["type", "name", "id", "aria-invalid", "aria-describedby"], gc = ["id"], yc = ["onMouseover", "onClick"], bc = { class: "block truncate" }, wc = {
  key: 1,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, kc = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), _c = [
  kc
], $c = ["id"], Cc = ["id"], xc = {
  inheritAttrs: !1
}, Lc = /* @__PURE__ */ ce({
  ...xc,
  __name: "TagInput",
  props: {
    status: {},
    id: {},
    type: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    modelValue: { default: () => [] },
    delimiters: { default: () => [","] },
    allowableValues: {},
    string: { type: Boolean },
    maxVisibleItems: { default: 300 },
    converter: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = t;
    function a(y) {
      return s.converter ? s.converter(y) : y;
    }
    const i = v(() => Qe(a(s.modelValue), (y) => typeof y == "string" ? y.trim().length == 0 ? [] : y.split(",") : y) || []), d = I(), u = I(!1), c = v(() => {
      const y = $.value.toLowerCase();
      return !s.allowableValues || s.allowableValues.length == 0 ? [] : s.allowableValues.length < 1e3 ? s.allowableValues.filter((N) => !i.value.includes(N) && N.toLowerCase().includes(y)) : s.allowableValues.filter((N) => !i.value.includes(N) && N.startsWith(y));
    });
    function f(y) {
      d.value = y;
    }
    const p = I(null), $ = I(""), m = v(() => s.type || "text"), k = v(() => s.label ?? ze(ot(s.id)));
    let g = Ue("ApiState", void 0);
    const w = v(() => pt.call({ responseStatus: s.status ?? (g == null ? void 0 : g.error.value) }, s.id)), O = v(() => [
      "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
      w.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
      s.inputClass
    ]), H = (y) => V(i.value.filter((N) => N != y));
    function ae(y) {
      var N;
      document.activeElement === y.target && ((N = p.value) == null || N.focus());
    }
    const F = I();
    function T() {
      u.value = !0, F.value = !0;
    }
    function A() {
      T();
    }
    function ue() {
      U(Q()), F.value = !1, setTimeout(() => {
        F.value || (u.value = !1);
      }, 200);
    }
    function V(y) {
      const N = s.string ? y.join(",") : y;
      n("update:modelValue", N);
    }
    function z(y) {
      if (y.key == "Backspace" && $.value.length == 0 && i.value.length > 0 && H(i.value[i.value.length - 1]), !(!s.allowableValues || s.allowableValues.length == 0))
        if (y.code == "Escape" || y.code == "Tab")
          u.value = !1;
        else if (y.code == "Home")
          d.value = c.value[0], Z();
        else if (y.code == "End")
          d.value = c.value[c.value.length - 1], Z();
        else if (y.code == "ArrowDown") {
          if (u.value = !0, !d.value)
            d.value = c.value[0];
          else {
            const N = c.value.indexOf(d.value);
            d.value = N + 1 < c.value.length ? c.value[N + 1] : c.value[0];
          }
          J();
        } else if (y.code == "ArrowUp") {
          if (!d.value)
            d.value = c.value[c.value.length - 1];
          else {
            const N = c.value.indexOf(d.value);
            d.value = N - 1 >= 0 ? c.value[N - 1] : c.value[c.value.length - 1];
          }
          J();
        } else
          y.code == "Enter" ? d.value && u.value ? (U(d.value), y.preventDefault()) : u.value = !1 : u.value = c.value.length > 0;
    }
    function Q() {
      if ($.value.length == 0)
        return "";
      let y = Fo($.value.trim(), ",");
      return y[0] == "," && (y = y.substring(1)), y = y.trim(), y.length == 0 && u.value && c.value.length > 0 ? d.value : y;
    }
    function te(y) {
      const N = Q();
      if (N.length > 0) {
        const E = s.delimiters.some((C) => C == y.key);
        if (E && y.preventDefault(), y.key == "Enter" || y.key == "NumpadEnter" || y.key.length == 1 && E) {
          U(N);
          return;
        }
      }
    }
    const R = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function Z() {
      setTimeout(() => {
        let y = ks(`#${s.id}-tag li.active`);
        y && y.scrollIntoView(R);
      }, 0);
    }
    function J() {
      setTimeout(() => {
        let y = ks(`#${s.id}-tag li.active`);
        y && ("scrollIntoViewIfNeeded" in y ? y.scrollIntoViewIfNeeded(R) : y.scrollIntoView(R));
      }, 0);
    }
    function U(y) {
      if (y.length === 0)
        return;
      const N = Array.from(i.value);
      N.indexOf(y) == -1 && N.push(y), V(N), $.value = "", u.value = !1;
    }
    function M(y) {
      var E;
      const N = (E = y.clipboardData) == null ? void 0 : E.getData("Text");
      Y(N);
    }
    function Y(y) {
      if (!y)
        return;
      const N = new RegExp(`\\n|\\t|${s.delimiters.join("|")}`), E = Array.from(i.value);
      y.split(N).map((C) => C.trim()).forEach((C) => {
        E.indexOf(C) == -1 && E.push(C);
      }), V(E), $.value = "";
    }
    return (y, N) => (o(), r("div", {
      class: b([y.$attrs.class]),
      id: `${y.id}-tag`,
      onmousemove: "cancelBlur=true"
    }, [
      k.value ? (o(), r("label", {
        key: 0,
        for: y.id,
        class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${y.labelClass ?? ""}`)
      }, j(k.value), 11, ac)) : x("", !0),
      l("div", rc, [
        l("input", {
          type: "hidden",
          id: y.id,
          name: y.id,
          value: i.value.join(",")
        }, null, 8, ic),
        l("button", {
          class: b(O.value),
          onClick: qe(ae, ["prevent"]),
          onFocus: N[2] || (N[2] = (E) => u.value = !0),
          tabindex: "-1"
        }, [
          l("div", uc, [
            (o(!0), r(Ie, null, De(i.value, (E) => (o(), r("div", dc, [
              l("span", cc, [
                _e(j(E) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (h) => H(E),
                  class: "flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black"
                }, pc, 8, fc)
              ])
            ]))), 256)),
            l("div", mc, [
              $t(l("input", Ae({
                ref_key: "txtInput",
                ref: p,
                type: m.value,
                role: "combobox",
                "aria-controls": "options",
                "aria-expanded": "false",
                autocomplete: "off",
                spellcheck: "false",
                name: `${y.id}-txt`,
                id: `${y.id}-txt`,
                class: "p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none",
                style: `box-shadow:none !important;width:${$.value.length + 1}ch`,
                "onUpdate:modelValue": N[0] || (N[0] = (E) => $.value = E),
                "aria-invalid": w.value != null,
                "aria-describedby": `${y.id}-error`,
                onKeydown: z,
                onKeypress: te,
                onPaste: qe(M, ["prevent", "stop"]),
                onFocus: A,
                onBlur: ue,
                onClick: N[1] || (N[1] = (E) => u.value = !0)
              }, ee(ft)(y.$attrs, ["class", "required"])), null, 16, hc), [
                [ho, $.value]
              ])
            ])
          ])
        ], 34),
        u.value && c.value.length ? (o(), r("ul", {
          key: 0,
          class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: z,
          id: `${y.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Ie, null, De(c.value.slice(0, y.maxVisibleItems), (E) => (o(), r("li", {
            class: b([E === d.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (h) => f(E),
            onClick: (h) => U(E),
            role: "option",
            tabindex: "-1"
          }, [
            l("span", bc, j(E), 1)
          ], 42, yc))), 256))
        ], 40, gc)) : x("", !0),
        w.value ? (o(), r("div", wc, _c)) : x("", !0)
      ]),
      w.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${y.id}-error`
      }, j(w.value), 9, $c)) : y.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${y.id}-description`
      }, j(y.help), 9, Cc)) : x("", !0)
    ], 10, oc));
  }
}), Vc = { class: "relative flex-grow mr-2 sm:mr-4" }, Sc = ["for"], Mc = { class: "block mt-2" }, Ac = { class: "sr-only" }, Tc = ["multiple", "name", "id", "placeholder", "aria-invalid", "aria-describedby"], Fc = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Ic = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), Dc = [
  Ic
], jc = ["id"], Oc = ["id"], Pc = { key: 0 }, Bc = ["title"], Rc = ["alt", "src"], Ec = {
  key: 1,
  class: "mt-3"
}, Hc = { class: "w-full" }, zc = { class: "pr-6 align-bottom pb-2" }, Nc = ["title"], Uc = ["src", "onError"], qc = ["href"], Qc = {
  key: 1,
  class: "overflow-hidden"
}, Kc = { class: "align-top pb-2 whitespace-nowrap" }, Zc = {
  key: 0,
  class: "text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black"
}, Gc = /* @__PURE__ */ ce({
  __name: "FileInput",
  props: {
    multiple: { type: Boolean },
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {},
    values: {},
    files: {}
  },
  setup(e) {
    var T;
    const t = e, s = I(null), { assetsPathResolver: n, fallbackPathResolver: a } = Mt(), i = {}, d = I(), u = I(((T = t.files) == null ? void 0 : T.map(c)) || []);
    function c(A) {
      return A.filePath = n(A.filePath), A;
    }
    t.values && t.values.length > 0 && (u.value = t.values.map((A) => {
      let ue = A.replace(/\\/g, "/");
      return { fileName: an(Ct(ue, "/"), "."), filePath: ue, contentType: Xs(ue) };
    }).map(c));
    const f = v(() => t.label ?? ze(ot(t.id))), p = v(() => t.placeholder ?? f.value);
    let $ = Ue("ApiState", void 0);
    const m = v(() => pt.call({ responseStatus: t.status ?? ($ == null ? void 0 : $.error.value) }, t.id)), k = v(() => [
      "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
      m.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
      t.inputClass
    ]), g = (A) => {
      let ue = A.target;
      d.value = "", u.value = Array.from(ue.files || []).map((V) => ({
        fileName: V.name,
        filePath: vl(V),
        contentLength: V.size,
        contentType: V.type || Xs(V.name)
      }));
    }, w = () => {
      var A;
      return (A = s.value) == null ? void 0 : A.click();
    }, O = (A) => A == null ? !1 : A.startsWith("data:") || A.startsWith("blob:"), H = v(() => {
      if (u.value.length > 0)
        return u.value[0].filePath;
      let A = typeof t.modelValue == "string" ? t.modelValue : t.values && t.values[0];
      return A && bt(n(A)) || null;
    }), ae = (A) => !A || A.startsWith("data:") || A.endsWith(".svg") ? "" : "rounded-full object-cover";
    function F(A) {
      d.value = a(H.value);
    }
    return Ht(kn), (A, ue) => (o(), r("div", {
      class: b(["flex", A.multiple ? "flex-col" : "justify-between"])
    }, [
      l("div", Vc, [
        f.value ? (o(), r("label", {
          key: 0,
          for: A.id,
          class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${A.labelClass ?? ""}`)
        }, j(f.value), 11, Sc)) : x("", !0),
        l("div", Mc, [
          l("span", Ac, j(A.help ?? f.value), 1),
          l("input", Ae({
            ref_key: "input",
            ref: s,
            type: "file",
            multiple: A.multiple,
            name: A.id,
            id: A.id,
            class: k.value,
            placeholder: p.value,
            "aria-invalid": m.value != null,
            "aria-describedby": `${A.id}-error`
          }, A.$attrs, { onChange: g }), null, 16, Tc),
          m.value ? (o(), r("div", Fc, Dc)) : x("", !0)
        ]),
        m.value ? (o(), r("p", {
          key: 1,
          class: "mt-2 text-sm text-red-500",
          id: `${A.id}-error`
        }, j(m.value), 9, jc)) : A.help ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-gray-500",
          id: `${A.id}-description`
        }, j(A.help), 9, Oc)) : x("", !0)
      ]),
      A.multiple ? (o(), r("div", Ec, [
        l("table", Hc, [
          (o(!0), r(Ie, null, De(u.value, (V) => (o(), r("tr", null, [
            l("td", zc, [
              l("div", {
                class: "flex w-full",
                title: O(V.filePath) ? "" : V.filePath
              }, [
                l("img", {
                  src: i[ee(bt)(V.filePath)] || ee(n)(ee(bt)(V.filePath)),
                  class: b(["mr-2 h-8 w-8", ae(V.filePath)]),
                  onError: (z) => i[ee(bt)(V.filePath)] = ee(a)(ee(bt)(V.filePath))
                }, null, 42, Uc),
                O(V.filePath) ? (o(), r("span", Qc, j(V.fileName), 1)) : (o(), r("a", {
                  key: 0,
                  href: ee(n)(V.filePath || ""),
                  target: "_blank",
                  class: "overflow-hidden"
                }, j(V.fileName), 9, qc))
              ], 8, Nc)
            ]),
            l("td", Kc, [
              V.contentLength && V.contentLength > 0 ? (o(), r("span", Zc, j(ee(ml)(V.contentLength)), 1)) : x("", !0)
            ])
          ]))), 256))
        ])
      ])) : (o(), r("div", Pc, [
        H.value ? (o(), r("div", {
          key: 0,
          class: "shrink-0 cursor-pointer",
          title: O(H.value) ? "" : H.value
        }, [
          l("img", {
            onClick: w,
            class: b(["h-16 w-16", ae(H.value)]),
            alt: `Current ${f.value ?? ""}`,
            src: d.value || ee(n)(H.value),
            onError: F
          }, null, 42, Rc)
        ], 8, Bc)) : x("", !0)
      ]))
    ], 2));
  }
}), Wc = ["id"], Jc = ["for"], Xc = { class: "relative mt-1" }, Yc = ["id", "placeholder"], e0 = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-gray-400 dark:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z",
    "clip-rule": "evenodd"
  })
], -1), t0 = [
  e0
], s0 = ["id"], l0 = ["onMouseover", "onClick"], n0 = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
    "clip-rule": "evenodd"
  })
], -1), o0 = [
  n0
], a0 = {
  key: 2,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
  tabindex: "-1"
}, r0 = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), i0 = [
  r0
], u0 = ["id"], d0 = ["id"], c0 = /* @__PURE__ */ ce({
  __name: "Autocomplete",
  props: {
    status: {},
    id: {},
    type: {},
    label: {},
    help: {},
    placeholder: {},
    multiple: { type: Boolean, default: !1 },
    required: { type: Boolean },
    options: { default: () => [] },
    modelValue: {},
    match: {},
    viewCount: { default: 100 },
    pageSize: { default: 8 }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = I(!1), a = e, i = s;
    t({ toggle: R });
    function d(M) {
      return Array.isArray(a.modelValue) && a.modelValue.indexOf(M) >= 0;
    }
    const u = v(() => a.label ?? ze(ot(a.id)));
    let c = Ue("ApiState", void 0);
    const f = v(() => pt.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, a.id)), p = v(() => [nt.base, f.value ? nt.invalid : nt.valid]), $ = I(null), m = I(""), k = I(null), g = I(a.viewCount), w = I([]), O = v(() => m.value ? a.options.filter((Y) => a.match(Y, m.value)).slice(0, g.value) : a.options), H = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"];
    function ae(M) {
      k.value = M, w.value.indexOf(M) > Math.floor(g.value * 0.9) && (g.value += a.viewCount, U());
    }
    const F = [",", `
`, "	"];
    function T(M) {
      var y;
      const Y = (y = M.clipboardData) == null ? void 0 : y.getData("Text");
      A(Y);
    }
    function A(M) {
      if (!M)
        return;
      const Y = F.some((y) => M.includes(y));
      if (!a.multiple || !Y) {
        const y = a.options.filter((N) => a.match(N, M));
        y.length == 1 && (J(y[0]), n.value = !1, ms());
      } else if (Y) {
        const y = new RegExp("\\r|\\n|\\t|,"), E = M.split(y).filter((h) => h.trim()).map((h) => a.options.find((C) => a.match(C, h))).filter((h) => !!h);
        if (E.length > 0) {
          m.value = "", n.value = !1, k.value = null;
          let h = Array.from(a.modelValue || []);
          E.forEach((C) => {
            d(C) ? h = h.filter((G) => G != C) : h.push(C);
          }), i("update:modelValue", h), ms();
        }
      }
    }
    function ue(M) {
      H.indexOf(M.code) || Z();
    }
    function V(M) {
      if (!(M.shiftKey || M.ctrlKey || M.altKey)) {
        if (!n.value) {
          M.code == "ArrowDown" && (n.value = !0, k.value = w.value[0]);
          return;
        }
        if (M.code == "Escape")
          n.value && (M.stopPropagation(), n.value = !1);
        else if (M.code == "Tab")
          n.value = !1;
        else if (M.code == "Home")
          k.value = w.value[0], Q();
        else if (M.code == "End")
          k.value = w.value[w.value.length - 1], Q();
        else if (M.code == "ArrowDown") {
          if (!k.value)
            k.value = w.value[0];
          else {
            const Y = w.value.indexOf(k.value);
            k.value = Y + 1 < w.value.length ? w.value[Y + 1] : w.value[0];
          }
          te();
        } else if (M.code == "ArrowUp") {
          if (!k.value)
            k.value = w.value[w.value.length - 1];
          else {
            const Y = w.value.indexOf(k.value);
            k.value = Y - 1 >= 0 ? w.value[Y - 1] : w.value[w.value.length - 1];
          }
          te();
        } else
          M.code == "Enter" && (k.value ? (J(k.value), a.multiple || (M.preventDefault(), ms())) : n.value = !1);
      }
    }
    const z = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function Q() {
      setTimeout(() => {
        let M = ks(`#${a.id}-autocomplete li.active`);
        M && M.scrollIntoView(z);
      }, 0);
    }
    function te() {
      setTimeout(() => {
        let M = ks(`#${a.id}-autocomplete li.active`);
        M && ("scrollIntoViewIfNeeded" in M ? M.scrollIntoViewIfNeeded(z) : M.scrollIntoView(z));
      }, 0);
    }
    function R(M) {
      var Y;
      n.value = M, M && (Z(), (Y = $.value) == null || Y.focus());
    }
    function Z() {
      n.value = !0, U();
    }
    function J(M) {
      if (m.value = "", n.value = !1, a.multiple) {
        let Y = Array.from(a.modelValue || []);
        d(M) ? Y = Y.filter((y) => y != M) : Y.push(M), k.value = null, i("update:modelValue", Y);
      } else {
        let Y = M;
        a.modelValue == M && (Y = null), i("update:modelValue", Y);
      }
    }
    function U() {
      w.value = O.value;
    }
    return Vt(m, U), (M, Y) => (o(), r("div", {
      id: `${M.id}-autocomplete`
    }, [
      u.value ? (o(), r("label", {
        key: 0,
        for: `${M.id}-text`,
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
      }, j(u.value), 9, Jc)) : x("", !0),
      l("div", Xc, [
        $t(l("input", Ae({
          ref_key: "txtInput",
          ref: $,
          id: `${M.id}-text`,
          type: "text",
          role: "combobox",
          "aria-controls": "options",
          "aria-expanded": "false",
          autocomplete: "off",
          spellcheck: "false",
          "onUpdate:modelValue": Y[0] || (Y[0] = (y) => m.value = y),
          class: p.value,
          placeholder: M.multiple || !M.modelValue ? M.placeholder : "",
          onFocus: Z,
          onKeydown: V,
          onKeyup: ue,
          onClick: Z,
          onPaste: T,
          required: !1
        }, M.$attrs), null, 16, Yc), [
          [go, m.value]
        ]),
        l("button", {
          type: "button",
          onClick: Y[1] || (Y[1] = (y) => R(!n.value)),
          class: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
          tabindex: "-1"
        }, t0),
        n.value ? (o(), r("ul", {
          key: 0,
          class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: V,
          id: `${M.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Ie, null, De(w.value, (y) => (o(), r("li", {
            class: b([y === k.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (N) => ae(y),
            onClick: (N) => J(y),
            role: "option",
            tabindex: "-1"
          }, [
            K(M.$slots, "item", Ot(ws(y))),
            d(y) ? (o(), r("span", {
              key: 0,
              class: b(["absolute inset-y-0 right-0 flex items-center pr-4", y === k.value ? "text-white" : "text-indigo-600"])
            }, o0, 2)) : x("", !0)
          ], 42, l0))), 256))
        ], 40, s0)) : !M.multiple && M.modelValue ? (o(), r("div", {
          key: 1,
          onKeydown: V,
          onClick: Y[2] || (Y[2] = (y) => R(!n.value)),
          class: "h-8 -mt-8 ml-3 pt-0.5"
        }, [
          K(M.$slots, "item", Ot(ws(M.modelValue)))
        ], 32)) : x("", !0),
        f.value ? (o(), r("div", a0, i0)) : x("", !0)
      ]),
      f.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${M.id}-error`
      }, j(f.value), 9, u0)) : M.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${M.id}-description`
      }, j(M.help), 9, d0)) : x("", !0)
    ], 8, Wc));
  }
}), f0 = ["id", "name", "value"], v0 = { class: "block truncate" }, p0 = /* @__PURE__ */ ce({
  __name: "Combobox",
  props: {
    id: {},
    modelValue: {},
    multiple: { type: Boolean },
    options: {},
    values: {},
    entries: {}
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = e;
    t({
      toggle(k) {
        var g;
        (g = u.value) == null || g.toggle(k);
      }
    });
    const a = s;
    function i(k) {
      a("update:modelValue", k);
    }
    const d = v(() => n.multiple != null ? n.multiple : Array.isArray(n.modelValue)), u = I();
    function c(k, g) {
      return !g || k.value.toLowerCase().includes(g.toLowerCase());
    }
    const f = v(() => n.entries || (n.values ? n.values.map((k) => ({ key: k, value: k })) : n.options ? Object.keys(n.options).map((k) => ({ key: k, value: n.options[k] })) : [])), p = I(d.value ? [] : null);
    function $() {
      let k = n.modelValue && typeof n.modelValue == "object" ? n.modelValue.key : n.modelValue;
      k == null || k === "" ? p.value = d.value ? [] : null : typeof k == "string" ? p.value = f.value.find((g) => g.key === k) || null : Array.isArray(k) && (p.value = f.value.filter((g) => k.includes(g.key)));
    }
    st($);
    const m = v(() => p.value == null ? "" : Array.isArray(p.value) ? p.value.map((k) => encodeURIComponent(k.key)).join(",") : p.value.key);
    return (k, g) => {
      const w = W("Autocomplete");
      return o(), r(Ie, null, [
        l("input", {
          type: "hidden",
          id: k.id,
          name: k.id,
          value: m.value
        }, null, 8, f0),
        xe(w, Ae({
          ref_key: "input",
          ref: u,
          id: k.id,
          options: f.value,
          match: c,
          multiple: d.value
        }, k.$attrs, {
          modelValue: p.value,
          "onUpdate:modelValue": [
            g[0] || (g[0] = (O) => p.value = O),
            i
          ]
        }), {
          item: Ce(({ key: O, value: H }) => [
            l("span", v0, j(H), 1)
          ]),
          _: 1
        }, 16, ["id", "options", "multiple", "modelValue"])
      ], 64);
    };
  }
}), m0 = /* @__PURE__ */ ce({
  __name: "DynamicInput",
  props: {
    input: {},
    modelValue: {},
    api: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = v(() => s.input.type || "text"), i = "ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name".split(","), d = v(() => ft(s.input, i)), u = I(Qe(
      s.modelValue[s.input.id],
      (f) => s.input.type === "file" ? null : s.input.type === "date" && f instanceof Date ? Vs(f) : s.input.type === "time" ? cn(f) : f
    ));
    Vt(u, () => {
      s.modelValue[s.input.id] = u.value, n("update:modelValue", s.modelValue);
    });
    const c = v(() => {
      const f = s.modelValue[s.input.id];
      if (s.input.type !== "file" || !f)
        return [];
      if (typeof f == "string")
        return [{ filePath: f, fileName: Ct(f, "/") }];
      if (!Array.isArray(f) && typeof f == "object")
        return f;
      if (Array.isArray(f)) {
        const p = [];
        return f.forEach(($) => {
          typeof $ == "string" ? p.push({ filePath: $, fileName: Ct($, "/") }) : typeof $ == "object" && p.push($);
        }), p;
      }
    });
    return (f, p) => {
      var F, T, A, ue, V, z, Q, te, R, Z, J, U, M, Y, y, N, E, h, C, G, X, se, D, L, fe, pe, ie, me;
      const $ = W("SelectInput"), m = W("CheckboxInput"), k = W("TagInput"), g = W("Combobox"), w = W("FileInput"), O = W("TextareaInput"), H = W("MarkdownInput"), ae = W("TextInput");
      return ee(ne).component(a.value) ? (o(), oe(nn(ee(ne).component(a.value)), Ae({
        key: 0,
        id: f.input.id,
        modelValue: u.value,
        "onUpdate:modelValue": p[0] || (p[0] = (S) => u.value = S),
        status: (F = f.api) == null ? void 0 : F.error,
        "input-class": (T = f.input.css) == null ? void 0 : T.input,
        "label-class": (A = f.input.css) == null ? void 0 : A.label
      }, d.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "select" ? (o(), oe($, Ae({
        key: 1,
        id: f.input.id,
        modelValue: u.value,
        "onUpdate:modelValue": p[1] || (p[1] = (S) => u.value = S),
        status: (ue = f.api) == null ? void 0 : ue.error,
        "input-class": (V = f.input.css) == null ? void 0 : V.input,
        "label-class": (z = f.input.css) == null ? void 0 : z.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, d.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "checkbox" ? (o(), oe(m, Ae({
        key: 2,
        id: f.input.id,
        modelValue: u.value,
        "onUpdate:modelValue": p[2] || (p[2] = (S) => u.value = S),
        status: (Q = f.api) == null ? void 0 : Q.error,
        "input-class": (te = f.input.css) == null ? void 0 : te.input,
        "label-class": (R = f.input.css) == null ? void 0 : R.label
      }, d.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "tag" ? (o(), oe(k, Ae({
        key: 3,
        id: f.input.id,
        modelValue: u.value,
        "onUpdate:modelValue": p[3] || (p[3] = (S) => u.value = S),
        status: (Z = f.api) == null ? void 0 : Z.error,
        "input-class": (J = f.input.css) == null ? void 0 : J.input,
        "label-class": (U = f.input.css) == null ? void 0 : U.label,
        allowableValues: f.input.allowableValues,
        string: ((M = f.input.prop) == null ? void 0 : M.type) == "String"
      }, d.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "allowableValues", "string"])) : a.value == "combobox" ? (o(), oe(g, Ae({
        key: 4,
        id: f.input.id,
        modelValue: u.value,
        "onUpdate:modelValue": p[4] || (p[4] = (S) => u.value = S),
        status: (Y = f.api) == null ? void 0 : Y.error,
        "input-class": (y = f.input.css) == null ? void 0 : y.input,
        "label-class": (N = f.input.css) == null ? void 0 : N.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, d.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "file" ? (o(), oe(w, Ae({
        key: 5,
        id: f.input.id,
        status: (E = f.api) == null ? void 0 : E.error,
        modelValue: u.value,
        "onUpdate:modelValue": p[5] || (p[5] = (S) => u.value = S),
        "input-class": (h = f.input.css) == null ? void 0 : h.input,
        "label-class": (C = f.input.css) == null ? void 0 : C.label,
        files: c.value
      }, d.value), null, 16, ["id", "status", "modelValue", "input-class", "label-class", "files"])) : a.value == "textarea" ? (o(), oe(O, Ae({
        key: 6,
        id: f.input.id,
        modelValue: u.value,
        "onUpdate:modelValue": p[6] || (p[6] = (S) => u.value = S),
        status: (G = f.api) == null ? void 0 : G.error,
        "input-class": (X = f.input.css) == null ? void 0 : X.input,
        "label-class": (se = f.input.css) == null ? void 0 : se.label
      }, d.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "MarkdownInput" ? (o(), oe(H, Ae({
        key: 7,
        id: f.input.id,
        modelValue: u.value,
        "onUpdate:modelValue": p[7] || (p[7] = (S) => u.value = S),
        status: (D = f.api) == null ? void 0 : D.error,
        "input-class": (L = f.input.css) == null ? void 0 : L.input,
        "label-class": (fe = f.input.css) == null ? void 0 : fe.label
      }, d.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : (o(), oe(ae, Ae({
        key: 8,
        type: a.value,
        id: f.input.id,
        modelValue: u.value,
        "onUpdate:modelValue": p[8] || (p[8] = (S) => u.value = S),
        status: (pe = f.api) == null ? void 0 : pe.error,
        "input-class": (ie = f.input.css) == null ? void 0 : ie.input,
        "label-class": (me = f.input.css) == null ? void 0 : me.label
      }, d.value), null, 16, ["type", "id", "modelValue", "status", "input-class", "label-class"]));
    };
  }
}), h0 = { class: "lookup-field" }, g0 = ["name", "value"], y0 = {
  key: 0,
  class: "flex justify-between"
}, b0 = ["for"], w0 = {
  key: 0,
  class: "flex items-center"
}, k0 = { class: "text-sm text-gray-500 dark:text-gray-400 pr-1" }, _0 = /* @__PURE__ */ l("span", { class: "sr-only" }, "Clear", -1), $0 = /* @__PURE__ */ l("svg", {
  class: "h-4 w-4",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), C0 = [
  _0,
  $0
], x0 = {
  key: 1,
  class: "mt-1 relative"
}, L0 = { class: "w-full inline-flex truncate" }, V0 = { class: "text-blue-700 dark:text-blue-300 flex cursor-pointer" }, S0 = /* @__PURE__ */ l("span", { class: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-gray-400 dark:text-gray-500",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ l("path", {
      "fill-rule": "evenodd",
      d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
      "clip-rule": "evenodd"
    })
  ])
], -1), M0 = ["id"], A0 = ["id"], T0 = /* @__PURE__ */ ce({
  __name: "LookupInput",
  props: {
    id: {},
    status: {},
    input: {},
    metadataType: {},
    modelValue: {},
    label: {},
    labelClass: {},
    help: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const { config: s } = Mt(), { metadataApi: n } = rt(), a = e, i = t, d = v(() => a.id || a.input.id), u = v(() => a.label ?? ze(ot(d.value)));
    let c = Ue("ApiState", void 0);
    const f = Ue("client"), p = v(() => pt.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, d.value)), $ = I(""), m = I(""), k = v(() => we(a.modelValue, d.value)), g = v(() => tt(a.metadataType).find((F) => F.name.toLowerCase() == d.value.toLowerCase())), w = v(() => {
      var F, T, A;
      return ((A = at((T = (F = g.value) == null ? void 0 : F.ref) == null ? void 0 : T.model)) == null ? void 0 : A.icon) || s.value.tableIcon;
    });
    let O;
    function H(F) {
      if (F) {
        if (O == null) {
          console.warn("No ModalProvider required by LookupInput");
          return;
        }
        O.openModal({ name: "ModalLookup", ref: F }, (T) => {
          if (console.debug("openModal", $.value, " -> ", T, It.setRefValue(F, T), F), T) {
            const A = we(T, F.refId);
            $.value = It.setRefValue(F, T) || A;
            const ue = ee(a.modelValue);
            ue[d.value] = A, i("update:modelValue", ue);
          }
        });
      }
    }
    function ae() {
      a.modelValue[d.value] = null, $.value = "";
    }
    return st(async () => {
      var Q, te;
      O = Ue("ModalProvider", void 0);
      const F = a.modelValue;
      a.modelValue[d.value] || (a.modelValue[d.value] = null);
      const T = g.value, A = T == null ? void 0 : T.ref;
      if (!A) {
        console.warn(`No RefInfo for property '${d.value}'`);
        return;
      }
      $.value = "";
      let ue = A.selfId == null ? we(F, T.name) : we(F, A.selfId);
      if (Jt(ue) && (ue = we(F, A.refId)), ue == null)
        return;
      if (((Q = n.value) == null ? void 0 : Q.operations.find((R) => {
        var Z;
        return ((Z = R.dataModel) == null ? void 0 : Z.name) == A.model;
      })) != null) {
        const R = we(F, T.name);
        if (Jt(R))
          return;
        if ($.value = `${R}`, m.value = T.name, A.refLabel != null) {
          const Z = tt(a.metadataType).find((U) => U.type == A.model);
          Z == null && console.warn(`Could not find ${A.model} Property on ${a.metadataType.name}`);
          const J = Z != null ? we(F, Z.name) : null;
          if (J != null) {
            let U = we(J, A.refLabel);
            U && ($.value = `${U}`, It.setValue(A.model, ue, A.refLabel, U));
          } else {
            const U = ((te = T.attributes) == null ? void 0 : te.some((Y) => Y.name == "Computed")) == !0;
            let M = await It.getOrFetchValue(f, n.value, A.model, A.refId, A.refLabel, U, ue);
            $.value = M || `${A.model}: ${$.value}`;
          }
        }
      }
    }), (F, T) => {
      var ue;
      const A = W("Icon");
      return o(), r("div", h0, [
        l("input", {
          type: "hidden",
          name: d.value,
          value: k.value
        }, null, 8, g0),
        u.value ? (o(), r("div", y0, [
          l("label", {
            for: d.value,
            class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${F.labelClass ?? ""}`)
          }, j(u.value), 11, b0),
          k.value ? (o(), r("div", w0, [
            l("span", k0, j(k.value), 1),
            l("button", {
              onClick: ae,
              type: "button",
              title: "clear",
              class: "mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
            }, C0)
          ])) : x("", !0)
        ])) : x("", !0),
        (ue = g.value) != null && ue.ref ? (o(), r("div", x0, [
          l("button", {
            type: "button",
            class: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            onClick: T[0] || (T[0] = (V) => H(g.value.ref)),
            "aria-haspopup": "listbox",
            "aria-expanded": "true",
            "aria-labelledby": "listbox-label"
          }, [
            l("span", L0, [
              l("span", V0, [
                xe(A, {
                  class: "mr-1 w-5 h-5",
                  image: w.value
                }, null, 8, ["image"]),
                l("span", null, j($.value), 1)
              ])
            ]),
            S0
          ])
        ])) : x("", !0),
        p.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${d.value}-error`
        }, j(p.value), 9, M0)) : F.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${d.value}-description`
        }, j(F.help), 9, A0)) : x("", !0)
      ]);
    };
  }
}), F0 = /* @__PURE__ */ ce({
  __name: "AutoFormFields",
  props: {
    modelValue: {},
    type: {},
    metaType: {},
    api: {},
    formLayout: {},
    configureField: {},
    configureFormLayout: {},
    hideSummary: { type: Boolean },
    flexClass: { default: "flex flex-1 flex-col justify-between" },
    divideClass: { default: "divide-y divide-gray-200 px-4 sm:px-6" },
    spaceClass: { default: "space-y-6 pt-6 pb-5" },
    fieldsetClass: { default: "grid grid-cols-12 gap-6" }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s;
    t({ forceUpdate: i, props: n, updateValue: u });
    function i() {
      var T;
      const F = Be();
      (T = F == null ? void 0 : F.proxy) == null || T.$forceUpdate();
    }
    function d(F, T) {
      u(F.id, we(T, F.id));
    }
    function u(F, T) {
      n.modelValue[F] = T, a("update:modelValue", n.modelValue), i();
    }
    const { metadataApi: c, apiOf: f, typeOf: p, typeOfRef: $, createFormLayout: m, Crud: k } = rt(), g = v(() => n.type || zt(n.modelValue)), w = v(() => n.metaType ?? p(g.value)), O = v(() => {
      var F, T;
      return $((T = (F = c.value) == null ? void 0 : F.operations.find((A) => A.request.name == g.value)) == null ? void 0 : T.dataModel) || w.value;
    }), H = v(() => {
      const F = w.value;
      if (!F) {
        if (n.formLayout) {
          const Q = n.formLayout.map((te) => {
            const R = { name: te.id, type: Va(te.type) }, Z = Object.assign({ prop: R }, te);
            return n.configureField && n.configureField(Z), Z;
          });
          return n.configureFormLayout && n.configureFormLayout(Q), Q;
        }
        throw new Error(`MetadataType for ${g.value} not found`);
      }
      const T = tt(F), A = O.value, ue = n.formLayout ? n.formLayout : m(F), V = [], z = f(F.name);
      return ue.forEach((Q) => {
        var J;
        const te = T.find((U) => U.name == Q.name);
        if (Q.ignore)
          return;
        const R = ((J = A == null ? void 0 : A.properties) == null ? void 0 : J.find((U) => {
          var M;
          return U.name.toLowerCase() == ((M = Q.name) == null ? void 0 : M.toLowerCase());
        })) ?? te, Z = Object.assign({ prop: R, op: z }, Q);
        n.configureField && n.configureField(Z), V.push(Z);
      }), n.configureFormLayout && n.configureFormLayout(V), V;
    }), ae = v(() => H.value.filter((F) => F.type != "hidden").map((F) => F.id));
    return (F, T) => {
      var z;
      const A = W("ErrorSummary"), ue = W("LookupInput"), V = W("DynamicInput");
      return o(), r(Ie, null, [
        F.hideSummary ? x("", !0) : (o(), oe(A, {
          key: 0,
          status: (z = F.api) == null ? void 0 : z.error,
          except: ae.value
        }, null, 8, ["status", "except"])),
        l("div", {
          class: b(F.flexClass)
        }, [
          l("div", {
            class: b(F.divideClass)
          }, [
            l("div", {
              class: b(F.spaceClass)
            }, [
              l("fieldset", {
                class: b(F.fieldsetClass)
              }, [
                (o(!0), r(Ie, null, De(H.value, (Q) => {
                  var te, R, Z;
                  return o(), r("div", {
                    key: Q.id,
                    class: b([
                      "w-full",
                      ((te = Q.css) == null ? void 0 : te.field) ?? (Q.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (Q.type == "checkbox" ? " flex items-center" : "")),
                      Q.type == "hidden" ? "hidden" : ""
                    ])
                  }, [
                    ((R = Q.prop) == null ? void 0 : R.ref) != null && Q.type != "file" && !Q.prop.isPrimaryKey ? (o(), oe(ue, {
                      key: 0,
                      metadataType: O.value,
                      input: Q,
                      modelValue: F.modelValue,
                      "onUpdate:modelValue": (J) => d(Q, J),
                      status: (Z = F.api) == null ? void 0 : Z.error
                    }, null, 8, ["metadataType", "input", "modelValue", "onUpdate:modelValue", "status"])) : (o(), oe(V, {
                      key: 1,
                      input: Q,
                      modelValue: F.modelValue,
                      "onUpdate:modelValue": T[0] || (T[0] = (J) => F.$emit("update:modelValue", J)),
                      api: F.api
                    }, null, 8, ["input", "modelValue", "api"]))
                  ], 2);
                }), 128))
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 64);
    };
  }
});
function js(e) {
  const t = I(!1), s = I(), n = I(), a = e ?? Ue("client");
  function i({ message: g, errorCode: w, fieldName: O, errors: H }) {
    return w || (w = "Exception"), H || (H = []), s.value = O ? new Ns({
      errorCode: w,
      message: g,
      errors: [new Zl({ fieldName: O, errorCode: w, message: g })]
    }) : new Ns({ errorCode: w, message: g, errors: H });
  }
  function d({ fieldName: g, message: w, errorCode: O }) {
    if (O || (O = "Exception"), !s.value)
      i({ fieldName: g, message: w, errorCode: O });
    else {
      let H = new Ns(s.value);
      H.errors = [
        ...(H.errors || []).filter((ae) => {
          var F;
          return ((F = ae.fieldName) == null ? void 0 : F.toLowerCase()) !== (g == null ? void 0 : g.toLowerCase());
        }),
        new Zl({ fieldName: g, message: w, errorCode: O })
      ], s.value = H;
    }
  }
  async function u(g, w, O) {
    t.value = !0;
    let H = await a.api(Ft(g), w, O);
    return t.value = !1, n.value = H.response, s.value = H.error, H;
  }
  async function c(g, w, O) {
    t.value = !0;
    let H = await a.apiVoid(Ft(g), w, O);
    return t.value = !1, n.value = H.response, s.value = H.error, H;
  }
  async function f(g, w, O, H) {
    t.value = !0;
    let ae = await a.apiForm(Ft(g), w, O, H);
    return t.value = !1, n.value = ae.response, s.value = ae.error, ae;
  }
  async function p(g, w, O, H) {
    t.value = !0;
    let ae = await a.apiFormVoid(Ft(g), w, O, H);
    return t.value = !1, n.value = ae.response, s.value = ae.error, ae;
  }
  async function $(g, w, O, H) {
    return pn(a, g, w, O, H);
  }
  function m(g, w) {
    const O = I(new Xe()), H = mn(async (ae) => {
      O.value = await a.api(ae);
    }, w == null ? void 0 : w.delayMs);
    return bs(async () => {
      const ae = g(), F = dl(Ms(ae));
      F && (O.value = new Xe({ response: F })), (w == null ? void 0 : w.delayMs) === 0 ? O.value = await a.api(ae) : H(ae);
    }), (async () => O.value = await a.api(g(), w == null ? void 0 : w.args, w == null ? void 0 : w.method))(), O;
  }
  let k = { setError: i, addFieldError: d, loading: t, error: s, api: u, apiVoid: c, apiForm: f, apiFormVoid: p, swr: $, swrEffect: m, unRefs: Ft, setRef: fn };
  return ts("ApiState", k), k;
}
const I0 = { key: 0 }, D0 = { class: "text-red-700" }, j0 = /* @__PURE__ */ l("b", null, "type", -1), O0 = { key: 0 }, P0 = { key: 2 }, B0 = ["innerHTML"], R0 = /* @__PURE__ */ l("input", {
  type: "submit",
  class: "hidden"
}, null, -1), E0 = { class: "flex justify-end" }, H0 = /* @__PURE__ */ l("div", null, null, -1), z0 = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, N0 = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), U0 = { class: "fixed inset-0 overflow-hidden" }, q0 = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, Q0 = { class: "flex-1" }, K0 = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, Z0 = { class: "flex items-start justify-between space-x-3" }, G0 = { class: "space-y-1" }, W0 = { key: 0 }, J0 = { key: 2 }, X0 = ["innerHTML"], Y0 = { class: "flex h-7 items-center" }, ef = { class: "flex justify-end" }, tf = /* @__PURE__ */ ce({
  __name: "AutoForm",
  props: {
    type: {},
    modelValue: {},
    heading: {},
    subHeading: {},
    showLoading: { type: Boolean, default: !0 },
    jsconfig: { default: "eccn,edv" },
    formStyle: { default: "card" },
    metaType: {},
    configureField: {},
    configureFormLayout: {},
    panelClass: {},
    bodyClass: {},
    formClass: {},
    innerFormClass: {},
    headerClass: { default: "p-6" },
    buttonsClass: {},
    headingClass: {},
    subHeadingClass: {},
    submitLabel: { default: "Submit" },
    allowSubmit: {}
  },
  emits: ["success", "error", "update:modelValue", "done"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, i = I(), d = I(1), u = I();
    function c() {
      var fe;
      d.value++, J.value = Z();
      const L = Be();
      (fe = L == null ? void 0 : L.proxy) == null || fe.$forceUpdate();
    }
    async function f(L) {
      Object.assign(J.value, L), c(), await _t(() => null);
    }
    ts("ModalProvider", {
      openModal: k
    });
    const $ = I(), m = I();
    function k(L, fe) {
      $.value = L, m.value = fe;
    }
    async function g(L) {
      m.value && m.value(L), $.value = void 0, m.value = void 0;
    }
    const w = js(), { getTypeName: O } = hn(), { typeOf: H, Crud: ae, createDto: F } = rt(), T = I(new Xe()), A = v(() => n.panelClass || Ze.panelClass(n.formStyle)), ue = v(() => n.formClass || n.formStyle == "card" ? "shadow sm:rounded-md" : Dt.formClass), V = v(() => n.headingClass || Ze.headingClass(n.formStyle)), z = v(() => n.subHeadingClass || Ze.subHeadingClass(n.formStyle)), Q = v(() => typeof n.buttonsClass == "string" ? n.buttonsClass : Ze.buttonsClass), te = v(() => {
      var L;
      return n.type ? O(n.type) : (L = n.modelValue) != null && L.getTypeName ? n.modelValue.getTypeName() : null;
    }), R = v(() => n.metaType ?? H(te.value)), Z = () => n.modelValue || Y(), J = I(Z()), U = v(() => w.loading.value), M = v(() => {
      var L;
      return n.heading != null ? n.heading : ((L = R.value) == null ? void 0 : L.description) || ze(te.value);
    });
    t({ forceUpdate: c, props: n, setModel: f, formFields: i, submit: N, close: se, model: J });
    function Y() {
      return typeof n.type == "string" ? F(n.type) : n.type ? new n.type() : n.modelValue;
    }
    async function y(L) {
      if (!L || L.tagName != "FORM") {
        console.error("Not a valid form", L);
        return;
      }
      const fe = Y();
      let pe = Qe(fe == null ? void 0 : fe.getMethod, (S) => typeof S == "function" ? S() : null) || "POST", ie = Qe(fe == null ? void 0 : fe.createResponse, (S) => typeof S == "function" ? S() : null) == null;
      const me = n.jsconfig;
      if (rl.hasRequestBody(pe)) {
        let S = new fe.constructor(), de = new FormData(L);
        ie ? T.value = await w.apiFormVoid(S, de, { jsconfig: me }) : T.value = await w.apiForm(S, de, { jsconfig: me });
      } else {
        let S = new fe.constructor(Io(J.value));
        console.debug("AutoForm.submit", S), ie ? T.value = await w.apiVoid(S, { jsconfig: me }) : T.value = await w.api(S, { jsconfig: me });
      }
      T.value.succeeded ? (a("success", T.value.response), se()) : a("error", T.value.error);
    }
    async function N() {
      y(u.value);
    }
    function E(L) {
      a("update:modelValue", L);
    }
    function h() {
      a("done");
    }
    const C = I(!1), G = I(""), X = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Vt(C, () => {
      xt(X, G, C.value), C.value || setTimeout(h, 700);
    }), C.value = !0;
    function se() {
      n.formStyle == "slideOver" ? C.value = !1 : h();
    }
    const D = (L) => {
      L.key === "Escape" && se();
    };
    return st(() => window.addEventListener("keydown", D)), Ht(() => window.removeEventListener("keydown", D)), (L, fe) => {
      var Se, ge, B, q, le, ye, $e, Me, Re, Te, Oe;
      const pe = W("AutoFormFields"), ie = W("FormLoading"), me = W("PrimaryButton"), S = W("CloseButton"), de = W("SecondaryButton"), Ve = W("ModalLookup");
      return o(), r("div", null, [
        R.value ? L.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: b(A.value)
        }, [
          l("form", {
            ref_key: "elForm",
            ref: u,
            onSubmit: fe[0] || (fe[0] = qe((je) => y(je.target), ["prevent"])),
            autocomplete: "off",
            class: b(L.innerFormClass)
          }, [
            l("div", {
              class: b(L.bodyClass)
            }, [
              l("div", {
                class: b(L.headerClass)
              }, [
                L.$slots.heading ? (o(), r("div", O0, [
                  K(L.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: b(V.value)
                }, j(M.value), 3)),
                L.$slots.subheading ? (o(), r("div", P0, [
                  K(L.$slots, "subheading")
                ])) : L.subHeading ? (o(), r("p", {
                  key: 3,
                  class: b(z.value)
                }, j(L.subHeading), 3)) : (Se = R.value) != null && Se.notes ? (o(), r("p", {
                  key: 4,
                  class: b(["notes", z.value]),
                  innerHTML: (ge = R.value) == null ? void 0 : ge.notes
                }, null, 10, B0)) : x("", !0)
              ], 2),
              K(L.$slots, "header", {
                instance: (B = Be()) == null ? void 0 : B.exposed,
                model: J.value
              }),
              R0,
              (o(), oe(pe, {
                ref_key: "formFields",
                ref: i,
                key: d.value,
                type: L.type,
                modelValue: J.value,
                "onUpdate:modelValue": E,
                api: T.value,
                configureField: L.configureField,
                configureFormLayout: L.configureFormLayout
              }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
              K(L.$slots, "footer", {
                instance: (q = Be()) == null ? void 0 : q.exposed,
                model: J.value
              })
            ], 2),
            K(L.$slots, "buttons", {}, () => {
              var je, Ge;
              return [
                l("div", {
                  class: b(Q.value)
                }, [
                  l("div", null, [
                    K(L.$slots, "leftbuttons", {
                      instance: (je = Be()) == null ? void 0 : je.exposed,
                      model: J.value
                    })
                  ]),
                  l("div", null, [
                    L.showLoading && U.value ? (o(), oe(ie, { key: 0 })) : x("", !0)
                  ]),
                  l("div", E0, [
                    H0,
                    xe(me, {
                      disabled: L.allowSubmit ? !L.allowSubmit(J.value) : !1
                    }, {
                      default: Ce(() => [
                        _e(j(L.submitLabel), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    K(L.$slots, "rightbuttons", {
                      instance: (Ge = Be()) == null ? void 0 : Ge.exposed,
                      model: J.value
                    })
                  ])
                ], 2)
              ];
            })
          ], 34)
        ], 2)) : (o(), r("div", z0, [
          N0,
          l("div", U0, [
            l("div", {
              onMousedown: se,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: fe[2] || (fe[2] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: b(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", G.value])
                }, [
                  l("form", {
                    ref_key: "elForm",
                    ref: u,
                    class: b(ue.value),
                    onSubmit: fe[1] || (fe[1] = qe((je) => y(je.target), ["prevent"]))
                  }, [
                    l("div", q0, [
                      l("div", Q0, [
                        l("div", K0, [
                          l("div", Z0, [
                            l("div", G0, [
                              L.$slots.heading ? (o(), r("div", W0, [
                                K(L.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: b(V.value)
                              }, j(M.value), 3)),
                              L.$slots.subheading ? (o(), r("div", J0, [
                                K(L.$slots, "subheading")
                              ])) : L.subHeading ? (o(), r("p", {
                                key: 3,
                                class: b(z.value)
                              }, j(L.subHeading), 3)) : (le = R.value) != null && le.notes ? (o(), r("p", {
                                key: 4,
                                class: b(["notes", z.value]),
                                innerHTML: (ye = R.value) == null ? void 0 : ye.notes
                              }, null, 10, X0)) : x("", !0)
                            ]),
                            l("div", Y0, [
                              xe(S, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: se
                              })
                            ])
                          ])
                        ]),
                        K(L.$slots, "header", {
                          instance: ($e = Be()) == null ? void 0 : $e.exposed,
                          model: J.value
                        }),
                        (o(), oe(pe, {
                          ref_key: "formFields",
                          ref: i,
                          key: d.value,
                          type: L.type,
                          modelValue: J.value,
                          "onUpdate:modelValue": E,
                          api: T.value,
                          configureField: L.configureField,
                          configureFormLayout: L.configureFormLayout
                        }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
                        K(L.$slots, "footer", {
                          instance: (Me = Be()) == null ? void 0 : Me.exposed,
                          model: J.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: b(Q.value)
                    }, [
                      l("div", null, [
                        K(L.$slots, "leftbuttons", {
                          instance: (Re = Be()) == null ? void 0 : Re.exposed,
                          model: J.value
                        })
                      ]),
                      l("div", null, [
                        L.showLoading && U.value ? (o(), oe(ie, { key: 0 })) : x("", !0)
                      ]),
                      l("div", ef, [
                        xe(de, {
                          onClick: se,
                          disabled: U.value
                        }, {
                          default: Ce(() => [
                            _e("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        xe(me, {
                          class: "ml-4",
                          disabled: L.allowSubmit ? !L.allowSubmit(J.value) : !1
                        }, {
                          default: Ce(() => [
                            _e(j(L.submitLabel), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        K(L.$slots, "rightbuttons", {
                          instance: (Te = Be()) == null ? void 0 : Te.exposed,
                          model: J.value
                        })
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", I0, [
          l("p", D0, [
            _e("Could not create form for unknown "),
            j0,
            _e(" " + j(te.value), 1)
          ])
        ])),
        ((Oe = $.value) == null ? void 0 : Oe.name) == "ModalLookup" && $.value.ref ? (o(), oe(Ve, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: g
        }, null, 8, ["ref-info"])) : x("", !0)
      ]);
    };
  }
}), sf = { key: 0 }, lf = { class: "text-red-700" }, nf = /* @__PURE__ */ l("b", null, "type", -1), of = { key: 0 }, af = { key: 2 }, rf = ["innerHTML"], uf = { class: "flex justify-end" }, df = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, cf = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), ff = { class: "fixed inset-0 overflow-hidden" }, vf = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, pf = { class: "flex-1" }, mf = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, hf = { class: "flex items-start justify-between space-x-3" }, gf = { class: "space-y-1" }, yf = { key: 0 }, bf = { key: 2 }, wf = ["innerHTML"], kf = { class: "flex h-7 items-center" }, _f = { class: "flex justify-end" }, $f = /* @__PURE__ */ ce({
  __name: "AutoCreateForm",
  props: {
    type: {},
    formStyle: { default: "slideOver" },
    panelClass: {},
    formClass: {},
    headingClass: {},
    subHeadingClass: {},
    buttonsClass: {},
    heading: {},
    subHeading: {},
    autosave: { type: Boolean, default: !0 },
    showLoading: { type: Boolean, default: !0 },
    showCancel: { type: Boolean, default: !0 },
    configureField: {},
    configureFormLayout: {}
  },
  emits: ["done", "save", "error"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, i = I(), d = I(1);
    function u() {
      var L, fe;
      d.value++, (L = i.value) == null || L.forceUpdate();
      const D = Be();
      (fe = D == null ? void 0 : D.proxy) == null || fe.$forceUpdate();
    }
    function c(D) {
      Object.assign(V.value, D), u();
    }
    function f(D) {
    }
    ts("ModalProvider", {
      openModal: k
    });
    const $ = I(), m = I();
    function k(D, L) {
      $.value = D, m.value = L;
    }
    async function g(D) {
      m.value && m.value(D), $.value = void 0, m.value = void 0;
    }
    const { typeOf: w, typeProperties: O, Crud: H, createDto: ae, formValues: F } = rt(), T = v(() => zt(n.type)), A = v(() => w(T.value)), V = I((() => typeof n.type == "string" ? ae(n.type) : n.type ? new n.type() : null)());
    t({ forceUpdate: u, props: n, setModel: c, formFields: i, model: V });
    const z = v(() => n.panelClass || Ze.panelClass(n.formStyle)), Q = v(() => n.formClass || Ze.formClass(n.formStyle)), te = v(() => n.headingClass || Ze.headingClass(n.formStyle)), R = v(() => n.subHeadingClass || Ze.subHeadingClass(n.formStyle)), Z = v(() => n.buttonsClass || Ze.buttonsClass), J = v(() => H.model(A.value)), U = v(() => {
      var D;
      return n.heading || ((D = w(T.value)) == null ? void 0 : D.description) || (J.value ? `New ${ze(J.value)}` : ze(T.value));
    }), M = I(new Xe());
    let Y = js(), y = v(() => Y.loading.value);
    ne.interceptors.has("AutoCreateForm.new") && ne.interceptors.invoke("AutoCreateForm.new", { props: n, model: V });
    async function N(D) {
      var ie, me;
      let L = D.target;
      if (!n.autosave) {
        a("save", new V.value.constructor(F(L, O(A.value))));
        return;
      }
      let fe = Qe((ie = V.value) == null ? void 0 : ie.getMethod, (S) => typeof S == "function" ? S() : null) || "POST", pe = Qe((me = V.value) == null ? void 0 : me.createResponse, (S) => typeof S == "function" ? S() : null) == null;
      if (rl.hasRequestBody(fe)) {
        let S = new V.value.constructor(), de = new FormData(L);
        pe ? M.value = await Y.apiFormVoid(S, de, { jsconfig: "eccn" }) : M.value = await Y.apiForm(S, de, { jsconfig: "eccn" });
      } else {
        let S = F(L, O(A.value)), de = new V.value.constructor(S);
        pe ? M.value = await Y.apiVoid(de, { jsconfig: "eccn" }) : M.value = await Y.api(de, { jsconfig: "eccn" });
      }
      M.value.succeeded ? (L.reset(), a("save", M.value.response)) : a("error", M.value.error);
    }
    function E() {
      a("done");
    }
    const h = I(!1), C = I(""), G = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Vt(h, () => {
      xt(G, C, h.value), h.value || setTimeout(E, 700);
    }), h.value = !0;
    function X() {
      n.formStyle == "slideOver" ? h.value = !1 : E();
    }
    const se = (D) => {
      D.key === "Escape" && X();
    };
    return st(() => window.addEventListener("keydown", se)), Ht(() => window.removeEventListener("keydown", se)), (D, L) => {
      var Ve, Se, ge, B, q, le, ye, $e, Me;
      const fe = W("AutoFormFields"), pe = W("FormLoading"), ie = W("SecondaryButton"), me = W("PrimaryButton"), S = W("CloseButton"), de = W("ModalLookup");
      return o(), r("div", null, [
        A.value ? D.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: b(z.value)
        }, [
          l("form", {
            onSubmit: qe(N, ["prevent"])
          }, [
            l("div", {
              class: b(Q.value)
            }, [
              l("div", null, [
                D.$slots.heading ? (o(), r("div", of, [
                  K(D.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: b(te.value)
                }, j(U.value), 3)),
                D.$slots.subheading ? (o(), r("div", af, [
                  K(D.$slots, "subheading")
                ])) : D.subHeading ? (o(), r("p", {
                  key: 3,
                  class: b(R.value)
                }, j(D.subHeading), 3)) : (Ve = A.value) != null && Ve.notes ? (o(), r("p", {
                  key: 4,
                  class: b(["notes", R.value]),
                  innerHTML: (Se = A.value) == null ? void 0 : Se.notes
                }, null, 10, rf)) : x("", !0)
              ]),
              K(D.$slots, "header", {
                formInstance: (ge = Be()) == null ? void 0 : ge.exposed,
                model: V.value
              }),
              (o(), oe(fe, {
                ref_key: "formFields",
                ref: i,
                key: d.value,
                modelValue: V.value,
                "onUpdate:modelValue": f,
                api: M.value,
                configureField: D.configureField,
                configureFormLayout: D.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              K(D.$slots, "footer", {
                formInstance: (B = Be()) == null ? void 0 : B.exposed,
                model: V.value
              })
            ], 2),
            l("div", {
              class: b(Z.value)
            }, [
              l("div", null, [
                D.showLoading && ee(y) ? (o(), oe(pe, { key: 0 })) : x("", !0)
              ]),
              l("div", uf, [
                D.showCancel ? (o(), oe(ie, {
                  key: 0,
                  onClick: X,
                  disabled: ee(y)
                }, {
                  default: Ce(() => [
                    _e("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"])) : x("", !0),
                xe(me, {
                  type: "submit",
                  class: "ml-4",
                  disabled: ee(y)
                }, {
                  default: Ce(() => [
                    _e("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), r("div", df, [
          cf,
          l("div", ff, [
            l("div", {
              onMousedown: X,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: L[0] || (L[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: b(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", C.value])
                }, [
                  l("form", {
                    class: b(Q.value),
                    onSubmit: qe(N, ["prevent"])
                  }, [
                    l("div", vf, [
                      l("div", pf, [
                        l("div", mf, [
                          l("div", hf, [
                            l("div", gf, [
                              D.$slots.heading ? (o(), r("div", yf, [
                                K(D.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: b(te.value)
                              }, j(U.value), 3)),
                              D.$slots.subheading ? (o(), r("div", bf, [
                                K(D.$slots, "subheading")
                              ])) : D.subHeading ? (o(), r("p", {
                                key: 3,
                                class: b(R.value)
                              }, j(D.subHeading), 3)) : (q = A.value) != null && q.notes ? (o(), r("p", {
                                key: 4,
                                class: b(["notes", R.value]),
                                innerHTML: (le = A.value) == null ? void 0 : le.notes
                              }, null, 10, wf)) : x("", !0)
                            ]),
                            l("div", kf, [
                              xe(S, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: X
                              })
                            ])
                          ])
                        ]),
                        K(D.$slots, "header", {
                          formInstance: (ye = Be()) == null ? void 0 : ye.exposed,
                          model: V.value
                        }),
                        (o(), oe(fe, {
                          ref_key: "formFields",
                          ref: i,
                          key: d.value,
                          modelValue: V.value,
                          "onUpdate:modelValue": f,
                          api: M.value,
                          configureField: D.configureField,
                          configureFormLayout: D.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
                        K(D.$slots, "footer", {
                          formInstance: ($e = Be()) == null ? void 0 : $e.exposed,
                          model: V.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: b(Z.value)
                    }, [
                      l("div", null, [
                        D.showLoading && ee(y) ? (o(), oe(pe, { key: 0 })) : x("", !0)
                      ]),
                      l("div", _f, [
                        D.showCancel ? (o(), oe(ie, {
                          key: 0,
                          onClick: X,
                          disabled: ee(y)
                        }, {
                          default: Ce(() => [
                            _e("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : x("", !0),
                        xe(me, {
                          type: "submit",
                          class: "ml-4",
                          disabled: ee(y)
                        }, {
                          default: Ce(() => [
                            _e("Save")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", sf, [
          l("p", lf, [
            _e("Could not create form for unknown "),
            nf,
            _e(" " + j(T.value), 1)
          ])
        ])),
        ((Me = $.value) == null ? void 0 : Me.name) == "ModalLookup" && $.value.ref ? (o(), oe(de, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: g
        }, null, 8, ["ref-info"])) : x("", !0)
      ]);
    };
  }
}), Cf = { key: 0 }, xf = { class: "text-red-700" }, Lf = /* @__PURE__ */ l("b", null, "type", -1), Vf = { key: 0 }, Sf = { key: 2 }, Mf = ["innerHTML"], Af = { class: "flex justify-end" }, Tf = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, Ff = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), If = { class: "fixed inset-0 overflow-hidden" }, Df = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, jf = { class: "flex-1" }, Of = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, Pf = { class: "flex items-start justify-between space-x-3" }, Bf = { class: "space-y-1" }, Rf = { key: 0 }, Ef = { key: 2 }, Hf = ["innerHTML"], zf = { class: "flex h-7 items-center" }, Nf = { class: "flex justify-end" }, Uf = /* @__PURE__ */ ce({
  __name: "AutoEditForm",
  props: {
    modelValue: {},
    type: {},
    deleteType: {},
    formStyle: { default: "slideOver" },
    panelClass: {},
    formClass: {},
    headingClass: {},
    subHeadingClass: {},
    heading: {},
    subHeading: {},
    autosave: { type: Boolean, default: !0 },
    showLoading: { type: Boolean, default: !0 },
    configureField: {},
    configureFormLayout: {}
  },
  emits: ["done", "save", "delete", "error"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, i = I(), d = I(1);
    function u() {
      var de;
      d.value++, te.value = Q();
      const S = Be();
      (de = S == null ? void 0 : S.proxy) == null || de.$forceUpdate();
    }
    function c(S) {
      Object.assign(te.value, S);
    }
    function f(S) {
    }
    ts("ModalProvider", {
      openModal: k
    });
    const $ = I(), m = I();
    function k(S, de) {
      $.value = S, m.value = de;
    }
    async function g(S) {
      m.value && m.value(S), $.value = void 0, m.value = void 0;
    }
    const { typeOf: w, apiOf: O, typeProperties: H, createFormLayout: ae, getPrimaryKey: F, Crud: T, createDto: A, formValues: ue } = rt(), V = v(() => zt(n.type)), z = v(() => w(V.value)), Q = () => typeof n.type == "string" ? A(n.type, gs(n.modelValue)) : n.type ? new n.type(gs(n.modelValue)) : null, te = I(Q());
    t({ forceUpdate: u, props: n, setModel: c, formFields: i, model: te });
    const R = v(() => n.panelClass || Ze.panelClass(n.formStyle)), Z = v(() => n.formClass || Ze.formClass(n.formStyle)), J = v(() => n.headingClass || Ze.headingClass(n.formStyle)), U = v(() => n.subHeadingClass || Ze.subHeadingClass(n.formStyle)), M = v(() => T.model(z.value)), Y = v(() => {
      var S;
      return n.heading || ((S = w(V.value)) == null ? void 0 : S.description) || (M.value ? `Update ${ze(M.value)}` : ze(V.value));
    }), y = I(new Xe());
    let N = Object.assign({}, gs(n.modelValue));
    ne.interceptors.has("AutoEditForm.new") && ne.interceptors.invoke("AutoEditForm.new", { props: n, model: te, origModel: N });
    let E = js(), h = v(() => E.loading.value);
    const C = () => Qe(w(T.model(z.value)), (S) => F(S));
    function G(S) {
      const { op: de, prop: Ve } = S;
      de && (T.isPatch(de) || T.isUpdate(de)) && (S.disabled = Ve == null ? void 0 : Ve.isPrimaryKey), n.configureField && n.configureField(S);
    }
    async function X(S) {
      var B, q;
      let de = S.target;
      if (!n.autosave) {
        a("save", new te.value.constructor(ue(de, H(z.value))));
        return;
      }
      let Ve = Qe((B = te.value) == null ? void 0 : B.getMethod, (le) => typeof le == "function" ? le() : null) || "POST", Se = Qe((q = te.value) == null ? void 0 : q.createResponse, (le) => typeof le == "function" ? le() : null) == null, ge = C();
      if (rl.hasRequestBody(Ve)) {
        let le = new te.value.constructor(), ye = we(n.modelValue, ge.name), $e = new FormData(de);
        ge && !Array.from($e.keys()).some((Oe) => Oe.toLowerCase() == ge.name.toLowerCase()) && $e.append(ge.name, ye);
        let Me = [];
        const Re = V.value && O(V.value);
        if (Re && T.isPatch(Re)) {
          let Oe = ae(z.value), je = {};
          if (ge && (je[ge.name] = ye), Oe.forEach((Ee) => {
            let it = Ee.id, At = we(N, it);
            if (ge && ge.name.toLowerCase() === it.toLowerCase())
              return;
            let mt = $e.get(it);
            ne.interceptors.has("AutoEditForm.save.formLayout") && ne.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: At, formLayout: Oe, input: Ee, newValue: mt });
            let os = mt != null, as = Ee.type === "checkbox" ? os !== !!At : Ee.type === "file" ? os : mt != At;
            !mt && !At && (as = !1), as && (mt ? je[it] = mt : Ee.type !== "file" && Me.push(it));
          }), ne.interceptors.has("AutoEditForm.save") && ne.interceptors.invoke("AutoEditForm.save", { origModel: N, formLayout: Oe, dirtyValues: je }), Array.from($e.keys()).filter((Ee) => !je[Ee]).forEach((Ee) => $e.delete(Ee)), Array.from($e.keys()).filter((Ee) => Ee.toLowerCase() != ge.name.toLowerCase()).length == 0 && Me.length == 0) {
            ie();
            return;
          }
        }
        const Te = Me.length > 0 ? { jsconfig: "eccn", reset: Me } : { jsconfig: "eccn" };
        Se ? y.value = await E.apiFormVoid(le, $e, Te) : y.value = await E.apiForm(le, $e, Te);
      } else {
        let le = ue(de, H(z.value));
        ge && !we(le, ge.name) && (le[ge.name] = we(n.modelValue, ge.name));
        let ye = new te.value.constructor(le);
        Se ? y.value = await E.apiVoid(ye, { jsconfig: "eccn" }) : y.value = await E.api(ye, { jsconfig: "eccn" });
      }
      y.value.succeeded ? (de.reset(), a("save", y.value.response)) : a("error", y.value.error);
    }
    async function se(S) {
      let de = C();
      const Ve = de ? we(n.modelValue, de.name) : null;
      if (!Ve) {
        console.error(`Could not find Primary Key for Type ${V.value} (${M.value})`);
        return;
      }
      const Se = { [de.name]: Ve }, ge = typeof n.deleteType == "string" ? A(n.deleteType, Se) : n.deleteType ? new n.deleteType(Se) : null;
      Qe(ge.createResponse, (q) => typeof q == "function" ? q() : null) == null ? y.value = await E.apiVoid(ge) : y.value = await E.api(ge), y.value.succeeded ? a("delete", y.value.response) : a("error", y.value.error);
    }
    function D() {
      a("done");
    }
    const L = I(!1), fe = I(""), pe = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Vt(L, () => {
      xt(pe, fe, L.value), L.value || setTimeout(D, 700);
    }), L.value = !0;
    function ie() {
      n.formStyle == "slideOver" ? L.value = !1 : D();
    }
    const me = (S) => {
      S.key === "Escape" && ie();
    };
    return st(() => window.addEventListener("keydown", me)), Ht(() => window.removeEventListener("keydown", me)), (S, de) => {
      var $e, Me, Re, Te, Oe, je, Ge, Ee, it;
      const Ve = W("AutoFormFields"), Se = W("ConfirmDelete"), ge = W("FormLoading"), B = W("SecondaryButton"), q = W("PrimaryButton"), le = W("CloseButton"), ye = W("ModalLookup");
      return o(), r("div", null, [
        z.value ? S.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: b(R.value)
        }, [
          l("form", {
            onSubmit: qe(X, ["prevent"])
          }, [
            l("div", {
              class: b(Z.value)
            }, [
              l("div", null, [
                S.$slots.heading ? (o(), r("div", Vf, [
                  K(S.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: b(J.value)
                }, j(Y.value), 3)),
                S.$slots.subheading ? (o(), r("div", Sf, [
                  K(S.$slots, "subheading")
                ])) : S.subHeading ? (o(), r("p", {
                  key: 3,
                  class: b(U.value)
                }, j(S.subHeading), 3)) : ($e = z.value) != null && $e.notes ? (o(), r("p", {
                  key: 4,
                  class: b(["notes", U.value]),
                  innerHTML: (Me = z.value) == null ? void 0 : Me.notes
                }, null, 10, Mf)) : x("", !0)
              ]),
              K(S.$slots, "header", {
                formInstance: (Re = Be()) == null ? void 0 : Re.exposed,
                model: te.value
              }),
              (o(), oe(Ve, {
                ref_key: "formFields",
                ref: i,
                key: d.value,
                modelValue: te.value,
                "onUpdate:modelValue": f,
                api: y.value,
                configureField: S.configureField,
                configureFormLayout: S.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              K(S.$slots, "footer", {
                formInstance: (Te = Be()) == null ? void 0 : Te.exposed,
                model: te.value
              })
            ], 2),
            l("div", {
              class: b(ee(Ze).buttonsClass)
            }, [
              l("div", null, [
                S.deleteType ? (o(), oe(Se, {
                  key: 0,
                  onDelete: se
                })) : x("", !0)
              ]),
              l("div", null, [
                S.showLoading && ee(h) ? (o(), oe(ge, { key: 0 })) : x("", !0)
              ]),
              l("div", Af, [
                xe(B, {
                  onClick: ie,
                  disabled: ee(h)
                }, {
                  default: Ce(() => [
                    _e("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                xe(q, {
                  type: "submit",
                  class: "ml-4",
                  disabled: ee(h)
                }, {
                  default: Ce(() => [
                    _e("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), r("div", Tf, [
          Ff,
          l("div", If, [
            l("div", {
              onMousedown: ie,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: de[0] || (de[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: b(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", fe.value])
                }, [
                  l("form", {
                    class: b(Z.value),
                    onSubmit: qe(X, ["prevent"])
                  }, [
                    l("div", Df, [
                      l("div", jf, [
                        l("div", Of, [
                          l("div", Pf, [
                            l("div", Bf, [
                              S.$slots.heading ? (o(), r("div", Rf, [
                                K(S.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: b(J.value)
                              }, j(Y.value), 3)),
                              S.$slots.subheading ? (o(), r("div", Ef, [
                                K(S.$slots, "subheading")
                              ])) : S.subHeading ? (o(), r("p", {
                                key: 3,
                                class: b(U.value)
                              }, j(S.subHeading), 3)) : (Oe = z.value) != null && Oe.notes ? (o(), r("p", {
                                key: 4,
                                class: b(["notes", U.value]),
                                innerHTML: (je = z.value) == null ? void 0 : je.notes
                              }, null, 10, Hf)) : x("", !0)
                            ]),
                            l("div", zf, [
                              xe(le, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: ie
                              })
                            ])
                          ])
                        ]),
                        K(S.$slots, "header", {
                          formInstance: (Ge = Be()) == null ? void 0 : Ge.exposed,
                          model: te.value
                        }),
                        (o(), oe(Ve, {
                          ref_key: "formFields",
                          ref: i,
                          key: d.value,
                          modelValue: te.value,
                          "onUpdate:modelValue": f,
                          api: y.value,
                          configureField: G,
                          configureFormLayout: S.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureFormLayout"])),
                        K(S.$slots, "footer", {
                          formInstance: (Ee = Be()) == null ? void 0 : Ee.exposed,
                          model: te.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: b(ee(Ze).buttonsClass)
                    }, [
                      l("div", null, [
                        S.deleteType ? (o(), oe(Se, {
                          key: 0,
                          onDelete: se
                        })) : x("", !0)
                      ]),
                      l("div", null, [
                        S.showLoading && ee(h) ? (o(), oe(ge, { key: 0 })) : x("", !0)
                      ]),
                      l("div", Nf, [
                        xe(B, {
                          onClick: ie,
                          disabled: ee(h)
                        }, {
                          default: Ce(() => [
                            _e("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        xe(q, {
                          type: "submit",
                          class: "ml-4",
                          disabled: ee(h)
                        }, {
                          default: Ce(() => [
                            _e("Save")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", Cf, [
          l("p", xf, [
            _e("Could not create form for unknown "),
            Lf,
            _e(" " + j(V.value), 1)
          ])
        ])),
        ((it = $.value) == null ? void 0 : it.name) == "ModalLookup" && $.value.ref ? (o(), oe(ye, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: g
        }, null, 8, ["ref-info"])) : x("", !0)
      ]);
    };
  }
}), qf = /* @__PURE__ */ l("label", {
  for: "confirmDelete",
  class: "ml-2 mr-2 select-none"
}, "confirm", -1), Qf = /* @__PURE__ */ ce({
  __name: "ConfirmDelete",
  emits: ["delete"],
  setup(e, { emit: t }) {
    let s = I(!1);
    const n = t, a = () => {
      s.value && n("delete");
    }, i = v(() => [
      "select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
      s.value ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400"
    ]);
    return (d, u) => (o(), r(Ie, null, [
      $t(l("input", {
        id: "confirmDelete",
        type: "checkbox",
        class: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        "onUpdate:modelValue": u[0] || (u[0] = (c) => sn(s) ? s.value = c : s = c)
      }, null, 512), [
        [nl, ee(s)]
      ]),
      qf,
      l("span", Ae({
        onClick: qe(a, ["prevent"]),
        class: i.value
      }, d.$attrs), [
        K(d.$slots, "default", {}, () => [
          _e("Delete")
        ])
      ], 16)
    ], 64));
  }
}), Kf = {
  class: "flex",
  title: "loading..."
}, Zf = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "24px",
  height: "30px",
  viewBox: "0 0 24 30"
}, Gf = /* @__PURE__ */ Cs('<rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>', 3), Wf = [
  Gf
], Jf = { class: "ml-2 mt-1 text-gray-400" }, Xf = /* @__PURE__ */ ce({
  __name: "FormLoading",
  props: {
    icon: { type: Boolean, default: !0 },
    text: { default: "loading..." }
  },
  setup(e) {
    return Ue("ApiState", void 0), (t, s) => (o(), r("div", Kf, [
      t.icon ? (o(), r("svg", Zf, Wf)) : x("", !0),
      l("span", Jf, j(t.text), 1)
    ]));
  }
}), Yf = ["onClick"], ev = {
  key: 3,
  class: "flex justify-between items-center"
}, tv = { class: "mr-1 select-none" }, sv = ["onClick"], lv = /* @__PURE__ */ ce({
  __name: "DataGrid",
  props: {
    items: { default: () => [] },
    id: { default: "DataGrid" },
    type: {},
    tableStyle: { default: "stripedRows" },
    selectedColumns: {},
    gridClass: {},
    grid2Class: {},
    grid3Class: {},
    grid4Class: {},
    tableClass: {},
    theadClass: {},
    tbodyClass: {},
    theadRowClass: {},
    theadCellClass: {},
    isSelected: {},
    headerTitle: {},
    headerTitles: {},
    visibleFrom: {},
    rowClass: {},
    rowStyle: {}
  },
  emits: ["headerSelected", "rowSelected"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = I(), i = I(null), d = (E) => i.value === E, u = ol(), c = (E) => Object.keys(u).find((h) => h.toLowerCase() == E.toLowerCase() + "-header"), f = (E) => Object.keys(u).find((h) => h.toLowerCase() == E.toLowerCase()), p = v(() => Zs(s.items).filter((E) => !!(u[E] || u[E + "-header"]))), { typeOf: $, typeProperties: m } = rt(), k = v(() => zt(s.type)), g = v(() => $(k.value)), w = v(() => m(g.value));
    function O(E) {
      const h = s.headerTitles && we(s.headerTitles, E) || E;
      return s.headerTitle ? s.headerTitle(h) : dn(h);
    }
    function H(E) {
      const h = E.toLowerCase();
      return w.value.find((C) => C.name.toLowerCase() == h);
    }
    function ae(E) {
      const h = H(E);
      return h != null && h.format ? h.format : (h == null ? void 0 : h.type) == "TimeSpan" || (h == null ? void 0 : h.type) == "TimeOnly" ? { method: "time" } : null;
    }
    const F = {
      xs: "xs:table-cell",
      sm: "sm:table-cell",
      md: "md:table-cell",
      lg: "lg:table-cell",
      xl: "xl:table-cell",
      "2xl": "2xl:table-cell",
      never: ""
    };
    function T(E) {
      const h = s.visibleFrom && we(s.visibleFrom, E);
      return h && Qe(F[h], (C) => `hidden ${C}`);
    }
    const A = v(() => s.gridClass ?? he.getGridClass(s.tableStyle)), ue = v(() => s.grid2Class ?? he.getGrid2Class(s.tableStyle)), V = v(() => s.grid3Class ?? he.getGrid3Class(s.tableStyle)), z = v(() => s.grid4Class ?? he.getGrid4Class(s.tableStyle)), Q = v(() => s.tableClass ?? he.getTableClass(s.tableStyle)), te = v(() => s.tbodyClass ?? he.getTbodyClass(s.tbodyClass)), R = v(() => s.theadClass ?? he.getTheadClass(s.tableStyle)), Z = v(() => s.theadRowClass ?? he.getTheadRowClass(s.tableStyle)), J = v(() => s.theadCellClass ?? he.getTheadCellClass(s.tableStyle));
    function U(E, h) {
      return s.rowClass ? s.rowClass(E, h) : he.getTableRowClass(s.tableStyle, h, !!(s.isSelected && s.isSelected(E)), s.isSelected != null);
    }
    function M(E, h) {
      return s.rowStyle ? s.rowStyle(E, h) : void 0;
    }
    const Y = v(() => {
      const E = (typeof s.selectedColumns == "string" ? s.selectedColumns.split(",") : s.selectedColumns) || (p.value.length > 0 ? p.value : Zs(s.items)), h = w.value.reduce((C, G) => (C[G.name.toLowerCase()] = G.format, C), {});
      return E.filter((C) => {
        var G;
        return ((G = h[C.toLowerCase()]) == null ? void 0 : G.method) != "hidden";
      });
    });
    function y(E, h) {
      n("headerSelected", h, E);
    }
    function N(E, h, C) {
      n("rowSelected", C, E);
    }
    return (E, h) => {
      const C = W("CellFormat"), G = W("PreviewFormat");
      return E.items.length ? (o(), r("div", {
        key: 0,
        ref_key: "refResults",
        ref: a,
        class: b(A.value)
      }, [
        l("div", {
          class: b(ue.value)
        }, [
          l("div", {
            class: b(V.value)
          }, [
            l("div", {
              class: b(z.value)
            }, [
              l("table", {
                class: b(Q.value)
              }, [
                l("thead", {
                  class: b(R.value)
                }, [
                  l("tr", {
                    class: b(Z.value)
                  }, [
                    (o(!0), r(Ie, null, De(Y.value, (X) => (o(), r("td", {
                      class: b([T(X), J.value, d(X) ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"])
                    }, [
                      l("div", {
                        onClick: (se) => y(se, X)
                      }, [
                        ee(u)[X + "-header"] ? K(E.$slots, X + "-header", {
                          key: 0,
                          column: X
                        }) : c(X) ? K(E.$slots, c(X), {
                          key: 1,
                          column: X
                        }) : ee(u).header ? K(E.$slots, "header", {
                          key: 2,
                          column: X,
                          label: O(X)
                        }) : (o(), r("div", ev, [
                          l("span", tv, j(O(X)), 1)
                        ]))
                      ], 8, Yf)
                    ], 2))), 256))
                  ], 2)
                ], 2),
                l("tbody", {
                  class: b(te.value)
                }, [
                  (o(!0), r(Ie, null, De(E.items, (X, se) => (o(), r("tr", {
                    class: b(U(X, se)),
                    style: ll(M(X, se)),
                    onClick: (D) => N(D, se, X)
                  }, [
                    (o(!0), r(Ie, null, De(Y.value, (D) => (o(), r("td", {
                      class: b([T(D), ee(he).tableCellClass])
                    }, [
                      ee(u)[D] ? K(E.$slots, D, Ot(Ae({ key: 0 }, X))) : f(D) ? K(E.$slots, f(D), Ot(Ae({ key: 1 }, X))) : H(D) ? (o(), oe(C, {
                        key: 2,
                        type: g.value,
                        propType: H(D),
                        modelValue: X
                      }, null, 8, ["type", "propType", "modelValue"])) : (o(), oe(G, {
                        key: 3,
                        value: ee(we)(X, D),
                        format: ae(D)
                      }, null, 8, ["value", "format"]))
                    ], 2))), 256))
                  ], 14, sv))), 256))
                ], 2)
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 2)) : x("", !0);
    };
  }
}), nv = ce({
  props: {
    type: Object,
    propType: Object,
    modelValue: Object
  },
  setup(e, { attrs: t }) {
    const { typeOf: s } = rt();
    function n(a) {
      return a != null && a.format ? a.format : (a == null ? void 0 : a.type) == "TimeSpan" || (a == null ? void 0 : a.type) == "TimeOnly" ? { method: "time" } : null;
    }
    return () => {
      var H;
      const a = n(e.propType), i = we(e.modelValue, e.propType.name), d = Object.assign({}, e, t), u = gt("span", { innerHTML: es(i, a, d) }), c = Jt(i) && Array.isArray(i) ? gt("span", {}, [
        gt("span", { class: "mr-2" }, `${i.length}`),
        u
      ]) : u, f = (H = e.propType) == null ? void 0 : H.ref;
      if (!f)
        return c;
      const $ = tt(e.type).find((ae) => ae.type === f.model);
      if (!$)
        return c;
      const m = we(e.modelValue, $.name), k = m && f.refLabel && we(m, f.refLabel);
      if (!k)
        return c;
      const g = s(f.model), w = g == null ? void 0 : g.icon, O = w ? gt(Jn, { image: w, class: "w-5 h-5 mr-1" }) : null;
      return gt("span", { class: "flex", title: `${f.model} ${i}` }, [
        O,
        k
      ]);
    };
  }
}), ov = { key: 0 }, av = {
  key: 0,
  class: "mr-2"
}, rv = ["innerHTML"], iv = ["innerHTML"], uv = {
  inheritAttrs: !1
}, dv = /* @__PURE__ */ ce({
  ...uv,
  __name: "PreviewFormat",
  props: {
    value: {},
    format: {},
    includeIcon: { type: Boolean, default: !0 },
    includeCount: { type: Boolean, default: !0 },
    maxFieldLength: { default: 150 },
    maxNestedFields: { default: 2 },
    maxNestedFieldLength: { default: 30 }
  },
  setup(e) {
    const t = e, s = v(() => Array.isArray(t.value));
    return (n, a) => ee(Jt)(n.value) ? (o(), r("span", ov, [
      n.includeCount && s.value ? (o(), r("span", av, j(n.value.length), 1)) : x("", !0),
      l("span", {
        innerHTML: ee(es)(n.value, n.format, n.$attrs)
      }, null, 8, rv)
    ])) : (o(), r("span", {
      key: 1,
      innerHTML: ee(es)(n.value, n.format, n.$attrs)
    }, null, 8, iv));
  }
}), cv = ["innerHTML"], fv = { key: 0 }, vv = /* @__PURE__ */ l("b", null, null, -1), pv = { key: 2 }, mv = /* @__PURE__ */ ce({
  __name: "HtmlFormat",
  props: {
    value: {},
    depth: { default: 0 },
    fieldAttrs: {},
    classes: { type: Function, default: (e, t, s, n, a) => n }
  },
  setup(e) {
    const t = e, s = v(() => Lt(t.value)), n = v(() => Array.isArray(t.value)), a = (c) => dn(c), i = (c) => t.fieldAttrs ? t.fieldAttrs(c) : null, d = v(() => Zs(t.value)), u = (c) => c ? Object.keys(c).map((f) => ({ key: a(f), val: c[f] })) : [];
    return (c, f) => {
      const p = W("HtmlFormat", !0);
      return o(), r("div", {
        class: b(c.depth == 0 ? "prose html-format" : "")
      }, [
        s.value ? (o(), r("div", {
          key: 0,
          innerHTML: ee(es)(c.value)
        }, null, 8, cv)) : n.value ? (o(), r("div", {
          key: 1,
          class: b(c.classes("array", "div", c.depth, ee(he).gridClass))
        }, [
          ee(Lt)(c.value[0]) ? (o(), r("div", fv, "[ " + j(c.value.join(", ")) + " ]", 1)) : (o(), r("div", {
            key: 1,
            class: b(c.classes("array", "div", c.depth, ee(he).grid2Class))
          }, [
            l("div", {
              class: b(c.classes("array", "div", c.depth, ee(he).grid3Class))
            }, [
              l("div", {
                class: b(c.classes("array", "div", c.depth, ee(he).grid4Class))
              }, [
                l("table", {
                  class: b(c.classes("object", "table", c.depth, ee(he).tableClass))
                }, [
                  l("thead", {
                    class: b(c.classes("array", "thead", c.depth, ee(he).theadClass))
                  }, [
                    l("tr", null, [
                      (o(!0), r(Ie, null, De(d.value, ($) => (o(), r("th", {
                        class: b(c.classes("array", "th", c.depth, ee(he).theadCellClass + " whitespace-nowrap"))
                      }, [
                        vv,
                        _e(j(a($)), 1)
                      ], 2))), 256))
                    ])
                  ], 2),
                  l("tbody", null, [
                    (o(!0), r(Ie, null, De(c.value, ($, m) => (o(), r("tr", {
                      class: b(c.classes("array", "tr", c.depth, m % 2 == 0 ? "bg-white" : "bg-gray-50", m))
                    }, [
                      (o(!0), r(Ie, null, De(d.value, (k) => (o(), r("td", {
                        class: b(c.classes("array", "td", c.depth, ee(he).tableCellClass))
                      }, [
                        xe(p, Ae({
                          value: $[k],
                          "field-attrs": c.fieldAttrs,
                          depth: c.depth + 1,
                          classes: c.classes
                        }, i(k)), null, 16, ["value", "field-attrs", "depth", "classes"])
                      ], 2))), 256))
                    ], 2))), 256))
                  ])
                ], 2)
              ], 2)
            ], 2)
          ], 2))
        ], 2)) : (o(), r("div", pv, [
          l("table", {
            class: b(c.classes("object", "table", c.depth, "table-object"))
          }, [
            (o(!0), r(Ie, null, De(u(c.value), ($) => (o(), r("tr", {
              class: b(c.classes("object", "tr", c.depth, ""))
            }, [
              l("th", {
                class: b(c.classes("object", "th", c.depth, "align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap"))
              }, j($.key), 3),
              l("td", {
                class: b(c.classes("object", "td", c.depth, "align-top py-2 px-4 text-sm"))
              }, [
                xe(p, Ae({
                  value: $.val,
                  "field-attrs": c.fieldAttrs,
                  depth: c.depth + 1,
                  classes: c.classes
                }, i($.key)), null, 16, ["value", "field-attrs", "depth", "classes"])
              ], 2)
            ], 2))), 256))
          ], 2)
        ]))
      ], 2);
    };
  }
}), hv = { class: "absolute top-0 right-0 pt-4 pr-4" }, gv = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), yv = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), bv = [
  gv,
  yv
], wv = /* @__PURE__ */ ce({
  __name: "CloseButton",
  props: {
    buttonClass: { default: "bg-white dark:bg-black" }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    return (s, n) => (o(), r("div", hv, [
      l("button", {
        type: "button",
        onClick: n[0] || (n[0] = (a) => s.$emit("close")),
        class: b([s.buttonClass, "rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"])
      }, bv, 2)
    ]));
  }
}), kv = ["id", "aria-labelledby"], _v = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), $v = { class: "fixed inset-0 overflow-hidden" }, Cv = { class: "flex h-full flex-col bg-white dark:bg-black shadow-xl" }, xv = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, Lv = { class: "flex-1" }, Vv = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, Sv = { class: "flex items-start justify-between space-x-3" }, Mv = { class: "space-y-1" }, Av = { key: 0 }, Tv = ["id"], Fv = {
  key: 2,
  class: "text-sm text-gray-500"
}, Iv = { class: "flex h-7 items-center" }, Dv = {
  key: 0,
  class: "flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6"
}, jv = /* @__PURE__ */ ce({
  __name: "SlideOver",
  props: {
    id: { default: "SlideOver" },
    title: {},
    contentClass: { default: "relative mt-6 flex-1 px-4 sm:px-6" }
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = t, n = I(!1), a = I(""), i = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Vt(n, () => {
      xt(i, a, n.value), n.value || setTimeout(() => s("done"), 700);
    }), n.value = !0;
    const d = () => n.value = !1, u = (c) => {
      c.key === "Escape" && d();
    };
    return st(() => window.addEventListener("keydown", u)), Ht(() => window.removeEventListener("keydown", u)), (c, f) => {
      const p = W("CloseButton");
      return o(), r("div", {
        id: c.id,
        class: "relative z-10",
        "aria-labelledby": c.id + "-title",
        role: "dialog",
        "aria-modal": "true"
      }, [
        _v,
        l("div", $v, [
          l("div", {
            onMousedown: d,
            class: "absolute inset-0 overflow-hidden"
          }, [
            l("div", {
              onMousedown: f[0] || (f[0] = qe(() => {
              }, ["stop"])),
              class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
            }, [
              l("div", {
                class: b(["panel pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", a.value])
              }, [
                l("div", Cv, [
                  l("div", xv, [
                    l("div", Lv, [
                      l("div", Vv, [
                        l("div", Sv, [
                          l("div", Mv, [
                            c.$slots.title ? (o(), r("div", Av, [
                              K(c.$slots, "title")
                            ])) : x("", !0),
                            c.title ? (o(), r("h2", {
                              key: 1,
                              class: "text-lg font-medium text-gray-900 dark:text-gray-50",
                              id: c.id + "-title"
                            }, j(c.title), 9, Tv)) : x("", !0),
                            c.$slots.subtitle ? (o(), r("p", Fv, [
                              K(c.$slots, "subtitle")
                            ])) : x("", !0)
                          ]),
                          l("div", Iv, [
                            xe(p, {
                              "button-class": "bg-gray-50 dark:bg-gray-900",
                              onClose: d
                            })
                          ])
                        ])
                      ]),
                      l("div", {
                        class: b(c.contentClass)
                      }, [
                        K(c.$slots, "default")
                      ], 2)
                    ])
                  ]),
                  c.$slots.footer ? (o(), r("div", Dv, [
                    K(c.$slots, "footer")
                  ])) : x("", !0)
                ])
              ], 2)
            ], 32)
          ], 32)
        ])
      ], 8, kv);
    };
  }
}), Ov = ["id", "data-transition-for", "aria-labelledby"], Pv = { class: "fixed inset-0 z-10 overflow-y-auto" }, Bv = { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, Rv = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), Ev = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Hv = [
  Rv,
  Ev
], zv = /* @__PURE__ */ ce({
  __name: "ModalDialog",
  props: {
    id: { default: "ModalDialog" },
    modalClass: { default: sl.modalClass },
    sizeClass: { default: sl.sizeClass }
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = t, n = I(!1), a = I(""), i = {
      entering: { cls: "ease-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100", to: "opacity-0" }
    }, d = I(""), u = {
      entering: { cls: "ease-out duration-300", from: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", to: "opacity-100 translate-y-0 sm:scale-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100 translate-y-0 sm:scale-100", to: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" }
    };
    Vt(n, () => {
      xt(i, a, n.value), xt(u, d, n.value), n.value || setTimeout(() => s("done"), 200);
    }), n.value = !0;
    const c = () => n.value = !1;
    ts("ModalProvider", {
      openModal: m
    });
    const p = I(), $ = I();
    function m(w, O) {
      p.value = w, $.value = O;
    }
    async function k(w) {
      $.value && $.value(w), p.value = void 0, $.value = void 0;
    }
    const g = (w) => {
      w.key === "Escape" && c();
    };
    return st(() => window.addEventListener("keydown", g)), Ht(() => window.removeEventListener("keydown", g)), (w, O) => {
      var ae;
      const H = W("ModalLookup");
      return o(), r("div", {
        id: w.id,
        "data-transition-for": w.id,
        onMousedown: c,
        class: "relative z-10",
        "aria-labelledby": `${w.id}-title`,
        role: "dialog",
        "aria-modal": "true"
      }, [
        l("div", {
          class: b(["fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", a.value])
        }, null, 2),
        l("div", Pv, [
          l("div", Bv, [
            l("div", {
              class: b([w.modalClass, w.sizeClass, d.value]),
              onMousedown: O[0] || (O[0] = qe(() => {
              }, ["stop"]))
            }, [
              l("div", null, [
                l("div", { class: "hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10" }, [
                  l("button", {
                    type: "button",
                    onClick: c,
                    class: "bg-white dark:bg-black rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"
                  }, Hv)
                ]),
                K(w.$slots, "default")
              ])
            ], 34)
          ])
        ]),
        ((ae = p.value) == null ? void 0 : ae.name) == "ModalLookup" && p.value.ref ? (o(), oe(H, {
          key: 0,
          "ref-info": p.value.ref,
          onDone: k
        }, null, 8, ["ref-info"])) : x("", !0)
      ], 40, Ov);
    };
  }
}), Nv = {
  class: "pt-2 overflow-auto",
  style: { "min-height": "620px" }
}, Uv = { class: "mt-3 pl-5 flex flex-wrap items-center" }, qv = { class: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3" }, Qv = { class: "hidden md:inline" }, Kv = { class: "flex pb-1 sm:pb-0" }, Zv = ["title"], Gv = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("g", {
    "stroke-width": "1.5",
    fill: "none"
  }, [
    /* @__PURE__ */ l("path", {
      d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18",
      stroke: "currentColor"
    })
  ])
], -1), Wv = [
  Gv
], Jv = ["disabled"], Xv = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), Yv = [
  Xv
], ep = ["disabled"], tp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), sp = [
  tp
], lp = ["disabled"], np = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), op = [
  np
], ap = ["disabled"], rp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), ip = [
  rp
], up = {
  key: 0,
  class: "flex pb-1 sm:pb-0"
}, dp = { class: "px-4 text-lg text-black dark:text-white" }, cp = { key: 0 }, fp = { key: 1 }, vp = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), pp = { key: 2 }, mp = {
  key: 1,
  class: "pl-2"
}, hp = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), gp = [
  hp
], yp = { class: "flex pb-1 sm:pb-0" }, bp = {
  key: 0,
  class: "pl-2"
}, wp = /* @__PURE__ */ l("svg", {
  class: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
    "clip-rule": "evenodd"
  })
], -1), kp = { class: "mr-1" }, _p = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, $p = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), Cp = [
  $p
], xp = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Lp = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), Vp = [
  Lp
], Sp = { key: 1 }, Mp = { key: 4 }, Ap = { key: 0 }, Tp = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, Fp = { class: "mr-1 select-none" }, Ip = {
  key: 1,
  class: "flex justify-between items-center"
}, Dp = { class: "mr-1 select-none" }, tn = 25, jp = /* @__PURE__ */ ce({
  __name: "ModalLookup",
  props: {
    id: { default: "ModalLookup" },
    refInfo: {},
    skip: { default: 0 },
    prefs: {},
    selectedColumns: {},
    allowFiltering: { type: [Boolean, null], default: !0 },
    showPreferences: { type: [Boolean, null], default: !0 },
    showPagingNav: { type: [Boolean, null], default: !0 },
    showPagingInfo: { type: [Boolean, null], default: !0 },
    showResetPreferences: { type: [Boolean, null], default: !0 },
    showFiltersView: { type: [Boolean, null], default: !0 },
    toolbarButtonClass: {},
    canFilter: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = ol(), { config: i } = Mt(), { metadataApi: d, filterDefinitions: u } = rt(), c = Ue("client"), f = i.value.storage, p = v(() => s.toolbarButtonClass ?? he.toolbarButtonClass), $ = v(() => u.value), m = I({ take: tn }), k = I(new Xe()), g = I(s.skip), w = I(!1), O = I(), H = (B) => typeof B == "string" ? B.split(",") : B || [];
    function ae(B, q) {
      return he.getTableRowClass("fullWidth", q, !1, !0);
    }
    function F() {
      let B = H(s.selectedColumns);
      return B.length > 0 ? B : [];
    }
    const T = v(() => at(s.refInfo.model)), A = v(() => {
      let q = F().map((ye) => ye.toLowerCase());
      const le = tt(T.value);
      return q.length > 0 ? q.map((ye) => le.find(($e) => $e.name.toLowerCase() === ye)).filter((ye) => ye != null) : le;
    }), ue = v(() => {
      let B = A.value.map((le) => le.name), q = H(m.value.selectedColumns).map((le) => le.toLowerCase());
      return q.length > 0 ? B.filter((le) => q.includes(le.toLowerCase())) : B;
    }), V = v(() => m.value.take ?? tn), z = v(() => k.value.response ? we(k.value.response, "results") : []), Q = v(() => {
      var B;
      return ((B = k.value.response) == null ? void 0 : B.total) ?? z.value.length ?? 0;
    }), te = v(() => g.value > 0), R = v(() => g.value > 0), Z = v(() => z.value.length >= V.value), J = v(() => z.value.length >= V.value), U = I([]), M = v(() => U.value.some((B) => B.settings.filters.length > 0 || !!B.settings.sort)), Y = v(() => U.value.map((B) => B.settings.filters.length).reduce((B, q) => B + q, 0)), y = v(() => ls(T.value)), N = v(() => {
      var B;
      return (B = d.value) == null ? void 0 : B.operations.find((q) => {
        var le;
        return ((le = q.dataModel) == null ? void 0 : le.name) == s.refInfo.model && Ne.isAnyQuery(q);
      });
    }), E = I(), h = I(!1), C = I(), G = () => `${s.id}/ApiPrefs/${s.refInfo.model}`, X = (B) => `Column/${s.id}:${s.refInfo.model}.${B}`;
    async function se(B) {
      g.value += B, g.value < 0 && (g.value = 0);
      var q = Math.floor(Q.value / V.value) * V.value;
      g.value > q && (g.value = q), await de();
    }
    async function D(B, q) {
      n("done", B);
    }
    function L() {
      n("done", null);
    }
    function fe(B, q) {
      var ye, $e, Me;
      let le = q.target;
      if ((le == null ? void 0 : le.tagName) !== "TD") {
        let Re = (ye = le == null ? void 0 : le.closest("TABLE")) == null ? void 0 : ye.getBoundingClientRect(), Te = U.value.find((Oe) => Oe.name.toLowerCase() == B.toLowerCase());
        if (Te && Re) {
          let Oe = 318, Ge = ((($e = q.target) == null ? void 0 : $e.tagName) === "DIV" ? q.target : (Me = q.target) == null ? void 0 : Me.closest("DIV")).getBoundingClientRect(), Ee = Oe + 25;
          C.value = {
            column: Te,
            topLeft: {
              x: Math.max(Math.floor(Ge.x + 25), Ee),
              y: Math.floor(115)
            }
          };
        }
      }
    }
    function pe() {
      C.value = null;
    }
    async function ie(B) {
      var le;
      let q = (le = C.value) == null ? void 0 : le.column;
      q && (q.settings = B, f.setItem(X(q.name), JSON.stringify(q.settings)), await de()), C.value = null;
    }
    async function me(B) {
      f.setItem(X(B.name), JSON.stringify(B.settings)), await de();
    }
    async function S(B) {
      h.value = !1, m.value = B, f.setItem(G(), JSON.stringify(B)), await de();
    }
    async function de() {
      await Ve(Se());
    }
    async function Ve(B) {
      const q = N.value;
      if (!q) {
        console.error(`No Query API was found for ${s.refInfo.model}`);
        return;
      }
      let le = Xt(q, B), ye = un((Re) => {
        k.value.response = k.value.error = void 0, w.value = Re;
      }), $e = await c.api(le);
      ye(), _t(() => k.value = $e);
      let Me = we($e.response, "results") || [];
      !$e.succeeded || Me.label == 0;
    }
    function Se() {
      let B = {
        include: "total",
        take: V.value
      }, q = H(m.value.selectedColumns || s.selectedColumns);
      if (q.length > 0) {
        let ye = y.value;
        ye && q.includes(ye.name) && (q = [ye.name, ...q]), B.fields = q.join(",");
      }
      let le = [];
      return U.value.forEach((ye) => {
        ye.settings.sort && le.push((ye.settings.sort === "DESC" ? "-" : "") + ye.name), ye.settings.filters.forEach(($e) => {
          let Me = $e.key.replace("%", ye.name);
          B[Me] = $e.value;
        });
      }), typeof B.skip > "u" && g.value > 0 && (B.skip = g.value), le.length > 0 && (B.orderBy = le.join(",")), B;
    }
    async function ge() {
      U.value.forEach((B) => {
        B.settings = { filters: [] }, f.removeItem(X(B.name));
      }), await de();
    }
    return st(async () => {
      const B = s.prefs || _s(f.getItem(G()));
      B && (m.value = B), U.value = A.value.map((q) => ({
        name: q.name,
        type: q.type,
        meta: q,
        settings: Object.assign(
          {
            filters: []
          },
          _s(f.getItem(X(q.name)))
        )
      })), isNaN(s.skip) || (g.value = s.skip), await de();
    }), (B, q) => {
      const le = W("ErrorSummary"), ye = W("Loading"), $e = W("SettingsIcons"), Me = W("DataGrid"), Re = W("ModalDialog");
      return o(), r(Ie, null, [
        B.refInfo ? (o(), oe(Re, {
          key: 0,
          ref_key: "modalDialog",
          ref: E,
          id: B.id,
          onDone: L
        }, {
          default: Ce(() => [
            l("div", Nv, [
              l("div", Uv, [
                l("h3", qv, [
                  _e(" Select "),
                  l("span", Qv, j(ee(ze)(B.refInfo.model)), 1)
                ]),
                l("div", Kv, [
                  B.showPreferences ? (o(), r("button", {
                    key: 0,
                    type: "button",
                    class: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                    title: `${B.refInfo.model} Preferences`,
                    onClick: q[0] || (q[0] = (Te) => h.value = !h.value)
                  }, Wv, 8, Zv)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 1,
                    type: "button",
                    class: b(["pl-2", te.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "First page",
                    disabled: !te.value,
                    onClick: q[1] || (q[1] = (Te) => se(-Q.value))
                  }, Yv, 10, Jv)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 2,
                    type: "button",
                    class: b(["pl-2", R.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Previous page",
                    disabled: !R.value,
                    onClick: q[2] || (q[2] = (Te) => se(-V.value))
                  }, sp, 10, ep)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 3,
                    type: "button",
                    class: b(["pl-2", Z.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Next page",
                    disabled: !Z.value,
                    onClick: q[3] || (q[3] = (Te) => se(V.value))
                  }, op, 10, lp)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 4,
                    type: "button",
                    class: b(["pl-2", J.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Last page",
                    disabled: !J.value,
                    onClick: q[4] || (q[4] = (Te) => se(Q.value))
                  }, ip, 10, ap)) : x("", !0)
                ]),
                B.showPagingInfo ? (o(), r("div", up, [
                  l("div", dp, [
                    w.value ? (o(), r("span", cp, "Querying...")) : x("", !0),
                    z.value.length ? (o(), r("span", fp, [
                      vp,
                      _e(" " + j(g.value + 1) + " - " + j(Math.min(g.value + z.value.length, Q.value)) + " ", 1),
                      l("span", null, " of " + j(Q.value), 1)
                    ])) : k.value.completed ? (o(), r("span", pp, "No Results")) : x("", !0)
                  ])
                ])) : x("", !0),
                M.value && B.showResetPreferences ? (o(), r("div", mp, [
                  l("button", {
                    type: "button",
                    onClick: ge,
                    title: "Reset Preferences & Filters",
                    class: b(p.value)
                  }, gp, 2)
                ])) : x("", !0),
                l("div", yp, [
                  B.showFiltersView && Y.value > 0 ? (o(), r("div", bp, [
                    l("button", {
                      type: "button",
                      onClick: q[5] || (q[5] = (Te) => O.value = O.value == "filters" ? null : "filters"),
                      class: b(p.value),
                      "aria-expanded": "false"
                    }, [
                      wp,
                      l("span", kp, j(Y.value) + " " + j(Y.value == 1 ? "Filter" : "Filters"), 1),
                      O.value != "filters" ? (o(), r("svg", _p, Cp)) : (o(), r("svg", xp, Vp))
                    ], 2)
                  ])) : x("", !0)
                ])
              ]),
              O.value == "filters" ? (o(), oe(Fl, {
                key: 0,
                class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
                definitions: $.value,
                columns: U.value,
                onDone: q[6] || (q[6] = (Te) => O.value = null),
                onChange: me
              }, null, 8, ["definitions", "columns"])) : x("", !0),
              C.value ? (o(), r("div", Sp, [
                xe(Tl, {
                  definitions: $.value,
                  column: C.value.column,
                  "top-left": C.value.topLeft,
                  onDone: pe,
                  onSave: ie
                }, null, 8, ["definitions", "column", "top-left"])
              ])) : x("", !0),
              k.value.error ? (o(), oe(le, {
                key: 2,
                status: k.value.error
              }, null, 8, ["status"])) : w.value ? (o(), oe(ye, { key: 3 })) : (o(), r("div", Mp, [
                z.value.length ? (o(), r("div", Ap, [
                  xe(Me, {
                    id: B.id,
                    items: z.value,
                    type: B.refInfo.model,
                    "selected-columns": ue.value,
                    onFiltersChanged: de,
                    tableStyle: "fullWidth",
                    rowClass: ae,
                    onRowSelected: D,
                    onHeaderSelected: fe
                  }, al({
                    header: Ce(({ column: Te, label: Oe }) => {
                      var je;
                      return [
                        B.allowFiltering && (!s.canFilter || s.canFilter(Te)) ? (o(), r("div", Tp, [
                          l("span", Fp, j(Oe), 1),
                          xe($e, {
                            column: U.value.find((Ge) => Ge.name.toLowerCase() === Te.toLowerCase()),
                            "is-open": ((je = C.value) == null ? void 0 : je.column.name) === Te
                          }, null, 8, ["column", "is-open"])
                        ])) : (o(), r("div", Ip, [
                          l("span", Dp, j(Oe), 1)
                        ]))
                      ];
                    }),
                    _: 2
                  }, [
                    De(Object.keys(ee(a)), (Te) => ({
                      name: Te,
                      fn: Ce((Oe) => [
                        K(B.$slots, Te, Ot(ws(Oe)))
                      ])
                    }))
                  ]), 1032, ["id", "items", "type", "selected-columns"])
                ])) : x("", !0)
              ]))
            ])
          ]),
          _: 3
        }, 8, ["id"])) : x("", !0),
        h.value ? (o(), oe(Il, {
          key: 1,
          columns: A.value,
          prefs: m.value,
          onDone: q[7] || (q[7] = (Te) => h.value = !1),
          onSave: S
        }, null, 8, ["columns", "prefs"])) : x("", !0)
      ], 64);
    };
  }
}), Op = { class: "sm:hidden" }, Pp = ["for"], Bp = ["id", "name"], Rp = ["value"], Ep = { class: "hidden sm:block" }, Hp = { class: "border-b border-gray-200" }, zp = {
  class: "-mb-px flex",
  "aria-label": "Tabs"
}, Np = ["onClick"], Up = /* @__PURE__ */ ce({
  __name: "Tabs",
  props: {
    tabs: {},
    id: { default: "tabs" },
    param: { default: "tab" },
    label: { type: Function, default: (e) => ze(e) },
    selected: {},
    tabClass: {},
    bodyClass: { default: "p-4" },
    url: { type: Boolean, default: !0 },
    clearQuery: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, s = v(() => Object.keys(t.tabs)), n = (p) => t.label ? t.label(p) : ze(p), a = v(() => t.id || "tabs"), i = v(() => t.param || "tab"), d = I();
    function u(p) {
      if (d.value = p, t.url) {
        const $ = s.value[0];
        il({ tab: p === $ ? void 0 : p }, t.clearQuery);
      }
    }
    function c(p) {
      return d.value === p;
    }
    const f = v(() => `${100 / Object.keys(t.tabs).length}%`);
    return st(() => {
      if (d.value = t.selected || Object.keys(t.tabs)[0], t.url) {
        const p = location.search ? location.search : location.hash.includes("?") ? "?" + ps(location.hash, "?") : "", m = Ks(p)[i.value];
        m && (d.value = m);
      }
    }), (p, $) => (o(), r("div", null, [
      l("div", Op, [
        l("label", {
          for: a.value,
          class: "sr-only"
        }, "Select a tab", 8, Pp),
        l("select", {
          id: a.value,
          name: a.value,
          class: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          onChange: $[0] || ($[0] = (m) => {
            var k;
            return u((k = m.target) == null ? void 0 : k.value);
          })
        }, [
          (o(!0), r(Ie, null, De(s.value, (m) => (o(), r("option", {
            key: m,
            value: m
          }, j(n(m)), 9, Rp))), 128))
        ], 40, Bp)
      ]),
      l("div", Ep, [
        l("div", Hp, [
          l("nav", zp, [
            (o(!0), r(Ie, null, De(s.value, (m) => (o(), r("a", {
              href: "#",
              onClick: qe((k) => u(m), ["prevent"]),
              style: ll({ width: f.value }),
              class: b([c(m) ? "border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm", p.tabClass])
            }, j(n(m)), 15, Np))), 256))
          ])
        ])
      ]),
      l("div", {
        class: b(p.bodyClass)
      }, [
        (o(), oe(nn(p.tabs[d.value])))
      ], 2)
    ]));
  }
}), qp = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-gray-400",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"
  })
], -1), Qp = [
  qp
], Kp = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-indigo-600",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
  })
], -1), Zp = [
  Kp
], Gp = /* @__PURE__ */ ce({
  __name: "DarkModeToggle",
  setup(e) {
    const t = typeof document < "u" ? document.documentElement : null, s = () => !!(t != null && t.classList.contains("dark")), n = I(localStorage.getItem("color-scheme") == "dark");
    function a() {
      s() ? t == null || t.classList.remove("dark") : t == null || t.classList.add("dark"), n.value = s(), localStorage.setItem("color-scheme", n.value ? "dark" : "light");
    }
    return (i, d) => (o(), r("button", {
      type: "button",
      class: "bg-gray-200 dark:bg-gray-700 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black",
      role: "switch",
      "aria-checked": "false",
      onClick: d[0] || (d[0] = (u) => a())
    }, [
      l("span", {
        class: b(`${n.value ? "translate-x-0" : "translate-x-5"} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-black shadow transform ring-0 transition ease-in-out duration-200`)
      }, [
        l("span", {
          class: b(`${n.value ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, Qp, 2),
        l("span", {
          class: b(`${n.value ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, Zp, 2)
      ], 2)
    ]));
  }
}), Wp = { key: 0 }, Jp = {
  key: 1,
  class: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
}, Xp = { class: "sm:mx-auto sm:w-full sm:max-w-md" }, Yp = { class: "mt-6 text-center text-3xl font-extrabold text-gray-900" }, e1 = {
  key: 0,
  class: "mt-4 text-center text-sm text-gray-600"
}, t1 = { class: "relative z-0 inline-flex shadow-sm rounded-md" }, s1 = ["onClick"], l1 = { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-md" }, n1 = { class: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" }, o1 = { class: "mt-8" }, a1 = {
  key: 1,
  class: "mt-6"
}, r1 = /* @__PURE__ */ Cs('<div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500"> Or continue with </span></div></div>', 1), i1 = { class: "mt-6 grid grid-cols-3 gap-3" }, u1 = ["href", "title"], d1 = {
  key: 1,
  class: "h-5 w-5 text-gray-700",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
}, c1 = /* @__PURE__ */ l("path", {
  d: "M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z",
  fill: "currentColor"
}, null, -1), f1 = /* @__PURE__ */ l("path", {
  d: "M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z",
  fill: "currentColor"
}, null, -1), v1 = [
  c1,
  f1
], p1 = /* @__PURE__ */ ce({
  __name: "SignIn",
  props: {
    provider: {},
    title: { default: "Sign In" },
    tabs: { type: [Boolean, String], default: !0 },
    oauth: { type: [Boolean, String], default: !0 }
  },
  emits: ["login"],
  setup(e, { emit: t }) {
    const s = e, n = t, { getMetadata: a, createDto: i } = rt(), d = js(), u = Ue("client"), { signIn: c } = Al(), f = a({ assert: !0 }), p = f.plugins.auth, $ = document.baseURI, m = f.app.baseUrl, k = I(i("Authenticate")), g = I(new Xe()), w = I(s.provider);
    st(() => {
      p == null || p.authProviders.map((R) => R.formLayout).filter((R) => R).forEach((R) => R.forEach(
        (Z) => k.value[Z.id] = Z.type === "checkbox" ? !1 : ""
      ));
    });
    const O = v(() => (p == null ? void 0 : p.authProviders.filter((R) => R.formLayout)) || []), H = v(() => O.value[0] || {}), ae = v(() => O.value[Math.max(O.value.length - 1, 0)] || {}), F = v(() => (w.value ? p == null ? void 0 : p.authProviders.find((R) => R.name === w.value) : null) ?? H.value), T = (R) => R === !1 || R === "false";
    function A(R) {
      return R.label || R.navItem && R.navItem.label;
    }
    const ue = v(() => {
      var R;
      return (((R = F.value) == null ? void 0 : R.formLayout) || []).map((Z) => {
        var J, U;
        return Object.assign({}, Z, {
          type: (J = Z.type) == null ? void 0 : J.toLowerCase(),
          autocomplete: Z.autocomplete || (((U = Z.type) == null ? void 0 : U.toLowerCase()) === "password" ? "current-password" : void 0) || (Z.id.toLowerCase() === "username" ? "username" : void 0),
          css: Object.assign({ field: "col-span-12" }, Z.css)
        });
      });
    }), V = v(() => T(s.oauth) ? [] : (p == null ? void 0 : p.authProviders.filter((R) => R.type === "oauth")) || []), z = v(() => {
      let R = Do(
        p == null ? void 0 : p.authProviders.filter((J) => J.formLayout && J.formLayout.length > 0),
        (J, U) => {
          let M = A(U) || ot(U.name);
          J[M] = U.name === H.value.name ? "" : U.name;
        }
      );
      const Z = F.value;
      return Z && T(s.tabs) && (R = { [A(Z) || ot(Z.name)]: Z }), R;
    }), Q = v(() => {
      let R = ue.value.map((Z) => Z.id).filter((Z) => Z);
      return g.value.summaryMessage(R);
    });
    async function te() {
      if (k.value.provider = F.value.name, F.value.name === "authsecret" ? (u.headers.set("authsecret", k.value.authsecret), k.value = i("Authenticate")) : F.value.name === "basic" ? (u.setCredentials(k.value.UserName, k.value.Password), k.value = i("Authenticate"), k.value.UserName = null, k.value.Password = null) : (F.value.type === "Bearer" || F.value.name === "jwt") && (u.bearerToken = k.value.BearerToken, k.value = i("Authenticate")), g.value = await d.api(k.value), g.value.succeeded) {
        const R = g.value.response;
        c(R), n("login", R), g.value = new Xe(), k.value = i("Authenticate");
      }
    }
    return (R, Z) => {
      const J = W("ErrorSummary"), U = W("AutoFormFields"), M = W("PrimaryButton"), Y = W("Icon"), y = yo("href");
      return ee(p) ? (o(), r("div", Jp, [
        l("div", Xp, [
          l("h2", Yp, j(R.title), 1),
          Object.keys(z.value).length > 1 ? (o(), r("p", e1, [
            l("span", t1, [
              (o(!0), r(Ie, null, De(z.value, (N, E) => $t((o(), r("a", {
                onClick: (h) => w.value = N,
                class: b([
                  N === "" || N === H.value.name ? "rounded-l-md" : N === ae.value.name ? "rounded-r-md -ml-px" : "-ml-px",
                  w.value === N ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : "",
                  "cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                ])
              }, [
                _e(j(E), 1)
              ], 10, s1)), [
                [y, { provider: N }]
              ])), 256))
            ])
          ])) : x("", !0)
        ]),
        l("div", l1, [
          Q.value ? (o(), oe(J, {
            key: 0,
            class: "mb-3",
            errorSummary: Q.value
          }, null, 8, ["errorSummary"])) : x("", !0),
          l("div", n1, [
            ue.value.length ? (o(), r("form", {
              key: 0,
              onSubmit: qe(te, ["prevent"])
            }, [
              xe(U, {
                modelValue: k.value,
                formLayout: ue.value,
                api: g.value,
                hideSummary: !0,
                "divide-class": "",
                "space-class": "space-y-6"
              }, null, 8, ["modelValue", "formLayout", "api"]),
              l("div", o1, [
                xe(M, { class: "w-full" }, {
                  default: Ce(() => [
                    _e("Sign In")
                  ]),
                  _: 1
                })
              ])
            ], 32)) : x("", !0),
            V.value.length ? (o(), r("div", a1, [
              r1,
              l("div", i1, [
                (o(!0), r(Ie, null, De(V.value, (N) => (o(), r("div", null, [
                  l("a", {
                    href: ee(m) + N.navItem.href + "?continue=" + ee($),
                    title: A(N),
                    class: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  }, [
                    N.icon ? (o(), oe(Y, {
                      key: 0,
                      image: N.icon,
                      class: "h-5 w-5 text-gray-700"
                    }, null, 8, ["image"])) : (o(), r("svg", d1, v1))
                  ], 8, u1)
                ]))), 256))
              ])
            ])) : x("", !0)
          ])
        ])
      ])) : (o(), r("div", Wp, "No Auth Plugin"));
    };
  }
}), m1 = ["for"], h1 = {
  key: 1,
  class: "border border-gray-200 flex justify-between"
}, g1 = { class: "p-2 flex flex-wrap gap-x-4" }, y1 = /* @__PURE__ */ l("title", null, "Bold text (CTRL+B)", -1), b1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
}, null, -1), w1 = [
  y1,
  b1
], k1 = /* @__PURE__ */ l("title", null, "Italics (CTRL+I)", -1), _1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"
}, null, -1), $1 = [
  k1,
  _1
], C1 = /* @__PURE__ */ l("title", null, "Insert Link (CTRL+K)", -1), x1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z"
}, null, -1), L1 = [
  C1,
  x1
], V1 = /* @__PURE__ */ l("title", null, "Blockquote (CTRL+Q)", -1), S1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z"
}, null, -1), M1 = [
  V1,
  S1
], A1 = /* @__PURE__ */ l("title", null, "Insert Image (CTRL+SHIFT+L)", -1), T1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"
}, null, -1), F1 = [
  A1,
  T1
], I1 = /* @__PURE__ */ l("title", null, "Insert Code (CTRL+<)", -1), D1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z"
}, null, -1), j1 = [
  I1,
  D1
], O1 = /* @__PURE__ */ l("title", null, "H2 Heading (CTRL+H)", -1), P1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z"
}, null, -1), B1 = [
  O1,
  P1
], R1 = /* @__PURE__ */ l("title", null, "Numbered List (ALT+1)", -1), E1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z"
}, null, -1), H1 = [
  R1,
  E1
], z1 = /* @__PURE__ */ l("title", null, "Bulleted List (ALT+-)", -1), N1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z"
}, null, -1), U1 = [
  z1,
  N1
], q1 = /* @__PURE__ */ l("title", null, "Strike Through (ALT+S)", -1), Q1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"
}, null, -1), K1 = [
  q1,
  Q1
], Z1 = /* @__PURE__ */ l("title", null, "Undo (CTRL+Z)", -1), G1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
}, null, -1), W1 = [
  Z1,
  G1
], J1 = /* @__PURE__ */ l("title", null, "Redo (CTRL+SHIFT+Z)", -1), X1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"
}, null, -1), Y1 = [
  J1,
  X1
], em = {
  key: 0,
  class: "p-2 flex flex-wrap gap-x-4"
}, tm = ["href"], sm = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z"
}, null, -1), lm = [
  sm
], nm = { class: "" }, om = ["name", "id", "label", "value", "rows", "disabled"], am = ["id"], rm = ["id"], Je = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400", im = /* @__PURE__ */ ce({
  __name: "MarkdownInput",
  props: {
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {},
    counter: { type: Boolean },
    rows: {},
    errorMessages: {},
    lang: {},
    autoFocus: { type: Boolean },
    disabled: { type: Boolean },
    helpUrl: { default: "https://guides.github.com/features/mastering-markdown/" },
    hide: {}
  },
  emits: ["update:modelValue", "close"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s;
    let i = [], d = [], u = Ue("ApiState", void 0);
    const c = v(() => pt.call({ responseStatus: n.status ?? (u == null ? void 0 : u.error.value) }, n.id)), f = v(() => n.label ?? ze(ot(n.id))), p = "bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help".split(","), $ = v(() => n.hide ? kt(p, n.hide) : kt(p, []));
    function m(h) {
      return $.value[h];
    }
    const k = v(() => ["shadow-sm font-mono" + nt.base.replace("rounded-md", ""), c.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + nt.valid, n.inputClass]), g = I();
    t({ props: n, textarea: g, updateModelValue: w, selection: H, hasSelection: O, selectionInfo: ae, insert: T, replace: F });
    function w(h) {
      a("update:modelValue", h);
    }
    function O() {
      return g.value.selectionStart !== g.value.selectionEnd;
    }
    function H() {
      const h = g.value;
      return h.value.substring(h.selectionStart, h.selectionEnd) || "";
    }
    function ae() {
      const h = g.value, C = h.value, G = h.selectionStart, X = C.substring(G, h.selectionEnd) || "", se = C.substring(0, G), D = se.lastIndexOf(`
`);
      return {
        value: C,
        sel: X,
        selPos: G,
        beforeSel: se,
        afterSel: C.substring(G),
        prevCRPos: D,
        beforeCR: D >= 0 ? se.substring(0, D + 1) : "",
        afterCR: D >= 0 ? se.substring(D + 1) : ""
      };
    }
    function F({ value: h, selectionStart: C, selectionEnd: G }) {
      G == null && (G = C), w(h), _t(() => {
        g.value.focus(), g.value.setSelectionRange(C, G);
      });
    }
    function T(h, C, G = "", { selectionAtEnd: X, offsetStart: se, offsetEnd: D, filterValue: L, filterSelection: fe } = {}) {
      const pe = g.value;
      let ie = pe.value, me = pe.selectionEnd;
      i.push({ value: ie, selectionStart: pe.selectionStart, selectionEnd: pe.selectionEnd }), d = [];
      const S = pe.selectionStart, de = pe.selectionEnd;
      let Ve = ie.substring(0, S), Se = ie.substring(de);
      const ge = h && Ve.endsWith(h) && Se.startsWith(C);
      if (S == de) {
        if (ge ? (ie = Ve.substring(0, Ve.length - h.length) + Se.substring(C.length), me += -C.length) : (ie = Ve + h + G + C + Se, me += h.length, se = 0, D = (G == null ? void 0 : G.length) || 0, X && (me += D, D = 0)), L) {
          var q = { pos: me };
          ie = L(ie, q), me = q.pos;
        }
      } else {
        var le = ie.substring(S, de);
        fe && (le = fe(le)), ge ? (ie = Ve.substring(0, Ve.length - h.length) + le + Se.substring(C.length), se = -le.length - h.length, D = le.length) : (ie = Ve + h + le + C + Se, se ? me += (h + C).length : (me = S, se = h.length, D = le.length));
      }
      w(ie), _t(() => {
        pe.focus(), se = me + (se || 0), D = (se || 0) + (D || 0), pe.setSelectionRange(se, D);
      });
    }
    const A = () => T("**", "**", "bold"), ue = () => T("_", "_", "italics"), V = () => T("~~", "~~", "strikethrough"), z = () => T("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), Q = () => T(`
> `, `
`, "Blockquote", {}), te = () => T("![](", ")");
    function R(h) {
      const C = H();
      if (C && !h.shiftKey)
        T("`", "`", "code");
      else {
        const G = n.lang || "js";
        C.indexOf(`
`) === -1 ? T("\n```" + G + `
`, "\n```\n", "// code") : T("```" + G + `
`, "```\n", "");
      }
    }
    function Z() {
      if (O()) {
        let { sel: h, selPos: C, beforeSel: G, afterSel: X, prevCRPos: se, beforeCR: D, afterCR: L } = ae();
        if (h.indexOf(`
`) === -1)
          T(`
 1. `, `
`);
        else if (!h.startsWith(" 1. ")) {
          let ie = 1;
          T("", "", " - ", {
            selectionAtEnd: !0,
            filterSelection: (me) => " 1. " + me.replace(/\n$/, "").replace(/\n/g, (S) => `
 ${++ie}. `) + `
`
          });
        } else
          T("", "", "", {
            filterValue: (ie, me) => {
              if (se >= 0) {
                let S = L.replace(/^ - /, "");
                G = D + S, me.pos -= L.length - S.length;
              }
              return G + X;
            },
            filterSelection: (ie) => ie.replace(/^ 1. /g, "").replace(/\n \d+. /g, `
`)
          });
      } else
        T(`
 1. `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function J() {
      if (O()) {
        let { sel: h, selPos: C, beforeSel: G, afterSel: X, prevCRPos: se, beforeCR: D, afterCR: L } = ae();
        h.indexOf(`
`) === -1 ? T(`
 - `, `
`) : !h.startsWith(" - ") ? T("", "", " - ", {
          selectionAtEnd: !0,
          filterSelection: (ie) => " - " + ie.replace(/\n$/, "").replace(/\n/g, `
 - `) + `
`
        }) : T("", "", "", {
          filterValue: (ie, me) => {
            if (se >= 0) {
              let S = L.replace(/^ - /, "");
              G = D + S, me.pos -= L.length - S.length;
            }
            return G + X;
          },
          filterSelection: (ie) => ie.replace(/^ - /g, "").replace(/\n - /g, `
`)
        });
      } else
        T(`
 - `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function U() {
      const h = H(), C = h.indexOf(`
`) === -1;
      h ? C ? T(`
## `, `
`, "") : T("## ", "", "") : T(`
## `, `
`, "Heading", { offsetStart: -8, offsetEnd: 7 });
    }
    function M() {
      let { sel: h, selPos: C, beforeSel: G, afterSel: X, prevCRPos: se, beforeCR: D, afterCR: L } = ae();
      !h.startsWith("//") && !L.startsWith("//") ? h ? T("", "", "//", {
        selectionAtEnd: !0,
        filterSelection: (pe) => "//" + pe.replace(/\n$/, "").replace(/\n/g, `
//`) + `
`
      }) : F({
        value: D + "//" + L + X,
        selectionStart: C + 2
      }) : T("", "", "", {
        filterValue: (pe, ie) => {
          if (se >= 0) {
            let me = L.replace(/^\/\//, "");
            G = D + me, ie.pos -= L.length - me.length;
          }
          return G + X;
        },
        filterSelection: (pe) => pe.replace(/^\/\//g, "").replace(/\n\/\//g, `
`)
      });
    }
    const Y = () => T(`/*
`, `*/
`, "");
    function y() {
      if (i.length === 0)
        return !1;
      const h = g.value, C = i.pop();
      return d.push({ value: h.value, selectionStart: h.selectionStart, selectionEnd: h.selectionEnd }), F(C), !0;
    }
    function N() {
      if (d.length === 0)
        return !1;
      const h = g.value, C = d.pop();
      return i.push({ value: h.value, selectionStart: h.selectionStart, selectionEnd: h.selectionEnd }), F(C), !0;
    }
    const E = () => null;
    return st(() => {
      i = [], d = [];
      const h = g.value;
      h.onkeydown = (C) => {
        if (C.key === "Escape" || C.keyCode === 27) {
          a("close");
          return;
        }
        const G = String.fromCharCode(C.keyCode).toLowerCase();
        G === "	" ? (!C.shiftKey ? T("", "", "    ", {
          selectionAtEnd: !0,
          filterSelection: (se) => "    " + se.replace(/\n$/, "").replace(/\n/g, `
    `) + `
`
        }) : T("", "", "", {
          filterValue: (se, D) => {
            let { selPos: L, beforeSel: fe, afterSel: pe, prevCRPos: ie, beforeCR: me, afterCR: S } = ae();
            if (ie >= 0) {
              let de = S.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
              fe = me + de, D.pos -= S.length - de.length;
            }
            return fe + pe;
          },
          filterSelection: (se) => se.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
        }), C.preventDefault()) : C.ctrlKey ? G === "z" ? C.shiftKey ? N() && C.preventDefault() : y() && C.preventDefault() : G === "b" && !C.shiftKey ? (A(), C.preventDefault()) : G === "h" && !C.shiftKey ? (U(), C.preventDefault()) : G === "i" && !C.shiftKey ? (ue(), C.preventDefault()) : G === "q" && !C.shiftKey ? (Q(), C.preventDefault()) : G === "k" ? C.shiftKey ? (te(), C.preventDefault()) : (z(), C.preventDefault()) : G === "," || C.key === "<" || C.key === ">" || C.keyCode === 188 ? (R(C), C.preventDefault()) : G === "/" || C.key === "/" ? (M(), C.preventDefault()) : (G === "?" || C.key === "?") && C.shiftKey && (Y(), C.preventDefault()) : C.altKey && (C.key === "1" || C.key === "0" ? (Z(), C.preventDefault()) : C.key === "-" ? (J(), C.preventDefault()) : C.key === "s" && (V(), C.preventDefault()));
      };
    }), (h, C) => {
      var G;
      return o(), r("div", null, [
        K(h.$slots, "header", Ae({
          inputElement: g.value,
          id: h.id,
          modelValue: h.modelValue,
          status: h.status
        }, h.$attrs)),
        f.value ? (o(), r("label", {
          key: 0,
          for: h.id,
          class: b(`mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${h.labelClass ?? ""}`)
        }, j(f.value), 11, m1)) : x("", !0),
        h.disabled ? x("", !0) : (o(), r("div", h1, [
          l("div", g1, [
            m("bold") ? (o(), r("svg", {
              key: 0,
              class: b(Je),
              onClick: A,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, w1)) : x("", !0),
            m("italics") ? (o(), r("svg", {
              key: 1,
              class: b(Je),
              onClick: ue,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, $1)) : x("", !0),
            m("link") ? (o(), r("svg", {
              key: 2,
              class: b(Je),
              onClick: z,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, L1)) : x("", !0),
            m("blockquote") ? (o(), r("svg", {
              key: 3,
              class: b(Je),
              onClick: Q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, M1)) : x("", !0),
            m("image") ? (o(), r("svg", {
              key: 4,
              class: b(Je),
              onClick: te,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, F1)) : x("", !0),
            m("code") ? (o(), r("svg", {
              key: 5,
              class: b(Je),
              onClick: R,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, j1)) : x("", !0),
            m("heading") ? (o(), r("svg", {
              key: 6,
              class: b(Je),
              onClick: U,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, B1)) : x("", !0),
            m("orderedList") ? (o(), r("svg", {
              key: 7,
              class: b(Je),
              icon: "",
              onClick: Z,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, H1)) : x("", !0),
            m("unorderedList") ? (o(), r("svg", {
              key: 8,
              class: b(Je),
              onClick: J,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, U1)) : x("", !0),
            m("strikethrough") ? (o(), r("svg", {
              key: 9,
              class: b(Je),
              onClick: V,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, K1)) : x("", !0),
            m("undo") ? (o(), r("svg", {
              key: 10,
              class: b(Je),
              onClick: y,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, W1)) : x("", !0),
            m("redo") ? (o(), r("svg", {
              key: 11,
              class: b(Je),
              onClick: N,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, Y1)) : x("", !0),
            K(h.$slots, "toolbarbuttons", {
              instance: (G = Be()) == null ? void 0 : G.exposed
            })
          ]),
          m("help") && h.helpUrl ? (o(), r("div", em, [
            l("a", {
              title: "formatting help",
              target: "_blank",
              href: h.helpUrl,
              tabindex: "-1"
            }, [
              (o(), r("svg", {
                class: b(Je),
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24"
              }, lm))
            ], 8, tm)
          ])) : x("", !0)
        ])),
        l("div", nm, [
          l("textarea", {
            ref_key: "txt",
            ref: g,
            name: h.id,
            id: h.id,
            class: b(k.value),
            label: h.label,
            value: h.modelValue,
            rows: h.rows || 6,
            disabled: h.disabled,
            onInput: C[0] || (C[0] = (X) => {
              var se;
              return w(((se = X.target) == null ? void 0 : se.value) || "");
            }),
            onKeydown: ln(E, ["tab"])
          }, null, 42, om)
        ]),
        c.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${h.id}-error`
        }, j(c.value), 9, am)) : h.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${h.id}-description`
        }, j(h.help), 9, rm)) : x("", !0),
        K(h.$slots, "footer", Ae({
          inputElement: g.value,
          id: h.id,
          modelValue: h.modelValue,
          status: h.status
        }, h.$attrs))
      ]);
    };
  }
}), um = {
  key: 0,
  class: "relative z-10 lg:hidden",
  role: "dialog",
  "aria-modal": "true"
}, dm = { class: "fixed inset-0 flex" }, cm = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close sidebar", -1), fm = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6 text-white dark:text-black",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), vm = [
  cm,
  fm
], pm = { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-2" }, mm = { class: "hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col" }, hm = { class: "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6" }, gm = {
  class: /* @__PURE__ */ b(["sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden"])
}, ym = /* @__PURE__ */ l("span", { class: "sr-only" }, "Open sidebar", -1), bm = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  })
], -1), wm = [
  ym,
  bm
], km = /* @__PURE__ */ ce({
  __name: "SidebarLayout",
  setup(e, { expose: t }) {
    const { transition: s } = hn(), n = I(!0), a = I(""), i = {
      entering: { cls: "transition-opacity ease-linear duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "transition-opacity ease-linear duration-300", from: "opacity-100", to: "opacity-0" }
    }, d = I(""), u = {
      entering: { cls: "transition ease-in-out duration-300 transform", from: "-translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transition ease-in-out duration-300 transform", from: "translate-x-0", to: "-translate-x-full" }
    }, c = I(""), f = {
      entering: { cls: "ease-in-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in-out duration-300", from: "opacity-100", to: "opacity-0" }
    };
    function p(k) {
      s(i, a, k), s(u, d, k), s(f, c, k), setTimeout(() => n.value = k, 300);
    }
    function $() {
      p(!0);
    }
    function m() {
      p(!1);
    }
    return t({ show: $, hide: m, toggle: p }), (k, g) => (o(), r("div", null, [
      n.value ? (o(), r("div", um, [
        l("div", {
          class: b(["fixed inset-0 bg-gray-900/80", a.value])
        }, null, 2),
        l("div", dm, [
          l("div", {
            class: b(["relative mr-16 flex w-full max-w-xs flex-1", d.value])
          }, [
            l("div", {
              class: b(["absolute left-full top-0 flex w-16 justify-center pt-5", c.value])
            }, [
              l("button", {
                type: "button",
                onClick: m,
                class: "-m-2.5 p-2.5"
              }, vm)
            ], 2),
            l("div", pm, [
              K(k.$slots, "default")
            ])
          ], 2)
        ])
      ])) : x("", !0),
      l("div", mm, [
        l("div", hm, [
          K(k.$slots, "default")
        ])
      ]),
      l("div", gm, [
        l("button", {
          type: "button",
          onClick: $,
          class: "-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
        }, wm),
        K(k.$slots, "mobiletitlebar")
      ])
    ]));
  }
}), _m = {
  Alert: Go,
  AlertSuccess: ra,
  ErrorSummary: fa,
  InputDescription: pa,
  Icon: Jn,
  Loading: rr,
  OutlineButton: dr,
  PrimaryButton: vr,
  SecondaryButton: hr,
  TextLink: yr,
  Breadcrumbs: Cr,
  Breadcrumb: Mr,
  NavList: Fr,
  NavListItem: Nr,
  AutoQueryGrid: fd,
  SettingsIcons: Ld,
  FilterViews: Fl,
  FilterColumn: Tl,
  QueryPrefs: Il,
  EnsureAccess: eo,
  EnsureAccessDialog: Vd,
  TextInput: Pd,
  TextareaInput: Ud,
  SelectInput: Wd,
  CheckboxInput: nc,
  TagInput: Lc,
  FileInput: Gc,
  Autocomplete: c0,
  Combobox: p0,
  DynamicInput: m0,
  LookupInput: T0,
  AutoFormFields: F0,
  AutoForm: tf,
  AutoCreateForm: $f,
  AutoEditForm: Uf,
  ConfirmDelete: Qf,
  FormLoading: Xf,
  DataGrid: lv,
  CellFormat: nv,
  PreviewFormat: dv,
  HtmlFormat: mv,
  CloseButton: wv,
  SlideOver: jv,
  ModalDialog: zv,
  ModalLookup: jp,
  Tabs: Up,
  DarkModeToggle: Gp,
  SignIn: p1,
  MarkdownInput: im,
  SidebarLayout: km
}, qs = _m, Mm = {
  install(e) {
    Object.keys(qs).forEach((s) => {
      e.component(s, qs[s]);
    });
    function t(s) {
      const a = Object.keys(s).filter((i) => s[i]).map((i) => `${encodeURIComponent(i)}=${encodeURIComponent(s[i])}`).join("&");
      return a ? "?" + a : "./";
    }
    e.directive("href", function(s, n) {
      s.href = t(n.value), s.onclick = (a) => {
        a.preventDefault(), history.pushState(n.value, "", t(n.value));
      };
    });
  },
  component(e, t) {
    return e ? t ? ne.components[e] = t : ne.components[e] || qs[e] || null : null;
  }
};
export {
  Sm as css,
  Mm as default,
  Al as useAuth,
  js as useClient,
  Mt as useConfig,
  Lm as useFiles,
  Vm as useFormatters,
  rt as useMetadata,
  hn as useUtils
};
