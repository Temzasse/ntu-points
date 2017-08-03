import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  items: PropTypes.array.isRequired,
};

const RecentList = ({ items }) => (
  <RecentListWrapper>
    <strong>Recent events</strong>
    <Recent>
      {items.map(({ points, reason }) =>
        <RecentItem>
          <Points>{points}</Points>
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
  align-items: center;
  color: #fff;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0px;
  }
`;
const Points = styled.div`
  height: 38px;
  width: 38px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: 12px;
  background-color: ${props => props.theme.pinkLighter};
  color: #fff;
`;
const Reason = styled.div`
  flex: 1;
`;

RecentList.propTypes = propTypes;

export default RecentList;
