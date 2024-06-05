import Container from '@mui/material/Container';
import Header from './components/Header';
import Home from './page/Home/Home';
import PostPage from './page/PostPage';
import Login from './page/Login';
import Registration from './page/Registration';
import NewPost from './page/NewPost';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
