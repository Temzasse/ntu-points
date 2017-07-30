import React, { Component } from 'react';
import * as firebase from 'firebase';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';

// Components
import Loading from './components/Loading';
import Leaderboard from './components/Leaderboard';
import AuthPrompt from './components/AuthPrompt';

class App extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.database();
    this.state = {
      leaderboard: null,
      isAuthenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    try {
      const authStr = localStorage.getItem('ntu-points-credentials');
      const { email, password } = JSON.parse(authStr);

      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.init())
        .catch(() => this.setState({ loading: false }));
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  init = () => {
    this.setState({ isAuthenticated: true, loading: false });
    this.loadData();
  }

  authOk = credentials => {
    localStorage.setItem('ntu-points-credentials', JSON.stringify(credentials));
    this.init();
  }

  loadData = () => {
    // Get initial leaderboard
    this.db.ref().child('leaderboard').on('value', snapshot => {
      this.setState({ leaderboard: snapshot.val() });
    });
  }

  updatePoints = (key, points) => {
    this.db.ref(`leaderboard/${key}/points`).set(points);
  }

  addHistoryEvent = (key, event) => {
    const newEventRef = this.db.ref(`leaderboard/${key}/history`).push();
    newEventRef.set(event);
  }

  render() {
    const { leaderboard, isAuthenticated, loading } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Content>
            {loading &&
              <Loading />  
            }
            {isAuthenticated && leaderboard && !loading &&
              <Leaderboard
                leaderboard={leaderboard}
                updatePoints={this.updatePoints}
                addHistoryEvent={this.addHistoryEvent}
              /> 
            }
            {!isAuthenticated && !loading &&
              <AuthPrompt onPasswordOk={this.authOk} />
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
