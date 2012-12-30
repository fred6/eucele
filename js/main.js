requirejs.config({
    paths: { 
        /* Load jquery from google cdn. On fail, load local file. */
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min','libs/jquery-1.8.3.min'],

        'raphael': 'libs/raphael.amd',
        'raphael.core': 'libs/raphael.core',
        'raphael.svg': 'libs/raphael.svg',
        'raphael.vml': 'libs/raphael.vml',
        'eve': 'libs/eve'
    },
    shim: {
        'raphael': {
            exports: 'Raphael'
        }
    }
});

require(["app"],
    function( app ) {
        app.start();
    });
