
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

window['generate_search_string'] = function (slen) {
  var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(slen).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
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

try {
	var out = 'Title:   [color=white]';
	out2 = padding_right(' Title:',' ', 25);
	meta_dict['title'] = (document.querySelectorAll(".bc-list-item h1")[0].innerText.trim());
	out += meta_dict['title'];
	out2 += meta_dict['title'];
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';	
} catch (e) {
	meta_dict['title'] = 'N/A';
}

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
	out += '[url=http://www.audible.com/search?advsearchKeywords=' + p.text + ']' + p.text + '[/url]';
	out2 += p.text;
	meta_dict['author'].push(p.text);
});
out += '[/color]';
meta_dict['author_nfo'] = out2;
meta_dict['author_nfotemp'] = out;
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
	out += '[url=http://www.audible.com/search?advsearchKeywords=' + p.text + ']' + p.text + '[/url]';
	out2 += p.text;
	meta_dict['read_by'].push(p.text);
});
out += '[/color]';
meta_dict['read_by_nfo'] = out2;
meta_dict['read_by_nfotemp'] = out;
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';




var out = 'Date:   [color=white]';
out2 = padding_right(' Date:',' ', 25);
meta_dict['date'] = (document.querySelector('.releaseDateLabel').innerHTML.replace("Release date:","").trim());
out += meta_dict['date'];
out2 += meta_dict['date'];
out += '[/color]';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';


try {
	var out = 'Series:   [color=white]';
	out2 = padding_right(' Series:',' ', 25);
	meta_dict['series'] = (document.querySelector('.seriesLabel').innerText.replace("Series:","").trim());
	out += meta_dict['series'];
	out2 += meta_dict['series'];
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';	
} catch (e) {
	meta_dict['series'] = 'N/A';
}

