var contextPath = "/BossWeb";
try{
	contextPath = getContextPath();
}catch(e){
	contextPath = "/BossWeb"
}
/**
 * 判断字符串是否为数字
 * @param sTxt 为要进行判断的字符串
 */
function isNum(sTxt){
  var numTemp = "1234567890";
  for(i = 0; i<sTxt.length; i++){
    if( numTemp.indexOf( sTxt.charAt(i) ) == -1 ) {return false;}
  }
  return true;
}

/**
 * 校验字符串是否符合长度要求
 * @param sTxt 为要进行检验的字符串
 * @param minL 最小长度
 * 参数: maxL 最大长度
 */
function isValidLength(sTxt, minL, maxL){
  if( sTxt.length < minL || sTxt.length > maxL ) return false;
  return true;
}

/**
 * 精确校验字符串长度
 * @param sTxt 为要进行检验的字符串
 * @param len 为要进行检验的长度
 */
function isRigorLength(sTxt, len){
  if( sTxt.length != len ) return false;
  return true;
}
/**
/ 在编辑框的onkeypress事件调用
/ 作用:过滤掉键盘输入非数字键
*/
function numbersonly(){
 var key,keychar;
 if(window.event){
  key = window.event.keyCode;
 }else if (event){
  key = event.which;
 }else{
  return true
 }
  keychar = String.fromCharCode(key);
 if((key == null)||(key == 0)||(key == 8)||(key == 9)||(key == 13)||(key == 27)){
  return true;
 }else if(("0123456789").indexOf(keychar)>-1){
  window.status = "";
  return true;
 }else {
   window.event.keyCode = 0;
   window.event.returnvalue = false;
   window.status = "只能输入数字!!!";
   return false;
 }
}
/**
 * 删除所有下拉框选项
 * @param obj 为下拉框对象
 */
function removeAllOption(obj){
  var obj = eval(obj);
  for( i = obj.length-1; i >= 0; i--){
    obj.remove(i);
  }
}

/**
 * 增加一个下拉选项
 * @param obj 为下拉框对象
 * @param sValue 为要增加的下拉框选项值
 * @param sText 为要增加的下拉框选项显示文本
 */
function addOption(obj, sValue, sText){
  var obj = eval(obj);
  var oOption = document.createElement("OPTION");
  oOption.value = sValue;
  oOption.innerText = sText;
  obj.appendChild(oOption);
}

/**
 * 用于根据数据字典设置联系菜单
 * @param oSubObj 为下级下拉框对象
 * @param dictType 对应字典表 dictType
 * @param classId 对应字典表 classId
 * @param parentId 为上级下拉框选项值
 */
function setSubRela(oSubObj, dictType, classId, parentId ){
   var oSubObj = eval(oSubObj);
   removeAllOption(oSubObj);
   var objDom = new ActiveXObject('microsoft.xmldom');
   objDom.async = false;
   var objHttp = new ActiveXObject('microsoft.xmlhttp');
   objHttp.open("post",contextPath+"/sm/operatormanager/operinfo/sm_getSubInter.jsf?dictType="+dictType+"&classId="+classId+"&parentId="+parentId,false);
   objHttp.send();
   if( objHttp.readyState !=4 ) return ;
   objDom.loadXML( objHttp.responseText );
   if(objDom.parseError.errorCode != 0) return ;
   var nodes = objDom.documentElement.childNodes;
   for(i = 0; i < nodes.length; i++){
      var sValue = nodes[i].childNodes[0].text;
      var sText = nodes[i].childNodes[1].text;
      addOption(oSubObj, sValue, sText);
   }
}

/**
 * 使下拉框中text值与提供的的sText相匹配的option选中(文字匹配，不准确匹配)
 * @param selObj 为下拉框对象
 * @param sText 为下拉框选项显示文本
 */
function compareSelText(selObj, sText){
  for(i=0; i<selObj.length; i++){
    if( selObj[i].text.trim() == sText.trim() ){
      selObj[i].selected = true ;
    }
  }
}

/**
 * 选中与提供sValue值相匹配的下拉框选项（值匹配，精确匹配）
 * @param selObj 为下拉框对象
 * @param sValue 为下拉框选项值
 */
function compareSelValue(selObj, sValue){
  for(i=0; i < selObj.length; i++){
    if( selObj[i].value.trim() == sValue.trim() ){
      selObj[i].selected = true ;
    }
  }
}

/**
 * 使指定的复选框选中
 * @param chkObj为复选框对象
 * @param sValue为复选框的值
 */
function compareCheckBoxByValue(chkObj, sValue){
  if( sValue == "true" || sValue == "1" ){
    chkObj.checked = true ;
  } else {
    chkObj.checked = false ;
  }
}

/**
 * 返回sText在下拉框中的索引(文字匹配，不准确匹配)
 * @param oObj为下拉框对象
 * @param sText 为下拉框选项显示文本
 */
function getOptionIndex2(oObj,sText){
  for(i=0; i<oObj.length; i++){
    if( oObj[i].text == sText){
      return i;
    }
  }
  return 0;
}

/**
 * 获取下拉框的索引
 * @param oObj为下拉框对象
 * @param sValue为下拉框选面值
 */
function getOptionIndex(oObj, sValue){
  if( oObj == null || sValue == "" ) return;
  for( i = 0; i < oObj.length; i++ ){
    if( oObj[i].value.trim() == sValue.trim() ){
      return i;
    }
  }
  return 0;
}

/**
 * 设置文本框为只读
 * @param oObj为文本框对象
 */
function setTextBoxReadOnly(oObj){
 var oObj = eval(oObj);
 oObj.readOnly = true;
 oObj.className = "input-gray";
}

/**
 * 设置form对象元素为休眠状态
 * @param oForm为form对象
 */
function setFormDie(oForm){
  var oForm = eval(oForm);
  for(i = 0; i < oForm.elements.length; i++){
    var e = oForm.elements[i];
    setFormObjDie(e);
    //if( e.type == null ) continue;
    //if( e.tagName.toUpperCase() == "INPUT" ){
    //  if( e.type.toUpperCase() == "TEXT" )  {
    //    e.readOnly = true;
    //    e.className = "input-gray";
    //  }
    //  if( e.type.toUpperCase() == "PASSWORD" ){
    //    e.value = "";
    //    e.readOnly = true;
    //    e.className = "input-gray";
    //  }
    //  if( e.type.toUpperCase() == "RADIO" ) e.disabled = true;
    //  if( e.type.toUpperCase() == "CHECKBOX" ) e.disabled = true;
    //  if( e.type.toUpperCase() == "HIDDEN" ){
    //    if( typeof(e.setEnable) == "function" ){
    //      e.setEnable(false);
    //    }
    //  }
    //}
    //if( e.tagName.toUpperCase() == "SELECT" ) {
    //  e.disabled = true;
    //  e.className = "input-gray";
    //}
    //if( e.tagName.toUpperCase() == "TEXTAREA" ) {
    //  e.readOnly = true;
    //  e.className = "input-gray";
    //}
  }
}
/**
 * 设置对象元素为休眠状态
 * @param e对象
 */
function setFormObjDie(e){
    if( e.type == null ) return;
    if( e.tagName.toUpperCase() == "INPUT" ){
      if( e.type.toUpperCase() == "TEXT" )  {
        e.readOnly = true;
        e.className = "input-gray";
      }
      if( e.type.toUpperCase() == "PASSWORD" ){
        e.value = "";
        e.readOnly = true;
        e.className = "input-gray";
      }
      if( e.type.toUpperCase() == "RADIO" ) e.disabled = true;
      if( e.type.toUpperCase() == "CHECKBOX" ) e.disabled = true;
      if( e.type.toUpperCase() == "HIDDEN" ){
        if( typeof(e.setEnable) == "function" ){
          e.setEnable(false);
        }
      }
    }
    if( e.tagName.toUpperCase() == "SELECT" ) {
      e.disabled = true;
      e.className = "input-gray";
    }
    if( e.tagName.toUpperCase() == "TEXTAREA" ) {
      e.readOnly = true;
      e.className = "input-gray";
    }
}
/**
 * 根据参数来判定是否置灰form
 */
function setFormDieByParam(oForm, paramName, paramValue){
  var oForm = eval(oForm);
  for(i = 0; i < oForm.elements.length; i++){
    var e = oForm.elements[i];
    eval("var pv = e."+paramName);
    if( pv == null || pv != paramValue) continue;
    if( e.type == null ) continue;
    if( e.tagName.toUpperCase() == "INPUT" ){
      if( e.type.toUpperCase() == "TEXT" )  {
        e.readOnly = true;
        e.className = "input-gray";
      }
      if( e.type.toUpperCase() == "PASSWORD" ){
        e.value = "";
        e.readOnly = true;
        e.className = "input-gray";
      }
      if( e.type.toUpperCase() == "RADIO" ) e.disabled = true;
      if( e.type.toUpperCase() == "CHECKBOX" ) e.disabled = true;
      if( e.type.toUpperCase() == "HIDDEN" ){
        if( typeof(e.setEnable) == "function" ){
          e.setEnable(false);
        }
      }
    }
    if( e.tagName.toUpperCase() == "SELECT" ) {
      e.disabled = true;
      e.className = "input-gray";
    }
    if( e.tagName.toUpperCase() == "TEXTAREA" ) {
      e.readOnly = true;
      e.className = "input-gray";
    }
  }
}

/**
 * 激活form
 * @param oForm为form对象
 */
function setFormActive(oForm){
  var oForm = eval(oForm);
  for(i = 0; i < oForm.elements.length; i++){
    var e = oForm.elements[i];
    setFormObjActive(e);
    //if( e.type == null ) continue;
    //if( e.tagName.toUpperCase() == "INPUT" ){
    //  if( e.type.toUpperCase() == "TEXT" || e.type.toUpperCase() == "PASSWORD" )  {
    //    e.readOnly = false;
    //    e.className = "";
    //  }
    //  if( e.type.toUpperCase() == "RADIO" ) e.disabled = false;
    //  if( e.type.toUpperCase() == "CHECKBOX" ) e.disabled = false;
    //  if( e.type.toUpperCase() == "HIDDEN" ){
    //    if( typeof(e.setEnable) == "function" ){
    //      e.setEnable(true);
    //    }
    //  }
    //}
    //if( e.tagName.toUpperCase() == "SELECT" ) {
    //  e.disabled = false;
    //  e.className = "";
    //}
    //if( e.tagName.toUpperCase() == "TEXTAREA" ) {
    //  e.readOnly = false;
    //  e.className = "";
    //}
  }
}
/**
 * 激活对象
 * @param e对象
 */
function setFormObjActive(e){
    if( e.type == null ) return;
    if( e.tagName.toUpperCase() == "INPUT" ){
      if( e.type.toUpperCase() == "TEXT" || e.type.toUpperCase() == "PASSWORD" )  {
        e.readOnly = false;
        e.className = "";
      }
      if( e.type.toUpperCase() == "RADIO" ) e.disabled = false;
      if( e.type.toUpperCase() == "CHECKBOX" ) e.disabled = false;
      if( e.type.toUpperCase() == "HIDDEN" ){
        if( typeof(e.setEnable) == "function" ){
          e.setEnable(true);
        }
      }
    }
    if( e.tagName.toUpperCase() == "SELECT" ) {
      e.disabled = false;
      e.className = "";
    }
    if( e.tagName.toUpperCase() == "TEXTAREA" ) {
      e.readOnly = false;
      e.className = "";
    }
}
/**
 * 根据参数来激活form
 */
function setFormActiveByParam(oForm, paramName, paramValue){
  var oForm = eval(oForm);
  for(i = 0; i < oForm.elements.length; i++){
    var e = oForm.elements[i];
    eval("var pv = e."+paramName);
    if( pv == null || pv != paramValue) continue;
    if( e.type == null ) continue;
    if( e.tagName.toUpperCase() == "INPUT" ){
      if( e.type.toUpperCase() == "TEXT" || e.type.toUpperCase() == "PASSWORD" )  {
        e.readOnly = false;
        e.className = "";
      }
      if( e.type.toUpperCase() == "RADIO" ) e.disabled = false;
      if( e.type.toUpperCase() == "CHECKBOX" ) e.disabled = false;
      if( e.type.toUpperCase() == "HIDDEN" ){
        if( typeof(e.setEnable) == "function" ){
          e.setEnable(true);
        }
      }
    }
    if( e.tagName.toUpperCase() == "SELECT" ) {
      e.disabled = false;
      e.className = "";
    }
    if( e.tagName.toUpperCase() == "TEXTAREA" ) {
      e.readOnly = false;
      e.className = "";
    }
  }
}

/**
 * 清空form
 * @param oForm为form对象
 */
