//add capitol links
document.querySelectorAll("h2").forEach((h2) => {
  const content = h2.innerHTML;
  const capNumber = content.match(/Capitolul |Глава ([^/.]+)./)[1];
  h2.innerHTML = `<a id="cap${capNumber}">${content}</a>`;
});

// add article links
document.querySelectorAll("h3").forEach((h3) => {
  const content = h3.innerHTML;
  let artNumber = content.match(/Articolul |Статья (\d+)/)[1];

  const sup = h3.querySelector("sup");
  if (sup) {
    const supNumber = sup.innerText;
    artNumber = `${artNumber}-${supNumber}`;
  }

  h3.innerHTML = `<a id="art${artNumber}">${content}</a>`;
});

const isRomanianLanguage = document
  .querySelector("body > header > p:first-of-type")
  .innerText.startsWith("Publicat");

// add navigation
const nav = document.createElement("nav");
const h3 = document.createElement("h3");
h3.innerHTML = isRomanianLanguage ? "Conţinut" : "Оглавление";
const ul1 = document.createElement("ul");
nav.append(h3, ul1);
document.querySelector("body > header").after(nav);

let li1, ul2;
document.querySelectorAll("a").forEach((a) => {
  const content = a.innerHTML.replace(/Capitolul |Глава |Articolul |Статья /, "");
  const innerHTML = `<a href="#${a.id}">${content}</a>`;
  if (a.parentElement.tagName === "H2") {
    li1 = document.createElement("li");
    li1.innerHTML = innerHTML;
    ul1.append(li1);
    ul2 = document.createElement("ul");
    li1.append(ul2);
  } else if (a.parentElement.tagName === "H3") {
    const li2 = document.createElement("li");
    li2.innerHTML = innerHTML;
    ul2.append(li2);
  }
});
