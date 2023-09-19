import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    activitiesList: [],
    lessonsList: [],
    typesList: [],
    searchQuery: "",
    loadComplete: false,
    nasaQuery: {},
    nasaLoadComplete: false,
};

export const nasaApiFetch = createAsyncThunk("nasa/fetch", async () => {
    try {
        const response = await fetch('https://images-api.nasa.gov/search?q=planet', {
            method: 'GET',
        });
        if (!response.ok) {
            return rejectWithValue('Nasa fetch failed :(')
        };
        const data = await response.json();
        return data;
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});

export const fetchData = createAsyncThunk("data/fetch", async () => {
    const endPoints = [
        fetch("https://cosmokids.eu/api/activities", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }),
        fetch("https://cosmokids.eu/api/lessons", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }),
        fetch("https://cosmokids.eu/api/types", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }),
    ];

    try {
        const [activities, lessons, types] = await Promise.all(endPoints);
        const activitiesData = await activities.json();
        const lessonsData = await lessons.json();
        const typesData = await types.json();

        return { activitiesData, lessonsData, typesData };
    } catch (error) {
        throw new Error("Oups une erreur est survenue");
    }
});

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        updateSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.activitiesList = action.payload.activitiesData;
                state.lessonsList = action.payload.lessonsData;
                state.typesList = action.payload.typesData;
                state.loadComplete = true;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(nasaApiFetch.fulfilled, (state, action) => {
                state.nasaQuery = action.payload.collection;
                state.nasaLoadComplete = true;
            })
            .addCase(nasaApiFetch.rejected, (state, action) => {
                state.error = action.error.message;
            });
        // .addCase(fetchActivity.pending, (state, action) => {

        // })
    },
});

export const { updateSearchQuery } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
