//https://stackoverflow.com/questions/37538465/save-current-state-after-jquery-click-function
const $ = require("jquery");

$( ".ilike_comments").each(function(index,item) {
    var target = $(this).find("button");
    var id = $(this).find("button").attr("id");
    var item = localStorage.getItem(id);
    console.log($(this).find("button"));
    
    console.log(localStorage.getItem($(this)));
    
    if (item==0){
         target.css("background-color", "#AEB6BF")
     }else{
         target.css("background-color", "red")
     }
     $(this).find('input').remove().end();
  });

    $(".ilike_comments").on('click', function(event){
    var target = $(event.target);
    console.log($(this).attr("id"));
    var id =$(this).attr("id");
    var active = localStorage.getItem(id);

    console.log(active);
    if (active==1){
        target.css("background-color", "#AEB6BF")
        localStorage.setItem(id, 0);
        console.log("por cojones ha puesto 0");
    }else{
        target.css("background-color", "red")
        localStorage.setItem(id, 1);
        console.log("por cojones ha puesto 1");
    }
});



/*
//https://toddmotto.com/storing-data-in-the-browser-with-the-html5-local-storage-api/
(function() {
    
    var demo = document.querySelector('.localstorage');
    
    function supportsLocalStorage() {
        return typeof(Storage)!== 'undefined';
    }
    
    if (!supportsLocalStorage()) {
        demo.value = 'No HTML5 localStorage support, soz.';
    } else {
        try {
            setInterval(function() {
                localStorage.setItem('autosave', demo.value);
            }, 1000);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!');
            }
        }
        if (localStorage.getItem('autosave')) {
            demo.value = localStorage.getItem('autosave');
        }
        document.querySelector('.clear').onclick = function() {
            demo.value = '';
            localStorage.removeItem('autosave');
        };
        document.querySelector('.empty').onclick = function() {
            demo.value = '';
            localStorage.clear();	
        };
    }
    
})();*/