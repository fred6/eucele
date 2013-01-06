// Written in 2012 by fred6 frexids@gmail.com
//
// To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty. 
//
// See LICENSE (file) for a copy of the CC0 Public Domain Dedication, or see <http://creativecommons.org/publicdomain/zero/1.0/>. 

define( ["jquery", "raphael", "euclib", "units", "justifications"], function( $, Raphael, euclib, units, justifications ) {
    var pub = {};
    pub.start = function () {
        // set up button bindings for stepping thru
        $(".raph_container").on("click", "button.right", function(e) {
            var unit = $(this).parent().parent().attr('id').slice(1);
            units.b1[unit].stepRight();
        });
        $(".raph_container").on("click", "button.left", function(e) {
            var unit = $(this).parent().parent().attr('id').slice(1);
            units.b1[unit].stepLeft();
        });

        // load Raphaels.
        $(".raph_container").each(function() {
            var heights = [300, 400, 300, 250],
                raph_div = '<div class="raphael"></div>',
                button_div = '<div style="text-align:center"><button class="left">&lt;</button><button class="right">&gt;</button></div>',

                $this = $(this),
                unit = $this.attr('id').slice(1),
                thisHeight = heights[Number(unit.slice(4)) - 1];

            var raph = Raphael($(raph_div).appendTo($this)[0], 560, thisHeight);
            $(button_div).appendTo($this);

            units.b1[unit].init ( new euclib.Drawing ( raph ) );
        });

        // step via links
        $("p").on("click", "span.proofstep", function(e) {
            var addr = $(this).attr('id').split('_');
            units.b1[addr[0]].goTo ( Number ( addr[1] ) );

        });


        justifications.setup();

    }; // start

    return pub;

});
