 /*
 * <p>Title: BFC utils</p>
 *
 * <p>Description:BFC utils 基本公用js方法与类</p>
 *
 * <p>Copyright (c) 2005-2007</p>
 *
 * <p>Company: fmcc&newland</p>
 *
 * @author chenjp
 * @version 1.0
 * 把原先的utils.js整合在一起。
 * 这里的验证有JSValidator.js重复的话，整到JSValidator下。
 *在当前版本下，ZJW做的部分，注释缺少，下个版本补上。
 */


/********************====map for buffalo modified by cjp **************/

/**
 *@class BFC.util.Map
 *@constructor Map
 *@author chenjp
 *example:
 * var aMap = new BFC.util.Map();(可以直接使用map来用，inc.jsp这里会自动化实例一个这样的对象,以方便使用。)
 * aMap.put("mykey","myValueMayBeObject");//更多情况下，key-value值对里的value用来存储对象。
 * aMap.put("mykey2","myValueMayBeObject");
 * aMap.get("mykey");
 * aMap.remove("mykey");
 * 这里已经为大家提供了一个对象BMap(是对象，不是类，请注意。)
 *使用时也是像上面的那种用法:BMap.put("key","myvalue");
 *@description 这里的key通常为string类型，value 可以为任何对象。
 */
BFC.util.Map = function()
{
  this.key = new Array();
  this.value = new Array();
  this.className = "java.util.Map";
} 
 /**
   *put 方法，用来存入key-value.
   *注意这里的关键字值如果和MAP里已有的关键字一致的话将返回false.
   *改为_key值已经存在，则替换之
   *@param {_key}:key值;
   *@param {_value}:value值;
   */
BFC.util.Map.prototype.put = function(_key , _value)
  	 {
  	 	for(var i=0;i<this.size();i++)
        {
            if(this.key[i] == _key){
            	this.value[i]=_value;
            	return false;
            }
        }
        this.key.push(_key);
        this.value.push(_value);
        return true;
    }
/**
 *get 方法，通过关键字获取值。
 *@param {_key}:key值;
 */
