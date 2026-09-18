import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Home />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
