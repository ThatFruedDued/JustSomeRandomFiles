var reportElements = document.getElementsByClassName("infoTable")[0].children[0].children;
var whySelect = reportElements[1].children[1].children[0];
var reason = reportElements[2].children[1].children[1];
var subRep = reportElements[3].children[1].children[0];

whySelect.selectedIndex = 2;
reason.value = "Hi! I'm really the one cheating. I just have to convey this message to you via a report. Please ban me.";
subRep.click();
