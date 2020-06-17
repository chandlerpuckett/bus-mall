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
var tallyShownArray = [];

var numberOfImages = 3;
var totalClicks = 0;
var maxClicks = 25;


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
new Product('img/bathroom.jpg', 'angry turd');
new Product('img/boots.jpg', 'soggy toes');
new Product('img/breakfast.jpg', 'breakfast bonanza');
new Product('img/bubblegum.jpg', 'meatball bubble gum');
new Product('img/chair.jpg', 'hump chair');
new Product('img/cthulhu.jpg', 'cthulhu dark lord');
new Product('img/dog-duck.jpg', 'quack');
new Product('img/dragon.jpg', 'dragon meat');
new Product('img/pen.jpg', 'pen utensils');
new Product('img/pet-sweep.jpg', 'dog mop');
new Product('img/scissors.jpg', 'pizza sciccors');
new Product('img/shark.jpg', 'shark sleeping bag');
new Product('img/sweep.png', 'baby sweep');
new Product('img/tauntaun.jpg', 'star wars sleeping bag');
new Product('img/unicorn.jpg', 'unicorn meat');
new Product('img/usb.gif', 'usb tentacle');
new Product('img/water-can.jpg', 'water thine self');
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

      renderChartToPage();
      pickAProduct.removeEventListener('click',handleClickAProduct);
    }

    /*
    1. Wipe HTML for sake of re-render
    2. Re-Draw random images
    */

    wipeOldImages();
    drawRandomImages();

  } else {
    alert('please choose a product');
  }

}

function wipeOldImages (){
  var reset = document.getElementById('pick');
  reset.innerHTML = '';

}

// ---- WHILE LOOP ERASES ARRAY ---- //

// while (randomImageIndexGlobal.length > 0){
//   randomImageIndexGlobal = [];
// }

// function checkDuplicate(x){
//   let arr = x;
//   let map = {};
//   let result = false;
//   for (let i = 0; i < arr.length; i++){
//     if (map[arr[i]]){
//       result = true;
//       break;
//     }
//     map[arr[i]] = true;
//   }
//   if (result){
//     console.log(' found a duplicate in previous round ');
//   } else {
//     console.log(' no duplicate in previous round');
//   }
// }


// checkDuplicate();

// function checkDuplicate(element, index) {
//   let arr = ['abc','xy','bb', 'abc'];
//   for(let i = 0; i < arr.length;i++) {
//     // nested loop
//     for(let j = 0; j < arr.length;j++) {
//       // do not compare same elements
//       if(i !== j) {
//         // check if elements match
//         if(arr[i] === arr[j]){
//           // duplicate element found
//           result = true;
//           // terminate inner loop
//           break;
//         }
//       }
//     }
//     // terminate outer loop
//     if(result){
//       break;
//     }
//   }
//   if(result) {
//     console.log ('Array contains duplicate elements');
//   } else {
//     console.log ('Array does not contain duplicate elements');
//   }
// }


// ============ WORKING CODE ============= //


var randomImageIndexGlobal = [];


function drawRandomImages(){

  var localTestArray = [];

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

  localTestArray.push(Product.array[firstRandom]);
  localTestArray.push(Product.array[secondRandom]);
  localTestArray.push(Product.array[thirdRandom]);

  Product.array[firstRandom].shown++;
  Product.array[secondRandom].shown++;
  Product.array[thirdRandom].shown++;

  // ============ BROKEN TEST ============ //

  // for (var i = 0; i < localTestArray.length; i++){
  //   // debugger;
  //   console.log('first loop: ' + localTestArray[i].imgSrc);

  //   for (var j = 0; j < localTestArray.length; j++){

  //     if (randomImageIndexGlobal[i].imgSrc === localTestArray[j].imgSrc){

  //       console.log('nested loop: duplicate found ');
  //     }
  //   }

  // }

  // var randomImageArray = [];

  // var firstRandomImage = randomizer(0, Product.array.length);
  // randomImageArray.push(firstRandomImage);

  // var randomCount = Math.random() * Product.array.length -1;

  // for (var j = 0; j < randomCount; j++){
  //   var secondRandomImage;

  //   do {
  //     secondRandomImage = randomizer(0, Product.array.length);
  //   } while (secondRandomImage === firstRandomImage);

  //   for (k = 0; k < randomImageArray.length; k++){
  //     if (secondRandomImage === randomImageArray)
  //   }
  // }

  // ============ BROKEN TEST ============ //


  // render images to page -- WORKING CODE -- pulls from localTestArray

  for (var i = 0; i < localTestArray.length; i++){

    // images
    var parent = document.getElementById('pick');
    var divParent = document.createElement('div');
    parent.appendChild(divParent);

    var imgRender = document.createElement('img');
    imgRender.src = localTestArray[i].imgSrc;

    //caption
    var captionRender = document.createElement('p');
    captionRender.textContent = localTestArray[i].imgCaption;

    divParent.appendChild(imgRender);
    divParent.appendChild(captionRender);

    //times shown

    var shownCaption = document.createElement('p');
    shownCaption.textContent = ('Times Shown: ' + localTestArray[i].shown);
    divParent.appendChild(shownCaption);

    //current votes
    var currentVotesCaption = document.createElement('p');
    currentVotesCaption.textContent = ('Votes: ' + localTestArray[i].clicked);
    divParent.appendChild(currentVotesCaption);


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


drawRandomImages();


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

function tallyShownForChart(){
  for (var i = 0; i < Product.array.length; i++){
    tallyShownArray.push(Product.array[i].shown);
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

// ========== BROKEN ========== //
// -- second data set not showing up


function renderChartToPage(){

  var hideH1 = document.getElementById('h1');
  hideH1.innerHTML = '';

  var removePics = document.getElementById('pick');
  removePics.remove();

  createLabelsForChart();
  colorRandomizer();
  tallyVotesForChart();

  var ctx = document.getElementById('myChart');

  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsArray,

      datasets:

      [{
        label: 'VOTES',
        data: productVotesArray,
        backgroundColor: randomColorArray,
        borderColor: randomColorArray,
        borderWidth: 2,
      }],

    },

    data2: {
      labels: labelsArray,
      datasets:
      [{
        label: 'TIMES SHOWN',
        data: tallyShownArray,
        backgroundColor: randomColorArray,
        borderColor: randomColorArray,
        borderWidth: 2,
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

// ==================== OLD CODE ==================== //

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
