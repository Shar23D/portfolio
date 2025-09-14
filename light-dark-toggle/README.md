🌗 Light/Dark Mode Toggle

This is a responsive and accessible light/dark mode toggle switch UI component. It can be added to any HTML project to allow users to switch between light and dark themes.

📁 Folder Structure
```
shared/
├── toggle/
│   ├── toggle.html
│   ├── toggle.css
│   └── toggle.js (optional - for theme switching logic)
```

📦 Features

Responsive design (mobile-friendly)

Smooth transitions between themes

Customizable using CSS variables

Pure HTML + CSS (JS can be added for full theme toggling)

🔧 Setup Instructions
1. Include the HTML

Place the following snippet inside your HTML <body>:

```html
<div class="header-toggle">
  <div id="light-dark-btn">
    <div id="circle-switch"></div>
  </div>
</div>
```

2. Link the CSS

Include the toggle.css file in your <head>:

```html
<link rel="stylesheet" href="./light-dark-toggle/light-dark.css">
```

Ensure you define CSS variables like --light-btn, --dark-btn, --light-btn-circle, and --dark-btn-circle in your global styles.

3. (Optional) Add JavaScript

To make the toggle functional (switch themes), include a JS file like toggle.js and add logic such as:

```js
document.getElementById('light-dark-btn').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
```


You may also persist the theme in localStorage if needed.

🎨 Customization

Define your theme colors in a root CSS file:

```css
:root {
  --light-btn: #ccc;
  --dark-btn: #333;
  --light-btn-circle: #fff;
  --dark-btn-circle: #000;
}

.dark-mode {
  --light-btn: var(--dark-btn);
  --light-btn-circle: var(--dark-btn-circle);
}
```

🖼️ Responsive Behavior

Default (Desktop):

Toggle size: 60x30px

Circle: 25px

Mobile (< 700px):

Toggle size: 35x20px

Circle: 15px

Adjusted margin-left for circle in dark mode

📌 Notes

The toggle is purely UI-based unless you add JS for functionality.

The component uses CSS variables for easy theming and reuse.

Ensure z-index is managed properly if other elements are layered over it.

📥 Example Integration
```html
<head>
  <link rel="stylesheet" href="./light-dark-toggle/light-dark.css">
  <script src="./light-dark-toggle/light-dark.js" defer></script>
</head>
<body>
  <!-- Theme Toggle -->
  <div class="header-toggle">
    <div id="light-dark-btn">
      <div id="circle-switch"></div>
    </div>
  </div>

  
</body>
```