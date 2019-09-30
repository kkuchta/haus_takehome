import React from 'react';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { login } from '../actions/session';
import { signup } from '../actions/user'
import { ThunkDispatch } from 'redux-thunk';
import './LoggedOutPage.css';

interface State {
  username: string
  password: string
}
interface Props {
  dispatch: ThunkDispatch<any, any, any>
  lastLoginSuccess?: boolean
  lastSignupSuccess?: boolean
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
  onSignupClick = () => {
    const { username, password } = this.state;
    this.props.dispatch(signup(username, password))
  }
  render() {
    const { lastLoginSuccess, lastSignupSuccess } = this.props;
    console.log('lastLoginSuccess=', lastLoginSuccess)
    return (
      <div className="loggedOutPage">
        { lastLoginSuccess === false && <div>Login failed</div>}
        { lastSignupSuccess === false && <div>Signup failed</div>}
        <div className='usernameField field'>
          <label>username:</label>
          <input className="usernameInput" type='text' onChange={this.onUsernameChange} />
        </div>
        <div className='passwordField field'>
          <label>password:</label>
          <input className="passwordInput" type='password' onChange={this.onPasswordChange} />
        </div>
        <button onClick={this.onLoginClick}>Log in</button>
        <button onClick={this.onSignupClick}>Sign up</button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  lastLoginSuccess: state.session && state.session.lastLoginSuccess,
  lastSignupSuccess: state.user && state.user.lastSignupSuccess
})

export default connect(mapStateToProps)(LoggedOutPage);
