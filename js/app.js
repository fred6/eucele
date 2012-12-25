define( ["jquery", "raphael", "euclib", "units"], function( $, Raphael, euclib, units ) {
    var pub = {};

    function setNavActive ( ele ) {
        $("#units-nav > li").removeClass("active");
        ele.addClass("active");
    }


    pub.start = function () {
        var euc = euclib(Raphael("canvas", 600, 400)),
            u = units ( euc ),
            currUnit;

        // Initially set highlight
        var hash = location.hash.slice(1);
        setNavActive ( $('#units-nav > li > a[href = "#'+hash+'"]').parent() );

        // Change nav-list highlights on click
        $("#units-nav > li").click(function(e) {
            setNavActive ( $(this) );
        });


        // loads units
        $(window).bind('hashchange', function() {
            var name = location.hash.slice(1);

            if ( name !== "" ) {
                currUnit = u [ name ];
                currUnit.load();
            }
        });


    }; // start

    return pub;

});
