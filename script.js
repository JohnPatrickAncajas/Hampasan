class User {
    constructor(name, hp, currency, equipped, defaultpng) {
        this.name = name;
        this.hp = hp;
        this.currency = currency;
        this.equipped = equipped;
        this.defaulpng = defaultpng;
    }
}

class Mob {
    constructor(name, hp, moveset) {
        this.name = name;
        this.hp = hp;
        this.moveset = moveset;
    }
}

class Weapon {
    constructor(type, name, unlocked, moveset) {
        this.type = type;
        this.name = name;
        this.unlocked = unlocked;
        this.refinement = 1.00;
        this.moveset = moveset;
        this.finaldmg =this.moveset.damage * this.refinement;
    }

    
}

class Moves {
    constructor(name, damage, png) {
        this.name = name;
        this.damage = damage;
        this.sprite = png;
    }
}

//-------------------WEAPON LIST--------------------------------------------------------------
const weaponlist = [
    new Weapon("sword", "Default Blade", true, [
        new Moves("Focus Slash", 50, ".png"),
        new Moves("Quick Stab", 20, ".png"),
        new Moves("Mach Drain", 10, ".png")
    ]),
    new Weapon("sword", "Black Blade", false, [
        new Moves("Bad Omen", 100, ".png"),
        new Moves("Night Slash", 120, ".png"),
        new Moves("Equinox", 200, ".png")
    ])
];

function display_items() {
    const targetlist = document.getElementById("prizeBox");
    targetlist.innerHTML = "";

    for (let i = 0; i < weaponlist.length; i++) {
        const weap = document.createElement('li');
        weap.innerHTML = `${weaponlist[i].name} | ${weaponlist[i].type}`;
        targetlist.appendChild(weap);
    }
}

//------------USER LIST------------------------
const userlist = [
    new User("Rin", 1000, 1, weaponlist[0], defaultpng("sword")),
    new User("Pat", 1000, 1, weaponlist[0], defaultpng("sword"))
]

//------------------- MOB LIST ------------------------
const mobs = [
    new Mob("Estafallacy", 500, [
        new Moves("Toxic Spit", 50, ".png"),
        new Moves("Light Gas", 60, ".png"),
        new Moves("Mind Control", 100, ".png")
    ]),

    new Mob("Enigma", 5100, [
        new Moves("Dark Matter", 150, ".png"),
        new Moves("Soul Drag", 100, ".png"),
        new Moves("Corruption", 200, ".png")
    ])
]

//--------------PNG HANDLER-------------------
function defaultpng(weaponstype) {
    if (weaponstype == "sword") {
        return "DefaultSword"
    }
    if (weaponstype == "bow") {
        return "DefaultBow"
    }
    if (weaponstype == "spear") {
        return "DefaultSpear"
    }
    if (weaponstype == "orb") {
        return "DefaultOrb"
    }
    if (weaponstype == "knuckles") {
        return "DefaultKnuckles"
    }
}
//-----------------------WEAPON GACHA------------------------------
function gacha() {
    const result = Math.floor(Math.random() * weaponlist.length);
    const resultdiv = document.getElementById('gacharesult');
    resultdiv.innerHTML = '';

    const prize = document.createElement("h1");
    prize.innerText = `You won ${weaponlist[result].name}`;
    resultdiv.appendChild(prize);

//--------------------- refinement debug statement------------
    const verifyMessage = verify(weaponlist[result].name);
    const verifyMessageDiv = document.createElement("p");
    verifyMessageDiv.innerText = verifyMessage;
    resultdiv.appendChild(verifyMessageDiv);

}

//----------------LOCATOR-------------------
function locate(username){
    for(let i = 0; i < userlist.length ; i++){
        if(userlist[i].name == username){
            return userlist[i]
        }
    }
    return null;
}
//--------------------verify para sa refinement
function verify(item_name) {
    for (let i = 0; i < weaponlist.length; i++) {
        if (weaponlist[i].name === item_name) {
            if (weaponlist[i].unlocked === false) {
                weaponlist[i].unlocked = true;
                return "Weapon Unlocked";
            } else {
                weaponlist[i].refinement += 0.2;
                weaponlist[i].finaldmg = weaponlist[i].moveset.damage * weaponlist[i].refinement;
                return "Weapon Refinement++";
            }
        }
    }
}

