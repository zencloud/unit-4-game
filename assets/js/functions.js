/// Game Functions

// Initialize Game State
function game_load_ready () {
    // DO
}

// Player Selects Fighter
function game_select_player () {

// Update Game Stage
    gameData.gameStage++;

// Update Game Message
    game_display_show_message("Select your enemy fighter!");

// Assign Player Choice
    let playerChoice = $(event.target);
    gameData.fighterPlayer = playerChoice.data("name");

// Hide Chosen Fighter from main list
    playerChoice.parent().remove();
    
// Show chosen player in battle area
    let playerIcon = $("#player_icon");
    playerIcon.attr('src', `${gameData.iconPath}${gameData.fighterPlayer}${gameData.iconExt}`);
    playerIcon.addClass("fighter-highlight-blue");

// Change event listener for remaining icons to now be enemies
    let enemyIcons = $('.fighter-select-cell > img');
    for (let i = 0; i < 3; i++) {
        enemyIcons[i].setAttribute('onclick', 'game_select_enemy()');
    }
}

// Player Selects Enemy Fighter
function game_select_enemy () {
    
// Deny function if gamestage is wrong
    if (gameData.gameStage !== 1) { return null; }

// Update Game Stage
    gameData.gameStage++;

// Update Message
    game_display_show_message("Attack!");

// Set Enemy Choice
    let playerChoice = $(event.target);
    gameData.fighterEnemy = playerChoice.data("name");

// Hide chosen fighter from main list
    playerChoice.parent().remove();

// Show chosen enemy in battle area
    let enemyIcon = $("#enemy_icon");
    enemyIcon.attr('src', `${gameData.iconPath}${gameData.fighterEnemy}${gameData.iconExt}`);
    enemyIcon.addClass("fighter-highlight-red");

// Create Attack Button
    let btnAttack = $("#player-input-container");
    btnAttack.css('display', 'block');
}


// Display Updates
function game_display_show_message(string) {
    
    // Update Core Message Window
    let msgDisplay = $('#message-display');
    msgDisplay.text(string);
}