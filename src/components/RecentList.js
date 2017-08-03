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
      {items.map(({ points, reason, user }) =>
        <RecentItem>
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
  padding-bottom: 4px;
  border-bottom: 1px solid ${props => props.theme.pink};

  &:last-child {
    margin-bottom: 0px;
    border-bottom: none;
  }
`;
const Upper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 12px;
  margin-bottom: 4px;
  background-color: ${props => props.theme.pink};
  color: #fff;
`;
const User = styled.div`
  flex: none;
`;
const Points = styled.div`
  margin-right: 12px;
`;
const Reason = styled.div`
  flex: 1;
`;

RecentList.propTypes = propTypes;

export default RecentList;
