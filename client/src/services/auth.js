import api from './api';
import notify from './toast';

async function authenticate_token() {
      await api.get('session/validatetoken', {
            params: {
                  token: localStorage.getItem('token')
            }
      })
            .then((response) => {
                  localStorage.setItem('ngoID', response.data.ID);
                  localStorage.setItem('name', response.data.NAME);
                  localStorage.setItem('email', response.data.EMAIL);
                  localStorage.setItem('whatsapp', response.data.WHATSAPP);
                  localStorage.setItem('city', response.data.CITY);
                  localStorage.setItem('uf', response.data.UF);
                  return true
            })
            .catch((err) => {
                  // notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
                  return false
            });

};

const isAuthenticated = () => {
      if (localStorage.hasOwnProperty('token')) {
            if (localStorage.getItem('token').length <= 100) {
                  return false
            }
            if (authenticate_token()) {
                  return true;
            } else { return false }
      } else {
            return false;
      };
};


export default isAuthenticated;