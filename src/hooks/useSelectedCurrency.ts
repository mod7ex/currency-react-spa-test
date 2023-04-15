import { useSyncExternalStore } from "react";
import { default as store } from "~/store/currency";

const subscribe = (fn: Fn) => store.subscribe(fn);
const getSnapShot = () => store.selected;

const useSelectedCurrency = () => {
  const selected = useSyncExternalStore(subscribe, getSnapShot);

  const select = (v: Parameters<typeof store.pick>[0]) => store.pick(v);

  return [selected, select] as const;
};

export default useSelectedCurrency;