function clearForm(oForm){
  var oForm = eval(oForm);
  for(i = 0; i < oForm.elements.length; i++){
    var e = oForm.elements[i];
    if( e.type == null ) continue;
    if( e.tagName.toUpperCase() == "INPUT" ){
      if( e.type.toUpperCase() == "TEXT" || e.type.toUpperCase() == "PASSWORD" )  {
        e.value = "";
      }
      if( e.type.toUpperCase() == "RADIO" ) e.checked = false;
      if( e.type.toUpperCase() == "CHECKBOX" ) e.checked = false;
      if( e.type.toUpperCase() == "HIDDEN" ){
        if( typeof(e.setEnable) == "function" ){
          e.setValue(getTime());
        }
      }
    }
    if( e.tagName.toUpperCase() == "SELECT" ) {
      try{
      if(e.options.length > 0) e.options[0].selected = true;
      } catch(ex){}
    }
    if( e.tagName.toUpperCase() == "TEXTAREA" ) {
        e.value = "";
    }
  }
}

/**
 * 获取当前时间(格式 yyyy/MM/dd hh:mm:ss)
 */
function getTime(){
var myDate = new Date();
var sYear = myDate.getYear();
var sMonth = myDate.getMonth()+1;
var sDay = myDate.getDate();
var sHour = myDate.getHours();
var sMinute = myDate.getMinutes();
var sSecond = myDate.getSeconds();
sMonth = ( sMonth < 10 && sMonth.length == 1 )? "0"+sMonth:sMonth;
sDay = ( sDay < 10 && sDay.length == 1)? "0"+sDay:sDay;
sHour = ( sHour < 10 && sHour.length == 1)? "0"+sHour:sHour;
sMinute = ( sMinute < 10 && sMinute.length == 1)? "0"+sMinute:sMinute;
sSecond = ( sSecond < 10 && sSecond.length == 1)? "0"+sSecond:sSecond;
return  sYear+"/"+sMonth+"/"+sDay+" "+sHour+":"+sMinute+":"+sSecond;
}

/**
 * 日期格式转换yyyy/MM/dd hh:mm:ss 2 yyyymmdd
 * @param sDate为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 */
function getDateOnly(sDate){
  var rv = sDate.substring(0,4);
  var sMonth;
  var sDay;
  sMonth = sDate.substring(sDate.indexOf("/")+1, sDate.lastIndexOf("/"));
  sMonth = ( sMonth < 10 && sMonth.length == 1 )? "0"+sMonth:sMonth;
  sDay = sDate.substring(sDate.lastIndexOf("/")+1, sDate.indexOf(" "));
  sDay = ( sDay < 10 && sDay.length == 1 )? "0"+sDay:sDay;
  rv += sMonth;
  rv += sDay;
  return rv;
}

/**
 * 日期格式转换yyyy/MM/dd hh:mm:ss to yyyy-MM-dd hh:mm:ss
 * @param sDate为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 */
function dateFormat(sDate){
  var rv = sDate.substring(0,4);
  var sMonth;
  var sDay;
  sMonth = sDate.substring(sDate.indexOf("/")+1, sDate.lastIndexOf("/"));
  sMonth = ( sMonth < 10 && sMonth.length == 1 )? "0"+parseInt(sMonth):sMonth;
  sDay = sDate.substring(sDate.lastIndexOf("/")+1, sDate.indexOf(" "));
  sDay = ( sDay < 10 && sDay.length == 1 )? "0"+sDay:sDay;
  rv += "-";
  rv += sMonth;
  rv += "-";
  rv += sDay;
  rv += " ";
  rv += sDate.substring( sDate.indexOf(" ") ,sDate.length);
  return rv;
}

//获取boss系统top对象--对工作区
function getUtilsWebTop(){
	var theParent = self;
    while( theParent != theParent.parent && theParent.name != "ccmsFrame"){
        theParent = theParent.parent;
    }    
    return theParent;
    //2009.02.05 yanfg add >>
}
//获取菜单功能号
function getMenuFuncId(){
  var theParent = self;
  var utilsWebTop = getUtilsWebTop();
  while( utilsWebTop != theParent && theParent.frameElement.name.indexOf("ccms_operate_iframe") == -1 ){
    theParent = theParent.parent;
  }
  return utilsWebTop.getCurFuncByIframe(theParent.name);
}

Array.prototype.isArrayEle = function(sValue) {
  var flag = false;
  for( var i = 0; i < this.length; i++ ) {
    if( this[i] == sValue ) {
      flag = true;
      break;
    }
  }
  return flag;
}

/**
 * 判断开始时间是否小于结束时间
 * @param sStartDate为开始时间(格式为yyyy/MM/dd hh:mm:ss的字符串日期)
 * @param sEndDate为结束时间(格式为yyyy/MM/dd hh:mm:ss的字符串日期)
 */
function isValidDate(sStartDate, sEndDate){
  if( getDateOnly(sEndDate) < getDateOnly(sStartDate) ) return false;
  return true;
}

String.prototype.isValidLength = function (minL, maxL) {
  if( this.length < minL || this.length > maxL ) return false;
  return true;
}

String.prototype.accordLength = function (len) {
  if(this.length != len) return false;
  return true;
}

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.toBoolean = function() {
	if ( this.toLowerCase() == "true" ) return true;
	return false;
}

/**
 * 计算长度(汉字字符)
*/
 String.prototype.Tlength = function(){
    var arr=this.match(/[^\x00-\xff]/ig);
    return this.length+(arr==null?0:arr.length);
 }
 
function Map() {
  this.map = new Array();
}

Map.prototype.get = function( name ) {
        for ( var i=0; i < this.map.length; i++ ) {
                var attr = this.map[i];
                if ( attr.name == name ) {
                        return attr.value;
                }
        }

        return null;
}

Map.prototype.remove = function( name ) {
        for ( var i=0; i < this.map.length; i++ ) {
                var attr = this.map[i];
                if ( attr.name == name ) {
                        this.map.splice( i, 1 );
                        return ;
                }
        }

        return null;
}

Map.prototype.put = function( name, value ) {
        for ( var i=0; i < this.map.length; i++ ) {
                var attr = this.map[i];
                if ( attr.name == name ) {
                        attr.value = value;
                        return ;
                }
        }
    this.map[this.map.length] = new attribute(name,value);
}

Map.prototype.size = function() {
        return this.map.length;
}

Map.prototype.clear = function() {
  this.map.splice(0, this.map.length);
}


function attribute( name, value ) {
        this.name = name;
        this.value = value;
}
/********************====map for buffalo modified by cjp **************/
/**
 *example:
 * var aMap = new BuffaloMap();
 * aMap.put("mykey","myValueMayBeObject");//更多情况下，key-value值对里的value用来存储对象。
 * aMap.put("mykey2","myValueMayBeObject");
 * aMap.get("mykey");
 * aMap.remove("mykey");
 */
function BuffaloMap()
			{
	     	  this.key = new Array();
	      	  this.value = new Array();
	   	      this.className = "java.util.Map";
	      	  this.put = function(_key , _value)
		      	 {
		                this.key.push(_key);
		                this.value.push(_value);
		        }
	      	  this.get = function(_key)
	        	{
	                var k = -1;
	                for(i=0;i<this.key.length;i++)
	                {
	                        if(this.key[i] == _key)
	                        {
	                                k = i; break;
	                        }
	                }
	                if(k != -1)
	                {
	                        return this.value[k];
	                }else
	                {
	                        return null;
	   	             }
       			 }
			 this.remove = function(_key)
			 {
	                for(i=0;i<this.key.length;i++)
	                {
	                        if(this.key[i] == _key)
	                        {
	                                this.key.splice(i,1);
	                                this.value[i]=null;//删除这个对象。
	                                this.value.splice(i,1);
	                                break;
	                        }
	                }
	              return null;
			 }
			 this.size = function()
			 {
			 	return this.key.length;
			 }
			 //返回所有key,用数组返回。
			 this.getKeys = function()
			 {
			 	return this.key;
			 }
			 this.getValues = function()
			 {
			 return this.value;
			 }
			}
/***************buffalo map end.*******************/
///////////////////////////////////////////////////////////////////////////////
document.write("<script src='"+contextPath+"/js/showMessage.js'></\script>");
//-----------工号检验
function chkOperId(formId, operId){
  eval("var operId = document.forms."+formId+"['"+formId+":"+operId+"'];");
  if( operId.value == "" ){
    showMsg("操作员工号不能为空！");
    operId.focus();
    return false;
  } else {
    if( !isNum(operId.value) || !operId.value.accordLength(7) ){
      showMsg("操作员工号错误，请重新输入！");
      operId.select();
      operId.focus();
      return false;
    }
  }
  return true;
}

/**
 * 月份校验(yyyymm)
 */
function chkMonth(month){
  var month = eval(month);
  if( month.value == "" ){
    showMsg("月份不能为空，请输入！");
    month.focus();
    return false;
  }
  var m = month.value.substring(month.value.length-2, month.value.length);
  if( month.value.length != 6 || !isNum(month.value) || (  m > 12 || m < 1 ) ) {
    showMsg("月份输入有错误，请重新输入！");
    month.select();
    month.focus();
    return false;
  }
  return true;
}
////////////////////////////////////////////////////////////////////////////////
var whichBtn;
var btnType;
function getWhichBtnObj(wb){
  var theBtn = eval(wb);
  var sNoneBtn = theBtn.id+"None";
  whichBtnObj = document.getElementById( sNoneBtn );
}


/////////////////////////////////////////////////////


/**
 *全部选中复选框（复选框不处于form中）
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param checkboxobj 复选框名称
 *@author shenjian
 */
function selectAllCheckBox(ifr,checkboxobj){
	var i;
	if(ifr!=""){
		var ifr = eval(ifr);
		//alert(ifr.document.all(checkboxobj)[1].checked);
		for(i=1;i<ifr.document.all(checkboxobj).length;i++){
			ifr.document.all(checkboxobj)[i].checked=true;
		}
	}else{
		for(i=1;i<document.all(checkboxobj).length;i++){
			document.all(checkboxobj)[i].checked=true;
		}
	}
}

/**
 *全部取消选中复选框（复选框不处于form中）
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param checkboxobj 复选框名称
 *@author shenjian
 */

function cancelAllCheckBox(ifr,checkboxobj){
	var i;
	if(ifr!=""){
		var ifr = eval(ifr);
		for(i=1;i<ifr.document.all(checkboxobj).length;i++){
			ifr.document.all(checkboxobj)[i].checked=false;
		}
	}else{
		for(i=1;i<document.all(checkboxobj).length;i++){
			document.all(checkboxobj)[i].checked=false;
		}
	}
}

/**
 *全部选中复选框（复选框处于form中）
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param operform 需提交的form名称
 *@param checkboxobj 复选框名称
 *@author shenjian
 */
function selectAllFormCheckBox(ifr,operform,checkboxobj){
	var i;
	if(ifr!=""){
		var ifr = eval(ifr);
		for(i=0;i<eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'].length");i++){
			eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].checked=true");
		}
	}else{
		for(i=0;i<eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'].length");i++){
			eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].checked=true");
		}
	}
}

/**
 *全部取消选中复选框（复选框处于form中）
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param operform 需提交的form名称
 *@param checkboxobj 复选框名称
 *@author shenjian
 */
function cancelAllFormCheckBox(ifr,operform,checkboxobj){
	var i;
	if(ifr!=""){
		var ifr = eval(ifr);
		for(i=0;i<eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'].length");i++){
			eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].checked=false");
		}
	}else{
		for(i=0;i<eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'].length");i++){
			eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].checked=false");
		}
	}
}

/**
 *取复选框中所有被选中选项的值放入一个Array后赋给form中的一个隐藏元素
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param checkboxobj 复选框名称
 *@param operform 需提交的form名称
 *@param hiddenobj 用来存放复选框的值的隐藏元素名称
 *@author shenjian
 */
function getCheckBoxValue(ifr,checkboxobj,operform,hiddenobj){
	if(ifr!=""){
		var ifr=eval(ifr);
		var A = new Array();
		var i,j=0;
		for(i=1;i<ifr.document.all(checkboxobj).length;i++){
			if(ifr.document.all(checkboxobj)[i].checked==true&&ifr.document.all(checkboxobj)[i].disabled==false){
				A[j]=ifr.document.all(checkboxobj)[i].value;
				j++;
			}
		}
		eval("document.forms['"+operform+"']['"+operform+":"+hiddenobj+"'].value=A");
		//alert(eval("document.forms['"+operform+"']['"+operform+":"+hiddenobj+"'].value"));
	}else{
		var A = new Array();
		var i,j=0;
		for(i=1;i<document.all(checkboxobj).length;i++){
			if(document.all(checkboxobj)[i].checked==true&&document.all(checkboxobj)[i].disabled==false){
				A[j]=document.all(checkboxobj)[i].value;
				j++;
			}
		}
		eval("document.forms['"+operform+"']['"+operform+":"+hiddenobj+"'].value=A");
	}
}

