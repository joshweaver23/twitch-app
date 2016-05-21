$(document).ready(function() {
  
  var streamers = {
    "fccStreamers": [
      "freecodecamp",
      "storbeck",
      "habathcx",
      "RobotCaleb",
      "noobs2ninjas"
    ],
    "diabloThreeStreamers": [
      "bluddshed",
      "wildbill_69"
    ],
    "heathstoneStreamers": [
      "reckful",
      "trumpsc",
      "bmkibler",
      "strifecro",
      "itshafu"
    ],
    "overwatchStreamers": [
      "a_seagull",
      "mym_alkapone",
      "fairlight_excalibur",
      "nyxeira"
    ]
  }
  
  // Cycle through list of streamers
  Object.keys(streamers).forEach(function (key) {
    
    streamers[key].forEach(function (streamer) {
      // Determine content type
      var subject = "";
      if (key === "fccStreamers") {
        subject = "code";
      }
      else {
        subject = "game";
      }

      // Determine on-air status
      var streaming = "";
      $.getJSON('https://api.twitch.tv/kraken/streams/'+streamer+'?callback=?', function(data) {
        if (data.stream != null) {
          streaming = "live";
        }
        else {
          streaming = "off-air";
        }
        
        // Retrieve data AJAX for each streamer
      $.getJSON('https://api.twitch.tv/kraken/channels/'+streamer+'?callback=?', function(data) {
        // Handle closed or non-existant accounts
        if (data.display_name == undefined) {
          $('#data').append("<tr><td><img src='https://upload.wikimedia.org/wikipedia/commons/4/4a/QuestionMark_arial.png'></td><td>Account Closed</td><td>null</td><td>null</td><td>null</td></tr>");
        }
        // Append streamer data to HTML table
        else {
          $('#data').append("<tr class='"+streaming+" "+subject+"'><td><img src='"+data.logo+"'></td><td><a href='"+data.url+"' target='blank'>"+data.display_name+"</a></td><td>"+data.game+"</td><td>"+data.status+"</td><td>"+data.mature+"</td></tr>");
        }        
      });
                
      });
      
      
            
    });
  });
    
  
  
  // Sort table with "on-air" first"
  $('#live-first').click(function() {
    // make clicked button "active"
    $(this).siblings().each(function(){
      $(this).removeClass("active");
    });
    $(this).addClass("active");
    
    // Clear hide tags
    $("#data").children().each(function() {
      $(this).removeClass("hide");
    });
    // Create array of streamers in order of live first
    var orderedStreamers = [];
    // Find and add live streamers first
    $("#data").children().each(function() {
      var tableRow = $(this);
      if (tableRow.hasClass("live")) {
        orderedStreamers.push("<tr class='live "+tableRow.attr("class")+"'>"+tableRow.html()+"</tr>");
      }
    });
    // add off-line streamers second
    $("#data").children().each(function() {
      var tableRow = $(this);
      if (tableRow.hasClass("off-air")) {
        orderedStreamers.push("<tr class='off-air "+tableRow.attr("class")+"'>"+tableRow.html()+"</tr>");
      }
    });
    // Clear out unordered table data then add ordered table data
    $("#data").html(null);
    for (var i = 0; i < orderedStreamers.length; i++) {
      $('#data').append(orderedStreamers[i]);
    }
    
  });
  
  // Display table with only live, code, or game
  var hideFunction = function(htmlId, classCheck) {
    $(htmlId).click(function() {
      // make clicked button "active"
      $(this).siblings().each(function(){
        $(this).removeClass("active");
      });
      $(this).addClass("active");
      
      // clear "hidden" tags
      $("#data").children().each(function() {
        $(this).removeClass("hide");
      });
      
      // tag clicked item type as hidden
      $("#data").children().each(function() {
        var tableRow = $(this);
        if (!tableRow.hasClass(classCheck)) {
          $(this).addClass("hide");
        }
      });

    });
  }
  
  hideFunction('#live-only', "live");
  hideFunction('#code-only', "code");
  hideFunction('#games-only', "game");
  
  // $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?', function(data) {
  //   console.log(data);
  // });
  // $.getJSON('https://api.twitch.tv/kraken/channels/freecodecamp?callback=?', function(data) {
  //   console.log(data);
  // });
  
  
  
  
  
})