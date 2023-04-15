import useSelectedCurrency from "~/hooks/useSelectedCurrency";
import { Suspense, lazy } from "react";
import Spinner from "@/Spinner";

const LazyRates = lazy(() => import("@/Partials/Rates"));

const Home = () => {
  const [selected] = useSelectedCurrency();

  if (selected) {
    return (
      <Suspense fallback={<Spinner />}>
        <LazyRates key={selected.symbol} currency={selected} />
      </Suspense>
    );
  }

  return <h3 style={{ textAlign: "center" }}>Please select a base currency</h3>;
};

export default Home;
