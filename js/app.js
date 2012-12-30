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

        // load Raphaels.
        $(".raph_container").each(function() {
            var heights = [400, 600],
                raph_div = '<div class="raphael"></div>',
                button_div = '<div><button class="left">&lt;</button><button class="right">&gt;</button></div>',

                $this = $(this),
                unit = $this.attr('id').slice(1);
                //thisHeight = Number(unit.slice(4));

            var raph = Raphael($(raph_div).appendTo($this)[0], 600, 400);
            $(button_div).appendTo($this);

            units.b1[unit].init(raph);
        });

    }; // start

    return pub;

});
