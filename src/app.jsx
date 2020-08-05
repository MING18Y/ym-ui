import React from "react";
import ReactDOM from "react-dom";

import YMUI from './index.jsx'

function App(props) {
  return <React.Fragment>
    <YMUI.DraggableButton />
  </React.Fragment>;
}

ReactDOM.render(<App />, document.getElementById("app"));
