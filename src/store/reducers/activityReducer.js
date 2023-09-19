import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { complete_activity, complete_lesson } from "./userReducer";

const initialState = {
    isActivityFullscreen: false
};

export const sendCompleteLesson = createAsyncThunk('lesson/complete', async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        const response = await fetch(`https://cosmokids.eu/api/completeLesson/${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                Authorization: "Bearer " + getState().userData.access_token
            },
        });

        if (!response.ok) {
            return rejectWithValue('Lesson already completed')
        };

        const { completed_lesson } = await response.json();
        dispatch(complete_lesson(completed_lesson))
        //return data;

    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});

export const sendCompleteActivity = createAsyncThunk('activity/complete', async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        const response = await fetch(`https://cosmokids.eu/api/completeActivity/${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                Authorization: "Bearer " + getState().userData.access_token
            },
        });

        if (!response.ok) {
            return rejectWithValue('Activity already completed')
        };

        const { completed_activity } = await response.json();
        dispatch(complete_activity(completed_activity))

    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});

const activitySlice = createSlice({
    name: "current_activity",
    initialState: initialState,
    reducers: {
        toggleFullscreen(state) {
            state.isActivityFullscreen = true;
        },
        exitFullscreen(state) {
            state.isActivityFullscreen = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(sendCompleteActivity.fulfilled, () => {
            })
            .addCase(sendCompleteActivity.rejected, (state, action) => {
                state.error = action.payload;
            })

    }
});

export const { toggleFullscreen, exitFullscreen } = activitySlice.actions;
export const activityReducer = activitySlice.reducer;