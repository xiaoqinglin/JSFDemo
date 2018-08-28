 /*
 * <p>Title: BFC utils</p>
 *
 * <p>Description:BFC utils ��������js��������</p>
 *
 * <p>Copyright (c) 2005-2007</p>
 *
 * <p>Company: fmcc&newland</p>
 *
 * @author chenjp
 * @version 1.0
 * ��ԭ�ȵ�utils.js������һ��
 * �������֤��JSValidator.js�ظ��Ļ�������JSValidator�¡�
 *�ڵ�ǰ�汾�£�ZJW���Ĳ��֣�ע��ȱ�٣��¸��汾���ϡ�
 */


/********************====map for buffalo modified by cjp **************/

/**
 *@class BFC.util.Map
 *@constructor Map
 *@author chenjp
 *example:
 * var aMap = new BFC.util.Map();(����ֱ��ʹ��map���ã�inc.jsp������Զ���ʵ��һ�������Ķ���,�Է���ʹ�á�)
 * aMap.put("mykey","myValueMayBeObject");//��������£�key-valueֵ�����value�����洢����
 * aMap.put("mykey2","myValueMayBeObject");
 * aMap.get("mykey");
 * aMap.remove("mykey");
 * �����Ѿ�Ϊ����ṩ��һ������BMap(�Ƕ��󣬲����࣬��ע�⡣)
 *ʹ��ʱҲ��������������÷�:BMap.put("key","myvalue");
 *@description �����keyͨ��Ϊstring���ͣ�value ����Ϊ�κζ���
 */
BFC.util.Map = function()
{
  this.key = new Array();
  this.value = new Array();
  this.className = "java.util.Map";
} 
 /**
   *put ��������������key-value.
   *ע������Ĺؼ���ֵ�����MAP�����еĹؼ���һ�µĻ�������false.
   *��Ϊ_keyֵ�Ѿ����ڣ����滻֮
   *@param {_key}:keyֵ;
   *@param {_value}:valueֵ;
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
 *get ������ͨ���ؼ��ֻ�ȡֵ��
 *@param {_key}:keyֵ;
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
  *������MAP����������¼��
  *@param key,�ؼ��֣�
  *@param value,�µ�ֵ��
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
  *remove,ͨ���ؼ���ɾ����map��ĸ�����¼��
  *@param {_key}:�ؼ���ֵ;
  */
BFC.util.Map.prototype.remove = function(_key)
 {
        for(var i=0;i<this.key.length;i++)
        {
                if(this.key[i] == _key)
                {
                        this.key.splice(i,1);
                        this.value[i]=null;//ɾ���������
                        this.value.splice(i,1);
                        break;
                }
        }
      return null;
 }
 /**
  *size,����map��ļ�¼������
  */
BFC.util.Map.prototype.size = function()
 {
 	return this.key.length;
 }
 /**
  *�������е�key����Ȼ���ﲻ����ͨ��ֱ�Ӷ�����������ֱ�Ӳ�����
  */
BFC.util.Map.prototype.getKeys = function()
 {
 	return this.key;
 }
 /**
  *�������е�ȡ����Ȼ���ﲻ����ͨ��ֱ�Ӷ�����������ֱ�Ӳ�����
  */
BFC.util.Map.prototype.getValues = function()
 {
 return this.value;
 }

/**
 *ɾ��ȫ��,key,valueȫ�����
 */