try {
	var out = 'Duration:   [color=white]';
	out2 = padding_right(' Duration:',' ', 25);
	meta_dict['series'] = (document.querySelector('.runtimeLabel').innerText.replace("Length:","").trim());
	out += meta_dict['duration'];
	out2 += meta_dict['duration'];
	out += '[/color]';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	iDiv.innerHTML += '<hr/><br/><textarea onclick="copy_clipboard(this)">' + out2 + '\n</textarea>';	
} catch (e) {
	meta_dict['duration'] = 'N/A';
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


meta_dict['instance_hash'] = generate_search_string(18);

nfo_post_template = `
[hide][code]    DON'T POST THIS PART

Subject:
{meta:author_plain} - {meta:title_filtered} ({meta:date_orig}) {meta:series_formatted}

Password:
{meta:rar_passwd}

Search String:
abook.ws - {meta:instance_hash}

POST BELOW THIS LINE [/code][/hide]

[table]
[tr]
[td][img width=350]{meta:imgur_url}[/img][/td]
[td]      [/td]
[td][b]General Information[/b]
===================
[size=9pt]Title:   [color=white]{meta:title}[/color]
Author:   [color=white]{meta:author}[/color]
Read By:   [color=white]{meta:read_by}[/color]
Date:   [color=white]{meta:date}[/color]
Publisher:   [color=white]{meta:publisher}[/color]
Series:   [color=white]{meta:series}[/color]

[b]File Information[/b]
================
File Type:   [color=white]MP3[/color]
Source Format:   [color=white]Audible[/color]
Number of Chapters:   [color=white]{meta:chapters}[/color]
Total Duration:   [color=white]{meta:duration_clean}[/color]
Total Size:   [color=white]{meta:total_size}[/color]
Encoded At:   [color=white]CBR 64 kbps, 22.05 kHz, JntStereo[/color][/size]
[/td]
[/tr]
[/table]

[b]Book Description[/b]
================
{meta:comment}


[color=yellow]Posted by proxy[/color]
[color=yellow]Posted by proxy for[/color] [url=https://kooba.pw/index.php?action=profile;u=][color=red]{meta:proxy_name}[/color][/url]


[hide]Search: [code]abook.ws - {meta:instance_hash}[/code][/hide]
[hide]Password: [code]{meta:rar_passwd}[/code][/hide]

[size=8pt][i]Note: These are not my rips. Many thanks to the original uploader(s).[/i][/size]
`;

nfo_template = `
 ÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛ
 Û     ±±   ²²²²²                     Û
 Û    ±  ±  ²    ²                    Û
 Û    ±  ±  ²    ²            ²   ²   Û
 Û    ±  ±  ²    ²            ²   ²   Û
 Û    ±  ±  ²²²²²  ²²²²² ²²²  ²  ²    Û
 Û   ±±±±±  ²    ² ²   ² ²  ² ²²² .ws Û
 Û   ±   ±  ²    ² ²   ² ²  ² ²  ²    Û
 Û  ±    ±  ²    ² ²²²²  ²²²² ²   ²   Û
 Û  ±    ±  ²²²²²             ²   ²   Û
 ÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛ

General Information
===================
`;
nfo_template += padding_right(' Title:',' ', 25) + '{meta:title}\n'
nfo_template += padding_right(' Author:',' ', 25) + '{meta:author}\n'
nfo_template += padding_right(' Read By:',' ', 25) + '{meta:read_by}\n'
nfo_template += padding_right(' Date:',' ', 25) + '{meta:date}\n'
nfo_template += padding_right(' Publisher:',' ', 25) + '{meta:publisher}\n'
nfo_template += padding_right(' Series:',' ', 25) + '{meta:series}\n'
nfo_template += `
File Information
================
`
nfo_template += padding_right(' File Type:',' ', 25) + 'MP3\n'
nfo_template += padding_right(' Source Format:',' ', 25) + 'Audible\n'
nfo_template += padding_right(' Number of Chapters:',' ', 25) + '{meta:chapters}\n'
nfo_template += padding_right(' Total Duration:',' ', 25) + '{meta:duration_clean}\n'
nfo_template += padding_right(' Total Size:',' ', 25) + '{meta:total_size}\n'
nfo_template += padding_right(' Encoded At:',' ', 25) + 'CBR 64 kbps, 22.05 kHz, JntStereo\n'

nfo_template += `
Book Description
================
{meta:comment}
`;




// nfo_post_template = nfo_post_template.replace(/{meta:imgur_url}/g,  meta_dict['title']);
nfo_post_template = nfo_post_template.replace(/{meta:title_filtered}/g,  meta_dict['title']);
nfo_post_template = nfo_post_template.replace(/{meta:date_orig}/g,  meta_dict['date']);
nfo_post_template = nfo_post_template.replace(/{meta:series_formatted}/g,  meta_dict['series']);
nfo_post_template = nfo_post_template.replace(/{meta:rar_passwd}/g, 'abook.ws_4you');
nfo_post_template = nfo_post_template.replace(/{meta:title}/g,  meta_dict['title']);
nfo_post_template = nfo_post_template.replace(/{meta:author}/g,  meta_dict['author_nfotemp']);
nfo_post_template = nfo_post_template.replace(/{meta:read_by}/g,  meta_dict['read_by_nfotemp']);
nfo_post_template = nfo_post_template.replace(/{meta:date}/g,  meta_dict['date']);
nfo_post_template = nfo_post_template.replace(/{meta:publisher}/g,  meta_dict['publisher']);
nfo_post_template = nfo_post_template.replace(/{meta:series}/g,  meta_dict['series']);
// nfo_post_template = nfo_post_template.replace(/{meta:chapters}/g,  meta_dict['']);
nfo_post_template = nfo_post_template.replace(/{meta:duration_clean}/g,  meta_dict['duration']);
// nfo_post_template = nfo_post_template.replace(/{meta:total_size}/g,  meta_dict['']);
nfo_post_template = nfo_post_template.replace(/{meta:instance_hash}/g, meta_dict['instance_hash']);
nfo_post_template = nfo_post_template.replace(/{meta:comment}/g, meta_dict['comment']);

iDiv.innerHTML += '<hr/><br/><textarea style="height: 300px;" onclick="copy_clipboard(this)">' + nfo_post_template + '\n</textarea>';


// nfo_post_template = nfo_post_template.replace(/{meta:imgur_url}/g,  meta_dict['title']);
nfo_template = nfo_template.replace(/{meta:title_filtered}/g,  meta_dict['title']);
nfo_template = nfo_template.replace(/{meta:date_orig}/g,  meta_dict['date']);
nfo_template = nfo_template.replace(/{meta:series_formatted}/g,  meta_dict['series']);
nfo_template = nfo_template.replace(/{meta:rar_passwd}/g, 'abook.ws_4you');
nfo_template = nfo_template.replace(/{meta:title}/g,  meta_dict['title']);
nfo_template = nfo_template.replace(/{meta:author}/g,  meta_dict['author_nfo']);
nfo_template = nfo_template.replace(/{meta:read_by}/g,  meta_dict['read_by_nfo']);
nfo_template = nfo_template.replace(/{meta:date}/g,  meta_dict['date']);
nfo_template = nfo_template.replace(/{meta:publisher}/g,  meta_dict['publisher']);
nfo_template = nfo_template.replace(/{meta:series}/g,  meta_dict['series']);
// nfo_template = nfo_template.replace(/{meta:chapters}/g,  meta_dict['']);
nfo_template = nfo_template.replace(/{meta:duration_clean}/g,  meta_dict['duration']);
// nfo_template = nfo_template.replace(/{meta:total_size}/g,  meta_dict['']);
nfo_template = nfo_template.replace(/{meta:instance_hash}/g, meta_dict['instance_hash']);
nfo_template = nfo_template.replace(/{meta:comment}/g, meta_dict['instance_hash']);

iDiv.innerHTML += '<hr/><br/><textarea style="height: 300px;" onclick="copy_clipboard(this)">' + nfo_template + '\n</textarea>';


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

if (window.location.href.indexOf(".co.uk") > -1) {
	//UK Version
	document.querySelector('.productPublisherSummary').parentElement.appendChild(iDiv);

	var meta_data = document.querySelector('.publisherLabel').parentElement.innerText;

	var meta_dict = {};

	var out = 'Author:   [color=white]';
	out2 = padding_right(' Author:',' ', 25);
	var item_data = /By:(.*)/.exec(meta_data)[1].split(',')
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
	var item_data = /Release date:(.*)/.exec(meta_data)[1]
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
	out +=  document.querySelector('.productPublisherSummary').innerText.replace("Publisher's summary", "").trim();
	iDiv.innerHTML += '<hr/><br/><textarea style="height: 300px;" onclick="copy_clipboard(this)">' + out + '\n</textarea>';
	meta_dict['description'] = out;

}



if (window.location.href.indexOf(".com.au") > -1) {



	//AU Version
	document.querySelector('#publisher-summary').parentElement.appendChild(iDiv);

	var meta_data = document.querySelector('.publisherLabel').parentElement.innerText;

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
}


document.getElementById('json_meta').value = '--AMETA-BEGIN--' + JSON.stringify(meta_dict) + '--AMETA-END--'
document.getElementById("a_meta_top").scrollIntoView();

