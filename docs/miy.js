/* Miy.js (zantei)  */
/* commiter: weepjp */

//Checkbox-Quotebox  (てきとーな名前すぎ)
//ある項目のチェックボックスを有効/無効にすると
//CSSコピペボックス内でその項目が有効/無効を
//リアルタイムで実施するやつです。
//これにより、静的ページ上でCSSコピペが実現できましたと。

function chq( obj,id ) {
  if( !obj.checked ){
   document.getElementById(id).style.display = "none";
  }
  else {
   document.getElementById(id).style.display = "inline";
  }
}

//MiyonTicker.json を読み込みながら
//リスト化して Checkbox-Quotebox を雑に練り込む
$(document).ready(function () {
    $.getJSON("MiyonTicker.json", function(set){
        var flag = 1; //1 から開始される加算(項目件数用)
        var last = set.instances[set.instances.length-1];
        
        for( var i in set.instances ){
            if(!set.instances[i].exit){//廃止日時(exit)のある項目はリスト化しません。
                if(!set.instances[i].text){//表示テキスト(text)が空の場合は host を表示させます。
                    itext = set.instances[i].host;
                }else{
                    itext = set.instances[i].text;
                }
                
                icon = set.typep[0] + "" + set.instances[i].sns + ".webp?"; //デフォルトアイコンパス
                if(!set.instances[i].ico){ //アイコン設定がない場合はデフォルトアイコンを表示させます。
                    iico = icon;
                }else{
                    iico = set.typep[1] + "" + set.instances[i].ico + ".webp?"; //アイコン設定ある場合のパス
                }
                
                isns = set.instances[i].sns; //ソフトウェア番号を isns に
                isnst = set.softwares[isns].stext; //ソフトウェアの表示名
                
                if(!set.instances[i].tcolor){ //表示名色
                    itc = set.softwares[isns].stbcolor;
                }else{
                    itc = set.instances[i].tcolor;
                }
                
                if(!set.instances[i].bcolor){ //表示名背景色
                    ibc = set.softwares[isns].sbcolor;
                }else{
                    ibc = set.instances[i].bcolor;
                }
                
                if(!set.instances[i].scolor){ //表示名影色
                    isc = set.softwares[isns].ssbcolor;
                }else{
                    isc = set.instances[i].scolor;
                }
                
                
                
                $("#instances").append("<tr><td><input type='checkbox' id='c" + set.instances[i].xid + "' checked='checked' onclick=chq(this,'a" + set.instances[i].xid + "')></input></td><td> " + set.instances[i].xid + " </td><td><img src='" + icon + "' title='" + isnst + "'></td><td style='width:240px!important;background:linear-gradient(90deg," + ibc + ",transparent);text-shadow:" + isc + " 1px 1px," + isc + " -1px 1px," + isc + " 1px -1px," + isc + " -1px -1px;font-weight:bolder;color:" + itc + ";'><img src='" + iico + "'>&nbsp;" + itext + "</td></tr>");
                
                
                
                if(flag == 1){ // 出だしには CSS の最初の部分入れる予定。
                     $("#ccss").append("<span>@charset 'utf-8';<br /></span>");
                     $("#ccss").append("<span>/*** #MiyonTicker (Type-beta) ***/<br /></span>");
                     $("#ccss").append("<span>/*** (C)2018-2020 MiyonMiyon, Released under the MIT license. ***/<br /></span>");
                     $("#ccss").append("<span>/*** Based on the original custom.css by (C)2018 kyori19, (C)2019 yi0713, ***/<br /></span>");
                     $("#ccss").append("<span>:root{ --a:.4!important; --e:ellipsis!important; --p:pre!important; --b:block!important;  --i:inline!important; --h:20px!important; --w:240px!important; }<br /></span>");
                }
/*

 .status a[href^='https://itabashi.0j0.jp/'] .display-name::after{width:var(--w);height:var(--h);display:var(--b);white-space:var(--p);text-overflow:var(--e);background:no-repeat url('https://miy.pw/12/4.webp');}

 .status__display-name[href^='https://itabashi.0j0.jp/'].muted::after, .notification__display-name[href^='https://itabashi.0j0.jp/']::after {width:var(--w);height:var(--h);display:var(--i);white-space:var(--p);text-overflow:var(--e);background:no-repeat url('https://miy.pw/12/4.webp');opacity:var(--a);} 


*/
                
                $("#ccss").append("<span id='a" + set.instances[i].xid + "'> .status a[href^='https://" + set.instances[i].host + "/'] .display-name::after{width:var(--w);height:var(--h);display:var(--b);white-space:var(--p);text-overflow:var(--e);background:no-repeat url('https://miy.one/g/" + set.instances[i].xid + ".svg?2');} .status__display-name[href^='https://" + set.instances[i].host + "/'].muted::after, .notification__display-name[href^='https://" + set.instances[i].host + "/']::after {width:var(--w);height:var(--h);display:var(--i);white-space:var(--p);text-overflow:var(--e);background:no-repeat url('https://miy.one/g/" + set.instances[i].xid + ".svg?2');opacity:var(--a);}<br /></span>");
                
                
                
                flag++; // 加算していくよん。
                
                if(flag > 1005){ // とりあえず、1000項目ほど回したらロード画面表示をやめる感じにする。
                   var loading = document.getElementById('loading');
                   var contents = document.getElementById('contents');
                   
                   loading.style.display = 'none';
                   contents.classList.remove('hidden');
                }
            }
        }
        
        $("#ccss").append("<span>/* Miyon-Miyon! */<br /></span>");
        
        $("#output").append("<tr><td><a href='" + set.repository + "' target='_blank'>" + set.title + "</a></td></tr>");
        $("#output").append("<tr><td><a href='MiyonTicker.json' target='_blank'>MiyonTicker.json</a></td></tr>");
        $("#output").append("<tr><td>Ver." + set.version + "</td></tr>");
        $("#output").append("<tr><td>Displayable name " + flag + " Instances</td></tr>");
        $("#output").append("<tr><td>" + set.copyright +"</td></tr>");
        $("#output").append("<tr><td>" + set.licence + "</td></tr>");
        $("#output").append("<tr><td>(c)2019 Based on the original css by <a href='https://odakyu.app/about' target='_blank'>Odakyu.app</a></td></tr>");
        $("#output").append("<tr><td>(c)2020 Based on the original css by <a href='https://kurage.cc/about' target='_blank'>Kurage.cc</a></td></tr>");
        
    
    });



});
