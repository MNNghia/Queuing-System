import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/config";
import { addDoc, collection, doc, getDocs, updateDoc, setDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "device");

interface Device {
    id?: any;
    idDevice: string,
    nameDevice: string,
    ipAddress: string,
    stateAction?: any,
    // stateConnect?: any,
    service: any,
    typeDevice: string,
    userName: string,
    password: string
}

interface DeviceState {
    data: Device[];
    loading: boolean;
    error: string | null;
}

const initialState: DeviceState = {
    data: [],
    loading: false,
    error: null,
};


//get data
export const fetchDevice = createAsyncThunk("devices/fetchDevices", async () => {
    const data = await getDocs(usersCollectionRef);
    const filteredData: Device[] = data.docs.map((doc) => ({
        // ...doc.data(),
        id: doc.id,
        idDevice: doc.data().idDevice,
        nameDevice: doc.data().nameDevice,
        ipAddress: doc.data().ipAddress,
        stateAction: doc.data().stateAction,
        // stateConnect: doc.data().stateConnect,
        service: doc.data().service,
        typeDevice: doc.data().typeDevice,
        userName: doc.data().userName,
        password: doc.data().password
    }));

    return filteredData;
});

//add data

export const addDevice = createAsyncThunk("device/addDevice", async (device: Device) => {
    const response = await addDoc(usersCollectionRef, device);
    return { ...device, id: response.id };
});

export const updateDevice = createAsyncThunk('device/updateDevice', async(device: Device) => {
    try{
        const deviceDoc = doc(db, 'device', device.id)
        await setDoc(deviceDoc, device)
        return device
    }
    catch(error) {
        console.log(error)
    }
})

const devicesSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDevice.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDevice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetcing users";
            })
            .addCase(addDevice.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateDevice.fulfilled, (state, action) => {
                const index = state.data.findIndex((value) => value.id === action.payload?.id)
                if(index !== -1 && action.payload !== undefined) {
                    state.data[index] = action.payload
                }
            })
            // .addCase(deleteUser.fulfilled, (state, action) => {
            //     state.data = state.data.filter(
            //         (user) => user.id !== action.payload
            //     );
            // });
    },
});

//add combineReducers
export const devicesReducer = devicesSlice.reducer;

export default devicesSlice