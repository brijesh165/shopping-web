import { Switch, Route } from 'react-router-dom';
import './App.css';

//hoc
import Authentication from './hoc/withAuth';

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
        <Route path="/admin-dashboard" component={Authentication(AdminDashboard)} />

        <Route path="/user-dashboard" component={Authentication(UserDashboard)} />

        <Route path="/product-details" component={ProductDetails} />

        <Route path="/order-cart" component={OrderCart} />

        <Route path="/" exact component={Login} />

      </Switch>
    </div >
  );
}

export default App;
