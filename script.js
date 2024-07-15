function fetchAndProcessLevels(modId) {
  fetch('data.json')
      .then(response => response.json())
      .then(data => {
          const filteredLevels = data.levels.filter(level => level.id.startsWith(modId));
          shuffleArray(filteredLevels);
          renderLevels(filteredLevels);
      })
      .catch(error => console.error('Error fetching JSON:', error));
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderLevels(levels) {
  const levelsContainer = document.getElementById('levelsContainer');
  levelsContainer.innerHTML = '';

  levels.forEach(level => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');

      if (level.party) {
          gridItem.classList.add('party-glow');
      }

      if (level.image) {
          gridItem.innerHTML = `
              <img src="${level.image}" alt="${level.title}">
          `;
      } else if (level.video) {
          gridItem.innerHTML = `
              <div class="video-container">
                  <video controls>
                      <source src="${level.video}" type="video/mp4">
                      Your browser does not support the video tag.
                  </video>
              </div>
          `;
      }

      let html = `
          <div class="level-info">
              <p>${level.title}<br>${level.description}<br><em>by ${level.author}</em></p>
              <button class="download-button" onclick="openDownloadLink('${level.downloadLink}')">Download</button>
          </div>
      `;

      gridItem.innerHTML += html;

      levelsContainer.appendChild(gridItem);

      gridItem.addEventListener('click', function() {
          showModeInfo(level.category);
      });
  });
}

function openDownloadLink(downloadLink) {
  if (downloadLink.startsWith('http')) {
      window.open(downloadLink, '_blank');
  } else {
      const fileName = downloadLink.split('/').pop();
      const truePath = `levels/${fileName}`;
      window.open(truePath, '_blank');
  }
}


function setRandomBackground() {
  const backgrounds = ['bgA.png', 'bgB.png', 'bgC.png', 'bgD.png', 'bgE.png', 'bgF.png', 'bgG.png', 'bgH.png', 'banner.png'];
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
}

function setRandomMusic() {
  const musicFiles = [
      { src: 'music/altA.mp3', weight: 1 },
      { src: 'music/altB.mp3', weight: 4 },
      { src: 'music/altC.mp3', weight: 2 },
      { src: 'music/A.mp3', weight: 2 },
      { src: 'music/altD.mp3', weight: 3 },
      { src: 'music/refA.mp3', weight: 2 },
      { src: 'music/refC.mp3', weight: 2 },
      { src: 'music/refD.mp3', weight: 2 },
      { src: 'music/SummerA.mp3', weight: 5 },
      { src: 'music/SummerB.mp3', weight: 5 },
      { src: 'music/A.mp3', weight: 1 },
      { src: 'music/refB.mp3', weight: 1 }
  ];

  const totalWeight = musicFiles.reduce((sum, song) => sum + song.weight, 0);
  let random = Math.random() * totalWeight;
  let selectedMusic;

  for (let i = 0; i < musicFiles.length; i++) {
      if (random < musicFiles[i].weight) {
          selectedMusic = musicFiles[i].src;
          break;
      }
      random -= musicFiles[i].weight;
  }

  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.src = selectedMusic;
  audioPlayer.play();
}

document.addEventListener('DOMContentLoaded', function() {
  setRandomBackground();
  setRandomMusic();
  fetchAndProcessLevels('yourModIdHere');
});
