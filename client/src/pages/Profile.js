import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { DotLoader } from 'react-spinners';
import {
      Button
} from 'reactstrap';

import api from '../services/api';
import notify from '../services/toast';

import '../assets/css/profile.css';
import logo from '../assets/img/logo.png';

export default function Profile() {
      const [loading, setLoading] = useState(false);
      const [incidents, setIncidents] = useState([]);

      const ngoID = localStorage.getItem('ngoID');
      const ngoName = localStorage.getItem('name');

      const history = useHistory();

      useEffect(() => {
            api.get('incidents/index', {
                  params: {
                        ngoID: ngoID
                  }
            })
                  .then((response) => {
                        setIncidents(response.data)
                        return true
                  })
                  .catch((err) => {
                        notify(`${err.response === undefined ? err.message : err.response.data.error}`, '⚠️', 'error', 'top-right');
                        return false
                  });
      }, [ngoID]);

      async function handleLogout() {
            localStorage.clear()
            history.push('/')
      }

      async function handleDeleteIncident(id) {
            setLoading(true);
            try {
                  api.delete('incidents/delete', {
                        params: {
                              ID: id
                        },
                        headers: {
                              Authorization: ngoID
                        }
                  })
                        .then((response) => {
                              notify(`Incident deleted successfully!`, '✔️', 'success', 'top-right');
                              setIncidents(incidents.filter(incident => incident.id !== id));
                              return true
                        })
                        .catch((err) => {
                              notify(`${err.response === undefined ? err.message : err.response.data.error}`, '⚠️', 'error', 'top-right');
                              return false
                        });

            } catch (err) {
                  notify('Internal error!', '⚠️', 'error', 'top-right');
            }
            setLoading(false);
      }

      return (

            < div className='profile-container' >
                  <header>
                        <img src={logo} alt='Be The Hero' />
                        <span>
                              Welcome, {ngoName}
                        </span>

                        <Link className='linkButton' to='/incidents/new' >Create new incident</Link>

                        <button type='button' onClick={handleLogout}>
                              <FiPower size={18} color='#E02041' />
                        </button>
                  </header>

                  <h1>
                        Incidents
                  </h1>

                  <ul>
                        {incidents.map(incident => (
                              <li key={incident.id}>
                                    <strong>INCIDENT:</strong>
                                    <p>{incident.TITLE}</p>

                                    <strong>DESCRIPTION:</strong>
                                    <p>{incident.DESCRIPTION}</p>

                                    <strong>VALUE:</strong>
                                    <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.VALUE)}</p>




                                    <Button disabled={loading} type='button' onClick={() => handleDeleteIncident(incident.id)}>
                                          {loading ? <DotLoader
                                                css={`display: block;
                                                margin: 0 auto;
                                                border-color: red;
                                          `}
                                                sizeUnit={"px"}
                                                size={15}
                                                color={'#A8A8B3'} /> : <FiTrash2 width={20} color='#A8A8B3' />}
                                    </Button>

                                    {/* <button type='button' onClick={() => handleDeleteIncident(incident.id)}>
                                          <FiTrash2 width={20} color='#A8A8B3' />
                                    </button> */}
                              </li>
                        ))}
                  </ul>

            </div >
      )
};