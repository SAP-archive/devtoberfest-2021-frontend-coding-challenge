/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxTextField","./ComboBoxBaseRenderer","./SuggestionsPopover","sap/ui/base/ManagedObjectObserver","sap/ui/core/SeparatorItem","sap/ui/core/InvisibleText","sap/ui/base/ManagedObject","sap/base/Log","./library","sap/ui/Device","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/base/strings/escapeRegExp","sap/m/inputUtils/forwardItemProperties","sap/m/inputUtils/highlightDOMElements","sap/m/inputUtils/ListHelpers"],function(t,e,i,s,o,n,r,a,u,p,h,l,d,c,g,f,y,I){"use strict";var m=u.PlacementType;var b=["value","enabled","name","placeholder","editable","textAlign","textDirection","valueState","valueStateText"];var v=t.extend("sap.m.ComboBoxBase",{metadata:{library:"sap.m",abstract:true,defaultAggregation:"items",properties:{showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},open:{type:"boolean",defaultValue:false,hidden:true}},aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"}},events:{loadItems:{}},dnd:{draggable:false,droppable:true}},renderer:e});v.prototype.oncompositionend=function(e){t.prototype.oncompositionend.apply(this,arguments);if(!p.browser.firefox){this.handleInputValidation(e,this.isComposingCharacter())}};v.prototype.updateItems=function(t){this.bItemsUpdated=false;this.destroyItems();this.updateAggregation("items");this.bItemsUpdated=true;if(this.hasLoadItemsEventListeners()){if(this.isOpen()){I.fillList(this.getItems(),this._getList(),this._mapItemToListItem.bind(this));this.setRecreateItems(false)}this.onItemsLoaded()}};v.prototype.setFilterFunction=function(t){if(t===null||t===undefined){this.fnFilter=null;return this}if(typeof t!=="function"){a.warning("Passed filter is not a function and the default implementation will be used")}else{this.fnFilter=t}return this};v.prototype.highlightList=function(t){var e=[];e=this._getList().$().find(".sapMSLIInfo, .sapMSLITitleOnly");y(e,t)};v.prototype._decoratePopupInput=function(t){if(t){this.setTextFieldHandler(t)}return t};v.prototype.setTextFieldHandler=function(t){var e=this,i=t._handleEvent;t._handleEvent=function(t){i.apply(this,arguments);if(/keydown|sapdown|sapup|saphome|sapend|sappagedown|sappageup|input/.test(t.type)){e._handleEvent(t)}}};v.prototype.refreshItems=function(){this.bItemsUpdated=false;this.refreshAggregation("items")};v.prototype.loadItems=function(t,e){var i=typeof t==="function";if(this.hasLoadItemsEventListeners()&&this.getItems().length===0){this._bOnItemsLoadedScheduled=false;if(i){e=d.extend({action:t,busyIndicator:true,busyIndicatorDelay:300},e);this.aMessageQueue.push(e);if(this.iLoadItemsEventInitialProcessingTimeoutID===-1&&e.busyIndicator){this.iLoadItemsEventInitialProcessingTimeoutID=setTimeout(function t(){this.setInternalBusyIndicatorDelay(0);this.setInternalBusyIndicator(true)}.bind(this),e.busyIndicatorDelay)}}if(!this.bProcessingLoadItemsEvent){this.bProcessingLoadItemsEvent=true;this.fireLoadItems()}}else if(i){t.call(this)}};v.prototype.onItemsLoaded=function(){this.bProcessingLoadItemsEvent=false;clearTimeout(this.iLoadItemsEventInitialProcessingTimeoutID);if(this.bInitialBusyIndicatorState!==this.getBusy()){this.setInternalBusyIndicator(this.bInitialBusyIndicatorState)}if(this.iInitialBusyIndicatorDelay!==this.getBusyIndicatorDelay()){this.setInternalBusyIndicatorDelay(this.iInitialBusyIndicatorDelay)}for(var t=0,e,i,s;t<this.aMessageQueue.length;t++){e=this.aMessageQueue.shift();t--;s=t+1===this.aMessageQueue.length;i=s?null:this.aMessageQueue[t+1];if(typeof e.action==="function"){if(e.name==="input"&&!s&&i.name==="input"){continue}e.action.call(this)}}};v.prototype.hasLoadItemsEventListeners=function(){return this.hasListeners("loadItems")};v.prototype._scheduleOnItemsLoadedOnce=function(){if(!this._bOnItemsLoadedScheduled&&!this.isBound("items")&&this.hasLoadItemsEventListeners()&&this.bProcessingLoadItemsEvent){this._bOnItemsLoadedScheduled=true;setTimeout(this.onItemsLoaded.bind(this),0)}};v.prototype.getPickerInvisibleTextId=function(){return n.getStaticId("sap.m","COMBOBOX_AVAILABLE_OPTIONS")};v.prototype._getGroupHeaderInvisibleText=function(){if(!this._oGroupHeaderInvisibleText){this._oGroupHeaderInvisibleText=new n;this._oGroupHeaderInvisibleText.toStatic()}return this._oGroupHeaderInvisibleText};v.prototype._isListInSuggestMode=function(){return this._getList().getItems().some(function(t){return!t.getVisible()&&I.getItemByListItem(this.getItems(),t).getEnabled()},this)};v.prototype.getSelectable=function(t){return t._bSelectable};v.prototype._setItemsShownWithFilter=function(t){this._bItemsShownWithFilter=t};v.prototype._getItemsShownWithFilter=function(){return this._bItemsShownWithFilter};v.prototype.init=function(){t.prototype.init.apply(this,arguments);this.setPickerType(p.system.phone?"Dialog":"Dropdown");this._setItemsShownWithFilter(false);this.bItemsUpdated=false;this.bOpenedByKeyboardOrButton=false;this._bShouldClosePicker=false;this.bProcessingLoadItemsEvent=false;this.iLoadItemsEventInitialProcessingTimeoutID=-1;this.aMessageQueue=[];this.bInitialBusyIndicatorState=this.getBusy();this.iInitialBusyIndicatorDelay=this.getBusyIndicatorDelay();this._bOnItemsLoadedScheduled=false;this._bDoTypeAhead=true;this.getIcon().addEventDelegate({onmousedown:function(t){this._bShouldClosePicker=this.isOpen()}},this);this.getIcon().attachPress(this._handlePopupOpenAndItemsLoad.bind(this,true,this));this.fnFilter=null;var e=new s(function(t){var e=t.mutation;var i=t.child;var s={remove:"detachEvent",insert:"attachEvent"};var o={remove:"handleItemRemoval",insert:"handleItemInsertion"};if(!i[s[e]]||!this[o[e]]){return}i[s[e]]("_change",this.onItemChange,this);this.setRecreateItems(true);this[o[e]](i)}.bind(this));e.observe(this,{aggregations:["items"]})};v.prototype.handleItemRemoval=function(t){};v.prototype.handleItemInsertion=function(t){};v.prototype.setRecreateItems=function(t){this._bRecreateItems=t};v.prototype.getRecreateItems=function(){return this._bRecreateItems};v.prototype.onBeforeRendering=function(){var e=this.isOpen(),i=e?this._getSuggestionsPopover()._getValueStateHeader().getText():null,s=e?this._getSuggestionsPopover()._getValueStateHeader().getValueState():null;t.prototype.onBeforeRendering.apply(this,arguments);if(e&&(this.getValueStateText()&&i!==this.getValueStateText()||this.getValueState()!==s||this.getFormattedValueStateText())){this._updateSuggestionsPopoverValueState()}};v.prototype._handlePopupOpenAndItemsLoad=function(t,e){var i;if(!this.getEnabled()||!this.getEditable()){return}if(t&&this._getItemsShownWithFilter()){this._bShouldClosePicker=false;this.toggleIconPressedStyle(true);this.bOpenedByKeyboardOrButton=false;this.clearFilter();this._setItemsShownWithFilter(false);return}if(this._bShouldClosePicker){this._bShouldClosePicker=false;this.close();return}this.loadItems();this.bOpenedByKeyboardOrButton=t;if(this.isPlatformTablet()){this.syncPickerContent();i=this.getPicker();i.setInitialFocus(i)}if(e){i=this.getPicker();i&&i.setInitialFocus(e)}this.open()};v.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._getGroupHeaderInvisibleText()){this._getGroupHeaderInvisibleText().destroy();this._oGroupHeaderInvisibleText=null}if(this._oSuggestionPopover){this._oSuggestionPopover.destroy();this._oSuggestionPopover=null}clearTimeout(this.iLoadItemsEventInitialProcessingTimeoutID);this.aMessageQueue=null;this.fnFilter=null};v.prototype.onsapshow=function(t){if(!this.getEnabled()||!this.getEditable()){return}t.setMarked();if(t.keyCode===l.F4){this.onF4(t)}if(this._getItemsShownWithFilter()){this.loadItems(this._handlePopupOpenAndItemsLoad.bind(this,true));return}if(this.isOpen()){this.close();return}this.selectText(0,this.getValue().length);this.loadItems();this.bOpenedByKeyboardOrButton=true;this.open()};v.prototype.onF4=function(t){t.preventDefault()};v.prototype.onsapescape=function(e){if(this.getEnabled()&&this.getEditable()&&this.isOpen()){e.setMarked();e.preventDefault();this.close()}else{t.prototype.onsapescape.apply(this,arguments)}};v.prototype.onsaphide=v.prototype.onsapshow;v.prototype.onsapfocusleave=function(e){if(!e.relatedControlId){t.prototype.onsapfocusleave.apply(this,arguments);return}var i=sap.ui.getCore().byId(e.relatedControlId);if(i===this){return}var s=this.getPicker(),o=i&&i.getFocusDomRef();if(s&&h(s.getFocusDomRef(),o)){return}t.prototype.onsapfocusleave.apply(this,arguments)};v.prototype.getPopupAnchorDomRef=function(){return this.getDomRef()};v.prototype.addContent=function(t){};v.prototype.getList=function(){a.warning("[Warning]:","You are attempting to use deprecated method 'getList()', please refer to SAP note 2746748.",this);return this._getList()};v.prototype._getList=function(){var t=this._oSuggestionPopover&&this._oSuggestionPopover.getItemsContainer();if(this.bIsDestroyed||!t){return null}return t};v.prototype.setPickerType=function(t){this._sPickerType=t};v.prototype.getPickerType=function(){return this._sPickerType};v.prototype._updateSuggestionsPopoverValueState=function(){var t=this._getSuggestionsPopover();if(!t){return}var e=this.getValueState(),i=this.getValueState()!==t._getValueStateHeader().getValueState(),s=this.getFormattedValueStateText(),o=this.getValueStateText(),n=s||i;if(t.isOpen()&&!n){this.setFormattedValueStateText(t._getValueStateHeader().getFormattedText())}t.updateValueState(e,s||o,this.getShowValueStateMessage())};v.prototype.shouldValueStateMessageBeOpened=function(){var e=t.prototype.shouldValueStateMessageBeOpened.apply(this,arguments);return e&&!this.isOpen()};v.prototype.onPropertyChange=function(t,e){var i=t.getParameter("newValue"),s=t.getParameter("name"),o="set"+s.charAt(0).toUpperCase()+s.slice(1),n=e&&e.srcControl||this.getPickerTextField();if(this.getInputForwardableProperties().indexOf(s)>-1&&n&&typeof n[o]==="function"){n[o](i)}};v.prototype.getInputForwardableProperties=function(){return b};v.prototype.isPickerDialog=function(){return this.getPickerType()==="Dialog"};v.prototype.isPlatformTablet=function(){var t=!p.system.combi,e=p.system.tablet&&t;return e};v.prototype.getDropdownSettings=function(){return{showArrow:false,placement:m.VerticalPreferredBottom,offsetX:0,offsetY:0,bounce:false,ariaLabelledBy:this.getPickerInvisibleTextId()||undefined}};v.prototype._configureList=function(){};v.prototype.createPicker=function(t){var e=this.getAggregation("picker");if(e){return e}this._oSuggestionPopover=this._createSuggestionsPopover();e=this._oSuggestionPopover.getPopover();this.setAggregation("picker",e,true);this.configPicker(e);return e};v.prototype.configPicker=function(t){};v.prototype._hasShowSelectedButton=function(){return false};v.prototype._createSuggestionsPopover=function(){var t=new i(this);t.decorateParent(this);t.createSuggestionPopup(this,{showSelectedButton:this._hasShowSelectedButton()});this._decoratePopupInput(t.getInput());t.initContent(this.getId());this.forwardEventHandlersToSuggPopover(t);this._configureList(t.getItemsContainer());return t};v.prototype.forwardEventHandlersToSuggPopover=function(t){t.setOkPressHandler(this._handleOkPress.bind(this));t.setCancelPressHandler(this._handleCancelPress.bind(this));t.setInputLabels(this.getLabels.bind(this))};v.prototype._handleOkPress=function(){var t=this,e=t.getPickerTextField();t.updateDomValue(e.getValue());t.onChange();t.close()};v.prototype._handleCancelPress=function(){this.close();this.revertSelection()};v.prototype.setSelectable=function(t,e){if(this.indexOfItem(t)<0){return}t._bSelectable=e;var i=I.getListItem(t);if(i){i.setVisible(e)}};v.prototype.onBeforeOpen=function(){this._updateSuggestionsPopoverValueState();if(!this._getItemsShownWithFilter()){this.toggleIconPressedStyle(true)}};v.prototype.onBeforeClose=function(){this.bOpenedByKeyboardOrButton=false;this._setItemsShownWithFilter(false);this._updateSuggestionsPopoverValueState()};v.prototype.getPicker=function(){var t=this.getAggregation("picker");if(t&&!t.bIsDestroyed&&!this.bIsDestroyed){return t}return null};v.prototype._getSuggestionsPopover=function(){return this._oSuggestionPopover};v.prototype.getValueStateLinks=function(){var t=this.getPicker()&&this.getPicker().getCustomHeader()&&typeof this.getPicker().getCustomHeader().getFormattedText==="function",e=t&&this.getPicker().getCustomHeader().getFormattedText(),i=e&&e.getControls();return i||[]};v.prototype.getPickerTextField=function(){var t=this._getSuggestionsPopover();return t?t.getInput():null};v.prototype.getPickerTitle=function(){var t=this.getPicker(),e=t&&t.getCustomHeader();if(this.isPickerDialog()&&e){return e.getContentMiddle()[0]}return null};v.prototype.revertSelection=function(){};v.prototype.hasContent=function(){return this.getItems().length>0};v.prototype.syncPickerContent=function(){};v.prototype.open=function(){var t=this.getPicker();if(t){t.open()}return this};v.prototype.getVisibleItems=function(){return I.getVisibleItems(this.getItems())};v.prototype.isItemSelected=function(){};v.prototype.getKeys=function(t){t=t||this.getItems();for(var e=0,i=[];e<t.length;e++){i[e]=t[e].getKey()}return i};v.prototype.findItem=function(t,e){var i="get"+t.charAt(0).toUpperCase()+t.slice(1);for(var s=0,o=this.getItems();s<o.length;s++){if(o[s][i]()===e){return o[s]}}return null};v.prototype.getItemByText=function(t){return this.findItem("text",t)};v.prototype.clearFilter=function(){this.getItems().forEach(function(t){var e=I.getListItem(t);if(e){e.setVisible(t.getEnabled()&&this.getSelectable(t))}},this)};v.prototype.onItemChange=function(t,e){f({item:t.getSource(),propName:t.getParameter("name"),propValue:t.getParameter("newValue")},e)};v.prototype.clearSelection=function(){};v.prototype.setInternalBusyIndicator=function(t){this.bInitialBusyIndicatorState=this.getBusy();return this.setBusy.apply(this,arguments)};v.prototype.setInternalBusyIndicatorDelay=function(t){this.iInitialBusyIndicatorDelay=this.getBusyIndicatorDelay();return this.setBusyIndicatorDelay.apply(this,arguments)};v.prototype.getItemAt=function(t){return this.getItems()[+t]||null};v.prototype.getFirstItem=function(){return this.getItems()[0]||null};v.prototype.getLastItem=function(){var t=this.getItems();return t[t.length-1]||null};v.prototype.getEnabledItems=function(t){return I.getEnabledItems(t||this.getItems())};v.prototype.getItemByKey=function(t){return this.findItem("key",t)};v.prototype.addItemGroup=function(t,e,i){e=e||new o({text:r.escapeSettingsValue(t.text)||r.escapeSettingsValue(t.key)});this.addAggregation("items",e,i);if(this._getList()&&e.isA("sap.ui.core.SeparatorItem")){this._getList().addItem(this._mapItemToListItem(e))}return e};v.prototype.isOpen=function(){var t=this.getPicker();return!!(t&&t.isOpen())};v.prototype.close=function(){var t=this.getPicker();if(t){t.close()}return this};v.prototype.intersectItems=function(t,e){return t.filter(function(t){return e.map(function(t){return t.getId()}).indexOf(t.getId())!==-1})};v.prototype.showItems=function(t){var e=this.fnFilter,i=function(){if(!this.getItems().length){return}this.detachLoadItems(i);this.setFilterFunction(t||function(){return true});this.applyShowItemsFilters();this._handlePopupOpenAndItemsLoad(false,this);this.setFilterFunction(e)}.bind(this);if(!this.getEnabled()||!this.getEditable()){return}this._setItemsShownWithFilter(true);this.attachLoadItems(i);this.loadItems(i)};v.prototype.applyShowItemsFilters=function(){};return v});