//------------------equip customization-----------

function getuser(){
    const username = document.getElementById('username').value;
    targ = locate(username)
    menu(targ)
}
function menu(current_user){
    const pageDisplay = document.getElementById('pageDisplay');
    const character = document.getElementById("equip")
    pageDisplay.innerHTML = `
                           <div id="characterInfo">
                                <img id="characterImage" src ="temp.png">
                                <p>Username: ${current_user.name}</p>
                                <p>Weapon: ${current_user.equipped.name}</p>
                                <button id="changeWeaponButton" onclick="changeweapon()">CHANGE WEAPONS</button>
                           </div>
                           <div id="weaponMovesInfo">
                                <h2>${current_user.equipped.name} Moves</h2>
                                <h3>Move 1</h3>
                                <p>Lagay dito explanation tsaka damage ng move</p>
                                <h3>Move 2</h3>
                                <p>Lagay dito explanation tsaka damage ng move</p>
                                <h3>Move 3</h3>
                                <p>Lagay dito explanation tsaka damage ng move</p>
                           </div>
                           <div id="weaponryInfo">
                                <div id="username">${current_user.name}'s Weapons</div>
                                <hr>
                                <div id="weaponry"></div>
                           </div>
                           `

    character.appendChild(charname)
}
//----------------------Change weapon-------------------
function changeweapon(){
    const username = document.getElementById('username').value;
    targ = locate(username)
    
    const weaponry = document.getElementById('weaponry')
    const buttons = document.createElement('div')
    for (let i = 0; i < weaponlist.length; i++) {
        if (weaponlist[i].unlocked === true) {
          
            const button = document.createElement('button');
            button.innerHTML = `Equip ${weaponlist[i].name}`;
           
            button.addEventListener('click', function() {
                equip(targ, weaponlist[i]); 
            });

            buttons.appendChild(button);
        }
    }

    weaponry.innerHTML = '';
    weaponry.appendChild(buttons);
}

function equip(user, weapon) {
    user.equipped = weapon;
    alert(`You have equipped ${weapon.name}!`);
}

//------------------------------------------------------
//---------------------------- FIGHT SECTION -----------------------//
function getuser2(){
    const username = document.getElementById('username2').value;
    targ = locate(username)
}


function swapPage(page) {
    const pageDisplay = document.getElementById('pageDisplay');
    if (page === 'menu') {
        pageDisplay.innerHTML = `
        <h1>Welcome to Hampasan!</h1>
        <div id="usernamePasswordBox">
            <label for="username">Username: <input type="text" class="inputBox" id="username" placeholder="Enter your username: "></input></label>
            <label for="password">Password: <input type="password" class="inputBox" id="password" placeholder="Enter your password: "></input></label>
            <!-- Wala pa yung password functionality, nandiyan lang for design-->
            <button id="submitButton" onclick="getuser()">Submit</button>
        </div>
    
        <div id = "equip"></div>
        `
        
    } else if (page === 'fight') {
        pageDisplay.innerHTML = `
            <div class="fightingDiv">
                <div class="fightBox">
                    <p>Character</p>
                    <input type="text" id="username2" placeholder="Enter your name">
                    <button onclick="getuser2()">Submit</button>
                    
                </div>
                <div class="fightBox">
                    <p>Hahampasin</p>
                </div>
            </div>
        `;
    } else if (page === 'gacha') {
        pageDisplay.innerHTML = `
            <h1>Gacha</h1>
            <button onclick="display_items()">Show table</button>
            <button onclick="gacha()">ROLL</button>
        
            
            <ul id="prizeBox"></ul>
            <div id="gacharesult"></div>
        `;
    }
}
