
class User {
    constructor(name, hp, currency, equipped, defaultpng) {
        this.name = name;
        this.hp = hp;
        this.currency = currency;
        this.equipped = equipped;
        this.defaultpng = defaultpng;
    }
}

class Mob {
    constructor(name, hp, moveset, defaultmobpng) {
        this.name = name;
        this.hp = hp;
        this.moveset = moveset;
        this.defaultmobpng = defaultmobpng
    }
}

class Weapon {
    constructor(type, name, Boolean, moveset) {
        this.type = type;
        this.name = name;
        this.unlocked = Boolean;
        this.refinement = 1;
        this.moveset = moveset;
    }
}

class Moveset {
    constructor(name, damage, png, description) {
        this.name = name;
        this.damage = damage;
        this.sprite = png;
        this.description = description
    }
}

const mobes = [
  
    [
        new Moveset("Poison Dart", 40,".png"),
        new Moveset("Robbery", 30, ".png"),
        new Moveset("Lashout", 50, ".png")
    ],

    [
        new Moveset("Ink Cloud", 100,".png"),
        new Moveset("Tentacle Grasp", 120, ".png"),
        new Moveset("Eldritch Horror", 500, ".png")
    ],
    
]

const movesetlist = [
    [
        new Moveset("Focus Slash", 50, ".png", "Focus innate energy to deal <span style='color: red;'><b>50</b></span> slash damage to the opponent"),
        new Moveset("Quick Stab", 20, ".png", "Quickly stabs the opponent with accuracy, dealing <span style='color: red;'><b>20</b></span> damage"),
        new Moveset("Mach Slash", 40, ".png", `Slash with intensity dealing <span style='color: red;'><b>${40}</b></span> slash damage`)
    ],
    [
        new Moveset("Bad Omen", 100, ".png", "A cursed slash with high damage potential, dealing <span style='color: red;'><b>100</b></span> damage"),
        new Moveset("Night Slash", 120, ".png", "A powerful night-infused attack, dealing <span style='color: red;'><b>120</b></span> damage"),
        new Moveset("Equinox", 200, ".png", "Unleashes massive damage during an eclipse, dealing <span style='color: red;'><b>200</b></span> damage")
    ],
    [
        new Moveset("One Way to Find Out", 100, ".png", "A gamble with devastating potential, dealing <span style='color: red;'><b>100</b></span> damage"),
        new Moveset("Soul Harvest", 120, ".png", "Harvest the opponent's soul for damage, dealing <span style='color: red;'><b>120</b></span> damage"),
        new Moveset("Death", 200, ".png", "The ultimate scythe attack, dealing <span style='color: red;'><b>200</b></span> damage")
    ],

    [
        new Moveset("Debug Slash", 999999, ".png", "A powerful debug move that deals an instant <span style='color: red;'><b>999999</b></span> damage to the opponent, ensuring a one-shot defeat."),
        new Moveset("Debug Cleaver", 999999, ".png", "A massive cleaving attack that deals <span style='color: red;'><b>999999</b></span> damage, obliterating any enemy in a single strike."),
        new Moveset("Ultimate Debug", 999999, ".png", "An overpowered debug move that instantly deals <span style='color: red;'><b>999999</b></span> damage, defeating any opponent with ease.")
        
    ]


];


// weaponlist
const weaponlist = [

    new Weapon("SWORD", "Default Blade", true, movesetlist[0]),
    
    new Weapon("SWORD", "Dark Fang", false, movesetlist[1]),

    new Weapon("SCYTHE", "Little Red's Scythe", false, movesetlist[2]),

    new Weapon("SWORD", "DEBUG BLADE", true, movesetlist[3])
    
]

//user list
const userlist = [
    
    new User("Nbuna", 5000, 1, weaponlist[0], defaultpng(weaponlist[0].type)),
    
    new User("Suis", 5000, 1, weaponlist[0], defaultpng(weaponlist[0].type))
    
]

