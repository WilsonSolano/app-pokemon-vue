<template>
  <div class="contenedor">
    <div v-for="pokemon in pokemons" :key="pokemon.name" class="card">
      <img class="imgPokemon" :src="pokemon.img">
      <p class="nombre">{{ pokemon.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.contenedor{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card{
  background-color: antiquewhite;
  width: 250px;
  margin: 10px;
  border-radius: 25px;
}
.imgPokemon{
  width: 250px;
  height: 250px;
}
.nombre{
  color: black;
  font-size: 20px;
  font-weight: bold;
}
</style>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import PokemonServices from "../services/PokemonServices";

const pokemons = computed(() => PokemonServices.Pokemons.value);

onMounted(async () => {
  try {
    await PokemonServices.ObtenerTodosPokemon();
    console.log(pokemons.value)
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
  }
});
</script>
