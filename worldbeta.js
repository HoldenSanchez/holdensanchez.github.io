var eventcount = 100;
var can = true;
var delay_time = 0;

function main() {
    data = load();

    vis_update();
}

function load() {
    const hellos_stored = parseInt(localStorage.getItem("hellos"));
    if (!isNaN(hellos_stored)) {
        hellos = hellos_stored;
    }
    const autos_stored = parseInt(localStorage.getItem("autos"));
    if (!isNaN(autos_stored)) {
        autos = autos_stored;
    }
    const boosts_stored = parseInt(localStorage.getItem("boosts"));
    if (!isNaN(boosts_stored)) {
        boosts = boosts_stored;
    }
    const delay_stored = parseInt(localStorage.getItem("delay"));
    if(!isNaN(delay_stored)) {
        delay_time = delay_stored;
    }
    
    vis_update()
}

function save() {
    localStorage.setItem("hellos", hellos);
    localStorage.setItem("autos", autos);
    localStorage.setItem("boosts", boosts);
    localStorage.setItem("delay", delay_time);
}

function delete_local() {
    localStorage.removeItem("hellos");
    localStorage.removeItem("autos");
    localStorage.removeItem("boosts");
    localStorage.removeItem("unlocks");
    localStorage.removeItem("delay");
}

function vis_update() {
    document.getElementById("hellos").innerText = "Hellos: " + Math.round(hellos);
    document.getElementById("autoincp").innerText = "Hello, Autos: " + autos;
    document.getElementById("boostincp").innerText = "Hello, Boosts: " + boosts;

    if (delay_time > 0 && can) {
        can = false
        t = setInterval(delay, 1000)
    }
}

function delay () {
    if (delay_time != 0) {
        delay_time -= 1
        document.getElementById("explore").innerText = "Cooldown: " + delay_time
    }
    else {
        document.getElementById("explore").innerText = "Explore";
        can = true
        clearInterval(t)
    }
}

function do_event(number) {
    if (can) {
        if (number <= 90 && number > 30) {
            found = Math.floor(Math.random() * (hellos/3));
            document.getElementById("results").innerText = "Results: Found " + found + " Hellos!";
            hellos += found;
            vis_update()
            localStorage.setItem("hellos", hellos);
        }
        if (number >= 91) {
            stolen = Math.floor(Math.random() * (hellos/2));
            document.getElementById("results").innerText = "Results: Some Burglar Stole " + stolen + " Hellos!";
            hellos -= stolen;
            vis_update();
            localStorage.setItem("hellos", hellos);
        }
        if (number >= 20 && number <= 30){
            
            console.log("Found Key");
        }

        delay_time = 30
        can = false
        t = setInterval(delay, 1000)
    }
}

function explore() {
    eventnumber = Math.floor(Math.random() * eventcount);

    do_event(eventnumber);
}

main()