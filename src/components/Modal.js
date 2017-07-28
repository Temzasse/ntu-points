import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from 'react-icons/lib/md/close';
import EditIcon from 'react-icons/lib/md/edit';
import BackIcon from 'react-icons/lib/md/keyboard-backspace';

// Components
import FadeSlideUp from './FadeSlideUp';
import PointsControls from './PointsControls';
import ItemEdit from './ItemEdit';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  itemKey: PropTypes.string.isRequired,
};

class PointsModal extends Component {
  state = {
    activePanel: 'points',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemKey !== this.props.itemKey) {
      this.setState({ activePanel: 'points' });
    }
  }

  setActivePanel = panelName => {
    this.setState({ activePanel: panelName });
  }

  render() {
    const { visible, hide } = this.props;
    const { activePanel } = this.state;

    return (
      <FadeSlideUp>
        {visible &&
          <div>
            <Panel className='modal-panel'>
              <Slider animate={activePanel === 'edit'}>
                <Slide>
                  <PointsControls {...this.props} />
                </Slide>

                <Slide>
                  <ItemEdit {...this.props} />
                </Slide>
              </Slider>
              
              <PanelFooter>
                <CloseIcon onClick={hide} />

                {activePanel === 'points'
                  ? <GoEdit onClick={() => this.setActivePanel('edit')} />
                  : <GoBack onClick={() => this.setActivePanel('points')} />
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
  height: 85vh;
  background-color: #fff;
  box-shadow: 0px 0px 18px rgba(0,0,0,0.7);
  z-index: 999;
  overflow: hidden;
`;
const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: relative;

  & > svg {
    height: 32px;
    width: 32px;
    color: ${props => props.theme.pinkDarker};
  }
`;
const Slider = styled.div`
  flex: 1;
  display: flex;
  transition: transform 0.2s ease-out;
  transform: translateX(${props => props.animate ? '-100vw' : '0px'});
`;
const Slide = styled.div`
  width: 100vw;
  flex: none;
  padding: 16px;
`;
const GoEdit = styled(EditIcon)`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
const GoBack = styled(BackIcon)`
  position: absolute;
  left: 16px;
  bottom: 16px;
`;


PointsModal.propTypes = propTypes;

export default PointsModal;
