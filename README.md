# Starwars Blog Reading List

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A minimalist version of the [Star Wars Databank](https://www.starwars.com/databank) with "Read Later" functionality, built with React and Bootstrap.

[Demo](#demo) • [Features](#features) • [Getting Started](#getting-started) • [API Integration](#api-integration) • [Project Structure](#project-structure)

</div>

## Demo

![Starwars Demo](https://github.com/breatheco-de/exercise-starwars-blog-reading-list/blob/master/preview.gif?raw=true)

## Features

- Browse characters, vehicles, and planets from the Star Wars universe
- Detailed view for each entity with comprehensive information
- "Favorites" functionality to save items for future reference
- Responsive design with Bootstrap components
- Search functionality with real-time results
- Data persistence using localStorage (optional feature)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/maxdenuevo/4G20-blog-reading-list

# Install dependencies
npm install

# Start the development server
npm run dev
```

## API Integration

This project uses the [SWAPI.tech](https://www.swapi.tech/documentation) API to fetch Star Wars data. Images are sourced from [Star Wars Visual Guide](https://starwars-visualguide.com).

### API Endpoints Used

- `/people` - Character information
- `/vehicles` - Vehicle information
- `/planets` - Planet information

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Navigation and search functionality
│   ├── Card.jsx           # Reusable card component for entities
│   ├── DetailView.jsx     # Detailed view component
│   └── SearchResults.jsx  # Search results display
├── context/
│   └── AppContext.jsx     # Global state management
├── pages/
│   ├── Characters.jsx     # Characters listing page
│   ├── Vehicles.jsx       # Vehicles listing page
│   ├── Planets.jsx        # Planets listing page
│   ├── Favorites.jsx      # Saved items page
│   └── Details.jsx        # Entity details page
├── App.jsx                # Main application component
└── main.jsx               # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [SWAPI.tech](https://www.swapi.tech/) for providing the Star Wars API
- [Star Wars Visual Guide](https://starwars-visualguide.com) for entity images
- [4Geeks Academy](https://4geeks.com/) for the project inspiration

## Sources:

This exercise is part of the complete 4Geeks Academy Full Stack course:

[![4Geeks Academy](https://img.shields.io/badge/4Geeks%20Academy-blue.svg)](https://4geeks.com/syllabus/santiago-pt-49/project/starwars-blog-reading-list)
