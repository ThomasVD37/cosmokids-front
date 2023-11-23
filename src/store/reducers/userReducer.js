import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
    user: {
        completed_activities: [],
        completed_lessons: [],
    },
    error: {},
    isLogged: false,
    access_token: "",
};
export const loginPost = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });
        if (!response.ok) {
            return rejectWithValue('Identifiants incorrects')
        };
        const data = await response.json();
        return data;
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});
export const registerPost = createAsyncThunk('user/register', async ({ email, password, pseudo }, { rejectWithValue }) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                pseudo: pseudo,
                profile_image: null
            })
        });
        if (!response.ok) {
            return rejectWithValue('E-mail ou pseudo déjà pris.')
        };
        const data = await response.json();
        return data;
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue, getState }) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                Authorization: "Bearer " + getState().userData.access_token
            },
        });
        if (!response.ok) {
            return rejectWithValue('Oups! Une erreur est survenue')
        };
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});
export const userInfoPatch = createAsyncThunk('userInfo/patch', async ({ usernamePatch, emailPatch }, { rejectWithValue, getState }) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/editUser', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: "Bearer " + getState().userData.access_token
            },
            body: JSON.stringify({
                email: emailPatch,
                pseudo: usernamePatch,
                profile_image: null
            })
        });
        if (!response.ok) {
            return rejectWithValue('E-mail ou pseudo déjà pris.')
        };
        const data = await response.json();
        return data;
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});
export const passwordPatch = createAsyncThunk('password/patch', async ({ oldPassword, newPassword }, { rejectWithValue, getState }) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/editPassword', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: "Bearer " + getState().userData.access_token
            },
            body: JSON.stringify({
                old_password: oldPassword,
                password: newPassword
            })
        });
        if (!response.ok) {
            return rejectWithValue('Le mot de passe est erroné')
        };
        const data = await response.json();
        return data;
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});

export const deleteAccount = createAsyncThunk('user/delete', async ({ passwordDeleteAccount }, { rejectWithValue, getState }) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/removeUser', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: "Bearer " + getState().userData.access_token
            },
            body: JSON.stringify({
                email: getState().userData.user.email,
                password: passwordDeleteAccount
            })
        });
        if (!response.ok) {
            return rejectWithValue('Le mot de passe est erroné')
        };
        const data = await response.json();
        return data;
    } catch (error) {
        throw rejectWithValue('Oups! Une erreur est survenue')
    };
});
const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        complete_activity(state, action) {
            state.user.completed_activities = [...state.user.completed_activities, action.payload];
        },
        complete_lesson(state, action) {
            state.user.completed_lessons = [...state.user.completed_lessons, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPost.fulfilled, (state, action) => {
                state.isLogged = true;
                state.error.email = "";
                state.access_token = action.payload.access_token;
                state.user = action.payload.user;
            })
            .addCase(loginPost.rejected, (state, action) => {
                state.error.email = action.payload;
            })
            .addCase(registerPost.fulfilled, (state, action) => {
                state.isLogged = true;
                state.error.email = "";
                state.access_token = action.payload.access_token;
                state.user = action.payload.user;
            })
            .addCase(registerPost.rejected, (state, action) => {
                state.error.email = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLogged = false;
                state.access_token = "";
                state.user = {};
                state.error.logout = "";
            })
            .addCase(logout.rejected, (state, action) => {
                state.error.logout = action.payload;
            })
            .addCase(userInfoPatch.fulfilled, (state, action) => {
                state.user.pseudo = action.payload.pseudo;
                state.user.email = action.payload.email;
                state.error.userInfoPatch = "";
            })
            .addCase(userInfoPatch.rejected, (state, action) => {
                state.error.userInfoPatch = action.payload;
            })
            .addCase(passwordPatch.fulfilled, (state) => {
                state.error.oldPassword = "";
            })
            .addCase(passwordPatch.rejected, (state, action) => {
                state.error.oldPassword = action.payload;
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                state.isLogged = false;
                state.access_token = "";
                state.user = {};
                state.error.passwordDeleteAccount = "";
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.error.passwordDeleteAccount = action.payload;
            })
    }
})

export const { complete_activity, complete_lesson } = userSlice.actions;

export const userReducer = userSlice.reducer;
