import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Box, Flex, Link } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { debounce } from "lodash";
import { deletePost, editPost, fetchPosts } from '../services/postApi';
import AddPost from './AddPost';
import { setPosts, editPosts, removePosts, setPagination } from '../redux/postsSlice';
import { IPost } from '../types';

const PostList = () => {
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const { posts, pagination } = useSelector((state: any) => state.posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const getData = async (page = pagination.page, search = searchTerm) => {
    if (abortController) {
      abortController.abort();
    }

    const newController = new AbortController();
    setAbortController(newController);

    try {
      const data = await fetchPosts({ ...pagination, page }, search, newController.signal);
      dispatch(setPosts(data.posts));
      dispatch(setPagination(data.pagination));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [pagination.page, pagination.search]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const removePost = async (id: number) => {
    try {
      await deletePost(id);
      dispatch(removePosts(id));
    } catch (error) {
      console.log(error);
    }
  }

  const edit = async (post: IPost) => {
    if (editPostId === post.id) {
      try {
        const data = await editPost(post.id, { title: watch('title'), content: watch('content') });
        dispatch(editPosts(data));
        window.location.reload();
      } finally {
        setEditPostId(null);
      }
    } else {
      setEditPostId(post.id);
    }
  }

  const debouncedSearch = useCallback(
    debounce((value) => {
      getData(1, value);
    }, 700),
    []
  );

  return (
    <>
      <Button colorScheme='red' onClick={logout}>Logout</Button>
      <AddPost /> <br />
      <Input
        {...register("search")}
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          debouncedSearch(e.target.value);
        }}
      />;
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr w={500}>
              <Th>Title</Th>
              <Th>Content</Th>
              <Th isNumeric>Created date</Th>
              <Th>See post</Th>
              <Th>Delete</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts?.map((post: IPost) => (
              <Tr key={post.id}>
                <Td>{editPostId === post.id ? <Input {...register("title", { required: true })} defaultValue={post.title} /> : post.title}</Td>
                <Td>{editPostId === post.id ? <Input {...register("content", { required: true })} defaultValue={post.content} /> : post.content}</Td>
                <Td isNumeric>{post.createdAt}</Td>
                <Td>
                  <Link color='blue.400' target='_blank' href={`/post/${post.id}`}>See post</Link>
                </Td>
                <Td><Button colorScheme='red' onClick={() => removePost(post.id)}>Remove Post</Button></Td>
                <Td><Button colorScheme={editPostId === post.id ? "green" : "blue"} onClick={handleSubmit(() => edit(post))}>{editPostId === post.id ? "Save" : "Edit Post"}</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify="center" align="center" mt={4} gap={2}>
        <Button
          onClick={async () => {
            const newPagination = { ...pagination, page: pagination.page - 1 };
            dispatch(setPagination(newPagination));
          }}
          isDisabled={pagination.page === 1}
        >
          Previous
        </Button>
        <Box>
          Page {!posts?.length ? 0 : pagination.page} of {pagination.totalPages}
        </Box>
        <Button
          onClick={async () => {
            const newPagination = { ...pagination, page: pagination.page + 1 };
            dispatch(setPagination(newPagination));
          }}
          isDisabled={pagination.page === pagination.totalPages || pagination.totalPages == 0}
        >
          Next
        </Button>
      </Flex>
    </>
  );
};

export default PostList;
