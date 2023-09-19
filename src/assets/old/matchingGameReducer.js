import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // correct: 0,
    // total: 0,
    // randomDraggableItems: [],
    // draggedItem: null
};

const matchingGameSlice = createSlice({
    name: 'matchingGame',
    initialState,
    reducers: {
        // incrementCorrect: (state) => {
        //     state.correct += 1;
        // },
        // incrementTotal: (state) => {
        //     state.total += 1;
        // },
        // resetGame: (state) => {
        //     state.correct = 0;
        //     state.total = 0;
        //     state.randomDraggableItems = [];
        // },
        // setRandomDraggableItems: (state, action) => {
        //     state.randomDraggableItems = action.payload;
        // },
        setItemDropped: (state, action) => {
            const { iconName, dropped } = action.payload;
            const item = state.randomDraggableItems.find(
                (item) => item.iconName === iconName
            );
            if (item) {
                item.dropped = dropped;
            }
        },
        // setDraggedItem:(state, action)=>{
        //     state.draggedItem = action.payload
           
        // }
    },
});

export const {
    // incrementCorrect,
    incrementTotal,
    resetGame,
    setRandomDraggableItems,
    setItemDropped,
    setDraggedItem
} = matchingGameSlice.actions;

export const matchingGameReducer = matchingGameSlice.reducer;
