// Written in 2012 by fred6 frexids@gmail.com
//
// To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty. 
//
// See LICENSE (file) for a copy of the CC0 Public Domain Dedication, or see <http://creativecommons.org/publicdomain/zero/1.0/>. 

define( ["raphael"], function( Raphael ) {
    "use strict";

    var pub = {};

    /*** Objects ***/

    pub.Point = function( x, y, id ) {
        this.x = x;
        this.y = y;
        this.id = id;
    };

    pub.Segment = function( pt1, pt2 ) {
        // ugly, but some other logic depends on left-most being the first point
        if ( pt1.x <= pt2.x ) {
            this.A = pt1;
            this.B = pt2;
        } else {
            this.A = pt2;
            this.B = pt1;
        }

        this.endpoints = [this.A.id, this.B.id];

        this.length = Math.sqrt(Math.pow(this.B.x - this.A.x, 2) +
                                Math.pow(this.B.y - this.A.y, 2));
    };

    // get change from A to B
    pub.Segment.prototype.getChangePerLength = function( segorder ) {
        var dir;
        if ( segorder === this.endpoints.join('') ) {
            dir = 1;
        } else {
            dir = -1;
        }

        return [dir * (this.B.x - this.A.x) / this.length,
                dir * (this.B.y - this.A.y) / this.length];
    };


    pub.Circle = function( point, rad ) {
        this.center = point;
        this.cx = point.x;
        this.cy = point.y;
        this.rad = rad;
    };


    pub.Triangle = function ( pt1, pt2, pt3 ) {
        // insertion sort!
        var verts = [pt1, pt2, pt3];
        var tmp;

        if ( verts[1].x < verts[0].x ) {
            tmp = verts[0];
            verts[0] = verts[1];
            verts[1] = tmp;
        }

        if ( verts[2].x < verts[1].x ) {
            tmp = verts[2];
            verts[2] = verts[1];

            if ( verts[2].x < verts[0].x ) {
                verts[1] = verts[0];
                verts[0] = tmp;
            } else {
                verts[1] = tmp;
            }
        }

        this.vertices = verts;

    };


    pub.Angle = function( seg1, seg2, vertex ) {
        var i, pt1, pt2, pt3;

        for (i = 0; i < 2; i++ ) {
            if ( seg1.endpoints[i] !== vertex ) {
                pt1 = seg1.endpoints[i];
            }

            if ( seg2.endpoints[i] !== vertex ) {
                pt3 = seg2.endpoints[i];
            }
        }


        // ugly, but some other logic depends on left-most being the first point
        if ( pt1.x <= pt3.x ) {
            this.L = pt1;
            this.R = pt2;
        } else {
            this.L = pt2;
            this.R = pt1;
        }

        this.segs = [seg1, seg2];
        this.pts = [this.L, pt2, this.R];
    };


    /*** Utility funcitons ***/

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


    pub.Drawing = function (r, p ) {
        this.r = r;
        this.figures = {};

        if ( p !== undefined ) {
            for ( var prop in p ) {
                if ( p.hasOwnProperty ( prop ) ) {
                    this.figures[prop] = p[prop];
                }
                
            }
        }

    };

    pub.Drawing.prototype.newPoint = function ( x, y, id ) {
        if ( this.get ( id ) !== undefined ) {
            throw "Figure name already in use: " + id;
        } else {
            this.figures[id] = new pub.Point ( x, y, id );
            return this.figures[id];
        }
    };


    // segments are identified either by the endpoints or, if endpoints
    // are not particularly meaningful, an optional identifier
    pub.Drawing.prototype.newSegment = function ( pt1, pt2, id ) {
        if ( id === undefined ) {
            id = pt1 + pt2;
        }

        if ( this.get ( id ) !== undefined ) {
            throw "Figure name already in use: " + id;
        } else {
            var newseg = new pub.Segment ( this.get ( pt1 ),
                                           this.get ( pt2 ) );
            this.figures[id] = newseg;
            this.figures[id.split("").reverse().join("")] = newseg;

            return this.figures[id];
        }
    };

    pub.Drawing.prototype.newCircle = function ( center, rad, id ) {
        if ( this.get ( id ) !== undefined ) {
            throw "Figure name already in use: " + id;
        } else {
            this.figures[id] = new pub.Circle ( this.get ( center ),
                                                this.get ( rad ).length );
            return this.figures[id];
        }
    };

    pub.Drawing.prototype.newTriangle = function ( v1, v2, v3, id ) {
        if ( id === undefined ) {
            id = v1 + v2 + v3;
        }

        if ( this.get ( id ) !== undefined ) {
            throw "Figure name already in use: " + id;
        } else {
            this.figures[id] = new pub.Triangle ( this.get ( v1 ),
                                                  this.get ( v2 ),
                                                  this.get ( v3 ) );
            try {
                this.newSegment( v1, v2 );
            } catch (e) {}

            try {
                this.newSegment( v1, v3 );
            } catch (e) {}

            try {
                this.newSegment( v2, v3 );
            } catch (e) {}
        }
    };


    pub.Drawing.prototype.newAngle = function ( v1, v2, v3, id ) {
        if ( id === undefined ) {
            id = "<" + v1 + v2 + v3;
        }

        if ( this.get ( id ) !== undefined ) {
            throw "Figure name already in use: " + id;
        } else {
            this.figures[id] = new pub.Angle ( this.get ( v1+v2 ),
                                               this.get ( v2+v3 ),
                                               this.get ( v2 ) );
        }


    };


    // the third param is the identifier to be used for the intersection point
    pub.Drawing.prototype.findCircleInter = function ( c1, c2, id ) {
        if ( this.get ( id ) !== undefined ) {
            throw "Figure name already in use: " + id;
        } else {
            var Lcirc, Rcirc,
                circ1 = this.get ( c1 ),
                circ2 = this.get ( c2 );

            if ( circ1.cx <= circ2.cx ) {
                Lcirc = circ1;
                Rcirc = circ2;
            } else {
                Lcirc = circ2;
                Rcirc = circ1;
            }

            var btwn_centers = new pub.Segment ( Lcirc.center, Rcirc.center );

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

            // finally get the coords of the top intersection (since there are
            // generally two)
            var interPtX = cLineX + y*Math.sin(cLineAng),
                interPtY = cLineY - y*Math.cos(cLineAng);

            return this.newPoint ( interPtX, interPtY, id );
        }
    };

    pub.Drawing.prototype.extendSegment = function ( seg, len, extpt ) {
        var endpt = seg.slice(1);

        var delta = this.get ( seg ).getChangePerLength ( seg );
        var extendpt = this.newPoint ( this.get(endpt).x + len * delta[0], 
                                       this.get(endpt).y + len * delta[1],
                                       extpt );

        this.newSegment ( endpt, extpt );
        return this.newSegment ( seg.charAt(0), extpt );
    };

    pub.Drawing.prototype.findCircCenterSegInter = function ( c, seg, intpt ) {
        var delta = this.get ( seg ).getChangePerLength ( seg );
        var circ = this.get ( c );
        var interY = circ.cy + circ.rad * delta[1],
            interX = circ.cx + circ.rad * delta[0];

        return  this.newPoint ( interX, interY, intpt );
    };


    pub.Drawing.prototype.show = function ( id, stroke ) {
        var fig = this.get ( id );
        if ( !fig.display ) {
            if ( fig instanceof pub.Point ) {

                var attr = {fill: "#000"};
                fig.display = this.r.circle(fig.x, fig.y, 2).attr(attr);

            } else if ( fig instanceof pub.Segment ) {

                var pt2String = function( pt ) {
                    return pt.x+", "+pt.y;
                };

                var path = "M"+pt2String(fig.A)+"L"+pt2String(fig.B),
                    attr = {
                        "stroke-width": 2,
                        "stroke": stroke || "#000"
                    };
                
                fig.display = this.r.path(path).attr(attr);

            } else if (fig instanceof pub.Circle ) {

                var attr = {
                    "stroke-width": 2,
                    "stroke": stroke || "#000"
                };

                fig.display = this.r.circle(fig.cx, fig.cy, fig.rad).attr(attr);

            } else if ( fig instanceof pub.Angle ) {

                var seg1_id = id.slice ( 1, 3).split("").reverse().join("");
                var seg2_id = id.slice ( 2 );

                var seg1 = this.get ( seg1_id );
                var seg2 = this.get ( seg2_id );

                var cpl0 = seg1.getChangePerLength(seg1_id),
                    cpl1 = seg2.getChangePerLength(seg2_id);

                var rad = 13;
                var vert = this.get ( id.charAt(2) );
                var startx = vert.x + cpl0[0] * rad,
                    starty = vert.y + cpl0[1] * rad,
                    endx = vert.x + cpl1[0] * rad,
                    endy = vert.y + cpl1[1] * rad;
                var path = "M"+startx+","+starty;
                path += "A"+rad+","+rad + " 0 0,0 ";
                path += endx+","+endy ;
                var attr = {
                        "stroke-width": 3,
                        "stroke": stroke || "#000"
                    };
                fig.display = this.r.path(path).attr(attr);
            }

        } else {
            fig.display.show();
        }
    };


    pub.Drawing.prototype.hide = function( id ) {
        var fig = this.get ( id );
        if ( fig.display ) {
            fig.display.hide();
        }
    };


    pub.Drawing.prototype.get = function ( id ) {
        return this.figures[id];
    };

    pub.Drawing.prototype.destroy = function ( id ) {
        delete this.figures[id];
    };

    pub.Drawing.prototype.getRandomId = function () {
        var rand;
        do {
            rand = "anon"+ Math.floor ( Math.random() * 1000 );
        } while ( this.get ( rand ) !== undefined);

        return rand;
    };


    /*** Proposition logic ***/

    // takes a segment and returns the additional segments that make up the 
    // equilateral triangle on the input segment
    pub.Drawing.prototype.Prop1 = function ( seg, otherpt ) {
        // get the ids of two endpoints
        var endpts = this.get ( seg ).endpoints;
        var r1 = this.getRandomId(),
            r2 = this.getRandomId();

        this.newCircle ( endpts[0], seg, r1);
        this.newCircle ( endpts[1], seg, r2);
        this.findCircleInter ( r1, r2, otherpt);
        this.newSegment ( endpts[0], otherpt);
        this.newSegment ( endpts[1], otherpt);
        this.destroy ( r1 );
        this.destroy ( r2 );
        return [endpts[0]+otherpt, endpts[1]+otherpt];
    };

    pub.Drawing.prototype.Prop2 = function ( seg, moveto, otherpt ) {
        var L = this.get ( this.get(seg).endpoints[0] ),
            R = this.get ( this.get(seg).endpoints[1] );
        var mvpt = this.get(moveto);

        this.newPoint ( mvpt.x + (R.x - L.x), mvpt.y + (R.y - L.y), otherpt );
        return this.newSegment ( moveto, otherpt );
    };


    // return globally
    return pub;

});