/**
 *置灰或启用所有复选框选项
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param checkboxobj 复选框名称
 *@param operform 需提交的form名称
 *@param ison 用于标识当前操作是置灰还是启用的复选框名称
 *@author shenjian
 */
function disableifr(ifr,checkboxobj,operform,ison){//ifr:嵌入框架名称(如没有用到框架参数为'')；checkboxobj:checkbox名称；operform:需提交的jsf表单名称；ison:标识“是非”控件名称
	var i;
	if(ifr!=""){
		var ifr=eval(ifr);
		if(eval("document.forms['"+operform+"']['"+operform+":"+ison+"'].checked")==true){
			for(i=1;i<ifr.document.all(checkboxobj).length;i++){
				ifr.document.all(checkboxobj)[i].disabled=false;
			}
		}else{
			for(i=1;i<ifr.document.all(checkboxobj).length;i++){
				ifr.document.all(checkboxobj)[i].disabled=true;
			}
		}
	}else{
		if(eval("document.forms['"+operform+"']['"+operform+":"+ison+"'].checked")==true){
			for(i=1;i<document.all(checkboxobj).length;i++){
				document.all(checkboxobj)[i].disabled=false;
			}
		}else{
			for(i=1;i<document.all(checkboxobj).length;i++){
				document.all(checkboxobj)[i].disabled=true;
			}
		}
	}
}

/**
 *传入周数 and 当前日期,推算(前)下N周的周一与周日的日期，周的计算按月进行，
 *每月第一天为第一周的周一，以此类推，每月共四周，最后一周从第四个周一起至月底，长度超过7天
 *@param weekIndex 0或者null表示本周,1表示下周,-1表示上周,依此类推
 *@param currDate 当前日期对象,null表示取当前机器日期
 *@return week 长度为2的字符型数组,week[0]表示周一,week[1]表示周日
 *@author wuying
 */
function getWeek(weekIndex, currDate) {
  var monthWeek, weekSum, weeks = new Array(1, 8, 15, 22),
      date, month, year, fisrtDay, lastDay, week = new Array(2);

  if(null == weekIndex )
    weekIndex = 0;
  else
  	weekIndex = parseInt(weekIndex);

  if(null == currDate)
    d = new Date();
  else
  	d = new Date(currDate);

  date = d.getDate();
  month = d.getMonth();
  year = d.getYear();

  monthWeek = Math.floor((date - 1) / 7);
  if(monthWeek < 3)
    monthWeek = monthWeek + 1;
  else
    monthWeek = 4;

  weekSum = year * 4 * 12 + month * 4 + monthWeek + weekIndex - 1;
  year = Math.floor(weekSum / (4 * 12));
  month = Math.floor((weekSum - year * 4 * 12) / 4) + 1;
  monthWeek = weekSum % 4 + 1;


  firstDay = year + "-" + month + "-" + weeks[monthWeek-1];

  if(monthWeek == 1)
    lastDay = 7;
  else if(monthWeek == 2)
    lastDay = 14;
  else if(monthWeek == 3)
    lastDay = 21;
  else if(monthWeek == 4) {
    if((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12))
      lastDay = 31;
    else if((month == 4) || (month == 6) || (month == 9) || (month == 10) || (month == 11))
      lastDay = 30;
    else if((month == 2) && (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0)))
      lastDay = 29;
    else
      lastDay = 28;
  }

  lastDay = year + "-" + month + "-" + lastDay;

  week[0] =  firstDay;
  week[1] = lastDay;

  return week;
}

/**
 *传入周数 and 当前日期,推算(前)下N周的周一与周日的日期
 *@param weekIndex 0或者null表示本周,1表示下周,-1表示上周,依此类推
 *@param currDate 当前日期对象,null表示取当前机器日期
 *@return week 长度为2的字符型数组,week[0]表示周一,week[1]表示周日
 *@author wuying
 */
function getWeekEx(weekIndex, currDate) {
  var i = weekIndex, today = currDate, dv, day, monday, sunday, week = new Array(2), month;

  if(null == i)
    i = 0;
  else
  	i = parseInt(i);

  if(null == today)
    d = new Date();
  else
  	d = new Date(today);

  dv = d.valueOf(); // millsecond
  day = d.getDay();

  dv += (i*7 - day + 1) * 24 * 60 * 60 * 1000;
  d.setTime(dv);
  month = d.getMonth() + 1;
  monday = d.getYear() + "-" + month + "-" + d.getDate();

  dv += 6 * 24 * 60 * 60 * 1000;
  d.setTime(dv);
  month = d.getMonth() + 1;
  sunday = d.getYear() + "-" + month + "-" +  d.getDate();

  week[0] = monday;
  week[1] = sunday;

  return week;
}

/**
 *在两个<select>之间进行<option>移动
 *@author lijunliang
 *@tidyup by zhengjianwei
 */
select_utils = new Object();
select_utils.moveOne = function(srcObj, destObj){
  var srcObj = eval(srcObj);
  var destObj = eval(destObj);
  var i;
  if( srcObj.selectedIndex == -1 ) return;
  for(var j = srcObj.length - 1; j >= 0; j--){
    if(srcObj[j] == null ) continue;
    if(srcObj[j].selected){
      i = j;
      if( select_utils.haveSameOption(srcObj[i], destObj) ) {
        srcObj.remove(i);
        return;
      }
      destObj.appendChild( srcObj[i].cloneNode(true) );
      srcObj.remove( i );
    }
  }
}
select_utils.moveAll = function(srcObj,destObj,hasSame){
  var srcObj = eval(srcObj);
  var destObj = eval(destObj);
  for(var i = 0;i<srcObj.length;){
    if(hasSame && select_utils.haveSameOption(srcObj[i], destObj) ) {
      srcObj.remove(i);
      continue;
    }
    destObj.appendChild( srcObj[i].cloneNode(true) );
    srcObj.remove( i );
  }
}
select_utils.removeOneOnSelect = function(oObj){
  if( oObj.selectedIndex == -1 ) return;
  oObj.remove( oObj.selectedIndex );
}
select_utils.removeOneByValue = function(oObj,value){
  var oObj = eval(oObj);
  for(i = 0; i < oObj.length; i++){
    if(oObj[i].value == value){
  		oObj.remove(i);
  		return;
    }
  }

}
select_utils.setAllSelected = function(oObj){
  var obj = eval(oObj);
  for(i = 0; i < obj.length; i++){
    obj[i].selected = true;
  }
}
select_utils.addOption = function(oObj,oOpt,hasSame){
	var oObj = eval(oObj);
	if(hasSame||!select_utils.haveSameOption(oOpt,oObj)){
		oObj.appendChild(oOpt);
	}
}
select_utils.clearEmpty = function(oObj){
  var oObj = eval(oObj);
  for(i = 0; i < oObj.length;i++){
    if(oObj[i].value.trim() == "" && oObj[i].innerText.trim() == "" ){
      oObj.remove(i);
      i--;
    }
  }
}
select_utils.removeAll = function(oObj){
	  var oObj = eval(oObj);
	  for(i = 0; i < oObj.length;i++){	    
	      oObj.remove(i);
	      i--;
	  }
	}
select_utils.haveSameOption = function(oOpt,oObj){
  var oObj = eval(oObj);
  for(j = 0; j < oObj.length; j++){
    if( oObj[j].value.trim() == oOpt.value.trim() ) return true;
  }
  return false;
}
/**
 * 获取select选中项的text
 */
select_utils.getText = function(oObj){
	var oObj = eval(oObj);
        
        if(oObj.selectedIndex > -1)
	  return oObj[oObj.selectedIndex].text;
        else
          return "";
}
/**
 * 绑定select选中项的value到Text标签
 */
select_utils.bindSelectToText = function(oSelt,oText){
	var oSelt = eval(oSelt);
	var oText = eval(oText);
	oText.value = oSelt.value;
	oSelt.attachEvent("onchange",function(){
		oText.value = oSelt.value;
	})
}
/**
 * 绑定select选中项的text到Text标签
 */
select_utils.bindSelectTextToText = function(oSelt,oText){
	var oSelt = eval(oSelt);
	var oText = eval(oText);
	oText.value = select_utils.getText(oSelt);
	oSelt.attachEvent("onchange",function(){
		oText.value = select_utils.getText(oSelt);
	})
}

/**
 * OCX得到的数据和Form绑定(form中的ID与columnOrder对应)
 * formName : form名称String
 * columnOrder : ocx中的columnOrder (以#2隔开)
 * rowData : ocx得到的行数据 (以#2隔开)
 */
var form_utils = new Object();
form_utils.setRowDataToForm = function(formName,columnOrder,rowData){
	var field_flag =  String.fromCharCode(2);
	var columns = columnOrder.split(field_flag);
	var datas = rowData.split(field_flag);

	for(var i = 0 ;i < columns.length ; i ++ ){
		if (document.getElementById(formName + ":" +columns[i])){
			document.getElementById(formName + ":" +columns[i]).value = datas[i];
		}
		else if(document.getElementById(formName).contains(document.getElementById(columns[i]))){
			document.getElementById(columns[i]).value = datas[i];
		}
	}
}
/**
 * OCX得到的数据和Form对象绑定(form中的子属性名与columnOrder对应)
 * formObj : form对象Object
 * columnOrder : ocx中的columnOrder (以#2隔开)
 * rowData : ocx得到的行数据 (以#2隔开)
 */
form_utils.setRowDataToFormObj = function(formObj,columnOrder,rowData){
	var field_flag =  String.fromCharCode(2);
	var columns = columnOrder.split(field_flag);
	var datas = rowData.split(field_flag);
	for(var i = 0 ; i < columns.length ; i ++){
		if(formObj[columns[i]])
			formObj[columns[i]].value = datas[i]
	}
}
/**
 * form2form的相应字段相互拷贝
 * fromForm : 源Form (String)
 * toForm : 目标Form (String)
 * dataIds : 要拷贝的数据项 (字符串数组)
 */
form_utils.copyFormData = function(fromForm,toForm,dataIds){
	for(var i = 0 ;i < dataIds.length ; i ++ ){
		if (document.getElementById(fromForm + ":" +dataIds[i]) && document.getElementById(toForm + ":" +dataIds[i])){
			document.getElementById(toForm + ":" +dataIds[i]).value = document.getElementById(fromForm + ":" +dataIds[i]).value;
		}else if(document.getElementById(dataIds[i]) && document.getElementById(toForm + ":" +dataIds[i])){
			document.getElementById(toForm + ":" +dataIds[i]).value = document.getElementById(dataIds[i]).value;
		}
	}
}
/**
 * 从form中获得OCX的行数据 (以#2隔开)
 * fromName : Form名 (String)
 * columnOrder : OCX的行顺序 (String)
 */
form_utils.getRowDataFromForm = function(formName,columnOrder){
	var field_flag =  String.fromCharCode(2);
	var columns = columnOrder.split(field_flag);
	var datas = "";

	for(var i = 0 ;i < columns.length ; i ++ ){
		if (document.getElementById(formName + ":" +columns[i])){
			datas = datas + document.getElementById(formName + ":" +columns[i]).value + field_flag;
		}
		else if(document.getElementById(formName).contains(document.getElementById(columns[i]))){
			datas = datas + document.getElementById(columns[i]).value  + field_flag;
		}else{
			datas = datas + "" + field_flag;
		}
	}
	return datas;
}
/**
 *	对增删改form的管理
 */
