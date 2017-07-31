import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import * as firebase from 'firebase';

const propTypes = {
  onPasswordOk: PropTypes.any,
};

class AuthPrompt extends Component {
  state = {
    password: '',
    email: '',
    shallPass: null,
  }

  checkCredentials = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.onPasswordOk({ email, password }))
      .catch((error) => {
        console.log('Auth error:', error);
        this.setState({ shallPass: false });
      });
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
      shallPass: null,
    });
  }

  render() {
    const { email, password, shallPass } = this.state;

    return (
      <AuthPromptWrapper>
        <Form onSubmit={this.checkCredentials} shake={shallPass === false}>
          <Label>
            <span>Give email, now!</span>
            <Input
              value={email}
              onChange={this.handleChange}
              placeholder='Like bae@forevah.love'
              type='email'
              name='email'
            />
          </Label>
          <Label>
            <span>Shit what was the password...</span>
            <Input
              value={password}
              onChange={this.handleChange}
              placeholder='Try 123456'
              type='password'
              name='password'
            />
          </Label>
          <SubmitButton type='submit'>
            Let's go!
          </SubmitButton>
        </Form>
      </AuthPromptWrapper>
    );
  }
}

const shakeAnim = keyframes`
  0% { transform: rotate(0deg); }
  16.67% { transform: rotate(-10deg); }
  33.33% { transform: rotate(10deg); }
  50% { transform: rotate(-10deg); }
  66.67% { transform: rotate(10deg); }
  83.33% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

const AuthPromptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: ${props => props.theme.pinkGradient};
`;
const Form = styled.form`
  background-color: #fff;
  padding: 16px;
  width: 85%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 24px rgba(0,0,0,0.3);
  animation: ${props => props.shake ? shakeAnim : 'none'} 0.7s;
`;
const Label = styled.label`
  font-size: 14px;
  color: ${props => props.theme.pinkDarker};
`;
const Input = styled.input`
  margin: 8px 0px 24px 0px;
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  background: transparent;
  border-radius: 6px;
  outline: none;
  border: 1px solid ${props => props.theme.pinkDark};
  color: ${props => props.theme.pinkDark};
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  color: #fff;
  font-size: 24px;
  font-weight: 200;
  text-transform: uppercase;
  border-radius: 6px;
  border: none;
  outline: none;
  background-color: ${props => props.theme.pink};

  &:hover, &:active {
    background-color: ${props => props.theme.pinkDark};
  }
`;

AuthPrompt.propTypes = propTypes;

export default AuthPrompt;
