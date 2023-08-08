// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// stage-01

/*
//create ApiSlice

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({}),
});

export default apiSlice;
*/

// stage-02

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// //create apiSlice

// const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
//   endpoints: (bulder) => ({
//     getAllUser: bulder.query({
//       query: () => "/users",
//     }),
//   }),
// });

// export const { useGetAllUserQuery } = apiSlice;

// export default apiSlice;

// ApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),

  endpoints: (builder) => ({
    // ========= Query =======

    //get All users
    getAllUser: builder.query({
      query: () => "/users",
    }),

    //Get Single user
    getSingleUser: builder.query({
      query: (id) => `/users/${id}`,
    }),

    // ======= Mutation =======

    //Create a User

    createUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        console.log("args", args);

        try {
          const { data: createUserData } = await queryFulfilled;
          console.log("createUserData", createUserData);

          dispatch(
            apiSlice.util.updateQueryData("getAllUser", undefined, (draft) => {
              draft?.push(createUserData);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // Update User
    updateUser: builder.mutation({
      query: ({ id, Data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: Data, // Send the updated data in the request body
      }),

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        console.log(args);
        try {
          const { data: updateData } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getAllUser", undefined, (draft) => {
              // Find the user to update in the draft state
              let userToUpdate = draft.find((user) => user.id === args.id);
              console.log(userToUpdate);

              // Update the user with the new data
              if (userToUpdate) {
                userToUpdate.name = updateData.name;
                userToUpdate.email = updateData.email;
                userToUpdate.password = updateData.password;
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // delete User
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getAllUser", undefined, (draft) => {
              return draft.filter((user) => user.id !== args);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;

// Export the apiSlice as the default export
export default apiSlice;
