
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


window['padding_right'] = function (s, c, n) {
  if (! s || ! c || s.length >= n) { return s; }
  var max = (n - s.length)/c.length;
  for (var i = 0; i < max; i++) { s += c; }
  return s;
}

window['removeElementsByClass'] = function (className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

document.querySelector('head').innerHTML += '<style>.audible_meta_data textarea { width: 100%; height: 50px; overflow-y: scroll; }</style>';

var iDiv = document.createElement('div');
iDiv.id = 'audible_meta_data';
iDiv.className = 'audible_meta_data';
iDiv.style.border = '1px solid black';
iDiv.innerHTML += '<br/><br/><div id="a_meta_top"><b>Meta Data</b> <i>(Click a box to copy to clipboard)</i></div><br/><hr/><b>json</b><br/><textarea style="height: 200px;" onclick="copy_clipboard(this)" id="json_meta"></textarea><br/>';


if ( window.location.href.indexOf(".co.uk") == -1 && window.location.href.indexOf(".com.au") == -1 && window.location.href.indexOf(".de") == -1) {
// US Version
document.querySelector('.productPublisherSummary').parentElement.appendChild(iDiv);

var meta_dict = {};



var out = 'Author:   [color=white]';
out2 = padding_right(' Author:',' ', 25);
var cnt = 0;
meta_dict['author'] = [];
document.querySelectorAll('.authorLabel a').forEach(p => {
	cnt += 1;
	if (cnt > 1) {
		out += ', ';
		out2 += ', ';
	}
	out += '[url=http://www.audible.com/search?advsearchKeywords=' + p.text + ']' + p.text + '[/url]'
	out2 += p.text
	meta_dict['author'].push(p.text)
});
out += '[/color]';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';



var out = 'Read By:   [color=white]';
out2 = padding_right(' Read By:',' ', 25);
var cnt = 0;
meta_dict['read_by'] = [];
document.querySelectorAll('.narratorLabel a').forEach(p => {
	cnt += 1;
	if (cnt > 1) {
		out += ', ';
		out2 += ', ';
	}
	out += '[url=http://www.audible.com/search?advsearchKeywords=' + p.text + ']' + p.text + '[/url]'
	out2 += p.text
	meta_dict['read_by'].push(p.text)
});
out += '[/color]';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';




var out = 'Date:   [color=white]';
out2 = padding_right(' Date:',' ', 25);
meta_dict['date'] = (document.querySelector('.releaseDateLabel').innerHTML.replace("Release date:","").trim())
out += meta_dict['date'];
out2 += meta_dict['date'];
out += '[/color]';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';


try {
	var out = 'Series:   [color=white]';
	out2 = padding_right(' Date:',' ', 25);
	meta_dict['series'] = (document.querySelector('.seriesLabel').innerText.replace("Series:","").trim())
	out += meta_dict['series'];
	out2 += meta_dict['series'];
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';	
} catch (e) {
	meta_dict['series'] = 'N/A';
}





var out = 'Publisher:   [color=white]';
out2 = padding_right(' Publisher:',' ', 25);
meta_dict['publisher'] = document.querySelector('.publisherLabel a').innerText.trim();
out += meta_dict['publisher'];
out2 += meta_dict['publisher'];
out += '[/color]';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';


var out = '';
out +=  document.querySelector('.productPublisherSummary').innerText.replace("Publisher's Summary", "").trim();
meta_dict['description'] = out;
iDiv.innerHTML += '<hr/><br/><textarea style="height: 300px;" onclick="copy_clipboard(this)">' + out + '\n</textarea>';

} else {

if (window.location.href.indexOf(".de") > -1) {

	//DE Version
	document.querySelector('#publisher-summary').parentElement.appendChild(iDiv);

	var meta_data = document.querySelector('.adbl-prod-data-column').innerText;

	var meta_dict = {};

	var out = 'Author:   [color=white]';
	out2 = padding_right(' Author:',' ', 25);
	var item_data = /Autor:(.*)/.exec(meta_data)[1].split(',')
	var cnt = 0;
	meta_dict['author'] = [];
	item_data.forEach(p => {
		cnt += 1;
		if (cnt > 1) {
			out += ', ';
			out2 += ', ';
		}
		p = p.trim();
		out += '[url=http://www.audible.co.uk/search?advsearchKeywords=' + p + ']' + p + '[/url]';
		out2 += p;
		meta_dict['author'].push(p);
	});
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';


	var out = 'Read By:   [color=white]';
	out2 = padding_right(' Read By:',' ', 25);
	var item_data = /Gesprochen von:(.*)/.exec(meta_data)[1].split(',')
	var cnt = 0;
	meta_dict['read_by'] = [];
	item_data.forEach(p => {
		cnt += 1;
		if (cnt > 1) {
			out += ', ';
			out2 += ', ';
		}
		p = p.trim();
		out += '[url=http://www.audible.co.uk/search?advsearchKeywords=' + p + ']' + p + '[/url]';
		out2 += p;
		meta_dict['read_by'].push(p);
	});
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';



	var out = 'Date:   [color=white]';
	out2 = padding_right(' Date:',' ', 25);
	var item_data = /Veröffentlicht:(.*)/.exec(meta_data)[1]
	out += item_data.trim();
	out2 += item_data.trim();
	meta_dict['date'] = item_data.trim();
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';



try {
	var out = 'Series:   [color=white]';
	out2 = padding_right(' Series:',' ', 25);
	var item_data = /Serie:(.*)/.exec(meta_data)[1]
	out += item_data.trim();
	out2 += item_data.trim();
	meta_dict['series'] = item_data.trim();
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';
} catch (e) {
	meta_dict['series'] = 'N/A';
}


	var out = 'Publisher:   [color=white]';
	out2 = padding_right(' Publisher:',' ', 25);
	var item_data = /Anbieter:(.*)/.exec(meta_data)[1]
	out += item_data.trim();
	out2 += item_data.trim();
	meta_dict['publisher'] = item_data.trim();
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';


	var out = '';
	out +=  document.querySelector('#publisher-summary').innerText.replace("Publisher's Summary", "").trim();
	iDiv.innerHTML += '<hr/><br/><textarea style="height: 300px;" onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	meta_dict['description'] = out;


} else {


	//UK/AU Version
	document.querySelector('#publisher-summary').parentElement.appendChild(iDiv);

	var meta_data = document.querySelector('.adbl-prod-data-column').innerText;

	var meta_dict = {};

	var out = 'Author:   [color=white]';
	out2 = padding_right(' Author:',' ', 25);
	var item_data = /Written by:(.*)/.exec(meta_data)[1].split(',')
	var cnt = 0;
	meta_dict['author'] = [];
	item_data.forEach(p => {
		cnt += 1;
		if (cnt > 1) {
			out += ', ';
			out2 += ', ';
		}
		p = p.trim();
		out += '[url=http://www.audible.co.uk/search?advsearchKeywords=' + p + ']' + p + '[/url]';
		out2 += p;
		meta_dict['author'].push(p);
	});
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';


	var out = 'Read By:   [color=white]';
	out2 = padding_right(' Read By:',' ', 25);
	var item_data = /Narrated by:(.*)/.exec(meta_data)[1].split(',')
	var cnt = 0;
	meta_dict['read_by'] = [];
	item_data.forEach(p => {
		cnt += 1;
		if (cnt > 1) {
			out += ', ';
			out2 += ', ';
		}
		p = p.trim();
		out += '[url=http://www.audible.co.uk/search?advsearchKeywords=' + p + ']' + p + '[/url]';
		out2 += p;
		meta_dict['read_by'].push(p);
	});
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';



	var out = 'Date:   [color=white]';
	out2 = padding_right(' Date:',' ', 25);
	var item_data = /Release Date:(.*)/.exec(meta_data)[1]
	out += item_data.trim();
	out2 += item_data.trim();
	meta_dict['date'] = item_data.trim();
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';


try {
	var out = 'Series:   [color=white]';
	out2 = padding_right(' Series:',' ', 25);
	var item_data = /Series:(.*)/.exec(meta_data)[1]
	out += item_data.trim();
	out2 += item_data.trim();
	meta_dict['series'] = item_data.trim();
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';
} catch (e) {
	meta_dict['series'] = 'N/A';
}



	var out = 'Publisher:   [color=white]';
	out2 = padding_right(' Publisher:',' ', 25);
	var item_data = /Publisher:(.*)/.exec(meta_data)[1]
	out += item_data.trim();
	out2 += item_data.trim();
	meta_dict['publisher'] = item_data.trim();
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';


	var out = '';
	out +=  document.querySelector('#publisher-summary').innerText.replace("Publisher's Summary", "").trim();
	iDiv.innerHTML += '<hr/><br/><textarea style="height: 300px;" onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	meta_dict['description'] = out;

}

}



document.getElementById('json_meta').value = '--AMETA-BEGIN--' + JSON.stringify(meta_dict) + '--AMETA-END--'
document.getElementById("a_meta_top").scrollIntoView();

