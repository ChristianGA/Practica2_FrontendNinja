const $ = require("jquery");

var moment = require('moment');

function updateTimes() {
  $('.article time.author_date_time').each(function(){
      $(this).text(
          moment($(this).attr("datetime")).fromNow()
      );

  });
};

$(document).ready(function(){
    updateTimes();
    setInterval(updateTimes, 1000);
});