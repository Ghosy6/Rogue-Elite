var characterClasses = [
    {
      name:"knight",
      maxHp: 120,
      hp: 120,
      shield: 0,
      hitbox: 1,
      vievRange: 3,
      dmg: 18, 
      crit: 15,
      exp: 0,
      lvl: 1,
      gold: 0,
      startOfFight: [],
      everyThird:0,
    },
    {
      name:"mage",
      maxHp: 80,
      hp: 80,
      shield: 0,
      hitbox: 1,
      vievRange: 3,
      dmg: 5, 
      crit: 0,
      exp: 0,
      lvl: 1,
      gold: 0,
      startOfFight: [
        {
            name: "Fireball",
            dmg: 20,
            heal: 0,
            shield: 0,
            tag: function(){
                return `<li>You blast your enemy with Fireball for <span class='list-item-dmg'>${this.dmg} damage</span></li>`;
            },
        },
        {
            name: "Magic Shield",
            dmg: 0,
            heal: 0,
            shield: 20,
            tag: function(){
                return `<li>You cast Magic Shield protecting you for <span class='list-item-shield'>${this.shield} damage</span></li>`;
            },
            
            
        }

      ]
       
      ,
      everyThird:0,
      },

       {
      name:"paladin",
      maxHp: 100,
      hp: 80,
      shield: 0,
      hitbox: 1,
      vievRange: 3,
      dmg: 7, 
      crit: 5,
      exp: 0,
      lvl: 1,
      gold: 0,
      startOfFight: 
        [
            {
                name: "Holy Light",
                dmg: 0,
                heal: 20,
                shield: 0,
                tag: function(){
                    return `<li>You cast holy light and recover <span class='list-item-heal'>${this.heal} health</span></li>`;
                },
                
            },
        ]
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

var statusbar = document.getElementById("status-bar")

var combatLog = document.getElementById("combat-log")

var combatLogArr = []

var statsBarPlayerClass = document.getElementById("player-class")

var statsBarPlayerHp = document.getElementById("player-HP")

var statsBarPlayerLvl = document.getElementById("player-lvl")

var statsBarPlayerExp = document.getElementById("player-exp")

var statsBarPlayerDmg = document.getElementById("player-dmg")

var playerHP = document.getElementById("hp-bar-player-nums")

var playerHealthBar = document.getElementById("hp-bar-player-value")

var playerShieldBarAura = document.getElementById("shield-bar")

var playerShieldBar = document.getElementById("shield-bar-player")

var enemyHP = document.getElementById("hp-bar-enemy-nums")

var enemyHealthBarValue = document.getElementById("hp-bar-enemy-value")

var enemyHealthBar = document.getElementById("hp-bar-enemy")

var intro = document.getElementById("intro")

var combatScreen = document.getElementById("combat-screen")

var combatScreenEnemy = document.getElementById("combat-screen-enemy")

var disableMove = false

function resolveTimer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      },500);
    });
  }

