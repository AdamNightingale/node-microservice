import { Body, Controller, Get } from '@nestjs/common';
import { PokemonUsecase } from '../usecases/pokemon.usecase';
import { PokemonService } from '../services/pokemon.service';
import { PokeInfo } from 'src/types';

@Controller()
export class PokemonController {
    constructor(private pokeService: PokemonService) {}

    @Get('/pokemon')
    async getPokemon(@Body() body: PokeInfo) {
        const { nameOrId } = body;
        const usecase = new PokemonUsecase(nameOrId, this.pokeService);
        const myPoke = await usecase.createPokemon();
        console.log(myPoke);
    }
}
