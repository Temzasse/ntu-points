import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FadeSlideUp from './FadeSlideUp';
import CloseIcon from 'react-icons/lib/md/close';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  item: PropTypes.object,
  hide: PropTypes.func.isRequired,
  updatePoints: PropTypes.func.isRequired,
};

const PointsModal = ({ visible, hide, item, itemKey, updatePoints }) => (
  <FadeSlideUp>
    {visible &&
      <div>
        <Panel className='modal-panel'>
          <PanelHeader>
            <Title>Give love or whip</Title>
            <Nickname>{item.nickname}</Nickname>
          </PanelHeader>
          <PanelBody>
            <CurrentPoints>Current points: {item.points}</CurrentPoints>
            <PointsButtons>
              <GivePoints
                onClick={() => updatePoints(itemKey, item.points + 10)}
              >
                +10
              </GivePoints>
              <TakePoints
                onClick={() => updatePoints(itemKey, item.points - 10)}
              >
                -10
              </TakePoints>
            </PointsButtons>
          </PanelBody>
          <PanelFooter>
            <CloseIcon onClick={hide} />
          </PanelFooter>
        </Panel>

        <Backdrop onClick={hide} className='modal-backdrop' />
      </div>
    }
  </FadeSlideUp>
);

const Backdrop = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 998;
`;
const Panel = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 70vh;
  background-color: #fff;
  box-shadow: 0px 0px 18px rgba(0,0,0,0.7);
  z-index: 999;
`;
const PanelHeader = styled.div`
  margin-bottom: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 100;
  color: ${props => props.theme.pink};
`;
const Nickname = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.pinkDark};
`;
const PanelBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const CurrentPoints = styled.div`
  font-size: 16px;
  color: ${props => props.theme.pinkDark};
  margin-bottom: 32px;
`;
const PointsButtons = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonBase = styled.button`
  border-radius: 80px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 200px;
  color: #fff;
  font-size: 40px;
  transition: opacity 0.4 ease;
  outline: none;

  &:active {
    opacity: 0.7;
  }
`;
const GivePoints = styled(ButtonBase)`
  background-color: ${props => props.theme.pink};
  margin-bottom: 32px;
`;
const TakePoints = styled(ButtonBase)`
  background-color: #888;
`;
const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;

  & > svg {
    height: 32px;
    width: 32px;
    color: ${props => props.theme.pinkDark};
  }
`;


PointsModal.propTypes = propTypes;

export default PointsModal;
