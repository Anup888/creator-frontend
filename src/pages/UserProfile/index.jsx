// src/components/UserProfile/UserProfile.js
import { Typography } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { fetchUserProfile } from '../../store/slices/userProfileSlice';

import ProfileCard from "../../components/ProfileCard";



// const UserProfile = () => {
//   const dispatch = useDispatch();
//   const { profile, loading, error } = useSelector((state) => state.userProfile);

//   useEffect(() => {
//     dispatch(fetchUserProfile());
//   }, [dispatch]);

//   if (loading) return <Loader/>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!profile) return null;

//   return (

//     <section className="container mx-auto py-8 px-8">
//       <div className="flex justify-between md:items-center">
//         <div>
//           <Typography className="font-bold">Profile Section</Typography>
//           <Typography
//             variant="small"
//             className="font-normal text-gray-600 md:w-full w-4/5"
//           >
//             Your Profile 
//           </Typography>
//         </div>
//       </div>
//       <div className="mt-6 grid items-center md:gap-2.5 gap-4">
//       {/* <h1 className="text-2xl font-bold">User Profile</h1> */}
//       <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Credit:</strong> {profile.credit}</p>
//       <p><strong>Role:</strong> {profile.role}</p>
//       </div>
//     </section>
    
//   );
// };

// export default UserProfile;






const UserProfile = () =>{

  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) return <Loader/>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return null;

  return (
    <section className="min-h-screen py-8 px-8">
    <div className="container mx-auto">
      <div className="text-center">
        <Typography
          variant="h6"
          color="blue-gray"
          className="text-lg"
        >
         Profile Section
        </Typography>
      </div>
      <div className="grid gap-6">
          <ProfileCard profile={profile} />
      </div>
    </div>
  </section>
  );
}

export default UserProfile;




