<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn to="/dashboard" class="mr-2" depressed>Dashboard</v-btn>
      <v-btn to="/about" depressed>About</v-btn>
    </v-app-bar>
    <v-main class="ma-8">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