form_utils.DataFormManage = function(form,queryBtn,columnOrder){
	this._form = form;
	this._queryBtn = queryBtn;
	this._isHavaData = false;
	this._columnOrder = columnOrder;
	this._formData = null;
	this._isAdd = false;
	this._isEdit = false;
}
form_utils.DataFormManage.prototype.init = function(){
	form = this._form;
	queryBtn = this._queryBtn;
	if(form.addBtn && form.editBtn && form.delBtn && form.saveBtn && form.cancelBtn){
		form.addBtn.disabled = false;
		form.editBtn.disabled = true;
		form.delBtn.disabled = true;
		form.saveBtn.disabled = true;
		form.cancelBtn.disabled = true;
		if(queryBtn)queryBtn.disabled = false;
		this._isHavaData = false;
	}
	if(form.form){
		clearForm(form.form);
		setFormDie(form.form);
	}
	this._isAdd = false;
	this._isEdit = false;
}
form_utils.DataFormManage.prototype.change = function(data){
	this._formData = data;
	if(	this._isAdd || this._isEdit) {this.cancel();}
	form = this._form;
	queryBtn = this._queryBtn;
	if(form.addBtn && form.editBtn && form.delBtn && form.saveBtn && form.cancelBtn){
		form.addBtn.disabled = false;
		form.editBtn.disabled = false;
		form.delBtn.disabled = false;
		form.saveBtn.disabled = true;
		form.cancelBtn.disabled = true;
		if(queryBtn)queryBtn.disabled = false;
		this._isHavaData = true;
	}
	if(form.form ){
		form_utils.setRowDataToForm(this._form.idName,this._columnOrder,data);
	}
	this._isAdd = false;
	this._isEdit = false;
}
form_utils.DataFormManage.prototype.add = function(){
	form = this._form;
	queryBtn = this._queryBtn;
	if(form.addBtn && form.editBtn && form.delBtn && form.saveBtn && form.cancelBtn){
		form.addBtn.disabled = true;
		form.editBtn.disabled = true;
		form.delBtn.disabled = true;
		form.saveBtn.disabled = false;
		form.cancelBtn.disabled = false;
		if(queryBtn)queryBtn.disabled = true;
	}
	if(form.form){
		clearForm(this._form.form);
		setFormActive(this._form.form);
		this._isDie = false;
	}
	this._isAdd = true;
	this._isEdit = false;
}
form_utils.DataFormManage.prototype.edit = function(){
	form = this._form;
	queryBtn = this._queryBtn;
	if(form.addBtn && form.editBtn && form.delBtn && form.saveBtn && form.cancelBtn){
		form.addBtn.disabled = true;
		form.editBtn.disabled = true;
		form.delBtn.disabled = true;
		form.saveBtn.disabled = false;
		form.cancelBtn.disabled = false;
		if(queryBtn)queryBtn.disabled = true;
	}
	if(form.form){
		setFormActive(this._form.form);
	}
	this._isAdd = false;
	this._isEdit = true;
}
form_utils.DataFormManage.prototype.del = function(){
	form = this._form;
	ueryBtn = this._queryBtn;
	if(form.addBtn && form.editBtn && form.delBtn && form.saveBtn && form.cancelBtn){
		form.addBtn.disabled = false;
		form.editBtn.disabled = true;
		form.delBtn.disabled = true;
		form.saveBtn.disabled = true;
		form.cancelBtn.disabled = true;
		if(queryBtn)queryBtn.disabled = true;
		this._isHaveData = false;
	}
	if(form.form){
		clearForm(this._form.form);
		setFormDie(this._form.form);
		this.formData = null;
	}
	this._isAdd = false;
	this._isEdit = false;
}
form_utils.DataFormManage.prototype.save = function(){
	form = this._form;
	queryBtn = this._queryBtn;
	if(form.addBtn && form.editBtn && form.delBtn && form.saveBtn && form.cancelBtn){
		form.addBtn.disabled = false;
		form.editBtn.disabled = false;
		form.delBtn.disabled = false;
		form.saveBtn.disabled = true;
		form.cancelBtn.disabled = true;
		if(queryBtn)queryBtn.disabled = false;
	}
	if(form.form){
		setFormDie(form.form);
		this._formData = form_utils.getRowDataFromForm(this._form.idName,this._columnOrder);
	}
	this._isAdd = false;
	this._isEdit = false;
}
form_utils.DataFormManage.prototype.cancel = function(){
	form = this._form;
	queryBtn = this._queryBtn;
	isHaveData = this._isHavaData;
	if(form.addBtn && form.editBtn && form.delBtn && form.saveBtn && form.cancelBtn){
		form.addBtn.disabled = false;
		form.editBtn.disabled = !isHaveData;
		form.delBtn.disabled = !isHaveData;
		form.saveBtn.disabled = true;
		form.cancelBtn.disabled = true;
		if(queryBtn)queryBtn.disabled = false;
	}
	if(form.form){
		setFormDie(form.form);
		if(!isHaveData){
			clearForm(this._form.form);
		}
		else{
			form_utils.setRowDataToForm(this._form.idName,this._columnOrder,this._formData);
		}
	}
	this._isAdd = false;
	this._isEdit = false;
}
form_utils.DataFormManage.prototype.isAdd = function(){
	return this._isAdd;
}
form_utils.DataFormManage.prototype.isEdit = function(){
	return this._isEdit;
}
form_utils.DataFormManage.prototype.getFormData = function(){
	return this._formData;
}
form_utils.DataFormManage.prototype.getColumnOrder = function(){
	return this._columnOrder;
}

/**
 * jiangjz： 把form转化为js对象，只包含常用类型type＝text等
 */
form_utils.convertFormObj = function(form){
	var myForm = form ;
    var returnValue = {};
	for(i=0; i<myForm.elements.length; i++){
		var oObj = myForm.elements[i];
		if( oObj.tagName.toUpperCase() == "SELECT" ) {
			form_utils.setObjValue(myForm,returnValue,oObj);
		}
		else if( (oObj.tagName.toUpperCase() != "INPUT"&& oObj.tagName.toUpperCase() != "TEXTAREA")||
		    oObj.type.toUpperCase() == "BUTTON" ||
		    oObj.type.toUpperCase() == "SUBMIT" ||
		    oObj.type.toUpperCase() == "RESET" ||
		    oObj.type.toUpperCase() == "IMAGE"
                   // oObj.name == "com.sun.faces.VIEW"
        ){
			continue;
		}else{
             form_utils.setObjValue(myForm,returnValue,oObj);
        }
	}
    //returnValue.extend = null;//去除prototype扩展-------->jjz:已经统一在doStructXML转换（Map）的时候处理
	return returnValue;
}
/**
 * 获得oTag HTMLDOM元素的id（或name）即其value，放入returnValue对象
 * 此方法把 含有冒号的属性名，如JSF生成的元素，去除冒号及其前面内容，作为属性名
 */
form_utils.setObjValue = function(form,returnValue,oTag)
{
    var propertyName ;
    var propertyValue ;
    if ( (oTag.id != null) && ("" != oTag.id) ){
        propertyName = oTag.id;
    }
    else{
        propertyName = oTag.name;
    }
    var index = propertyName.indexOf(":");
    var orinPropName = propertyName;//保存原始属性名
    propertyName = propertyName.substring(index+1);//去除jsf冒号前字符

    propertyValue = oTag.value;
    if ( oTag.type.toUpperCase() == "RADIO" ){//radio 选中就赋值
        if ( !oTag.checked )
            return;
    }
    else if ( oTag.type.toUpperCase() == "CHECKBOX" ){
      if ( form[orinPropName].length>1 ) {//重复id的，以数组形式传送
        if ( oTag.checked )
          propertyValue = form_utils.setObjArrValue(form,oTag,returnValue[propertyName]);
        else
          return;
      }
      else{//非重复的，直接发boolean
         propertyValue = oTag.checked;
      }
    }

    //判断是否有mapping映射
    if (oTag.mapping!=null) propertyName = oTag.mapping;
    returnValue[propertyName] = propertyValue;
}

/**
 * rzy： 把form转化为js对象带MAP，只包含常用类型type＝text等
 * 用于用户关键信息屏蔽
 */
form_utils.convertFormObjWithMap = function(form,map){
	var myForm = form ;
    var returnValue = {};
	for(i=0; i<myForm.elements.length; i++){
		var oObj = myForm.elements[i];
		if( oObj.tagName.toUpperCase() == "SELECT" ) {
			form_utils.setObjValue(myForm,returnValue,oObj);
		}else if( (oObj.tagName.toUpperCase() != "INPUT" && oObj.tagName.toUpperCase() != "TEXTAREA")||
		    oObj.type.toUpperCase() == "BUTTON" ||
		    oObj.type.toUpperCase() == "SUBMIT" ||
		    oObj.type.toUpperCase() == "RESET" ||
		    oObj.type.toUpperCase() == "IMAGE"){
			continue;
		}else{
			if(oObj.value.indexOf("*")>-1){//是已屏蔽信息未修改，取MAP里的值
				if ( (oObj.id != null) && ("" != oObj.id) ){
				    propertyName = oObj.id;
				}else{
				    propertyName = oObj.name;
				}
				var propertyValue = map.get(propertyName);
				var index = propertyName.indexOf(":");
				if(propertyValue){		
				    returnValue[propertyName.substring(index+1)] = propertyValue.toString();
				}else{
					returnValue[propertyName.substring(index+1)] = oObj.value;
				}
			}else{
                form_utils.setObjValue(myForm,returnValue,oObj);
			}
        }
	}
	return returnValue;
}

//重复id的，以数组形式追加返回
//form 为提交的form对象，oTag为当前元素对象，lastValue为id对应的当前值
form_utils.setObjArrValue = function(form,oTag,lastValue){
    var arrValue;
    if (lastValue!=null){
            lastValue[lastValue.length]=oTag.value;
            arrValue = lastValue;
    }else {
        arrValue = new Array();
        arrValue[0] = oTag.value;
    }
    return arrValue;
}

var validate_utils = new Object();
/**
 * 验证两个日期在同一个月.
 */
validate_utils.isInSameMonth = function(oEle1,oEle2,text){
	var oEle1 = eval(oEle1);
	var oEle2 = eval(oEle2);
	var date1 = new Date(Date.parse(oEle1.value));
	var date2 = new Date(Date.parse(oEle2.value));
	if(( date1.getFullYear() == date2.getFullYear() )&&( date1.getMonth() == date2.getMonth() )){
		return true;
	}
	if(text)
		showMsg(text + "的开始日期与截止日期应在同一月份，请重新输入.");
	else
		showMsg("开始日期与截止日期应在同一月份，请重新输入.");
	return false;
}
/**
 * 验证两个日期在同一个月的两天内.
 */
validate_utils.isInTowDate = function(oEle1,oEle2,text){
	var oEle1 = eval(oEle1);
	var oEle2 = eval(oEle2);
	var date1 = new Date(Date.parse(oEle1.value));
	var date2 = new Date(Date.parse(oEle2.value));
	if(( date1.getFullYear() == date2.getFullYear() )&&( date1.getMonth() == date2.getMonth() )
			&&( date1.getDate()-date2.getDate()<=1 && date1.getDate()-date2.getDate()>=-1 )){
		return true;
	}
	if(text)
		showMsg(text + "的开始日期与截止日期应在同一个月的两天内，请重新输入.");
	else
		showMsg("开始日期与截止日期应在同一个月的两天内，请重新输入.");
	return false;
}
/**
 * 验证两个日期在同一个月的两天内.
 */
validate_utils.isStartBeforEnd = function(oEle1,oEle2,text){
	var oEle1 = eval(oEle1);
	var oEle2 = eval(oEle2);
	var date1 = Date.parse(oEle1.value);
	var date2 = Date.parse(oEle2.value);
	if(date1<=date2){
		return true;
	}
	if(text)
		showMsg(text + "的开始日期不能大于截止日期，请重新输入.");
	else
		showMsg("开始日期不能大于截止日期，请重新输入.");
	return false;
}
var date_utils = new Object();
date_utils.getTodayString = function(){
	var date = new Date();
	return ""+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
}
date_utils.getYesterdayString = function(){
	var date = new Date(Date.parse(new Date())-86400000);
	return ""+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
}

      //**********************************************回车转换焦点控制 zhangxw begin*****************************************
      //引用页面上可获得焦点元素类型
      var JumpTypeArray  = new Array("text", "password", "submit", "reset", "button", "textarea", "checkbox", "radio",
              "select", "select-one", "select-multiple", "file");
      //引用页面上需排除元素类型
      var DebarTypeArray = new Array("submit", "reset", "button", "checkbox", "radio", "select", "select-one",
              "select-multiple", "hidden");
      //要触发的元素类型
      var BtnTypeArray   = new Array("submit", "reset", "button");

      //检查给定串是否在指定字符串数组中,如在返回索引号,否返回-1;
      function inStrArray(src, dec) {
        for (var i = 0; i < dec.length; i++) {
          if (src == dec[i]) {
            //定位成功,返回索引号
            return i;

            break;
          }
        }

        //定位失败,返回-1
        return -1;
      }

      //回车响应函数
      function checkCR() {
        var args1 = arguments[0];
        var args2 = arguments[1];
        var evt   = (args1)
                    ? args1
                    : ((event)
        ? event
        : null);
        var node  = (evt.target)
                    ? evt.target
                    : ((evt.srcElement)
        ? evt.srcElement
        : null);
        //指定FORM名称，默认取为页面中的第一个
        var frm   = (args2)
                    ? document.getElementById(args2)
                    : document.forms[0];

        //判断当前对象是否为可输入对象,对象类型数组:JumpTypeArray
        if ((evt.keyCode == 13) && (inStrArray(node.type, JumpTypeArray) != -1)) {
          for (var i = 0; i < frm.elements.length; i++) {
            //定位当前对象
            if (frm.elements[i].id == node.id) {
              for (var j = i + 1; j < frm.elements.length; j++) {
                //对象数组索引越位判断
				if ((j) < frm.elements.length && (!frm.elements[j].readOnly) && (!frm.elements[j].disabled)) {
                  //判断当前对象下一个对象是否为可输入组件,对象类型数组:JumpTypeArray
                  if (inStrArray(frm.elements[j].type, JumpTypeArray) != -1) {
                    if (inStrArray(frm.elements[j].type, BtnTypeArray) != -1) {
                      frm.elements[j].onclick();
                    } else {
                      //设置焦点
                      frm.elements[j].focus();

                      //过滤不可选中文本对象,对象类型数组:DebarTypeArray
                      if (inStrArray(frm.elements[j].type, DebarTypeArray) == -1) {
                        //选中组件文本内容
                        frm.elements[j].select();
                      }
                    }

                    //禁止提交表单内容
                    evt.returnValue=false;
        		    evt.cancel = true;

                    break;
                  }
                }
              }
            }
          }
        }
      }

      //**********************************************回车转换焦点控制 zhangxw begin*****************************************

