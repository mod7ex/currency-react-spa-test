import { useEffect, useRef } from "react";

function useInterval(fn: () => void, delay?: number) {
  const savedCallback = useRef(fn);

  // Remember the latest fn if it changes.
  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay == null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
