/**
 * Opening: the home hero. A navy field with one narrow gap of light,
 * like a door left ajar. Rows: heading, text, link(s) and, optionally,
 * a picture that shows faintly through the navy as a background.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'opening-content';
  let backdrop = null;

  rows.forEach((row) => {
    const cell = row.firstElementChild;
    if (!cell) return;
    const picture = cell.querySelector('picture');
    if (picture && !backdrop && !cell.textContent.trim()) {
      backdrop = document.createElement('div');
      backdrop.className = 'opening-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      const img = picture.querySelector('img');
      if (img) {
        img.alt = '';
        img.loading = 'eager';
        img.fetchPriority = 'high';
      }
      backdrop.append(picture);
      return;
    }
    content.append(...cell.childNodes);
  });

  content.querySelectorAll('a').forEach((a, i) => {
    a.classList.add('opening-link');
    if (i === 0) a.classList.add('opening-link-primary');
    const wrap = a.closest('p');
    if (wrap) wrap.classList.add('opening-actions');
  });

  const gap = document.createElement('div');
  gap.className = 'opening-gap';
  gap.setAttribute('aria-hidden', 'true');

  if (backdrop) block.classList.add('has-backdrop');
  block.replaceChildren(...(backdrop ? [backdrop] : []), content, gap);
  requestAnimationFrame(() => requestAnimationFrame(() => block.classList.add('is-open')));
}
