function createCartItem(productId, index) {

    //gets the product by the ID (productId) that we took from render cart.
    let product = getProductById(productId);

    //calculates the total sum of a product by giving it the product price that we found earlier, and giving it the quantity so we know how many of that products we have.
    let totalProductSum = productSum(product.price, shopping[index].quantity)

    //gives the clas an empty string
    let minusCss = ""

    //if the quantity of the product is equal to 1 then we will add a class that will grey out the minus button.
    if (shopping[index].quantity <= 1) {
        minusCss = "minus-disabled"
    }

    let template = `
        <div class="cart-item" id="cart-item-${index}">
            <div class="cart-image-wrapper">
                <img src="${product.imageUrl}" class="cart-item-image">
            </div>
            <div class="cart-item-description">
                <h5 class="cart-item-title">${product.name}</h5>
                <div class="cart-item-remove-button"><span class="trash-icon" onclick="removeCartItem(${index})"><i class="fa fa-trash-o"></i></span></div>
                <p class="mini-description">${product.miniProductDescription}</p>
                <p class="single-price">${product.price.toFixed(2)}$</p>
                <div class="product-quantity-wrapper">
                    <button class="minus ${minusCss}" id="minus-button-${index}" onClick="decrementCartItem(${index})"><i class="fa fa-minus"></i>
                    </button><input type="text" class="quantity-input" readonly="read-only" id="cart-product-quantity-${index}" value="${shopping[index].quantity}"><button class="plus" onCLick="incrementCartItem(${index})"><i class="fa fa-plus"></i></button>
                </div>
                <div class="item-quantity-sum" id="item-quantity-sum-${index}">${totalProductSum}$</div>
            </div>
        </div>`

    return template;
}

//calculate the total product sum;
function productSum(price, quantity) {
    let sum = quantity * parseFloat(price);
    sum = sum.toFixed(2);
    return sum;
}

function saveData() {
    window.sessionStorage.setItem("cart", JSON.stringify(shopping))
}

function renderCart() {
    // create a wrapper div where the cart is moved to
    let wrapper = document.createElement("div")

    // set a ccs class "cart-container" for wrapper div
    wrapper.classList.add("cart-container")


    shopping.forEach((product, index) => {

        wrapper.innerHTML += createCartItem(product.id, index);

    })

    updateTotalPrice();

    // update counter on bag item in menu
    updateBagItemCounter();


    // if cart-container (wrapper) already exists in scrollabe sidebar area -> remove it
    if (qs(".cart-container") != null) {
        qs(".scrollable-cart").removeChild(qs(".cart-container"))
    }
    // move the cart-container into the scrollable sidebar area
    qs(".scrollable-cart").appendChild(wrapper)
}



//updates the counter on the bag icon acording to the amount of products that are in the cart.
function updateBagItemCounter() {
    let quantity = 0;

    shopping.forEach(item => {
        quantity += item.quantity
    })

    qs("#bag-item-counter").classList.remove("hidden");
    qs("#bag-item-counter").innerHTML = quantity

    if (quantity === 0) {
        qs("#bag-item-counter").classList.add("hidden")
    }

}


//a function that creates and return a template of the single product page;
function createProduct(product) {

    //set empty heart as default.
    let emptyHeart = "";
    let fullHeart = "hidden";

    //check if the array includes the product id then it changes the empty heart into a full one.
    if (favouriteItems.includes(product.id)) {
        emptyHeart = "hidden";
        fullHeart = ""
    }



    let template = `<img src="${product.imageUrl}">

                        <div class="special-product-description-box" data-id="${product.id}">
                            <p class="mini-product-title">${product.miniProductTitle}</p>

                            <h2>${product.miniProductDescription}</h2>

                            <p class="special-product-description">${product.description}</p>

                            <p class="mini-product-description">${product.miniProductDescription}</p>

                            <p class="special-product-price">${product.price}$</p>
                            <div class="product-quantity-wrapper">
                            <button class="minus minus-disabled" id="product-page-minus-button" onClick="decrementProductPageQuantity()"><i class="fa fa-minus"></i>
                            </button><input type="text" class="quantity-input" id="product-page-quantity" value="1" readOnly="read-only"><button class="plus" onClick="incrementProductPageQuantity()"><i class="fa fa-plus"></i></button>
                            </div>
                                <button class="special-product-button">ADD TO BAG</button>
                                <div class="add-to-favourites unAdded-to-favourites ${emptyHeart}" onClick="addFavouriteItem(${product.id})" title="Add product to favourites"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                                <div class="add-to-favourites added-to-favourites ${fullHeart}" onClick="removeFavouriteItem(${product.id})" title="Remove product from favourites"><i class="fa fa-heart" aria-hidden="true"></i></div>
                        </div>`

    return template;
}


