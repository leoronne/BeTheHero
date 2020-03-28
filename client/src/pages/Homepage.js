import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import '../assets/css/homepage.css';

import heroesImg from '../assets/img/heroes.png';
import logo from '../assets/img/logo.png';

export default function Homepage() {

      return (
            <div className='homepage-container'>
                  <section className='form'>
                        <div className='logo'>
                              <img src={logo} alt='Be The Hero' />
                        </div><br/><br/><br/><br/>
                              <Link className='homeButton' to='/login'>
                                    I need a hero
                              </Link>
                              <Link className='homeButton' to='/index'>
                                    I want to be the hero
                              </Link>
                  </section>
                  <img src={heroesImg} className='heroes' alt='Heroes' />
            </div>
      )
};