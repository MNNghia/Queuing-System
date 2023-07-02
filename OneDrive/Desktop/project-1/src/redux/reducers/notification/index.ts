import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/config";
import { collection,getDocs } from "firebase/firestore";

const usersCollectionRef = collection(db, "notification");

interface Noti {
    id : string
    name: string
    time: string
    date: string
}

interface NotiState {
    data: Noti[];
    loading: boolean;
    error: string | null;
}

const initialState: NotiState = {
    data: [],
    loading: false,
    error: null,
};


//get data

export const fetchNoti = createAsyncThunk("Noti/fetchNoti", async () => {
    const data = await getDocs(usersCollectionRef);
    const filteredData: Noti[] = data.docs.map((doc) => ({
        // ...doc.data(),
        id: doc.id,
        name: doc.data().name,
        time: doc.data().time,
        date: doc.data().date
        
    }));

    return filteredData;
});

const NotiSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNoti.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNoti.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchNoti.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetcing users";
            })
    },
});

//add combineReducers
export const NotiReducer = NotiSlice.reducer;

export default NotiSlice