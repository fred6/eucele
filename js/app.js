// (c) 2012 fred6
// This code is released under the MIT license.
define( ["jquery", "raphael", "euclib", "units"], function( $, Raphael, euclib, units ) {
    var pub = {};

    function setNavActive ( ele ) {
        $("#units-nav > li").removeClass("active");
        ele.addClass("active");
    }


    pub.start = function () {
        var raph = Raphael("canvas", 600, 400),
            euc = euclib(raph),
            u = units ( euc ),
            currUnit;

        function loadPage ( name ) {
            var currUnit;

            $("#unit-btn-grp button").remove();

            // TODO: create an index page to load so I dont have to do this manually
            if ( name === "" ) {
                $("#unit-notes").html("");
            } else {
                raph.clear();
                currUnit = u [ name ];
                currUnit.load();

                // Set up buttons based on number of states in the unit
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
                $("#unit-btn-grp").off("click", "button");

                $("#unit-btn-grp").on("click", "button", function(e) {
                    currUnit.goTo( $(this).index() );
                });


                // set unit description
                $("#unit-notes").html("<h2>Notes</h2>"+currUnit.notes);
            }

        }

        // Setup based on initial hash
        var hash = location.hash.slice(1);
        setNavActive ( $('#units-nav > li > a[href = "#'+hash+'"]').parent() );
        loadPage ( hash );

        // Change nav-list highlights on click
        $("#units-nav").on("click", "li", function(e) {
            setNavActive ( $(this) );
        });


        // loads units
        $(window).bind('hashchange', function() {
            var name = location.hash.slice(1);

            loadPage ( name );
        });


    }; // start

    return pub;

});
