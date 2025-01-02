import { useQuery, UseQueryOptions, QueryKey, UseQueryResult } from "@tanstack/react-query";
import { request, ClientError } from "graphql-request";

/**
 * The `useQueryDoc` function in TypeScript is a custom hook for executing GraphQL queries with
 * specified query key, document, variables, and options.
 * @param {QueryKey} queryKey - The query key is used for caching and identifying the query. It helps
 * the system keep track of different queries and their results.
 * @param {string} queryDocument - The `queryDocument` parameter in the `useQueryDoc` function is a
 * string that represents a GraphQL query document. This document contains the actual GraphQL query
 * that will be sent to the server to fetch data. It typically includes the fields and parameters that
 * you want to retrieve from the server's GraphQL API
 * @param [variables] - Variables are used in GraphQL queries to pass dynamic values to the query. They
 * can be used to filter, sort, or customize the data returned by the query based on specific criteria.
 * In the `useQueryDoc` function provided, the `variables` parameter allows you to pass an object
 * containing key-value
 * @param [options] - The `options` parameter in the `useQueryDoc` function is an object that allows
 * you to provide additional query options for customizing the behavior of the query. These options are
 * specific to the `useQuery` hook from the React Query library.
 * @returns The `useQueryDoc` function is returning a `UseQueryResult` object which contains the data
 * (`TData`) and error (`ClientError`) for the query. This object is obtained by calling the `useQuery`
 * hook with the provided query key, query function, and additional options.
 */
export function useQueryDoc<TData>(
  queryKey: QueryKey, // The query key for caching and identifying
  queryDocument: string, // GraphQL query document
  variables?: Record<string, any>, // Variables for the query
  options?: Omit<UseQueryOptions<TData, ClientError>, "queryKey" | "queryFn"> // Additional query options
): UseQueryResult<TData, ClientError> {
  return useQuery<TData, ClientError>({
    queryKey,
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
      const result = await request<TData>(apiUrl, queryDocument, variables);
      return result;
    },
    ...options, // Custom query options like enabled, staleTime, etc.
  });
}
