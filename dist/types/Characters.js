"use strict";
var CharacterStatus;
(function (CharacterStatus) {
    CharacterStatus[CharacterStatus["Alive"] = 0] = "Alive";
    CharacterStatus[CharacterStatus["Dead"] = 1] = "Dead";
    CharacterStatus[CharacterStatus["Unknown"] = 2] = "Unknown";
})(CharacterStatus || (CharacterStatus = {}));
var CharacterGender;
(function (CharacterGender) {
    CharacterGender[CharacterGender["Female"] = 0] = "Female";
    CharacterGender[CharacterGender["Male"] = 1] = "Male";
    CharacterGender[CharacterGender["Genderless"] = 2] = "Genderless";
    CharacterGender[CharacterGender["Unknown"] = 3] = "Unknown";
})(CharacterGender || (CharacterGender = {}));
