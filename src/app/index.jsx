import React from 'react';
import {render} from 'react-dom';

class NotePasta extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}

render(<NotePasta/>, document.getElementById('app'));
