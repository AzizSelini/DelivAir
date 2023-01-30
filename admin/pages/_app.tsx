import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import Layout from "../components/Layout"

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  if (["/"].includes(appProps.router.pathname)) {
    return <Component {...pageProps} />;
  } else {
    return (
      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
    );
  }
}
