import { Pokemon } from '../../types';
import { PokemonService } from '../services/pokemon.service';

export class PokemonUsecase {
    constructor(
        private name: string,
        private pokeService: PokemonService,
    ) {}

    async createPokemon(): Promise<Pokemon> {
        const basePokemon = await this.pokeService.getBasePokemon(this.name);
        const counterTypes = this.pokeService.getAllCounters(basePokemon.types);
        const pokemon: Pokemon = {
            id: basePokemon.id,
            name: basePokemon.name,
            types: basePokemon.types,
            counters: counterTypes,
        };

        return pokemon;
    }
}
