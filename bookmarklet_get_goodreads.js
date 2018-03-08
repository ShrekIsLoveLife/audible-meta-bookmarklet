

var gr_match = window.location.toString().match(/https*:\/\/(.*(goodreads\.(.+?)))\/book\/show\/(.+)/i);
var gr_match2 = window.location.toString().match(/https*:\/\/(.*(goodreads\.(.+?)))\/work\/shelves\/(.+)/i);
if ( gr_match === null && gr_match2 === null ) {
  var err_msg = 'This can only be run on goodreads books and shelves.';
  alert(err_msg);
  throw new Error(err_msg);
} else {




shelves = {};
shelves_str = '';
shelves_str_app = '';

if ( gr_match !== null ) {
  arr = document.querySelectorAll('.greyText.bookPageGenreLink');
  for (var i = 0, len = arr.length; i < len; i++) {
    var itemDat = arr[i].title.match(/([0-9]+?) .*'(.+?)'/i)
    if (itemDat.length == 3) {
      var name = itemDat[2];
      if (! name.match(/(to-read|currently-reading|read|review|own|recommend|default|kindle|ebook|book-club|to-buy|wishlist|owned|^series$|201)/i)) {
        var itemCount = parseInt(itemDat[1].replace(',',''));
        if (itemCount > 1) {
          if (Object.keys(shelves).length <= 8) {
            shelves[name] = itemCount;
            shelves_str += shelves_str_app +  name + ': ' + itemCount;
            shelves_str_app = ', '
            console.log( name + ': ' + itemCount );
          }
        }
      }
    }
  }  
}




if ( gr_match2 !== null ) {
  arr = document.querySelectorAll('.shelfStat');
  for (var i = 0, len = arr.length; i < len; i++) {
    itemData = arr[i].querySelectorAll('div');
    if (itemData.length > 2) {
      var name = itemData[0].innerText;
      if (! name.match(/(to-read|currently-reading|read|review|own|recommend|default|kindle|ebook|book-club|to-buy|wishlist|owned|^series$|201)/i)) {
        var itemCount = /([0-9,]+)\ .*/.exec(itemData[1].innerText)
        if (itemCount.length > 1) {
          itemCount = parseInt(itemCount[1].replace(',',''));
          if (itemCount > 1) {
            if (Object.keys(shelves).length <= 8) {
              shelves[name] = itemCount;
              shelves_str += shelves_str_app +  name + ': ' + itemCount;
              shelves_str_app = ', '
              console.log( name + ': ' + itemCount );
            }
          }
        }
      }
    }
  }
}




console.log(shelves_str);


window['copy_clipboard'] = function copy_clipboard(obj) {
  obj.select();
  document.execCommand('copy');
  obj.blur();
  console.log(obj)

  var iDiv3 = document.createElement('div');
  iDiv3.className = 'copied_to_clipboard';
  iDiv3.style.border = '1px solid red';
  iDiv3.style.backgroundColor = 'red'
  iDiv3.style.color = 'yellow'
  iDiv3.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text copied to clipboard';
  obj.parentNode.insertBefore(iDiv3, obj);
  setTimeout(function(){ removeElementsByClass('copied_to_clipboard') }, 2000);

}

window['removeElementsByClass'] = function (className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
document.querySelector('head').innerHTML += '<style>.gr_meta_data textarea { background-color: #f9f9c9; width: 90%; height: 50px; overflow-y: scroll; }</style>';

var iDiv = document.createElement('div');
iDiv.id = 'gr_meta_data';
iDiv.className = 'gr_meta_data';
iDiv.style.border = '1px solid black';
iDiv.innerHTML += '<br/><br/><div id="gr_meta_top"><b>Meta Data</b> <i>(Click a box to copy to clipboard)</i></div>';

document.querySelector('.mainContent ').parentElement.prepend(iDiv);

iDiv.innerHTML += '<hr/><b>Meta Data Top 8</b><br/><textarea onclick="copy_clipboard(this)">[center][size=8pt][color=limegreen][b]Genre[/b] (goodreads):  ' + shelves_str + '[/color][/size][/center]</textarea>';
//document.getElementById("gr_meta_top").scrollIntoView();




}

