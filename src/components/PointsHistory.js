import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  item: PropTypes.object.isRequired,
};

const PointsHistory = ({ item }) => {
  const itemHistory = item.history
    ? Object.entries(item.history)
    : [];

  return (
    <PointsHistoryWrapper>
      <HistoryEvents>
        {itemHistory.map(([key, historyEvent]) =>
          <Event key={key}>
            <Points>{historyEvent.points}</Points>
            <Reason>{historyEvent.reason}</Reason>
          </Event>
        )}
      </HistoryEvents>
    </PointsHistoryWrapper>
  );
}

const PointsHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const HistoryEvents = styled.ul`
  padding: 16px;
  margin: 0px;
  list-style: none;
`;
const Event = styled.li`
  padding: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;
const Points = styled.div`
  margin-right: 16px;
  font-weight: 700;
`;
const Reason = styled.div`
  flex: 1;
`;

PointsHistory.propTypes = propTypes;

export default PointsHistory;
