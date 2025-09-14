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
- ⌨️ **Keyboard Controls**:
  - Arrow keys for navigation
  - Number keys for input
  - `N` to toggle Notes Mode
  - `H` to use a Hint
- 🖱️ **Number Pad**: Clickable input support
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
2. Install dependencies
bash
Copy code
npm install
3. Start the development server
bash
Copy code
npm start
Your app should now be running at http://localhost:

🧪 Future Enhancements
✅ Add dark mode

✅ Improve mobile responsiveness

✅ Store best times in localStorage

✅ Leaderboard / scoring system

✅ Animated victory celebration

✅ Offline puzzle generation

🤖 API Used
This app fetches puzzles from:

🔗 https://sudoku-api.vercel.app

📁 Folder Structure
css
Copy code
`src/
├── components/
│   ├── Controls.js
│   ├── DifficultyModal.js
│   ├── FloatingIcon.js
│   ├── Grid.js
│   └── NumberPad.js
├── utils/
│   ├── fetch-puzzle.js
│   └── validation.js
├── App.js
├── App.css
└── index.js
🧠 Tips`
Use Hints wisely! They help but are tracked 😉

Try keyboard shortcuts:
N - Toggle Notes Mode
H - Get a Hint
Arrow Keys - Navigate cells
Number Keys - Fill or Note a number
Delete/Backspace - Clear cell

👨‍💻 Author
Your Name
Portfolio | GitHub



















Grid (for the board UI)

Controls (buttons for actions)

DifficultyModal (for choosing difficulty)

NumberPad (alternative input)

FloatingIcon (decorative or navigational icon)

Utility functions for validation and puzzle fetching

✅ Features Supported:

✅ Difficulty selection (easy, medium, hard)

✅ Timer

✅ Hint system (prioritizes fixing mistakes, then filling empty cells)

✅ Notes mode

✅ Keyboard controls for:

Arrow keys (navigation)

Number input

Delete / Backspace (clearing input or notes)

N key (toggle notes)

H key (hint)

✅ Highlighting of:

Same row, column, and box

Same number when selected

Violations (invalid placements)

✅ Reset / Check / New Puzzle buttons

✅ Persistent visual feedback (status with statusType)

✅ Dynamic count for each number (disabling if count reaches 9)
