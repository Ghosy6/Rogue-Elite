var characterClasses = [
    {
      name:"knight",
      maxHp: 120,
      hp: 120,
      hitbox: 1,
      vievRange: 3,
      dmg: 18, 
      crit: 15,
      exp: 0,
      lvl: 1,
      gold: 0,
      startOfFight: 
      {
        dmg:["",""],
        shield:["",""],
        heal:["",""]
    }
      ,
      everyThird:0,
    },
    {
      name:"mage",
      maxHp: 80,
      hp: 80,
      hitbox: 1,
      vievRange: 3,
      dmg: 5, 
      crit: 0,
      exp: 0,
      lvl: 1,
      gold: 0,
      startOfFight: 
        {
            dmg:[20,"Fireball"],
            shield:[20,"Magic Shield"],
            heal:["",""]
        }
      ,
      everyThird:0,
      },
       {
      name:"paladin",
      maxHp: 100,
      hp: 100,
      hitbox: 1,
      vievRange: 3,
      dmg: 7, 
      crit: 5,
      exp: 0,
      lvl: 1,
      gold: 0,
      startOfFight: 
        {
            dmg:["",""],
            shield:["",""],
            heal:[10,"Holy Light"]
        }
      ,
      everyThird:0,
      }
      
]

var enemyArray = [
    {
    name: "skeleton",
    hitbox: 1,
    hp: 50,
    dmg: 7,
    exp: 30,
    evade: 0,
    lifesteal: 0,

    },

    {
    name:"ghost",
    hitbox: 1,
    hp: 35,
    dmg: 5,
    exp: 35,
    evade: 40,
    lifesteal: 0,

    },
    {
    name:"bat",
    hitbox: 1,
    hp: 25,
    dmg: 4,
    exp: 25,
    evade: 0,
    lifesteal: 50,
    
        },
        {
    name:"ninja",
    hitbox: 1,
    hp: 40,
    dmg: 5,
    exp: 40,
    evade: 15,
    lifesteal: 15,
    
        },
         {
    name:"dragon",
    hitbox: 2,
    hp: 100,
    dmg: 12,
    exp: 140,
    evade: 0,
    lifesteal: 0,
    
        }
    
]

var enemyStats = {} 

var main = document.getElementById("main")
var screen = document.getElementById("screen")
var statusbar = document.getElementById("statusBar")
var combatLog = document.getElementById("combatLog")
var combatLogArr = []
var maxHp = document.getElementById("maxHp")
var HP = document.getElementById("HP")
var exp = document.getElementById("exp")
var lvl = document.getElementById("lvl")
var dmg = document.getElementById("dmg")
var intro = document.getElementById("intro")
var disableMove = false

function resolveTimer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      },700);
    });
  }

