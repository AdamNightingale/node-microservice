import { PokemonService } from "../services/pokemon.service";

export class PokemonUsecase {
    constructor(private name: string, private id: number, private types: string[], private pokeService:PokemonService) {}

    createPokemon() {
        const counterTypes = this.pokeService.getCounterTypes(this.types);

        return {name: this.name, id: this.id, types: this.types, counterTypes}
    }
}