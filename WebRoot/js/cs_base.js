/**
 * SALE_QueryAcceptProjectList 获取销售中心项目工单列表   productId 集团信息 无产品 add by linxq
 */
//var groupId = document.forms.grpBaseInfoForm["grpBaseInfoForm:group_id"].value;
var ProjectInfoList = new Array();
function getAcceptProjectList(home_city, group_id, product_id) {
	if (product_id == 'undefined') {
		product_id = '';
	}
	//document.forms.grpBaseInfoForm["grpBaseInfoForm:product_id"].value = productId;

	var keyInfo = [];
	var valueInfo = [];
	var resInfo = [];

	resInfo[0] = "ProjectInfoList-*";
	keyInfo.push("home_city");
	valueInfo.push(home_city);
	keyInfo.push("group_id");
	valueInfo.push(group_id);
	keyInfo.push("product_id");
	valueInfo.push(product_id);

	buffalo.remoteCall("jsf:BaseOprAction.callService", [ "13000842",
			getMenuFuncId(), keyInfo, valueInfo, resInfo, false ], function(
			reply) {
		debugger;
		var result = reply.getResult();

		if (result.retResult == 0 && result.retResult != 999999999) {

			BDOM.removeAllOption($("project_name_select"));

			ProjectInfoList = result.ProjectInfoList;
			for ( var i = 0; i < ProjectInfoList.length; i++) {
				var tmp = result[i];
				var oOption = document.createElement("OPTION");
				oOption.value = tmp[0];  
				oOption.text = tmp[1];   
				 $("project_name_select").add(oOption);
			}
			
			if($("project_id").value==""){
				project_name_select_onchange(); //获取
			}else{
				$("project_name_select").value= $("project_id").value;
			}

		} else {

		}
	});

}

function project_name_select_onchange(){

	$("project_id").value = $("project_name_select").value;
	$("project_name").value = BDOM.getOptionText($("project_name_select"),$("project_name_select").value);
	
}

/**
 * SALE_QueryAcceptProjectList 获取销售中心项目工单列表 add by linxq
 */
function getAcceptProjectList(productId) {
	var home_city = document.forms.grpBaseInfoForm["grpBaseInfoForm:home_city"].value;
	var home_county = document.forms.grpBaseInfoForm["grpBaseInfoForm:home_county"].value;
	if (document.forms.grpBaseInfoForm["grpBaseInfoForm:org_zone"].options.length != 0) {
		removeAllOption(document.forms.grpBaseInfoForm["grpBaseInfoForm:org_zone"]);
	}
	if (home_county != -1 && home_county != null && home_county != "") {
		var keyInfo = [];
		var valueInfo = [];
		var resInfo = [];

		resInfo[0] = "row-*";
		keyInfo.push("home_city");
		valueInfo.push(home_city);
		keyInfo.push("home_county");
		valueInfo.push(home_county);
		keyInfo.push("operator_id");
		valueInfo.push(parent.operId);

		keyInfo.push("isfilter");
		valueInfo.push("1");

		buffalo
				.remoteCall(
						"jsf:BaseOprAction.callService",
						[ "13000842", getMenuFuncId(), keyInfo, valueInfo,
								resInfo, false ],
						function(reply) {
							var result = reply.getResult();
							if (result.retResult == 0
									&& result.retResult != 999999999) {
								var list = result.returnList;
								if (list != null && list != "") {
									if (list.length == 0) {
										setinvalidOrg_zone();
										return false;
									}
									var j = 0;
									for ( var i = 0; i < list.length; i++) {
										var option = new Option(
												list[i].org_name,
												list[i].org_id);
										document.forms.grpBaseInfoForm["grpBaseInfoForm:org_zone"].options[j] = option;
										j++;
									}
									if (subObjValue != null
											&& subObjValue != "") {
										document.forms.grpBaseInfoForm["grpBaseInfoForm:org_zone"].value = subObjValue;
									}
								} else {
									setinvalidOrg_zone();
								}
							} else if (result.retResult == 999999999) {
								setinvalidOrg_zone();
								return false;
							} else {
								setinvalidOrg_zone();
								showMsg(result.retMsg);
								return false;
							}
						});
	} else {
		setinvalidOrg_zone();
	}
}

function invokeQueryGroupInfo() {
	var tmpSysfuncId = getMenuFuncId();
	buffalo.remoteCall("jsf:ngGroupProductMgr.queryGroupInfo", [ homeCity,
			groupId, payment_msisdn, "0", tmpSysfuncId ], function(reply) {
		var result = reply.getResult();
		groupInfo = result;
		showGroupInfo(result);
		showGroupProductInfo(result.productList);
	});
}

var canChangeProductList = new Array();
function queryCanChangeProductInfo(product_id) {
	var tmpSysfuncId = getMenuFuncId();
	buffalo.remoteCall("jsf:ngGroupProductMgr.queryCanChangeProductInfo", [
			"0", product_id, "" + tmpSysfuncId + "" ], function(reply) {
		var result = reply.getResult();
		canChangeProductList = result;
		BDOM.removeAllOption($("product_name_select"));
		for ( var i = 0; i < result.length; i++) {
			var tmp = result[i];
			var oOption = document.createElement("OPTION");
			oOption.value = tmp.product_id;
			oOption.text = tmp.product_name;
			$("product_name_select").add(oOption);
		}

		if ($("product_id").value == "") {
			product_name_select_onchange();
		} else {
			$("product_name_select").value = $("product_id").value;
		}
	});
}
function product_name_select_onchange() {
	$("product_id").value = $("product_name_select").value;
	$("product_name").value = BDOM.getOptionText($("product_name_select"),
			$("product_name_select").value);
	for ( var i = 0; i < canChangeProductList.length; i++) {
		var tmp = canChangeProductList[i];
		if (tmp.product_id == $("product_name_select").value) {
			$("product_desc").innerText = tmp.product_desc;
			initProductParamDiv('3');
			changeProductParam(oldproductparamList);
			break;
		}
	}
}