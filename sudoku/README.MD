# ♞ Anti-Knight Sudoku

A fully interactive web-based Sudoku game — with a twist. This variant includes the **anti-knight constraint**, which forbids placing the same number in any square that is a chess knight's move away. Built with vanilla JavaScript, HTML, and CSS.

## Features

- Classic 9x9 Sudoku board
- Anti-Knight Constraint: No repeating digits on knight moves (like in chess)
- Note-taking mode
- Smart hints system
- Reset and difficulty selection (Easy, Medium, Hard)
- Full keyboard support (navigation, input, quick actions)
- Solution validator
- Timer and hint counter
- Light/Dark mode toggle
- Fully responsive design

## 📁 Project Structure
```
portfolio/
│
├── floating-icon/ # Floating icon that redirects to portfolio site
├── light-dark-toggle/ # Light-dark toggle element/logic
└── sudoku/ # Anti-knight sudoku site
    ├── index.html # Main HTML file
    ├── static/
    │ ├── script.js # Game logic
    │ ├── events.js # UI interactions and event handlers
    │ ├── helper.js # Grid utilities and validation
    │ ├── style.css # Styling
    └── README.md # You are here!
```
---

## Controls & Shortcuts

| Action           | Input                         |
| ---------------- | ----------------------------- |
| Select Number    | Click on number or press 1–9  |
| Clear Cell       | Press `Backspace` or `Delete` |
| Move Selection   | Arrow keys (`←↑↓→`)           |
| Toggle Note Mode | Press `N` or click "Note"     |
| Get Hint         | Press `H` or click "Hint"     |
| Reset Puzzle     | Press `R` or click "Reset"    |
| Check Solution   | Click "Check"                 |
| New Game         | Click "New Game"              |

---

## Game Rules

This Sudoku variant includes an **anti-knight rule**:

> In addition to the standard rules of Sudoku (each row, column, and 3x3 box must contain all digits from 1 to 9 exactly once), **no two identical digits may be a knight’s move apart**, as in chess.

---

## How It Works

- **Puzzle Generator**: A full Sudoku board is first solved using backtracking.
- **Puzzle Carving**: Cells are removed one by one while ensuring a unique solution remains.
- **Anti-Knight Validation**: During both generation and gameplay, the anti-knight rule is enforced in addition to standard constraints.
- **Hints**: Randomly fill one incorrect or empty cell with the correct value from the solved puzzle.
- **Timer & Hints Counter**: Updated every second and on each hint use.

---

## Levels of Difficulty

| Level  | Clue Range |
| ------ | ---------- |
| Easy   | 40–45      |
| Medium | 34–39      |
| Hard   | 28–33      |

---

## Built With

- **Vanilla JavaScript (ES6 modules)**
- **HTML5 & CSS3**
- Optional components (in my portfolio folder):
  - Light/Dark toggle UI

    ```html
    <head>
      <link rel="stylesheet" href="../light-dark-toggle/light-dark.css" />
      <script src="../light-dark-toggle/light-dark.js" defer></script>
    </head>
    <body>
      <div class="header-toggle">
        <div id="light-dark-btn">
          <div id="circle-switch"></div>
        </div>
      </div>
    </body>
    ```

    ```css
    :root {
      --light-btn: ;
      --light-btn-circle: ;
      --dark-btn: ;
      --dark-btn-circle: ;
    }
    ```

  - Floating icon component
  ```html
  <head>
    <link rel="stylesheet" href="../floating-icon/floatin-icon.css" />
    <script src="../floating-icon/floating-icon.js" defer></script>
  </head>
  ```

---

## Installation & Usage

### Option 1: Open Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/Shar23D/portfolio.git
   cd sudoku
   ```

2. Open index.html in your browser

- If you have Live Server (e.g. VS Code extension), right-click index.html and click "Open with Live Server".

## Customization Ideas

Add new variants like Anti-King or Diagonal Sudoku

Save/load game states to local storage

Add score tracking or leaderboard

Animate errors or hints

Add accessibility features

## Acknowledgements

Sudoku solving logic inspired by standard backtracking algorithms

Anti-knight rule derived from chess constraints

Vanilla JS - no frameworks!

## Contact

Have questions or suggestions?

Email: sharon.dang.ncg@gmail.com

GitHub: https://github.com/Shar23D

Happy puzzling! 
