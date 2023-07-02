import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/config";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

interface User {
    id: any;
    userName: string;
    password: string;
}

interface UsersState {
    data: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    data: [],
    loading: false,
    error: null,
};


//get data

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const data = await getDocs(usersCollectionRef);
    const filteredData: User[] = data.docs.map((doc) => ({
        // ...doc.data(),
        id: doc.id,
        userName: doc.data().userName,
        password: doc.data().password
    }));

    return filteredData;
});

//add data

export const addUser = createAsyncThunk("users/addUser", async (user: User) => {
    const response = await addDoc(usersCollectionRef, user);
    return { ...user, id: response.id };
});

//delete data
export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userId: string) => {
        //logic delete
        // await deleteDoc(usersCollectionRef, userId)
        // return userID
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetcing users";
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            // .addCase(deleteUser.fulfilled, (state, action) => {
            //     state.data = state.data.filter(
            //         (user) => user.id !== action.payload
            //     );
            // });
    },
});

//add combineReducers
export const usersReducer = usersSlice.reducer;

export default usersSlice;
