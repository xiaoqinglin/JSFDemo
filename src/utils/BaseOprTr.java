package utils;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.newland.base.logger.SimpleLogger;
import com.newland.business.config.BossSysConf;
import com.newland.business.db.ResultXML;
import com.newland.business.db.SendData;
import com.newland.business.db.XMLData;
import com.newland.business.http.CallService;

public class BaseOprTr {
    private static SimpleLogger mLogger = SimpleLogger.getInitLogger(BaseOprTr.class);

    /**
     * 默认分割符号
     */
    private String divisionFlag = "-";

    public String getDivisionFlag() {
        return divisionFlag;
    }

    public void setDivisionFlag(String divisionFlag) {
        this.divisionFlag = divisionFlag;
    }

    /**
     * 简单类型报文通用调用类支持多keys和values即可以在js中同时放多个相同的keys
     * 
     * @param serviceCode
     *            服务号
     * @param sysfuncId
     *            按钮功能号
     * @param keys
     *            请求报文节点列表。每个节点默认以"-"作为分割符。如：cust_info-name,user_info-type。可以放置多个相同的keys
     * @param values
     *            请求报文节点对应的值
     * @return ResultXML
     * @throws Exception
     */
    public ResultXML callService(String serviceCode, String sysfuncId, List keys, List values) throws Exception {
        String resetFlag = ""; // 是否重新设置指针标志，提高性能
        SendData sd = new SendData(serviceCode, sysfuncId);
        sd.Init();

        for (int i = 0; i < keys.size(); i++) {
            String currNodeKeys = keys.get(i).toString();

            // 节点标志,防止多条数据设置到同一个节点
            int index = 0;
            for (int m = 0; m < i; m++) {
                if (currNodeKeys.equals(keys.get(m).toString())) {
                    index++;
                }
            }

            if (currNodeKeys.endsWith(divisionFlag)) {
                currNodeKeys = currNodeKeys.substring(0, currNodeKeys.length() - 1);
            }
            String currFlag = (currNodeKeys.lastIndexOf(divisionFlag) > 0) ? currNodeKeys.substring(0, currNodeKeys
                    .lastIndexOf(divisionFlag)) : "";
            String[] currNodes = currNodeKeys.split(divisionFlag);
            String key = currNodes[currNodes.length - 1];
            String lastNode = null;

            if (currNodes.length > 1) {
                lastNode = currNodes[currNodes.length - 2];
            }

            // 设置节点指针
            if (!currFlag.equals(resetFlag)) {
                sd.resetParentPointer();
                resetFlag = currFlag;

                for (int j = 0; j < currNodes.length - 2; j++) {
                    sd.node(currNodes[j]).setParentPointer();
                }
            }

            // 设置节点值，列表情况下，循环设置
            Object curObj = values.get(i);
            if (curObj instanceof ArrayList) {
                List curList = (ArrayList) curObj;
                for (int k = 0; k < curList.size(); k++) {
                    try {
                        sd.node(lastNode, k).node(key, index).setNull(curList.get(k).toString());
                    } catch (Exception e) {
                        mLogger.error(e.getLocalizedMessage());
                        throw new BossException(BossException.getMsg(e.getLocalizedMessage()));
                    }
                }
            } else {
                if (lastNode != null) {
                    sd.node(lastNode).node(key, index).setNull(curObj.toString());
                } else {
                    sd.node(key, index).setNull(curObj.toString());
                }
            }
        }
        sd.End();

        ResultXML rx = CallService.getNewInstance().Call(sd);

        return rx;
    }

