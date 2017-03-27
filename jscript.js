var topics = ["SpaceX", "Monaco Grade Prix", "Aurora Borealis", "Iditarod Race", "Yoda",
 "Grizzley Bear", "pizza maker", "James Dean", "The Big Lebowski", "Amy Winehouse", "Oh Brother Where Art Thou"]

//var temp = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC"
//var apiPath = ;
//var topic = "";
//var apiKey = "&limit=2&rating=pg-13&api_key_dc6zaTOxFJmzC";
//var search =  + topic + "&limit=2&rating=pg-13&api_key_dc6zaTOxFJmzC";

//Adding the buttons from the existing array
function generateButtons() {
  $("#giphy-button").empty();
  for ( i = 0 ; i < topics.length; i++ ) {
	   var makeButton = $("<button>");
     makeButton.addClass("btn btn-default");
     makeButton.attr("data-name", topics[i]);
     makeButton.text(topics[i]);
     $("#giphy-button").append(makeButton);
   };
};
//When a button is clicked-go out and get giphys and show below
$(document).on("click", "button", function() {
	topic = $(this).attr("data-name");
	var search = "http://api.giphy.com/v1/gifs/search?q=" + topic
   + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";

	$.ajax({
          url: search,
          method: "GET"
        })
    	.done(function(response) {
          console.log(response);
         var results = response.data;
          console.log(results);

        for ( i = 0 ; i < results.length; i++ ) {
          var rating = results[i].rating;
          console.log(rating);
//I think this is the string for the giphy but not sure
          var giphyUrl = results[i].embed_url;
          console.log(giphyUrl);
          var giphyImg = $("<img>");

          giphyImg.attr("src", giphyUrl);
          giphyImg.attr("alt", topic + " image");
//Prepare rating to place under image
          var rateImg = $("<p>").text("Rating: " + rating);

          $("#giphy-image").append(giphyImg);
          $("#giphy-image").append(rateImg);
        }
     	});
});

$("#submit").on("click", function(event) {
  event.preventDefault();
  var submitText = $("#new-giphy").val().trim();
  topics.push(submitText);
  generateButtons();
  $("#new-giphy").attr("placeholder", "Add giphy topic here")
});

generateButtons();
