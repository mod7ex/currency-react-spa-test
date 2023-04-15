import styles from "~/assets/scss/modules/currency.module.scss";
import wrapPromise from "~/lib/wrap-promise";
import { loadRate } from "~/utils";
import { useEffect, useState } from "react";
import useInterval from "~/hooks/useInterval";
import Flip from "~/assets/svg/flip.svg";
import CurrencySymbol from "../CurrencySymbol";

const { read, reset } = wrapPromise(loadRate);

const Change: React.FC<{ symbol: Currency["symbol"]; selected: Currency }> = ({ symbol, selected }) => {
  const [amount, setAmount] = useState(1);

  const [rate, setRate] = useState(() => read({ auto: true, args: [symbol, selected.symbol] }));

  const toggle = () =>
    setRate((r) => {
      return {
        from: r.to,
        to: r.from,
        rate: 1 / r.rate,
      };
    });

  useInterval(() => {
    loadRate(symbol, selected.symbol).then(setRate);
  }, 1000 * 60);

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.from}>
        <span>
          <CurrencySymbol symbol={rate.from} />
        </span>
        <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
      </div>
      <button className={styles.flip} onClick={() => toggle()}>
        <img src={Flip} alt="flip" loading="lazy" width={20} height={20} />
      </button>
      <span className={styles.to}>
        {(amount || 0) * rate.rate}
        <CurrencySymbol symbol={rate.to} />
      </span>
    </div>
  );
};

export default Change;
