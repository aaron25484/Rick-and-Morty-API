const url = "https://rickandmortyapi.com/api";

let page = 1;

import {init} from "../main.js"

export const urlEpisodes = `${url}/episode`;

export async function getEpisodes(): Promise<Episode[]>{
    const response = await fetch(urlEpisodes + `?page=${page}`);
    const data = await response.json();
    return data.results;
}

const urlCharacters = `${url}/character`;

export async function getCharacters(): Promise<Character[]> {
    const response = await fetch(urlCharacters);
    const data = await response.json();
    return data.results;
}

const urlLocations = `${url}/location`;

export async function getLocations(): Promise<Location[]> {
    const response = await fetch(urlLocations);
    const data = await response.json();
    return data.results;
}

const loadEpisodesButton = document.querySelector("#loadButton");

loadEpisodesButton?.addEventListener('click', loadEpisodes)

async function loadEpisodes(){
    
    page++;
    console.log(page)
    getEpisodes();
    init();
    
}