import React from 'react';
import { connect } from 'react-redux'
import { fetchUser } from './actions'
import { AppState } from './store'
import { User, UnauthorizedUser } from './reducers/user'
import LoggedOutPage from './components/LoggedOutPage'
import LoggedInPage from './components/LoggedInPage'

interface Props {
  dispatch: any
  isFetchingUser: boolean
  user: User
}
class App extends React.Component<Props, {}> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUser()); // Check if we're logged in by fetching current user
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.isFetchingUser) {
    }
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
    const {isFetchingUser, user} = this.props;
    return (
      <div className="App">
        { (isFetchingUser || user == null)? <div>Loading...</div> : this.renderPage() }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user && state.user.user,
  isFetchingUser: state.user.isFetching
})

export default connect(mapStateToProps)(App);
