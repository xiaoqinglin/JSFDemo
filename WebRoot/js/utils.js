var contextPath = "/BossWeb";
try{
	contextPath = getContextPath();
}catch(e){
	contextPath = "/BossWeb"
}
/**
 * �ж��ַ����Ƿ�Ϊ����
 * @param sTxt ΪҪ�����жϵ��ַ���
 */
function isNum(sTxt){
  var numTemp = "1234567890";
  for(i = 0; i<sTxt.length; i++){
    if( numTemp.indexOf( sTxt.charAt(i) ) == -1 ) {return false;}
  }
  return true;
}

/**
 * У���ַ����Ƿ���ϳ���Ҫ��
 * @param sTxt ΪҪ���м�����ַ���
 * @param minL ��С����
 * ����: maxL ��󳤶�
 */
function isValidLength(sTxt, minL, maxL){
  if( sTxt.length < minL || sTxt.length > maxL ) return false;
  return true;
}

/**
 * ��ȷУ���ַ�������
 * @param sTxt ΪҪ���м�����ַ���
 * @param len ΪҪ���м���ĳ���
 */
function isRigorLength(sTxt, len){
  if( sTxt.length != len ) return false;
  return true;
}
/**
/ �ڱ༭���onkeypress�¼�����
/ ����:���˵�������������ּ�
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
   window.status = "ֻ����������!!!";
   return false;
 }
}
/**
 * ɾ������������ѡ��
 * @param obj Ϊ���������
 */
function removeAllOption(obj){
  var obj = eval(obj);
  for( i = obj.length-1; i >= 0; i--){
    obj.remove(i);
  }
}

/**
 * ����һ������ѡ��
 * @param obj Ϊ���������
 * @param sValue ΪҪ���ӵ�������ѡ��ֵ
 * @param sText ΪҪ���ӵ�������ѡ����ʾ�ı�
 */
function addOption(obj, sValue, sText){
  var obj = eval(obj);
  var oOption = document.createElement("OPTION");
  oOption.value = sValue;
  oOption.innerText = sText;
  obj.appendChild(oOption);
}

/**
 * ���ڸ��������ֵ�������ϵ�˵�
 * @param oSubObj Ϊ�¼����������
 * @param dictType ��Ӧ�ֵ�� dictType
 * @param classId ��Ӧ�ֵ�� classId
 * @param parentId Ϊ�ϼ�������ѡ��ֵ
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
 * ʹ��������textֵ���ṩ�ĵ�sText��ƥ���optionѡ��(����ƥ�䣬��׼ȷƥ��)
 * @param selObj Ϊ���������
 * @param sText Ϊ������ѡ����ʾ�ı�
 */
function compareSelText(selObj, sText){
  for(i=0; i<selObj.length; i++){
    if( selObj[i].text.trim() == sText.trim() ){
      selObj[i].selected = true ;
    }
  }
}

/**
 * ѡ�����ṩsValueֵ��ƥ���������ѡ�ֵƥ�䣬��ȷƥ�䣩
 * @param selObj Ϊ���������
 * @param sValue Ϊ������ѡ��ֵ
 */