// mob list
const moblist = [
    new Mob("Bandit", 1000, mobes[0],"bandit.png"),
    new Mob("Kraken", 1200, mobes[1],"kraken.png"),
]



//------------------debugtool-------------------//
function debugtool(){
    console.log(current_user.equipped.name)
    console.log(current_user.currency)
    console.log(current_user.equipped.moveset[0].name)
    console.log(current_user.equipped.moveset[1].name)
    console.log(current_user.equipped.moveset[2].name)
    console.log(current_user.equipped.moveset[0].damage)
    console.log(current_user.equipped.moveset[1].damage)
    console.log(current_user.equipped.moveset[2].damage)
    console.log(current_user.equipped.type)
    console.log(current_user.equipped.refinement)
}
//-----------------------------------------------------------------------------------------//
// get current user
let current_user = null
let current_mob = null

let origuserhp = 0
let origmobhp = 0


function getcurrentuser() {
    console.log("function called");
    const userBox1= document.getElementById('usernamePasswordBox1');
    const userBox2 = document.getElementById('usernamePasswordBox2');
    if (current_user == null) {
        console.log("user not found");

        userBox2.style.display = "none";
        userBox1.className = "usernamePasswordBox1";
        const loginpanel = document.createElement('input');
        loginpanel.type = "text";
        loginpanel.id = "loginusername";
        loginpanel.placeholder = "Input Username here";
        userBox1.appendChild(loginpanel);

        const submitButton = document.createElement('button');
        submitButton.id = "submituser";
        submitButton.innerText = "Submit Username";
        userBox1.appendChild(submitButton);

        submitButton.addEventListener('click', function(){
            current_user = getuserinput();
            if (current_user) {
                console.log("logged in:", current_user.name)
                debugtool()
                swapPage('menu')
                menu()
                changeweapon()
            } else {
                alert("Username not found. Please try again.");
                document.getElementById('loginusername').value = "";
            }
        });
    } else {
        console.log("already logged in")
    }
}

function locate_user(username){
    for(let i = 0; i < userlist.length ; i++){
        if(userlist[i].name == username){
            return userlist[i]
        }
    }
    return null;
}

function getuserinput(){
    const obtained = document.getElementById('loginusername').value.trim()
    var obtain = locate_user(obtained)
    if(obtain == null){
        console.log("user not found")
        return null
    }
    else{
        console.log("user found")
        return obtain
    }
}


//--------------------------------------------------------------------------------------------------//
function defaultpng(weapontype){
    switch (weapontype.toLowerCase()) {
        case "sword":
            return "default_sword.png";
        case "bow":
            return "default_bow.png";
        case "spear":
            return "default_spear.png";
        case "orb":
            return "default_orb.png";
        case "scythe":
            return "default_scythe.png";
        default:
            return "default.png";
    }
}

//--------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------//

//===============================MENU CONTENTS==================================//

function loadmenutools(){
    debugtool()
    menu()
    changeweapon()
}
function changeweapon(){
    console.log("weaponry function loaded ")
    const weaponry = document.getElementById('weaponry')
    weaponry.innerHTML = "";
    for (let i = 0; i < weaponlist.length; i++) {
        console.log("sigma debug")
        if (weaponlist[i].unlocked) {
            const button = document.createElement('button')
            button.innerHTML = `Equip ${weaponlist[i].name}`
            button.addEventListener('click', function(){
                alert(`${weaponlist[i].name} is equipped`)
                equip(weaponlist[i])
            });
            weaponry.appendChild(button)
        }
    }
}

function equip(weapon){
    current_user.equipped = weapon
    loadmenutools()
}

