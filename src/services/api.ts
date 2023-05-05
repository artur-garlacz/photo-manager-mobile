import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
// https://jsonplaceholder.typicode.com/
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.178.49:3000/',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Posts', 'Users', 'Comments', 'Albums', 'Photos'],
  endpoints: () => ({}),
});
