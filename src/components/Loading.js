import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Smiley from 'react-icons/lib/md/insert-emoticon';

const propTypes = {
  something: PropTypes.any,
};

const phrases = [
  'How far we are?',
  'I\'ll sleep at some crazy bitches place',
  'My Tinder is broken',
];

const randomBetween = (x, y) => Math.floor(Math.random() * y) + x;
const getRandomPhrase = () => {
  return phrases[randomBetween(0, phrases.length)];
};

const Loading = () => (
  <LoadingWrapper>
    <LoadingContent>
      <Smiley />
      <span>{getRandomPhrase()}</span>
    </LoadingContent>
  </LoadingWrapper>
);

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.pinkGradient};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadingContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;

  & > svg {
    width: 80px;
    height: 80px;
    margin-bottom: 16px;
    animation: ${rotate} 2s linear infinite;
  }
`;


Loading.propTypes = propTypes;

export default Loading;
