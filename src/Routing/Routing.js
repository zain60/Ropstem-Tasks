import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ClaimList from "../components/ClaimList";

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <publicRoute
            exact
            path="/Mine"
            render={() => <ClaimList/>}  />

          <publicRoute
            exact
            path="/pool" render={() => <ClaimList {...this.props} />} />

        </Switch>
      </Router>
    );
  }
}

export default Routing;
