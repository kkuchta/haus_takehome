import React from 'react';
import { connect } from 'react-redux'
import { login } from '../actions'
import { ThunkDispatch } from 'redux-thunk';

interface State {
  username: string
  password: string
}
interface Props {
  dispatch: ThunkDispatch<any, any, any>
}
class LoggedOutPage extends React.Component<Props, State> {
  state = {username: '', password: ''}

  // Todo: figure out how to collapse these into one higher order function
  // without typescript exploding.
  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value })
  }
  onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value })
  }
  onLoginClick = () => {
    const { username, password } = this.state;
    this.props.dispatch(login(username, password))
    console.log(username, password)
  }
  render() {
    return (
      <div className="loggedOutPage">
        logged out !!
        <div>username: <input onChange={this.onUsernameChange} /></div>
        <div>password: <input onChange={this.onPasswordChange} /></div>
        <button onClick={this.onLoginClick}>Log in</button>
      </div>
    );
  }
}

export default connect()(LoggedOutPage);
