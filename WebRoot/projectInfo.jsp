<%@page contentType="text/html; charset=GBK"%>
<%@include file="./inc.jsp"%>
<!DOCTYPE html>
<html xmlns:nl>
	<head>
		<title>My JSP 'projectInfo.jsp' starting page</title>
	</head>
	<script type="text/javascript">
	var isSaleCenter = true;//默认调用销售中心侧
	/*
	0：用户号码
	1：用户标识
	5：集团编码
	7：VPN标识
	12：固话用户标识
	13：固话号码：
	15：SIM卡IMSI
	26：APN标识
	27：VPDN用户标识
	*/
	var obj_type = {
		USER_MISISDN: "0",//0：用户号码
		USER_FLAG:    "1",//1：用户标识
		GROUP_NUM:     "5",//5：集团编码
		VPN_FLAG:      "7",//7：VPN标识
		GROUP_MEMINFO: "12"//12：固话用户标识
	};
	
	var proIdConstant = {
		GRP_BASEINFO_PROID:'21400104',           //客户基础信息产品编码 21400104
		GRP_BASEINFO_OPR_PROID: '21400104',      //集团客户信息管理（修改）,删除
		GRP_MEMINFO_PROID:'21400201',            //客户成员采编产品编码
		GRP_bILLRELA_PROID:'10602900',           //集团成员出账关系定制
		GRP_VPN_MANAGE_PROID:'10601101',         //VPN管理页面
		GRP_VPN_MANAGE_OPR_PROID:'10600622',     //VPN网成员增、删
		GRP_PAYOPEN_PROID:'10680600',            //集团付费号码开户
		GRP_PAY_MOD_PROID:'10600130',            //集团付费号码修改
		GRP_PAY_CANCEL_PROID:'10680700'          //销户
		//付费号码担保复机
		
	};
	
	var _PROJECT_INFO = {
	      /**
	       项目工单列表查询    formName\obj_type\obj_id\home_city\group_id\product_id
	   	 */
	   queryAcceptProjectList: function(queryProMap){
	   
	        var formName = queryProMap.formName;
	        var home_city = queryProMap.home_city;
	        var group_id = queryProMap.group_id;
	        
	       	if(formName !=null && formName!= ""){
	       		eval("var project_name_select = document.forms."+formName+"['"+formName+":project_name_select'];");
	   			eval("var project_name = document.forms."+formName+"['"+formName+":project_name'];");
	   			eval("var project_id = document.forms."+formName+"['"+formName+":project_id'];");
	   		}else{
	   			var project_name_select = $("project_name_select");
	   			var project_name = $("project_name");
	   			var project_id = $("project_id");
	   		}
	   		
	   		if(home_city == ""){
	   			showMsg("归属县市不能为空，请确认！");
	   			return false;
	   		}
	   		
	   		var keyInfo = [];
			var valueInfo = [];
			var resInfo = [];
			
			keyInfo.push("object_info-obj_type");
			valueInfo.push(queryProMap.obj_type);
			keyInfo.push("object_info-obj_id");
			valueInfo.push(queryProMap.obj_id);
			keyInfo.push("object_info-home_city");
			
			valueInfo.push(home_city); 
			keyInfo.push("home_city");
			valueInfo.push(home_city); 
			keyInfo.push("group_id");
			valueInfo.push(group_id);
			keyInfo.push("product_id");
			valueInfo.push(queryProMap.product_id);
			
			resInfo.push("response-order_content-project_info_list-*");
			//  BDOM.getMenuFuncId()
			var ini_beanList;
			var buffalo_sync = new Buffalo(END_POINT, false);
			//buffalo_sync.remoteCall("jsf:BaseOprAction.callService", ["13001530", "99999981", keyInfo, valueInfo, resInfo, false], function(reply) {
			buffalo_sync.remoteCall("ngGroupProductMgr.queryAcceptProjectList",[],
	     function(reply){
				var ini_result = reply.getResult();
				ini_beanList = ini_result.returnList;
				ini_beanList = new Array({'project_id':'1','project_name':'a'},
										{'project_id':'2','project_name':'b'},
										{'project_id':'3','project_name':'c'});
			//	if (ini_result.retResult == 0) {
			
			if (true) {
					if(project_name_select.length != 0){
						project_id.value = project_name_select.value; //必须先赋值
						BDOM.removeAllOption( project_name_select);
					}
				
					for (var i = 0; i < ini_beanList.length; i++) {
						BDOM.addOption(project_name_select, ini_beanList[i].project_id, ini_beanList[i].project_name);
					}
					//BDOM.getOptionIndex("project_name_select")
				//	project_name.value = ini_beanList[0].project_name;
				 // project_id.value = ini_beanList[0].project_id;
					if(project_id.value==""){
						_PROJECT_INFO.project_name_select_onchange(formName);
					}else{
						  project_name_select.value = project_id.value;
		  				  project_name.value = BDOM.getOptionIndex2(project_name_select,project_id.value);
					}
					
					
				}else{
					showMsg(ini_result.retMsg);
					return false;
				}
			});
			if(ini_beanList == null || ini_beanList == 'undefined'){
				return false;
			}
	   		return true;
			
	   },
	   /**
	   合同信息查询 销售中心侧提供 formName\obj_type\obj_id\home_city\group_id\product_id
	   */
	   getProjectRequireCollectInfobySaleCent: function(queryProMap){
	   
	   		var formName = queryProMap.formName;
	        var home_city = queryProMap.home_city;
	        var group_id = queryProMap.group_id;
	        
	   		if(formName !=null && formName!= ""){
	   			eval("var contract_name_select = document.forms."+formName+"['"+formName+":contract_name_select'];");
	   			eval("var contract_name = document.forms."+formName+"['"+formName+":contract_name'];");
	   			eval("var contract_id = document.forms."+formName+"['"+formName+":contract_id'];");
	   		}else{
	   			var contract_name_select = $("contract_name_select");
	   			var contract_name = $("contract_name");
	   			var contract_id = $("contract_id");
	   		}
	   		
	   		var keyInfo = [];
			var valueInfo = [];
			var resInfo = [];
			
			keyInfo.push("object_info-obj_type");
			valueInfo.push(queryProMap.obj_type);
			keyInfo.push("object_info-obj_id");
			valueInfo.push(queryProMap.obj_id);
			keyInfo.push("object_info-home_city");
			
			valueInfo.push(home_city); 
			keyInfo.push("home_city");
			valueInfo.push(home_city); 
			keyInfo.push("group_id");
			valueInfo.push(group_id);
			keyInfo.push("product_id");
			valueInfo.push(queryProMap.product_id);
			
			resInfo.push("response-order_content-contract_info_list-*");
			
			var ini_beanList;
			var buffalo_sync = new Buffalo(END_POINT, false);
			//buffalo_sync.remoteCall("jsf:BaseOprAction.callService", ["13001531", "99999981", keyInfo, valueInfo, resInfo, false], function(reply) {
			buffalo_sync.remoteCall("ngGroupProductMgr.queryGroupContractInfo",[],
	   		  function(reply){
				var ini_result = reply.getResult();
				ini_beanList = ini_result.returnList;
				
					ini_beanList = new Array({'contract_id':'1','contract_name':'a'},
										{'contract_id':'2','contract_name':'b'},
										{'contract_id':'3','contract_name':'c'});
	
				
				//if (ini_result.retResult == 0) {
				if(true){
					if(contract_name_select.length != 0){
					 BDOM.removeAllOption(contract_name_select);
					}
					
					for (var i = 0; i < ini_beanList.length; i++) {
						BDOM.addOption(contract_name_select, ini_beanList[i].contract_id, ini_beanList[i].contract_name);
					}
					//BDOM.getOptionIndex(project_name_select，0)
				//	contract_name.value = ini_beanList[0].contract_name;
		  		//	contract_id.value = ini_beanList[0].contract_id;
		  			
		  			if(contract_id.value==""){
						_PROJECT_INFO.contract_name_select_onchange(formName);
					}else{
						contract_name_select.value= contract_id.value;
					}
					
				}else{
					showMsg(ini_result.retMsg);
					return false;
				}
			});
	
	   },
	   	/*合同编码信息查询  区分是否调销售中心侧提供
	   	CS_QueryGroupContract
	   	*/
	    getProjectRequireCollectInfo: function(queryProMap){
	    
	    	var formName = queryProMap.formName;
	        var home_city = queryProMap.home_city;
	        var group_id = queryProMap.group_id;
	        
	        if(formName !=null && formName!= ""){
	   			eval("var contract_name_select = document.forms."+formName+"['"+formName+":contract_name_select'];");
	   			eval("var contract_name = document.forms."+formName+"['"+formName+":contract_name'];");
	   		}else{
	   			var contract_name_select = $("contract_name_select");
	   			var contract_name = $("contract_name");
	   		}
	        
		   var tmpSysfuncId= '10628000';//getMenuFuncId();
		   if(isSaleCenter){
			   _PROJECT_INFO.getProjectRequireCollectInfobySaleCent(queryProMap);
		   }else{
			   buffalo.remoteCall("jsf:ngGroupProductMgr.queryGroupContractInfo",[home_city, group_id,"",""+tmpSysfuncId+""],
			     function(reply){
					var result=reply.getResult();
					
					if(contract_name_select.length != 0){
					 BDOM.removeAllOption(contract_name_select);
					}
					
					for(var i=0;i<result.length;i++){
					  var tmp=result[i];
					  var oOption = document.createElement("OPTION");
					  oOption.value = tmp[0];
					  oOption.text = tmp[1];
					  oOption.title = tmp[1];
					  contract_name_select.add(oOption);
					}
					if(contract_id.value==""){
						_PROJECT_INFO.contract_name_select_onchange();
					}else{
						contract_name_select.value= contract_id.value;
					}
			   });
			}
		}, 
	   /**
	    选择项目名称
	   */
	   project_name_select_onchange:function (formName){
		 
		 debugger;
		 if(formName !=null && formName!= ""){
		 	 eval("var project_id = document.forms."+formName+"['"+formName+":project_id'];");
	   	  	 eval("var project_name_select = document.forms."+formName+"['"+formName+":project_name_select'];");
	   	 	 eval("var project_name = document.forms."+formName+"['"+formName+":project_name'];");
	   	 }else{
	   		var project_id = $("project_id");
	   		var project_name_select = $("project_name_select");
	   		var project_name = $("project_name");
	   	 }
		  project_id.value = project_name_select.value;
		  project_name.value = BDOM.getOptionText(project_name_select,project_id.value);
		  
	    },
	    /**
	    选择某项合同
	    */
	    contract_name_select_onchange: function(formName){
	     
	     if(formName !=null && formName!= ""){
	   	  eval("var contract_id = document.forms."+formName+"['"+formName+":contract_id'];");
	   	  eval("var contract_name_select = document.forms."+formName+"['"+formName+":contract_name_select'];");
	   	  eval("var contract_name = document.forms."+formName+"['"+formName+":contract_name'];");
	   	 }else{
	   		var contract_id = $("contract_id");
	   		var contract_name_select = $("contract_name_select");
	   		var contract_name = $("contract_name");
	   	 }	
		  contract_id.value = contract_name_select.value;
		  contract_name.value = BDOM.getOptionText(contract_name_select,contract_id.value);
	    }
    
	}

