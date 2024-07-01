export interface PokemonRepository {
    getCounterTypes(types: string[]): string[];
}