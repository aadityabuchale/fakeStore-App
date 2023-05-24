
function loadCategories(){
    
    fetch("https://fakestoreapi.com/products/categories")
    .then(function(response){
        return response.json();
    })
    .then(function (categories){
        categories.unshift("all");
        for(var category of categories){
            var option=document.createElement("option");
            option.text=category.toUpperCase();
            option.value=category;
            document.querySelector("#lstCategories").appendChild(option);
        }
    })
}
function loadProducts(url){
    document.querySelector("main").innerHTML="";
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function(products){
        for(var product of products){
            var div= document.createElement("div");
            div.className="m-4 p-2";
            div.style.marginTop="20px";
            div.innerHTML=`
            <div style="display:grid;grid-template-columns:3fr 8fr 1fr;" class="items">
                <div><img src=${product.image} height="270px" width="220px" style="margin-right:30px;"></div>
            <div>
                <h3 style="font-size:24px;font-weight:bold;"></span> ${product.title}</h3>
                <span style="font-weight:bold;"> ${product.rating.rate} <span style="font-size:23px;" class="bi bi bi-star-fill text-success"></span><span class="" >- ${product.rating.count} Reviews</span></span>
            <div><br>
                <h5><b>Description</b></h5>
                <div>${product.description}</div>
            </div>
            <div style="font-size:20px;margin:10px">
                <b>Price- &#36; ${product.price} /-</b>
                <button onclick="addClick(${product.id});" class="btn btn-danger w-100p-3">
                <span class="bi bi-cart4 ">Add to Cart</span>
            </div>
            </div>     
            `;
            document.querySelector("#content").appendChild(div);
        }
    })
}
function categoryChange(){
    var selectedCategory= document.getElementById("lstCategories").value;
    if(selectedCategory=="all"){
        loadProducts("https://fakestoreapi.com/products");
    }
    else{
        loadProducts(`https://fakestoreapi.com/products/category/${selectedCategory}`);
    }
}
var cartItems=[];
function getCartCount(){
    document.getElementById("lblCount").innerHTML=cartItems.length;
}
function addClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function (response){
        return response.json();
    })
    .then(function (product){
        cartItems.push(product);
        console.log(product);
        alert(`${product.title} Added to Cart`);
        getCartCount();
    })
}

function removeClick(id){
        var ivalue= cartItems.findIndex(prod => prod.id===id);
        if(ivalue > -1){
            cartItems.splice(ivalue,1);
        }
    LoadCartItems();
    getCartCount();
}

function LoadCartItems(){
    document.querySelector("tbody").innerHTML = "";
    for(var item of cartItems){
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPreview = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdAction = document.createElement("td");

        tdTitle.innerHTML = item.title;
        tdPreview.innerHTML = `<img src=${item.image} width="70px" height="50px">`;
        tdPrice.innerHTML = `&#36; ${item.price}/-`;
        tdAction.innerHTML = `<button class="btn btn-danger btn-sm" onclick="removeClick(${item.id})" style="margin-left:10px;"><span class="bi bi-trash-fill"></span></button>`
        tr.appendChild(tdTitle);
        tr.appendChild(tdPreview);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAction);

        document.querySelector("tbody").appendChild(tr);
    }
}


// Card JS
var userDetails = {
    Card : "4444555566667777",
    Cvv : "345",
    Expiry: "2024"
}

function CardClick(){
    var card = document.getElementById("inpText").value;
    var imag = document.getElementById("img");
    var error=document.getElementById("error");

    if(card.startsWith("5")){
        imag.src="../public/Images/mastercard.jpg"
    }
    else if(card.startsWith("4")){
        imag.src="../public/Images/visa.png";
    }
    for(var i in card){
        if(card.length==0){
            error.innerHTML="";
        }
        if(card.charCodeAt(i)>=48 && card.charCodeAt(i)<=57 )
        {
            error.innerHTML="";
        }
        else{
            error.innerHTML="Enter Only Numbers!";
        } 
               
    }      
    if(card==userDetails.Card) {
       document.getElementById("txtCvv").disabled = false;
       document.getElementById("txtCvv").focus();
    } else {
       document.getElementById("btnPay").disabled = true;
    }
}
function VerifyCvv(){
    var cvv = document.getElementById("txtCvv").value;
    if(cvv == userDetails.Cvv) {
       document.getElementById("lstYear").disabled = false;
       document.getElementById("lstYear").focus();
    }
    else {
        document.getElementById("btnPay").disabled = true;
     }
  }
  function VerifyYear(){
    var year = document.getElementById("lstYear").value;
    if(year==userDetails.Expiry) {
      document.getElementById("number").disabled = false;
      document.getElementById("number").focus();
    } else {
        document.getElementById("btnPay").disabled = true;
     }
     
  }
  function verifyMobNo(){
    var mobNumber = document.getElementById("number");
    var regExp = /\+91/;
    var mobError= document.getElementById("mobError");
    if(mobNumber.value.match(regExp)){
        mobError.innerHTML="";
        document.getElementById("btnPay").disabled = false;
    }
    else{
        mobError.innerHTML="Enter valid Mobile No \n i.e. Starts with +91";
    }

  }
  function PayClick(){
    document.getElementById("cardDetails").outerHTML='<h1 style="font-weight:bold;margin-top:330px ;text-align: center;font-size: 38px;">Your Order has been Placed.</h1><br><h2 style="text-align:center;margin-top:-24px;font-size:28px">Thank You..!</h2>    ';
  }
function bodyLoad(){
    loadCategories();
    loadProducts("https://fakestoreapi.com/products");
    getCartCount();
}