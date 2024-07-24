import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/HomePage';  // Asegúrate de que las rutas sean correctas
import Register from './views/Register';  // Asegúrate de que las rutas sean correctas
import Login from './views/Login';
import PublicRoute from './hooks/PublicRoute';
// import PrivateRoute from './hooks/PrivateRoute';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<PublicRoute restricted={true} component={Register} />} />
        <Route path="/login" element={<PublicRoute restricted={true} component={Login} />} />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirige cualquier otra ruta a la página de inicio */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
