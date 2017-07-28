import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const propTypes = {
  onPasswordOk: PropTypes.any,
};

class PasswordPrompt extends Component {
  state = {
    password: '',
    shallPass: null,
  }

  checkPassword = (event) => {
    event.preventDefault();
    const { password } = this.state;

    if (password === 'mrwong69') {
      this.props.onPasswordOk();
    } else {
      this.setState({ shallPass: false });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ password: target.value, shallPass: null });
  }

  render() {
    const { password, shallPass } = this.state;

    return (
      <PasswordPromptWrapper>
        <Form onSubmit={this.checkPassword} shake={shallPass === false}>
          <Label>
            You shall not pass
            <PassInput
              placeholder='Give super secret password'
              value={password}
              onChange={this.handleChange}
            />
          </Label>
          <SubmitButton type='submit'>
            Let's go!
          </SubmitButton>
        </Form>
      </PasswordPromptWrapper>
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

const PasswordPromptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: ${props => props.theme.pinkGradient};
`;
const Form = styled.form`
  background-color: #fff;
  padding: 32px;
  width: 80%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 4px 24px rgba(0,0,0,0.4);
  animation: ${props => props.shake ? shakeAnim : 'none'} 0.7s;
`;
const Label = styled.label`
  font-size: 24px;
`;
const PassInput = styled.input`
  margin: 24px 0px;
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
  background-color: ${props => props.theme.pinkDark};

  &:hover, &:active {
    background-color: ${props => props.theme.pinkDarker};
  }
`;

PasswordPrompt.propTypes = propTypes;

export default PasswordPrompt;
