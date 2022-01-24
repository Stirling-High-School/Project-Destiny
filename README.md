# Project-Destiny

[![Google Drive](https://img.shields.io/badge/Google%20Drive%20Folder-Clone%20Files-brightgreen)](https://drive.google.com/drive/folders/1aGFcdof33KhqZ3Pdomi1yxkQJHJKuqbM)
[![App Script](https://img.shields.io/badge/Google%20App%20Script%20API-Clone-blue)](https://script.google.com/d/1Rh7b-zKP_G8Bsf_0FGsHX7yLJeHGuAO6TUnFcOmqAfoTMEQLTqs8qaTE/edit?usp=sharing)

[![Twitter](https://img.shields.io/twitter/follow/Stirling_High?style=social)](https://twitter.com/Stirling_High)
[![Twitter](https://img.shields.io/twitter/follow/beecheyyy?style=social)](https://twitter.com/beecheyyy)
[![Twitter](https://img.shields.io/twitter/follow/ach_henderson?style=social)](https://twitter.com/ach_henderson)

Highly customisable online course choice form for high schools. This has been developed internally for [Stirling High School](https://www.stirlinghigh.co.uk), a Scottish high school, however the core system is extremely customisable, making it ideal for (mostly) every school's course choice use cases. All form responses are stored in a Google Sheet, and all customisation can be done through a separate configuration spreadsheet.

> **If you're a school looking to maximise the potential of this system, please contact either of us directly (angushenderson04@gmail.com or davidtbeechey@gmail.com). We're happy to discuss your needs and help you modify this into a customised solution. Some examples may be: email aliases; custom response formatting; custom domain deployments; or customised branding.**

Identification of users uses Google OAuth, which will require each of your schools students to have their own school Google Account. If you are a Google for Education school, this is yet another reason to use this service, however if you're not, it's not recommended that you use this system. However, if you, or anyone in your school, has some programming experience, feel free to fork this repository and alter it to suit your schools needs!

## Tech Stack Overview

- **Google App Script**: Whilst a slightly unconventional choice for backend languages, the simple integration with Google Sheets made it an ideal language for us to quickly develop a configuration dashboard, and insert form responses into a Google Sheet.
- **React**: Extremely popular frontend Javascript framework which allowed us to build a highly customisable form, styled using Tailwind CSS.
- **Firebase**: For hosting our webapp, and handling all user authentication via Google OAuth.

## Spreadsheet Format Overview

Course choice form deployments are broken down into 3 parts: the overarching project configuration; the individual year configuration; and the individual year form responses. This section gives a summary of the spreadsheets, the section below discusses how to set them up using the templates provided.

### Super Configuration

Technically speaking, this allows the API to route requests to the correct year group form. It also gives you the ability to set whether the individual forms are live or not from one dashboard, as well as centralise common configuration, such as available course levels. In this spreadsheet, on the `Course ID Map` sheet, you configure the routing to all subsequent spreadsheets, which are discussed below.

When deploying the project for your school, you only need to create one Super Configuration spreadsheet. Its this spreadsheet that will handle all relationships between the API and other individual year group spreadsheets.

### Year Configuration

As each year group is likely offered different course options and levels, fine grain control is offered to each year group course choice form. Under the `Course Choices` sheet, you can configure the available courses and levels that are available for that year group to take. These are checkboxes, listed from C column to the right, and the column headings match those specified under the `display_name` column in the `Course Levels` sheet found in the Super Configuration Dashboard. If a year group is able to take a level for this course, simply check the box. There are notes on each heading and config attribute to let you know what they do in more depth.

### Year Form Responses

Responses from individual year groups are stored within separate spreadsheets.

## Setup Guide

There are 3 main phases to this setup guide, with some additional optional steps at the end to elevate your students experience using the service.

### Spreadsheet Setup

[![Google Drive](https://img.shields.io/badge/Google%20Drive%20Folder-Clone%20Files-brightgreen)](https://drive.google.com/drive/folders/1aGFcdof33KhqZ3Pdomi1yxkQJHJKuqbM)

All spreadsheets which are required for this part of the setup can be found within the `Generic Spreadsheet Templates` of the above Google Drive folder. Make a copy of these files to the Google Account you wish to deploy the API from. As these are just Google Sheets, feel free to share them with other members of staff, especially the Form Responses one, although its recommended to keep the Configuration sheets more private to avoid any accidental modifications.

If you would like to see an example deployment (how SHS has used the system), checkout the `Example Deployment` folder. The file structure documented in this folder is how we would recommend using the system, in order to keep everything organised. To explain it here, we recommend creating a dedicated folder in your Google Drive, then adding the super configuration spreadsheet to this root directory. Then, create sub folder for each year group you would like to have a course choice form for, populating each sub-folder with an individual form configuration spreadsheet and form responses spreadsheet. The following setup guide will guide you to populating these spreadsheets. Please note most sheets have notes on cells discussing their uses.

You'll notice that the spreadsheets in the Drive folder have data pre populated. This is to make it easier for you to get started, and to make it easier for us to understand how the system works, however feel free to delete it. If you ever need to see an example deployment, you can always find it in the `Example Deployment` folder.

**It's imperative that you don't rename the sheets in any of these spreadsheets. They are effectively id's.** Do feel free to add your own additional sheets, especially in the form responses spreadsheet should you wish to do your own filtering, however **they cannot be named the same as any of the existing sheets. The system will be unable to process requests if these names are changed!**

### Adding a New Year Group Form

[![Google Drive](https://img.shields.io/badge/Google%20Drive%20Folder-Clone%20Files-brightgreen)](https://drive.google.com/drive/folders/1aGFcdof33KhqZ3Pdomi1yxkQJHJKuqbM)

It's important that you follow the below steps very carefully to make sure that you get everything up and running correctly.

1. Enter your folder in Google Drive where all your course choice configuration is stored and create a new folder for the new year group (e.g. S1-2, S2-3 etc).
2. Now, go to the Google Drive link above and make a copy of the `Form Response Template` and `Year Form Configuration Dashboard Template` into this newly created folder. Feel free to name them whatever you like, just make sure they'll make sense when you look at them in the future.
3. Open up these 2 spreadsheets, and the super configuration spreadsheet in the root project directory. You'll need to add a new row to the `Course ID Map` sheet in the super configuration, make sure the id is unique and copy in the respective spreadsheet id's into the appropriate cells. Then go to the `Course Choices Live` sheet and add a new row, with the newly created ID and a checkbox, this is used to determine wether the course choice form is live or now, its probably best to leave it disabled for now, however make sure to enable it later.
4. This is where you have to start making decisions about what you want the form to ask. Go to the newly created year group configuration spreadsheet.
   1. The template comes with the ability to offer wider achievement options. If you don't want this, leave the `show_wider_achievement_options` box unchecked. Now open the year form responses spreadsheet and delete the `wider_achievement_options` column (right click on the column header and select delete), you can also remove the `Wider Achievement Choices` sheet. If you do want to offer wider achievement options, make sure to populate the `Wider Achievement Choices` sheet with the options you want to offer. Also in the config sheet, populate `wider_achievement_choice_count` and `wider_achievement_message`.
   2. Whilst you're in the config sheet, read the notes of each key, and change the values to what you want them to be.
   3. Now, configure additional form response questions. To do so, open the `Additional Form Fields` sheet and add the rows which you require, make sure to read the column headings to ensure you fill out values correctly. Now, open the Form Responses sheet for this year group and add these newly created fields to the columns. List these to the right in row 1, and **note that the names have to be all lower case and spelled exactly the same as they are in the `Additional Form Fields` sheet**.
5. Set this form to be live, then try it out. Fill out the form and make sure all the data is added to the responses spreadsheet correctly. If you notice anything out of place, revisit the above steps to ensure you have done everything correctly.

### API Setup

[![App Script](https://img.shields.io/badge/Google%20App%20Script%20API-Clone-blue)](https://script.google.com/d/1Rh7b-zKP_G8Bsf_0FGsHX7yLJeHGuAO6TUnFcOmqAfoTMEQLTqs8qaTE/edit?usp=sharing)

1. As mentioned previously, the entire backend is built using Google App Script. To get started, you need to clone the Google App Script to your Google Account. To do this, click the App Script link above, which will take you to the project. Press the Overview tab (the `i` icon on the left hand side of the screen), then `Make a copy` (the copy icon in the top right of the screen). This will make a copy of the project in your Google Drive. You can now close this tab. Open your Google Drive, and move this file to the root project folder you created in the Spreadsheet setup, this will help keep everything in one place.
2. Next, open the cloned project, and open the config.gs file (you'll see this on the left hand panel). On line 2 of this file, you should see something along the lines of: `const ROOT_CONFIGURATION_SPREADSHEET_ID = "1laQGLcOqh0ukifaVeAjvBG7N9mWerIDB7tYOz1cZOa4";`. Replace the id inside the quotation marks with the id of your **root configuration spreadsheet** (see spreadsheet setup if you don't have this id stored). Finally, save the file by either pressing `Ctrl+S` or pressing the save icon along the top bar.
3. Now press `Deploy` (the blue button in the top right), and select new deployment. Press `Web app` in the left hand column (if this doesn't appear press the settings cog on the left, then select `Web app` from the dropdown menu). Enter `live` into the Description box. Under `Execute as`, select `me` (you should see your email address as well). Finally, set `Who has access` to `Anyone`, and press `Deploy` (blue box in bottom right).
4. Once deployed, copy the Web App URL, you'll need this later when setting up the frontend.
5. You can now close this Google App Script window (as long as you have the Web App url saved somewhere for later!)

### Website Setup

1. For our implementation, we deployed our website to Firebase because it offers free static hosting and is easy to set up, however you could deploy it to another service in a similar way. To create a Firebase project, go to the [Firebase console](https://console.firebase.google.com) and click `Create a project`. You can now name your project. You probably don't need Google Analytics so I'd recommend disabling it. On the project overview page, click the add app button. Give your app a name, and then take a note of the firebase config under "Firebase SDK".
2. To configure the website, clone the `course-choice-frontend` folder from the GitHub repository to your computer. Open up the `public` folder - this is where the favicon (the icon shown in the browser tab) and some logos are contained. Go to https://favicon.io/favicon-converter/ and upload the logo you'd like to use for the course choice forms. When you click `Download` you'll get a zipped folder containing a few different files. Extract this folder and copy favicon.ico to the public folder to replace the existing file. Rename the files `android-chrome-192x192` and `android-chrome-512x512` to `logo192` and `logo512` respectively and copy them to the public folder too. Next, open `index.html` and `manifest.json` and replace "SHS Course Choice Forms" and "SHS Course Choice" in each file with the title of your website.
3. Now, in the course-choice-frontend folder, create a file called `.env`. This will hold some configuration for the website. Add the following (replacing the right hand side):

   ```text
   REACT_APP_API_URL=Paste the deployed Web App URL that you copied earlier
   REACT_APP_FIREBASE_API_KEY=apiKey from the firebaseConfig earlier
   REACT_APP_FIREBASE_AUTH_DOMAIN=authDomain from the firebaseConfig earlier
   REACT_APP_FIREBASE_PROJECT_ID=proectId from the firebaseConfig earlier
   REACT_APP_FIREBASE_STORAGE_BUCKET=storageBucket from the firebaseConfig earlier
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=messagingSenderId from the firebaseConfig earlier
   REACT_APP_FIREBASE_APP_ID=appId from the firebaseConfig earlier
   REACT_APP_GOOGLE_DOMAIN=The Google domain for your instutition (end of the email address)
   ```

4. Next, you need to download and install [Node.js](https://nodejs.org/en/download/). Once Node.js is installed, open up a command line in the `course-choice-frontend` folder (this can be done by right clicking inside the folder and selecting `Open in terminal` on Windows/Linux) and run the command `npm install`. This will install all of the dependencies required to build the website. Once this is completed, run `npm run build`. This will create a folder called `build`.
5. Now we can deploy to Firebase! First, run `npm install -g firebase-tools` to install the Firebase CLI. When it has finished installing, run `firebase login` to log in. Once logged in, we can initialise the project by running `firebase init`:

   1. First, select "Hosting: Configure and deploy Firebase Hosting sites"
   2. Choose the option "Use an existing project" and press enter.
   3. Select the Firebase project you just created.
   4. Type `build` as the public directory folder.
   5. When asked if we want to configure as a single-page app type `y` and press enter.
   6. If it asks whether you'd like to override `build/index.html`, type `n` and press enter.

   That's the hosting set up! Now run `firebase deploy` to publish the website to the web!
