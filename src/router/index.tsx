import { Suspense, lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Spinner from "@/Spinner";
import Root from "~/layouts/Root";

const wrapLazyPage = (Page: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Page />
    </Suspense>
  );
};

const LazyHome = wrapLazyPage(lazy(() => import("~/pages/Home")));
const LazyCurrency = wrapLazyPage(lazy(() => import("~/pages/Currency")));

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={LazyHome} />
      <Route path=":symbol" element={LazyCurrency} />
    </Route>
  )
);
