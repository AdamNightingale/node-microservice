import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get } from "@nestjs/common";
import { PokemonUsecase } from "./pokemon.usecase";
import { PokemonService } from "./pokemon.service";

type PokeInfo = {
    name: string,
}

@Controller()
export class PokemonController {
    constructor(private http: HttpService, private pokeService: PokemonService) {}
    
    @Get("/pokemon")
    async getPokemon(@Body() body: PokeInfo) {
        const { name } = body
        const pokeInfos = (await this.http.axiosRef.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)).data;
        const type1 = pokeInfos.types[0].type.name;
        const type2 = pokeInfos.types[1]?.type.name;
        let types = [type1]
        if(type2) types = [type1, type2];
        const usecase = new PokemonUsecase(pokeInfos.name, pokeInfos.id, types, this.pokeService);
        const myPoke = usecase.createPokemon()
        console.log(myPoke)
    }
}
