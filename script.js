let courses_list = document.querySelector(".courses_ul");
let current_query = " ";

const fetchCourses = async () => {
    let response = await fetch("http://localhost:3000/courses");
    let json = await response.json();
    return json;
};

fetchCourses().then((x) => {
    x.forEach(addCourse);
});


function new_carousel_item(){
    let row = document.createElement("div");
    row.classList.add("row","w-100");
    let carousel_item = document.createElement("div");
    carousel_item.classList.add("carousel-item");
    carousel_item.appendChild(row);
    return carousel_item;
}
let carousel_item = new_carousel_item();
carousel_item.classList.add("active");

function addCourse(item) {

    let course = document.createElement("div");
    let course_img = document.createElement("img");
    let course_title = document.createElement("h4");
    let course_author = document.createElement("h4");
    let rating = document.createElement("div");
    let course_price = document.createElement("h4");
    let course_old_price = document.createElement("h4");

    course.classList.add("course");
    course_img.setAttribute("src", item.image);
    course_title.classList.add("title");
    course_author.classList.add("author");
    rating.classList.add("rating");
    course_price.classList.add("price","h5");
    course_old_price.classList.add("old_price");

    course_title.textContent = item.title;
    course_author.textContent = item.author;
    course_price.textContent = "E£" + item.price;
    course_old_price.textContent = "E£" + item.old_price;

    for (let i = 0; i < item.rating; i++) {
        let star = document.createElement("span");
        star.classList.add("fa", "fa-star", "checked");
        rating.appendChild(star);
    }

    for (let i = item.rating; i < 5; i++) {
        let star = document.createElement("span");
        star.classList.add("fa", "fa-star");
        rating.appendChild(star);
    }

    course.appendChild(course_img);
    course.appendChild(course_title);
    course.appendChild(course_author);
    course.appendChild(rating);
    course.appendChild(course_price);
    course.appendChild(course_old_price);
    

    if(item.title.toLowerCase().search(current_query.toLowerCase()) != -1){
        if(carousel_item.firstChild.childElementCount == 4){
            carousel_item = new_carousel_item();
        }
        carousel_item.firstChild.appendChild(course);
        courses_list.appendChild(carousel_item);
    }
}


function search() {
    let query = document.getElementById("search_query").value;
    carousel_item = new_carousel_item();
    carousel_item.classList.add("active");
    console.log("query :>> ", query);
    current_query = query;

    fetchCourses().then((x) => {
        courses_list.innerHTML = "";
        x.forEach(addCourse);
    });
}

function cat_search(Query,id){
    let element = document.getElementById(id);
    carousel_item = new_carousel_item();
    carousel_item.classList.add("active");

    element.parentNode.childNodes.forEach((child)=>{
        if(child.nodeName === 'LI'){
            child.classList.remove("active");
        }
    });
    element.classList.add("active");
    

    let query = Query;
    console.log("query :>> ", query);
    current_query = query;

    fetchCourses().then((x) => {
        courses_list.innerHTML = "";
        x.forEach(addCourse);
    });
}


let cats = document.querySelector(".cat_row");
function addCategories(item){
    let card = document.createElement("div");
    card.classList.add("card","cat_card","border-0","mb-3");
    card.classList.add("col","col-lg-3","col-md-4","col-sm-12");

    let img_div = document.createElement("div");
    img_div.classList.add("card-img-top");

    let img = document.createElement("img");
    img.setAttribute("src",item.image);

    img_div.appendChild(img);

    let title = document.createElement("div");
    title.classList.add("fw-bold");
    title.textContent = item.title;

    card.appendChild(img_div);
    card.appendChild(title);

    cats.appendChild(card);
}

const fetchCats = async () => {
    let response = await fetch("http://localhost:3000/categories");
    let json = await response.json();
    return json;
};

fetchCats().then((x) => {
    x.forEach(addCategories);
});