<template>
  <NavbarComponent />
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import NavbarComponent from './components/Navbar.vue'

export default defineComponent({
  name: 'App',
  components: { RouterView, NavbarComponent },
})
</script>

<style lang="scss">
@import "../../styles/index";
</style>
