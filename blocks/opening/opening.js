/**
 * Opening: the home hero. A navy field with one narrow gap of light,
 * like a door left ajar. Rows: 1 heading, 2 text, 3 link(s).
 */
export default function decorate(block) {
  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'opening-content';
  rows.forEach((row) => {
    const cell = row.firstElementChild;
    if (cell) content.append(...cell.childNodes);
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

  block.replaceChildren(content, gap);
  requestAnimationFrame(() => requestAnimationFrame(() => block.classList.add('is-open')));
}
