package utils;

import java.util.List;

import com.newland.business.db.ResultXML;

public class BaseOprMgr {

    /**
     * �����ͱ���ͨ�õ�����
     * 
     * @param serviceCode
     *            �����
     * @param sysfuncId
     *            ��ť���ܺ�
     * @param keys
     *            �����Ľڵ��б�ÿ���ڵ�Ĭ����"-"��Ϊ�ָ�����磺cust_info-name,user_info-type
     * @param values
     *            �����Ľڵ��Ӧ��ֵ
     * @param resNodes
     *            Ӧ���Ľڵ��б�ÿ���ڵ�Ĭ����"-"��Ϊ�ָ�����磺cust_info-row-1,user_info-row-*;���У����һ����־Ϊ����ֵ�Ƿ�Ϊ�������ݵı�־��1Ϊһ�����ݣ�*Ϊ��������
     * @param addKeyPreFlag
     *            ����ֵ��key�Ƿ����ӽڵ���Ϊǰ׺�ı�־��true�����ӣ�key�ĸ�ʽ�磺cust_info-row-type��false�������ӣ�keyΪ�򵥸�ʽ
     * @return
     */
    public CompositeVO callService(String serviceCode, String sysfuncId, List keys, List values, List resNodes,
            boolean addKeyPreFlag) {
        BaseOprTr baseOprTr = new BaseOprTr();
        CompositeVO compositeVO = null;
        ResultXML rx;
        try {
            rx = baseOprTr.callService(serviceCode, sysfuncId, keys, values);
            compositeVO = baseOprTr.convertRx2CompositeVO(resNodes, rx, addKeyPreFlag);
        } catch (Exception e) {
           e.printStackTrace();
        }
        return compositeVO;
    }

}
