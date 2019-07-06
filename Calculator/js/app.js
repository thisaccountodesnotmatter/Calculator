/* Calculator v0.1
Author, Andres Arrieta
Next version Ideas:
Keyboard Support
NaN cases addressed (imaginary numbers)
*/

var calc = document.getElementById("display");
var lastNum = "0";
var dec = false;
var positive = true;
var firstNum;
var keep = 0;

var calculator = (function(){
    var operation = "";

    function down(){
      this.style.transform="scale(0.9)";
      if (this.id =="mas" || this.id == "menos" || this.id == "por" || this.id == "dividido" || this.id == "raiz"){
        processOperation(this.id)
      } else if (this.id == "on") {
        tunrOn()
      } else if (this.id == "sign") {
        changeSign()
      }else if (this.id == "igual") {
        go();
      } else {
        processNumber(this.id)
      }
    }

    function up(){
      this.style.transform="scale(1.0)";
    }

    function processOperation(key){
      firstNum = Number(lastNum);
      if(key == "raiz"){
        lastNum = Math.sqrt(firstNum).toString();
        showNumber();
      } else {
        operation = key;
        lastNum = ""
        showNumber();
      }
    }

    function tunrOn(){
      lastNum = "0";
      operation = "";
      dec = false;
      positive = true;
      var keep = 0;
      showNumber()
    }

    function processNumber(key){
      if(key == "punto"){
        if (dec == true) {
          lastNum = lastNum;
        }else {
          lastNum = lastNum + ".";
          dec = true;
        }
      } else if (lastNum == "0") {
        lastNum = key;
      } else {
        lastNum = lastNum + key;
      }

      showNumber();
    }

    function changeSign(){
      if (positive == true && lastNum != "0"){
        lastNum = "-" + lastNum;
        positive = false;
      } else if(lastNum == "0"){
        lastNum = lastNum;
      } else{
        lastNum = lastNum.slice(1);
        positive = true;
      }
      showNumber();
    }

    function showNumber (){

      if (lastNum.length > 8){
      display.innerHTML = lastNum.slice(0, 8);
      } else {
        display.innerHTML = lastNum;
      }
    }

    function adition(a, b){
      return a + b;
    }

    function substraction(a, b){
      return a - b;
    }

    function multiplication(a, b){
      return a * b;
    }

    function dividision(a, b){
      return a/b;
    }

    function go(){
      switch(operation) {
        case "mas":
        if (keep !== firstNum){
          keep = Number(lastNum);
        } else {
          keep = keep;
        }
          lastNum = adition(firstNum, Number(lastNum)).toString();
          firstNum = keep;
          showNumber();
          break;
        case "menos":
        if (keep !== firstNum){
          keep = Number(lastNum);
        } else {
          keep = keep;
        }
        if (firstNum !==keep ){
          lastNum = substraction(firstNum, Number(lastNum)).toString();
        } else {
          lastNum = substraction(Number(lastNum), firstNum).toString();
        }
          firstNum = keep;
          showNumber();
          break;
        case "por":
        if (keep !== firstNum){
          keep = Number(lastNum);
        } else {
          keep = keep;
        }
          lastNum = multiplication(firstNum, Number(lastNum)).toString();
          firstNum = keep;
          showNumber();
          break;
        case "dividido":
        if (keep !== firstNum){
          keep = Number(lastNum);
        } else {
          keep = keep;
        }
        if (firstNum !==keep ){
          lastNum = dividision(firstNum, Number(lastNum)).toString();
        } else {
          lastNum = dividision(Number(lastNum), firstNum).toString();
        }
          firstNum = keep;
          showNumber();
          break;
        default:
          alert("Ocurrio un error, favor reiniciar la pagina");
        }
    }

    return {
      init: function(){
        var keys = document.getElementsByClassName('tecla')
        for (var i = 0; i < keys.length; i++){
            keys[i].addEventListener("mousedown", down)
            keys[i].addEventListener("mouseup", up)
        }

      }
    }
  })

calculator().init()
