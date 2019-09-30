import React from 'react';
import { AppState } from '../store'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { fetchFeedback, saveFeedback } from '../actions/feedback'
import { logout } from '../actions/session'
import Loading from './Loading'
import './LoggedInPage.css'

interface Props {
  dispatch: ThunkDispatch<any, any, any>
  isFetchingFeedback: boolean
  isSavingFeedback: boolean
  feedback?: string
}
interface State {
  feedback?: string
}
class LoggedInPage extends React.Component<Props, State> {
  state = {
    feedback: ''
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.feedback !== this.props.feedback) {
      this.setState({feedback: this.props.feedback});
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchFeedback());
  }
  onLogOutClick = () => {
    console.log('log out')
    this.props.dispatch(logout())
  }
  onFeedbackSaveClick = () => {
    console.log('saving')
    let feedback = this.state.feedback;
    if (feedback == null) { feedback = '' };
    this.props.dispatch(saveFeedback(feedback))
  }
  onFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({feedback: event.target.value});
  }
  render() {
    if (this.props.isFetchingFeedback) { return <Loading /> }
    return (
      <div className="loggedInPage">
        <h2>Feedback:</h2>
        <textarea
          value={this.state.feedback}
          onChange={this.onFeedbackChange}
          placeholder='Write your thoughts here...'
        />
        <br />
        <button onClick={this.onFeedbackSaveClick}>Save Feedback</button>
        <button onClick={this.onLogOutClick}>Log Out</button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  feedback: state.feedback && state.feedback.feedback,
  isFetchingFeedback: state.feedback.isFetching,
  isSavingFeedback: state.feedback.isSaving
})
export default connect(mapStateToProps)(LoggedInPage);