//把form转化为js的Array对象，该Array对象包含两个Array对象，Array[0]为id的列表，Array[1]为值的列表，id和值一一对应
function convertFormToArray(form){
	var myForm = form ;
    var returnValue = new Array();    //form转化后的返回值
    var keys = new Array();           //id列表
    var values  = new Array();        //值列表
	var m = 0;                        //数组index

	for(i=0; i<myForm.elements.length; i++){
		var oObj = myForm.elements[i];
		if( (oObj.tagName.toUpperCase() != "INPUT"&& oObj.tagName.toUpperCase() != "TEXTAREA" && oObj.tagName.toUpperCase() != "SELECT")||
		    oObj.type.toUpperCase() == "BUTTON" ||
		    oObj.type.toUpperCase() == "SUBMIT" ||
		    oObj.type.toUpperCase() == "RESET" ||
		    oObj.type.toUpperCase() == "IMAGE"
		    ){
			continue;
		}else
		{
			var propertyName = oObj.id;
		    var index = propertyName.indexOf(":");
    		var orinPropName = propertyName;//保存原始属性名
    		propertyName = propertyName.substring(index+1);//去除jsf冒号前字符

    		if (propertyName != "" && propertyName != "undefined")
    		{
				keys[m] = propertyName;
				if (oObj.tagName.toUpperCase() == "RADIO" || oObj.tagName.toUpperCase() == "CHECKBOX")
				{
					values[m] = oObj.checked;
				}
				else
				{
					values[m] = oObj.value;
				}
				m++;
			}
        }
	}
	returnValue[0] = keys;
	returnValue[1] = values;
	return returnValue;
}

/**	函数clone()
 *  深度对象克隆，返回克隆对象
 *	@param : myObj  原对象
 **/
function clone(myObj)
{
	var myNewObj;
 	if(typeof(myObj) != 'object') return myObj;
	if(myObj == null) return myObj;
	var con = myObj.constructor;
	if (con==Array)
		myNewObj = new Array();
	else if (con==Map)
		myNewObj = new BuffaloMap();
	else
		myNewObj = new Object();

	for(var i in myObj)
		myNewObj[i] = clone(myObj[i]);
	return myNewObj;
}


/**
 * 二维码读取
 * 注：二维码控件命名统一为ImagecoReader
**/

function ImagecoReaderInit() {
	if (document.all.ImagecoReader.ReaderInit(1, '', 0, '') != 0) {
		//showMsg(document.all.ImagecoReader.GetLastError);
		window.status = document.all.ImagecoReader.GetLastError;
		window.setTimeout("timingInit", 1000);
	}
}

function timingInit()  {
	var result = document.all.ImagecoReader.ReaderInit(1, '', 0, '');
	window.status = document.all.ImagecoReader.GetLastError;
}

function closeImagecoReader() {
	if( document.all.ImagecoReader.ReaderClose != 0){
	 	showMsg(document.all.ImagecoReader.GetLastError); 
	 	return false;
	 }
	 return true;
}

function getReaderState() {
	if( document.all.ImagecoReader.GetReaderState != 0 ) {
		showMsg(document.all.ImagecoReader.GetLastError);
		return false;
	}
	return true;
}

var iTimerID;
var read_times = 0;

function readImageco() {
	read_times= 0
	document.all.ImagecoReader.OpenReaderLight;
	iTimerID = window.setInterval("getData()", 500);	
}

function getData(){	
	var pOutData = document.all.ImagecoReader.GetReaderData(0, 'bin');
	read_times++;
	//sTimes.value = read_times;
	if(null != pOutData && pOutData.length!=0){
	  closeImagecoReader();
	  //sData.value = pOutData;
	  obj = null;
	  window.clearTimeout(iTimerID);
	  document.all.ImagecoReader.CloseReaderLight;
	  var sSplitStr="~";
	  var aBin=pOutData.split(sSplitStr);
	  if(aBin.length==4){
	  	obj = new Object();
	  	obj["msisdn"]=aBin[0]; //手机号码
	  	obj["card_no"]=aBin[1];//VIP卡号
	  	obj["card_level"]=aBin[2]; //等级
	  	obj["exprie_time"]=aBin[3]; //有效期
	  	
	  }
	  /**if( null != obj["msisdn"] && acceptMsisdn != obj["msisdn"] ) {
	  	showMsg("VIP卡号为"+obj["card_no"]+"("+obj["msisdn"]+")，非当前受理用户！");
	  	return ;
	  } else if(null != obj["msisdn"] && null != obj["card_no"] ) {
	  	queryVIPInfo(obj["msisdn"], obj["card_no"]);
	  }*/
	  getImagecoInfo(obj);
	}
	if( read_times > 40 ) {
	  document.all.ImagecoReader.CloseReaderLight;
	  window.clearTimeout(iTimerID);
	}
}

/**查询VIP用户信息**/
function queryVIPInfo(msisdn, card_no) {
	var vipinfo;
	buffalo.remoteCall("QueryGrpCustMgr.queryVIPUserInfo", [msisdn, card_no], function(reply){
          var result = reply.getResult();
          if( !reply.isFault() ) {
          	//vipinfo = result;
          	setVIPUserInfo(result);
          }
         
    });
}

/**
 *设置界面元素对象隐藏或显示
 *@param hidden_id: 要隐藏的元素的ID，
 *@param show_id : 要显示的元素的ID，
 *@param save_flag :同步标志，0-'hidden_id'同步到'show_id'，1-'show_id'同步到'hidden_id',其它值为不同步.
 */
function setHiddenAndShow(hidden_id,show_id,save_flag){
	if(document.getElementById(hidden_id)!=null && document.getElementById(hidden_id)!="undefined"){
		document.getElementById(hidden_id).style.display = "none";
	}
	if(document.getElementById(show_id)!=null && document.getElementById(show_id)!="undefined"){
		document.getElementById(show_id).style.display = "block";
	}
	if(document.getElementById(hidden_id)==null || document.getElementById(hidden_id)=="undefined" 
	   || document.getElementById(show_id)==null || document.getElementById(show_id)=="undefined") return;		
	if(save_flag=="0"){
		document.getElementById(show_id).value=document.getElementById(hidden_id).value;
	}else if(save_flag=="1"){
		document.getElementById(hidden_id).value=document.getElementById(show_id).value;
	}
}
/*
 * 客服是否查询home_city,目前只支持手机号码
 * @param objid: 号码
 * @param objtype: 类型
 */
function isQueryHomecity(obj_id,obj_type){
	if(obj_type == "0"){
		return true;
	}else{
		return false;
	}
}
/**
 * 查询归属地市并缓存msisdnObj
 * @param msisdnObj
 * @param isReset  是否重置工作区
 * @return
 */
function saveMsisdnObject(msisdnObj,isReset){
	writeUtilLog("_saveMsisdnObject objid:"+msisdnObj.msisdn,21);
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	keyInfo.push("obj_id");
	valueInfo.push(msisdnObj.msisdn);
	keyInfo.push("obj_type");
	valueInfo.push(msisdnObj.crmtype);
	keyInfo.push("call_city");
	valueInfo.push(msisdnObj.callcity);	
    resInfo[0]="-1";
	buffalo.remoteCall("jsf:BaseOprAction.callService",["10001563","60500021", keyInfo, valueInfo, resInfo, false], function(reply){//BM_QueryHomeCityByMsisdn
		var result = reply.getResult();
		var bosstop=getUtilsTop();
		var csp_storage = bosstop.bossinfo_storage.ccms_operate_iframe;
		if(result.retResult==0) {
			var bean = result.returnBean;
			if(isLocalCity(bean.home_city)){
			    msisdnObj.city = bean.home_city;			    
			    try{			      
			      var akey=csp_storage.getAcceptKey(msisdnObj.msisdn);
			      writeUtilLog("_saveMsisdnObject akey:"+akey,21);
			      var obj=bosstop.getFromWebPubHashtable(akey);			      
			      if(obj){
			      	  obj.city = bean.home_city;
			      	  if(!isReset){//呼入号码变更时才通知 
			               csp_storage.isChangeInputNumber(msisdnObj.msisdn,"",bean.home_city);
			          }
			      }else{
			    	  if(!isReset){//呼入号码变更时才通知			    		  
			    	      csp_storage.isChangeInputNumber(msisdnObj.msisdn,"",bean.home_city);
			    	  }
			    	  _saveAcceptCityObjectBean(msisdnObj.msisdn,msisdnObj.crmtype,bean);
			    	  bosstop.saveToWebPubHashtable(akey,msisdnObj);
			    	  writeUtilLog("_saveMsisdnObject save "+akey,21);
			      }
			    }
			    catch(ex){
			        writeUtilLog("_saveMsisdnObject description:"+ex.description,21);
			    }			   
			}else{
				showMsg("该号码归属地为"+bean.home_city_name+",省外用户号码不能受理该业务");
			}
			if(isReset)
			    csp_storage.resetWorkZone("");
			return true;
		}
		else if(result.retResult==999999999){
			showFilterMsg("没有找到该号码归属地市",999999999);
			if(isReset)
			    csp_storage.resetWorkZone("");
			return false;
		}
		else{
			showFilterMsg(result.retMsg,999999999);
			if(isReset)
			    csp_storage.resetWorkZone("");
			return false;
		}
	});
}
/*
 * 自动跳转到主动营销推荐页签
 */
function autoSalecaseRecommend(obj_id,obj_type,home_city,home_city_name,channel_id){
	var bosstop=getUtilsTop();
	if(!bosstop.isOffline() && bosstop.isLocalAccept()){
 	    buffalo.remoteCall("jsf:CaseSendMng.querySaleCase4CSP",
 		  ["10500142",home_city,obj_id,channel_id], function(reply){
 			var	marketingWaveInfo = reply.getResult();
 			writeCspLog("autoSalecaseRecommend length:"+marketingWaveInfo.length,"22");
 			if (marketingWaveInfo!=null && marketingWaveInfo.length>0) {
 				var sendLink = "bm/management/sale/casecfg/bm_salecase_recommend_csp.jsf";
 				bosstop.selectMenuReflash(sendLink,"10500142","主动营销推荐","410500142");
 			}
 	    });
	}
}
/*
* BM_QueryHomeCityByObjType 
* callBack: 回调函数
* @param objid: 号码
* @param objtype: 类型
* @param callBack: 回调
* @param ext: 扩展回传对象
* @param isAllRet: 扩展是否省外回调 true时所有都回调,false和undefined时如果是外省将弹出不能受理  
* 返回：号码，类型，归属地 不管省内还是省外都返回
* 典型用法：queryHomeCityByObjType("138311111111", "0",setObjHomeCity,"21012530");
*/
function queryHomeCityByObjType(objid,objtype,callBack,ext,isAllRet){
   var cushobj=getAcceptCityObjectBean(objid,objtype);
   if(cushobj!=null){
      _callCityObjectBack(objid,objtype,cushobj,callBack,ext,isAllRet);
      return;
   }
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	keyInfo.push("obj_id");
	valueInfo.push(objid);
	keyInfo.push("obj_type");
	valueInfo.push(objtype);
	var call_city="";
	try{
	   if(getUtilsTop().isNGCSConnect()){
   	   var obj=getUtilsTop().getAcceptAsObject(objid);
   	   if(obj){
   	      call_city=obj.callcity;
   	      writeUtilLog("queryHomeCityByObjType call_city:"+call_city,21);
   	   }
      }
	}
	catch(ex){
	}
	keyInfo.push("call_city");
	valueInfo.push(call_city);
	
   resInfo[0]="-1";
	buffalo.remoteCall("jsf:BaseOprAction.callService",["10001563","60500021", keyInfo, valueInfo, resInfo, false], function(reply){//BM_QueryHomeCityByMsisdn
		var result = reply.getResult();
		if(result.retResult==0) {
			var bean = result.returnBean;
			_callCityObjectBack(objid,objtype,bean,callBack,ext,isAllRet);
		}
		else if(result.retResult==999999999){
			showFilterMsg("没有找到该号码归属地市",999999999);
		}
		else{
			showFilterMsg(result.retMsg,999999999);
		}
	});
}
//回调
function _callCityObjectBack(objid,objtype,bean,callBack,ext,isAllRet){
   var bosstop=getUtilsTop();
   try{
      writeUtilLog("_callCityObjectBack objid:"+objid+",objtype:"+objtype+",callBack:"+callBack+",isAllRet:"+isAllRet,21);
   	_saveAcceptCityObjectBean(objid,objtype,bean);
   	if(isAllRet)
   		callBack(objid,objtype,bean.home_city,bean.home_city_name,ext);
   	else{
   		if(isLocalCity(bean.home_city))
   			callBack(objid,objtype,bean.home_city,bean.home_city_name,ext);
   		else
   			showMsg("该号码归属地为<font size=3 color=red>"+bean.home_province_name+bean.home_city_name+"</font>,省外用户号码不能受理该业务");
   	}
   }
   catch(ex){
   }
}
/**
 * 将查询号码转成相应的手机号码
 * 目前支持无线通转换，其他类型再扩展
 */
