import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  item: PropTypes.object,
  itemKey: PropTypes.string.isRequired,
  updatePoints: PropTypes.func.isRequired,
  addHistoryEvent: PropTypes.func.isRequired,
};

class PointsControls extends Component {
  state = {
    total: null,
    reason: '',
  }

  updateTotal = amount => {
    this.setState(prevState => ({
      total: prevState.total !== null
        ? prevState.total + amount
        : amount
    }));
  }

  handleReasonChange = ({ target }) => {
    this.setState({ reason: target.value });
  }

  confirm = () => {
    const { item, itemKey } = this.props;
    const { reason, total } = this.state;

    if (reason && total !== null) {
      this.props.updatePoints(itemKey, item.points + total);
      this.props.addHistoryEvent(itemKey, { reason, points: total });
      this.setState({ reason: '', total: null });
    }
  }

  render() {
    const { item } = this.props;
    const { reason, total } = this.state;

    return (
      <PointsControlsWrapper>
        <Title>Give love or whip</Title>
        <PanelBody>
          <PointsButtons>
            <TakePoints onClick={() => this.updateTotal(-10)}>
              <span>-10</span>
            </TakePoints>
            <GivePoints onClick={() => this.updateTotal(10)} >
              <span>+10</span>
            </GivePoints>
          </PointsButtons>

          <ReasonTextField
            value={reason}
            onChange={this.handleReasonChange}
            row={5}
          />

          <ConfirmSection>
            <Total>{total}</Total>
            <ConfirmButton onClick={this.confirm}>
              Do it!
            </ConfirmButton>
          </ConfirmSection>
        </PanelBody>
      </PointsControlsWrapper>
    );
  }
}

const PointsControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const PanelBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  text-align: center;
  color: ${props => props.theme.pink};
`;
const PointsButtons = styled.div`
  display: flex;
`;
const ButtonBase = styled.button`
  border-radius: 80px;
  border: none;
  display: block;
  text-align: center;
  height: 80px;
  width: 140px;
  color: #fff;
  font-size: 40px;
  font-weight: 200;
  transition: opacity 0.4 ease;
  outline: none;

  &:first-child {
    margin-right: 32px;
  }

  &:active {
    opacity: 0.7;
  }
`;
const GivePoints = styled(ButtonBase)`
  background-color: ${props => props.theme.pink};
  margin-bottom: 24px; 
`;
const TakePoints = styled(ButtonBase)`
  background-color: #888;
`;
const ReasonTextField = styled.textarea`
  border-radius: 6px;
  border: 1px solid ${props => props.theme.pink};
  width: 100%;
  padding: 16px;
  flex: 1;
  margin-bottom: 32px;
  font-size: 16px;
  outline: none;
  color: ${props => props.theme.pink};
`;
const ConfirmSection = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.pinkDark};
  color: #fff;
  width: 100%;
  border-radius: 6px;
`;
const Total = styled.div`
  font-size: 32px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ConfirmButton = styled.div`
  padding: 0px 32px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.pinkDarker};
  font-size: 24px;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
`;

PointsControls.propTypes = propTypes;

export default PointsControls;
