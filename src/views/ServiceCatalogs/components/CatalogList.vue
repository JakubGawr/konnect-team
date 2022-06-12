<template>
  <ul
    v-if="serviceCatalogs.length > 0"
    class="catalog-list"
    data-cy="success-state"
  >
    <CatalogComponent
      v-for="service in serviceCatalogs"
      :key="service.id"
      :catalog="service"
      data-cy="catalog-item"
    />
  </ul>
  <KEmptyState
    v-else
    cta-is-hidden
    data-cy="empty-state"
  >
    <template #title>
      No data
    </template>
    <template #message>
      Please search for another phrase 😉️
    </template>
  </KEmptyState>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { debounce } from 'debounce'
import { Catalog } from '@/views/ServiceCatalogs/+state/serviceCatalogsStore'
import CatalogComponent from './Catalog.vue'

export enum Output {
  InputChange = 'inputChange',
}

export default defineComponent({
  name: 'CatalogListComponent',
  components: { CatalogComponent },
  props: {
    serviceCatalogs: {
      required: true,
      type: Array as () => Catalog[],
    },
  },
  methods: {
    onInput: debounce(function(
      this: ReturnType<typeof defineComponent>,
      value: string,
    ) {
      this.$emit(Output.InputChange, value)
    },
    200),
  },
})
</script>

<style lang="scss" scoped>
@import "../../../styles/mixins";

.catalog-list {
  @include withGridFit;
  margin: 2.4rem 0 4.8rem 0;
  list-style: none;
  padding: 0;
}
</style>
