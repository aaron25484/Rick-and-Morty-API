import { getEpisodes } from "./utils/API.js";

import { urlEpisodes } from "./utils/API.js";

window.addEventListener("load", init);

export async function init(){
    const episodeList = document.querySelector("#episodeList");
    const episodes = await getEpisodes();
    
    episodes.forEach((episode) =>{
        const episodeListItem = document.createElement("li");
        const episodeListTitle = document.createElement("h6");
        const episodeCardTitleText = document.createTextNode(`Episode ${episode.id}`)
        episodeListTitle.appendChild(episodeCardTitleText);
        
        episodeList?.appendChild(episodeListItem);
        episodeListItem.appendChild(episodeListTitle);
        
        episodeListItem.addEventListener('click', () => showCharacters(episode));
    })
}

async function showCharacters(episode: Episode){
    const displayMain = document.querySelector("#mainCard");
    displayMain?.replaceChildren();
    const episodeCardName = document.createElement("h5");
    episodeCardName.setAttribute('id','episodeName');
    episodeCardName!.textContent = episode.name;
    const episodeCardDate = document.createElement("p");
    episodeCardDate!.textContent = episode.air_date;
    const episodeCode = document.createElement("p");
    episodeCode!.textContent = episode.episode;

    displayMain?.appendChild(episodeCardName);
    displayMain?.appendChild(episodeCardDate);
    displayMain?.appendChild(episodeCode);
    
    const cardRow = document.querySelector("#roW");
    cardRow?.replaceChildren()
    
    const episodeCharacters = episode.characters;
    
        episodeCharacters.forEach(character => {
            const fetchCharachter = fetch(character);
            printCharacter();
            async function printCharacter(){
                const result = await fetchCharachter;
                const data = await result.json();
                
                
                
                const cardScheme = document.createElement("div");
                cardScheme.className = "col-md-3 col-sm-6";
                
                const mainCards = document.createElement("div");
                mainCards.replaceChildren()
                mainCards.className = "card card-block";
                
                let characterImg = document.createElement("img");
                characterImg!.src = data.image;
                const characterName = document.createElement("h5");
                characterName.className = "card-title mt-3 mb-3";
                characterName.textContent = data.name;
                const characterBody = document.createElement("p");
                characterBody.className = ".card-text";
                characterBody!.textContent = data.status + " / " + data.species;
                
                
                cardRow?.appendChild(cardScheme);
                cardScheme?.appendChild(mainCards)
                mainCards?.appendChild(characterImg);
                mainCards?.appendChild(characterName);
                mainCards?.appendChild(characterBody);
                
            }        
        });
    }

    