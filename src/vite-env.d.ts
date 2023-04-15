/// <reference types="vite/client" />

type Numberish = string | number;

type Fn<T = any, R = any> = (...args: T[]) => R;

type ValueOrGenerator<T> = T | (() => T);

type ValueOrConcluder<T> = T | ((v: T) => T);

interface Currency {
  symbol: string;
  label: string;
}

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
