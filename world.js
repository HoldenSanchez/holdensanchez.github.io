function main() {
    data = load()

    vis_update()
}

function load() {
    const hellos_stored = parseInt(localStorage.getItem("hellos"));
    if (!isNaN(hellos_stored)) {
        hellos = hellos_stored;
    }
    const autos_stored = parseInt(localStorage.getItem("autos"));
    if (!isNaN(autos_stored)) {
        autos = autos_stored
    }
    const boosts_stored = parseInt(localStorage.getItem("boosts"));
    if (!isNaN(boosts_stored)) {
        boosts = boosts_stored;
    }
    const unlocks_stored = parseInt(localStorage.getItem("unlocks"));
    if (!isNaN(unlocks_stored)) {
        unlocks = unlocks_stored;
    }
    
    vis_update()
}

function vis_update() {
    document.getElementById("hellos").innerText = "Hellos: " + Math.round(hellos);
    document.getElementById("autoincp").innerText = "Hello, Autos: " + autos;
    document.getElementById("boostincp").innerText = "Hello, Boosts: " + boosts;
}

function explore() {
    
}

main()