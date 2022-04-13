import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleClose = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  };
  return (
    <div>
      <h1>Blogs App</h1>
      {user && (
        <div>
          <span>{user.username} logged in </span>
          <button onClick={handleClose}>Cerrar Sesión</button>
        </div>
      )}
      {user ? <Blogs user={user} /> : <Login setUser={setUser} />}
    </div>
  );
};

export default App;
