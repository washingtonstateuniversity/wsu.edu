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
</header>
```
