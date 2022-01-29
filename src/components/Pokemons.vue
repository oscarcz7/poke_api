<template>
  <v-container>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(pokemon, index) in pokemons"
          :key="index"
          :cols="12"
          sm="12"
          md="6"
          lg="2"
          class="text-center"
        >
          <v-card @click="details(pokemon.pokemon_species.url)">
            <v-img
              :src="getImg(pokemon.entry_number)"
              class="mx-auto  align-end"
              width="150"
            >
              <v-card-title
                class="font-weight-bold"
                v-text="pokemon.pokemon_species.name"
              ></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card dark>
        <p class="title text-center pt-2">#{{ pokemon.id }}</p>
        <v-img
          :class="color"
          class="mx-auto rounded-circle elevation-3"
          :src="img"
          width="210px"
        >
        </v-img>
        <div class="text-h5 mt-3 text-center font-weight-bold text-uppercase">
          {{ pokemon.name }}
        </div>
        <div class="d-flex justify-center">
          <v-chip-group column>
            <v-chip
              v-for="(value, index) in types"
              :key="index"
              :color="color"
              outlined
            >
              {{ value.type.name }}</v-chip
            >
          </v-chip-group>
        </div>

        <v-divider class="mx-5 my-3"></v-divider>
        <v-card-text>
          <div class="font-weight-light white--text">
            {{ description }}
          </div>
        </v-card-text>
        <div class="mx-5 my-4 elevation-5 rounded-lg grey darken-4">
          <v-row class="text-center">
            <v-col>
              {{ weight / 10 }} kg ({{ (weight * 0.22046).toFixed(1) }} lbs)
              <br />
              <span class="grey--text caption mb-0">Weight</span>
            </v-col>
            <v-divider class="my-4" vertical></v-divider>
            <v-col>
              {{ (height * 0.1).toFixed(1) }} m ({{ (height * 10).toFixed(1) }}
              cm)
              <br />
              <span class="grey--text caption">Height</span>
            </v-col>
          </v-row>
        </div>
        <v-container class="mx-5">
          <span class="grey--text font-weight-light">Habilidades</span>
          <v-chip-group column class="mb-3">
            <v-chip
              v-for="(value, index) in abilities"
              :key="index"
              :color="color"
              :text-color="color === 'white' ? 'black' : 'white'"
              class="font-weight-bold text-uppercase"
            >
              {{ value.ability.name }}</v-chip
            >
          </v-chip-group>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      pokemons: [],
      pokemon: [],
      name: "",
      img: "",
      dialog: false,
      description: "",
      abilities: [],
      types: [],
      color: "",
      height: 0,
      weight: 0,
      search: "",
    };
  },
  created() {
    this.listPokemons();
  },
  methods: {
    getImg(num) {
      var str = "" + num;
      var pad = "000";
      var ans = pad.substring(0, pad.length - str.length) + str;
      return require("../assets/pokemon/" + ans + ".png");
    },
    pokemonImg(num) {
      var str = "" + num;
      var pad = "000";
      var ans = pad.substring(0, pad.length - str.length) + str;
      this.img = require("../assets/pokemon/" + ans + ".png");
    },
    listPokemons() {
      this.axios
        .get("https://pokeapi.co/api/v2/pokedex/2/")
        .then((res) => {
          this.pokemons = res.data.pokemon_entries;
          console.log(this.pokemons);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    details(url) {
      this.axios
        .get(url)
        .then((res) => {
          this.pokemon = res.data;
          this.pokemonImg(res.data.id);
          this.color = res.data.color.name;
          this.axios
            .get(`https://pokeapi.co/api/v2/pokemon-species/${res.data.id}`)
            .then((res) => {
              const textResponses = res.data.flavor_text_entries.filter(
                (element) => element.language.name == "en"
              );
              this.description = textResponses[0].flavor_text;
            });
          this.axios
            .get(`https://pokeapi.co/api/v2/pokemon/${res.data.id}`)
            .then((res) => {
              this.abilities = res.data.abilities;
              this.types = res.data.types;
              this.weight = res.data.weight;
              this.height = res.data.height;
            });
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialog = true;
    },

  },
};
</script>
<style>
.v-sheet--offset {
  top: -40px;
  position: relative;
}
</style>