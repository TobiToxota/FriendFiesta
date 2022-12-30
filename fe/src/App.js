import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import CreateNightOutPage from "./pages/CreateNightOutPage";
import Login from "./pages/accounts/Login";
import Register from "./pages/accounts/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
           path="/"
            element={
              <PrivateRoute children={<CreateNightOutPage/>}/>
            }
          />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
