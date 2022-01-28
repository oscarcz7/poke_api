<template>
  <v-dialog v-model="show">
    <v-card dark>
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-avatar class="ma-3" size="125" tile>
          <v-img :src="imageUrl + pokemon.id + '.png'"></v-img>
        </v-avatar>
        <div>
          <v-card-title class="text-h5" v-text="pkemon.name"></v-card-title>

          <v-card-text> </v-card-text>

          <p>Habilidades</p>
          <v-chip-group
            v-for="(value, index) in pokemon.abilities"
            :key="'value' + index"
          >
            >
            <v-chip> {{ value.ability.name }}</v-chip>
          </v-chip-group>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["pokemonUrl", "imageUrl"],
  data: () => {
    return {
      show: false,
      pokemon: {},
    };
  },
  methods: {
    fetchData() {
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.pokemon = data;
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDetail() {
      this.$emit("closeDetail");
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
