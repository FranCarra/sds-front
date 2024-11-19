import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Usuario.css';

const User = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const validateUserAccess = async () => {
            const token = localStorage.getItem('token');

            // Si no hay token, redirige al login
            if (!token) {
                navigate('/');
                return;
            }

            try {
                // Realiza la consulta al endpoint para verificar si el usuario está autenticado
                const response = await fetch('http://localhost:8080/api/user', {
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

                // Si está autenticado, permite que cargue el contenido
            } catch (error) {
                console.error('Error al validar acceso de usuario:', error);
                navigate('/'); // Redirige si hay un error en la conexión
            }
        };

        validateUserAccess();
    }, [navigate]);

    // Manejo del botón "Cerrar Sesión"
    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token del localStorage
        navigate('/'); // Redirige al login
    };

    return (
        <div className="user-page">
            <header className="user-header">
                <h1>Bienvenido Usuario</h1>
            </header>
            <main className="user-main">
                <p>¡Hola! Aquí puedes ver tu contenido personalizado como usuario autenticado.</p>
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

export default User;
