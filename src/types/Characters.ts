interface Character {
    id:       number;
    name:     string;
    status:   CharacterStatus;
    species:  string;
    type:     string;
    gender:   CharacterGender;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  string;
}

interface Location {
    name: string;
    url: string;
}

enum CharacterStatus{
    "Alive",
    "Dead",
    "Unknown",
}

enum CharacterGender{
    "Female",
    "Male",
    "Genderless",
    "Unknown"
}