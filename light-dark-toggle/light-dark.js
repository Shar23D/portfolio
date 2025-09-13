document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("light-dark-btn");
  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
