## 🚀 Space Journal

Space Journal is an interactive journaling experience where users can write their worries, crumple them, and launch them into symbolic cosmic targets — like a black hole or the sun — to let them go. The journey is visual, animated, and message-driven, blending mindfulness with playful design.

## ✨ Features

Multi-phase flow:

- Journal entry

- Slingshot launch

- Flight animation

- Completion with a randomized message

- Responsive UI with dynamic CSS transitions and animations

- Modular JavaScript architecture

- Custom targets (trash, fire, tornado, sun, black hole), each with their own:

- Emoji and animation

- Power threshold

- Inspirational/funny messages

## 🗂 Folder Structure
```
space-journal/
├── index.html
├── style.css
├── js/
│   ├── main.js
│   ├── StarField.js
│   ├── Targets.js
│   ├── JournalPhase.js
│   ├── SlingshotPhase.js
│   ├── FlightPhase.js
│   └── CompletionMessage.js
└── floating-icon/
    ├── floating-icon.js
    ├── floating-icon.css
    └── floating-icon.jpeg
```

## 🔧 Setup
1. Clone or Copy Files

Ensure you have the entire folder structure intact, especially:

floating-icon/ assets and JS

js/ files with ES module support

2. Run Locally

Just open index.html in a modern browser.

✅ No build tools or servers required.

## 🚦 How It Works
### 📝 Journal Phase

User types their feelings into a textarea.

When text is detected, the “Crumple & Launch” button becomes enabled.

On click, the paper crumples and the UI transitions to the next phase.

### 🏹 Slingshot Phase

User holds the mouse down on the paper ball to charge power.

The more power, the further the paper flies.

Targets are tied to power ranges (0–100%).

### ✈️ Flight Phase

The paper flies across the screen.

The selected target becomes animated.

An explosion of particles signifies impact.

### 🌌 Completion Message

A themed message is randomly selected and shown.

User can click "Write Another Entry" to restart the cycle.

## 🎯 Targets Explained
```
Name	  Power Range	    Emoji	    Duration	Particle Color	Messages
Trash	     0–20	         🗑️	        4000ms	      Gray	        3
Fire	     20–40	         🔥	         4500ms	        Orange	       3
Tornado	     40–60	         🌪️	        4500ms	   Light Blue	    3
Sun	         60–80	         ☀️	         5000ms	        Yellow	       3
Black Hole	 80–100	         🕳️	        6000ms	     Purple	        3
```

## 🧠 Built With

HTML5: Semantic layout and structure

CSS3: Animations, transitions, responsive design

JavaScript (ES6 Modules):

- SpaceJournal: Main controller class

- JournalPhase: Handles user input

- SlingshotPhase: Launch mechanism

- FlightPhase: Paper and target animation

- CompletionMessage: End message handling

- Targets: Target logic and messages

- StarField: Starry background generator

## 🔁 Reusability & Extensibility

You can reuse or adapt this experience by:

✍️ Adding more targets to Targets.js

🎨 Customizing CSS animations per phase

🧩 Replacing the flying paper mechanic with other metaphors (e.g., bottle in the ocean, balloon release)

🔄 Integrating persistence (e.g., saving entries locally or remotely)

## 🧪 Dev Notes

JavaScript events are managed with a basic .on() / .emit() pub/sub pattern.

Flight and particle animations are done using pure CSS, dynamically triggered via JS.

Tooltips and floating buttons are added dynamically from a shared folder.

## 🧭 Floating Icon Integration

To include the floating icon tooltip (e.g., for returning to homepage):

Include in <head>:
```html
<link rel="stylesheet" href="../floating-icon/floating-icon.css" />
<script src="../floating-icon/floating-icon.js" defer></script>
```
Make sure the file paths are correct based on your structure.

## 📬 Contact

Have questions or suggestions?

Email: sharon.dang.ncg@gmail.com

GitHub: https://github.com/Shar23D