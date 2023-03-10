/** @format */

// package imports
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// local imports
import { AuthProvider } from './context/AuthContext'
import CreateNightOutPage from './pages/nightOut/CreateNightOutPage'
import NightOutPage from './pages/nightOut/NightOutPage'
import UserPage from './pages/accounts/UserPage'
import NightOutListPage from './pages/nightOut/NightOutListPage'
import Login from './pages/accounts/Login'
import Register from './pages/accounts/Register'
import PrivateRoute from './utils/PrivateRoute'
import JoinNightOutPage from './pages/nightOut/JoinNightOutPage'
import LandingPage from './pages/landing/LandingPage'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/createnightout" element={<PrivateRoute children={<CreateNightOutPage />} />} />

                    <Route
                        path="/nightout/:uuid"
                        element={<PrivateRoute children={<NightOutPage />} />}
                    />

                    <Route
                        path="/nightoutlist"
                        element={<PrivateRoute children={<NightOutListPage />} />}
                    />
                    <Route path="/user" element={<PrivateRoute children={<UserPage />} />} />
                    <Route element={<Register />} path="/register" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<LandingPage/>} path="/"></Route>
                    <Route element={<JoinNightOutPage/>} path="/nightout/:uuid/join" />
                </Routes>
                <ToastContainer limit={10} position="top-center" autoClose={3500} />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
