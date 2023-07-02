import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/config";
import { addDoc, collection,doc,getDocs, setDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

interface User {
    id?: any;
    userName: string;
    password: string;
    name: string,
    phone: string,
    role: string,
    email: string,
    // avatar?: string
    stateAction: string
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
        password: doc.data().password,
        phone: doc.data().phone,
        email: doc.data().email,
        name: doc.data().name,
        role: doc.data().role,
        // avatar: doc.data().avatar,
        stateAction: doc.data().stateAction
    }));

    return filteredData;
});

export const addUser = createAsyncThunk("users/adduser", async (user: User) => {
    const response = await addDoc(usersCollectionRef, user);
    return { ...user, id: response.id };
});

export const updateUser= createAsyncThunk('user/updateUser', async(user: User) => {
    try{
        const userDoc = doc(db, 'users', user.id)
        await setDoc(userDoc, user)
        return user 
    }
    catch(error) {
        console.log(error)
    }
})

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
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.data.findIndex((value) => value.id === action.payload?.id)
                if(index !== -1 && action.payload !== undefined) {
                    state.data[index] = action.payload
                }
            })
    },
});

//add combineReducers
export const usersInfoReducer = usersSlice.reducer;

export default usersSlice