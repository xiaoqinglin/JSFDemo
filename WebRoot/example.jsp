<%@page contentType="text/html; charset=UTF-8"%>
<html xmlns:nl>
	<head>
		<meta http-equiv="Content-Type" content="text/html">
		<title>Example::Hello</title>
		<script language="javascript"
			src="<%=request.getContextPath()%>/script/jquery-1.7.1.min.js"></script>

		<script language="javascript"
			src="<%=request.getContextPath()%>/script/prototype.js"></script>
		<script language="javascript"
			src="<%=request.getContextPath()%>/script/buffalo.js"></script>
		<!-- validator.js -->
		<script language="javascript"
			src="<%=request.getContextPath()%>/js/validator.js"></script>
       <script language="javascript"
			src="<%=request.getContextPath()%>/js/BFC.js"></script>
		<script language="javascript">
var END_POINT="<%=request.getContextPath()%>/bfapp";
	var buffalo = new Buffalo(END_POINT);
	function hello() {
		var p1 = $("myname").value;
		debugger;
		var result = Validator._number(p1);
		if (result != null) {
			alert(result);
		}
		buffalo.remoteCall("helloService.hello", [ p1 ], function(reply) {
			alert(reply.getResult());
		});
	}


	
</script>

<script type="text/javascript">
var END_POINT="<%=request.getContextPath()%>/bfapp";
var BDOM = BFC.util.DOM;
//项目工单列表查询
function queryAcceptProjectList(home_city, group_id,product_id){
	  // var tmpSysfuncId=getMenuFuncId();
	   var buffalo = new Buffalo(END_POINT,false);
	  // buffalo.remoteCall("jsf:ngGroupProductMgr.queryAcceptProjectList",[home_city, group_id,product_id,""+tmpSysfuncId+""],
	  buffalo.remoteCall("ngGroupProductMgr.queryAcceptProjectList",[],
	     function(reply){
			debugger;
			var result=reply.getResult();
			if($("project_name_select").length != 0){
				 BDOM.removeAllOption($("project_name_select"));
			}
           
		    var ProjectInfoList = new Array('aaa','bbb','ccc'); 
			for(var i=0;i<ProjectInfoList.length;i++){
			  var tmp=ProjectInfoList[i];
			  var oOption = document.createElement("OPTION");
			  oOption.value = tmp[0];
			  oOption.text = tmp[1];
		
			  $("project_name_select").add(oOption);
			}
			if($("project_id").value==""){
				project_name_select_onchange();
			}else{
				$("project_name_select").value= $("project_id").value; 
			}
			GetProjectRequireCollectInfo($("project_name_select").value);
	   });
}

//获取项目名称
function getProjectName(home_city,group_id,product_id,project_id){
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	resInfo[0]="row-*";
	var sysFuncId = getMenuFuncId();
	
	keyInfo.push("home_city");
	valueInfo.push(home_city);
	keyInfo.push("group_id");
	valueInfo.push(group_id);
	keyInfo.push("product_id");
	valueInfo.push(product_id);
	keyInfo.push("project_id");
	valueInfo.push(project_id);
	keyInfo.push("opr_code");
	valueInfo.push("9");

	//GPOS_CommonBssp
	buffalo.remoteCall("jsf:BaseOprAction.callService",["13001374", sysFuncId, keyInfo, valueInfo, resInfo, false], function(reply) {
		var result = reply.getResult();
		if ( result.retResult == 0 &&  result.retResult != 999999999 ) {
			var beanList = result.returnList;
			if ( beanList != "" ) {
				var bean = beanList[0];
				$("project_name").value = bean.project_name;
			} 
		}else {
			$("project_name").value = project_id;
		}
	});
}

function contract_name_select_onchange(){
	$("contract_uid").value= $("contract_name_select").value;
	$("contract_name").value= BDOM.getOptionText($("contract_name_select"),$("contract_name_select").value);
}

//获取项目名称
function project_name_select_onchange(){

	var cur_product = $("product_id").value;

	$("project_id").value = $("project_name_select").value;
	$("project_name").value = BDOM.getOptionText($("project_name_select"),$("project_name_select").value);

	queryGroupContractInfo($("project_name_select").value);
}

//获取合同信息
function queryGroupContractInfo(project_id){
	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];
	resInfo[0]="row-1";

	keyInfo.push("home_city");
	//valueInfo.push();
	valueInfo.push("a");
	
	keyInfo.push("group_id");
	//valueInfo.push(parent.getGroupId());
    valueInfo.push("b");
    
	keyInfo.push("project_id");
	valueInfo.push(project_id);

	//buffalo.remoteCall("jsf:BaseOprAction.callService",["13000942", getMenuFuncId(), keyInfo, valueInfo, resInfo, false], function(reply) {
	buffalo.remoteCall('ngGroupProductMgr.queryGroupContractInfo',keyInfo,valueInfo,resInfo,function(reply) {
		var result = reply.getResult();
		if ( result.retResult == 0 &&  result.retResult != 999999999 ) {
			debugger;
			var bean = result.returnBean;
			if ( bean != "" ) {
				$("handle_level_name").value = bean.handle_level_name;
			} 
		}else if(result.retResult == 999999999){
			return false;
		}else{
			showMsg(result.retMsg);
			return false;
		}
		
	});
}


</script>
	</head>
	<body onload="queryAcceptProjectList('a','b','c');"><!--
		<p>
			Buffalo Hello World
		</p>
		--><p>
			&nbsp;
		</p><!--
		<form name="form1" method="post" action="">
			Your name:
			<input name="myname" type="text" id="myname">
			<input type="button" name="Submit" value="Hello" onclick=hello();>
		</form>
<iframe frameborder="0" scrolling="yes" height="100%"
													width="100%" name="grp_info" id="grp_info"
													src="grp_addinfo.jsf">
												</iframe>
		--><table id="grp_info" name ="grp_info" width="100%" height="30px" border="0"
			cellpadding="0" cellspacing="0" class="ButtonDownBg">
			<tr>
				<th width="16%">
					<span style="width: 12%; color: #ff0000;">*</span>
					项目名称：
				</th>
				<td width="22%" >
					<select id="project_name_select"
						onchange="project_name_select_onchange();"
						style="width: 100%; display: block">
					</select>
					<input id="project_name" type="hidden" readonly="readonly" />
				</td>
				<th width="16%" >
					<span style="width: 12%; color: #ff0000;">*</span>
					项目编号：
				</th>
				<td width="22%">
					<input id="project_id" disabled="true" style="width: 100%;" />
				</td>
			</tr>
			<tr>
				
				<th width="16%">
					<span style="width: 12%; color: #ff0000;">*</span>
					合同名称：
				</th>
				<td width="44%" colspan="3">
					<select id="contract_name_select"
						onchange="contract_name_select_onchange();"
						style="width: 100%; display: block">
					</select>
					<input id="contract_id" type="hidden" readonly="readonly" />
					<input id="contract_name" type="hidden" readonly="readonly" />
				</td>
			</tr>
		</table>


	</body>
</html>