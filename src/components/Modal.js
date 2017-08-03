import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import CloseIcon from 'react-icons/lib/md/close';
import EditIcon from 'react-icons/lib/md/edit';
import LoveIcon from 'react-icons/lib/md/favorite';
import BackIcon from 'react-icons/lib/md/keyboard-backspace';
import Avatar from './Avatar';

// Components
import FadeSlideUp from './FadeSlideUp';
import PointsControls from './PointsControls';
import PointsHistory from './PointsHistory';
import ItemEdit from './ItemEdit';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  item: PropTypes.object,
  itemKey: PropTypes.string,
};

class Modal extends Component {
  state = {
    activePanel: 1, // points history
    expandPic: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemKey !== this.props.itemKey) {
      this.setState({ activePanel: 1, expandPic: false });
    }
  }

  toggleExpand = () => {
    this.setState(prevState => ({
      expandPic: !prevState.expandPic,
    }));
  }

  setActivePanel = activePanel => {
    this.setState({ activePanel, expandPic: false });
  }

  render() {
    const { visible, hide, item, itemHistory } = this.props;
    const { activePanel, expandPic } = this.state;

    return (
      <FadeSlideUp>
        {visible &&
          <div>
            <Panel className='modal-panel'>
              <PanelHeader>
                <AvatarExpandable
                  url={item.avatar}
                  size='80px'
                  expand={expandPic}
                  onClick={this.toggleExpand}
                />
                <Details>
                  <Nickname>{item.nickname}</Nickname>
                  <CurrentPoints>Current points: {item.points}</CurrentPoints>
                </Details>
              </PanelHeader>

              <Slider activePanel={activePanel}>
                <Slide>
                  <PointsControls {...this.props} />
                </Slide>

                <Slide>
                  <PointsHistory {...this.props} history={itemHistory} />
                </Slide>

                <Slide>
                  <ItemEdit {...this.props} />
                </Slide>
              </Slider>
              
              <PanelFooter>
                <CloseIcon onClick={hide} />

                {activePanel === 0 && // points controls
                  <GoBack right onClick={() => this.setActivePanel(1)} />
                }

                {activePanel === 1 && // points history
                  <div>
                    <GoControl onClick={() => this.setActivePanel(0)} />
                    <GoEdit onClick={() => this.setActivePanel(2)} />  
                  </div>
                }

                {activePanel === 2 && // profile edit
                  <GoBack left onClick={() => this.setActivePanel(1)} />
                }
              </PanelFooter>
            </Panel>

            <Backdrop onClick={hide} className='modal-backdrop' />
          </div>
        }
      </FadeSlideUp>
    );
  }
}

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
  height: 90vh;
  background-color: #fff;
  box-shadow: 0px 0px 18px rgba(0,0,0,0.7);
  z-index: 999;
  overflow: hidden;
`;
const PanelHeader = styled.div`
  padding: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.pinkLightest};
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
`;
const CurrentPoints = styled.div`
  font-size: 18px;
  font-weight: 200;
  color: ${props => props.theme.pinkDark};
  margin-bottom: 4px;
`;
const Nickname = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.pinkDark};
`;
const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: relative;

  & svg {
    height: 32px;
    width: 32px;
    color: ${props => props.theme.pinkDarker};
  }
`;
const Slider = styled.div`
  flex: 1;
  display: flex;
  transition: transform 0.2s ease-out;
  transform: translateX(${props => `${props.activePanel * -100}vw`});
`;
const Slide = styled.div`
  width: 100vw;
  flex: none;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
`;
const GoEdit = styled(EditIcon)`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
const GoControl = styled(LoveIcon)`
  position: absolute;
  left: 16px;
  bottom: 16px;
`;
const GoBack = styled(BackIcon)`
  position: absolute;
  left: 16px;
  bottom: 16px;
  ${props => props.right && css`
    transform: rotate(180deg);
    right: 16px;
    left: initial;
  `}
`;
const AvatarExpandable = styled(Avatar)`
  transition: all 0.4s ease;
  z-index: 999999;
  ${props => props.expand &&
    'transform: translateX(calc(50vw - 60px)) translateY(200px) scale(4);'
  }
`;


Modal.propTypes = propTypes;

export default Modal;
