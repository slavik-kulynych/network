var mypage = 1;
var importpagecount = 1;
function paginationjs(page_number_click, active_page_number, id_element_click, id_element_active, pagecount) {
    console.log("start paginationjs");
    importpagecount = pagecount;
    active_page_number = active_page_number;
    id_element_active = id_element_active;
    let  p = page_number_click;
    //document.querySelector('h1').innerHTML = p;
    //document.querySelector('h2').innerHTML = active_page_number;
    //document.querySelector('h3').innerHTML = id_element_click;
    //document.querySelector('h4').innerHTML = id_element_active;
    console.log(`active_page_number=${active_page_number}, ${typeof active_page_number}`);
    let classprevious = document.querySelector('#previous');
    let classnext = document.querySelector('#next');
    let class_element_click = document.querySelector(`#${id_element_click}`);
    let class_element_active = document.querySelector(`#${id_element_active}`);
    
    if (active_page_number != p && p != "Next" && p != "Previous" && active_page_number != "0") {
        class_element_active.classList.remove("active");
        class_element_click.classList.add("active");
        active_page_number = p;
        mypage = p;
    } else  if (active_page_number == "0") {
        console.log("active ====================== 0");
        document.querySelector(`.active`).classList.remove("active");
        document.querySelector(`#pageleft`).classList.add("active");
        mypage = 1;
        
    }

    if (active_page_number != 1 && active_page_number != 0) {    
        classprevious.classList.remove("disabled");
    } else {
        classprevious.classList.add("disabled");
    }

    console.log(`mypage=pegecount(${mypage}:${importpagecount})`);

    if (mypage == importpagecount && active_page_number != 0) {    
        classnext.classList.add("disabled");
    } else {
        classnext.classList.remove("disabled");
        document.querySelector('#pagemiddle').classList.remove("disabled");
    }

    if (p == "Next" && active_page_number != importpagecount) {
        NextPage(active_page_number, id_element_active);
    } else if (p == "Previous" && active_page_number != 1) {
        PreviousPage(active_page_number, id_element_active);
    }
}
//----------------------------------------------------------------
function NextPage(active_page_number, id_element_active) {
    console.log("start NextPage");
    let current_active = active_page_number;
    let current_id = id_element_active;
    console.log(current_active, current_id);
    let next_active = parseInt(current_active, 10);
    next_active++;
    console.log(next_active);
    mypage = next_active;

    if (current_id == "pageleft") {
        console.log("start if next page left");
        let next_id_element_click = "pagemiddle";
        paginationjs(next_active, active_page_number, next_id_element_click, current_id, importpagecount);
    } else if (current_id == "pagemiddle") {
        console.log("start if next page middle");
        let next_id_element_click = "pageright";
        paginationjs(next_active, active_page_number, next_id_element_click, current_id, importpagecount);
    } else {
        console.log("start if next pageright");
        let next_id_element_click = "pageright";
        let pageleft = document.querySelector('#pageleft').innerText;
        let pagemiddle = document.querySelector('#pagemiddle').innerText;
        let pageright = document.querySelector('#pageright').innerText;
        console.log(`${pageleft}|${pagemiddle}|${pageright}`);
        let next_pageleft = parseInt(pageleft, 10);
        next_pageleft++;
        let next_pagemiddle = parseInt(pagemiddle, 10);
        next_pagemiddle++;
        let next_pageright = parseInt(pageright, 10);
        next_pageright++;
        console.log(`${next_pageleft}|${next_pagemiddle}|${next_pageright}`);
        document.querySelector('#pageleft>.page-link').innerText = next_pageleft;
        document.querySelector('#pagemiddle>.page-link').innerText = next_pagemiddle;
        document.querySelector('#pageright>.page-link').innerText = next_pageright;
        paginationjs(next_active, active_page_number, next_id_element_click, current_id, importpagecount);
        //
    }
    active_page_number = next_active;
}
//----------------------------------------------------------------
function PreviousPage(active_page_number, id_element_active) {
    console.log("start PreviousPage");
    let current_active = active_page_number;
    let current_id = id_element_active;
    console.log(current_active, current_id);
    let next_active = parseInt(current_active, 10);
    next_active--;
    console.log(next_active);
    mypage = next_active;

    if (current_id == "pageright") {
        console.log("start if  previous page right");
        let next_id_element_click = "pagemiddle";
        paginationjs(next_active, active_page_number, next_id_element_click, current_id, importpagecount);
    } else if (current_id == "pagemiddle") {
        console.log("start if previous page middle");
        let next_id_element_click = "pageleft";
        paginationjs(next_active, active_page_number, next_id_element_click, current_id, importpagecount);
    } else {
        console.log("start if previous pageleft");
        let next_id_element_click = "pageleft";
        let pageleft = document.querySelector('#pageleft').innerText;
        let pagemiddle = document.querySelector('#pagemiddle').innerText;
        let pageright = document.querySelector('#pageright').innerText;
        console.log(`${pageleft}|${pagemiddle}|${pageright}`);
        let next_pageleft = parseInt(pageleft, 10);
        next_pageleft--;
        let next_pagemiddle = parseInt(pagemiddle, 10);
        next_pagemiddle--;
        let next_pageright = parseInt(pageright, 10);
        next_pageright--;
        console.log(`${next_pageleft}|${next_pagemiddle}|${next_pageright}`);
        document.querySelector('#pageleft>.page-link').innerText = next_pageleft;
        document.querySelector('#pagemiddle>.page-link').innerText = next_pagemiddle;
        document.querySelector('#pageright>.page-link').innerText = next_pageright;
        paginationjs(next_active, active_page_number, next_id_element_click, current_id, importpagecount);
        //
    }
    active_page_number = next_active;
}

//----------------------------------------------------------------
export {paginationjs, mypage};