    /**
     * 简单类型报文通用调用类支持多keys和values即可以在js中同时放多个相同的keys
     * 
     * @param serviceCode
     *            服务号
     * @param sysfuncId
     *            按钮功能号
     * @param keys
     *            请求报文节点列表。每个节点默认以"-"作为分割符。如：cust_info-name,user_info-type
     * @param values
     *            请求报文节点对应的值
     * @return
     * @throws Exception
     */
    public ResultXML callService4Multi(String serviceCode, String sysfuncId, List keys, List values) throws Exception {
        String resetFlag = ""; // 是否重新设置指针标志，提高性能
        if (keys.size() != values.size()) {
            String logMsg = "键keys的长度与键值values的长度不匹配,请查看日志进行相应核对!";
            logMsg += "keys.size:" + keys.size() + "----values.size:" + values.size();
            int len = 0;
            // 取最大的长度
            len = keys.size() >= values.size() ? keys.size() : values.size();
            for (int i = 0; i < len; i++) {
                if (i / 4 == 0) {// 有五个记录就换行
                    logMsg += "\n\r";
                    if (i > keys.size() - 1) {// 超过keys.size的值时
                        logMsg += "keys[" + i + "]:null----";
                    } else {
                        logMsg += "keys[" + i + "]:" + keys.get(i).toString() + "----";
                    }
                    if (i > values.size() - 1) {// 超过values.size的值时
                        logMsg += "values[" + i + "]:null\t\t";
                    } else {
                        logMsg += "values[" + i + "]:" + values.get(i).toString() + "\t\t";
                    }
                } else {
                    if (i > keys.size() - 1) {// 超过keys.size的值时
                        logMsg += "keys[" + i + "]:null----";
                    } else {
                        logMsg += "keys[" + i + "]:" + keys.get(i).toString() + "----";
                    }
                    if (i > values.size() - 1) {// 超过values.size的值时
                        logMsg += "values[" + i + "]:null\t\t";
                    } else {
                        logMsg += "values[" + i + "]:" + values.get(i).toString() + "\t\t";
                    }
                }
            }
            mLogger.info(logMsg);
            throw new BossException(BossException.getMsg("键keys的长度与键值values的长度不匹配,请查看日志进行相应核对!"));
        }
        
        boolean isExist=false;//是否存在null
        for (int i = 0; i < keys.size(); i++) {
            if(keys.get(i)==null || values.get(i)==null){
                isExist=true;
                break;
            }
        }
        if (isExist) {
            String logMsg = "键keys或键值values中存在null,请查看日志进行相应核对!";
            logMsg += "keys.size:" + keys.size() + "----values.size:" + values.size();

            for (int i = 0; i < keys.size(); i++) {
                if (i / 4 == 0) {// 有五个记录就换行
                    logMsg += "\n\r";
                    if (keys.get(i)==null) {
                        logMsg += "keys[" + i + "]:null----";
                    } else {
                        logMsg += "keys[" + i + "]:" + keys.get(i).toString() + "----";
                    }
                    if (values.get(i)==null) {// 超过values.size的值时
                        logMsg += "values[" + i + "]:null\t\t";
                    } else {
                        logMsg += "values[" + i + "]:" + values.get(i).toString() + "\t\t";
                    }
                } else {
                    if (keys.get(i)==null) {// 超过keys.size的值时
                        logMsg += "keys[" + i + "]:null----";
                    } else {
                        logMsg += "keys[" + i + "]:" + keys.get(i).toString() + "----";
                    }
                    if (values.get(i)==null) {// 超过values.size的值时
                        logMsg += "values[" + i + "]:null\t\t";
                    } else {
                        logMsg += "values[" + i + "]:" + values.get(i).toString() + "\t\t";
                    }
                }
            }
            mLogger.info(logMsg);
            throw new BossException(BossException.getMsg("键keys的长度与键值values的长度不匹配,请查看日志进行相应核对!"));
        }
        
        
        
        SendData sd = new SendData(serviceCode, sysfuncId);
        sd.Init();

        for (int i = 0; i < keys.size(); i++) {
            String currNodeKeys = keys.get(i).toString();

            // 节点标志,防止多条数据设置到同一个节点
            int index = 0;
            for (int m = 0; m < i; m++) {
                if (currNodeKeys.equals(keys.get(m).toString())) {
                    index++;
                }
            }

            if (currNodeKeys.endsWith(divisionFlag)) {
                currNodeKeys = currNodeKeys.substring(0, currNodeKeys.length() - 1);
            }
            String currFlag = (currNodeKeys.lastIndexOf(divisionFlag) > 0) ? currNodeKeys.substring(0, currNodeKeys
                    .lastIndexOf(divisionFlag)) : "";
            String[] currNodes = currNodeKeys.split(divisionFlag);
            String key = currNodes[currNodes.length - 1];
            String lastNode = null;

            if (currNodes.length > 1) {
                lastNode = currNodes[currNodes.length - 2];
            }

            // 设置节点指针
            if (!currFlag.equals(resetFlag)) {
                sd.resetParentPointer();
                resetFlag = currFlag;

                for (int j = 0; j < currNodes.length - 2; j++) {
                    sd.node(currNodes[j]).setParentPointer();
                }
            }

            // 设置节点值，列表情况下，循环设置
            Object curObj = values.get(i);
            if (curObj instanceof ArrayList) {
                List curList = (ArrayList) curObj;
                for (int k = 0; k < curList.size(); k++) {
                    try {
                        sd.node(lastNode, k).node(key, index).setNull(curList.get(k).toString());
                    } catch (Exception e) {
                        mLogger.error(e.getLocalizedMessage());
                        throw new BossException(BossException.getMsg(e.getLocalizedMessage()));
                    }
                }
            } else {
                if (index == 0) {
                    if (lastNode != null) {

                        sd.node(lastNode).node(key, index).setNull(curObj.toString());
                    } else {
                        sd.node(key, index).setNull(curObj.toString());
                    }

                } else {
                    if (lastNode != null) {

                        sd.node(lastNode, index).node(key).setNull(curObj.toString());
                    } else {
                        sd.node(key, index).setNull(curObj.toString());
                    }
                }

            }
        }
        sd.End();

        ResultXML rx = CallService.getNewInstance().Call(sd);

        return rx;
    }

