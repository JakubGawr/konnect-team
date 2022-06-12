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
@import url("https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto:wght@400;500&display=swap");
@import "../../styles/index";
</style>
