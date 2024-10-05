const config = {
  petstore: {
    output: {
      mode: 'tags-split',
      target: './src/api/apiHooks',
      schemas: './src/api/apiSchemas',
      client: 'react-query',
      override: {
        queryOptions: {
          options: {
            staleTime: 10000,
            retry: false,
          },
        },
        mutator: {
          path: './src/api/apiFetcher.ts',
          name: 'apiFetcher',
        },
      },
    },
    input: {
      target: '../api/openapi.json',
    },
  },
};

export default config;
