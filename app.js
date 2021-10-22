"use strict";

//grab nodes for text preview
let addyNode = document.querySelector("#address");
let timeNode = document.querySelector("#time");
let byobNode = document.querySelector("#byob-options");
let byobOtherNode = document.querySelector("#byob-other");
let vibeNode = document.querySelector("#vibe-options");
let vibeOtherNode = document.querySelector("#vibe-other");
let inviteNode = document.querySelector("#invite-options");
let inviteOtherNode = document.querySelector("#invite-other");
let venmoNode = document.querySelector("#venmo");
let previewNode = document.querySelector("#preview-text");
let copyNode = document.querySelector("#copy-button");

//grab notes for flyer preview
let flyerTitleNode = document.querySelector("#flyer-title");
let flyerTimeNode = document.querySelector("#flyer-time");
let flyerBYOBNode = document.querySelector("#flyer-byob");
let flyerInviteNode = document.querySelector("#flyer-invite");
let flyerVenmoNode = document.querySelector("#flyer-venmo");
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
      console.error("Unable to write to clipboard.");
    }
  );
}

//build preview based on user inputs
function buildPreview() {
  return `${getVibeText()} at ${addyNode.value}! Come by at ${convertTime(
    timeNode.value
  )} on ${convertDay()}. ${getBYOBText()}. ${getVenmoText()} ${getInivteText()}.`;
}

function getBYOBText() {
  if (byobOtherNode.value != "") {
    return byobOtherNode.value;
  } else {
    switch (byobNode.value) {
      case "yes":
        $(byobNode).css("background-color", "#3ba3fc");
        $(byobNode).css("color", "white");
        return "BYOB";
      case "no":
        $(byobNode).css("background-color", "#e5e5ec");
        $(byobNode).css("color", "black");
        return "Alcohol will be provided";
    }
  }
}

function getInivteText() {
  if (inviteOtherNode.value != "") {
    return `Invite: ${inviteOtherNode.value}`;
  }
  if (inviteNode.value == "nobody else") {
    return "Please do not invite anyone else";
  } else {
    return `Invite: ${inviteNode.value}`;
  }
}

function getVibeText() {
  if (vibeOtherNode.value != "") {
    return vibeOtherNode.value;
  } else {
    return vibeNode.value;
  }
}

function getVenmoText() {
  if (venmoNode.value == "") {
    return "";
  } else {
    return `Venmo ${venmoNode.value}.`;
  }
}

//update flyer preview
function updateFlyer() {
  flyerTitleNode.innerHTML = updateTitle();
  flyerTimeNode.innerHTML = updateTime();
  flyerVenmoNode.innerHTML = getVenmoText();
  flyerBYOBNode.innerHTML = getBYOBText();
  flyerInviteNode.innerHTML = getInivteText();

  function updateTitle() {
    return `${getVibeText()} @ ${addyNode.value}!`;
  }

  function updateTime() {
    return `${convertDay()} @ ${convertTime()}`;
  }
}

function downloadTable() {
  $("#flyer-table").tableExport({ type: "png" });
}

//add event listeners for text preview
addyNode.addEventListener("keyup", updatePreview);
timeNode.addEventListener("onchange", updatePreview);
byobNode.addEventListener("onchange", updatePreview);
byobOtherNode.addEventListener("onchange", updatePreview);
vibeNode.addEventListener("onchange", updatePreview);
inviteNode.addEventListener("onchange", updatePreview);
venmoNode.addEventListener("onchange", updatePreview);
copyNode.addEventListener("click", copyText);

//add event listeners for flyer preview
addyNode.addEventListener("keyup", updateFlyer);
timeNode.addEventListener("onchange", updateFlyer);
byobNode.addEventListener("onchange", updateFlyer);
byobOtherNode.addEventListener("onchange", updateFlyer);
vibeNode.addEventListener("onchange", updateFlyer);
inviteNode.addEventListener("onchange", updateFlyer);
venmoNode.addEventListener("onchange", updateFlyer);
saveNode.addEventListener("click", downloadTable);