//increase the product in the product page quantity by 1.
function incrementProductPageQuantity() {

    let productPageQuantity = qs("#product-page-quantity");
    let quantity = parseInt(productPageQuantity.value);
    quantity++;

    let minusButton = qs("#product-page-minus-button");
    productPageQuantity.value = quantity;

    if (parseInt(productPageQuantity.value) > 1)
        minusButton.classList.remove("minus-disabled");


}

//decrement the quantity by 1, but if the quantity is already 1 then it "disable" the button
function decrementProductPageQuantity() {
    let minusButton = qs("#product-page-minus-button");
    let productPageQuantity = qs("#product-page-quantity");
    let quantity = parseInt(productPageQuantity.value);
    quantity--;

    if(quantity < 1){
        minusButton.classList.add("minus-disabled");
        quantity = 1;
    }

    productPageQuantity.value = quantity;
}


// a function that create and returns the products in the best sellers;
function createBestSellers(product) {
    //create a div element;
    let div = document.createElement("div");
    div.classList.add("product");
    //gives the div an id and gives the id the name "product-id-(the product id)" for example: product-id-0;
    div.setAttribute("data-id", `${product.id}`)

    let template = `<a href="product.html?id=${product.id}">
    <div class="image-wrapper">
        <img src="${product.imageUrl}">
    </div>

    <div class="product-description">
        <p>${product.name}</p>
        <p>${product.price}$</p>
    </div>
    </a>
    <div class="add-to-bag-button">Add To Bag</div>`

    div.innerHTML = template;

    return div;

}

//generates the category menu items.
function createCategoryMenuItem(category) {

    let li = document.createElement("li");

    let template = `<a href="category-products.html?id=${category.id}">${category.name.toUpperCase()}</a>`

    li.innerHTML = template;

    return li;
}


//create an item inside the shopping bag page.
function createCartPageItem(product, quantity, itemTotalPrice, index) {

    let div = document.createElement("div");
    div.classList.add("bag-item");

    let minusCss = ""
    if (shopping[index].quantity <= 1) {
        minusCss = "minus-disabled"
    }


    let template =
        ` <div class="bag-item--image"><img src="${product.imageUrl}"></div>

    <div class="bag-item--data">
        <div class="bag-item--data--top-part">
            <h3 class="bag-item--title">${product.name}</h3>
            <div class="bag-item--data--remove-button">
                <span onclick="removeCartItem(${index}); location.reload();"><i class="fa fa-trash-o" id="bag-item--data--remove-button"></i></span>
            </div>
        </div>
        <div class="bag-item--data--bottom-part">
            <div class="bag-item--single-price">${product.price.toFixed(2)}$</div>

            <div class="bag-item--quantity-selector-wrapper">
            <button class="minus ${minusCss}" id="minus-button-${index}" onClick="decrementCartItem(${index})"><i class="fa fa-minus"></i>
            </button><input type="text" class="quantity-input" readonly="read-only" id="cart-product-quantity-${index}" value="${quantity}"><button class="plus" onCLick="incrementCartItem(${index})">
            <i class="fa fa-plus"></i></button>
            </div>

            <div class="bag-item--total-price" id="item-quantity-sum-${index}">${itemTotalPrice}$</div>

        </div>
    </div> `

    div.innerHTML = template;

    return div;
}



