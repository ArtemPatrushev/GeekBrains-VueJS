<template>
  <div id="app">
    <header>
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
</style>
