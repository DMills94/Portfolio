/*=======================================================================
JAVASCRIPT FOR CART.HTML
========================================================================*/

fetchCart();

//Displaying the cart

function addCartItem(productNumber) {

    cartItems[productNumber].calcPrice = (cartItems[productNumber].price * cartItems[productNumber].quantity).toFixed(2);

    //generate cart template
    var template = "<div class='cart-item' id='cartItem{{productNumber}}'>"

    //Picture
    template += "<div class='pic-preview'><img src='images/{{design}}'></div>"
    //Description
    template += "<div class='design-text'>{{descript}}</div>"
    //Type/Size/Colour
    template += "<div class='cart-product-details'>{{type}}<br>{{size}}<br>{{colour}}</div>"
    //Quanity (manual update)
    template += "<div class='cart-quantity'><input class='quantities' id='quantProduct" + productNumber + "' value='{{quantity}}' min='0' type='number'></div>"
    //Starting price
    template += "<div class='cart-price'>&pound{{calcPrice}}</div>"


    var output = Mustache.render(template,
                                 cartItems[productNumber]);
    document.getElementById("displayCart").innerHTML += output;
}

function displayCart(){
    if (cartItems.length == 0){
        document.getElementById("displayCart").innerHTML = "Your cart is empty!";
        return;
    }
    for (i in cartItems){
        addCartItem(i);
    }
    var itemCosts = document.getElementsByClassName("cart-price");
    var cost = 0 //set default total to 0
    for (i = 0; i < itemCosts.length; i++){
        cost += parseFloat((itemCosts[i].innerHTML).substring(1));
    }
    document.getElementById("displayCart").innerHTML += "<div id='totalCost'><p>Total: £" + cost.toFixed(2) + "</p></div><button id='checkoutCart'>Checkout</button>";

    //Add Event listeners to new HTML tags

    //Quantity
    var quantityInputs = document.getElementsByClassName("quantities");
    for (i = 0; i < quantityInputs.length; i++){
        quantityInputs[i].addEventListener('input', quantUpdate, false);
    }
    
    document.getElementById("checkoutCart").addEventListener('click', Checkout, false);
}


function quantUpdate(){
    //Get Product Number
    var prodNum = this.id.replace( /^\D+/g, '');

    if (this.value === "0"){
        if (confirm("Please confirm you wish to delete the item from your cart.") == true){
            cartItems.splice(prodNum, 1);
            document.getElementById("displayCart").innerHTML = "";
            storeCart(cartItems);
            displayCart();
        }
        return;
    }

    //refresh the page HTML and redisplay cart with new values
    cartItems[prodNum].quantity = this.value;
    document.getElementById("displayCart").innerHTML = "";
    storeCart(cartItems);
    displayCart();
}

function Checkout(){
    alert("There is currently no Checkout for this store, please try again later or message us via our Contact page!")
}