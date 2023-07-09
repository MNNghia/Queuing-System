import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/config";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "service");

interface Service {
    id?: any;
    nameService: string,
    stateAction?: string,
    serviceDescription: string,
    idService: string
}

interface ServiceState {
    data: Service[];
    loading: boolean;
    error: string | null;
}

const initialState: ServiceState = {
    data: [],
    loading: false,
    error: null,
};


//get data
export const fetchService = createAsyncThunk("services/fetchService", async () => {
    const data = await getDocs(usersCollectionRef);
    const filteredData: Service[] = data.docs.map((doc) => ({
        // ...doc.data(),
        id: doc.id,
        nameService: doc.data().nameService,
        serviceDescription: doc.data().serviceDescription,
        idService: doc.data().idService,
        stateAction: doc.data().stateAction,
    }));

    return filteredData;
});

//add data

export const addService = createAsyncThunk("service/addService", async (service: Service) => {
    const response = await addDoc(usersCollectionRef, service);
    return { ...service, id: response.id };
});

export const updateService = createAsyncThunk('service/updateService', async(service: Service) => {
    try{
        const serviceDoc = doc(db, 'service', service.id)
        await setDoc(serviceDoc, service)
        return service
    }
    catch(error) {
        console.log(error)
    }
})

const servicesSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchService.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetcing users";
            })
            .addCase(addService.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateService.fulfilled, (state, action) => {
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
export const servicesReducer = servicesSlice.reducer;

export default servicesSlice