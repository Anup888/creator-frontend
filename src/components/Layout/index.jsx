// Layout.jsx
import { Navbar, Drawer, List, ListItem, Card } from '@material-tailwind/react';
import { Outlet } from 'react-router-dom';
import HeaderNav from '../Header';
import Sidebar from '../Sidebar';

const Layout = ()=> {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar/>
     
      {/* Page Content */}
      <Card className="ml-66 flex-1 overflow-auto bg-gray-50">
        {/* <HeaderNav/> */}
        <Outlet /> {/* Renders the child route */}
      </Card>
     </div>
    
  );
}

export default Layout;
