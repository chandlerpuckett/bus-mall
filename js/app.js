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
new Product('img/boots.jpg', 'rain boots');

// ==================== functions ==================== //


var pickAProduct = document.getElementById('pick');
pickAProduct.addEventListener('click', handleClickAProduct);


function handleClickAProduct(event){
  if (event.target.tagName === 'IMG'){
    totalClicks++;

    if (totalClicks === maxClicks){
      pickAProduct.removeEventListener('click',handleClickAProduct);
    }


    var targetSrc = event.target.getAttribute('src');
    for (var i = 0; i < productArray.length; i++){
      if (productArray[i].imgSrc === targetSrc){
        productArray[i].clicked++;
      }
    }



  } else {
    alert('please choose a product');
  }


}


function renderRandomProducts(){
  var firstRandom = randomizer(0, productArray.length);
  console.log('first new', productArray[firstRandom]);

  var secondRandom = randomizer(0, productArray.length);
  console.log('second new', productArray[secondRandom]);

  var thirdRandom = randomizer(0, productArray.length);
  console.log('third new', productArray[thirdRandom]);
}


renderRandomProducts();

function randomizer(min, max){
  return Math.floor(Math.random() * (max-min) + min);
}



