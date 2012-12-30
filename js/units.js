// (c) 2012 fred6
// This code is released under the MIT license.
define(["euclib"], function( euclib ) {
    "use strict";

    // this is probably not the proper place for the colors, but I need to think about 
    // where they should go
    var pub = {},
        red = "#d43700",
        yellow = "#ffb200",
        blue = "#002e5f",
        gray = "#666",
        Unit,
        CanvasGod;


    Unit = function( init ) {
        this.initfn = init;
    };

    Unit.prototype.goTo = function( state ) {
        var i, thisChild;
        for(i = 0; i < this.children.length; i++) {
            thisChild = this.children[i];

            if(thisChild.state <= state) {
                thisChild.eucObj.show(thisChild.stroke);
            } else {
                thisChild.eucObj.hide();
            }
        }
        this.currentState = state;
    };

    Unit.prototype.stepLeft = function() {
        if ( this.currentState > 0 ) {
            this.goTo ( this.currentState - 1 );
        }
    };

    Unit.prototype.stepRight = function() {
        if ( this.currentState < this.numStates - 1 ) {
            this.goTo ( this.currentState + 1 );
        }
    };

    Unit.prototype.disappear = function() {
        this.goTo ( -1 );
    };

    Unit.prototype.init = function( r ) {
        this.children = this.initfn ( r );

        this.numStates = 0;
        for ( var i = 0; i < this.children.length; i++ ) {
            if ( this.children[i].state > this.numStates ) {
                this.numStates = this.children[i].state;
            }
        }

        this.numStates += 1; // children.state is 0-referenced

        this.goTo ( 0 );
    };


    /*** Specific units ***/
    pub.b1 = {};

    // Book 1 Prop 1

    // helper
    function createUnitObj(eucObj, state, stroke) {
        var obj = {
            eucObj: eucObj,
            state: state
        };

        if ( stroke !== undefined) {
            obj["stroke"] = stroke;
        }

        return obj;
    };


    pub.b1.prop1 = new Unit(function( r ) {
        var A = new euclib.Point ( r, 260, 180.5 ),
            B = new euclib.Point ( r, 330, 180.5 ),
            seg = new euclib.Segment ( r, A, B ),
            c1 = euclib.circFromSeg ( r, seg, "A" ),
            c2 = euclib.circFromSeg ( r, seg, "B" ),
            inter = euclib.findCircsIntersection ( r, c1, c2 ),
            Lside = new euclib.Segment ( r, A, inter ),
            Rside = new euclib.Segment ( r, B, inter );

        return [
            createUnitObj(seg, 0),
            createUnitObj(c1, 1, red),
            createUnitObj(c2, 2, yellow),
            createUnitObj(inter, 3),
            createUnitObj(Lside, 4, red),
            createUnitObj(Rside, 5, yellow)
        ];
    }); // prop1
    

    pub.b1.prop2 = new Unit(function( r ) {
        var A = new euclib.Point ( r, 150, 180.5 ),
            B = new euclib.Point ( r, 220, 220.5 ),
            C = new euclib.Point ( r, 260, 170.5 ),

            seg = new euclib.Segment ( r, A, B ),
            segBC = new euclib.Segment ( r, B, C ),
            eqtri = euclib.Prop1 ( r, segBC ),
            seg_circ = euclib.circFromSeg ( r, seg, "B" ),
            ext_seg = euclib.extendSegment ( r, eqtri.sideA, "B", seg.length + 30, 1 ),
            //find intersection of circle and extended line
            interpt = euclib.findCircCenterSegIntersection ( r, seg_circ, ext_seg ),
            // the other point in the eq tri (not B or C)
            eqtri_otherpt = eqtri.sideA.A,

            // line from other point of the eqtri to the intersection of the
            // extension and the circle
            ext_inter_seg = new euclib.Segment ( r, eqtri_otherpt, interpt ),

            ext_inter_seg_circ = euclib.circFromSeg ( r, ext_inter_seg, "A" ),

            // extend the remaining side of the eq tri
            last_ext_seg = euclib.extendSegment ( r, eqtri.sideB, "B", seg.length + 30, 1 ),
            // find intersection of the newest circle and the last_ext_seg
            inter2pt = euclib.findCircCenterSegIntersection ( r, ext_inter_seg_circ, last_ext_seg );

        return [
            createUnitObj(seg, 0),
            createUnitObj(C, 0),
            createUnitObj(segBC, 1, gray),
            createUnitObj(eqtri, 2, red),
            createUnitObj(seg_circ, 3, blue),
            createUnitObj(ext_seg, 4, yellow),
            createUnitObj(ext_inter_seg_circ, 5, red),
            createUnitObj(last_ext_seg, 6, red),
            createUnitObj(inter2pt, 7)
        ];

    }); // prop2



    pub.b1.prop3 = new Unit(
        function() {
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
                createUnitObj(seg1, 0),
                createUnitObj(seg2, 0, blue),
                createUnitObj(C, 0),
                createUnitObj(newseg, 1, yellow),
                createUnitObj(seg2_circ, 2, blue),
                createUnitObj(seg1_circ_inter, 3),
            ];
        }
    ); // b1prop3


    // Pythagorean Theorem Logo
    var pythag_logo = new Unit(
        function() {
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
                createUnitObj(segAB, 0, red),
                createUnitObj(segBC, 0, yellow),
                createUnitObj(segAC, 0, blue),
                createUnitObj(group1, 1, red),
                createUnitObj(group2, 1, yellow),
                createUnitObj(group3, 1, blue),
                createUnitObj(segCD, 2, red),
                createUnitObj(segA_BCT, 2, yellow),
                createUnitObj(segB_ACS, 2, blue),
                createUnitObj(segC_ABS, 3),
                createUnitObj(segC_ABT, 3)
            ];
        }
    );

//    for ( unit in b1 ) {
//       if ( b1.hasOwnProperty ( unit ) ) {

    return pub;

});
