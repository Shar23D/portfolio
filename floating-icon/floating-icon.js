// Dynamically add the floating icon to the page
(function () {
  const iconHTML = `
    <a href="../index.html" class="floating-icon" aria-describedby="homeTooltip">
      <img src="../floating-icon/floating-icon.jpeg" alt="Portfolio Home" />
    </a>
    <div role="tooltip" id="homeTooltip" class="floating-tooltip">
      Explore more projects
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", iconHTML);
})();
