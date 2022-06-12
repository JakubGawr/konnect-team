<template>
  <button class="c-btn">
    {{ content }}
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtnComponent',
  props: {
    content: {
      required: true,
      type: String,
    },
  },
})
</script>

<style lang="scss" scoped>
.c-btn {
  background: var(--theme-main);
  cursor: pointer;
  padding: 0.8rem 1.2rem;
  font-size: 1.6rem;
  border: none;
  border-radius: 3px;
  color: var(--white);
}
</style>