BFC.util.Map.prototype.get = function(_key)
	{
        var k = -1;
        for(var i=0;i<this.size();i++)
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
 /**
  *更改在MAP里面那条记录。
  *@param key,关键字，
  *@param value,新的值。
  */
BFC.util.Map.prototype.set = function(_key,_value)
	{
        var k = -1;
        for(var i=0;i<this.size();i++)
        {
            if(this.key[i] == _key)
            {
                k = i; break;
            }
        }
        if(k != -1)
        {
                this.value[k]=_value;
        }else
        {
                return false;
         }
	 }
 /**
  *remove,通过关键字删除在map里的该条记录。
  *@param {_key}:关键字值;
  */
BFC.util.Map.prototype.remove = function(_key)
 {
        for(var i=0;i<this.key.length;i++)
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
 /**
  *size,返回map里的记录总数。
  */
BFC.util.Map.prototype.size = function()
 {
 	return this.key.length;
 }
 /**
  *返回所有的key，当然这里不建议通过直接对这个数组进行直接操作。
  */
BFC.util.Map.prototype.getKeys = function()
 {
 	return this.key;
 }
 /**
  *返回所有的取，当然这里不建议通过直接对这个数组进行直接操作。
  */
BFC.util.Map.prototype.getValues = function()
 {
 return this.value;
 }

/**
 *删除全部,key,value全部清除
 */
BFC.util.Map.prototype.removeAll = function()
 {	
        //for(var i=0;i<this.key.length;i++)
        for(var i=this.key.length-1; i>=0; i--)
        {
        	this.key[i]=null;
            this.key.splice(i,1);
            this.value[i]=null;//删除这个对象。
            this.value.splice(i,1);
        }
        //this.key = new Array();
        //this.value = new Array();
      return null;
 }
/***************map end.*******************/
/**
 *@class BFC.util.DOM
 *@constructor DOM
 *@author chenjp
 *这里的DOM,我在inc.jsp里面已初始化一个特定的BDOM用来代替BFC.util.DOM,由于DOM主要用于提供直接的功能，所以
 *全部使用类方法，以此方便使用。
 *当然你也可以直接使用BFC.util.DOM.removeAllOption(),类似这样的使用。
 *example:BDOM.removeAllOption();
 *由于DOM操作部分注释不是很详细，这个版本只写是基本的情况，由下个版本来更新这方面的工作。
 */
BFC.util.DOM = function()
{
	this.className ="BFC.util.DOM ";
}

/**
 * 删除所有下拉框选项
 * @param obj 为下拉框对象
 */
BFC.util.DOM.removeAllOption = function(obj)
{
  var obj = eval(obj);
 // obj.length = 0;
  for( i = obj.length-1; i >= 0; i--){
    obj.remove(i);
  }
  
}
/**
 *根据特定的值删除下拉框中的那个选项.
 *@param oObj:要删除其选项的下拉框ID
 *@vparam value:特定的值
 */
BFC.util.DOM.removeOneByValue = function(oObj,value){
  var oObj = eval(oObj);
  for(var i = 0; i < oObj.length; i++){
    if(oObj[i].value == value){
  		oObj.remove(i);
  		return;
    }
  }
}
/**
 *下拉框中是否含有某个选项.
 *@param oObj:选项的下拉框ID
 *@vparam value:特定的值
 */
BFC.util.DOM.haveOneByValue = function(oObj,value){
  var oObj = eval(oObj);
  for(var i = 0; i < oObj.length; i++){
    if(oObj[i].value == value){
  		return true;
    }
  }
  return false;
}
/**
 * 增加一个下拉选项
 * @param obj 为下拉框对象
 * @param sValue 为要增加的下拉框选项值
 * @param sText 为要增加的下拉框选项显示文本
 * @param selected 该项是否默认选中
 * 去掉原先使用的appendChild,这个方法在多次添加的时候会弹出未指明错误,改用add
 * modify by chejp
 */
BFC.util.DOM.addOption = function(obj, sValue, sText,selected){
  var obj = eval(obj);
  var oOption = document.createElement("OPTION");
  oOption.value = sValue;
  oOption.text = sText;
  if(selected)oOption.defaultSelected = true;
  obj.add(oOption);
  //oOption.label = sText;
}

/**
 * 用于根据数据字典设置联系菜单
 * @param oSubObj 为下级下拉框对象
 * @param dictType 对应字典表 dictType
 * @param classId 对应字典表 classId
 * @param parentId 为上级下拉框选项值
 */
BFC.util.DOM.setSubRela = function(oSubObj, dictType, classId, parentId ){
   var oSubObj = eval(oSubObj);
   removeAllOption(oSubObj);
   var objDom = new ActiveXObject('microsoft.xmldom');
   objDom.async = false;
   var objHttp = new ActiveXObject('microsoft.xmlhttp');
   objHttp.open("post","/BossWeb/sm/operatormanager/operinfo/sm_getSubInter.jsf?dictType="+dictType+"&classId="+classId+"&parentId="+parentId,false);
   objHttp.send();
   if( objHttp.readyState !=4 ) return ;
   objDom.loadXML( objHttp.responseText );
   if(objDom.parseError.errorCode != 0) return ;
   var nodes = objDom.documentElement.childNodes;
   for(var i = 0; i < nodes.length; i++){
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
BFC.util.DOM.compareSelText = function(selObj, sText){
  for(var i=0; i<selObj.length; i++){
    if( selObj[i].text.trim() == sText.trim() ){
      selObj[i].selected = true ;
    }
  }
}
/**
 * 使权限下拉框中text值与提供的的sText相匹配的option选中(文字匹配，不准确匹配)
 * @param selObj 为下拉框对象
 * @param sText 为下拉框选项显示文本 
 * @author yanfg 
 */
BFC.util.DOM.compareSelTextPriv = function(selObj, sText){
	var i,len,option_id;
	for(i = 0,len = selObj.options.length; i < len; i++){
		if(selObj.options[i].text.trim() == sText.trim()){
			option_id = selObj.options[i].id;
			break;
		}
	}
	if(i < len){
		selObj.option_id = option_id;
	}
}
/**
 * 选中与提供sValue值相匹配的下拉框选项（值匹配，精确匹配）
 * @param selObj 为下拉框对象
 * @param sValue 为下拉框选项值
 */
BFC.util.DOM.compareSelValue = function(selObj, sValue){
  for(var i=0; i < selObj.length; i++){
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
BFC.util.DOM.compareCheckBoxByValue = function(chkObj, sValue){
  if( sValue == "true" || sValue == "1" ){
    chkObj.checked = true ;
  } else {
    chkObj.checked = false ;
  }
}

/**
 * 选中与提供sValue值相匹配的复选框选项
 * @param chkObj为复选框对象
 * @param sValue为复选框的值
 */
BFC.util.DOM.compareCheckBoxByValues = function(chkObj, sValue){
	for (var i=0; i<sValue.length; i++) {
		if(sValue[i]!=null && sValue[i]!=""){
			for (var j=0; j<chkObj.length; j++) {
				if(chkObj[j].value!=null && chkObj[j].value==sValue[i]){
					chkObj[j].checked = true;
				}
			}
		}
	}
}

/**
 * 返回sText在下拉框中的索引(文字匹配，不准确匹配)
 * @param oObj为下拉框对象
 * @param sText 为下拉框选项显示文本
 */
BFC.util.DOM.getOptionIndex2 = function(oObj,sText){
  for(var i=0; i<oObj.length; i++){
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
BFC.util.DOM.getOptionIndex = function(oObj, sValue){
  if( oObj == null || sValue == "" ) return;
  for( i = 0; i < oObj.length; i++ ){
    if( oObj[i].value.trim() == sValue.trim() ){
      return i;
    }
  }
  return 0;
}


  /**
 * 获取下拉框的文体值
 * @param oObj为下拉框对象
 * @param sValue为下拉框选面值
 */
BFC.util.DOM.getOptionText = function(oObj, sValue){
  if( oObj == null || sValue == "" ) return;
  for( i = 0; i < oObj.length; i++ ){
    if( oObj[i].value.trim() == sValue.trim() ){
      return oObj[i].text;
    }
  }
  return "";
}


/**
 * 设置文本框为只读
 * @param oObj为文本框对象
 */
BFC.util.DOM.setTextBoxReadOnly = function(oObj){
 var oObj = eval(oObj);
 oObj.readOnly = true;
 oObj.className = "input-gray";
}

/**
 *设置元素的状态(disabled or not)
 *@param obj:要设元素的ID，
 *@param flag :状态，true or false.
 *结果：当为true的时候，元素置灰，当为false的时候可写，界面清空灰色。
 */

BFC.util.DOM.setElementStatus=function(obj,flag)
{
	if(document.getElementById(obj)==null || document.getElementById(obj)=="undefined") return;
	else myObj = document.getElementById(obj);
	if( myObj==null || myObj=="undefined" )return;
	myObj.disabled = flag;
	myObj.readOnly = flag;
	if(flag)myObj.className = "input-gray";
	else myObj.className ="";
}
/**
 * 设置form对象元素为休眠状态
 * @param oForm为form对象
 */
BFC.util.DOM.setFormDie =function(oForm){
  var oForm = eval(oForm);
  if(oForm==null) return ;
  for(var i = 0; i < oForm.elements.length; i++){
    var e = oForm.elements[i];
    if( e.type == null ) continue;
    if( e.tagName.toUpperCase() == "INPUT" ){
      if( e.type.toUpperCase() == "TEXT" )  {
        e.readOnly = true;
        e.className = "input-gray";
      }
      if( e.type.toUpperCase() == "PASSWORD" ){
        if(e.id.indexOf("ic_no")==-1) e.value = ""; //若是证件号码不清空
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
 * 根据参数来判定是否置灰form
 */
BFC.util.DOM.setFormDieByParam =function(oForm, paramName, paramValue){
  var oForm = eval(oForm);
  for(var i = 0; i < oForm.elements.length; i++){
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
 * 激法form
 * @param oForm为form对象
 */
BFC.util.DOM.setFormActive =function(oForm){
  var oForm = eval(oForm);
   if(oForm==null) return ;
  for(var i = 0; i < oForm.elements.length; i++){
    var e = oForm.elements[i];
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
 * 根据参数来激活form
 */
BFC.util.DOM.setFormActiveByParam =function(oForm, paramName, paramValue){
  var oForm = eval(oForm);
  for(var i = 0; i < oForm.elements.length; i++){
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
BFC.util.DOM.clearForm =function(oForm){
  var oForm = eval(oForm);
   if(oForm==null) return ;
  for(var i = 0; i < oForm.elements.length; i++){
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
      if(e.length > 0) e[0].selected = true;
    }
    if( e.tagName.toUpperCase() == "TEXTAREA" ) {
        e.value = "";
    }
  }
}

/**
 *全部选中复选框（复选框不处于form中）
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param checkboxobj 复选框名称
 *@author shenjian
 */
BFC.util.DOM.selectAllCheckBox = function(ifr,checkboxobj){
	var i;
	if(ifr!=""){
		var ifr = eval(ifr);
		var checkbox_obj = ifr.document.all(checkboxobj);
		if(checkbox_obj.type=="checkbox"){
			checkbox_obj.checked = true;
		}else{
			for(i=0; i<checkbox_obj.length; i++){
				checkbox_obj[i].checked = true;
			}
		}
	}else{
		var checkbox_obj = document.all(checkboxobj);
		if(checkbox_obj.type=="checkbox"){
			checkbox_obj.checked = true;
		}else{
			for(i=0; i<checkbox_obj.length; i++){
				checkbox_obj[i].checked = true;
			}
		}
	}
}

/**
 *全部取消选中复选框（复选框不处于form中）
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param checkboxobj 复选框名称
 *@author shenjian
 */

BFC.util.DOM.cancelAllCheckBox=function(ifr,checkboxobj){
	var i;
	if(ifr!=""){
		var ifr = eval(ifr);
		var checkbox_obj = ifr.document.all(checkboxobj);
		if(checkbox_obj.type=="checkbox"){
			checkbox_obj.checked = false;
		}else{
			for(i=0; i<checkbox_obj.length; i++){
				checkbox_obj[i].checked = false;
			}
		}
	}else{
		var checkbox_obj = document.all(checkboxobj);
		if(checkbox_obj.type=="checkbox"){
			checkbox_obj.checked = false;
		}else{
			for(i=0; i<checkbox_obj.length; i++){
				checkbox_obj[i].checked = false;
			}
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
BFC.util.DOM.selectAllFormCheckBox =function(ifr,operform,checkboxobj){
	var i;
	if(ifr!=""){
		var checkbox_obj = eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"']");
		if(checkbox_obj.type=="checkbox"){
			checkbox_obj.checked = true;
		}else{
			for(i=0; i<checkbox_obj.length; i++){
				checkbox_obj[i].checked = true;
			}
		}
	}else{
		var checkbox_obj = eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"']");
		if(checkbox_obj.type=="checkbox"){
			checkbox_obj.checked = true;
		}else{
			for(i=0; i<checkbox_obj.length; i++){
				checkbox_obj[i].checked = true;
			}
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
BFC.util.DOM.cancelAllFormCheckBox =function(ifr,operform,checkboxobj){
	var i;
	if(ifr!=""){
		var checkbox_obj = eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"']");
		if(checkbox_obj.type=="checkbox"){
			checkbox_obj.checked = false;
		}else{
			for(i=0; i<checkbox_obj.length; i++){
				checkbox_obj[i].checked = false;
			}
		}
	}else{
		var checkbox_obj = eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"']");
		if(checkbox_obj.type=="checkbox"){
			checkbox_obj.checked = false;
		}else{
			for(i=0; i<checkbox_obj.length; i++){
				checkbox_obj[i].checked = false;
			}
		}
	}
}

/**
 *取复选框中所有被选中选项的值放入一个Array后赋给form中的一个隐藏元素（复选框不处于form中）
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param checkboxobj 复选框名称
 *@param operform 需提交的form名称
 *@param hiddenobj 用来存放复选框的值的隐藏元素名称
 *@author shenjian
 */
BFC.util.DOM.getCheckBoxValue =function(ifr,checkboxobj,operform,hiddenobj){
	if(ifr!=""){
		var ifr=eval(ifr);
		var A = new Array();
		var i,j=0;
		for(i=1;i<ifr.document.all(checkboxobj).length;i++){
			if(ifr.document.all(checkboxobj)[i].checked==true&&ifr.document.all(checkboxobj)[i].disabled==false){
				A[j] = ifr.document.all(checkboxobj)[i].value;
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
				A[j] = document.all(checkboxobj)[i].value;
				j++;
			}
		}
		eval("document.forms['"+operform+"']['"+operform+":"+hiddenobj+"'].value=A");
	}
}

/**
 *取复选框中所有被选中选项的值放入一个Array后赋给form中的一个隐藏元素（复选框处于form中）
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param checkboxobj 复选框名称
 *@param operform 需提交的form名称
 *@param hiddenobj 用来存放复选框的值的隐藏元素名称
 *@author shenjian
 */
BFC.util.DOM.getFormCheckBoxValue =function(ifr,checkboxobj,operform,hiddenobj){
	if(ifr!=""){
		var ifr=eval(ifr);
		var A = new Array();
		var i,j=0;
		for(i=0;i<eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'].length");i++){
			if(eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].checked==true")&&eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].disabled==false")){
				A[j] = eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].value");
				j++;
			}
		}
		eval("document.forms['"+operform+"']['"+operform+":"+hiddenobj+"'].value=A");
		//alert(eval("document.forms['"+operform+"']['"+operform+":"+hiddenobj+"'].value"));
	}else{
		var A = new Array();
		var i,j=0;
		for(i=0;i<eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'].length");i++){
			if(eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].checked==true")&&eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].disabled==false")){
				A[j] = eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].value");
				j++;
			}
		}
		eval("document.forms['"+operform+"']['"+operform+":"+hiddenobj+"'].value=A");
	}
}

/**
 *取复选框中所有被选中选项的标签放入一个Array后赋给form中的一个隐藏元素（复选框处于form中）
 *@param ifr 嵌入框架名称(如没有用到框架参数为'')
 *@param checkboxobj 复选框名称
 *@param operform 需提交的form名称
 *@param hiddenobj 用来存放复选框的值的隐藏元素名称
 *@author shenjian
 */
BFC.util.DOM.getFormCheckBoxLabel =function(ifr,checkboxobj,operform,hiddenobj){
	if(ifr!=""){
		var ifr=eval(ifr);
		var A = new Array();
		var i,j=0;
		for(i=0;i<eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'].length");i++){
			if(eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].checked==true")&&eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].disabled==false")){
				A[j] = eval("ifr.document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].parentElement.innerText");
				j++;
			}
		}
		eval("document.forms['"+operform+"']['"+operform+":"+hiddenobj+"'].value=A");
		//alert(eval("document.forms['"+operform+"']['"+operform+":"+hiddenobj+"'].value"));
	}else{
		var A = new Array();
		var i,j=0;
		for(i=0;i<eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'].length");i++){
			if(eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].checked==true")&&eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].disabled==false")){
				A[j] = eval("document.forms['"+operform+"']['"+operform+":"+checkboxobj+"'][i].parentElement.innerText");
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
BFC.util.DOM.disableifr =function(ifr,checkboxobj,operform,ison){//ifr:嵌入框架名称(如没有用到框架参数为'')；checkboxobj:checkbox名称；operform:需提交的jsf表单名称；ison:标识“是非”控件名称
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
 * @author jiangjz： 把form转化为js对象，只包含常用类型type＝text等
 */
BFC.util.DOM.convertFormObj = function(form){
	var myForm = form ;
    var returnValue = {};
	for(var i=0; i<myForm.elements.length; i++){
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
BFC.util.DOM.setObjValue = function(form,returnValue,oTag)
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
//重复id的，以数组形式追加返回
//form 为提交的form对象，oTag为当前元素对象，lastValue为id对应的当前值
BFC.util.DOM.setObjArrValue = function(form,oTag,lastValue){
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
//获取boss系统top对象
BFC.util.DOM.getTop = function(){
	var theParent = self;
    while( theParent != theParent.parent && theParent.name != "ccmsFrame"){
        theParent = theParent.parent;
    }    
    return theParent;
    //2009.02.05 yanfg add >>
}
//获取菜单功能号
BFC.util.DOM.getMenuFuncId = function(){
  //2006.07.03 boywish upd << debug修改,当同时打开多个工作区的时候，会引起MenuFuncId读取不正确
  var theParent = self;
  var boss_top = BFC.util.DOM.getTop();
  while( boss_top != theParent && theParent.frameElement.name.indexOf("ccms_operate_iframe") == -1 ){
    theParent = theParent.parent;
  }
  if(boss_top.ccms_module_iframe)
  		return boss_top.ccms_module_iframe.getCurFuncByIframe(theParent.name);
  return boss_top.getCurFuncByIframe(theParent.name);
  //2006.07.03 boywish upd >>
  //2009.02.05 yanfg upd >>
}
//取BIZ扩展MENUID 如果没有扩展参数返回 默认系统功能号
BFC.util.DOM.getBizMenuFuncId = function(){
	var bizparam=BFC.util.DOM.getBizParamId();
	if(bizparam!="")
		return bizparam;
	return BFC.util.DOM.getMenuFuncId();
}
//取BIZ扩展参数
BFC.util.DOM.getBizParamId = function(){
	var boss_top = BFC.util.DOM.getTop();
	if(boss_top.getBizParam){
		var bizparam=boss_top.getBizParam();
		if(bizparam!="")
			return bizparam;
	}
	return "";
}
//取BOP系统功能号
BFC.util.DOM.getPortalId = function(){
	var boss_top = BFC.util.DOM.getTop();
	if(boss_top.getPortalfunid){
		return boss_top.getPortalfunid();
	}
	return "";
} 

/**
 *取当前工作区页面url里的参数值
 *@param : 参数名称
 *@return : 参数值
 *@author cgh
 */
BFC.util.DOM.getWorkZoneUrlParam = function(paramName){
	var this_url = BFC.util.DOM.getTop().getWorkZoneUrl(BFC.util.DOM.getTop().getCurWorkzoneIndex());
	var param_str = "";
	if(this_url.indexOf("?")>0 && (this_url.indexOf("?")+1)<this_url.length){
		param_str = this_url.substring(this_url.indexOf("?")+1,this_url.length);
	}else{
		return null;
	}
	var param_list = param_str.split("&");
	for(var i=0; i<param_list.length; i++){
		var tmp_list = param_list[i].split("=");
		if(tmp_list.length>1 && tmp_list[0].trim()==paramName)
			return tmp_list[1].trim();
	}
	return null;
}
/**
 *函数appendRowToTable，追加行到table中.
 *@param : tableId, table的id
 *@param : tdTextArray , 要插入到td里的方本。这是个数组，你可以放多个td值进来。
 *@author chenjp.
 *常见使用方法：
 *addRowToTable("mailingTypeTable",["mail_kind_name","inure_time",22]);
 */
BFC.util.DOM.appendRowToTable = function(tableId, tdTextArray){
	var objTable = document.getElementById(tableId);
	if(objTable == null) {return;}
	var objTableBody = objTable.getElementsByTagName("TBODY")[0];
	var row = document.createElement("TR");
	for(var i = 0; i < tdTextArray.length; i++)
	 {
		 var col = document.createElement("TD");
		 col.appendChild(document.createTextNode(tdTextArray[i]))
		 row.appendChild(col);
	 }
	 objTableBody.appendChild(row);
 }

/**
 *执行整数处理
 *函数getInt
 *@param divided: 被除数
 *@param divider:除数
 *@return integer，整数
 */
BFC.util.DOM.getInt= function(divided,divider)
{
//define variable
	var i = divided;
	var k = divider;
	var ff=0;
	var j;
	j=Math.round(i/k)-i/k;
	if (j>=0.5)
	ff=Math.round(i/k)-1;
	if (j<=0)
	ff=Math.round(i/k);
	return ff;
}

/**
 * setEditable
 *对某一特定的form 子元素对象进行状态设定
 *@param obj : form 的子元素对象，请直接传入对象，或传入ID
 *@param flag : 状态标识，true or false; true表示可以输入编辑，false表示不可编辑
 *@author chenjp
 */
BFC.util.DOM.setEditable = function(obj,flag){
	var e = null;
	if(typeof(obj)=="object") e = obj;
	if(typeof(obj)=="string") e = document.getElementById(obj);
	if(e == null || e == "undefined" || e =="")return;
  	if(flag){
  		if( e.tagName.toUpperCase() == "INPUT" ){
  	      if( e.type.toUpperCase() == "TEXT" || e.type.toUpperCase() == "PASSWORD" )  {
  	    	e.disabled = false;
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
  	      e.disabled = false;
  	      e.readOnly = false;
  	      e.className = "";
  	    }
	}else {
		if( e.tagName.toUpperCase() == "INPUT" ){
		      if( e.type.toUpperCase() == "TEXT" || e.type.toUpperCase() == "PASSWORD" )  {
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
 * setEditable
 *对某一特定的form 子元素对象进行状态设定
 *@param obj : form 的子元素对象，请直接传入对象，或传入ID
 *@param flag : 状态标识，true or false; true表示可以输入编辑，false表示不可编辑
 *@author chenjp
 */
BFC.util.DOM.setEditable1 = function(obj,flag){
	this.setElementStatus(obj.id,!flag);
}

/**
 *取得下拉框选项的文本
 *@param selectObj
 *					下拉框的对象
 *@author chenjp
 */
BFC.util.DOM.getTextFromSelect = function(selectObj){
if(!selectObj)return;
if(selectObj.selectedIndex < 0)return "";
var obj = selectObj.options[selectObj.selectedIndex].text;
return obj;
}


/**
 *获取对象值
 *@param obj 对象
 *@param oTag 对象类型，时间控件为 'time' 归属地市为 'home_city' 归属县市为 'home_county' 其他为空
 *@author yuxf@fmcc.boss
 */
BFC.util.DOM.getObjectValue = function( obj ,oTag ){
	if ( !obj ) return;
	var oValue = "";
	if ( oTag == "home_city" || oTag == "home_county") {
		oValue = obj.option_id ;
	}else if ( oTag == null || oTag == "" || oTag == undefined ) {
		oValue = obj.value ;
	}
	return oValue ;
}

/**
 *设置对象值
 *@param obj 对象
 *@param oValue 对象值
 *@param oTag 对象类型，时间控件为 'time' 归属地市为 'home_city' 归属县市为 'home_county' 其他为空
 *@author yuxf@fmcc.boss
 */
BFC.util.DOM.setObjectValue = function( obj , oValue ,oTag ){
	if ( !obj ) return;
	if ( oTag == "time" ) {
		obj.setValue ( oValue );
	}else if ( oTag == "home_city" || oTag == "home_county") {
		obj.option_id = oValue ;
	}else if ( oTag == null || oTag == "" || oTag == undefined ) {
		obj.value = oValue;
	}
}

/**
 *设置对象是否可读写
 *@param obj 对象
 *@param flag 是否可读写
 *@param oTag 对象类型，时间控件为 'time' 按钮为 'btn' 其他为空 
 *@author yuxf@fmcc.boss
 */
BFC.util.DOM.setObjEnable = function(obj,flag,oTag ){
	var formElement = null;
	if(typeof(obj)=="object") formElement = obj;
	if(typeof(obj)=="string") formElement = document.getElementById(obj);
	if(formElement == null || formElement == "undefined" || formElement =="")return;
	
	if ( oTag == "time") {
		formElement.setEnable(flag);
	}else if ( oTag == "btn" ){
		formElement.disabled = !flag;
	}else {
		formElement.disabled = !flag;
		formElement.readOnly = !flag;
		if(flag){
	   		formElement.className = "";
		}else {
			formElement.className = "input-gray";
  		}
	}
	
  	
}

/**
 *把某行或者所有行的某些列进行金额转换
 *@param grid 表格 
 *@param colArr: [0, 1, 3] 列序号
 *@param row 行数 为空时表示所有行
 *@author yuxf@fmcc.boss
 */
BFC.util.DOM.FormatCol2Money = function(grid, colArr,row) {
	var fieldFlag = String.fromCharCode(2);
	var rowData;
	var cellDataArr;
	if ( row != '' && row != null && row != undefined ) {
		rowData = grid.GetRowData( row );
		cellDataArr = rowData.split(fieldFlag);
		for (var j=0; j<colArr.length; j++) {
			if(cellDataArr[colArr[j]]!=null && cellDataArr[colArr[j]]!="" && cellDataArr[colArr[j]]!=undefined){
				if (cellDataArr[colArr[j]]<0) continue;
				cellDataArr[colArr[j]] = BFC.biz.MoneyConverter.LiToYuan(cellDataArr[colArr[j]]);
			}
		}
		grid.ModifyRowData( row , cellDataArr.join(fieldFlag));
	}else {
		for (var i=0; i< grid.RowCount ; i++) {
			rowData = grid.GetRowData(i);
			cellDataArr = rowData.split(fieldFlag);
			for (var j=0; j<colArr.length; j++) {
				if(cellDataArr[colArr[j]]!=null && cellDataArr[colArr[j]]!="" && cellDataArr[colArr[j]]!=undefined){
					if (cellDataArr[colArr[j]]<0) continue;
					cellDataArr[colArr[j]] = BFC.biz.MoneyConverter.LiToYuan(cellDataArr[colArr[j]]);
				}
			}
			grid.ModifyRowData(i, cellDataArr.join(fieldFlag));
		}
	}	
}

/**
 *把某行或者所有行的某些列进行金额转换 转为不带小数的整数
 *@param grid 表格 
 *@param colArr: [0, 1, 3] 列序号
 *@param row 行数 为空时表示所有行
 *@author yuxf@fmcc.boss
 */
BFC.util.DOM.FormatCol2MoneyNum = function(grid, colArr,row) {
	var fieldFlag = String.fromCharCode(2);
	var rowData;
	var cellDataArr;
	if ( row != '' && row != null && row != undefined ) {
		rowData = grid.GetRowData( row );
		cellDataArr = rowData.split(fieldFlag);
		for (var j=0; j<colArr.length; j++) {
			if(cellDataArr[colArr[j]]!=null && cellDataArr[colArr[j]]!="" && cellDataArr[colArr[j]]!=undefined){
				if (cellDataArr[colArr[j]]<0) continue;
				cellDataArr[colArr[j]] = BFC.biz.MoneyConverter.LiToYuanNum(cellDataArr[colArr[j]]);
			}
		}
		grid.ModifyRowData( row , cellDataArr.join(fieldFlag));
	}else {
		for (var i=0; i< grid.RowCount ; i++) {
			rowData = grid.GetRowData(i);
			cellDataArr = rowData.split(fieldFlag);
			for (var j=0; j<colArr.length; j++) {
				if(cellDataArr[colArr[j]]!=null && cellDataArr[colArr[j]]!="" && cellDataArr[colArr[j]]!=undefined){
					if (cellDataArr[colArr[j]]<0) continue;
					cellDataArr[colArr[j]] = BFC.biz.MoneyConverter.LiToYuanNum(cellDataArr[colArr[j]]);
				}
			}
			grid.ModifyRowData(i, cellDataArr.join(fieldFlag));
		}
	}	
}

/**
 *把某行或者所有行的某些列进行时间转换
 *@param grid 表格 
 *@param colArr: [0, 1, 3] 列序号
 *@param row 行数 为空时表示所有行
 *@author yuxf@fmcc.boss
 */
 
BFC.util.DOM.FormatCol2OcxDate = function(grid, colArr,row) {
	var rowData;
	var cellDataArr;
	
	if ( row != '' && row != null && row != undefined ) {
		rowData = grid.GetRowData( row );
		cellDataArr = rowData.split(fieldFlag);
		for (var j=0; j<colArr.length; j++) {
		    if(cellDataArr[colArr[j]]!=null && cellDataArr[colArr[j]]!="" && cellDataArr[colArr[j]]!=undefined){
		    	if( cellDataArr[colArr[j]].length == 8){
			 		cellDataArr[colArr[j]] = BTime.digitalToOcxDay(cellDataArr[colArr[j]]);
		    	}else{
			 		cellDataArr[colArr[j]] = BTime.digitalToOcx(cellDataArr[colArr[j]]);
			 	}
		    }
		}
		grid.ModifyRowData( row , cellDataArr.join(fieldFlag));
	}else {
		for (var i=0; i< grid.RowCount ; i++) {
			rowData = grid.GetRowData(i);
			cellDataArr = rowData.split(fieldFlag);
			for (var j=0; j<colArr.length; j++) {
		    	if(cellDataArr[colArr[j]]!=null && cellDataArr[colArr[j]]!="" && cellDataArr[colArr[j]]!=undefined){
		    		if( cellDataArr[colArr[j]].length == 8){
			 			cellDataArr[colArr[j]] = BTime.digitalToOcxDay(cellDataArr[colArr[j]]);
		    		}else{
			 			cellDataArr[colArr[j]] = BTime.digitalToOcx(cellDataArr[colArr[j]]);
			 		}
		    	}
			}
			grid.ModifyRowData(i, cellDataArr.join(fieldFlag));
		}
	}	
}

/**
 *判断是否需要替换
 *@param grid 表格 
 *@param rowArr 行数组
 *@param colArr 列数组
 *@param type 替换类型 replace 直接替换 money 金钱转换 time 时间转换 
 *@param srcValueArr 数据存在该数据需要替换
 *@param desValue 要替换的数据
 *@author yuxf@fmcc.boss
 */
BFC.util.DOM.replaceColsValue = function( grid , rowArr , colArr , type , srcValueArr , desValue) {
	var fieldFlag = String.fromCharCode(2);
	//所有
	if ( rowArr.length == 0 ) {
		var step = grid.RowCount ;
		rowArr = new Array();
		for ( var i=0;i< step ;i++) {
			rowArr[i] = i ;
		}
	}
	for ( var i=0; i < rowArr.length; i++) {
		var rowData = grid.GetRowData( i );
		var cellDataArr ;
		var needReplace ;
		for ( var j=0;j< colArr.length;j++) {
			var col = colArr[j] ;
			needReplace = BFC.util.DOM.doRelace( grid , rowArr[i] , col , srcValueArr, type) ;
			if ( needReplace ){
				cellDataArr = BFC.util.DOM.getCellDataArr( rowData , col , type , desValue ) ;
				rowData = cellDataArr.join(fieldFlag) ;	
			}
		}
		if ( needReplace ){
			BFC.util.DOM.replaceColValue( grid , rowArr[i] , cellDataArr ) ; 
		}
	}	
}

/**
 *判断是否需要替换
 *@param grid 表格 
 *@param row 行数
 *@param col 列数
 *@param srcValueArr 数据存在该数据需要替换
  *@param type 类型
 *@author yuxf@fmcc.boss
 */

BFC.util.DOM.doRelace = function( grid , row , col , srcValueArr ,type ) {

	
	if ( type == "replace" ) {
		var srcValue = grid.GetData( row , col-1); 
		for ( i=0; i < srcValueArr.length ; i++) {
			if ( srcValue == srcValueArr[i]) {
				return true;
			}
		}
		return false ;
	}
	return true ;
}

/**
 *行数据替换
 *@param grid 表格 
 *@param row 行数
 *@param cellDataArr 行数据数组
 *@author yuxf@fmcc.boss
 */

BFC.util.DOM.replaceColValue = function( grid , row , cellDataArr ) {
	var fieldFlag = String.fromCharCode(2);
	grid.ModifyRowData( row , cellDataArr.join(fieldFlag));
}

/**
 *根据转换类型转换数据
 *@param rowData 行数据
 *@param col 列数
 *@param type 替换类型 replace 直接替换 money 金钱转换 time 时间转换 
 *@param desValue 要替换的数据
 *@author yuxf@fmcc.boss
 */

BFC.util.DOM.getCellDataArr = function( rowData , col , type , desValue ) {
	var fieldFlag = String.fromCharCode(2);
	var cellDataArr = rowData.split(fieldFlag);
	var returnValue = "";
	var srcValue = cellDataArr[col] ;
	if ( type == "replace" ) {
		returnValue = desValue ;
	}else if ( type == "money" ) {
		returnValue =  BFC.biz.MoneyConverter.LiToYuan( srcValue );	
	}else if ( type == "time" ){
		if( srcValue != null && srcValue != "" && srcValue != undefined){
			returnValue = BTime.digitalToOcx( srcValue );
		}
	}
	cellDataArr[col] = returnValue ;
	return cellDataArr ;
}

/**
 * 15位身份证的第15位,奇数为男,偶数为女； 18位身份证的第17位,奇数为男,偶数为女
 *@param ic_no 身份证号码
 *@author yuxf@fmcc.boss
 */
 
BFC.util.DOM.getGender = function ( ic_no ) {
	
	var ret ;
	var s = 0;		
	if( ic_no.length == 15 ){
		s = ic_no.charAt(ic_no.length-1);
	}else{
		s = ic_no.charAt(ic_no.length-2);		    
	}
	//奇数为男,偶数为女
	if( s%2 == 0 ){
		ret = "1"
	}else{
		ret = "0"
	}
	return ret ;
}

/**************************************************时间方面的使用。*********************************/
/**
 *@class BFC.util.Time
 */
BFC.util.Time = function()
{
	this.className ="time";
}
/**
 * 获取当前时间(格式 yyyy/MM/dd hh:mm:ss)
 */
BFC.util.Time.getTime=function (){
var myDate = new Date();
var sYear = myDate.getYear();
var sMonth = myDate.getMonth()+1;
var sDay = myDate.getDate();
var sHour = myDate.getHours();
var sMinute = myDate.getMinutes();
var sSecond = myDate.getSeconds();
sMonth = ( sMonth < 10 )? "0"+sMonth:sMonth;
sDay = ( sDay < 10 )? "0"+sDay:sDay;
sHour = ( sHour < 10 )? "0"+sHour:sHour;
sMinute = ( sMinute < 10 )? "0"+sMinute:sMinute;
sSecond = ( sSecond < 10 )? "0"+sSecond:sSecond;
return  sYear+"/"+sMonth+"/"+sDay+" "+sHour+":"+sMinute+":"+sSecond;
}


/**
 * 获取当前时间(格式 yyyyMMddhhmmss)
 * @author chenjp
 */
BFC.util.Time.getToday=function (){
var myDate = new Date();
var sYear = myDate.getYear();
var sMonth = myDate.getMonth()+1;
var sDay = myDate.getDate();
var sHour = myDate.getHours();
var sMinute = myDate.getMinutes();
var sSecond = myDate.getSeconds();
sMonth = ( sMonth < 10 )? "0"+sMonth:sMonth;
sDay = ( sDay < 10 )? "0"+sDay:sDay;
sHour = ( sHour < 10 )? "0"+sHour:sHour;
sMinute = ( sMinute < 10 )? "0"+sMinute:sMinute;
sSecond = ( sSecond < 10 )? "0"+sSecond:sSecond;
return  ""+sYear+sMonth+sDay+sHour+sMinute+sSecond;
}

/**
 * 日期格式转换yyyy/MM/dd hh:mm:ss or yyyy-MM-dd hh:mm:ss 2 yyyymmdd
 * @param sDate为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 * modify by rzy change sMonth < 10 to sMonth.length < 2
 */
BFC.util.Time.getDateOnly =function(sDate){
	var rv = sDate.substring(0,4);
	var sMonth;
	var sDay;
	var flag = "";
	if(sDate.indexOf("/")>0){
		flag = "/";
	}else if(sDate.indexOf("-")>0){
		flag = "-";
	}
	sMonth = sDate.substring(sDate.indexOf(flag)+1, sDate.lastIndexOf(flag));
	sMonth = ( sMonth.length < 2 )? "0"+sMonth:sMonth;
	var lastind = "";
	if(sDate.indexOf(" ")>0){
		lastind = sDate.indexOf(" ");
	}else{
		lastind = sDate.length;
	}
	sDay = sDate.substring(sDate.lastIndexOf(flag)+1, lastind);
	sDay = ( sDay.length < 2 )? "0"+sDay:sDay;
	rv += sMonth;
	rv += sDay;
	return rv;
}

/**
 * 日期格式转换yyyy/MM/dd hh:mm:ss 2 yyyy-mm-dd
 * @param sDate为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 * modify by rzy change sMonth < 10 to sMonth.length < 2
 */
BFC.util.Time.getDateOnlyFormated =function(sDate){
  var rv = sDate.substring(0,4);
  var sMonth;
  var sDay;
  sMonth = sDate.substring(sDate.indexOf("/")+1, sDate.lastIndexOf("/"));
  sMonth = ( sMonth.length < 2 )? "0"+sMonth:sMonth;
  sDay = sDate.substring(sDate.lastIndexOf("/")+1, sDate.indexOf(" "));
  sDay = ( sDay.length < 2 )? "0"+sDay:sDay;
  rv += "-";
  rv +=sMonth;
  rv += "-";
  rv += sDay;
  return rv;
}

/**
 * 日期格式转换yyyy/MM/dd hh:mm:ss 2 yyyy/mm/dd
 * @param sDate为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 */
BFC.util.Time.getDateOnlyFormated2 =function(sDate){
  var rv = sDate.substring(0,4);
  var sMonth;
  var sDay;
  sMonth = sDate.substring(sDate.indexOf("/")+1, sDate.lastIndexOf("/"));
  sMonth = ( sMonth.length < 2 )? "0"+sMonth:sMonth;
  sDay = sDate.substring(sDate.lastIndexOf("/")+1, sDate.indexOf(" "));
  sDay = ( sDay.length < 2 )? "0"+sDay:sDay;
  rv += "/";
  rv +=sMonth;
  rv += "/";
  rv += sDay;
  return rv;
}

/**
 * 日期格式转换yyyy/MM/dd hh:mm:ss to yyyy-MM-dd hh:mm:ss
 * @param sDate为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 */
BFC.util.Time.dateFormat = function(sDate){
  var rv = sDate.substring(0,4);
  var sMonth;
  var sDay;
  sMonth = sDate.substring(sDate.indexOf("/")+1, sDate.lastIndexOf("/"));
  sMonth = ( sMonth < 10 )? "0"+parseInt(sMonth):sMonth;
  sDay = sDate.substring(sDate.lastIndexOf("/")+1, sDate.indexOf(" "));
  sDay = ( sDay < 10 )? "0"+parseInt(sDay):sDay;
  rv += "-";
  rv += sMonth;
  rv += "-";
  rv += sDay;
  rv += " ";
  rv += sDate.substring( sDate.indexOf(" ") ,sDate.length);
  return rv;
}
/**
 * 日期格式转换yyyy/MM/dd hh:mm:ss 2 hhmmss
 * @param sDate为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 * @author chenjp
 */
BFC.util.Time.getTimeOnly =function(sDate){
  if(sDate =="")return;
  var index = sDate.indexOf(":");
  var hh = sDate.substring(index-2,index+7);
  var hh = hh.split(":");
  hh[0] = parseInt(hh[0], 10);
  hh[0]= hh[0].valueOf();
  hh[0] = hh[0].toString();
  hh[1] = parseInt(hh[1], 10);
  hh[1]= hh[1].valueOf();
  hh[1] = hh[1].toString();
  hh[2] = parseInt(hh[2], 10);
  hh[2]= hh[2].valueOf();
  hh[2] = hh[2].toString();
  if(hh[0].length<2)hh[0]="0"+hh[0];
  if(hh[1].length<2)hh[1]="0"+hh[1];
  if(hh[2].length<2)hh[2]="0"+hh[2];
  return hh[0]+hh[1]+hh[2];
}


/**
 * 日期格式转换yyyy/MM/dd hh:mm:ss 2 yyyymmddhhmmss
 * @param ocxTimeValue为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 * @author chenjp
 */
BFC.util.Time.ocxFormatToDigital = function(ocxTimeValue){
	if(ocxTimeValue.length<10) return ocxTimeValue;
    var date = this.getDateOnly(ocxTimeValue);
    var time = this.getTimeOnly(ocxTimeValue);
    return date+time;
}
/**
 * 日期格式转换 yyyymmddhhmmss 2 yyyy/MM/dd hh:mm:ss
 * @param digitalTimeValue为格式为yyyymmddhhmmss的字符串日期
 * @author chenjp
 */
BFC.util.Time.digitalToOcx = function(digitalTimeValue){
	if(digitalTimeValue==null || digitalTimeValue == "undefined" || digitalTimeValue=="")return "";
	var myDate = digitalTimeValue.trim();
	var sYear = myDate.substring(0,4);
	var sMonth = myDate.substring(4,6);
	var sDay = myDate.substring(6,8);
	var sHour = myDate.substring(8,10);
	var sMinute = myDate.substring(10,12);
	var sSecond = myDate.substring(12,14);
	return  sYear+"/"+sMonth+"/"+sDay+" "+sHour+":"+sMinute+":"+sSecond;
}

/**
 * 日期格式转换 yyyymmddhhmmss 2 yyyy/MM/dd 
 * @param digitalTimeValue为格式为yyyymmddhhmmss的字符串日期
 * @author chenjp
 */
BFC.util.Time.digitalToOcxDay = function(digitalTimeValue){
	if(digitalTimeValue==null || digitalTimeValue == "undefined" || digitalTimeValue=="")return "";
	var myDate = digitalTimeValue.trim();
	var sYear = myDate.substring(0,4);
	var sMonth = myDate.substring(4,6);
	var sDay = myDate.substring(6,8);
	return  sYear+"/"+sMonth+"/"+sDay;
}

/**
 * 日期格式转换 yyyymmddhhmmss 2 yyyy-MM-dd hh:mm:ss
 * @param digitalTimeValue为格式为yyyymmddhhmmss的字符串日期
 * @author shizh
 */
BFC.util.Time.digitalToTableOcx = function(digitalTimeValue){
	if(digitalTimeValue==null || digitalTimeValue == "undefined" || digitalTimeValue=="")return "";
	var myDate = digitalTimeValue.trim();
	var sYear = myDate.substring(0,4);
	var sMonth = myDate.substring(4,6);
	var sDay = myDate.substring(6,8);
	var sHour = myDate.substring(8,10);
	var sMinute = myDate.substring(10,12);
	var sSecond = myDate.substring(12,14);
	return  sYear+"-"+sMonth+"-"+sDay+" "+sHour+":"+sMinute+":"+sSecond;
}

/**
 * 日期格式转换 yyyymmddhhmmss 2 yyyy-MM-dd
 * @param digitalTimeValue为格式为yyyymmddhhmmss的字符串日期
 * @author shizh
 */
BFC.util.Time.digitalToTableOcxDay = function(digitalTimeValue){
	if(digitalTimeValue==null || digitalTimeValue == "undefined" || digitalTimeValue=="")return "";
	var myDate = digitalTimeValue.trim();
	var sYear = myDate.substring(0,4);
	var sMonth = myDate.substring(4,6);
	var sDay = myDate.substring(6,8);
	return  sYear + "-" + sMonth + "-" + sDay;
}

/**
 * 增加天数
 * 日期格式转换yyyy/MM/dd hh:mm:ss 2 yyyymmddhhmmss,添加天数。
 * @param ocxTimeValue为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 * @param days_in :要增加的天数
 * @author chenjp
 */
BFC.util.Time.addDays = function(ocxTimeValue,days_in){
	var days = parseInt(days_in);
	//if(!ocxTimeValue || days <0)return false;
	if(!ocxTimeValue)return false;
	var newDate = new Date(Date.parse(ocxTimeValue)+86400000*days);
	var newMonth = newDate.getMonth()+1;
	newMonth = ( (""+newMonth).length < 2 )? "0"+newMonth:newMonth;
	var day = newDate.getDate();
	day = ( ((""+day).length) < 2 )? "0"+day:day;
	var hour = newDate.getHours();
	hour = ( ((""+hour).length) < 2 )? "0"+hour:hour;
	var min = newDate.getMinutes();
	min = ( ((""+min).length) < 2 )? "0"+min:min;
	var sec = newDate.getSeconds();
	sec = ( ((""+sec).length) < 2 )? "0"+sec:sec;
	return ""+newDate.getFullYear()+newMonth+day+hour+min+sec;
}


/**
 * 减少天数
 * 日期格式转换yyyy/MM/dd hh:mm:ss 2 yyyymmddhhmmss,添加天数。
 * @param ocxTimeValue为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 * @param days_in :要增加的天数
 * @author chengenghui
 */
BFC.util.Time.delDays = function(ocxTimeValue,days_in){
	var days = parseInt(days_in);
	if(!ocxTimeValue || days <0)return false;
	var newDate = new Date(Date.parse(ocxTimeValue)-86400000*days);
	var newMonth = newDate.getMonth()+1;
	newMonth = ( (""+newMonth).length < 2 )? "0"+newMonth:newMonth;
	var day = newDate.getDate();
	day = ( ((""+day).length) < 2 )? "0"+day:day;
	var hour = newDate.getHours();
	hour = ( ((""+hour).length) < 2 )? "0"+hour:hour;
	var min = newDate.getMinutes();
	min = ( ((""+min).length) < 2 )? "0"+min:min;
	var sec = newDate.getSeconds();
	sec = ( ((""+sec).length) < 2 )? "0"+sec:sec;
	return ""+newDate.getFullYear()+newMonth+day+hour+min+sec;
}
/**
 * 格式转换
 * 日期格式转换yyyy/MM/dd hh:mm:ss 2 yyyy-mm-dd-hh-mm-ss,添加天数。
 * @param ocxTimeValue为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 * @param days :要增加的天数
 * @author chenjp
 */
BFC.util.Time.formatOCX2slash = function(ocxTimeValue){
	if(ocxTimeValue=="" ||ocxTimeValue=="undefined") return ;
	var newDate = new Date(Date.parse(ocxTimeValue));
	var newMonth = newDate.getMonth()+1;
	newMonth = ( newMonth < 10 )? "0"+newMonth:newMonth;
	var day = newDate.getDate();
	day = ( day < 10 )? "0"+day:day;
	var hour = newDate.getHours();
	hour = ( hour < 10 )? "0"+hour:hour;
	var min = newDate.getMinutes();
	min = ( min < 10 )? "0"+min:min;
	var sec = newDate.getSeconds();
	sec = ( sec < 10 )? "0"+sec:sec;
	return ""+newDate.getFullYear()+'-'+newMonth+'-'+day+'-'+hour+'-'+min+'-'+sec;
}
/**
 * 格式转换
 * 日期格式转换yyyymmddhhmmss 2 yyyy-mm-dd-hh-mm-ss
 * @param dateToBeFormatted 为格式为yyyymmddhhmmss的日期格式
 * @author chenjp
 */
BFC.util.Time.formatDate2slash = function(dateToBeFormatted){
	if(dateToBeFormatted == "" || dateToBeFormatted == null || dateToBeFormatted =="undefined")return;
	//if(typeof(dateToBeFormatted)!="object")return;
	var myDate = dateToBeFormatted.trim();
	var sYear = myDate.substring(0,4);
	var sMonth = myDate.substring(4,6);
	var sDay = myDate.substring(6,8);
	var sHour = myDate.substring(8,10);
	var sMinute = myDate.substring(10,12);
	var sSecond = myDate.substring(12,14);
	return ""+sYear+'-'+sMonth+'-'+sDay+'-'+sHour+'-'+sMinute+'-'+sSecond;
}
/**
 * 格式转换
 * 日期格式转换javascript日期格式 2 yyyy-mm-dd-hh-mm-ss
 * @param dateToBeFormatted 为格式为javascript所能够识别的日期格式
 * @author chenjp
 */
BFC.util.Time.formatJSDate2slash = function(dateToBeFormatted){
	if(dateToBeFormatted == "" || dateToBeFormatted == null || dateToBeFormatted =="undefined")return;
	//if(typeof(dateToBeFormatted)!="object")return;
	var newMonth = dateToBeFormatted.getMonth()+1;
	newMonth = ( newMonth < 10 )? "0"+newMonth:newMonth;
	var day = dateToBeFormatted.getDate();
	day = ( day < 10 )? "0"+day:day;
	var hour = dateToBeFormatted.getHours();
	hour = ( hour < 10 )? "0"+hour:hour;
	var min = dateToBeFormatted.getMinutes();
	min = ( min < 10 )? "0"+min:min;
	var sec = dateToBeFormatted.getSeconds();
	sec = ( sec < 10 )? "0"+sec:sec;
	return ""+dateToBeFormatted.getFullYear()+'-'+newMonth+'-'+day+'-'+hour+'-'+min+'-'+sec;
}

/**
 * 格式转换 将JS里可识别的时间对像转化为后台的全数字形式的串
 * 日期格式转换javascript日期格式 2 yyyymmddhhmmss
 * @param dateToBeFormatted 为格式为javascript所能够识别的日期格式
 * @author chenjp
 */
BFC.util.Time.formatJSDate2digital = function(dateToBeFormatted){
	if(dateToBeFormatted == "" || dateToBeFormatted == null || dateToBeFormatted =="undefined")return;
	//if(typeof(dateToBeFormatted)!="object")return;
	var newMonth = dateToBeFormatted.getMonth()+1;
	newMonth = ( newMonth < 10 )? "0"+newMonth:newMonth;
	var day = dateToBeFormatted.getDate();
	day = ( day < 10 )? "0"+day:day;
	var hour = dateToBeFormatted.getHours();
	hour = ( hour < 10 )? "0"+hour:hour;
	var min = dateToBeFormatted.getMinutes();
	min = ( min < 10 )? "0"+min:min;
	var sec = dateToBeFormatted.getSeconds();
	sec = ( sec < 10 )? "0"+sec:sec;
	return ""+dateToBeFormatted.getFullYear()+newMonth+day+hour+min+sec;
}

/**
 * 功能：如果不足两位数，前头补一个0
 * @param dateToFix :需要修正的时间。（可以是时间，可以是分钟。。。。，是数字型）
 * @author chenjp
 */
BFC.util.Time.prefixOneZero = function(dateToFix){
	if(dateToFix=="")return;
	var dateAfterFix = (dateToFix < 10)?('0'+dateToFix):dateToFix;
	return dateToFix;
}
/**
 *传入周数 and 当前日期,推算(前)下N周的周一与周日的日期
 *@param weekIndex 0或者null表示本周,1表示下周,-1表示上周,依此类推
 *@param currDate 当前日期对象,null表示取当前机器日期
 *@return week 长度为2的字符型数组,week[0]表示周一,week[1]表示周日
 *@author wuying
 */
BFC.util.Time.getWeek = function(weekIndex, currDate) {
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
BFC.util.Time.getTodayString = function(){
	var date = new Date();
	return ""+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
}
BFC.util.Time.getYesterdayString = function(){
	var date = new Date(Date.parse(new Date())-86400000);
	return ""+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
}
/**
 *取本月最后一天yyyy/MM/dd hh:mm:ss 2 yyyy/MM/31
 *@param sDate为格式为yyyy/MM/dd hh:mm:ss的字符串日期
 *@param formatDate为格式为包含“yyyyMMddhhmmss”的字符串
 *@return date yyyy/MM/31
 *@author rzy
 */
BFC.util.Time.getMonthEndDay = function(sDate,formatDate){
    var myDate = new Date(sDate);
    var year = myDate.getYear();
    var sMonth = myDate.getMonth()+1;
    sMonth = ( sMonth < 10 )? "0"+sMonth:sMonth;
    m = sMonth;
    if(m=="01"||m=="03"||m=="05"||m=="07"||m=="08"||m=="10"||m=="12"){
      d = "31";
    }
    if(m=="04"||m=="06"||m=="09"||m=="11"){
      d = "30";
    }
    if(m=="02"){
      if(BFC.util.Time.isRunNian(year))  d = "29";
      else  d = "28";
    }
    hh = "00";
    mm = "00";
    ss = "00";
    formatDate = formatDate.replace("yyyy",year);
    formatDate = formatDate.replace("MM",m);
    formatDate = formatDate.replace("dd",d);
    formatDate = formatDate.replace("hh",hh);
    formatDate = formatDate.replace("mm",mm);
    formatDate = formatDate.replace("ss",ss);
//    alert(formatDate);
    return formatDate;
}
/**
 *判断是否是闰年
 *@param year
 *@return boolean true:是闰年；false:不是闰年
 *@author rzy
 */
BFC.util.Time.isRunNian = function(year){
    return ((year%4 == 0) && (year%100 != 0)) || (year%400 == 0) ? true : false;
}
/**
 *校验日期字符串
 *@param str_date
 *@return boolean 
 *@author rzy
 */
BFC.util.Time.checkDateFormat = function(str_date){
  str_date = str_date.trim();
  var pattern = /^[0-9\-\/]{10}$/g;
  var pattern2 = /\d{4}([\-\/])\d{2}\1\d{2}/g;
  if(pattern.test(str_date)&&pattern2.test(str_date)){
      var year = str_date.substr(0,4);
      var m = str_date.substr(5,2);
      var day = str_date.substr(8,2);
      if(Number(m)>12){
          showMsg("月不能大于12");
          return false;
      }
      if(m=="01"||m=="03"||m=="05"||m=="07"||m=="08"||m=="10"||m=="12"){
          var d = "31";
      }
      if(m=="04"||m=="06"||m=="09"||m=="11"){
          var d = "30";
      }
      if(m=="02"){
          if(BFC.util.Time.isRunNian(year))  var d = "29";
          else  var d = "28";
      }
      if(Number(day)>Number(d)){
          showMsg("日不能大于"+d);
          return false;
      }
      return true;
  }else{
      showMsg("您输入的日期格式不正确!格式为:2000-01-01或2000/01/01");
      return false;
  }
}

/**
 *获取当前时间(格式 yyyymmddhhmmss)
 *@author yuxf@fmcc.boss
 */

BFC.util.Time.getSystemTime = function(){
	return _system_date_from_web_service; 
}

/**
 *获取当前时间(格式 yyyy-mm-dd)
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.getSystemDate = function(){
	return this.formatDate2slash( this.getSystemTime() ).substring(0,10); 
}

/**
 *获取当月第一天(格式 yyyy-mm-dd)
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.getThisMonthFirstDate = function(){
	return this.formatDate2slash( this.getSystemTime() ).substring(0,7) + "-01"; 
}

/**
 *获取下月第一天(格式 yyyy-mm-dd)
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.getNextMonthFirstDate = function( date ){
	var nowDate = date ;
	if ( nowDate == '' || nowDate == null ) {
		nowDate = BFC.util.Time.getThisMonthFirstDate().substring(0,10);
	}
	var year = nowDate.substring(0,4);
	var month = nowDate.substring(5,7);
	if ( month == "12" ){
		year = parseInt(year) + 1 ;
		month = "01" ;
	}else{
		if ( month.substring(0,1) == "0") {
			month = parseInt(month.substring(1,2)) +1
 		}else {
 			month = parseInt(month) + 1;
 		}
 		month = month + "";
 		if ( month.length == 1 ) {
 			month = "0" + month ;
 		}
	}
	return year + "-" + month + "-" + "01" ;
}

/**
 *获取次年下月第一天(传入传出格式 yyyy-mm-dd)
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.getNextYearNextMonthFirstDate = function( date ){
	var nowDate = date ;
	if ( nowDate == '' || nowDate == null ) {
		nowDate = BFC.util.Time.getThisMonthFirstDate().substring(0,10);
	}
	var year = nowDate.substring(0,4);
	var month = nowDate.substring(5,7);
	if ( month == "12" ){
		year = parseInt(year) + 1 ;
		month = "01" ;
	}else{
		if ( month.substring(0,1) == "0") {
			month = parseInt(month.substring(1,2)) +1
 		}else {
 			month = parseInt(month) + 1;
 		}
 		month = month + "";
 		if ( month.length == 1 ) {
 			month = "0" + month ;
 		}
	}
	return (year*1+1) + "-" + month + "-" + "01" ;
}


/**
 *获取上月第一天(格式 yyyy-mm-dd OR yyyy/MM/dd  2 yyyy-mm-dd)
 *@author yuxing@fmcc.boss
 */
BFC.util.Time.getPreviousMonthFirstDate = function( date ){
	var nowDate = date ;
	if ( nowDate == '' || nowDate == null ) {
		nowDate = BFC.util.Time.getThisMonthFirstDate().substring(0,10);
	}
	var year = nowDate.substring(0,4);
	var month = nowDate.substring(5,7);
	if ( month == "01" ){
		year = parseInt(year) - 1 ;
		month = "12" ;
	}else{
		month = parseInt(month,10)-1;
 		month = month + "";
 		if ( month.length == 1 ) {
 			month = "0" + month ;
 		}
	}
	return year + "-" + month + "-" + "01" ;
}
/**
 *判断是否是闰年
 *@param year 年份
 *@return boolean true:是闰年；false:不是闰年
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.isLeapYear = function( year ){
    return ((year%4 == 0) && (year%100 != 0)) || (year%400 == 0) ? true : false;
}

/**
 * 增加月份
 *@param today 时间 yyyymmdd
 *param step 正数为增加，负数为减少
 *@return 某个月的第一天
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.addMonth = function( today , step ){
	var ret ;
	var nowDate = today ;
	var year = Number (nowDate.substring(0,4));
	var month = Number (nowDate.substring(4,6));
	var step = Number(step);
	
	if ( step > 0 ) {
		if ( ( month + step ) <= 12  )  {
			month = month + step ;
		}else {
			month = month + step%12;
			year = year + ( step-step%12) / 12 ;
			if ( month > 12 ) {
				month  = month - 12 ;
				year = year  + 1 ;
			}
		}
	}else {
		if ( ( month + step ) > 0  )  {
			month = month + step ;
		}else {
			step = -step ;
			month = month - step%12 ;
			year = year - ( step-step%12) / 12 ;
			if ( month < 1 ) {
				month  = month + 12 ;
				year = year -1 ;
			}
		}
	}
	month = month + "";
 	if ( month.length == 1 ) {
 		month = "0" + month ;
 	}
 	ret = year + "" + month + "" + "01" ;
    return ret ;
}

/**
 * 增加月份
 *@param i_date 时间 yyyymmdd
 *param num 正数为增加，负数为减少
 *@return yyyymmdd
 *@author shenj
 */
BFC.util.Time.addMonth2 = function( i_date, num ){
	i_date = BFC.util.Time.digitalToOcxDay(i_date); //yyyymmdd 2 yyyy/mm/dd
	var date = new Date(i_date);

	var tempDate=date.getDate();
	date.setMonth(date.getMonth() + parseInt(num,10));
	if(tempDate!=date.getDate()) date.setDate(0);

	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();

	function _f(n){
		if(n<10)
		n = "0"+n;
		return n;
	}

	return year + "" + _f(month) + "" + _f(day);
}

BFC.util.Time.getThisMonthLastDay = function( today ){
	var ret ;
	var nowDate = today ;
	var year = nowDate.substring(0,4);
	var month = nowDate.substring(4,6);
	var day = nowDate.substring(6,8);

	if( month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12" ){
		day = "31" ;
	}
	if( month == "04" || month == "06" || month == "09" || month == "11" ){
		day = "30";
	}
	if( month == "02" ){
		if( BFC.util.Time.isLeapYear( year ) )  {
			day = "29" ;
		}else{  
			day = "28" ;
    	}
    }
    ret = year + month + day ;
    return ret ;
}

/**
 *获取下月最后一天(格式 yyyy-mm-dd OR yyyy/MM/dd  2 yyyy-mm-dd)
 *@author yuxing@fmcc.boss
 */
BFC.util.Time.getNextMonthLastDay = function( date ){
	var nextDate = date ;
	var year = nextDate.substring(0,4);
	var month = nextDate.substring(5,7);
	var day = nextDate.substring(8,10);
	
	if( month == "12" ){
		year = parseInt(year) + 1 ;
		month = "01";
	}else{
		month = (parseInt(month,10) + 1)<10?("0"+(parseInt(month,10) + 1)):((parseInt(month,10) + 1)+"");
	}

	if( month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12" ){
		day = "31" ;
	}
	if( month == "04" || month == "06" || month == "09" || month == "11" ){
		day = "30";
	}
	
	if( month == "02" ){
		if( BFC.util.Time.isLeapYear( year ) )  {
			day = "29" ;
		}else{  
			day = "28" ;
    	}
    }
    return year + "-" + month + "-" + day ;
}


/**
 * 
 *@param today yyyymmdd
 *@return boolean true:是闰年；false:不是闰年
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.getYesterday = function( today ){
	var ret ;
	var nowDate = today ;
	var year = nowDate.substring(0,4);
	var month = nowDate.substring(4,6);
	var day = nowDate.substring(6,8);
	//不是1号，不用修改年月
	if ( Number(day) > 1 ) {
		day = Number(day) - 1 ;
		day = day + "";
 		if ( day.length == 1 ) {
 			day = "0" + day ;
 		}
		ret = year + month + day ;
	}else {
		var last_month = BFC.util.Time.addMonth( today , -1 ) ;
		day = BFC.util.Time.getThisMonthLastDay ( last_month ).substring(6,8) ;
		ret = last_month.substring( 0,6 ) + "" + day ;
	}
	return ret;  
}

/**
 * 计算时间差值 (digitalTimeValue-digitalTimeValu2)
 * @param digitalTimeValue1 为格式为yyyymmddhhmiss的字符串时间
 * @param digitalTimeValue2 为格式为yyyymmddhhmiss的字符串时间
 * @param type 为时间差值类型字符串 "year","month","day","hour","minute","second" 默认为"day"
 * @author chengenghui
 */
BFC.util.Time.DateDiff = function (digitalTimeValue1,digitalTimeValue2,type){
    var day = 24 * 60 * 60 *1000;
    var hour = 60 * 60 *1000;
    var minute = 60 *1000;
    var second = 1000;
	try{    
		var myDate1 = digitalTimeValue1.trim();
		var sYear1 = myDate1.substring(0,4) * 1;
		var sMonth1 = myDate1.substring(4,6) * 1 - 1;
		var sDay1 = myDate1.substring(6,8) * 1;
		var sHour1 = myDate1.substring(8,10) * 1;
		var sMinute1 = myDate1.substring(10,12) * 1;
		var sSecond1 = myDate1.substring(12,14) * 1;		
		var checkDate1 = new Date(sYear1,sMonth1,sDay1,sHour1,sMinute1,sSecond1);
   		var checkTime1 = checkDate1.getTime();
		
		var myDate2 = digitalTimeValue2.trim();
		var sYear2 = myDate2.substring(0,4) * 1;
		var sMonth2 = myDate2.substring(4,6) * 1 - 1;
		var sDay2 = myDate2.substring(6,8) * 1;
		var sHour2 = myDate2.substring(8,10) * 1;
		var sMinute2 = myDate2.substring(10,12) * 1;
		var sSecond2 = myDate2.substring(12,14) * 1;		
		var checkDate2 = new Date(sYear2,sMonth2,sDay2,sHour2,sMinute2,sSecond2);
   		var checkTime2 = checkDate2.getTime();
   		
		var retValue = 0;
		switch(type){
			case "year":
				retValue = sYear1 - sYear2;
				break;
			case "month":
				retValue = sMonth1 + 12*(sYear1 - sYear2) - sMonth2;
				break;
			case "day":
				retValue = (checkTime1 - checkTime2) / day;  
				break;
			case "hour":
				retValue = (checkTime1 - checkTime2) / hour; 
				break;
			case "minute":
				retValue = (checkTime1 - checkTime2) / minute; 
				break;
			case "second":
				retValue = (checkTime1 - checkTime2) / second; 
				break;
			case "year年month月day天":
				if(checkTime1 >= checkTime2){				
					var ret_day = sDay1 - sDay2;
					sMonth1 = sMonth1 + 1;
					sMonth2 = sMonth2 + 1;
					if(ret_day<0){
						var month_total_day2 = 31;
						if(sMonth2 == 1 || sMonth2 == 3 || sMonth2 == 5 || sMonth2 == 7 || sMonth2 == 8 || sMonth2 == 10 || sMonth2 == 12){
							month_total_day2 = 31;
						}else if(sMonth2 == 4 || sMonth2 == 6 || sMonth2 == 9 || sMonth2 == 11){
							month_total_day2 = 30;
						}else{
							if( BFC.util.Time.isLeapYear( sYear2 ) )  {
								month_total_day2 = 29 ;
							}else{  
								month_total_day2 = 28 ;
							}
						}
						ret_day = ret_day + month_total_day2;
						if(sMonth1 == 1){
							sMonth1 = 12;
							sYear1 = sYear1 - 1;
						}else{
							sMonth1 = sMonth1 - 1;
						}
					}					
					var ret_year = (sMonth1 - sMonth2)<0?(sYear1- 1 - sYear2):(sYear1 - sYear2);
					var ret_month = (sMonth1 - sMonth2)<0?(sMonth1 + 12 - sMonth2):(sMonth1 - sMonth2);
					retValue = ret_year + "年" + ret_month + "月" + ret_day + "天";
				}else{
					showMsg("被减时间不能小于减的时间");
					return false;
				}				
				break;
			default:
				retValue = (checkTime1 - checkTime2) / day;  
				break;
		}
        return retValue;
    }catch(e){
    	showMsg(e.toString());
   		return false;
	}
}
		
/**
 * 取开始到结束时间包含的月份 
 * @param start_month 为格式为yyyymm的字符串
 * @param end_month 为格式为yyyymm的字符串
 * @author chengenghui
 */
BFC.util.Time.getIncludeMonth = function(start_month_time, end_month_time){
	var include_month = new Array();	
	var start_year = Number(start_month_time.substring(0, 4));
	var end_year = Number(end_month_time.substring(0, 4));		
	var start_month = Number(start_month_time.substring(4, 6));
	var end_month = Number(end_month_time.substring(4, 6));
		
	if(end_year - start_year == 0 && end_month > start_month){	//同年
		include_month.push(start_month);		
		var temp_month = start_month;
		while(temp_month < end_month){
			temp_month++;
			include_month.push(temp_month);
		}
	}else if(end_year - start_year == 1 && start_month > end_month){	//跨一年且相差不到一年
		var temp_month = 1;
		include_month.push(temp_month);	
		while(temp_month < end_month){
			temp_month++;
			include_month.push(temp_month);
		}		
		temp_month = start_month;
		include_month.push(temp_month);	
		while(temp_month < 12){
			temp_month++;
			include_month.push(temp_month);
		}
		
	}else if((end_year - start_year == 1 && start_month < end_month) || (end_year - start_year > 1) ){ //相差一年及一年以上
		include_month = [1,2,3,4,5,6,7,8,9,10,11,12];
	}else{
   		return false;
	}
	return include_month;
}
/************************************以下为对数字功能进行扩展*************************************************/
function accAdd(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2))
	return (accMul(arg1,m)+accMul(arg2,m))/m
}
function accSub(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2))
	return (accMul(arg1,m)-accMul(arg2,m))/m
}
function accMul(arg1,arg2)
{
	arg1=String(arg1);var i=arg1.length-arg1.indexOf(".")-1;i=(i>=arg1.length)?0:i
	arg2=String(arg2);var j=arg2.length-arg2.indexOf(".")-1;j=(j>=arg2.length)?0:j
	return arg1.replace(".","")*arg2.replace(".","")/Math.pow(10,i+j)
}

function accDiv(arg1,arg2){
	var t1=0,t2=0,r1,r2;
	try{t1=arg1.toString().split(".")[1].length}catch(e){}
	try{t2=arg2.toString().split(".")[1].length}catch(e){}
	with(Math){
		r1=Number(arg1.toString().replace(".",""))
		r2=Number(arg2.toString().replace(".",""))
		return (r1/r2)*pow(10,t2-t1);
	}
}
/**
 *判断浮点数加法运算 (3).add(0.4);
 *@param arg
 */
Number.prototype.add = function (arg){
	return accAdd(this, arg);
}
/**
 *判断浮点数减法运算 (3).sub(0.4);
 *@param arg
 */
Number.prototype.sub = function (arg){
	return accSub(this,arg);
}
/**
 *判断浮点数除法运算 (3).mul(0.4);
 *@param arg
 */
Number.prototype.div = function (arg){
	return accDiv(this, arg);
}
/**
 *判断浮点数乘法运算  (3).mul(0.4);
 *@param arg
 */
Number.prototype.mul = function (arg){
	return accMul(arg, this);
}

/************************************以下为对字符串功能进行扩展*************************************************/
/**
 *判断字符串长度是否在所要求的范围内
 *@param minL: 最小长度，数字;
 *@param maxL :最大长度，数字;
 */
String.prototype.isValidLength = function (minL, maxL) {
  if( this.length < minL || this.length > maxL ) return false;
  return true;
}
/**
 *判断字符串长度是否是所要求的长度。
 *@param len: 要求的长度，数字;
 */
String.prototype.accordLength = function (len) {
  if(this.length != len) return false;
  return true;
}
/**
 *去空格。
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 *字符串转bolean，字符串为"true"时(不区分大小写。)，返回true;字符串为"false"时（不区分大小写），返回false;
 *@param len: 要求的长度，数字;
 */
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
/**
 * 关键信息屏蔽，支持只屏蔽文本关键位置
 * @param 屏蔽开始位置
 * @param 屏蔽结束位置
 */
String.prototype.secret = function(begin,end){
	if(!begin) begin = 0;
	if(!end) end = this.length;
	this.secret_value = "";
	var exp1 = new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2D]$");
	var exp2 = new RegExp("^[A-Za-z0-9_]$");
	for(var i=0;i<this.length;i++){
		if(i>=begin&&i<end){
			if(this.charCodeAt(i)>255){
				this.secret_value += this.charAt(i).replace(exp1,"*");
			}else{
				this.secret_value += this.charAt(i).replace(exp2,"*");
			}
		}else{
			this.secret_value += this.charAt(i);
		}
	}
	return this.secret_value;
}
/************************************以下为对数组功能进行扩展*************************************************/
/**
 * 判断数组是否已包含了某个元素
*/
Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
}
/*  
*  方法:Array.remove(dx)  
*  功能:根据元素值删除数组元素.  
*  参数:元素值  
*  返回:在原数组上修改数组  
*  作者：pxp  
*/  
Array.prototype.indexOf = function (val) {   
   for (var i = 0; i < this.length; i++) {   
        if (this[i] == val) {   
            return i;   
        }   
    }   
    return -1;   
};   
Array.prototype.removevalue = function (val) {   
    var index = this.indexOf(val);   
    if (index > -1) {   
        this.splice(index, 1);   
    }   
};   
  
  
/*  
 *  方法:Array.remove(dx)  
 *  功能:根据元素位置值删除数组元素.  
 *  参数:元素值  
 *  返回:在原数组上修改数组  
 *  作者：pxp  
 */  
Array.prototype.remove = function (dx) {   
    if (isNaN(dx) || dx > this.length) {   
        return false;   
    }   
    for (var i = 0, n = 0; i < this.length; i++) {   
        if (this[i] != this[dx]) {   
            this[n++] = this[i];   
        }   
    }   
    this.length -= 1;   
};
/***==============================================================
 *
 * <p>Title: javascript 验证函数库</p>
 *
 * <p>Description:前台验证,使用javascript </p>
 *
 * <p>Copyright: Copyright (c) 2005-2007</p>
 *
 * <p>Company: fmcc&newland</p>
 *
 * @author chenjp
 * @version 1.0
 * Contact:eyesjava@gmail.com
 * JSValidator.js
 *usage:<script type="text/JavaScript" src="JSValidator.js"> </script>
 *现在的JS验证整合到该文件下面，我在inc.jsp下面初始化的一个这样的对象jsValidator,大家使用起来是一样的。
 *原先包含的不变，但新的页面想要单独使用的话，请包含BFC.js和BFCUtils.js这两个文件，造成的不便请谅解。
 *现在调用的访求还是不便jsValidator.isNull("form","elementId")不是类似这样
 *history:增加对不指定forms时对元素进行判断.
 *=================================================================
 */
 /*==============================================================
  *框架公有部分函数
  *==============================================================
  */
  //全局变量，formID:表单名;fieldID:表单中的元素名．
 // var formID;
 // var fieldID;
 // var defaultFormID;
 /**
 * 类Validation
 * 构造函数
 */
BFC.util.Validator = function()
{
  this.fieldID=null;
  this.MOBILE_TIP = "手机号码必须为13,14,15,18开头的11位数字或10648开头的13位号码";
  this.MOBILE_TIP_YD = "移动手机号码必须为13[5-9],134[0-8],147,15[0-2,7-9],18[2,3,4,7,8]开头的11位数字或10648开头的13位号码";
}

/**函数showError()
 *显示错误
 *不建议直接调用此方法。
 */
BFC.util.Validator.prototype.showError=function(msg,elementID)
 {

    try{
        //showMsg来自文件showMessage.js中的函数
		showMsg(msg,null,elementID);
	}catch(e){
		alert(msg);
	};
 }

/**
 *函数checkFormAndField(fform,fieldID)
 *验证form的有效性
 *参数：form　表单引用;fieldID,表单元素ID
 *
 */
BFC.util.Validator.prototype.checkFormAndField=function(fform,elementID){
		//判断form与field有效性,如果为空，采用默认的form.
	if(fform==null){this.showError("您所指定的form表单不存在");return false;};
	if(elementID==null){this.showError("您所指定的表单元素不存在");return false;};
	var formID=document.getElementById(fform);
	this.fieldID=document.getElementById(formID.id + ":" + elementID);
}

/**
 *函数checkField(fieldID)
 *验证form的有效性
 *fieldID,表单元素ID,送给这之前请使用document.getElementById()得到这元素,然后送过来.
 * 说明：这边的话当非jsf页面也是可以用的,只需元素的ID是独一的.
 */
BFC.util.Validator.prototype.checkField = function(fieldID)
{
	if(fieldID == null){
		this.showError("表单不存在或所指定的表单有误");
		return false;
		};
	this.fieldID=fieldID;
	return true;
}
/*=================================================
*以下为各验证函数
==================================================
*/

/**函数isNull()
 *验证字段是否非空，如果不为空,返回true.否则返回false.
 *参数：fform表单id；elementID表单里的元素名.
 *此外不建议传入自定义的提示．
 *<b>注意，这里我表达的意思是要验证的值不为空的时候返回true,为空的时候返回false.请对比一下，不要弄反</b>
 */
BFC.util.Validator.prototype.isNull=function(fform,elementID,tipMsg)
{
	//如果只有一个参数,那么取第一个参数,认为传的是fieldID.

	if(typeof(arguments[0]) == "string"){
		var tips = arguments[2];
		this.checkFormAndField(fform,elementID);
		var fieldID = this.fieldID;
		var fieldValue = this.fieldID.value;
		if((fieldValue==null)||(fieldValue=="")){
			var msgs = "此处不能为空,请输入值";
			if(tips != null && tips != "undefined"){msgs = "请输入" + tips};
			this.showError(msgs,fieldID);
			return false;
		}
	}
	if(typeof(arguments[0]) == "object" ){
		this.checkField(arguments[0]);
		if(arguments[0].value =="" || arguments[0].value ==null){
			var msgs = "此处不能为空,请输入值";
			var tips = arguments[1];
			var fieldID = this.fieldID;
			if(tips != null && tips !="undefined"){msgs = "请输入" + tips};
			this.showError(msgs,fieldID);
			return false;
		};
	};
	return true;
}

/**
 *函数isNum()
 *验证字段是否是数字，如果是数字,返回true.否则返回false.
 *@param：fform表单id；
 *@param: elementID表单里的元素名.
 *@param: tipMsg,自定义错误，这里仅需要输入提示的关键字，其它的统一由这里来生成.
 *比如　"号码"，这里就会生成"这里要求输入字符必须是号码,请重新输入"
 */
BFC.util.Validator.prototype.isNum = function(fform,elementID,tipMsg)
{
	var tips = arguments[2];
	if(typeof(arguments[0]) == "object"){tips = arguments[1];this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	var i,j,strTemp;
	 strTemp="0123456789";
	 if ( fieldValue.length== 0){
	 	if(tips!= null && tips != "undefined" && tips !="")this.showError("请输入"+tips,fieldID);
	 	else this.showError("请输入整数",fieldID);
	 	return false;
	 	};
	 for (i=0;i<fieldValue.length;i++)
	 {
	  j=strTemp.indexOf(fieldValue.charAt(i));
	  if (j==-1)
	  {
	  //非数字时
	  var msgs = "此处必须输入整数值,请重新输入";
	  if(tips != null && tips != "undefined"){msgs = tips + "必须是数值,请重新输入";}
	  else if(typeof(arguments[0]) == "object")
	  		{
	  		if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"必须是整数值,请重新输入";
	 	}
	  this.showError(msgs,fieldID);
	  return false;
	 }

	 }
	 //满足要求时
	 return true;

}

/**函数 isIntegerValue()
 *验证字段是否是数字类型，如果是返回true,否则返回false.
 *@param:fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tips.自定义提示.提示时仅需输入关键字．
 *不建议这里传进来自定义参数.
 */
BFC.util.Validator.prototype.isIntegerValue=function(fform,elementID,tips)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	var index = fieldValue.indexOf('.');
	if(index >= 0 || isNaN(fieldValue)){
		  var msgs = "此处必须输入数值,请重新输入";
	  //var tips = arguments[2];
	  if(arguments[2] != null){msgs = arguments[2] + "必须是整型数值,请重新输入";}
	  else if(typeof(arguments[0]) == "object"){
	  			if(arguments[1]!=null && arguments[1]!= "undefined")
	  			msgs = arguments[1]+"必须是整型数值,请重新输入";
	  }
	  this.showError(msgs,fieldID);
		return false;
	}
	else return true;
}

/**函数 isPositiveInteger()
 *验证字段是否是正整数，如果是返回true,否则返回false.
 *@param:fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tips.自定义提示.提示时仅需输入关键字．
 *不建议这里传进来自定义参数.
 */
BFC.util.Validator.prototype.isPositiveInteger=function(fform,elementID,tips)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	var r = /^[0-9]*[1-9][0-9]*$/ //正整数 
	if(!r.test(fieldValue)){
		  var msgs = "此处必须输入正整数,请重新输入";
	  //var tips = arguments[2];
	  if(arguments[2] != null){msgs = arguments[2] + "必须是正整数,请重新输入";}
	  else if(typeof(arguments[0]) == "object"){
	  			if(arguments[1]!=null && arguments[1]!= "undefined")
	  			msgs = arguments[1]+"必须是正整数,请重新输入";
	  }
	  this.showError(msgs,fieldID);
		return false;
	}
	else return true;
}

/**函数 isFloatValue()
 *验证字段是否是双精度浮点类型，如果是返回true,否则返回false.
 *@param : fform表单id；
 *@param : elementID表单里的元素名.
 *@pparam : tipMsg.自定义提示.请输入关键字即可．
 *此处建议自定义提示．
 */
BFC.util.Validator.prototype.isFloatValue=function(fform,elementID,tipMsg)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	if(isNaN(fieldValue)){
	  var msgs = "此处必须输入非整型数值,请重新输入．比如：88888.8888,或88888";
	  var tips = arguments[2];
	  if(tips != null){msgs = tips + "必须是非整型数值,请重新输入.";}
	  else if(typeof(arguments[0]) == "object"){
	  			if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"必须是非整型数值,请重新输入.";
	  		}
	  this.showError(msgs,fieldID);
		return false;
	}
	return true;
}

/**函数 isNonNegativeFloatValue()
 *验证字段是否是正的双精度浮点数，如果是返回true,否则返回false.
 *@param : fform表单id；
 *@param : elementID表单里的元素名.
 *@pparam : tipMsg.自定义提示.请输入关键字即可．
 *此处建议自定义提示．
 */
BFC.util.Validator.prototype.isNonNegativeFloatValue=function(fform,elementID,tipMsg)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	if(fieldValue<0 || isNaN(fieldValue)){
	  var msgs = "此处必须输入非负数值,请重新输入．比如：88888.8888,或88888";
	  var tips = arguments[2];
	  if(tips != null){msgs = tips + "必须是非负数值,请重新输入.";}
	  else if(typeof(arguments[0]) == "object"){
	  			if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"必须是非整型数值,请重新输入.";
	  		}
	  this.showError(msgs,fieldID);
		return false;
	}
	return true;
}

/**函数 isFloatValueWithDigit()
 *验证字段是否是精确到最多N位小数的正数数值类型，如果是返回true,否则返回false.
 *@param : fform表单id；
 *@param : elementID表单里的元素名.
 *@param : digit 自定义小数位数．
 *@param : tipMsg 自定义提示.请输入关键字即可．
 *此处建议自定义提示．
 */
BFC.util.Validator.prototype.isFloatValueWithDigit=function(fform, elementID, digit, tipMsg)
{
	var in_digit = "";
	var tips = "";
	if(typeof(arguments[0]) == "object"){
		this.checkField(arguments[0]);
		in_digit = arguments[1];
		tips = arguments[2];
	}
	if(typeof(arguments[0]) == "string"){
		this.checkFormAndField(fform,elementID);
		in_digit = arguments[2];
		tips = arguments[3];
	}
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	var exp = new RegExp("(^\\d+(\\.\\d{0," + in_digit + "})?$)"); 
	if(!exp.test(fieldValue)){
		var msgs = "此处必须输入数值，最多精确到" + in_digit + "位小数，请重新输入。";
		tips = arguments[3];
		if(tips!=null && tips!=""){
			msgs = tips + "必须是数值，最多精确到" + in_digit + "位小数，请重新输入。";
		}
	
		this.showError(msgs,fieldID);
		return false;
	}
	return true;
}

/**函数isEnglishChar()
 *验证字段是否是英文字符(字母，数字，下划线)，如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg 自定义提示.请输入关键字．
 *此外不建议自定义提示．
 */
BFC.util.Validator.prototype.isEnglishChar=function(fform,elementID,tipMsg)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	if (fieldValue == "") return true;
	var exp = new RegExp("^[A-Za-z0-9_]*$");
	if(exp.test(fieldValue))return true;
	else {

	  var msgs = "此处必须输入英文字符(字母、数字、下划线,如: fmcc或_fmcc或fmcc11等),请重新输入.";
	  var tips = arguments[2];
	  if(tips != null){msgs = tips + ",只能包含英文字符(字母、数字、下划线,如: fmcc或_fmcc或fmcc11等),请重新输入";}
	  else{if(typeof(arguments[0]) == "object"){
	  	if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+",只能包含英文字符(字母、数字、下划线,如: fmcc或_fmcc或fmcc11等),请重新输入";}
	  };
	  this.showError(msgs,fieldID);
	  return false;
	}
}

/**函数isChineseChar()
 *验证字段是否是中文字符，如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *此处不建议自定义提示．
 */
BFC.util.Validator.prototype.isChineseChar=function(fform,elementID,tipMsg)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	if (fieldValue == "") return true;
	var exp = new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2D]*$");
	if(exp.test(fieldValue))return true;
	else {
		var msgs = "此处必须输入中文字符,请重新输入";
		var tips = arguments[2];
		if(tips != null && tips != "undefined"){ msgs = tips + "只能包含中文字符,请重新输入.";}
		else{if(typeof(arguments[0]) == "object"){
			if(arguments[1]!= null && arguments[1]!="undefined")msgs = arguments[1]+"只能包含中文字符,请重新输入.";
			}
		}
		this.showError(msgs,fieldID);return false;
		}
}
/**函数isValidCustName()
 *验证字段是否是中文字符、英文字母、数字，如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *此处不建议自定义提示．
 */
BFC.util.Validator.prototype.isValidCustName=function(fform,elementID,tipMsg){
    if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value.trim();
	if (fieldValue == "") return true;
	var msgs = "(客户姓名不正确，只允许含有中文字符、英文字母、数字和括号，请重新输入!)";	
	var tips = arguments[2]; 
	if(tips != null){
	    msgs = tips + ",只允许含有中文字符、英文字母、数字和括号，请重新输入!)";   
	}else if(typeof(arguments[0]) == "object"){
	  	if(arguments[1]!= null && arguments[1]!= "undefined") 
	  	    msgs = arguments[1]+"不正确，只允许含有中文字符、英文字母、数字和括号，请重新输入";
	};
	var c_2 = 0,c_4 = 0;
	var exp1 = new RegExp("^[A-Za-z]*$");
	var exp2 = new RegExp("^[0-9]*$");
	var exp3 = new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2D]*$");
	var exp4 = new RegExp("^[()|（）]*$"); //add by zb 13852-1 增加匹配括号(全角或)
	for(var i=0;i<fieldValue.length;i++){	    
	    var _char = fieldValue.substr(i,1);
	    if(exp1.test(_char)){
	        continue;
	    }else if(exp2.test(_char)){
	    	c_2++;
	        continue;
	    }else if(exp3.test(_char)){
	    	continue;
	    }else if(exp4.test(_char)){
	    	c_4++;
	    	continue;
	    }else{
	        this.showError(msgs,fieldID);
	        return false;
	    }
	}
	if(c_2+c_4>=fieldValue.length){
		 this.showError("不能全为数字或字符，请重新输入!",fieldID);
		 return false;
	}
	return true;
}
/**isValidIDNum()
 *验证非身份证类型的证件号码，如果满足返回true，否则返回false.
 *@param : fform表单id；
 *@param : elementID表单里的元素名；
 *@param : tips.自定义提示．
 */
BFC.util.Validator.prototype.isValidIDNum=function(fform,elementID,tips)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	//长度不足5位
	if (fieldValue == "" || fieldValue.length < 5) {showMsg("请输入正确的证件号码!"); return false;}
	//校验是否为等差数列，若是则给出错提示
	var tempValue = fieldValue.split("");
	var count = 0;
	for(var i=0; i<tempValue.length; i++){
		if(tempValue[i+1]){
			if(parseInt(tempValue[i+1]) - parseInt(tempValue[i]) == parseInt(tempValue[1]) - parseInt(tempValue[0])){
				count++;
			}
		}
	}
	if(count == parseInt(tempValue.length-1)){
		showMsg("请输入正确的证件号码!"); return false;
	}
	return true;
}
/**isBetweenMinAndMaxLen()
 *验证字段是否满足最大最小长度，如果满足返回true，否则返回false.
 *@param : fform表单id；
 *@param : elementID表单里的元素名；
 *@param : min最短长度,max最长长度
 *@param : tips.自定义提示．
 */
BFC.util.Validator.prototype.isBetweenMinAndMaxLen=function(fform,elementID,min,max,tips)
{
	var minLen = null;
	var maxLen = null;
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]); minLen = arguments[1]; maxLen = arguments[2];}
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);minLen = arguments[2]; maxLen = arguments[3];}
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	if(minLen==null) return true;
	if(maxLen==null) return true;
	var strLen = this.getStrLength(fieldValue);
	//alert("len: "+strLen);
	if(strLen<minLen){//小于最小长度
		var msgs = "请输入用户真实姓名!";
		var tips = arguments[4];
		if(tips != null) { msgs = tips + ",请输入用户真实姓名!"}
		this.showError(msgs,fieldID);
		return false;
	}
	if(strLen>maxLen){//大于最大长度
		var msgs = "请输入用户真实姓名!";
		var tips = arguments[4];
		if(tips != null) { msgs = tips + ",请输入用户真实姓名!"}
		this.showError(msgs,fieldID);
		return false;
	}
	return true;
}
/**函数isLessThanMinLength()
 *验证字段是否达到最小长度，如果满足返回true，否则返回false.
 *@param : fform表单id；
 *@param : elementID表单里的元素名；
 *@param : min最短长度
 *@param : tips.自定义提示．
 */
BFC.util.Validator.prototype.isLessThanMinLength=function(fform,elementID,min,tips)
{
	var minLength=null;
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);minLength = arguments[1];};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);minLength = arguments[2]};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	if(minLength==null)return true;
	var strLen = this.getStrLength(fieldValue);
	if(strLen<minLength){
		var msgs = "此处输入的长度不能少于"+minLength+"位,请重新输入";
		var tips = arguments[3];
		if(tips !=null ){msgs = tips + "的长度不能少于"+minLength+"位,请重新输入.";}
		else{if(typeof(arguments[0]) == "object"){
				if(arguments[2]!= null && arguments[2]!= "undefined")msgs=arguments[2]+ "的长度不能少于"+minLength+"位,请重新输入.";
			}
		};
		this.showError(msgs,fieldID);
		return false;


	}
	return true;
}

