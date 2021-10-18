"use strict";

//grab nodes
let addyNode = document.querySelector("#address");
let timeNode = document.querySelector("#time");
let byobNode = document.querySelector("#byob-options");
let vibeNode = document.querySelector("#vibe-options");
let inviteNode = document.querySelector("#invite-options");
let previewNode = document.querySelector("#preview-text");

//convert date
function convertTime() {
  if (timeNode.value != "") {
    let time = new Date(timeNode.value);
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
}

//update preview
function updatePreview() {
  previewNode.innerHTML = buildPreview();
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
  )}. ${getBYOBText()}
    Feel free to bring ${inviteNode.value}.`;
}

//add event listeners
addyNode.addEventListener("keyup", updatePreview);
timeNode.addEventListener("onchange", updatePreview);
byobNode.addEventListener("onchange", updatePreview);
vibeNode.addEventListener("onchange", updatePreview);
inviteNode.addEventListener("onchange", updatePreview);
