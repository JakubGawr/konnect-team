import { defineStore } from 'pinia'
import { useServiceCatalogsStore } from '@/views/ServiceCatalogs/+state/serviceCatalogsStore'
import { Pagination } from '@/shared/ui/Pagination.vue'

/*
   usePaginatedViewStore, could not be a separated state at all, because pagination component keeps current state.
   But In terms of real life pagination (connecting with server etc), it would be usefull to separate it.
 */

const initialState: Pagination = {
  pageIndex: 0,
  pageMin: 1,
  totalPageCount: 0,
  pageMax: 13,
  itemsPerPage: 13,
}

export const usePaginatedViewStore = defineStore({
  id: 'paginatedView',
  state: () => ({ ...initialState } as Pagination),
  getters: {
    paginatedView: ({ pageMin, pageMax }) => {
      const catalogsStore = useServiceCatalogsStore()
      return catalogsStore.filterCatalogs.slice(pageMin - 1, pageMax)
    },
  },
  actions: {
    updateParams(params: Pagination) {
      this.$state = params
    },

    reset() {
      this.$state = {
        ...initialState,
      }
    },
  },
})
