"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowWidth = exports.useOuterClick = void 0;
var react_1 = require("react");
function useOuterClick(callback) {
    var innerRef = react_1.useRef();
    var callbackRef = react_1.useRef();
    // set current callback in ref, before second useEffect uses it
    react_1.useEffect(function () {
        // useEffect wrapper to be safe for concurrent mode
        callbackRef.current = callback;
    });
    react_1.useEffect(function () {
        // read most recent callback and innerRef dom node from refs
        function handleClick(event) {
            if (innerRef.current &&
                callbackRef.current &&
                // @ts-ignore
                !innerRef.current.contains(event.target)) {
                callbackRef.current(event);
            }
        }
        document.addEventListener("click", handleClick);
        return function () { return document.removeEventListener("click", handleClick); };
    }, []); // no need for callback + innerRef dep
    return innerRef; // return ref; client can omit `useRef`
}
exports.useOuterClick = useOuterClick;
function useWindowWidth() {
    var _a = __read(react_1.useState(), 2), windowWidth = _a[0], setWindowWidth = _a[1];
    react_1.useEffect(function () {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []);
    return windowWidth;
}
exports.useWindowWidth = useWindowWidth;
