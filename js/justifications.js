// Based on http://ignorethecode.net/blog/2010/04/20/footnotes/
define(["jquery"], function( $ ) {
    var j = {};
    j.popuptimeout = false;

    j.setup = function() {
        var popup_links = $("p > a[href^='#post'], p > a[href^='#prop']")
        
        popup_links.unbind('mouseover',j.linkover);
        popup_links.unbind('mouseout',j.linkout);
        
        popup_links.bind('mouseover',j.linkover);
        popup_links.bind('mouseout',j.linkout);
    };

    j.linkover = function() {
        clearTimeout(j.popuptimeout);
        $("#popupdiv").stop();
        $("#popupdiv").remove();
        
        var id = $(this).attr('href').substr(1);
        var position = $(this).offset();
    
        var div = $(document.createElement('div'));
        div.attr('id','popupdiv');
        div.bind('mouseover',j.divover);
        div.bind('mouseout',j.linkout);

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

    j.linkout = function() {
        j.popuptimeout = setTimeout ( function() { j.removePopup() }, 100 );
    };


    j.divover = function() {
        clearTimeout(j.popuptimeout);
        $("#popupdiv").stop();
        $("#popupdiv").css({ opacity: 0.9 });
    };

    return j;
});
