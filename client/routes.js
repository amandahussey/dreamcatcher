import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import PropTypes from "prop-types";
import history from "./history";
import { Main, Login, Signup, UserHome, HomeSpeechContainer, SpeechContainer, DreamHistory } from "./components";
import { me, fetchDreams } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, dreams } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path="/dream-history" render={() => <DreamHistory dreams={dreams}/> } />
            <Route exact path="/record-new-dream" component={HomeSpeechContainer} />
            <Route exact path="/" component={HomeSpeechContainer} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    dreams: state.dreams
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchDreams());
    }
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