function createTopCategory(category) {

    let div = document.createElement("div");
    div.classList.add("category-box")

    let image = "/desktop/image-not-available.jpg"

    if (category.imageUrl != "") {
        image = category.imageUrl;
    }

    let template = `
    <a href="category-products.html?id=${category.id}">
        <div class="img-hover-category">
            <img src="${image}">
        </div>
    </a>
    <h3>${category.name}</h3>`

    div.innerHTML = template;

    return div;

}

// function called by eventListener from addToBag-button
function addItemToCart() {

    //defaults the quantity of the item to 1;
    let quantity = 1;

    // get parent element of the clicked button (represents the product)
    let product = this.parentElement;

    if (qs("#product-page-quantity")) {
        let addQuantity = qs("#product-page-quantity").value

        if (parseInt(addQuantity) > 1) {
            quantity = parseInt(addQuantity)
        }

    }

    //get the id from the data-id.
    let productId = product.dataset.id;


    // helper variable
    let existingEntry = null;

    cartDarkenMode.classList.toggle("hidden");

    // check if product is already in the cart by walking the cart array
    shopping.forEach((item, index) => {
        if (productId === item.id) {
            existingEntry = index
        }
    })

    // for (let index = 0; index < shopping.length; index++) {
    //     // if alredy in cart, set the helper to the cart array index where product is
    //     if (productId === shopping[index].id) {
    //         existingEntry = index
    //     }
    // }


    if (existingEntry === null) {
        // product not in cart -> add parent of clicked button (product) with quantity of 1
        shopping.push({
            "id": productId,
            "quantity": quantity
        })
    } else {
        // product in cart -> increment quantity acording to the selected amount.
        shopping[existingEntry].quantity += quantity;
    }

    //shows the side-cart;
    renderCart();

    qs(".shopping-cart-side").classList.remove("moved-out-cart")

    saveData()

    let darkenWebsite = qs(".darken-website");
    darkenWebsite.classList.remove("hidden")
}


//gets the product by id.
function getProductById(id) {

    let product = products.filter(product => product.id == id)
    //we want only one product wit that id, because we have a few products with the same id
    product = product[0];


    return product;

}

//updates the total cart price, (adds all the item prices and sum them together);
function updateTotalPrice() {
    let totalPrice = 0;

    shopping.forEach(item => {
        let product = getProductById(item.id)
        totalPrice += product.price * item.quantity;
    })

    qs("#total-cart-price").innerHTML = totalPrice.toFixed(2) + "$";

}


function removeCartItem(index) {
    //removes the product from the array.
    shopping.splice(index, 1);
    renderCart();
    saveData();
}


//updates the product price acording to how many times he is in the cart.
function updateProductSum(index) {

    let product = getProductById(shopping[index].id);
    let price = productSum(product.price, shopping[index].quantity);

    qs(`#item-quantity-sum-${index}`).innerHTML = price + "$";

}


//increases the number of a single product quantity in the cart
function incrementCartItem(index) {

    shopping[index].quantity++;

    qs(`#cart-product-quantity-${index}`).value = shopping[index].quantity;
    updateTotalPrice()
    updateBagItemCounter()
    updateProductSum(index);

    qs(`#minus-button-${index}`).classList.remove("minus-disabled");

    saveData();
}


//decrement the shopping bag/mini cart quantity, and if the quantity is equal to 1 or lower then it will "disable" the minus button.
function decrementCartItem(index) {
    shopping[index].quantity--;

    if (shopping[index].quantity <= 1) {
        shopping[index].quantity = 1;
        qs(`#minus-button-${index}`).classList.add("minus-disabled");
    }

    qs(`#cart-product-quantity-${index}`).value = shopping[index].quantity;
    updateTotalPrice()
    updateBagItemCounter()
    updateProductSum(index);
    saveData();
}

