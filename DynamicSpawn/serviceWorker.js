"use strict";
const v='d0';

addEventListener('install',event=>{
	event.waitUntil(
		caches.open(v).then(cache=>
			cache.addAll([
					'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
					'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js',
					'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js',
					'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
				'/',
				'/css/',
					'/css/animation.css',
					'/css/aside.css',
					'/css/col.css',
					'/css/core.css',
					'/css/dark.css',
					'/css/input.css',
					'/css/media.css',
					'/css/techScrollBar.css',
					'/css/w3.css',
				'/html/',
					'/html/aside.html',
					'/html/asideInt.js',
				'/img/',
					'/img/exe.svg',
					'/img/icon.png',
					'/img/icon.svg',
					'/img/iconAlt.svg',
					'/img/tab_apex.png',
					'/img/tab_apex_select.png',
					'/img/tab_avian.png',
					'/img/tab_avian_select.png',
					'/img/tab_floran.png',
					'/img/tab_floran_select.png',
					'/img/tab_glitch.png',
					'/img/tab_glitch_select.png',
					'/img/tab_human.png',
					'/img/tab_human_select.png',
					'/img/tab_hylotl.png',
					'/img/tab_hylotl_select.png',
					'/img/tab_kazdra.png',
					'/img/tab_kazdra_select.png',
					'/img/tab_other.png',
					'/img/tab_other_select.png',
				'/js/',
					'/js/custom.js',
					'/js/db.js',
					'/js/globalIo.js',
					'/js/io.js',
					'/js/load.js',
					'/js/nav.js',
					'/js/node.js',
					'/js/search.js',
					'/js/species.js',
					'/js/speciesList.js',
					'/js/tour.js',
					'/js/util.js',
				'/webWorker/',
					'/webWorker/nav.js',
					'/webWorker/search.js',
				'/xml/',
					'/xml/html.xsl',
					'/xml/species.xml',
					'/xml/tab.xml',
					'/xml/template.xsl',
					'/xml/verify.xml',
				'/serviceWorker.js',
				'/index.xml'
			]);
		)
	);
});

addEventListener('fetch',event=>{
	var req=event.request;
	event.respondWith(
		caches.match(req).then(resp=>
			resp||fetch(req).then(resp=>
				caches.open(v).then(cache=>{
					cache.put(req,resp.clone());
					return resp;
				});
			).catch(()=>caches.match('/img/tab_other.png'));
		)
	);
});

addEventListener('activate',event=>{
	event.waitUntil(
		caches.keys().then(keyList=>
			Promise.all(keyList.map(key=>{
				if(key!==v)return caches.delete(key);
			}));
		)
	);
});
/*
function folder(f){
	f=`/${f}/`;
	var arr=[f],
	_a=arguments.length;
	for(let i=1;i<_a;i++)arr[i]=f+arguments[i];
	return arr;
}*/