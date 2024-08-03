import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
// import Navigation from './Components/Navigation/Navigation';
import Login from './Components/Signups/Login';
import Mcategory from './Components/Categories/Mcategory';
import Osignup from './Components/Signups/Osignup';
import ProviderSignup from './Components/Signups/ProviderSignup';
import SeekerSignup from './Components/Signups/SeekerSignup';
import Fashioncat from './Components/Categories/Fashioncat';
import Foodcat from './Components/Categories/Foodcat';
import Appliancecat from './Components/Categories/Appliancecat';
import Movingcat from './Components/Categories/Movingcat';
import Help from './Components/Dashboard/Help';
import Details from './Components/Categories/Details';
import Book from './Components/Categories/Book';
import Dashboard from './Components/Dashboard/Dashboard';
import Userprof from './Components/Categories/Userprof';
import Mainadmin from './Components/AdminDashboard/Mainadmin';
import ProductForm from './Components/AdminDashboard/ProductForm';
import ResetPassword from './Components/Signups/ResetPassword';
import PrivateRoute from './Components/PrivateRoute';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 


function App() {
  return (
    <Router>
      <div className='App'>
        {/* <Navigation/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Mcategory />} />
          <Route path="/signup" element={<Osignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Psignup" element={<ProviderSignup />} />
          <Route path="/Ssignup" element={<SeekerSignup />} />
        
          <Route element={<PrivateRoute />}>
            <Route path="/fashionmore" element={<Fashioncat />} />
            <Route path="/foodmore" element={<Foodcat />} />
            <Route path="/appliancemore" element={<Appliancecat />} />
            <Route path="/movingmore" element={<Movingcat />} />
            <Route path="/help" element={<Help/>} />
            <Route path="/details" element={<Details/>} />
            <Route path="/book" element={<Book/>} />
            <Route path="/profile" element={<Userprof/>} />
            <Route path="/dashboard/addproduct" element={<ProductForm/>} />
          </Route>
          <Route path='/admintest' element={<Dashboard />} />
          <Route
            path="/admin"
            element={<PrivateRoute allowedRoles={['admin']} />}
          >
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route
            path="/dashboard"
            element={<PrivateRoute allowedRoles={['provider']} />}
          >
            <Route path="" element={<Mainadmin />} />
          </Route>
          <Route path='/resetpassword' element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