BFC.util.Map.prototype.removeAll = function()
 {	
        //for(var i=0;i<this.key.length;i++)
        for(var i=this.key.length-1; i>=0; i--)
        {
        	this.key[i]=null;
            this.key.splice(i,1);
            this.value[i]=null;//ɾ���������
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
 *�����DOM,����inc.jsp�����ѳ�ʼ��һ���ض���BDOM��������BFC.util.DOM,����DOM��Ҫ�����ṩֱ�ӵĹ��ܣ�����
 *ȫ��ʹ���෽�����Դ˷���ʹ�á�
 *��Ȼ��Ҳ����ֱ��ʹ��BFC.util.DOM.removeAllOption(),����������ʹ�á�
 *example:BDOM.removeAllOption();
 *����DOM��������ע�Ͳ��Ǻ���ϸ������汾ֻд�ǻ�������������¸��汾�������ⷽ��Ĺ�����
 */
BFC.util.DOM = function()
{
	this.className ="BFC.util.DOM ";
}

/**
 * ɾ������������ѡ��
 * @param obj Ϊ���������
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
 *�����ض���ֵɾ���������е��Ǹ�ѡ��.
 *@param oObj:Ҫɾ����ѡ���������ID
 *@vparam value:�ض���ֵ
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
 *���������Ƿ���ĳ��ѡ��.
 *@param oObj:ѡ���������ID
 *@vparam value:�ض���ֵ
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
 * ����һ������ѡ��
 * @param obj Ϊ���������
 * @param sValue ΪҪ���ӵ�������ѡ��ֵ
 * @param sText ΪҪ���ӵ�������ѡ����ʾ�ı�
 * @param selected �����Ƿ�Ĭ��ѡ��
 * ȥ��ԭ��ʹ�õ�appendChild,��������ڶ����ӵ�ʱ��ᵯ��δָ������,����add
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
 * ���ڸ��������ֵ�������ϵ�˵�
 * @param oSubObj Ϊ�¼����������
 * @param dictType ��Ӧ�ֵ�� dictType
 * @param classId ��Ӧ�ֵ�� classId
 * @param parentId Ϊ�ϼ�������ѡ��ֵ
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
 * ʹ��������textֵ���ṩ�ĵ�sText��ƥ���optionѡ��(����ƥ�䣬��׼ȷƥ��)
 * @param selObj Ϊ���������
 * @param sText Ϊ������ѡ����ʾ�ı�
 */
BFC.util.DOM.compareSelText = function(selObj, sText){
  for(var i=0; i<selObj.length; i++){
    if( selObj[i].text.trim() == sText.trim() ){
      selObj[i].selected = true ;
    }
  }
}
/**
 * ʹȨ����������textֵ���ṩ�ĵ�sText��ƥ���optionѡ��(����ƥ�䣬��׼ȷƥ��)
 * @param selObj Ϊ���������
 * @param sText Ϊ������ѡ����ʾ�ı� 
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
 * ѡ�����ṩsValueֵ��ƥ���������ѡ�ֵƥ�䣬��ȷƥ�䣩
 * @param selObj Ϊ���������
 * @param sValue Ϊ������ѡ��ֵ
 */
BFC.util.DOM.compareSelValue = function(selObj, sValue){
  for(var i=0; i < selObj.length; i++){
    if( selObj[i].value.trim() == sValue.trim() ){
      selObj[i].selected = true ;
    }
  }
}

/**
 * ʹָ���ĸ�ѡ��ѡ��
 * @param chkObjΪ��ѡ�����
 * @param sValueΪ��ѡ���ֵ
 */
BFC.util.DOM.compareCheckBoxByValue = function(chkObj, sValue){
  if( sValue == "true" || sValue == "1" ){
    chkObj.checked = true ;
  } else {
    chkObj.checked = false ;
  }
}

/**
 * ѡ�����ṩsValueֵ��ƥ��ĸ�ѡ��ѡ��
 * @param chkObjΪ��ѡ�����
 * @param sValueΪ��ѡ���ֵ
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
 * ����sText���������е�����(����ƥ�䣬��׼ȷƥ��)
 * @param oObjΪ���������
 * @param sText Ϊ������ѡ����ʾ�ı�
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
 * ��ȡ�����������
 * @param oObjΪ���������
 * @param sValueΪ������ѡ��ֵ
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
 * ��ȡ�����������ֵ
 * @param oObjΪ���������
 * @param sValueΪ������ѡ��ֵ
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
 * �����ı���Ϊֻ��
 * @param oObjΪ�ı������
 */
BFC.util.DOM.setTextBoxReadOnly = function(oObj){
 var oObj = eval(oObj);
 oObj.readOnly = true;
 oObj.className = "input-gray";
}

/**
 *����Ԫ�ص�״̬(disabled or not)
 *@param obj:Ҫ��Ԫ�ص�ID��
 *@param flag :״̬��true or false.
 *�������Ϊtrue��ʱ��Ԫ���ûң���Ϊfalse��ʱ���д��������ջ�ɫ��
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
 * ����form����Ԫ��Ϊ����״̬
 * @param oFormΪform����
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
        if(e.id.indexOf("ic_no")==-1) e.value = ""; //����֤�����벻���
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
 * ���ݲ������ж��Ƿ��û�form
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
 * ����form
 * @param oFormΪform����
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
 * ���ݲ���������form
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
 * ���form
 * @param oFormΪform����
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
 *ȫ��ѡ�и�ѡ�򣨸�ѡ�򲻴���form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
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
 *ȫ��ȡ��ѡ�и�ѡ�򣨸�ѡ�򲻴���form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
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
 *ȫ��ѡ�и�ѡ�򣨸�ѡ����form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param operform ���ύ��form����
 *@param checkboxobj ��ѡ������
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
 *ȫ��ȡ��ѡ�и�ѡ�򣨸�ѡ����form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param operform ���ύ��form����
 *@param checkboxobj ��ѡ������
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
 *ȡ��ѡ�������б�ѡ��ѡ���ֵ����һ��Array�󸳸�form�е�һ������Ԫ�أ���ѡ�򲻴���form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
 *@param operform ���ύ��form����
 *@param hiddenobj ������Ÿ�ѡ���ֵ������Ԫ������
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
 *ȡ��ѡ�������б�ѡ��ѡ���ֵ����һ��Array�󸳸�form�е�һ������Ԫ�أ���ѡ����form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
 *@param operform ���ύ��form����
 *@param hiddenobj ������Ÿ�ѡ���ֵ������Ԫ������
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
 *ȡ��ѡ�������б�ѡ��ѡ��ı�ǩ����һ��Array�󸳸�form�е�һ������Ԫ�أ���ѡ����form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
 *@param operform ���ύ��form����
 *@param hiddenobj ������Ÿ�ѡ���ֵ������Ԫ������
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
 *�ûһ��������и�ѡ��ѡ��
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
 *@param operform ���ύ��form����
 *@param ison ���ڱ�ʶ��ǰ�������ûһ������õĸ�ѡ������
 *@author shenjian
 */
BFC.util.DOM.disableifr =function(ifr,checkboxobj,operform,ison){//ifr:Ƕ��������(��û���õ���ܲ���Ϊ'')��checkboxobj:checkbox���ƣ�operform:���ύ��jsf�����ƣ�ison:��ʶ���Ƿǡ��ؼ�����
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
 * @author jiangjz�� ��formת��Ϊjs����ֻ������������type��text��
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
    //returnValue.extend = null;//ȥ��prototype��չ-------->jjz:�Ѿ�ͳһ��doStructXMLת����Map����ʱ����
	return returnValue;
}
/**
 * ���oTag HTMLDOMԪ�ص�id����name������value������returnValue����
 * �˷����� ����ð�ŵ�����������JSF���ɵ�Ԫ�أ�ȥ��ð�ż���ǰ�����ݣ���Ϊ������
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
    var orinPropName = propertyName;//����ԭʼ������
    propertyName = propertyName.substring(index+1);//ȥ��jsfð��ǰ�ַ�

    propertyValue = oTag.value;
    if ( oTag.type.toUpperCase() == "RADIO" ){//radio ѡ�о͸�ֵ
        if ( !oTag.checked )
            return;
    }
    else if ( oTag.type.toUpperCase() == "CHECKBOX" ){
      if ( form[orinPropName].length>1 ) {//�ظ�id�ģ���������ʽ����
        if ( oTag.checked )
          propertyValue = form_utils.setObjArrValue(form,oTag,returnValue[propertyName]);
        else
          return;
      }
      else{//���ظ��ģ�ֱ�ӷ�boolean
         propertyValue = oTag.checked;
      }
    }

    //�ж��Ƿ���mappingӳ��
    if (oTag.mapping!=null) propertyName = oTag.mapping;
    returnValue[propertyName] = propertyValue;
}
//�ظ�id�ģ���������ʽ׷�ӷ���
//form Ϊ�ύ��form����oTagΪ��ǰԪ�ض���lastValueΪid��Ӧ�ĵ�ǰֵ
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
//��ȡbossϵͳtop����
BFC.util.DOM.getTop = function(){
	var theParent = self;
    while( theParent != theParent.parent && theParent.name != "ccmsFrame"){
        theParent = theParent.parent;
    }    
    return theParent;
    //2009.02.05 yanfg add >>
}
//��ȡ�˵����ܺ�
BFC.util.DOM.getMenuFuncId = function(){
  //2006.07.03 boywish upd << debug�޸�,��ͬʱ�򿪶����������ʱ�򣬻�����MenuFuncId��ȡ����ȷ
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
//ȡBIZ��չMENUID ���û����չ�������� Ĭ��ϵͳ���ܺ�
BFC.util.DOM.getBizMenuFuncId = function(){
	var bizparam=BFC.util.DOM.getBizParamId();
	if(bizparam!="")
		return bizparam;
	return BFC.util.DOM.getMenuFuncId();
}
//ȡBIZ��չ����
BFC.util.DOM.getBizParamId = function(){
	var boss_top = BFC.util.DOM.getTop();
	if(boss_top.getBizParam){
		var bizparam=boss_top.getBizParam();
		if(bizparam!="")
			return bizparam;
	}
	return "";
}
//ȡBOPϵͳ���ܺ�
BFC.util.DOM.getPortalId = function(){
	var boss_top = BFC.util.DOM.getTop();
	if(boss_top.getPortalfunid){
		return boss_top.getPortalfunid();
	}
	return "";
} 

/**
 *ȡ��ǰ������ҳ��url��Ĳ���ֵ
 *@param : ��������
 *@return : ����ֵ
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
 *����appendRowToTable��׷���е�table��.
 *@param : tableId, table��id
 *@param : tdTextArray , Ҫ���뵽td��ķ��������Ǹ����飬����ԷŶ��tdֵ������
 *@author chenjp.
 *����ʹ�÷�����
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
 *ִ����������
 *����getInt
 *@param divided: ������
 *@param divider:����
 *@return integer������
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
 *��ĳһ�ض���form ��Ԫ�ض������״̬�趨
 *@param obj : form ����Ԫ�ض�����ֱ�Ӵ�����󣬻���ID
 *@param flag : ״̬��ʶ��true or false; true��ʾ��������༭��false��ʾ���ɱ༭
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
 *��ĳһ�ض���form ��Ԫ�ض������״̬�趨
 *@param obj : form ����Ԫ�ض�����ֱ�Ӵ�����󣬻���ID
 *@param flag : ״̬��ʶ��true or false; true��ʾ��������༭��false��ʾ���ɱ༭
 *@author chenjp
 */
BFC.util.DOM.setEditable1 = function(obj,flag){
	this.setElementStatus(obj.id,!flag);
}

/**
 *ȡ��������ѡ����ı�
 *@param selectObj
 *					������Ķ���
 *@author chenjp
 */
BFC.util.DOM.getTextFromSelect = function(selectObj){
if(!selectObj)return;
if(selectObj.selectedIndex < 0)return "";
var obj = selectObj.options[selectObj.selectedIndex].text;
return obj;
}


/**
 *��ȡ����ֵ
 *@param obj ����
 *@param oTag �������ͣ�ʱ��ؼ�Ϊ 'time' ��������Ϊ 'home_city' ��������Ϊ 'home_county' ����Ϊ��
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
 *���ö���ֵ
 *@param obj ����
 *@param oValue ����ֵ
 *@param oTag �������ͣ�ʱ��ؼ�Ϊ 'time' ��������Ϊ 'home_city' ��������Ϊ 'home_county' ����Ϊ��
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
 *���ö����Ƿ�ɶ�д
 *@param obj ����
 *@param flag �Ƿ�ɶ�д
 *@param oTag �������ͣ�ʱ��ؼ�Ϊ 'time' ��ťΪ 'btn' ����Ϊ�� 
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
 *��ĳ�л��������е�ĳЩ�н��н��ת��
 *@param grid ��� 
 *@param colArr: [0, 1, 3] �����
 *@param row ���� Ϊ��ʱ��ʾ������
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
 *��ĳ�л��������е�ĳЩ�н��н��ת�� תΪ����С��������
 *@param grid ��� 
 *@param colArr: [0, 1, 3] �����
 *@param row ���� Ϊ��ʱ��ʾ������
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
 *��ĳ�л��������е�ĳЩ�н���ʱ��ת��
 *@param grid ��� 
 *@param colArr: [0, 1, 3] �����
 *@param row ���� Ϊ��ʱ��ʾ������
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
 *�ж��Ƿ���Ҫ�滻
 *@param grid ��� 
 *@param rowArr ������
 *@param colArr ������
 *@param type �滻���� replace ֱ���滻 money ��Ǯת�� time ʱ��ת�� 
 *@param srcValueArr ���ݴ��ڸ�������Ҫ�滻
 *@param desValue Ҫ�滻������
 *@author yuxf@fmcc.boss
 */
BFC.util.DOM.replaceColsValue = function( grid , rowArr , colArr , type , srcValueArr , desValue) {
	var fieldFlag = String.fromCharCode(2);
	//����
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
 *�ж��Ƿ���Ҫ�滻
 *@param grid ��� 
 *@param row ����
 *@param col ����
 *@param srcValueArr ���ݴ��ڸ�������Ҫ�滻
  *@param type ����
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
 *�������滻
 *@param grid ��� 
 *@param row ����
 *@param cellDataArr ����������
 *@author yuxf@fmcc.boss
 */

BFC.util.DOM.replaceColValue = function( grid , row , cellDataArr ) {
	var fieldFlag = String.fromCharCode(2);
	grid.ModifyRowData( row , cellDataArr.join(fieldFlag));
}

/**
 *����ת������ת������
 *@param rowData ������
 *@param col ����
 *@param type �滻���� replace ֱ���滻 money ��Ǯת�� time ʱ��ת�� 
 *@param desValue Ҫ�滻������
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
 * 15λ���֤�ĵ�15λ,����Ϊ��,ż��ΪŮ�� 18λ���֤�ĵ�17λ,����Ϊ��,ż��ΪŮ
 *@param ic_no ���֤����
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
	//����Ϊ��,ż��ΪŮ
	if( s%2 == 0 ){
		ret = "1"
	}else{
		ret = "0"
	}
	return ret ;
}

/**************************************************ʱ�䷽���ʹ�á�*********************************/
/**
 *@class BFC.util.Time
 */
BFC.util.Time = function()
{
	this.className ="time";
}
/**
 * ��ȡ��ǰʱ��(��ʽ yyyy/MM/dd hh:mm:ss)
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
 * ��ȡ��ǰʱ��(��ʽ yyyyMMddhhmmss)
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
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss or yyyy-MM-dd hh:mm:ss 2 yyyymmdd
 * @param sDateΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
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
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss 2 yyyy-mm-dd
 * @param sDateΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
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
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss 2 yyyy/mm/dd
 * @param sDateΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
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
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss to yyyy-MM-dd hh:mm:ss
 * @param sDateΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
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
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss 2 hhmmss
 * @param sDateΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
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
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss 2 yyyymmddhhmmss
 * @param ocxTimeValueΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
 * @author chenjp
 */
BFC.util.Time.ocxFormatToDigital = function(ocxTimeValue){
	if(ocxTimeValue.length<10) return ocxTimeValue;
    var date = this.getDateOnly(ocxTimeValue);
    var time = this.getTimeOnly(ocxTimeValue);
    return date+time;
}
/**
 * ���ڸ�ʽת�� yyyymmddhhmmss 2 yyyy/MM/dd hh:mm:ss
 * @param digitalTimeValueΪ��ʽΪyyyymmddhhmmss���ַ�������
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
 * ���ڸ�ʽת�� yyyymmddhhmmss 2 yyyy/MM/dd 
 * @param digitalTimeValueΪ��ʽΪyyyymmddhhmmss���ַ�������
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
 * ���ڸ�ʽת�� yyyymmddhhmmss 2 yyyy-MM-dd hh:mm:ss
 * @param digitalTimeValueΪ��ʽΪyyyymmddhhmmss���ַ�������
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
 * ���ڸ�ʽת�� yyyymmddhhmmss 2 yyyy-MM-dd
 * @param digitalTimeValueΪ��ʽΪyyyymmddhhmmss���ַ�������
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
 * ��������
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss 2 yyyymmddhhmmss,���������
 * @param ocxTimeValueΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
 * @param days_in :Ҫ���ӵ�����
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
 * ��������
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss 2 yyyymmddhhmmss,���������
 * @param ocxTimeValueΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
 * @param days_in :Ҫ���ӵ�����
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
 * ��ʽת��
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss 2 yyyy-mm-dd-hh-mm-ss,���������
 * @param ocxTimeValueΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
 * @param days :Ҫ���ӵ�����
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
 * ��ʽת��
 * ���ڸ�ʽת��yyyymmddhhmmss 2 yyyy-mm-dd-hh-mm-ss
 * @param dateToBeFormatted Ϊ��ʽΪyyyymmddhhmmss�����ڸ�ʽ
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
 * ��ʽת��
 * ���ڸ�ʽת��javascript���ڸ�ʽ 2 yyyy-mm-dd-hh-mm-ss
 * @param dateToBeFormatted Ϊ��ʽΪjavascript���ܹ�ʶ������ڸ�ʽ
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
 * ��ʽת�� ��JS���ʶ���ʱ�����ת��Ϊ��̨��ȫ������ʽ�Ĵ�
 * ���ڸ�ʽת��javascript���ڸ�ʽ 2 yyyymmddhhmmss
 * @param dateToBeFormatted Ϊ��ʽΪjavascript���ܹ�ʶ������ڸ�ʽ
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
 * ���ܣ����������λ����ǰͷ��һ��0
 * @param dateToFix :��Ҫ������ʱ�䡣��������ʱ�䣬�����Ƿ��ӡ����������������ͣ�
 * @author chenjp
 */
BFC.util.Time.prefixOneZero = function(dateToFix){
	if(dateToFix=="")return;
	var dateAfterFix = (dateToFix < 10)?('0'+dateToFix):dateToFix;
	return dateToFix;
}
/**
 *�������� and ��ǰ����,����(ǰ)��N�ܵ���һ�����յ�����
 *@param weekIndex 0����null��ʾ����,1��ʾ����,-1��ʾ����,��������
 *@param currDate ��ǰ���ڶ���,null��ʾȡ��ǰ��������
 *@return week ����Ϊ2���ַ�������,week[0]��ʾ��һ,week[1]��ʾ����
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
 *ȡ�������һ��yyyy/MM/dd hh:mm:ss 2 yyyy/MM/31
 *@param sDateΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
 *@param formatDateΪ��ʽΪ������yyyyMMddhhmmss�����ַ���
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
 *�ж��Ƿ�������
 *@param year
 *@return boolean true:�����ꣻfalse:��������
 *@author rzy
 */
BFC.util.Time.isRunNian = function(year){
    return ((year%4 == 0) && (year%100 != 0)) || (year%400 == 0) ? true : false;
}
/**
 *У�������ַ���
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
          showMsg("�²��ܴ���12");
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
          showMsg("�ղ��ܴ���"+d);
          return false;
      }
      return true;
  }else{
      showMsg("����������ڸ�ʽ����ȷ!��ʽΪ:2000-01-01��2000/01/01");
      return false;
  }
}

/**
 *��ȡ��ǰʱ��(��ʽ yyyymmddhhmmss)
 *@author yuxf@fmcc.boss
 */

BFC.util.Time.getSystemTime = function(){
	return _system_date_from_web_service; 
}

/**
 *��ȡ��ǰʱ��(��ʽ yyyy-mm-dd)
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.getSystemDate = function(){
	return this.formatDate2slash( this.getSystemTime() ).substring(0,10); 
}

/**
 *��ȡ���µ�һ��(��ʽ yyyy-mm-dd)
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.getThisMonthFirstDate = function(){
	return this.formatDate2slash( this.getSystemTime() ).substring(0,7) + "-01"; 
}

/**
 *��ȡ���µ�һ��(��ʽ yyyy-mm-dd)
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
 *��ȡ�������µ�һ��(���봫����ʽ yyyy-mm-dd)
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
 *��ȡ���µ�һ��(��ʽ yyyy-mm-dd OR yyyy/MM/dd  2 yyyy-mm-dd)
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
 *�ж��Ƿ�������
 *@param year ���
 *@return boolean true:�����ꣻfalse:��������
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.isLeapYear = function( year ){
    return ((year%4 == 0) && (year%100 != 0)) || (year%400 == 0) ? true : false;
}

/**
 * �����·�
 *@param today ʱ�� yyyymmdd
 *param step ����Ϊ���ӣ�����Ϊ����
 *@return ĳ���µĵ�һ��
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
 * �����·�
 *@param i_date ʱ�� yyyymmdd
 *param num ����Ϊ���ӣ�����Ϊ����
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
 *��ȡ�������һ��(��ʽ yyyy-mm-dd OR yyyy/MM/dd  2 yyyy-mm-dd)
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
 *@return boolean true:�����ꣻfalse:��������
 *@author yuxf@fmcc.boss
 */
BFC.util.Time.getYesterday = function( today ){
	var ret ;
	var nowDate = today ;
	var year = nowDate.substring(0,4);
	var month = nowDate.substring(4,6);
	var day = nowDate.substring(6,8);
	//����1�ţ������޸�����
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
 * ����ʱ���ֵ (digitalTimeValue-digitalTimeValu2)
 * @param digitalTimeValue1 Ϊ��ʽΪyyyymmddhhmiss���ַ���ʱ��
 * @param digitalTimeValue2 Ϊ��ʽΪyyyymmddhhmiss���ַ���ʱ��
 * @param type Ϊʱ���ֵ�����ַ��� "year","month","day","hour","minute","second" Ĭ��Ϊ"day"
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
			case "year��month��day��":
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
					retValue = ret_year + "��" + ret_month + "��" + ret_day + "��";
				}else{
					showMsg("����ʱ�䲻��С�ڼ���ʱ��");
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
 * ȡ��ʼ������ʱ��������·� 
 * @param start_month Ϊ��ʽΪyyyymm���ַ���
 * @param end_month Ϊ��ʽΪyyyymm���ַ���
 * @author chengenghui
 */
BFC.util.Time.getIncludeMonth = function(start_month_time, end_month_time){
	var include_month = new Array();	
	var start_year = Number(start_month_time.substring(0, 4));
	var end_year = Number(end_month_time.substring(0, 4));		
	var start_month = Number(start_month_time.substring(4, 6));
	var end_month = Number(end_month_time.substring(4, 6));
		
	if(end_year - start_year == 0 && end_month > start_month){	//ͬ��
		include_month.push(start_month);		
		var temp_month = start_month;
		while(temp_month < end_month){
			temp_month++;
			include_month.push(temp_month);
		}
	}else if(end_year - start_year == 1 && start_month > end_month){	//��һ��������һ��
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
		
	}else if((end_year - start_year == 1 && start_month < end_month) || (end_year - start_year > 1) ){ //���һ�꼰һ������
		include_month = [1,2,3,4,5,6,7,8,9,10,11,12];
	}else{
   		return false;
	}
	return include_month;
}
/************************************����Ϊ�����ֹ��ܽ�����չ*************************************************/
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
 *�жϸ������ӷ����� (3).add(0.4);
 *@param arg
 */
Number.prototype.add = function (arg){
	return accAdd(this, arg);
}
/**
 *�жϸ������������� (3).sub(0.4);
 *@param arg
 */
Number.prototype.sub = function (arg){
	return accSub(this,arg);
}
/**
 *�жϸ������������� (3).mul(0.4);
 *@param arg
 */
Number.prototype.div = function (arg){
	return accDiv(this, arg);
}
/**
 *�жϸ������˷�����  (3).mul(0.4);
 *@param arg
 */
Number.prototype.mul = function (arg){
	return accMul(arg, this);
}

/************************************����Ϊ���ַ������ܽ�����չ*************************************************/
/**
 *�ж��ַ��������Ƿ�����Ҫ��ķ�Χ��
 *@param minL: ��С���ȣ�����;
 *@param maxL :��󳤶ȣ�����;
 */
String.prototype.isValidLength = function (minL, maxL) {
  if( this.length < minL || this.length > maxL ) return false;
  return true;
}
/**
 *�ж��ַ��������Ƿ�����Ҫ��ĳ��ȡ�
 *@param len: Ҫ��ĳ��ȣ�����;
 */
String.prototype.accordLength = function (len) {
  if(this.length != len) return false;
  return true;
}
/**
 *ȥ�ո�
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 *�ַ���תbolean���ַ���Ϊ"true"ʱ(�����ִ�Сд��)������true;�ַ���Ϊ"false"ʱ�������ִ�Сд��������false;
 *@param len: Ҫ��ĳ��ȣ�����;
 */
String.prototype.toBoolean = function() {
	if ( this.toLowerCase() == "true" ) return true;
	return false;
}
/**
 * ���㳤��(�����ַ�)
*/
String.prototype.Tlength = function(){
    var arr=this.match(/[^\x00-\xff]/ig);
    return this.length+(arr==null?0:arr.length);
}
/**
 * �ؼ���Ϣ���Σ�֧��ֻ�����ı��ؼ�λ��
 * @param ���ο�ʼλ��
 * @param ���ν���λ��
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
/************************************����Ϊ�����鹦�ܽ�����չ*************************************************/
/**
 * �ж������Ƿ��Ѱ�����ĳ��Ԫ��
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
*  ����:Array.remove(dx)  
*  ����:����Ԫ��ֵɾ������Ԫ��.  
*  ����:Ԫ��ֵ  
*  ����:��ԭ�������޸�����  
*  ���ߣ�pxp  
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
 *  ����:Array.remove(dx)  
 *  ����:����Ԫ��λ��ֵɾ������Ԫ��.  
 *  ����:Ԫ��ֵ  
 *  ����:��ԭ�������޸�����  
 *  ���ߣ�pxp  
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
 * <p>Title: javascript ��֤������</p>
 *
 * <p>Description:ǰ̨��֤,ʹ��javascript </p>
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
 *���ڵ�JS��֤���ϵ����ļ����棬����inc.jsp�����ʼ����һ�������Ķ���jsValidator,���ʹ��������һ���ġ�
 *ԭ�Ȱ����Ĳ��䣬���µ�ҳ����Ҫ����ʹ�õĻ��������BFC.js��BFCUtils.js�������ļ�����ɵĲ������½⡣
 *���ڵ��õķ����ǲ���jsValidator.isNull("form","elementId")������������
 *history:���ӶԲ�ָ��formsʱ��Ԫ�ؽ����ж�.
 *=================================================================
 */
 /*==============================================================
  *��ܹ��в��ֺ���
  *==============================================================
  */
  //ȫ�ֱ�����formID:����;fieldID:���е�Ԫ������
 // var formID;
 // var fieldID;
 // var defaultFormID;
 /**
 * ��Validation
 * ���캯��
 */
BFC.util.Validator = function()
{
  this.fieldID=null;
  this.MOBILE_TIP = "�ֻ��������Ϊ13,14,15,18��ͷ��11λ���ֻ�10648��ͷ��13λ����";
  this.MOBILE_TIP_YD = "�ƶ��ֻ��������Ϊ13[5-9],134[0-8],147,15[0-2,7-9],18[2,3,4,7,8]��ͷ��11λ���ֻ�10648��ͷ��13λ����";
}

/**����showError()
 *��ʾ����
 *������ֱ�ӵ��ô˷�����
 */
BFC.util.Validator.prototype.showError=function(msg,elementID)
 {

    try{
        //showMsg�����ļ�showMessage.js�еĺ���
		showMsg(msg,null,elementID);
	}catch(e){
		alert(msg);
	};
 }

/**
 *����checkFormAndField(fform,fieldID)
 *��֤form����Ч��
 *������form��������;fieldID,��Ԫ��ID
 *
 */
BFC.util.Validator.prototype.checkFormAndField=function(fform,elementID){
		//�ж�form��field��Ч��,���Ϊ�գ�����Ĭ�ϵ�form.
	if(fform==null){this.showError("����ָ����form��������");return false;};
	if(elementID==null){this.showError("����ָ���ı�Ԫ�ز�����");return false;};
	var formID=document.getElementById(fform);
	this.fieldID=document.getElementById(formID.id + ":" + elementID);
}

/**
 *����checkField(fieldID)
 *��֤form����Ч��
 *fieldID,��Ԫ��ID,�͸���֮ǰ��ʹ��document.getElementById()�õ���Ԫ��,Ȼ���͹���.
 * ˵������ߵĻ�����jsfҳ��Ҳ�ǿ����õ�,ֻ��Ԫ�ص�ID�Ƕ�һ��.
 */
BFC.util.Validator.prototype.checkField = function(fieldID)
{
	if(fieldID == null){
		this.showError("�������ڻ���ָ���ı�����");
		return false;
		};
	this.fieldID=fieldID;
	return true;
}
/*=================================================
*����Ϊ����֤����
==================================================
*/

/**����isNull()
 *��֤�ֶ��Ƿ�ǿգ������Ϊ��,����true.���򷵻�false.
 *������fform��id��elementID�����Ԫ����.
 *���ⲻ���鴫���Զ������ʾ��
 *<b>ע�⣬�����ұ�����˼��Ҫ��֤��ֵ��Ϊ�յ�ʱ�򷵻�true,Ϊ�յ�ʱ�򷵻�false.��Ա�һ�£���ҪŪ��</b>
 */
BFC.util.Validator.prototype.isNull=function(fform,elementID,tipMsg)
{
	//���ֻ��һ������,��ôȡ��һ������,��Ϊ������fieldID.

	if(typeof(arguments[0]) == "string"){
		var tips = arguments[2];
		this.checkFormAndField(fform,elementID);
		var fieldID = this.fieldID;
		var fieldValue = this.fieldID.value;
		if((fieldValue==null)||(fieldValue=="")){
			var msgs = "�˴�����Ϊ��,������ֵ";
			if(tips != null && tips != "undefined"){msgs = "������" + tips};
			this.showError(msgs,fieldID);
			return false;
		}
	}
	if(typeof(arguments[0]) == "object" ){
		this.checkField(arguments[0]);
		if(arguments[0].value =="" || arguments[0].value ==null){
			var msgs = "�˴�����Ϊ��,������ֵ";
			var tips = arguments[1];
			var fieldID = this.fieldID;
			if(tips != null && tips !="undefined"){msgs = "������" + tips};
			this.showError(msgs,fieldID);
			return false;
		};
	};
	return true;
}

/**
 *����isNum()
 *��֤�ֶ��Ƿ������֣����������,����true.���򷵻�false.
 *@param��fform��id��
 *@param: elementID�����Ԫ����.
 *@param: tipMsg,�Զ�������������Ҫ������ʾ�Ĺؼ��֣�������ͳһ������������.
 *���硡"����"������ͻ�����"����Ҫ�������ַ������Ǻ���,����������"
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
	 	if(tips!= null && tips != "undefined" && tips !="")this.showError("������"+tips,fieldID);
	 	else this.showError("����������",fieldID);
	 	return false;
	 	};
	 for (i=0;i<fieldValue.length;i++)
	 {
	  j=strTemp.indexOf(fieldValue.charAt(i));
	  if (j==-1)
	  {
	  //������ʱ
	  var msgs = "�˴�������������ֵ,����������";
	  if(tips != null && tips != "undefined"){msgs = tips + "��������ֵ,����������";}
	  else if(typeof(arguments[0]) == "object")
	  		{
	  		if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"����������ֵ,����������";
	 	}
	  this.showError(msgs,fieldID);
	  return false;
	 }

	 }
	 //����Ҫ��ʱ
	 return true;

}

/**���� isIntegerValue()
 *��֤�ֶ��Ƿ����������ͣ�����Ƿ���true,���򷵻�false.
 *@param:fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tips.�Զ�����ʾ.��ʾʱ��������ؼ��֣�
 *���������ﴫ�����Զ������.
 */
BFC.util.Validator.prototype.isIntegerValue=function(fform,elementID,tips)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	var index = fieldValue.indexOf('.');
	if(index >= 0 || isNaN(fieldValue)){
		  var msgs = "�˴�����������ֵ,����������";
	  //var tips = arguments[2];
	  if(arguments[2] != null){msgs = arguments[2] + "������������ֵ,����������";}
	  else if(typeof(arguments[0]) == "object"){
	  			if(arguments[1]!=null && arguments[1]!= "undefined")
	  			msgs = arguments[1]+"������������ֵ,����������";
	  }
	  this.showError(msgs,fieldID);
		return false;
	}
	else return true;
}

/**���� isPositiveInteger()
 *��֤�ֶ��Ƿ���������������Ƿ���true,���򷵻�false.
 *@param:fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tips.�Զ�����ʾ.��ʾʱ��������ؼ��֣�
 *���������ﴫ�����Զ������.
 */
BFC.util.Validator.prototype.isPositiveInteger=function(fform,elementID,tips)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	var r = /^[0-9]*[1-9][0-9]*$/ //������ 
	if(!r.test(fieldValue)){
		  var msgs = "�˴���������������,����������";
	  //var tips = arguments[2];
	  if(arguments[2] != null){msgs = arguments[2] + "������������,����������";}
	  else if(typeof(arguments[0]) == "object"){
	  			if(arguments[1]!=null && arguments[1]!= "undefined")
	  			msgs = arguments[1]+"������������,����������";
	  }
	  this.showError(msgs,fieldID);
		return false;
	}
	else return true;
}

/**���� isFloatValue()
 *��֤�ֶ��Ƿ���˫���ȸ������ͣ�����Ƿ���true,���򷵻�false.
 *@param : fform��id��
 *@param : elementID�����Ԫ����.
 *@pparam : tipMsg.�Զ�����ʾ.������ؼ��ּ��ɣ�
 *�˴������Զ�����ʾ��
 */
BFC.util.Validator.prototype.isFloatValue=function(fform,elementID,tipMsg)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	if(isNaN(fieldValue)){
	  var msgs = "�˴����������������ֵ,���������룮���磺88888.8888,��88888";
	  var tips = arguments[2];
	  if(tips != null){msgs = tips + "�����Ƿ�������ֵ,����������.";}
	  else if(typeof(arguments[0]) == "object"){
	  			if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"�����Ƿ�������ֵ,����������.";
	  		}
	  this.showError(msgs,fieldID);
		return false;
	}
	return true;
}

/**���� isNonNegativeFloatValue()
 *��֤�ֶ��Ƿ�������˫���ȸ�����������Ƿ���true,���򷵻�false.
 *@param : fform��id��
 *@param : elementID�����Ԫ����.
 *@pparam : tipMsg.�Զ�����ʾ.������ؼ��ּ��ɣ�
 *�˴������Զ�����ʾ��
 */
BFC.util.Validator.prototype.isNonNegativeFloatValue=function(fform,elementID,tipMsg)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	if(fieldValue<0 || isNaN(fieldValue)){
	  var msgs = "�˴���������Ǹ���ֵ,���������룮���磺88888.8888,��88888";
	  var tips = arguments[2];
	  if(tips != null){msgs = tips + "�����ǷǸ���ֵ,����������.";}
	  else if(typeof(arguments[0]) == "object"){
	  			if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"�����Ƿ�������ֵ,����������.";
	  		}
	  this.showError(msgs,fieldID);
		return false;
	}
	return true;
}

