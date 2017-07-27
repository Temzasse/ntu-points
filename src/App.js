import React, { Component } from 'react';
import * as firebase from 'firebase';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';

// Components
import Loading from './components/Loading';
import Leaderboard from './components/Leaderboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.database();
    this.state = {
      leaderboard: null,
    };
  }

  componentDidMount() {
    // Get initial leaderboard
    this.db.ref().child('leaderboard').on('value', snapshot => {
      const leaderboard = snapshot.val();
      this.setState({ leaderboard });
    });
  }

  updatePoints = (name, points) => {
    this.db.ref(`leaderboard/${name}/points`).set(points);
  }

  render() {
    const { leaderboard } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Content>
            {leaderboard
              ? <Leaderboard
                  leaderboard={leaderboard}
                  updatePoints={this.updatePoints}
                />
              : <Loading />
            }
          </Content>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Nunito', sans-serif;
`;
const Content = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  position: relative;
`;



export default App;
