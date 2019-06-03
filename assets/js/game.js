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
            hp:   150,
            atk:  20,
            cAtk: 100
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