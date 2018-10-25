firebase.auth().languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
  'size': 'invisible',
  'callback': function(response) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});

var phoneNumber = getPhoneNumberFromUserInput();
var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });

var code = getCodeFromUserInput();
confirmationResult.confirm(code).then(function (result) {
  // User signed in successfully.
  var user = result.user;
  // ...
}).catch(function (error) {
  // User couldn't sign in (bad verification code?)
  // ...
});
