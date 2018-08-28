/**
 * Title:通用组合返回值
 * Description:通用组合返回值，返回执行结果和执行信息
 * Copyright: Copyright(c) 2005-2008
 * Company: fmcc&newland
 * @author: zhangxw
 * @version: 1.0 Date: 2005-9-22
 */
package utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import com.newland.business.db.ResultXML;

public class CommonRetVO
{

	/**
	 * 执行结果
	 */
	private int retResult;

	/**
	 * 执行信息
	 */
	private String retMsg;
	
	/**
	 * 返回复杂信息描述
	 */
	private String retDetail;

	/**
	 * 是否有提示信息。0：有提示信息且内容不为空，1、无提示信息，2、有提示信息，但提示信息内容为空
	 */
	private String msgCode;

	/**
	 * 合并的提示信息
	 */
	private String msgMemos;

	/**
	 * 提示信息类型列表
	 */
	private List msgTypeList;

	/**
	 * 提示信息内容列表
	 */
	private List msgMemoList;
	
	
	private String fragment;
	
	private String fragment_file;

	/**
     * @return Returns the fragment.
     */
    public String getFragment() {
        return fragment;
    }

    /**
     * @param fragment The fragment to set.
     */
    public void setFragment(String fragment) {
        this.fragment = fragment;
    }

    /**
     * @return Returns the fragment_file.
     */
    public String getFragment_file() {
        return fragment_file;
    }

    /**
     * @param fragment_file The fragment_file to set.
     */
    public void setFragment_file(String fragment_file) {
        this.fragment_file = fragment_file;
    }

    public String getRetMsg()
	{
		return retMsg;
	}

	public void setRetMsg(String retMsg)
	{
		this.retMsg = retMsg;
	}

	public int getRetResult()
	{
		return retResult;
	}

	public void setRetResult(int retResult)
	{
		this.retResult = retResult;
	}

	public List getMsgMemoList()
	{
		return msgMemoList;
	}

	public void setMsgMemoList(List msgMemoList)
	{
		this.msgMemoList = msgMemoList;
	}

	public String getMsgMemos()
	{
		return msgMemos;
	}

	public void setMsgMemos(String msgMemos)
	{
		this.msgMemos = msgMemos;
	}

	public List getMsgTypeList()
	{
		return msgTypeList;
	}

	public void setMsgTypeList(List msgTypeList)
	{
		this.msgTypeList = msgTypeList;
	}

	public String getMsgCode()
	{
		return msgCode;
	}

	public void setMsgCode(String msgCode)
	{
		this.msgCode = msgCode;
	}

	/**
	 * 根据ResultXML设置返回信息（可直接用于buffalo返回）
	 *
	 * @param rx
	 */
	public void converTo(ResultXML rx)
	{
		if (rx != null)
		{
			this.setRetResult(rx.result_code);
			if (rx.result_desc == null || rx.result_desc.equals(""))
			{
				this.setRetMsg("操作失败！");
			}
			else
			{
				this.setRetMsg(rx.result_desc);
			}

			// 提示信息
			convertToMsg(rx);
		}
	}

	/**
	 * 根据ResultXML设置返回信息（经过转义的，可以直接用于js）
	 *
	 * @param rx
	 */
	public void converToJs(ResultXML rx)
	{
		if (rx != null)
		{
			this.setRetResult(rx.result_code);
			if (rx.result_desc_forJs == null || rx.result_desc_forJs.equals(""))
			{
				this.setRetMsg("操作失败！");
			}
			else
			{
				this.setRetMsg(rx.result_desc_forJs);
			}

			// 提示信息
			convertToMsg(rx);
		}
	}

	/**
	 * 根据ResultXML设置警告和确认信息信息
	 *
	 * @param rx
	 */
	public void convertToMsg(ResultXML rx)
	{
		if (rx != null && rx.bShowMessage)
		{
			Vector vt = rx.oMessage;
			List curMsgTypeList = new ArrayList();
			List curMsgMemoList = new ArrayList();
			StringBuffer curMsgMemos = new StringBuffer();
			for (int i = 0; i < vt.size(); i++)
			{
				String[] aMessage = (String[]) vt.get(i);
				curMsgTypeList.add(aMessage[ResultXML.DEF_MESSAGE_TYPE]);
				curMsgMemoList.add(aMessage[ResultXML.DEF_MESSAGE_MEMO]);
				curMsgMemos.append(aMessage[ResultXML.DEF_MESSAGE_MEMO]);
			}
			this.setMsgMemoList(curMsgMemoList);
			this.setMsgTypeList(curMsgTypeList);
			this.setMsgMemos(curMsgMemos.toString());
			if (curMsgMemos.length() > 0)
			{
				this.setMsgCode("0");
			}
			else
			{
				this.setMsgCode("2");
			}
		}
		else
		{
			this.setMsgCode("1");
		}
	}

    public String getRetDetail() {
        return retDetail;
    }

    public void setRetDetail(String retDetail) {
        this.retDetail = retDetail;
    }

}
