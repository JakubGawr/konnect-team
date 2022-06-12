import { defineStore } from 'pinia'
import axios from 'axios'

export interface Catalog {
  description: string;
  enabled: boolean;
  id: string;
  name: string;
}

export enum ViewState {
  LOADING = 'Loading',
  ERROR = 'Error',
  Success = 'Success',
}
export interface CatalogStore {
  catalogList: Catalog[];
  searchValue: string;
  viewState: ViewState;
}

export const useServiceCatalogsStore = defineStore({
  id: 'catalogsStore',
  state: () =>
    ({
      catalogList: [],
      searchValue: '',
      viewState: ViewState.LOADING,
    } as CatalogStore),
  getters: {
    catalogs: (state) => state.catalogList,
    filterCatalogs: ({ searchValue, catalogList }: CatalogStore) => {
      const valueWithoutWhiteSpaces = searchValue.trim()
      return catalogList.filter(({ name, description }: Catalog) => {
        return (
          name.toLocaleLowerCase().includes(valueWithoutWhiteSpaces) ||
          description.toLocaleLowerCase().includes(valueWithoutWhiteSpaces)
        )
      })
    },

    currentViewState: (state) => {
      return state.viewState
    },
  },
  actions: {
    async getCatalogs() {
      this.viewState = ViewState.LOADING
      try {
        const result = await axios.get('/api/service_packages')
        this.catalogList = result.data
        this.viewState = ViewState.Success
      } catch {
        this.viewState = ViewState.ERROR
      }
    },

    setSearchValue(inputValue: string) {
      this.searchValue = inputValue.toLocaleLowerCase()
    },
  },
})
