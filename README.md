# Project-Destiny

[![Google Drive](https://img.shields.io/badge/Google%20Drive%20Folder-Clone%20Files-brightgreen)](https://drive.google.com/drive/folders/1aGFcdof33KhqZ3Pdomi1yxkQJHJKuqbM)
[![App Script](https://img.shields.io/badge/Google%20App%20Script%20API-Clone-blue)](https://script.google.com/d/1Rh7b-zKP_G8Bsf_0FGsHX7yLJeHGuAO6TUnFcOmqAfoTMEQLTqs8qaTE/edit?usp=sharing)

[![Twitter](https://img.shields.io/twitter/follow/Stirling_High?style=social)](https://twitter.com/Stirling_High)
[![Twitter](https://img.shields.io/twitter/follow/beecheyyy?style=social)](https://twitter.com/beecheyyy)
[![Twitter](https://img.shields.io/twitter/follow/ach_henderson?style=social)](https://twitter.com/ach_henderson)

Highly customisable online course choice form for high schools. This has been developed internally for [Stirling High School](https://www.stirlinghigh.co.uk), however the core system is extremely customisable, making it ideal for (mostly) every school's course choice use cases. All form responses are stored in a Google Sheet, and all customisation can be done through a separate configuration spreadsheet.

Identification of users uses Google OAuth, which will require each of your schools students to have their own school Google Account. If you are a Google for Education school, this is yet another reason to use this service, however if you're not, its not recommended that you use this system. However, if you, or anyone in your school, has some programming experience, feel free to fork this repository and alter it to suit your schools needs!

## Tech Stack Overview

- **Google App Script**: Whilst a slightly unconventional choice for backend languages, the simple integration with Google Sheets made it an ideal language for us to quickly develop a configuration dashboard, and insert form responses into a google sheet.
- **React**: Extremely popular frontend Javascript framework which allowed us to build a highly customisable form.

## Spreadsheet Format Overview

Course choice form deployments are broken down into 3 parts: the overarching project configuration; the individual year configuration; and the individual year form responses.

### Super Configuration

Technically speaking, this allows the API to route requests to the correct year group form. It also gives you the ability to set whether the individual forms are live or not from one dashboard, as well as centralise common configuration, such as available course levels. In this spreadsheet, on the `Course ID Map` sheet, you configure the routing to all subsequent spreadsheets, which are discussed below.

### Year Configuration

As each year group is likely offered different course options and levels, fine grain control is offered to each year group course choice form. Under the `Course Choices` sheet, you can configure the available courses and levels that are available for that year group to take. These are checkboxes, listed from C column to the right, and the column headings match those specified under the `display_name` column in the `Course Levels` sheet found in the Super Configuration Dashboard. If a year group is able to take a level for this course, simply check the box.

### Year Form Responses

Responses from individual year groups are stored within separate spreadsheets

## Setup Guide

There are 3 main phases to this setup guide, with some additional optional steps at the end to elevate your students experience using the service.

### Spreadsheet Setup

[![Google Drive](https://img.shields.io/badge/Google%20Drive%20Folder-Clone%20Files-brightgreen)](https://drive.google.com/drive/folders/1aGFcdof33KhqZ3Pdomi1yxkQJHJKuqbM)

All spreadsheets which are required for this part of the setup can be found within the `Generic Spreadsheet Templates` of the above Google Drive folder. Make a copy of these files to the Google Account you wish to deploy the API from. As these are just Google Sheets, feel free to share them with other members of staff, especially the Form Responses one, although its recommended to keep the Configuration sheets more private, as to avoid any accidental modifications.

If you would like to see an example deployment (how SHS has uses the system), checkout the `Example Deployment` folder. The file structure documented in this drive folder is how we would recommend using the system, in order to keep everything organised. To explain it here, we recommend creating a dedicated drive folder in your Google Drive, the adding the super configuration spreadsheet to this root directory. Then, create sub folder for each year group you would like to have a course choice form for, populating each subfolder with an individual form configuration spreadsheet and form responses spreadsheet. The following setup guide will guide you to populating these spreadsheets. Please note most sheets have notes on cells discussing their uses.

**list spreadsheet templates to copy and walkthrough of what to set**
**discuss how the configuration is broken down into school, then individual courses**

### API Setup

[![App Script](https://img.shields.io/badge/Google%20App%20Script%20API-Clone-blue)](https://script.google.com/d/1Rh7b-zKP_G8Bsf_0FGsHX7yLJeHGuAO6TUnFcOmqAfoTMEQLTqs8qaTE/edit?usp=sharing)

1. As mentioned above, the entire backend is build using Google App Script. To get started, clone the above Google App Script to your Google Account. To do this, click the above App Script link, which will take you to the project. Press the Overview tab (the i icon on the left hand side of the screen), then `Make a copy` (the copy icon in the top right of the screen). This will make a copy of the project in your Google Drive. You can now close this tab. Open your Google Drive, and move this file to the root project folder you created in the Spreadsheet setup, this will help keep everything in one place.
2. Open the cloned project, and open the config.gs file, you'll see this on the left hand panel. On line 2 of this file, you should see something along the lines of `const ROOT_CONFIGURATION_SPREADSHEET_ID = "1laQGLcOqh0ukifaVeAjvBG7N9mWerIDB7tYOz1cZOa4";`. Replace the id inside the quotation marks with the id of your **root configuration spreadsheet** (see spreadsheet setup if you don't have this id stored). Finally, save the file by either pressing Ctrl+s or pressing the save icon along the top bar.
3. Now, press deploy (the blue button in the top right), and select new deployment. Press `Web app` in the left hand column (if this doesn't appear press the settings cog on the left, then select `Web app` from the dropdown menu). Enter `live` into the Description box. Under `Execute as`, select `me` (you should see your email address as well). Finally, set `Who has access` to `Anyone`, and press deploy (blue box in bottom right)
4. Once deployed, copy the Web App url, you'll need this later when setting up the frontend
5. You can now close this Google App Script window (as long as you have the Web App url saved somewhere for later!)

### Website Setup

### Additional Setup (optional!)

- Email alias
- Custom domain
- Adding another year group