    /**
     * 将ResultXML转换为通用的返回值类型CompositeVO
     * 
     * @param resNodes
     *            应答报文节点列表。每个节点默认以"-"作为分割符。如：cust_info-row-1,user_info-row-*;其中，最后一个标志为返回值是否为多条数据的标志，1为一条数据，*为多条数据
     * @param rx
     *            应答报文
     * @param addKeyPreFlag
     *            返回值的key是否增加节点作为前缀的标志，true：增加，key的格式如：cust_info-row-type；false：不增加，key为简单格式
     * @return
     * @throws Exception
     */
    public CompositeVO convertRx2CompositeVO(List resNodes, ResultXML rx, boolean addKeyPreFlag) throws Exception {
        CompositeVO compositeVO = new CompositeVO();
        // 对返回结果进行处理
        if (rx != null && rx.rtFlag && (resNodes != null)) {
            if(rx.bRetfragment){
                compositeVO.setFragment("1");
                compositeVO.setFragment_file(rx.sRetfragment_file);
            }else{
                compositeVO.setFragment("0");
                compositeVO.setFragment_file("");
            }
            // 取得xml文档
            XMLData xmlData = rx.xmldata;
            String xmlText = xmlData.getDocXML();

            // *************************************** test ****************************************
            // String xmlText = "<?xml version='1.0'
            // encoding='GBK'?><content><cust_info><customer_id>593100005582951</customer_id><cust_name>sisis</cust_name><ic_type>1</ic_type><ic_type_name>身份证</ic_type_name><ic_no>352229771004002</ic_no><address/><telephone/><postcode/><confirm_flag>0</confirm_flag><confirm_flag_name>无资料</confirm_flag_name></cust_info><user_id>593100005582961</user_id><msisdn>13706030649</msisdn><home_city>593</home_city><home_city_name>宁德</home_city_name><home_county>301</home_county><home_county_name>宁德市区</home_county_name><password>A70C78261E40BC5E</password><user_type>4</user_type><user_type_name>测试机</user_type_name><msisdn_type>3</msisdn_type><msisdn_type_name>GSM</msisdn_type_name><imsi>460006037128074</imsi><old_brand_id>1000</old_brand_id><old_brand_id_name>全球通(升级版)</old_brand_id_name><user_status>0</user_status><user_status_name>正常</user_status_name><bill_type>5</bill_type><bill_type_name>虚扣</bill_type_name><bill_credit>99999999</bill_credit><service_type>1</service_type><service_type_name>普通</service_type_name><create_operator>0</create_operator><create_operator_name>武夷山超级管理员</create_operator_name><order_id>100000015194</order_id><history_id>100000010073</history_id><sim_card_no>8987000000940094083</sim_card_no><sim_card_type>10</sim_card_type><sim_card_type_name>远程写卡</sim_card_type_name><bank_card_type>0</bank_card_type><bank_card_type_name>无</bank_card_type_name><create_time>20051118113447</create_time><open_time/><transfer_time/><stop_time/><expire_time/><modify_time>20060411163003</modify_time><operator_id>3014040</operator_id><modify_content>爱贝通平安卡开通绑定</modify_content><consume_level/><consume_level_name>零星级</consume_level_name><card_level>1</card_level><card_level_name>钻石卡</card_level_name><vip_card_no>12345678</vip_card_no><voucher_type>3</voucher_type><voucher_type_name>移动使用证</voucher_type_name><voucher_id>59300002</voucher_id><current_brand_id>1000</current_brand_id><current_brand_id_name>全球通(升级版)</current_brand_id_name><current_product_id>1000</current_product_id><current_product_id_name>全球通（升级版）</current_product_id_name><current_deal_kind>1000</current_deal_kind><current_deal_id>10000000</current_deal_id></content>";
            // String xmlText = "<?xml version='1.0'
            // encoding='GBK'?><operation_out><accept_id>2150241</accept_id><response_time>20060417141242</response_time><response><resp_result>0</resp_result><resp_code></resp_code><resp_desc></resp_desc></response><content><user_sec_info></user_sec_info></content></operation_out>";
            // *************************************************************************************

            Document document = DocumentHelper.parseText(xmlText);
            try{
            	Element totalrecords = (Element)document.getRootElement().selectSingleNode("//totalrecords4ext");
            	if(totalrecords != null){
            		compositeVO.setTotalrecords4ext(totalrecords.getData().toString());
            		System.out.println("**********************" + compositeVO.getTotalrecords4ext());
            	}
            }catch(Exception e){
            	System.out.println("**********************" + compositeVO.getTotalrecords4ext());
            	mLogger.info("总记录数取默认值100");
            }
            for (int i = 0; i < resNodes.size(); i++) {
                Element currentElement = document.getRootElement();

                List elements = null;

                // 设置指针到父节点,并取得最终elements
                String resNode = resNodes.get(i).toString();
                if (resNode.endsWith(divisionFlag)) {
                    resNode = resNode.substring(0, resNode.length() - 1);
                }

                String[] currNodes = resNode.split(divisionFlag);
                // 是否只有一层数据标志
                boolean nullFlag = false;
                for (int k = 0; (currentElement != null) && (k < currNodes.length - 1); k++) {
                    if (k < currNodes.length - 2) {
                        currentElement = currentElement.element(currNodes[k]);
                    } else if ("".equals(currNodes[k]) || currNodes[k] == null) {
                        elements = currentElement.elements();
                        nullFlag = true;
                    } else {
                        elements = currentElement.elements(currNodes[k]);
                    }
                }

                if (elements != null && elements.size() > 0 && elements.get(0) != null) {
                    List retList = new ArrayList();
                    String rowFlag = currNodes[currNodes.length - 1];

                    // 只有一层数据的要特殊处理
                    if (nullFlag) {
                        // 取值
                        String resNodeKeyPre = "";
                        if (addKeyPreFlag && resNode.lastIndexOf(divisionFlag) > 0) {
                            resNodeKeyPre = resNode.substring(0, resNode.lastIndexOf(divisionFlag)) + divisionFlag;
                        }

                        HashMap ret = new HashMap();
                        for (int k = 0; k < elements.size(); k++) {
                            Element elementTemp = (Element) elements.get(k);
                            String key = elementTemp.getName();
                            ret.put(resNodeKeyPre + key, elementTemp.getText());

                        }
                        retList.add(0, ret);
                    } else {
                        // 取的列名
                        List colNameList = new ArrayList();
                        Element element = (Element) elements.get(0);
                        for (Iterator j = element.elementIterator(); j.hasNext();) {
                            Element elementTemp = (Element) j.next();
                            colNameList.add(elementTemp.getName());
                        }

                        // 取值
                        int index = 0;

                        String resNodeKeyPre = "";
                        if (addKeyPreFlag && resNode.lastIndexOf(divisionFlag) > 0) {
                            resNodeKeyPre = resNode.substring(0, resNode.lastIndexOf(divisionFlag)) + divisionFlag;
                        }

                        for (int k = 0; k < elements.size(); k++) {
                            Element elementTemp = (Element) elements.get(k);
                            HashMap ret = new HashMap();
                            String key = null;
                            for (int m = 0; m < colNameList.size(); m++) {
                                key = (String) colNameList.get(m);
                                Element leaf_element = elementTemp.element(key);
								if(leaf_element != null){
									ret.put(resNodeKeyPre + key, leaf_element.getText());
									if(leaf_element.hasContent()){
										for(Iterator e = leaf_element.elementIterator();e.hasNext();){
											Element temp = (Element) e.next();
											if(ret.get(resNodeKeyPre + temp.getName())==null){//不覆盖上层节点值
											    ret.put(resNodeKeyPre + temp.getName(), temp.getText());
											}
										}
									}
								}
                            }
                            retList.add(index, ret);
                            index++;
                        }
                    }

                    // 第一次取值，放入compositeVO
                    if (i == 0) {
                        if (rowFlag.equals("*")) {
                            compositeVO.setReturnList(retList);
                        } else {
                            if (retList.get(0) != null) {
                                compositeVO.setReturnBean(retList.get(0));
                            }
                        }
                    }
                    // 非第一次取值，将单条数据，添加到原有的returnBean，多条数据添加到原有的returnList
                    else {
                        if (rowFlag.equals("*")) {
                            if (compositeVO.getReturnList() != null) {
                                List compositeList = compositeVO.getReturnList();
                                for (int m = 0; m < retList.size(); m++) {
                                    if (compositeList.size()>m&&compositeList.get(m) != null) {
                                        ((HashMap) compositeList.get(m)).putAll((HashMap) retList.get(m));
                                    } else {
                                        compositeList.add(m, retList.get(m));
                                    }
                                }
                            } else {
                                compositeVO.setReturnList(retList);
                            }

                        } else {
                            if (compositeVO.getReturnBean() != null) {
                                HashMap returnBean = (HashMap) compositeVO.getReturnBean();
                                if (retList.get(0) != null) {
                                    returnBean.putAll((HashMap) retList.get(0));
                                }
                            } else {
                                if (retList != null && retList.get(0) != null) {
                                    compositeVO.setReturnBean(retList.get(0));
                                }
                            }
                        }
                    }
                }
            }
        }

        // 查询的情况下，判断是否有数据，如果没有数据，错误代码为999999999。如果不是查询，采用此方法，客户端判断是否有错误信息，要过滤此信息。
        compositeVO.converTo4Query(rx);

        return compositeVO;
    }

