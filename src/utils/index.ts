/**
 * No Error handling is implemented
 *
 */

const TARGET = "https://api.fastforex.io";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const sleep = () => new Promise((r) => setTimeout(r, 2000));

interface EndPointPayload {
  path: string;
  query?: Record<string, string>;
}

const endPoint = ({ path, query }: EndPointPayload) => {
  const _query = Object.entries({
    api_key: VITE_API_KEY,
    ...query,
  })
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return new URL(`/${path}?${_query}`, TARGET);
};

export const loadCurrencies = async () => {
  const response = await fetch(endPoint({ path: "currencies" }));
  const _data = (await response.json())?.currencies;
  return Object.entries(_data).map(([symbol, label]) => ({ label, symbol })) as Currency[];
};

export const loadRates = async (from: string) => {
  await sleep();

  const response = await fetch(
    endPoint({
      path: "fetch-all",
      query: {
        from,
      },
    })
  );
  const _data = (await response.json())?.results;
  return Object.entries(_data ?? {}).map(([symbol, rate]) => ({ symbol, rate }));
};

export const loadRate = async (from: string, to: string) => {
  await sleep();

  const response = await fetch(
    endPoint({
      path: "fetch-one",
      query: {
        from,
        to,
      },
    })
  );
  const { result } = <{ result: Record<string, number> }>await response.json();
  const [rate] = Object.entries(result);

  return {
    from,
    to,
    rate: rate[1],
  };
};
