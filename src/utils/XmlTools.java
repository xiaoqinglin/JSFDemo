package utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

import com.alibaba.fastjson.JSONObject;

public class XmlTools {

	 public static JSONObject xml2JSON(byte[] xml) throws JDOMException, IOException {
	        JSONObject json = new JSONObject();
	        InputStream is = new ByteArrayInputStream(xml);
	        SAXBuilder sb = new SAXBuilder();
	        org.jdom.Document doc = sb.build(is);
	        Element root = doc.getRootElement();
	        json.put(root.getName(), iterateElement(root));
	        return json;
	    }

	    private static JSONObject iterateElement(Element element) {
	        List node = element.getChildren();
	        Element et = null;
	        JSONObject obj = new JSONObject();
	        List list = null;
	        for (int i = 0; i < node.size(); i++) {
	            list = new LinkedList();
	            et = (Element) node.get(i);
	            if (et.getTextTrim().equals("")) {
	                if (et.getChildren().size() == 0)
	                    continue;
	                if (obj.containsKey(et.getName())) {
	                    list = (List) obj.get(et.getName());
	                }
	                list.add(iterateElement(et));
	                obj.put(et.getName(), list);
	            } else {
	                if (obj.containsKey(et.getName())) {
	                    list = (List) obj.get(et.getName());
	                }
	                list.add(et.getTextTrim());
	                obj.put(et.getName(), list);
	            }
	        }
	        return obj;
	    }
	    
	   public static void main(String[] args) {
		
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
			json = xml2JSON(xml.getBytes());
			System.out.println(json.toJSONString());
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	        
	}

        
}
