# Preface

This page/site/book/hypertext learning document, both words and code, is licensed under [CC-0](http://creativecommons.org/publicdomain/zero/1.0/). You can find all files on [github](https://github.com/fred6/eucele), discuss issues, submit pull requests, fork it, whatev.

The colors are heavily inspired by [Oliver Byrne's version of the Elements](http://www.math.ubc.ca/~cass/Euclid/byrne.html) (the colors themselves are a direct ripoff, but I've used them in different ways). I've also made use of [Richard Fitzpatrick's translation of the Elements](http://farside.ph.utexas.edu/euclid.html), as well as [D.E. Joyce's site on the Elements](http://aleph0.clarku.edu/~djoyce/java/elements/bookI/bookI.html), which is, of course, the original web adaptation of Euclid. [Proof Wiki's presentation](http://www.proofwiki.org/wiki/ProofWiki:Books/Euclid/The_Elements) has been useful as well.

A word to math aficionados: I'm clearly not aiming for absolute rigor here (c.f. my section of definitions for lines, where I describe lines as "curvy" without defining what that means). There are deeper problems with Euclid's postulates, and anyway others far more competent than I have cleaned all this up (see [Hilbert's *Foundations of Geometry*](http://en.wikipedia.org/wiki/Hilbert's_axioms)).

# Introduction

Some wise words go here. 2000 year old book. blah blah.

I use "■" to indicate that a proof is over. This is called a [halmos or tombstone](http://en.wikipedia.org/wiki/Tombstone_(typography)). This is used in place of [QED](http://en.wikipedia.org/wiki/Q.E.D.)

# Book 1
## Definitions
### Point
A **point** is an entity with position but not magnitude.

### Lines
A **line** is a length without width or height. Some lines are curvy (like, as  we shall see, the perimeter of a circle), but lines that are not curvy are **straight lines**. 

The endpoints of a line are points.

## Postulates
### Postulate 1
A line segment can be drawn between any two points.

### Postulate 2
Any line segment can be extended arbitrarily.

### Postulate 3
Given a point A and another point B, a circle can be drawn with center at point A and with radius equal to the segment between A and B.

### Postulate 4
All right angles are equal to one another.

### Postulate 5
### Postulate discussion
Significance of the axiomatic method in general (I'm not qualified for this probably). We have 3 construction axioms, which really means that, in this book, we have a compass and a straight edge. (But notice, due to prop. 2, that we can't reliably preserve distance via the compass when we pick it up from the paper. Otherwise we would immediately have the ability to draw a line of length equal to **Line 1** at an arbitrary point **C**.

Should cover the infamous postulate 5 as well. Everything up to postulate 29 can be considered "neutral geometry", because none of it utilizes postulate 5. In fact, we could almost split Euclid's Book 1 into two books: 1-28 is Neutral plane geometry, and 29+ is euclidean plane geometry.

## Common Notions
## Propositions
### Proposition 1
Given a straight line segment **AB**, we can construct an equilateral triangle with that segment as one of the sides.

<div id="Rprop1" class="raph_container"></div>

#### Proof
[We can draw a circle with center at **A** and a radius of **AB**.](#postulate-3) [We can also draw a circle with center at **B** and the same radius.](#postulate-3) [The two circles intersect at a point, call it **C**.](#note-1)

[Now we can draw a straight line segment between **A** and **C**,](#postulate-1) and [another between **B** and **C**.](#postulate-1) ■

Euclid doesn't really prove that the two circles must intersect, he basically assumes it. You need an additional postulate to cover this.


### Proposition 2
Given a line segment and a point, we can construct a line segment of equal length to the original segment at the point.

<div id="Rprop2" class="raph_container"></div>

#### Proof
Arbitrarily select one of the endpoints, say, **B**. We can draw a line segment between **B** and **C** and then use that segment as a base for an equilateral triangle. Let's call the other point in the triangle (the one not **B** or **C**) **D**.

First we'll draw a circle, call it **X**, centered at **B** with radius of **AB**. Now extend **DB** to some arbitrary point past circle **X**. We can find the intersection of this line and **X**, call it point **E**.

**DE** can now be used as the radius for a circle centered at **D**.
