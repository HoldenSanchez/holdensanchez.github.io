var hellos = 0;
var autos = 0; 
var old_auto = 0;
var boosts = 0; 
var unlocks = 0;
var cap = 0;
var auto_timer = 10000;
var autoOverflow = 1;
var change = true;
var items = [];
var items_displayed = [];

// Main function, has very little in it now but may add more as functions increase

function main() {
    console.log("Messing with console may increase local load times or break game! Use help() to learn about the console commands!");
    
    document.getElementById("game").style.display = "none";

    load();

    autosave = setInterval(save, 30000);

    vis_update();
}

function help() {
    console.log("Do no manually change the value for \"autos\", you need to do purchase(\"auto\", number, false). ");
    console.log("If you do just change the value for autos, it will not give you the benifits. ");
    console.log("Use dev_mode(true) to be able to skip through that");
    console.log("If the value of auto is too high, the browser will crash and you will need to clear cookies!");
}

function dev_mode(enable) {
    if (enable) {
        hellos = 1000000;
        purchase("auto", 100000, false);
        boosts = 200; 
        unlocks = 1;
    } 
    else {
        delete_local();
        document.location.reload();
    }
}

function save() {
    localStorage.setItem("hellos", hellos);
    localStorage.setItem("autos", autos);
    localStorage.setItem("boosts", boosts);
    localStorage.setItem("unlocks", unlocks);
    localStorage.setItem("items", JSON.stringify(items));
}

function load() {
    const hellos_stored = parseInt(localStorage.getItem("hellos"));
    if (!isNaN(hellos_stored))
        hellos = hellos_stored;
    const autos_stored = parseInt(localStorage.getItem("autos"));
    if (!isNaN(autos_stored) && autos != autos_stored)
        purchase("auto", autos_stored, false)
    const boosts_stored = parseInt(localStorage.getItem("boosts"));
    if (!isNaN(boosts_stored))
        boosts = boosts_stored;
    const unlocks_stored = parseInt(localStorage.getItem("unlocks"));
    if (!isNaN(unlocks_stored)) 
        unlocks = unlocks_stored;
    const items_stored = JSON.parse(localStorage.getItem("items"));
    if (items_stored != null)
        items = items_stored
        
    vis_update()
}

function delete_local() {
    localStorage.removeItem("hellos");
    localStorage.removeItem("autos");
    localStorage.removeItem("boosts");
    localStorage.removeItem("unlocks");
    localStorage.removeItem("items");
    localStorage.removeItem("delay");
}

// Enters the main game by calling the other js script

function enterworld() {
    if (hellos >= 10000 && autos >= 1000 && boosts == 200) {
        hellos -= 10000;
        autos -= 1000;
        boosts -= 200;
        unlocks = 1;

        save();

        make_visible("enterworlda");
    }
}

// Allows things to be edited and returned to a "defualt" state after a preset amount of time

function text_defaults(items) {
    document.getElementById(items[0]).innerText = items[1] + items[2];
    clearInterval(a);
    change = true;
}

// Normal incrememnt for the click

function increment() {
    var mod = 0;
    if (items.includes('greetings')) {
        mod += 190;
    }
    hellos += 1 + boosts + mod;

    vis_update();

};

// Seperate function to make it easier to think and allows other features to be added in the future

function auto_increment() {
    var mod = 0;
    if (items.includes('greetings')) {
        mod += 100;
    }
    if (autoOverflow >= 102) {
        autoOverflow = 101;
    }
    hellos += autoOverflow + (1/2 * boosts) + mod;

    vis_update();
}

// Makes things visible/invisible, just to shorten code and make it easier to read

function make_visible(id) {
    document.getElementById(id).classList.remove("shopinvis");
    document.getElementById(id).classList.add("shopvis");
}

function make_invisible(id) {
    document.getElementById(id).classList.remove("shopvis");
    document.getElementById(id).classList.add("shopinvis");
}

// Updates what elements are visible

function vis_update () {

    // Auto incrememnt elements visibility settings

    if (hellos >= 1) {
        document.getElementById("game").style.display = "block";
    }

    if ((hellos >= "20" && !document.getElementById("autoincb1").classList.contains("shopvis")) || autos >= 1) {
        make_visible("autoincb1");
        document.getElementById("autoincb1").classList.add("autoinc");
    }

    if ((hellos >= "200" && !document.getElementById("autoincb10").classList.contains("shopvis")) || autos >= 10) {
        make_visible("autoincb10");
        document.getElementById("autoincb10").classList.add("autoinc");
    }

    if ((hellos >= "2000" && !document.getElementById("autoincb100").classList.contains("shopvis")) || autos >= 100) {
        make_visible("autoincb100");
        document.getElementById("autoincb100").classList.add("autoinc");
    }
    if ((hellos >= "2000" && !document.getElementById("autoincbmax").classList.contains("shopvis")) || autos >= 100) {
        make_visible("autoincbmax");
        document.getElementById("autoincbmax").classList.add("autoinc");
    }

    // Auto increment elements visibility settings

    if (autos >= 1) {
        make_visible("autoincp")
    }

    if ((autos >= "100" && !document.getElementById("boostinc1").classList.contains("shopvis")) || boosts >= 1) {
        make_visible("boostinc1");
        document.getElementById("boostinc1").classList.add("boostinc");
    }

    if ((autos >= "1000" && !document.getElementById("boostinc10").classList.contains("shopvis")) || boosts >= 10) {
        make_visible("boostinc10");
        document.getElementById("boostinc10").classList.add("boostinc");
    }

    if ((autos >= "10000" && !document.getElementById("boostinc100").classList.contains("shopvis")) || boosts >= 100) {
        make_visible("boostinc100");
        document.getElementById("boostinc100").classList.add("boostinc");
    }

    // Boost increment elements visibility settings

    if (boosts >= 1 && unlocks == 0) {
        make_visible("enterworld");
    }

    if (unlocks == 1) {
        make_invisible("enterworld");
    }

    if (boosts >= 1 && !document.getElementById("boostincp").classList.contains("shopvis")) {
        make_visible("boostincp");
    }

    // Loads world tab

    if (unlocks >= 1) {
        make_visible("enterworld");
    }

    // Updates for inventory

    if (items.length != 0) {
        if (document.getElementById("have").classList.contains("shopinvis"))
            make_visible("have");
        for (i = 0; i < items.length; i++)
        {   
            if (!items_displayed.includes(items[i])) {
                items_displayed.push(items[i])
                let modified = items[i][0].toUpperCase() + items[i].slice(1);
                let text = document.createElement("p");
                text.innerText = modified;
                text.classList.add("have");
                text.classList.add("shopvis");
                document.getElementById("inventory").appendChild(text);
            }
        }
    }
    else
        make_invisible("have");

    // Updates elements that display how much of each "currency" you have

    document.getElementById("hellos").innerText = "Hellos: " + Math.round(hellos);
    document.getElementById("autoincp").innerText = "Hello, Autos: " + autos;
    document.getElementById("boostincp").innerText = "Hello, Boosts: " + boosts;
}

