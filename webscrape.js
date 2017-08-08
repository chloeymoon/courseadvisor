var Nightmare = require('nightmare')
var expect = require('chai').expect


var scraper = new Nightmare()
  .goto('https://courses.wellesley.edu/')
  .wait()
  .evaluate(function(){
    document.querySelector()
  })
