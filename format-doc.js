function capitalizeFirstLetter(input) {
  return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

// remove head
document.head.remove();

// move contentDiv to top
const contentDiv = document.querySelector("#contentdoc");
document.body.append(contentDiv);

// remove all children from body
document.querySelectorAll("body > :not(#contentdoc)").forEach((child) => {
  child.remove();
});

// remove br from title
document.querySelector("#contentdoc .text-center h4 br").remove(); // doc date and number
document.querySelector("#contentdoc .text-center h4 br").remove(); // doc title

// add header
const docNumberAndDate = document.querySelectorAll(
  "#contentdoc .text-center h4"
)[2].innerText;
const formattedDocNumberAndDate = docNumberAndDate
  .replace("ЗАКОН", "Закон")
  .replaceAll("-", ".");
const docName = document.querySelectorAll("#contentdoc .text-center h4")[3]
  .innerText;
const docPublished = document.querySelector("#contentdoc > h4").innerText;
const formattedDocPublished = docPublished.replace(
  "Опубликован :",
  "Опубликован:"
);

const header = document.createElement("header");
const h1Title = document.createElement("h1");
h1Title.innerText = `${formattedDocNumberAndDate} ${docName}`;
const pPublished = document.createElement("p");
pPublished.innerText = formattedDocPublished;
header.append(h1Title, pPublished);
contentDiv.before(header);

// change span to main
const mainSpan = document.querySelector("#contentdoc > span");
mainSpan.outerHTML = `<main>${mainSpan.innerHTML}</main>`;

// move main after header
const main = document.querySelector("#contentdoc > main");
header.after(main);

// remove content div
contentDiv.remove();

// add 'modified' line to header
const docModifiedSpan = document.querySelector(
  'main > p > em:first-child > span[style="color:red;"]'
);
if (docModifiedSpan) {
  const docModified = docModifiedSpan.parentElement.parentElement;
  const formattedDocModified = docModified.innerText.replace(
    "ИЗМЕНЕН",
    "Изменен"
  );
  const docModifiedDate = docModified.nextElementSibling;
  const pModified = document.createElement("p");
  pModified.innerText = `${formattedDocModified}: ${docModifiedDate.innerText}`;
  header.append(pModified);
  docModified.remove();
  docModifiedDate.remove();
}

// remove empty paragraphs
document.querySelectorAll("main > p").forEach((p) => {
  if (p.innerHTML === "&nbsp;") {
    p.remove();
  }
});

// replace p with h2
document
  .querySelectorAll('p[align="center"] + p[align="center"] + p[align="center"]')
  .forEach((p) => {
    const firstLine = p.previousElementSibling.previousElementSibling;
    const secondLine = p.previousElementSibling;
    const formattedSecondLine = capitalizeFirstLetter(secondLine.innerText);
    const formattedThirdLine = p.innerText.toLowerCase();
    p.outerHTML = `<h2>${firstLine.innerText}. ${formattedSecondLine} ${formattedThirdLine}</h2>`;
    firstLine.remove();
    secondLine.remove();
  });

document
  .querySelectorAll('p[align="center"] + p[align="center"]')
  .forEach((p) => {
    const firstLine = p.previousElementSibling;
    const formattedSecondLine = capitalizeFirstLetter(p.innerText);
    p.outerHTML = `<h2>${firstLine.innerText}. ${formattedSecondLine}</h2>`;
    firstLine.remove();
  });

// remove &nbsp; from h2
document.querySelectorAll("h2").forEach((h2) => {
  h2.innerHTML = h2.innerHTML.replace("&nbsp;", " ");
});

// add footer
const allParagraphs = document.querySelectorAll("main > p");
const footerFirstLine = allParagraphs[allParagraphs.length - 2];
footerFirstLine.innerHTML = footerFirstLine.innerHTML
  .replaceAll("&nbsp;", " ")
  .trim();
const formattedFooterFirstLine = footerFirstLine.innerText.replace(
  "ПРЕДСЕДАТЕЛЬ ПАРЛАМЕНТА",
  "Председатель парламента"
);
const footerSecondLine = allParagraphs[allParagraphs.length - 1];
footerSecondLine.innerHTML = footerSecondLine.innerHTML
  .replaceAll("&nbsp;", " ")
  .trim();

const footer = document.createElement("footer");
const pFooterAuthor = document.createElement("p");
pFooterAuthor.innerHTML = `<strong>${formattedFooterFirstLine}</strong>`;
const pFooterDate = document.createElement("p");
pFooterDate.innerHTML = `<strong>${footerSecondLine.innerText}</strong>`;
footer.append(pFooterAuthor, pFooterDate);
document.body.append(footer);
footerFirstLine.remove();
footerSecondLine.remove();

// change article titles with sup from p to h3
document
  .querySelectorAll("main > p > strong:first-child > span > span > span > sup")
  .forEach((sup) => {
    const firstSpan = sup.parentElement;
    const secondSpan =
      firstSpan.parentElement.parentElement.parentElement.nextElementSibling;
    const secondSpanChild = secondSpan.firstElementChild.firstElementChild;
    secondSpanChild.innerHTML = secondSpanChild.innerHTML
      .replace("&nbsp;", " ")
      .trim();
    const parent = secondSpan.parentElement;
    parent.outerHTML = `<h3>${firstSpan.innerHTML}${secondSpanChild.innerHTML}</h3>`;
  });

// change expired article titles from p to h3
document
  .querySelectorAll("main > p > strong:first-child + span + em:last-child")
  .forEach((em) => {
    const parent = em.parentElement;
    const emChild = em.firstElementChild.firstElementChild.firstElementChild;
    const span = em.previousElementSibling;
    const spanChild = span.firstElementChild.firstElementChild;
    spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const strong = span.previousElementSibling;
    const strongChild =
      strong.firstElementChild.firstElementChild.firstElementChild;
    strongChild.innerHTML = strongChild.innerHTML
      .replaceAll("&nbsp;", " ")
      .trim();
    parent.outerHTML = `<h3>${strongChild.innerHTML} ${spanChild.innerHTML} ${emChild.innerHTML}</h3>`;
  });

// change regular article title from p to h3
document
  .querySelectorAll("main > p > strong:first-child + span:last-child")
  .forEach((span) => {
    const parent = span.parentElement;
    const spanChild = span.firstElementChild.firstElementChild;
    spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const strong = span.previousElementSibling;
    const strongChild =
      strong.firstElementChild.firstElementChild.firstElementChild;
    strongChild.innerHTML = strongChild.innerHTML
      .replaceAll("&nbsp;", " ")
      .trim();
    parent.outerHTML = `<h3>${strongChild.innerHTML} ${spanChild.innerHTML}</h3>`;
  });

// change article title without name from p to h3
document.querySelectorAll("main > p > strong:only-child").forEach((strong) => {
  const parent = strong.parentElement;
  const strongChild =
    strong.firstElementChild.firstElementChild.firstElementChild;
  strongChild.innerHTML = strongChild.innerHTML
    .replaceAll("&nbsp;", " ")
    .trim();
  parent.outerHTML = `<h3>${strongChild.innerHTML}</h3>`;
});

// change p with strange format to h3
document
  .querySelectorAll("main > p > span:only-child > span > span > strong")
  .forEach((strong) => {
    const parent =
      strong.parentElement.parentElement.parentElement.parentElement;
    parent.innerHTML = parent.innerHTML.replaceAll("&nbsp;", " ").trim();
    parent.outerHTML = `<h3>${parent.innerText}</h3>`;
  });

// format expired paragraphs
document
  .querySelectorAll("main > p > span:first-child + em:last-child")
  .forEach((em) => {
    const emChild = em.firstChild.firstChild.firstChild;
    emChild.innerHTML = emChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const spanChild =
      em.previousElementSibling.firstElementChild.firstElementChild;
    spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const parent = em.parentElement;
    parent.outerHTML = `<p>${spanChild.innerHTML} ${emChild.innerHTML}</p>`;
  });

// format regular paragraphs
document.querySelectorAll("main > p > span:only-child").forEach((span) => {
  const spanChild = span.querySelector("span > span > span");
  spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
  const parent = span.parentElement;
  parent.outerHTML = `<p>${spanChild.innerHTML}</p>`;
});

// format paragraphs with br in front
document
  .querySelectorAll("main > p > br:first-child + span:last-child")
  .forEach((span) => {
    const spanChild = span.querySelector("span > span > span");
    spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const parent = span.parentElement;
    parent.outerHTML = `<p>${spanChild.innerHTML}</p>`;
  });

// format paragraphs with em in front
document
  .querySelectorAll("main > p > em:first-child + span:last-child")
  .forEach((span) => {
    const spanChild = span.querySelector("span > span > span");
    spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const emChild =
      span.previousElementSibling.querySelector("span > span > span");
    emChild.innerHTML = emChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const parent = span.parentElement;
    parent.outerHTML = `<p><em>${emChild.innerHTML}</em> ${spanChild.innerHTML}</p>`;
  });

// format modified paragraphs
document
  .querySelectorAll('main > p > em:only-child > span[style="color:blue;"]')
  .forEach((span) => {
    const spanChild = span.querySelector("span > span > span");
    spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const parent = span.parentElement.parentElement;
    parent.outerHTML = `<p class="modified">${spanChild.innerHTML}</p>`;
  });
