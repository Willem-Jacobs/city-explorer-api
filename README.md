# city-explorer-api

**Author**: Willem Jacobs
**Version**: 1.0.3 (increment the patch/fix version number if you make more commits past your first submission)
**Deployed Site**: https://city-explorer-api-wamj.herokuapp.com/

## Overview

Backend server for the city explorer site. The backend gets uses API for weather information and a movie API to get movies. Items are cached for 10 seconds for testing.

## Getting Started

- Clone from repo. [Link to Repo](https://github.com/Willem-Jacobs/city-explorer-api)
- `npm install` or `npm i` to install dependencies.
- `.env` file needed with the API keys or other items needed for the site. Ensure .env is added to the `.gitignore` file.
  - `PORT=3001`
  - WEATHER_API_KEY needed in .env file
  - MOVIE_API_KEY needed in .env file

## Architecture

- Trello for Project Management
- Node.JS
- express
- dotenv
- cors
- Heroku for deployment
- nodemon to run server and restart at change to files.
- UML lab-06 - ![UML](CE-Lab06-UML.png "UML Image")
- UML lab-07 - ![UML](CE-Lab07-UML.png "UML Image")
- UML Lab-08 - ![UML](CE-Lab08-UML.png "UML Image")
- UML Lab-10 - ![UML](CE-Lab10-UML.png "UML Image")

## Change Log

07.27.2021 10:30am (V1.0.0) - Basic structure setup and deployed along with first route to weather. Used dummy data on a JSON file for now.

08.03.2021 10:50pm (v1.0.1) - Added call from server to weatherbit.io to get the 5 day forecast for the city eneted and return the data to front-end formatted as needed.

08.04.2021 9:19pm (v1.0.2) - Added the MovieDB API call to get movies using the city search string. Checks for the city name in the title. Creates a new data structure using a class and returns the data to the client.

08.07.2021 02:05pm (v1.0.3) - Created a weather.js and a movies.js to make them be their own module(component) that is imported into server.js to be used.

08.11.2021 08:30pm (v1.0.4) - Restructed backend to use modules correctly breaking up the code per endpoint function. Added caching for the weather and the movies. Stretch goal completed

## Credit and Collaborations

No collaborations from others on this project.

### Feature Lab-07 Trello Card #1

**Name of feature:** Basic structure setup and deployed

**Estimate of time needed to complete:** 1 hour

**Start time:** 09:30am

**Finish time:** 10:50am

**Actual time needed to complete:** 1:20 hour

### Feature 2 Lab-07 Trello Card #2

**Name of feature:** Route to /weather to get the data needed

**Estimate of time needed to complete:** 2 hours

**Start time:** 03:30pm

**Finish time:** 05:30pm

**Actual time needed to complete:** Hard to say as I worked on the front end and back end at the same time.

### Feature Lab 08 Trelly card 01

**Name of feature:** Fetch weather from weatherbit.i0

**Estimate of time needed to complete:** 1 hour

**Start time:** 9:30pm

**Finish time:** 10:30pm

**Actual time needed to complete:** 1 hour.

### Feature Lab-08 various cards

**Name of feature:** Weather from API and MovieDB API

**Estimate of time needed to complete:** 2 hours

**Start time:** 2 days various times

**Finish time:** unknown

**Actual time needed to complete:** about 2 hours to complete as I did plenty testing to ensure data correct and to learn. Probably could reduce to 1 hour if I worked only on these fatures.

### Feature Lab-09 various cards

**Name of feature:** Create movies.js and weather.js components

**Estimate of time needed to complete:** 30 mins

**Start time:** 01:50pm

**Finish time:** 02:05pm

**Actual time needed to complete:** 15 minutes. This a simple process for me.

### Feature Lab-10 Card 1

**Name of feature:** Starter Code/Debug/Add caching

**Estimate of time needed to complete:** 2 hours

**Start time:** various

**Finish time:** various

**Actual time needed to complete:** I spend most of the day working on this but a lot of my time was research and testing on another server app I use for testing. I would say I sepend about 3 hours working on this card from Trello but I moved the movies to the caching also. I used the start code for this lab and moved my old server files to a folder called `old`. The stretch goal for card 1 is completed where it shows you on the weather card (front end) how much time in seconds has passed since the last cache of the data. I was going to add the Yelp items but I need some sleep tonight as the last 4 nights have been 5 hours sleep only.
