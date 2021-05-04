const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');

const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');

// https://www.petefreitag.com/cheatsheets/ascii-codes/
// grab characters from ascii. ^^^cheatsheet above^^^
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
console.log(UPPERCASE_CHAR_CODES);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
console.log(LOWERCASE_CHAR_CODES);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
console.log(NUMBER_CHAR_CODES);
//symbols are scattered, so we can concatinate the different sections
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
);
console.log(SYMBOL_CHAR_CODES);

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array;
}

/// syncs the range input slider amount together with the number input
function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}
characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);

// Function to prompt user for password options
function getPasswordOptions() {
    // Variable to store length of password from user input
    var length = parseInt(
      prompt('How many characters would you like your password to contain?')
    );
  
     // Conditional statement to check if password length is a number. Prompts end if this evaluates false
  if (isNaN(length) === true) {
    alert('Password length must be provided as a number');
    return;
  }
  
    // Conditional statement to check if password length is at least 8 characters long. Prompts end if this evaluates false
    if (length < 8) {
        alert('Password length must be at least 8 characters');
        return;
      }
    
      // Conditional statement to check if password length is less than 128 characters long. Prompts end if this evaluates false
      if (length > 128) {
        alert('Password length must less than 129 characters');
        return;
      }
    
      // Variable to store boolean regarding the inclusion of special characters
      var hasSpecialCharacters = confirm(
        'Click OK to confirm including special characters.'
      );
    
      // Variable to store boolean regarding the inclusion of numeric characters
      var hasNumericCharacters = confirm(
        'Click OK to confirm including numeric characters.'
      );
    
      // Variable to store boolean regarding the inclusion of lowercase characters
      var hasLowerCasedCharacters = confirm(
        'Click OK to confirm including lowercase characters.'
      );
    
      // Variable to store boolean regarding the inclusion of uppercase characters
      var hasUpperCasedCharacters = confirm(
        'Click OK to confirm including uppercase characters.'
      );
    
      // Conditional statement to check if user does not include any types of characters. Password generator ends if all four variables evaluate to false
      if (
        hasSpecialCharacters === false &&
        hasNumericCharacters === false &&
        hasLowerCasedCharacters === false &&
        hasUpperCasedCharacters === false
      ) {
        alert('Must select at least one character type');
        return;
      }
    
      // Object to store user input
      var passwordOptions = {
        length: length,
        hasSpecialCharacters: hasSpecialCharacters,
        hasNumericCharacters: hasNumericCharacters,
        hasLowerCasedCharacters: hasLowerCasedCharacters,
        hasUpperCasedCharacters: hasUpperCasedCharacters
      };
    
      return passwordOptions;
    }

    // Function for getting a random element from an array
function getRandom(arr) {
    var randIndex = Math.floor(Math.random() * arr.length);
    var randElement = arr[randIndex];
  
    return randElement;
  }
  
  // Function to generate password with user input
  function generatePassword() {
    var options = getPasswordOptions();
    // Variable to store password as it's being concatenated
    var result = [];
  
    // Array to store types of characters to include in password
    var possibleCharacters = [];
  
    // Array to contain one of each type of chosen character to ensure each will be used
    var guaranteedCharacters = [];
  
    // Conditional statement that adds array of special characters into array of possible characters based on user input
    // Push new random special character to guaranteedCharacters
    if (options.hasSpecialCharacters) {
      possibleCharacters = possibleCharacters.concat(specialCharacters);
      guaranteedCharacters.push(getRandom(specialCharacters));
    }
  
    // Conditional statement that adds array of numeric characters into array of possible characters based on user input
    // Push new random special character to guaranteedCharacters
    if (options.hasNumericCharacters) {
      possibleCharacters = possibleCharacters.concat(numericCharacters);
      guaranteedCharacters.push(getRandom(numericCharacters));
    }
  
    // Conditional statement that adds array of lowercase characters into array of possible characters based on user input
    // Push new random lower-cased character to guaranteedCharacters
    if (options.hasLowerCasedCharacters) {
      possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
      guaranteedCharacters.push(getRandom(lowerCasedCharacters));
    }
  
    // Conditional statement that adds array of uppercase characters into array of possible characters based on user input
    // Push new random upper-cased character to guaranteedCharacters
    if (options.hasUpperCasedCharacters) {
      possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
      guaranteedCharacters.push(getRandom(upperCasedCharacters));
    }
  
    // For loop to iterate over the password length from the options object, selecting random indices from the array of possible characters and concatenating those characters into the result variable
    for (var i = 0; i < options.length; i++) {
      var possibleCharacter = getRandom(possibleCharacters);
  
      result.push(possibleCharacter);
    }
  
    // Mix in at least one of each guaranteed character in the result
    for (var i = 0; i < guaranteedCharacters.length; i++) {
      result[i] = guaranteedCharacters[i];
    }
  
    // Transform the result into a string and pass into writePassword
    return result.join('');
  }
  
  // Get references to the #generate element
  var generateBtn = document.querySelector('#generate');
  
  // Write password to the #password input
  function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector('#password');
  
    passwordText.value = password;
  }
  

  // Add event listener to generate button
  generateBtn.addEventListener('click', writePassword);
  
    