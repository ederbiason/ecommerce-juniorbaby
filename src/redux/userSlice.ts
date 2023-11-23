import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await axios.get('/api/users')
    return response.data
});

export const userSlice = createSlice({
    initialState: {
        currentUser: null,
        status: 'idle',
        name: 'No user',
    },
    name: 'user',
    reducers: {
        SetCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'complete'
            state.name = action.payload
        })
    }
})

export const { SetCurrentUser } = userSlice.actions
