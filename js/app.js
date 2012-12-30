// (c) 2012 fred6
// This code is released under the MIT license.
define( ["jquery", "raphael", "units"], function( $, Raphael, units ) {
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

        var raph = Raphael($('<div class="raphael"></div>').appendTo("#Rprop1")[0], 600, 300);

    $('<div><button class="left">&lt;</button><button class="right">&gt;</button></div>').appendTo("#Rprop1");

        // load Raphaels.

        units.b1.prop1.init(raph);

    }; // start

    return pub;

});
