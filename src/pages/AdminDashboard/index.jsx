
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import TableCard from '../../components/TableCard';
import { fetchUserAnalytics } from '../../store/slices/adminSlice';


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { userAnalytics, feedActivity, loading, error } = useSelector((state) => state.admin);
  const completeUserData = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUserAnalytics());  // Dispatch to fetch user analytics and feed activity
  }, [dispatch]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  if (loading) return <Loader/>;
  if (error) return <p className="text-red-500">{error}</p>;


const userData = userAnalytics.map((item)=>{
  const {recentActivity} = item;
  const fullName = `${item.firstName} ${item.lastName}`;
  const postShared = recentActivity.filter((post)=>post.type === 'SHARE').length;
  const postSaved = recentActivity.filter((post)=>post.type === 'SAVE').length;
  const postReported = recentActivity.filter((post)=>post.type === 'REPORT').length;
  const totalActivities = recentActivity.length;

return {
  img:`https://www.material-tailwind.com/img/avatar3.jpg`,
  fullName: fullName,
  email: item.email ,
  credits: item.credit,
  postShared,
  postReported,
  postSaved,
  totalActivities
}
});
  

  return (

    <TableCard userData={userData}/>
    );
};

export default AdminDashboard;


