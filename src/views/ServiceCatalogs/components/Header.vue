<template>
  <header
    class="c-header"
    data-cy="header"
  >
    <h1 class="c-header-title">
      Services
    </h1>
    <BtnComponent
      class="c-header-btn"
      content="Add New Service"
    />
    <input
      v-model="searchQuery"
      class="search-input"
      data-cy="search-input"
      placeholder="Search services"
      @input="onInput(searchQuery)"
    >
  </header>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { debounce } from 'debounce'
import BtnComponent from '@/shared/ui/Btn.vue'

export enum Output {
  InputChange = 'input-change',
}

export default defineComponent({
  name: 'HeaderComponent',
  components: { BtnComponent },
  emits: [Output.InputChange],
  setup: function() {
    const searchQuery = ref('')
    return {
      searchQuery,
    }
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

.c-header {
  @include withGridFit;
  align-items: center;
  grid-row-gap: 2.4rem;
  grid-column-gap: 2.7rem;

  &-title {
    margin: 0;
    color: var(--text-primary);
    font-size: 2.4rem;
  }

  &-btn {
    grid-column: auto / -1;
    justify-self: end;
  }
}

.search-input {
  background: url("/public/search.svg") no-repeat 1.2rem;
  grid-column: 1;
  grid-row: 2;
  min-width: 215px;
  height: 38px;
  font-size: 1.6rem;
  border: 1px solid var(--grey-light);
  padding: 1rem 1rem 1rem 3.8rem;
  border-radius: 3px;
  color: var(--grey-darker);

  &::placeholder {
    color: var(--grey-darker);
    font-size: 1.6rem;
  }
}
</style>
