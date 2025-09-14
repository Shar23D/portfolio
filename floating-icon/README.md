🧭 Floating Icon with Accessible Tooltip

This reusable component adds a floating circular icon to the bottom-right corner of any webpage. It's typically used for navigation (e.g., linking back to a homepage or portfolio) and includes an accessible tooltip for context.

```📁 Folder Structure
shared/
├── floating-icon/
│   ├── floating-icon.css
│   ├── floating-icon.js
│   └── floating-icon.jpeg  # Replace with your custom icon
```
🚀 Features

Floating icon fixed to the bottom-right of the screen

Smooth hover effects with scaling and shadows

Pastel-colored accessible tooltip

Dynamically injected into the DOM using JavaScript

Fully customizable and responsive

Keyboard and screen-reader accessible

🔧 Setup Instructions
1. Include the CSS

In your HTML <head>, add:

<link rel="stylesheet" href="shared/floating-icon/floating-icon.css">

2. Include the JavaScript

At the end of your HTML <body>, before the closing tag:

<script src="shared/floating-icon/floating-icon.js"></script>


✅ This script will automatically inject the floating icon and tooltip into the page.

🧩 Behavior & Accessibility

Position: Bottom-right of the screen, fixed

Tooltip: Appears on hover or focus

ARIA support: Tooltip uses aria-describedby and role="tooltip" for screen readers

Keyboard Accessible: Focusable via <a> tag

🖼️ Customization
🖼 Icon Image

Replace floating-icon.jpeg with your preferred image (50x50px recommended):

shared/floating-icon/floating-icon.jpeg


Or update the JS:

<img src="path/to/your-icon.png" alt="Custom Alt Text" />

🎯 Tooltip Text

Edit the innerHTML in floating-icon.js:

<div role="tooltip" id="homeTooltip" class="floating-tooltip">
  Explore more projects
</div>

🎨 Tooltip Styling

Modify floating-icon.css:

.floating-tooltip {
  background: #f9dce3;
  color: black;
  ...
}

📥 Example Output

A small circular icon in the bottom-right corner of the page that expands on hover with a tooltip like:

💬 "Explore more projects"

🔁 Reuse Instructions

Place the floating-icon/ folder in your shared/ directory

Link both the .css and .js files

Ensure your relative paths for href and src in floating-icon.js are correct

✅ Accessibility Considerations

The icon is keyboard-navigable (<a> tag)

Tooltip is linked with aria-describedby for screen reader support

Hover/focus states are visually distinct

📄 License
