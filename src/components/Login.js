import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from '../components/Notification';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setError('');
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
      setError('Wrong credentials');
    }
  };

  return (
    <>
      <h2>Log in to application</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>

      {error.length > 0 && <Notification message={error} setError={setError} />}
    </>
  );
};

export default Login;
