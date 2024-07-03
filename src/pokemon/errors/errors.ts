export class PokemonNotFound extends Error {
    constructor(readonly nameOrId: string) {
        super(`${nameOrId} is not a pokemon name or id`);
    }
}
