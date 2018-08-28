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
     * Ĭ�Ϸָ����
     */
    private String divisionFlag = "-";

    public String getDivisionFlag() {
        return divisionFlag;
    }

    public void setDivisionFlag(String divisionFlag) {
        this.divisionFlag = divisionFlag;
    }

    /**
     * �����ͱ���ͨ�õ�����֧�ֶ�keys��values��������js��ͬʱ�Ŷ����ͬ��keys
     * 
     * @param serviceCode
     *            �����
     * @param sysfuncId
     *            ��ť���ܺ�
     * @param keys
     *            �����Ľڵ��б�ÿ���ڵ�Ĭ����"-"��Ϊ�ָ�����磺cust_info-name,user_info-type�����Է��ö����ͬ��keys
     * @param values
     *            �����Ľڵ��Ӧ��ֵ
     * @return ResultXML
     * @throws Exception
     */
    public ResultXML callService(String serviceCode, String sysfuncId, List keys, List values) throws Exception {
        String resetFlag = ""; // �Ƿ���������ָ���־���������
        SendData sd = new SendData(serviceCode, sysfuncId);
        sd.Init();

        for (int i = 0; i < keys.size(); i++) {
            String currNodeKeys = keys.get(i).toString();

            // �ڵ��־,��ֹ�����������õ�ͬһ���ڵ�
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

            // ���ýڵ�ָ��
            if (!currFlag.equals(resetFlag)) {
                sd.resetParentPointer();
                resetFlag = currFlag;

                for (int j = 0; j < currNodes.length - 2; j++) {
                    sd.node(currNodes[j]).setParentPointer();
                }
            }

            // ���ýڵ�ֵ���б�����£�ѭ������
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
     * �����ͱ���ͨ�õ�����֧�ֶ�keys��values��������js��ͬʱ�Ŷ����ͬ��keys
     * 
     * @param serviceCode
     *            �����
     * @param sysfuncId
     *            ��ť���ܺ�
     * @param keys
     *            �����Ľڵ��б�ÿ���ڵ�Ĭ����"-"��Ϊ�ָ�����磺cust_info-name,user_info-type
     * @param values
     *            �����Ľڵ��Ӧ��ֵ
     * @return
     * @throws Exception
     */
    public ResultXML callService4Multi(String serviceCode, String sysfuncId, List keys, List values) throws Exception {
        String resetFlag = ""; // �Ƿ���������ָ���־���������
        if (keys.size() != values.size()) {
            String logMsg = "��keys�ĳ������ֵvalues�ĳ��Ȳ�ƥ��,��鿴��־������Ӧ�˶�!";
            logMsg += "keys.size:" + keys.size() + "----values.size:" + values.size();
            int len = 0;
            // ȡ���ĳ���
            len = keys.size() >= values.size() ? keys.size() : values.size();
            for (int i = 0; i < len; i++) {
                if (i / 4 == 0) {// �������¼�ͻ���
                    logMsg += "\n\r";
                    if (i > keys.size() - 1) {// ����keys.size��ֵʱ
                        logMsg += "keys[" + i + "]:null----";
                    } else {
                        logMsg += "keys[" + i + "]:" + keys.get(i).toString() + "----";
                    }
                    if (i > values.size() - 1) {// ����values.size��ֵʱ
                        logMsg += "values[" + i + "]:null\t\t";
                    } else {
                        logMsg += "values[" + i + "]:" + values.get(i).toString() + "\t\t";
                    }
                } else {
                    if (i > keys.size() - 1) {// ����keys.size��ֵʱ
                        logMsg += "keys[" + i + "]:null----";
                    } else {
                        logMsg += "keys[" + i + "]:" + keys.get(i).toString() + "----";
                    }
                    if (i > values.size() - 1) {// ����values.size��ֵʱ
                        logMsg += "values[" + i + "]:null\t\t";
                    } else {
                        logMsg += "values[" + i + "]:" + values.get(i).toString() + "\t\t";
                    }
                }
            }
            mLogger.info(logMsg);
            throw new BossException(BossException.getMsg("��keys�ĳ������ֵvalues�ĳ��Ȳ�ƥ��,��鿴��־������Ӧ�˶�!"));
        }
        
        boolean isExist=false;//�Ƿ����null
        for (int i = 0; i < keys.size(); i++) {
            if(keys.get(i)==null || values.get(i)==null){
                isExist=true;
                break;
            }
        }
        if (isExist) {
            String logMsg = "��keys���ֵvalues�д���null,��鿴��־������Ӧ�˶�!";
            logMsg += "keys.size:" + keys.size() + "----values.size:" + values.size();

            for (int i = 0; i < keys.size(); i++) {
                if (i / 4 == 0) {// �������¼�ͻ���
                    logMsg += "\n\r";
                    if (keys.get(i)==null) {
                        logMsg += "keys[" + i + "]:null----";
                    } else {
                        logMsg += "keys[" + i + "]:" + keys.get(i).toString() + "----";
                    }
                    if (values.get(i)==null) {// ����values.size��ֵʱ
                        logMsg += "values[" + i + "]:null\t\t";
                    } else {
                        logMsg += "values[" + i + "]:" + values.get(i).toString() + "\t\t";
                    }
                } else {
                    if (keys.get(i)==null) {// ����keys.size��ֵʱ
                        logMsg += "keys[" + i + "]:null----";
                    } else {
                        logMsg += "keys[" + i + "]:" + keys.get(i).toString() + "----";
                    }
                    if (values.get(i)==null) {// ����values.size��ֵʱ
                        logMsg += "values[" + i + "]:null\t\t";
                    } else {
                        logMsg += "values[" + i + "]:" + values.get(i).toString() + "\t\t";
                    }
                }
            }
            mLogger.info(logMsg);
            throw new BossException(BossException.getMsg("��keys�ĳ������ֵvalues�ĳ��Ȳ�ƥ��,��鿴��־������Ӧ�˶�!"));
        }
        
        
        
        SendData sd = new SendData(serviceCode, sysfuncId);
        sd.Init();

        for (int i = 0; i < keys.size(); i++) {
            String currNodeKeys = keys.get(i).toString();

            // �ڵ��־,��ֹ�����������õ�ͬһ���ڵ�
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

            // ���ýڵ�ָ��
            if (!currFlag.equals(resetFlag)) {
                sd.resetParentPointer();
                resetFlag = currFlag;

                for (int j = 0; j < currNodes.length - 2; j++) {
                    sd.node(currNodes[j]).setParentPointer();
                }
            }

            // ���ýڵ�ֵ���б�����£�ѭ������
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
     * ��ResultXMLת��Ϊͨ�õķ���ֵ����CompositeVO
     * 
     * @param resNodes
     *            Ӧ���Ľڵ��б�ÿ���ڵ�Ĭ����"-"��Ϊ�ָ�����磺cust_info-row-1,user_info-row-*;���У����һ����־Ϊ����ֵ�Ƿ�Ϊ�������ݵı�־��1Ϊһ�����ݣ�*Ϊ��������
     * @param rx
     *            Ӧ����
     * @param addKeyPreFlag
     *            ����ֵ��key�Ƿ����ӽڵ���Ϊǰ׺�ı�־��true�����ӣ�key�ĸ�ʽ�磺cust_info-row-type��false�������ӣ�keyΪ�򵥸�ʽ
     * @return
     * @throws Exception
     */
    public CompositeVO convertRx2CompositeVO(List resNodes, ResultXML rx, boolean addKeyPreFlag) throws Exception {
        CompositeVO compositeVO = new CompositeVO();
        // �Է��ؽ�����д���
        if (rx != null && rx.rtFlag && (resNodes != null)) {
            if(rx.bRetfragment){
                compositeVO.setFragment("1");
                compositeVO.setFragment_file(rx.sRetfragment_file);
            }else{
                compositeVO.setFragment("0");
                compositeVO.setFragment_file("");
            }
            // ȡ��xml�ĵ�
            XMLData xmlData = rx.xmldata;
            String xmlText = xmlData.getDocXML();

            // *************************************** test ****************************************
            // String xmlText = "<?xml version='1.0'
            // encoding='GBK'?><content><cust_info><customer_id>593100005582951</customer_id><cust_name>sisis</cust_name><ic_type>1</ic_type><ic_type_name>���֤</ic_type_name><ic_no>352229771004002</ic_no><address/><telephone/><postcode/><confirm_flag>0</confirm_flag><confirm_flag_name>������</confirm_flag_name></cust_info><user_id>593100005582961</user_id><msisdn>13706030649</msisdn><home_city>593</home_city><home_city_name>����</home_city_name><home_county>301</home_county><home_county_name>��������</home_county_name><password>A70C78261E40BC5E</password><user_type>4</user_type><user_type_name>���Ի�</user_type_name><msisdn_type>3</msisdn_type><msisdn_type_name>GSM</msisdn_type_name><imsi>460006037128074</imsi><old_brand_id>1000</old_brand_id><old_brand_id_name>ȫ��ͨ(������)</old_brand_id_name><user_status>0</user_status><user_status_name>����</user_status_name><bill_type>5</bill_type><bill_type_name>���</bill_type_name><bill_credit>99999999</bill_credit><service_type>1</service_type><service_type_name>��ͨ</service_type_name><create_operator>0</create_operator><create_operator_name>����ɽ��������Ա</create_operator_name><order_id>100000015194</order_id><history_id>100000010073</history_id><sim_card_no>8987000000940094083</sim_card_no><sim_card_type>10</sim_card_type><sim_card_type_name>Զ��д��</sim_card_type_name><bank_card_type>0</bank_card_type><bank_card_type_name>��</bank_card_type_name><create_time>20051118113447</create_time><open_time/><transfer_time/><stop_time/><expire_time/><modify_time>20060411163003</modify_time><operator_id>3014040</operator_id><modify_content>����ͨƽ������ͨ��</modify_content><consume_level/><consume_level_name>���Ǽ�</consume_level_name><card_level>1</card_level><card_level_name>��ʯ��</card_level_name><vip_card_no>12345678</vip_card_no><voucher_type>3</voucher_type><voucher_type_name>�ƶ�ʹ��֤</voucher_type_name><voucher_id>59300002</voucher_id><current_brand_id>1000</current_brand_id><current_brand_id_name>ȫ��ͨ(������)</current_brand_id_name><current_product_id>1000</current_product_id><current_product_id_name>ȫ��ͨ�������棩</current_product_id_name><current_deal_kind>1000</current_deal_kind><current_deal_id>10000000</current_deal_id></content>";
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
            	mLogger.info("�ܼ�¼��ȡĬ��ֵ100");
            }
            for (int i = 0; i < resNodes.size(); i++) {
                Element currentElement = document.getRootElement();

                List elements = null;

                // ����ָ�뵽���ڵ�,��ȡ������elements
                String resNode = resNodes.get(i).toString();
                if (resNode.endsWith(divisionFlag)) {
                    resNode = resNode.substring(0, resNode.length() - 1);
                }

                String[] currNodes = resNode.split(divisionFlag);
                // �Ƿ�ֻ��һ�����ݱ�־
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

                    // ֻ��һ�����ݵ�Ҫ���⴦��
                    if (nullFlag) {
                        // ȡֵ
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
                        // ȡ������
                        List colNameList = new ArrayList();
                        Element element = (Element) elements.get(0);
                        for (Iterator j = element.elementIterator(); j.hasNext();) {
                            Element elementTemp = (Element) j.next();
                            colNameList.add(elementTemp.getName());
                        }

                        // ȡֵ
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
											if(ret.get(resNodeKeyPre + temp.getName())==null){//�������ϲ�ڵ�ֵ
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

                    // ��һ��ȡֵ������compositeVO
                    if (i == 0) {
                        if (rowFlag.equals("*")) {
                            compositeVO.setReturnList(retList);
                        } else {
                            if (retList.get(0) != null) {
                                compositeVO.setReturnBean(retList.get(0));
                            }
                        }
                    }
                    // �ǵ�һ��ȡֵ�����������ݣ���ӵ�ԭ�е�returnBean������������ӵ�ԭ�е�returnList
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

        // ��ѯ������£��ж��Ƿ������ݣ����û�����ݣ��������Ϊ999999999��������ǲ�ѯ�����ô˷������ͻ����ж��Ƿ��д�����Ϣ��Ҫ���˴���Ϣ��
        compositeVO.converTo4Query(rx);

        return compositeVO;
    }

    /**
     * �����ͱ���ͨ�õ�����֧�ֶ�keys��values��������js��ͬʱ�Ŷ����ͬ��keys
     * 
     * @param serviceCode
     *            �����
     * @param sysfuncId
     *            ��ť���ܺ�
     * @param keys
     *            �����Ľڵ��б�ÿ���ڵ�Ĭ����"-"��Ϊ�ָ�����磺cust_info-name,user_info-type
     * @param values
     *            �����Ľڵ��Ӧ��ֵ
     * @return
     * @throws Exception
     */
    public ResultXML callService4MultiDebug(String serviceCode, String sysfuncId, List keys, List values)
            throws Exception {
        // ������
        this.PrintSendInfo(serviceCode, sysfuncId, keys, values);
        // ��ȡxml��ŵķ�����·��
        ServletContext context = (ServletContext) FacesContext.getCurrentInstance().getExternalContext().getContext();

        String filepath = getRealPath(context.getRealPath("/")
                + BossSysConf.getSysConf("UPLOAD_CONFIG", "DestinationPath", "upload\\") + "\\xml\\" + serviceCode
                + ".xml");
        mLogger.info("��ȡ�������ļ�·��:" + filepath);// ��¼��־
        // ���ر���
        ResultXML rx = this.ReadXML(filepath);// ��ȡ�����ļ�������ر���
        return rx;
    }

    /**
     * ��ResultXMLת��Ϊͨ�õķ���ֵ����CompositeVO
     * 
     * @param resNodes
     *            Ӧ���Ľڵ��б�ÿ���ڵ�Ĭ����"-"��Ϊ�ָ�����磺cust_info-row-1,user_info-row-*;���У����һ����־Ϊ����ֵ�Ƿ�Ϊ�������ݵı�־��1Ϊһ�����ݣ�*Ϊ��������
     * @param rx
     *            Ӧ����
     * @param addKeyPreFlag
     *            ����ֵ��key�Ƿ����ӽڵ���Ϊǰ׺�ı�־��true�����ӣ�key�ĸ�ʽ�磺cust_info-row-type��false�������ӣ�keyΪ�򵥸�ʽ
     * @return
     * @throws Exception
     */
    public CompositeVO convertRx2CompositeVODebug(List resNodes, ResultXML rx, boolean addKeyPreFlag) throws Exception {
        CompositeVO compositeVO = new CompositeVO();
        // �Է��ؽ�����д���
        if (rx != null && rx.rtFlag && (resNodes != null)) {
            // ȡ��xml�ĵ�

            String xmlText = rx.rtData;

            // *************************************** test ****************************************
            // String xmlText = "<?xml version='1.0'
            // encoding='GBK'?><content><cust_info><customer_id>593100005582951</customer_id><cust_name>sisis</cust_name><ic_type>1</ic_type><ic_type_name>���֤</ic_type_name><ic_no>352229771004002</ic_no><address/><telephone/><postcode/><confirm_flag>0</confirm_flag><confirm_flag_name>������</confirm_flag_name></cust_info><user_id>593100005582961</user_id><msisdn>13706030649</msisdn><home_city>593</home_city><home_city_name>����</home_city_name><home_county>301</home_county><home_county_name>��������</home_county_name><password>A70C78261E40BC5E</password><user_type>4</user_type><user_type_name>���Ի�</user_type_name><msisdn_type>3</msisdn_type><msisdn_type_name>GSM</msisdn_type_name><imsi>460006037128074</imsi><old_brand_id>1000</old_brand_id><old_brand_id_name>ȫ��ͨ(������)</old_brand_id_name><user_status>0</user_status><user_status_name>����</user_status_name><bill_type>5</bill_type><bill_type_name>���</bill_type_name><bill_credit>99999999</bill_credit><service_type>1</service_type><service_type_name>��ͨ</service_type_name><create_operator>0</create_operator><create_operator_name>����ɽ��������Ա</create_operator_name><order_id>100000015194</order_id><history_id>100000010073</history_id><sim_card_no>8987000000940094083</sim_card_no><sim_card_type>10</sim_card_type><sim_card_type_name>Զ��д��</sim_card_type_name><bank_card_type>0</bank_card_type><bank_card_type_name>��</bank_card_type_name><create_time>20051118113447</create_time><open_time/><transfer_time/><stop_time/><expire_time/><modify_time>20060411163003</modify_time><operator_id>3014040</operator_id><modify_content>����ͨƽ������ͨ��</modify_content><consume_level/><consume_level_name>���Ǽ�</consume_level_name><card_level>1</card_level><card_level_name>��ʯ��</card_level_name><vip_card_no>12345678</vip_card_no><voucher_type>3</voucher_type><voucher_type_name>�ƶ�ʹ��֤</voucher_type_name><voucher_id>59300002</voucher_id><current_brand_id>1000</current_brand_id><current_brand_id_name>ȫ��ͨ(������)</current_brand_id_name><current_product_id>1000</current_product_id><current_product_id_name>ȫ��ͨ�������棩</current_product_id_name><current_deal_kind>1000</current_deal_kind><current_deal_id>10000000</current_deal_id></content>";
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

                // ����ָ�뵽���ڵ�,��ȡ������elements
                String resNode = resNodes.get(i).toString();
                if (resNode.endsWith(divisionFlag)) {
                    resNode = resNode.substring(0, resNode.length() - 1);
                }

                String[] currNodes = resNode.split(divisionFlag);
                // �Ƿ�ֻ��һ�����ݱ�־
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

                    // ֻ��һ�����ݵ�Ҫ���⴦��
                    if (nullFlag) {
                        // ȡֵ
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
                        // ȡ������
                        List colNameList = new ArrayList();
                        Element element = (Element) elements.get(0);
                        for (Iterator j = element.elementIterator(); j.hasNext();) {
                            Element elementTemp = (Element) j.next();
                            colNameList.add(elementTemp.getName());
                        }

                        // ȡֵ
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

                    // ��һ��ȡֵ������compositeVO
                    if (i == 0) {
                        if (rowFlag.equals("*")) {
                            compositeVO.setReturnList(retList);
                        } else {
                            if (retList.get(0) != null) {
                                compositeVO.setReturnBean(retList.get(0));
                            }
                        }
                    }
                    // �ǵ�һ��ȡֵ�����������ݣ���ӵ�ԭ�е�returnBean������������ӵ�ԭ�е�returnList
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

        // ��ѯ������£��ж��Ƿ������ݣ����û�����ݣ��������Ϊ999999999��������ǲ�ѯ�����ô˷������ͻ����ж��Ƿ��д�����Ϣ��Ҫ���˴���Ϣ��
        compositeVO.converTo4Query(rx);

        return compositeVO;
    }

    /**
     * ����������
     * 
     * @param filePath
     * @return ResultXML
     * @throws Exception
     */
    public void PrintSendInfo(String serviceCode, String sysfuncId, List keys, List values) throws Exception {
        String resetFlag = ""; // �Ƿ���������ָ���־���������
        SendData sd = new SendData(serviceCode, sysfuncId);
        sd.setHttpDebug();
        sd.Init();

        for (int i = 0; i < keys.size(); i++) {
            String currNodeKeys = keys.get(i).toString();

            // �ڵ��־,��ֹ�����������õ�ͬһ���ڵ�
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

            // ���ýڵ�ָ��
            if (!currFlag.equals(resetFlag)) {
                sd.resetParentPointer();
                resetFlag = currFlag;

                for (int j = 0; j < currNodes.length - 2; j++) {
                    sd.node(currNodes[j]).setParentPointer();
                }
            }

            // ���ýڵ�ֵ���б�����£�ѭ������
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
     * ��ȡxml�ļ�
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
            System.out.println(".............���ر���.............");
            System.out.println(rx.rtData);
            mLogger.info("���ر���:\n" + rx.rtData);
        } catch (Exception e) {
            e.printStackTrace();
            mLogger.error(e.toString());
            return null;
        }

        return rx;

    }

    /**
     * ת��ϵͳ·����
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
