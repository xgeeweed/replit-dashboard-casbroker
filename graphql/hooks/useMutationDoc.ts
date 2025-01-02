import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { request, ClientError } from 'graphql-request';

/**
 * The function `useMutationDoc` is a reusable hook in TypeScript for handling GraphQL mutations with
 * custom options.
 * @param {string} mutationDocument - The `mutationDocument` parameter in the `useMutationDoc` function
 * is a string that represents a GraphQL mutation document. This document contains the actual mutation
 * operation that will be sent to the GraphQL server to perform a mutation on the data. It typically
 * includes the mutation name, input variables, and the fields
 * @param [options] - The `options` parameter in the `useMutationDoc` function is a way to provide
 * custom mutation options. These options can include properties like `onSuccess`, `onError`,
 * `onSettled`, `onMutate`, `onError`, `onSettled`, `onMut
 * @returns The `useMutationDoc` function is being returned. It is a custom hook that wraps the
 * `useMutation` hook from a GraphQL client library. This custom hook allows for executing GraphQL
 * mutations using a specified mutation document and custom options.
 */
export function useMutationDoc<TData, TVariables extends object>(
  mutationDocument: string, // GraphQL mutation document
  options?: UseMutationOptions<TData, ClientError, TVariables> // Custom mutation options
): UseMutationResult<TData, ClientError, TVariables> {
  return useMutation<TData, ClientError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
      const result = await request<TData>(apiUrl, mutationDocument, variables);
      return result;
    },
    ...options, // Allows custom options like onSuccess, onError, etc.
  });
}
