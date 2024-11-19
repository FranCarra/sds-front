import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importa jwt-decode

interface DecodedToken {
  sub: string;
  authorities: string;
  exp: number;
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Guarda el token en el almacenamiento local
        localStorage.setItem('token', data.token);
        
        // Decodifica el token para verificar el rol
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(data.token);

        setMessage(`¡Bienvenido, ${decodedToken.sub}!`);
        console.log(decodedToken);
        // Redirigir según el rol
        if (decodedToken.authorities == 'ROLE_ADMIN') {
          navigate('/Admin'); // Redirigir a /admin si es admin
        } else {
          // Redirigir a otra página si no es admin
        }
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <h1>Inicio de Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Iniciar Sesión
          </button>
        </form>
        {message && (
          <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