function burgerMenuOpenAndClose() {
    let burgerOpen = qs(".openResponsive");
    let burgerClose = qs(".closeResponsive");

    dropdownMenu.classList.toggle("hidden");
    darkenMode.classList.toggle("hidden");
    burgerClose.classList.toggle("hidden");
    burgerOpen.classList.toggle("hidden");
}


function toggleSearchDropDown() {
    let searchBar = qs(".search-bar-dropdown");

    searchBar.classList.toggle("hidden");
    darkenMode.classList.toggle("hidden");
}

//move to the next product on the left
function slideToLeft() {
    let slides = qsa(".product-slider .product");
    currentProductSlide--;

    if (currentProductSlide < 0)
        currentProductSlide = slides.length - 1;

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentProductSlide) * 120}%)`
    })

}

//move to the next product on the right
function slideToRight() {
    let slides = qsa(".product-slider .product");
    currentProductSlide++;

    if (currentProductSlide == slides.length)
        currentProductSlide = 0;

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentProductSlide) * 120}%)`
    })
}


//filters the product by their price
function filterProductsByPrice(element, categoryId) {

    //get all the products from the correct category.
    let filtered = products.filter(product => product.category.includes(parseInt(categoryId)))

    //checks if the input field doesn't have the option "all" and filter acording to the option that was selected.
    if (element.value != "all")
        filtered = filtered.filter(product => product.price <= parseInt(element.value));


    let productContainer = qs("#category-products");
    let sliderProductContainer = qs(".product-slider");

    //empty the containers for both mobile view and desktop view.
    sliderProductContainer.innerHTML = "";
    productContainer.innerHTML = "";


    filtered.forEach((product, index) => {
        productContainer.append(createBestSellers(product));
        sliderProductContainer.append(createBestSellers(product));

        //each time moves the just added element to the right by his index times 120% instead of hiding it, to give it an annimation.
        sliderProductContainer.lastChild.style.transform = `translateX(${index * 120}%)`;
    })


    //readd the functionality of the add to bag buttons.
    addToBagButtons = qsa(".add-to-bag-button");

    addToBagButtons.forEach(button => {
        button.addEventListener("click", addItemToCart)
    });
}

function createFavouritePorduct(product) {

    let div = document.createElement("div");
    div.classList.add("favourite-product");


    let template = `
                <div class="favourite-product--image">
                    <img src="${product.imageUrl}">
                </div>

                <div class="favourite-product--data-container">

                    <div class="favourite-product-data--top-part">
                        <h3 class="bag-item--title">${product.name}</h3>
                        <div class="bag-item--data--remove-button" onClick="removeFavouriteItem(${product.id})">
                            <i class="fa fa-trash-o" id="bag-item--data--remove-button"></i>
                        </div>
                    </div>

                    <div class="favourite-product-data--bottom-part"  data-id="${product.id}">
                        <div class="favourite-product-description">${product.miniProductDescription}</div>
                        <div class="add-to-bag-button">Add To Bag</div>
                    </div>

                </div> `


    div.innerHTML = template;

    return div;

}


//remove the product to the favourites
function removeFavouriteItem(id) {

    let addToFavaourite = qs(".added-to-favourites");
    let unAddToFavaourite = qs(".unAdded-to-favourites");

    let index = favouriteItems.indexOf(id);
    favouriteItems.splice(index, 1);
    saveFavourites();

    addToFavaourite.classList.toggle("hidden");
    unAddToFavaourite.classList.toggle("hidden");

}


//add the product to the favourites
function addFavouriteItem(id) {

    let addToFavaourite = qs(".added-to-favourites");
    let unAddToFavaourite = qs(".unAdded-to-favourites");


    if (!favouriteItems.includes(id)) {
        favouriteItems.push(id);
    }
    saveFavourites();

    addToFavaourite.classList.toggle("hidden");
    unAddToFavaourite.classList.toggle("hidden");

}

//saves the favourites array and transfer it to the storage.
function saveFavourites() {
    window.sessionStorage.setItem("favourites", JSON.stringify(favouriteItems))
}