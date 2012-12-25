requirejs.config({
    paths: { 
        /* Load jquery from google cdn. On fail, load local file. */
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min','libs/jquery-min'],

        /* Load bootstrap from cdn. On fail, load local file. */
        'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min','libs/bootstrap-min'],

        'raphael': 'libs/raphael.amd',
        'raphael.core': 'libs/raphael.core',
        'raphael.svg': 'libs/raphael.svg',
        'raphael.vml': 'libs/raphael.vml',
        'eve': 'libs/eve'
    },
    shim: {
        'bootstrap' : ['jquery'],

        'raphael': {
            exports: 'Raphael'
        }
    }
});

require(["bootstrap", "app"],
    function( Bootstrap, app ) {
        app.start();
    });
