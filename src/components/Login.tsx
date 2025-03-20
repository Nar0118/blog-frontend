import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Box, Input, Link, Text } from '@chakra-ui/react';
import { login } from '../redux/authSlice';
import { loginUser, registerUser } from '../services/authApi';
import { RootState } from '../redux/store';
import { LoginInputTypes } from '../types';



const Login = ({ isLogin }: { isLogin?: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputTypes>()
  const onSubmit: SubmitHandler<LoginInputTypes> = async (e) => {
    try {
      let data;
      if (isLogin) {
        data = await loginUser(e);
      } else {
        data = await registerUser(e);
      }

      localStorage.setItem("token", data.token);
      dispatch(login(data));
      navigate("/");
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Box textAlign='center'>
      <Text fontSize='30px'>
        {isLogin ? 'Log in' : "Registration"}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input w={400} {...register("username", { required: true })} placeholder='Username' />
        {errors.username && <Text fontSize='15px' color='tomato'>
          This field is required
        </Text>} <br />

        <Input w={400} {...register("password", { required: true })} placeholder='Password' />
        {errors.password && <Text fontSize='15px' color='tomato'>
          This field is required
        </Text>} <br />

        <Input w={400} type="submit" value={isLogin ? 'Login' : 'Register'} cursor='pointer' /> <br />
        <Link href={isLogin ? '/register' : '/login'} display='block' color='blue.300'>
          {isLogin ? 'Register' : 'Login'}
        </Link>
      </form>
    </Box>
  )
};

export default Login;