/**函数isMoreThanMaxLength()
 *验证字段是否超出最大长度，如果是返回true，否则返回false.
 *@param : fform表单id；
 *@param : elementID表单里的元素名；
 *@param : maxLength最长长度
 *@param : tipMsg.自定义提示．
 */
BFC.util.Validator.prototype.isMoreThanMaxLength=function(fform,elementID,maxLength,tipMsg)
{
	var maxL = null;
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);maxL = arguments[1];};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);maxL = arguments[2];};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	if(maxL==null)return true;
	var strLen = this.getStrLength(fieldValue);
	if(strLen>maxL){
		var msgs = "此处输入的长度不能大于"+maxL+"位字符,请重新输入.";
		var tips = arguments[3];
		if(tips !=null ){msgs = tips + "的长度不能大于"+maxL+"位字符,请重新输入."}
		else if(typeof(arguments[0]) == "object"){
				if(arguments[2]!= null && arguments[2]!="undefined")msgs = arguments[2]+"的长度不能大于"+maxL+"位字符,请重新输入.";
			}
		this.showError(msgs,fieldID);
		return false;
	}
	return true;
}
/**函数getStrLength()
* 计算字符串长度，中文一个字符长度为2，英文长度为1
*/
BFC.util.Validator.prototype.getStrLength = function(s) {
	var k = 0;
	for(var i=0;i<s.length;i++) {
		if(s.charCodeAt(i) > 255){
			k += 2;
		}
		else{
			k += 1;
		}
	}
	return k;
}
/**函数isBetween()
 *验证字段是否是在两数范围之内,如果是返回true,否则返回false.
 *@param　: fform表单id；
 *@param : elementID表单里的元素名；
 *@param : min最小值;
 *@param : max最大值
 *@param : tipMsg自定义提示．请输入关键字．
 */
