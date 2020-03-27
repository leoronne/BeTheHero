import api from './api';
import notify from './toast';

export default async function isAuthenticated() {
      if (localStorage.hasOwnProperty('token')) {
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
      }
      else {
            return false
      }
};