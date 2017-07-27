import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PointsModal from './PointsModal';

const propTypes = {
  leaderboard: PropTypes.object.isRequired,
  updatePoints: PropTypes.func.isRequired,
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getName = key => key
  ? capitalize(key)
  : 'Who is this random dude?';

class Leaderboard extends Component {
  state = {
    selected: null,
  }

  selectItem = key => {
    this.setState({ selected: this.props.leaderboard[key] });
  }

  resetSelected = () => {
    this.setState({ selected: null });
  }

  render() {
    const { leaderboard } = this.props;
    const { selected } = this.state;
    const modalVisible = !!selected;

    const items = Object.entries(leaderboard).sort((a, b) => {
      if (a[1].points < b[1].points) return 1;
      if (a[1].points > b[1].points) return -1;
      return 0;
    });

    console.log(modalVisible);

    return (
      <LeaderboardWrapper>
        <Header>
          <Title>Leaderboard</Title>
        </Header>

        <LeaderboardList>
          {items.map(([key, { nickname, points }], index) =>
            <LeaderboardItem onClick={() => this.selectItem(key)}>
              <Position>{index + 1}</Position>
              <Details>
                <Nickname>{nickname}</Nickname>
                <Name>{getName(key)}</Name>
              </Details>
              <Points>{points}</Points>
            </LeaderboardItem>
          )}
        </LeaderboardList>

        <PointsModal
          visible={modalVisible}
          hide={() => this.resetSelected()}
          data={selected}
        />

      </LeaderboardWrapper>
    );
  }
}

const LeaderboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  height: 60px;
  background-color: ${props => props.theme.pinkDark};
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 24px;
  color: #fff;
  margin: 0;
`;
const LeaderboardList = styled.ul`
  padding: 16px;
  margin: 0px;
  list-style: none;
`;
const LeaderboardItem = styled.li`
  padding: 8px 16px;
  margin-bottom: 16px;
  background-color: #fff;
  box-shadow: 0px 3px 16px rgba(0,0,0,0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
`;
const Position = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 16px;
  background-color: ${props => props.theme.pinkLightest};
  color: ${props => props.theme.pinkDarker};
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Details = styled.div`
  flex: 1;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
`;
const Points = styled.strong`
  font-size: 16px;
  color: ${props => props.theme.pinkDarkest};
`;
const Nickname = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.pinkDarker};
  margin-bottom: 4px;
`;
const Name = styled.div`
  font-size: 12px;
  color: ${props => props.theme.pinkDarker};
`;

Leaderboard.propTypes = propTypes;

export default Leaderboard;
