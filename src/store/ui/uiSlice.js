import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: (state ) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModel: (state ) => {
            state.isDateModalOpen = false;
        },
    }
});


export const { onOpenDateModal, onCloseDateModel } = uiSlice.actions