/**���� isFloatValueWithDigit()
 *��֤�ֶ��Ƿ��Ǿ�ȷ�����NλС����������ֵ���ͣ�����Ƿ���true,���򷵻�false.
 *@param : fform��id��
 *@param : elementID�����Ԫ����.
 *@param : digit �Զ���С��λ����
 *@param : tipMsg �Զ�����ʾ.������ؼ��ּ��ɣ�
 *�˴������Զ�����ʾ��
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
		var msgs = "�˴�����������ֵ����ྫȷ��" + in_digit + "λС�������������롣";
		tips = arguments[3];
		if(tips!=null && tips!=""){
			msgs = tips + "��������ֵ����ྫȷ��" + in_digit + "λС�������������롣";
		}
	
		this.showError(msgs,fieldID);
		return false;
	}
	return true;
}

/**����isEnglishChar()
 *��֤�ֶ��Ƿ���Ӣ���ַ�(��ĸ�����֣��»���)������Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg �Զ�����ʾ.������ؼ��֣�
 *���ⲻ�����Զ�����ʾ��
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

	  var msgs = "�˴���������Ӣ���ַ�(��ĸ�����֡��»���,��: fmcc��_fmcc��fmcc11��),����������.";
	  var tips = arguments[2];
	  if(tips != null){msgs = tips + ",ֻ�ܰ���Ӣ���ַ�(��ĸ�����֡��»���,��: fmcc��_fmcc��fmcc11��),����������";}
	  else{if(typeof(arguments[0]) == "object"){
	  	if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+",ֻ�ܰ���Ӣ���ַ�(��ĸ�����֡��»���,��: fmcc��_fmcc��fmcc11��),����������";}
	  };
	  this.showError(msgs,fieldID);
	  return false;
	}
}

/**����isChineseChar()
 *��֤�ֶ��Ƿ��������ַ�������Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *�˴��������Զ�����ʾ��
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
		var msgs = "�˴��������������ַ�,����������";
		var tips = arguments[2];
		if(tips != null && tips != "undefined"){ msgs = tips + "ֻ�ܰ��������ַ�,����������.";}
		else{if(typeof(arguments[0]) == "object"){
			if(arguments[1]!= null && arguments[1]!="undefined")msgs = arguments[1]+"ֻ�ܰ��������ַ�,����������.";
			}
		}
		this.showError(msgs,fieldID);return false;
		}
}
/**����isValidCustName()
 *��֤�ֶ��Ƿ��������ַ���Ӣ����ĸ�����֣�����Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *�˴��������Զ�����ʾ��
 */
