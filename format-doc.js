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
document.querySelectorAll("#contentdoc .text-center h4 br").forEach((br) => {
  br.remove();
});

// add header
const docNumberAndDate = document.querySelectorAll("#contentdoc .text-center h4")[2].innerText;
const formattedDocNumberAndDate = docNumberAndDate
  .replace("ЗАКОН", "Закон")
  .replace("LEGE", "Lege")
  .replace("COD", "Cod")
  .replaceAll("-", ".");
const docName = document.querySelectorAll("#contentdoc .text-center h4")[3].innerText;
const docPublished = document.querySelector("#contentdoc > h4").innerText;
const formattedDocPublished = docPublished.replace(" :", ":");

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
const docModifiedSpan = document.querySelector('main > p > em:first-child > span[style="color:red;"]');
if (docModifiedSpan) {
  const docModified = docModifiedSpan.parentElement.parentElement;
  const formattedDocModified = docModified.innerText
    .replace("ИЗМЕНЕН", "Изменен")
    .replace("MODIFICAT", "Modificat");
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

// remove br from title
document.querySelectorAll("main > p > br").forEach((br) => {
  br.remove();
});

// convert p to h2 (3 lines)
const p_to_h2_3_lines_query = `
p[align="center"] + p[align="center"] + p[align="center"],
p:has(> strong > span) + p:has(> span > strong) + p:has(> span > strong > strong),
p:has(> strong > span) + p:has(> strong > span) + p:has(> strong > span)
`;
document.querySelectorAll(p_to_h2_3_lines_query).forEach((p) => {
  const firstLine = p.previousElementSibling.previousElementSibling;
  const secondLine = p.previousElementSibling;
  const formattedSecondLine = capitalizeFirstLetter(secondLine.innerText);
  const formattedThirdLine = p.innerText.toLowerCase();
  p.outerHTML = `<h2>${firstLine.innerText}. ${formattedSecondLine} ${formattedThirdLine}</h2>`;
  firstLine.remove();
  secondLine.remove();
});

// convert p to h2 (2 lines)
const p_to_h2_2_lines_query = `
p[align="center"] + p[align="center"],
p:has(> strong:only-child > span) + p:has(> strong:only-child > span)
`;
document.querySelectorAll(p_to_h2_2_lines_query).forEach((p) => {
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
footerFirstLine.innerHTML = footerFirstLine.innerHTML.replaceAll("&nbsp;", " ").trim();
const formattedFooterFirstLine = footerFirstLine.innerText.replace(
  "ПРЕДСЕДАТЕЛЬ ПАРЛАМЕНТА",
  "Председатель парламента"
);
const footerSecondLine = allParagraphs[allParagraphs.length - 1];
footerSecondLine.innerHTML = footerSecondLine.innerHTML.replaceAll("&nbsp;", " ").trim();

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
document.querySelectorAll("main > p > strong:first-child > span > span > span > sup").forEach((sup) => {
  const firstSpan = sup.parentElement;
  const secondSpan = firstSpan.parentElement.parentElement.parentElement.nextElementSibling;
  const secondSpanChild = secondSpan.firstElementChild.firstElementChild;
  secondSpanChild.innerHTML = secondSpanChild.innerHTML.replace("&nbsp;", " ").trim();
  const parent = secondSpan.parentElement;
  parent.outerHTML = `<h3>${firstSpan.innerHTML}${secondSpanChild.innerHTML}</h3>`;
});

// change expired article titles from p to h3
document.querySelectorAll("main > p > strong:first-child + span + em:last-child").forEach((em) => {
  const parent = em.parentElement;
  const emChild = em.firstElementChild.firstElementChild.firstElementChild;
  const span = em.previousElementSibling;
  const spanChild = span.firstElementChild.firstElementChild;
  spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
  const strong = span.previousElementSibling;
  const strongChild = strong.firstElementChild.firstElementChild.firstElementChild;
  strongChild.innerHTML = strongChild.innerHTML.replaceAll("&nbsp;", " ").trim();
  parent.outerHTML = `<h3>${strongChild.innerHTML} ${spanChild.innerHTML} ${emChild.innerHTML}</h3>`;
});

// change regular article title from p to h3
document.querySelectorAll("main > p > strong:first-child + span:last-child").forEach((span) => {
  const parent = span.parentElement;
  const spanChild = span.firstElementChild.firstElementChild;
  spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
  const strong = span.previousElementSibling;
  const strongChild = strong.firstElementChild.firstElementChild.firstElementChild;
  strongChild.innerHTML = strongChild.innerHTML.replaceAll("&nbsp;", " ").trim();
  parent.outerHTML = `<h3>${strongChild.innerHTML} ${spanChild.innerHTML}</h3>`;
});

// change regular article title from p to h3 (v2)
document.querySelectorAll("main > p > span:only-child:has(> strong)").forEach((span) => {
  span.innerHTML = span.innerHTML.replaceAll("&nbsp;", " ").trim();
  const parent = span.parentElement;
  parent.outerHTML = `<h3>${span.innerText}</h3>`;
});

// change article title without name from p to h3
document.querySelectorAll("main > p > strong:only-child").forEach((strong) => {
  const parent = strong.parentElement;
  const strongChild = strong?.firstElementChild?.firstElementChild?.firstElementChild;
  if (strongChild) {
    strongChild.innerHTML = strongChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    parent.outerHTML = `<h3>${strongChild.innerHTML}</h3>`;
  }
});

// change regular article title from p to h3 (v3)
document.querySelectorAll("main > p > strong:only-child").forEach((strong) => {
  const parent = strong.parentElement;
  strong.outerHTML = strong.innerHTML;
  parent.outerHTML = `<h3>${parent.innerHTML.replaceAll("&nbsp;", " ").trim()}</h3>`;
});

// change p with strange format to h3
document.querySelectorAll("main > p > span:only-child > span > span > strong").forEach((strong) => {
  const parent = strong.parentElement.parentElement.parentElement.parentElement;
  parent.innerHTML = parent.innerHTML.replaceAll("&nbsp;", " ").trim();
  parent.outerHTML = `<h3>${parent.innerText}</h3>`;
});

// format expired paragraphs (v1)
document.querySelectorAll("main > p > span:first-child + em:last-child").forEach((em) => {
  const emChild = em.firstChild.firstChild.firstChild;
  emChild.innerHTML = emChild.innerHTML.replaceAll("&nbsp;", " ").trim();
  const spanChild = em.previousElementSibling.firstElementChild.firstElementChild;
  spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
  const parent = em.parentElement;
  parent.outerHTML = `<p>${spanChild.innerHTML} ${emChild.innerHTML}</p>`;
});

// format expired paragraphs (v2)
document
  .querySelectorAll('main > p > span:first-child + span:last-child[style="color:red;"] > span > span > em')
  .forEach((em) => {
    em.innerHTML = em.innerHTML.replaceAll("&nbsp;", " ").trim();
    const span = em.parentElement.parentElement.parentElement.previousElementSibling;
    const spanChild = span.querySelector("span > span > span");
    spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const parent = span.parentElement;
    parent.outerHTML = `<p>${spanChild.innerHTML} ${em.innerHTML}</p>`;
  });

// format regular paragraphs (v1)
document.querySelectorAll("main > p > span:only-child > span > span").forEach((span) => {
  span.innerHTML = span.innerHTML.replaceAll("&nbsp;", " ").trim();
  const parent = span.parentElement.parentElement.parentElement;
  parent.outerHTML = `<p>${span.innerHTML}</p>`;
});

// format regular paragraphs (v2)
document.querySelectorAll('main > p > span:only-child[style="color:#333333;"]').forEach((span) => {
  span.innerHTML = span.innerHTML.replaceAll("&nbsp;", " ").trim();
  const parent = span.parentElement;
  parent.outerHTML = `<p>${span.innerHTML}</p>`;
});

// format regular paragraphs (v3)
document.querySelectorAll("main > p:not(:has(*))").forEach((p) => {
  p.outerHTML = `<p>${p.innerHTML.replaceAll("&nbsp;", " ").trim()}</p>`;
});

// format regular paragraphs (v4)
document.querySelectorAll("main > p > span:only-child > span:only-child").forEach((span) => {
  const parent = span.parentElement.parentElement;
  span.innerHTML = span.innerHTML.replaceAll("&nbsp;", " ").trim();
  parent.outerHTML = `<p>${span.innerHTML}</p>`;
});

// format regular paragraphs (v5)
document.querySelectorAll("main > p > span:only-child").forEach((span) => {
  const parent = span.parentElement;
  span.innerHTML = span.innerHTML.replaceAll("&nbsp;", " ").trim();
  parent.outerHTML = `<p>${span.innerHTML}</p>`;
});

// format paragraphs with br in front
document.querySelectorAll("main > p > br:first-child + span:last-child").forEach((span) => {
  const spanChild = span.querySelector("span > span > span");
  spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
  const parent = span.parentElement;
  parent.outerHTML = `<p>${spanChild.innerHTML}</p>`;
});

// format paragraphs with em in front (v1)
document.querySelectorAll("main > p > em:first-child + span:last-child").forEach((span) => {
  const spanChild = span.querySelector("span > span > span");
  if (spanChild) {
    spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const emChild = span.previousElementSibling.querySelector("span > span > span");
    emChild.innerHTML = emChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const parent = span.parentElement;
    parent.outerHTML = `<p><em>${emChild.innerHTML}</em> ${spanChild.innerHTML}</p>`;
  }
});

// format paragraphs with em in front (v2)
document.querySelectorAll("main > p > em:first-child + span:last-child").forEach((span) => {
  const spanChild = span.querySelector("span > span");
  if (spanChild) {
    spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const emChild = span.previousElementSibling.querySelector("span > span");
    emChild.innerHTML = emChild.innerHTML.replaceAll("&nbsp;", " ").trim();
    const parent = span.parentElement;
    parent.outerHTML = `<p><em>${emChild.innerHTML}</em> ${spanChild.innerHTML}</p>`;
  }
});

// format paragraphs with em in front (v3)
document.querySelectorAll("main > p > em:only-child").forEach((em) => {
  const parent = em.parentElement;
  parent.outerHTML = `<p>${parent.innerHTML.replaceAll("&nbsp;", " ").trim()}</p>`;
});

// format paragraphs with sup
document.querySelectorAll("main > p:has(> sup:only-child)").forEach((p) => {
  p.outerHTML = `<p>${p.innerHTML.replaceAll("&nbsp;", " ").trim()}</p>`;
});

// format modified paragraphs (v1)
document.querySelectorAll('main > p > em:only-child > span[style="color:blue;"]').forEach((span) => {
  const spanChild = span.querySelector("span > span > span");
  spanChild.innerHTML = spanChild.innerHTML.replaceAll("&nbsp;", " ").trim();
  const parent = span.parentElement.parentElement;
  parent.outerHTML = `<p class="modified">${spanChild.innerHTML}</p>`;
});

// format modified paragraphs (v2)
document.querySelectorAll('main > p > em + em + em > span[style="color:blue;"]').forEach((span3) => {
  const spanChild3 = span3.querySelector("span > span > span");
  spanChild3.innerHTML = spanChild3.innerHTML.replaceAll("&nbsp;", " ").trim();
  const span2 = span3.parentElement.previousElementSibling.firstElementChild;
  const spanChild2 = span2.querySelector("span > span > span");
  spanChild2.innerHTML = spanChild2.innerHTML.replaceAll("&nbsp;", " ").trim();
  const span1 = span2.parentElement.previousElementSibling.firstElementChild;
  const spanChild1 = span1.querySelector("span > span > span");
  spanChild1.innerHTML = spanChild1.innerHTML.replaceAll("&nbsp;", " ").trim();
  const parent = span3.parentElement.parentElement;
  parent.outerHTML = `<p class="modified">${spanChild1.innerHTML}${spanChild2.innerHTML}${spanChild3.innerHTML}</p>`;
});

// format modified paragraphs (v3)
document.querySelectorAll('main > p > span:only-child[style="color:#0000FF;"] > em').forEach((em) => {
  em.innerHTML = em.innerHTML.replaceAll("&nbsp;", " ").trim();
  const parent = em.parentElement.parentElement;
  parent.outerHTML = `<p class="modified">${em.innerHTML}</p>`;
});
