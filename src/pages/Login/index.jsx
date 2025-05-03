import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRedditFeed } from "../../store/slices/redditFeedSlice";



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const { control, handleSubmit, formState: { errors } } = useForm();

  useEffect(()=>{
     if(success){
        navigate('/feeds');
     }
  },[success,navigate]);

  const onSubmit = (data) => {
    try {
      dispatch(loginUser(data));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
    
    {loading ? <Loader/> : 
    (<div className="flex items-center justify-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
              )}
            />
            {errors.email && <Typography color="red" className="text-sm">{errors.email.message}</Typography>}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
              )}
            />
            {errors.password && <Typography color="red" className="text-sm">{errors.password.message}</Typography>}
          </div>

          
          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>
          {error && <Typography color="red" className="text-sm">{error}</Typography>}
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-gray-900">
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </div>)}
    </>
  );
};

export default Login;
