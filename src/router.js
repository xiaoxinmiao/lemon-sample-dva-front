import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import FruitListRoute from './routes/Fruit/FruitList';
import FruitRoute from './routes/Fruit/Fruit';
import TableRoute from './routes/Table';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={FruitListRoute} />
        <Route path="/fruitList"  component={FruitListRoute} />
        <Route path="/fruit"  component={FruitRoute} />
        <Route path="/table"  component={TableRoute} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
