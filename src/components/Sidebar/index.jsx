import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    PowerIcon
  } from "@heroicons/react/24/solid";

  import { useDispatch, useSelector } from "react-redux";
  import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../store/slices/userProfileSlice";


   
  const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ⬅️ Initialize navigate
    const user = useSelector((state)=>state.auth.user);

    const handleLogout = () => {
      dispatch(logout());      // Dispatch logout action
      navigate('/signin');  
    };

    const handleNavigation = (path)=>{
      navigate(path); 
    }

    const handleDashBoardNavigation = ()=>{
      dispatch(fetchUserProfile());
      navigate('/dashboard');  
      
    }

    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Creator App
          </Typography>
        </div>
        <List>
          <ListItem onClick={()=>{handleNavigation('/feeds')}}> 
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Feed
          </ListItem>
          <ListItem onClick={()=>{handleDashBoardNavigation()}}>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          
          <ListItem onClick={()=>handleNavigation('/profile')}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }

  export default Sidebar;
