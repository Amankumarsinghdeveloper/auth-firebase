import "../styles/globals.css";
import RootLayout from "../components/layout.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
