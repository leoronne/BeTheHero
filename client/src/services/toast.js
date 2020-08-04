import React from 'react';
import { toast } from 'react-toastify';

export default async function notify(msg, icon, type, position) {
      let content = (
            <div style={{ display: 'flex', verticalAlign: 'middle'}}>
                        <p style={{fontSize: '20px', textAlign:'center', verticalAlign: 'middle'}}>{icon}</p>
                        <p style={{margin: 'auto', fontSize: '14px', fontFamily: 'Roboto, sans-serif', marginLeft:'15px', textAlign:'justify', marginRight:'3px'}}>{msg}</p>
            </div>);

      if (type === 'error') {
            toast.error(content, {
                  position: position,
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true
            });
      } else if (type === 'success') {
            toast(content, {
                  position: position,
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true
            });
      }
};