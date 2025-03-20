import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <ChakraProvider>

      <Router>
        <Routes>
          <Route path="/login" element={<Login isLogin />} />
          <Route path="/register" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PostList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <PostDetail />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<>Not Found</>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
