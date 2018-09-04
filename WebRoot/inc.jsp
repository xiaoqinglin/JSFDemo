<%@taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@taglib uri="http://java.sun.com/jsf/html" prefix="h"%>

<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Expires" content="0">

<!--<script language="javascript"
	src="<%=request.getContextPath()%>/script/jquery-1.7.1.min.js"></script>

--><script language="javascript"
	src="<%=request.getContextPath()%>/script/prototype.js"></script>
<script language="javascript"
	src="<%=request.getContextPath()%>/script/buffalo.js"></script>
<!-- validator.js -->
<script language="javascript"
	src="<%=request.getContextPath()%>/js/validator.js"></script>
<script language="javascript"
	src="<%=request.getContextPath()%>/js/BFC.js"></script>
	<script language="javascript"
	src="<%=request.getContextPath()%>/js/BFCUtils.js"></script>
<script language="javascript"
	src="<%=request.getContextPath()%>/js/utils.js"></script>
<script language="JavaScript" type="text/JavaScript">
	var END_POINT="<%=request.getContextPath()%>/bfapp";
	//var END_POINT="<%=request.getContextPath()%>/BUFFALOinit.jsf";
 	//var buffalo = new Buffalo(END_POINT);
	//var jsValidator = new BFC.util.Validator();
	var BDOM = BFC.util.DOM;//we can use BDOM to stand for the "BFC.util.DOM",just for less typing.^_^
	var BTime = BFC.util.Time;// same as above.
	var BOperation = BFC.biz.Operation; // same as above.
	var BConstant = BFC.constant.DEFINES;//use this to stand for "BFC.constant.DEFINES"
	//var BMap = new BFC.util.Map();//initialize a instance for public use.
	//var _system_date_from_web_service = BTime.formatJSDate2digital(new Date(<%=System.currentTimeMillis()%>)) ;
</script>
