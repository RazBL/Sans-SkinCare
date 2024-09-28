"use sctrict";

let dropdownMenu = qs(".responsive-menu");
let darkenMode = qs(".darken-mode");
let closeMiniCart = qs(".close-minicart");
let cartDarkenMode = qs(".darken-website");
let burgerOpen = qs(".openResponsive");
let burgerClose = qs(".closeResponsive");
let searchBarIcon = qs(".search-bar-label");
let currentProductSlide = 0;


searchBarIcon.addEventListener("click", toggleSearchDropDown);

cartDarkenMode.addEventListener("click", () => {
    cartDarkenMode.classList.add("hidden");
    qs(".shopping-cart-side").classList.add("moved-out-cart")
})

closeMiniCart.addEventListener("click", () => {
    qs(".shopping-cart-side").classList.add("moved-out-cart")
    qs(".darken-website").classList.add("hidden");
})

burgerOpen.addEventListener("click", burgerMenuOpenAndClose);
burgerClose.addEventListener("click", burgerMenuOpenAndClose);


// get all addToBag-buttons
let addToBagButtons = qsa(".add-to-bag-button");

// addEventlistener to all addToBag-buttons
addToBagButtons.forEach(button => {
    button.addEventListener("click", addItemToCart)
})

// TODO: use local storage for permanent shopping cart
if (window.sessionStorage.getItem("cart")) {
    shopping = JSON.parse(window.sessionStorage.getItem("cart"));
}

if (window.sessionStorage.getItem("favourites")) {
    favouriteItems = JSON.parse(window.sessionStorage.getItem("favourites"));
}

const promationTexts = ["Free shipping from 49$", "30% on all products"]


let promotionChange = setInterval(() => {
    let ele = qs(".commercial");

    if (ele.getAttribute("currentIndex") == undefined || ele.getAttribute("currentIndex") >= promationTexts.length)
        ele.setAttribute("currentIndex", 0)

    let counter = ele.getAttribute("currentIndex");
    ele.innerHTML = promationTexts[counter];

    counter++;



    ele.setAttribute("currentIndex", counter);

}, 7000);


//get the category menu ul container
let dropDownContainer = qs("#menu-categories");

//goes over all the categories, and append them into the menu
categories.forEach(category => {

    if (category.name !== "Skin Products") {
        dropDownContainer.append(createCategoryMenuItem(category))
    }
})