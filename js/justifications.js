// Based on http://ignorethecode.net/blog/2010/04/20/footnotes/
define(["jquery"], function( $ ) {
    return {
    footnotetimeout: false,

    setup: function() {
        var footnotelinks = $("p > a[href^='#postulate']")
        
        footnotelinks.unbind('mouseover',this.footnoteover);
        footnotelinks.unbind('mouseout',this.footnoteoout);
        
        footnotelinks.bind('mouseover',this.footnoteover);
        footnotelinks.bind('mouseout',this.footnoteoout);
    },

    footnoteover: function() {
        clearTimeout(this.footnotetimeout);
        $("#popupdiv").stop();
        $("#popupdiv").remove();
        
        var id = $(this).attr('href').substr(1);
        var position = $(this).offset();
    
        var div = $(document.createElement('div'));
        div.attr('id','popupdiv');
        div.bind('mouseover',this.divover);
        div.bind('mouseout',this.footnoteoout);

        var el = document.getElementById(id);
        var divtext = (function(a) { 
            return a.charAt(0).toUpperCase() + a.slice(1);
            })( id.replace ( '-', ' ' ) );
        div.html(divtext);
        
        div.css({
            position:'absolute',
            opacity:0.9
        });
        $(document.body).append(div);

        var left = position.left;
        if(left + 420  > $(window).width() + $(window).scrollLeft())
            left = $(window).width() - 420 + $(window).scrollLeft();
        var top = position.top+20;
        if(top + div.height() > $(window).height() + $(window).scrollTop())
            top = position.top - div.height() - 15;
        div.css({
            left:left,
            top:top
        });
    },

    footnoteoout: function() {
        this.footnotetimeout = setTimeout(function() {
            $("#popupdiv").animate(
                { opacity: 0 },
                600,
                function() {
                    $("#popupdiv").remove();
                });
        },100);
    },

    divover: function() {
        clearTimeout(this.footnotetimeout);
        $("#popupdiv").stop();
        $("#popupdiv").css({
                opacity: 0.9
        });
    }

    } // return
});
