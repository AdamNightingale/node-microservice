import { Module } from "@nestjs/common";
import { PokemonController } from "./controllers/pokemon.controller";
import { HttpModule } from "@nestjs/axios";
import { PokemonService } from "./services/pokemon.service";

@Module({
    controllers:[PokemonController],
    imports: [HttpModule],
    providers: [PokemonService],
})
export class PokemonModule {}
