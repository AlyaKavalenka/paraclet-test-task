/* eslint-disable react/jsx-props-no-spreading */
import "../index.scss";
import type { AppProps /* , AppContext */ } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Inter, sans-serif",
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </Provider>
  );
}
