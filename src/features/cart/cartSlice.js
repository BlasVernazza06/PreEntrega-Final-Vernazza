import { createSlice } from "@reduxjs/toolkit";

// Se crea un slice para el carrito, para asi, agregar un producto al carrito, eliminar un producto del carrito y obtener el carrito.

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      user: "userIdLogged",
      updatedAt: new Date().toLocaleString(),
      total: null,
      items: [],
    },
  },
  reducers: {
    addCartItem: (state, { payload }) => {
      //Logic to add product
      const productRepeated = state.value.items.find(
        (item) => item.id === payload.id
      );
      if (productRepeated) {
        console.log(productRepeated);
        const itemsUpdated = state.value.items.map((item) => {
          if (item.id === payload.id) {
            item.quantity += payload.quantity;
            return item;
          }
          return item;
        });
        const total = itemsUpdated.reduce(
          (acc, currentItem) =>
            (acc += currentItem.precio * currentItem.quantity),
          0
        );
        state.value = {
          ...state.value,
          items: itemsUpdated,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      } else {
        state.value.items.push(payload);
        const total = state.value.items.reduce(
          (acc, currentItem) =>
            (acc += currentItem.precio * currentItem.quantity),
          0
        );
        state.value = {
          ...state.value,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      }
    },
    removeCartItem: (state, { payload }) => {
      // Buscar el producto en el carrito
      const product = state.value.items.find(item => item.id === payload.id);
    
      if (product) {
        let itemsUpdated;
    
        if (product.quantity > 1) {
          // Si hay más de 1, solo reducir la cantidad
          itemsUpdated = state.value.items.map(item => 
            item.id === payload.id ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          // Si la cantidad es 1, eliminar el producto del carrito
          itemsUpdated = state.value.items.filter(item => item.id !== payload.id);
        }
    
        // Calcular nuevo total
        const total = itemsUpdated.reduce(
          (acc, currentItem) => acc + (currentItem.precio * currentItem.quantity),
          0
        );
    
        // Actualizar el estado
        state.value = {
          ...state.value,
          items: itemsUpdated,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      }
    },
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;