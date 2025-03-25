import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export interface PaginateInterface {
  key: string
  query: string
}

export function usePagination(defaultLimit = 20) {
  const route = useRoute()
  const router = useRouter()

  const page = ref(isNaN(Number(route.query.page)) ? 1 : Number(route.query.page))

  const limit = ref(defaultLimit);
  const cursor = ref<string | undefined>(undefined);

  const params = ref<any>({
    first: defaultLimit,
    after: route.query.cursor ?? undefined,
  });

  function updateCursor(newCursor: string) {
    cursor.value = newCursor;
  }

  function getLastPageParams() {
    return {
      last: limit.value,
    }
  }

  function getFirstPageParams() {
    return {
      first: limit.value,
    }
  }

  function getNextPageParams(pageInfo: any) {
    return {
      after: pageInfo.endCursor,
      first: limit.value,
    }
  }

  function getPrevPageParams(pageInfo: any) {
    return {
      before: pageInfo.startCursor,
      last: limit.value,
    }
  }

  function updateURL (newPage: number, newCursor: string | null) {
    if (!newPage || !newCursor) {
      const { page, cursor, ...rest } = route.query;

      router.replace({ query: rest })

      return;
    }

    const query = {
      ...route.query,
      page: newPage.toString(),
    } as any;

    if (newCursor) {
      query.cursor = newCursor;
    }

    router.replace({ query })
  }

  function updatePage (newPage: number, pageInfo: any, totalCount: any, totalPages: any) {
    if (newPage === page.value) {
      return
    }

    if (newPage === totalPages) {
      const newParams = getLastPageParams();

      page.value = newPage
      params.value = newParams;

      return;
    }

    if (newPage === 1) {
      const newParams = getFirstPageParams();

      page.value = newPage
      params.value = newParams;

      return;
    }

    if (newPage > page.value) {
      const newParams = getNextPageParams(pageInfo);

      page.value = newPage
      params.value = newParams;

      return;
    }

    if (newPage < page.value) {
      const newParams = getPrevPageParams(pageInfo);

      page.value = newPage
      params.value = newParams;

      return;
    }
  }

  watch([page, cursor], ([newPage, newCursor]) => {
    updateURL(newPage, newCursor)
  })

  return {
    page,
    cursor,
    limit,
    params,
    updatePage,
    updateCursor,
  }
}
