
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import RefreshToken from './RefreshToken';
import App from './App';

export default function Root () {
    const [tokenRefreshed, setTokenRefreshed] = useState(false);
    const handleTokenRefreshed = () => {
      setTokenRefreshed(true);
    };
  
    return (
      <Provider store={store}>
        <RefreshToken onTokenRefreshed={handleTokenRefreshed} />
        {tokenRefreshed ? <App /> : <h1>Ожидание обновления токена...</h1>}
      </Provider>
    );
  };