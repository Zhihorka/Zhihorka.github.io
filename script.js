
function fastHashCode(s) {
    for(var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}


String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; 
    }
    return hash;
}



function getInputValue(){
    var inputVal = document.getElementById("string-input").value;
    return inputVal;
}

function getMainTextValue(){
    var inputVal = document.getElementById("text-input").value;
    return inputVal;
}

function simpleSearch(text, str) {
    var matches = [];
    for (var i = 0; i <= text.length; i++) {
      if (matchesAtIndex(i, text, str)) {
        matches.push(i);
      }
    }
    return matches;
  }
  
  var primeBase = 31;
  
  function searchRabinKarp(text, str) {
    var matches = [];
  
    var hashStr = hashFromTo(str, 0, str.length);
    var hashTextPart = hashFromTo(text, 0, str.length);
    var primeToPower = Math.pow(primeBase, str.length);
    var maxIndexForPotentialMatch = text.length - str.length;
  
    for (var i = 0; i <= maxIndexForPotentialMatch; i++) {
      if (hashTextPart === hashStr) {
        if (matchesAtIndex(i, text, str)) {
          matches.push(i);
        }
      }
      hashTextPart = primeBase * hashTextPart - primeToPower * text.charCodeAt(i) + text.charCodeAt(i + str.length);
    }
  
    return matches;
  }
  
  function matchesAtIndex(index, text, str) {
    var matches = true;
  
    for (var j = 0; j < str.length; j++) {
      if (text[index + j] !== str[j]) {
        matches = false;
        break;
      }
    }
    return matches;
  }
  
  function hashFromTo(str, from, to) {
    var hash = 0;
    for (var i = from; i < to && i < str.length; i++) {
      hash = primeBase * hash + str.charCodeAt(i);
    }
    return hash;
  }
  
  /*
   * Tests. Very primitive and naive approach for test running:
   * 1. Exceptions that may occur during a test should be handled
   * 2. Different sets of tests can be grouped into suites
   * 3. Execution should be delayed until we want to actually run the test, i.e.
   * we should pass not a boolean 'condition' to the 'test' function, but a function
   */
  
  var testResults = {pass: 0, fail: 0}
  
  function test(description, condition) {
    console.log(description);
    if (!condition) {
      testResults.fail += 1;
      console.log("FAIL");
    } else {
      testResults.pass += 1;
      console.log("PASS");
    }
    return condition;
  }
  
  function reportResults() {
    console.log("PASS=" + testResults.pass);
    console.log("FAIL=" + testResults.fail);
    if (testResults.fail > 0) {
      throw "Tests FAILED and should be fixed!";
    } else {
      console.log("Tests PASSED.");
    }
  }
  
  function assertArrayEquals(thisArr, thatArr){
    thisArr = thisArr.join(",");
    thatArr = thatArr.join(",");
    var arraysEqual = ( thisArr === thatArr);
  
    if (!arraysEqual) {
      console.log("Expected [" + thisArr + "] but was [" + thatArr + "]");
    }
    return arraysEqual;
  }

class RabinCarp{
    construcor(pattern){
        this.R = 256;
        this.patternLength = pattern.length;
        this.q = randomPrime();

        this.pattern = null;

        this.RM = 1;
        for(let i = 1; i <= this.patternLength-1;i++){
            this.RM = (this.R*this.RM)%this.q;
        }
        this.patternHash = this.hash(pattern,this.patternLength);    
    }
    hash(key,m){
        let h = 0;
        for (let j = 0; j <m; j++){
            h = (this.R *h + key.charCodeAt(j))%this.q;
        }
        return h;
    }
    randomPrime(){
        return 15487469;
    }
    search(inputSearchString){
        const n = inputSearchString.length;
        if (n<this.patternLength){
            return n;
        }
        let txtHash = this.hash(inputSearchString,this.patternLength);
        if (this.patternHash === txtHash) return 0;

        for(let i = this.parretnLength; i <n; i++){
            txtHash = (txtHash + this.q - this.RM * inputSearchString.charCodeAt(i-this.patternLength)%this.q)%this.q;
            txtHash = (txtHash*this.R + inputSearchString.charCodeAt(i))%this.q;
            
            const offset = i - this.patternLength + 1;

            if (this.patternHash === txtHash) return offset;
        }
        return n;
    }
}
var algorithmSelected = document.getElementById('algoritm-select');
var registerOption = document.getElementById('register-select');
var input = document.getElementById("string-input");


input.addEventListener("keyup", function(event) {
  if ((event.keyCode === 13)&&(algorithmSelected.value == "Hash-option")){

   var time = performance.now();
   searchText = getInputValue();
   mainText = getMainTextValue();
   if (registerOption.value == "No-option"){
    searchText= searchText.toLowerCase();
    mainText=  mainText.toLowerCase();
    }
    let Rabin = new RabinCarp(searchText);
   resulter = searchRabinKarp(mainText,searchText);

  
  time = performance.now() - time;
  if ( resulter<=0){
    alert("По вашему запросу ничего не найдено !")
}else if ( resulter != 0){
   
alert("начало: " +( resulter)+"   время выполнения: " + time.toFixed(3)+" мс");
}
  }
  if ((event.keyCode === 13)&&(algorithmSelected.value == "Standart-option") ){

   searchText = getInputValue();
   mainText = getMainTextValue();
   
   if (registerOption.value == "No-option"){
    searchText = searchText.toLowerCase();
    mainText = mainText.toLowerCase();
   }
    var time = performance.now();
    var startPoint = mainText.search(searchText);
    time = performance.now() - time;
    if (((startPoint - searchText.length)<=0)||(startPoint<=0)){
        alert("По вашему запросу ничего не найдено !")
    }else if (startPoint != 0){
    alert("начало: " + (startPoint - searchText.length)+"   конец: "+ startPoint + "   время выполнения: " + time.toFixed(3)+" мс");;
    } 
}
});