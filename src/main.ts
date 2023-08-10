import { getEpisodes, getCharacters, urlEpisodes } from "./utils/API.js";

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
                cardScheme.className = "col-md-3 col-sm-6";
                
                const mainCards = document.createElement("div");
                mainCards.replaceChildren()
                mainCards.className = "card card-block mb-3";
                
                let characterImg = document.createElement("img");
                characterImg!.src = data.image;
                const characterName = document.createElement("h5");
                characterName.className = "card-title mt-3 mb-3";
                characterName.textContent = data.name;
                const characterBody = document.createElement("p");
                characterBody.className = ".card-text";
                characterBody!.textContent = data.status + " // " + data.species;
                
                cardRow?.appendChild(cardScheme);
                cardScheme?.appendChild(mainCards);
                mainCards?.appendChild(characterImg);
                mainCards?.appendChild(characterName);
                mainCards?.appendChild(characterBody);
                
                mainCards.addEventListener('click', ()=>{
                    openModal(data);
                    
                } )
            }        
        });
    }


const modal = document.querySelector("#myModal") as HTMLDialogElement;

function openModal(data: {status: string | null; name: string | null; species: string; gender: string; episode:string[] ; image:string; origin:Location}){
    modal.style.display = "block";
    modal!.style.opacity = "1";
    let modalContent = document.querySelector("#modalContent");

    let modalCardImg = document.createElement("img");
    modalCardImg!.src = data.image;
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
    let modalCardOrigin = document.createElement("ul");
    modalCardOrigin?.setAttribute("id","modalCardOrigin");
    modalCardOrigin!.textContent = "Origin:" + " " + data.origin.name;
    let modalCardEpiList = document.createElement("ul");
    modalCardEpiList.textContent = "Appears in Episodes:";

    // modalContent?.appendChild(modalClose);
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
                episodeLi.textContent = episode.episode + " - " + episode.name
                
                modalCardEpiList.appendChild(episodeLi);

                episodeLi.addEventListener('click',() => {
                        closeModal();
                        showCharacters(episode);
                })
            }
        })
    modalCardOrigin?.addEventListener('click',() => {
        showOrigin(data);
    } )
}
function closeModal() {
    modal.style.opacity = "0"; 
    modal.style.display = "none";
    let modalContent = document.querySelector("#modalContent");
    modalContent?.replaceChildren()

}

function showOrigin(data:{origin:Location}){
    const originCharacters = data.origin.url;
    fetch(originCharacters)
        .then (response => response.json())
        .then (location=>{
            
            let locationList = document.querySelector("#modalCardOrigin");
            locationList?.replaceChildren();
            locationList!.textContent = location.name;
            let locationType = document.createElement("li");
            locationType.textContent = location.type;
            let locationDimension = document.createElement("li");
            locationDimension.textContent = location.dimension;
            let locationResidentsList = document.createElement("ul");
            locationResidentsList.textContent = "List of Residents:";
            
            const locationResidents = location.residents;
            locationResidents.forEach((resident: RequestInfo | URL) =>{
                const fetchResident = fetch(resident)
                printResident();
                    async function printResident(){
                    const result = await fetchResident;
                    const data = await result.json();
                    let locationResidentsListItem = document.createElement("li"); 
                    locationResidentsListItem.textContent = data.name;
                    locationResidentsList.appendChild(locationResidentsListItem);

                    locationResidentsListItem.addEventListener('click',()=>{
                        let modalContent = document.querySelector("#modalContent");
                        modalContent?.replaceChildren()
                        openModal(data);
                    })
                    }
            })

            locationList!.appendChild(locationType);
            locationList!.appendChild(locationDimension);
            locationList!.appendChild(locationResidentsList);
            
        })

}
