import { Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './Components/Login/login';
import AdminDashboard from './Components/Admin_Dashboard/admin_Dashboard';
import UserDashboard from './Components/User_Dashboard/user_Dashboard'
import ProductDetails from './Components/Product_Details/product_Details';
import OrderCart from './Components/Order_Cart/order_Cart';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => (
          <Login />
        )} />

        <Route path="/admin-dashboard" render={() => (
          <AdminDashboard />
        )} />

        <Route path="/user-dashboard" render={() => (
          <UserDashboard />
        )} />

        <Route path="/product-details" render={() => (
          <ProductDetails />
        )} />

        <Route path="/order-cart" render={() => (
          <OrderCart />
        )} />

      </Switch>
    </div>
  );
}

export default App;
