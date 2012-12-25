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

        // generic hash function, to be called either on hash change
        // or on initial page load when a url with hash is loaded
        function hashSetup ( name ) {
            var currUnit;

            if ( name !== "" ) {
                currUnit = u [ name ];
                currUnit.load();
            }

            // Set up buttons based on number of states in the unit
            $("#unit-btn-grp button").remove();
            var btn_txt;
            for(var i = 0; i < currUnit.CG.numStates; i++) {
                if ( i === 0 ) {
                    btn_txt = '<button class="btn btn-block active">Given</button>';
                } else {
                    btn_txt = '<button class="btn btn-block">'+i+'</button>';
                }

                $(btn_txt).appendTo("#unit-btn-grp");

            }

            // delegated event handler for efficiency
            $("#unit-btn-grp").on("click", "button", function(e) {
                currUnit.goTo( $(this).index() );
            });

        }

        // Setup based on initial hash
        var hash = location.hash.slice(1);
        setNavActive ( $('#units-nav > li > a[href = "#'+hash+'"]').parent() );
        hashSetup ( hash );

        // Change nav-list highlights on click
        $("#units-nav").on("click", "li", function(e) {
            setNavActive ( $(this) );
        });


        // loads units
        $(window).bind('hashchange', function() {
            var name = location.hash.slice(1);

            hashSetup ( name );
        });


    }; // start

    return pub;

});
