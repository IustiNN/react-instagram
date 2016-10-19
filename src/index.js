import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Router, Route, IndexRoute, browserHistory  } from 'react-router';
import App from './App';
import Grid from './components/Grid';
import Single from './components/Single';
import './index.css';

const router = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Grid} />
            <Route path="/view/:postId" component={Single}/>
        </Route>
    </Router>
);
ReactDOM.render(
    router,
  document.getElementById('root')
);