    /**
     * 简单类型报文通用调用类支持多keys和values即可以在js中同时放多个相同的keys
     * 
     * @param serviceCode
     *            服务号
     * @param sysfuncId
     *            按钮功能号
     * @param keys
     *            请求报文节点列表。每个节点默认以"-"作为分割符。如：cust_info-name,user_info-type
     * @param values
     *            请求报文节点对应的值
     * @return
     * @throws Exception
     */
    public ResultXML callService4MultiDebug(String serviceCode, String sysfuncId, List keys, List values)
            throws Exception {
        // 请求报文
        this.PrintSendInfo(serviceCode, sysfuncId, keys, values);
        // 获取xml存放的服务器路径
        ServletContext context = (ServletContext) FacesContext.getCurrentInstance().getExternalContext().getContext();

        String filepath = getRealPath(context.getRealPath("/")
                + BossSysConf.getSysConf("UPLOAD_CONFIG", "DestinationPath", "upload\\") + "\\xml\\" + serviceCode
                + ".xml");
        mLogger.info("读取的配置文件路径:" + filepath);// 记录日志
        // 返回报文
        ResultXML rx = this.ReadXML(filepath);// 读取配置文件输出返回报文
        return rx;
    }

    /**
     * 将ResultXML转换为通用的返回值类型CompositeVO
     * 
     * @param resNodes
     *            应答报文节点列表。每个节点默认以"-"作为分割符。如：cust_info-row-1,user_info-row-*;其中，最后一个标志为返回值是否为多条数据的标志，1为一条数据，*为多条数据
     * @param rx
     *            应答报文
     * @param addKeyPreFlag
     *            返回值的key是否增加节点作为前缀的标志，true：增加，key的格式如：cust_info-row-type；false：不增加，key为简单格式
     * @return
     * @throws Exception
     */
    public CompositeVO convertRx2CompositeVODebug(List resNodes, ResultXML rx, boolean addKeyPreFlag) throws Exception {
        CompositeVO compositeVO = new CompositeVO();
        // 对返回结果进行处理
        if (rx != null && rx.rtFlag && (resNodes != null)) {
            // 取得xml文档

            String xmlText = rx.rtData;

            // *************************************** test ****************************************
            // String xmlText = "<?xml version='1.0'
            // encoding='GBK'?><content><cust_info><customer_id>593100005582951</customer_id><cust_name>sisis</cust_name><ic_type>1</ic_type><ic_type_name>身份证</ic_type_name><ic_no>352229771004002</ic_no><address/><telephone/><postcode/><confirm_flag>0</confirm_flag><confirm_flag_name>无资料</confirm_flag_name></cust_info><user_id>593100005582961</user_id><msisdn>13706030649</msisdn><home_city>593</home_city><home_city_name>宁德</home_city_name><home_county>301</home_county><home_county_name>宁德市区</home_county_name><password>A70C78261E40BC5E</password><user_type>4</user_type><user_type_name>测试机</user_type_name><msisdn_type>3</msisdn_type><msisdn_type_name>GSM</msisdn_type_name><imsi>460006037128074</imsi><old_brand_id>1000</old_brand_id><old_brand_id_name>全球通(升级版)</old_brand_id_name><user_status>0</user_status><user_status_name>正常</user_status_name><bill_type>5</bill_type><bill_type_name>虚扣</bill_type_name><bill_credit>99999999</bill_credit><service_type>1</service_type><service_type_name>普通</service_type_name><create_operator>0</create_operator><create_operator_name>武夷山超级管理员</create_operator_name><order_id>100000015194</order_id><history_id>100000010073</history_id><sim_card_no>8987000000940094083</sim_card_no><sim_card_type>10</sim_card_type><sim_card_type_name>远程写卡</sim_card_type_name><bank_card_type>0</bank_card_type><bank_card_type_name>无</bank_card_type_name><create_time>20051118113447</create_time><open_time/><transfer_time/><stop_time/><expire_time/><modify_time>20060411163003</modify_time><operator_id>3014040</operator_id><modify_content>爱贝通平安卡开通绑定</modify_content><consume_level/><consume_level_name>零星级</consume_level_name><card_level>1</card_level><card_level_name>钻石卡</card_level_name><vip_card_no>12345678</vip_card_no><voucher_type>3</voucher_type><voucher_type_name>移动使用证</voucher_type_name><voucher_id>59300002</voucher_id><current_brand_id>1000</current_brand_id><current_brand_id_name>全球通(升级版)</current_brand_id_name><current_product_id>1000</current_product_id><current_product_id_name>全球通（升级版）</current_product_id_name><current_deal_kind>1000</current_deal_kind><current_deal_id>10000000</current_deal_id></content>";
            // String xmlText = "<?xml version='1.0'
            // encoding='GBK'?><operation_out><accept_id>2150241</accept_id><response_time>20060417141242</response_time><response><resp_result>0</resp_result><resp_code></resp_code><resp_desc></resp_desc></response><content><user_sec_info></user_sec_info></content></operation_out>";
            // *************************************************************************************

            Document document = DocumentHelper.parseText(xmlText);

            for (int i = 0; i < resNodes.size(); i++) {
                Element currentElement = document.getRootElement();
                List elements = null;

                Element e = (Element) document.selectSingleNode("/operation_out/content");
                if (e != null) {
                    currentElement = e;
                }

                // 设置指针到父节点,并取得最终elements
                String resNode = resNodes.get(i).toString();
                if (resNode.endsWith(divisionFlag)) {
                    resNode = resNode.substring(0, resNode.length() - 1);
                }

                String[] currNodes = resNode.split(divisionFlag);
                // 是否只有一层数据标志
                boolean nullFlag = false;
                for (int k = 0; (currentElement != null) && (k < currNodes.length - 1); k++) {
                    if (k < currNodes.length - 2) {
                        currentElement = currentElement.element(currNodes[k]);
                    } else if ("".equals(currNodes[k]) || currNodes[k] == null) {
                        elements = currentElement.elements();
                        nullFlag = true;
                    } else {
                        elements = currentElement.elements(currNodes[k]);
                    }
                }

                if (elements != null && elements.size() > 0 && elements.get(0) != null) {
                    List retList = new ArrayList();
                    String rowFlag = currNodes[currNodes.length - 1];

                    // 只有一层数据的要特殊处理
                    if (nullFlag) {
                        // 取值
                        String resNodeKeyPre = "";
                        if (addKeyPreFlag && resNode.lastIndexOf(divisionFlag) > 0) {
                            resNodeKeyPre = resNode.substring(0, resNode.lastIndexOf(divisionFlag)) + divisionFlag;
                        }

                        HashMap ret = new HashMap();
                        for (int k = 0; k < elements.size(); k++) {
                            Element elementTemp = (Element) elements.get(k);
                            String key = elementTemp.getName();
                            ret.put(resNodeKeyPre + key, elementTemp.getText());

                        }
                        retList.add(0, ret);
                    } else {
                        // 取的列名
                        List colNameList = new ArrayList();
                        Element element = (Element) elements.get(0);
                        for (Iterator j = element.elementIterator(); j.hasNext();) {
                            Element elementTemp = (Element) j.next();
                            colNameList.add(elementTemp.getName());
                        }

                        // 取值
                        int index = 0;

                        String resNodeKeyPre = "";
                        if (addKeyPreFlag && resNode.lastIndexOf(divisionFlag) > 0) {
                            resNodeKeyPre = resNode.substring(0, resNode.lastIndexOf(divisionFlag)) + divisionFlag;
                        }

                        for (int k = 0; k < elements.size(); k++) {
                            Element elementTemp = (Element) elements.get(k);
                            HashMap ret = new HashMap();
                            String key = null;
                            for (int m = 0; m < colNameList.size(); m++) {
                                key = (String) colNameList.get(m);
                                ret.put(resNodeKeyPre + key, elementTemp.element(key).getText());
                            }
                            retList.add(index, ret);
                            index++;
                        }
                    }

                    // 第一次取值，放入compositeVO
                    if (i == 0) {
                        if (rowFlag.equals("*")) {
                            compositeVO.setReturnList(retList);
                        } else {
                            if (retList.get(0) != null) {
                                compositeVO.setReturnBean(retList.get(0));
                            }
                        }
                    }
                    // 非第一次取值，将单条数据，添加到原有的returnBean，多条数据添加到原有的returnList
                    else {
                        if (rowFlag.equals("*")) {
                            if (compositeVO.getReturnList() != null) {
                                List compositeList = compositeVO.getReturnList();
                                for (int m = 0; m < retList.size(); m++) {
                                    if (compositeList.size()>m&&compositeList.get(m) != null) {
                                        ((HashMap) compositeList.get(m)).putAll((HashMap) retList.get(m));
                                    } else {
                                        compositeList.add(m, retList.get(m));
                                    }
                                }
                            } else {
                                compositeVO.setReturnList(retList);
                            }

                        } else {
                            if (compositeVO.getReturnBean() != null) {
                                HashMap returnBean = (HashMap) compositeVO.getReturnBean();
                                if (retList.get(0) != null) {
                                    returnBean.putAll((HashMap) retList.get(0));
                                }
                            } else {
                                if (retList != null && retList.get(0) != null) {
                                    compositeVO.setReturnBean(retList.get(0));
                                }
                            }
                        }
                    }
                }
            }
        }

        // 查询的情况下，判断是否有数据，如果没有数据，错误代码为999999999。如果不是查询，采用此方法，客户端判断是否有错误信息，要过滤此信息。
        compositeVO.converTo4Query(rx);

        return compositeVO;
    }

