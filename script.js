// The background
let num_stars = 1000;

function random_between(min,max){
    let random_x=Math.round((Math.random()*(max-min)+min));
    return(random_x);
}

function background_stars(){
    let y = window.innerWidth;
    let x = window.innerHeight;
    for (let i = 0; i < num_stars; i++) {
        let star = document.createElement("div");
        star.className = "star";
        star.style.top = random_between(0,x) + "px";
        star.style.left = random_between(0,y) + "px";
        star.style.width = random_between(1,3) + "px";
        star.style.height = random_between(1,3) + "px";
        star.style.zIndex = random_between(-1,1);
        switch (random_between(0,4)){
            case 0:
                star.style.animation = "appear " + random_between(30,60) + "s linear 0s infinite alternate forwards running";
                break;
            case 1:
                star.style.animation = "right_left " + random_between(30,60) + "s linear 0s infinite normal forwards running";
                break;
            case 2:
                star.style.animation = "up_down " + random_between(30,60) + "s linear 0s infinite reverse forwards running";
                break;
            case 3:
                star.style.animation = "up_down " + random_between(30,60) + "s linear 0s infinite normal forwards running";
                break;
            case 4:
                star.style.animation = "right_left " + random_between(30,60) + "s linear 0s infinite reverse forwards running";
                break;
        }
        document.getElementsByClassName("stars_background")[0].append(star);
    }
}
// The timer
function add_0(x, milisec){
    if (x<10){
        x = '0' + x;
    }else if (milisec){
        if (x<100){
            x = '0' + x;
        }
    }
    return(x);
}

function like_00_(x,milisec){
    if (!milisec){
        x = x%60;
        x = add_0(x);
    }else{
        x = x%100;
        x = add_0(x,true);
    }
    return(x);
}

function time(){
    let milisec = parseInt(document.getElementById("milisec").innerHTML);
    let sec = parseInt(document.getElementById("sec").innerHTML);
    let min = parseInt(document.getElementById("min").innerHTML);
    let hour = parseInt(document.getElementById("hour").innerHTML);
    milisec++;
    if (milisec == 100){
        sec++;
        if (sec == 60){
            min++;
            if(min == 60){
                hour++;
            }
        }
    }
    milisec = like_00_(milisec,true);
    sec = like_00_(sec);
    min = like_00_(min);
    hour = add_0(hour);
    document.getElementById("milisec").innerHTML = milisec;
    document.getElementById("sec").innerHTML = sec;
    document.getElementById("min").innerHTML = min;
    document.getElementById("hour").innerHTML = hour;
}
//The click zone

let click_value = 1;
let click_auto= 0;

function click_animation(_reset_){
    let death_star = document.getElementById("death_star");
    if (_reset_){
        death_star.style.animation = "null";
    }else{
        death_star.style.animation = "pulsate linear 0.1s 1 normal both running";
    }
}

function click_able(auto){
    let total = parseInt(document.getElementById("total_gain").innerHTML);
    if (!auto){
        total += click_value;
        click_animation();
        setTimeout( () => click_animation(true), 0.1);
    }else{
        total += click_auto;
    }
    document.getElementById("total_gain").innerHTML = total;
    check_price();
}
//The upgrade zone
let price_upgrade = 10;

function id_gen(){
    let id = document.getElementById("milisec").innerHTML 
            + document.getElementById("sec").innerHTML 
            + document.getElementById("min").innerHTML 
            + document.getElementById("hour").innerHTML;
    return(id);
}

function random_helmet(){
    let helmet = random_between(0,100);
    let result;
    if (helmet <= 42){
        result = ["Images/stormtrooper.png", 0];
    }else if ((42 < helmet) && (helmet < 84)){
        result = ["Images/imperial_guard.png", 1];
    }else if ((84 <= helmet) && (helmet < 98)){
        result = ["Images/darth_vader.png", 2];
    }else{
        result = ["Images/emperor_palpatine.png", 3];
    }
    return(result);
}

