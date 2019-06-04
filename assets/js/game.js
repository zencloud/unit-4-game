/// Core Game JS

// Game Data Object Initilization
const gd = {

    // Icon Storage
    iconPath: "assets/imgs/fighter_icons/",
    iconExt: ".png",

    // Fighter Data
    fighter: {
        
        // Fighters
        1: {
            name: "luke",
            hp:   120,
            atk:  9,
            cAtk: 10    
        },
        
        2: {
            name: "maul",
            hp:   100,
            atk:  10,
            cAtk: 10
        },

        3: {
            name: "troop",
            hp:   120,
            atk:  10,
            cAtk: 10
        },

        4: {
            name: "vader",
            hp:   150,
            atk:  5,
            cAtk: 15
        }

    },

    // Selected Fighters
    fighterPlayer:   0,
    fighterPlayerHP: 0,
    fighterEnemy:    0,
    fighterEnemyHP:  0,
    
    // Game Control
    gameStage:       0,
    winCount:    0,  

    // Game Tracking
    playerAtkMod:    1
}


const htmlTemplate = {

    // Fighter Select Area Rebuild
    fighterSelect: `
    <!-- Fighter 1 -->
    <div class="fighter-select-cell">
        <img data-fid="1" onclick="game_select_player()" src="assets/imgs/fighter_icons/luke.png">
        <div class="fighter-select-hp-hud">
            <p>120</p>
        </div>
    </div>

    <!-- Fighter 2 -->
    <div class="fighter-select-cell">
        <img data-fid="2" onclick="game_select_player()" src="assets/imgs/fighter_icons/maul.png">
        <div class="fighter-select-hp-hud">
            <p>100</p>
        </div>
    </div>

    <!-- Fighter 3 -->
    <div class="fighter-select-cell">
        <img data-fid="3" onclick="game_select_player()" src="assets/imgs/fighter_icons/troop.png">
        <div class="fighter-select-hp-hud">
            <p>120</p>
        </div>
    </div>

    <!-- Fighter 4 -->
    <div class="fighter-select-cell">
        <img data-fid="4" onclick="game_select_player()" src="assets/imgs/fighter_icons/vader.png">
        <div class="fighter-select-hp-hud">
            <p>150</p>
        </div>
    </div>`
}