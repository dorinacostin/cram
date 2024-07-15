type BaseCharacterType = {
    gender: string;
    name: string;
}  

export type CharacterDetailType = BaseCharacterType & {
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
}  

export type FavouriteCharacterType = BaseCharacterType & {
    homePlanet: string;
}  

export type ResponseCharacterType = BaseCharacterType & {
    url: string; 
    homeworld: string;
}  

export type ResponsePlanetType = {
    name: string;
    url: string;
}  

export type PlanetType = {
    name: string;
    url: string; 
}

export type FilmType = {
    title: string; 
}

export type StarshipType = {
    name: string; 
}

export type ResponsType = {
    count: number;
    next: string;
    previous: string | null;
}