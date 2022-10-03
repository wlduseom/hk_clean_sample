sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
	"sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, library, Fragment) {
        "use strict";

        // shortcut for sap.f.DynamicPageTitleArea
	    var DynamicPageTitleArea = library.DynamicPageTitleArea;

        return Controller.extend("sap.sync.project1.controller.View1", {
            onInit: function () {

                var sampleData = {
                    rooms : [
                        {
                            roomFloor : 1, roomNum : 101, roomType : "SSTSGM", roomCondition : "청소필요"
                        },
                        {
                            roomFloor : 1, roomNum : 102, roomType : "SSTSGM", roomCondition : "이용중"
                        },
                        {
                            roomFloor : 1, roomNum : 103, roomType : "SSTSGM", roomCondition : "이용가능"
                        }
                    ]
                };

                var oModel = new JSONModel(sampleData);
                this.getView().setModel(oModel);

            },
            getPage : function() {
                return this.byId("dynamicPageId");
            },
            onToggleFooter: function () {
                this.getPage().setShowFooter(!this.getPage().getShowFooter());
            },
            toggleAreaPriority: function () {
                var oTitle = this.getPage().getTitle(),
                    sNewPrimaryArea = oTitle.getAreaShrinkRatio();
                oTitle.setAreaShrinkRatio(sNewPrimaryArea);
            },
            onPressOpenPopover: function (oEvent) {
                var oView = this.getView(),
                    oSourceControl = oEvent.getSource();
    
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "sap.sync.project1.view.Card"
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
    
                this._pPopover.then(function (oPopover) {
                    oPopover.openBy(oSourceControl);
                });
            },

            onCollapseExpandPress: function () {
                var oSideNavigation = this.byId("sideNavigation");
                var bExpanded = oSideNavigation.getExpanded();
    
                oSideNavigation.setExpanded(!bExpanded);
            },

        });
    });