import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/config";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "role");

interface Role{
    id?: any;
    description: any,
    nameRole: String,
    functionRole: any
}

interface RoleState {
    data: Role[];
    loading: boolean;
    error: string | null;
}

const initialState: RoleState = {
    data: [],
    loading: false,
    error: null,
};


//get data
export const fetchRole= createAsyncThunk("roles/fetchRoles", async () => {
    const data = await getDocs(usersCollectionRef);
    const filteredData: Role[] = data.docs.map((doc) => ({
        // ...doc.data(),
        id: doc.id,
        description: doc.data().description,
        nameRole: doc.data().nameRole,
        functionRole: doc.data().functionRole
    }));

    return filteredData;
});

//add data

export const addRole= createAsyncThunk("role/addRole", async (role: Role) => {
    const response = await addDoc(usersCollectionRef, role);
    return { ...role, id: response.id };
});

export const updateRole= createAsyncThunk('role/updateRole', async(role: Role) => {
    try{
        const deviceDoc = doc(db, 'role', role.id)
        await setDoc(deviceDoc, role)
        return role 
    }
    catch(error) {
        console.log(error)
    }
})

const roleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRole.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetcing users";
            })
            .addCase(addRole.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateRole.fulfilled, (state, action) => {
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
export const roleReducer = roleSlice.reducer;

export default roleSlice