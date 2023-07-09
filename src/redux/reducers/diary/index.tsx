import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/config";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "diary");

interface Diary{
    id?: any;
    userName: string,
    IP: string,
    handle: string,
    time: string
}

interface DiaryState {
    data: Diary[];
    loading: boolean;
    error: string | null;
}

const initialState: DiaryState = {
    data: [],
    loading: false,
    error: null,
};


//get data
export const fetchDiary = createAsyncThunk("diarys/fetchDiary", async () => {
    const data = await getDocs(usersCollectionRef);
    const filteredData: Diary[] = data.docs.map((doc) => ({
        // ...doc.data(),
        id: doc.id,
        userName: doc.data().userName,
        IP: doc.data().IP,
        time: doc.data().time,
        handle: doc.data().handle
    }));

    return filteredData;
});

//add data

export const addDiary = createAsyncThunk("diary/addDiary", async (diary: Diary) => {
    const response = await addDoc(usersCollectionRef, diary);
    return { ...diary, id: response.id };
});


export const updateDiary = createAsyncThunk('diary/updateDiary', async(diary: Diary) => {
    try{
        const diaryDoc = doc(db, 'diary', diary.id)
        await setDoc(diaryDoc, diary)
        return diary
    }
    catch(error) {
        console.log(error)
    }
})


const diarysSlice = createSlice({
    name: "diarys",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDiary.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDiary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetcing users";
            })
            .addCase(addDiary.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateDiary.fulfilled, (state, action) => {
                const index = state.data.findIndex((value) => value.id === action.payload?.id)
                if(index !== -1 && action.payload !== undefined) {
                    state.data[index] = action.payload
                }
            })
            
    },
});

//add combineReducers
export const diarysReducer = diarysSlice.reducer;

export default diarysSlice