function _changeNumberToMsisdn(sysfunc_id,obj_id,obj_type,obj_home_city,call_back){
	if(obj_type!="13"){
		call_back(obj_id);
		return false;
	}
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	resInfo[0]="row-*";		
	keyInfo.push( "home_city" ); 
	valueInfo.push( obj_home_city );	
	keyInfo.push( "phone_number" ); 
	valueInfo.push( obj_id );

	buffalo.remoteCall("jsf:BaseOprAction.callService",["10001648", sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply) {
		var result = reply.getResult() ;
		if ( result.retResult == 0 && result.retResult != 999999999) {
			var bean = result.returnList[0];
			call_back(bean.msisdn);
		}else if( result.retResult == 999999999){
			showMsg("没有找到对应的移动手机号码！");	
			return false;
		 }else {
			showMsg(result.retMsg);
			return false;
		}
	});
}
var accept_city_keys="accept_city_bean_cush";//缓存框架关键字
/*
* 获取号码归属地缓存信息
* @param objid: 号码
* @param objtype: 类型
* 返回 不存在对象时返回null 
*/
function getAcceptCityObjectBean(objid,objtype){
   var bosstop=getUtilsTop();
   try{
      writeUtilLog("getAcceptCityObjectBean objid:"+objid+",objtype:"+objtype,21);
      var ikey=accept_city_keys+"_"+objid+"_"+objtype;
      var obj= bosstop.getFromWebPubHashtable(ikey);
      if(obj)
         return obj;
   }
   catch(ex){
      writeUtilLog("getAcceptCityObjectBean description:"+ex.description,21);
   }
   return null;
}
function writeUtilLog(msg,type){
   try{
      var bosstop=getUtilsTop();
      if(bosstop.isNGCSConnect())
         bosstop.writeCspLog(msg,type);
   }
   catch(ex){
   }
}
/*
* 缓存号码BEAN信息
* @param objid: 号码
* @param objtype: 类型
* @param bean: 对象
*/
function _saveAcceptCityObjectBean(objid,objtype,bean){
   var bosstop=getUtilsTop();
   try{
      writeUtilLog("_saveAcceptCityObjectBean objid:"+objid+",objtype:"+objtype,21);
      var ikey=accept_city_keys+"_"+objid+"_"+objtype;
      var obj=bosstop.getFromWebPubHashtable(ikey);
      if(!obj){
         writeUtilLog("_saveAcceptCityObjectBean ikey:"+ikey,21);
         bosstop.saveToWebPubHashtable(ikey,bean);
      }
   }
   catch(ex){
      writeUtilLog("_saveAcceptCityObjectBean description:"+ex.description,21);
   }
}
function getCustServiceLevel(objid,objtype){
	try{
		var bosstop=getUtilsTop();
	    writeUtilLog("getCustServiceLevel objid:"+objid+",objtype:"+objtype,21);
	    var ikey=accept_city_keys+"_"+objid+"_"+objtype;
	    var obj=bosstop.getFromWebPubHashtable(ikey);
	    if(obj){
	        writeUtilLog("getCustServiceLevel service_level:"+obj.service_level,21);
	        return obj.service_level;
	    }else{
	    	return "";
	    }
	}catch(ex){
	    writeUtilLog("_saveAcceptCityObjectBean description:"+ex.description,21);
    }
}
//是否福州地市
function isLocalCity(city){
	var reg=/(^59[0-9]{1})$/;
	return reg.test(city);
}
/**
 * 自动测试系统改造
 */
function getUtilsTop(){
	var theParent = self;
	while( theParent != theParent.parent && theParent.name != "ccmsFrame"){
		theParent = theParent.parent;
	}
	return theParent;
}
/**
 * 分隔IVR输入字符窜返回对应位置值
 * @param cspstr string: IVR输入字符窜
 * @param at int:位置
 * 返回对应位置的值 如果不存在则返回空
 */
function splitCspAsStr(cspstr,at){
   var arys=cspstr.split(IVR_SPLIT);
   if(arys.length<=at||at<0)
      return "";
   return arys[at];
}
/**
 * 分隔IVR输入字符窜返回数组
 * @param cspstr string: IVR输入字符窜
 * 返回数组
 */
function splitCspAsArray(cspstr){
   return cspstr.split(IVR_SPLIT);
}
/**
 * 获取IVR密码输入 验证结果（0成功，1失败）
 * @param cspstr string: IVR输入字符窜
 * 返回 验证结果（0成功，1失败）
 */
function getIVRPwdInputResult(cspstr){
   return splitCspAsStr(cspstr,IVR_PWD_INPUT_RESULT);
}
/**
 * 获取IVR密码输入 用户的输入
 * @param cspstr string: IVR输入字符窜
 * 返回用户的输入
 */
function getIVRPwdInputUserInput(cspstr){
   return splitCspAsStr(cspstr,IVR_PWD_INPUT_INPUT);
}

var accept_relation_keys="accept_user_relation_cush";//缓存受理关联用户关键字

function getAcceptMsisdnObjectBean(objid){
   var bosstop=getUtilsTop();
   try{
      writeUtilLog("getAcceptMsisdnObjectBean objid:"+objid,21);
      var ikey=accept_relation_keys+"_"+objid;
      var obj= bosstop.getFromWebPubHashtable(ikey);
      if(obj)
         return obj;
   }
   catch(ex){
      writeUtilLog("getAcceptMsisdnObjectBean description:"+ex.description,21);
   }
   return null;
}
/*
* 缓存号码BEAN信息
* @param objid: 号码
* @param objtype: 类型
* @param bean: 对象
*/
function _saveAcceptMsisdnObjectBean(objid,bean){
   var bosstop=getUtilsTop();
   try{
      writeUtilLog("_saveAcceptMsisdnObjectBean objid:"+objid,21);
      var ikey=accept_relation_keys+"_"+objid;
      var obj=bosstop.getFromWebPubHashtable(ikey);
      if(!obj){
         writeUtilLog("_saveAcceptMsisdnObjectBean ikey:"+ikey,21);
         bosstop.saveToWebPubHashtable(ikey,bean);
      }
   }
   catch(ex){
      writeUtilLog("_saveAcceptMsisdnObjectBean description:"+ex.description,21);
   }
}
function _isAuthenticatUrl(sUrl){
      return sUrl.indexOf("authentication.js")>0
            ||sUrl.indexOf("cs_icopen_main.js")>0
            ||sUrl.indexOf("cs_ip.js")>0
            ||sUrl.indexOf("cs_gps.js")>0
            ||sUrl.indexOf("cs_datacard.js")>0
            ||sUrl.indexOf("cs_doublecardopen_main.js")>0
            ||sUrl.indexOf("bm_wireless_open.js")>0
            ||sUrl.indexOf("cs_NGicopen_main.js")>0
         //   ||sUrl.indexOf("cs_NGip.js")>0
            ||sUrl.indexOf("cs_NGgps.js")>0
            ||sUrl.indexOf("cs_NGdatacard.js")>0
            ||sUrl.indexOf("cs_NGdoublecardopen_main.js")>0
            ||sUrl.indexOf("bm_refundment.js")>0
            ||sUrl.indexOf("bm_NGwithdraw_deposit.js")>0
            ||sUrl.indexOf("cs_grpmeminfo_main.js")>0
            ||sUrl.indexOf("bm_acard_sale.js")>0
            ||sUrl.indexOf("bm_person_flow_manage_recommend_chart.js")>0
            ||sUrl.indexOf("cs_grp_open_main.js")>0
            ||sUrl.indexOf("cs_classgrpmeminfo_main.js")>0
            ||sUrl.indexOf("bm_NGdrwmin_deposit.js")>0
            ||sUrl.indexOf("realname_record.js")>0
            ||sUrl.indexOf("cs_finemsisdn_open_main.js")>0
            ||sUrl.indexOf("bm_netMsisdn_order_deal_main_new.js")>0;
            
}
//IVR密码返回位置定义  业务流程标志~密码类型~验证结果（0成功，1失败）~欠费标志~用户的输入~受理号码
var IVR_PWD_INPUT_FLOWSIGN=0;//业务流程标志
var IVR_PWD_INPUT_PWDTYPE =1;//密码类型
var IVR_PWD_INPUT_RESULT  =2;//验证结果（0成功，1失败）
var IVR_PWD_INPUT_SIGN    =3;//欠费标志
var IVR_PWD_INPUT_INPUT   =4;//用户的输入
var IVR_PWD_INPUT_ACCEPTNO=5;//受理号码
var IVR_SPLIT="~";//IVR分隔符

/*
 * 调用服务引导短信发送接口传短信
 * sendObj 发送对象
 * sendObj.recv_nbr 接收号码
 * sendObj.sms_content 短信内容 *
 */
function sendSMS(sendObj){
	var sendLink = new Object();
	sendObj.account="10";
	sendObj.serv_type="10207501";
	sendObj.is_close="YES";
	BFC.util.DOM.getTop().saveToWebPubHashtable("crm_send_obj",sendObj);
    sendLink.href="sp/servicepilot/page_entry.jsp?actual_url=sms/sms_send/index.jsp";
    BFC.util.DOM.getTop().selectMenuReflash(sendLink,"61713000","电子答案发送","461713001");
}
/*
 * 发送139邮箱
 */
function send139email(sysfunc_id,home_city,msisdn,mms_title,info,serv_type,busicode){
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	
    keyInfo.push("opr_code");
	valueInfo.push("1");
	keyInfo.push("msisdn");
	valueInfo.push(msisdn);
	keyInfo.push("home_city");
	valueInfo.push(home_city);
	keyInfo.push("account");
	valueInfo.push("11");
	keyInfo.push("serv_type");
	valueInfo.push(serv_type);
	keyInfo.push("long_msg");
	valueInfo.push("M");
	keyInfo.push("recv_nbrs");
	valueInfo.push(msisdn+"@139.com");
	keyInfo.push("send_flag");
	valueInfo.push("1");
	keyInfo.push("send_nbr");
	valueInfo.push("139");
	keyInfo.push("mms_title");
	valueInfo.push(mms_title);
	keyInfo.push("busicode");
	valueInfo.push(busicode);
	keyInfo.push("info");
	valueInfo.push(info);
	buffalo.remoteCall("jsf:BaseOprAction.callService",['10001911',sysfunc_id,keyInfo,valueInfo,resInfo,false], function(reply){
		var result = reply.getResult();
		if( result.retResult==0||result.retResult==999999999){
			showFilterMsg("邮件发送成功!","999999999");
		}else if(result.retResult==109997){
			showFilterMsg("用户产品数据过多，超过mail限制，发送失败!","999999999");
		}else{
			showFilterMsg(result.retMsg, result.retResult);
		}
	});
}
function pointConversion(str){
	var result = "";
	for (i=0 ; i<str.length; i++)   
	{   
		code = str.charCodeAt(i);//获取当前字符的unicode编码   
		if (code == 33 || code == 44 || code == 46 || code == 58 || code == 60 || code == 62 || code == 63)//在这个unicode编码范围中的是所有的英文字母已及各种字符   
		{   
			result += String.fromCharCode(str.charCodeAt(i) + 65248);//把全角字符的unicode编码转换为对应半角字符的unicode码   
		}else{   
			result += str.charAt(i);   
		}   
	}
	return  result.replace(/\r\n/ig,"<br>").replace(/\n/ig,"<br>").replace(/\r/ig,"<br>");
}   
/**
 * 校验客户经理管辖成员
 * @param managerObj
 * @param sysfunc_id
 * @param func_type
 * @param callback
 * @param param1
 * @param param2
 * @return
 */
