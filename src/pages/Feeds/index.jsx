import RedditFeed from "../../components/RedditFeed";
import {
  Typography,
} from "@material-tailwind/react";

const Feeds = () =>{

  return(
    <>
    
    <section className="container mx-auto py-8 px-8">
    <div className="flex justify-between md:items-center">
      <div>
        <Typography className="font-bold">Latest Posts</Typography>
        <Typography
          variant="small"
          className="font-normal text-gray-600 md:w-full w-4/5"
        >
         Curated Feed from social platforms you can share with friends, report post and save post
        </Typography>
      </div>
    </div>

  </section>
      <RedditFeed/>
    </>
  ) 

  }

  export default Feeds;