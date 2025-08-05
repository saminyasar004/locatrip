<div align="center">
  <img src="./assets/locatrip.svg" alt="LocaTrip Logo" width="100"/>
</div>

# LocaTrip

LocaTrip is a mobile application built with [React Native](https://reactnative.dev/) using [Expo](https://expo.dev/), [Expo Router](https://expo.github.io/router/), and styled with [NativeWind](https://www.nativewind.dev/), a utility-first CSS framework for React Native. The app helps users explore and plan trips, discover local attractions, and manage travel itineraries.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Discover nearby attractions and destinations
- Plan and manage trip itineraries
- User-friendly interface with responsive design
- Fast and performant UI powered by Expo and NativeWind
- Seamless navigation with Expo Router

## Tech Stack

- **Expo**: Streamlined development and deployment for React Native apps
- **React Native**: Build native mobile apps using JavaScript and React
- **Expo Router**: File-based routing for Expo apps
- **NativeWind**: Tailwind CSS-inspired styling for React Native
- **Node.js**: JavaScript runtime for development

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)
- A code editor like [VS Code](https://code.visualstudio.com/)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/saminyasar004/locatrip.git
   cd locatrip
   ```

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Set up NativeWind**:

   NativeWind is already included in the dependencies. Ensure your `babel.config.js` contains:

   ```js
   module.exports = {
     presets: ['babel-preset-expo'],
     plugins: ['nativewind/babel'],
   };
   ```

   Also, ensure you have a `tailwind.config.js` in your project root:

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

4. **Set up environment**:
   - For Android: Ensure you have an Android emulator or a physical device connected.
   - For iOS: Ensure Xcode is set up with a simulator or a connected iOS device (macOS only).

## Running the App

1. **Start the Expo development server**:

   ```bash
   npm start
   ```

   Or, if using Yarn:

   ```bash
   yarn start
   ```

2. **Run on Android**:

   ```bash
   npm run android
   ```

   Or:

   ```bash
   yarn android
   ```

3. **Run on iOS** (macOS only):

   ```bash
   npm run ios
   ```

   Or:

   ```bash
   yarn ios
   ```

4. **Using Expo Go**:
   After running `expo start`, scan the QR code with the Expo Go app on your mobile device.

## Project Structure

```plaintext
locatrip/
├── app/                  # Expo Router app directory (screens, layouts, etc.)
│   ├── _layout.tsx       # Root layout for navigation
│   ├── index.tsx         # Main entry screen
│   └── onboarding/       # Onboarding screens
│       └── onboarding4.tsx
├── assets/               # Images, SVGs, and other static assets
│   ├── adaptive-icon.svg
│   ├── onboarding-doodle-4.svg
│   └── ...other assets
├── global.css            # Global styles (if used)
├── tailwind.config.js    # Tailwind CSS config for NativeWind
├── babel.config.js       # Babel config (with NativeWind plugin)
├── app.json              # Expo app configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
