# Beeone - Prototype for Open Banking Mobile App

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.io/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

This is a prototype for a native mobile application that makes use of the [Open Bank Project](https://www.openbankproject.com) sandbox API to access open banking data. This app shows you how to easily integrate an open banking API to develop your personal banking app.
Login                      |  View accounts            |  Add account              |  Create counterparty      |  Make payment
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/16804823/112833784-20350200-908f-11eb-91a5-048d9ece5543.png" alt="login" width="210"/>  |  <img src="https://user-images.githubusercontent.com/16804823/112833793-24f9b600-908f-11eb-9ac7-4246a470cc34.png" alt="accounts" width="210"/>  |  <img src="https://user-images.githubusercontent.com/16804823/112833821-2c20c400-908f-11eb-923f-9c9cdfcaeff6.png" alt="addaccount" width="210"/>  |  <img src="https://user-images.githubusercontent.com/16804823/112836097-0c3ecf80-9092-11eb-8276-497acf6e6547.png" alt="pay" width="210"/>  |  <img src="https://user-images.githubusercontent.com/16804823/112833838-2e831e00-908f-11eb-8d44-75faf901cfec.png" alt="pay" width="210"/>

## 🚀 How to use

- Install packages with `yarn` or `npm install`.
  - If you have native iOS code run `npx pod-install`
- Register with Open Bank Project sandbox [here](https://apisandbox.openbankproject.com/user_mgt/login?F135931087425QVWFMP=_) to retrieve a sandbox consumer key
- Run `CONSUMER_KEY=<OBP_API_CONSUMER_KEY> npm start --reset-cache`, where OBP_API_CONSUMER_KEY is the consumer key retrieved from the previous step. This will start the bundler.
- Open the project in a React runtime to try it:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
  - Web: Any web browser
- Once the login screen is loaded, input the username and password for one of the sandbox test users listed in the ```test-customer-logins.txt``` file (this user data was taken from the official Open Bank Project website).
- Now you can view the user's accounts, view their transactions, transfer between their accounts, create counterparties, transfer to counterparties

## 📝 Notes

- Learn more about [Universal React](https://docs.expo.io/).
- See what API and components are [available in the React runtimes](https://docs.expo.io/versions/latest/).
- Find out more about developing apps and websites: [Guides](https://docs.expo.io/guides/).
- Learn more about [Open Bank Project](https://www.openbankproject.com).
