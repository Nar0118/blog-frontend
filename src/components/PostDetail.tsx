import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../services/postApi';
import { IPost } from '../types';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(id as string);
        setPost(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return 'Loading...';
  if (!post) return <p>No post found</p>;

  return (
    <div>
      <h3>{post?.title}</h3>
      <p>{post?.content}</p>
    </div>
  );
};

export default PostDetail;
