import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import FruitRoute from './routes/Fruit/Fruit';
import FruitFormRoute from './routes/Fruit/FruitForm';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={FruitRoute} />
        <Route path="/fruit"  component={FruitRoute} />
        <Route path="/fruitForm"  component={FruitFormRoute} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
