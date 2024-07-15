import { ReactNode } from "react";

type CharacterBaseType = {
    name: string;
    gender: string;  
    homePlanet: string; 
}

export type CharacterType = CharacterBaseType & {
    image: string; 
    id?: number | null;
    children?: ReactNode; 
    isFavourite?: boolean;
    onClick: (character: CharacterBaseType) => void;
}