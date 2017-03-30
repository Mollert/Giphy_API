var topics = ["SpaceX", "Monaco Grade Prix", "Aurora Borealis", "Iditarod Race", "Yoda",
 "Grizzley Bear", "pizza maker", "James Dean", "The Big Lebowski", "Amy Winehouse", "Oh Brother Where Art Thou"]

// Adding the buttons from the existing array
function generateButtons() {
  $("#giphy-button").empty();
  for (var i = 0 ; i < topics.length; i++ ) {
	   var makeButton = $("<button>");
     makeButton.addClass("btn btn-default button");
     makeButton.attr("data-name", topics[i]);
     makeButton.text(topics[i]);
     $("#giphy-button").append(makeButton);
   };
};

// When a button is clicked-go out and get giphys and show below
$(document).on("click", ".button", function() {
  $("#giphy-image").empty();
	topic = $(this).attr("data-name");
	var search = "https://api.giphy.com/v1/gifs/search?q=" + topic
   + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";

	$.ajax({
          url: search,
          method: "GET"
        })
    	.done(function(response) {
         var results = response.data;
        for (var i = 0 ; i < results.length; i++ ) {
          var rating = results[i].rating;
// Get the string for the giphy
          var giphyUrl = results[i].images.fixed_height_still.url;
// Create a div
          var imgp = $("<div/>");
// Add a class to the div
          imgp.addClass("image-par");
// Develope the img div
          var giphyImg = $("<img>");
// Add giphy and alt to the image
          giphyImg.attr("src", giphyUrl);
          giphyImg.attr("alt", topic + " image");
// Prepare rating to be added to div
          var rateImg = $("<p>").text("Rating: " + rating);
// Add giphy and rating to div
          imgp.append(giphyImg);
          imgp.append(rateImg);
// Add div to image div in the DOM
          $("#giphy-image").append(imgp);
        }
     	});
});

// This code switchs between a active and passive video
$(document).on("click", "img", function() {
  var imgUrl = $(this).attr("src");
  if (imgUrl.includes("_s")) {
    var modImgUrl = imgUrl.replace("_s", "");
  }
  else {
    var modImgUrl = imgUrl.replace(".gif", "_s.gif");
  }
  $(this).attr("src", modImgUrl);
});

// This allows user to submit their own giphy and loads up the text field again
$("#submit").on("click", function(event) {
  event.preventDefault();
  var submitText = $("#new-giphy").val().trim();
  topics.push(submitText);
  generateButtons();
  $("#new-giphy").val("");
});

generateButtons();
