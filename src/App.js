import { Switch, Route } from 'react-router-dom';
import './App.css';

//hoc
import WithAuth from './hoc/withAuth';

// component
import Login from './Components/Login/login';
import AdminDashboard from './Components/Admin_Dashboard/admin_Dashboard';
import UserDashboard from './Components/User_Dashboard/user_Dashboard'
import ProductDetails from './Components/Product_Details/product_Details';
import OrderCart from './Components/Order_Cart/order_Cart';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin-dashboard" render={() => (
          <WithAuth>
            <AdminDashboard />
          </WithAuth>
        )} />

        <Route path="/user-dashboard" render={() => (
          <WithAuth>
            <UserDashboard />
          </WithAuth>
        )} />

        <Route path="/product-details" render={() => (
          <WithAuth>
            <ProductDetails />
          </WithAuth>
        )} />

        <Route path="/order-cart" render={() => (
          <WithAuth>
            <OrderCart />
          </WithAuth>
        )} />

        <Route path="/" exact render={() => (
          <Login />
        )} />

      </Switch>
    </div>
  );
}

export default App;
