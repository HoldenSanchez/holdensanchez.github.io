var hellos = 0;
var autos = 0;
var old_auto = 0;
var auto_timer = 10000;
var autoOverflow = 1;
var boosts = 0;
var change = true;

// Main function, has very little in it now but may add more as functions increase

function main() {
    document.getElementById("game").style.display = "none";
}

// Enters the main game by calling the other js script

function enterworld() {
    if (hellos >= 10000 && autos >= 1000 && boosts == 200) {
        hellos -= 10000;
        autos -= 1000;
        boosts -= 200;

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
    hellos += 1 + boosts;

    if (hellos == 1) {
        document.getElementById("game").style.display = "block";
    }

    vis_update();

};

// Seperate function to make it easier to think and allows other features to be added in the future

function auto_increment() {
    if (autoOverflow >= 102) {
        autoOverflow = 101
    }
    hellos += autoOverflow + (1/2 * boosts);

    vis_update();
}

// Makes things visivle, just to shorten code and make it easier to read

function make_visible(id) {
    document.getElementById(id).classList.remove("shopinvis");
    document.getElementById(id).classList.add("shopvis");
}

// Updates what elements are visible

function vis_update () {

    // Auto incrememnt elements visibility settings

    if (hellos >= "30" && !document.getElementById("autoincb").classList.contains("shopvis")) {
        make_visible("autoincb");
        document.getElementById("autoincb").classList.add("autoinc");
    }

    if (hellos >= "300" && !document.getElementById("autoincb10").classList.contains("shopvis")) {
        make_visible("autoincb10");
        document.getElementById("autoincb10").classList.add("autoinc");
    }

    if (hellos >= "3000" && !document.getElementById("autoincb100").classList.contains("shopvis")) {
        make_visible("autoincb100");
        document.getElementById("autoincb100").classList.add("autoinc");
    }

    // Boost inrement elements visibility settings

    if (autos >= "100" && !document.getElementById("boostinc1").classList.contains("shopvis")) {
        make_visible("boostinc1");
        document.getElementById("boostinc1").classList.add("boostinc");
    }

    if (autos >= "1000" && !document.getElementById("boostinc10").classList.contains("shopvis")) {
        make_visible("boostinc10");
        document.getElementById("boostinc10").classList.add("boostinc");
    }

    if (autos >= "10000" && !document.getElementById("boostinc100").classList.contains("shopvis")) {
        make_visible("boostinc100");
        document.getElementById("boostinc100").classList.add("boostinc");
    }

    if (boosts >= 1) {
        make_visible("enterworld");
    }

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
            console.log("Ran")
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

function purchase(item, times) {
    console.log("Clicked with arg: " + item + ", " + times)
    if (item == "auto" && hellos >= times * 30) {

        if (autos == 0) {
            make_visible("autoincp")
        }
        for (i = 0; i < times; i++) {
            autos += 1;
            hellos -= 30;
            
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

    else if (item == "boost" && autos >= 100 * times && change) {

        timespayed = 0;

        for (i = 0; i < times && boosts < 200; i++) {
            boosts += 1;
            timespayed++;
        }

        auto_decline(100 * timespayed);

        if (boosts >= 200) {
            change = false;
            console.log("working");
            document.getElementById("boostinc" + times).innerText = "Maxed";
            a = setInterval(text_defaults, 5000, ["boostinc" + times, "Hello, Boost x"+ times + "! ",  
                                                                    "(" + 100 * times + " Autos)"]); 
        }
        if (boosts >= 0 && !document.getElementById("boostincp").classList.contains("shopvis")) {
            make_visible("boostincp");
        }
    }

    vis_update()
}

main();