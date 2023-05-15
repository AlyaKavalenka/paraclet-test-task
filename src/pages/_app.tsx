/* eslint-disable react/jsx-props-no-spreading */
import "../index.scss";
import type { AppProps /* , AppContext */ } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
