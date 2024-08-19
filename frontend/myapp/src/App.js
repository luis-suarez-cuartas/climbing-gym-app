import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/HomePage';  // Asegúrate de que las rutas sean correctas
import Register from './views/Register';  // Asegúrate de que las rutas sean correctas
import Login from './views/Login';
import PublicRoute from './hooks/PublicRoute';
import Profile from './views/Profile/Profile';
import TrainingSesion from './views/TrainingSesion';
import Publications from './views/Publications';
import Ranking from './views/Ranking';
import PrivateRoute from './hooks/PrivateRoute';
import AdminPrivateRoute from './hooks/AdminPrivateRoute';
import AdminPublicRoute from './hooks/AdminPublicRoute';
import Sesion from './views/Sesion';
import EditProfile from './views/EditProfile';
import ChangePassword from './views/ChangePassword';
import AdminLogin from './views/AdminLogin';
import AdminRegister from './views/AdminRegister';
import AdminHomePage from './views/AdminHomePage';
import AdminUsuarios from './views/AdminUsuarios';


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<PublicRoute restricted={true} component={Register} />} />
        <Route path="/login" element={<PublicRoute restricted={true} component={Login} />} />
        <Route path="/profile/edit" element={<PrivateRoute component={EditProfile} />} />
        <Route path="/profile/change-password" element={<PrivateRoute component={ChangePassword} />} />
        <Route path="/sesion/:training_id" element={<PrivateRoute component={Sesion} />} /> 
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
        <Route path="/entrenamiento" element={<PrivateRoute component={TrainingSesion} />} />
        <Route path="/publications" element={<PrivateRoute component={Publications} />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/admin/login" element={<AdminPublicRoute component={AdminLogin} restricted={true} />} />
        <Route path="/admin/register" element={<AdminPublicRoute component={AdminRegister} restricted={true} />} />
        <Route path="/admin/homePage" element={<AdminPublicRoute component={AdminHomePage} />} />
        <Route path="/admin/users" element={<AdminPrivateRoute component={AdminUsuarios} />} />
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