function compareSelValue(selObj, sValue){
  for(i=0; i < selObj.length; i++){
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
function compareCheckBoxByValue(chkObj, sValue){
  if( sValue == "true" || sValue == "1" ){
    chkObj.checked = true ;
  } else {
    chkObj.checked = false ;
  }
}

/**
 * ����sText���������е�����(����ƥ�䣬��׼ȷƥ��)
 * @param oObjΪ���������
 * @param sText Ϊ������ѡ����ʾ�ı�
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
 * ��ȡ�����������
 * @param oObjΪ���������
 * @param sValueΪ������ѡ��ֵ
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
 * �����ı���Ϊֻ��
 * @param oObjΪ�ı������
 */
function setTextBoxReadOnly(oObj){
 var oObj = eval(oObj);
 oObj.readOnly = true;
 oObj.className = "input-gray";
}

/**
 * ����form����Ԫ��Ϊ����״̬
 * @param oFormΪform����
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
 * ���ö���Ԫ��Ϊ����״̬
 * @param e����
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
 * ���ݲ������ж��Ƿ��û�form
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
 * ����form
 * @param oFormΪform����
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
 * �������
 * @param e����
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
 * ���ݲ���������form
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
 * ���form
 * @param oFormΪform����
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
 * ��ȡ��ǰʱ��(��ʽ yyyy/MM/dd hh:mm:ss)
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
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss 2 yyyymmdd
 * @param sDateΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
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
 * ���ڸ�ʽת��yyyy/MM/dd hh:mm:ss to yyyy-MM-dd hh:mm:ss
 * @param sDateΪ��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������
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

//��ȡbossϵͳtop����--�Թ�����
function getUtilsWebTop(){
	var theParent = self;
    while( theParent != theParent.parent && theParent.name != "ccmsFrame"){
        theParent = theParent.parent;
    }    
    return theParent;
    //2009.02.05 yanfg add >>
}
//��ȡ�˵����ܺ�
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
 * �жϿ�ʼʱ���Ƿ�С�ڽ���ʱ��
 * @param sStartDateΪ��ʼʱ��(��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������)
 * @param sEndDateΪ����ʱ��(��ʽΪyyyy/MM/dd hh:mm:ss���ַ�������)
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
 * ���㳤��(�����ַ�)
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
 * aMap.put("mykey","myValueMayBeObject");//��������£�key-valueֵ�����value�����洢����
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
	                                this.value[i]=null;//ɾ���������
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
			 //��������key,�����鷵�ء�
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
//-----------���ż���
function chkOperId(formId, operId){
  eval("var operId = document.forms."+formId+"['"+formId+":"+operId+"'];");
  if( operId.value == "" ){
    showMsg("����Ա���Ų���Ϊ�գ�");
    operId.focus();
    return false;
  } else {
    if( !isNum(operId.value) || !operId.value.accordLength(7) ){
      showMsg("����Ա���Ŵ������������룡");
      operId.select();
      operId.focus();
      return false;
    }
  }
  return true;
}

/**
 * �·�У��(yyyymm)
 */
function chkMonth(month){
  var month = eval(month);
  if( month.value == "" ){
    showMsg("�·ݲ���Ϊ�գ������룡");
    month.focus();
    return false;
  }
  var m = month.value.substring(month.value.length-2, month.value.length);
  if( month.value.length != 6 || !isNum(month.value) || (  m > 12 || m < 1 ) ) {
    showMsg("�·������д������������룡");
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
 *ȫ��ѡ�и�ѡ�򣨸�ѡ�򲻴���form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
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
 *ȫ��ȡ��ѡ�и�ѡ�򣨸�ѡ�򲻴���form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
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
 *ȫ��ѡ�и�ѡ�򣨸�ѡ����form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param operform ���ύ��form����
 *@param checkboxobj ��ѡ������
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
 *ȫ��ȡ��ѡ�и�ѡ�򣨸�ѡ����form�У�
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param operform ���ύ��form����
 *@param checkboxobj ��ѡ������
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
 *ȡ��ѡ�������б�ѡ��ѡ���ֵ����һ��Array�󸳸�form�е�һ������Ԫ��
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
 *@param operform ���ύ��form����
 *@param hiddenobj ������Ÿ�ѡ���ֵ������Ԫ������
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
 *�ûһ��������и�ѡ��ѡ��
 *@param ifr Ƕ��������(��û���õ���ܲ���Ϊ'')
 *@param checkboxobj ��ѡ������
 *@param operform ���ύ��form����
 *@param ison ���ڱ�ʶ��ǰ�������ûһ������õĸ�ѡ������
 *@author shenjian
 */
function disableifr(ifr,checkboxobj,operform,ison){//ifr:Ƕ��������(��û���õ���ܲ���Ϊ'')��checkboxobj:checkbox���ƣ�operform:���ύ��jsf�����ƣ�ison:��ʶ���Ƿǡ��ؼ�����
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
 *�������� and ��ǰ����,����(ǰ)��N�ܵ���һ�����յ����ڣ��ܵļ��㰴�½��У�
 *ÿ�µ�һ��Ϊ��һ�ܵ���һ���Դ����ƣ�ÿ�¹����ܣ����һ�ܴӵ��ĸ���һ�����µף����ȳ���7��
 *@param weekIndex 0����null��ʾ����,1��ʾ����,-1��ʾ����,��������
 *@param currDate ��ǰ���ڶ���,null��ʾȡ��ǰ��������
 *@return week ����Ϊ2���ַ�������,week[0]��ʾ��һ,week[1]��ʾ����
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
 *�������� and ��ǰ����,����(ǰ)��N�ܵ���һ�����յ�����
 *@param weekIndex 0����null��ʾ����,1��ʾ����,-1��ʾ����,��������
 *@param currDate ��ǰ���ڶ���,null��ʾȡ��ǰ��������
 *@return week ����Ϊ2���ַ�������,week[0]��ʾ��һ,week[1]��ʾ����
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
 *������<select>֮�����<option>�ƶ�
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
 * ��ȡselectѡ�����text
 */
select_utils.getText = function(oObj){
	var oObj = eval(oObj);
        
        if(oObj.selectedIndex > -1)
	  return oObj[oObj.selectedIndex].text;
        else
          return "";
}
/**
 * ��selectѡ�����value��Text��ǩ
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
 * ��selectѡ�����text��Text��ǩ
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
 * OCX�õ������ݺ�Form��(form�е�ID��columnOrder��Ӧ)
 * formName : form����String
 * columnOrder : ocx�е�columnOrder (��#2����)
 * rowData : ocx�õ��������� (��#2����)
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
 * OCX�õ������ݺ�Form�����(form�е�����������columnOrder��Ӧ)
 * formObj : form����Object
 * columnOrder : ocx�е�columnOrder (��#2����)
 * rowData : ocx�õ��������� (��#2����)
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
 * form2form����Ӧ�ֶ��໥����
 * fromForm : ԴForm (String)
 * toForm : Ŀ��Form (String)
 * dataIds : Ҫ������������ (�ַ�������)
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
 * ��form�л��OCX�������� (��#2����)
 * fromName : Form�� (String)
 * columnOrder : OCX����˳�� (String)
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
 *	����ɾ��form�Ĺ���
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
 * jiangjz�� ��formת��Ϊjs����ֻ������������type��text��
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
    //returnValue.extend = null;//ȥ��prototype��չ-------->jjz:�Ѿ�ͳһ��doStructXMLת����Map����ʱ����
	return returnValue;
}
/**
 * ���oTag HTMLDOMԪ�ص�id����name������value������returnValue����
 * �˷����� ����ð�ŵ�����������JSF���ɵ�Ԫ�أ�ȥ��ð�ż���ǰ�����ݣ���Ϊ������
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

/**
 * rzy�� ��formת��Ϊjs�����MAP��ֻ������������type��text��
 * �����û��ؼ���Ϣ����
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
			if(oObj.value.indexOf("*")>-1){//����������Ϣδ�޸ģ�ȡMAP���ֵ
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

//�ظ�id�ģ���������ʽ׷�ӷ���
//form Ϊ�ύ��form����oTagΪ��ǰԪ�ض���lastValueΪid��Ӧ�ĵ�ǰֵ
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
 * ��֤����������ͬһ����.
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
		showMsg(text + "�Ŀ�ʼ�������ֹ����Ӧ��ͬһ�·ݣ�����������.");
	else
		showMsg("��ʼ�������ֹ����Ӧ��ͬһ�·ݣ�����������.");
	return false;
}
/**
 * ��֤����������ͬһ���µ�������.
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
		showMsg(text + "�Ŀ�ʼ�������ֹ����Ӧ��ͬһ���µ������ڣ�����������.");
	else
		showMsg("��ʼ�������ֹ����Ӧ��ͬһ���µ������ڣ�����������.");
	return false;
}
/**
 * ��֤����������ͬһ���µ�������.
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
		showMsg(text + "�Ŀ�ʼ���ڲ��ܴ��ڽ�ֹ���ڣ�����������.");
	else
		showMsg("��ʼ���ڲ��ܴ��ڽ�ֹ���ڣ�����������.");
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

      //**********************************************�س�ת��������� zhangxw begin*****************************************
      //����ҳ���Ͽɻ�ý���Ԫ������
      var JumpTypeArray  = new Array("text", "password", "submit", "reset", "button", "textarea", "checkbox", "radio",
              "select", "select-one", "select-multiple", "file");
      //����ҳ�������ų�Ԫ������
      var DebarTypeArray = new Array("submit", "reset", "button", "checkbox", "radio", "select", "select-one",
              "select-multiple", "hidden");
      //Ҫ������Ԫ������
      var BtnTypeArray   = new Array("submit", "reset", "button");

      //���������Ƿ���ָ���ַ���������,���ڷ���������,�񷵻�-1;
      function inStrArray(src, dec) {
        for (var i = 0; i < dec.length; i++) {
          if (src == dec[i]) {
            //��λ�ɹ�,����������
            return i;

            break;
          }
        }

        //��λʧ��,����-1
        return -1;
      }

      //�س���Ӧ����
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
        //ָ��FORM���ƣ�Ĭ��ȡΪҳ���еĵ�һ��
        var frm   = (args2)
                    ? document.getElementById(args2)
                    : document.forms[0];

        //�жϵ�ǰ�����Ƿ�Ϊ���������,������������:JumpTypeArray
        if ((evt.keyCode == 13) && (inStrArray(node.type, JumpTypeArray) != -1)) {
          for (var i = 0; i < frm.elements.length; i++) {
            //��λ��ǰ����
            if (frm.elements[i].id == node.id) {
              for (var j = i + 1; j < frm.elements.length; j++) {
                //������������Խλ�ж�
				if ((j) < frm.elements.length && (!frm.elements[j].readOnly) && (!frm.elements[j].disabled)) {
                  //�жϵ�ǰ������һ�������Ƿ�Ϊ���������,������������:JumpTypeArray
                  if (inStrArray(frm.elements[j].type, JumpTypeArray) != -1) {
                    if (inStrArray(frm.elements[j].type, BtnTypeArray) != -1) {
                      frm.elements[j].onclick();
                    } else {
                      //���ý���
                      frm.elements[j].focus();

                      //���˲���ѡ���ı�����,������������:DebarTypeArray
                      if (inStrArray(frm.elements[j].type, DebarTypeArray) == -1) {
                        //ѡ������ı�����
                        frm.elements[j].select();
                      }
                    }

                    //��ֹ�ύ������
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

      //**********************************************�س�ת��������� zhangxw begin*****************************************

//��formת��Ϊjs��Array���󣬸�Array�����������Array����Array[0]Ϊid���б�Array[1]Ϊֵ���б�id��ֵһһ��Ӧ
function convertFormToArray(form){
	var myForm = form ;
    var returnValue = new Array();    //formת����ķ���ֵ
    var keys = new Array();           //id�б�
    var values  = new Array();        //ֵ�б�
	var m = 0;                        //����index

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
    		var orinPropName = propertyName;//����ԭʼ������
    		propertyName = propertyName.substring(index+1);//ȥ��jsfð��ǰ�ַ�

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

/**	����clone()
 *  ��ȶ����¡�����ؿ�¡����
 *	@param : myObj  ԭ����
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
 * ��ά���ȡ
 * ע����ά��ؼ�����ͳһΪImagecoReader
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
	  	obj["msisdn"]=aBin[0]; //�ֻ�����
	  	obj["card_no"]=aBin[1];//VIP����
	  	obj["card_level"]=aBin[2]; //�ȼ�
	  	obj["exprie_time"]=aBin[3]; //��Ч��
	  	
	  }
	  /**if( null != obj["msisdn"] && acceptMsisdn != obj["msisdn"] ) {
	  	showMsg("VIP����Ϊ"+obj["card_no"]+"("+obj["msisdn"]+")���ǵ�ǰ�����û���");
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

/**��ѯVIP�û���Ϣ**/
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
 *���ý���Ԫ�ض������ػ���ʾ
 *@param hidden_id: Ҫ���ص�Ԫ�ص�ID��
 *@param show_id : Ҫ��ʾ��Ԫ�ص�ID��
 *@param save_flag :ͬ����־��0-'hidden_id'ͬ����'show_id'��1-'show_id'ͬ����'hidden_id',����ֵΪ��ͬ��.
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
 * �ͷ��Ƿ��ѯhome_city,Ŀǰֻ֧���ֻ�����
 * @param objid: ����
 * @param objtype: ����
 */
function isQueryHomecity(obj_id,obj_type){
	if(obj_type == "0"){
		return true;
	}else{
		return false;
	}
}
/**
 * ��ѯ�������в�����msisdnObj
 * @param msisdnObj
 * @param isReset  �Ƿ����ù�����
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
			      	  if(!isReset){//���������ʱ��֪ͨ 
			               csp_storage.isChangeInputNumber(msisdnObj.msisdn,"",bean.home_city);
			          }
			      }else{
			    	  if(!isReset){//���������ʱ��֪ͨ			    		  
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
				showMsg("�ú��������Ϊ"+bean.home_city_name+",ʡ���û����벻�������ҵ��");
			}
			if(isReset)
			    csp_storage.resetWorkZone("");
			return true;
		}
		else if(result.retResult==999999999){
			showFilterMsg("û���ҵ��ú����������",999999999);
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
 * �Զ���ת������Ӫ���Ƽ�ҳǩ
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
 				bosstop.selectMenuReflash(sendLink,"10500142","����Ӫ���Ƽ�","410500142");
 			}
 	    });
	}
}
/*
* BM_QueryHomeCityByObjType 
* callBack: �ص�����
* @param objid: ����
* @param objtype: ����
* @param callBack: �ص�
* @param ext: ��չ�ش�����
* @param isAllRet: ��չ�Ƿ�ʡ��ص� trueʱ���ж��ص�,false��undefinedʱ�������ʡ��������������  
* ���أ����룬���ͣ������� ����ʡ�ڻ���ʡ�ⶼ����
* �����÷���queryHomeCityByObjType("138311111111", "0",setObjHomeCity,"21012530");
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
			showFilterMsg("û���ҵ��ú����������",999999999);
		}
		else{
			showFilterMsg(result.retMsg,999999999);
		}
	});
}
//�ص�
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
   			showMsg("�ú��������Ϊ<font size=3 color=red>"+bean.home_province_name+bean.home_city_name+"</font>,ʡ���û����벻�������ҵ��");
   	}
   }
   catch(ex){
   }
}
/**
 * ����ѯ����ת����Ӧ���ֻ�����
 * Ŀǰ֧������ͨת����������������չ
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
			showMsg("û���ҵ���Ӧ���ƶ��ֻ����룡");	
			return false;
		 }else {
			showMsg(result.retMsg);
			return false;
		}
	});
}
var accept_city_keys="accept_city_bean_cush";//�����ܹؼ���
/*
* ��ȡ��������ػ�����Ϣ
* @param objid: ����
* @param objtype: ����
* ���� �����ڶ���ʱ����null 
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
* �������BEAN��Ϣ
* @param objid: ����
* @param objtype: ����
* @param bean: ����
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
//�Ƿ��ݵ���
function isLocalCity(city){
	var reg=/(^59[0-9]{1})$/;
	return reg.test(city);
}
/**
 * �Զ�����ϵͳ����
 */
function getUtilsTop(){
	var theParent = self;
	while( theParent != theParent.parent && theParent.name != "ccmsFrame"){
		theParent = theParent.parent;
	}
	return theParent;
}
/**
 * �ָ�IVR�����ַ��ܷ��ض�Ӧλ��ֵ
 * @param cspstr string: IVR�����ַ���
 * @param at int:λ��
 * ���ض�Ӧλ�õ�ֵ ����������򷵻ؿ�
 */
function splitCspAsStr(cspstr,at){
   var arys=cspstr.split(IVR_SPLIT);
   if(arys.length<=at||at<0)
      return "";
   return arys[at];
}
/**
 * �ָ�IVR�����ַ��ܷ�������
 * @param cspstr string: IVR�����ַ���
 * ��������
 */
function splitCspAsArray(cspstr){
   return cspstr.split(IVR_SPLIT);
}
/**
 * ��ȡIVR�������� ��֤�����0�ɹ���1ʧ�ܣ�
 * @param cspstr string: IVR�����ַ���
 * ���� ��֤�����0�ɹ���1ʧ�ܣ�
 */
function getIVRPwdInputResult(cspstr){
   return splitCspAsStr(cspstr,IVR_PWD_INPUT_RESULT);
}
/**
 * ��ȡIVR�������� �û�������
 * @param cspstr string: IVR�����ַ���
 * �����û�������
 */
function getIVRPwdInputUserInput(cspstr){
   return splitCspAsStr(cspstr,IVR_PWD_INPUT_INPUT);
}

var accept_relation_keys="accept_user_relation_cush";//������������û��ؼ���

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
* �������BEAN��Ϣ
* @param objid: ����
* @param objtype: ����
* @param bean: ����
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
//IVR���뷵��λ�ö���  ҵ�����̱�־~��������~��֤�����0�ɹ���1ʧ�ܣ�~Ƿ�ѱ�־~�û�������~�������
var IVR_PWD_INPUT_FLOWSIGN=0;//ҵ�����̱�־
var IVR_PWD_INPUT_PWDTYPE =1;//��������
var IVR_PWD_INPUT_RESULT  =2;//��֤�����0�ɹ���1ʧ�ܣ�
var IVR_PWD_INPUT_SIGN    =3;//Ƿ�ѱ�־
var IVR_PWD_INPUT_INPUT   =4;//�û�������
var IVR_PWD_INPUT_ACCEPTNO=5;//�������
var IVR_SPLIT="~";//IVR�ָ���

/*
 * ���÷����������ŷ��ͽӿڴ�����
 * sendObj ���Ͷ���
 * sendObj.recv_nbr ���պ���
 * sendObj.sms_content �������� *
 */
function sendSMS(sendObj){
	var sendLink = new Object();
	sendObj.account="10";
	sendObj.serv_type="10207501";
	sendObj.is_close="YES";
	BFC.util.DOM.getTop().saveToWebPubHashtable("crm_send_obj",sendObj);
    sendLink.href="sp/servicepilot/page_entry.jsp?actual_url=sms/sms_send/index.jsp";
    BFC.util.DOM.getTop().selectMenuReflash(sendLink,"61713000","���Ӵ𰸷���","461713001");
}
/*
 * ����139����
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
			showFilterMsg("�ʼ����ͳɹ�!","999999999");
		}else if(result.retResult==109997){
			showFilterMsg("�û���Ʒ���ݹ��࣬����mail���ƣ�����ʧ��!","999999999");
		}else{
			showFilterMsg(result.retMsg, result.retResult);
		}
	});
}
function pointConversion(str){
	var result = "";
	for (i=0 ; i<str.length; i++)   
	{   
		code = str.charCodeAt(i);//��ȡ��ǰ�ַ���unicode����   
		if (code == 33 || code == 44 || code == 46 || code == 58 || code == 60 || code == 62 || code == 63)//�����unicode���뷶Χ�е������е�Ӣ����ĸ�Ѽ������ַ�   
		{   
			result += String.fromCharCode(str.charCodeAt(i) + 65248);//��ȫ���ַ���unicode����ת��Ϊ��Ӧ����ַ���unicode��   
		}else{   
			result += str.charAt(i);   
		}   
	}
	return  result.replace(/\r\n/ig,"<br>").replace(/\n/ig,"<br>").replace(/\r/ig,"<br>");
}   
/**
 * У��ͻ������Ͻ��Ա
 * @param managerObj
 * @param sysfunc_id
 * @param func_type
 * @param callback
 * @param param1
 * @param param2
 * @return
 */
function authManagerMember(managerObj,sysfunc_id,func_type,callback,param1,param2){
	var acceptObj = BDOM.getTop().getAcceptObjectInfo();//��ǰ�������
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
				  if(showMsg("������������,�Ƿ��������","confirm"))
					  authPrivLevel(sysfunc_id,func_type,callback,param1,param2);
				  return false;
			  }
		    });
	  }
    });
}
/**
 * NGУ�鰴Ť��Ȩ��,�ڲ�ѯ�������ύʱʹ��,ʹ��ʱҪ�ж��Ƿ���NG����
 * sysfunc_id  ҵ���ܺ�
 * func_type  ��������:0:���� 1:��ѯ
 * callback  Ȩ��У���Ļص�������
 * param1  �ص������Ĳ���1
 * param2  �ص������Ĳ���2
 *
 */
