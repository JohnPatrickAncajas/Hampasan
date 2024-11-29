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
        this.unlocked
        this.refinement = 1.00;
        this.moveset = moveset;
    }
}

class Moveset {
    constructor(name, damage, png) {
        this.name = name;
        this.damage = damage;
        this.sprite = png;
    }
}

// weapon movesets
const movesetlist = [
    
    [
    new Moveset("Focus Slash", 50,".png"),
    new Moveset("Quick Stab", 20, ".png"),
    new Moveset("Mach Drain", 10, ".png")
    ],
    
    [
    new Moveset("Bad Omen", 100, ".png"),
    new Moveset("Night Slash", 120, ".png"),
    new Moveset("Equinox", 200, ".png")
    ],
    
]

// mob moveset
const mobes = [
  
    [
    new Moveset("Poison Dart", 40,".png"),
    new Moveset("Robbery", 30, ".png"),
    new Moveset("Lashout", 50, ".png")
    ],
    
]

// weaponlist
const weaponlist = [

    new Weapon("SWORD", "Default Blade", true, movesetlist[0]),
    
    new Weapon("SWORD", "Dark Fang", false, movesetlist[1])
    
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
                console.log(current_user.name)
                console.log(current_user.equipped.name)
                console.log(current_user.currency)
                console.log(current_user.equipped.moveset[0].name)
                console.log(current_user.equipped.moveset[1].name)
                console.log(current_user.equipped.moveset[2].name)
                console.log(current_user.equipped.moveset[0].damage)
                console.log(current_user.equipped.moveset[1].damage)
                console.log(current_user.equipped.moveset[2].damage)
                console.log(current_user.equipped.type)
                swapPage('menu')
                changeweapon()
            }
            else{
                alert("Username not found. Please try again.");
                document.getElementById('loginusername').value = "";
            }
        });
    }
    else
    {
        console.log("already logged in")
        return current_user
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

//MENU
function changeweapon(){
    console.log("weaponry function loaded ")
    const weaponry = document.getElementById('weaponry')
    for (let i = 0; i < weaponlist.length; i++) {
        if (weaponlist[i].unlocked) {
          
            const button = document.createElement('button')
            button.innerHTML = `Equip ${weaponlist[i].name}`
           
            button.addEventListener('click', function() {
            });

            weaponry.appendChild(button)
        }
    }
}

function swapPage(page) {
    const pageDisplay = document.getElementById('pageDisplay');
    if (page === 'menu') {
        pageDisplay.innerHTML = `
        <h1>Menu</h1>
        <p>Dito lagay yung character tapos palit palit ng weapons</p>
        <div id ="weaponry"> </div>`
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
        `;
    }
}