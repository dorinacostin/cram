import { ChangeEvent } from "react";

export type SearchType = {
    query: string; 
    onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}