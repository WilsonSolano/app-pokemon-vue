import { ref, Ref } from 'vue';
import IPokemon from '../interface/IPokemon.ts';

class PokemonServices {
    Pokemons: Ref<IPokemon[]> = ref([]);
    Pokemon: Ref<IPokemon> = ref({} as IPokemon);

    constructor() {
        this.ObtenerTodosPokemon().catch(error => {
            console.error('Error al inicializar Pokémon:', error);
        });
    }

    async ObtenerTodosPokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
            const data = await response.json();
            if (data && data.results) {
                this.Pokemons.value = data.results as IPokemon[];
                this.Pokemons.value.forEach(async (pokemon: IPokemon) => {
                    pokemon.id = await this.ObtenerPokemonId(pokemon.url);
                    pokemon.img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+pokemon.id+'.png'
                });
            } else {
                console.error('Formato de datos no válido');
                this.Pokemons.value = [];
            }
        } catch (error) {
            console.error('Error al obtener Pokémon:', error);
            this.Pokemons.value = [];
        }
    }

    async ObtenerPokemonId(url: string): Promise<number> {
        try {
            const urlParts = url.split('/');
            const idPart = urlParts[urlParts.length - 2];
            const id = parseInt(idPart, 10);
    
            if (isNaN(id)) {
                throw new Error(`No se pudo extraer un ID válido de la URL: ${url}`);
            }
    
            return id;
        } catch (error) {
            console.error('Error al obtener el ID del Pokémon:', error);
            throw error;
        }
    }
    
}

export default new PokemonServices();