
# 🌍 Earthquake Visualizer

A responsive, interactive React application that visualizes recent earthquake data on a 3D globe. Built with modern web technologies including Vite, Tailwind CSS, and Deck.gl.

![React](https://img.shields.io/badge/React-18.2.0-%2361DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.3-%23646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-%2306B6D4?logo=tailwind-css)
![Deck.gl](https://img.shields.io/badge/Deck.gl-8.9.35-%230078FF?logo=deck.gl)

## ✨ Features

- **3D Globe Visualization**: Interactive globe built with Deck.gl's `Tile3DLayer` and `GlobeView`
- **Real-time Data**: Fetches and displays earthquake data from the USGS API
- **Interactive Controls**: Filter and visualize earthquakes by magnitude and time
- **Responsive Design**: Clean, modern UI built with Tailwind CSS that works on desktop and mobile
- **Data-rich Popups**: Click on earthquake points to see detailed information (magnitude, depth, location, time)

## 🚀 Live Demo

Check out the live application: [Deployed on Netlify]((https://earthquake-visualizer9.netlify.app/))

*Replace with your actual Netlify URL after deployment*

## 📦 Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akashbolla/earthquake-visualizer.git
   cd earthquake-visualizer
Install dependencies

bash
npm install
Start the development server

bash
npm run dev
Open your browser
Navigate to http://localhost:5173

🛠️ Build for Production
bash
npm run build
The build artifacts will be stored in the dist/ directory, ready for deployment.

🏗️ Tech Stack
Frontend Framework: React 18

Build Tool: Vite

Styling: Tailwind CSS

3D Visualization: Deck.gl, Google Maps Tile API

Data Fetching: Native Fetch API

State Management: React Hooks (useState, useEffect)

Data Source: USGS Earthquake Hazards Program API

📁 Project Structure
text
earthquake-visualizer/
├── public/
│   ├── data/mock_earthquakes.json  # Sample data for development
│   └── config.json                 # Configuration settings
├── src/
│   ├── components/
│   │   ├── Controls.jsx            # Filter and control components
│   │   ├── HumanoidSidebar.jsx     # Sidebar navigation
│   │   └── MapView.jsx             # Main 3D globe component
│   ├── api/
│   │   └── earthquakeService.js    # API service functions
│   ├── features/
│   │   └── earthquakesSlice.js     # State management slice
│   ├── styles/
│   │   └── index.css               # Global styles and Tailwind imports
│   ├── App.jsx                     # Main application component
│   └── main.jsx                    # Application entry point
├── package.json
└── vite.config.js
🌐 API Integration
The application fetches real-time earthquake data from the USGS Earthquake API. The main endpoints used:

https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson

🎨 Customization
You can modify the visualization by editing the configuration in public/config.json:

json
{
  "mapboxApiKey": "your_mapbox_key",
  "initialViewState": {
    "latitude": 20,
    "longitude": 0,
    "zoom": 1,
    "pitch": 0,
    "bearing": 0
  }
}
📝 Scripts
npm run dev - Start development server

npm run build - Build for production

npm run lint - Run ESLint

npm run preview - Preview production build locally

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Earthquake data provided by the U.S. Geological Survey

3D visualization powered by Deck.gl

Built with React and Vite

Styled with Tailwind CSS

Developed by Akash Bolla
GitHub Profile
