import { useRef, useEffect, MutableRefObject, RefObject } from "react";

export function useOuterClick(callback: Function) {
  const innerRef = useRef() as RefObject<any>
  const callbackRef = useRef() as MutableRefObject<Function>;
  // set current callback in ref, before second useEffect uses it
  useEffect(() => {
    // useEffect wrapper to be safe for concurrent mode
    callbackRef.current = callback;
  });
  useEffect(() => {
    // read most recent callback and innerRef dom node from refs
    function handleClick(event: MouseEvent) {
      if (
        innerRef.current &&
        callbackRef.current &&
        // @ts-ignore
        !innerRef.current.contains(event.target)
      ) {
        callbackRef.current(event);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []); // no need for callback + innerRef dep
  return innerRef; // return ref; client can omit `useRef`
}
