const isRomanianLanguage = document.querySelector('body > header > p:first-of-type').innerText.startsWith('Publicat');

// add capitol links
document.querySelectorAll("h2").forEach((h2) => {
  const content = h2.innerHTML;
  const capNumber = content.match(/Capitolul|Глава ([^/.]+)./)[1];
  h2.innerHTML = `<a id="cap${capNumber}">${content}</a>`;
});

// add article links
document.querySelectorAll("h3").forEach((h3) => {
  const content = h3.innerHTML;
  let artNumber = content.match(/Articolul|Статья (\d+)/)[1];

  const sup = h3.querySelector('sup');
  if (sup) {
    const supNumber = sup.innerText;
    artNumber = `${artNumber}-${supNumber}`;
  }

  h3.innerHTML = `<a id="art${artNumber}">${content}</a>`;
});


// add navigation
const nav = document.createElement("nav");
const h3 = document.createElement("h3");
h3.innerHTML = isRomanianLanguage ? "Conţinut" : 'Оглавление';
const ul = document.createElement("ul");
nav.append(h3, ul);

document.querySelectorAll("a").forEach((node) => {
  const content = node.innerHTML.replace(/Capitolul|Глава|Articolul|Статья /, '');
  const li = document.createElement("li");
  li.innerHTML = `<a href="#${node.id}">${content}</a>`;
  ul.appendChild(li);
});

const header = document.querySelector("body > header");
header.after(nav);
