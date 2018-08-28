/**
 * Title:通用组合Bean
 * Description:通用组合Bean
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
	 * 列表信息
	 */
	private List returnList;

	/**
	 * 基本信息
	 */
	private Object returnBean;

	/**
	 * 查询成功后没有记录的标志，后台返回错误号最大位数为4位，取999999999，避免冲突
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
	 * 对操作结果进行处理，对查询为空的情况下进行处理（必须在业务处理完成后调用）
	 *
	 * @param rx 响应报文
	 */
	public void converTo4Query(ResultXML rx)
	{
		this.converTo4Query(rx, "没有满足条件的记录！");
	}

	/**
	 * 对操作结果进行处理，对查询为空的情况下进行处理（必须在业务处理完成后调用）
	 *
	 * @param rx 响应报文
	 * @param msg 响应信息
	 */
	public void converTo4Query(ResultXML rx, String msg)
	{
		super.converTo(rx);

		// 无记录情况
		if (getRetResult() == 0 && this.returnBean == null && (this.returnList == null || this.returnList.size() <= 0))
		{
			super.setRetResult(retCode);
			super.setRetMsg(msg);
		}
	}

	/**
	 * 对操作结果进行处理，对查询为空的情况下进行处理，并取经过转义的信息（必须在业务处理完成后调用）
	 *
	 * @param rx 响应报文
	 */
	public void converToJs4Query(ResultXML rx)
	{
		this.converToJs4Query(rx, "没有满足条件的记录！");
	}

	/**
	 * 对操作结果进行处理，对查询为空的情况下进行处理，并取经过转义的信息（必须在业务处理完成后调用）
	 *
	 * @param rx 响应报文
	 * @param msg 响应信息
	 */
	public void converToJs4Query(ResultXML rx, String msg)
	{
		super.converToJs(rx);

		// 无记录情况
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
