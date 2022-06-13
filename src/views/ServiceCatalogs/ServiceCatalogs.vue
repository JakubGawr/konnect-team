<template>
  <div class="l-page">
    <HeaderComponent
      @input-change="onSearchData"
    />
    <div class="l-page-content">
      <template v-if="serviceCatalogsStore.isLoading">
        <KSkeleton
          :card-count="4"
          data-cy="loading-state"
          type="card"
        />
      </template>

      <template v-else-if="serviceCatalogsStore.isError">
        <KEmptyState
          cta-is-hidden
          data-cy="error-state"
        >
          <template #title>
            Ops something bad happened 😢
          </template>
        </KEmptyState>
      </template>
      <template v-else-if="serviceCatalogsStore.isSuccess">
        <CatalogListComponent
          :service-catalogs="paginatedViewStore.paginatedView"
        />
      </template>
    </div>
    <div class="l-page-footer">
      <PaginationComponent
        :page-count="serviceCatalogsStore.filterCatalogs.length"
        :page-index="paginatedViewStore.pageIndex"
        @page-change="onPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  useServiceCatalogsStore,
  ViewState,
} from '@/views/ServiceCatalogs/+state/serviceCatalogsStore'
import PaginationComponent, { Pagination } from '@/shared/ui/Pagination.vue'
import HeaderComponent from './components/Header.vue'
import CatalogListComponent from './components/CatalogList.vue'
import { usePaginatedViewStore } from '@/views/ServiceCatalogs/+state/paginatedViewStore'

export default defineComponent({
  name: 'ServiceCatalog',
  components: { PaginationComponent, HeaderComponent, CatalogListComponent },
  setup() {
    const serviceCatalogsStore = useServiceCatalogsStore()
    const paginatedViewStore = usePaginatedViewStore()
    serviceCatalogsStore.getCatalogs()

    return {
      serviceCatalogsStore,
      paginatedViewStore,
    }
  },
  methods: {
    onSearchData: function(value: string) {
      this.serviceCatalogsStore.setSearchValue(value)
      this.paginatedViewStore.reset()
    },

    onPageChange: function(pageChange: Pagination) {
      this.paginatedViewStore.updateParams(pageChange)
    },
  },
})
</script>

<style lang="scss">
@import "../../styles/mixins";

.l-page {
  max-width: 1024px;
  margin: 6.5rem auto 1.5rem auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;

  &-footer {
    align-self: center;
  }

  .skeleton-card-wrapper {
    @include withGridFit;
    margin-top: 2.4rem;

    .skeleton-card {
      width: 215px;
      height: 180px;
    }
  }
}
</style>
