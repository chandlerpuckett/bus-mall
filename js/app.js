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

Product.array = [];
var productVotesArray = [];
var randomColorArray = [];
var labelsArray = [];

var numberOfImages = 3;
var totalClicks = 0;
var maxClicks = 5;


// ==================== constructors ==================== //

function Product(imgSource, caption){
  this.clicked = 0;
  this.shown = 0;
  this.imgSrc = imgSource;
  this.imgCaption = caption;

  Product.array.push(this);
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


    var targetSrc = event.target.getAttribute('src');

    for (var i = 0; i < Product.array.length; i++){
      if (Product.array[i].imgSrc === targetSrc){
        Product.array[i].clicked++;
      }
    }


    if (totalClicks === maxClicks){
      renderListTally();
      renderChartToPage();
      pickAProduct.removeEventListener('click',handleClickAProduct);
    }


    var reset = document.getElementById('pick');
    reset.innerHTML = '';

    while (randomImageIndexGlobal.length > 0){
      randomImageIndexGlobal = [];
    }

    drawRandomImages();
    renderRandomImages();

    // dynamicRenderImages();
    // renderRandomProducts();


  } else {
    alert('please choose a product');
  }

}

// ============ WORKING CODE ============= //


var randomImageIndexGlobal = [];


function drawRandomImages(){

  var firstRandom = randomizer(0, Product.array.length);
  var secondRandom = randomizer(0, Product.array.length);
  var thirdRandom = randomizer(0, Product.array.length);

  do {
    firstRandom = randomizer(0, Product.array.length);
    thirdRandom = randomizer(0, Product.array.length);
  }
  while (
    thirdRandom === firstRandom ||
    thirdRandom === secondRandom ||
    firstRandom === secondRandom
  );

  randomImageIndexGlobal.push(Product.array[firstRandom]);
  randomImageIndexGlobal.push(Product.array[secondRandom]);
  randomImageIndexGlobal.push(Product.array[thirdRandom]);

  Product.array[firstRandom].shown++;
  Product.array[secondRandom].shown++;
  Product.array[thirdRandom].shown++;

}


function renderRandomImages(){


  for (var i = 0; i < randomImageIndexGlobal.length; i++){
    var parent = document.getElementById('pick');
    var divParent = document.createElement('div');
    parent.appendChild(divParent);

    var imgRender = document.createElement('img');
    imgRender.src = randomImageIndexGlobal[i].imgSrc;


    var captionRender = document.createElement('p');
    captionRender.textContent = randomImageIndexGlobal[i].imgCaption;

    divParent.appendChild(imgRender);
    divParent.appendChild(captionRender);
  }

}


function renderRandomProducts(){
  // pick a random image


  //check for duplicate in global array (3 images)

  // for (var i = 0; i < randomImageIndexGlobal.length; i++){

  //   while( randomImageIndexGlobal[i] === Product.array[firstRandom].imgSrc || randomImageIndexGlobal[i] === Product.array[secondRandom].imgSrc || randomImageIndexGlobal[i] === Product.array[thirdRandom].imgSrc) {

  //     console.log ('duplicate found - re pick random images');

  //     firstRandom = randomizer(0, Product.array.length);
  //     secondRandom = randomizer(0, Product.array.length);
  //     thirdRandom = randomizer(0, Product.array.length);

  //   }


  // }

  // while (
  //   randomImageIndexGlobal[0] === Product.array[firstRandom].imgSrc ||
  //   randomImageIndexGlobal[1] === Product.array[secondRandom].imgSrc ||
  //   randomImageIndexGlobal[2] === Product.array[thirdRandom].imgSrc) {
  //   firstRandom = randomizer(0, Product.array.length);
  //   secondRandom = randomizer(0, Product.array.length);
  //   thirdRandom = randomizer(0, Product.array.length);
  // }

  // for (var i = 0; i < randomImageIndexGlobal.length; i++){

  //   if (
  //     randomImageIndexGlobal[i] === Product.array[firstRandom].imgSrc ||
  //     randomImageIndexGlobal[i] === Product.array[secondRandom].imgSrc ||
  //     randomImageIndexGlobal[i] === Product.array[thirdRandom].imgSrc){

  //     console.log(' duplicate duplicate duplicate ');

  //     firstRandom = randomizer(0, Product.array.length);
  //     secondRandom = randomizer(0, Product.array.length);
  //     thirdRandom = randomizer(0, Product.array.length);
  //   }
  // }

  //empty global array
  while (randomImageIndexGlobal.length > 0){
    randomImageIndexGlobal = [];
  }




  /* PICK RANDOM IMAGES */


  var firstRandom = randomizer(0, Product.array.length);
  var secondRandom = randomizer(0, Product.array.length);
  var thirdRandom = randomizer(0, Product.array.length);

  do {
    firstRandom = randomizer(0, Product.array.length);
    thirdRandom = randomizer(0, Product.array.length);
  }
  while (
    thirdRandom === firstRandom ||
    thirdRandom === secondRandom ||
    firstRandom === secondRandom
  );

  randomImageIndexGlobal.push(Product.array[firstRandom].imgSrc);
  randomImageIndexGlobal.push(Product.array[secondRandom].imgSrc);
  randomImageIndexGlobal.push(Product.array[thirdRandom].imgSrc);




  //img render
  var leftImage = document.getElementById('left');
  var middleImage = document.getElementById('middle');
  var rightImage = document.getElementById('right');

  leftImage.src = Product.array[firstRandom].imgSrc;
  Product.array[firstRandom].shown++;

  middleImage.src = Product.array[secondRandom].imgSrc;
  Product.array[secondRandom].shown++;

  rightImage.src = Product.array[thirdRandom].imgSrc;
  Product.array[thirdRandom].shown++;

  var leftCaption = document.getElementById('left-caption');
  var middleCaption = document.getElementById('middle-caption');
  var rightCaption = document.getElementById('right-caption');

  leftCaption.textContent = Product.array[firstRandom].imgCaption;
  middleCaption.textContent = Product.array[secondRandom].imgCaption;
  rightCaption.textContent = Product.array[thirdRandom].imgCaption;

}

