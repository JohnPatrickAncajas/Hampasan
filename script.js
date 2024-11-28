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
    new User("Rin", 1000, 1, weaponlist[0], defaultpng("sword.png"))
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
        return "DefaultSword.png"
    }
    if (weaponstype == "bow.png") {
        return "DefaultBow.png"
    }
    if (weaponstype == "spear") {
        return "DefaultSpear.png"
    }
    if (weaponstype == "orb") {
        return "DefaultOrb.png"
    }
    if (weaponstype == "Scythe") {
        return "DefaultScythe.png"
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
    const character = document.getElementById("equip")
    const charname = document.createElement("h1")
    charname.innerHTML = ` USER :${current_user.name}
                           Weapon:${current_user.equipped.name}
                           <img src ="temp.png" height="100px" width="100px">
                           <button onclick="changeweapon()">CHANGE WEAPON</button>
                           <div id="weaponry"></div>
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

//------------------------------------------------------------------//
//---------------------------- FIGHT SECTION -----------------------//
//patanggal nlng ng start button after maclick
function startbattle(){
    usercurrent = userlist[0]
    mobcurrent = randomMob()
    display_user(usercurrent)
    display_mob(mobcurrent)
    battle(usercurrent,mobcurrent)
}
function getuser2(){
    const username = document.getElementById('username2').value;
    currentuser = locate(username)
    return currentuser
    
}

function randomMob(){
    const result = Math.floor(Math.random() * mobs.length);
    return mobs[result]
}

function display_user(user){
    const playerbox = document.getElementById('fightBox_player')

    const playerimage = document.createElement('img')
    playerimage.src = user.defaultpng
    playerimage.alt = user.name
    playerbox.appendChild(playerimage)
}

function display_mob(mob){
    const mobbox = document.getElementById('fightBox_mob')

    const mobimage = document.createElement('img')
    mob.src = "temp.png"
    mob.alt = Mob
    mobbox.appendChild(mobimage)
}

function battle(user,mob){
    //-----------COPY LANG NG USER AT MOBS ANG PAGLALABANIN---------------//
    var userhp = user.hp
    var mobhp = mob.hp
    const playerbox = document.getElementById('fightBox_player')
    const playerhp = document.createElement('h1')
    playerhp.innerHTML = `${user.name}: ${userhp}`
    playerbox.appendChild(playerhp)

    const mobbox = document.getElementById('fightBox_mob')
    const mobhp = document.createElement('h1')
    mobhp.innerHTML = `${mob.name}: ${mobhp}`
    mobbox.appendChild(mobhp)
    
    while(userhp != 0 && mob !=0){
        mobhp = playermove(user)
        userhp = mobmove(mob)
    }

}

function calculatedmg(user,move){
    return user.hp -= move.damage
}

function playermove(user){
    const move1 = user.equipped.moveset[0].damage
    const move2 = user.equipped.moveset[1].damage
    const move3 = user.equipped.moveset[2].damage

    const movepanel = document.getElementById("fightBox_player")

    const button1 = document.createElement('button')
    button1.innerHTML`${user.equipped.moveset[0].name}`
    const button2 = document.createElement('button')
    button2.innerHTML`${user.equipped.moveset[1].name}`
    const button3 = document.createElement('button')
    button3.innerHTML`${user.equipped.moveset[2].name}`

    button1.onclick = calculatedmg(user,move1)

    button2.onclick = calculatedmg(user,move2) 
    button3.onclick = calculatedmg(user,move3) 

}

function mobmove(mob){

}








function swapPage(page) {
    const pageDisplay = document.getElementById('pageDisplay');
    if (page === 'menu') {
        pageDisplay.innerHTML = `
        <input type="text" id="username" placeholder="Enter your name">
        <button onclick="getuser()">Submit</button>
        
        <div id = "equip"></div>
        `
        
    } else if (page === 'fight') {
        pageDisplay.innerHTML = `
            <div class = "fighting_class">
                <div class="fightBox_player">
                    <p>Character</p>
                        
                </div>
                
                <button onclick="startbattle()" styles="display:grid;place-items:center">START</button>

                <div class="fightBox_mob">
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
