"use strict";

//grab nodes
let addyNode = document.querySelector("#address");
let timeNode = document.querySelector("#time");
let byobNode = document.querySelector("#byob-options");
let vibeNode = document.querySelector("#vibe-options");
let inviteNode = document.querySelector("#invite-options");
let previewNode = document.querySelector("#preview");

//function to update preview based on user inputs
function buildPreview() {
  function getBYOBText() {
    switch (byobNode.value) {
      case "yes":
        return "BYOB.";
      case "no":
        return "Alcohol will be provided.";
    }
  }
  return `${vibeNode.innerHTML} at ${addyNode.innerHTML}! Come by at ${
    timeNode.innerHTML
  }. ${getBYOBText()}.
    Feel free to bring ${inviteNode.value}.`;
}
