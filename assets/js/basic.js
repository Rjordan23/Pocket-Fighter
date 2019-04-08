// Fighter Database
var fighterDB = [
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
    hp: 45,
    attack: 48,
    defense: 49,
    level: 1,
    img: 'https://66.media.tumblr.com/3e8f5c83b0644b96e252be8fa5774470/tumblr_od9xizb2bh1qkpz2go1_500.gif'
  },
  {
    name: 'narrii',
    type: 'archer',
    hp: 39,
    attack: 59,
    defense: 29,
    level: 1,
    img: 'https://66.media.tumblr.com/af9c2a796605a377f95baf6b40b115c2/tumblr_o5tx2xwU2J1qkpz2go1_400.gif'
  },
  {
    name: 'vorath',
    type: 'mage',
    hp: 40,
    attack: 45,
    defense: 34,
    level: 1,
    img: 'https://steamuserimages-a.akamaihd.net/ugc/839210690287963320/D1BF1ED29E90DC533B64E8D5602193A57BB4D3D0/'
  },
  
]

// Game state
var gameState = {
  userFighter: '',
  rivalFighter: ''
}

// Elements
var fighterEl = document.querySelector('.select-screen').querySelectorAll('.character'); 
console.log(fighterEl);
var battleScreenEl =  document.getElementById('battle-screen');
var attackBtnsEl = document.getElementById('battle-screen').querySelectorAll('.attack'); 
console.log(attackBtnsEl);



var i = 0;
// This is the inital loop
while (i < fighterEl.length) {
  // Add function to all characters on screen select
  fighterEl[i].onclick = function() {
    // Selected fighter's name
    var fighterName = this.dataset.fighter;
    // Image elements
    var player1Img = document.querySelector('.player1').getElementsByTagName('img');
    var player2Img = document.querySelector('.player2').getElementsByTagName('img');

    // Save the current fighters
    gameState.userFighter = fighterName;

    // CPU picks a fightwr
    cpuPick()
    // Change to fight screen
    battleScreenEl.classList.toggle('active');

    // User char Select data from fighter DB
    gameState.currentChar = fighterDB.filter(function(fighter) {
      return fighter.name == gameState.userFighter;
    });

    player1Img[0].src = gameState.currentChar[0].img;


    // CPU char Select data from fighter DB
    gameState.currentRival = fighterDB.filter(function(fighter) {
      return fighter.name == gameState.rivalFighter;
    });

    player2Img[0].src = gameState.currentRival[0].img;

    // Current user and cpu fighter starting hp
    gameState.currentChar[0].health = calcInitHealth(gameState.currentChar);
    gameState.currentRival[0].health = calcInitHealth(gameState.currentRival);
    console.log(gameState);
    

    // User chooses attack


    // CPU health decrease


    // CPU attack


    // User health goes down

    // Rock > Scissors

    // Paper > Rock

    // Scissors > Paper

    // Depending on fighter type and defense is the atk strength

    // Health <= 0 is loser
  }
  i++
}

var a = 0;
while (a < attackBtnsEl.length) {
  attackBtnsEl[a].onclick = function() {
    var attackName = this.dataset.attack;
    gameState.currentUserAttack = attackName;

    play(attackName, cpuAttack());
    
  }
  a++
};

var cpuAttack = function() {
  var attacks = ['rock', 'paper', 'scissors'];

  return attacks[randomNumber(0, 3)]
}

var calcInitHealth =  function(user) {
  console.log(user[0].level);
  
  return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp;
}

var attackMove = function(attack, level, stack, critical, enemy) {
  console.log('enemy.health before ' + enemy.health);

  var attackAmount = ((attack * level) * (stack + critical));
  enemy.health = enemy.health - attackAmount;
  
  console.log('enemy.health after ' + enemy.health);
  
}



var play = function(userAttack, cpuAttack) {
  var currentChar = gameState.currentChar[0];
  var currentRival = gameState.currentRival[0];


  switch(userAttack) {
    case 'rock':
      if(cpuAttack == 'paper') {
        attackMove(currentChar.attack, currentChar.level, .8, .5, currentRival);
        console.log('Paper beats rock');
      }
      if(cpuAttack == 'scissors') {
        console.log('Rock beats paper');
      }
      if(cpuAttack == 'rock') {
        console.log('Its a draw');
      }

      console.log(userAttack);
      
      break;
    case 'paper':
      console.log(userAttack);

      break;
    case 'scissors':
      console.log(userAttack);

      break;
  }
}

var randomNumber = function randomNumber(min, max) {
  return Math.floor(Math.random() * (min, max)) + min;
}

var cpuPick = function cpuPick() {
  gameState.rivalFighter = fighterEl[randomNumber(0, 4)].dataset.fighter;
}
































// // pokemon
// // create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)



// var attack = 20;
// var level = 10;
// var stack = 1.3;
// var stamina = 39;

// // create a formula for attacks
// console.log((attack * level ) * stack / 7)



// // create a formula for health
// //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
// console.log(((0.20 * Math.sqrt(level)) * stamina) * 15)




// // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
// // p1 vs p2




// // when one user loses all his health declare a winner

