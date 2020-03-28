import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { DotLoader } from 'react-spinners';
import {
      Button, Nav
} from 'reactstrap';
import { ReCaptcha } from 'react-recaptcha-google'

import isAuthenticated from '../services/auth';
import api from '../services/api';
import notify from '../services/toast';

import '../assets/css/forgotpassword.css';

import heroesImg from '../assets/img/heroes.png';
import logo from '../assets/img/logo.png';

export class ForgotPassword extends React.Component {
      constructor(props) {
            super(props)
            this.state = {
                  loading: false,
                  disableBtn: true,
                  isCaptchaValidated: null,
                  email: ''
            };
            this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
            this.verifyCallback = this.verifyCallback.bind(this);
      };


      onLoadRecaptcha = () => {
            if (this.captchaDemo) {
                  this.captchaDemo.reset();
            }
      }
      verifyCallback = (recaptchaToken) => {
            this.setState({
                  isCaptchaValidated: recaptchaToken,
                  disableBtn: false
            });
      }

      async handleEmailReset() {
            this.setState({
                  loading: true,
                  disableBtn: true,
            });
            const data = {
                  "EMAIL": this.state.email
            };

            await api.post('ngo/forgotpassword', data)
                  .then((response) => {
                        notify(`Reset password email was sent successfully, please check your inbox!`, '✔️', 'success', 'top-right');
                  })
                  .catch((err) => {
                        notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
                  });
            this.captchaDemo.reset();
            this.setState({
                  loading: false,
                  disableBtn: true,
            });
      };

      inputValidation = () => {
            var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

            if (this.state.email === '') {
                  console.log('no')
                  return notify('Email field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (!expression.test(String(this.state.email).toLowerCase())) {
                  return notify('Invalid Email!', '⚠️', 'error', 'top-right');
            }
            else {
                  this.handleEmailReset();
                  return true;
            }
      };

      render() {
            return (
                  <div className='forgotpassword-container' >
                        <section className='form'>
                              <div className='logo'>
                                    <img src={logo} alt='Be The Hero' />
                              </div>
                              <form>
                                    <p>
                                          Email:
                              </p>
                                    <input type='email' placeholder='Email' value={this.state.email} onChange={e => this.setState({
                                          email: e.target.value
                                    })} />
                                    <br />
                                    <br />
                                    <Nav >
                                          <ReCaptcha
                                                ref={(el) => { this.captchaDemo = el; }}
                                                size="normal"
                                                data-theme="light"
                                                render="explicit"
                                                sitekey="6LcRsuQUAAAAABrMSWpV2uDBOI0qYowbOc_kv3sP"
                                                // 6Ld1suQUAAAAAF7QqJzC4fB2L63ZmkKssa-RPJMv
                                                onloadCallback={this.onLoadRecaptcha}
                                                verifyCallback={this.verifyCallback}
                                          />
                                    </Nav>
                                    <Button disabled={this.state.disableBtn} className='button' type='button'
                                          onClick={this.inputValidation}>
                                          {this.state.loading ? <DotLoader
                                                css={`display: block;
                                                margin: 0 auto;
                                                border-color: red;
                                          `}
                                                sizeUnit={"px"}
                                                size={20}
                                                color={'#fff'} /> : 'Send email'}
                                    </Button>
                                    <div className='links'>
                                          <Link className='back-link' to='/'>
                                                <FiArrowLeft size={16} color='#E02041' />Return to Homepage
                                    </Link>

                                    </div>
                              </form>
                        </section>
                        <img src={heroesImg} className='heroes' alt='Heroes' />
                  </div>
            )
      }
};

export default ForgotPassword;