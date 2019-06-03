/// Game Functions

// Initialize Game State
function game_load_ready() {
    gd.gameStage = 1;
}

// Player Selects Fighter
function game_select_player() {

    // Exit if game not ready
    if (gd.gameStage !== 1) { return null; }
    
    // Update Game Stage
    gd.gameStage++;

    // Update Game Message
    game_display_show_message('text', 'Select your enemy fighter!');

    // Set player choice and remove from pool
    let playerChoice = $(event.target);
    gd.fighterPlayer = playerChoice.data("name");
    playerChoice.parent().remove();

    // Show chosen player in battle area
    game_move_to_battle("player");

    // Change event listener for remaining icons to now be enemies
    let enemyIcons = $('.fighter-select-cell > img');
    for (let i = 0; i < 3; i++) {
        enemyIcons[i].setAttribute('onclick', 'game_select_enemy()');
    }
}

// Player Selects Enemy Fighter
function game_select_enemy() {

    // Deny function if gamestage is wrong
    if (gd.gameStage !== 2) { return null; }

    // Update Game Stage
    gd.gameStage++;

    // Update Message
    game_display_show_message('text', 'Attack!');

    // Set set enemy choice and then remove from pool
    let playerChoice = $(event.target);
    gd.fighterEnemy = playerChoice.data("name");
    playerChoice.parent().remove();

    // Show chosen enemy in battle area
    game_move_to_battle("enemy");

    // Create Attack Button
    let btnAttack = $("#player-input-container");
    btnAttack.css('display', 'block');
}


function game_move_to_battle(fighter) {

    // Var init
    let fighterSide = '';
    let enemyIcon = '';

    // Determine which side from args
    if (fighter == "player") {
        enemyIcon = $("#player_icon");
        fighterSide = gd.fighterPlayer;
        enemyIcon.addClass("fighter-highlight-blue");
    }

    if (fighter == "enemy") {
        enemyIcon = $("#enemy_icon");
        fighterSide = gd.fighterEnemy;
        enemyIcon.addClass("fighter-highlight-red");
    }

    // Update HTML of icon
    enemyIcon.attr('src', `${gd.iconPath}${fighterSide}${gd.iconExt}`);
}

// Player Attacks
function game_attack() {
    
    let msg = `
        <p class="text-yellow">${gd.fighterPlayer.toUpperCase()} does ${get_data("player", "atk")*gd.playerAtkMod} damage to ${gd.fighterEnemy.toUpperCase()}!</p>
        <p class="text-red">${gd.fighterPlayer.toUpperCase()} takes ${get_data("enemy", "cAtk")} counter attack damage</p>
        `;

    game_display_show_message('html', msg);

    // Increase Player Attack
    gd.playerAtkMod++;
}

function get_data(side, stat) {

    if (side === "player") {
        return gd.fighter[gd.fighterPlayer][stat];
    }

    if (side === "enemy") {
        return gd.fighter[gd.fighterEnemy][stat];
    }
} 


// Display Message Update
function game_display_show_message(element, string) {

    let msgDisplay = $('#message-display');

    if (element === 'text') {
        msgDisplay.text(string);
    }
    if (element === 'html') {
        msgDisplay.html(string);
    }
}