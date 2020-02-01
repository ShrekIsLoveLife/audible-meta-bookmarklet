
window['copy_clipboard'] = function copy_clipboard(obj) {
  obj.select();
  document.execCommand('copy');
  obj.blur();
  console.log(obj)

  var iDiv3 = document.createElement('div');
  iDiv3.className = 'copied_to_clipboard';
  iDiv3.style.border = '1px solid red';
  iDiv3.style.backgroundColor = 'red';
  iDiv3.style.color = 'yellow';
  iDiv3.style.textAlign = 'center';
  iDiv3.style.display = 'inline-block';
  iDiv3.style.position = 'absolute';
  // iDiv3.style.width = '600px';
  iDiv3.style.width = obj.offsetWidth + 'px';
  iDiv3.innerHTML = 'text copied to clipboard';
  obj.parentNode.insertBefore(iDiv3, obj);
  setTimeout(function() {
    var elements = document.getElementsByClassName('copied_to_clipboard');
    while(elements.length > 0){ elements[0].parentNode.removeChild(elements[0]); }
   }, 2000);
}


// http://jsfromhell.com/string/wordwrap
// maxLength, breakWith, cutType (0=not broken, 1=broken when needed, 2 broken past limit)
String.prototype.wordWrap = function(m, b, c){
    var i, j, l, s, r;
    if(m < 1)
        return this;
    for(i = -1, l = (r = this.split("\n")).length; ++i < l; r[i] += s)
        for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : ""))
            j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length
            || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
    for (var i = 0; i < r.length; i++) { r[i] = r[i].trim(); }
    return r.join("\n");
};


