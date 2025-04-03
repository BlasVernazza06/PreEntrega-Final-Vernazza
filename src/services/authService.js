import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey, baseAuthUrl } from "../database/users";

// Se crea la api de autenticación utilizando como base de datos firebase. Para realizar el fetch a la base de datos utilizamos funciones de Redux Toolkit, asi tambien como para crear la api.

// Creamos endpoints, tanto para el registro como para el login de usuario. Ademas aplicamos control de errores.
export const authApi = createApi({
  reducerPath: "authApi", //Establish a unique name for the API
  baseQuery: fetchBaseQuery({ baseUrl: baseAuthUrl }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (auth) => ({
        url: `/accounts:signUp?key=${apiKey}`,
        method: "POST",
        body: auth,
      }),
      transformResponse: (response) => {
        return {
          email: response.email,
          idToken: response.idToken,
          localId: response.localId,
          username: response.username,
        };
      },
      transformErrorResponse: (response) => {
        return response;
      }
    }),
    signIn: builder.mutation({
      query: (auth) => ({
        url: `/accounts:signInWithPassword?key=${apiKey}`,
        method: "POST",
        body: auth,
      }),
      transformErrorResponse: (response) => {
        const error = response.data?.error?.message;;

        switch(error) {
          case "EMAIL_NOT_FOUND":
              return {
                  type: 'email',
                  message: 'Correo no encontrado'
              };
          
          case "INVALID_PASSWORD":
              return {
                  type: 'password',
                  message: 'Contraseña incorrecta'
              };
          
          case "INVALID_EMAIL":
              return {
                  type: 'email',
                  message: 'Correo inválido'
              };
          
          case "INVALID_LOGIN_CREDENTIALS":
              return {
                  type: 'credentials',
                  message: 'Correo o contraseña incorrectos'
              };
              
          default:
              return {
                  type: 'unknown',
                  message: 'Error al iniciar sesión'
              };
        }
      }
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;