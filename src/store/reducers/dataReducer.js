import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    activitiesList: [],
    lessonsList: [],
    typesList: [],
    searchQuery: "",
    loadComplete: false,
    landingImage: {url: "", title: "", explanation: ""},
};

export const TranslateText = createAsyncThunk("nasa/translate", async ({ text }, {rejectWithValue}) => {
    try {
        const key = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}&q=${text}&source=en&target=fr`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        if (!response.ok) {
            return rejectWithValue('Impossible de récupérer la traduction')
        };
        const {data} = await response.json();
        const translatedText = data.translations[0].translatedText;
        return translatedText
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});

export const FetchLandingImage = createAsyncThunk("nasa/fetch", async ({ randomDate }, {rejectWithValue}) => {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=iFnDtQXwdO9DgnVcGErEqV2WBvgOe8xnVU9fQgsq&date=${randomDate}`, {
            method: 'GET',
        });
        if (!response.ok) {
            return rejectWithValue('Impossible de récupérer l\'image du jour')
        };
        const data = await response.json();
        return data;
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});

export const fetchData = createAsyncThunk("data/fetch", async () => {
    const endPoints = [
        fetch("https://admin.cosmokids.eu/api/activities", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }),
        fetch("https://admin.cosmokids.eu/api/lessons", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }),
        fetch("https://admin.cosmokids.eu/api/types", {
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
        setIsLoading: (state) => {
            state.loadComplete = false;
        }
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
            .addCase(FetchLandingImage.fulfilled, (state, action) => {
                state.landingImage = action.payload;
                state.loadComplete = true;
            })
            .addCase(FetchLandingImage.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(FetchLandingImage.pending, (state) => {
                state.loadComplete = false;
            })
            .addCase(TranslateText.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(TranslateText.fulfilled, (state, action) => {
                state.landingImage.explanation = action.payload;
            });
    },
});

export const { updateSearchQuery, setIsLoading } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
