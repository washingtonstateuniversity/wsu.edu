(function($){
	window.wsu_analytics.wsuglobal.events   = jQuery.merge( window.wsu_analytics.wsuglobal.events , [] );
	window.wsu_analytics.app.events   = jQuery.merge( window.wsu_analytics.app.events , [] );
	window.wsu_analytics.site.events   = jQuery.merge( window.wsu_analytics.site.events , [
		{
			element:"a[href*='wsu.edu']:not([href*='//wsu.edu']), .track.internal",
			options:{
				skip_internal:"true",
				mode:"event,_link",
				category:"internal",
				overwrites:"true"
			}
		},
		{ // only because on the all but //wsu.edu rule we un did the defaults 
			element:"a[href*='zzusis.wsu.edu'],\
					 a[href*='portal.wsu.edu'],\
					 a[href*='applyweb.com/public/inquiry'],\
					 a[href*='www.mme.wsu.edu/people/faculty/faculty.html'],\
					 a[href*='puyallup.wsu.edu'],\
					 .track.internal.query_intolerant",
			options:{
				skip_internal:"true",
				overwrites:"true",
				mode:"event",
				category:"internal-query-intolerant"

			}
		},
		{
			element:"a[href*='tinyurl.com'],\
					 a[href*='ptwc.weather.gov'],\
					 a[href*='www.atmos.washington.edu'],\
					 .track.outbound.query_intolerant",
			options:{
				skip_internal:"true",
				overwrites:"true",
				mode:"event",
				category:"outbound-query-intolerant"

			}
		},
		//header ui items
		{
			element:".home-headline-nav li",
			options:{
				mode:"event",
				category:"ui elements",
				action:"switches",
				label:function(ele){
					return $(ele).find('.home-headline-nav-headline').text() + " " + $(ele).find('.home-headline-nav-date').text();
				},
				overwrites:"true"
			}
		},
		{
			element:".search-label",
			options:{
				mode:"event",
				category:"ui elements",
				action:"opens",
				label:"search",
				overwrites:"true"
			}
		},
		{
			element:".top-level-links-label",
			options:{
				mode:"event",
				category:"ui elements",
				action:"opens",
				label:"wsu location",
				overwrites:"true"
			}
		},
		{
			element:"#mega-menu-labels a",
			options:{
				mode:"event",
				category:"mega menu",
				action:function(ele){
					return $(".header-drawer-wrapper").is($('.header-drawer-wrapper-open')) ?"opening":"closing");
				},	
				label:"lable used",
				overwrites:"true"
			}
		},
		{
			element:".close-header-drawer",
			options:{
				mode:"event",
				category:"mega menu",
				action:"closing",
				label:"",
				overwrites:"true"
			}
		},
		//map interactions
		{
			element:"[src*='public/coug_marker.castle'],[src*='public/markerSVG.castle']",
			options:{
				mode:"event",
				eventTracked:"mouseover",
				category:"map interaction",
				action:"marker",
				label:"hover",
				overwrites:"true"
			}
		},
		{
			element:"[src*='public/coug_marker.castle'],[src*='public/markerSVG.castle']",
			options:{
				mode:"event",
				eventTracked:"mousedown",
				category:"map interaction",
				action:"marker",
				label:"open info window",
				overwrites:"true"
			}
		},
		{
			element:".infoClose",
			options:{
				mode:"event",
				eventTracked:"mousedown",
				category:"map interaction",
				action:"marker",
				label:"close info window",
				overwrites:"true"
			}
		},
	]);
})(jQuery);
