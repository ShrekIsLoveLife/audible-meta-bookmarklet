var anchors = document.querySelectorAll("a"), i;
for (i = 0; i < anchors.length; ++i) {
  anchors[i].href = unescape(anchors[i].href).replace("anonymiz.com","nullrefer.com").replace("abook.ws","abook.to").replace("kooba.pw", "abook.to");
  anchors[i].innerHTML = anchors[i].innerHTML.replace("anonymiz.com","nullrefer.com").replace("abook.ws","abook.to").replace("kooba.pw", "abook.to");
}
