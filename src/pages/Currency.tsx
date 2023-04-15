import { Navigate, useParams } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "@/Spinner";
import store from "~/store/currency";
import useSelectedCurrency from "~/hooks/useSelectedCurrency";

const LazyChange = lazy(() => import("@/Partials/Change"));

const Currency = () => {
  const { symbol } = useParams();

  const [selected] = useSelectedCurrency();

  const isValidSymbol = store.currencies?.some((c) => c.symbol === symbol);

  if (!isValidSymbol) return <Navigate to="/" replace={true} />;

  if (selected) {
    return (
      <Suspense fallback={<Spinner />}>
        <LazyChange key={selected.symbol} symbol={symbol!} selected={selected} />
      </Suspense>
    );
  }

  return <h3 style={{ textAlign: "center" }}>Please select a base currency</h3>;
};

export default Currency;
