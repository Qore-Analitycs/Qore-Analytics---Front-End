import "@/styles/globals.css";
import "@/styles/const.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
