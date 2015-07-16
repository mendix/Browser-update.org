/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console, document, jQuery */
/*mendix */
/*
    BrowserUpdate.Org
    ========================

    @file      : BrowserUpdate.Org.js
    @version   : 1.0
    @author    : Roeland Salij
    @date      : Thu, 16 Jul 2015 10:05:18 GMT
    @license   : Apache V2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 
	'BrowserUpdate/lib/update.min',
    'dojo/text!BrowserUpdate/widget/template/BrowserUpdate.html'
], function (declare, _WidgetBase, _TemplatedMixin, dom, browserupdate, widgetTemplate) {
    'use strict';

    // Declare widget's prototype.
    return declare('BrowserUpdate.widget.BrowserUpdate', [_WidgetBase, _TemplatedMixin], {

		//widget properties
		isTest:false,
		
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,
      

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + '.postCreate');
            this._updateRendering();
            
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {},

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {},

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {},

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        // Rerender the interface.
        _updateRendering: function () {
			
			var ieversionNr = this._parseVersion('ie',this.ieversion);
			var ffversionNr = this._parseVersion('ff',this.ffversion);			
			var opversionNr = this._parseVersion('op',this.opversion);
			var saversionNr = this._parseVersion('sa',this.saversion);
			
			browserupdate.isTestMode(this.isTest);
			browserupdate.update({vs:{i:ieversionNr,f:ffversionNr,o:opversionNr,s:saversionNr},c:2});
        },
		
		_parseVersion :function (browser, versionnr) {
			
			versionnr = parseInt(versionnr.substring(1));
			if(browser !== 'ie' && browser !== 'ff')	{
				if(versionnr>10)
					versionnr = versionnr / 10;
			}
			return versionnr;
				
		}
        
    });
});
require(['BrowserUpdate/widget/BrowserUpdate'], function () {
    'use strict';
});