requirejs.config({
    paths: { 
        /* Load jquery from google cdn. On fail, load local file. */
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min','libs/jquery-min'],

        /* Load bootstrap from cdn. On fail, load local file. */
        'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min','libs/bootstrap-min'],

        'raphael': 'libs/raphael.amd',
        'raphael.core': 'libs/raphael.core',
        'raphael.svg': 'libs/raphael.svg',
        'raphael.vml': 'libs/raphael.vml',
        'eve': 'libs/eve'
    },
    shim: {
        'bootstrap' : ['jquery'],

        'raphael': {
            exports: 'Raphael'
        }
    }
});

require(["jquery", "bootstrap", "raphael", "euclib", "units"], 
    function( $, Bootstrap, Raphael, euclib, units ) {
        function setNavActive ( ele ) {
            $("#units-nav > li").removeClass("active");
            ele.addClass("active");
        }

        // Initially set highlight
        var hash = location.hash.slice(1);
        setNavActive ( $('#units-nav > li > a[href = "#'+hash+'"]').parent() );

        $("#units-nav > li").click(function(e) {
            setNavActive ( $(this).addClass("active") );
        });


        $(window).bind('hashchange', function() {
            //var unit = units.getUnit( location.hash.slice(1) );
        });

        var red = "#d43700",
            yellow = "#ffb200",
            blue = "#002e5f";

        var euc = euclib(Raphael("canvas", 600, 400));

        var A = new euc.Point(150, 180.5),
            B = new euc.Point(220, 180.5);
        var seg = new euc.Segment(A, B);
        seg.show();

        //start of construction

        var c1 = euc.circFromSeg(seg, "A"),
            c2 = euc.circFromSeg(seg, "B");

        c1.show(red);
        c2.show(yellow);

        var inter = euc.findCircsIntersection(c1,c2);
        inter.show();

        var Lside = new euc.Segment(A, inter),
            Rside = new euc.Segment(B, inter);
        Lside.show(red);
        Rside.show(yellow);
});