function authManagerMember(managerObj,sysfunc_id,func_type,callback,param1,param2){
	var acceptObj = BDOM.getTop().getAcceptObjectInfo();//当前受理号码
	var keyInfo = [];
    var valueInfo = [];
    var resInfo = [];
    keyInfo.push("home_city");
    keyInfo.push("manager_id");
    keyInfo.push("service_type");
    keyInfo.push("msisdn_info-home_city"); 
    keyInfo.push("msisdn_info-msisdn"); 
    valueInfo.push(managerObj.city);
    valueInfo.push(managerObj.managerid);
    valueInfo.push("12");
    valueInfo.push(acceptObj.city);
    valueInfo.push(acceptObj.msisdn);
    resInfo.push("-1");
    //buffalo.setDebug(true);
    buffalo.remoteCall("jsf:BaseOprAction.callService",
    ["10001485", sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply){
      var result = reply.getResult();
      if (result.retResult==0||result.retResult==999999999) {
    	  callback(param1,param2);
    	  return true;		     
	  }else {	
		    keyInfo = [];
		    valueInfo = [];
		    resInfo = [];
		    keyInfo.push("home_city");
		    keyInfo.push("manager_id");
		    keyInfo.push("service_type");
		    keyInfo.push("msisdn_info-home_city"); 
		    keyInfo.push("msisdn_info-msisdn"); 
		    valueInfo.push(managerObj.city);
		    valueInfo.push(managerObj.managerid);
		    valueInfo.push("11");
		    valueInfo.push(acceptObj.city);
		    valueInfo.push(acceptObj.msisdn);
		    resInfo.push("-1");
		    buffalo.remoteCall("jsf:BaseOprAction.callService",
		    ["10001485", sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply){
		      var result = reply.getResult();
		      if (result.retResult==0||result.retResult==999999999) {
		    	  callback(param1,param2);
		    	  return true;		     
			  }else {	
				  if(showMsg("担保对象有误,是否继续办理？","confirm"))
					  authPrivLevel(sysfunc_id,func_type,callback,param1,param2);
				  return false;
			  }
		    });
	  }
    });
}
/**
 * NG校验按扭的权限,在查询或受理提交时使用,使用时要判断是否是NG接入
 * sysfunc_id  业务功能号
 * func_type  功能类型:0:受理 1:查询
 * callback  权限校验后的回调函数名
 * param1  回调函数的参数1
 * param2  回调函数的参数2
 *
 */
function _checkAuthPriv(sysfunc_id,func_type,callback,param1,param2){
       if(BDOM.getTop().isNGCSConnect()&&sysfunc_id=="10558030"&&func_type=="1"){//查询的功能号与受理分开
           sysfunc_id = "10558036";
       }
	   if(!BDOM.getTop().isNGCSConnect()){
	       callback(param1,param2);
	       return false;
	   }else{
		   try{//BOSS客户级别，免认证
		       var callerObj = BDOM.getTop().getSubsNumberObjectInfo();//当前呼入号码
		       var AcceptCityObjectBean = getAcceptCityObjectBean(callerObj.msisdn,callerObj.crmtype);
		       BDOM.getTop().writeCspLog("_checkAuthPriv service_level:"+AcceptCityObjectBean.service_level,22);
		       if(AcceptCityObjectBean!=null&&(AcceptCityObjectBean.service_level=="238"|| BDOM.getTop().getCustomType()=="3")){
		    	   callback(param1,param2);
			       return false;
		       }
		   }catch(ex){
		   }
	   }
	   var is_myself = "";
	   if(BDOM.getTop().isLocalAccept())//是否本机
       		is_myself = "1";
   	   else
        	is_myself = "2"; 
	   
	   if(is_myself == "2" && func_type=="0"){//他机 && 受理 
		    var acceptObj = BDOM.getTop().getAcceptObjectInfo();//当前受理号码
		    var keyInfo=[];
		    var valueInfo=[];
			var resInfo = [];
			resInfo[0]="user_info-row-1";	
		    keyInfo.push("obj_type");  		
		    valueInfo.push("0");
		    keyInfo.push("obj_id");//用户号码 		
		    valueInfo.push(acceptObj.msisdn); 
		    keyInfo.push("obj_home_city");
		    valueInfo.push(acceptObj.city);
		    buffalo.remoteCall("jsf:BaseOprAction.callService",["10000002", sysfunc_id, keyInfo, valueInfo, resInfo, false]
		    , function(reply) {
		    	var result = reply.getResult();
				if(result.retResult=="999999999"){
					showMsg("该用户不存在!");
					return false;
				}else if(result.retResult==0){
					var bean=result.returnBean;
					var open_time = bean.open_time;
					if(open_time!="" && open_time!=null && open_time!="undefined" && open_time<=BFC.util.Time.getToday()){
						doCheckAuthPriv(sysfunc_id,func_type,callback,param1,param2);
					}else{
						showMsg("该用户未开打,不允许办理该业务!");
						return false;
					}
				}
			});
	   }else{
		   doCheckAuthPriv(sysfunc_id,func_type,callback,param1,param2);
	   }
	   
}

function doCheckAuthPriv(sysfunc_id,func_type,callback,param1,param2){
	var managerObj = BDOM.getTop().getManagerObjectInfo();	   
	   if(managerObj&&managerObj.managerid!=""){//校验客户经理担保对象,大客户 11，集团客户 12	
		    if(managerObj.managerid.length==11){//如果是手机号码转成工号
		        var keyInfo = [];
		        var valueInfo = [];
		        var resInfo = [];
		        keyInfo.push("tradeid");
		        keyInfo.push("auth_type");
		        keyInfo.push("operator_id");
		        keyInfo.push("password");
		        valueInfo.push("sys_checkpasswd");
		        valueInfo.push("2");
		        valueInfo.push(managerObj.managerid);
		        valueInfo.push("");
		        resInfo.push("-1");
		        buffalo.remoteCall("jsf:BaseOprAction.callService",
		        	    ["10001965", sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply){
		        	      var result = reply.getResult();
		        	      if (result.retResult==0) {
		        	    	  managerObj.managerid = result.returnBean.manager_id;
		        	    	  managerObj.city = result.returnBean.manager_city;
		        	    	  authManagerMember(managerObj,sysfunc_id,func_type,callback,param1,param2);
		        	      }else {
		        	    	  authPrivLevel(sysfunc_id,func_type,callback,param1,param2);
		        		  }
		                });
		    }else{
		    	authManagerMember(managerObj,sysfunc_id,func_type,callback,param1,param2);
		    }		    
	   }else{
		   //in utils.js
		   authPrivLevel(sysfunc_id,func_type,callback,param1,param2);
	   }
}
function authPrivLevel(sysfunc_id,func_type,callback,param1,param2){   
  BDOM.getTop().writeCspLog("_checkAuthPriv special func_type"+func_type);
    
	/*
    if(func_type=="0"&& typeof(coreInfoMap) != "undefined"
        &&document.getElementById("_ng_msisdn")!= null&&document.getElementById("_ng_msisdn")!= undefined){//如果是业务受理,先判断是否已经查询核心信息
    	if(!_isExecInitWeb()){
        	showMsg("请先查询再进行受理操作");
        	return false;
        }
    }
    */
    var acceptObj = BDOM.getTop().getAcceptObjectInfo();//当前受理号码
    var auth_info = new Object();
    var connect_type = BDOM.getTop().getCustomType();
    auth_info.request_source = BDOM.getTop().getRequestSource();
    auth_info.sysfunc_id = sysfunc_id;
    auth_info.home_city = acceptObj.city;        
    auth_info.brand_id = "0";//品牌
    if(BDOM.getTop().isLocalAccept())//是否本机
        auth_info.is_myself = "1";
    else
        auth_info.is_myself = "2";        
    auth_info.connect_type = connect_type==""?"0":""+connect_type;//接入方式    
    auth_info.operator_rule = BDOM.getTop().getNGOperRole();//操作员角色 
    auth_info.func_type = func_type;//功能类型:0:受理 1:查询
    auth_info.operator_id = BDOM.getTop().getOperId();
    BDOM.getTop().writeCspLog("_checkAuthPriv auth_info{"+auth_info.request_source+","+auth_info.sysfunc_id+","+auth_info.is_myself+","+auth_info.connect_type+"}",22);
	    //查询权限等级服务
	    //buffalo.setDebug(true);
	    buffalo.remoteCall("jsf:AuthBean.setAuthLevel",[auth_info], function(reply){
		    var auth_bean = reply.getResult();
	        var second_auth_csp = BDOM.getWorkZoneUrlParam("second_auth_csp");
	        var only_auth_csp = BDOM.getWorkZoneUrlParam("only_auth_csp");
	        var need_auth_type = BDOM.getWorkZoneUrlParam("need_auth_type");
		    if((func_type=="3"&&(sysfunc_id=="10500072"||sysfunc_id=="10500073")) || (func_type=="4" && auth_info.operator_rule!="11010003")){//国际漫游国际长途页面特殊处理
                auth_bean.auth_level = 2;
                auth_bean.identify_type = "20";
            }
		   
	        if(auth_info.is_myself == "1" && only_auth_csp=="73"){
	        	auth_bean.auth_level = 0;
	        	auth_bean.identify_type = "0";
	        }
		    var auth_level = auth_bean.auth_level;
		    if(auth_level==6){//40636 服务密码认证等级高于身份认证等级
		    	auth_level = 1;
		    }
		    if(auth_level==73){//特殊认证等级低于身份认证等级
		    	auth_level = 1.73;
		    }
		    BDOM.getTop().writeCspLog("_checkAuthPriv auth_level"+auth_level+"  acceptObj.authlevel"+acceptObj.authlevel+"  isServiceOut:"+BDOM.getTop().isServiceOut());
            if(auth_level<=acceptObj.authlevel){
		        callback(param1,param2);
		    }else{
		        var args = [];
		        args["acceptObj"] = acceptObj;
		        args["auth_info"] = auth_bean;
		        args["topWorkZone"] = BDOM.getTop();
		        args["second_auth_csp"] = second_auth_csp;	 
		        args["need_auth_type"] = need_auth_type;	 
		        args["is_second_auth"] = false;	        
		        args["callback"] =  function(ivr){			        
		            var result = getIVRPwdInputResult(ivr);
		            if(result==0){
		                //非国漫接入身份认证等级降低
		                if(auth_bean.auth_level==6&&!BDOM.getTop().isServiceOut())
		    	            acceptObj.authlevel = 1;
		                else
		                	acceptObj.authlevel = auth_bean.auth_level;

		    	        if(auth_info.is_myself != "1" && acceptObj.authtype=="50" && second_auth_csp=="73"){
		    	        	var sencondReturnValue = false;
		    	        	args["is_second_auth"] = true;	
		    	        	sencondReturnValue = showModalDialog(contextPath+"/common/authentication/common_auth_ng_special.jsf",args,"dialogWidth:600px; dialogHeight:630px; status: no;help:no;scroll:no;resizable:no");
		    	        	if(sencondReturnValue){
		    		        	acceptObj.authtype = "50";        
		    		  	        acceptObj.authlevel = 1.73;
		    	        	}else{
		    	        		return false;
		    	        	}
		    	        }
		    	        
		    	        if(auth_info.is_myself == "2")
			        		BDOM.getTop().cleanOfflineObj();
			            callback(param1,param2);
			            if(auth_info.request_source=="304078")
			                BDOM.getTop().setSubsNumberCheckEx(acceptObj.msisdn,"1");
		            }else{
		                showMsg("IVR校验失败！");
		                return false;
		            }
		        };
		        var returnValue = false;
		        if(only_auth_csp=="73"){
		        	returnValue = showModalDialog(contextPath+"/common/authentication/common_auth_ng_special.jsf",args,"dialogWidth:600px; dialogHeight:630px; status: no;help:no;scroll:no;resizable:no");
		        }else{
		        	returnValue = showModalDialog(contextPath+"/common/authentication/common_auth_ng.jsf",args,"dialogWidth:500px; dialogHeight:300px; status: no;help:no;scroll:no;resizable:no");
		        } 
		        if(returnValue){
		        	if(auth_info.is_myself == "2")
		        		BDOM.getTop().cleanOfflineObj();
		            callback(param1,param2);
		            if(auth_info.request_source=="304078")
		                BDOM.getTop().setSubsNumberCheckEx(acceptObj.msisdn,"1");
		        }
		    }
		});		
}

