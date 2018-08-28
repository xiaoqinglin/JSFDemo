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
 * <p>Title: 公共类</p>
 *
 * <p>Description:异常信息类 </p>
 *
 * <p>Copyright: Copyright (c) 2005-2007</p>
 *
 * <p>Company: fmcc&newland</p>
 *
 * @author lijunliang
 * @version 1.0
 */
public class BossException extends RuntimeException {

    public static final String SEND_DATA_ERR   = "发送请求包异常";
    public static final String OPERATE_ERR     = "操作异常";
    public static final String FACES_EXCEPTION = "系统异常";

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
        exceptMap.put(EXCEPT_BUSINESS, "业务错误");
        exceptMap.put(EXCEPT_DB, "系统错误");
        exceptMap.put(EXCEPT_OS, "系统错误");
        exceptMap.put(EXCEPT_MIDDLE, "系统错误");
        exceptMap.put(EXCEPT_TIMEOUT, "系统错误");
        exceptMap.put(EXCEPT_FORMAT, "系统错误");
        exceptMap.put(EXCEPT_MEMDB, "系统错误");
        exceptMap.put(EXCEPT_BSSP, "系统错误");
        exceptMap.put(EXCEPT_VERIFY, "系统错误");
    }

    public BossException(String msg){
        //super(msg);
        this.sMessage=msg;
    }

    /**
     * 交易失败获取提示信息
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
                //msg += "。";
            }
            if( "msg_content".equals( e.getName() ) ){
                msg += e.getData();
            }
        }
        return msg;
    }

    /**
     * 对回车和引号进行替换
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
