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
        var red = "#d43700",
            yellow = "#ffb200",
            blue = "#002e5f";

        var euc = euclib(Raphael("canvas", 600, 400));

        var A = new euc.Point(150, 180.5),
            B = new euc.Point(220, 180.5);
        var seg = new euc.Segment(A, B);
        seg.draw();

        //start of construction

        var c1 = euc.circFromSeg(seg, "A"),
            c2 = euc.circFromSeg(seg, "B");

        c1.draw(red);
        c2.draw(yellow);

        var inter = euc.findCircsIntersection(c1,c2);
        inter.draw();

        var Lside = new euc.Segment(A, inter),
            Rside = new euc.Segment(B, inter);
        Lside.draw(red);
        Rside.draw(yellow);
});
