import styles from "~/assets/scss/modules/home.module.scss";
import { Link } from "react-router-dom";
import wrapPromise from "~/lib/wrap-promise";
import { loadRates } from "~/utils";
import { useEffect, useState } from "react";
import useInterval from "~/hooks/useInterval";
import CurrencySymbol from "../CurrencySymbol";

const { read, reset } = wrapPromise(loadRates);

const Rates: React.FC<{ currency: Currency }> = ({ currency }) => {
  const _symbol = currency.symbol;

  const [rates, setRates] = useState(() => read({ auto: true, args: [_symbol] })); // suspend on currency change

  useInterval(() => {
    loadRates(_symbol).then(setRates);
  }, 1000 * 60);

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <ul className={styles.wrapper}>
      {rates.map((ex) => (
        <li key={ex.symbol}>
          <Link to={`/${ex.symbol}`} className={styles.item} title={ex.symbol}>
            <span className={styles.from}>
              <CurrencySymbol symbol={_symbol} />
            </span>
            <span className={styles.to}>
              {ex.rate} <CurrencySymbol symbol={ex.symbol} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Rates;
