// (c) 2012 fred6
// This code is released under the MIT license.
define( ["jquery", "raphael", "euclib", "units"], function( $, Raphael, euclib, units ) {
    var pub = {},
        raph = Raphael("canvas", 600, 400),
        euc = euclib(raph),
        u = units ( euc );

    pub.start = function () {
        var BookViewer = function() {
            this.eles = {
                "btn_group": $("#unit-btn-grp"),

                "title": $("#unit-title"),
                "notes": $("#unit-notes")
            };

            this.currUnit = null;


            function setNavActive ( ele ) {
                $("#units-nav > li").removeClass("active");
                ele.addClass("active");
            }

            // Setup based on initial hash
            var hash = location.hash.slice(1);
            setNavActive ( $('#units-nav > li > a[href = "#'+hash+'"]').parent() );
            this.loadUnit ( hash );

            // Change nav-list highlights on click
            $("#units-nav").on("click", "li", function(e) {
                setNavActive ( $(this) );
            });

        };

        BookViewer.prototype.loadUnit = function( name ) {
            $("#unit-btn-grp button").remove();

            // TODO: create an index page to load so I dont have to do this manually
            if ( name === "" ) {
                this.eles.notes.html('');
                this.eles.title.html('Book 1');
                return;
            }

            if ( this.currUnit )
                this.currUnit.disappear();

            this.currUnit = u [ name ];
            this.currUnit.load();

            this.buttonSetup();

            // set unit description & title
            this.eles.notes.html("<h2>Notes</h2>"+this.currUnit.notes);
            this.eles.title.html(this.currUnit.title);
        };

        BookViewer.prototype.buttonSetup = function() {
            // Set up buttons based on number of states in the unit
            var btn_txt;
            for(var i = 0; i < this.currUnit.numStates; i++) {
                if ( i === 0 ) {
                    btn_txt = '<button class="btn btn-block active">Given</button>';
                } else {
                    btn_txt = '<button class="btn btn-block">'+i+'</button>';
                }

                this.eles.btn_group.append(btn_txt);
            }

            // delegated event handler for efficiency
            this.eles.btn_group.off("click", "button");

            var currU = this.currUnit;
            this.eles.btn_group.on("click", "button", function(e) {
                currU.goTo( $(this).index() );
            });

        };


        var BV = new BookViewer();

        // loads units
        $(window).bind('hashchange', function() {
            var name = location.hash.slice(1);
            BV.loadUnit ( name );
        });

    }; // start

    return pub;

});
