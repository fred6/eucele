// (c) 2012 fred6
// This code is released under the MIT license.
define( ["raphael"], function( Raphael ) {
    "use strict";

    var pub = {};

    /*** Objects ***/

    pub.Point = function( r, x, y ) {
        this.r = r;
        this.x = x;
        this.y = y;
    };

    pub.Point.prototype.show = function( ) {
        if ( !this.display ) {
            var attr = {fill: "#000"};
            this.display = this.r.circle(this.x, this.y, 2).attr(attr);
        } else {
            this.display.show();
        }
    };

    pub.Point.prototype.hide = function() {
        if ( this.display ) {
            this.display.hide();
        }
    };

    pub.Segment = function( r, pt1, pt2 ) {
        this.r = r;

        // ugly, but some other logic depends on left-most being the first point
        if ( pt1.x <= pt2.x ) {
            this.A = pt1;
            this.B = pt2;
        } else {
            this.A = pt2;
            this.B = pt1;
        }

        this.length = Math.sqrt(Math.pow(this.B.x - this.A.x, 2) +
                                Math.pow(this.B.y - this.A.y, 2));
    };

    pub.Segment.prototype.show = function( r, stroke ) {
        var pt2String = function( pt ) {
            return pt.x+", "+pt.y;
        };

        if ( !this.display ) {
            var path = "M"+pt2String(this.A)+"L"+pt2String(this.B),
                attr = {
                    "stroke-width": 2,
                    "stroke": stroke || "#000"
                };
            
            this.display = this.r.path(path).attr(attr);
        } else {
            this.display.show();
        }
    };

    pub.Segment.prototype.hide = function() {
        if ( this.display ) {
            this.display.hide();
        }
    };

    // get change from A to B
    pub.Segment.prototype.getChangePerLength = function( coord ) {
        if ( coord === "x" ) {
            return (this.B.x - this.A.x) / this.length;
        } else {
            return (this.B.y - this.A.y) / this.length;
        }
    };

    
    pub.Segment.prototype.showA = function() {
        this.A.show();
    };

    pub.Segment.prototype.showB = function() {
        this.B.show();
    };

    pub.Circle = function( r, point, rad ) {
        this.r = r;
        this.center = point;
        this.cx = point.x;
        this.cy = point.y;
        this.rad = rad;
    };


    pub.Circle.prototype.show = function( r, stroke ) {
        if ( !this.display ) {
            var attr = {
                "stroke-width": 2,
                "stroke": stroke || "#000"
            };

            this.display = this.r.circle(this.cx, this.cy, this.rad).attr(attr);
        } else {
            this.display.show();
        }
    };

    pub.Circle.prototype.hide = function() {
        if ( this.display ) {
            this.display.hide();
        }
    };


    // the idea is that instead of having a separate triangle object, im just going
    // to have a proposition function return a group of segments.
    pub.EleGroup = function( eles ) {
        for ( var ele in eles ) {
            this[ele] = eles[ele];
        }
    };


    pub.EleGroup.prototype.show = function( stroke ) {
        for ( var ele in this ) {
            if ( this.hasOwnProperty(ele) ) {
                this[ele].show( stroke );
            }
        }
    };

    pub.EleGroup.prototype.hide = function() {
        for ( var ele in this ) {
            if ( this.hasOwnProperty(ele) ) {
                this[ele].hide();
            }
        }
    };


    /*** Utility funcitons ***/


    pub.circFromSeg = function( r, segment, endpoint ) {
        if ( endpoint === "A" ) {
            return new pub.Circle ( r, segment.A, segment.length );
        } else {
            return new pub.Circle ( r, segment.B, segment.length );
        }
    };

    // The idea is to return just the extension segment, not a segment
    // that includes both the extension and the original segment
    //
    // direction = 1 means A --> B, -1 means B --> A
    pub.extendSegment = function( segment, endpoint, length, direction ) {
        var segpt;
        if ( endpoint === "A" ) {
            segpt = segment.A;
        } else {
            segpt = segment.B;
        }
        
        var y_inc = direction * segment.getChangePerLength("y") * length;
        var x_inc = direction * segment.getChangePerLength("x") * length;
        var extendpt = new pub.Point(segpt.x + x_inc, segpt.y + y_inc);

        return new pub.Segment(segpt, extendpt);

    };


    pub.findCircsIntersection = function( r, circ1, circ2 ) {
        var Lcirc, Rcirc;

        if ( circ1.cx <= circ2.cx ) {
            Lcirc = circ1;
            Rcirc = circ2;
        } else {
            Lcirc = circ2;
            Rcirc = circ1;
        }

        var btwn_centers = new pub.Segment ( r, Lcirc.center, Rcirc.center );

        // x^2 + y^2 = R^2
        // (x-d)^2 + y^2 = r^2
        // solve for x:
        //
        // (x-d)^2 - x = r^2 - R^2
        // x = (d^2 - r^2 + R^2) / 2d
        //
        // Plug it back into the first equation to get y
        // Note that this is from the reference frame that assumes
        // the left-most circle is the origin
        // and the x-axis is along the line between the circle centers
        // so once we get x, y
        var d = btwn_centers.length;
        var x = (Math.pow(d, 2)
               - Math.pow(Rcirc.rad, 2)
               + Math.pow(Lcirc.rad, 2))
               / (2*d);
        var y = Math.sqrt(Math.pow(Lcirc.rad, 2) - Math.pow(x, 2));

        // get the coords of the point at the intersection between
        // btwn_centers and the line drawn from the 2 intersections of the circles
        // TODO: test and handle when there's zero or one intersection points
        // for now I will assume that less than two intersection points is an
        // uninteresting case

        // Also, we will use radians in this household, young man
        var cLineAng = Raphael.rad(
                         Raphael.angle(
                           Rcirc.cx, Rcirc.cy, Lcirc.cx, Lcirc.cy));

        var cLineX = Lcirc.cx + x*Math.cos(cLineAng),
            cLineY = Lcirc.cy + x*Math.sin(cLineAng);

        var cLinePt = new pub.Point ( r, cLineX, cLineY );

        // finally get the coords of the top intersection (since there are
        // generally two)
        var interPtX = cLinePt.x + y*Math.sin(cLineAng),
            interPtY = cLinePt.y - y*Math.cos(cLineAng);

        return new pub.Point ( r, interPtX, interPtY );
    };


    // finds intersection of circle and segment for a segment passing
    // through the center of the circle
    pub.findCircCenterSegIntersection = function( circ, seg ) {
        // find change per length of the segment, then
        // multiply by the radius of the circle to find the change
        // from circle to intersection
        var interY = circ.cy + circ.rad * seg.getChangePerLength("y"),
            interX = circ.cx + circ.rad * seg.getChangePerLength("x");

        return new pub.Point ( r, interX, interY );

    };

    // specialized for drawing the pythagorean theorem logo
    pub.logoSquareOnSegment = function ( seg, dir ) {
        var ang = Raphael.rad(
                    Raphael.angle(
                        seg.B.x, seg.B.y, seg.A.x, seg.A.y)),
            d = seg.length,
            orient = (dir === "top") ? 1 : -1,

            x = d*Math.sin(ang),
            y = d*Math.cos(ang),
            ptSx = seg.A.x + x,
            ptSy = seg.A.y - orient*y,
            ptTx = seg.B.x + x,
            ptTy = seg.B.y - orient*y,
            ptS = new pub.Point(ptSx, ptSy),
            ptT = new pub.Point(ptTx, ptTy),
            segAS = new pub.Segment(seg.A, ptS),
            segBT = new pub.Segment(seg.B, ptT),
            segST = new pub.Segment(ptS, ptT);

            return new pub.EleGroup(
                {
                    segAS: segAS,
                    segBT: segBT,
                    segST: segST
                });

    };



    /*** Proposition logic ***/


    // Prop1 - takes a segment, returns an equilateral triangle with the segment
    // as one of the sides
    pub.Prop1 = function( seg ) {
        var c1 = pub.circFromSeg(seg, "A"),
            c2 = pub.circFromSeg(seg, "B");
        var inter = pub.findCircsIntersection(c1,c2);

        var Aside = new pub.Segment(seg.A, inter),
            Bside = new pub.Segment(seg.B, inter);

        return new pub.EleGroup(
            {
                orig: seg,
                sideA: Aside,
                sideB: Bside
            });

    };


    // Prop2 - takes a segment and a point, returns a segment located at the point
    // that's equal in length to the segment
    pub.Prop2 = function( seg, pt ) {
        var seg1 = new pub.Segment(seg.B, pt);

        var eqtri = pub.Prop1(seg1);

        // now make the circle based on the original given seg
        var seg_circ = pub.circFromSeg(seg, "B");


        //extend the other side of the equilateral triangle
        var ext_seg = pub.extendSegment(eqtri.sideA, "B", seg.length + 30, 1);


        //find intersection of circle and extended line
        var interpt = pub.findCircCenterSegIntersection(seg_circ, ext_seg);

        // the other point in the eq tri (not B or C)
        var eqtri_otherpt = eqtri.sideA.A;


        // line from other point of the eqtri to the intersection of the
        // extension and the circle
        var ext_inter_seg = new pub.Segment(eqtri_otherpt, interpt);

        var ext_inter_seg_circ = pub.circFromSeg(ext_inter_seg, "A");

        // extend the remaining side of the eq tri
        var last_ext_seg = pub.extendSegment(eqtri.sideB, "B", seg.length + 30, 1) ;

        // find intersection of the newest circle and the last_ext_seg
        var inter2pt = pub.findCircCenterSegIntersection(ext_inter_seg_circ, last_ext_seg);

        return new pub.Segment(pt, inter2pt);

    };

    // return globally
    return pub;

});

