import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ResetIcon from 'react-icons/lib/md/refresh';

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
      this.props.addHistoryEvent(itemKey, {
        reason,
        points: total,
        user: itemKey,
      });
      this.props.updatePoints(itemKey, item.points + total);
      this.reset();
    }
  }

  reset = () => {
    this.setState({ reason: '', total: null });
  }

  render() {
    const { reason, total } = this.state;
    console.debug('[ITEM KEY]', this.props.itemKey);

    return (
      <PointsControlsWrapper>
         <Title>Give love or whip</Title> 
        <PanelBody>
          <PointsButtons>
            <TakePoints onClick={() => this.updateTotal(-10)}>
              <span>-10</span>
            </TakePoints>
            <ResetIcon onClick={this.reset} />
            <GivePoints onClick={() => this.updateTotal(10)} >
              <span>+10</span>
            </GivePoints>
          </PointsButtons>

          <ReasonTextField
            value={reason}
            onChange={this.handleReasonChange}
            rows={2}
            placeholder='What is the reason for this action?'
          />

          <ConfirmSection>
            <Total>{total}</Total>
            <ConfirmButton
              onClick={this.confirm}
              disabled={!reason || total === null}
            >
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
  margin-bottom: 12px;
  text-align: center;
  color: ${props => props.theme.pink};
`;
const PointsButtons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & > svg {
    margin: 0px 12px;
    width: 24px;
    height: 24px;
    color: ${props => props.theme.pinkDark};
    transition: opacity 0.3s ease;

    &:active {
      opacity: 0.7;
    }
  }
`;
const ButtonBase = styled.button`
  border-radius: 30px;
  border: none;
  display: block;
  text-align: center;
  height: 60px;
  width: calc(50% - 24px);
  color: #fff;
  font-size: 24px;
  font-weight: 200;
  transition: opacity 0.3s ease;
  outline: none;

  &:active {
    opacity: 0.7;
  }
`;
const GivePoints = styled(ButtonBase)`
  background-color: ${props => props.theme.pink};
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
  margin: 24px 0px;
  font-size: 16px;
  outline: none;
  color: ${props => props.theme.pink};
`;
const ConfirmSection = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.pink};
  color: #fff;
  width: 100%;
  border-radius: 6px;
`;
const Total = styled.div`
  font-size: 24px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ConfirmButton = styled.div`
  padding: 0px 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.pinkDark};
  font-size: 24px;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  ${props => props.disabled && 'opacity: 0.4;'}
`;

PointsControls.propTypes = propTypes;

export default PointsControls;
