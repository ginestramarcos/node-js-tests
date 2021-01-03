/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {MyComponent} from './components/MyComponent';
import {Products} from './components/Products';
import music from './images/music.png';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/templatized">
          <Templatized />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route exact path="/">
          <div>
            Welcome to React!
            <img style={{display: 'block'}} src={music} />
            <MyComponent name="your name here"/>
          </div>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function Templatized() {
  return <h2>Templatized here</h2>;
}

function NotFound() {
  return <h2>Not found here</h2>;
}

ReactDOM.render(<App />, document.getElementById('root'));
