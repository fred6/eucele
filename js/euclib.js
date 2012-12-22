var euclib = function(Raphael, raph) {
  return (function(Raphael, r, undefined) {

    var public = {};

    public.Point = function(x, y) {
        this.x = x;
        this.y = y;
    };

    public.Point.prototype.draw = function() {
        this.display = r.circle(this.x, this.y, 2).attr({fill: "#000"});
    };

    public.Segment = function(pt1, pt2) {
        // ugly, but some other logic depends on left-most being the first point
        if(pt1.x <= pt2.x) {
            this.A = pt1;
            this.B = pt2;
        } else {
            this.A = pt2;
            this.B = pt1;
        }

        this.length = Math.sqrt(Math.pow(this.B.x - this.A.x, 2)
                              + Math.pow(this.B.y - this.A.y, 2));
    };

    public.Segment.prototype.draw = function() {
        var pt2String = function(pt) {
            return pt.x+", "+pt.y;
        };

        this.display = r.path("M"+pt2String(this.A)+"L"+pt2String(this.B));
    };

    public.Circle = function(point, rad) {
        this.center = point;
        this.cx = point.x;
        this.cy = point.y;
        this.rad = rad;
    };


    public.Circle.prototype.draw = function() {
        this.display = r.circle(this.cx, this.cy, this.rad);
    };

    public.CircFromSeg = function(segment, endpoint) {
        if(endpoint === "A") {
            return new public.Circle(segment.A, segment.length);
        } else {
            return new public.Circle(segment.B, segment.length);
        }
    };

    public.FindCircsIntersection = function(circ1, circ2) {
        var Lcirc, Rcirc;

        if(circ1.cx <= circ2.cx) {
            Lcirc = circ1;
            Rcirc = circ2;
        } else {
            Lcirc = circ2;
            Rcirc = circ1;
        }

        var btwn_centers = new public.Segment(Lcirc.center, Rcirc.center);

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

        var cLinePt = new public.Point(cLineX, cLineY);

        var interPtX = cLinePt.x + y*Math.sin(cLineAng),
            interPtY = cLinePt.y - y*Math.cos(cLineAng);

        var interPt = new public.Point(interPtX, interPtY);

        return interPt;
    };

    return public;

  })(Raphael, raph);
};
