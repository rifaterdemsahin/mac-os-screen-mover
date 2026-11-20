(function () {
  const ITEMS = [
    { href: 'index.html', label: '📖 Overview' },
    { href: 'first-principles.html', label: '🧠 First Principles' },
    { href: 'install.html', label: '📦 Install & How to Use' },
    { href: 'recommendations.html', label: '💡 Recommendations' },
    {
      href: 'https://github.com/rifaterdemsahin/mac-os-screen-mover',
      label: '🔗 GitHub',
      external: true,
    },
  ];

  const style = document.createElement('style');
  style.textContent = `
    .topnav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 20px;
      margin-bottom: 32px;
      border-bottom: 1px solid var(--border);
    }
    .brand {
      font-weight: 700;
      font-size: 1rem;
      color: var(--text);
      text-decoration: none;
    }
    .brand:hover { text-decoration: none; }
    .nav-links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .nav-link {
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--muted);
      border: 1px solid transparent;
      text-decoration: none;
    }
    .nav-link:hover {
      color: var(--text);
      background: var(--surface);
      text-decoration: none;
    }
    .nav-link.active {
      color: var(--accent);
      background: var(--accent-soft);
      border-color: rgba(88, 166, 255, 0.35);
    }
  `;
  document.head.appendChild(style);

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const mount = document.getElementById('shared-topnav');
  if (!mount) return;

  const nav = document.createElement('nav');
  nav.className = 'topnav';
  nav.setAttribute('aria-label', 'Primary');

  const brand = document.createElement('a');
  brand.className = 'brand';
  brand.href = 'index.html';
  brand.textContent = '🖥️ macOS Screen Mover';
  nav.appendChild(brand);

  const links = document.createElement('div');
  links.className = 'nav-links';

  ITEMS.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'nav-link';
    a.href = item.href;
    a.textContent = item.label;
    if (item.external) {
      a.target = '_blank';
      a.rel = 'noopener';
    } else if (currentFile === item.href) {
      a.classList.add('active');
    }
    links.appendChild(a);
  });

  nav.appendChild(links);
  mount.replaceWith(nav);

  // Enhance footer on every page with GitHub link & latest release/commit info
  const REPO = 'rifaterdemsahin/mac-os-screen-mover';
  const REPO_URL = `https://github.com/${REPO}`;
  const footer = document.querySelector('footer');
  if (footer) {
    const releaseSpan = document.createElement('span');
    releaseSpan.innerHTML = `🚀 Last release: <a href="${REPO_URL}/releases" target="_blank" rel="noopener">checking...</a>`;

    const gitSpan = document.createElement('span');
    gitSpan.innerHTML = `🔗 Git: <a href="${REPO_URL}" target="_blank" rel="noopener">${REPO}</a>`;

    footer.innerHTML = '';
    footer.appendChild(gitSpan);
    footer.appendChild(releaseSpan);

    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((rel) => {
        const tag = rel.tag_name || rel.name || 'latest';
        const date = rel.published_at ? rel.published_at.slice(0, 10) : '';
        releaseSpan.innerHTML = `🚀 Last release: <a href="${rel.html_url}" target="_blank" rel="noopener">${tag}${date ? ` (${date})` : ''}</a>`;
      })
      .catch(() =>
        fetch(`https://api.github.com/repos/${REPO}/commits/main`)
          .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
          .then((commit) => {
            const sha = (commit.sha || '').slice(0, 7);
            const date = commit.commit?.author?.date ? commit.commit.author.date.slice(0, 10) : '';
            releaseSpan.innerHTML = `🚀 Latest update: <a href="${commit.html_url}" target="_blank" rel="noopener">${sha}${date ? ` (${date})` : ''}</a> &middot; <a href="${REPO_URL}/releases" target="_blank" rel="noopener">Releases</a>`;
          })
          .catch(() => {
            releaseSpan.innerHTML = `🚀 Releases: <a href="${REPO_URL}/releases" target="_blank" rel="noopener">View on GitHub</a>`;
          })
      );
  }
})();
