'use strict';

// ==================== GLOBAL VARS / ARRAYS ==================== //

Product.array = [];
var productVotesArray = [];
var randomColorArray = [];
var labelsArray = [];
var tallyShownArray = [];

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
new Product('img/bathroom.jpg', 'iPoop');
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

    wipeOldImages();
    reDrawRandomImages();

  } else {
    alert('please choose a product');
  }

}

function wipeOldImages (){
  var reset = document.getElementById('pick');
  reset.innerHTML = '';

}

// ============ WORKING CODE ============= //

var globalRandomArray = [];

function initialDrawRandomImage(){

  var localRandomArray = [];

  var firstRandom = randomizer(0, Product.array.length);
  var secondRandom = randomizer(0, Product.array.length);
  var thirdRandom = randomizer(0, Product.array.length);

  function drawThreeRandomImages(){
    do {
      secondRandom = randomizer(0, Product.array.length);
      do {
        thirdRandom = randomizer(0, Product.array.length);
      } while (secondRandom === thirdRandom);
    } while ( (firstRandom === secondRandom) ||
    (firstRandom === thirdRandom) ||
    (secondRandom === thirdRandom));

    localRandomArray.push(Product.array[firstRandom]);
    localRandomArray.push(Product.array[secondRandom]);
    localRandomArray.push(Product.array[thirdRandom]);

  }

  drawThreeRandomImages();
  globalRandomArray = [firstRandom,secondRandom,thirdRandom];

  for (var i = 0; i < localRandomArray.length; i++){

    // images
    var parent = document.getElementById('pick');
    var divParent = document.createElement('div');
    parent.appendChild(divParent);

    var imgRender = document.createElement('img');
    imgRender.src = localRandomArray[i].imgSrc;
    localRandomArray[i].shown++;

    //caption
    var captionRender = document.createElement('p');
    captionRender.textContent = localRandomArray[i].imgCaption;

    divParent.appendChild(imgRender);
    divParent.appendChild(captionRender);

    //times shown
    var shownCaption = document.createElement('p');
    shownCaption.textContent = ('Times Shown: ' + localRandomArray[i].shown);
    divParent.appendChild(shownCaption);

    //current votes
    var currentVotesCaption = document.createElement('p');
    currentVotesCaption.textContent = ('Votes: ' + localRandomArray[i].clicked);
    divParent.appendChild(currentVotesCaption);

  }

}


function reDrawRandomImages(){


  var localRandomArray = [];

  var firstRandom = randomizer(0, Product.array.length);
  var secondRandom = randomizer(0, Product.array.length);
  var thirdRandom = randomizer(0, Product.array.length);

  drawThreeRandomImages();


  function drawThreeRandomImages(){
    do {
      secondRandom = randomizer(0, Product.array.length);
      do {
        firstRandom = randomizer(0, Product.array.length);
      } while (firstRandom === secondRandom);

      do {
        thirdRandom = randomizer(0, Product.array.length);
      } while (thirdRandom === firstRandom || thirdRandom === secondRandom);

    } while ( (firstRandom === secondRandom) ||
    (firstRandom === thirdRandom) ||
    (secondRandom === thirdRandom));

  }

  do {
    drawThreeRandomImages();
  } while (
    globalRandomArray.includes(firstRandom) ||
    globalRandomArray.includes(secondRandom) ||
    globalRandomArray.includes(thirdRandom)
  );

  localRandomArray.push(Product.array[firstRandom]);
  localRandomArray.push(Product.array[secondRandom]);
  localRandomArray.push(Product.array[thirdRandom]);

  globalRandomArray = [firstRandom,secondRandom,thirdRandom];


  for (var i = 0; i < localRandomArray.length; i++){

    // images
    var parent = document.getElementById('pick');
    var divParent = document.createElement('div');
    parent.appendChild(divParent);

    var imgRender = document.createElement('img');
    imgRender.src = localRandomArray[i].imgSrc;
    localRandomArray[i].shown++;

    //caption
    var captionRender = document.createElement('p');
    captionRender.textContent = localRandomArray[i].imgCaption;

    divParent.appendChild(imgRender);
    divParent.appendChild(captionRender);

    //times shown
    var shownCaption = document.createElement('p');
    shownCaption.textContent = ('Times Shown: ' + localRandomArray[i].shown);
    divParent.appendChild(shownCaption);

    //current votes
    var currentVotesCaption = document.createElement('p');
    currentVotesCaption.textContent = ('Votes: ' + localRandomArray[i].clicked);
    divParent.appendChild(currentVotesCaption);

  }

}


function randomizer(min, max){
  return Math.floor(Math.random() * (max-min) + min);
}

// ==================== invocations ==================== //


initialDrawRandomImage();


// ==================== chart functions ==================== //

function renderDataForChart(){
  for (var i = 0; i < Product.array.length; i++){
    var product = Product.array[i];

    labelsArray.push(product.imgCaption);
    productVotesArray.push(product.clicked);
    tallyShownArray.push(product.shown);

    var x = randomizer(0, 255);
    var y = randomizer(0, 255);
    var z = randomizer(0, 255);
    var colorString = ('rgba('+x+','+y+','+z+',0.5)');
    randomColorArray.push(colorString);
  }
}

function cleanPageForChart (){
  var hideH1 = document.getElementById('h1');
  hideH1.innerHTML = '';

  var removePics = document.getElementById('pick');
  removePics.remove();

}

function renderChartToPage(){

  cleanPageForChart();
  renderDataForChart();

  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsArray,
      datasets: [{
        label: 'VOTES',
        data: productVotesArray,
        backgroundColor: randomColorArray,
        borderColor: randomColorArray,
        borderWidth: 1,
      },{
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

