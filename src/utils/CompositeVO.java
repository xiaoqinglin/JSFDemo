/**
 * Title:ͨ�����Bean
 * Description:ͨ�����Bean
 * Copyright: Copyright(c) 2005-2008
 * Company: fmcc&newland
 * @author: zhangxw
 * @version: 1.0 Date: 2005-9-22
 */
package utils;

import java.util.List;

import com.newland.business.db.ResultXML;

public class CompositeVO extends CommonRetVO
{
	private String totalrecords4ext = "100";
	/**
	 * �б���Ϣ
	 */
	private List returnList;

	/**
	 * ������Ϣ
	 */
	private Object returnBean;

	/**
	 * ��ѯ�ɹ���û�м�¼�ı�־����̨���ش�������λ��Ϊ4λ��ȡ999999999�������ͻ
	 */
	private final int retCode = 999999999;

	public Object getReturnBean()
	{
		return returnBean;
	}

	public void setReturnBean(Object returnBean)
	{
		this.returnBean = returnBean;
	}

	public List getReturnList()
	{
		return returnList;
	}

	public void setReturnList(List returnList)
	{
		this.returnList = returnList;
	}

	/**
	 * �Բ���������д����Բ�ѯΪ�յ�����½��д���������ҵ������ɺ���ã�
	 *
	 * @param rx ��Ӧ����
	 */
	public void converTo4Query(ResultXML rx)
	{
		this.converTo4Query(rx, "û�����������ļ�¼��");
	}

	/**
	 * �Բ���������д����Բ�ѯΪ�յ�����½��д���������ҵ������ɺ���ã�
	 *
	 * @param rx ��Ӧ����
	 * @param msg ��Ӧ��Ϣ
	 */
	public void converTo4Query(ResultXML rx, String msg)
	{
		super.converTo(rx);

		// �޼�¼���
		if (getRetResult() == 0 && this.returnBean == null && (this.returnList == null || this.returnList.size() <= 0))
		{
			super.setRetResult(retCode);
			super.setRetMsg(msg);
		}
	}

	/**
	 * �Բ���������д����Բ�ѯΪ�յ�����½��д�����ȡ����ת�����Ϣ��������ҵ������ɺ���ã�
	 *
	 * @param rx ��Ӧ����
	 */
	public void converToJs4Query(ResultXML rx)
	{
		this.converToJs4Query(rx, "û�����������ļ�¼��");
	}

	/**
	 * �Բ���������д����Բ�ѯΪ�յ�����½��д�����ȡ����ת�����Ϣ��������ҵ������ɺ���ã�
	 *
	 * @param rx ��Ӧ����
	 * @param msg ��Ӧ��Ϣ
	 */
	public void converToJs4Query(ResultXML rx, String msg)
	{
		super.converToJs(rx);

		// �޼�¼���
		if (getRetResult() == 0 && this.returnBean == null && (this.returnList == null || this.returnList.size() <= 0))
		{
			super.setRetResult(retCode);
			super.setRetMsg(msg);
		}
	}

	public String getTotalrecords4ext() {
		return totalrecords4ext;
	}

	public void setTotalrecords4ext(String totalrecords4ext) {
		this.totalrecords4ext = totalrecords4ext;
	}

	
}
