import React from 'react';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { logout, saveFeedback } from '../actions'

interface Props {
  dispatch: ThunkDispatch<any, any, any>
}
interface State {
  feedback: string
}
class LoggedInPage extends React.Component<Props, State> {
  onLogOutClick = () => {
    console.log('log out')
    this.props.dispatch(logout())
  }
  onFeedbackSaveClick = () => {
    console.log('saving')
    this.props.dispatch(saveFeedback(this.state.feedback))
  }
  onFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({feedback: event.target.value});
  }
  render() {
    return (
      <div className="loggedInPage">
        logged in
        <br />
        <textarea onChange={this.onFeedbackChange} />
        <br />
        <button onClick={this.onFeedbackSaveClick}>Save Feedback</button>
        <br />
        <button onClick={this.onLogOutClick}>Log Out</button>
      </div>
    );
  }
}

export default connect()(LoggedInPage);
