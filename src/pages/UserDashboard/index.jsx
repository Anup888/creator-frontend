import React from "react";
import {useSelector,useDispatch } from 'react-redux';

import {
  Typography,
} from "@material-tailwind/react";

import AnalyticsCard from "../../components/AnalyticsCard";
import { formatDate } from "../../../utils/dateUtils";
import { useEffect } from "react";
import { fetchUserProfile } from "../../store/slices/userProfileSlice";
import Loader from "../../components/Loader/Loader";

const UserDashboard = ()=> {

  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.userProfile);

  useEffect(()=>{
    dispatch(fetchUserProfile());
  },[dispatch]);

   console.log('userProfile',profile);
  const {savedPosts, recentActivity, credit} = profile;

  const postReported = recentActivity.filter((post)=> post.type === 'REPORT');
  const postShared = recentActivity.filter((post)=> post.type === 'SHARE');

  const data = [
    {
      title: "Credits",
      count: credit,
     
    },
    {
      title: "Saved Post",
      count: savedPosts.length,
      
    },
    {
      title: "Recent Activities",
      count: recentActivity.length,
      
    },
    {
      title: "Post Reported",
      count: postReported.length,
     
    },
    {
      title: "Post Shared",
      count: postShared.length,
      
    },
  ];
  

  if (loading) return <Loader/>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
    
    <section className="container mx-auto py-8 px-8">
      <div className="flex justify-between md:items-center">
        <div>
          <Typography className="font-bold">Overall Analytics</Typography>
          <Typography
            variant="small"
            className="font-normal text-gray-600 md:w-full w-4/5"
          >
            Activity details recent activity , reported and credits earned.
          </Typography>
        </div>
      </div>
      <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center md:gap-2.5 gap-4">
        {data.map((props, key) => (
          <AnalyticsCard key={key} {...(props)} />
        ))}
      </div>
    </section>

    <section className="container mx-auto py-8 px-8">
      <div className="flex justify-between md:items-center">
        <div>
          <Typography className="font-bold">Saved Posts</Typography>
          <Typography
            variant="small"
            className="font-normal text-gray-600 md:w-full w-4/5"
          >
          List of post you saved
          </Typography>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 items-center md:gap-2.5 gap-4">
      <div className="bg-white p-4 rounded shadow">
         {savedPosts.length > 0 ? (
           <ul>
             {savedPosts.map((post, idx) => (
               <li key={idx} className="my-2">
                 <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">{post.title}</a>
               </li>
             ))}
           </ul>
         ) : (
          <p>No saved posts</p>
         )}
      </div>
      </div>
    </section>

    <section className="container mx-auto py-8 px-8">
      <div className="flex justify-between md:items-center">
        <div>
          <Typography className="font-bold">Recent Activity</Typography>
          <Typography
            variant="small"
            className="font-normal text-gray-600 md:w-full w-4/5"
          >
          Activities perform by you
          </Typography>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 items-center md:gap-2.5 gap-4">
      <div className="bg-white p-4 rounded shadow">
        {recentActivity.length > 0 ? (
           <ul>
            {recentActivity.map((activity, idx) => (
              <li key={idx} className="my-2">
                <span>{formatDate(activity.timestamp)}</span> - {activity.type} -{' '}
                 <a href={activity?.post?.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">{activity.post.title}</a>
               </li>
             ))}
           </ul>
        ) : (
          <p>No recent activity</p>
        )}
      </div>
      </div>
    </section>

    </>
  );
}

export default UserDashboard;
