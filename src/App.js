import { Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './Components/Login/login';
import ListProducts from './Components/List_Products/list_products';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => (
          <Login />
        )} />

        <Route path="/products" render={() => (
          <ListProducts />
        )} />
      </Switch>
    </div>
  );
}

export default App;
