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
            var heights = [300, 400],
                raph_div = '<div class="raphael"></div>',
                button_div = '<div style="text-align:center"><button class="left">&lt;</button><button class="right">&gt;</button></div>',

                $this = $(this),
                unit = $this.attr('id').slice(1),
                thisHeight = heights[Number(unit.slice(4)) - 1];

            var raph = Raphael($(raph_div).appendTo($this)[0], 600, thisHeight);
            $(button_div).appendTo($this);

            units.b1[unit].init(raph);
        });

    }; // start

    return pub;

});
