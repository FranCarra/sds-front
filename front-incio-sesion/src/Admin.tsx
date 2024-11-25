import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const validateAdminAccess = async () => {
            const token = localStorage.getItem('token');

            // Si no hay token, redirige al login
            if (!token) {
                navigate('/');
                return;
            }

            try {
                // Realiza la consulta al endpoint para verificar si es admin
                const response = await fetch('http://localhost:8080/api/admin', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
                    },
                });

                if (!response.ok) {
                    // Si no tiene acceso (403 o cualquier error), redirige al login
                    navigate('/');
                    return;
                }

                // Si es admin, no hace nada y permite que cargue el contenido
            } catch (error) {
                console.error('Error al validar acceso de administrador:', error);
                navigate('/'); // Redirige si hay un error en la conexión
            }
        };

        validateAdminAccess();
    }, [navigate]);

    // Manejo del botón "Cerrar Sesión"
    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token del localStorage
        navigate('/'); // Redirige al login
    };

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Panel de Administración</h1>
            </header>
            <main className="admin-main">
                <p>¡Bienvenido al área de administración! Aquí puedes gestionar las opciones de tu sistema.</p>
                <button onClick={handleLogout} className="btn-logout">
                    <span role="img" aria-label="logout-icon" style={{ marginRight: '8px' }}>
                        🔒
                    </span>
                    Cerrar Sesión
                </button>
            </main>
        </div>
    );
};

export default Admin;
