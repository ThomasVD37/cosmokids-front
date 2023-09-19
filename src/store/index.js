
import { configureStore } from '@reduxjs/toolkit'
import { activityReducer } from './reducers/activityReducer';
import { dataReducer } from "./reducers/dataReducer";
import { quizzReducer } from './reducers/quizz';
import { userReducer } from './reducers/userReducer';

const store = configureStore({
    reducer: {
        activity: activityReducer,
        data: dataReducer,
        quizz: quizzReducer,
        userData: userReducer,
    },
    devTools: true,
});

export default store;