function renderListTally(){

  var hideH1 = document.getElementById('h1');
  hideH1.innerHTML = '';

  var removePics = document.getElementById('pick');
  removePics.remove();

  var clicks = document.getElementById('clicks');
  var clicksHeading = document.createElement('h2');
  clicksHeading.textContent = 'Voting Results';
  clicks.appendChild(clicksHeading);

  for (var i = 0; i < Product.array.length; i++){
    var listTally = document.createElement('li');
    listTally.textContent = (
      Product.array[i].imgCaption + ' had ' +
      Product.array[i].clicked + ' votes, and was shown ' +
      Product.array[i].shown + ' times.');

    clicks.appendChild(listTally);
  }


}


function randomizer(min, max){
  return Math.floor(Math.random() * (max-min) + min);
}




// =============== STRETCH GOAL STUFF =============== //



// include randomizer check
// do while
// check if random index === the first one
// DO the checking in a loop, see if it equals any of them
// refactor so we don't need first random image


function dynamicRenderImages(){

  var parent = document.getElementById('pick');
  parent.innerHTML = '';

  for (var j = 0; j < numberOfImages; j++){
    var random = randomizer(0,Product.array.length);


    // 2.

    var imageRender = document.createElement('img');

    // 2.5
    imageRender.src = Product.array[random].imgSrc;
    Product.array[random].shown++;



    // 3.
    parent.appendChild(imageRender);

    var captionRender = document.createElement('p');
    captionRender.textContent = Product.array[random].imgCaption;
    parent.appendChild(captionRender);

    // console.log('img render: ' + imageRender);
    // console.log('img render: ' + productArray[random].imgSrc);
  }

  // iterate (numOfImages) times to create X amount of img tags

}


// ==================== invocations ==================== //


// renderRandomProducts();
// dynamicRenderImages();


drawRandomImages();
renderRandomImages();


// ==================== chart functions ==================== //


function createLabelsForChart(){
  for (var i = 0; i < Product.array.length; i++){
    labelsArray.push(Product.array[i].imgCaption);
  }
}


function tallyVotesForChart(){
  for (var i = 0; i < Product.array.length; i++){
    productVotesArray.push(Product.array[i].clicked);
  }
}


function colorRandomizer(){
  for (var i = 0; i < Product.array.length; i++){
    var x = randomizer(0, 255);
    var y = randomizer(0, 255);
    var z = randomizer(0, 255);
    randomColorArray.push('rgba('+x+','+y+','+z+',0.5)');
  }
}


function renderChartToPage(){

  createLabelsForChart();
  colorRandomizer();
  tallyVotesForChart();

  var ctx = document.getElementById('myChart');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsArray,
      datasets: [{
        label: 'Voting Results',
        data: productVotesArray,
        backgroundColor: randomColorArray,
        borderColor: randomColorArray,
        borderWidth: 1,
      }]
    },

    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

