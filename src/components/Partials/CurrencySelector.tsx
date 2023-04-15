import { memo, useEffect, useMemo, useSyncExternalStore } from "react";
import Select from "@/Select";
import useSelectedCurrency from "~/hooks/useSelectedCurrency";
import { default as store } from "~/store/currency";
import { loadCurrencies } from "~/utils";

const subscribe = (fn: Fn) => store.subscribe(fn);
const getSnapshot = () => store.currencies;

const CurrencySelector = memo<{ className: string }>(({ className }) => {
  const currencies = useSyncExternalStore(subscribe, getSnapshot);
  const [selected, select] = useSelectedCurrency();

  useEffect(() => {
    if (!store.filled) {
      loadCurrencies().then((v) => store.set(v));
    }
  }, []);

  return <Select options={currencies ?? []} className={className} current={selected?.symbol} onSelect={select} />;
});

export default CurrencySelector;
