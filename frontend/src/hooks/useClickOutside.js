import { useEffect, useRef } from "react";

function useClickOutside(listenCapturing = true, handler) {
  const ref = useRef();

  useEffect(
    function () {
      function closeOnClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", closeOnClickOutside, listenCapturing);

      return () =>
        document.removeEventListener(
          "click",
          closeOnClickOutside,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );

  return ref;
}

export { useClickOutside };
