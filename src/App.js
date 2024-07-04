import React from 'react';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Home from './page/Home/Home';
import PostPage from './page/PostPage';
import Login from './page/Login';
import Registration from './page/Registration';
import NewPost from './page/NewPost';
import TaggedPost from './page/TaggedPost';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonalData, userIsAuthorized } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(userIsAuthorized);

  React.useEffect(() => {
    dispatch(fetchPersonalData());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<NewPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/tags/:tag" element={<TaggedPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
