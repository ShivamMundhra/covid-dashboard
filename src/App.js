import React, { useState } from "react";
import NavBar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Guide from "./containers/Guide/Guide";
import State from "./containers/State/State";
import "./App.css";

import { DARK_THEME } from "./utils/constants";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showWarning, setShowwarning] = useState(false);
  const toggleNav = () => {
    setIsNavOpen((isNavOpen) => !isNavOpen);
  };
  const toggleWarning = () => {
    setShowwarning((showWarning) => !showWarning);
  };
  return (
    <div className="App" style={{ backgroundColor: DARK_THEME.test }}>
      {showWarning ? (
        <div className="warningModal">
          <div className="backdrop1" onClick={toggleWarning} />
          <div className="modal">
            This is a project made for Practice Only. Covid Data is sourced
            through an external Api. I do not gurantee that it is 100% accurate.
            Please Refer to official govt website for accurate Data
          </div>
        </div>
      ) : null}
      <NavBar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        toggleWarning={toggleWarning}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <Home isNavOpen={isNavOpen} />}
        />
        <Route
          exact
          path="/state/:stateId"
          render={(routeProps) => <State isNavOpen={isNavOpen} />}
        />
        <Route
          exact
          path="/guide"
          render={(routeProps) => <Guide isNavOpen={isNavOpen} />}
        />
      </Switch>
    </div>
  );
}

export default App;
