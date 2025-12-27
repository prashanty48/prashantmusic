let audio = document.getElementById("audio");
let songInput = document.getElementById("songInput");
let playlist = document.getElementById("playlist");
let songName = document.getElementById("songName");
let progress = document.getElementById("progress");
let volume = document.getElementById("volume");
let cover = document.getElementById("cover");

let songs = [];
let currentIndex = 0;
let shuffle = false;
let repeat = false;

// Add songs
songInput.addEventListener("change", () => {
  songs = Array.from(songInput.files);
  playlist.innerHTML = "";

  songs.forEach((song, index) => {
    let li = document.createElement("li");
    li.textContent = song.name;
    li.onclick = () => playSong(index);
    playlist.appendChild(li);
  });

  if (songs.length > 0) playSong(0);
});

// Play song
function playSong(index) {
  currentIndex = index;
  audio.src = URL.createObjectURL(songs[index]);
  songName.textContent = songs[index].name;
  cover.src = "https://picsum.photos/200?random=" + index;
  audio.play();
}

// Play / Pause
function playPause() {
  audio.paused ? audio.play() : audio.pause();
}

// Next song
function nextSong() {
  if (shuffle) {
    currentIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }
  playSong(currentIndex);
}

// Previous song
function prevSong() {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
  playSong(currentIndex);
}

// Progress bar
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

// Volume
volume.value = 0.7;
audio.volume = volume.value;

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Shuffle
function toggleShuffle() {
  shuffle = !shuffle;
  alert(shuffle ? "Shuffle ON" : "Shuffle OFF");
}

// Repeat
function toggleRepeat() {
  repeat = !repeat;
  audio.loop = repeat;
  alert(repeat ? "Repeat ON" : "Repeat OFF");
}

// Theme
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

// Auto next
audio.addEventListener("ended", () => {
  if (!repeat) nextSong();
});
