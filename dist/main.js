var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodes } from "./utils/API.js";
window.addEventListener("load", init);
export function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const episodeList = document.querySelector("#episodeList");
        const episodes = yield getEpisodes();
        episodes.forEach((episode) => {
            const episodeListItem = document.createElement("li");
            const episodeListTitle = document.createElement("h6");
            episodeListTitle.className = "episode-list-title";
            const episodeCardTitleText = document.createTextNode(`Episode ${episode.id}`);
            episodeListTitle.appendChild(episodeCardTitleText);
            episodeList === null || episodeList === void 0 ? void 0 : episodeList.appendChild(episodeListItem);
            episodeListItem.appendChild(episodeListTitle);
            episodeListItem.addEventListener('click', () => showCharacters(episode));
        });
    });
}
function showCharacters(episode) {
    return __awaiter(this, void 0, void 0, function* () {
        const displayMain = document.querySelector("#mainCard");
        displayMain === null || displayMain === void 0 ? void 0 : displayMain.replaceChildren();
        const episodeCardName = document.createElement("h5");
        episodeCardName.setAttribute('id', 'episodeName');
        episodeCardName.textContent = episode.name;
        const episodeCardDate = document.createElement("p");
        episodeCardDate.setAttribute('id', 'episodeDate');
        episodeCardDate.textContent = episode.air_date;
        const episodeCode = document.createElement("p");
        episodeCode.setAttribute('id', 'episodeCode');
        episodeCode.textContent = episode.episode;
        displayMain === null || displayMain === void 0 ? void 0 : displayMain.appendChild(episodeCardName);
        displayMain === null || displayMain === void 0 ? void 0 : displayMain.appendChild(episodeCardDate);
        displayMain === null || displayMain === void 0 ? void 0 : displayMain.appendChild(episodeCode);
        const cardRow = document.querySelector("#roW");
        cardRow === null || cardRow === void 0 ? void 0 : cardRow.replaceChildren();
        const episodeCharacters = episode.characters;
        episodeCharacters.forEach(character => {
            const fetchCharacter = fetch(character);
            printCharacter();
            function printCharacter() {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield fetchCharacter;
                    const data = yield result.json();
                    const cardScheme = document.createElement("div");
                    cardScheme.className = "col-lg-2 col-md-3 col-sm-6";
                    const mainCards = document.createElement("div");
                    mainCards.replaceChildren();
                    mainCards.className = "card card-block mb-3";
                    let characterImg = document.createElement("img");
                    characterImg.className = "card-img";
                    characterImg.src = data.image;
                    const characterName = document.createElement("h5");
                    characterName.className = "card-title mt-3 mb-3";
                    characterName.textContent = data.name;
                    const characterBody = document.createElement("p");
                    characterBody.className = "card-text";
                    characterBody.textContent = data.status + " // " + data.species;
                    cardRow === null || cardRow === void 0 ? void 0 : cardRow.appendChild(cardScheme);
                    cardScheme === null || cardScheme === void 0 ? void 0 : cardScheme.appendChild(mainCards);
                    mainCards === null || mainCards === void 0 ? void 0 : mainCards.appendChild(characterImg);
                    mainCards === null || mainCards === void 0 ? void 0 : mainCards.appendChild(characterName);
                    mainCards === null || mainCards === void 0 ? void 0 : mainCards.appendChild(characterBody);
                    mainCards.addEventListener('click', () => {
                        openModal(data);
                    });
                });
            }
        });
    });
}
const modal = document.querySelector("#myModal");
function openModal(data) {
    modal.style.display = "flex";
    modal.classList.add("modal-show");
    let modalContent = document.querySelector("#modalContent");
    let modalCardImg = document.createElement("img");
    modalCardImg.src = data.image;
    modalCardImg.className = "modal-card-img";
    let modalCardName = document.createElement("h5");
    modalCardName.setAttribute("id", "modalCardName");
    modalCardName.textContent = data.name;
    let modalCardStatus = document.createElement("p");
    modalCardStatus === null || modalCardStatus === void 0 ? void 0 : modalCardStatus.setAttribute("id", "modalCardStatus");
    modalCardStatus.textContent = "Status:" + " " + data.status;
    let modalCardSpecie = document.createElement("p");
    modalCardSpecie === null || modalCardSpecie === void 0 ? void 0 : modalCardSpecie.setAttribute("id", "modalCardSpecie");
    modalCardSpecie.textContent = "Species:" + " " + data.species;
    let modalCardGender = document.createElement("p");
    modalCardGender === null || modalCardGender === void 0 ? void 0 : modalCardGender.setAttribute("id", "modalCardGender");
    modalCardGender.textContent = "Gender:" + " " + data.gender;
    let modalCardOrigin = document.createElement("p");
    modalCardOrigin === null || modalCardOrigin === void 0 ? void 0 : modalCardOrigin.setAttribute("id", "modalCardOrigin");
    modalCardOrigin.textContent = "Origin:" + " " + data.origin.name;
    let modalCardEpiList = document.createElement("ul");
    modalCardEpiList.className = "modal-card-epi-list";
    modalCardEpiList.textContent = "Appears in Episodes:";
    modalContent === null || modalContent === void 0 ? void 0 : modalContent.appendChild(modalCardImg);
    modalContent === null || modalContent === void 0 ? void 0 : modalContent.appendChild(modalCardName);
    modalContent === null || modalContent === void 0 ? void 0 : modalContent.appendChild(modalCardStatus);
    modalContent === null || modalContent === void 0 ? void 0 : modalContent.appendChild(modalCardSpecie);
    modalContent === null || modalContent === void 0 ? void 0 : modalContent.appendChild(modalCardGender);
    modalContent === null || modalContent === void 0 ? void 0 : modalContent.appendChild(modalCardOrigin);
    modalContent === null || modalContent === void 0 ? void 0 : modalContent.appendChild(modalCardEpiList);
    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay === null || modalOverlay === void 0 ? void 0 : modalOverlay.addEventListener('click', closeModal);
    const listOfEpisodes = data.episode;
    listOfEpisodes.forEach(episode => {
        const fetchEpisode = fetch(episode);
        printEpisodes();
        function printEpisodes() {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield fetchEpisode;
                const episode = yield result.json();
                let episodeLi = document.createElement("li");
                episodeLi.className = "modal-card-epi-list-item";
                episodeLi.textContent = episode.episode + " - " + episode.name;
                modalCardEpiList.appendChild(episodeLi);
                episodeLi.addEventListener('click', () => {
                    closeModal();
                    showCharacters(episode);
                });
            });
        }
    });
    modalCardOrigin === null || modalCardOrigin === void 0 ? void 0 : modalCardOrigin.addEventListener('click', () => {
        showOrigin(data);
    });
}
function closeModal() {
    modal.classList.remove("modal-show");
    modal.classList.add("modal-hide");
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("modal-hide");
        let modalContent = document.querySelector("#modalContent");
        modalContent === null || modalContent === void 0 ? void 0 : modalContent.replaceChildren();
    }, 800);
}
function showOrigin(data) {
    closeModal();
    const originCharacters = data.origin.url;
    fetch(originCharacters)
        .then(response => response.json())
        .then(location => {
        let locationList = document.querySelector("#mainCard");
        locationList === null || locationList === void 0 ? void 0 : locationList.replaceChildren();
        const locationName = document.createElement("h5");
        locationName.setAttribute('id', 'locationName');
        locationName.textContent = "Origin:" + " " + location.name;
        const locationType = document.createElement("h5");
        locationType.setAttribute('id', 'locationType');
        locationType.textContent = "Type:" + " " + location.type;
        const locationDimension = document.createElement("h5");
        locationDimension.setAttribute('id', 'locationDimension');
        locationDimension.textContent = "Dimension:" + " " + location.dimension;
        const locationResidentsList = document.createElement("h6");
        locationResidentsList.setAttribute('id', 'locationResidents');
        locationResidentsList.textContent = "List of Residents";
        locationList.appendChild(locationName);
        locationList.appendChild(locationType);
        locationList.appendChild(locationDimension);
        locationList === null || locationList === void 0 ? void 0 : locationList.appendChild(locationResidentsList);
        const cardRow = document.querySelector("#roW");
        cardRow === null || cardRow === void 0 ? void 0 : cardRow.replaceChildren();
        const locationResidents = location.residents;
        locationResidents.forEach((resident) => {
            const fetchResident = fetch(resident);
            printResident();
            function printResident() {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield fetchResident;
                    const data = yield result.json();
                    const cardScheme = document.createElement("div");
                    cardScheme.className = "col-lg-2 col-md-3 col-sm-6";
                    const mainCards = document.createElement("div");
                    mainCards.replaceChildren();
                    mainCards.className = "card card-block mb-3";
                    let characterImg = document.createElement("img");
                    characterImg.className = "card-img";
                    characterImg.src = data.image;
                    const characterName = document.createElement("h5");
                    characterName.className = "card-title mt-3 mb-3";
                    characterName.textContent = data.name;
                    const characterBody = document.createElement("p");
                    characterBody.className = "card-text";
                    characterBody.textContent = data.status + " // " + data.species;
                    cardRow === null || cardRow === void 0 ? void 0 : cardRow.appendChild(cardScheme);
                    cardScheme === null || cardScheme === void 0 ? void 0 : cardScheme.appendChild(mainCards);
                    mainCards === null || mainCards === void 0 ? void 0 : mainCards.appendChild(characterImg);
                    mainCards === null || mainCards === void 0 ? void 0 : mainCards.appendChild(characterName);
                    mainCards === null || mainCards === void 0 ? void 0 : mainCards.appendChild(characterBody);
                    mainCards.addEventListener('click', () => {
                        let modalContent = document.querySelector("#modalContent");
                        modalContent === null || modalContent === void 0 ? void 0 : modalContent.replaceChildren();
                        openModal(data);
                    });
                });
            }
        });
    });
}
