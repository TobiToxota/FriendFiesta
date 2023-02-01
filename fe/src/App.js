/** @format */

// package imports
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// local imports
import { AuthProvider } from './context/AuthContext'
import CreateNightOutPage from './pages/nightOut/CreateNightOutPage'
import NightOutPage from './pages/nightOut/NightOutPage'
import Login from './pages/accounts/Login'
import Register from './pages/accounts/Register'
import NightOutListPage from './pages/nightOut/NightOutListPage'
import PrivateRoute from './utils/PrivateRoute'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PrivateRoute children={<CreateNightOutPage />} />} />
                    
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
                <ToastContainer limit={2} position="top-center" autoClose={4000} />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