    /**
     * 构造请求报文
     * 
     * @param filePath
     * @return ResultXML
     * @throws Exception
     */
    public void PrintSendInfo(String serviceCode, String sysfuncId, List keys, List values) throws Exception {
        String resetFlag = ""; // 是否重新设置指针标志，提高性能
        SendData sd = new SendData(serviceCode, sysfuncId);
        sd.setHttpDebug();
        sd.Init();

        for (int i = 0; i < keys.size(); i++) {
            String currNodeKeys = keys.get(i).toString();

            // 节点标志,防止多条数据设置到同一个节点
            int index = 0;
            for (int m = 0; m < i; m++) {
                if (currNodeKeys.equals(keys.get(m).toString())) {
                    index++;
                }
            }

            if (currNodeKeys.endsWith(divisionFlag)) {
                currNodeKeys = currNodeKeys.substring(0, currNodeKeys.length() - 1);
            }
            String currFlag = (currNodeKeys.lastIndexOf(divisionFlag) > 0) ? currNodeKeys.substring(0, currNodeKeys
                    .lastIndexOf(divisionFlag)) : "";
            String[] currNodes = currNodeKeys.split(divisionFlag);
            String key = currNodes[currNodes.length - 1];
            String lastNode = null;

            if (currNodes.length > 1) {
                lastNode = currNodes[currNodes.length - 2];
            }

            // 设置节点指针
            if (!currFlag.equals(resetFlag)) {
                sd.resetParentPointer();
                resetFlag = currFlag;

                for (int j = 0; j < currNodes.length - 2; j++) {
                    sd.node(currNodes[j]).setParentPointer();
                }
            }

            // 设置节点值，列表情况下，循环设置
            Object curObj = values.get(i);
            if (curObj instanceof ArrayList) {
                List curList = (ArrayList) curObj;
                for (int k = 0; k < curList.size(); k++) {
                    try {
                        sd.node(lastNode, k).node(key, index).setNull(curList.get(k).toString());
                    } catch (Exception e) {
                        mLogger.error(BossException.getMsg(e.getLocalizedMessage()));
                        throw new BossException(BossException.getMsg(e.getLocalizedMessage()));
                    }
                }
            } else {
                if (index == 0) {
                    if (lastNode != null) {

                        sd.node(lastNode).node(key, index).setNull(curObj.toString());
                    } else {
                        sd.node(key, index).setNull(curObj.toString());
                    }

                } else {
                    if (lastNode != null) {

                        sd.node(lastNode, index).node(key).setNull(curObj.toString());
                    } else {
                        sd.node(key, index).setNull(curObj.toString());
                    }
                }

            }
        }
        sd.End();
        CallService.getNewInstance().Call(sd);
    }

