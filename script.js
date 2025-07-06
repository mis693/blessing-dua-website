const duas = [
  {
    text: "Ya Allah, {name} ki har hajat puri ho. Uski zindagi khushiyon se bhari ho.",
    gif: "https://media.giphy.com/media/Z21HJj2kz9uBG/giphy.gif"
  },
  {
    text: "Ya Allah, {name} aur uski family ko sehat aur barakah naseeb ho.",
    gif: "https://media.giphy.com/media/f9k1tV7HyORcngKF8v/giphy.gif"
  },
  {
    text: "May Allah bless {name} with success, health and endless joy.",
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
  },
  {
    text: "O Allah, guide {name} on the right path and fill their heart with peace.",
    gif: "https://media.giphy.com/media/10UeedrT5MIfPG/giphy.gif"
  },
  {
    text: "Ya Allah, {name} ke har din me khushbu ho, har raat me sukoon ho.",
    gif: "https://media.giphy.com/media/3ohjUW6z0C6S9dbmDe/giphy.gif"
  },
  {
    text: "May Allah's mercy be with {name} today and always.",
    gif: "https://media.giphy.com/media/l3vQX4xg1SopS8Sc0/giphy.gif"
  }
];

function openGift() {
  const name = document.getElementById("receiverName").value.trim();
  if (!name) {
    alert("Please enter your name");
    return;
  }

  document.querySelector(".gift-box").style.display = "none";
  document.getElementById("loading").style.display = "block";

  let counter = 10;
  const countdown = document.getElementById("countdown");
  const interval = setInterval(() => {
    counter--;
    countdown.textContent = counter;
    if (counter === 0) {
      clearInterval(interval);
      showDua(name);
    }
  }, 1000);
}

function showDua(name) {
  const selected = duas[Math.floor(Math.random() * duas.length)];
  document.getElementById("loading").style.display = "none";
  document.getElementById("dua-section").style.display = "block";
  document.getElementById("personal-dua").textContent = selected.text.replace("{name}", name);
  document.getElementById("dua-gif").src = selected.gif;
}

function chooseAnother() {
  location.reload();
}
