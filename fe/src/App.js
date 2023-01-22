/** @format */

// package imports
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer} from 'react-toastify'

// local imports
import CreateNightOutPage from "./pages/nightOut/CreateNightOutPage";
import NightOutPage from "./pages/nightOut/NightOutPage";
import Login from "./pages/accounts/Login";
import Register from "./pages/accounts/Register";
import NightOutListPage from "./pages/nightOut/NightOutListPage";
import PrivateRoute from "./utils/PrivateRoute";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute children={<CreateNightOutPage />} />}
          />
          <Route
            path="/nightout/:uuid"
            element={<PrivateRoute children={<NightOutPage />} />}
          />
          <Route
            path="/nightoutlist"
            element={<PrivateRoute children={<NightOutListPage />} />}
          />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
        </Routes>
        <ToastContainer limit={2} position="top-center" autoClose={4000}/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
