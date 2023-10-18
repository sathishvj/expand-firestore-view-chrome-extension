var getElementByXPath = function (xPath) {
  var xPathResult = document.evaluate(
    xPath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return xPathResult.singleNodeValue;
};

/*
getTextByXPath = function (xPath, field) {
  var xp = getElementByXPath(xPath);
  if (!xp) {
    return "";
  }

  if (!field) {
    field = "textContent";
  }

  var text = "";
  switch (field) {
    case "innerText":
      text = xp.innerText;
      break;
    case "innerHTML":
      text = xp.innerHTML;
      break;
    case "textContent":
      text = xp.textContent;
      break;
  }
  return text.trim();
};
*/

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const xpaths = [
  // '//*[@id="main"]/fire-router-outlet/firestore-base/f7e-data/div',
  // '//*[@id="main"]/fire-router-outlet/firestore-base/f7e-data/div/div[2]',
  // '//*[@class="viewer-container"]',
  // '//*[@class="firebase-database"]',

  // '//*[contains-token(@class, "viewer-container")]',
  // '//*[contains-token(@class, "firebase-database")]',

  // '//*[contains(concat(" ", normalize-space(@class), " "), " viewer-container ")]',
  // '//*[contains(concat(" ", normalize-space(@class), " "), " firebase-database ")]',

  // '//*[tokenize(@class,"s+")="viewer-container"]',
  // '//*[tokenize(@class,"s+")="firebase-database"]',

  '//*[@class[contains(.,"viewer-container")]]',
  '//*[@class[contains(.,"firebase-database")]]',
];

async function updateView(sleepTime, count) {
  await sleep(sleepTime);

  // go through list of sites and xpaths until returnPolicy is not empty.
  for (const xpath of xpaths) {
    let el = getElementByXPath(xpath);
    if (!el) {
      // console.log(
      //   "No element found for xpath yet:",
      //   xpath,
      //   ". Will try again in a while. ",
      //   count
      // );
      return false;
    }

    //console.log("Found for xpath:", xpath);
    el.style["max-width"] = "100%";
  }

  console.log("Expand Firestore View Extension: set width to 100%.");
  return true;
}

async function callUpdateView() {
  let done = false;
  let count = 1;
  let sleepTime = 500;
  while (!done && count < 20) {
    done = await updateView(sleepTime, count);
    count++;
    // console.log("done:", done, ", count:", count);
  }

  if (!done) {
    console.log(
      "Expand Firestore View Extension: could not expand view. Probably because could not find element for xpath. Giving up."
    );
  }
}

// console.log("On site:", document.URL);
callUpdateView();
