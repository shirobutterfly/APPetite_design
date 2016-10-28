// Steps to complete:
/*
1. Upload selected value (drop-down menus) to database through submit button (return false, so page does not refresh)
2. Create object by recording clicked selections (on .click, submit)
4. Input all selected parameter values to find 6 random recipes from Spoontacular API.
5. For each recipe, display api-generated image (that when clicked, opens up the written recipe instructions)
6. When image is clicked, load written recipe, display spotify list with music matching the "mood" parameter). Spotify will display non playing, so we will need to do an on click to start playing music through player. 
6. When image is clicked, use all parameters to display nearby farmers  markets (and grocery stores through Google Maps) through HomeCook API)
7.
*/
// Initialize Firebase


$(document).ready(function() {

// Taylor has added the below

    $('#bottom').hide();

    $('#foodbox #recipeBtn').click(function(){
        $('#bottom').fadeIn(500);
        return false;
    });

});
//end of Taylor edit
  

    var config = {
        apiKey: "AIzaSyA64XfuG6Mr7fNboYH5g3nUnjtbjjXLdcs",
        authDomain: "appetite-d2b29.firebaseapp.com",
        databaseURL: "https://appetite-d2b29.firebaseio.com",
        storageBucket: "appetite-d2b29.appspot.com",
    };

    firebase.initializeApp(config);
    var database = firebase.database();
    var meal;

    function setMeal() {
        meal = document.getElementById('meal').value;
        console.log(meal);
    };
    var nutrition;

    function setNutrition() {
        nutrition = document.getElementById('nutrition').value;
        console.log(nutrition);
    };
    var mood;

    function setMood() {
        mood = document.getElementById('mood').value;
        console.log(mood);
    };

    //var timeframe;
    //  function setTimeframe(){
    //  timeframe = document.getElementById('timeframe').value;
    // console.log(timeframe);
    //  };
    $("#recipeBtn").on("click", function() {
        var ingredient = $("#ingredient").val().trim();
        console.log(ingredient);
        setMeal();
        setNutrition();
        setMood();
        var getRecipe = {
            meal: meal,
            nutrition: nutrition,
            mood: mood,
            ingredient: ingredient,
        }


        //console.log(getRecipe.meal);
        //
        $("#ingredient").val("");

        //return false;

        //});


        // function retrieveRecipes() {
        database.ref().on("child_added", function(childSnapshot, prevChildKey) {
            console.log(childSnapshot.val());
            var meal = childSnapshot.val().meal;
            var nutrition = childSnapshot.val().nutrition;
            var mood = childSnapshot.val().mood;
            var ingredient = childSnapshot.val().ingredient;

        });

        database.ref().on('value', function(dataSnapshot) {
            var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?type=" + meal + "&includeIngredients=" + ingredient + "&maxCalories=" + nutrition + "&cuisine=" + mood + "&api_key=NeDyt1ljNRmshSl2ru2hVQZc8S1jp1omjQVjsneUqixtlRDRCt";
            console.log(queryURL);
            $.ajax({

                url: queryURL,
                method: 'GET',
                dataType: 'json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "NeDyt1ljNRmshSl2ru2hVQZc8S1jp1omjQVjsneUqixtlRDRCt")
                }
            }).done(function(response) {
                console.log(response);
                // var results = response
                addRecipes(response)
                //displayMultipleRecipes()

            });
        });
        //database.ref().push(response)
        function revealrecipe(recipebutton){
           // for j=0{
           var p_revealrecipe = $('<p id="p_revealrecipe">');
            $('#p_revealrecipe').text(recipebutton);
      //  }
    }


        function addRecipes(response) {
            for (var j = 0; j < response.results.length; j++) {
                var recipeDiv = $('<div id="foodbox2">');
                var recipeImage = $('<img class="foodpics col-md-3">');
                recipeImage.Url = response.results[j].image;
                //console.log(recipeImage);
                recipeName = response.results[j].title;
                recipeImage.attr('src', recipeImage.Url);
                recipeImage.attr('alt', recipeName);
                recipeDiv.append(recipeImage);
                $('#recipeImagechoices').prepend(recipeImage);
                
                var recipeid = response.results[j].id;
                //$('recipeImage[').on("click", revealrecipe(recipetext))
                recipeImage[0].onclick = function() {getRecipetext(recipeid);};
            }

        function getRecipetext(recipeid){
            var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + recipeid + '/information?includeNutrition=false'
            //var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=false&url="+ recipeurl;
            //&api_key=NeDyt1ljNRmshSl2ru2hVQZc8S1jp1omjQVjsneUqixtlRDRCt";
            console.log(queryURL);
            $.ajax({

                url: queryURL,
                method: 'GET',
                dataType: 'json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "NeDyt1ljNRmshSl2ru2hVQZc8S1jp1omjQVjsneUqixtlRDRCt")
                }
            }).done(function(response) {
                console.log(response);
                // var results = response
                recipeurl = response.sourceUrl;
                extractRecipe(recipeurl)

            });
        }

        function extractRecipe(recipeurl){
            //var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + recipeid + '/information?includeNutrition=false'
            var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=false&url="+ recipeurl;
            //&api_key=NeDyt1ljNRmshSl2ru2hVQZc8S1jp1omjQVjsneUqixtlRDRCt";
            console.log(queryURL);
            $.ajax({

                url: queryURL,
                method: 'GET',
                dataType: 'json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "NeDyt1ljNRmshSl2ru2hVQZc8S1jp1omjQVjsneUqixtlRDRCt")
                }
            }).done(function(response) {
                console.log(response);
                // var results = response
                recipetitle = JSON.stringify(response.title);
                recipelink = JSON.stringify(response.sourceUrl);
                //var recipebutton = $('<input type="button" src="recipelink" value="recipeltitle" id="recipeBtn3" class="btn btn-primary col-md-2 " role="button" target="_blank">');
                //$("body").append(recipebutton);
                recipebutton = recipetitle + "  " + recipelink
                revealrecipe(recipebutton)

            });
        }

        };
    });

//};
