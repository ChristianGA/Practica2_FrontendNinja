//https://stackoverflow.com/questions/37538465/save-current-state-after-jquery-click-function
const $ = require("jquery");

$('#ilike-1').click(function(event){
    var target = $(event.target);
    console.log(target.isLiked);
    if (target.isLiked){
        target.css("background-color", "$form-button-background-color")
    }else{
        target.css("background-color", "red")
    }

    var isLiked = $('#ilike-1').is(":visible"); 
    sessionStorage.setItem('liked', isLiked); //localStorage - stores data with no expiration date / sessionStorage - stores data for one session (data is lost when the browser tab is closed)
});

// stored in localStorage as string, `toggle` needs boolean
var isLiked = sessionStorage.getItem('liked') === 'false' ? false : true;
$('#ilike-1').toggleClass(isLiked);

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