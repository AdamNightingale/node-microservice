import { Pokemon } from "../../types";
import { PokemonService } from "../services/pokemon.service";

export class PokemonUsecase {
    constructor(private name: string, private pokeService: PokemonService) {}

    async createPokemon(): Promise<Pokemon> {
        const pokeInfo = await this.pokeService.getPokeInfo(this.name);
        const counterTypes = this.pokeService.getCounterTypes(pokeInfo.types);
        const pokemon: Pokemon = {
            id: pokeInfo.id,
            name: pokeInfo.name,
            types: pokeInfo.types,
            counters: counterTypes,
        }

        return pokemon;
    }
}