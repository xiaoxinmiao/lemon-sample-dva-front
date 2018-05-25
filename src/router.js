import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import FruitRoute from './routes/Fruit/Fruit';
import FruitFormRoute from './routes/Fruit/FruitForm';
import TableRoute from './routes/Table';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={FruitRoute} />
        <Route path="/fruit"  component={FruitRoute} />
        <Route path="/fruitForm"  component={FruitFormRoute} />
        <Route path="/table"  component={TableRoute} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
