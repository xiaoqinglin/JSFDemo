<%@page contentType="text/html; charset=GBK"%>
<%@include file="./inc.jsp"%>
<!DOCTYPE html>
<html xmlns:nl>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<script type="text/javascript">
function cleanByAllTag(){
  var oAll = document.body.all; //document.all;
  if(oAll==null) return ;
  for(var i = 0; i < oAll.length; i++){
    var e = oAll[i];
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

/**¼¤»îËùÓÐtag  Èç¹ûÊÇform£¬ÔòÖ±½ÓÊ¹ÓÃsetFormActive(oForm)*/
function setObjActive(){
  var oAll = document.body.all; //document.all;
  if(oAll==null) return ;
  for(var i = 0; i < oAll.length; i++){
    var e = oAll[i];
	setFormObjActive(e);
  }
}
/*ÉèÖÃ¶ÔÏóÔªËØÎªÐÝÃß×´Ì¬*/
function setObjDie(){
  var oAll = document.body.all; //document.all;
  if(oAll==null) return ;
  for(var i = 0; i < oAll.length; i++){
    var e = oAll[i];
	setFormObjDie(e);
  }
}

</script>
<f:view>
<body>
<table>
 <tr>
	<td>
	 <h:inputText style="width:150px" id="contact_name" readonly="false" value="ÄãºÃ"></h:inputText>
	</td>
	<td>
	 <h:inputText style="width:150px" id="contact_name1" readonly="false" value="ÄãºÃ"></h:inputText>
	</td>
	<td>
	 <h:inputText style="width:150px" id="contact_name2" readonly="false" value="ÄãºÃ"></h:inputText>
	</td>
	<td>
	 <h:inputText style="width:150px" id="contact_name3" readonly="false" value="ÄãºÃ"></h:inputText>
	</td>
	<td>
	<h:selectOneListbox id="manages_ic_type" value='1' style="width:150px">
											<f:selectItem itemLabel="ÐÂÉñÖÝÐÐ" itemValue="1022" />
										   <!--  <f:selectItem itemLabel="ÐÂÉñÖÝÐÐ2" itemValue="1023" /> -->
										</h:selectOneListbox>
	</td>
	<td>
		<h:commandButton title="Çå¿Õ" value="Çå¿Õ" id="cleanIdBtn"
											onclick="cleanByAllTag();return false;"
											onmouseup="this.styleClassName='button-four-up'"
											styleClass="button-four-up"
											onmousedown="this.styleClassName='button-four-down'" />
	</td>
	<td>
		<h:commandButton title="¿É²Ù×÷" value="¿É²Ù×÷" id="objActiveIdBtn"
											onclick="setObjActive();return false;"
											onmouseup="this.styleClassName='button-four-up'"
											styleClass="button-four-up"
											onmousedown="this.styleClassName='button-four-down'" />
	</td>
	<td>
		<h:commandButton title="²»¿É²Ù×÷" value="²»¿É²Ù×÷" id="objDieIdBtn"
											onclick="setObjDie();return false;"
											onmouseup="this.styleClassName='button-four-up'"
											styleClass="button-four-up"
											onmousedown="this.styleClassName='button-four-down'" />
	</td>
 <tr>
</table>
</body>
</f:view>
</html>
