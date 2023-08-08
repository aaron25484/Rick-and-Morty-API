var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://rickandmortyapi.com/api";
let page = 1;
import { init } from "../main.js";
export const urlEpisodes = `${url}/episode`;
export function getEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(urlEpisodes + `?page=${page}`);
        const data = yield response.json();
        return data.results;
    });
}
const urlCharacters = `${url}/character`;
export function getCharacters() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(urlCharacters);
        const data = yield response.json();
        return data.results;
    });
}
const urlLocations = `${url}/location`;
export function getLocations() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(urlLocations);
        const data = yield response.json();
        return data.results;
    });
}
const loadEpisodesButton = document.querySelector("#loadButton");
loadEpisodesButton === null || loadEpisodesButton === void 0 ? void 0 : loadEpisodesButton.addEventListener('click', loadEpisodes);
function loadEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        page++;
        console.log(page);
        getEpisodes();
        init();
    });
}
