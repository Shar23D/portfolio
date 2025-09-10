// Hamburger toggles
document.querySelector(".left-hamburger").addEventListener("click", () => {
  document.querySelector(".left-col").classList.toggle("expanded");
});
document.querySelector(".right-hamburger").addEventListener("click", () => {
  document.querySelector(".right-col").classList.toggle("expanded");
});

// EmailJS initialization
emailjs.init("yCOBJGkhY0cP9_oHi");

// Contact Modal
const contactModal = document.getElementById("contact-modal");
document.querySelector(".contact-link").addEventListener("click", (e) => {
  e.preventDefault();
  contactModal.style.display = "flex";
});
document
  .querySelector("#contact-modal .close")
  .addEventListener("click", () => {
    contactModal.style.display = "none";
  });

// Feedback Modal
const feedbackModal = document.getElementById("feedback-modal");
document.querySelector(".feedback-link").addEventListener("click", (e) => {
  e.preventDefault();
  feedbackModal.style.display = "flex";
});
document
  .querySelector("#feedback-modal .close")
  .addEventListener("click", () => {
    feedbackModal.style.display = "none";
  });

// About Modals
document.querySelectorAll(".about-item").forEach((item) => {
  item.addEventListener("click", () => {
    const id = item.dataset.modal + "-modal";
    document.getElementById(id).style.display = "flex";
  });
});

document.querySelectorAll(".about-modal .close").forEach((closeBtn) => {
  closeBtn.addEventListener("click", (e) => {
    closeBtn.closest(".about-modal").style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  document.querySelectorAll(".modal, .about-modal").forEach((modal) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

// EmailJS form submissions
const popup = document.getElementById("popup-message");
const popupText = document.getElementById("popup-text");
const popupClose = document.getElementById("popup-close");

function showPopup(message) {
  popupText.textContent = message;
  popup.style.display = "block";
}

// Close popup when clicking the X
popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});

function autoHidePopup() {
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

// Contact form
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    emailjs
      .sendForm("service_hkvftib", "template_yefusa6", this)
      .then(() => {
        showPopup("Message sent!");
        autoHidePopup();
        contactModal.style.display = "none";
        this.reset();
      })
      .catch((err) => {
        showPopup("Error sending message: " + err);
        autoHidePopup();
      });
  });

// Feedback form
document
  .getElementById("feedback-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    emailjs
      .sendForm("service_hkvftib", "template_p6fkcqe", this)
      .then(() => {
        showPopup("Feedback sent!");
        autoHidePopup();
        feedbackModal.style.display = "none";
        this.reset();
      })
      .catch((err) => {
        showPopup("Error sending feedback: " + err);
        autoHidePopup();
      });
  });
