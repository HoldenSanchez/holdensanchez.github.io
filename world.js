var eventcount = 200;
var can = true;
var delay_time = 0;
var items = [];
var dev_delay = 30;
var bot_delay = 20;
var search;

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
    const items_stored = JSON.parse(localStorage.getItem("items"));
    if (items_stored != null)
        items = items_stored
    
    vis_update()
}

function make_visible(id) {
    document.getElementById(id).classList.remove("shopinvis");
    document.getElementById(id).classList.add("shopvis");
}

function make_invisible(id) {
    document.getElementById(id).classList.remove("shopvis");
    document.getElementById(id).classList.add("shopinvis");
}

function save() {
    localStorage.setItem("hellos", hellos);
    localStorage.setItem("autos", autos);
    localStorage.setItem("boosts", boosts);
    localStorage.setItem("delay", delay_time);
    localStorage.setItem("items", JSON.stringify(items));
}

function delete_local() {
    localStorage.removeItem("hellos");
    localStorage.removeItem("autos");
    localStorage.removeItem("boosts");
    localStorage.removeItem("unlocks");
    localStorage.removeItem("items");
    localStorage.removeItem("delay");
}

function vis_update() {

    if (items.includes("robot") && search == undefined) {
        search = setInterval(explore_bot, 1000);
        make_visible("bot_results")
        make_visible("bot_timer")
    }

    document.getElementById("hellos").innerText = "Hellos: " + Math.round(hellos);
    document.getElementById("autoincp").innerText = "Hello, Autos: " + autos;
    document.getElementById("boostincp").innerText = "Hello, Boosts: " + boosts;

    if (delay_time > 0 && can) {
        can = false;
        t = setInterval(delay, 1000);
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

function do_event(number, can_overide) {
    if (can_overide) {
        console.log(number)
        document.getElementById("bot_results").innerText = "Bot Last Found: Nothing!";
        if (number > 100) {
            found = Math.floor(Math.random() * (hellos/3));
            document.getElementById("bot_results").innerText = "Bot Last Found: " + found + " Hellos!";
            hellos += found;
            vis_update()
            localStorage.setItem("hellos", hellos);
        }
        if (number >= 70 && number <= 90 && !items.includes("greetings")){
            items.push("greetings");
            document.getElementById("bot_results").innerText = "Bot Last Found: Some Greetings!";
        }
        if (number >= 20 && number < 40 && !items.includes("jar")) {
            items.push("jar");
            document.getElementById("bot_results").innerText = "Bot Last Found: A Jar Labeled \"For Boosts\"!";
        }
        if (number < 10 && number != 2 && !items.includes("world key")) {
            items.push("world key");
            document.getElementById("bot_results").innerText = "Bot Last Found: The World Key!";
        }
        if (number == 2 && !items.includes("dev stone")) {
            items.push("dev stone");
            document.getElementById("bot_results").innerText = "Bot Last Found: ... A Rock!";
        }
    }

    else if (can) {
        console.log(number)
        document.getElementById("results").innerText = "Results: You Found Nothing!";
        if (number < 190 && number > 100) {
            found = Math.floor(Math.random() * (hellos/3));
            document.getElementById("results").innerText = "Results: Found " + found + " Hellos!";
            hellos += found;
            vis_update()
            localStorage.setItem("hellos", hellos);
        }
        if (number >= 190) {
            stolen = Math.floor(Math.random() * (hellos/2));
            document.getElementById("results").innerText = "Results: Some Burglar Stole " + stolen + " Hellos!";
            hellos -= stolen;
            vis_update();
            localStorage.setItem("hellos", hellos);
        }
        if (number >= 70 && number <= 90 && !items.includes("greetings")){
            items.push("greetings");
            document.getElementById("results").innerText = "Results: You Found Some Greetings!";
        }
        if (number >= 20 && number < 40 && !items.includes("jar")) {
            items.push("jar");
            document.getElementById("results").innerText = "Results: You Found A Jar Labeled \"For Boosts\"!";
        }
        if (number < 10 && number != 2 && !items.includes("world key")) {
            items.push("world key");
            document.getElementById("results").innerText = "Results: You Found The World Key!";
        }
        if (number == 2 && !items.includes("dev stone")) {
            items.push("dev stone");
            document.getElementById("results").innerText = "Results: You Found... A Rock!";
        }
        if (number >= 40 && number < 70 && !items.includes("robot")) {
            items.push("robot");
            document.getElementById("results").innerText = "Results: You Found An Explore Bot!";
        }

        delay_time = dev_delay;
        can = false;
        t = setInterval(delay, 1000)
    }
}

function explore() {
    eventnumber = Math.floor(Math.random() * eventcount);

    do_event(eventnumber, false);
}

function explore_bot() {
    if (bot_delay == 0) {
        eventnumber = Math.floor(Math.random() * eventcount);
        do_event(eventnumber, true);
        bot_delay = 20
    }
    else {
        bot_delay--;
        document.getElementById("bot_timer").innerText = "Exploring In: " + bot_delay;
    }
}

main()