BFC.util.Validator.prototype.isBetween=function(fform,elementID,min,max,tipMsg)
{
	var minValue = 0;
	var maxValue = 0;
	var tips ="";
	if(typeof(arguments[0]) == "object"){
			this.checkField(arguments[0]);
			minValue = arguments[1]*1;
			maxValue = arguments[2]*1;
			if(arguments[3]!=null && arguments[3]!="undefined" && arguments[3]!="")tips=arguments[3];
		}
	if(typeof(arguments[0]) == "string"){
			this.checkFormAndField(fform,elementID);
			minValue = arguments[2]*1;
			maxValue = arguments[3]*1;
			if(arguments[4]!=null && arguments[4]!="undefined" && arguments[4]!="")tips=arguments[4];
		}
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value*1;
	if(fieldValue<minValue){
		var msgs = "您输入的值"+fieldValue+"小于所要求的最小值:"+minValue+",请重新输入";
		if(tips != null){msgs = "您输入的"+tips+"值:"+fieldValue+"小于所要求的最小值:"+minValue+",请重新输入";}
		this.showError(msgs,fieldID);return false;
		}
	if(fieldValue>maxValue){
		var msgs = "您输入的值"+fieldValue+"大于所要求的最大值:"+maxValue+",请重新输入";
		if(tips != null){msgs = "您输入的"+tips+"值:"+fieldValue+"大于所要求的最大值:"+maxValue+",请重新输入";}
		this.showError(msgs,fieldID);return false;
		}
	if((fieldValue>=minValue)&&(fieldValue<=maxValue))return true;
}
/**函数isEmail()
 *验证输入的邮箱地址是否有效，如果是返回true.否则返回false.
 *@param : fform表单id；
 *@param : elementID表单里的元素名；
 *@param : tipMsg自定义提示．此处不建议自定义提示．这个自定义请写全部，将直接代替默认的．
 * Reference: Sandeep V. Tamhankar (stamhankar@hotmail.com),
 * http://javascript.internet.com
 */
