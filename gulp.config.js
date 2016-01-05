/**
 * Created by dsmith on 1/30/15.
 */

module.exports = function () {
    var sourceDir = "./www/";
    var bower = "./www/lib/";
    var addons = "./www/addons/";
    var build = "./dist/";
    var root = './';
    var temp = "./tmp/";

    var config = {
        /* Directory Locations */
        root: root,
        build: build,
        source: sourceDir,
        temp: temp,
        addons: addons,

        /*Extension & File locations*/

        index: sourceDir + 'index.html',

        fonts: [
            bower + 'ionic/fonts/*.*'
        ],

        images: [sourceDir + 'img/**/*.*'],

        srcjs: [
            sourceDir + "**/*.build.js",
            sourceDir + "**/*.module.js",
            sourceDir + "**/*.js",
            //Exclude Example
            "!" + addons + "/**/*.*",
            "!" + bower + "**/*.*"

        ],

        addonjs: addons + "/**/*.js",

        distjs: [
            temp + "*.js",
            temp + "**/*.js"
            //Exclude Example
            // "!" + sourceDir + "**/*.spec.js"

        ],

        html: [
            sourceDir + '**/*.html',
            '!' + bower + '**/*.html'
        ],

        css: [
        //    bower + 'cyracom-templates/dist/css/*.*',
        //    '!' + bower + 'cyracom-templates/dist/css/*.min.css',
            temp + "**/*.css"
        ],

        addoncss: addons + "**/*.css",

        less: {
            compile: [
                sourceDir + 'less/**/*.less'
            ],
            watch: sourceDir + '**/*.less'
        }
        ,

        /* FOR Wire Dep */

        bower: {
            files: [
                bower + '**/*.js',
                bower + '**/*.min.js',
                bower + '**/**.map',
                bower + '**/*.css'
            ],
            json: require('./bower.json'),
            dir: bower,
            ignorePath: '.'
        },

        /*Package information for version*/
        packages: [
            root + 'package.json',
            root + 'bower.json'
        ],

        /*Angular Template Cache Configurations*/
        templates: {
            file: "templates.js",
            options: {
                module: 'app',
                standAlone: false,
                root: ""

            }
        }
    };

    config.getWireDepDevOptions = function () {
        return {
            bowerJson: config.bower.json,
            directory: config.bower.dir
        };
    };

    config.getWireDepBuildOptions = function () {
        return {
            bowerJson: config.bower.json,
            directory: config.bower.dir,
            ignorePath: config.bower.ignorePath
        };
    };
    return config;
}
;
