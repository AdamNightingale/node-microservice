import { HttpService } from "@nestjs/axios";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PokemonService implements PokemonRepository{
    constructor(private http: HttpService) {}

    async getPokeInfo(name: string) {
        const pokeInfo = await this.http.axiosRef.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const pokeInfos = pokeInfo.data;
        const types = this.parseTypes(pokeInfos.types);

        return { id: pokeInfos.id, name: pokeInfos.name, types }
    }

    getCounterTypes(types: string[]): string[] {
        if(types.length == 1) {
            return this.getCounter(types[0]);
        }

        let counters;
        types.map((type) => {
            let typeCounter = this.getCounter(type);
            if(counters !== undefined) typeCounter.forEach((counter) => {
                counters.push(counter);
            });
            else counters = typeCounter;
        });
        
        return counters;
    }

    private parseTypes(types) {
        const type1 = types[0].type.name;
        const type2 = types[1]?.type.name;
        let type = [type1];
        if (type2) type = [type1, type2];

        return type;
    }

    private getCounter(type: string): string[] {
        let counters;
            switch (type) {
                case "normal":
                    counters = ["fighting"];
                    break;
    
                case "fire":
                    counters = ["water","ground","rock"];
                    break;
    
                case "water":
                    counters = ["grass","electric"];
                    break;
    
                case "grass":
                    counters = ["fire","ice","poison","flying","bug"];
                    break;
    
                case "electric":
                    counters = ["ground"];
                    break;
    
                case "ice":
                    counters = ["fire","fighting","rock","steel"];
                    break;
    
                case "fighting":
                    counters = ["flying","psychic","fairy"];
                    break;
    
                case "poison":
                    counters = ["ground","psychic"];
                    break;
    
                case "ground":
                    counters = ["water","grass","ice"];
                    break;
    
                case "flying":
                    counters = ["electric","ice","rock"];
                    break;
    
                case "psychic":
                    counters = ["bug","ghost","dark"];
                    break;
    
                case "bug":
                    counters = ["flying", "rock","fire"];
                    break;
    
                case "rock":
                    counters = ["water","grass","fighting","ground","steel"];
                    break;
    
                case "ghost":
                    counters = ["ghost","dark"];
                    break;
    
                case "dragon":
                    counters = ["ice","dragon","fairy"];
                    break;
    
                case "dark":
                    counters = ["fighting","bug","fairy"];
                    break;
    
                case "steel":
                    counters = ["fire","fighting","ground"];
                    break;
    
                case "fairy":
                    counters = ["poison","steel"];
                    break;
    
                default: throw new Error("invalid type");
            }
            return counters
    }
}