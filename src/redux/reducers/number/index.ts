import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/config";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "number");

interface Number {
    id?: any;
    STT: string,
    expiry: string,
    nameClient: string,
    nameService: any,
    source: string,
    state: string,
    time: string
}

interface NumberState {
    data: Number[];
    loading: boolean;
    error: string | null;
}

const initialState: NumberState = {
    data: [],
    loading: false,
    error: null,
};

//get data
export const fetchNumber = createAsyncThunk("numbers/fetchNumbers", async () => {
    const data = await getDocs(usersCollectionRef);
    const filteredData: Number[] = data.docs.map((doc) => ({
        // ...doc.data(),
        id: doc.id,
        STT: doc.data().STT,
        expiry: doc.data().expiry,
        nameClient: doc.data().nameClient,
        nameService: doc.data().nameService,
        source: doc.data().source,
        state: doc.data().state,
        time: doc.data().time
    }));

    return filteredData;
});

//add data

export const addNumber = createAsyncThunk("numbers/addNumbers", async (number: Number) => {
    const response = await addDoc(usersCollectionRef, number);
    return { ...number, id: response.id };
});

export const updateNumber = createAsyncThunk('numbers/updateNumber', async(number: Number) => {
    try{
        const numberDoc = doc(db, 'number', number.id)
        await setDoc(numberDoc, number)
        return number 
    }
    catch(error) {
        console.log(error)
    }
})

const numberSlice = createSlice({
    name: "number",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNumber.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNumber.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetcing users";
            })
            .addCase(addNumber.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateNumber.fulfilled, (state, action) => {
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
export const numbersReducer = numberSlice.reducer;

export default numberSlice 