export interface PokemonRepository {
    getAllCounters(types: string[]): string[];
}