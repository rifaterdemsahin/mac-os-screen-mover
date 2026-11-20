(function () {
  const ITEMS = [
    { href: 'index.html', label: 'Overview' },
    { href: 'first-principles.html', label: 'First Principles' },
    { href: 'install.html', label: 'Install & How to Use' },
    {
      href: 'https://github.com/rifaterdemsahin/mac-os-screen-mover',
      label: 'GitHub',
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
  brand.textContent = 'macOS Screen Mover';
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
})();
