/**
 * Doors: one tall panel per brand.
 * Rows: brand name | one line | link (and optional extra links).
 */
export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'doors-list';
  [...block.children].forEach((row) => {
    const [nameCell, textCell, linkCell] = [...row.children];
    const link = (linkCell || nameCell).querySelector('a');
    const li = document.createElement('li');
    li.className = 'door';
    const a = document.createElement('a');
    a.className = 'door-panel';
    a.href = link ? link.href : '#';
    const name = document.createElement('h3');
    name.className = 'door-name';
    name.textContent = nameCell.textContent.trim();
    const text = document.createElement('p');
    text.className = 'door-text';
    text.textContent = textCell ? textCell.textContent.trim() : '';
    const cta = document.createElement('span');
    cta.className = 'door-cta';
    cta.textContent = link ? link.textContent.trim() : '';
    a.append(name, text, cta);
    li.append(a);
    list.append(li);
  });
  block.replaceChildren(list);
}
