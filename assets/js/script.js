var userFormEl = document.querySelector('#username');
var nameInputEl = document.querySelector('#user-input')

var formSubmitHandler = function (event) {
    event.preventDefault();

    var username = nameInputEl.value.trim();

    if (username) {
        getHighscores(username);

        // repoContainerEl.textContent = '';
        nameInputEl.value = '';
    } else {
        alert('Please enter a valid RSN');
    }
};

// how do i listen to form inout for a string?
var getHighscores = function () {   
    // concat string with url query param
    var apiUrl = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=' + nameInputEl;
    
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
    });
};


// sort through data and display in table

userFormEl.addEventListener('submit', formSubmitHandler);