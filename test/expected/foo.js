var engine, tmpl = function (Y, $e, data) {
var $b='', $v=function (v){return v || v === 0 ? v : $b;}, $t='\n<div class=\'u-nav-global\'><div class=\'u-nav-global-nav\'><ul>\n';
 Y.Array.each(data.links, function (item, index) { 
$t+='\n<li><a ';
 if (item.active) { 
$t+='class=\'u-nav-global-active\'';
 } 
$t+=' href="http://'+
$e($v( item.url ))+
'">'+
$e($v( item.title ))+
'</a></li>\n';
 if (data.length && ( index === data.length )) { 
$t+='<li class="u-nav-global-more"><a href="#more">More<i>›</i></a><ul>';
 } 
$t+='\n';
 }); 
$t+='\n</ul></ul></div></div>\n';
return $t;
};
engine = Y.Template.Micro;
Y.Template.register("global-nav", engine.revive(tmpl));



