import React from 'react';
import ReactDOM from 'react-dom';

import './app.less';

import {Page, DraggableButton} from './index.jsx';

function App(props) {
  return (
    <Page>
      <DraggableButton/>
    </Page>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));
