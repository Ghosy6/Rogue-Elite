var main = document.getElementById("main")
var HP = document.getElementById("HP")
var exp = document.getElementById("exp")
var lvl = document.getElementById("lvl")
var dmg = document.getElementById("dmg")

var neighbourArr = [
    [],
    [[-1,0],[0,1],[1,0],[0,-1],[-1,-1],[-1,1],[1,-1],[1,1]],
    [[-2,-2],[-1,-2],[0,-2],[1,-2],[2,-2],[-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1],[-2,0],[-1,0],[1,0],[2,0],[-2,1],[-1,1],[0,1],[1,1],[2,1],[-2,2],[-1,2],[0,2],[1,2],[2,2]]
]
var playerStats = { 
      hp: 100,
      hitbox: 1,
      dmg: 10, 
      exp: 0,
      lvl: 1,
      gold: 0,

    }
  
function updateUi(){

    HP.textContent = playerStats.hp
    exp.textContent = playerStats.exp
    lvl.textContent = playerStats.lvl
    dmg.textContent = playerStats.dmg

}

updateUi()

function getLvl (){
    var currentLevel = playerStats.lvl
    
    if (playerStats.exp >= 45 && playerStats.exp < 75 ) {playerStats.lvl = 2 }
    if (playerStats.exp >= 75 && playerStats.exp < 120 ) {playerStats.lvl = 3 }
    if (playerStats.exp >= 120 && playerStats.exp < 200 ) {playerStats.lvl = 4 }
    
        
    if (currentLevel < playerStats.lvl ) {
        playerStats.hp += 20
        playerStats.dmg += 7
        
    }

    updateUi()
}

getLvl()

var enemyStats = {
    hp: 0,
    dmg: 0, 
    exp: 0,

}  

var enemyArray = [
    {
    name: "skeleton",
    hitbox: 1,
    hp: 50,
    dmg: 7,
    exp: 35,
    evade: 0,

    },

    {
    name:"ghost",
    hitbox: 1,
    hp: 35,
    dmg: 5,
    exp: 35,
    evade: 40,

    }
]

var enemyLocationArray = [ "17-17","79-36","74-55", "56-77", "8-30",  ]





for (var i = 0; i < 90; i++){
    for (var j = 0; j < 90; j++){
        var boxItem = document.createElement("div")
        boxItem.setAttribute("id", j + "-" + i)
        boxItem.classList.add("boxItem")
        main.appendChild(boxItem)
    }

}


var player = document.getElementById("44-44")
player.classList.add("player")

while (enemyLocationArray.length){
    var enemyId = enemyLocationArray.shift()
    var enemy = document.getElementById(enemyId)
    enemy.classList.add("enemy")
    var createEnemy = enemyArray.find(x => x.name == "skeleton")
    enemy.classList.add(createEnemy.name)
    enemy.setAttribute("enemyType",createEnemy.name)
    for (let i = 0; i < neighbourArr[createEnemy.hitbox].length; i++){
        var enemyIDX = enemyId.slice(0, enemyId.indexOf("-"))
        var enemyIDY = enemyId.slice(enemyId.indexOf("-") +1)
        var neighbourCheckEnemy = (Number(enemyIDX) + neighbourArr[createEnemy.hitbox][i][1]) + "-" + (Number(enemyIDY) + neighbourArr[createEnemy.hitbox][i][0])
        var neighbourEnemy = document.getElementById(neighbourCheckEnemy)
        neighbourEnemy.classList.add("enemyArea")
        neighbourEnemy.setAttribute("parent", enemyId)
        
    }

}

document.body.addEventListener('keydown', function (event) {
    const key = event.key;
    var location = player.id
    switch (key) {
        case "a":
           var getCoords = Number(location.slice(0, location.indexOf("-"))) - 1
           var newCoords = getCoords + "-" + location.slice(location.indexOf("-") +1)
           var newCoords2 = (getCoords - 1 )+ "-" + location.slice(location.indexOf("-") +1)
            break;
        case "d":
            var getCoords = Number(location.slice(0, location.indexOf("-"))) + 1
            var newCoords = getCoords + "-" + location.slice(location.indexOf("-") +1)
            var newCoords2 = (getCoords +1) + "-" + location.slice(location.indexOf("-") +1)
            break;
        case "w":
            var getCoords = Number(location.slice(location.indexOf("-") +1)) - 1
            var newCoords = location.slice(0, location.indexOf("-")) + "-" + getCoords  
            var newCoords2 = location.slice(0, location.indexOf("-")) + "-" + (getCoords -1) 
            break;
        case "s":
            var getCoords = Number(location.slice(location.indexOf("-") +1)) + 1
            var newCoords = location.slice(0, location.indexOf("-")) + "-" + getCoords  
            var newCoords2 = location.slice(0, location.indexOf("-")) + "-" + (getCoords +1)
            break;
    }

    if (document.getElementById(newCoords2)){
       
        player.classList.remove("player")
        player = document.getElementById(newCoords)
        player.classList.add("player")
        var playerArea = document.querySelectorAll(".playerArea")
        playerArea.forEach(( playerAreaBox )=>{
            playerAreaBox.classList.remove("playerArea")
        })
        for (let i = 0; i < neighbourArr[playerStats.hitbox].length; i++){
            var playerIDX = player.id.slice(0, player.id.indexOf("-"))
            var playerIDY = player.id.slice(player.id.indexOf("-") +1)
            var neighbourCheck = (Number(playerIDX) + neighbourArr[playerStats.hitbox][i][1]) + "-" + (Number(playerIDY) + neighbourArr[playerStats.hitbox][i][0])
            var neighbour = document.getElementById(neighbourCheck)
            neighbour.classList.add("playerArea")
            if (neighbour.classList.contains("enemyArea"))
                {var playerGetsIntoAgro = neighbour.getAttribute("parent")}
        }
    }
    
    if (playerGetsIntoAgro){
        var getEnemyId = document.getElementById(playerGetsIntoAgro)
        var getEnemyType = getEnemyId.getAttribute("enemytype")
        var createEnemy = enemyArray.find(x => x.name == getEnemyType)
        enemyStats.hp = createEnemy.hp
        enemyStats.dmg = createEnemy.dmg
        enemyStats.exp = createEnemy.exp
        enemyStats.evade = createEnemy.evade
        while (playerStats.hp > 0 && enemyStats.hp > 0 ){
            var evadeCheck = Math.floor(Math.random() * 100)
            console.log(evadeCheck);
            if (evadeCheck >= createEnemy.evade){
                
                enemyStats.hp = enemyStats.hp - playerStats.dmg
            }
            if (enemyStats.hp <= 0 ) {
                playerStats.exp += enemyStats.exp
                getLvl()
                updateUi()
                 break
                       }
            playerStats.hp = playerStats.hp - enemyStats.dmg
            if (playerStats.hp <= 0) {
                playerStats.hp = "DEAD"
                HP.textContent = playerStats.hp
                break
                      }
            
        }

        HP.textContent = playerStats.hp

        if (enemyStats.hp <= 0) {
            getEnemyId.setAttribute("class", "boxItem")
            var areaRemove = document.querySelectorAll(`[parent="${playerGetsIntoAgro}"]`)
            areaRemove.forEach((item)=>{
                item.setAttribute("class", "boxItem")
                item.removeAttribute("parent")
            })
        }
         if (playerStats.hp <= 0) {console.log("GAME OVER")}
        }


});