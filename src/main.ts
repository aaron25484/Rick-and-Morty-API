import { getEpisodes } from "./utils/API.js";

import { getCharacters } from "./utils/API.js";

window.addEventListener("load", init);

async function init(){
    const episodeList = document.querySelector("#episodeList");
    const episodes = await getEpisodes();

    episodes.forEach((episode) =>{
        const episodeListItem = document.createElement("li");
        const episodeListTitle = document.createElement("h6");
        const episodeCardTitleText = document.createTextNode(`Episode ${episode.id}`)
        episodeListTitle.appendChild(episodeCardTitleText);
        
        episodeList?.appendChild(episodeListItem);
        episodeListItem.appendChild(episodeListTitle);
        
        episodeListItem.addEventListener('click', showCharacters);
        

        function showCharacters(){
            const displayMain = document.querySelector("#mainCard");
            const episodeCardName = document.querySelector("#episodeName");
            episodeCardName!.textContent = episode.name;
            const episodeCardDate = document.querySelector("#episodeDate");
            episodeCardDate!.textContent = episode.airDate;
            const episodeCode = document.querySelector("#episodeCode");
            episodeCode!.textContent = episode.episode;
            
            const episodeCharacters = episode.characters;
            
            episodeCharacters.forEach(char => {
                const fetchChar = fetch(char);
                printChar(); console.log(printChar)
                async function printChar(){
                    const result = await fetchChar;
                    const data = await result.json();
                    console.log(data);

                    if (displayMain){
                    const cardRow = document.querySelector("#roW");
                    const cardScheme = document.createElement("div");
                    cardScheme.className = "col-md-3 col-sm-6";
                    const mainCards = document.createElement("div");
                    mainCards.className = "card card-block";

                    let characterImg = document.createElement("img");
                    characterImg!.src = data.image;
                    const characterName = document.createElement("h5");
                    characterName.className = "card-title mt-3 mb-3";
                    characterName.textContent = data.name;
                    const characterBody = document.createElement("p");
                    characterBody.className = ".card-text";
                    characterBody!.textContent = data.status + "---" + data.species;
                    
                    cardRow?.appendChild(cardScheme);
                    cardScheme?.appendChild(mainCards)
                    mainCards?.appendChild(characterImg);
                    mainCards?.appendChild(characterName);
                    mainCards?.appendChild(characterBody);
                    }
                }        
            });
        
        }
    })

}