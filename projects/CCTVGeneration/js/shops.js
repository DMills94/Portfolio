/*=======================================================================
JAVASCRIPT FOR SHOP.HTML
========================================================================*/

//Global Cart
var cartItems = [];


fetchCart();

//Global Count Variable (used in template)
count2 = 1;

//Products for shop.html
var Products = [
    {
        productNumber: 1,
        counter1: function() {
            return count1++;
        },
        counter2: function() {
            return count2++;
        },
        design: "Minator.png",
        descript: "CCTV Generation Minator",
        images: ["Minator_tshirt_front_white.png", "Minator_tshirt_back_white.png"],
        types: ["T-Shirt", "Snapback", "Hoodie"],
        sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
        colours: ["White", "Black", "Blue"],
        price: 14.99
    },

    {
        productNumber: 2,
        counter1: function() {
            return count1++;
        },
        counter2: function() {
            return count2++;
        },
        design: "Stag.png",
        descript: "CCTV Generation Stag with Text",
        images: ["Stag_tshirt_front_white.png", "Stag_tshirt_back_white.png"],
        types: ["T-Shirt", "Hoodie"],
        sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
        colours: ["White", "Black", "Blue"],
        price: 12.99
    },

    {
        productNumber: 3,
        counter1: function() {
            return count1++;
        },
        counter2: function() {
            return count2++;
        },
        design: "CCTV_GEN_text.png",
        descript: "CCTV Generation Text",
        images: ["Stag_tshirt_front_white.png", "Stag_tshirt_back_white.png"],
        types: ["T-Shirt", "Hoodie"],
        sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
        colours: ["White", "Black", "Blue"],
        price: 13.99
    },

    {
        productNumber: 4,
        counter1: function() {
            return count1++;
        },
        counter2: function() {
            return count2++;
        },
        design: "circle_neat.png",
        descript: "CCTV Generation Logo",
        images: ["Stag_tshirt_front_white.png", "Stag_tshirt_back_white.png"],
        types: ["T-Shirt", "Hoodie"],
        sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
        colours: ["White", "Black", "Blue"],
        price: 13.49
    }
]


function addProduct(productNumber){
    count1 = 1; //Local count variable which resets for each product

    //Generate Template to autogenerate Shop Items
    var template = "<div class='itemBox' id='product{{productNumber}}'>\n"

    //Generate Preview / Image
    template += "<div class='productDesign' id='product{{productNumber}}Prev'>\n" +
        "<img src='images/{{design}}' alt='{{descript}}' class='image'>\n" +
        "</div>"

    //Generate Shop
    template += "<div class='productShop' id='product{{productNumber}}Shop'>\n"

    //Generate Large Image
    template += "<div class='productShowcase' id='product{{productNumber}}Showcase'>\n"

    template += "{{#images}}\n"
    template += "<img class='productSlides'id='product{{productNumber}}Slide{{counter1}}' src='images/{{.}}'>\n"
    template += "{{/images}}\n"

    template += "</div>\n"

    //Generate Preview Images
    template += "<div class='productPrevBox' id='product{{productNumber}}PrevBox'>\n"
    template += "{{#images}}\n"
    template += "<div class='productPrev'>\n" +
        "<img class='productPrevImg' src='images/{{.}}' onclick='currentDiv({{counter2}})'>\n" +
        "</div>\n"
    template += "{{/images}}\n"

    template += "</div>\n"

    //Generate Product Selection Options
    template += "<div class='productSelectBox' id='product{{productNumber}}SelectBox'>\n"

    //Type
    template += "<div class='productSelect' id='product{{productNumber}}Type'>\n" +
        "<p>Type:</p>\n" +
        "<select id='prod{{productNumber}}Type' class='selectBox'>\n"

    template += "{{#types}}\n"
    template += "<option value='{{.}}'>{{.}}</option>\n"
    template += "{{/types}}\n"

    template += "<select>\n" +
        "</div>\n"

    //Size
    template += "<div class='productSelect' id='product{{productNumber}}Size'>\n" +
        "<p>Size:</p>\n" +
        "<select id='prod{{productNumber}}Size' class='selectBox'>\n"

    template += "{{#sizes}}\n"
    template += "<option value='{{.}}'>{{.}}</option>\n"
    template += "{{/sizes}}\n"

    template += "<select>\n" +
        "</div>\n"

    //Colour
    template += "<div class='productSelect' id='product{{productNumber}}Colour'>\n" +
        "<p>Colour:</p>\n" +
        "<select id='prod{{productNumber}}Colour' class='selectBox'>\n"

    template += "{{#colours}}\n"
    template += "<option value='{{.}}'>{{.}}</option>\n"
    template += "{{/colours}}\n"

    template += "<select>\n" +
        "</div>\n"

    template += "</div>\n"

    //Generate the Price
    template += "<div class='product-price' id='product{{productNumber}}Price'>\n" +
        "<h3>&pound{{price}}</h3>\n" +
        "</div>\n"

    //Generate Cart buttons
    template += "<div class='basketBtnsBox' id='product{{productNumber}}Btns'>\n" +
        "<button class='basketBtns atcBtn' id='product{{productNumber}}ATC' type='button'>Add To Basket</button>\n" +
        "<button class='basketBtns vcBtn' id='product{{productNumber}}VC' type='button'><a href='cart.html'>View Basket</a></button>\n" +
        "</div>\n"

    //Close remaining divs
    "</div>\n" +
        "</div>\n"

    var output = Mustache.render(template, Products[productNumber]);
    document.getElementById("shopItems").innerHTML += output;
}


function addProducts(){
    for (i in Products){
        addProduct(i);
    }
}

addProducts(); //Add products to shop.html

//Event Listeners for opening Product Shops
var shopItemList = document.getElementsByClassName("productDesign");
for (i = 0; i < shopItemList.length; i++){
    shopItemList[i].addEventListener('click', productInfo, false);
}

//Display Product Shops/Hide open Shops
function productInfo(){
    var idNum = this.id.replace( /\D+/g, '');
    for (var i = 1; i <= Products.length; i++){
        document.getElementById("product" + i + "Shop").style.display = i == idNum?"block": "none";
        document.getElementById("product" + i + "Prev").style.display = i == idNum?"none": "block";
    }
    document.getElementById("product"+idNum+"Slide1").style.display = "block";
}

//Image Previewer
function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("productSlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}


//Add to Cart
var addToCartBtns = document.getElementsByClassName("atcBtn");

for (btn = 0; btn < addToCartBtns.length; btn++){
    var addToCartFnc = new Function("productNumber", "{addToCart("+btn+")}")
    addToCartBtns[btn].addEventListener('click', addToCartFnc, false);
}

function addToCart(product){
    var newCartItem = {
        productNumber: product,
        design: Products[product].design,
        descript: Products[product].descript,
        type: document.getElementById("prod1Type").value,
        size: document.getElementById("prod1Size").value,
        colour: document.getElementById("prod1Colour").value,
        quantity: 1,
        price: Products[product].price
    }

    var found = false;

    for (i = 0; i < cartItems.length; i++){
        if (newCartItem.design == cartItems[i].design &&
            newCartItem.type == cartItems[i].type &&
            newCartItem.size == cartItems[i].size &&
            newCartItem.colour == cartItems[i].colour) {
            cartItems[i].quantity++;
            found = true;
            break;
        }
    }
    if(!found) {
        cartItems.push(newCartItem);
    }
    storeCart(cartItems);
}