BFC.util.Validator.prototype.isEmail=function(fform,elementID,tipMsg)
{
   var msgs =  "请输入正确的邮箱地址(如: fmcc@fmcc.com)." ;
	if(typeof(arguments[0]) == "object"){
		this.checkField(arguments[0]);
		if(arguments[1])msgs = arguments[1];
	}
	if(typeof(arguments[0]) == "string"){
		this.checkFormAndField(fform,elementID);
		if(arguments[2])msgs = arguments[1];
		}
	var fieldID = this.fieldID;
	var emailStr = this.fieldID.value;
 	if (emailStr.length == 0) {
       return true;
   }
   if(arguments[2] != null && arguments[2]!="undefined"){msgs = arguments[2];}
   else{if(typeof(arguments[0]) == "object" && arguments[1]!="undefined" && arguments[1]!= null)msgs = arguments[1];};
   var exp = new RegExp("^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$");
	if(exp.test(emailStr))return true;
	else {
		this.showError(msgs,fieldID);return false;
	}
}

/**函数isIDCardNo()
 *验证身份证,无效身份证，提示相应错误返回false.有效的话返回true.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *此处不建议自定义提示．
 * 参考 http://www.10189.net/ShowArticle.asp?ArticleID=125
 *我只是进行了局部修改与调整
 * 增加了一个cusOpt的参数，用于区分入网类业务与其他业务输入身份证的出错提示信息
 * 调用时的方法举例jsValidator.isIDCardNo(icElement,"","","1") 其中的参数“1”就是对应cusOpt
 */

