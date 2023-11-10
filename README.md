# Wordle-in-Ukrainian-Web
WORDLE web game in Ukrainian. Can be played multiple times with no daily limits.


### Features

+ Ability to choose between dark and light mode
+ Statistics and rules look-up at any time
+ Optimized for most mobile devices
+ Includes virtual keyboard and supports typed text on the keyboard with Ukrainain letters
+ Uses `localStorage` to store user's progress


### How To Use

The game can be run in the browser by using `http-server`.
Once the game starts user has 6 attempts to guess a selected word in Ukrainian. With every try, user receives feedback in the form of colored letter boxes and highlighed keys on the virtual keyboard. Green means that the letter is in the right place, yellow signifies the right letter in the wrong spot, while gray marks letters that are not a part of the word.
User can access game rules and statistics at any time. It is also possible to move to another word without guessing the previous one and change the color theme (dark/light).


### Table Of Contents

1. `index.html` with the markup of the page.
2. `style.css` with added styles to elements.
3. `index.js` with the main implementation of the game.
4. `all_words.js` with a list of 5-letter words in Ukrainian from the dictionary by [slavkaa/ukraine_dictionary](https://github.com/slavkaa/ukraine_dictionary).
5. `dictionary_process.py` contains a Python script that extracts 5-letter long words into `all_words.js` file. Used `pandas` library to get values from the file with .xlsx extension.


### Libraries/Frameworks/Resources Used 

- List of words from [slavkaa/ukraine_dictionary](https://github.com/slavkaa/ukraine_dictionary) processed using Python pandas library
- Pop-up notifications by [toastify](https://github.com/apvarun/toastify-js)
- [Bootstrap](https://getbootstrap.com/)
- [Google Fonts](https://fonts.google.com/)
- [pandas](https://pandas.pydata.org/)


#### Possible issues

+ List of words to guess is hardcoded to 365 words in order to eliminate duplication of the forms of the same word in different tenses, numbers and grammatical cases or extremely rare words.
This means that there can be total up to 365 games.
+ List of possible word forms does not fully reflect the variety of all words in Ukrainian, so some valid words could be marked as the ones that do not exist.

