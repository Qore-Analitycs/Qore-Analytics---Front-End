import "@/styles/globals.css";
import "@/styles/const.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer position="top-right" style={{ zIndex: 99999 }} />
      <div className="app-wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}
