/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./delegate/ValueStateMessage","sap/ui/core/message/MessageMixin","sap/ui/core/library","sap/ui/Device","./InputBaseRenderer","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/getSelectedText","sap/ui/dom/jquery/selectText"],function(e,t,n,a,o,s,i,r,u,l,p,h){"use strict";var c=i.TextDirection;var g=i.TextAlign;var f=i.ValueState;var d=t.extend("sap.m.InputBase",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:f.None},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueStateText:{type:"string",group:"Misc",defaultValue:null},showValueStateMessage:{type:"boolean",group:"Misc",defaultValue:true},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:g.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:c.Inherit},required:{type:"boolean",group:"Misc",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"string"}}}},aggregations:{formattedValueStateText:{type:"sap.m.FormattedText",multiple:false,defaultValue:null},_endIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"},_beginIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"}},designtime:"sap/m/designtime/InputBase.designtime"}});n.call(d.prototype);a.insertFontFaceStyle();s.call(d.prototype);d.ICON_PRESSED_CSS_CLASS="sapMInputBaseIconPressed";d.ICON_CSS_CLASS="sapMInputBaseIcon";d.prototype.bShowLabelAsPlaceholder=!r.support.input.placeholder;d.prototype.handleInput=function(e){if(this._bIgnoreNextInput||this._bIgnoreNextInputNonASCII){this._bIgnoreNextInput=false;this._bIgnoreNextInputNonASCII=false;e.setMarked("invalid");return}this._bIgnoreNextInput=false;this._bIgnoreNextInputNonASCII=false;if(!this.getEditable()){e.setMarked("invalid");return}if(document.activeElement!==e.target&&r.browser.msie&&this.getValue()===this._lastValue){e.setMarked("invalid");return}this._bCheckDomValue=true};d.prototype._getPlaceholder=function(){return this.getPlaceholder()||""};d.prototype._getInputValue=function(e){e=e===undefined?this.$("inner").val()||"":e.toString();if(this.getMaxLength&&this.getMaxLength()>0){e=e.substring(0,this.getMaxLength())}return e};d.prototype._getInputElementTagName=function(){if(!this._sInputTagElementName){this._sInputTagElementName=this._$input&&this._$input.get(0)&&this._$input.get(0).tagName}return this._sInputTagElementName};d.prototype.init=function(){this._lastValue="";this.bRenderingPhase=false;this._oValueStateMessage=new o(this);this._bIsComposingCharacter=false};d.prototype.oncompositionstart=function(){this._bIsComposingCharacter=true};d.prototype.oncompositionend=function(e){this._bIsComposingCharacter=false;if(!r.browser.edge&&!r.browser.firefox){this.handleInput(e)}};d.prototype.isComposingCharacter=function(){return this._bIsComposingCharacter};d.prototype.onBeforeRendering=function(){if(r.browser.msie&&r.browser.version>9&&!/^[\x00-\x7F]*$/.test(this.getValue())){this._bIgnoreNextInputNonASCII=true;this._oDomRefBeforeRendering=this.getDomRef()}if(this._bCheckDomValue&&!this.bRenderingPhase){this._sDomValue=this._getInputValue()}this.bRenderingPhase=true;this._handleValueStateLinkPress()};d.prototype.onAfterRendering=function(){if(this._bCheckDomValue&&this._sDomValue!==this._getInputValue()){this.$("inner").val(this._sDomValue)}this._bIgnoreNextInputNonASCII=this._bIgnoreNextInputNonASCII&&this._oDomRefBeforeRendering!==this.getDomRef();this._bCheckDomValue=false;this.bRenderingPhase=false};d.prototype.exit=function(){if(this._oValueStateMessage){this._oValueStateMessage.destroy()}this._oValueStateMessage=null;this._oDomRefBeforeRendering=null};d.prototype.onsaptabnext=function(e){this.closeValueStateMessage()};d.prototype.ontouchstart=function(e){e.setMarked()};d.prototype.onfocusin=function(e){this._bIgnoreNextInput=!this.bShowLabelAsPlaceholder&&r.browser.msie&&r.browser.version>9&&!!this.getPlaceholder()&&!this._getInputValue()&&this._getInputElementTagName()==="INPUT";this.addStyleClass("sapMFocus");this.openValueStateMessage()};d.prototype.onfocusout=function(e){this.removeStyleClass("sapMFocus");if(!this._bClickOnValueStateLink(e)){this.closeValueStateMessage()}};d.prototype.onsapfocusleave=function(e){if(!this.preventChangeOnFocusLeave(e)){this.onChange(e)}};d.prototype.preventChangeOnFocusLeave=function(e){return this.bFocusoutDueRendering};d.prototype.getChangeEventParams=function(){return{}};d.prototype.ontap=function(e){return};d.prototype.onChange=function(e,t,n){t=t||this.getChangeEventParams();if(!this.getEditable()||!this.getEnabled()){return}var a=this._getInputValue(n);if(a!==this._lastValue){this.setValue(a);a=this.getValue();this._lastValue=a;this.fireChangeEvent(a,t);return true}else{this._bCheckDomValue=false}};d.prototype.fireChangeEvent=function(e,t){var n=h.extend({value:e,newValue:e},t);this.fireChange(n)};d.prototype.onValueRevertedByEscape=function(e,t){this.fireEvent("liveChange",{value:e,escPressed:true,previousValue:t,newValue:e})};d.prototype.onsapenter=function(e){this.onChange(e)};d.prototype.onsapescape=function(e){var t=this._getInputValue();if(t!==this._lastValue){e.setMarked();e.preventDefault();this.updateDomValue(this._lastValue);this.onValueRevertedByEscape(this._lastValue,t)}};d.prototype.oninput=function(e){this.handleInput(e)};d.prototype.onkeydown=function(e){if(this.getDomRef("inner").getAttribute("readonly")&&e.keyCode==p.BACKSPACE){e.preventDefault()}};d.prototype.oncut=function(e){};d.prototype.selectText=function(e,t){this.$("inner").selectText(e,t);return this};d.prototype.getSelectedText=function(){return this.$("inner").getSelectedText()};d.prototype.setProperty=function(e,n,a){if(e=="value"){this._bCheckDomValue=false}return t.prototype.setProperty.apply(this,arguments)};d.prototype.getFocusInfo=function(){var e=t.prototype.getFocusInfo.call(this),n=this.getFocusDomRef();h.extend(e,{cursorPos:0,selectionStart:0,selectionEnd:0});if(n){e.cursorPos=h(n).cursorPos();try{e.selectionStart=n.selectionStart;e.selectionEnd=n.selectionEnd}catch(e){}}return e};d.prototype.applyFocusInfo=function(e){t.prototype.applyFocusInfo.call(this,e);this.$("inner").cursorPos(e.cursorPos);this.selectText(e.selectionStart,e.selectionEnd);return this};d.prototype.bindToInputEvent=function(e){if(this._oInputEventDelegate){this.removeEventDelegate(this._oInputEventDelegate)}this._oInputEventDelegate={oninput:e};return this.addEventDelegate(this._oInputEventDelegate)};d.prototype.updateDomValue=function(e){var t=this.getFocusDomRef();if(!this.isActive()){return this}e=this._getInputValue(e);if(this._getInputValue()===e){return this}this._bCheckDomValue=true;if(this._bPreferUserInteraction){this.handleInputValueConcurrency(e)}else{t.value=e}return this};d.prototype._aValueStateLinks=function(){if(this.getFormattedValueStateText()&&this.getFormattedValueStateText().getHtmlText()&&this.getFormattedValueStateText().getControls().length){return this.getFormattedValueStateText().getControls()}else{return[]}};d.prototype._bClickOnValueStateLink=function(e){var t=this._aValueStateLinks();return t.some(function(t){return e.relatedTarget===t.getDomRef()})};d.prototype._handleValueStateLinkPress=function(){var e=this.getFormattedValueStateText();if(e&&e.getHtmlText()&&e.getControls()){e.getControls().forEach(function(e){e.attachPress(function(){this.closeValueStateMessage()},this)},this)}};d.prototype.handleInputValueConcurrency=function(e){var t=this.getFocusDomRef(),n=t&&this._getInputValue(),a=this.getProperty("value"),o=document.activeElement===t,s=this.isBound("value")&&this.getBindingInfo("value").skipModelUpdate;if(o&&s&&n&&a!==n){return this}t.value=e;if(o&&s&&!n){t.select()}};d.prototype._setPreferUserInteraction=function(e){this._bPreferUserInteraction=e};d.prototype.closeValueStateMessage=function(){if(this._oValueStateMessage){this._oValueStateMessage.close()}};d.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef("content")};d.prototype.getPopupAnchorDomRef=function(){return this.getDomRef()};d.prototype.iOpenMessagePopupDuration=0;d.prototype.getValueStateMessageId=function(){return this.getId()+"-message"};d.prototype.getLabels=function(){var e=this.getAriaLabelledBy().map(function(e){return sap.ui.getCore().byId(e)});var t=sap.ui.require("sap/ui/core/LabelEnablement");if(t){e=e.concat(t.getReferencingLabels(this).map(function(e){return sap.ui.getCore().byId(e)}))}return e};d.prototype.openValueStateMessage=function(){if(this._oValueStateMessage&&this.shouldValueStateMessageBeOpened()){if(r.browser.msie){setTimeout(function(){this._oValueStateMessage.open()}.bind(this),0)}else{this._oValueStateMessage.open()}}};d.prototype.updateValueStateClasses=function(e,t){var n=this.$(),a=this.$("content"),o=f;if(t!==o.None){n.removeClass("sapMInputBaseState");a.removeClass("sapMInputBaseContentWrapperState sapMInputBaseContentWrapper"+t)}if(e!==o.None){n.addClass("sapMInputBaseState");a.addClass("sapMInputBaseContentWrapperState sapMInputBaseContentWrapper"+e)}};d.prototype.shouldValueStateMessageBeOpened=function(){return this.getValueState()!==f.None&&this.getEditable()&&this.getEnabled()&&this.getShowValueStateMessage()};d.prototype._calculateIconsSpace=function(){var e=this.getAggregation("_endIcon")||[],t=this.getAggregation("_beginIcon")||[],n=e.concat(t),a;return n.reduce(function(e,t){a=t&&t.getDomRef()?t.getDomRef().offsetWidth:0;return e+a},0)};d.prototype.setValueState=function(e){var t=this.getValueState();this.setProperty("valueState",e,true);e=this.getValueState();if(e===t){return this}var n=this.getDomRef();if(!n){return this}var a=this.$("inner"),o=f;if(e===o.Error){a.attr("aria-invalid","true")}else{a.removeAttr("aria-invalid")}this.updateValueStateClasses(e,t);if(a[0]===document.activeElement){if(e===o.None){this.closeValueStateMessage()}else{this.openValueStateMessage()}}return this};d.prototype.setValueStateText=function(e){this.setProperty("valueStateText",e,true);this.$("message").text(this.getValueStateText());return this};d.prototype.setValue=function(e){e=this.validateProperty("value",e);e=this._getInputValue(e);this.updateDomValue(e);if(e!==this.getProperty("value")){this._lastValue=e}this.setProperty("value",e,true);return this};d.prototype.getFocusDomRef=function(){return this.getDomRef("inner")};d.prototype.getIdForLabel=function(){return this.getId()+"-inner"};d.prototype.getAccessibilityInfo=function(){var e=this.getRequired()?"Required":"",t=this.getRenderer();return{role:t.getAriaRole(this),type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_INPUT"),description:[this.getValue()||"",t.getLabelledByAnnouncement(this),t.getDescribedByAnnouncement(this),e].join(" ").trim(),focusable:this.getEnabled(),enabled:this.getEnabled(),editable:this.getEnabled()&&this.getEditable()}};d.prototype._addIcon=function(e,t){if(["begin","end"].indexOf(e)===-1){l.error('icon position is not "begin", neither "end", please check again the passed setting');return null}var n=a.createControlByURI(t).addStyleClass(d.ICON_CSS_CLASS);this.addAggregation("_"+e+"Icon",n);return n};d.prototype.addBeginIcon=function(e){return this._addIcon("begin",e)};d.prototype.addEndIcon=function(e){return this._addIcon("end",e)};Object.defineProperty(d.prototype,"_$input",{get:function(){return this.$("inner")}});return d});