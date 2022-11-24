import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProivder } from './context/context';
import { Auth0Provider } from "@auth0/auth0-react"

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain="dev-b7c4122uvqgn6q7b.us.auth0.com"
  clientId="uZ1MUNtFzidBjqgYoZJuSwq4mG4rcUHa"
  redirectUri={window.location.origin}
  cacheLocation="localstorage"
>

  <GithubProivder>
    <App />
  </GithubProivder>

  </Auth0Provider>
);

reportWebVitals();
