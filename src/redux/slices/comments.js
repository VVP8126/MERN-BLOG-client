import serverAPI from '../../http/serverAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initState = {
  comments: {
    items: [],
    status: 'loading',
  },
};

export const fetchLastComments = createAsyncThunk('comments/fetchLastComments', async () => {
  const { data } = await serverAPI.get('/comments');
  return data;
});

export const fetchPostComments = createAsyncThunk('comments/fetchPostComments', async (id) => {
  const { data } = await serverAPI.get(`/comments/${id}`);
  return data;
});

export const fetchCreateComment = createAsyncThunk(
  'comments/fetchCreateComment',
  async (params) => {
    const { data } = await serverAPI.post('/comments', params);
    return data;
  },
);

export const fetchDeleteComment = createAsyncThunk('comments/fetchDeleteComment', async (id) => {
  const { data } = await serverAPI.delete(`/comments/${id}`);
  return data;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initState,
  reducer: {},
  extraReducers: (builder) => {
    // Select 5 last comments
    builder.addCase(fetchLastComments.pending, (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    });
    builder.addCase(fetchLastComments.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    });
    builder.addCase(fetchLastComments.rejected, (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    });

    // Select post comments
    builder.addCase(fetchPostComments.pending, (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    });
    builder.addCase(fetchPostComments.rejected, (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    });

    // Add comment
    builder.addCase(fetchCreateComment.pending, (state) => {
      state.comments.status = 'loading';
    });
    builder.addCase(fetchCreateComment.fulfilled, (state, action) => {
      state.comments.items = [...state.comments.items, action.payload];
      state.comments.status = 'loaded';
    });
    builder.addCase(fetchCreateComment.rejected, (state) => {
      state.comments.status = 'error';
    });

    // Delete comment
    builder.addCase(fetchDeleteComment.pending, (state) => {
      state.comments.status = 'loading';
    });
    builder.addCase(fetchDeleteComment.fulfilled, (state, action) => {
      state.comments.items = state.comments.items.filter((item) => item._id !== action.payload);
      state.comments.status = 'loaded';
    });
    builder.addCase(fetchDeleteComment.rejected, (state) => {
      state.comments.status = 'error';
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
