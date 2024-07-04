import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import serverAPI from '../../http/serverAPI';
import { limits } from '../../settings/limitSettings';

const initState = {
  page: 1,
  limit: limits.filter((l) => l.defaultValue)[0].value,
  pages: 1,
  count: 5,
  status: 'loaded',
};

export const fetchPostsCount = createAsyncThunk('posts/fetchPostsCount', async () => {
  const { data } = await serverAPI.get('/posts/count');
  return data;
});

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsCount.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPostsCount.fulfilled, (state, action) => {
      state.pages = Math.ceil(action.payload.count / state.limit);
      state.count = action.payload.count;
      state.status = 'loaded';
    });
    builder.addCase(fetchPostsCount.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const paginationReducer = paginationSlice.reducer;
export const { changePage, changeLimit } = paginationSlice.actions;
