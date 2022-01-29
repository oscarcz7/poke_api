<template>
  <v-app :style="{background: '#212121'}"> 
    <Bar />
    <v-main>
      <Pokemons />
    </v-main>
  </v-app>
</template>

<script>
import Pokemons from "./components/Pokemons.vue";
import Bar from "./components/Bar.vue";
export default {
  name: "App",
  components: {
    Pokemons,
    Bar,
  },
};
</script>
