// (c) 2012 fred6
// This code is released under the MIT license.
define(function() {
    "use strict";

    return function( euclib ) {
     
        // this is probably not the proper place for the colors, but I need to think about where
        // they should go
        var pub = {},
            red = "#d43700",
            yellow = "#ffb200",
            blue = "#002e5f",
            gray = "#666",
            Unit,
            CanvasGod;


        Unit = function( title, CG, notes ) {
            this.title = title;
            this.notes = notes;
            this.CG = CG;
            this.numStates = this.CG.numStates;
            this.currentState = 0;
        };

        Unit.prototype.goTo = function( state ) {
            this.currentState = state;
            this.CG.setState( state );
        };

        Unit.prototype.load = function() {
            this.goTo( 0 );
        };

        Unit.prototype.disappear = function() {
            this.goTo( -1 );
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
                var A = new euclib.Point(150, 180.5),
                    B = new euclib.Point(220, 180.5),
                    seg = new euclib.Segment(A, B),
                    c1 = euclib.circFromSeg(seg, "A"),
                    c2 = euclib.circFromSeg(seg, "B"),
                    inter = euclib.findCircsIntersection(c1,c2),
                    Lside = new euclib.Segment(A, inter),
                    Rside = new euclib.Segment(B, inter);

                return [
                    createCGChild(seg, 0),
                    createCGChild(c1, 1, red),
                    createCGChild(c2, 2, yellow),
                    createCGChild(inter, 3),
                    createCGChild(Lside, 4, red),
                    createCGChild(Rside, 5, yellow)
                ];

            },

            title: "Proposition 1",
            notes: "<p>Euclid doesn't really prove that the two circles must intersect, he basically assumes it. You need to add additional postulates to cover this</p>"

        }; // b1prop1
        

        b1.prop2 = {
            init: function() {
                var A = new euclib.Point(150, 180.5),
                    B = new euclib.Point(220, 220.5),
                    C = new euclib.Point(260, 170.5),
                    seg = new euclib.Segment(A, B),
                    segBC = new euclib.Segment(B, C),
                    eqtri = euclib.Prop1(segBC),
                    seg_circ = euclib.circFromSeg(seg, "B"),
                    ext_seg = euclib.extendSegment(eqtri.sideA, "B", seg.length + 30, 1),
                    //find intersection of circle and extended line
                    interpt = euclib.findCircCenterSegIntersection(seg_circ, ext_seg),
                    // the other point in the eq tri (not B or C)
                    eqtri_otherpt = eqtri.sideA.A,

                    // line from other point of the eqtri to the intersection of the
                    // extension and the circle
                    ext_inter_seg = new euclib.Segment(eqtri_otherpt, interpt),

                    ext_inter_seg_circ = euclib.circFromSeg(ext_inter_seg, "A"),

                    // extend the remaining side of the eq tri
                    last_ext_seg = euclib.extendSegment(eqtri.sideB, "B", seg.length + 30, 1),
                    // find intersection of the newest circle and the last_ext_seg
                    inter2pt = euclib.findCircCenterSegIntersection(ext_inter_seg_circ, last_ext_seg);

                return [
                    createCGChild(seg, 0),
                    createCGChild(C, 0),
                    createCGChild(segBC, 1, gray),
                    createCGChild(eqtri, 2, red),
                    createCGChild(seg_circ, 3, blue),
                    createCGChild(ext_seg, 4, yellow),
                    createCGChild(ext_inter_seg_circ, 5, red),
                    createCGChild(last_ext_seg, 6, red),
                    createCGChild(inter2pt, 7)
                ];

            },

            title: "Proposition 2",
            notes: ""

        }; // b1prop2



        b1.prop3 = {
            init: function() {
                var A = new euclib.Point(150, 180.5),
                    B = new euclib.Point(230, 255.5),
                    C = new euclib.Point(260, 170.5),
                    D = new euclib.Point(230, 115.5),
                    seg1 = new euclib.Segment(A, B),
                    seg2 = new euclib.Segment(C, D),
                    //start of construction
                    newseg = euclib.Prop2(seg1, C),
                    seg2_circ = euclib.circFromSeg(seg2),
                    seg1_circ_inter = euclib.findCircCenterSegIntersection(seg2_circ, newseg);

                return [
                    createCGChild(seg1, 0),
                    createCGChild(seg2, 0, blue),
                    createCGChild(C, 0),
                    createCGChild(newseg, 1, yellow),
                    createCGChild(seg2_circ, 2, blue),
                    createCGChild(seg1_circ_inter, 3),
                ];

            },

            title: "Proposition 3",
            notes: ""

        }; // b1prop3


        // Pythagorean Theorem Logo
        b1.pythag_logo = {
            init: function() {
                var A = new euclib.Point(105, 213.5),
                    B = new euclib.Point(290, 213.5),
                    segAB = new euclib.Segment(A, B),
                    // calculating the coords of the point that would
                    // make a right triangle at a given ACang
                    ACang = Math.atan(6/4),
                    AClen = segAB.length * Math.cos(ACang),
                    Cx_off = AClen*Math.cos(ACang),
                    Cy_off = AClen*Math.sin(ACang),
                    C = new euclib.Point(A.x + Cx_off, A.y - Cy_off),
                    segBC = new euclib.Segment(B, C),
                    segAC = new euclib.Segment(A, C),
                    group1 = new euclib.logoSquareOnSegment(segAB, "bottom"),
                    group2 = new euclib.logoSquareOnSegment(segBC, "top"),
                    group3 = new euclib.logoSquareOnSegment(segAC, "top"),
                    D = new euclib.Point(C.x, A.y + segAB.length),
                    segCD = new euclib.Segment(C, D),
                    segA_BCT = new euclib.Segment(A, group2.segST.B),
                    segB_ACS = new euclib.Segment(B, group3.segST.A),
                    segC_ABS = new euclib.Segment(C, group1.segST.A),
                    segC_ABT = new euclib.Segment(C, group1.segST.B);


                return [
                    createCGChild(segAB, 0, red),
                    createCGChild(segBC, 0, yellow),
                    createCGChild(segAC, 0, blue),
                    createCGChild(group1, 1, red),
                    createCGChild(group2, 1, yellow),
                    createCGChild(group3, 1, blue),
                    createCGChild(segCD, 2, red),
                    createCGChild(segA_BCT, 2, yellow),
                    createCGChild(segB_ACS, 2, blue),
                    createCGChild(segC_ABS, 3),
                    createCGChild(segC_ABT, 3)
                ];


            },

            notes: "<p>squee</p>"
        };


        // turn unit definitions into actual unit objects
        // something about this code seems deeply wrong to me but I'm not smart enough
        // to figure out an alternative right now
        var unit, udef, CG;
        for ( unit in b1 ) {
            if ( b1.hasOwnProperty ( unit ) ) {
                udef = b1[unit];
                CG = new CanvasGod ( udef.init );
                pub["b1"+unit] = new Unit ( udef.title, CG , udef.notes );
            }
        }

        return pub;

    }; // return function

});
