const { createSlice } = require("@reduxjs/toolkit");

// Se crea un slice para la tienda, para asi, establecer la categoria y el item seleccionado.
export const shopSlice = createSlice({
    name: "shop",
    initialState: {
          value: {
               categorySelected: "",
               itemIdSelected: ""
          },
    },
     reducers: {
          setCategorySelected: (state, action) => {
          state.value.categorySelected = action.payload
          },
          setIdSelected: (state, {payload}) => {
          state.value.itemIdSelected = payload
     },
 },
});

export const {setCategorySelected, setIdSelected} = shopSlice.actions;
export default shopSlice.reducer;