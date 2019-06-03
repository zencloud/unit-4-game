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
    let fighterIcon = '';
    // Move Player
    if (fighter == "player") {
        fighterIcon = $("#player_icon");
        fighterSide = gd.fighterPlayer;
        fighterIcon.addClass("fighter-highlight-blue");
        $("#player_hp").css('display', 'block');
        gd.fighterPlayerHP = get_data("player", "hp");
        game_display_update_hp("player", gd.fighterPlayerHP);
        
    }

    // Move Enemy
    if (fighter == "enemy") {
        fighterIcon = $("#enemy_icon");
        fighterSide = gd.fighterEnemy;
        fighterIcon.addClass("fighter-highlight-red");
        $("#enemy_hp").css('display', 'block');
        gd.fighterEnemyHP  = get_data("enemy", "hp");
        game_display_update_hp("enemy", gd.fighterEnemyHP);
    }

    // Update HTML of icon
    fighterIcon.attr('src', `${gd.iconPath}${fighterSide}${gd.iconExt}`);

}

// Check state of game after attack
function game_check_condition () {

    // If player HP is 0: Game Over
    if (gd.fighterPlayerHP <= 0) {
        game_display_show_message("GAME OVER!");
        return null;
    }

    if (gd.fighterPlayerHP > 0 && gd.fighterEnemyHP <= 0) {
        game_display_show_message("YOU WIN!");
    }
}

// Player Attacks
function game_attack() {
    
    // Get damage numbers
    // Player
    let pName = gd.fighterPlayer.toUpperCase();
    let pAtk  = get_data("player", "atk")*gd.playerAtkMod;
    
    // Enemy
    let eName = gd.fighterEnemy.toUpperCase();
    let eAtk  = get_data("enemy", "cAtk");
    
    // Calc HP
    let eHP   = (gd.fighterEnemyHP -= pAtk);
    let pHP   = (gd.fighterPlayerHP -= eAtk);

    game_display_update_hp("player", pHP);
    game_display_update_hp("enemy", eHP);

    // Display Info
    let msg = `
        <p class="text-yellow">${pName} does ${pAtk} damage to ${eName}!</p>
        <p class="text-red">${pName} takes ${eAtk} counter attack damage</p>
        `;
    game_display_show_message('html', msg);

    // Increase Player Attack
    gd.playerAtkMod++;

    // Game Check Condition
    game_check_condition();
}


// Get Fighter Data
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


// Update HP
function game_display_update_hp(side, hp) {

    if (side === "enemy") {
        $("#enemy_hp").text(hp);
    }

    if (side === "player") {
        $("#player_hp").text(hp);
    }
}