BFC.util.Validator.prototype.isValidCustName=function(fform,elementID,tipMsg){
    if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value.trim();
	if (fieldValue == "") return true;
	var msgs = "(�ͻ���������ȷ��ֻ�����������ַ���Ӣ����ĸ�����ֺ����ţ�����������!)";	
	var tips = arguments[2]; 
	if(tips != null){
	    msgs = tips + ",ֻ�����������ַ���Ӣ����ĸ�����ֺ����ţ�����������!)";   
	}else if(typeof(arguments[0]) == "object"){
	  	if(arguments[1]!= null && arguments[1]!= "undefined") 
	  	    msgs = arguments[1]+"����ȷ��ֻ�����������ַ���Ӣ����ĸ�����ֺ����ţ�����������";
	};
	var c_2 = 0,c_4 = 0;
	var exp1 = new RegExp("^[A-Za-z]*$");
	var exp2 = new RegExp("^[0-9]*$");
	var exp3 = new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2D]*$");
	var exp4 = new RegExp("^[()|����]*$"); //add by zb 13852-1 ����ƥ������(ȫ�ǻ�)
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
		 this.showError("����ȫΪ���ֻ��ַ�������������!",fieldID);
		 return false;
	}
	return true;
}
/**isValidIDNum()
 *��֤�����֤���͵�֤�����룬������㷵��true�����򷵻�false.
 *@param : fform��id��
 *@param : elementID�����Ԫ������
 *@param : tips.�Զ�����ʾ��
 */
BFC.util.Validator.prototype.isValidIDNum=function(fform,elementID,tips)
{
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var fieldValue = this.fieldID.value;
	//���Ȳ���5λ
	if (fieldValue == "" || fieldValue.length < 5) {showMsg("��������ȷ��֤������!"); return false;}
	//У���Ƿ�Ϊ�Ȳ����У��������������ʾ
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
		showMsg("��������ȷ��֤������!"); return false;
	}
	return true;
}
/**isBetweenMinAndMaxLen()
 *��֤�ֶ��Ƿ����������С���ȣ�������㷵��true�����򷵻�false.
 *@param : fform��id��
 *@param : elementID�����Ԫ������
 *@param : min��̳���,max�����
 *@param : tips.�Զ�����ʾ��
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
	if(strLen<minLen){//С����С����
		var msgs = "�������û���ʵ����!";
		var tips = arguments[4];
		if(tips != null) { msgs = tips + ",�������û���ʵ����!"}
		this.showError(msgs,fieldID);
		return false;
	}
	if(strLen>maxLen){//������󳤶�
		var msgs = "�������û���ʵ����!";
		var tips = arguments[4];
		if(tips != null) { msgs = tips + ",�������û���ʵ����!"}
		this.showError(msgs,fieldID);
		return false;
	}
	return true;
}
/**����isLessThanMinLength()
 *��֤�ֶ��Ƿ�ﵽ��С���ȣ�������㷵��true�����򷵻�false.
 *@param : fform��id��
 *@param : elementID�����Ԫ������
 *@param : min��̳���
 *@param : tips.�Զ�����ʾ��
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
		var msgs = "�˴�����ĳ��Ȳ�������"+minLength+"λ,����������";
		var tips = arguments[3];
		if(tips !=null ){msgs = tips + "�ĳ��Ȳ�������"+minLength+"λ,����������.";}
		else{if(typeof(arguments[0]) == "object"){
				if(arguments[2]!= null && arguments[2]!= "undefined")msgs=arguments[2]+ "�ĳ��Ȳ�������"+minLength+"λ,����������.";
			}
		};
		this.showError(msgs,fieldID);
		return false;


	}
	return true;
}

/**����isMoreThanMaxLength()
 *��֤�ֶ��Ƿ񳬳���󳤶ȣ�����Ƿ���true�����򷵻�false.
 *@param : fform��id��
 *@param : elementID�����Ԫ������
 *@param : maxLength�����
 *@param : tipMsg.�Զ�����ʾ��
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
		var msgs = "�˴�����ĳ��Ȳ��ܴ���"+maxL+"λ�ַ�,����������.";
		var tips = arguments[3];
		if(tips !=null ){msgs = tips + "�ĳ��Ȳ��ܴ���"+maxL+"λ�ַ�,����������."}
		else if(typeof(arguments[0]) == "object"){
				if(arguments[2]!= null && arguments[2]!="undefined")msgs = arguments[2]+"�ĳ��Ȳ��ܴ���"+maxL+"λ�ַ�,����������.";
			}
		this.showError(msgs,fieldID);
		return false;
	}
	return true;
}
/**����getStrLength()
* �����ַ������ȣ�����һ���ַ�����Ϊ2��Ӣ�ĳ���Ϊ1
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
/**����isBetween()
 *��֤�ֶ��Ƿ�����������Χ֮��,����Ƿ���true,���򷵻�false.
 *@param��: fform��id��
 *@param : elementID�����Ԫ������
 *@param : min��Сֵ;
 *@param : max���ֵ
 *@param : tipMsg�Զ�����ʾ��������ؼ��֣�
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
		var msgs = "�������ֵ"+fieldValue+"С����Ҫ�����Сֵ:"+minValue+",����������";
		if(tips != null){msgs = "�������"+tips+"ֵ:"+fieldValue+"С����Ҫ�����Сֵ:"+minValue+",����������";}
		this.showError(msgs,fieldID);return false;
		}
	if(fieldValue>maxValue){
		var msgs = "�������ֵ"+fieldValue+"������Ҫ������ֵ:"+maxValue+",����������";
		if(tips != null){msgs = "�������"+tips+"ֵ:"+fieldValue+"������Ҫ������ֵ:"+maxValue+",����������";}
		this.showError(msgs,fieldID);return false;
		}
	if((fieldValue>=minValue)&&(fieldValue<=maxValue))return true;
}
/**����isEmail()
 *��֤����������ַ�Ƿ���Ч������Ƿ���true.���򷵻�false.
 *@param : fform��id��
 *@param : elementID�����Ԫ������
 *@param : tipMsg�Զ�����ʾ���˴��������Զ�����ʾ������Զ�����дȫ������ֱ�Ӵ���Ĭ�ϵģ�
 * Reference: Sandeep V. Tamhankar (stamhankar@hotmail.com),
 * http://javascript.internet.com
 */
