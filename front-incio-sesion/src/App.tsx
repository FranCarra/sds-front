import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Función para decodificar manualmente el JWT
  const decodeToken = (token: string): any => {
    try {
      // Dividir el token en partes (header, payload, signature)
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Formato de token inválido');
      }

      // Decodificar el payload (segunda parte del token)
      const payload = parts[1];
      const decodedPayload = atob(payload); // Decodificar de Base64
      return JSON.parse(decodedPayload);   // Convertir a objeto JSON
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };

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
        const token = data.token;

        console.log('Token recibido:', token);

        // Decodificar el token para obtener el username
        const decodedToken = decodeToken(token);

        if (decodedToken) {
          console.log('Token decodificado:', decodedToken);
          if (decodedToken.username) {
            setMessage(`¡Bienvenido, ${decodedToken.username}!`);
          } else {
            setMessage('Error: No se encontró el username en el token.');
          }

          // Puedes guardar el token en el almacenamiento local o sesión si es necesario
          localStorage.setItem('token', token);
        } else {
          setMessage('Error al procesar el token JWT.');
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