function charSelect(x){
   var getId = x.getAttribute("id")
   
   var playerStats = characterClasses[getId]

   document.documentElement.style.setProperty('--charClass', `url("${characterClasses[getId].name}.png")` );

   function updateUi(){
    
    maxHp.textContent = playerStats.maxHp
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
    if (playerStats.exp >= 120 && playerStats.exp < 300 ) {playerStats.lvl = 4 }
    
        
    if (currentLevel < playerStats.lvl ) {
       var lvlDiff = playerStats.lvl - currentLevel
       for (let i = 0; i < lvlDiff; i++)
        {   
            playerStats.maxHp += 20
            playerStats.hp += 20
            playerStats.dmg += 4
        }

           combatLogArr.push(`<li class='list-item-lvl'>You have gained level ${playerStats.lvl}</li>`)
        
            updateUi()
    }

    
}

getLvl()

 

for (var i = 0; i < 90; i++){
    for (var j = 0; j < 90; j++){
        var boxItem = document.createElement("div")
        boxItem.setAttribute("id", j + "-" + i)
        boxItem.classList.add("boxItem")
        screen.appendChild(boxItem)
    }

}


var player = document.getElementById("44-44")
player.classList.add("player")
player.style.opacity="1"

while (enemyLocationArray.length){
    var enemyId = enemyLocationArray.shift()
    var enemy = document.getElementById(enemyId)
    enemy.classList.add("enemy")
    let randomNum = Math.floor(Math.random() * enemyArray.length)
    var createEnemy = enemyArray[randomNum]
    
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

document.body.addEventListener('keydown', async function (event) {
    const key = event.key;
    var location = player.id
    if (!disableMove){
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
    } 
    

    if (document.getElementById(newCoords2)){
       
        player.classList.remove("player")
        player = document.getElementById(newCoords)
        player.classList.add("player")
       
        var playerArea = document.querySelectorAll(".playerArea")
        playerArea.forEach(( playerAreaBox )=>{
            playerAreaBox.classList.remove("playerArea")
        })

        var visualArea = document.querySelectorAll(".visualArea")
        visualArea.forEach(( visualAreaBox )=>{
            
           if (!visualAreaBox.classList.contains("enemyArea")) 
            {visualAreaBox.style.opacity = "0.55"}
        })
        
        
        player.style.opacity = "1"

        for (let i = 0; i < neighbourArr[playerStats.hitbox].length; i++){
            var playerIDX = player.id.slice(0, player.id.indexOf("-"))
            var playerIDY = player.id.slice(player.id.indexOf("-") +1)
            var neighbourCheck = (Number(playerIDX) + neighbourArr[playerStats.hitbox][i][1]) + "-" + (Number(playerIDY) + neighbourArr[playerStats.hitbox][i][0])
            var neighbour = document.getElementById(neighbourCheck)
            neighbour.classList.add("playerArea")
            if (neighbour.classList.contains("enemyArea"))
                {var playerGetsIntoAgro = neighbour.getAttribute("parent")}
        }
        for (let i = 0; i < neighbourArr[playerStats.vievRange].length; i++){
            var playerIDX = player.id.slice(0, player.id.indexOf("-"))
            var playerIDY = player.id.slice(player.id.indexOf("-") +1)
            var neighbourCheck = (Number(playerIDX) + neighbourArr[playerStats.vievRange][i][0]) + "-" + (Number(playerIDY) + neighbourArr[playerStats.vievRange][i][1])
            
            if (document.getElementById(neighbourCheck)){
                
                var neighbour = document.getElementById(neighbourCheck)
                neighbour.classList.add("visualArea")
                
                if (neighbour.classList.contains("enemyArea"))
                    {var playerGetsIntoVisual = neighbour.getAttribute("parent")
                        var getEnemyVisual = document.getElementById(playerGetsIntoVisual)
                        getEnemyVisual.classList.add(getEnemyVisual.getAttribute("enemytype"))
                        getEnemyVisual.classList.add("visualArea")
                        getEnemyVisual.style.opacity="1"
                        var discoveredEnemyArea = this.querySelectorAll(`[parent="${playerGetsIntoVisual}"]`)
                        discoveredEnemyArea.forEach((element)=>{
                            element.classList.add("visualArea")
                        })
                    }
                   neighbour.style.opacity = "0"
            }
            
        }
        
    }
    
    if (playerGetsIntoAgro){
        disableMove = true

        var getEnemyId = document.getElementById(playerGetsIntoAgro)
        var getEnemyType = getEnemyId.getAttribute("enemytype")
        var createEnemy = enemyArray.find(x => x.name == getEnemyType)
        
        var playerCombatHp = playerStats.hp
        var playerCombatShield = playerStats.startOfFight.shield[0]
        var playerCombatStartOfFightDmg = playerStats.startOfFight.dmg[0]
        var playerCombatStartOfFightHeal = playerStats.startOfFight.heal[0]
        var checkForStartOfFight = true
        var playerCombatDmg = playerStats.dmg
        var playerCombatCrit = playerStats.crit
        var playerCombatExp = playerStats.exp
        var playerCombatLvl = playerStats.lvl
        var playerCombatEveryThird = playerStats.everyThird


        enemyStats.hp = createEnemy.hp
        enemyStats.dmg = createEnemy.dmg
        enemyStats.exp = createEnemy.exp
        enemyStats.evade = createEnemy.evade
        enemyStats.lifesteal = createEnemy.lifesteal

        
        
        while (playerCombatHp > 0 && enemyStats.hp > 0 ){
            combatLogArr = []

            if ( playerCombatStartOfFightDmg > 0 && checkForStartOfFight ) {
                enemyStats.hp = enemyStats.hp - playerCombatStartOfFightDmg
                combatLogArr.push(`<li>You blast the enemy with ${playerStats.startOfFight.dmg[1]}, dealing <span class='list-item-dmg'> ${playerCombatStartOfFightDmg} damage</span></li>`) 
                checkForStartOfFight = false 
            }
            
            var evadeCheck = Math.floor(Math.random() * 100)

            evadeCheck < createEnemy.evade ? combatLogArr.push("<li>You <span class='list-item-miss'>missed</span> the attack</li>") : null

            if (evadeCheck >= createEnemy.evade){
                
                let critCheck = Math.floor(Math.random() * 100)
                if (critCheck < playerCombatCrit){
                    enemyStats.hp = enemyStats.hp - playerCombatDmg
                    combatLogArr.push(`<li>You crit for <span class='list-item-dmg'>${playerCombatDmg *2} damage</span></li>`)
            
                    }
                 enemyStats.hp = enemyStats.hp - playerCombatDmg
                 critCheck < playerCombatCrit ? "" : combatLogArr.push(`<li>You have dealt <span class='list-item-dmg'> ${playerCombatDmg} damage</span> </li>`)
            }
            if (enemyStats.hp <= 0 ) {
                
                playerStats.exp += enemyStats.exp

                combatLogArr.push(`<li>Enemy defeated, gained  <span class='list-item-lvl'>${enemyStats.exp} exp</span></li>`)
                getLvl()
                updateUi()

                for (let i = 0; i < combatLogArr.length; i++){
                    
                    var combatListItem = combatLogArr[i]
                    combatLog.innerHTML = combatListItem + combatLog.innerHTML
                    var delay = await resolveTimer()
                    HP.textContent = playerCombatHp
                }
                 break
                       }
            if (playerCombatShield > 0){

                playerCombatShield = playerCombatShield - enemyStats.dmg

                var checkForShieldBreak = 0

                if (playerCombatShield < 0)  
                    {
                        playerCombatHp = playerCombatHp + playerCombatShield
                        checkForShieldBreak =  Math.abs(playerCombatShield)
                    } 
                
                combatLogArr.push(`<li>Enemy deals <span class='list-item-shield'> ${enemyStats.dmg} damage</span> to your shield and 
                  <span class='list-item-dmg'>${checkForShieldBreak} damage </span> to your health</li>`)

                
            } 
                       

           else {
            playerCombatHp = playerCombatHp - enemyStats.dmg

            var enemyLifestole = enemyStats.dmg * (enemyStats.lifesteal / 100)
            enemyStats.hp += enemyLifestole

            enemyStats.lifesteal > 0 ? combatLogArr.push(`<li>Enemy deals <span class='list-item-dmg'> ${enemyStats.dmg} damage</span> to you and recovers 
                <span class='list-item-heal'>${enemyLifestole} HP</span> from lifesteal</li>`) 
            : combatLogArr.push(`<li>Enemy deals <span class='list-item-dmg'> ${enemyStats.dmg} damage</span> to you</li>`)

            playerStats.hp = playerCombatHp
        }
            
            if (playerStats.hp <= 0) {
                playerStats.hp = "DEAD"
                HP.textContent = playerStats.hp

                for (let i = 0; i < combatLogArr.length; i++){
                    
                        var combatListItem = combatLogArr[i]
                        combatLog.innerHTML = combatListItem + combatLog.innerHTML
                        var delay = await resolveTimer()
                        HP.textContent = playerCombatHp
                    }
                break
                      }
            
                      for (let i = 0; i < combatLogArr.length; i++){
                    
                        var combatListItem = combatLogArr[i]
                        combatLog.innerHTML = combatListItem + combatLog.innerHTML
                        var delay = await resolveTimer()
                        HP.textContent = playerCombatHp
                    }
        }

        HP.textContent = playerStats.hp

        if (enemyStats.hp <= 0) {
            getEnemyId.setAttribute("class", "boxItem")
            getEnemyId.style.opacity="0"
            var areaRemove = document.querySelectorAll(`[parent="${playerGetsIntoAgro}"]`)
            areaRemove.forEach((item)=>{
                item.setAttribute("class", "boxItem")
                item.removeAttribute("parent")
            })
            getEnemyId.removeAttribute("enemytype")
        }
        
        disableMove = false
    }


});




main.style.display = "block"
intro.style.display = "none"

}


var neighbourArr = [
    [],

    [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]],

    [[-1,-2],[0,-2],[1,-2],[-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1],[-2,0],[-1,0],[1,0],[2,0],[-2,1],[-1,1],[0,1],[1,1],[2,1],
    [-1,2],[0,2],[1,2]           
    ],

    [[-1,-4],[0,-4],[1,-4],[-2,-3],[-1,-3],[0,-3],[1,-3],[2,-3],[-3,-2],[-2,-2],[-1,-2],[0,-2],[1,-2],[2,-2],[3,-2],
    [-4,-1],[-3,-1],[-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1],[3,-1],[4,-1],[-4,0],[-3,0],[-2,0],[-1,0],[1,0],[2,0],[3,0],[4,0],
    [-4,1],[-3,1],[-2,1],[-1,1],[0,1],[1,1],[2,1],[3,1],[4,1],[-3,2],[-2,2],[-1,2],[0,2],[1,2],[2,2],[3,2],
     [-2,3],[-1,3],[0,3],[1,3],[2,3],[-1,4],[0,4],[1,4]]
]

var enemyLocationArray = [ "17-17","79-36","74-55", "56-77", "8-30", "15-60", "60-15", "35-82", "40-40" ]

