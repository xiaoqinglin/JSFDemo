package ng;

import java.io.IOException;

import org.jdom.JDOMException;

import utils.XmlTools;

import com.alibaba.fastjson.JSONObject;

public class GroupProductMgr {

	
	public String queryAcceptProjectList(){
		
		
		   String xml = "<?xml version=\"1.0\" encoding=\"GBK\"?>    "+
			"<Response>                                                   "+
			"  <resultCode>0000</resultCode>                              "+
			"  <resultDesc>SUECESS</resultDesc>                           "+
			"  <from>DDZX</from>                                          "+
			"  <returnTime>20160415215743</returnTime>                    "+
			"  <order_content>                                            "+
			"    <ProjectInfoList>                                        "+
			"      <home_city>591</home_city>                             "+
			"      <group_id>5911915435</group_id>                        "+
			"      <Project_id>FZ1013676201805070001</Project_id>         "+
			"      <Project_name>中坚集团广域网专线1</Project_name>                "+
			"      <project_type>开通</project_type>                        "+
			"    </ProjectInfoList>                                       "+
			"    <ProjectInfoList>                                        "+
			"      <home_city>591</home_city>                             "+
			"      <group_id>5911915435</group_id>                        "+
			"      <Project_id>FZ1013676201805070001</Project_id>         "+
			"      <Project_name>中坚集团广域网专线1</Project_name>                "+
			"    </ProjectInfoList>                                       "+
			"  </order_content>                                           "+
			"</Response>                                                  ";
		  
		   JSONObject json;
		try {
			json = XmlTools.xml2JSON(xml.getBytes());
			String xmlString = json.toJSONString();
			return xmlString;
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//JSONArray xmlString1 = XmlTools.xml2Json(xmlString);
		return "";
	}
	
	
	public String queryGroupContractInfo (){
		  String xml = "<?xml version=\"1.0\" encoding=\"GBK\" ?>" +
		  		" <operation_out> " +
		  		"<content> " +
		  		"<response>  " +
		  		"<resultCode>0000</resultCode> " +
		  		"<resultDesc>SUCCESS</resultDesc>  " +
		  		"<from>Sales</from> " +
		  		"<returnTime>20180808084409</returnTime> " +
		  		"<order_content>  " +
		  		"<contract_info_list> " +
		  		"<home_city></home_city><group_id>5911915297</group_id>  <contract_id>FZ102018080760082759</contract_id>  <contract_name>集团成员管理测试合同1</contract_name>  <accept_time>20180807072024</accept_time> <sign_time>20180807072037</sign_time>  <end_time></end_time> <customer_manage>1000182</customer_manage>  <project_manager></project_manager> <statenote></statenote>  <contract_content></contract_content> <remark></remark>  <modify_time>20180807072123</modify_time> <operator_id>1000182</operator_id>  <contract_end_time>20200808</contract_end_time> <group_type></group_type>  <manager_name>管志敏</manager_name> <contract_uid>200000000223</contract_uid>  " +
		  		"</contract_info_list> " +
		  		"<contract_info_list> " +
		  		"<home_city></home_city><group_id>5911915297</group_id>  <contract_id>FZ102018080760082759</contract_id>  <contract_name>集团成员管理测试合同1</contract_name>  <accept_time>20180807072024</accept_time> <sign_time>20180807072037</sign_time>  <end_time></end_time> <customer_manage>1000182</customer_manage>  <project_manager></project_manager> <statenote></statenote>  <contract_content></contract_content> <remark></remark>  <modify_time>20180807072123</modify_time> <operator_id>1000182</operator_id>  <contract_end_time>20200808</contract_end_time> <group_type></group_type>  <manager_name>管志敏</manager_name> <contract_uid>200000000223</contract_uid>  " +
		  		"</contract_info_list>"+
		  		"</order_content> </response> </content>  <accept_id>200971496918</accept_id>  <response_time>20180808084409</response_time> <log_platform>1</log_platform>  <response> <resp_result>0</resp_result> <resp_code>0000</resp_code>  <resp_desc></resp_desc> </response> </operation_out>";

		  
		   JSONObject json;
		try {
			json = XmlTools.xml2JSON(xml.getBytes());
			String xmlString = json.toJSONString();
			return xmlString;
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//JSONArray xmlString1 = XmlTools.xml2Json(xmlString);
		return "";
	}
	
}