function _checkAuthPriv(sysfunc_id,func_type,callback,param1,param2){
       if(BDOM.getTop().isNGCSConnect()&&sysfunc_id=="10558030"&&func_type=="1"){//��ѯ�Ĺ��ܺ�������ֿ�
           sysfunc_id = "10558036";
       }
	   if(!BDOM.getTop().isNGCSConnect()){
	       callback(param1,param2);
	       return false;
	   }else{
		   try{//BOSS�ͻ���������֤
		       var callerObj = BDOM.getTop().getSubsNumberObjectInfo();//��ǰ�������
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
	   if(BDOM.getTop().isLocalAccept())//�Ƿ񱾻�
       		is_myself = "1";
   	   else
        	is_myself = "2"; 
	   
	   if(is_myself == "2" && func_type=="0"){//���� && ���� 
		    var acceptObj = BDOM.getTop().getAcceptObjectInfo();//��ǰ�������
		    var keyInfo=[];
		    var valueInfo=[];
			var resInfo = [];
			resInfo[0]="user_info-row-1";	
		    keyInfo.push("obj_type");  		
		    valueInfo.push("0");
		    keyInfo.push("obj_id");//�û����� 		
		    valueInfo.push(acceptObj.msisdn); 
		    keyInfo.push("obj_home_city");
		    valueInfo.push(acceptObj.city);
		    buffalo.remoteCall("jsf:BaseOprAction.callService",["10000002", sysfunc_id, keyInfo, valueInfo, resInfo, false]
		    , function(reply) {
		    	var result = reply.getResult();
				if(result.retResult=="999999999"){
					showMsg("���û�������!");
					return false;
				}else if(result.retResult==0){
					var bean=result.returnBean;
					var open_time = bean.open_time;
					if(open_time!="" && open_time!=null && open_time!="undefined" && open_time<=BFC.util.Time.getToday()){
						doCheckAuthPriv(sysfunc_id,func_type,callback,param1,param2);
					}else{
						showMsg("���û�δ����,����������ҵ��!");
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
	   if(managerObj&&managerObj.managerid!=""){//У��ͻ�����������,��ͻ� 11�����ſͻ� 12	
		    if(managerObj.managerid.length==11){//������ֻ�����ת�ɹ���
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
        &&document.getElementById("_ng_msisdn")!= null&&document.getElementById("_ng_msisdn")!= undefined){//�����ҵ������,���ж��Ƿ��Ѿ���ѯ������Ϣ
    	if(!_isExecInitWeb()){
        	showMsg("���Ȳ�ѯ�ٽ����������");
        	return false;
        }
    }
    */
    var acceptObj = BDOM.getTop().getAcceptObjectInfo();//��ǰ�������
    var auth_info = new Object();
    var connect_type = BDOM.getTop().getCustomType();
    auth_info.request_source = BDOM.getTop().getRequestSource();
    auth_info.sysfunc_id = sysfunc_id;
    auth_info.home_city = acceptObj.city;        
    auth_info.brand_id = "0";//Ʒ��
    if(BDOM.getTop().isLocalAccept())//�Ƿ񱾻�
        auth_info.is_myself = "1";
    else
        auth_info.is_myself = "2";        
    auth_info.connect_type = connect_type==""?"0":""+connect_type;//���뷽ʽ    
    auth_info.operator_rule = BDOM.getTop().getNGOperRole();//����Ա��ɫ 
    auth_info.func_type = func_type;//��������:0:���� 1:��ѯ
    auth_info.operator_id = BDOM.getTop().getOperId();
    BDOM.getTop().writeCspLog("_checkAuthPriv auth_info{"+auth_info.request_source+","+auth_info.sysfunc_id+","+auth_info.is_myself+","+auth_info.connect_type+"}",22);
	    //��ѯȨ�޵ȼ�����
	    //buffalo.setDebug(true);
	    buffalo.remoteCall("jsf:AuthBean.setAuthLevel",[auth_info], function(reply){
		    var auth_bean = reply.getResult();
	        var second_auth_csp = BDOM.getWorkZoneUrlParam("second_auth_csp");
	        var only_auth_csp = BDOM.getWorkZoneUrlParam("only_auth_csp");
	        var need_auth_type = BDOM.getWorkZoneUrlParam("need_auth_type");
		    if((func_type=="3"&&(sysfunc_id=="10500072"||sysfunc_id=="10500073")) || (func_type=="4" && auth_info.operator_rule!="11010003")){//�������ι��ʳ�;ҳ�����⴦��
                auth_bean.auth_level = 2;
                auth_bean.identify_type = "20";
            }
		   
	        if(auth_info.is_myself == "1" && only_auth_csp=="73"){
	        	auth_bean.auth_level = 0;
	        	auth_bean.identify_type = "0";
	        }
		    var auth_level = auth_bean.auth_level;
		    if(auth_level==6){//40636 ����������֤�ȼ����������֤�ȼ�
		    	auth_level = 1;
		    }
		    if(auth_level==73){//������֤�ȼ����������֤�ȼ�
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
		                //�ǹ������������֤�ȼ�����
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
		                showMsg("IVRУ��ʧ�ܣ�");
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

//���ݹ��Ż�����ѯ��������
//org_id ���Ż���
//chnl_type ��������
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
			//0213-��ӪӪҵ��  0214-��ͨרϯ
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
 * ���ݹ��Ż�����ѯ��������
 * org_id ���Ż���
 * chnl_type ��������
 * showModalDialog���������޷���ȡ��ǰ�������Ķ���ȡ����sysfunc_id����Ϊ�ɲ������롣
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
			//0213-��ӪӪҵ��  0214-��ͨרϯ
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

//���ݺ����ѯ����ʡ��
//sysFunc_Id ϵͳ���ܺ�
//msisdn ����
//callback �ص�����
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
 * �жϵ�ǰʱ���Ƿ�Ϊ20150401��20150403
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
 * �ж��û��Ƿ�ʹ���»��ֹ���
 * 
 * by yuliping
 */
function isUseNewPointRule(opentime){
	if(!opentime) return true;
	var currentTime=BFC.util.Time.getSystemTime().substring(0,8);
	//2016�����ڼ�ſ�У��
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
 * �ж��Ƿ������û������������޼�¼��������м�¼��ʧЧ&&���������м�¼&&��ʵ��������1��
 * 
 * @param sysfunc_id
 * @param home_city
 * @param msisdn
 * @param type 1�ɷ� 2����
 * @param callback
 * @return
 */
function isLimitUser(sysfunc_id,home_city,msisdn,type,callback) {
	
	// 10590028ͣ��������10590022 ���� ��10558161���ʼ��۰�̨ҵ������
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
				sendMessage(sysfunc_id,home_city,msisdn,"�𾴵Ŀͻ��������ĺ���Ǽǵ������Ϣ��������׼ȷ�����ݹ���ʵ����Ҫ������ͣ�ṩ��������뾡��Я��������Ч���֤ԭ���������ƶ�Ӫҵ�����Ǽ����ϡ��й��ƶ�");
				showMsg("�𾴵Ŀͻ��������ĺ���Ǽǵ������Ϣ��������׼ȷ�����ݹ���ʵ����Ҫ������ͣ�ṩ�������");
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
 * �ж��Ƿ������û������������޼�¼��������м�¼��ʧЧ&&���������м�¼&&��ʵ��������1��
 */
function isLimitUserAuth(sysfunc_id,home_city,msisdn,archives_flag,user_type,callback) {
    // 10590028ͣ��������10590022 ���� ��10558161���ʼ��۰�̨ҵ������
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
				sendMessage(sysfunc_id,home_city,msisdn,"�𾴵Ŀͻ��������ĺ���Ǽǵ������Ϣ��������׼ȷ�����ݹ���ʵ����Ҫ������ͣ�ṩ��������뾡��Я��������Ч���֤ԭ���������ƶ�Ӫҵ�����Ǽ����ϡ��й��ƶ�");
				showMsg("�𾴵Ŀͻ��������ĺ���Ǽǵ������Ϣ��������׼ȷ�����ݹ���ʵ����Ҫ������ͣ�ṩ�������");
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
 * ����ָ�����ݶ���
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
			//TODO ���ŷ��ͳɹ�
		}else{
			showMsg(result.retMsg);
		}
	});
}

/**
* �������֤�����ȡ�ͻ����䣨���꣩          																		
*
* @param idcard ���֤����
* @return ���䣨���꣩
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
	       	    showMsg("�����֤����Ĵ������ù���߳�������ʱ�䣬�����½��н����֤���ٲ�ѯ������");
	       }
    });
}
function afterJkAuth(){
	var bosstop=getUtilsTop();
    if(!bosstop.isCRMConnect()) return "";
	buffalo.remoteCall("jsf:New4AJKMgr.afterJkAuth",[BDOM.getPortalId()],function(reply){
		   var result = reply.getResult();
		   if(!result){
	           showMsg("�쳣��"); 
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
//�ļ��ϴ����عؼ���str����,��Կkey:uploadOrDownload
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
        //���Ͽ�������󲿷ֵ��ڴ���ĵ��ڵ��¼����
        //���ɾ������� iframe 
        el.parentNode.removeChild(el);
    }
}

/**
* ������ʹ������       																		
* @param flow ��������λkb��
* @param flag ��Ϊʣ��������1������ɲ���
* @return ��������λ**GB**MB�� 
* ��Ϊ��Ҫ����gb��mb�������ַ�������
*/
function changeMbByK(flow,flag){
	if(isNaN(flow) || flow*1==0) return "0MB";
	
     var flowNum = (flag==1)?parseFloat(flow)-1:parseFloat(flow);//Ϊʣ���������1
 
     var inteNum = Math.round(flowNum/1024);//ת��Mb�� �������� ������ֵ  
     
     var gbNum = inteNum >=1024?parseInt(inteNum/1024):0;//��ȡGBֵ
     
     var gkNum = inteNum - gbNum*1024;//��ȡGKֵ
     
     var flowStr ="";
      if(gbNum != 0)
             flowStr=gbNum+"GB";
      if(gkNum !=0)
    	     flowStr=flowStr+gkNum+"MB";
      
     if(gbNum ==0 && gkNum==0) 
    	 flowStr="0MB";
     
      return flowStr;
}

//��Ʊ ��Ŀ��Ʒ����
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
	               item_type_vlaue ="3050200000000000000";  //��װ����
	               break;
	             case 12:
	               item_type_vlaue ="1060301030100000000"; //ͨ���豸Ƕ��ʽ���
	               break;
	             case 13:
	               item_type_vlaue ="3040200000000000000"; //��Ϣ��������
	               break;
	             case 14:
	               item_type_vlaue ="1100101020000000000"; //����
	               break;
	             case 15:
	               item_type_vlaue ="1100301010000000000"; //��ˮ
	               break;
	             case 16:
	               item_type_vlaue="3040502020000000000" ; //��������Ӫ����
	               break;
	             case 17:
	               item_type_vlaue="3040801010000000000" ; //��ҵ�������
                   break;
                 case 18:
                   item_type_vlaue="6010000000000000000" ;//��ֵ������
                   break;
                 case 19:
                   item_type_vlaue="3030000000000000000";//Ԥ���
                   break;
	            default:
	            item_type_vlaue="";
	             break;
	           }
             return item_type_vlaue;
          }
 


