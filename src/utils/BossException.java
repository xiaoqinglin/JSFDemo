package utils;

import java.util.Map;
import java.util.TreeMap;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import java.util.Iterator;
import org.dom4j.*;

/**
 *
 * <p>Title: ������</p>
 *
 * <p>Description:�쳣��Ϣ�� </p>
 *
 * <p>Copyright: Copyright (c) 2005-2007</p>
 *
 * <p>Company: fmcc&newland</p>
 *
 * @author lijunliang
 * @version 1.0
 */
public class BossException extends RuntimeException {

    public static final String SEND_DATA_ERR   = "����������쳣";
    public static final String OPERATE_ERR     = "�����쳣";
    public static final String FACES_EXCEPTION = "ϵͳ�쳣";

    public static final String EXCEPT_BUSINESS = "1";
    public static final String EXCEPT_DB       = "-1";
    public static final String EXCEPT_OS       = "-2";
    public static final String EXCEPT_MIDDLE   = "-3";
    public static final String EXCEPT_TIMEOUT  = "-4";
    public static final String EXCEPT_FORMAT   = "-5";
    public static final String EXCEPT_MEMDB    = "-6";
    public static final String EXCEPT_BSSP     = "-7";
    public static final String EXCEPT_VERIFY   = "-8";

    private String sMessage="";
    public static Map exceptMap = new TreeMap();
    static {
        exceptMap.put(EXCEPT_BUSINESS, "ҵ�����");
        exceptMap.put(EXCEPT_DB, "ϵͳ����");
        exceptMap.put(EXCEPT_OS, "ϵͳ����");
        exceptMap.put(EXCEPT_MIDDLE, "ϵͳ����");
        exceptMap.put(EXCEPT_TIMEOUT, "ϵͳ����");
        exceptMap.put(EXCEPT_FORMAT, "ϵͳ����");
        exceptMap.put(EXCEPT_MEMDB, "ϵͳ����");
        exceptMap.put(EXCEPT_BSSP, "ϵͳ����");
        exceptMap.put(EXCEPT_VERIFY, "ϵͳ����");
    }

    public BossException(String msg){
        //super(msg);
        this.sMessage=msg;
    }

    /**
     * ����ʧ�ܻ�ȡ��ʾ��Ϣ
     * @param xmlStr String
     * @return String
     * @throws Exception
     */
    public static String getMsg(String xmlStr){
        String msg = "";
        Document doc = null;
        try {
            doc = DocumentHelper.parseText(xmlStr);
        } catch (DocumentException ex) {
            return xmlStr;
        }

        Element root = doc.getRootElement();
        for(Iterator it = root.elementIterator(); it.hasNext(); ){
            Element e = (Element) it.next();
            if( "msg_type".equals( e.getName()) ){
                //msg += exceptMap.get(e.getData());
                //msg += "��";
            }
            if( "msg_content".equals( e.getName() ) ){
                msg += e.getData();
            }
        }
        return msg;
    }

    /**
     * �Իس������Ž����滻
     * @param xmlStr String
     * @return String
     * @throws Exception
     */
    public static String doEsc(String xmlStr) throws Exception {
        if( xmlStr == null ) return "";
        return  com.newland.base.util.ESCString.getESCforJavaScript(xmlStr);
    }
    @Override
	public String getMessage(){
       return this.sMessage;
    }
}
