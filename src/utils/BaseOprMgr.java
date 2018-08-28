package utils;

import java.util.List;

import com.newland.business.db.ResultXML;

public class BaseOprMgr {

    /**
     * 简单类型报文通用调用类
     * 
     * @param serviceCode
     *            服务号
     * @param sysfuncId
     *            按钮功能号
     * @param keys
     *            请求报文节点列表。每个节点默认以"-"作为分割符。如：cust_info-name,user_info-type
     * @param values
     *            请求报文节点对应的值
     * @param resNodes
     *            应答报文节点列表。每个节点默认以"-"作为分割符。如：cust_info-row-1,user_info-row-*;其中，最后一个标志为返回值是否为多条数据的标志，1为一条数据，*为多条数据
     * @param addKeyPreFlag
     *            返回值的key是否增加节点作为前缀的标志，true：增加，key的格式如：cust_info-row-type；false：不增加，key为简单格式
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
