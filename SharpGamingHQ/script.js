// Fetch and display latest YouTube videos
async function loadVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC${CHANNEL_HANDLE}&maxResults=6&order=date&type=video&key=${YOUTUBE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const container = document.getElementById('video-grid');
    container.innerHTML = '';
    data.items.forEach(video => {
      const videoId = video.id.videoId;
      const title = video.snippet.title;
      const thumb = video.snippet.thumbnails.medium.url;
      container.innerHTML += `
        <div class="video-card">
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumb}" alt="${title}">
            <h3>${title}</h3>
          </a>
        </div>`;
    });
  } catch (e) {
    console.error("Error loading videos:", e);
  }
}

function toggleTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  loadVideos();
};
