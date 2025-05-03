import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reportPost, savePost, sharePost } from '../../store/slices/postActionSlice';
import { fetchRedditFeed } from '../../store/slices/redditFeedSlice';
import Loader from '../Loader/Loader';

const RedditFeed = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, nextPage } = useSelector((state) => state.redditFeed);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  

  useEffect(() => {
    // Fetch initial set of posts when the component mounts
    dispatch(fetchRedditFeed());
  }, []);

  useEffect(() => {
    // Listen to the scroll event to detect when user reaches the bottom
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      // If user is at the bottom of the page and there's more posts to load
      if (currentScroll >= scrollableHeight - 100 && nextPage && !isLoadingMore) {
        setIsLoadingMore(true);
        dispatch(fetchRedditFeed(nextPage)).finally(() => {
          setIsLoadingMore(false);
        });
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextPage, isLoadingMore, dispatch]);

  const handleSave = (post) => {
    dispatch(savePost(post)).then(() => alert("Post saved!"));
  };

  const handleShare = (post) => {
    navigator.clipboard.writeText(post.url)
      .then(() => {
        dispatch(sharePost(post));
        alert("Link copied & share recorded!");
      })
      .catch(() => alert("Failed to copy link"));
  };
  
  const handleReport = (post) => {
    dispatch(reportPost(post)).then(() => alert("Post reported."));
  };

  

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
      return (
    <div className="p-4">
     
      {posts.map((post, idx) => (
        <div key={idx} className="bg-white p-4 mb-4 shadow rounded space-y-2">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <a
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline block"
          >
            View on Reddit
          </a>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <button onClick={() => handleSave(post)} className="hover:underline">💾 Save</button>
            <button onClick={() => handleShare(post)} className="hover:underline">🔗 Share</button>
            <button onClick={() => handleReport(post)} className="hover:underline text-red-500">🚩 Report</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RedditFeed;
