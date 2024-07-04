import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import serverAPI from '../../http/serverAPI';

const initState = {
  data: null,
  status: 'loading',
};

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
  const { data } = await serverAPI.post('/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await serverAPI.post('/register', params);
  return data;
});

export const fetchPersonalData = createAsyncThunk('auth/fetchPersonalData', async () => {
  const { data } = await serverAPI.get('/user');
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    });

    builder.addCase(fetchPersonalData.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchPersonalData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchPersonalData.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    });
  },
});

export const userIsAuthorized = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
