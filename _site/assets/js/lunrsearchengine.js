
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                                             Imp links for few scripts or codes                              :               Create openvpn tested on debian/ubuntu on cloudhttps://github. com/Nyr/openvpn-install:                                                                                                                                                                                                       08 Apr 2020                                                                                                                                                                                                                                                                                                                              Downloading T&ast;&ast;&ast;ents where they've been banned ?                              :               When you download or seed a torrent, you’re connecting to a bunch of other people, called a swarm. All of those people can see your. . . :                                                                                                                                                                                                       25 Dec 2019                                                                                                                      All Stories:                                                                                                     SSD - things todo to save space on ssd C drive              :       Change cache location of Firefox:                               &lt;/span&gt;                                10 Apr 2020                                                                                                                                     RTL SDR notes              :       We Need RTL SDR Dongle RTL SDR Software Computer ``` SDR works by receiving a analogue radio signal and then using an analog to digital converter to digitalise the signal. . . . :                               &lt;/span&gt;                                09 Apr 2020                                                                                                                                     Not authorized to perform this operation              :       Sometimes, when using i3wm I get this error when mounting a partition. But it works for other des like gnome/cinnamon. :                               &lt;/span&gt;                                08 Apr 2020                                                                                                                                     Imp links for few scripts or codes              :       Create openvpn tested on debian/ubuntu on cloudhttps://github. com/Nyr/openvpn-install:                               &lt;/span&gt;                                08 Apr 2020                                                                                                                                     Compiling fceux on Debian 10 buster              :       I came across this wonderful video https://www. youtube. com/watch?v=qv6UVOQ0F44. It took me into searching for its code to implement that. And here are a few. :                               &lt;/span&gt;                                29 Jan 2020                                                                                                                                     A Vegetarian's guide in Boston              :       Unfortunately only 3-4% of citizens in the US are vegetarian. After rambling around nearby streets, I got to know veg stuff was obscured everywhere. Even Subway/McDonald's were no exception. So. . . :                               &lt;/span&gt;                                05 Jan 2020                                               &laquo; Prev       1        2      Next &raquo; "
    }, {
    "id": 4,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ &#8220;sitemap. xml&#8221;   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/page2/",
    "title": "Home",
    "body": "{% if page. url == “/” %}       Featured:       {% for post in site. posts %}    {% if post. featured == true %}      {% include featuredbox. html %}    {% endif %}  {% endfor %}  {% endif %}       All Stories:         {% for post in paginator. posts %}    {% include postbox. html %}    {% endfor %}    {% include pagination. html %}"
    }, {
    "id": 6,
    "url": "http://localhost:4000/SSD-savespace/",
    "title": "SSD - things todo to save space on ssd C drive",
    "body": "2020/04/10 - Change cache location of Firefox: You can do this by creating a new hidden preference.  Type about:config into the location bar and press enter Accept the warning message that appears, you will be taken to a list of preferences Right-click somewhere in the list and select “New &gt; String” For the name of the preference type browser. cache. disk. parent_directory For its value type the path to where you want to store the cache Next locate the preference browser. cache. disk. enable, it must be set to true, if it is not, double-click on it to change its valueSymlink AppData folders: Windows applications often store their data and settings in an AppData folder, and each Windows user account has its own. It is located under C:\Users&lt;username&gt; which stores caches of various applications. Move all the files/hidden files/sub folders from the C:\Users\Nikhil\AppData\Local to to your D:\AppData\Local directory and create a symlink. 1mklink /d C:\Users\Nikhil\AppData\Local D:\AppData\LocalMove MS Office to some other drive [or install]: source: https://www. youtube. com/watch?v=CIBNlTpByoY&amp;t=36s For 64bit 1MKLINK /J  C:\Program Files\Microsoft Office\root   U:\Program Files\Microsoft Office\root For 32 bit [x86] 1MKLINK /J  C:\Program Files (x86)\Microsoft Office\root   U:\Program Files (x86)\Microsoft Office\root "
    }, {
    "id": 7,
    "url": "http://localhost:4000/RTL-SDR-Notes-copy/",
    "title": "RTL SDR notes",
    "body": "2020/04/09 - We Need:  RTL SDR Dongle RTL SDR Software Computer```SDR works by receiving a analogue radio signal and then using an analog to digital converter to digitalise the signal. The digitalised signal can then be worked in digital processing software. We needGQRX -&gt; osx/ linux 1234567git clone https://github. com/csete/gqrx. gitcd gqrxmkdir buildcd buildqmake . . makemake install 12sudo apt-get updatesudo apt install git cmake libusb-1. 0-0. dev build-essentialRtl2832u- osmocom driver: 12345git clone https://github. com/osmocom/rtl-sdrcd rtl-sdrmkdir build cd build cmake . . makemake installExamples of rtl_fm used: RTL_FM needs to be piped into an auto player that can play raw_audio such as sox or aplay 12sudo apt install soxrtl_fm -M wbfm -f 91. 10M | play -r 32000 -t raw -e s -b 16 -c 1 -V1Calibrating RTL-SDR: rtl-sdr is mass chinese manufactured device with poor crystal tolerance. crystal oscillator in rtl-sdr is its clock source (heartbeat of the circuit) rtl-sdr uses 28. 8 Mhz oscillator which may be out by a few khz. So few frequencies may not be where you expect them to be. To calibrate it we can tune it to a known frequency and adjust the PPM Offset until signal is centered after dongle is running for a while. Kalibrate https://github. com/steve-m/kalibrate-rtlhttps://github. com/steve-m/kalibrate-rtl/wiki/How-to-installkalibrate is a linux tool to auto calibrate. It requires that there are local GSM Signals receivable by the antenna to do the calibration. GSM signals are used because they transmit frequency correction data which calibrate can use to determine the clock offset. Let us scan for gsm 900 bands with 50db gain 1kal -s GSM900 -g 50 #using this you will get the offset range      GENERAL FREQUENCIES   Mhz         Amateur Radio   0. 535-1605       Shortwave Radio   3-30       walkie talkie   40-49       CV Radio   26. 965-27. 405       Analog TV   55-88       Radio Controlled Toys   72-76       Brodcast FM   88-108       Air Traffic Control   108-136       ATIS   110-129       Acars   131. 550       VDL2   136. 975       NOA   136-138 MHZ       VHF Amateur Radio (Band for HAM Radio)   144-148       Noa Weaather(Voice weather report)   162. 4       Rail   159-162       Maritime   156-162       AIS (Track ships like radar)   161. 9175 &amp; 162. 025       Pagers   157       Analogue TV   174-216       DAB   174-239       Trunking radio (commercial walkie talkie)   ~400       ISM Band   ~433       GSM   850, 900, 1800, 1900       ADS-B used to track aircraft like radar   1090       GPS   1575   ACARS: In aviation, ACARS is a digital communication system for transmission of short messages between aircraft and ground stations. Messages you may hear on ACARS are oooi events. (out of the gate, off the ground, on the ground, and into the gate)       Popular ACARS frequencies   Mhz         131. 550   Primary Channel worldwide       129. 125   Additional channel for USA &amp; Canada       130. 025   Secondary channel for USA and Canada       130. 425   Additional channel for USA       130. 450   Additional channel for USA &amp; Canada       131. 125   Additional channel for USA       131. 450   Primary channel for Japan       131. 475   Air Canada company channel       131. 525   European secondary       131. 725   Primary channel in Europe       136. 700   Additional channel for USA       136. 750   Additional channel for USA       136. 800   Additional channel for USA       136. 900   European secondary       136. 850   SITA North American Frequency       136. 750   New European frequency       131. 850   New European frequency   "
    }, {
    "id": 8,
    "url": "http://localhost:4000/Not-authorized-to-perform-this-operation/",
    "title": "Not authorized to perform this operation",
    "body": "2020/04/08 - Sometimes, when using i3wm I get this error when mounting a partition. But it works for other des like gnome/cinnamon. Make sure polkit is installed. Loosen the polkit permissions in your system to allow your normal user to mount devices by creating a file at /etc/polkit-1/localauthority/50-local. d/org. freedesktop. automount. plka (as root!) with the following content: 123456[Allow Unauthorized mounting/Unmounting]Identity=unix-group:plugdev;cdromAction=org. freedesktop. udisks2. filesystem-*;org. freedesktop. udisks2. eject*ResultAny=yesResultInactive=yesResultActive=yesYou can loosen the polkit permissions in your system to allow your normal user to mount devices by creating a file at /etc/polkit-1/localauthority/50-local. d/org. freedesktop. automount. plka (as root!) with the following content: 1groupsIf “plugdev” is not listed, then use: 12# gpasswd -a USER plugdevnewgrp plugdevhttp://forums. debian. net/viewtopic. php?f=10&amp;t=126872&amp;start=30# "
    }, {
    "id": 9,
    "url": "http://localhost:4000/Imp-links/",
    "title": "Imp links for few scripts or codes",
    "body": "2020/04/08 - Create openvpn tested on debian/ubuntu on cloud: https://github. com/Nyr/openvpn-install "
    }, {
    "id": 10,
    "url": "http://localhost:4000/Compiling-fceux-on-Debian-Buster/",
    "title": "Compiling fceux on Debian 10 buster",
    "body": "2020/01/29 - I came across this wonderful video https://www. youtube. com/watch?v=qv6UVOQ0F44. It took me into searching for its code to implement that. And here are a few. https://github. com/Mario-brows/Brows-Super-Mariohttps://github. com/lopatin96/Lua-SNES-GenNeurNetworkThe main problem in them is they use BizHawk Emulator, which I was not successful in compiling for my debian OS, Its stable only for windows machines. Then I found its alternative fceux Which can handle lua scripts too!. The following steps are what I used to compile it successfully. Download the FCEUX src. from their website 123sudo apt-get install libsdl1. 2-dev scons libgtk-3-dev liblua5. 1-0-dev libgd-devtar xzvf fceux-2. 2. 3. src. tar. gzcd fceux-2. 2. 3Open SConstruct 1vim SConstructMake sure gtk3 is used 12BoolVariable('GTK', 'Enable GTK2 GUI (SDL only)', 0),BoolVariable('GTK3', 'Enable GTK3 GUI (SDL only)', 1),To compile 1sconsThis will take around 5-10mins. Onc done Install it. 1sudo scons installAdding fceux in application drawer. 12sudo cp fceux. desktop /usr/share/applicationssudo cp fceux. png /usr/share/pixmapsAfter reboot you can see fceux in application drawer, or type fceux in terminal to run without rebooting. I will be uploading my experiences with that mario script soon once I configure :) "
    }, {
    "id": 11,
    "url": "http://localhost:4000/A-vegetarians-guide-in-boston/",
    "title": "A Vegetarian's guide in Boston",
    "body": "2020/01/05 - Unfortunately only 3-4% of citizens in the US are vegetarian. After rambling around nearby streets, I got to know veg stuff was obscured everywhere. Even Subway/McDonald's were no exception. So here is a dynamic N00Bs guide in becoming a Masterchef with vegetarian things available in Boston. Okra was one of my favourite dish, I had planned to survive on it it became worse when I got to know that too was not available. I found it in one store one day, but it was out of my budget 5$ for 12oz(300gm)Masala Khichidi with Kadhi: Pizza toppings on a brownbread: P. S. Pizza base coss around 4$ for 2, bread is 1. 6$ for a loaf. Pav Bhaji: Pulao: Cauliflower: Chana(black):  "
    }, {
    "id": 12,
    "url": "http://localhost:4000/Torrents-in-US/",
    "title": "Downloading T&ast;&ast;&ast;ents where they've been banned ?",
    "body": "2019/12/25 - When you download or seed a torrent, you’re connecting to a bunch of other people, called a swarm. All of those people can see your computer’s IP address—they have to in order to connect. That’s all very handy when you’re sharing files with other netizens, but file sharers such as yourself aren’t necessarily the only people paying attention. Piracy monitoring groups (often paid for by the entertainment industry either before or after they find violators) also join BitTorrent swarms, but instead of sharing files, they’re logging the IP addresses of other people in the swarm—including you—so that they can notify your ISP of your doings. A proxy (like Private Internet Access) funnels traffic—in this case, just your BitTorrent traffic—through another server, so that the BitTorrent swarm will show an IP address from them instead of you. In this case, Private Internet Access’ proxy server is in the Netherlands. That way, those anti-piracy groups can’t contact your ISP, and your ISP has no cause to send you a harrowing letter. But wait, can’t the piracy groups then go to the anonymizer service and requisition their logs to figure out what you’re downloading? Theoretically, yes, but if you’re using a truly good anonymizer, they don’t keep logs, so there’s no paper trail of activity leading back to you. All the piracy monitors see is a proxy service sharing a file, and all your ISP sees is you connecting to a proxy service. If you encrypt your BitTorrent traffic, your ISP won’t even be able to see that you’re using BitTorrent. A VPN is very similar to a proxy, but instead of rerouting just your BitTorrent traffic, it reroutes all your internet traffic. For some people, that’s a good thing—it gives you privacy all over the web. In this case tISP cannot see what sites you visit or anything you do while connected. It can only see that encrypted data is traveling to a server. Generally VPN and proxies are around the same cost. so I prefer VPNs as tehy give better privacy. Using a quality VPN is key; don’t settle for a “free” service or VPNs that log your activity, cap your bandwidth and data, or don’t provide sufficient DNS leak protection. Not all VPNs tolerate torrenting. ProtonVpn is another good one which gives free trial for 7 days and also provides anonymity for torrenting. Nord, ExpressVpn, SurfShark are another few which dont keep logs. You can also use paid cloud services like “zbigz. com” to get a direct link. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});