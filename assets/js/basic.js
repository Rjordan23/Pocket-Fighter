

// Game state
var gameState = {
  userFighter: '',
  rivalFighter: '',
  // Fighter Database
  fighterDB: [
    {
      name: 'thorl',
      type: 'tank',
      hp: 60,
      attack: 52,
      defense: 43,
      level: 1,
      img: 'https://cdnb.artstation.com/p/assets/images/images/004/176/729/original/martin-king-hots-thrall-large.gif?1481063416'
    },
    {
      name: 'talara',
      type: 'warrior',
      hp: 55,
      attack: 48,
      defense: 49,
      level: 1,
      img: 'https://66.media.tumblr.com/3e8f5c83b0644b96e252be8fa5774470/tumblr_od9xizb2bh1qkpz2go1_500.gif'
    },
    {
      name: 'narrii',
      type: 'archer',
      hp: 45,
      attack: 59,
      defense: 29,
      level: 1,
      img: 'https://66.media.tumblr.com/af9c2a796605a377f95baf6b40b115c2/tumblr_o5tx2xwU2J1qkpz2go1_400.gif'
    },
    {
      name: 'vorath',
      type: 'mage',
      hp: 50,
      attack: 45,
      defense: 34,
      level: 1,
      img: 'https://steamuserimages-a.akamaihd.net/ugc/839210690287963320/D1BF1ED29E90DC533B64E8D5602193A57BB4D3D0/'
    },
  ],

  elements: {
    fighterEl: document.querySelector('.select-screen').querySelectorAll('.character'),
    battleScreenEl:  document.getElementById('battle-screen'),
    attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack')
  },


  init: function() {
    console.log(gameState.elements.attackBtnsEl);

  var i = 0;
  // This is the inital loop
  while (i < gameState.elements.fighterEl.length) {
    // Add function to all characters on screen select
    gameState.elements.fighterEl[i].onclick = function() {
      // Selected fighter's name
      var fighterName = this.dataset.fighter;
      // Image elements
      var player1Img = document.querySelector('.player1').getElementsByTagName('img');
      var player2Img = document.querySelector('.player2').getElementsByTagName('img');

      // Save the current fighters
      gameState.userFighter = fighterName;

      // CPU picks a fightwr
      gameState.cpuPick()
      // Change to fight screen
      gameState.elements.battleScreenEl.classList.toggle('active');

      // User char Select data from fighter DB
      gameState.currentChar = gameState.fighterDB.filter(function(fighter) {
        return fighter.name == gameState.userFighter;
      });

      player1Img[0].src = gameState.currentChar[0].img;


      // CPU char Select data from fighter DB
      gameState.currentRival = gameState.fighterDB.filter(function(fighter) {
        return fighter.name == gameState.rivalFighter;
      });

      player2Img[0].src = gameState.currentRival[0].img;

      // Current user and cpu fighter starting hp
      gameState.currentChar[0].health = gameState.calcInitHealth(gameState.currentChar);

      gameState.currentChar[0].originalHealth = gameState.calcInitHealth(gameState.currentChar);

      gameState.currentRival[0].health = gameState.calcInitHealth(gameState.currentRival);
      console.log(gameState);

      gameState.currentRival[0].originalHealth = gameState.calcInitHealth(gameState.currentRival);
      console.log(gameState);
      
  }
  i++
}

var a = 0;
while (a < gameState.elements.attackBtnsEl.length) {
  gameState.elements.attackBtnsEl[a].onclick = function() {
    var attackName = this.dataset.attack;
    gameState.currentUserAttack = attackName;

    gameState.play(attackName, gameState.cpuAttack());
    
  }
  a++
};

  },

  cpuAttack: function() {
    var attacks = ['rock', 'paper', 'scissors'];
  
    return attacks[gameState.randomNumber(0, 3)]
  },
  
  calcInitHealth:  function(user) {
    console.log(user[0].level);
    return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp;
  },
  
  attackMove: function(attack, level, stack, critical, enemy, attacker) {
    console.log(enemy.name + ' Before: ' + enemy.health);
  
    var attackAmount = attack * level * (stack + critical);
    enemy.health = enemy.health - attackAmount;

    var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');
    var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');

    // Lower Health bar
    if (enemy.owner == 'user') {
     var minusPercent = ((enemy.health * 100) / enemy.originalHealth);
     userHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%';
    } else {
     var minusPercent = ((enemy.health * 100) / enemy.originalHealth);
     cpuHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%';
    }

    gameState.checkWinner(enemy, attacker)
    console.log(enemy.name + ' After: ' + enemy.health);
  },
  
  checkWinner: function(enemy, attacker) {
    if(enemy.health <= 0) {
      console.log('The winner is ' + attacker.name);
    }
  },
  
  randomNumber: function(min, max) {
    return Math.floor(Math.random() * (min, max)) + min;
  },
  
  cpuPick: function() {
    // Creates loop to force CPU into choosing another character
    do {
      gameState.rivalFighter = gameState.elements.fighterEl[gameState.randomNumber(0, 4)].dataset.fighter;
      console.log('looping ' + gameState.rivalFighter);
    }
    while (gameState.userFighter == gameState.rivalFighter)
  },

  play: function(userAttack, cpuAttack) {
    var currentChar = gameState.currentChar[0];
    var currentRival = gameState.currentRival[0];
    // Who is attacking
    currentChar.owner = 'user';
    currentRival.owner = 'cpu';
  
    switch(userAttack) {
      case 'rock':
        if(cpuAttack == 'paper') {
          if(currentChar.health >= 1 && currentRival.health >=1) {
            // User
            gameState.attackMove(currentChar.attack, currentChar.level, .8, .5, currentRival, currentChar);
            if(currentRival.health >= 1) {
              // CPU
              gameState.attackMove(currentRival.attack, currentRival.level, .8, 2, currentChar, currentRival);
            }
          }
        }
        if(cpuAttack == 'scissors') {
          if(currentChar.health >= 1 && currentRival.health >=1) {
            // User
            gameState.attackMove(currentChar.attack, currentChar.level, .8, 2, currentRival, currentChar);
            if(currentRival.health >= 1) {
            // CPU
            gameState.attackMove(currentRival.attack, currentRival.level, .8, .5, currentChar, currentRival);
            }
          }
        }
        if(cpuAttack == 'rock') {
          if(currentChar.health >= 1 && currentRival.health >=1) {
            // User
            gameState.attackMove(currentChar.attack, currentChar.level, .8, 0, currentRival, currentChar);
            if(currentRival.health >= 1) {
            // CPU
            gameState.attackMove(currentRival.attack, currentRival.level, .8, 0, currentChar, currentRival);
            }
          }
        }
        break;
      case 'paper':
        if(cpuAttack == 'paper') {
          if(currentChar.health >= 1 && currentRival.health >=1) {
            // User
            gameState.attackMove(currentChar.attack, currentChar.level, .8, 1, currentRival, currentChar);
            // CPU
            if(currentRival.health >= 1) {
            gameState.attackMove(currentRival.attack, currentRival.level, .8, 1, currentChar, currentRival);
            }
          }
        }
        if(cpuAttack == 'scissors') {
          if(currentChar.health >= 1 && currentRival.health >=1) {
            // User
            gameState.attackMove(currentChar.attack, currentChar.level, .8, .5, currentRival, currentChar);
            if(currentRival.health >= 1) {
            // CPU
            gameState.attackMove(currentRival.attack, currentRival.level, .8, 2, currentChar, currentRival);
            }
          }
        }
        if(cpuAttack == 'rock') {
          if(currentChar.health >= 1 && currentRival.health >=1) {
            // User
            gameState.attackMove(currentChar.attack, currentChar.level, .8, 2, currentRival, currentChar);
            if(currentRival.health >= 1) {
            // CPU
            gameState.attackMove(currentRival.attack, currentRival.level, .8, .5, currentChar, currentRival);
            }
          }
        }
        break;
      case 'scissors':
        if(cpuAttack == 'paper') {
          if(currentChar.health >= 1 && currentRival.health >=1) {
            // User
            gameState.attackMove(currentChar.attack, currentChar.level, .8, 2, currentRival, currentChar);
            if(currentRival.health >= 1) {
            // CPU
            gameState.attackMove(currentRival.attack, currentRival.level, .8, .5, currentChar, currentRival);
            }
          }
        }
        if(cpuAttack == 'scissors') {
          if(currentChar.health >= 1 && currentRival.health >=1) {
            // User
            gameState.attackMove(currentChar.attack, currentChar.level, .8, 1, currentRival, currentChar);
            if(currentRival.health >= 1) {
            // CPU
            gameState.attackMove(currentRival.attack, currentRival.level, .8, 1, currentChar, currentRival);
            }
          }
        }
        if(cpuAttack == 'rock') {
          if(currentChar.health >= 1 && currentRival.health >=1) {
            // User
            gameState.attackMove(currentChar.attack, currentChar.level, .8, .5, currentRival, currentChar);
            if(currentRival.health >= 1) {
            // CPU
            gameState.attackMove(currentRival.attack, currentRival.level, .8, 2, currentChar, currentRival);
            }
          }
        }
        break;
    }
  }
}

gameState.init();

