/// Core Game JS

// Game Data Object Initilization
const gameData = {

    // Icon Storage
    iconPath: "assets/imgs/fighter_icons/",
    iconExt: ".png",

    // Fighter Data
    fighter: {
        
        // Fighters
        luke: {
            hp:   100,
            atk:  20,
            cAtk: 100    
        },

        troop: {
            hp:   100,
            atk:  20,
            cAtk: 100
        },

        maul: {
            hp:   100,
            atk:  20,
            cAtk: 100
        },

        vader: {
            hp:   100,
            atk:  20,
            cAtk: 100
        }

    },

    // Selected Fighters
    fighterPlayer: "",
    fighterEnemy:  "",
    
    // Game Control
    inputAllowed: false,
    gameStage:    0
}