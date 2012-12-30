// Based on http://ignorethecode.net/blog/2010/04/20/footnotes/
define(["jquery"], function( $ ) {
    var j = {};
    j.footnotetimeout = false;

    j.setup = function() {
        var footnotelinks = $("p > a[href^='#postulate']")
        
        footnotelinks.unbind('mouseover',j.footnoteover);
        footnotelinks.unbind('mouseout',j.footnoteoout);
        
        footnotelinks.bind('mouseover',j.footnoteover);
        footnotelinks.bind('mouseout',j.footnoteoout);
    };

    j.footnoteover = function() {
        clearTimeout(j.footnotetimeout);
        $("#popupdiv").stop();
        $("#popupdiv").remove();
        
        var id = $(this).attr('href').substr(1);
        var position = $(this).offset();
    
        var div = $(document.createElement('div'));
        div.attr('id','popupdiv');
        div.bind('mouseover',j.divover);
        div.bind('mouseout',j.footnoteoout);

        var el = document.getElementById(id);
        var divtext = (function(a) { 
            return a.charAt(0).toUpperCase() + a.slice(1);
            })( id.replace ( '-', ' ' ) );
        div.html(divtext);
        
        $(document.body).append(div);

        var left = position.left;
        if(left + 420  > $(window).width() + $(window).scrollLeft())
            left = $(window).width() - 420 + $(window).scrollLeft();
        var top = position.top+20;
        if(top + div.height() > $(window).height() + $(window).scrollTop())
            top = position.top - div.height() - 15;
        div.css({
            left: left,
            top: top,
            opacity: 0.9
        });
    };

    j.removePopup = function() {
        $("#popupdiv").animate(
            { opacity: 0 },
            600,
            function() {
                $("#popupdiv").remove();
            }
        );
    };

    j.footnoteoout = function() {
        j.footnotetimeout = setTimeout ( function() { j.removePopup() }, 100 );
    };


    j.divover = function() {
        clearTimeout(j.footnotetimeout);
        $("#popupdiv").stop();
        $("#popupdiv").css({ opacity: 0.9 });
    };

    return j;
});
