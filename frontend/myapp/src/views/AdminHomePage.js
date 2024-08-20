// views/AdminHomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';  

function AdminHomePage() {
    const navigate = useNavigate();

    return (
        
    <div>
        <BarraNavegacionAdmin />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Dashboard>
            <DashboardGrid>
                <DashboardItem onClick={() => navigate('/admin/solicitudes')}>
                    <ItemImage src="/imagenes/solicitudes-icon.png" alt="Solicitudes de registro" />
                    <ItemTitle>Solicitudes de registro</ItemTitle>
                    <ItemDescription>Aquí podrás aceptar o rechazar una solicitud de registro</ItemDescription>
                </DashboardItem>
                <DashboardItem onClick={() => navigate('/admin/users')}>
                    <ItemImage src="/imagenes/imagenUsuarios.png" alt="Usuarios" />
                    <ItemTitle>Usuarios</ItemTitle>
                    <ItemDescription>Aquí podrás buscar y visualizar a todos los usuarios y sus datos</ItemDescription>
                </DashboardItem>
                <DashboardItem onClick={() => navigate('/admin/addRoute')}>
                    <ItemImage src="/imagenes/rutas.jpg" alt="Rutas" />
                    <ItemTitle>Rutas</ItemTitle>
                    <ItemDescription>Aquí podrás añadir las nuevas rutas de escalada</ItemDescription>
                </DashboardItem>
                <DashboardItem onClick={() => navigate('/admin/pistas')}>
                    <ItemImage src="/imagenes/publicacion.png" alt="Pistas" />
                    <ItemTitle>Publications</ItemTitle>
                    <ItemDescription>Aquí podrás visualizar, modificar, eliminar y crear las pistas</ItemDescription>
                </DashboardItem>
                <DashboardItem onClick={() => navigate('/admin/route-percentages')}>
                    <ItemImage src="/imagenes/estadisticas.png" alt="Estadisticas" />
                    <ItemTitle>Estadisticas</ItemTitle>
                    <ItemDescription>Aquí podrás acceder a los ajustes de los administradores</ItemDescription>
                </DashboardItem>
                <DashboardItem onClick={() => navigate('/admin/rankings')}>
                    <ItemImage src="/imagenes/ranking.png" alt="Rankings" />
                    <ItemTitle>Rankings</ItemTitle>
                    <ItemDescription>Aquí podrás acceder a todo lo relacionado con los rankings</ItemDescription>
                </DashboardItem>
                <DashboardItem onClick={() => navigate('/admin/formularios')}>
                    <ItemImage src="/imagenes/ajust.png" alt="Ajustes" />
                    <ItemTitle>Ajustes</ItemTitle>
                    <ItemDescription>Aquí podrás ver todos los mensajes del formulario de la página de inicio</ItemDescription>
                </DashboardItem>
            </DashboardGrid>
        </Dashboard>
    </div>
    );
};

const Dashboard = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
`;


const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
`;

const DashboardItem = styled.div`
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;
    text-align: center;

    &:hover {
        transform: translateY(-5px);
    }
`;

const ItemImage = styled.img`
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 10px;
`;

const ItemDescription = styled.p`
    font-size: 0.9rem;
    color: #666;
`;

export default AdminHomePage;
