<template>
  <v-app>
    <v-app-bar app color="blue-grey lighten-3" class="d-flex justify-center">
      <v-toolbar-title>
        <h3 style="color: #b71c1c">{{ title }}</h3>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <Pokemons />
    </v-main>
  </v-app>
</template>

<script>
import Pokemons from "./components/Pokemons.vue"
export default {
  name: "App",
  components:{
    Pokemons
  },
  data: () => ({
    title: "Pokedex",
  }),
};
</script>
