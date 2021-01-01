import React from 'react';
import ReactDOM from 'react-dom';

import {MyComponent} from './components/MyComponent';
import music from './images/music.png';

const Index = () => {
  return (
    <div>
      Welcome to React!
      <img style={{display: 'block'}} src={music} />
      <MyComponent name="your name here"/>
    </div>
  );
};
ReactDOM.render(<Index />, document.getElementById('root'));
