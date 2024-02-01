import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    data : null,
    ticket:localStorage.getItem("ticket")?JSON.parse(localStorage.getItem("ticket")):null
}

const movieSlice = createSlice({
    name:"movieData",
    initialState:initialState,
    reducers:{
        setData(state,value){
            state.data = value.payload
        },
        setTicket(state,value){
            state.ticket = value.payload
        }
    }
})

export const {setData,setTicket} = movieSlice.actions
export default movieSlice.reducer