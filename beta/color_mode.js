var head;
var link;
var color_mode = "light";

function load() {
    const color_mode_stored = localStorage.getItem("color_mode");
    if (color_mode_stored != undefined)
        color_mode = color_mode_stored;
    else
        color_mode = "light";
    draw();
}

function delete_local_color() {
    localStorage.removeItem("color_mode");
}

function draw () {
    head = document.getElementsByName("head")[0];
    link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";

    if (head.classList.contains("in_folder")){
        switch (color_mode){
            case 'dark':
                link.href = "../dark_mode.css";
                break;
            case 'light':
                link.href = "../light_mode.css";
                break;
        }
    }
    else {
        switch (color_mode){
            case 'dark':
                link.href = "dark_mode.css";
                break;
            case 'light':
                link.href = "light_mode.css";
                break;
        }
    }

    head.appendChild(link);

}

function color_change () {

    if (color_mode == 'light'){
        color_mode = 'dark';
    }
    else {
        color_mode = 'light';
    }

    localStorage.setItem("color_mode", color_mode);

    document.location.reload();
}

load();