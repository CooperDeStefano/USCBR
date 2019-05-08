# USCBR
A gender-neutral bathroom map for the USC campus


Name of your app: UofSCBR

Team Members: Cooper DeStefano and Mallory Baskin

Abstract: This app is to help trans and non-binary identified USC students and anyone else find gender-neutral bathrooms on campus. Users will be able to see a map of campus, see routes to the nearest one, and set the app to their liking

Background: There are existing gender-neutral bathroom map apps, but none that are specific to our campus. The ones that do exist only list 3 of the ones on campus, rather than the 75 that are listed by the OMSA website.

The data we will be using for the map can be found here: https://sc.edu/about/offices_and_divisions/multicultural_student_affairs/student-support/lgbtq_resources/index.php

Functionalities:

Logging in with an email and password

Seeing a map of campus with gender-neutral bathrooms marked

Filter which bathrooms are shown based on their type and rating

Being able to review bathrooms on campus

Creating a profile page with your name and pronouns

## Run commands 

npm install @ionic/storage

ionic cordova plugin add cordova-plugin-firebase

npm install @ionic-native/firebase

ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="..." --variable API_KEY_FOR_IOS="..."

npm install @ionic-native/core @ionic-native/google-maps

ionic cordova plugin add cordova-plugin-geolocation

npm install @ionic-native/geolocation

npm install @angular/fire

npm install firebase

npm install firebase angularfire2

npm install -g firebase-tools

npm i @types/mocha

ionic serve
