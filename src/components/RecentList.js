import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  items: PropTypes.array.isRequired,
};

const RecentList = ({ items, leaderboard }) => (
  <RecentListWrapper>
    <strong>Recent events</strong>
    <Recent>
      {items.map(({ points, reason, user }, index) =>
        <RecentItem isFirst={index === 0}>
          <Upper>
            <Points>{points}</Points>
            <User>{leaderboard[user].nickname}</User>
          </Upper>
          <Reason>{reason}</Reason>
        </RecentItem>
      )}
    </Recent>
  </RecentListWrapper>
);

const RecentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.pinkGradientSideways};
  padding: 16px;
  flex: none;

  & > strong {
    margin-bottom: 8px;
    font-size: 18px;
    color: #fff;
  }
`;
const Recent = styled.div`
  display: flex;
  flex-direction: column;
`;
const RecentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  margin-bottom: 12px;
  border-bottom: 1px solid ${props => props.theme.pink};
  font-size: ${props => props.isFirst ? '20px' : '16px'};

  &:last-child {
    margin-bottom: 0px;
    border-bottom: none;
  }
`;
const Upper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.6875em;
  font-weight: 700;
  border-radius: 12px;
  background-color: ${props => props.theme.pink};
  color: #fff;
`;
const Points = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  padding: 4px 8px;
  background-color: ${props => props.theme.pinkDark};
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;
const User = styled.div`
  flex: none;
  padding: 4px 8px;
`;
const Reason = styled.div`
  flex: 1;
  font-size: 1em;
  padding: 0.4em 0px;
`;

RecentList.propTypes = propTypes;

export default RecentList;
