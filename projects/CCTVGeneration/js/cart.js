/*=======================================================================
JAVASCRIPT FOR CART.HTML
========================================================================*/

//Fetching the cart
function fetchCart() {
    var submitTo = "http://davidjosephmills.co.uk/projects/CCTVGeneration/php/fetchbask.php";

    var req = {};

    $.ajax({
        url:submitTo,
        type: "POST",
        data: req,
        cache: false
    }).done(function(data){
        cartInfo = JSON.parse(data);
        console.log(cartInfo);
        displayCart(); //Display cart items on cart.html
        //LOAD THE CART IN HTML
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("The Cart has not been fetched. Failed: " + textStatus + " " + jqXHR.status);
    });
};

fetchCart();


//Displaying the cart

function addCartItem(productNumber) {
    //generate cart template
    var template = "<div class='cart-item' id='cartItem{{productNumber}}'>"

    //Picture
    template += "<div class='pic-preview'><img src='images/{{design}}'></div>"
    //Description
    template += "<div class='design-text'>{{descript}}</div>"
    //Type/Size/Colour
    template += "<div class='cart-product-details'>{{type}}<br>{{size}}<br>{{colour}}</div>"
    //Quanity (manual update)
    template += "<div class='cart-quantity'><input value='{{quantity}}' min='1' type='number'></div>"
    //Starting price
    template += "<div class='cart-price'>{{price}}</div>"


    var output = Mustache.render(template, cartInfo[productNumber]);
    document.getElementById("displayCart").innerHTML += output;
}

function displayCart(){
    for (i in cartInfo){
        addCartItem(i);
    }
}