function charSelect(x){
   var getId = x.getAttribute("id")
   
   var playerStats = characterClasses[getId]

   document.documentElement.style.setProperty('--charClass', `url("${characterClasses[getId].name}.png")` );
    
   function updateHp(){

    playerStats.hp <= 0 ? playerStats.hp = 0 : null

    playerHP.textContent = playerStats.hp + "/" + playerStats.maxHp

    playerHealthBar.style.width = `${playerStats.hp / (playerStats.maxHp / 100)}%`



   }

   function updateEnemyHp(){

    enemyStats.hp <= 0 ? enemyStats.hp = 0 : null;
    
    enemyHP.textContent = enemyStats.hp + "/" + enemyStats.maxHp

    enemyHealthBarValue.style.width = `${enemyStats.hp / (enemyStats.maxHp / 100)}%`
   }

   function updateUi(){
    
    updateHp()

    statsBarPlayerClass.textContent = "Class: " + playerStats.name.toUpperCase()

    statsBarPlayerExp.textContent = "Exp: " + playerStats.exp

    statsBarPlayerLvl.textContent = "Level: " + playerStats.lvl

    statsBarPlayerDmg.textContent = "Damage: " + playerStats.dmg

}

updateUi()

function getLvl(){
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

           combatLog.innerHTML = `<li class='list-item-lvl'>You have gained level ${playerStats.lvl}</li>` + combatLog.innerHTML
        
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

        var loadEnemy = enemyArray.find(x => x.name == getEnemyType)

        document.documentElement.style.setProperty('--enemyType', `url("${getEnemyType}.png")` );

        combatScreenEnemy.style.visibility="visible"

        enemyHealthBar.style.visibility="visible"
        
        
        var playerCombatShield = playerStats.shield

        var maxShieldArr = []

        var checkForStartOfFight = true

        var playerCombatDmg = playerStats.dmg

        var playerCombatCrit = playerStats.crit
        
        var playerCombatExp = playerStats.exp
        var playerCombatLvl = playerStats.lvl
        var playerCombatEveryThird = playerStats.everyThird


        enemyStats.hp = loadEnemy.hp
        enemyStats.maxHp = loadEnemy.hp
        enemyStats.dmg = loadEnemy.dmg
        enemyStats.exp = loadEnemy.exp
        enemyStats.evade = loadEnemy.evade
        enemyStats.lifesteal = loadEnemy.lifesteal
        enemyStats.exp = loadEnemy.exp

        updateEnemyHp()

        updateHp()

        combatLogArr = []

        
        
        while (playerStats.hp > 0 && enemyStats.hp > 0 ){
            
           
            
            if ( checkForStartOfFight ) {
                for (let i = 0; i < playerStats.startOfFight.length; i++)
                    {   
                        playerCombatShield = playerCombatShield + playerStats.startOfFight[i].shield

                        playerStats.hp = playerStats.hp + playerStats.startOfFight[i].heal

                        playerStats.hp > playerStats.maxHp ? playerStats.hp = playerStats.maxHp : null
                        
                        enemyStats.hp =  enemyStats.hp - playerStats.startOfFight[i].dmg
                       
                        combatLogArr.push({

                            logMsg:  playerStats.startOfFight[i].tag(),

                            playerHp: playerStats.hp,

                            playerShield: playerCombatShield,

                            playerExp : "",
                            
                            enemyHp: enemyStats.hp
                          }  
                        )
                    }

                   

                checkForStartOfFight = false 

                
            }

            

            maxShieldArr.push(playerCombatShield)
            

            if (enemyStats.hp > 0){

                var evadeCheck = Math.floor(Math.random() * 100)

                evadeCheck < enemyStats.evade ? combatLogArr.push({

                    logMsg:"<li>You <span class='list-item-miss'>missed</span> the attack</li>",

                    playerHp: playerStats.hp,

                    playerShield: playerCombatShield,

                    playerExp : "",
                    
                    enemyHp: enemyStats.hp

                }) : null
    
                if (evadeCheck >=  enemyStats.evade){
                    
                    let critCheck = Math.floor(Math.random() * 100)

                    if (critCheck < playerCombatCrit){

                        enemyStats.hp = enemyStats.hp - playerCombatDmg
                        
                        combatLogArr.push({

                            logMsg:`<li>You crit for <span class='list-item-dmg'>${playerCombatDmg *2} damage</span></li>`,

                            playerHp: playerStats.hp,

                            playerShield: playerCombatShield,

                            playerExp : "",
                            
                            enemyHp: enemyStats.hp

                        
                        })
                
                        }
                     enemyStats.hp = enemyStats.hp - playerCombatDmg

                     critCheck < playerCombatCrit ? "" : combatLogArr.push({

                        logMsg:`<li>You have dealt <span class='list-item-dmg'> ${playerCombatDmg} damage</span> </li>`,

                        playerHp: playerStats.hp,

                        playerShield: playerCombatShield,

                        playerExp : "",
                        
                        enemyHp: enemyStats.hp
                    })
                }
            }

           
            if (enemyStats.hp <= 0 ) {
                
                playerStats.exp += enemyStats.exp

                combatLogArr.push({

                    logMsg:`<li>Enemy defeated, gained  <span class='list-item-lvl'>${enemyStats.exp} exp</span></li>`,

                    playerHp: playerStats.hp,

                    playerShield: playerCombatShield,

                    playerExp : enemyStats.exp,
                    
                    enemyHp: enemyStats.hp,

                })

              

                
                 break
                       }


            if (playerCombatShield > 0){

                playerCombatShield = playerCombatShield - enemyStats.dmg

                var checkForShieldBreak = 0

                if (playerCombatShield < 0)  
                    {
                        
                        playerStats.hp = playerStats.hp + playerCombatShield

                        checkForShieldBreak =  Math.abs(playerCombatShield)
                    } 
                
                combatLogArr.push({

                    logMsg: `<li>Enemy deals <span class='list-item-shield'> ${enemyStats.dmg - checkForShieldBreak} damage</span> to your shield and 
                     <span class='list-item-dmg'>${checkForShieldBreak} damage </span> to your health</li>`,

                     playerHp: playerStats.hp,

                     playerShield: playerCombatShield,

                     playerExp : "",
                     
                     enemyHp: enemyStats.hp

                
                })

                
            } 
                       

           else {

            playerStats.hp = playerStats.hp - enemyStats.dmg

            var enemyLifestole = enemyStats.dmg * (enemyStats.lifesteal / 100)

            enemyStats.hp += enemyLifestole

            enemyStats.lifesteal > 0 ? combatLogArr.push({

                logMsg:`<li>Enemy deals <span class='list-item-dmg'> ${enemyStats.dmg} damage</span> to you and recovers 
                <span class='list-item-heal'>${enemyLifestole} HP</span> from lifesteal</li>`,

                playerHp: playerStats.hp,

                playerShield: playerCombatShield,

                playerExp : "",
                
                enemyHp: enemyStats.hp
            
            }) 



            : combatLogArr.push({

                logMsg:`<li>Enemy deals <span class='list-item-dmg'> ${enemyStats.dmg} damage</span> to you</li>`,

                playerHp: playerStats.hp,

                playerShield: playerCombatShield,

                playerExp : "",
                
                enemyHp: enemyStats.hp
            
                })

            
        }
            
            if (playerStats.hp <= 0) {

               

                combatLogArr.push({

                    logMsg: `You Died`,

                    playerHp: playerStats.hp,

                    playerShield: playerCombatShield,

                    playerExp : "",
                    
                    enemyHp: enemyStats.hp
                })
                     

                break

                      }
       
                   
        }
       

              for (let i = 0; i < combatLogArr.length; i++) {

               
                   
                var delay = await resolveTimer()

                   

                 var combatListItem = combatLogArr[i]

                 combatLog.innerHTML = combatListItem.logMsg + combatLog.innerHTML

                 playerStats.hp = combatListItem.playerHp

                 playerCombatShield = combatListItem.playerShield

                 enemyStats.hp = combatListItem.enemyHp


                 playerStats.hp <= 0 ? playerStats.hp = 0 : null


                 playerHP.textContent = playerStats.hp + "/" + playerStats.maxHp

                 playerHealthBar.style.width = `${playerStats.hp / (playerStats.maxHp / 100)}%`

                 playerCombatShield < 0 ? playerCombatShield = 0 : null

                 if (playerCombatShield > 0) {
 
                     playerShieldBarAura.style.scale = 1
 
                    }
 
                 playerShieldBar.style.width = `${playerCombatShield / (playerStats.maxHp /100)}%`
 
              
 
                 playerShieldBarAura.style.opacity = `${(playerCombatShield / (maxShieldArr[0]/100)) * 0.5}%`

            

            

            updateEnemyHp()

                   
       
    }
        
        
        playerShieldBarAura.style.scale = "0"

        playerShieldBar.style.width = 0

        if (enemyStats.hp <= 0) {

            updateUi()

            getLvl()

            getEnemyId.setAttribute("class", "boxItem")
            
            getEnemyId.style.opacity="0"
            var areaRemove = document.querySelectorAll(`[parent="${playerGetsIntoAgro}"]`)
            areaRemove.forEach((item)=>{
                item.setAttribute("class", "boxItem")
                item.removeAttribute("parent")
            })
            getEnemyId.removeAttribute("enemytype")

            setTimeout(function(){
                combatScreenEnemy.style.visibility="hidden"
            enemyHealthBar.style.visibility="hidden"
            },2000)
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

