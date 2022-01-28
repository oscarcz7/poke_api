<template>
  <v-card>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(pokemon, index) in pokemons"
          :key="'poke' + index"
          :cols="8"
          sm="8"
          md="4"
          lg="4"
          class="text-center"
        >
          <v-card @click="details(pokemon.pokemon_species.url)">
            <v-img :src="getImg(pokemon.entry_number)" width="150" height="125">
            </v-img>
            <v-card-title v-text="pokemon.pokemon_species.name"></v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog">
      <v-card dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-avatar class="ma-3" size="125" tile> </v-avatar>
          <div>
            <v-card-title class="text-h5" v-text="pokemon.name"></v-card-title>

            <v-card-text> </v-card-text>

            <p>Habilidades</p>
            <!-- <v-chip-group
              v-for="(value, index) in pokemon.abilities"
              :key="'value' + index"
            >
              >
              <v-chip> {{ value.ability.name }}</v-chip>
            </v-chip-group> -->
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-card>
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
      descripcion: "",
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
      console.log(url);
      this.axios
        .get(url)
        .then((res) => {
          this.pokemon = res.data;

          this.axios
            .get(`https://pokeapi.co/api/v2/pokemon-species/${res.data.id}`)
            .then((res) => {
              res.data.flavor_text_entries.forEach((element) => {
                console.log(element.language);
                if (element.language === "es") {
                  this.descripcion = element.flavor_text;
                }
              });
              console.log(this.descripcion);
            })

            .catch((err) => {
              console.log(err);
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
</style>