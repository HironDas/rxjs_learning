var Rx = require('rx');

var times = [
    { value: 0, time: 100 },
    { value: 1, time: 600 },
    { value: 2, time: 400 },
    { value: 3, time: 700 },
    { value: 4, time: 200 }
];

// Delay each item by time and project value;
var source = Rx.Observable.from(times)
  .flatMap(function (item) {
    return Rx.Observable
      .of(item.value)
      .delay(item.time);
  })
  .debounce(150);

var subscription = source.subscribe(
  function (x) {
    console.log('Next: %s', x);
  },
  function (err) {
    console.log('Error: %s', err);
  },
  function () {
    console.log('Completed');
  });

/*

var array = [
  800,
  700,
  600,
  500
];

var source = Rx.Observable.for(
    array,
    function (x) { return Rx.Observable.timer(x) }
  )
  .map(function(x, i) { return i; })
  .debounce(function (x) { return Rx.Observable.timer(100); });

var subscription = source.subscribe(
  function (x) {
    console.log('Next: %s', x);
  },
  function (err) {
    console.log('Error: %s', err);
  },
  function () {
    console.log('Completed');
  });
*/

/*var source = Rx.Observable.range(0, 5)
    .delay(Rx.Observable.timer(5000),
      function(d){
        console.log(d);
        return Rx.Observable.interval(d*d*1000);
    })
    .timeInterval()
    .map(function(d){ return d});


source.subscribe(function(x){
  console.log(x);
},
function(err){
  console.log(err);
});*/
/*
var source = Rx.Observable.interval(1000)
    .map(function(d, i){ return i;})
    .sample(2000);

    source.subscribe(function(d){
      console.log(d) 
    });*/