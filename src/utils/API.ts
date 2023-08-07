const url = "https://rickandmortyapi.com/api";

const urlEpisodes = `${url}/episode`;

export async function getEpisodes(): Promise<Episode[]>{
    const response = await fetch(urlEpisodes);
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



// ${url}/episode?page=(i+1)