function generate_update_icon(_id_){
    let parent_0 = document.getElementsByClassName("update")[0];
    let parent_1 = document.createElement("div");
    let img = document.createElement("img");
    let description = document.createElement("p");
    let helmet = random_helmet();
    parent_1.id = (_id_ + "_div");
    parent_1.className = "tooltip";
    img.id= _id_;
    img.className = "update_icon";
    img.src = helmet[0];
    img.style.cursor = 'pointer';
    description.className = "tooltiptext";
    switch (helmet[1]){
        case 0:
            img.classList.add("1");
            img.classList.add("0");
            img.classList.add(price_upgrade);
            description.innerHTML = "<strong>Stromtrooper</strong><br/>The assault trrops of the <strong>Galctic Empire</strong>.<br/>Gain : +1 click value<br/>Price : " + price_upgrade + " credits.";
            break;
        case 1:
            img.classList.add("0");
            img.classList.add("1");
            img.classList.add(price_upgrade);
            description.innerHTML = "<strong>Imperia Guard</strong><br/>The force of elite warriors who serve the <strong>Sith Emperor</strong> as his personal protectors and enforces.<br/>Gain : +1 auto click value<br/>Price : " + price_upgrade + " credits.";
            break;
        case 2:
            img.classList.add("7");
            img.classList.add("7");
            img.classList.add(price_upgrade);
            description.innerHTML = "<strong>Darth Vader</strong><br/>Sith Lord an apprentice of Emperor Darth Sidious.<br/>Gain :<br/>+7 click value<br/>+7 auto click value<br/>Price<br/>" + price_upgrade + " credits";
            break;
        case 3:
            img.classList.add("14");
            img.classList.add("14");
            img.classList.add(price_upgrade);
            description.innerHTML = "<strong>Emperor of the Gactic Empire</strong><br/>Gain :<br/>+14 click value<br/>+14 auto click value<br/>Price<br/>" + price_upgrade + " credits";
            break;
    }
    price_upgrade = Math.round( price_upgrade * 1.5);
    parent_0.appendChild(parent_1);
    parent_1.appendChild(img);
    parent_1.appendChild(description);
}

function generate_icons(number){
    for (let iter=0;iter<number;iter++){
        generate_update_icon(iter);
    }
}

function use_upgrade(cible){
    let id = cible.srcElement.id;
    let update = cible.srcElement.classList;
    let total = parseInt(document.getElementById("total_gain").innerHTML);
    parent = document.getElementById(id + "_div");
    if (update.length == 4){
        click_value += parseInt(update[1]);
        click_auto += parseInt(update[2]);
        total -= parseInt(update[3]);
    }else{
        click_value += parseInt(update[1]);
        click_auto += parseInt(update[1]);
        total -= parseInt(update[2]);
    }
    document.getElementById("click").innerHTML = click_auto;
    document.getElementById("total_gain").innerHTML = total;
    cible.target.remove();
    parent.remove();
    generate_update_icon(id_gen());
    check_price();
}

function check_price(){
    let items = document.getElementsByClassName("update_icon");
    let total = parseInt(document.getElementById("total_gain").innerHTML);
    for (let i = 0; i < items.length; i++){
        let price = items[i].classList;
        let id = items[i].id;
        switch (price.length){
            case 4:
                if (price[3] <= total){
                   items[i].style.opacity = "1";
                   document.getElementById(id).addEventListener('click',use_upgrade);
                }else{
                    items[i].style.opacity = "0.4";
                }
                break;
            case 3:
                if (price[2] <= total){
                   items[i].style.opacity = "1";
                   document.getElementById(id).addEventListener('click',use_upgrade);
                }else{
                    items[i].style.opacity = "0.4";
                }
                break;
        }
    }
}

function initial(){
    setInterval(time,1);
    background_stars();
    generate_icons(4);
    check_price();
    setInterval(() => click_able(true),1000);
    document.getElementById("death_star").addEventListener('click',() => click_able());
}