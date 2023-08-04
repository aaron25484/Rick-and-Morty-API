import { getEpisodes } from "./utils/API.js";

window.addEventListener("load", init);

async function init(){
    const episodeList = document.querySelector("#episodeList");
    const episodes = await getEpisodes();

    episodes.forEach((episode) =>{
        const episodeCard = document.createElement("li");
        const episodeCardTitle = document.createElement("h6");
        const episodeCardTitleText = document.createTextNode(episode.name)
        episodeCardTitle.appendChild(episodeCardTitleText);
        
        
        episodeList?.appendChild(episodeCard);
        episodeCard.appendChild(episodeCardTitle);

        // console.log(episode)
    })

    
    // console.log(episodes);
}