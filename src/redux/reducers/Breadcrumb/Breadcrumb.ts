import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export interface BreadcrumbItem {
    label: string
    url: string
}

const initialState: BreadcrumbItem[] = []

const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState,
    reducers: {
        setBreadcrumb: (state, action: PayloadAction<BreadcrumbItem[]>) => {
            return action.payload
        }
    }
})

export const {setBreadcrumb} = breadcrumbSlice.actions

export default breadcrumbSlice.reducer
