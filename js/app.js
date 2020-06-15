'use strict';

/*
- create constructor that creates an object associated with each product
  1. name of product
  2. file path of image

- create an algorithm to randomly generate three unique product images to display side by side in browser windo

- event listener to section of HTML page where the images are going to be displayed

- after 'click' generate 3 new products for user to pick


2. track selections made by viewers
  - in constructor: define property to hold number of times a product has been clicked

  - after selection, update newly added property to reflect if it was clicked


3. control number of rounds a user is presented with
  - default: 25 rounds of voting before end
  - keep number of rounds in a variable to allow number to be easily changed


4. view report of results after all rounds of voting have concluded
  - create property attached to constructor that keeps track of all products currently being considered

  - after voting completed, remove event listeners on produc

  - display the list of all the products followed by the votes received and number of times seen for each

*/

// ==================== GLOBAL VARS / ARRAYS ==================== //

var productArray = [];
var totalClicks = 0;
var maxClicks = 10;


// ==================== constructors ==================== //

function Product(imgSource, caption){
  this.clicked = 0;
  this.shown = 0;
  this.imgSrc = imgSource;
  this.imgCaption = caption;

  productArray.push(this);
}

new Product('img/bag.jpg', 'star wars bag');
new Product('img/banana.jpg', 'banana slicer');
new Product('img/bathroom.jpg', 'bathroom ipad stand');
new Product('img/boots.jpg', 'rain boots');
new Product('img/breakfast.jpg', 'coffee toaster oven');
new Product('img/bubblegum.jpg', 'meatball bubble gum');
new Product('img/chair.jpg', 'hump chair');
new Product('img/cthulhu.jpg', 'cthulhu action figure');
new Product('img/dog-duck.jpg', 'duckbill for dogs');
new Product('img/dragon.jpg', 'dragon meat');
new Product('img/pen.jpg', 'pen utensils');
new Product('img/pet-sweep.jpg', 'dog mop');
new Product('img/scissors.jpg', 'pizza sciccors');
new Product('img/shark.jpg', 'shark sleeping bag');
new Product('img/sweep.png', 'meatball bubble gum');
new Product('img/tauntaun.jpg', 'star wars sleeping bag');
new Product('img/unicorn.jpg', 'unicorn meat');
new Product('img/usb.gif', 'usb tentacle');
new Product('img/water-can.jpg', 'infinite water loop');
new Product('img/wine-glass.jpg', 'cursed wine glass');

// ==================== functions ==================== //

var pickAProduct = document.getElementById('pick');
pickAProduct.addEventListener('click', handleClickAProduct);


function handleClickAProduct(event){

  if (event.target.tagName === 'IMG'){
    totalClicks++;

    if (totalClicks === maxClicks){
      renderListTally();
      pickAProduct.removeEventListener('click',handleClickAProduct);
    }

    var targetSrc = event.target.getAttribute('src');
    for (var i = 0; i < productArray.length; i++){
      if (productArray[i].imgSrc === targetSrc){
        productArray[i].clicked++;
      }
    }

    renderRandomProducts();

  } else {
    alert('please choose a product');
  }

}


function renderRandomProducts(){
  var firstRandom = randomizer(0, productArray.length);
  var secondRandom = randomizer(0, productArray.length);
  var thirdRandom = randomizer(0, productArray.length);

  //img render
  var leftImage = document.getElementById('left');
  var middleImage = document.getElementById('middle');
  var rightImage = document.getElementById('right');

  leftImage.src = productArray[firstRandom].imgSrc;
  productArray[firstRandom].shown++;

  middleImage.src = productArray[secondRandom].imgSrc;
  productArray[secondRandom].shown++;

  rightImage.src = productArray[thirdRandom].imgSrc;
  productArray[thirdRandom].shown++;

}

function renderListTally(){

  var list = document.getElementById('clicks');

  for (var i = 0; i < productArray.length; i++){
    var listTally = document.createElement('li');
    listTally.textContent = (productArray[i].imgCaption + ' had ' + productArray[i].clicked + ' votes, and was shown ' + productArray[i].shown + ' times.');
    list.appendChild(listTally);
  }

}

function randomizer(min, max){
  return Math.floor(Math.random() * (max-min) + min);
}



// ==================== invocations ==================== //

renderRandomProducts();

