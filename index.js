/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-d3',

  included: function(app) {
    this._super.included(app);
    if (process.env.EMBER_CLI_FASTBOOT !== 'true') {
      // In nested addons, app.bowerDirectory might not be available
      var d3Path = 'vendor/d3';
      // In ember-cli < 2.7, this.import is not available, so fall back to use app.import
      var importShim = typeof this.import !== 'undefined' ? this : app;

      app.import(path.join(d3Path, 'd3.js'));
      importShim.import('vendor/ember-d3/ember-d3-shim.js', {
        exports: {
          d3: ['default']
        }
      });
    }
  },

  treeForVendor: function() {
    var trees = [];
    var highchartsPath = path.dirname(require.resolve('d3'));

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(new Funnel(vendorTree, {
      destDir: 'd3'
    }));

    return mergeTrees(trees);
  }
};
