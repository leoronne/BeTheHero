import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaHome } from 'react-icons/fa';
import { DotLoader } from 'react-spinners';
import {
      Button
} from 'reactstrap';

import api from '../services/api';
import notify from '../services/toast';

import '../assets/css/index.css';
import logo from '../assets/img/logo.png';

export default function Profile() {
      const [loading, setLoading] = useState(false);
      const [total, setTotal] = useState(0);
      const [incidents, setIncidents] = useState([]);

      const history = useHistory();

      useEffect(() => {
            api.get('incidents/indexall')
                  .then((response) => {
                        setIncidents(response.data)
                        setTotal(response.data.length);
                        return true
                  })
                  .catch((err) => {
                        notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
                        return false
                  });
      }, []);

      async function handleLogout() {
            localStorage.clear()
            history.push('/')
      }

      async function handleWhatsapp(number, name, title, value) {
            var message = `Hello ${name}, I'm getting in touch because I would like to help with the incident "${title}" with the ammount of $ ${value}`

            return window.open(`https://api.whatsapp.com/send?phone=${number}&text=%20${encodeURI(message)}`, '_blank')
      }

      async function handleMail(email, name, title, value) {
            var message = `Hello ${name}, I'm getting in touch because I would like to help with the incident "${title}" with the ammount of $ ${value}`

            return window.location.href =` mailto:${email}?subject=${encodeURI(`A Hero is interested on your incident: ${title}`)}&body=${encodeURI(message)}`;
      }

      return (

            <div className='index-container' >
                  <header>
                        <img src={logo} alt='Be The Hero' />
                        <span>
                              Total of <strong>{total}</strong> incidents
                        </span>

                        <button className='return' type='button' onClick={handleLogout} style={{ position: 'right' }}>
                              <FaHome size={18} color='#E02041' />
                        </button>
                  </header>

                  <h1>
                        Incidents
                  </h1>

                  <ul>
                        {incidents.map(incident => (
                              <li key={incident.id}>
                                    <strong>NGO:</strong>
                                    <p>{incident.NAME} of {incident.CITY}/{incident.UF}</p>

                                    <strong>INCIDENT:</strong>
                                    <p>{incident.TITLE}</p>

                                    <strong>DESCRIPTION:</strong>
                                    <p>{incident.DESCRIPTION}</p>

                                    <strong>VALUE:</strong>
                                    <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.VALUE)}</p>

                                    <div className="contact">
                                          <Button disabled={loading} type='button' onClick={() => handleMail(incident.EMAIL, incident.NAME, incident.TITLE, incident.VALUE)}>
                                                <FaEnvelope width={20} color='#A8A8B3' />
                                          </Button>


                                          <Button disabled={loading} type='button' onClick={() => handleWhatsapp(incident.WHATSAPP, incident.NAME, incident.TITLE, incident.VALUE)}>
                                                <FaWhatsapp width={20} color='#A8A8B3' />
                                          </Button>

                                    </div>

                                    {/* <button type='button' onClick={() => handleDeleteIncident(incident.id)}>
                                          <FiTrash2 width={20} color='#A8A8B3' />
                                    </button> */}
                              </li>
                        ))}
                  </ul>

            </div >
      )
};