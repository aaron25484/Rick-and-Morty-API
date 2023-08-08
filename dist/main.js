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
        episodeCardDate.textContent = episode.air_date;
        const episodeCode = document.createElement("p");
        episodeCode.textContent = episode.episode;
        displayMain === null || displayMain === void 0 ? void 0 : displayMain.appendChild(episodeCardName);
        displayMain === null || displayMain === void 0 ? void 0 : displayMain.appendChild(episodeCardDate);
        displayMain === null || displayMain === void 0 ? void 0 : displayMain.appendChild(episodeCode);
        const cardRow = document.querySelector("#roW");
        cardRow === null || cardRow === void 0 ? void 0 : cardRow.replaceChildren();
        const episodeCharacters = episode.characters;
        episodeCharacters.forEach(character => {
            const fetchCharachter = fetch(character);
            printCharacter();
            function printCharacter() {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield fetchCharachter;
                    const data = yield result.json();
                    const cardScheme = document.createElement("div");
                    cardScheme.className = "col-md-3 col-sm-6";
                    const mainCards = document.createElement("div");
                    mainCards.replaceChildren();
                    mainCards.className = "card card-block";
                    let characterImg = document.createElement("img");
                    characterImg.src = data.image;
                    const characterName = document.createElement("h5");
                    characterName.className = "card-title mt-3 mb-3";
                    characterName.textContent = data.name;
                    const characterBody = document.createElement("p");
                    characterBody.className = ".card-text";
                    characterBody.textContent = data.status + " / " + data.species;
                    cardRow === null || cardRow === void 0 ? void 0 : cardRow.appendChild(cardScheme);
                    cardScheme === null || cardScheme === void 0 ? void 0 : cardScheme.appendChild(mainCards);
                    mainCards === null || mainCards === void 0 ? void 0 : mainCards.appendChild(characterImg);
                    mainCards === null || mainCards === void 0 ? void 0 : mainCards.appendChild(characterName);
                    mainCards === null || mainCards === void 0 ? void 0 : mainCards.appendChild(characterBody);
                });
            }
        });
    });
}
