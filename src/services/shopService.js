import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../database/realTimeDatabase'

// Se crea la api de la tienda utilizando como base de datos en tiempo real, RealTimeDatabase de firebase. Para realizar el fetch a la base de datos utilizamos funciones de Redux Toolkit, asi tambien como para crear la api (createApi).

// Creamos endpoints, para obtener categorias, productos tanto por categoria como por id, ordenes, etc. Por otro lado, tambien creamos endpoints para desde nuestra app, enviar datos y reflejarlas en la base de datos.
export const shopApi = createApi({
     reducerPath: "shopApi",
     baseQuery: fetchBaseQuery({ baseUrl }),
     tagTypes: ["profileImageGet"],
          endpoints: (builder) => ({
          getCategories: builder.query({
               query: () => `categories.json`,
          }),

          getProductsByCategory: builder.query({
               query: (category) =>
                 `products.json?orderBy="category"&equalTo="${category}"`,
               transformResponse: (response) => {
                 console.log(response);
                 const responseTransformed = Object.values(response);
                 //console.log(responseTransformed);
                 return responseTransformed;
               },
          }),

          getProductbyId: builder.query({
               query: (id) => `products.json?orderBy="id"&equalTo="${id}"`,
               transformResponse: (response) => {
                    const responseTransformed = Object.values(response);
                    if (responseTransformed.length)return responseTransformed[0];
                    return null;
               }, 
          }),
              postOrder: builder.mutation({
                query: ({ order, userId }) => ({
                  url: `orders/${userId}.json`,
                  method: "POST",
                  body: {
                      ...order,
                      createdAt: new Date().toISOString(),
                      status: 'pending'
                  },
                }),
              }),
              getUserOrders: builder.query({
                query: (localId) => ({
                    url: `orders/${localId}.json`,
                    method: "GET"
                }),
                transformResponse: (response) => {
                    if (!response) return []
                    return Object.keys(response).map(key => ({
                        id: key,
                        ...response[key]
                    }))
                }
              }),
              updateStock: builder.mutation({
               query: ({ ...order }) => ({
                 url: "products.json",
                 method: "PATCH",
                 body: order,
               }),
              }),
             //Obtener imagen desde la base de datos
              getProfileImage: builder.query({
                query: (uid) => `profileImages/${uid}.json`,
                providesTags: ["profileImageGet"],
              }),
             // Guardar imagen en la base de datos.
              postProfileImage: builder.mutation({
                query: ({ image, uid }) => ({
                  url: `profileImages/${uid}.json`,
                  method: "PUT",
                  body: {
                    image: image,
                    updatedAt: new Date().toISOString(),
                    userId: uid
                  },
                }),
                invalidatesTags: ["profileImageGet"],
              }),
              getAllOrders: builder.query({
                query: () => ({
                    url: 'orders.json',
                    method: "GET"
                }),
                transformResponse: (response) => {
                    if (!response) return []
                    // Transformamos la respuesta anidada de Firebase en un array plano de órdenes
                    return Object.entries(response).flatMap(([userId, userOrders]) => 
                        Object.entries(userOrders).map(([orderId, orderData]) => ({
                            id: orderId,
                            userId,
                            ...orderData
                        }))
                    )
                }
              }),
     })
})

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductbyIdQuery, usePostOrderMutation, useGetOrdersQuery,useUpdateStockMutation,useGetProfileImageQuery, usePostProfileImageMutation, useGetAllOrdersQuery } = shopApi