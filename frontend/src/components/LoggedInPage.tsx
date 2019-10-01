import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchFeedback, saveFeedback } from "../actions/feedback";
import { logout } from "../actions/session";
import { AppState } from "../store";
import Loading from "./Loading";
import "./LoggedInPage.css";

interface Props {
  dispatch: ThunkDispatch<any, any, any>;
  isFetchingFeedback: boolean;
  isSavingFeedback: boolean;
  feedback?: string;
}
interface State {
  feedback?: string;
}
class LoggedInPage extends React.Component<Props, State> {
  public state = {
    feedback: "",
  };
  public componentDidUpdate(prevProps: Props) {
    // When we've finished loading feedback from the backend, stick it into the
    // existing text area
    if (prevProps.feedback !== this.props.feedback) {
      this.setState({feedback: this.props.feedback});
    }
  }
  public componentDidMount() {
    this.props.dispatch(fetchFeedback());
  }
  public onLogOutClick = () => {
    this.props.dispatch(logout());
  }
  public onFeedbackSaveClick = () => {
    let feedback = this.state.feedback;
    if (feedback == null) { feedback = ""; }
    this.props.dispatch(saveFeedback(feedback));
  }
  public onFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({feedback: event.target.value});
  }
  public render() {
    if (this.props.isFetchingFeedback) { return <Loading />; }
    return (
      <div className="loggedInPage">
        <h2>Feedback:</h2>
        <textarea
          value={this.state.feedback}
          onChange={this.onFeedbackChange}
          placeholder="Write your thoughts here..."
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
  isSavingFeedback: state.feedback.isSaving,
});
export default connect(mapStateToProps)(LoggedInPage);
