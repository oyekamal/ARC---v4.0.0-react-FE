import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    deviceList: {
        data: [],
        loading: false,
        error: false
    }
};

const arcPageSLice = createSlice({
    name: 'arcPage',
    initialState,
    reducers: {
        loadListDevices(state){
            state.deviceList.loading = true;
            state.deviceList.error = false;
        },
        listDevicesLoaded(state, {payload}){
            state.deviceList.data = payload;
            state.deviceList.loading = false;
        },
        listDevicesLoadingError(state){
            state.deviceList.loading = false;
            state.deviceList.error = true;
        },
    }
})

export const {
    loadListDevices,
    listDevicesLoaded,
    listDevicesLoadingError
} = arcPageSLice.actions;

export default arcPageSLice.reducer;
