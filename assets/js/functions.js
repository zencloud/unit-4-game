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
    ui_display_message('text', 'Select your enemy fighter!');

    // Set player choice and remove from pool
    let playerChoice = $(event.target);
    gd.fighterPlayer = parseInt(playerChoice.data("fid"));

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
    ui_display_message('text', 'Attack!');

    // Set set enemy choice and then remove from pool
    let playerChoice = $(event.target);
    gd.fighterEnemy = parseInt(playerChoice.data("fid"));
    playerChoice.parent().remove();

    // Show chosen enemy in battle area
    game_move_to_battle("enemy");

    // Create Attack Button
    ui_input_show();
}


function game_move_to_battle(fighter) {

    // Var init
    let fighterSide = '';
    let fighterIcon = '';

    // Move Player
    if (fighter == "player") {
        fighterIcon = $('#player_icon');
        fighterSide = data_get('player', 'name');
        fighterIcon.addClass("fighter-highlight-blue");
        $("#player_hp").css('display', 'block');
        gd.fighterPlayerHP = data_get("player", "hp");
        ui_update_hp("player", gd.fighterPlayerHP);
        
    }

    // Move Enemy
    if (fighter == "enemy") {
        fighterIcon = $("#enemy_icon");
        fighterSide = data_get('enemy', 'name');
        fighterIcon.addClass("fighter-highlight-red");
        $("#enemy_hp").css('display', 'block');
        gd.fighterEnemyHP  = data_get("enemy", "hp");
        ui_update_hp("enemy", gd.fighterEnemyHP);
    }

    // Update HTML of icon
    fighterIcon.attr('src', `${gd.iconPath}${fighterSide}${gd.iconExt}`);

}

// Check state of game after attack
function game_check_battle_condition () {

    // If player HP is 0: Game Over
    if (gd.fighterPlayerHP <= 0) {
        game_round_lost();
    }

    if (gd.fighterPlayerHP > 0 && gd.fighterEnemyHP <= 0) {
        game_round_won();

    }
}


// Player Lost Round
function game_round_lost () {
    ui_display_message('text', 'GAME OVER!');

    $("#btn-attack").css('display', 'none');
    $("#btn-restart").css('display', 'block');
}

// Player Wins Round
function game_round_won () {
    ui_display_message('text', 'YOU WIN!');

    // Remove Fighter
    $("#enemy_hp").css('display', 'none');
    $("#enemy_icon").attr('src', 'assets/imgs/fighter_icons/unknown.png');

    // Hide Input Container
    ui_input_hide();

    // Update Stage
    gd.gameStage = 2;

    // Update Win Count
    gd.winCount++;

    // Entire Game Won
    if (gd.winCount == 3) {
        
        // Win Update Msg
        let msg = `<h2>Congrats!</h2>
                   <p>You won!</p>`;

        ui_display_message('html', msg);

        // Remove Attack Button
        ui_input_show();
        $("#btn-attack").css('display', 'none');
        // Show restart button
        $("#btn-restart").css('display', 'block');
        
        // Disable Fighter Select Box
        $("#fighter-select-container").css('display', 'none');
    }
}


// Player Attacks
function game_attack() {
    
    // Get damage numbers
    // Player
    let pName = data_get("player", "name").toUpperCase();
    let pAtk  = data_get("player", "atk")*gd.playerAtkMod;
    
    // Enemy
    let eName = data_get('enemy', 'name').toUpperCase();
    let eAtk  = data_get('enemy', 'cAtk');
    
    // Calculate Remaining HP
    let eHP   = clamp((gd.fighterEnemyHP -= pAtk), 0, 999999);
    let pHP   = clamp((gd.fighterPlayerHP -= eAtk), 0, 999999);

    ui_update_hp("player", pHP);
    ui_update_hp("enemy", eHP);

    // Display Info
    let msg = `
        <p class="text-yellow">${pName} does ${pAtk} damage to ${eName}!</p>
        <p class="text-red">${pName} takes ${eAtk} counter attack damage</p>
        `;

    ui_display_message('html', msg);

    // Increase Player Attack
    gd.playerAtkMod++;

    // Game Check Condition
    game_check_battle_condition();
}

// Game Restart
function game_restart () {

    // Remove Button
    $("#btn-restart").css('display', 'none');
    $("#btn-attack").css('display', 'block');
    ui_input_hide();

    // Reset Game Vars
    gd.fighterPlayer = 0;
    gd.fighterEnemy  = 0;
    gd.gameStage     = 1;
    gd.playerAtkMod  = 1;
    gd.winCount      = 0;

    // Battle Area Reset
    $("#player_icon").attr('src', 'assets/imgs/fighter_icons/unknown.png');
    $("#player_hp").css('display', 'none');
    $("#enemy_icon").attr('src', 'assets/imgs/fighter_icons/unknown.png');
    $("#enemy_hp").css('display', 'none');

    // Reset Select Area
    $("#fighter-select-container").css('display', 'flex').html(htmlTemplate.fighterSelect);

    // Update Message
    ui_display_message('text', 'Select your fighter!');
}

// Get Fighter Data
function data_get(side, stat) {

    if (side === "player") {
        return gd.fighter[gd.fighterPlayer][stat];
    }

    if (side === "enemy") {
        return gd.fighter[gd.fighterEnemy][stat];
    }
}


// Display Message Update
function ui_display_message(element, string) {

    let msgDisplay = $('#message-display');

    if (element === 'text') {
        msgDisplay.text(string);
    }
    if (element === 'html') {
        msgDisplay.html(string);
    }
}


// Update HP
function ui_update_hp(side, hp) {

    if (side === "enemy") {
        $("#enemy_hp").text(hp);
    }

    if (side === "player") {
        $("#player_hp").text(hp);
    }
}

function ui_input_hide () {
    
    // Remove Button
    $("#player-input-container").css('display', 'none');    
}

function ui_input_show () {
    $("#player-input-container").css('display', 'block');

}