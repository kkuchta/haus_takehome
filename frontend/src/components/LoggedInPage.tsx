import React from 'react';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { logout } from '../actions'

interface Props {
  dispatch: ThunkDispatch<any, any, any>
}
class LoggedInPage extends React.Component<Props, {}> {
  onLogOutClick = () => {
    console.log('log out')
    this.props.dispatch(logout())
  }
  render() {
    return (
      <div className="loggedInPage">
        logged in
        <button onClick={this.onLogOutClick}>Log Out</button>
      </div>
    );
  }
}

export default connect()(LoggedInPage);