function menu(){
    
    const pageDisplay = document.getElementById('pageDisplay');
        pageDisplay.innerHTML = `
                            <div id="mainInfoDiv">     
                                <div id="characterInfo">
                                        <img id="characterImage" src ="temp.png">
                                        <p>Username: ${current_user.name}</p>
                                        <p>Weapon: ${current_user.equipped.name}</p>
                                </div>
                                <div id="weaponMovesAndWeaponryInfo">
                                    <div id="weaponMovesInfo">
                                        <h2>${current_user.equipped.name} Moves</h2>
                                        <h3>${current_user.equipped.moveset[0].name}</h3>
                                        <p>${current_user.equipped.moveset[0].description}</p>
                                        <h3>${current_user.equipped.moveset[1].name}</h3>
                                        <p>${current_user.equipped.moveset[1].description}</p>
                                        <h3>${current_user.equipped.moveset[2].name}</h3>
                                        <p>${current_user.equipped.moveset[2].description}</p>
                                    </div>
                                    <div id="weaponryInfo">
                                            <div id="username">${current_user.name}'s Weapons</div>
                                            <hr>
                                            <div id="weaponry"></div>
                                    </div>
                                </div>
                            </div>`
        
        const changeweapon = document.getElementById('weaponry')
        changeweapon.addEventListener('click', function(){
            changeweapon();
        })
    }



//----------------------------------GACHA SECTION-----------------------------------------//
// Gacha


function gacha() {
    const coins = document.getElementById("currency")
    coins.innerHTML = " "
    const balance = document.createElement('h2')
    balance.innerHTML = `current balance is ${current_user.currency - 1}`
    coins.appendChild(balance)
    if(current_user.currency > 0){
        const won = document.getElementById("result")
        const outcome = document.getElementById("resultoutcome")
        outcome.innerHTML = " "
        let i = 0
        const delay = 300
        function showPrize() {
            if (i < 10) {
                const randomIndex = Math.floor(Math.random() * (weaponlist.length - 1)) + 1
                const prize = document.createElement('h1')
                prize.innerHTML = `You won: ${weaponlist[randomIndex].name}`
                
                won.innerHTML = ""
                won.appendChild(prize);i++;
                setTimeout(showPrize, delay)
            } else {
                won.innerHTML = "";
                const finalPrizeIndex = Math.floor(Math.random() * (weaponlist.length - 1)) + 1
                const finalPrize = document.createElement('h1')
                finalPrize.innerHTML = `You won: ${weaponlist[finalPrizeIndex].name}`
                won.appendChild(finalPrize)
                const outcometext = document.createElement("h1")
                outcometext.innerHTML = verify(weaponlist[finalPrizeIndex].name)
                outcome.appendChild(outcometext)
            }
        }
        showPrize()
        current_user.currency -= 1
    }
    else
    {
        alert("insufficient coins, please proceed to fight monsters to get coins")
        swapPage("fight")
    }
}


function verify(item_name) {
    for (let i = 0; i < weaponlist.length; i++) {
        if (weaponlist[i].name === item_name) {
            if (weaponlist[i].unlocked === false) {
                weaponlist[i].unlocked = true;
                return "Weapon Unlocked";
            } else {
                weaponlist[i].refinement += 0.2;
                return "Weapon Refinement++";
            }
        }
    }
}

//verify gacha
//========================================================================
// PVE SECTION

function getmob(){
    const randomMob = Math.floor(Math.random() * (moblist.length))
    current_mob = moblist[randomMob] 
    saveoriginalhp()
}

function saveoriginalhp(){
    origuserhp = current_user.hp;
    origmobhp = current_mob.hp;
    console.log("Original user HP: " + origuserhp);
    console.log("Original mob HP: " + origmobhp);
}