//根据工号机构查询工号渠道
//org_id 工号机构
//chnl_type 工号渠道
function getChnl_type(org_id,callBack){
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	var sysfunc_id = BDOM.getMenuFuncId();
	
	if(sysfunc_id == ""||sysfunc_id == "0") {
		sysfunc_id = "99999981";
	}
	keyInfo.push("org_id");
	valueInfo.push(org_id);
  	resInfo[0]="row-1";
	buffalo.remoteCall("jsf:BaseOprAction.callService",["10002288",sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply){//BM_QueryHomeCityByMsisdn
		var result = reply.getResult();
		if(result.retResult==0) {
			var bean = result.returnBean;
			var chnl_type = bean.chnl_type;
			//0213-他营营业厅  0214-铁通专席
			if(bean.sub_channel_type=="0213" || bean.sub_channel_type=="0214" || bean.sub_channel_type=="0302"){
				chnl_type = "1";
			}
			callBack(chnl_type);
		}else if(result.retResult==999999999){
			callBack("-1");
		}else{
			showMsg(result.retMsg);
			callBack("-1");
		}
	});
}

/*
 * 根据工号机构查询工号渠道
 * org_id 工号机构
 * chnl_type 工号渠道
 * showModalDialog弹出窗口无法获取当前工作区的对象，取不到sysfunc_id，改为由参数传入。
 */
function getChnl_type_inputSysId(sysfunc_id, org_id, callBack){
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	keyInfo.push("org_id");
	valueInfo.push(org_id);
  	resInfo[0]="row-1";
	buffalo.remoteCall("jsf:BaseOprAction.callService",["10002288",sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply){//BM_QueryHomeCityByMsisdn
		var result = reply.getResult();
		if(result.retResult==0) {
			var bean = result.returnBean;
			var chnl_type = bean.chnl_type;
			//0213-他营营业厅  0214-铁通专席
			if(bean.sub_channel_type=="0213" || bean.sub_channel_type=="0214" || bean.sub_channel_type=="0302"){
				chnl_type = "1";
			}
			callBack(chnl_type);
		}else if(result.retResult==999999999){
			//return "";
		}else{
			showMsg(result.retMsg);
			//return "";
		}
	});
}

//根据号码查询归属省份
//sysFunc_Id 系统功能号
//msisdn 号码
//callback 回调函数
function getProvinceById(sysfunc_id,msisdn,callback){
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	
	keyInfo.push("msisdn");
	valueInfo.push(msisdn);
  	resInfo[0]="row-1";
	buffalo.remoteCall("jsf:BaseOprAction.callService",["10002387",sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply){
		var result = reply.getResult();
		if(result.retResult==0) {
			var bean = result.returnBean;
			callBack(bean.province_id);
		}else if(result.retResult==999999999){
			//return "";
		}else{
			showMsg(result.retMsg);
		}
	});
}


/**
 * 判断当前时间是否为20150401至20150403
 * 
 * by yuliping
 */
function isSpecilTime(){	
	var currentTime=BFC.util.Time.getSystemTime();
    var year=currentTime.substring(0,4);
    var month=currentTime.substring(4,6);
    var day=currentTime.substring(6,8);
    if( year=='2015'&& month=='04'&&(day=='01'||day=='02'||day=='03')){
       return true;
    }
    return false;
}
/**
 * 判断用户是否使用新积分规则
 * 
 * by yuliping
 */
function isUseNewPointRule(opentime){
	if(!opentime) return true;
	var currentTime=BFC.util.Time.getSystemTime().substring(0,8);
	//2016两节期间放开校验
	if(currentTime>='20151223'&&currentTime<='20160415'){
		return true;
	}
	if(opentime<'20150401'){
       return true;
    }else{
    	var time=BFC.util.Time.addMonth2(opentime,6);//return yyyymmdd
    	if( time<=currentTime)
    	    return true;	
    }
    return false;
}

/**
 * 判断是否限制用户（白名单中无记录或白名单中记录已失效&&黑名单中有记录&&非实名，返回1）
 * 
 * @param sysfunc_id
 * @param home_city
 * @param msisdn
 * @param type 1缴费 2其它
 * @param callback
 * @return
 */
function isLimitUser(sysfunc_id,home_city,msisdn,type,callback) {
	
	// 10590028停复机管理、10590022 过户 、10558161国际及港澳台业务受理
	if(type == '2' && sysfunc_id != '10590028' && sysfunc_id != '10590022' && sysfunc_id != '10558161') {
		return false;
	}
	
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	keyInfo.push("home_city");
	valueInfo.push(home_city);
	keyInfo.push("msisdn");
	valueInfo.push(msisdn);
	keyInfo.push("type");
	valueInfo.push(type);
  	resInfo[0]="row-1";
	buffalo.remoteCall("jsf:BaseOprAction.callService",["10002938",sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply){//BM_IsLimitUser
		var result = reply.getResult();
		if(result.retResult==0) {
			var bean = result.returnBean;
			var is_limit = bean.is_limit;
			if(is_limit == 0) {
				callback();
			} else {
				sendMessage(sysfunc_id,home_city,msisdn,"尊敬的客户，因您的号码登记的身份信息不完整或不准确，根据国家实名制要求，现暂停提供该项服务，请尽快携带本人有效身份证原件至福建移动营业厅补登记资料。中国移动");
				showMsg("尊敬的客户，因您的号码登记的身份信息不完整或不准确，根据国家实名制要求，现暂停提供该项服务。");
				if(type == '2') {
					BFC.biz.Operation.closeWorkZone();
				}
			}
		}else if(result.retResult==999999999){
			showMsg(result.retMsg);
			//return "";
		}else{
			showMsg(result.retMsg);
			//return "";
		}
	});
}
/**
 * 判断是否限制用户（白名单中无记录或白名单中记录已失效&&黑名单中有记录&&非实名，返回1）
 */
function isLimitUserAuth(sysfunc_id,home_city,msisdn,archives_flag,user_type,callback) {
    // 10590028停复机管理、10590022 过户 、10558161国际及港澳台业务受理
	if(sysfunc_id != '10590022' && sysfunc_id != '10558161') {
		callback("0",archives_flag,user_type);
		return false;
	}
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	keyInfo.push("home_city");
	valueInfo.push(home_city);
	keyInfo.push("msisdn");
	valueInfo.push(msisdn);
	keyInfo.push("type");
	valueInfo.push("2");
  	resInfo[0]="row-1";
  	resInfo[1]="other-row-*";
	buffalo.remoteCall("jsf:BaseOprAction.callService",["10002938",sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply){//BM_IsLimitUser
		var result = reply.getResult();
		if(result.retResult==0) {
			var bean = result.returnBean;
			var list = result.returnList;
			var is_limit = bean.is_limit;
			var count_limit = list[0].count_limit;
			if(is_limit == 0) {
				callback(count_limit,archives_flag,user_type);
			} else {
				sendMessage(sysfunc_id,home_city,msisdn,"尊敬的客户，因您的号码登记的身份信息不完整或不准确，根据国家实名制要求，现暂停提供该项服务，请尽快携带本人有效身份证原件至福建移动营业厅补登记资料。中国移动");
				showMsg("尊敬的客户，因您的号码登记的身份信息不完整或不准确，根据国家实名制要求，现暂停提供该项服务。");
				BFC.biz.Operation.closeWorkZone();
			}
		}else if(result.retResult==999999999){
			showMsg(result.retMsg);
			//return "";
		}else{
			showMsg(result.retMsg);
			//return "";
		}
	});
}
/**
 * 发送指定内容短信
 * 
 * @param sysfunc_id
 * @param home_city
 * @param msisdn
 * @param note
 * @return
 */
function sendMessage(sysfunc_id,home_city,msisdn,note){	
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	keyInfo.push("msisdn");
	keyInfo.push("home_city");
	keyInfo.push("sms_content");
	keyInfo.push("service_type");
	valueInfo.push(msisdn);
	valueInfo.push(home_city);
	valueInfo.push(note);
	valueInfo.push("600");
	resInfo.push("-1");
	buffalo.remoteCall("jsf:BaseOprAction.callService",
	["10000362", sysfunc_id, keyInfo, valueInfo, resInfo, false], function(reply){
		var result = reply.getResult();
		if (result.retResult==0||result.retResult==999999999) {
			//TODO 短信发送成功
		}else{
			showMsg(result.retMsg);
		}
	});
}

/**
* 根据身份证号码获取客户年龄（周岁）          																		
*
* @param idcard 身份证号码
* @return 年龄（周岁）
*/
function getCustomerAge(idcard){
	var born = "";
	if(idcard.length == 15) {
		born = "19" + idcard.substr(6,6);
	}else  {
		born = idcard.substr(6,8);
	}
	return parseInt((parseInt(BFC.util.Time.getToday()/1000000)-parseInt(born))/10000);
}
function checkJkAuth(callback){
    var bosstop=getUtilsTop();
    if(!bosstop.isCRMConnect()) callback();
	buffalo.remoteCall("jsf:New4AJKMgr.checkJkAuth",[BDOM.getPortalId()],function(reply){
		   var result = reply.getResult();
		   if(result){
	            callback();
	       }else{
	       	    showMsg("金库认证申请的次数已用光或者超过申请时间，请重新进行金库认证后再查询或受理！");
	       }
    });
}
function afterJkAuth(){
	var bosstop=getUtilsTop();
    if(!bosstop.isCRMConnect()) return "";
	buffalo.remoteCall("jsf:New4AJKMgr.afterJkAuth",[BDOM.getPortalId()],function(reply){
		   var result = reply.getResult();
		   if(!result){
	           showMsg("异常！"); 
	       }
    });
}
function getMsisdn(callback){
	var bosstop=getUtilsTop();
    if(!bosstop.isCRMConnect()) callback("");
	buffalo.remoteCall("jsf:New4AJKMgr.getMsisdn",[BDOM.getPortalId()],function(reply){
		   var result = reply.getResult();
	       callback(result);
    });
}
//文件上传下载关键字str加密,密钥key:uploadOrDownload
function uploadOrDownloadEncryptByDES(Str){
	if(Str){
		return BuffaloCall.prototype.encryptByDES(Str,"uploadOrDownload");
	}else{
		return "";
	}
}


function clearIframe(id){
    var el = document.getElementById(id);
        iframe = el.contentWindow;
    if(el){
        el.src = 'about:blank';
        try{
            iframe.document.write('');
            iframe.document.clear();
            
        }catch(e){};
        //以上可以清除大部分的内存和文档节点记录数了
        //最后删除掉这个 iframe 
        el.parentNode.removeChild(el);
    }
}

/**
* 根据已使用流量       																		
* @param flow 流量（单位kb）
* @param flag 若为剩余流量传1，其余可不传
* @return 流量（单位**GB**MB） 
* 因为需要返回gb和mb，先以字符串返回
*/
function changeMbByK(flow,flag){
	if(isNaN(flow) || flow*1==0) return "0MB";
	
     var flowNum = (flag==1)?parseFloat(flow)-1:parseFloat(flow);//为剩余流量需减1
 
     var inteNum = Math.round(flowNum/1024);//转成Mb后 四舍五入 的整数值  
     
     var gbNum = inteNum >=1024?parseInt(inteNum/1024):0;//获取GB值
     
     var gkNum = inteNum - gbNum*1024;//获取GK值
     
     var flowStr ="";
      if(gbNum != 0)
             flowStr=gbNum+"GB";
      if(gkNum !=0)
    	     flowStr=flowStr+gkNum+"MB";
      
     if(gbNum ==0 && gkNum==0) 
    	 flowStr="0MB";
     
      return flowStr;
}

//发票 项目商品编码
function getItemGoodsValue(item_goods_vlaue){
	var item_type_vlaue="";
	           switch (parseInt(item_goods_vlaue))
	           {
	             
	             case 1:
	               item_type_vlaue="3030100000000000000";
	               break;
	             case 2:
	               item_type_vlaue="3030200000000000000";
	               break;
	             case 3:
	               item_type_vlaue="1090500000000000000";
	               break;
	             case 4:
	               item_type_vlaue="3040502019900000000";
	               break;
	             case 0:
	             case 5:
	             case 6:
	             case 7:
	             case 8:
	             case 9:
	             case 10:
	               item_type_vlaue="3030000000000000000";
	               break;
	             case 11:
	               item_type_vlaue ="3050200000000000000";  //安装服务
	               break;
	             case 12:
	               item_type_vlaue ="1060301030100000000"; //通信设备嵌入式软件
	               break;
	             case 13:
	               item_type_vlaue ="3040200000000000000"; //信息技术服务
	               break;
	             case 14:
	               item_type_vlaue ="1100101020000000000"; //供电
	               break;
	             case 15:
	               item_type_vlaue ="1100301010000000000"; //供水
	               break;
	             case 16:
	               item_type_vlaue="3040502020000000000" ; //不动产经营租赁
	               break;
	             case 17:
	               item_type_vlaue="3040801010000000000" ; //物业管理服务
                   break;
                 case 18:
                   item_type_vlaue="6010000000000000000" ;//充值卡销售
                   break;
                 case 19:
                   item_type_vlaue="3030000000000000000";//预存款
                   break;
	            default:
	            item_type_vlaue="";
	             break;
	           }
             return item_type_vlaue;
          }
 


