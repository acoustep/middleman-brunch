exports.config = {
    overrides: {
        production: {
            paths: {
                public: "build"
            }
        }
    },
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: "javascripts/all.js"
    },
    stylesheets: {
      joinTo: "stylesheets/site.css",
      order: {
        after: ["source/stylesheets/site.css.scss"] // concat app.css last
      }
    },
    templates: {
      joinTo: "javascripts/all.js"
    }
  },

  conventions: {
    assets: /^(source\/assets)/
  },

  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "source/javascripts",
      "source/stylesheets",
      "source/assets",
      "test/static"
    ],

    // Where to compile files to
    public: ".tmp/dist"
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/source\/vendor/],
            presets: ['es2015', 'es2016']
    },
    sass: {
      debug: 'comments',
      options: {
        includePaths: [
        ], // tell sass-brunch where to look for files to @import
        precision: 8 // minimum precision required by bootstrap-sass
      }
    },
    copycat: {
      "fonts": [
      ] 
    }
  },

  modules: {
    autoRequire: {
      "javascripts/all.js": ["source/javascripts/all"]
    }
  },
  npm: {
    enabled: true,
    whitelist: [
    ],
    globals: {
      $: 'jquery',
      jQuery: 'jquery'
    }
  }
};
