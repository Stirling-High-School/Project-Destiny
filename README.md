# Project-Destiny

Highly customisable online course choice form for high schools. This has been developed internally for [Stirling High School](https://www.stirlinghigh.co.uk), however the core system is extremely customisable, making it ideal for (mostly) every school's course choice use cases. All form responses are stored in a Google Sheet, and all customisation can be done through a seperate configuration spreadsheet.

Identification of users uses Google OAuth, which will require each of your schools students to have their own school Google Account. If you are a Google for Education school, this is yet another reason to use this service, however if you're not, its not recommended that you use this system. However, if you, or anyone in your school, has some programming experience, feel free to fork this repository and alter it to suit your schools needs!

## Tech Stack Overview

- **Google App Script**: Whilst a slightly unconventional choice for backend languages, the simple integration with Google Sheets maked it an ideal language for us to quickly develop a configuration dashboard, and insert form responses into a google sheet.
- **React**: Extremely popular frontend Javascript framework which allowed us to build a highly customisable form.

## Setup Guide

There are 3 main phases to this setup guide, with some additional optional steps at the end to elevate your students experience using the service.

### Spreadsheet Setup

**list spreadsheet templates to copy and walkthrough of what to set**
**discuss how the configuration is broken down into school, then individual courses**

### API Setup

1. As mentioned above, the entire backend is build using Google App Script. To get started, clone the following Google App Script to your Google Account **LINK TC**
2. Open the cloned project, and open the config.gs file, you'll see this on the left hand panel. On line 2 of this file, you should see something along the lines of `const ROOT_CONFIGURATION_SPREADSHEET_ID = "1laQGLcOqh0ukifaVeAjvBG7N9mWerIDB7tYOz1cZOa4";`. Replace the id inside the quotation marks with the id of your **root configuration spreadsheet** (see spreadsheet setup if you don't have this id stored). Finally, save the file by either pressing Ctrl+s or pressing the save icon along the top bar.
3. Now, press deploy (the blue button in the top right), and select new deployment. Press `Web app` in the left hand column (if this doesn't appear press the settings cog on the left, then select `Web app` from the dropdown menu). Enter `live` into the Description box. Under `Execute as`, select `me` (you should see your email address as well). Finally, set `Who has access` to `Anyone`, and press deploy (blue box in bottom right)
4. Once deployed, copy the Web App url, you'll need this later when setting up the frontend
5. You can now close this Google App Script window (as long as you have the Web App url saved somewhere for later!)

### Website Setup

### Additional Setup (optional!)

- Email alias
- Custom domain
- Adding another year group
