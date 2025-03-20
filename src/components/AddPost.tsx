import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Box, Input, Text } from '@chakra-ui/react'
import { addPosts } from '../redux/postsSlice';
import { RootState } from '../redux/store';
import { createPost } from '../services/postApi';
import { PostInputTypes, IPost } from '../types';

const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            return navigate("/");
        }
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PostInputTypes>();

    const onSubmit = async (e: unknown) => {
        try {
            const data = await createPost(e as unknown as IPost);
            dispatch(addPosts(data));
            reset();
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Box textAlign='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("title", { required: true })} placeholder='Title' w={400} />
            {errors.title && <Text fontSize='15px' color='tomato'>
                This field is required
            </Text>} <br />

            <Input {...register("content", { required: true })} placeholder='Content' w={400} />
            {errors.content && <Text fontSize='15px' color='tomato'>
                This field is required
            </Text>} <br />

            <Input type="submit" value='Add' w={400} cursor='pointer' />
        </form>
        </Box>
    )
};

export default AddPost;
