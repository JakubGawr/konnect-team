<template>
  <div class="c-pagination">
    <a
      class="c-pagination-arrow"
      :class="isDisabledPrev ? 'is-disabled' : null"
      data-cy="arrow-left"
      tabindex="0"
      @click="decrement"
    >
      <svg
        fill="none"
        height="9"
        viewBox="0 0 15 9"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.345703 4.49609L4.14258 0.699219V3.8457H14.4434V5.14648H4.14258V8.29297L0.345703 4.49609Z"
          fill="var(--arrow-color)"
        />
      </svg>
    </a>
    <div class="c-pagination-content">
      <span data-cy="pagination-content">{{ state.pageMin }} - {{ state.pageMax }} of
        {{ state.totalPageCount }}</span>
    </div>
    <a
      class="c-pagination-arrow"
      :class="isDisabledNext ? 'is-disabled' : null"
      data-cy="arrow-right"
      tabindex="0"
      @click="increment"
    >
      <svg
        fill="none"
        height="9"
        viewBox="0 0 15 9"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6543 4.49609L10.8574 0.699219V3.8457H0.556641V5.14648H10.8574V8.29297L14.6543 4.49609Z"
          fill="var(--arrow-color)"
        />
      </svg>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export interface Pagination {
  pageIndex: number;
  pageMin: number;
  pageMax: number;
  totalPageCount: number;
  itemsPerPage: number;
}
export default defineComponent({
  name: 'PaginationComponent',
  props: {
    pageIndex: {
      required: true,
      type: Number,
    },
    pageCount: {
      required: true,
      type: Number,
    },
  },
  emits: ['page-change'],
  setup(props) {
    const state = reactive<Pagination>({
      pageIndex: props.pageIndex,
      totalPageCount: props.pageCount,
      pageMin: 0,
      pageMax: 0,
      itemsPerPage: 13,
    })
    return {
      state,
    }
  },
  computed: {
    isDisabledPrev: function() {
      return this.state.pageIndex === 0
    },
    isDisabledNext: function() {
      return this.state.pageMax === this.state.totalPageCount
    },
  },
  watch: {
    pageCount: function(pageCount: number) {
      this.state.totalPageCount = pageCount
      this.updateMinMaxPages()
    },
    pageIndex: function(pageIndex: number) {
      this.state.pageIndex = pageIndex
      this.updateMinMaxPages()
    },
  },
  methods: {
    increment() {
      this.state.pageIndex++
      this.updateMinMaxPages()
    },
    decrement() {
      this.state.pageIndex--
      this.updateMinMaxPages()
    },

    updateMinMaxPages() {
      this.state.pageMax = Math.min(
        this.state.itemsPerPage * this.state.pageIndex +
          this.state.itemsPerPage,
        this.state.totalPageCount,
      )
      this.state.pageMin = this.state.itemsPerPage * this.state.pageIndex + 1
      this.$emit('page-change', this.state)
    },
  },
})
</script>

<style lang="scss" scoped>
.is-disabled {
  --arrow-color: var(--grey);
  --theme-light: var(--grey-light);
  pointer-events: none;
}

.c-pagination {
  display: flex;
  align-items: center;

  &-content {
    color: var(--grey-darker);
    user-select: none;
    margin: 0 4rem;
  }

  &-arrow {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid var(--theme-light);
    width: 44px;
    height: 44px;
  }
}
</style>