//--------------------------------------------------------
	function pageInit(formName){
		eval("var group_id = document.forms."+formName+"['"+formName+":group_id'];");
		var map = {
			'formName':formName,
			'obj_type':obj_type.GROUP_NUM,
			'obj_id':group_id.value,
			'home_city':'591',
			'group_id':group_id.value,
			'product_id':'21400201'
		};
		_PROJECT_INFO.queryAcceptProjectList(map);
		_PROJECT_INFO.getProjectRequireCollectInfo(map);
	}
	
	function projectNameSelectOnchange(formName){
	  
		debugger;
		eval("var group_id = document.forms."+formName+"['"+formName+":group_id'];");
		var map = {
			'formName':formName,
			'obj_type':obj_type.GROUP_NUM,
			'obj_id':group_id.value,
			'home_city':'591',
			'group_id':group_id.value,
			'product_id':'21400201'
		};
		_PROJECT_INFO.queryAcceptProjectList(map);
		_PROJECT_INFO.getProjectRequireCollectInfo(map);
	}
	</script>

	<f:view>
		<body onload="pageInit('addinfo')">
		
			<h:form id='addinfo'>
				<h:inputHidden id="home_city" value="591"/>
				<h:inputHidden id="group_id" value="5911915297"/>
				<table width="100%" border="1" cellpadding="0" cellspacing="0" >
					
					<tr id="saleProjectTR" >
						<th width="16%">
							<span style="width: 12%; color: #ff0000;">*</span> 项目名称：
						</th>
						<td width="22%">
							<h:selectOneListbox id="project_name_select"
								onchange="projectNameSelectOnchange('addinfo');"
								style="width: 100%; display: block">
							</h:selectOneListbox>
							<h:inputHidden id="project_name" />
						</td>
						<th width="16%">
							<span style="width: 12%; color: #ff0000;">*</span> 项目编号：
						</th>
						<td width="22%">
							<h:inputText id="project_id" style="width: 100%;" readonly="true" />
						</td>
					</tr>
					<tr id="saleContractTR" >

						<th width="16%">
							<span style="width: 12%; color: #ff0000;">*</span> 合同名称：
						</th>
						<td width="44%" colspan="3">
							<h:selectOneListbox id="contract_name_select"
								onchange="_PROJECT_INFO.contract_name_select_onchange('addinfo');"
								style="width: 100%; display: block">
							</h:selectOneListbox>
							<h:inputHidden id="contract_name" />
							<h:inputHidden id="contract_id" />
						</td>
					</tr>
					<tr>
						<th>
						提交
						</th>
						<td>
							<h:commandButton onclick="projectNameSelectOnchange('addinfo');"></h:commandButton>
						</td>
					</tr>
				</table>
			</h:form>
		</body>
	</f:view>
</html>
