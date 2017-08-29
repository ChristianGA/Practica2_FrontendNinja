const $ = require("jquery");

$(document).ready(function () {

var state=true;
$("button").click(function () {

   if(state){
       $(this).css("background-color", "$form-button-background-color-like");
   }
   else{
       $(this).css("background-color", "$form-button-background-color");
   }
   state=!state;
});
});