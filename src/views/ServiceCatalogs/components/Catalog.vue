<template>
  <li
    class="c-catalog"
    tabindex="0"
  >
    <h1 class="c-catalog-title">
      {{ catalog.name }}
    </h1>
    <div class="c-catalog-content">
      <p class="u-clamp">
        {{ catalog.description }}
      </p>
    </div>
    <div
      v-if="catalog.versions.length > 0"
      class="c-catalog-version-wrapper"
    >
      <span class="c-catalog-version-count">{{ catalog.versions.length }}</span>
      Versions
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Catalog } from '@/views/ServiceCatalogs/+state/serviceCatalogsStore'

export default defineComponent({
  name: 'CatalogComponent',
  props: {
    catalog: {
      required: true,
      type: Object as () => Catalog,
    },
  },
})
</script>

<style lang="scss" scoped>

.c-catalog {
  padding: 2.4rem 1.4rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  min-height: 180px;
  cursor: pointer;
  transition: border 0.2s ease;
  flex-direction: column;

  &:hover {
    border-color: var(--theme-light);
  }

  &-title {
    font-style: normal;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.8rem;
    color: #1456cb;
  }

  &-content {
    margin: 0;
    overflow: hidden;
    font-weight: 400;
    flex: 1;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: var(--grey-darker);
  }

  &-version-wrapper {
    font-size: 1.4rem;
    color: var(--text-secondary);
  }

  &-version-count {
    font-size: 1.3rem;
    border: 1px solid #d9e7ff;
    color: var(--theme-main);
    margin-right: 0.5rem;
    border-radius: 40px;
    font-weight: 500;
    padding: 0.2rem 1rem;
  }
}
</style>
