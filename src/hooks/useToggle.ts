import { useState } from "react";
import { isFunction } from "~/utils/types";

/**
 * the initial value is set to false
 * @param init
 */
export default function useToggle(init: ValueOrGenerator<boolean> = false) {
  const [state, setState] = useState(init);

  const toggle = (value?: ValueOrConcluder<boolean>) => {
    setState((v) => (isFunction(value) ? value(v) : value ?? !v));
  };

  return [state, toggle] as const;
}
