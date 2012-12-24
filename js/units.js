define( ["./euclib"], function( euclib ) {
    "use strict";
     
    var pub = {};

    pub.Unit = function( CG, notes ) {
        this.notes = notes;
        this.CG = CG;
    };

    pub.Unit.prototype.goTo = function( state ) {
        this.CG.setState( state );

    };

    pub.Unit.prototype.load = function() {
        this.goTo( 0 );
    };


    // CanvasGod is an object that has a collection of canvas objects
    // (children). each object has (for now) a single number attached,
    // which indicates the step when the object becomes visible on the canvas
    //
    // for objects that appear and disappear (and possibly reappear again),
    // we can use a list of numbers [a, b, c]
    // where the first number indicates the step when it appears, the second
    // indicates the number where it disappears, the third when it re-appears, etc.
    // I'm starting off with a single number because I'm not certain we need the
    // added functionality
    pub.CanvasGod = function( children ) {
        this.children = children;
    };

    pub.CanvasGod.setState = function( state ) {

        
    };

    // register globally
    return pub;

});
