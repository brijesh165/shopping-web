import { Switch, Route } from 'react-router-dom';
import './App.css';

//hoc
import withAuth from './hoc/withAuth';

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
        <Route path="/" exact render={() => (
          <Login />
        )} />

        <Route path="/admin-dashboard" render={() => (
          <withAuth>
            <AdminDashboard />
          </withAuth>
        )} />

        <Route path="/user-dashboard" render={() => (
          <withAuth>
            <UserDashboard />
          </withAuth>
        )} />

        <Route path="/product-details" render={() => (
          <withAuth>
            <ProductDetails />
          </withAuth>
        )} />

        <Route path="/order-cart" render={() => (
          <withAuth>
            <OrderCart />
          </withAuth>
        )} />

      </Switch>
    </div>
  );
}

export default App;
