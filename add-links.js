// add capitol links
document.querySelectorAll('h2').forEach(node => {
  const content = node.innerHTML;
  const artNumber = content.match(/\d+/);
  node.innerHTML = `<a id="cap${artNumber}">${content}</a>`;
});

// add article links
document.querySelectorAll('h3').forEach(node => {
  const content = node.innerHTML;
  const artNumber = content.match(/\d+/);
  node.innerHTML = `<a id="art${artNumber}">${content}</a>`;
});

// add navigation
const nav = document.createElement('nav');
const h3 = document.createElement('h3');
h3.innerHTML = 'Conţinut';
nav.appendChild(h3);
const ul = document.createElement('ul');
nav.appendChild(ul);

document.querySelectorAll('a').forEach(node => {
  const content = node.innerHTML;
  const li = document.createElement('li');
  li.innerHTML = `<a href="#${node.id}">${content}</a>`;
  ul.appendChild(li);
});

const header = document.getElementsByTagName('header')[0];
header.after(nav);
