import 'react';

const Admin = () => {
    // Recupera el token desde localStorage, si es necesario
    const token = localStorage.getItem('token');

    if (!token) {
        return <p>No estás autenticado. Por favor, inicia sesión.</p>;
    }

    return (
        <div>
            <h1>Bienvenido al Dashboard</h1>
            <p>Esta es la nueva vista que se muestra después de iniciar sesión.</p>
        </div>
    );
};

export default Admin;