String.prototype.strip_html = function(){
  html = this.replace(/(\<\/p\>|\<\/div\>|\<br[^\>]*\>)/gi,"$1\n");
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent.trim() || "";
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


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = encodeURIComponent(name) + "=" + (encodeURIComponent(value) || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = encodeURIComponent(name)+'=; Max-Age=-99999999;';  
}


window['get_audible_data'] = function () {


  var meta_dict = {
    'title': '',
    'author': '',
    'read_by': '',
    'date': '',
    'series': '',
    'cover': '',
    'duration': '',
    'publisher': '',
    'description': '',
    'language': '',
    'genre': '',
    'instance_hash': '',
    'archive_pass': 'abook_4-&all',
  };


  var tmp = getCookie('get_meta-archive_pass');
  if ( tmp ) {
    meta_dict['archive_pass'] = tmp;
  }


  window['audible_json_data'] = [];
  try {
    window['audible_json_data'] = JSON.parse( document.querySelectorAll('script[type="application/ld+json"]')[1].innerText )[0];
  } catch (e) { }

  if ('description' in window['audible_json_data']) {
    console.log('JSON Version');

    var tmp = '';
    var item = '';
    audible_json_data = window['audible_json_data'];

    try {
      breadcrumb_json_data = JSON.parse( document.querySelectorAll('script[type="application/ld+json"]')[1].innerText )[1].itemListElement;
      tmp = [];
      for (var i = 1; i < breadcrumb_json_data.length; i++) { // starting on 1 to remove home
        tmp.push(breadcrumb_json_data[i]['item']['name']);
      }
      meta_dict['genre'] = tmp.join(', ');    
    } catch (e) { }


    item = 'name';
    if (item in audible_json_data) { 
      meta_dict['title'] = audible_json_data[item].strip_html();
    }


    item = 'datePublished';
    if (item in audible_json_data) { 
      meta_dict['date'] = audible_json_data[item].strip_html();
    }


    item = 'image';
    if (item in audible_json_data) { 
      meta_dict['cover'] = audible_json_data[item].strip_html();
    }


    item = 'inLanguage';
    if (item in audible_json_data) { 
      meta_dict['language'] = audible_json_data[item].strip_html();
    }


    item = 'publisher';
    if (item in audible_json_data) { 
      meta_dict[item] = audible_json_data[item].strip_html();
    }


    item = 'description';
    if (item in audible_json_data) { 
      meta_dict[item] = audible_json_data[item].strip_html();
    }


    item = 'duration';
    if (item in audible_json_data) { 
      meta_dict[item] = audible_json_data[item]
        .replace(/pt/i,'')
        .replace(/h/i,'hr ')
        .replace(/m/i,'min')
        .strip_html();
    }


    item = 'author';
    if (item in audible_json_data) { 
      tmp= [];
      for (var i = 0; i < audible_json_data[item].length; i++) {
        tmp.push(audible_json_data[item][i]['name'].strip_html());
      }
      meta_dict[item] = tmp.join(', ');
    }


    item = 'readBy';
    if (item in audible_json_data) { 
      tmp= [];
      for (var i = 0; i < audible_json_data[item].length; i++) {
        tmp.push(audible_json_data[item][i]['name'].strip_html());
      }
      meta_dict['read_by'] = tmp.join(', ');
    }


    item = 'series';
    if (item in audible_json_data) {
      // not exposed in json object, it's in search json, but adding anyway
      meta_dict[item] = audible_json_data[item].strip_html();
    } else {
      var meta_data = document.body.innerText;
      try {
        meta_dict[item] = /Series:(.*)/.exec(meta_data)[1].strip_html();
      } catch (e) {}

      if ( meta_dict[item] == '' ) {
        try {
            meta_dict[item] = /Serie:(.*)/.exec(meta_data)[1].strip_html();
        } catch (e) {}
      }


    }

    meta_dict['instance_hash'] = 'abook.link - ' + generate_search_string(18);
  }

  return meta_dict;
}


window['create_nfo'] = function (meta_dict) {

nfo_template = `
                  ▄▄▄▄▄▄▄▄▄
             ▄▄███████████████▄▄
           ▄████▀▀          ▀▀████▄
       ▐▄▄  ▀▀                  ▀▀  ▄▄▌
       ▐██████▄                ▄██████▌
       ▐█████████▄          ▄█████████▌
     ▌ ▐█████████████▄  ▄█████████████▌ ▐
    █▌  ▀████████████████████████████▀  ▐█
    ██▄▄  ▐█████████████████████████  ▄▄██
 ▄█ █████  ██████ abook.link ██████▌ █████  █▄
▐██▌█████  ████████████████████████▌ █████ ▐██▌
▐██▌█████  █████ ... for your █████▌ █████ ▐██▌
▐██▌█████  ██ listening pleasure ██▌ █████ ▐██▌
▐██▌█████  ████████████████████████▌ █████ ▐██▌
    ▐████  ████████████████████████▌ █████
         ▄██████████████████████████▄
          ▀████████████████████████▀
             ▀██████████████████▀
               ▀██████████████▀
                  ▀▀██████▀▀

General Information
===================
`;
nfo_template += padding_right(' Title:',' ', 25) + '{meta:title}\n'
nfo_template += padding_right(' Author:',' ', 25) + '{meta:author}\n'
nfo_template += padding_right(' Read By:',' ', 25) + '{meta:read_by}\n'
nfo_template += padding_right(' Date:',' ', 25) + '{meta:date}\n'
nfo_template += padding_right(' Publisher:',' ', 25) + '{meta:publisher}\n'
nfo_template += padding_right(' Genre:',' ', 25) + '{meta:genre}\n'
if (meta_dict['series'] != '') {
  nfo_template += padding_right(' Series:',' ', 25) + '{meta:series}\n'
}
nfo_template += `
File Information
================
`
nfo_template += padding_right(' File Type:',' ', 25) + 'MP3\n'
nfo_template += padding_right(' File Type:',' ', 25) + 'AAC/MP4\n'
nfo_template += padding_right(' Source Format:',' ', 25) + 'Audible\n'
nfo_template += padding_right(' Number of Chapters:',' ', 25) + '{meta:chapters}\n'
nfo_template += padding_right(' Total Duration:',' ', 25) + '{meta:duration_clean}\n'
nfo_template += padding_right(' Total Size:',' ', 25) + '{meta:total_size}\n'
nfo_template += padding_right(' Encoded At:',' ', 25) + 'MP3: 64 kbps, 22.05 kHz, Stereo\n'
nfo_template += padding_right(' Encoded At:',' ', 25) + 'Lossless Conversion AAC: 63 kbps, 22.05 kHz, Stereo\n'

nfo_template += `
Book Description
================
{meta:description}
`;



nfo_template = nfo_template.replace(/{meta:title}/g,  meta_dict['title']);
nfo_template = nfo_template.replace(/{meta:author}/g,  meta_dict['author']);
nfo_template = nfo_template.replace(/{meta:read_by}/g,  meta_dict['read_by']);
nfo_template = nfo_template.replace(/{meta:date}/g,  meta_dict['date']);
nfo_template = nfo_template.replace(/{meta:publisher}/g,  meta_dict['publisher']);
nfo_template = nfo_template.replace(/{meta:series}/g,  meta_dict['series']);
nfo_template = nfo_template.replace(/{meta:genre}/g,  meta_dict['genre']);
// nfo_template = nfo_template.replace(/{meta:chapters}/g,  meta_dict['']);
nfo_template = nfo_template.replace(/{meta:duration_clean}/g,  meta_dict['duration']);
// nfo_template = nfo_template.replace(/{meta:total_size}/g,  meta_dict['']);
nfo_template = nfo_template.replace(/{meta:description}/g, meta_dict['description'].wordWrap(65, "\n", 1));

return nfo_template;

}

window['create_post_template'] = function (meta_dict) {


nfo_post_template = `
[hide thanked=1][code]    DON'T POST THIS PART

Tabbed: (due to clipboard bug or std, tabs don't copy so just replace \\\\t with \\t)
{meta:author_plain}\\t{meta:title}\\t{meta:series}\\t{meta:date}\\t{meta:instance_hash}\\t{meta:archive_pass}

Subject:
{meta:language_upper}{meta:author_plain} - {meta:series} - {meta:title} ({meta:date_year})

Search String:
{meta:instance_hash}

Password:
{meta:archive_pass}


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
Genre:   [color=white]{meta:genre}[/color]`;

if (meta_dict['series'] != '') {
  nfo_post_template += `
Series:   [color=white]{meta:series}[/color]`;
}

nfo_post_template += `

[b]File Information[/b]
================
File Type:   [color=white]MP3[/color]
File Type:   [color=white]AAC/MP4[/color]
Source Format:   [color=white]Audible[/color]
Number of Chapters:   [color=white]{meta:chapters}[/color]
Total Duration:   [color=white]{meta:duration_clean}[/color]
Total Size:   [color=white]{meta:total_size}[/color]
Encoded At:   [color=white]MP3: 64 kbps, 22.05 kHz, Stereo[/color][/size]
Encoded At:   [color=white]Lossless Conversion
                   AAC: 63 kbps, 22.05 kHz, Stereo[/color][/size]
[/td]
[/tr]
[/table]

[b]Book Description[/b]
================
{meta:description}


[color=yellow]Posted by proxy[/color]
[color=yellow]Posted by proxy for[/color] [url=https://abook.link/book/index.php?action=profile;u=][color=red]{meta:proxy_name}[/color][/url]


[hide thanked=1]Search: [code]{meta:instance_hash}[/code]
Password: [code]{meta:archive_pass}[/code][/hide]

[size=8pt][i]Note: These are not my rips. Many thanks to the original uploader(s).[/i][/size]
`;

var authors = audible_meta['author'].split(', ');
var authors_linked = [];
for (var i = 0; i < authors.length; i++) {
  authors_linked.push('[url=http://www.audible.com/search?advsearchKeywords=' + authors[i] + ']' + authors[i] + '[/url]')
}
authors_linked = authors_linked.join(', ');

var read_bys = audible_meta['read_by'].split(', ');
var read_bys_linked = [];
for (var i = 0; i < read_bys.length; i++) {
  read_bys_linked.push('[url=http://www.audible.com/search?advsearchKeywords=' + read_bys[i] + ']' + read_bys[i] + '[/url]')
}
read_bys_linked = read_bys_linked.join(', ');


nfo_post_template = nfo_post_template.replace(/{meta:imgur_url}/g,  meta_dict['cover'].replace('media-amazon','   PLEASE UPLOAD TO IMGUR  '));
language_upper = meta_dict['language'].replace('english','').toUpperCase();
if (language_upper != '') { language_upper += ' '; }
nfo_post_template = nfo_post_template.replace(/{meta:language_upper}/g,  language_upper);
nfo_post_template = nfo_post_template.replace(/{meta:title}/g,  meta_dict['title']);
nfo_post_template = nfo_post_template.replace(/{meta:author}/g,  authors_linked);
nfo_post_template = nfo_post_template.replace(/{meta:author_plain}/g,  meta_dict['author']);
nfo_post_template = nfo_post_template.replace(/{meta:read_by}/g,  read_bys_linked);
nfo_post_template = nfo_post_template.replace(/{meta:date}/g,  meta_dict['date']);
nfo_post_template = nfo_post_template.replace(/{meta:date_year}/g,  meta_dict['date'].substring(0,4));
nfo_post_template = nfo_post_template.replace(/{meta:publisher}/g,  meta_dict['publisher']);
nfo_post_template = nfo_post_template.replace(/{meta:series}/g,  meta_dict['series']);
nfo_post_template = nfo_post_template.replace(/{meta:genre}/g,  meta_dict['genre']);
// nfo_post_template = nfo_post_template.replace(/{meta:chapters}/g,  meta_dict['']);
nfo_post_template = nfo_post_template.replace(/{meta:duration_clean}/g,  meta_dict['duration']);
nfo_post_template = nfo_post_template.replace(/{meta:instance_hash}/g,  meta_dict['instance_hash']);
nfo_post_template = nfo_post_template.replace(/{meta:archive_pass}/g,  meta_dict['archive_pass']);
// nfo_post_template = nfo_post_template.replace(/{meta:total_size}/g,  meta_dict['']);
nfo_post_template = nfo_post_template.replace(/{meta:description}/g, meta_dict['description']);


return nfo_post_template;
}

window['create_audible_meta_ui'] = function () {



var iDiv = document.createElement('div');
iDiv.id = 'audible_meta_data_container';
iDiv.className = 'audible_meta_data_containter';
iDiv.innerHTML = `<style>

  #audible_meta_data {
    border: 1px solid black;
    width: 750px;
    /*height: 300px;*/
    background-color: lightgrey;
    color: black;
    margin-left: auto;
    margin-right: auto;
  }

  .audible_meta_data .layout_title {
    /*font-weight: bold;*/
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
      font-size: 18px;
    text-align: center;
  }
  .audible_meta_data label {
    display: inline-block;
    width: 120px;
    text-align: right;
    font-weight: bold;
    padding-right: 10px;
    vertical-align: top;
  }
  .audible_meta_data input[type=text] {
    width: 600px;
  }

  .audible_meta_data textarea {
    left: 100px;
    width: 600px;
    height: 300px;
    vertical-align: top;
    overflow: scroll;
      white-space: pre-wrap;
  }


  .audible_meta_data textarea.meta_big {
    height: 500px;
  }

  #meta_additional_search {
  	height: 100px;
  }

  #meta_additional_search.meta_big {
    height: 500px;
  }

  .audible_meta_data ul.menu {
    font-weight: bold;
      list-style: none;
      padding: 0;
      margin-top: 5px;
      text-align: center;
      border-bottom: 1px dashed;
  }

  .audible_meta_data ul.menu li {
      display: inline;
      border: 1px solid;
      border-bottom: 0;
      margin: 0 15px 0 0;
      padding: 0px 10px;
      cursor: cell;
  }

  .audible_meta_data ul.menu li.selected {
      padding-bottom: 1px; 
      background: darkgrey;
  }

  #meta_nfo {
    font-family: 'Courier New'; 
    font-size: 0.9em; 
    line-height: 1.2em;
    white-space: pre-wrap;
  }

  #meta_template {
    white-space: pre-wrap;
  }

  .copy_save_buttons {
    text-align: right;
    font-style: italic;
    padding-right: 35px;
    font-weight: bold;
  }
  .copy_save_buttons span:hover {
  	color: #494dd0;
  }

  #view_searches a {
    font-size: 20px;
    border: 1px solid black;
    background-color: #c1c5c5;
    font-weight: bold;
    margin: 10px;
    display: inline-block;
    padding: 10px;
    text-decoration: none;
    min-width: 300px;
    text-align: center;
    margin-left: 214px;
    color: red;
  }

  #view_searches a:hover {
    background-color: #bde6e6;
  }

  #apply_searches {
    font-size: 14px;
    border: 1px solid black;
    background-color: #e8ecec;
    font-weight: bold;
    margin: 0px;
    display: inline-block;
    padding: 3px;
    text-decoration: none;
    min-width: 200px;
    text-align: center;
    margin-left: 519px;
    color: red;
  }

  #apply_searches:hover {
    background-color: #bde6e6;
  }



</style>

<div id="audible_meta_data" class="audible_meta_data">
<div class="layout_title" >Audible Meta Data</div>

<ul class="menu">
  <li class="selected">Edit</li>
  <li>Meta</li>
  <li>Nfo</li>
  <li>Template</li>
  <li>Searches</li>
</ul>


<div id="view_edit">
<p><label for="meta_cover">Cover Img: </label><input type='text' id="meta_cover" placeholder='cover ...'></p>

<p><label for="meta_genre">Genre: </label><input type='text' id="meta_genre" placeholder='genre ...'></p>

<p><label for="meta_title">Title: </label><input type='text' id="meta_title" placeholder='title ...'></p>

<p><label for="meta_series">Series: </label><input type='text' id="meta_series" placeholder='series ...'></p>

<p><label for="meta_author">Author: </label><input type='text' id="meta_author" placeholder='author (comma space separated) ...'></p>

<p><label for="meta_readby">Read by: </label><input type='text' id="meta_readby" placeholder='read by (comma space separated) ...'></p>

<p><label for="meta_date">Date: </label><input type='text' id="meta_date" placeholder='date yyyy-mm-dd...'></p>

<p><label for="meta_duration">Duration: </label><input type='text' id="meta_duration" placeholder='duration ...'></p>

<p><label for="meta_publisher">Publisher: </label><input type='text' id="meta_publisher" placeholder='publisher ...'></p>

<p><label for="meta_language">Language: </label><input type='text' id="meta_language" placeholder='language ...'></p>

<p><label for="meta_search_string">Search String: </label><input type='text' id="meta_search_string" placeholder='search string ...'></p>

<p><label for="meta_archive_pass">Archive Pass: </label><input type='text' id="meta_archive_pass" placeholder='archive pass ...'></p>

<p><label for="meta_description">Description: </label><textarea  id="meta_description" placeholder='description ...'></textarea></p>

</div>




<div id="view_meta">
<div class="copy_save_buttons"><span id="copy_meta_json">Copy to clipboard</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="save_meta_json">Save File</span></div>
<p><label for="meta_json">Meta string: </label><textarea  id="meta_json" class="meta_big" placeholder='meta string ...'></textarea></p>
</div>




<div id="view_nfo">
<div class="copy_save_buttons"><span id="copy_meta_nfo">Copy to clipboard</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="save_meta_nfo">Save File</span></div>
<p><label for="meta_nfo">Nfo: </label><textarea id="meta_nfo" class="meta_big" placeholder='nfo ...'></textarea></p>
</div>





<div id="view_template">
<div class="copy_save_buttons"><span id="copy_meta_template">Copy to clipboard</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="save_meta_template">Save File</span></div>
<p><label for="meta_template">Post Template: </label><textarea  id="meta_template" class="meta_big" placeholder='post template ...'></textarea></p>
</div>


<div id="view_searches">
  <br/>
  <div id="custom_searches">
  </div>
  <br/><br/>

<p><label for="meta_additional_search"><span id="custom_searches_label">Edit Searches: </span></label><textarea id="meta_additional_search" placeholder='
JSON object of search links you want.

Example:
{
	"RB Digital": "https://rbdigital.com/search/eaudio?all={meta:title} {meta:author}", 
	"Scribd": "https://www.scribd.com/search?content_type=audiobooks&page=1&language=1&query= {meta:author}"
}

To use a " in your URLs use %22, don't escape them with backslash.

You can use any variable in the URL
{meta:cover}
{meta:genre}
{meta:title}
{meta:series}
{meta:author}
{meta:read_by}
{meta:date}
{meta:duration}
{meta:publisher}
{meta:language}
{meta:language}
{meta:description}
{meta:instance_hash}
{meta:archive_pass}
 '></textarea>

<div id="apply_searches">Apply Custom Search</div>

</p>
  <br/>

</div>





</div>
`;

document.body.insertBefore(iDiv, document.body.firstChild);

document.querySelectorAll(".audible_meta_data ul.menu li").forEach((ele) => {
  ele.addEventListener('click', () => {
    document.querySelectorAll(".audible_meta_data ul.menu li").forEach((ele2) => {
      ele2.classList.remove('selected');
    });
    ele.classList.add('selected');
    console.log(ele);
    clicked = ele.textContent.toLocaleLowerCase();

    document.getElementById('view_edit').style.display = 'none';
    document.getElementById('view_meta').style.display = 'none';
    document.getElementById('view_nfo').style.display = 'none';
    document.getElementById('view_template').style.display = 'none';
    document.getElementById('view_searches').style.display = 'none';



    if (clicked == 'edit') { 
      document.getElementById('view_edit').style.display = 'block';
    } else {
      window['audible_meta']['cover'] = document.getElementById('meta_cover').value.trim();
      window['audible_meta']['genre'] = document.getElementById('meta_genre').value.trim();
      window['audible_meta']['title'] = document.getElementById('meta_title').value.trim();
      window['audible_meta']['series'] = document.getElementById('meta_series').value.trim();
      window['audible_meta']['author'] = document.getElementById('meta_author').value.trim();
      window['audible_meta']['read_by'] = document.getElementById('meta_readby').value.trim();
      window['audible_meta']['date'] = document.getElementById('meta_date').value.trim();
      window['audible_meta']['duration'] = document.getElementById('meta_duration').value.trim();
      window['audible_meta']['publisher'] = document.getElementById('meta_publisher').value.trim();
      window['audible_meta']['language'] = document.getElementById('meta_language').value.trim();
      window['audible_meta']['language'] = document.getElementById('meta_language').value.trim();
      window['audible_meta']['description'] = document.getElementById('meta_description').value.trim();
      window['audible_meta']['instance_hash'] = document.getElementById('meta_search_string').value.trim();
      window['audible_meta']['archive_pass'] = document.getElementById('meta_archive_pass').value.trim();
      setCookie('get_meta-archive_pass',window['audible_meta']['archive_pass'], 365);

    }
    if (clicked == 'meta') { 
      window['audible_meta']['author'] = window['audible_meta']['author'].split(', ');
      window['audible_meta']['read_by'] = window['audible_meta']['read_by'].split(', ');
      document.getElementById('meta_json').value = '--AMETA-BEGIN--' + JSON.stringify(window['audible_meta']) + '--AMETA-END--'

      document.getElementById('view_meta').style.display = 'block';
    }
    if (clicked == 'nfo') { 
      document.getElementById('meta_nfo').value = create_nfo(window['audible_meta']);
      document.getElementById('view_nfo').style.display = 'block';
    }
    if (clicked == 'template') { 
      document.getElementById('meta_template').value = create_post_template(window['audible_meta']);
      document.getElementById('view_template').style.display = 'block';
    }
    if (clicked == 'searches') { 

      // var book_query = window['audible_meta']['title'].replace('&', ' ') + ' ' + window['audible_meta']['author'].replace(', ', ' ');

      // document.getElementById('link_goodreads').href = 'https://www.goodreads.com/search?utf8=%E2%9C%93&search_type=books&q=' + book_query;

      // document.getElementById('link_fantastic_fiction').href = 'https://www.fantasticfiction.com/search/?searchfor=book&keywords=' + book_query;

      // document.getElementById('link_nzbindex').href = 'https://nzbindex.com/search/?q=' + window['audible_meta']['instance_hash'];
      // document.getElementById('link_binsearch').href = 'https://www.binsearch.info/?max=250&adv_age=&server=2&q=' + window['audible_meta']['instance_hash'];
      // document.getElementById('link_nzbking').href = 'https://www.nzbking.com/search/?ft=&gr=&po=&so=&q="' + window['audible_meta']['instance_hash'] + '"';


	  var tmp = getCookie('get_meta-custom_searches');
	  if ( tmp ) {
	    document.getElementById('meta_additional_search').value = tmp;
	  } else {
	  	document.getElementById('meta_additional_search').value = '';
	  }
	  apply_searches();

      document.getElementById('view_searches').style.display = 'block';
    }

  });
});


document.querySelectorAll(".audible_meta_data ul.menu li").forEach((ele2) => {
  ele2.classList.remove('selected');
});
document.querySelectorAll(".audible_meta_data ul.menu li")[0].classList.add('selected');

document.getElementById('view_edit').style.display = 'block';
document.getElementById('view_meta').style.display = 'none';
document.getElementById('view_nfo').style.display = 'none';
document.getElementById('view_template').style.display = 'none';
document.getElementById('view_searches').style.display = 'none';

}


function run_bookmarklet() {
  window['audible_meta'] = get_audible_data();

  create_audible_meta_ui();

  document.getElementById('meta_cover').value = window['audible_meta']['cover'];
  document.getElementById('meta_genre').value = window['audible_meta']['genre'];
  document.getElementById('meta_title').value = window['audible_meta']['title'];
  document.getElementById('meta_series').value = window['audible_meta']['series'];
  document.getElementById('meta_author').value = window['audible_meta']['author'];
  document.getElementById('meta_readby').value = window['audible_meta']['read_by'];
  document.getElementById('meta_date').value = window['audible_meta']['date'];
  document.getElementById('meta_duration').value = window['audible_meta']['duration'];
  document.getElementById('meta_publisher').value = window['audible_meta']['publisher'];
  document.getElementById('meta_language').value = window['audible_meta']['language'];
  document.getElementById('meta_search_string').value = window['audible_meta']['instance_hash'];
  document.getElementById('meta_archive_pass').value = window['audible_meta']['archive_pass'];
  document.getElementById('meta_language').value = window['audible_meta']['language'];
  document.getElementById('meta_description').value = window['audible_meta']['description'];


  document.getElementById('copy_meta_json').addEventListener('click', () => { 
    copy_clipboard(document.getElementById('meta_json'));
  });

  document.getElementById('copy_meta_nfo').addEventListener('click', () => { 
    copy_clipboard(document.getElementById('meta_nfo'));
  });

  document.getElementById('copy_meta_template').addEventListener('click', () => { 
    copy_clipboard(document.getElementById('meta_template'));
  });

  document.getElementById('save_meta_json').addEventListener('click', () => { 
    var filename = window['audible_meta']['author'] + ' - ' + window['audible_meta']['series'] +
	     ' (' + window['audible_meta']['date'] + ') ' + window['audible_meta']['title'] + '.adata.txt';
    save_file(filename, document.getElementById('meta_json').value);
  });

  document.getElementById('save_meta_nfo').addEventListener('click', () => { 
    var filename = window['audible_meta']['author'] + ' - ' + window['audible_meta']['series'] +
	     ' (' + window['audible_meta']['date'] + ') ' + window['audible_meta']['title'] + '.nfo';
    save_file(filename, document.getElementById('meta_nfo').value);
  });

  document.getElementById('save_meta_template').addEventListener('click', () => { 
    var filename = window['audible_meta']['author'] + ' - ' + window['audible_meta']['series'] +
	     ' (' + window['audible_meta']['date'] + ') ' + window['audible_meta']['title'] + '.template.txt';
    save_file(filename, document.getElementById('meta_template').value);
  });


  document.getElementById('custom_searches_label').addEventListener('click', () => { 
    if ( document.getElementById('meta_additional_search').classList.contains('meta_big') ) {
    	document.getElementById('meta_additional_search').classList.remove('meta_big');
    } else {
    	document.getElementById('meta_additional_search').classList.add('meta_big');
    }
  });


  document.getElementById('apply_searches').addEventListener('click', () => { 
  	if (apply_searches() == false) {
  		alert('Error applying search, maybe you have an invalid json format');
  	}
  });

	document.getElementById('audible_meta_data_container').scrollIntoView();
}

window['save_file'] = function (filename, data) {
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(new Blob([data], { type: "unknown/unknown" }));
    a.setAttribute("download", filename);
    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}

window['apply_searches'] = function () {
	var meta_additional_search = document.getElementById('meta_additional_search').value;
	if ( meta_additional_search.trim() == '' ) {
		meta_additional_search = `
{
	"Goodreads": "https://www.goodreads.com/search?utf8=%E2%9C%93&search_type=books&q={meta:title} {meta:author}", 
	"Fantastic Fiction": "https://www.fantasticfiction.com/search/?searchfor=book&keywords={meta:title} {meta:author}", 
	"NZBIndex": "https://nzbindex.com/search/?q={meta:instance_hash}", 
	"Binsearch": "https://www.binsearch.info/?max=250&adv_age=&server=2&q={meta:instance_hash}", 
	"NZBKing": "https://www.nzbking.com/search/?ft=&gr=&po=&so=&q=%22{meta:instance_hash}%22", 
	"RB Digital": "https://rbdigital.com/search/eaudio?all={meta:title} {meta:author}", 
	"Scribd": "https://www.scribd.com/search?content_type=audiobooks&page=1&language=1&query={meta:title} {meta:author}",
	"Abook": "https://abook.link/book/tools/search_abook.php?search={meta:title} {meta:author}"
}
		`;
		document.getElementById('meta_additional_search').value = meta_additional_search;
	}

	try {
		search_obj = JSON.parse( meta_additional_search );
		search_str = '';
		for (var key in search_obj) {
			var search_url = search_obj[key];
			search_url = search_url.replace(/{meta:cover}/gi, window['audible_meta']['cover']);
			search_url = search_url.replace(/{meta:genre}/gi, window['audible_meta']['genre'].replace(', ', ' '));
			search_url = search_url.replace(/{meta:title}/gi, window['audible_meta']['title'].replace('&', ' '));
			search_url = search_url.replace(/{meta:series}/gi, window['audible_meta']['series'].replace('&', ' '));
			search_url = search_url.replace(/{meta:author}/gi, window['audible_meta']['author'].replace(', ', ' '));
			search_url = search_url.replace(/{meta:read_by}/gi, window['audible_meta']['read_by'].replace(', ', ' '));
			search_url = search_url.replace(/{meta:date}/gi, window['audible_meta']['date']);
			search_url = search_url.replace(/{meta:duration}/gi, window['audible_meta']['duration']);
			search_url = search_url.replace(/{meta:publisher}/gi, window['audible_meta']['publisher']);
			search_url = search_url.replace(/{meta:language}/gi, window['audible_meta']['language']);
			search_url = search_url.replace(/{meta:description}/gi, window['audible_meta']['description']);
			search_url = search_url.replace(/{meta:instance_hash}/gi, window['audible_meta']['instance_hash']);
			search_url = search_url.replace(/{meta:archive_pass}/gi, window['audible_meta']['archive_pass']);
			search_str += '<a href="'+ search_url +'" target="_blank">' + key + '</a><br/>';
		}
		document.getElementById('custom_searches').innerHTML = search_str;
        setCookie('get_meta-custom_searches',meta_additional_search, 365);
		return true;
	} catch (e) {
		return false;
	}
};


if (document.getElementById('audible_meta_data_container')) {
  document.getElementById('audible_meta_data_container').scrollIntoView();
  alert('Bookmarkelt is already loaded');
} else {
  if ( window.location.href.search(/audible\./gi) > 0 ) {
    run_bookmarklet();
  } else {
    alert('This bookmarklet is only meant to be run on Audible pages.');
  }
}