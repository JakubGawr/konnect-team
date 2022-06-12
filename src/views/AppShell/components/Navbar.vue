<template>
  <nav class="c-nav">
    <router-link to="">
      <img
        alt="logo"
        src="/logo.svg"
      >
    </router-link>
    <img
      alt="notification"
      class="c-nav-icon"
      src="/notification.svg"
    >
    <img
      alt="help"
      class="c-nav-icon"
      src="/help.svg"
    >

    <img
      alt="user"
      class="c-nav-icon"
      src="/user.png"
    >
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavbarComponent',
})
</script>

<style lang="scss" scoped>
.c-nav {
  display: grid;
  grid-template-columns: 1fr repeat(3, auto);
  border: 1px solid var(--grey-light);
  height: 60px;
  align-items: center;
  padding: 0 2.4rem;
  grid-gap: 2.4rem;

  &-icon {
    cursor: pointer;
  }
}
</style>