    /**
     * 读取xml文件
     * 
     * @param filePath
     * @return ResultXML
     * @throws Exception
     */
    public ResultXML ReadXML(String filePath) throws Exception {
        ResultXML rx = new ResultXML();

        try {
            InputStream in = new FileInputStream(filePath);

            int ch = 0;
            byte[] tmp = new byte[in.available()];
            ByteArrayOutputStream byteout = new ByteArrayOutputStream();
            while ((ch = in.read(tmp)) != -1) {
                byteout.write(tmp);
            }
            String s = new String(byteout.toByteArray(), "GBK");
            StringBuffer sb = new StringBuffer();

            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) != '\n' && s.charAt(i) != '\r' && s.charAt(i) != '\t') {
                    sb.append(s.charAt(i));
                }
            }
            rx.rtFlag = true;
            rx.rtData = "" + sb.toString();
            System.out.println(".............返回报文.............");
            System.out.println(rx.rtData);
            mLogger.info("返回报文:\n" + rx.rtData);
        } catch (Exception e) {
            e.printStackTrace();
            mLogger.error(e.toString());
            return null;
        }

        return rx;

    }

    /**
     * 转换系统路径符
     * 
     * @param FilePath
     * @return String
     */
    public static String getRealPath(String FilePath) {

        String filePath = FilePath;
        String realPath = null;

        String sep = System.getProperty("file.separator");
        if ("/".equals(sep))
            realPath = filePath.replace('\\', '/');
        else if ("\\".equals(sep))
            realPath = filePath.replace('/', '\\');

        return realPath;
    }

    public static void main(String[] args) {
        // BaseOprTr baseOprTr = new BaseOprTr();
        // List keys = new ArrayList();
        // List values = new ArrayList();
        // List resNodes = new ArrayList();
        // keys.add("product_id");
        // keys.add("home_city");
        // values.add("1000");
        // values.add("593");
        // resNodes.add("product_deal_info-row-*");
        // // resNodes.add("-1");
        // // resNodes.add("user_sec_info-row-*");
        // ResultXML rx = new ResultXML();
        // rx.rtFlag = true;
        // try {
        // // baseOprTr.callService4MultiDebug("10000837", "50901100", keys, values);
        // // baseOprTr.convertRx2CompositeVO(resNodes, rx, true);
        // } catch (Exception e) {
        // e.printStackTrace();
        // }
    }
}
