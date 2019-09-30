import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux'
import { fetchUser } from './actions/user'
import { AppState } from './store'
import { User, UnauthorizedUser } from './reducers/user'
import LoggedOutPage from './components/LoggedOutPage'
import LoggedInPage from './components/LoggedInPage'
import Loading from './components/Loading'

import './App.css';

interface Props {
  dispatch: ThunkDispatch<any, any, any>
  isFetchingUser: boolean
  isSigningUp: boolean
  user?: User
}
class App extends React.Component<Props, {}> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUser()); // Check if we're logged in by fetching current user
  }
  renderPage() {
    const { user } = this.props;
    if (user === UnauthorizedUser) {
      return <LoggedOutPage />;
    } else if (user != null) {
      return <LoggedInPage />;
    }
  }
  render() {
    const {isFetchingUser, user, isSigningUp} = this.props;
    return (
      <div className="App">
        { (isFetchingUser || user == null || isSigningUp)? <Loading /> : this.renderPage() }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user && state.user.user,
  isFetchingUser: state.user == null ? false : state.user.isFetching,
  isSigningUp: state.user == null ? false : state.user.isSigningUp
})

export default connect(mapStateToProps)(App);
