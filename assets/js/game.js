/// Core Game JS

// Game Data Object Initilization
const gd = {

    // Icon Storage
    iconPath: "assets/imgs/fighter_icons/",
    iconExt: ".png",

    // Fighter Data
    fighter: {
        
        // Fighters
        luke: {
            hp:   120,
            atk:  5,
            cAtk: 25    
        },

        troop: {
            hp:   100,
            atk:  10,
            cAtk: 10
        },

        maul: {
            hp:   100,
            atk:  10,
            cAtk: 10
        },

        vader: {
            hp:   150,
            atk:  5,
            cAtk: 25
        }

    },

    // Selected Fighters
    fighterPlayer: "",
    fighterPlayerHP: 0,
    fighterEnemy:  "",
    fighterEnemyHP: 0,
    
    // Game Control
    gameStage:    0,

    // Game Tracking
    playerAtkMod: 1
}