/* This is seperate to make it so that when we spend autos
   it also decreases the autoOverflow and the auto_timer just as if it */

function auto_decline (times) {
    for (i = 0; i < times; i++) {
        if (autos > 68 && autos <= 169) {
            autoOverflow -= 1
        }
        else if (autos <= 68) {
            auto_timer = 10000 + (1000 * ((-1/500 * (autos ** 2))))
            clearInterval(t);
            t = setInterval(auto_increment, auto_timer);
        }
        else if (autos == 0) {
            clearInterval(t)
        }
        autos--;
    } 
}

// General function for buying "currencies"

function purchase(item, times, spend) {
    if (items.includes("jar"))
        cap = 100
    if (times == "max" && item == "auto" && hellos >= 20) {
        let max_buy = hellos/20
        for (i = 0; i < max_buy; i++) {
            if (spend) {
                hellos -= 20;
            }

            if (hellos < 0) {
                console.log("Broke")
                hellos += 20;
                break;
            }

            autos += 1;
            
            if (autos == 1) {
                t = setInterval(auto_increment, auto_timer);
                autoOverflow = 1
            }

            else if (autos > 1 && auto_timer >= 1000) {
                if (auto_timer > 1000){ 
                    auto_timer = 10000 + (1000 * ((-1/500 * (autos ** 2))));
                    old_auto = autos
                }
                if(typeof t !== 'undefined') {
                    clearInterval(t);
                }
                t = setInterval(auto_increment, auto_timer);
                if (auto_timer <= 1000) {
                    autoOverflow = autos - old_auto + 1
                }
            }

            if(auto_timer < 1000) {
                console.log("1000 at: " + autos)
                auto_timer = 1000;
                clearInterval(t);
                t = setInterval(auto_increment, auto_timer);
            }
        }
    }
    else if (times == "max" && items == "boost" && autos >= 100 && boosts < 200 + cap) {
        timespayed = 0;
        let max_buy = autos/100

        for (i = 0; i < max_buy && boosts < 200 + cap; i++) {
            if (autos < 0)
            {
                console.log("Broke");
                break;
            }
            boosts += 1;
            if (spend) {
                timespayed++;
            }
        }

        auto_decline(100 * timespayed);
    }
    else if (item == "auto" && (!spend || hellos >= times * 20)) {
        for (i = 0; i < times; i++) {
            autos += 1;
            if (spend) {
                hellos -= 20;
            }
            if (i < 200) {
                if (autos == 1) {
                    t = setInterval(auto_increment, auto_timer);
                    autoOverflow = 1
                }

                else if (autos > 1 && auto_timer >= 1000) {
                    if (auto_timer > 1000){ 
                        auto_timer = 10000 + (1000 * ((-1/500 * (autos ** 2))));
                        old_auto = autos
                    }
                    if(typeof t !== 'undefined') {
                        clearInterval(t);
                    }
                    t = setInterval(auto_increment, auto_timer);
                    if (auto_timer <= 1000) {
                        autoOverflow = autos - old_auto + 1
                    }
                }

                if(auto_timer < 1000) {
                    console.log("1000 at: " + autos)
                    auto_timer = 1000;
                    clearInterval(t);
                    t = setInterval(auto_increment, auto_timer);
                }
            }
        }
    }

    else if (item == "boost" && autos >= 100 * times && change) {

        console.log("Works");

        timespayed = 0;

        for (i = 0; i < times && boosts < 200 + cap; i++) {
            boosts += 1;
            if (spend) {
                timespayed++;
            }
        }

        auto_decline(100 * timespayed);
    }

    else if (item == "auto" && change && times != "max") {
        change = false;
        document.getElementById("autoincb" + times).innerText = "Cant Afford!";
        a = setInterval(text_defaults, 3000, ["autoincb" + times, "Hello, Auto x"+ times + "! ",  
                                                                    "(" + 20 * times + " Hellos)"]); 
    }

    else if (item == "boost" && change && times != "max") {
        change = false;
        document.getElementById("boostinc" + times).innerText = "Cant Afford!";
        a = setInterval(text_defaults, 3000, ["boostinc" + times, "Hello, Boost x"+ times + "! ",  
                                                                    "(" + 100 * times + " Autos)"]); 
    }

    vis_update()
}

main();