import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { commentsReducer } from './slices/comments';
import { paginationReducer } from './slices/pagination';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comments: commentsReducer,
    pagination: paginationReducer,
  },
});

export default store;
