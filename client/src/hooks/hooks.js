"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOuterClick = void 0;
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
