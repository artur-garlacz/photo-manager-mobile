import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
// https://jsonplaceholder.typicode.com/
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Posts', 'Users', 'Comments', 'Albums', 'Photos'],
  endpoints: () => ({}),
});
