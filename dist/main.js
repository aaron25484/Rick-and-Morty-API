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
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const episodeList = document.querySelector("#episodeList");
        const episodes = yield getEpisodes();
        episodes.forEach((episode) => {
            const episodeCard = document.createElement("li");
            const episodeCardTitle = document.createElement("h6");
            const episodeCardTitleText = document.createTextNode(`Episode ${episode.id}`);
            episodeCardTitle.appendChild(episodeCardTitleText);
            episodeList === null || episodeList === void 0 ? void 0 : episodeList.appendChild(episodeCard);
            episodeCard.appendChild(episodeCardTitle);
            // console.log(episode)
        });
        // console.log(episodes);
    });
}
