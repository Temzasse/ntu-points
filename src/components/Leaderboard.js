import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListIcon from 'react-icons/lib/md/whatshot';
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
    this.setState({
      selected: { item: this.props.leaderboard[key], key }
    });
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

    return (
      <LeaderboardWrapper>
        <Header>
          <ListIcon />
          <Title>Leaderboard</Title>
        </Header>

        <LeaderboardList>
          {items.map(([key, { nickname, points }], index) =>
            <LeaderboardItem
              onClick={() => this.selectItem(key)}
              key={nickname}
            >
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
          data={selected}
          hide={this.resetSelected}
          updatePoints={this.props.updatePoints}
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
  background-color: ${props => props.theme.pink};
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    height: 32px;
    width: 32px;
    color: #fff;
    margin-right: 8px;
  }
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
  box-shadow: 0px 2px 12px rgba(0,0,0,0.1);
  border: 1px solid #eee;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:active {
    background-color: ${props => props.theme.pinkLighter};
  }
`;
const Position = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 16px;
  background: ${props => props.theme.pinkGradient};
  color: #fff;
  font-size: 24px;
  font-weight: 200;
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
  color: ${props => props.theme.pinkDark};
  margin-bottom: 2px;
`;
const Name = styled.div`
  font-size: 12px;
  font-style: italic;
  color: ${props => props.theme.pinkDarker};
`;

Leaderboard.propTypes = propTypes;

export default Leaderboard;
