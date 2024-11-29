
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
    ]
];


// weaponlist
const weaponlist = [

    new Weapon("SWORD", "Default Blade", true, movesetlist[0]),
    
    new Weapon("SWORD", "Dark Fang", false, movesetlist[1]),

    new Weapon("SCYTHE", "Little Red's Scythe", false, movesetlist[2])
    
]

//user list
const userlist = [
    
    new User("Nbuna", 5000, 1, weaponlist[0], defaultpng(weaponlist[0].type)),
    
    new User("Suis", 5000, 1, weaponlist[0], defaultpng(weaponlist[0].type))
    
]

// mob list
const moblist =[
    new Mob("Bandit", 1000, mobes[0],"bandit.png"),
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
function getcurrentuser(){
    console.log("function called")
    const userBox = document.getElementById('usernamePasswordBox')
    if(current_user == null){
        console.log("user not found")
        const loginpanel = document.createElement('input')
        loginpanel.type ="text"
        loginpanel.id = "loginusername"
        loginpanel.placeholder ="input username here"
        userBox.appendChild(loginpanel)
        

        const submitButton = document.createElement('button')
        submitButton.id = "submituser";
        submitButton.innerText = "Submit Username";
        userBox.appendChild(submitButton);

        
        submitButton.addEventListener('click', function(){
            current_user = getuserinput();
            if (current_user) {
                console.log("logged in:", current_user.name)
                debugtool()
                swapPage('menu')
                menu()
                changeweapon()
            }
            else
            {
                alert("Username not found. Please try again.");
                document.getElementById('loginusername').value = "";
            }
        });
    }
    else
    {
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
    const pageDisplay = document.getElementById('playerinfo');
    pageDisplay.innerHTML = `
                           <div id="characterInfo">
                                <img id="characterImage" src ="temp.png">
                                <p>Username: ${current_user.name}</p>
                                <p>Weapon: ${current_user.equipped.name}</p>
                           </div>
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
                           `
    
    const changeweapon = document.getElementById('weaponry')
    changeweapon.addEventListener('click', function(){
        changeweapon();
    })
}


//----------------------------------GACHA SECTION-----------------------------------------//
// Gacha

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function gacha() {
    const won = document.getElementById("result")
    const outcome = document.getElementById("resultoutcome")
    outcome.innerHTML = " "
    for (let i = 0; i < 10; i++) {
        await sleep(200)
        const randomIndex = Math.floor(Math.random() * (weaponlist.length-1))+1
        const prize = document.createElement('h1')
        prize.innerHTML = `You won: ${weaponlist[randomIndex].name}`
        won.innerHTML = " "
        won.appendChild(prize)
    }

    won.innerHTML = " "
    const finalPrizeIndex = Math.floor(Math.random() * (weaponlist.length-1))+1
    const finalPrize = document.createElement('h1');
    finalPrize.innerHTML = `You won: ${weaponlist[finalPrizeIndex].name}`
    won.appendChild(finalPrize)

    
    const outcometext = document.createElement("h1")
    outcometext.innerHTML = verify(weaponlist[finalPrizeIndex].name)
    outcome.appendChild(outcometext)
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

//verify



function swapPage(page) {
    const pageDisplay = document.getElementById('pageDisplay')
    if (page === 'menu'){
        pageDisplay.innerHTML = `
        <div id ='playerinfo'></div>
        <div id ='weaponry'></div>`
        loadmenutools()
    } else if (page === 'fight') {
        pageDisplay.innerHTML = `
            <div class="fightingDiv">
                <div class="fightBox">
                    <p>Character</p>
                </div>
                <div class="fightBox">
                    <p>Hahampasin</p>
                </div>
            </div>
        `;
    } else if (page === 'gacha') {
        pageDisplay.innerHTML = `
        <h1>Gacha</h1>
        <p>Lagay mo dito yung gacha mo</p>
        <button onclick = "gacha()">ROLL</button>
        <div id = "result"></div>
        <div id = "resultoutcome"></div>
        `

    }
}