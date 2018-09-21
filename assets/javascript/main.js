$(document).ready(function () {
    var animals = ["shark", "panda", "tiger", "cat", "dog", "owl", "rat", "snake", "aligator", "zebra", "monkey", "bear", "hippo", "elephant", "frog", "butterfly"];
    var userInput;
    function displayBtn() {
        $("#gifBtn").empty();
        //create a button when user inputs 
        for (var i = 0; i < animals.length; i++) {
            var animalGifBtn = $('<button>')
            animalGifBtn.addClass("animal");
            animalGifBtn.addClass("btn btn-success m-1")
            animalGifBtn.attr("data-name", animals[i]);
            animalGifBtn.text(animals[i]);
            $("#gifBtn").append(animalGifBtn)
        }
    }
    //and hit add
    function addBtn() {
        $('#addGif').on("click", function (e) {
            e.preventDefault();
            var userInput = $('#animalName-input').val().trim();
            if (userInput !== "") {
                animals.push(userInput);
                displayBtn();
            }
            else {
                alert("Must enter a valid input to proceed!")
            }

        });
    }
    addBtn()
    function removeBtn() {
        $('#removeGif').on("click", function () {
            animals.pop(userInput);
            displayBtn()
            // return false;
        })
    }
    removeBtn()

    $(document).on("click", ".animal", displayAnimalGif)
    displayBtn();

    //function to get data and display
    function displayAnimalGif() {
        var APIKey = "07TTzNbZeSEcKvkECYViKhzrheC3lT3P";
        var animal = $(this).attr("data-name");//what does this line do?
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + APIKey + "&limit10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response)
            $("#gifsHere").empty()
            var animalGifDiv = $('<div class="animalGifDiv card">')
            var r = response.data

            //loopthrough the data object
            for (var i = 0; i < r.length; i++) {

                var rating = r[i].rating
                var rate = $('<p class="card-tittle text-center">').text("Rating: " + rating)
                
                //append the gif urls
                var gifImage = $('<img class= "card-img-top">')
                gifImage.attr("src", r[i].images.fixed_height_still.url);
                gifImage.attr("data-still", r[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", r[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                animalGifDiv.append(rate)
                animalGifDiv.append(gifImage)
                
                $("#gifsHere").prepend(animalGifDiv)
            }
        })
    }
    //pausing gifts
    $(document).on("click", ".animal", displayAnimalGif);
    // $(document).on("click",".image", function(){
    //     var state = $(this).attr('data-state')
    //     if(state = 'still'){
    //         $(this).attr('src',$(this).attr('data-animate'))
    //         $(this).attr('data-state','animate')
    //     }else{
    //         $(this).attr('src',$(this).attr('data-still'))
    //         $(this).attr('data-state','still')

    //     }
    // })

    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    })


});
