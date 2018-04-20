# Site header mega
This component probably should be broken into three components:
- wsu-signature
- site-navigation
- search-dropdown

## Known pages/sections that use mega menu
- wsu.edu home page
- 125 stories
- Impact stories
- 404 page

## HTML
```
<header class="site-header row">
    <!-- wsu-signature -->
    <div class="wsu-signature">
        <img src="https://wsu.edu/wp-content/themes/wsu-home/images/wsu-home-logo.svg" alt="Washington State University">
    </div>
    <!-- end wsu-signature -->
    <!-- site-navigation -->
    <nav class="main-navigation">
        <ul class="nav-dropdown">
            <li>
                <button>About</button>
                <ul class="sub-navigation">
                    <li class="menu-item">
                        <a href="https://wsu.edu/about/wsu-difference/">The WSU Difference</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/about/facts/">Quick Facts</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/about/statewide/">Statewide Reach</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/about/excellence/">Academic Excellence</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/about/leadership/">Leadership &amp; Mission</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/about/services/">Services</a>
                    </li>
                    <li class="menu-item ">
                        <a href="https://wsu.edu/about/contact/">Contact Us</a>
                    </li>
                </ul>
            </li>
            <li>
                <button>Admission</button>
                <ul class="sub-navigation">
                    <li class="menu-item">
                        <a href="https://wsu.edu/admission/">Applying to WSU</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://admission.wsu.edu/">Undergraduate</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://gradschool.wsu.edu/">Graduate</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://ip.wsu.edu/apply/">International</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://online.wsu.edu/admissions.aspx">Online Courses</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://finaid.wsu.edu/">Financial Aid &amp; Scholarships</a>
                    </li>
                </ul>
            </li>
            <li>
                <button>Academics</button>
                <ul class="sub-navigation">
                    <li class="menu-item">
                        <a href="https://wsu.edu/academics/">At a Glance</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://apps.admission.wsu.edu/academics/fos/Public/index.castle">Undergraduate Majors</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://gradschool.wsu.edu/degrees/">Graduate Programs</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://wsu.edu/academics/#colleges">Colleges</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://summer.wsu.edu/">Summer Session</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://libraries.wsu.edu">Libraries</a>
                    </li>
                </ul>
            </li>
            <li>
                <button>Research</button>
                <ul class="sub-navigation">
                    <li class="menu-item">
                        <a href="http://research.wsu.edu">Overview</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://research.wsu.edu/office-research/about/">Office of Research</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://research.wsu.edu/news-events/news/">Research News</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://research.wsu.edu/centers-institutes-labs/">Research Centers &amp; Facilities</a>
                    </li>
                    <li class="menu-item">
                        <a href="http://undergraduateresearch.wsu.edu/">Student Research</a>
                    </li>
                </ul>
            </li>
            <li>
                <button>Community Life</button>
                <ul class="sub-navigation">
                    <li class="menu-item">
                        <a href="https://wsu.edu/life/overview/">Overview</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/life/events/">Calendars &amp; Tickets</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/life/things-to-do/entertainment/">Entertainment</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/life/housing/">Housing</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/life/transportation/">Transportation</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/life/careers-jobs/">Careers &amp; Jobs</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/life/pullman/community-schools/">Pullman &amp; Schools</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://wsu.edu/life/visit/">Visit &amp; Travel</a>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="nav-search-give">
            <li class="nav-give">
                <a href="https://foundation.wsu">Give to WSU</a>
            </li>
            <li class="nav-search">
                <button>Search</button>
            </li>
        </ul>
    </nav>
    <!-- end site-navigation -->
    <!-- search dropdown -->
    <div class="header-search-wrapper header-search-wrapper-hide">
        <section class="side-right row" id="search-modal">
            <div class="column one">
                <div class="header-search-input-wrapper">
                    <form method="get" action="https://search.wsu.edu/Default.aspx" _lpchecked="1">
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
                        <li id="menu-item-449" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-449">
                            <a href="http://wsulibs.wsu.edu/">Library</a>
                        </li>
                        <li id="menu-item-2891" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-2891">
                            <a href="https://my.wsu.edu">myWSU</a>
                        </li>
                        <li id="menu-item-1476" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1476">
                            <a href="https://zzusis-utilities.wsu.edu/psportal/pages/classsearch.html">Class schedules</a>
                        </li>
                        <li id="menu-item-448" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-448">
                            <a href="http://www.wsujobs.com">Jobs</a>
                        </li>
                        <li id="menu-item-451" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-451">
                            <a href="http://finaid.wsu.edu/cost-of-attendance/">Tuition</a>
                        </li>
                        <li id="menu-item-450" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-450">
                            <a href="http://learn.wsu.edu/">Blackboard</a>
                        </li>
                        <li id="menu-item-3435" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-3435">
                            <a href="https://reset.wsu.edu/">Password Reset</a>
                        </li>
                        <li id="menu-item-453" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-453">
                            <a href="http://wsubookie.bncollege.com">The Bookie</a>
                        </li>
                        <li id="menu-item-454" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-454">
                            <a href="http://www.parking.wsu.edu/">Parking</a>
                        </li>
                        <li id="menu-item-455" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-455">
                            <a href="http://wsucougars.com/">Varsity sports</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <div class="close-header-search">
            <a href="">x</a>
        </div>
    </div>
    <!-- end search-dropdown -->
</header>
```
