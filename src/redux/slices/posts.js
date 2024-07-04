import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import serverAPI from '../../http/serverAPI';

const initState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

export const fetchRemovePostAndComments = createAsyncThunk(
  'posts/fetchRemovePostAndComments',
  async (id) => {
    const comments = await serverAPI.get(`/comments/${id}`);
    const commentsData = comments.data;
    for (let index = 0; index < commentsData.length; index++) {
      await serverAPI.delete(`/comments/${commentsData[index]._id}`);
    }
    const { data } = await serverAPI.delete(`/posts/${id}`);
    // console.log('Result after delete operation: ', data);
    return data;
  },
);

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  const { data } = await serverAPI.delete(`/posts/${id}`);
  console.log('Result after delete operation: ', data);
  return data;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await serverAPI.get('/posts');
  return data;
});

export const fetchPostsPaginating = createAsyncThunk(
  'posts/fetchPostsPaginating',
  async (params) => {
    const { data } = await serverAPI.post('/posts/paginate', params);
    return data;
  },
);

export const fetchAuthorPosts = createAsyncThunk('/posts/fetchAuthorPosts', async (postId) => {
  const { data } = await serverAPI.post('/posts/author', { _id: postId });
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await serverAPI.get('/posts/tags');
  return data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: initState,
  reducer: {},
  extraReducers: (builder) => {
    // Select posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    });

    // Select posts using pagination
    builder.addCase(fetchPostsPaginating.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPostsPaginating.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    });
    builder.addCase(fetchPostsPaginating.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    });

    // Select Author posts
    builder.addCase(fetchAuthorPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchAuthorPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    });
    builder.addCase(fetchAuthorPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    });

    // Select tags
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    });

    // Delete post - without comments
    builder.addCase(fetchRemovePost.pending, (state) => {
      state.posts.status = 'loading';
    });
    builder.addCase(fetchRemovePost.fulfilled, (state, action) => {
      state.posts.items = state.posts.items.filter((item) => item._id !== action.meta.arg);
      state.posts.status = 'loaded';
    });
    builder.addCase(fetchRemovePost.rejected, (state) => {
      state.tags.status = 'error';
    });

    // Delete post - with comments
    builder.addCase(fetchRemovePostAndComments.pending, (state) => {
      state.posts.status = 'loading';
    });
    builder.addCase(fetchRemovePostAndComments.fulfilled, (state, action) => {
      state.posts.items = state.posts.items.filter((item) => item._id !== action.meta.arg);
      state.posts.status = 'loaded';
    });
    builder.addCase(fetchRemovePostAndComments.rejected, (state) => {
      state.tags.status = 'error';
    });
  },
});

export const postsReducer = postsSlice.reducer;
