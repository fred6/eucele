// Based on http://ignorethecode.net/blog/2010/04/20/footnotes/
define(["jquery"], function( $ ) {
    var j = {};
    j.popuptimeout = false;

    j.setup = function() {
        $("p").on("click", "span.proofstep", j.linkover);
    };

    j.linkover = function() {
        clearTimeout(j.popuptimeout);
        $("#popupdiv").stop();
        $("#popupdiv").remove();

        $(".activestep").removeClass('activestep');
        $(this).addClass('activestep');
        
        var c, id,
            classlist = $(this).attr('class').split(' ');

        for ( c = 0; c < classlist.length; c++ ) {
            if ( classlist[c].substring(0, 2) === "e_" ) {
                id = [classlist[c].substring ( 2, 6 ),
                      "-",
                      classlist[c].substring( 6 )].join('');
            }
        }

        var position = {
            top: $(this).offset().top,
            left: $('div#container').offset().left
        };
    
        var div = $(document.createElement('div'));
        div.attr('id','popupdiv');
        div.html($("#"+id).html());
        $(document.body).append(div);

        div.css({
            left: position.left - 190,
            top: position.top
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

    return j;
});
