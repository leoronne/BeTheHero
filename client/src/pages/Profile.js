import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import '../assets/css/profile.css';
import logo from '../assets/img/logo.png';

export default function Profile() {
      return (
            <div className='profile-container'>
                  <header>
                        <img src={logo} alt='Be The Hero' />
                        <span>
                              Welcome, NGO
                        </span>


                        <Link className='button' to='/incidents/new'>Create new incident
                        </Link>
                        <button type='button'>
                              <FiPower size={18} color='#E02041' />
                        </button>
                  </header>

                  <h1>
                        Incidents
                  </h1>

                  <ul>
                        <li>
                              <strong>INCIDENT:</strong>
                              <p>Caso Teste</p>

                              <strong>DESCRIPTION:</strong>
                              <p>Description test</p>

                              <strong>VALUE:</strong>
                              <p>$ 320.00</p>
                        <button type='button'>
                              <FiTrash2 width={20} color='#A8A8B3' />
                        </button>
                        </li>
                        <li>
                              <strong>INCIDENT:</strong>
                              <p>Caso Teste</p>

                              <strong>DESCRIPTION:</strong>
                              <p>Description test</p>

                              <strong>VALUE:</strong>
                              <p>$ 320.00</p>
                        <button type='button'>
                              <FiTrash2 width={20} color='#A8A8B3' />
                        </button>
                        </li>
                        <li>
                              <strong>INCIDENT:</strong>
                              <p>Caso Teste</p>

                              <strong>DESCRIPTION:</strong>
                              <p>Description test</p>

                              <strong>VALUE:</strong>
                              <p>$ 320.00</p>
                        <button type='button'>
                              <FiTrash2 width={20} color='#A8A8B3' />
                        </button>
                        </li>
                  </ul>

            </div>
      )
};