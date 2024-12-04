# <img src="https://skillicons.dev/icons?i=react" height="40" alt="react logo"  /> Starwars Blog Reading List

Technologies: HTML, CSS, React.js, Bootstrap CSS

Create a minimalist version of the [Star Wars Databank](https://www.starwars.com/databank) with "Read Later" list functionality.

### Demo

![Starwars Demo](https://github.com/breatheco-de/exercise-starwars-blog-reading-list/blob/master/preview.gif?raw=true)

## Instructions

1. Use Bootstrap components.
2. Take some time to understand the [SWAPI.tech](https://www.swapi.tech/documentation) API, this will be our source of information, we will be consuming this API.
3. Fetch the SWAPI's people, vehicles, and planets to display them on your application.
4. Declare a `favorites` array in your central store and allow the user to add or remove favorites.

### Building the grid

- Create a React webapp that lists the _people_, _vehicles_ and _planets_ entities provided by the [SWAPI](https://www.swapi.tech/documentation).

   <img height="400" src="https://raw.githubusercontent.com/nachovz/projects/master/p/javascript/semi-senior/startwars-blog-reading-list/sw_data.png" />

### Building a "Details" view

- Each entity should have a short description (Bootstrap Card) and a "Details" view (Bootstrap components):

   <img height="400" src="https://raw.githubusercontent.com/nachovz/projects/master/p/javascript/semi-senior/startwars-blog-reading-list/sw_data_details.png" />

**_Important_**: The SWAPI doesn't provide the images, you can use https://starwars-visualguide.com to get the images easily. The focus of this exercise is to practice _fetch_, _router_, and _context_. Also, you can focus on the color theme and a simple layout to make it look good.

**_Important 2_**: Don't worry if the data you get from the SWAPI doesn't match the data you see in starwars.com.

Use all the information provided by the SWAPI (check the docs and/or the JSON responses).

### "Read Later" functionality

Implement a "Read Later" functionality, i.e., a button that allows the user to "save" the item (character, vehicle or planet) into a special list. The location of this list is your choice, as long as it works correctly (in our demo, it's a button on the navbar); this list resembles the main list but only shows the "saved" elements.

### Use the Context

To ensure that the user can "save" the item, you must implement an action that can be accessible from anywhere within the app.

The following features are not needed for the final solution, but you can develop them if you feel confident enough:

### Extra points

- `+1` Prevent the website from fetching the Startwars API again if refreshed (you can use the `localStorage` to save the store on the local browser).
- `+3` Implement a search bar with autocomplete for characters, planets, and vehicles. When the autocomplete is clicked it should take you to the detailed page of the element.

## Sources:

This exercise is part of the complete 4Geeks Academy Full Stack course:

## Project Structure

```
src/
  ├── components/
  │   ├── Navbar.jsx
  │   ├── Card.jsx
  │   ├── DetailView.jsx
  │   └── SearchResults.jsx
  ├── context/
  │   └── AppContext.jsx
  ├── pages/
  │   ├── Characters.jsx
  │   ├── Vehicles.jsx
  │   ├── Planets.jsx
  │   ├── Favorites.jsx
  │   └── Details.jsx
  ├── App.jsx
  └── main.jsx

```

[![4Geeks Academy](https://img.shields.io/badge/4Geeks%20Academy-blue.svg)](https://4geeks.com/interactive-coding-tutorial/contact-list-context)
# 4G20-blog-reading-list
