# 🧩 React Sudoku Game

A fully interactive Sudoku game built with React!  
This app supports multiple difficulty levels, notes mode, keyboard navigation, hint system, timer, and more.

![Sudoku Game Screenshot](../static/images/project-img/sudoku-react.png) 

---

## 🚀 Features

- 🎯 **Difficulty Selection**: Easy, Medium, Hard
- ⏱️ **Timer**: Tracks your solving time
- 📝 **Notes Mode**: Pencil in multiple numbers per cell
- 🎯 **Smart Hints**: Fix mistakes or fill empty cells
- ✅ **Highlighting**: 
  - Same number when selected
  - Violations (invalid placement)
- ⌨️ **Keyboard Controls**:
  - Delete / Backspace (clearing input or notes)
  - Arrow keys for navigation
  - Number keys for input
  - `N` to toggle Notes Mode
  - `H` to use a Hint
- 🖱️ **Number Pad**: 
  - Clickable input support
  - Disabled if count reaches 9
- ✅ **Puzzle Checker**: Instantly check your progress
- 🔁 **Reset & New Puzzle**: Start fresh anytime
- 📱 **Responsive Design** (recommended improvements ongoing)

---

## 🛠️ Tech Stack

- **React** (with Hooks)
- **CSS** for styling
- **Fetch API** to load puzzles from [sudoku-api.vercel.app](https://sudoku-api.vercel.app)
- **Classnames** for conditional styling

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone 
cd react-sudoku
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start the development server
```bash
npm start
```
Your app should now be running at http://localhost:----

## Components
- Grid (for the board UI)

- Controls (buttons for actions)

- DifficultyModal (for choosing difficulty)

- NumberPad (alternative input)

- FloatingIcon (decorative or navigational icon)

- Utility functions for validation and puzzle fetching

## 🧪 Future Enhancements
- Add dark mode

- Improve mobile responsiveness

- Store best times in localStorage

- Leaderboard / scoring system

- Animated victory celebration

- Offline puzzle generation

## 🤖 API Used
This app fetches puzzles from:

🔗 https://sudoku-api.vercel.app

## 📁 Folder Structure
```
src/
├── components/
│   ├── Controls.js
│   ├── DifficultyModal.js
│   ├── FloatingIcon.js
│   ├── Grid.js
│   └── NumberPad.js
├── utils/
│   ├── fetch-puzzle.js
│   └── validation.js
├── styles/
│   └── floating-icon.css
├── App.js
├── App.css
└── index.js
```

## 🧠 Tips
Use Hints wisely! They help but are tracked 😉

Try keyboard shortcuts:
N - Toggle Notes Mode
H - Get a Hint
Arrow Keys - Navigate cells
Number Keys - Fill or Note a number
Delete/Backspace - Clear cell

## 📬 Contact

Have questions or suggestions?

Email: sharon.dang.ncg@gmail.com

GitHub: https://github.com/Shar23D