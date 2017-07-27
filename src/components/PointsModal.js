import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FadeSlideUp from './FadeSlideUp';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

const PointsModal = ({ visible, hide }) => (
  <FadeSlideUp>
    {visible &&
      <div>
        <Panel className='modal-panel'>
          moi
          {visible}
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

PointsModal.propTypes = propTypes;

export default PointsModal;
