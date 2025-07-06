// Show loading and then show dua
function startGift() {
  const name = document.getElementById("receiverName").value.trim();
  if (!name) {
    alert("Please enter a name.");
    return;
  }

  document.getElementById("formBox").style.display = "none";
  document.getElementById("loading").style.display = "block";
  let seconds = 10;

  const countdown = setInterval(() => {
    document.getElementById("countdown").innerText = seconds + "s";
    seconds--;
    if (seconds < 0) {
      clearInterval(countdown);
      showDua(name);
    }
  }, 1000);
}

// Show dua with name
function showDua(name) {
  document.getElementById("loading").style.display = "none";
  const duaIndex = document.getElementById("duaSelect").value;

  const romanDuas = [
    `Ya Allah ${name} ki har khushi se nawaz de, uski har hajat poori kar.`,
    `Ya Allah ${name} ke liye har mushkil ko asaan bana de.`,
    `Ya Allah ${name} ko sehat, sukoon aur kamyabi de duniya aur aakhirat mein.`,
  ];

  const englishDuas = [
    `May Allah bless ${name} with endless happiness and fulfill every wish.`,
    `May Allah ease every hardship in ${name}'s life.`,
    `May Allah grant ${name} success, peace, and good health always.`,
  ];

  let finalDua = "";
  let gifName = `dua${parseInt(duaIndex) + 1}.gif`;

  if (duaIndex < 3) {
    finalDua = romanDuas[duaIndex];
  } else {
    finalDua = englishDuas[duaIndex - 3];
  }

  document.getElementById("duaText").innerText = finalDua;
  document.getElementById("gifImage").src = `public/${gifName}`;
  document.getElementById("duaBox").style.display = "block";
  document.getElementById("generatedLinkBox").style.display = "block";
}

// Copy generated link
function copyLink() {
  const sender = document.getElementById("senderName").value.trim();
  const duaIndex = document.getElementById("duaSelect").value;
  if (!sender) {
    alert("Please enter your name.");
    return;
  }

  const url = `${window.location.origin}?sender=${encodeURIComponent(sender)}&dua=${duaIndex}`;
  navigator.clipboard.writeText(url);
  alert("Link copied! You can now share it.");
}

// Load from link
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("sender");
  const duaIndex = params.get("dua");

  if (name && duaIndex !== null) {
    document.getElementById("mainBox").style.display = "none";
    showDua(name);
  }
};