function battle() {
    if(current_user.hp > 0 && current_mob.hp > 0){
        const playerbox = document.getElementById('PlayerBox');
        const playerStatsbox = document.getElementById('PlayerStatsBox');
        playerbox.innerHTML = " ";
        playerStatsbox.innerHTML = " ";

        const playerImage = document.createElement('img');
        playerImage.src = 'temp.png';
        playerImage.alt = current_user.name;
        playerImage.id = "PlayerImage";
        playerbox.appendChild(playerImage);

        const playerhp = document.createElement('h6');
        playerhp.innerHTML = `${current_user.name} HP: <b>${current_user.hp}</b>`;
        playerStatsbox.appendChild(playerhp);

        const mobBox = document.getElementById('MobBox');
        const mobStatsBox = document.getElementById('MobStatsBox');
        mobBox.innerHTML = " ";
        mobStatsBox.innerHTML = " ";

        const MobImage = document.createElement('img');
        MobImage.src = 'temp.png';
        MobImage.alt = current_user.name;
        MobImage.id = "MobImage";
        mobBox.appendChild(MobImage);
        
        const mobhp = document.createElement('h6');
        mobhp.innerHTML = `${current_mob.name} HP: <b>${current_mob.hp}</b>`;
        mobStatsBox.appendChild(mobhp);

        for (let i = 0; i < 3; i++) {
            const move = document.createElement('h6');
            move.innerHTML = `Player move #${i + 1}: ${current_user.equipped.moveset[i].name}`;
            move.addEventListener('click', function() {
                playerImage.className = "animationSword";
                setTimeout(function() {
                    alert(current_user.equipped.moveset[i].name + " was used");
                    deal_damagetomob(i);
                    mobturn();
                }, 2000);
            });
            playerStatsbox.appendChild(move);
            const mobe = document.createElement('h6');
            mobe.innerHTML = `Enemy move #${i + 1}: ${current_mob.moveset[i].name}`;
            mobStatsBox.appendChild(mobe);
        }
    }
    else {
        alert("Match is over");
        console.log("Resetting HP...");
        console.log("Original user HP: " + origuserhp);
        console.log("Original mob HP: " + origmobhp);
        
        current_user.hp = origuserhp;
        current_mob.hp = origmobhp;
        
        swapPage("menu");
    }
}


//mob's turn
function mobturn(){
    const mobBox = document.getElementById('MobBox')
    mobBox.innerHTML=" "

    const mobhp = document.createElement('h4')
    mobhp.innerHTML =`${current_mob.name} HP: ${current_mob.hp}`
    mobBox.appendChild(mobhp)

    const randomMove = Math.floor(Math.random()*current_mob.moveset.length)
    alert(current_mob.name + " used " + current_mob.moveset[randomMove].name)
    deal_damagetoplayer(randomMove)
    setTimeout(battle, 200);
}

//deal dmg to mob
function deal_damagetomob(move){
    current_mob.hp -= current_user.equipped.moveset[move].damage * current_user.equipped.refinement
    if(current_mob.hp < 0){
        alert(current_mob.name + " defeated!, you got + 1 coin for winning!")
        current_user.currency += 1
    }
}

//deal dmg to player
function deal_damagetoplayer(move){
    current_user.hp -= current_mob.moveset[move].damage
    if(current_user.hp < 0){
        alert(current_user.name + " was defeated")
    }
}


function swapPage(page) {
    const pageDisplay = document.getElementById('pageDisplay')
    if (page === 'menu'){
        pageDisplay.innerHTML = `
        <h1>Welcome to Hampasan!</h1>
        <div id='usernamePasswordBox2'>
           <button onclick = "getcurrentuser()">START</button>
        </div>
    
        <div id = "equip"></div>
        </div>`
        loadmenutools()

    } else if (page === 'fight') {
        pageDisplay.innerHTML = `
            <div class="fightingDiv">
                <div id="fightAnimationDiv">
                    <div class="fightBox" id="PlayerBox"></div>
                    <div class="fightBox" id="MobBox"></div>
                </div>
                <div id="fightStatsDiv">
                    <div class="fightStatsBox" id="PlayerStatsBox"></div>
                    <div class="fightStatsBox" id="MobStatsBox"><div/>
                </div>
            </div>
        `
        getmob()
        debugtool()
        battle()
    } else if (page === 'gacha') {
        pageDisplay.innerHTML = `
        <h1>Weapon Gacha</h1>
        <button onclick = "gacha()">ROLL</button>
        <div id = "currency"></div>
        <div id = "result"></div>
        <div id = "resultoutcome"></div>
        `
    }
}