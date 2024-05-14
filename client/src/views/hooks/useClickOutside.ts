import { RefObject, useEffect, useRef } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const eventCallback = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        callbackRef.current();
      }
    };
    window.addEventListener("mousedown", eventCallback);

    return () => {
      window.removeEventListener("mousedown", eventCallback);
    };
  }, [ref]);
};
