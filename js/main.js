//-----------------------------------DATE-----------------------------------------------------------
function date() {
    let today = new Date(),
        day = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear();

    if (day < 10) {
        day = '0' + day
    }

    if (month < 10) {
        month = '0' + month
    }

    today = year + '-' + month + '-' + day;

    document.getElementById("datereserve").value = today;

    document.getElementById("datereserve").min = today;
}
date();

//-----------------------------------NIGHTS---------------------------------------------------------



//-----------Constructor-------------

function createPopoverNight() {

    let popoverroom = document.getElementById("roompopover");
    popoverroom.remove();
    popoverroom.classList.remove("d-none");
   let container=$("#container-room");
    container.popover({
        placement: "bottom",
        content:popoverroom ,
        html: true
    })
    container.on('hide.bs.popover',placeholder);
    
}

//-----------------------------------ROOMS----------------------------------------------------------

document.getElementById("addroom").addEventListener("click", addRoom);
document.getElementById("donebutton").addEventListener("click", closepopover);
placeholder();
addRoom();
createPopoverRoom();

//-----------Constructor-------------


function createPopoverRoom() {

    let popoverroom = document.getElementById("roompopover");
    popoverroom.remove();
    popoverroom.classList.remove("d-none");
   let container=$("#container-room");
    container.popover({
        placement: "bottom",
        content:popoverroom ,
        html: true
    })
    container.on('hide.bs.popover',placeholder);
    
}

function createRoom(addremovebutton) {

    let room = document.createElement("div"),
        title = document.createElement("div"),
        adult = document.createElement("div"),
        children = document.createElement("div"),
        ageschild = document.createElement("div"),
        adultselect = createSelect([1, 2, 3, 4]),
        childrenselect = createSelect([0, 1, 2, 3, 4]),
        adultlabel = document.createElement("label"),
        childrenlabel = document.createElement("label");

    //---------------------------------------------------------
    room.classList.add("room");
    title.classList.add("title");
    adult.classList.add("adult");
    children.classList.add("children");
    ageschild.classList.add("ageschild");
    adultlabel.textContent = "Adultos";
    childrenlabel.textContent = "Niños";
    childrenselect.addEventListener("change", updateAgesSelects);
    /* childrenselect.addEventListener("change", placeholder);
    adultselect.addEventListener("change", placeholder); */

    if (addremovebutton) {
        let removeroom = document.createElement("div");
        removeroom.innerHTML = '<i class="fas fa-times"></i>';
        removeroom.addEventListener("click", deleteRoom);
        room.append(removeroom);
    }
    adult.append(adultlabel, adultselect);
    children.append(childrenlabel, childrenselect);
    room.append(title, adult, children, ageschild);

    return room;
}

function createSelect(options) {
    let select = document.createElement("select");

    options.forEach(option => {
        let opt = document.createElement("option");

        opt.value = option;

        opt.textContent = option;

        select.appendChild(opt);

    });
    return select;
}

//----------------Room------------------------------------

function addRoom() {
    let numrom = document.querySelectorAll(".room").length;
    let room = createRoom(numrom >= 1);
    document.getElementById("buttons").before(room);
    updateRoomTitle(room,numrom);
    /* placeholder() */


}

function deleteRoom(event) {

    let room = event.target.closest(".room");
    room.remove();
    document.querySelectorAll(".room").forEach(updateRoomTitle);//El foreach le pasa los dos parametros
    /* placeholder(); */

}

function updateAgesSelects(event) {

    let select = event.target;
    let ageschild = select.closest(".room").querySelector(".ageschild");
    let numchild = parseInt(select.value);

    ageschild.querySelectorAll("select").forEach(element => element.remove());
    for (let cont = 0; cont < numchild; cont++) {

        let ages = createSelect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
        ageschild.append(ages);

    }

}

function updateRoomTitle(room,roomindex){

    room.querySelector(".title").textContent=`${roomindex+1} Habitación`;

}

function placeholder(){
    let rooms=document.querySelectorAll(".room");
    let numrooms=rooms.length;
    let numperson=0;

    rooms.forEach(room=>{
        numperson += parseInt(room.querySelector(".adult select").value);
        numperson += parseInt(room.querySelector(".children select").value);
    })
    document.getElementById("placeholder").value=`${numrooms} rooms & ${numperson} guest`
}

function closepopover(){
    $("#container-room").popover('hide');

    
}
