import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from './Avatar';

const propTypes = {
  item: PropTypes.object,
  itemKey: PropTypes.string.isRequired,
  updatePoints: PropTypes.func.isRequired,
};

class PointsControls extends Component {
  state = {
    expandPic: false,
  }

  toggleExpand = () => {
    this.setState(prevState => ({
      expandPic: !prevState.expandPic,
    }));
  }

  render() {
    const { item, itemKey, updatePoints } = this.props;
    const { expandPic } = this.state;

    return (
      <PointsControlsWrapper>
        <PanelHeader>
          <AvatarExpandable
            url={item.avatar}
            size='80px'
            expand={expandPic}
            onClick={this.toggleExpand}
          />
          <Nickname>{item.nickname}</Nickname>
        </PanelHeader>
        
        <Title>Give love or whip</Title>

        <PanelBody>
          <CurrentPoints>Current points: {item.points}</CurrentPoints>
          <PointsButtons>
            <GivePoints
              onClick={() => updatePoints(itemKey, item.points + 10)}
            >
              <span>+10</span>
            </GivePoints>
            <TakePoints
              onClick={() => updatePoints(itemKey, item.points - 10)}
            >
              <span>-10</span>
            </TakePoints>
          </PointsButtons>
        </PanelBody>
      </PointsControlsWrapper>
    );
  }
}

const PointsControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const PanelHeader = styled.div`
  padding-bottom: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.pinkLightest};
`;
const Nickname = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.pinkDark};
  margin-left: 16px;
`;
const Title = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  text-align: center;
  color: ${props => props.theme.pink};
`;
const PanelBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const CurrentPoints = styled.div`
  font-size: 18px;
  font-weight: 200;
  color: ${props => props.theme.pinkDark};
  margin-bottom: 24px;
`;
const PointsButtons = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonBase = styled.button`
  border-radius: 80px;
  border: none;
  display: block;
  text-align: center;
  height: 80px;
  width: 180px;
  color: #fff;
  font-size: 40px;
  font-weight: 200;
  transition: opacity 0.4 ease;
  outline: none;

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
const AvatarExpandable = styled(Avatar)`
  transition: all 0.4s ease;
  ${props => props.expand &&
    'transform: translateX(calc(50vw - 60px)) translateY(200px) scale(4);'
  }
`;

PointsControls.propTypes = propTypes;

export default PointsControls;
