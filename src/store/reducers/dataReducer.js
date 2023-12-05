import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataList: {
        activities: [],
        lessons: [],
        types: [],
    },
    searchQuery: "",
    loadComplete: false,
    landingImage: { url: "", title: "", explanation: "" },
};

export const TranslateText = createAsyncThunk("nasa/translate", async ({ text }, { rejectWithValue }) => {
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
        const { data } = await response.json();
        const translatedText = data.translations[0].translatedText;
        return translatedText
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});

export const FetchLandingImage = createAsyncThunk("nasa/fetch", async ({ randomDate }, { rejectWithValue }) => {
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
    try {
        const response = await fetch('https://admin.cosmokids.eu/api/data', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error("Oups une erreur est survenue");
    };
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
                state.dataList = action.payload;
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
