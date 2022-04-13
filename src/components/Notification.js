import React, { useEffect } from 'react';

const Notification = ({ message, setError }) => {
  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  }, []);

  if (message === null) {
    return null;
  }

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};
export default Notification;
