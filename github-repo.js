const username = 'USERNAME HERE';
    const reposContainer = document.getElementById('github-repos');

    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then(response => response.json())
      .then(repos => {
        if (!Array.isArray(repos)) {
          reposContainer.textContent = 'Error fetching repos.';
          return;
        }
        reposContainer.innerHTML = repos.map(repo => `
          <div class="repo-box">
            <img src="${repo.owner.avatar_url}" alt="avatar" class="avatar-icon">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
            <p class="repo-desc">${repo.description || 'No description'}</p>
            <span class="redirect">↗</span>
          </div>
        `).join('');
      })
      .catch(() => {
        reposContainer.textContent = 'Failed to load repos.';
      });
