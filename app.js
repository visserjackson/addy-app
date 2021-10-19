"use strict";

//grab nodes for text preview
let addyNode = document.querySelector("#address");
let timeNode = document.querySelector("#time");
let byobNode = document.querySelector("#byob-options");
let vibeNode = document.querySelector("#vibe-options");
let inviteNode = document.querySelector("#invite-options");
let previewNode = document.querySelector("#preview-text");
let copyNode = document.querySelector("#copy-button");

//grab notes for flyer preview
let flyerTitleNode = document.querySelector("#flyer-title");
let flyerTimeNode = document.querySelector("#flyer-time");
let flyerBYOBNode = document.querySelector("#flyer-byob");
let flyerInviteNode = document.querySelector("#flyer-invite");
let saveNode = document.querySelector("#save-button-flyer");

//convert time
function convertTime() {
  if (timeNode.value == "") {
    return "";
  } else {
    let time = new Date(timeNode.value);
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
}

function convertDay() {
  if (timeNode.value == "") {
    return "";
  }
  {
    let time = new Date(timeNode.value);
    return time.toLocaleString("en-US", {
      weekday: "long",
    });
  }
}

//update preview
function updatePreview() {
  previewNode.innerHTML = buildPreview();
}

//copy text
function copyText() {
  let data = [
    new ClipboardItem({
      "text/plain": new Blob([previewNode.value], { type: "text/plain" }),
    }),
  ];
  navigator.clipboard.write(data).then(
    function () {
      alert("Copied to clipboard.");
    },
    function () {
      console.error("Unable to write to clipboard. :-(");
    }
  );
}

//build preview based on user inputs
function buildPreview() {
  return `${vibeNode.value} at ${addyNode.value}! Come by at ${convertTime(
    timeNode.value
  )} on ${convertDay()}. ${getBYOBText()} ${getInivteText()}`;
}

function getBYOBText() {
  switch (byobNode.value) {
    case "yes":
      return "BYOB.";
    case "no":
      return "Alcohol will be provided.";
  }
}

function getInivteText() {
  if (inviteNode.value == "nobody else") {
    return "Please just bring yourself.";
  } else {
    return `Feel free to bring ${inviteNode.value}!`;
  }
}

//update flyer preview
function updateFlyer() {
  flyerTitleNode.innerHTML = updateTitle();
  flyerTimeNode.innerHTML = updateTime();
  flyerBYOBNode.innerHTML = getBYOBText();
  flyerInviteNode.innerHTML = getInivteText();

  function updateTitle() {
    return `${vibeNode.value} @ ${addyNode.value}!`;
  }

  function updateTime() {
    return `${convertDay()} @ ${convertTime()}`;
  }
}

function hideTable() {}

//add event listeners for text preview
addyNode.addEventListener("keyup", updatePreview);
timeNode.addEventListener("onchange", updatePreview);
byobNode.addEventListener("onchange", updatePreview);
vibeNode.addEventListener("onchange", updatePreview);
inviteNode.addEventListener("onchange", updatePreview);
copyNode.addEventListener("click", copyText);

//add event listeners for flyer preview
addyNode.addEventListener("keyup", updateFlyer);
timeNode.addEventListener("onchange", updateFlyer);
byobNode.addEventListener("onchange", updateFlyer);
vibeNode.addEventListener("onchange", updateFlyer);
inviteNode.addEventListener("onchange", updateFlyer);
saveNode.addEventListener("click", hideTable);
