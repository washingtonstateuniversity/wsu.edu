var map_view =  {
	inview:true,
	siteroot : 'https://beta.maps.wsu.edu/',
	view_id : window.map_view_id ||"WSU_MAPS_NS",
	map_view_scripts_block : window.map_view_scripts_block || false,
	view : 'public/',
	error_reporting : false,
	campus : 'Pullman',
	url : '/', 	campus_latlng_str : '46.73090,-117.16101',
	pos : {
		"center" : "47.3500973611119,-120.900198462495"
	},
	embeded_place_ids : "  601, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664",
	embeded_shape_ids : " ",
	show_global_nav :  false, 	running_options : '{"mapTypeId":"ROADMAP","zoom":7,"backgroundColor":"#ffffff","disableDefaultUI":true,"draggable":false,"keyboardShortcuts":true,"mapMaker":false,"noClear":true,"mapTypeControl":true,"overviewMapControl":true,"panControl":true,"rotateControl":true,"scaleControl":true,"streetViewControl":true,"zoomControl":true,"scrollwheel":false}',
	fit_to_bound : 'WA, USA',
};

var map_scripts = [];
//map_scripts.push('http://www.google.com/uds/api?file=uds.js&v=1.0');

map_scripts.push('//beta.maps.wsu.edu/content/dis/js/maps.wsu.edu.js');

if( map_view.map_view_scripts_block === false ){
	if ( !window.jQuery ) {
		map_scripts.push('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
	}
	if ( !window.jQuery.ui ) {
		map_scripts.push('//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js');
	}
	map_scripts.push('//ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css');
	map_scripts.push('//beta.maps.wsu.edu/content/dis/css/map.view.styles.css');
}


(function(i,s,o,g,r,t,a,m){
	t = document.scripts[document.scripts.length - 1];
	m = document.getElementById(r);
	if(m===null){
		a = document.createElement('div');
		a.setAttribute( "style", "width:100%;padding-top:66%;min-height: 0px;" );
		a.setAttribute( "class", "WSU_MAPS_NS" );
		a.id=r;
		t.parentNode.insertBefore(a,t.nextSibling);
	}
	a=s.createElement(o);
	a.async=0;
	a.src='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&sensor=false&callback=startEmbeded';
	t.parentNode.insertBefore(a,t);
	i.startEmbeded = function(){
		s.onreadystatechange = function () {
			if (s.readyState == "complete") {
				var base = {"mapTypeId":google.maps.MapTypeId.ROADMAP};
				for (j = 0; j < g.length; j++) {
					if(g[j].indexOf('.js')>-1){
						a=s.createElement(o);
						a.async=1;
						a.src=g[j];
					}else{
						a=s.createElement("link");
						a.setAttribute("rel", "stylesheet");
						a.setAttribute("type", "text/css");
						a.setAttribute("href", g[j]);
					}
					t.parentNode.insertBefore(a,t);
				}
			}
		}
	};
})(window,document,'script',map_scripts,"WSU_MAPS_NS");