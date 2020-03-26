import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import Routes from './routes';

import './assets/css/global.css';

function App() {
  return (<>
    <ToastContainer
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange={false}
      draggable
      pauseOnHover={false}
    />
    <Routes />
  </>
  );
}

export default App;