BFC.util.Validator.prototype.isIDCardNo= function(fform,elementID,tipMsg,cusOpt)
{		
		tips = arguments[2];
		if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
		if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
		var fieldID = this.fieldID;
		var idcard = this.fieldID.value;
		var Errors = new Array(
			"无效身份证格式:身份证号码位数不对,请重新输入",
			"无效身份证格式:身份证号码出生日期超出范围或含有非法字符，请重新输入",
			"无效身份证格式:身份证真实性校验不通过！请确认输入号码无误，或确认身份证真伪",
			"无效身份证格式:身份证地区非法，请重新输入",
			"请输入证件号码",
			"请输入正确的身份证号码!"
		);
		if(tips!=null && tips!="undefined" && tips!=""){
			Errors[0]=tips+"身份证号码位数不对,请重新输入";
			Errors[1]=tips+"身份证号码出生日期超出范围或含有非法字符，请重新输入";
			Errors[2]=tips+"身份证真实性校验不通过！请确认输入号码无误，或确认身份证真伪";
			Errors[3]=tips+"身份证地区非法，请重新输入";
			Errors[4]="请输入"+tips;
			Errors[5]=tips+"为无效的身份证号码，请重新输入!";
		}
		var area = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",
					23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
					41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",
					52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",
					71:"台湾",81:"香港",82:"澳门",91:"国外"
				}

		var Y,JYM;
		var S,M;
		var idcard_array = new Array();
		if(idcard == ""){//判断是否输入号码
			if(cusOpt=='1'){
				this.showError(Errors[5],fieldID);
				return false;
			}else{
				this.showError(Errors[4],fieldID);
				return false;
			}
		}
		idcard_array = idcard.split("");
		//地区检验
		if(area[parseInt(idcard.substr(0,2))]==null){
			if(cusOpt=='1'){
				this.showError(Errors[5],fieldID);
				return false;
			}else{
				this.showError(Errors[3],fieldID);
		 		return false;
			}
		 }
		//身份号码位数及格式检验
		switch(idcard.length){
		case 15:
				if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
				ereg=/^[1-9][0-9]{5}[1-9][0-9]((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
				} else {
				ereg=/^[1-9][0-9]{5}[1-9][0-9]((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
				}
				if(ereg.test(idcard))return true;
				else {
					if(cusOpt=='1'){
						this.showError(Errors[5],fieldID);
						return false;
					}else{
						this.showError(Errors[1],fieldID);
						return false;
					}
				}
				break;
		case 18:
				//18位身份号码检测
				//出生日期的合法性检查
				//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
				//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
				var idcardDate = idcard.substr(6,8)+"000000";
				var nowDate = BFC.util.Time.getToday();
				//日期在1910/01/01到当前日期
				if(BFC.util.Time.DateDiff(idcardDate,"19100101000000","day")<0 || BFC.util.Time.DateDiff(idcardDate,nowDate,"day")>0){
					if(cusOpt=='1'){
						this.showError(Errors[5],fieldID);
						return false;
					}else{
						this.showError(Errors[2],fieldID);
						return false;
					}
				}
				if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
					ereg=/^[1-9][0-9]{5}(19|2[0-9])[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
				} else {
					ereg=/^[1-9][0-9]{5}(19|2[0-9])[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
				}
				if(ereg.test(idcard)){//测试出生日期的合法性
					//计算校验位
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
					+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
					+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
					+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
					+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
					+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
					+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
					+ parseInt(idcard_array[7]) * 1
					+ parseInt(idcard_array[8]) * 6
					+ parseInt(idcard_array[9]) * 3 ;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					JYM2 = "10x98765432";
					M = JYM.substr(Y,1);//判断校验位当前只接受是字母X或x.
					M2 = JYM2.substr(Y,1);//x
					if(M == idcard_array[17] || M2 == idcard_array[17])return true;
					else {
						if(cusOpt=='1'){
							this.showError(Errors[5],fieldID);
							return false;
						}else{
							this.showError(Errors[2],fieldID);
							return false;
						}
					}
				}
				else  {
					if(cusOpt=='1'){
						this.showError(Errors[5],fieldID);
						return false;
					}else{
						this.showError(Errors[1],fieldID);
						return false;
					}
				}
				break;
		default:
				if(cusOpt=='1'){
					this.showError(Errors[5],fieldID);
					return false;
				}else{
					this.showError(Errors[0],fieldID);
					return false;
				}
				break;
		}
	return true;
}

/**函数isHKIDCardNo() add 17032 by zb
 *验证香港身份证,无效提示相应错误返回false.有效的话返回true.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *此处不建议自定义提示．
 */
 
BFC.util.Validator.prototype.isHKIDCardNo= function(fform,elementID,tipMsg){
 	 	tips = arguments[2];
		if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
		if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
		var fieldID = this.fieldID;
		var idcard = this.fieldID.value;
		
		var Errors = new Array(
			"无效身份证格式:身份证号码位数不对,请重新输入",
			"无效身份证格式:身份证号码是非数字或含有非法字符，请重新输入",
			"无效身份证格式:身份证格式不对！请确认输入格式无误，请重新输入",
			"请输入证件号码"
		);
		if(tips!=null && tips!="undefined" && tips!=""){
			Errors[0]=tips+"身份证号码位数不对,请重新输入";
			Errors[1]=tips+"身份证号码是非数字或含有非法字符，请重新输入";
			Errors[2]=tips+"身份证真实性校验不通过！请确认输入号码无误，或确认身份证真伪";
			Errors[4]="请输入"+tips;
		}
		if(idcard == ""){//判断是否输入号码
			this.showError(Errors[3],fieldID);
			return false;
		}
		if(idcard.length != '10' && idcard.length != '11'){//校验位数
			this.showError(Errors[0],fieldID);
			return false;
		}
		//XYabcdef(z)
		var rowPattern = /^[a-zA-Z]?[a-zA-Z]{1}\d{6}[(][a-z0-9A-Z]{1}[)]$/;
		
		if(rowPattern.test(idcard)){
			return true;
		}else{
			this.showError(Errors[1],fieldID);
			return false;
		}
		
 }
/**函数isMacauIDCardNo() add 17032 by zb
 *验证澳门身份证,无效提示相应错误返回false.有效的话返回true.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *此处不建议自定义提示．
 */
 
BFC.util.Validator.prototype.isMacauIDCardNo= function(fform,elementID,tipMsg){
 	 	tips = arguments[2];
		if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
		if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
		var fieldID = this.fieldID;
		var idcard = this.fieldID.value;
		var Errors = new Array(
			"无效身份证格式:身份证号码位数不对,请重新输入",
			"无效身份证格式:身份证号码是非数字或含有非法字符，请重新输入",
			"无效身份证格式:身份证格式不对！请确认输入格式无误，请重新输入",
			"请输入证件号码"
		);
		if(tips!=null && tips!="undefined" && tips!=""){
			Errors[0]=tips+"身份证号码位数不对,请重新输入";
			Errors[1]=tips+"身份证号码是非数字或含有非法字符，请重新输入";
			Errors[2]=tips+"身份证真实性校验不通过！请确认输入号码无误，或确认身份证真伪";
			Errors[4]="请输入"+tips;
		}
		if(idcard == ""){//判断是否输入号码
			this.showError(Errors[3],fieldID);
			return false;
		}
		if(idcard.length != '10'){//校验位数
			this.showError(Errors[0],fieldID);
			return false;
		}
		var rowPattern = /^\d{1}[\/]\d{6}[\/]\d{1}$/; //旧式的澳门身份证格式
		var rowPattern2 = /^\d{7}[(]\d{1}[)]$/; //新式的澳门身份证格式
		if(rowPattern.test(idcard) || rowPattern2.test(idcard)){
			return true;
		}else{
			this.showError(Errors[1],fieldID);
			return false;			
		}
		
 }

/**函数isHKMacauPassNo()
 *验证港澳居民来往内地通行证,无效提示相应错误返回false.有效的话返回true.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *此处不建议自定义提示．
 */ 
BFC.util.Validator.prototype.isHKMacauPassNo= function(fform,elementID,tipMsg){
	tips = arguments[2];
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var idcard = this.fieldID.value;
	var msgs = "无效港澳居民来往内地通行证,请重新输入";
	if(tips != null){msgs = tips + "为无效港澳居民来往内地通行证,请重新输入."}
	if(idcard == ""){//判断是否输入号码
		this.showError(msgs,fieldID);
		return false;
	}
	if(idcard.length != '9' && idcard.length != '11'){//校验位数
		this.showError(msgs,fieldID);
		return false;
	}
	var rowPattern = /^(H|M)[0-9]{8,10}$/; 
	if(rowPattern.test(idcard)){
		return true;
	}else{
		this.showError(msgs,fieldID);
		return false;		
	}	
}

/**函数isHKMacauPassNo()
 *验证台湾居民来往大陆通行证,无效提示相应错误返回false.有效的话返回true.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *此处不建议自定义提示．
 */ 
BFC.util.Validator.prototype.isTaiWanPassNo= function(fform,elementID,tipMsg){
	tips = arguments[2];
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var idcard = this.fieldID.value;
	var msgs = "无效台湾居民来往大陆通行证,请重新输入";
	if(tips != null){msgs = tips + "为无效台湾居民来往大陆通行证,请重新输入."}
	
	if(idcard == ""){//判断是否输入号码
		this.showError(msgs,fieldID);
		return false;
	}
	var rowPattern1 = /^[0-9]{8}$/; 
	var rowPattern2 = /^[0-9]{10}[A-Za-z0-9]$/; 
	var rowPattern3 = /^[0-9]{10}[(][A-Za-z0-9][)]$/; 
	if(rowPattern1.test(idcard) || rowPattern2.test(idcard) || rowPattern3.test(idcard) ){
		return true;
	}else{
		this.showError(msgs,fieldID);
		return false;		
	}	
}

/**函数checkIcNoByIcType()
 *根据证件类型验证证件号码（证件类型定义见数据字典1101 4：）,无效提示相应错误返回false.有效的话返回true.
 *@param ：fform表单id；
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *@param : cusOpt.入网标志1-是．
 *建议增加自定义提示．
 */ 
BFC.util.Validator.prototype.checkIcNOByIcType= function(icType,fform,elementID,tipMsg,cusOpt){
	tips = arguments[3];
	if(typeof(arguments[1]) == "object"){this.checkField(arguments[1]);};
	if(typeof(arguments[1]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var icNO = this.fieldID.value;
	if(!tips)tips="您输入的";
	switch(parseInt(icType)) {
	case 1:	//身份证
		if(!this.isIDCardNo(fform,elementID,tipMsg,cusOpt))return false;
		break;
	case 2:	//军官证
	case 3:	//护照
	//case 10:	//代办证件
	case 11:	//士兵证
	case 12:	//人民警察证
		if(icNO.length<6){
			this.showError(tips+"为无效的证件号码，请重新输入",fieldID);
			return false;
		}
		break;
	case 13:	//台湾居民来往大陆通行证
		if(!this.isTaiWanPassNo(fform,elementID,tipMsg))return false;
		break;
	case 22:	//户口簿
	case 23:	//临时身份证
		if(!this.isIDCardNo(fform,elementID,tipMsg,cusOpt))return false;
		break;
	case 31:	//香港身份证
		if(!this.isHKIDCardNo(fform,elementID,tipMsg))return false;
		break;
	case 32:	//澳门身份证
		if(!this.isMacauIDCardNo(fform,elementID,tipMsg))return false;
		break;
	case 33:	//港澳居民来往内地通行证	
		if(!this.isHKMacauPassNo(fform,elementID,tipMsg))return false;
		break;	
	}
	return true;		
}

/**函数checkUnitIcNoByIcType()
 *根据证件类型验证单位证件号码（证件类型定义见数据字典1101 61）,无效提示相应错误返回false.有效的话返回true.
 *@param ：fform表单id；
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示
 *建议增加自定义提示．
 */ 
BFC.util.Validator.prototype.checkUnitIcNoByIcType= function(icType,fform,elementID,tipMsg){
	tips = arguments[3];
	if(typeof(arguments[1]) == "object"){this.checkField(arguments[1]);};
	if(typeof(arguments[1]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var icNO = this.fieldID.value;
	var exp1 =  /^[A-Z0-9\-]*$/;//为数字、“-”连字符或大写拉丁字母。
	var incldeNumAmount = this.getIncludeCharAmount(icNO, "Number");
	var msgs  = "无效的证件号码，请重新输入";
	if(tips) msgs  = tips+"为无效的证件号码，请重新输入";
	switch(parseInt(icType)) {
	case 51:	//组织机构代码证
		if(icNO.length<9 || !exp1.test(icNO)){
			this.showError(msgs,fieldID);
			return false;			
		}
		break;	
	case 52:	//营业执照
	case 53:	//事业单位法人证书
	case 54:	//社会团体法人登记证书
		if(incldeNumAmount<4){
			this.showError(msgs,fieldID);
			return false;			
		}
		break;	
	case 55:	//介绍信
	}
	return true;		
}

/**函数checkCustNameByIcType()
 *根据证件类型验证客户姓名（证件类型定义见数据字典1101 4：）,无效提示相应错误返回false.有效的话返回true.
 *@param ：fform表单id；
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *建议增加自定义提示．
 */ 
BFC.util.Validator.prototype.checkCustNameByIcType= function(icType,fform,elementID,tipMsg){
	tips = arguments[3];
	if(typeof(arguments[1]) == "object"){this.checkField(arguments[1]);};
	if(typeof(arguments[1]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var nameString = this.fieldID.value;
	if(!tips)tips="您输入的";
	var ChineseAmount = this.getIncludeCharAmount(nameString,"Chinese");
	var exp1 = /^[A-Za-z0-9()（）\.\u4E00-\u9FA5\uF900-\uFA2D]*$/;//中文字符+“.”+“（”+“）”
	
	var length4Byte = this.getStrLength(nameString);
	switch(parseInt(icType)) {
	case 1:	//身份证
	case 2:	//军官证
		if(!exp1.test(nameString)){
			this.showError(tips+"为无效的名字，只允许含有中文字符、英文字母、数字、点号和括号，请重新输入",fieldID);
			return false;
		}
		if(ChineseAmount<2){
			this.showError(tips+"为无效的名字，必须大于等于2个汉字，请重新输入",fieldID);
			return false;
		}
		break;
	case 3:	//护照
		if(length4Byte<4 || this.getNumStringType(nameString) != "NONUM"){
			this.showError(tips+"为无效的名字，必须大于3个字符，且不能全为阿拉伯数字，请重新输入",fieldID);
			return false;
		}
		break;
	//case 10:	//代办证件
	case 11:	//士兵证
	case 12:	//人民警察证
	case 13:	//台湾居民来往大陆通行证
	case 22:	//户口簿
	case 23:	//临时身份证
	//case 31:	//香港身份证
	//case 32:	//澳门身份证
	case 33:	//港澳居民来往内地通行证
		if(!exp1.test(nameString)){
			this.showError(tips+"为无效的名字，只允许含有中文字符、英文字母、数字、点号和括号，请重新输入",fieldID);
			return false;
		}
		if(ChineseAmount<2){
			this.showError(tips+"为无效的名字，必须大于等于2个汉字，请重新输入",fieldID);
			return false;
		}
		break;
	}
	return true;		
}

/**函数checkAddressByIcType()
 *根据证件类型验证地址（证件类型定义见数据字典1101 4：）,无效提示相应错误返回false.有效的话返回true.
 *@param ：fform表单id；
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *建议增加自定义提示．
 */ 
BFC.util.Validator.prototype.checkAddressByIcType= function(icType,fform,elementID,tipMsg){
 	tips = arguments[3];
	if(typeof(arguments[1]) == "object"){this.checkField(arguments[1]);};
	if(typeof(arguments[1]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var addressString = this.fieldID.value;
	if(!tips)tips="您输入的";
	var ChineseAmount = this.getIncludeCharAmount(addressString,"Chinese");
	switch(parseInt(icType)) {
	case 1:	//身份证
	case 2:	//军官证
		if(ChineseAmount<8){
			this.showError(tips+"为无效的地址，须大于等于8个汉字，请重新输入",fieldID);
			return false;
		}
		break;
	case 3:	//护照
		if(ChineseAmount<2){
			this.showError(tips+"为无效的地址，须大于等于2个汉字，请重新输入",fieldID);
			return false;
		}
		break;
	//case 10:	//代办证件
	case 11:	//士兵证
	case 12:	//人民警察证
		if(ChineseAmount<8){
			this.showError(tips+"为无效的地址，须大于等于8个汉字，请重新输入",fieldID);
			return false;
		}
		break;
	case 13:	//台湾居民来往大陆通行证
		if(ChineseAmount<3){
			this.showError(tips+"为无效的地址，须大于等于3个汉字，请重新输入",fieldID);
			return false;
		}
		break;
	case 22:	//户口簿
	case 23:	//临时身份证
	//case 31:	//香港身份证
	//case 32:	//澳门身份证
	case 33:	//港澳居民来往内地通行证
		if(ChineseAmount<8){
			this.showError(tips+"为无效的地址，须大于等于8个汉字，请重新输入",fieldID);
			return false;
		}
		break;
	}
	return true;		
}

/**函数getIncludeCharAmount()
 *获取字符串中指定类型字符个数
 *@param ：charString 校验的字符串；
 *@param : checkCharType 指定的字符串类型“Chinese”-中文（默认类型），
 *										“English”-英文（不区分大小写），
 *										“EnglishSmall”-英文（小写），
 *										“EnglishBig”-英文（大写），
 *										“Number”-数字，
 *										其他自定义
 *@param : tipMsg.自定义提示.
 *@return: retAmount
 */
BFC.util.Validator.prototype.getIncludeCharAmount = function(charString,checkCharType){
	var retAmount = 0;
	var exp = /^[\u4E00-\u9FA5\uF900-\uFA2D]$/;
	
	if(!checkCharType || checkCharType == "Chinese"){
		exp = /^[\u4E00-\u9FA5\uF900-\uFA2D]$/;
	}else if(checkCharType == "English"){
		exp = /^[a-zA-Z]$/;
	}else if(checkCharType == "EnglishSmall"){
		exp = /^[a-z]$/;
	}else if(checkCharType == "EnglishBig"){
		exp = /^[A-Z]$/;
	}else if(checkCharType == "Number"){
		exp = /^[0-9]$/;
	}else{
		exp = new RegExp("^[" + checkCharType + "]$"); 
	}
	for(var i=0; i<charString.length; i++){
		var tmp_char = charString.charAt(i);
		if(exp.test(tmp_char))
			retAmount++;
	}
	return retAmount;
}

/**函数isEqual()
 *验证两段的值是否相同,相同返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．
 *此处建议使用自定义提示．比如"XX和XX"
 */
BFC.util.Validator.prototype.isEqual=function(fform,elementID1,elementID2,tipMsg)
{

	if(typeof(arguments[0]) == "string"){
	    //判断form与field有效性,如果为空，采用默认的form.
		if(fform==null){this.showError("您所指定的form不存在");return false};
		if(elementID1==null){this.showError("表单元素不存在或指定错误");return false};
	    if(elementID2==null){this.showError("表单元素不存在或指定错误");return false};
		var formID=document.getElementById(fform);
		var elem1 = document.getElementById(formID.id + ":" + elementID1);
		var elem2 = document.getElementById(formID.id+":" + elementID2);
		if((elem1.value!=null)&&(elem2.value!=null))
		{
			if(elem1.value == elem2.value)return true;
			else{
				var msgs = "您输入的两个字段值："+elem1.value+"和"+elem2.value+",不相等，请重新输入．";
				var tips = arguments[3];
				if(tips != null){msgs = "您输入的"+tips+"的值:"+elem1.value+"和"+elem2.value+"不相等，请重新输入";};
				this.showError(msgs,elem1);
				return false;
				}
		}
	}
	//不指定form,但传进来的element是用getElementById得到的元素本身.
	if(typeof(arguments[0]) == "object" )
	{
		if(arguments[0].value != arguments[1].value){
			var msgs = "您输入的两个字段值:，"+arguments[0].value+"和"+arguments[1].value+",不相等,请重新输入．";
			var tips = arguments[2];
			if(tips != null){msgs = "您输入的"+tips+"的值:"+arguments[0].value+"和"+arguments[1].value+"不相等，请重新输入"};
			this.showError(msgs,arguments[0]);
			return false;
		}
		else {return true;}
	}
}

/**函数isIP()
 *验证是否是合法IP,有效IP，返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg自定义提示．此处不建议自定义提示．
 */

BFC.util.Validator.prototype.isIp=function(fform,elementID,tipMsg){

	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var ip=this.fieldID.value;
	//未考虑第1个IP不能为0的情况
	//var reg = /^（(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]）\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	//var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var msgs = "无效的IP地址格式,请重新输入";
	var tips = arguments[2];
	if(tips != null){msgs = tips + "为无效的IP地址格式,请重新输入."}
	else{if(typeof(arguments[0]) == "object"){
		if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"为无效的IP地址格式,请重新输入."}
	};
	//alert(ip);
	//if(reg.test(ip))alert('right');
	//else alert('false');
	//return ;


	var re=ip.split(".");
	if(re.length==4){
		for(var i=0;i<re.length;i++)
		{	
			var value = re[i];
			if(!isNum(value)){
				this.showError(msgs,fieldID);
				return false;
			}
			value = parseInt(value);
			if(value==null || (i==0 && value==0) || value<0 || value>255)
			{
				this.showError(msgs,fieldID);
				return false;
			}
		}
		return true;
	}
	else
	{
		this.showError(msgs,fieldID);
		return false;
	}


}
/*
 * 是否手机号码判断
 * @mobileNo 手机号码 不可空
 * @is_yd boolean 可空
 * BFC.util.Validator中关于手机号码的判断，都调这个方法，以便统一管理号段
 * by rzy
 */
BFC.util.Validator.prototype.isMobile = function(mobileNo,is_yd){
	var reg1x = /(^1[3,4,5,8][0-9]{9}$)/;
	var reg2x = /(^10648[0-9]{8}$)/;
	
	var reg13x_yd = /(^134[0-8]{1}[0-9]{7}$)|(^13[5-9]{1}[0-9]{8}$)/;	
	var reg13x_lt = /(^13[0-2]{1}[0-9]{7}$)|(^13[5-9]{1}[0-9]{8}$)/;	
	var reg13x_dx = /(^1349[0-9]{7}$)|(^133[0-9]{8}$)/;	
	
	var reg14x_yd = /(^147[0-9]{8}$)/;
	
	var reg15x_yd = /(^15[0,1,2,7,8,9][0-9]{8}$)/;
	var reg15x_lt = /(^15[5,6][0-9]{8}$)/;
	var reg15x_dx = /(^153[0-9]{8}$)/;
	
	var reg18x_yd = /(^18[2,3,4,7,8][0-9]{8}$)/;	
	var reg18x_lt = /(^18[5,6][0-9]{8}$)/;	
	var reg18x_dx = /(^18[0,9][0-9]{8}$)/;	
	if(is_yd){
		if(reg13x_yd.test(mobileNo)||reg14x_yd.test(mobileNo)||reg15x_yd.test(mobileNo)||reg18x_yd.test(mobileNo)||reg2x.test(mobileNo))
		    return true;
		else 
			return false;
	}else{
		if(reg1x.test(mobileNo)||reg2x.test(mobileNo))
		    return true;
		else 
			return false;
	}
}
/**函数isIMSPhoneOrMobileNo()
 *验证是否是电话号码,可以是手机号码,也可以是IMS固话号码,有效号码返回true,否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg 自定义提示，此处建议自定义提示．请输入关键字．
 *　(1)IMS固话号码为10位
 *　(2)移动电话号码为11位
 */
BFC.util.Validator.prototype.isIMSPhoneOrMobileNo=function(fform,elementID,tipMsg) {
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
    var phoneNo = this.fieldID.value;	
	var reg =/(^59[0-9]{8,9}$)/;
	if(reg.test(phoneNo)||BFC.util.Validator.prototype.isMobile(phoneNo)){return true;}
	else{
		var msgs = "无效的手机号码或IMS固话号码,请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "为无效的手机号码或IMS固话号码,请重新输入.";}
		else{if(typeof(arguments[0]) == "object"){
		if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"为无效的手机号码或IMS固话号码,请重新输入.";
		}
    };
	this.showError(msgs,fieldID);return false;};
}

/**函数isPhoneOrMobileNo()
 *验证是否是电话号码,可以是手机号码,也可以是普通电话号码,有效手机号码返回true,否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg 自定义提示，此处建议自定义提示．请输入关键字．
 *　(1)电话号码由数字、"("、")"和"-"构成
 *　(2)电话号码为3到8位
 *　(3)如果电话号码中包含有区号，那么区号为三位或四位
 *　(4)区号用"("、")"或"-"和其他部分隔开
 *　(5)移动电话号码为11或12位，如果为12位,那么第一位为0
 *　(6)11位移动电话号码的第一位和第二位为"13"
 *　(7)12位移动电话号码的第二位和第三位为"13"
 *　(８)新增159开头的手机。
 *  (9)新增147开头的手机判断 23822 add
 * <b>注意，这里的电话号码不仅仅限制在我们常用的固定电话号码，也可能是特殊的电话号码，像186,等等的电话。</b>
 */
BFC.util.Validator.prototype.isPhoneOrMobileNo=function(fform,elementID,tipMsg) {
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var phoneNo = this.fieldID.value;
	var reg=/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)/
	if(reg.test(phoneNo)||BFC.util.Validator.prototype.isMobile(phoneNo)){return true;}
	else{
		var msgs = "无效的手机号码或电话号码,请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "为无效的手机号码或电话号码,请重新输入.";}
		else{if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"为无效的手机号码或电话号码,请重新输入.";
			}
		};
		this.showError(msgs,fieldID);return false;};
}
/**函数isPhoneOrMobileNo4CSP()
 *验证是否是电话号码,可以是手机号码,也可以是普通电话号码,有效手机号码返回true,否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg 自定义提示，此处建议自定义提示．请输入关键字．
 *　(1)电话号码中包含有区号，那么区号为三位或四位,固话号码为三位到八位
 *　(2)移动电话号码为11或12位，如果为12位,那么第一位为0
 *　(3)11位移动电话号码的第一位和第二位为"13"
 *　(4)12位移动电话号码的第二位和第三位为"13"
 *　(5)新增159开头的手机。
 *  (6)新增147开头的手机判断 23822 add
 * <b>注意，这里的电话号码不仅仅限制在我们常用的固定电话号码，也可能是特殊的电话号码，像186,等等的电话。</b>
 */
BFC.util.Validator.prototype.isPhoneOrMobileNo4CSP=function(fform,elementID,tipMsg) {
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var phoneNo = this.fieldID.value;
	var reg=/(^0[0-9]{5,11}$)/;
	if(reg.test(phoneNo)||BFC.util.Validator.prototype.isMobile(phoneNo)){return true;}
	else{
		var msgs = "无效的手机号码或电话号码,请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "为无效的手机号码或电话号码,请重新输入.";}
		else{if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"为无效的手机号码或电话号码,请重新输入.";
			}
		};
		this.showError(msgs,fieldID);return false;};
}
/**函数isMobileNo()
 *验证是否是手机号码,如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．此处不建议自定义提示．
 *0138888888888;
 *新增159开头的手机判断
 *新增188开头的手机判断 td用户 add by webber
 *新增147开头的手机判断 23822 add
 *29876 增加189号段
 */
BFC.util.Validator.prototype.isMobileNo = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var mobileNo = this.fieldID.value;
	if(BFC.util.Validator.prototype.isMobile(mobileNo)){return true;}
	else{
		var msgs = this.MOBILE_TIP+",请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + this.MOBILE_TIP+",请重新输入";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+this.MOBILE_TIP+",请重新输入."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**函数isMobileNo13()
 *验证是否是11位或13位号码,如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．此处不建议自定义提示．
 *0138888888888;
 */
BFC.util.Validator.prototype.isMobileNo13 = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var mobileNo = this.fieldID.value;
	var reg1x = /(^1[3,4,5,8][0-9]{9}$)/;
	var reg2x = /(^10648[0-9]{8}$)/;
	var reg3x = /(^10648[0-9]{6}$)/;
	if(reg2x.test(mobileNo)||reg1x.test(mobileNo)){return true;}
	else{
		if(reg3x.test(mobileNo)) return false;
		var msgs = this.MOBILE_TIP+",请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + this.MOBILE_TIP+",请重新输入";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+this.MOBILE_TIP+",请重新输入."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**函数isMobileNumber()
 *验证是否是移动手机号码,如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．此处不建议自定义提示．
 *0138888888888;
 *add by yuxing
 *新增187开头的手机判断 
 */
BFC.util.Validator.prototype.isMobileNumber = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var mobileNo = this.fieldID.value;	
	if(BFC.util.Validator.prototype.isMobile(mobileNo,true)){return true;}
	else{
		var msgs = this.MOBILE_TIP_YD+",请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + this.MOBILE_TIP_YD+",请重新输入";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+this.MOBILE_TIP_YD+",请重新输入."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**函数isCmcc 
 *验证是否是移动手机号码,如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *0138888888888;
 *add by yuxing
 */
BFC.util.Validator.prototype.isCmcc = function(fform,elementID){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var mobileNo = this.fieldID.value;	
	if(BFC.util.Validator.prototype.isMobile(mobileNo,true))return true;
	else return false;
}
/**函数isSIDNo()
 *验证是否是手机号段,如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示．此处不建议自定义提示．
 *0138888888888;
 *新增159开头的手机判断
 *新增188开头的手机判断 td用户 add by webber
 *新增147开头的手机判断 23822 add
 *新增187开头的手机判断 27988 add
 *增加189号段 29876 
 */
BFC.util.Validator.prototype.isSIDNo = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var mobileNo = this.fieldID.value;
	if(BFC.util.Validator.prototype.isMobile(mobileNo)){return true;}
	else{
		var msgs = this.MOBILE_TIP+",请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + this.MOBILE_TIP+",请重新输入.";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+this.MOBILE_TIP+",请重新输入."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**函数isPhoneNo()
 *验证是否是电话号码,如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示.
 *(1)电话号码由数字、"("、")"和"-"构成
 *(2)电话号码为3到8位
 *(3)如果电话号码中包含有区号，那么区号为三位或四位
 *(4)区号用"("、")"或"-"和其他部分隔开 ,区号3位到4位
 */
BFC.util.Validator.prototype.isPhoneNo = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var phoneNo = this.fieldID.value;
	var reg=/(^[0-9]{3,8}$)|(^[0-9]{3,4}[\-]?[0-9]{3,8}[\-]?[0-9]{3,4}$)/;
	//(^[0-9]{3,4}[\-]?[0-9]{3,8}$)|
	//|(^[0-9]{3,8}$)|(^[0-9]{3,4}[0-9]{3,8}[\-][0-9]{3,4}$)
	if(reg.test(phoneNo)){return true;}
	else{
		var msgs = "无效的电话号码,请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "为无效的电话号码,请重新输入.";}
		else{if(typeof(arguments[0]) == "object"){
			if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"为无效的电话号码,请重新输入."
			}
		};
		this.showError(msgs,fieldID);return false;
		};
}
/**函数isCompanyPhoneNo()
 *验证是否是电话号码,如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示.
 *(1)电话号码由数字、"("、")"和"-"构成
 *(2)电话号码为3到8位
 *(3)如果电话号码中包含有区号，那么区号为三位或四位
 *(4)区号用"("、")"或"-"和其他部分隔开 ,区号3位到4位
 *(5)号码不以13或15开头
 */
BFC.util.Validator.prototype.isCompanyPhoneNo = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var phoneNo = this.fieldID.value;
	var reg=/(^[0-9]{3,8}$)|(^[0-9]{3,4}[\-]?[0-9]{3,8}[\-]?[0-9]{3,4}$)/;
	var reg2 = /(^13[0-9]*$)|(^15[0-9]*$)|(^18[0-9]*$)/;
	if(reg.test(phoneNo)&&!reg2.test(phoneNo)){return true;}
	else{
		var msgs = "该处联系电话号码只能输入固话,请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "号码只能输入固话,请重新输入.";}
		else{if(typeof(arguments[0]) == "object"){
			if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"号码只能输入固话,请重新输入."
			}
		};
		this.showError(msgs,fieldID);return false;
		};
}
/**函数isConnectPhoneNo()
 *验证是否是电话号码,如果是返回true.否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示.
 *须大于等于7位阿拉伯数字，且只能为阿拉伯数字，不能为同一数字或者顺序排序数字。
 */
BFC.util.Validator.prototype.isConnectPhoneNo = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var phoneNo = this.fieldID.value.trim();
	var num_type = this.getNumStringType(phoneNo);
	if(phoneNo.length<7 || num_type != "GENERAL"){
		var msgs = "无效的电话号码,请重新输入.";
		var tips = arguments[2];
		if(tips != null){
			msgs = tips + "为无效的电话号码,请重新输入.";
		}else{
			if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")
					msgs = arguments[1]+"为无效的电话号码,请重新输入.";
			}
		}
		this.showError(msgs,fieldID);
		return false;
	}else{
		return true;
	}
}
/**函数getNumStringType()
 *判断数字字符串格式
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg.自定义提示.
 *@return: DESC-降序(差额一样)，ASC-升序(差额一样)，SAME-都相同，NONUM-非数字字符串,GENERAL-一般的数字串
 */
BFC.util.Validator.prototype.getNumStringType = function(numString){
	if(!numString) return "NONUM";
	var reg=eval("/^[0-9]{"+numString.length+"}$/");
	if(!reg.test(numString)) return "NONUM";
	if(numString.length<2) return "GENERAL";
	var retType = "GENERAL";
	var retnum = parseInt(numString.charAt(1))-parseInt(numString.charAt(0));
	if(retnum>0) retType = "ASC";
	if(retnum==0) retType = "SAME";
	if(retnum<0) retType = "DESC";
	for(var i=1; i<numString.length; i++){
		if(parseInt(numString.charAt(i))-parseInt(numString.charAt(i-1)) != retnum){
			retType = "GENERAL";
			break;
		}
	}
	return retType;
}

/**函数isPostCode()
 *验证是否是邮政编码,如果是返回true.否则返回false.
 *@param : fform表单ID;
 *@param : elementID表单里的元素.也可以只传一个参数,但要保证送过来的值是元素可以取到的ID.
 *@param : tipMsg.自定义提示．
 * 这里只验证邮编的6位是否全是数字,并没有严格的校验,此算法有待进一步加强.
 */
BFC.util.Validator.prototype.isPostCode = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var postCode = this.fieldID.value;
	var reg = /^\d{6}$/;
	if(reg.test(postCode)){return true;}
	else{
		var msgs = "无效的邮政编码,请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "为无效的邮政编码,请重新输入.";}
		else{
			if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"为无效的邮政编码,请重新输入."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}

/**函数isGroupId()
 *验证是否是集团编码,如果是返回true.否则返回false.
 *@param : fform表单ID;
 *@param : elementID表单里的元素.也可以只传一个参数,但要保证送过来的值是元素可以取到的ID.
 *@param : tipMsg.自定义提示．
 */
BFC.util.Validator.prototype.isGroupId = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var postCode = this.fieldID.value;
	var reg = /^\d{10,11}$/;
	if(reg.test(postCode)){return true;}
	else{
		var msgs = "无效的集团编码,请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "为无效的集团编码,请重新输入.";}
		else{
			if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"为无效的集团编码,请重新输入."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**
 *函数isDateLessThan.前面的值小于后面的值．(限于日期)
 *如果前者的日期小于后者的日期返回true;否则返回false.
 *@param fform : 表单ID;
 *@param elementID1:表单里的元素.也可以只传一个参数,但要保证送过来的值是元素可以取到的ID.
 *@param elementID2:同elementID1.
 *@param tipMsg:自定义提示．建议自定义提示．
 *由于可能用到日期控件,故这个不再回显焦点.
 */
BFC.util.Validator.prototype.isDateLessThan = function(fform,elementID1,elementID2,tipMsg){

	if(typeof(arguments[0]) == "string"){
	    //判断form与field有效性,如果为空，采用默认的form.
		if(fform==null){this.showError("您所指定的form不存在");return false};
		if(elementID1==null){this.showError("表单元素不存在或指定错误");return false};
	    if(elementID2==null){this.showError("表单元素不存在或指定错误");return false};
		var formID=document.getElementById(fform);
		var elem1 = document.getElementById(formID.id + ":" + elementID1);
		var elem2 = document.getElementById(formID.id+":" + elementID2);
		if((elem1.value!=null)&&(elem2.value!=null))
		{
			var elemValue1 = elem1.value.replace("-","/").replace("-","/");
			var elemValue2 = elem2.value.replace("-","/").replace("-","/");
			if(Date.parse(elemValue1) <= Date.parse(elemValue2))return true;
			else{
			var msgs = "截止日期不能早于开始日期,请重新输入";
			var tips = arguments[3];
			if(tips != null && tips!= "undefined"){msgs = tips + ",请重新输入.";}
			this.showError(msgs);return false;
			}
		}
	}
	//不指定form,但传进来的element是用getElementById得到的元素本身.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		var elemValue1 = arguments[0].value.replace("-","/").replace("-","/");
		var elemValue2 = arguments[1].value.replace("-","/").replace("-","/");
		if(Date.parse(elemValue1) <= Date.parse(elemValue2))return true;
		else {
			var msgs = "截止日期不能晚于开始日期,请重新输入";
			var tips = arguments[2];
			if(tips != null){msgs = tips+"，请重新输入．";}
			this.showError(msgs);
			return false;
		}
	}
}

/**
 *函数isMonthLessThan.前面的值小于后面的值．(限于日期)
 *如果前者的日期小于后者的日期返回true;否则返回false.
 *@param fform : 表单ID;
 *@param elementID1:表单里的元素.也可以只传一个参数,但要保证送过来的值是元素可以取到的ID.
 *@param elementID2:同elementID1.
 *@param tipMsg:自定义提示．建议自定义提示．
 *由于可能用到日期控件,故这个不再回显焦点.
 */
BFC.util.Validator.prototype.isMonthLessThan = function(fform,elementID1,elementID2,tipMsg){
	var month1 = "";
	var month2 = "";
	if(typeof(arguments[0]) == "string"){
	    //判断form与field有效性,如果为空，采用默认的form.
		if(fform==null){this.showError("您所指定的form不存在");return false};
		if(elementID1==null){this.showError("表单元素不存在或指定错误");return false};
	    if(elementID2==null){this.showError("表单元素不存在或指定错误");return false};
		var formID=document.getElementById(fform);
		var elem1 = document.getElementById(formID.id + ":" + elementID1);
		var elem2 = document.getElementById(formID.id+":" + elementID2);
		if((elem1.value!=null)&&(elem2.value!=null))
		{
			month1 = BFC.util.Time.getDateOnlyFormated2(elem1.value).substring(0,8) + "01";
			month2 = BFC.util.Time.getDateOnlyFormated2(elem2.value).substring(0,8) + "01";
			if(Date.parse(month1) <= Date.parse(month2))return true;
			else{
			var msgs = "截止日期不能早于开始日期,请重新输入";
			var tips = arguments[3];
			if(tips != null && tips!= "undefined"){msgs = tips + ",请重新输入.";}
			this.showError(msgs);return false;
			}
		}
	}
	//不指定form,但传进来的element是用getElementById得到的元素本身.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		month1 = BFC.util.Time.getDateOnlyFormated2(arguments[0].value).substring(0,8) + "01";
		month2 = BFC.util.Time.getDateOnlyFormated2(arguments[1].value).substring(0,8) + "01";
		if(Date.parse(month1) <= Date.parse(month2))return true;
		else {
			var msgs = "截止日期不能晚于开始日期,请重新输入";
			var tips = arguments[2];
			if(tips != null){msgs = tips+"，请重新输入．";}
			this.showError(msgs);
			return false;
		}
	}
}

/**
 *函数isValueLessThan
 *@param fform : 表单ID;
 *@param elementID1:表单里的元素.也可以只传一个参数,但要保证送过来的值是元素可以取到的ID.
 *@param elementID2:同elementID1.
 *@param tipMsg:自定义提示．建议自定义提示．
 */
BFC.util.Validator.prototype.isValueLessThan = function(fform,element1,element2,tipMsg)
{
	//传入form 与 element
	if(typeof(arguments[0]) == "string"){
		if(fform==null){this.showError("您所指定的form不存在");return false};
		if(element1==null){this.showError("表单元素不存在或指定错误");return false};
	    if(element2==null){this.showError("表单元素不存在或指定错误");return false};
		var formID=document.getElementById(fform);
		var elem1 = document.getElementById(formID.id + ":" + element1);
		var elem2 = document.getElementById(formID.id + ":" + element2);
		if((elem1.value!=null)&&(elem2.value!=null))
		{
			if(elem1.value*1 < elem2.value*1)return true;
			else{
			var msgs = "后面输入的值需要大于前面输入的值,请重新输入";
			var tips = arguments[3];
			if(tips != null){msgs = tips + ",请重新输入.";}
			this.showError(msgs,elem1);return false;
			}
		}
	}
	//不指定form,但传进来的element是用getElementById得到的元素本身.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		if(arguments[0].value*1 < arguments[1].value*1)return true;
		else {
			var msgs = "后面输入的值需要大于前面输入的值,请重新输入";
			var tips = arguments[2];
			if(tips != null){msgs = tips+"，请重新输入．";}
			this.showError(msgs,arguments[0]);
			return false;
		}
	}
}
/**
 *函数isHomeArea,用于验证地市或县市提交的时候值是否有效，
 *这里就验证是值是-1的时候表示有效。
 *@param : elementID:这里因为验证的是控件产生的县市或地市的下拉列表，故需要直接传入id.
 *@param :tipsMsg:自定义消息提示。
 */
BFC.util.Validator.prototype.isHomeArea = function(elementID,tipMsg)
{
	var tips = "归属地市为无效值，请确认您的归属地市！";
	if(arguments[1] !=null){tips = arguments[1];};
	if(elementID.value == null || elementID.value == ""
				 || elementID.value == -1){
			this.showError(tips);
			return false;
		}
	else return true;
}
/**
 *函数isValidAccount,用于验证帐号是否有效，
 *验证规则：第1位不能为0，帐号总共15位。
 *@param : formID,表单id.
 *@param : elementID:元素ID.
 *@param :tipsMsg:自定义消息提示。
 */
BFC.util.Validator.prototype.isValidAccount = function(formID,elementID,tipMsg)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(formID,elementID);};
	var fieldID = this.fieldID;
	var accountNo = this.fieldID.value;
	var reg =/(^[1-9][0-9]{14}$)/;
	if(reg.test(accountNo)){return true;}
	else{
		var msgs = "帐号必须为非0开头的15位数字,请重新输入.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "必须为非0开头的15位数字,请重新输入.";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"必须为非0开头的15位数字,请重新输入."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**
 *函数isTheSamePwd,用于验证密码是否一致致，
 *验证规则：两个密码都不能为空，两密码必须一样。
 *@param : formID,表单id.
 *@param : pwd1:密码框1.
 *@param : pwd2:密码框2.
 *@param :tipsMsg:自定义消息提示。
 */
BFC.util.Validator.prototype.isTheSamePwd = function(formID,pwd1,pwd2,tipMsg)
{
	//传入form 与 element
	if(typeof(arguments[0]) == "string"){
		if(arguments[0]==""){this.showError("您所指定的form不存在");return false};
		if(arguments[1]==null){this.showError("表单元素不存在或指定错误");return false};
	    if(arguments[2]==null){this.showError("表单元素不存在或指定错误");return false};
		var form=document.getElementById(arguments[0]);
		var elem1 = document.getElementById(form.id + ":" + arguments[1]);
		var elem2 = document.getElementById(form.id + ":" + arguments[2]);
		var tips = arguments[3];
		var msgs = "你输入的两个密码必须一样且不能为空,请重新输入";
		if(tips != null){msgs = tips + ",请重新输入.";}
		if((elem1.value != "" && elem1.value!="undefined") && (elem1.value == elem2.value) )return true;
		else{
			this.showError(msgs,elem1);return false;
			return false;
		}
	}
	//不指定form,但传进来的element是用getElementById得到的元素本身.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		if((arguments[0].value != "" && arguments[0].value!="undefined") && (arguments[0].value == arguments[1].value) )return true;
		else {
			var msgs = "你输入的两个密码必须一样且不能为空,请重新输入";
			if(tips != null){msgs = tips+"，请重新输入．";}
			this.showError(msgs,arguments[0]);
			return false;
		}
	}
}


/**函数isValidOprId()
 *验证是否是有效工号,有效返回true,否则返回false.
 *@param ：fform表单id；
 *@param : elementID表单里的元素名.
 *@param : tipMsg 自定义提示，此处建议自定义提示．请输入关键字．
 *　工号由7位数字组成
 * ADD BY SZH@2006-6-23
 */
BFC.util.Validator.prototype.isValidOprId = function(formID,elementID,tipMsg)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(formID,elementID);};
	var fieldID = this.fieldID;
	var oprId = this.fieldID.value;
	var reg =/(^[1-9][0-9]{6}$)/;
    if(reg.test(oprId)){return true;}
	else{
        var msgs = "工号必须为7位数字,请重新输入.";
        var tips = arguments[2];
		if(tips != null){msgs = tips + "为无效的工号,请重新输入.";}
		else{if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"为无效的工号,请重新输入.";
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}

/**
 *函数isValidPwd,用于验证密码是否有效，
 *验证规则：必须是四位或者八位。
 *@param : formID,表单id.
 *@param : pwd:密码框.
 *@param :tipsMsg:自定义消息提示。
 */
BFC.util.Validator.prototype.isValidPwd = function(formID,pwd,tipMsg)
{
	//传入form 与 element
	if(typeof(arguments[0]) == "string"){
		if(arguments[0]==""){this.showError("您所指定的form不存在");return false};
		if(arguments[1]==null){this.showError("表单元素不存在或指定错误");return false};
	    if(arguments[2]==null){this.showError("表单元素不存在或指定错误");return false};
		var form=document.getElementById(arguments[0]);
		var elem = document.getElementById(form.id + ":" + arguments[1]);
		var tips = arguments[3];
		var msgs = "你输入密码长度只能是4位到8位,请重新输入";
		if(tips != null){msgs = tips + ",请重新输入.";}
		if((elem.value != "" && elem.value.length >= 4 && elem.value.length <= 8) )return true;
		else{
			this.showError(msgs,elem);return false;
			return false;
		}
	}
	//不指定form,但传进来的element是用getElementById得到的元素本身.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		var pwd = arguments[0];
		if(pwd.value != "" && pwd.value.length >= 4 && pwd.value.length <= 8 )return true;
		else {
			var msgs = "你输入密码长度只能是4位到8位,请重新输入";
			if(tips != null){msgs = tips+"，请重新输入．";}
			this.showError(msgs,arguments[0]);
			return false;
		}
	}
}

/**函数isInSameMonth()
 *验证两个日期在同一个月,是返回true,否则返回false.	
 *@param ：  elementID1 表单里的元素名；
 *@param : elementID2 表单里的元素名.
 *@param : tipMsg 自定义提示，此处建议自定义提示．请输入关键字．
 * ADD BY SJ@2006-8-7
 */
BFC.util.Validator.prototype.isInSameMonth = function(elementID1,elementID2,tipMsg){
	var elementID1 = eval(elementID1);
	var elementID2 = eval(elementID2);
	var date1 = new Date(Date.parse(elementID1.value));
	var date2 = new Date(Date.parse(elementID2.value));
	if(( date1.getFullYear() == date2.getFullYear() )&&( date1.getMonth() == date2.getMonth() )){
		return true;
	}
	if(tipMsg != null)
		showMsg(tipMsg + "的开始日期与截止日期应在同一月份，请重新输入.");
	else
		showMsg("开始日期与截止日期应在同一月份，请重新输入.");
	return false;
}
/**函数isValidDate()
 *验证两个日期在同一个月,是返回true,否则返回false.	
 *@param ：  elementID1 表单里的元素名；
 *@param : elementID2 表单里的元素名.
 *@param : tipMsg 自定义提示，此处建议自定义提示．请输入关键字．
 * ADD BY SJ@2006-8-7
 */
BFC.util.Validator.prototype.isValidDate = function(fform,elementID,tipMsg){
  if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
  if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
  var fieldID = this.fieldID;
  var str_date = this.fieldID.value;	
  str_date = str_date.trim();
  var pattern = /^[0-9\-\/]{10}$/g;
  var pattern2 = /\d{4}([\-\/])\d{2}\1\d{2}/g;
  var msgs = "";
  if(pattern.test(str_date)&&pattern2.test(str_date)){
      var year = str_date.substr(0,4);
      var m = str_date.substr(5,2);
      var day = str_date.substr(8,2);
      if(Number(m)>12){
          msgs="月不能大于12";
      }
      if(m=="01"||m=="03"||m=="05"||m=="07"||m=="08"||m=="10"||m=="12"){
          var d = "31";
      }
      if(m=="04"||m=="06"||m=="09"||m=="11"){
          var d = "30";
      }
      if(m=="02"){
          if(BFC.util.Time.isRunNian(year))  var d = "29";
          else  var d = "28";
      }
      if(Number(day)>Number(d)){
          msgs="日不能大于"+d;
      }
  }else{
      msgs="您输入的日期格式不正确!格式为:2000-01-01或2000/01/01";
  }
  if(msgs=="") return true;
  else{ 
    this.showError(msgs,fieldID);
    return false;
  }
}

BFC.util.Validator.prototype.isValidDateBySplit = function(fform,elementID,spilt_char,tipMsg){
  if(typeof(arguments[0]) == "object"){
  	this.checkField(arguments[0]);
  }
  if(typeof(arguments[0]) == "string"){
  	this.checkFormAndField(fform,elementID);
  }
  var spilt_char = arguments[2];
  var tips = tips = arguments[3];
  var fieldID = this.fieldID;
  var str_date = this.fieldID.value;	
  str_date = str_date.trim();
  var pattern = new RegExp("^\\d{4}([\\" + spilt_char + "])\\d{2}\\1\\d{2}$"); 
  var msgs = "";
  if(pattern.test(str_date)){
      var year = str_date.substr(0,4);
      var m = str_date.substr(5,2);
      var day = str_date.substr(8,2);
      if(Number(m)>12){
          msgs="月份不能大于12";
      }
      if(m=="01"||m=="03"||m=="05"||m=="07"||m=="08"||m=="10"||m=="12"){
          var d = "31";
      }
      if(m=="04"||m=="06"||m=="09"||m=="11"){
          var d = "30";
      }
      if(m=="02"){
          if(BFC.util.Time.isRunNian(year))  var d = "29";
          else  var d = "28";
      }
      if(Number(day)>Number(d)){
          msgs="日期不能大于"+d;
      }
  }else{
      msgs="日期格式不正确!格式为:YYYY" + spilt_char + "MM" + spilt_char + "DD";
  }
  if(msgs=="") return true;
  else{ 
  	if(tips!=null && tips!=""){
  		msgs = tips + "的" + msgs;
  	}
    this.showError(msgs,fieldID);
    return false;
  }
}
/**************************************************OCX方面的使用。*********************************/
/**
 *@class BFC.util.Ocx
 */
BFC.util.Ocx = function()
{
} 
/**函数ConvertHexToVipCardInfo()
 * 对全球通电子VIP卡读取的数据进行解码，返回VIP卡信息的Object
 *@param ：  hex 原码数据；
 * ADD BY boywish@20061221
*/
 BFC.util.Ocx.ConvertHexToVipCardInfo = function(hex){
	var length=hex.length-1;
	var i=0;
	var subHex;
	var bin="";
	var obj = new Object();
	var sSplitStr="~"
	for(i;i<length;i=i+2){
		subHex=parseInt(hex.substring(i,i+2),16);
		bin=bin+String.fromCharCode(subHex);
	}
	var aBin=bin.split(sSplitStr);
	if(aBin.length==4){
	  obj["msisdn"]=aBin[0]; //手机号码	
	  obj["card_no"]=aBin[1];//vip卡号
	  obj["card_level"]=aBin[2]; //卡级别
	  obj["exprie_time"]=aBin[3]; //失效时间(YYMM)	
	}else{
	  obj=null;
	}
	return obj;
}
 
//给数组添加remove属性
Array.prototype.remove = function(dx){ 
    if(isNaN(dx)||dx>this.length){return false;} 
    this.splice(dx,1); 
} 
 