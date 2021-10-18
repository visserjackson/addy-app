"use strict";

//grab nodes
let addyNode = document.querySelector("#address");
let timeNode = document.querySelector("#time");
let byobNode = document.querySelector("#byob-options");
let vibeNode = document.querySelector("#vibe-options");
let inviteNode = document.querySelector("#invite-options");
let previewNode = document.querySelector("#preview-text");
let copyNode = document.querySelector("#copy-button");

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
  previewNode.select();
  previewNode.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(previewNode.innerHTML);
  alert("Copied text");
}

//build preview based on user inputs
function buildPreview() {
  function getBYOBText() {
    switch (byobNode.value) {
      case "yes":
        return "BYOB.";
      case "no":
        return "Alcohol will be provided.";
    }
  }
  return `${vibeNode.value} at ${addyNode.value}! Come by at ${convertTime(
    timeNode.value
  )} on ${convertDay()}. ${getBYOBText()} Feel free to bring ${
    inviteNode.value
  }.`;
}

//add event listeners
addyNode.addEventListener("keyup", updatePreview);
timeNode.addEventListener("onchange", updatePreview);
byobNode.addEventListener("onchange", updatePreview);
vibeNode.addEventListener("onchange", updatePreview);
inviteNode.addEventListener("onchange", updatePreview);
copyNode.addEventListener("click", copyText);
