import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Feeds from './pages/Feeds';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import { useSelector } from 'react-redux';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/UserProfile';

function App() {
  const {isAuthenticated, user} = useSelector((state)=> state.auth);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register/>}/>
        <Route element={<Layout/>}>
          <Route path="/feeds" element={isAuthenticated && <Feeds />} />
          <Route path="/profile" element={isAuthenticated && <UserProfile />} />
          <Route path="/dashboard" element={isAuthenticated && user.role == 'USER' ? <UserDashboard/> :<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
