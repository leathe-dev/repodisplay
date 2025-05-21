(function () {
  const scriptTag = document.currentScript;
  const username = scriptTag.getAttribute("data-username");
  const containerId = scriptTag.getAttribute("data-container") || "github-repos";

  const container = document.getElementById(containerId);
  if (!container || !username) return;

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(repos => {
      repos.forEach(repo => {
        const box = document.createElement("div");
        box.className = "repo-box";
        box.innerHTML = `
          <a class="redirect" href="${repo.html_url}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
          <div class="repo-header">
            <img src="https://opengraph.githubassets.com/1/${username}/${repo.name}" alt="${repo.name} preview">
            <a href="${repo.html_url}" target="_blank">${username} / ${repo.name}</a>
          </div>
          <p class="repo-desc">${repo.description || "No description"}</p>
        `;
        container.appendChild(box);
      });
    });
})();
