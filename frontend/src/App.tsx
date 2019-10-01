import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchUser } from "./actions/user";
import Loading from "./components/Loading";
import LoggedInPage from "./components/LoggedInPage";
import LoggedOutPage from "./components/LoggedOutPage";
import { UnauthorizedUser, User } from "./reducers/user";
import { AppState } from "./store";

import "./App.css";

interface Props {
  dispatch: ThunkDispatch<any, any, any>;
  isFetchingUser: boolean;
  isSigningUp: boolean;
  user?: User;
}
class App extends React.Component<Props, {}> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUser()); // Check if we're logged in by fetching current user
  }
  public renderPage() {
    const { user } = this.props;
    if (user === UnauthorizedUser) {
      return <LoggedOutPage />;
    } else if (user != null) {
      return <LoggedInPage />;
    }
  }
  public render() {
    const {isFetchingUser, user, isSigningUp} = this.props;
    return (
      <div className="App">
        { (isFetchingUser || user == null || isSigningUp) ? <Loading /> : this.renderPage() }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user && state.user.user,
  isFetchingUser: state.user == null ? false : state.user.isFetching,
  isSigningUp: state.user == null ? false : state.user.isSigningUp,
});

export default connect(mapStateToProps)(App);
