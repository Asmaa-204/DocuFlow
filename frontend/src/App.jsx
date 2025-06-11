import { Toaster } from "react-hot-toast";

import AppRoutes from "@components/AppRoutes";
import GlobalStyles from "@styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