BFC.util.Validator.prototype.isEmail=function(fform,elementID,tipMsg)
{
   var msgs =  "��������ȷ�������ַ(��: fmcc@fmcc.com)." ;
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

/**����isIDCardNo()
 *��֤���֤,��Ч���֤����ʾ��Ӧ���󷵻�false.��Ч�Ļ�����true.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *�˴��������Զ�����ʾ��
 * �ο� http://www.10189.net/ShowArticle.asp?ArticleID=125
 *��ֻ�ǽ����˾ֲ��޸������
 * ������һ��cusOpt�Ĳ�������������������ҵ��������ҵ���������֤�ĳ�����ʾ��Ϣ
 * ����ʱ�ķ�������jsValidator.isIDCardNo(icElement,"","","1") ���еĲ�����1�����Ƕ�ӦcusOpt
 */

BFC.util.Validator.prototype.isIDCardNo= function(fform,elementID,tipMsg,cusOpt)
{		
		tips = arguments[2];
		if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
		if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
		var fieldID = this.fieldID;
		var idcard = this.fieldID.value;
		var Errors = new Array(
			"��Ч���֤��ʽ:���֤����λ������,����������",
			"��Ч���֤��ʽ:���֤����������ڳ�����Χ���зǷ��ַ�������������",
			"��Ч���֤��ʽ:���֤��ʵ��У�鲻ͨ������ȷ������������󣬻�ȷ�����֤��α",
			"��Ч���֤��ʽ:���֤�����Ƿ�������������",
			"������֤������",
			"��������ȷ�����֤����!"
		);
		if(tips!=null && tips!="undefined" && tips!=""){
			Errors[0]=tips+"���֤����λ������,����������";
			Errors[1]=tips+"���֤����������ڳ�����Χ���зǷ��ַ�������������";
			Errors[2]=tips+"���֤��ʵ��У�鲻ͨ������ȷ������������󣬻�ȷ�����֤��α";
			Errors[3]=tips+"���֤�����Ƿ�������������";
			Errors[4]="������"+tips;
			Errors[5]=tips+"Ϊ��Ч�����֤���룬����������!";
		}
		var area = {11:"����",12:"���",13:"�ӱ�",14:"ɽ��",15:"���ɹ�",21:"����",22:"����",
					23:"������",31:"�Ϻ�",32:"����",33:"�㽭",34:"����",35:"����",36:"����",37:"ɽ��",
					41:"����",42:"����",43:"����",44:"�㶫",45:"����",46:"����",50:"����",51:"�Ĵ�",
					52:"����",53:"����",54:"����",61:"����",62:"����",63:"�ຣ",64:"����",65:"�½�",
					71:"̨��",81:"���",82:"����",91:"����"
				}

		var Y,JYM;
		var S,M;
		var idcard_array = new Array();
		if(idcard == ""){//�ж��Ƿ��������
			if(cusOpt=='1'){
				this.showError(Errors[5],fieldID);
				return false;
			}else{
				this.showError(Errors[4],fieldID);
				return false;
			}
		}
		idcard_array = idcard.split("");
		//��������
		if(area[parseInt(idcard.substr(0,2))]==null){
			if(cusOpt=='1'){
				this.showError(Errors[5],fieldID);
				return false;
			}else{
				this.showError(Errors[3],fieldID);
		 		return false;
			}
		 }
		//��ݺ���λ������ʽ����
		switch(idcard.length){
		case 15:
				if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
				ereg=/^[1-9][0-9]{5}[1-9][0-9]((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//���Գ������ڵĺϷ���
				} else {
				ereg=/^[1-9][0-9]{5}[1-9][0-9]((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//���Գ������ڵĺϷ���
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
				//18λ��ݺ�����
				//�������ڵĺϷ��Լ��
				//��������:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
				//ƽ������:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
				var idcardDate = idcard.substr(6,8)+"000000";
				var nowDate = BFC.util.Time.getToday();
				//������1910/01/01����ǰ����
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
					ereg=/^[1-9][0-9]{5}(19|2[0-9])[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//����������ڵĺϷ���������ʽ
				} else {
					ereg=/^[1-9][0-9]{5}(19|2[0-9])[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//ƽ��������ڵĺϷ���������ʽ
				}
				if(ereg.test(idcard)){//���Գ������ڵĺϷ���
					//����У��λ
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
					M = JYM.substr(Y,1);//�ж�У��λ��ǰֻ��������ĸX��x.
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

/**����isHKIDCardNo() add 17032 by zb
 *��֤������֤,��Ч��ʾ��Ӧ���󷵻�false.��Ч�Ļ�����true.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *�˴��������Զ�����ʾ��
 */
 
BFC.util.Validator.prototype.isHKIDCardNo= function(fform,elementID,tipMsg){
 	 	tips = arguments[2];
		if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
		if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
		var fieldID = this.fieldID;
		var idcard = this.fieldID.value;
		
		var Errors = new Array(
			"��Ч���֤��ʽ:���֤����λ������,����������",
			"��Ч���֤��ʽ:���֤�����Ƿ����ֻ��зǷ��ַ�������������",
			"��Ч���֤��ʽ:���֤��ʽ���ԣ���ȷ�������ʽ��������������",
			"������֤������"
		);
		if(tips!=null && tips!="undefined" && tips!=""){
			Errors[0]=tips+"���֤����λ������,����������";
			Errors[1]=tips+"���֤�����Ƿ����ֻ��зǷ��ַ�������������";
			Errors[2]=tips+"���֤��ʵ��У�鲻ͨ������ȷ������������󣬻�ȷ�����֤��α";
			Errors[4]="������"+tips;
		}
		if(idcard == ""){//�ж��Ƿ��������
			this.showError(Errors[3],fieldID);
			return false;
		}
		if(idcard.length != '10' && idcard.length != '11'){//У��λ��
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
/**����isMacauIDCardNo() add 17032 by zb
 *��֤�������֤,��Ч��ʾ��Ӧ���󷵻�false.��Ч�Ļ�����true.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *�˴��������Զ�����ʾ��
 */
 
BFC.util.Validator.prototype.isMacauIDCardNo= function(fform,elementID,tipMsg){
 	 	tips = arguments[2];
		if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
		if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
		var fieldID = this.fieldID;
		var idcard = this.fieldID.value;
		var Errors = new Array(
			"��Ч���֤��ʽ:���֤����λ������,����������",
			"��Ч���֤��ʽ:���֤�����Ƿ����ֻ��зǷ��ַ�������������",
			"��Ч���֤��ʽ:���֤��ʽ���ԣ���ȷ�������ʽ��������������",
			"������֤������"
		);
		if(tips!=null && tips!="undefined" && tips!=""){
			Errors[0]=tips+"���֤����λ������,����������";
			Errors[1]=tips+"���֤�����Ƿ����ֻ��зǷ��ַ�������������";
			Errors[2]=tips+"���֤��ʵ��У�鲻ͨ������ȷ������������󣬻�ȷ�����֤��α";
			Errors[4]="������"+tips;
		}
		if(idcard == ""){//�ж��Ƿ��������
			this.showError(Errors[3],fieldID);
			return false;
		}
		if(idcard.length != '10'){//У��λ��
			this.showError(Errors[0],fieldID);
			return false;
		}
		var rowPattern = /^\d{1}[\/]\d{6}[\/]\d{1}$/; //��ʽ�İ������֤��ʽ
		var rowPattern2 = /^\d{7}[(]\d{1}[)]$/; //��ʽ�İ������֤��ʽ
		if(rowPattern.test(idcard) || rowPattern2.test(idcard)){
			return true;
		}else{
			this.showError(Errors[1],fieldID);
			return false;			
		}
		
 }

/**����isHKMacauPassNo()
 *��֤�۰ľ��������ڵ�ͨ��֤,��Ч��ʾ��Ӧ���󷵻�false.��Ч�Ļ�����true.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *�˴��������Զ�����ʾ��
 */ 
BFC.util.Validator.prototype.isHKMacauPassNo= function(fform,elementID,tipMsg){
	tips = arguments[2];
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var idcard = this.fieldID.value;
	var msgs = "��Ч�۰ľ��������ڵ�ͨ��֤,����������";
	if(tips != null){msgs = tips + "Ϊ��Ч�۰ľ��������ڵ�ͨ��֤,����������."}
	if(idcard == ""){//�ж��Ƿ��������
		this.showError(msgs,fieldID);
		return false;
	}
	if(idcard.length != '9' && idcard.length != '11'){//У��λ��
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

/**����isHKMacauPassNo()
 *��̨֤�����������½ͨ��֤,��Ч��ʾ��Ӧ���󷵻�false.��Ч�Ļ�����true.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *�˴��������Զ�����ʾ��
 */ 
BFC.util.Validator.prototype.isTaiWanPassNo= function(fform,elementID,tipMsg){
	tips = arguments[2];
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var idcard = this.fieldID.value;
	var msgs = "��Ч̨�����������½ͨ��֤,����������";
	if(tips != null){msgs = tips + "Ϊ��Ч̨�����������½ͨ��֤,����������."}
	
	if(idcard == ""){//�ж��Ƿ��������
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

/**����checkIcNoByIcType()
 *����֤��������֤֤�����루֤�����Ͷ���������ֵ�1101 4����,��Ч��ʾ��Ӧ���󷵻�false.��Ч�Ļ�����true.
 *@param ��fform��id��
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *@param : cusOpt.������־1-�ǣ�
 *���������Զ�����ʾ��
 */ 
BFC.util.Validator.prototype.checkIcNOByIcType= function(icType,fform,elementID,tipMsg,cusOpt){
	tips = arguments[3];
	if(typeof(arguments[1]) == "object"){this.checkField(arguments[1]);};
	if(typeof(arguments[1]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var icNO = this.fieldID.value;
	if(!tips)tips="�������";
	switch(parseInt(icType)) {
	case 1:	//���֤
		if(!this.isIDCardNo(fform,elementID,tipMsg,cusOpt))return false;
		break;
	case 2:	//����֤
	case 3:	//����
	//case 10:	//����֤��
	case 11:	//ʿ��֤
	case 12:	//���񾯲�֤
		if(icNO.length<6){
			this.showError(tips+"Ϊ��Ч��֤�����룬����������",fieldID);
			return false;
		}
		break;
	case 13:	//̨�����������½ͨ��֤
		if(!this.isTaiWanPassNo(fform,elementID,tipMsg))return false;
		break;
	case 22:	//���ڲ�
	case 23:	//��ʱ���֤
		if(!this.isIDCardNo(fform,elementID,tipMsg,cusOpt))return false;
		break;
	case 31:	//������֤
		if(!this.isHKIDCardNo(fform,elementID,tipMsg))return false;
		break;
	case 32:	//�������֤
		if(!this.isMacauIDCardNo(fform,elementID,tipMsg))return false;
		break;
	case 33:	//�۰ľ��������ڵ�ͨ��֤	
		if(!this.isHKMacauPassNo(fform,elementID,tipMsg))return false;
		break;	
	}
	return true;		
}

/**����checkUnitIcNoByIcType()
 *����֤��������֤��λ֤�����루֤�����Ͷ���������ֵ�1101 61��,��Ч��ʾ��Ӧ���󷵻�false.��Ч�Ļ�����true.
 *@param ��fform��id��
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ
 *���������Զ�����ʾ��
 */ 
BFC.util.Validator.prototype.checkUnitIcNoByIcType= function(icType,fform,elementID,tipMsg){
	tips = arguments[3];
	if(typeof(arguments[1]) == "object"){this.checkField(arguments[1]);};
	if(typeof(arguments[1]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var icNO = this.fieldID.value;
	var exp1 =  /^[A-Z0-9\-]*$/;//Ϊ���֡���-�����ַ����д������ĸ��
	var incldeNumAmount = this.getIncludeCharAmount(icNO, "Number");
	var msgs  = "��Ч��֤�����룬����������";
	if(tips) msgs  = tips+"Ϊ��Ч��֤�����룬����������";
	switch(parseInt(icType)) {
	case 51:	//��֯��������֤
		if(icNO.length<9 || !exp1.test(icNO)){
			this.showError(msgs,fieldID);
			return false;			
		}
		break;	
	case 52:	//Ӫҵִ��
	case 53:	//��ҵ��λ����֤��
	case 54:	//������巨�˵Ǽ�֤��
		if(incldeNumAmount<4){
			this.showError(msgs,fieldID);
			return false;			
		}
		break;	
	case 55:	//������
	}
	return true;		
}

/**����checkCustNameByIcType()
 *����֤��������֤�ͻ�������֤�����Ͷ���������ֵ�1101 4����,��Ч��ʾ��Ӧ���󷵻�false.��Ч�Ļ�����true.
 *@param ��fform��id��
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *���������Զ�����ʾ��
 */ 
BFC.util.Validator.prototype.checkCustNameByIcType= function(icType,fform,elementID,tipMsg){
	tips = arguments[3];
	if(typeof(arguments[1]) == "object"){this.checkField(arguments[1]);};
	if(typeof(arguments[1]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var nameString = this.fieldID.value;
	if(!tips)tips="�������";
	var ChineseAmount = this.getIncludeCharAmount(nameString,"Chinese");
	var exp1 = /^[A-Za-z0-9()����\.\u4E00-\u9FA5\uF900-\uFA2D]*$/;//�����ַ�+��.��+������+������
	
	var length4Byte = this.getStrLength(nameString);
	switch(parseInt(icType)) {
	case 1:	//���֤
	case 2:	//����֤
		if(!exp1.test(nameString)){
			this.showError(tips+"Ϊ��Ч�����֣�ֻ�����������ַ���Ӣ����ĸ�����֡���ź����ţ�����������",fieldID);
			return false;
		}
		if(ChineseAmount<2){
			this.showError(tips+"Ϊ��Ч�����֣�������ڵ���2�����֣�����������",fieldID);
			return false;
		}
		break;
	case 3:	//����
		if(length4Byte<4 || this.getNumStringType(nameString) != "NONUM"){
			this.showError(tips+"Ϊ��Ч�����֣��������3���ַ����Ҳ���ȫΪ���������֣�����������",fieldID);
			return false;
		}
		break;
	//case 10:	//����֤��
	case 11:	//ʿ��֤
	case 12:	//���񾯲�֤
	case 13:	//̨�����������½ͨ��֤
	case 22:	//���ڲ�
	case 23:	//��ʱ���֤
	//case 31:	//������֤
	//case 32:	//�������֤
	case 33:	//�۰ľ��������ڵ�ͨ��֤
		if(!exp1.test(nameString)){
			this.showError(tips+"Ϊ��Ч�����֣�ֻ�����������ַ���Ӣ����ĸ�����֡���ź����ţ�����������",fieldID);
			return false;
		}
		if(ChineseAmount<2){
			this.showError(tips+"Ϊ��Ч�����֣�������ڵ���2�����֣�����������",fieldID);
			return false;
		}
		break;
	}
	return true;		
}

/**����checkAddressByIcType()
 *����֤��������֤��ַ��֤�����Ͷ���������ֵ�1101 4����,��Ч��ʾ��Ӧ���󷵻�false.��Ч�Ļ�����true.
 *@param ��fform��id��
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *���������Զ�����ʾ��
 */ 
BFC.util.Validator.prototype.checkAddressByIcType= function(icType,fform,elementID,tipMsg){
 	tips = arguments[3];
	if(typeof(arguments[1]) == "object"){this.checkField(arguments[1]);};
	if(typeof(arguments[1]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var addressString = this.fieldID.value;
	if(!tips)tips="�������";
	var ChineseAmount = this.getIncludeCharAmount(addressString,"Chinese");
	switch(parseInt(icType)) {
	case 1:	//���֤
	case 2:	//����֤
		if(ChineseAmount<8){
			this.showError(tips+"Ϊ��Ч�ĵ�ַ������ڵ���8�����֣�����������",fieldID);
			return false;
		}
		break;
	case 3:	//����
		if(ChineseAmount<2){
			this.showError(tips+"Ϊ��Ч�ĵ�ַ������ڵ���2�����֣�����������",fieldID);
			return false;
		}
		break;
	//case 10:	//����֤��
	case 11:	//ʿ��֤
	case 12:	//���񾯲�֤
		if(ChineseAmount<8){
			this.showError(tips+"Ϊ��Ч�ĵ�ַ������ڵ���8�����֣�����������",fieldID);
			return false;
		}
		break;
	case 13:	//̨�����������½ͨ��֤
		if(ChineseAmount<3){
			this.showError(tips+"Ϊ��Ч�ĵ�ַ������ڵ���3�����֣�����������",fieldID);
			return false;
		}
		break;
	case 22:	//���ڲ�
	case 23:	//��ʱ���֤
	//case 31:	//������֤
	//case 32:	//�������֤
	case 33:	//�۰ľ��������ڵ�ͨ��֤
		if(ChineseAmount<8){
			this.showError(tips+"Ϊ��Ч�ĵ�ַ������ڵ���8�����֣�����������",fieldID);
			return false;
		}
		break;
	}
	return true;		
}

/**����getIncludeCharAmount()
 *��ȡ�ַ�����ָ�������ַ�����
 *@param ��charString У����ַ�����
 *@param : checkCharType ָ�����ַ������͡�Chinese��-���ģ�Ĭ�����ͣ���
 *										��English��-Ӣ�ģ������ִ�Сд����
 *										��EnglishSmall��-Ӣ�ģ�Сд����
 *										��EnglishBig��-Ӣ�ģ���д����
 *										��Number��-���֣�
 *										�����Զ���
 *@param : tipMsg.�Զ�����ʾ.
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

/**����isEqual()
 *��֤���ε�ֵ�Ƿ���ͬ,��ͬ����true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ��
 *�˴�����ʹ���Զ�����ʾ������"XX��XX"
 */
BFC.util.Validator.prototype.isEqual=function(fform,elementID1,elementID2,tipMsg)
{

	if(typeof(arguments[0]) == "string"){
	    //�ж�form��field��Ч��,���Ϊ�գ�����Ĭ�ϵ�form.
		if(fform==null){this.showError("����ָ����form������");return false};
		if(elementID1==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
	    if(elementID2==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
		var formID=document.getElementById(fform);
		var elem1 = document.getElementById(formID.id + ":" + elementID1);
		var elem2 = document.getElementById(formID.id+":" + elementID2);
		if((elem1.value!=null)&&(elem2.value!=null))
		{
			if(elem1.value == elem2.value)return true;
			else{
				var msgs = "������������ֶ�ֵ��"+elem1.value+"��"+elem2.value+",����ȣ����������룮";
				var tips = arguments[3];
				if(tips != null){msgs = "�������"+tips+"��ֵ:"+elem1.value+"��"+elem2.value+"����ȣ�����������";};
				this.showError(msgs,elem1);
				return false;
				}
		}
	}
	//��ָ��form,����������element����getElementById�õ���Ԫ�ر���.
	if(typeof(arguments[0]) == "object" )
	{
		if(arguments[0].value != arguments[1].value){
			var msgs = "������������ֶ�ֵ:��"+arguments[0].value+"��"+arguments[1].value+",�����,���������룮";
			var tips = arguments[2];
			if(tips != null){msgs = "�������"+tips+"��ֵ:"+arguments[0].value+"��"+arguments[1].value+"����ȣ�����������"};
			this.showError(msgs,arguments[0]);
			return false;
		}
		else {return true;}
	}
}

/**����isIP()
 *��֤�Ƿ��ǺϷ�IP,��ЧIP������true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg�Զ�����ʾ���˴��������Զ�����ʾ��
 */

BFC.util.Validator.prototype.isIp=function(fform,elementID,tipMsg){

	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var ip=this.fieldID.value;
	//δ���ǵ�1��IP����Ϊ0�����
	//var reg = /^��(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]��\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	//var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var msgs = "��Ч��IP��ַ��ʽ,����������";
	var tips = arguments[2];
	if(tips != null){msgs = tips + "Ϊ��Ч��IP��ַ��ʽ,����������."}
	else{if(typeof(arguments[0]) == "object"){
		if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"Ϊ��Ч��IP��ַ��ʽ,����������."}
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
 * �Ƿ��ֻ������ж�
 * @mobileNo �ֻ����� ���ɿ�
 * @is_yd boolean �ɿ�
 * BFC.util.Validator�й����ֻ�������жϣ���������������Ա�ͳһ����Ŷ�
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
/**����isIMSPhoneOrMobileNo()
 *��֤�Ƿ��ǵ绰����,�������ֻ�����,Ҳ������IMS�̻�����,��Ч���뷵��true,���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg �Զ�����ʾ���˴������Զ�����ʾ��������ؼ��֣�
 *��(1)IMS�̻�����Ϊ10λ
 *��(2)�ƶ��绰����Ϊ11λ
 */
BFC.util.Validator.prototype.isIMSPhoneOrMobileNo=function(fform,elementID,tipMsg) {
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
    var phoneNo = this.fieldID.value;	
	var reg =/(^59[0-9]{8,9}$)/;
	if(reg.test(phoneNo)||BFC.util.Validator.prototype.isMobile(phoneNo)){return true;}
	else{
		var msgs = "��Ч���ֻ������IMS�̻�����,����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "Ϊ��Ч���ֻ������IMS�̻�����,����������.";}
		else{if(typeof(arguments[0]) == "object"){
		if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"Ϊ��Ч���ֻ������IMS�̻�����,����������.";
		}
    };
	this.showError(msgs,fieldID);return false;};
}

/**����isPhoneOrMobileNo()
 *��֤�Ƿ��ǵ绰����,�������ֻ�����,Ҳ��������ͨ�绰����,��Ч�ֻ����뷵��true,���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg �Զ�����ʾ���˴������Զ�����ʾ��������ؼ��֣�
 *��(1)�绰���������֡�"("��")"��"-"����
 *��(2)�绰����Ϊ3��8λ
 *��(3)����绰�����а��������ţ���ô����Ϊ��λ����λ
 *��(4)������"("��")"��"-"���������ָ���
 *��(5)�ƶ��绰����Ϊ11��12λ�����Ϊ12λ,��ô��һλΪ0
 *��(6)11λ�ƶ��绰����ĵ�һλ�͵ڶ�λΪ"13"
 *��(7)12λ�ƶ��绰����ĵڶ�λ�͵���λΪ"13"
 *��(��)����159��ͷ���ֻ���
 *  (9)����147��ͷ���ֻ��ж� 23822 add
 * <b>ע�⣬����ĵ绰���벻�������������ǳ��õĹ̶��绰���룬Ҳ����������ĵ绰���룬��186,�ȵȵĵ绰��</b>
 */
BFC.util.Validator.prototype.isPhoneOrMobileNo=function(fform,elementID,tipMsg) {
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var phoneNo = this.fieldID.value;
	var reg=/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)/
	if(reg.test(phoneNo)||BFC.util.Validator.prototype.isMobile(phoneNo)){return true;}
	else{
		var msgs = "��Ч���ֻ������绰����,����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "Ϊ��Ч���ֻ������绰����,����������.";}
		else{if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"Ϊ��Ч���ֻ������绰����,����������.";
			}
		};
		this.showError(msgs,fieldID);return false;};
}
/**����isPhoneOrMobileNo4CSP()
 *��֤�Ƿ��ǵ绰����,�������ֻ�����,Ҳ��������ͨ�绰����,��Ч�ֻ����뷵��true,���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg �Զ�����ʾ���˴������Զ�����ʾ��������ؼ��֣�
 *��(1)�绰�����а��������ţ���ô����Ϊ��λ����λ,�̻�����Ϊ��λ����λ
 *��(2)�ƶ��绰����Ϊ11��12λ�����Ϊ12λ,��ô��һλΪ0
 *��(3)11λ�ƶ��绰����ĵ�һλ�͵ڶ�λΪ"13"
 *��(4)12λ�ƶ��绰����ĵڶ�λ�͵���λΪ"13"
 *��(5)����159��ͷ���ֻ���
 *  (6)����147��ͷ���ֻ��ж� 23822 add
 * <b>ע�⣬����ĵ绰���벻�������������ǳ��õĹ̶��绰���룬Ҳ����������ĵ绰���룬��186,�ȵȵĵ绰��</b>
 */
BFC.util.Validator.prototype.isPhoneOrMobileNo4CSP=function(fform,elementID,tipMsg) {
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var phoneNo = this.fieldID.value;
	var reg=/(^0[0-9]{5,11}$)/;
	if(reg.test(phoneNo)||BFC.util.Validator.prototype.isMobile(phoneNo)){return true;}
	else{
		var msgs = "��Ч���ֻ������绰����,����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "Ϊ��Ч���ֻ������绰����,����������.";}
		else{if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"Ϊ��Ч���ֻ������绰����,����������.";
			}
		};
		this.showError(msgs,fieldID);return false;};
}
/**����isMobileNo()
 *��֤�Ƿ����ֻ�����,����Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ���˴��������Զ�����ʾ��
 *0138888888888;
 *����159��ͷ���ֻ��ж�
 *����188��ͷ���ֻ��ж� td�û� add by webber
 *����147��ͷ���ֻ��ж� 23822 add
 *29876 ����189�Ŷ�
 */
BFC.util.Validator.prototype.isMobileNo = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var mobileNo = this.fieldID.value;
	if(BFC.util.Validator.prototype.isMobile(mobileNo)){return true;}
	else{
		var msgs = this.MOBILE_TIP+",����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + this.MOBILE_TIP+",����������";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+this.MOBILE_TIP+",����������."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**����isMobileNo13()
 *��֤�Ƿ���11λ��13λ����,����Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ���˴��������Զ�����ʾ��
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
		var msgs = this.MOBILE_TIP+",����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + this.MOBILE_TIP+",����������";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+this.MOBILE_TIP+",����������."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**����isMobileNumber()
 *��֤�Ƿ����ƶ��ֻ�����,����Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ���˴��������Զ�����ʾ��
 *0138888888888;
 *add by yuxing
 *����187��ͷ���ֻ��ж� 
 */
BFC.util.Validator.prototype.isMobileNumber = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var mobileNo = this.fieldID.value;	
	if(BFC.util.Validator.prototype.isMobile(mobileNo,true)){return true;}
	else{
		var msgs = this.MOBILE_TIP_YD+",����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + this.MOBILE_TIP_YD+",����������";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+this.MOBILE_TIP_YD+",����������."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**����isCmcc 
 *��֤�Ƿ����ƶ��ֻ�����,����Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
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
/**����isSIDNo()
 *��֤�Ƿ����ֻ��Ŷ�,����Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ���˴��������Զ�����ʾ��
 *0138888888888;
 *����159��ͷ���ֻ��ж�
 *����188��ͷ���ֻ��ж� td�û� add by webber
 *����147��ͷ���ֻ��ж� 23822 add
 *����187��ͷ���ֻ��ж� 27988 add
 *����189�Ŷ� 29876 
 */
BFC.util.Validator.prototype.isSIDNo = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var mobileNo = this.fieldID.value;
	if(BFC.util.Validator.prototype.isMobile(mobileNo)){return true;}
	else{
		var msgs = this.MOBILE_TIP+",����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + this.MOBILE_TIP+",����������.";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+this.MOBILE_TIP+",����������."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**����isPhoneNo()
 *��֤�Ƿ��ǵ绰����,����Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ.
 *(1)�绰���������֡�"("��")"��"-"����
 *(2)�绰����Ϊ3��8λ
 *(3)����绰�����а��������ţ���ô����Ϊ��λ����λ
 *(4)������"("��")"��"-"���������ָ��� ,����3λ��4λ
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
		var msgs = "��Ч�ĵ绰����,����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "Ϊ��Ч�ĵ绰����,����������.";}
		else{if(typeof(arguments[0]) == "object"){
			if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"Ϊ��Ч�ĵ绰����,����������."
			}
		};
		this.showError(msgs,fieldID);return false;
		};
}
/**����isCompanyPhoneNo()
 *��֤�Ƿ��ǵ绰����,����Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ.
 *(1)�绰���������֡�"("��")"��"-"����
 *(2)�绰����Ϊ3��8λ
 *(3)����绰�����а��������ţ���ô����Ϊ��λ����λ
 *(4)������"("��")"��"-"���������ָ��� ,����3λ��4λ
 *(5)���벻��13��15��ͷ
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
		var msgs = "�ô���ϵ�绰����ֻ������̻�,����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "����ֻ������̻�,����������.";}
		else{if(typeof(arguments[0]) == "object"){
			if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"����ֻ������̻�,����������."
			}
		};
		this.showError(msgs,fieldID);return false;
		};
}
/**����isConnectPhoneNo()
 *��֤�Ƿ��ǵ绰����,����Ƿ���true.���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ.
 *����ڵ���7λ���������֣���ֻ��Ϊ���������֣�����Ϊͬһ���ֻ���˳���������֡�
 */
BFC.util.Validator.prototype.isConnectPhoneNo = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var phoneNo = this.fieldID.value.trim();
	var num_type = this.getNumStringType(phoneNo);
	if(phoneNo.length<7 || num_type != "GENERAL"){
		var msgs = "��Ч�ĵ绰����,����������.";
		var tips = arguments[2];
		if(tips != null){
			msgs = tips + "Ϊ��Ч�ĵ绰����,����������.";
		}else{
			if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")
					msgs = arguments[1]+"Ϊ��Ч�ĵ绰����,����������.";
			}
		}
		this.showError(msgs,fieldID);
		return false;
	}else{
		return true;
	}
}
/**����getNumStringType()
 *�ж������ַ�����ʽ
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg.�Զ�����ʾ.
 *@return: DESC-����(���һ��)��ASC-����(���һ��)��SAME-����ͬ��NONUM-�������ַ���,GENERAL-һ������ִ�
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

/**����isPostCode()
 *��֤�Ƿ�����������,����Ƿ���true.���򷵻�false.
 *@param : fform��ID;
 *@param : elementID�����Ԫ��.Ҳ����ֻ��һ������,��Ҫ��֤�͹�����ֵ��Ԫ�ؿ���ȡ����ID.
 *@param : tipMsg.�Զ�����ʾ��
 * ����ֻ��֤�ʱ��6λ�Ƿ�ȫ������,��û���ϸ��У��,���㷨�д���һ����ǿ.
 */
BFC.util.Validator.prototype.isPostCode = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var postCode = this.fieldID.value;
	var reg = /^\d{6}$/;
	if(reg.test(postCode)){return true;}
	else{
		var msgs = "��Ч����������,����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "Ϊ��Ч����������,����������.";}
		else{
			if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"Ϊ��Ч����������,����������."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}

/**����isGroupId()
 *��֤�Ƿ��Ǽ��ű���,����Ƿ���true.���򷵻�false.
 *@param : fform��ID;
 *@param : elementID�����Ԫ��.Ҳ����ֻ��һ������,��Ҫ��֤�͹�����ֵ��Ԫ�ؿ���ȡ����ID.
 *@param : tipMsg.�Զ�����ʾ��
 */
BFC.util.Validator.prototype.isGroupId = function(fform,elementID,tipMsg){
	if(typeof(arguments[0]) == "object"){this.checkField(arguments[0]);};
	if(typeof(arguments[0]) == "string"){this.checkFormAndField(fform,elementID);};
	var fieldID = this.fieldID;
	var postCode = this.fieldID.value;
	var reg = /^\d{10,11}$/;
	if(reg.test(postCode)){return true;}
	else{
		var msgs = "��Ч�ļ��ű���,����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "Ϊ��Ч�ļ��ű���,����������.";}
		else{
			if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"Ϊ��Ч�ļ��ű���,����������."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**
 *����isDateLessThan.ǰ���ֵС�ں����ֵ��(��������)
 *���ǰ�ߵ�����С�ں��ߵ����ڷ���true;���򷵻�false.
 *@param fform : ��ID;
 *@param elementID1:�����Ԫ��.Ҳ����ֻ��һ������,��Ҫ��֤�͹�����ֵ��Ԫ�ؿ���ȡ����ID.
 *@param elementID2:ͬelementID1.
 *@param tipMsg:�Զ�����ʾ�������Զ�����ʾ��
 *���ڿ����õ����ڿؼ�,��������ٻ��Խ���.
 */
BFC.util.Validator.prototype.isDateLessThan = function(fform,elementID1,elementID2,tipMsg){

	if(typeof(arguments[0]) == "string"){
	    //�ж�form��field��Ч��,���Ϊ�գ�����Ĭ�ϵ�form.
		if(fform==null){this.showError("����ָ����form������");return false};
		if(elementID1==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
	    if(elementID2==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
		var formID=document.getElementById(fform);
		var elem1 = document.getElementById(formID.id + ":" + elementID1);
		var elem2 = document.getElementById(formID.id+":" + elementID2);
		if((elem1.value!=null)&&(elem2.value!=null))
		{
			var elemValue1 = elem1.value.replace("-","/").replace("-","/");
			var elemValue2 = elem2.value.replace("-","/").replace("-","/");
			if(Date.parse(elemValue1) <= Date.parse(elemValue2))return true;
			else{
			var msgs = "��ֹ���ڲ������ڿ�ʼ����,����������";
			var tips = arguments[3];
			if(tips != null && tips!= "undefined"){msgs = tips + ",����������.";}
			this.showError(msgs);return false;
			}
		}
	}
	//��ָ��form,����������element����getElementById�õ���Ԫ�ر���.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		var elemValue1 = arguments[0].value.replace("-","/").replace("-","/");
		var elemValue2 = arguments[1].value.replace("-","/").replace("-","/");
		if(Date.parse(elemValue1) <= Date.parse(elemValue2))return true;
		else {
			var msgs = "��ֹ���ڲ������ڿ�ʼ����,����������";
			var tips = arguments[2];
			if(tips != null){msgs = tips+"�����������룮";}
			this.showError(msgs);
			return false;
		}
	}
}

/**
 *����isMonthLessThan.ǰ���ֵС�ں����ֵ��(��������)
 *���ǰ�ߵ�����С�ں��ߵ����ڷ���true;���򷵻�false.
 *@param fform : ��ID;
 *@param elementID1:�����Ԫ��.Ҳ����ֻ��һ������,��Ҫ��֤�͹�����ֵ��Ԫ�ؿ���ȡ����ID.
 *@param elementID2:ͬelementID1.
 *@param tipMsg:�Զ�����ʾ�������Զ�����ʾ��
 *���ڿ����õ����ڿؼ�,��������ٻ��Խ���.
 */
BFC.util.Validator.prototype.isMonthLessThan = function(fform,elementID1,elementID2,tipMsg){
	var month1 = "";
	var month2 = "";
	if(typeof(arguments[0]) == "string"){
	    //�ж�form��field��Ч��,���Ϊ�գ�����Ĭ�ϵ�form.
		if(fform==null){this.showError("����ָ����form������");return false};
		if(elementID1==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
	    if(elementID2==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
		var formID=document.getElementById(fform);
		var elem1 = document.getElementById(formID.id + ":" + elementID1);
		var elem2 = document.getElementById(formID.id+":" + elementID2);
		if((elem1.value!=null)&&(elem2.value!=null))
		{
			month1 = BFC.util.Time.getDateOnlyFormated2(elem1.value).substring(0,8) + "01";
			month2 = BFC.util.Time.getDateOnlyFormated2(elem2.value).substring(0,8) + "01";
			if(Date.parse(month1) <= Date.parse(month2))return true;
			else{
			var msgs = "��ֹ���ڲ������ڿ�ʼ����,����������";
			var tips = arguments[3];
			if(tips != null && tips!= "undefined"){msgs = tips + ",����������.";}
			this.showError(msgs);return false;
			}
		}
	}
	//��ָ��form,����������element����getElementById�õ���Ԫ�ر���.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		month1 = BFC.util.Time.getDateOnlyFormated2(arguments[0].value).substring(0,8) + "01";
		month2 = BFC.util.Time.getDateOnlyFormated2(arguments[1].value).substring(0,8) + "01";
		if(Date.parse(month1) <= Date.parse(month2))return true;
		else {
			var msgs = "��ֹ���ڲ������ڿ�ʼ����,����������";
			var tips = arguments[2];
			if(tips != null){msgs = tips+"�����������룮";}
			this.showError(msgs);
			return false;
		}
	}
}

/**
 *����isValueLessThan
 *@param fform : ��ID;
 *@param elementID1:�����Ԫ��.Ҳ����ֻ��һ������,��Ҫ��֤�͹�����ֵ��Ԫ�ؿ���ȡ����ID.
 *@param elementID2:ͬelementID1.
 *@param tipMsg:�Զ�����ʾ�������Զ�����ʾ��
 */
BFC.util.Validator.prototype.isValueLessThan = function(fform,element1,element2,tipMsg)
{
	//����form �� element
	if(typeof(arguments[0]) == "string"){
		if(fform==null){this.showError("����ָ����form������");return false};
		if(element1==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
	    if(element2==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
		var formID=document.getElementById(fform);
		var elem1 = document.getElementById(formID.id + ":" + element1);
		var elem2 = document.getElementById(formID.id + ":" + element2);
		if((elem1.value!=null)&&(elem2.value!=null))
		{
			if(elem1.value*1 < elem2.value*1)return true;
			else{
			var msgs = "���������ֵ��Ҫ����ǰ�������ֵ,����������";
			var tips = arguments[3];
			if(tips != null){msgs = tips + ",����������.";}
			this.showError(msgs,elem1);return false;
			}
		}
	}
	//��ָ��form,����������element����getElementById�õ���Ԫ�ر���.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		if(arguments[0].value*1 < arguments[1].value*1)return true;
		else {
			var msgs = "���������ֵ��Ҫ����ǰ�������ֵ,����������";
			var tips = arguments[2];
			if(tips != null){msgs = tips+"�����������룮";}
			this.showError(msgs,arguments[0]);
			return false;
		}
	}
}
/**
 *����isHomeArea,������֤���л������ύ��ʱ��ֵ�Ƿ���Ч��
 *�������֤��ֵ��-1��ʱ���ʾ��Ч��
 *@param : elementID:������Ϊ��֤���ǿؼ����������л���е������б�����Ҫֱ�Ӵ���id.
 *@param :tipsMsg:�Զ�����Ϣ��ʾ��
 */
BFC.util.Validator.prototype.isHomeArea = function(elementID,tipMsg)
{
	var tips = "��������Ϊ��Чֵ����ȷ�����Ĺ������У�";
	if(arguments[1] !=null){tips = arguments[1];};
	if(elementID.value == null || elementID.value == ""
				 || elementID.value == -1){
			this.showError(tips);
			return false;
		}
	else return true;
}
/**
 *����isValidAccount,������֤�ʺ��Ƿ���Ч��
 *��֤���򣺵�1λ����Ϊ0���ʺ��ܹ�15λ��
 *@param : formID,��id.
 *@param : elementID:Ԫ��ID.
 *@param :tipsMsg:�Զ�����Ϣ��ʾ��
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
		var msgs = "�ʺű���Ϊ��0��ͷ��15λ����,����������.";
		var tips = arguments[2];
		if(tips != null){msgs = tips + "����Ϊ��0��ͷ��15λ����,����������.";}
		else{
		if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"����Ϊ��0��ͷ��15λ����,����������."
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}
/**
 *����isTheSamePwd,������֤�����Ƿ�һ���£�
 *��֤�����������붼����Ϊ�գ����������һ����
 *@param : formID,��id.
 *@param : pwd1:�����1.
 *@param : pwd2:�����2.
 *@param :tipsMsg:�Զ�����Ϣ��ʾ��
 */
BFC.util.Validator.prototype.isTheSamePwd = function(formID,pwd1,pwd2,tipMsg)
{
	//����form �� element
	if(typeof(arguments[0]) == "string"){
		if(arguments[0]==""){this.showError("����ָ����form������");return false};
		if(arguments[1]==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
	    if(arguments[2]==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
		var form=document.getElementById(arguments[0]);
		var elem1 = document.getElementById(form.id + ":" + arguments[1]);
		var elem2 = document.getElementById(form.id + ":" + arguments[2]);
		var tips = arguments[3];
		var msgs = "������������������һ���Ҳ���Ϊ��,����������";
		if(tips != null){msgs = tips + ",����������.";}
		if((elem1.value != "" && elem1.value!="undefined") && (elem1.value == elem2.value) )return true;
		else{
			this.showError(msgs,elem1);return false;
			return false;
		}
	}
	//��ָ��form,����������element����getElementById�õ���Ԫ�ر���.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		if((arguments[0].value != "" && arguments[0].value!="undefined") && (arguments[0].value == arguments[1].value) )return true;
		else {
			var msgs = "������������������һ���Ҳ���Ϊ��,����������";
			if(tips != null){msgs = tips+"�����������룮";}
			this.showError(msgs,arguments[0]);
			return false;
		}
	}
}


/**����isValidOprId()
 *��֤�Ƿ�����Ч����,��Ч����true,���򷵻�false.
 *@param ��fform��id��
 *@param : elementID�����Ԫ����.
 *@param : tipMsg �Զ�����ʾ���˴������Զ�����ʾ��������ؼ��֣�
 *��������7λ�������
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
        var msgs = "���ű���Ϊ7λ����,����������.";
        var tips = arguments[2];
		if(tips != null){msgs = tips + "Ϊ��Ч�Ĺ���,����������.";}
		else{if(typeof(arguments[0]) == "object"){
				if(arguments[1]!= null && arguments[1]!= "undefined")msgs = arguments[1]+"Ϊ��Ч�Ĺ���,����������.";
			}
		};
		this.showError(msgs,fieldID);return false;
	};
}

/**
 *����isValidPwd,������֤�����Ƿ���Ч��
 *��֤���򣺱�������λ���߰�λ��
 *@param : formID,��id.
 *@param : pwd:�����.
 *@param :tipsMsg:�Զ�����Ϣ��ʾ��
 */
BFC.util.Validator.prototype.isValidPwd = function(formID,pwd,tipMsg)
{
	//����form �� element
	if(typeof(arguments[0]) == "string"){
		if(arguments[0]==""){this.showError("����ָ����form������");return false};
		if(arguments[1]==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
	    if(arguments[2]==null){this.showError("��Ԫ�ز����ڻ�ָ������");return false};
		var form=document.getElementById(arguments[0]);
		var elem = document.getElementById(form.id + ":" + arguments[1]);
		var tips = arguments[3];
		var msgs = "���������볤��ֻ����4λ��8λ,����������";
		if(tips != null){msgs = tips + ",����������.";}
		if((elem.value != "" && elem.value.length >= 4 && elem.value.length <= 8) )return true;
		else{
			this.showError(msgs,elem);return false;
			return false;
		}
	}
	//��ָ��form,����������element����getElementById�õ���Ԫ�ر���.
	if(typeof(arguments[0]) == "object")
	{
		var tips = arguments[2];
		var pwd = arguments[0];
		if(pwd.value != "" && pwd.value.length >= 4 && pwd.value.length <= 8 )return true;
		else {
			var msgs = "���������볤��ֻ����4λ��8λ,����������";
			if(tips != null){msgs = tips+"�����������룮";}
			this.showError(msgs,arguments[0]);
			return false;
		}
	}
}

/**����isInSameMonth()
 *��֤����������ͬһ����,�Ƿ���true,���򷵻�false.	
 *@param ��  elementID1 �����Ԫ������
 *@param : elementID2 �����Ԫ����.
 *@param : tipMsg �Զ�����ʾ���˴������Զ�����ʾ��������ؼ��֣�
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
		showMsg(tipMsg + "�Ŀ�ʼ�������ֹ����Ӧ��ͬһ�·ݣ�����������.");
	else
		showMsg("��ʼ�������ֹ����Ӧ��ͬһ�·ݣ�����������.");
	return false;
}
/**����isValidDate()
 *��֤����������ͬһ����,�Ƿ���true,���򷵻�false.	
 *@param ��  elementID1 �����Ԫ������
 *@param : elementID2 �����Ԫ����.
 *@param : tipMsg �Զ�����ʾ���˴������Զ�����ʾ��������ؼ��֣�
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
          msgs="�²��ܴ���12";
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
          msgs="�ղ��ܴ���"+d;
      }
  }else{
      msgs="����������ڸ�ʽ����ȷ!��ʽΪ:2000-01-01��2000/01/01";
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
          msgs="�·ݲ��ܴ���12";
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
          msgs="���ڲ��ܴ���"+d;
      }
  }else{
      msgs="���ڸ�ʽ����ȷ!��ʽΪ:YYYY" + spilt_char + "MM" + spilt_char + "DD";
  }
  if(msgs=="") return true;
  else{ 
  	if(tips!=null && tips!=""){
  		msgs = tips + "��" + msgs;
  	}
    this.showError(msgs,fieldID);
    return false;
  }
}
/**************************************************OCX�����ʹ�á�*********************************/
/**
 *@class BFC.util.Ocx
 */
BFC.util.Ocx = function()
{
} 
/**����ConvertHexToVipCardInfo()
 * ��ȫ��ͨ����VIP����ȡ�����ݽ��н��룬����VIP����Ϣ��Object
 *@param ��  hex ԭ�����ݣ�
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
	  obj["msisdn"]=aBin[0]; //�ֻ�����	
	  obj["card_no"]=aBin[1];//vip����
	  obj["card_level"]=aBin[2]; //������
	  obj["exprie_time"]=aBin[3]; //ʧЧʱ��(YYMM)	
	}else{
	  obj=null;
	}
	return obj;
}
 
//���������remove����
Array.prototype.remove = function(dx){ 
    if(isNaN(dx)||dx>this.length){return false;} 
    this.splice(dx,1); 
} 
 