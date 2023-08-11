import { getEpisodes } from "./utils/API.js";
import { Episode } from "./types/Episodes.js";
import { Location } from "./types/Locations.js";

window.addEventListener("load", init);

export async function init(){
    const episodeList = document.querySelector("#episodeList");
    const episodes = await getEpisodes();
    
    episodes.forEach((episode) =>{
        const episodeListItem = document.createElement("li");
        const episodeListTitle = document.createElement("h6");
        episodeListTitle.className = "episode-list-title";
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
    episodeCardDate.setAttribute('id','episodeDate');
    episodeCardDate!.textContent = episode.air_date;
    const episodeCode = document.createElement("p");
    episodeCode.setAttribute('id','episodeCode');
    episodeCode!.textContent = episode.episode;

    displayMain?.appendChild(episodeCardName);
    displayMain?.appendChild(episodeCardDate);
    displayMain?.appendChild(episodeCode);
    
    const cardRow = document.querySelector("#roW");
    cardRow?.replaceChildren();
    
    const episodeCharacters = episode.characters;

    episodeCharacters.forEach(character => {
        const fetchCharacter = fetch(character);
        printCharacter();
        async function printCharacter(){
            const result = await fetchCharacter;
            const data = await result.json();

            const cardScheme = document.createElement("div");
            cardScheme.className = "col-lg-2 col-md-3 col-sm-6";
            const mainCards = document.createElement("div");
            mainCards.replaceChildren()
            mainCards.className = "card card-block mb-3";
            let characterImg = document.createElement("img");
            characterImg.className ="card-img";
            characterImg!.src = data.image;
            const characterName = document.createElement("h5");
            characterName.className = "card-title mt-3 mb-3";
            characterName.textContent = data.name;
            const characterBody = document.createElement("p");
            characterBody.className = "card-text";
            characterBody!.textContent = data.status + " // " + data.species;
            
            cardRow?.appendChild(cardScheme);
            cardScheme?.appendChild(mainCards);
            mainCards?.appendChild(characterImg);
            mainCards?.appendChild(characterName);
            mainCards?.appendChild(characterBody);
            
            mainCards.addEventListener('click', ()=>{
                openModal(data);
            })
        }        
    });
}

const modal = document.querySelector("#myModal") as HTMLDialogElement;

function openModal(data: {status: string; name: string; species: string; gender: string; episode:string[]; image:string; origin:Location}){
    modal.style.display = "flex";
    modal.classList.add("modal-show");
    
    let modalContent = document.querySelector("#modalContent");

    let modalCardImg = document.createElement("img");
    modalCardImg!.src = data.image;
    modalCardImg.className = "modal-card-img";
    let modalCardName = document.createElement("h5");
    modalCardName.setAttribute("id","modalCardName");
    modalCardName!.textContent = data.name;
    let modalCardStatus = document.createElement("p");
    modalCardStatus?.setAttribute("id","modalCardStatus");
    modalCardStatus!.textContent = "Status:" + " " + data.status;
    let modalCardSpecie = document.createElement("p");
    modalCardSpecie?.setAttribute("id","modalCardSpecie");
    modalCardSpecie!.textContent = "Species:" + " " + data.species;
    let modalCardGender = document.createElement("p");
    modalCardGender?.setAttribute("id","modalCardGender");
    modalCardGender!.textContent = "Gender:" + " " + data.gender;
    let modalCardOrigin = document.createElement("p");
    modalCardOrigin?.setAttribute("id","modalCardOrigin");
    modalCardOrigin!.textContent = "Origin:" + " " + data.origin.name;
    let modalCardEpiList = document.createElement("ul");
    modalCardEpiList.className = "modal-card-epi-list";
    modalCardEpiList.textContent = "Appears in Episodes:";

    modalContent?.appendChild(modalCardImg);
    modalContent?.appendChild(modalCardName);
    modalContent?.appendChild(modalCardStatus);
    modalContent?.appendChild(modalCardSpecie);
    modalContent?.appendChild(modalCardGender);
    modalContent?.appendChild(modalCardOrigin);
    modalContent?.appendChild(modalCardEpiList);

    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay?.addEventListener('click', closeModal);

    const listOfEpisodes = data.episode;
    listOfEpisodes.forEach(episode =>{
        const fetchEpisode = fetch(episode)
        printEpisodes();
        async function printEpisodes() {
            const result = await fetchEpisode;
            const episode = await result.json();
        
            let episodeLi = document.createElement("li");
            episodeLi.className = "modal-card-epi-list-item";
            episodeLi.textContent = episode.episode + " - " + episode.name;
            
            modalCardEpiList.appendChild(episodeLi);

            episodeLi.addEventListener('click',() => {
                    closeModal();
                    showCharacters(episode);
            })
        }
    })
    modalCardOrigin?.addEventListener('click',() => {
        showOrigin(data);
    })
}

function closeModal() {
    modal.classList.remove("modal-show");
    modal.classList.add("modal-hide");
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("modal-hide");
        let modalContent = document.querySelector("#modalContent");
        modalContent?.replaceChildren();
    }, 800); 
}

function showOrigin(data:{origin:Location}){
    closeModal();
    const originCharacters = data.origin.url;
    fetch(originCharacters)
        .then (response => response.json())
        .then (location=>{            
            let locationList = document.querySelector("#mainCard");
            locationList?.replaceChildren();
            const locationName = document.createElement("h5");
            locationName.setAttribute('id','locationName')
            locationName!.textContent = "Origin:" + " " + location.name;
            const locationType = document.createElement("h5");
            locationType.setAttribute('id','locationType');
            locationType.textContent = "Type:" + " " + location.type;
            const locationDimension = document.createElement("h5");
            locationDimension.setAttribute('id','locationDimension');
            locationDimension.textContent = "Dimension:" + " " + location.dimension;
            const locationResidentsList = document.createElement("h6");
            locationResidentsList.setAttribute('id','locationResidents');
            locationResidentsList.textContent = "List of Residents";

            locationList!.appendChild(locationName);
            locationList!.appendChild(locationType);
            locationList!.appendChild(locationDimension);
            locationList?.appendChild(locationResidentsList);

            const cardRow = document.querySelector("#roW");
            cardRow?.replaceChildren();
            
            const locationResidents = location.residents;
            locationResidents.forEach((resident: RequestInfo | URL) =>{
                const fetchResident = fetch(resident)
                printResident();
                    async function printResident(){
                    const result = await fetchResident;
                    const data = await result.json();
                    const cardScheme = document.createElement("div");
                    cardScheme.className = "col-lg-2 col-md-3 col-sm-6";
                    const mainCards = document.createElement("div");
                    mainCards.replaceChildren()
                    mainCards.className = "card card-block mb-3";
                    let characterImg = document.createElement("img");
                    characterImg.className ="card-img";
                    characterImg!.src = data.image;
                    const characterName = document.createElement("h5");
                    characterName.className = "card-title mt-3 mb-3";
                    characterName.textContent = data.name;
                    const characterBody = document.createElement("p");
                    characterBody.className = "card-text";
                    characterBody!.textContent = data.status + " // " + data.species;
                    
                    cardRow?.appendChild(cardScheme);
                    cardScheme?.appendChild(mainCards);
                    mainCards?.appendChild(characterImg);
                    mainCards?.appendChild(characterName);
                    mainCards?.appendChild(characterBody);

                    mainCards.addEventListener('click',()=>{
                        let modalContent = document.querySelector("#modalContent");
                        modalContent?.replaceChildren()
                        openModal(data);
                    })
                }
            })          
        })
}
