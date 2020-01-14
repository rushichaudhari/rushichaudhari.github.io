
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/about",
    "title": "Mediumish Template for Jekyll",
    "body": "This website is built with Jekyll and Mediumish template for Jekyll. It's for demonstration purposes, no real content can be found. Mediumish template for Jekyll is compatible with Github pages, in fact even this demo is created with Github Pages and hosted with Github.  Documentation: Please, read the docs here. Questions or bug reports?: Head over to our Github repository! Buy me a coffeeThank you for your support! Your donation helps me to maintain and improve Mediumish . Buy me a coffee Documentation"
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                                 Downloading T&ast;&ast;&ast;ents where they've been banned ?                              :               When you download or seed a torrent, you’re connecting to a bunch of other people, called a swarm. All of those people can see your. . . :                                                                                                                                                                       Rushi                                25 Dec 2019                                                                                                                      All Stories:                                                                                                     A Vegetarian's guide in Boston              :       Unfortunately only 3-4% of citizens in the US are vegetarian. After rambling around nearby streets, I got to know veg stuff was obscured everywhere. Even Subway/McDonald's were no exception. So. . . :                                                                               Rushi                05 Jan 2020                                                                                                                                     Downloading T&ast;&ast;&ast;ents where they've been banned ?              :       When you download or seed a torrent, you’re connecting to a bunch of other people, called a swarm. All of those people can see your computer’s IP address—they have to. . . :                                                                               Rushi                25 Dec 2019                                            "
    }, {
    "id": 4,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ &#8220;sitemap. xml&#8221;   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/A-vegetarians-guide-in-boston/",
    "title": "A Vegetarian's guide in Boston",
    "body": "2020/01/05 - Unfortunately only 3-4% of citizens in the US are vegetarian. After rambling around nearby streets, I got to know veg stuff was obscured everywhere. Even Subway/McDonald's were no exception. So here is a dynamic N00Bs guide in becoming a Masterchef with vegetarian things available in Boston. Okra was one of my favourite dish, I had planned to survive on it it became worse when I got to know that too was not available. I found it in one store one day, but it was out of my budget 5$ for 12oz(300gm)Masala Khichidi with Kadhi: Pizza toppings on a brownbread: P. S. Pizza base coss around 4$ for 2, bread is 1. 6$ for a loaf. Pav Bhaji: Pulao: Cauliflower: Chana(black):  "
    }, {
    "id": 6,
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