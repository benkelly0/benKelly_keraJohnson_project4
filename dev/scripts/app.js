const app = {};

app.countries = [];

app.score = [];

app.locations = function () {
    $.ajax({
        url: `https://restcountries.eu/rest/v2/all`,
        method: 'GET',
        dataType: 'json'
    }).then((results) => {
        app.countryInfo(results);
    });
};

// create an array of objects out of this forEach loop
app.countryInfo = function(countryArray) {
    countryArray.forEach(function(country){
        if (country.name && country.capital) {
            app.countries.push({
                name: country.name,
                capital: country.capital,
            });
        }
    });
};

// random function 
app.randomizer = function () {
    const random = Math.floor(Math.random() * app.countries.length);
    return app.countries[random];
}

app.getRandomNumber = (number) => Math.floor(Math.random() * number);

app.getAnswers = function(){
    let answers = [];
    for (let i = 0; i < 4; i++) {
        answers.push(app.randomizer());
    }
    app.correctAnswer = answers[app.getRandomNumber(4)];
    // console.log(app.correctAnswer);
    

    // loop through all of the answers
    $('.answerOne').text(answers[0].capital);
    $('.answerTwo').text(answers[1].capital);
    $('.answerThree').text(answers[2].capital);
    $('.answerFour').text(answers[3].capital);
    $('.country').text(app.correctAnswer.name);
    return app.correctAnswer;
};

app.events = function () {
    $('.startButton').on('click', function () {
        // game rules pop up
        $('.gameLoad').addClass('hide');
        // game countdown clock
        let counter = 60;
        $('.clock').append(`<p class="countDown">${counter}</p>`);
        setInterval(function(){
            counter--;
            if(counter >= 0){
                $('.countDown').text(`${counter}`);
            };
            if(counter === 0){
                // alert(`Game Over`);
            };
        },1000);
        app.getAnswers();
      });
      $('.actionButton').on('click', function(e){
          e.preventDefault();
          let clickedAnswer = $(this).text();
          const correctAnswer = app.correctAnswer;
        //   console.log(clickedAnswer, correctAnswer.capital);
          if(clickedAnswer === correctAnswer.capital){
              app.score.push(correctAnswer);
              console.log(app.score);
          }
          app.getAnswers();
        // keep score - increase on right answer
        // push correct answer to score array
      });
}

// populate a new country with 4 new cities on the click of an input on the previous screen 
// tally the score as the player plays 

// create an array/object of responses to display on the screen 

// after the minute is up display the final score 

// init function 
app.init = function () {
    app.events();
    app.locations();
}

// document ready
$(function() {
    app.init();
});
