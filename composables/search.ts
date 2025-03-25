import debounce from 'lodash/debounce'
import { gql } from 'nuxt-graphql-request/utils';

const allQuery = gql`
  query SearchAll($searchTerm: String!, $limit: Int!, $heightFilter: Int) {
    searchAll(searchTerm: $searchTerm, limit: $limit, heightFilter: $heightFilter) {
      blocks {
        chainId
        hash
        height
        parent
        transactionsCount
      }
      tokens {
        type
        module
        chainId
      }
      transactions {
        sender
        requestkey
        result
        metadata
        chainId
      }
      addresses {
        account
      }
    }
  }
`

const searchBlocksQuery = gql`
  query SearchBlocks($searchTerm: String!, $limit: Int!, $heightFilter: Int) {
    searchAll(searchTerm: $searchTerm, limit: $limit, heightFilter: $heightFilter) {
      blocks {
        chainId
        hash
        height
        parent
        transactionsCount
      }
    }
  }
`;

const searchTransactionsQuery = gql`
  query SearchTransactions($searchTerm: String!, $limit: Int!) {
    searchAll(searchTerm: $searchTerm, limit: $limit) {
      transactions {
        sender
        requestkey
        result
        metadata
        chainId
      }
    }
  }
`;

const searchAddressQuery = gql`
  query SearchUniqueAddresses($searchTerm: String!, $limit: Int!) {
    searchAll(searchTerm: $searchTerm, limit: $limit) {
      addresses {
        account
      }
    }
  }
`;

const searchFungibleTokensQuery = gql`
  query SearchFungibleTokens($searchTerm: String!, $limit: Int!) {
    searchAll(searchTerm: $searchTerm, limit: $limit) {
      tokens {
        type
        module
        chainId
      }
    }
  }
`;

const filters = [
  {
    value: 'all',
    label: 'All filters',
    query: allQuery,
  },
  {
    value: 'blocks',
    label: 'Blocks',
    query: searchBlocksQuery,
  },
  {
    value: 'transactions',
    label: 'Transactions',
    query: searchTransactionsQuery,
  },
  {
    value: 'address',
    label: 'Addresses',
    query: searchAddressQuery,
  },
  {
    value: 'tokens',
    label: 'Tokens',
    query: searchFungibleTokensQuery,
  },
];

export function useSearch () {
  const data = reactive<any>({
    query: '',
    open: false,
    error: null,
    loading: false,
    searched: null,
    filters,
    filter: filters[0],
  });

  const router = useRouter();

  const { $graphql } = useNuxtApp();

  const searchImpl = async (value: string) => {
    if (!value) {
      data.searched = null;
      return;
    }

    data.loading = true;
    data.error = null;

    try {
      const variables = {
        searchTerm: value,
        limit: 5,
      } as any;

      const heightFilter = parseInt(value);

      if (!isNaN(heightFilter) && Number.isSafeInteger(heightFilter)) {
        variables.heightFilter = heightFilter;
      }

      const { searchAll } = await $graphql.default.request(data.filter.query, variables);

      if (value === data.query) {
        data.searched = searchAll;
      }
    } catch (error) {
      console.error('Search error:', error);
      data.error = 'An error occurred while searching. Please try again.' as any;
    } finally {
      data.loading = false;
    }
  };

  const search = debounce(searchImpl, 250);

  const requestKeyRegex = /^[A-Za-z0-9\-_]{43}$/;
  const kadenaAddressRegex = /^k:[a-fA-F0-9]{64}$/;

  function shouldRedirectBeforeSearch(search: any) {
    if (kadenaAddressRegex.test(search)) {
      return "account";
    }

    if (requestKeyRegex.test(search)) {
      return "transactions";
    }
  }

  function shouldRedirect() {
    if (data?.searched?.addresses && data?.searched?.addresses?.length > 0) {
      const address = data?.searched?.addresses[0];

      router.push(`/account/${address.account}`);
    }

    if (data?.searched?.transactions && data?.searched?.transactions?.length > 0) {
      const transaction = data?.searched?.transactions[0];

      router.push(`/transactions/${transaction.requestkey}`);
    }

    if (data?.searched?.tokens && data?.searched?.tokens?.length > 0) {
      const token = data?.searched?.tokens[0];

      const staticMetadata = staticTokens.find(({ module }) => module === token.module);

      router.push(`/tokens/${staticMetadata?.id || token.module}`);
    }

    if (data?.searched?.blocks && data?.searched?.blocks?.length > 0) {
      const block = data?.searched?.blocks[0];

      router.push(`/blocks/chain/${block.chainId}/height/${block.height}`);
    }
  }

  const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    data.query = value;
    search(value);
  };

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();

    search.cancel();

    const redirectPath = shouldRedirectBeforeSearch(data.query);

    if (redirectPath) {
      router.push(`/${redirectPath}/${data.query}`);

      cleanup();

      return;
    }

    if (!data.loading && data.searched) {
      shouldRedirect();

      cleanup();

      return;
    }

    await searchImpl(data.query);

    shouldRedirect();

    cleanup();
  };

  const close = () => {
    data.open = false
  }

  const cleanup = () => {
    data.query = ''
    data.searched = null
    close()
  }

  return {
    data,
    close,
    search,
    cleanup,
    handleKeyDown,
    handleInput,
  };
}
