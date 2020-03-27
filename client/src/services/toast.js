import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Row, Col } from 'reactstrap';

import { toast } from 'react-toastify';

export default async function notify(msg, icon, type, position) {
      let content = (
            <div style={{ display: 'flex', verticalAlign: 'middle'}}>
                  {/* <Col> */}
                        <p style={{fontSize: '20px', textAlign:'center', verticalAlign: 'middle'}}>{icon}</p>
                  {/* </Col> */}
                  {/* <Col> */}
                        <p style={{margin: 'auto', fontSize: '14px', fontFamily: 'Roboto, sans-serif', marginLeft:'15px', textAlign:'justify', marginRight:'3px'}}>{msg}</p>
                  {/* </Col> */}
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