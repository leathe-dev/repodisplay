(function () {
  const scriptTag = document.currentScript;
  const username = scriptTag.getAttribute("data-username");
  const containerId = scriptTag.getAttribute("data-container") || "github-repos";
  const container = document.getElementById(containerId);
  if (!container || !username) return;

  fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user => {
      const avatarUrl = user.avatar_url + "&s=40";

      fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then(repos => {
          repos.forEach(repo => {
            const box = document.createElement("div");
            box.className = "repo-box";
            box.innerHTML = `
              <a class="redirect" href="${repo.html_url}" target="_blank" title="View on GitHub">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <div class="repo-header">
                <img src="${avatarUrl}" alt="${username} avatar">
                <a href="${repo.html_url}" target="_blank">${username} / ${repo.name}</a>
              </div>
              <p class="repo-desc">${repo.description || "No description"}</p>
            `;
            container.appendChild(box);
          });
        });
    });
})();
