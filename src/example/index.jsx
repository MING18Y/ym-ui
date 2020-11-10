import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import DraggableButton
  from '../components/draggable_button/DraggableButton.jsx';

function App(props) {
  console.log('loaded app');
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <div className="root">
            <DraggableButton/>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('app'),
);
