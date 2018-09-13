$(document).ready(function () {
    var animals = ["shark", "panda", "tiger", "cat", "dog", "owl", "rat", "snake", "aligator", "zebra", "monkey", "bear", "tiger", "hippo", "elephant", "frog", "butterfly"];

    function displayBtn() {
        $("#gifBtn").empty();
        //create a button when user inputs 
        for (var i = 0; i < animals.length; i++) {
            var animalGifBtn = $('<button>')
            animalGifBtn.addClass("animal");
            animalGifBtn.addClass("btn btn-success mx-1")
            animalGifBtn.attr("data-name", animals[i]);
            animalGifBtn.text(animals[i]);
            $("#gifBtn").append(animalGifBtn)
        }
    }
    //and hit add
    $('#addGif').on("click", function (e) {
        e.preventDefault();
        var userInput = $('#animalName-input').val().trim();
        animals.push(userInput);
        displayBtn();
    });

    $(document).on("click", ".animal", displayAnimalGif)
    displayBtn();

    //function to get data and display
    function displayAnimalGif() {
        var APIKey = "07TTzNbZeSEcKvkECYViKhzrheC3lT3P";
        var animal = $(this).attr("data-name");//what does this line do?
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            $("#gifsHere").empty()
            var animalGifDiv = $("<div class='theActualGifsBox'>")
            var r = response.data
            //loopthrough the data object
            for(var i=0; i<r.length;i++){
                $(".theActualGifsBox").append(r[i].rating)
            
            var rating = r[i].rating
            var rate = $("<p>").text("Rating: " + rating)
            animalGifDiv.append(rate)
            //append the gif url
            var gifURL = r[i].images.fixed_height_small.url;
            var gif = $("<img>").attr("src", gifURL)
            animalGifDiv.append(gif)
            $("#gifsHere").prepend(animalGifDiv)
            }

        })
    
    }





});
