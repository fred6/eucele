// Written in 2012 by fred6 frexids@gmail.com
//
// To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty. 
//
// See LICENSE (file) for a copy of the CC0 Public Domain Dedication, or see <http://creativecommons.org/publicdomain/zero/1.0/>. 

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
        var i, thisFig;
        for(i = 0; i < this.figures.length; i++) {
            thisFig = this.figures[i];

            if(thisFig.state <= state) {
                this.drawing.show ( thisFig.id, thisFig.stroke );
            } else {
                this.drawing.hide ( thisFig.id );
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

    Unit.prototype.init = function( d ) {
        this.drawing = d;

        var salient = this.initfn ( d ),
            temp;
        this.figures = [];

        var prepFig = function ( sal ) {
            var ch = {
                id: sal[0],
                state: sal[1]
            };

            if ( sal[2] !== undefined ) {
                ch.stroke = sal[2];
            }

            return ch;
        }

        // really wish i had map(), but not sure i want to pull in underscore.js...
        this.numStates = 0;
        for ( var i = 0; i < salient.length; i++ ) {
            temp = prepFig ( salient[i] );
            if ( temp.state > this.numStates ) {
                this.numStates = temp.state;
            }

            this.figures.push ( temp );
        }

        this.numStates += 1;
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


    pub.b1.prop1 = new Unit(function( d ) {
        d.newPoint ( 260, 180.5, "A" );
        d.newPoint ( 330, 180.5, "B" );
        d.newSegment ( "A", "B" );
        d.newCircle ( "A", "AB", "X" );
        d.newCircle ( "B", "AB", "Y" );
        d.findCircleInter ( "X", "Y", "C" );
        d.newSegment ( "A", "C" );
        d.newSegment ( "B", "C" );

        return [
            ["AB", 0],
            ["X", 1, red],
            ["Y", 2, yellow],
            ["C", 3],
            ["AC", 4, red],
            ["BC", 5, yellow]
        ];
    }); // prop1
    

    pub.b1.prop2 = new Unit(function( d ) {
        d.newPoint ( 150, 180.5, "A" );
        d.newPoint ( 220, 220.5, "B" );
        d.newPoint ( 260, 170.5, "C" );
        d.newSegment ( "A", "B" );
        d.newSegment ( "B", "C" );
        d.Prop1 ( "BC", "D" );
        d.newCircle ( "B", "AB", "X" );
        d.extendSegment ( "DB", d.get("DB").length + 30, "E" );
        d.findCircCenterSegInter ( "X", "DE", "F" );
        d.newSegment ( "D", "F" );
        d.newCircle ( "D", "DF", "Y" );
        d.extendSegment ( "DC", d.get ( "DC" ).length + 30, "G" );
        d.findCircCenterSegInter ( "Y", "DG", "H" );

        return [
            ["AB", 0],
            ["C", 0],
            ["BC", 1, gray],
            ["DB", 2, red],
            ["DC", 2, red],
            ["X", 3, blue],
            ["BE", 4, yellow],
            ["F", 5],
            ["Y", 6, red],
            ["CG", 7],
            ["H", 8]
        ];
    }); // prop2



    pub.b1.prop3 = new Unit(function( d ) {
        d.newPoint ( 150, 180.5, "A" );
        d.newPoint ( 230, 255.5, "B" );
        d.newPoint ( 260, 170.5, "C" );
        d.newPoint ( 230, 115.5, "D" );
        d.newSegment ( "A", "B" );
        d.newSegment ( "C", "D" );
        d.Prop2 ( "AB", "C", "E" );
        d.newCircle ( "C", "CD", "X" );
        d.findCircCenterSegInter ( "X", "CE", "F" );

        return [
            ["AB", 0],
            ["CD", 0, blue],
            ["C", 0],
            ["CE", 1, yellow],
            ["X", 2, blue],
            ["F", 3]
        ];
    }); // b1prop3

    pub.b1.prop4 = new Unit(function( d ) {
        d.newPoint ( 150, 180.5, "A" );
        d.newPoint ( 210, 105.5, "B" );
        d.newPoint ( 230, 170.5, "C" );
        d.newPoint ( 250, 180.5, "D" );
        d.newPoint ( 310, 105.5, "E" );
        d.newPoint ( 330, 170.5, "F" );
        d.newTriangle ( "A", "B", "C" );
        d.newAngle ( "A", "B", "C" );
        d.newTriangle ( "D", "E", "F" );
        d.newAngle ( "D", "E", "F" );

        return [
            ["AB", 0, blue],
            ["BC", 0, yellow],
            ["AC", 0],
            ["DE", 0, blue],
            ["EF", 0, yellow],
            ["DF", 0],
            ["<ABC", 0, red],
            ["<DEF", 0, red]
        ];
    }); // b1prop3


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

    return pub;

});
