define(function() {
    "use strict";

    return function( euclib ) {
     
        // this is probably not the proper place for the colors, but I need to think about where
        // they should go
        var pub = {},
            red = "#d43700",
            yellow = "#ffb200",
            blue = "#002e5f",
            Unit,
            CanvasGod;


        Unit = function( CG, notes ) {
            this.notes = notes;
            this.CG = CG;
        };

        Unit.prototype.goTo = function( state ) {
            this.CG.setState( state );

        };

        Unit.prototype.load = function() {
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
        CanvasGod = function( initfn ) {
            // each child is an object consisting of a Euclib object and a number
            // I could verify that its valid, but I'm the only one using this, so I probably
            // just won't bother!
            this.children = initfn();
            this.numStates = 0;
            for ( var i = 0; i < this.children.length; i++ ) {
                if ( this.children[i].state > this.numStates ) {
                    this.numStates = this.children[i].state;
                }
            }
            this.numStates += 1; // children.state is 0-referenced
        };

        CanvasGod.prototype.setState = function( state ) {
            var i, thisChild;
            for(i = 0; i < this.children.length; i++) {
                thisChild = this.children[i];

                if(thisChild.state <= state) {
                    thisChild.eucObj.show(thisChild.stroke);
                } else {
                    thisChild.eucObj.hide();
                }
            }
        };

        
        /*** Specific units ***/
        var b1 = {};

        // Book 1 Prop 1
 
        // helper
        function createCGChild(eucObj, state, stroke) {
            var obj = {
                eucObj: eucObj,
                state: state
            };

            if ( stroke !== undefined) {
                obj["stroke"] = stroke;
            }

            return obj;
        };


        b1.prop1 = {
            init: function() {
                var children = [],
                    A = new euclib.Point(150, 180.5),
                    B = new euclib.Point(220, 180.5),
                    seg = new euclib.Segment(A, B),
                    c1 = euclib.circFromSeg(seg, "A"),
                    c2 = euclib.circFromSeg(seg, "B"),
                    inter = euclib.findCircsIntersection(c1,c2),
                    Lside = new euclib.Segment(A, inter),
                    Rside = new euclib.Segment(B, inter);

                children[0] = createCGChild(seg, 0);
                children[1] = createCGChild(c1, 1, red);
                children[2] = createCGChild(c2, 2, yellow);
                children[3] = createCGChild(inter, 3);
                children[4] = createCGChild(Lside, 4, red);
                children[5] = createCGChild(Rside, 5, yellow);

                return children;
            },

            notes: "<p>Euclid doesn't really prove that the two circles must intersect, he basically assumes it. You need to add additional postulates to cover this</p>"

        }; // b1prop1


        // turn unit definitions into actual unit objects
        // something about this code seems deeply wrong to me but I'm not smart enough
        // to figure out an alternative right now
        var unit, udef, CG;
        for ( unit in b1 ) {
            if ( b1.hasOwnProperty ( unit ) ) {
                udef = b1[unit];
                CG = new CanvasGod ( udef.init );
                pub["b1"+unit] = new Unit ( CG , udef.notes );
            }
        }

        return pub;

    }; // return function

});
