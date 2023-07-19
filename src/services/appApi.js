import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:8080" ,
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        //get one user 
        getUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "GET",
                body: userId,
            }),
        }),

        //get all user

        getAllUser: builder.mutation({
            query: (body) => ({
                url: "/users",
                method: "GET",
                body,
            }),
        }),

        //update profile

        updateProfile: builder.mutation({
            query: (user) => ({
              url: `users/${user.id}/updateprofile`,
              method: "PATCH" ,
              body: user,
            }),
          }),
        // creating product
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: "PATCH",
            }),
        }),

        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                body: product,
                method: "POST",
            }),
        }),

        deleteProduct: builder.mutation({
            query: ({ product_id, user_id }) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),


        // add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),
        // remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            }),
        }),

        // increase cart
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            }),
        }),

        // decrease cart
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            }),
        }),
        // create order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),
        //create chat
        createChat: builder.mutation({
            query: (data) => ({
                url: "/chat",
                method: "POST",
                body: data,
            }),
        }),
        //user chat 
        userChats : builder.mutation({
            query: (id) => ({
                url: `/chat/${id}`,
                method: "GET",
                body: id,
            })
        }),
        //find a chat
        findChat: builder.mutation({
            query: (firstId, secondId) => ({
                url: `/chat/find/${firstId}/${secondId}`,
                method: "GET",
                body: {firstId,secondId},
            })
        }),
        //get message 
        getMessages: builder.mutation({
            query: (id) => ({
                url: `/message/${id}`,
                method: "GET",
                body: id,
            })
        }),
        //add message
        addMessage : builder.mutation({
            query: (data) => ({
                url: "/message",
                method: "POST",
                body: data,
            })
        })
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useCreateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useCreateChatMutation,
    useUserChatsMutation,
    useFindChatMutation,
    useGetAllUserMutation,
    useGetUserMutation,
    useAddMessageMutation,
    useGetMessagesMutation,
    useUpdateProfileMutation,
} = appApi;

export default appApi;

