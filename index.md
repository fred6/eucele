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
<span id="prop1_1" class="proofstep e_post3">We can draw a circle with center at **A** and a radius of **AB**.</span> <span id="prop1_2" class="proofstep e_post3">We can also draw a circle with center at **B** and the same radius.</span> <span id="prop1_3" class="proofstep e_note1">The two circles intersect at a point, call it **C**.</span>

<span id="prop1_4" class="proofstep e_post1">Now we can draw a straight line segment between **A** and **C**,</span> and <span id="prop1_5" class="proofstep e_post1">another between **B** and **C**.</span> ■


### Proposition 2
Given a line segment **AB** and a point **C**, we can construct a line segment of equal length to the original segment at the point.

<div id="Rprop2" class="raph_container"></div>

#### Proof
Arbitrarily select one of the endpoints, say, **B**. <span id="prop2_1" class="proofstep e_post1">We can draw a line segment between **B** and **C**</span> and then <span id="prop2_2" class="proofstep e_prop1">use that segment as a base for an equilateral triangle.</span> Let's call the other point in the triangle (the one not **B** or **C**) **D**.

<span id="prop2_3" class="proofstep e_post3">First we'll draw a circle, call it **X**, centered at **B** with radius of **AB**.</span> <span id="prop2_4" class="proofstep e_post2">Now extend **DB** to some arbitrary point past circle **X**.</span> <span id="prop2_5" class="proofstep e_note2">We can find the intersection of this line and **X**, call it point **E**.</span>

We don't quite have a notion of length, but if we did, notice that we would be able to say that length(**DE**) = length(**DB**) + length(**AB**). Since our aim is to draw a line with length equal to **AB** at point **C**, we could achieve this by somehow cutting off a section equal in length to **DB** from a line equal in length **DE** as long as the line passes through **C** appropriately. The good news is that we have a line equal in length to **DB** (actually, we have two of them, remember the equilateral triangle we built earlier). So <span id="prop2_6" class="proofstep e_post3">**DE** can now be used as the radius for a circle, call it circle **Y**,  centered at **D**.</span>

Furthermore, <span id="prop2_7" class="proofstep e_post2">we can extend **DC** past circle **Y**</span> and <span id="prop2_8" class="proofstep e_note2">find the intersection of this extended line and **Y**</span> (like we did with the circle **X**). Calling this intersection point **F**, we know that **DF** is the same length as **DE** (they are radii for the same circle). We also know that they both have a subsegment of equal lengths: **DB** and **DC** are sides of an equilateral triangle, and they are subsegments of **DE** and **DF**, respectively. By throwing these subsements away, the remainders **BE** and **CF** are equal in length. Since **BE** is the same length as **AB** (they are, again, radii for the same circle), we have constructed a line equal in length to **AB** at point **C**. ■

### Proposition 3
Given two line segments, **AB** and **CD** of unequal length, we can cut off from the greater a line equal to the lesser.

<div id="Rprop3" class="raph_container"></div>

#### Proof
Suppose **AB** longer. If we pick one of the endpoints of **CD** arbitrarily, say **C**, then <span id="prop3_1" class="proofstep e_prop2">we can draw a line **CE** equal in length to **AB** at **C**.</span>

<span id="prop3_2" class="proofstep e_post3">Now we can draw the circle at **C** with radius **CD**.</span> <span id="prop3_3" class="proofstep e_note2">This circle intersects  **CE** at a point, call it **F**.</span> The segment **CF** is the desired line. ■


### Proposition 4
Given two triangles, **ABC** and **DEF**, with **AB** the same length as **DE**, **BC** the same length as **EF**, and angle **∠ABC** equal to **∠DEF**, then the triangles are congruent.

<div id="Rprop4" class="raph_container"></div>

#### Proof
<span id="prop4_1" class="proofstep e_note3">Place triangle **ABC** on **DEF** so that **B* coincides with **E** and **AB** coincides with **DE**.</span>


<div id="post-1" style="display: none">**Postulate 1** - A line segment can be constructed between any two points.</div>

<div id="post-2" style="display: none">**Postulate 2** - A line segment can be extended indefinitely.</div>

<div id="post-3" style="display: none">**Postulate 3** - Given a radius, a circle centered at any given point can be constructed.</div>

<div id="prop-1" style="display: none">**Proposition 1** - Given a line segment, we can construct an equilateral triangle with the segment as one of the sides.</div>

<div id="prop-2" style="display: none">**Proposition 2** - Given a line segment, we can construct an equal line at an arbitrary given point.</div>

<div id="note-0" style="display: none">Given.</div>

<div id="note-1" style="display: none">Euclid doesn't really prove that the two circles must intersect, he basically assumes it. You need an additional postulate to cover this.</div>

<div id="note-2" style="display: none">I'm not sure if this is technically proved, but it's kind of obvious, since we *built* the line so that it would intersect the circle. If it's not rigorously proved, it's a technicality not worth paying attention to.</div>

<div id="note-3" style="display: none">**Superposition** - Euclid infamously doesn't axiomatize this operation. There is no explanation given for what, exactly, placing one figure on another means, nor is there any justification given for its validity. Hilbert proves proposition 4 essentially by assuming it to be true. The description given by Euclid is very intuitive-sounding, at least.</div>


# Resources
![Placeholder dog is disappointed](/img/placeholder_dog.jpg)
Placeholder dog is disappointed that this section isn't complete yet.
