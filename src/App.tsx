import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "./App.css";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
