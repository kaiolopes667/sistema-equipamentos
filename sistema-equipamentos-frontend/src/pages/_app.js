import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <main>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer theme="colored" />
    </main>
  );
}
