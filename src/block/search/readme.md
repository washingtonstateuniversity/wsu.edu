# Search interface for WSU home page and feature pages

This search block is used inside the site header mega block.

```
<!-- Search interface, hidden by default until interaction in header -->
<div class="header-search-wrapper">
	<section class="side-right row" id="search-modal">
		<div class="column one">
			<div class="header-search-input-wrapper">
				<form method="get" action="https://search.wsu.edu/Default.aspx">
					<input name="cx" value="002970099942160159670:yqxxz06m1b0" type="hidden">
					<input name="cof" value="FORID:11" type="hidden">
					<input name="sa" value="Search" type="hidden">
					<label for="header-search">Search</label>
					<input type="text" value="" name="q" placeholder="Search" class="header-search-input">
				</form>
			</div>
			<div class="header-search-a-z-wrapper">
				<span class="search-a-z">
					<a href="http://index.wsu.edu/">A-Z Index</a>
				</span>
			</div>
		</div>
		<div class="column two">
			<div class="quick-links-label">Common Searches</div>
			<div id="quick-links" class="menu-quick-links-search-container">
				<ul>
					<li class="menu-item">
						<a href="http://wsulibs.wsu.edu/">Library</a>
					</li>
					<li class="menu-item">
						<a href="https://my.wsu.edu">myWSU</a>
					</li>
					<li class="menu-item">
						<a href="https://zzusis-utilities.wsu.edu/psportal/pages/classsearch.html">Class schedules</a>
					</li>
					<li class="menu-item">
						<a href="http://www.wsujobs.com">Jobs</a>
					</li>
					<li class="menu-item">
						<a href="http://finaid.wsu.edu/cost-of-attendance/">Tuition</a>
					</li>
					<li class="menu-item">
						<a href="http://learn.wsu.edu/">Blackboard</a>
					</li>
					<li class="menu-item">
						<a href="https://reset.wsu.edu/">Password Reset</a>
					</li>
					<li class="menu-item">
						<a href="http://wsubookie.bncollege.com">The Bookie</a>
					</li>
					<li class="menu-item">
						<a href="http://www.parking.wsu.edu/">Parking</a>
					</li>
					<li class="menu-item">
						<a href="http://wsucougars.com/">Varsity sports</a>
					</li>
				</ul>
			</div>
		</div>
	</section>
	<div class="close-header-search">
		<button>Close search</button>
	</div>
</div>
<!-- End search drawer block -->
```
