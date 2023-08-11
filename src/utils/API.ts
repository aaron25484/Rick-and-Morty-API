const url = "https://rickandmortyapi.com/api";

let page = 1;

import {init} from "../main.js"
import { Episode } from "../types/Episodes.js";

export const urlEpisodes = `${url}/episode`;

export async function getEpisodes(): Promise<Episode[]>{
    const response = await fetch(urlEpisodes + `?page=${page}`);
    const data = await response.json();
    return data.results;
}

const loadEpisodesButton = document.querySelector("#loadButton");

loadEpisodesButton?.addEventListener('click', loadEpisodes);

async function loadEpisodes(){
    page++;
    getEpisodes();
    init();

    if(page > 2){
        loadEpisodesButton?.remove();
    }
}