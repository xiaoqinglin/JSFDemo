/*
 * Copyright 2002-2004 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.buffalo.server;

import java.io.IOException;


import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Reader;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletInputStream;

import business.jsf.model.OperLoginBean;

import com.caucho.burlap.io.BurlapInput;
import com.caucho.burlap.io.BurlapOutput;
import com.caucho.burlap.server.BurlapSkeleton;
import com.caucho.burlap.server.JSFBurlapSkeleton;
import com.newland.business.tools.BSSPLoggerWriterProxy;
import com.newland.business.jsf.Util;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import utils.BossException;
import com.newland.base.hook.*;
import com.newland.base.util.DateTime;

/**
 * Buffalo Service Servlet, the central servlet for the Buffalo Service.
 * 
 * @author michael
 * @version 1.0
 */
public class BuffaloServiceServlet extends HttpServlet {
	private static Log log = LogFactory.getLog(BuffaloServiceServlet.class);

	private static final String BUFFALO_SERVICE_KEY = "net.buffalo.service.BUFFALO_SERVICE";

	// private String exceptionMsg = "";//显示的异常信息

	public String getServletInfo() {
		return "Buffalo Service Servlet";
	}

	/**
	 * Initialize the service, including the service object.
	 */
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		log.info("=======buffalo service startup........");
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		// request.setContentType(request.getContentType());
		// this.printInput( request );
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		if (!req.getMethod().equals("POST")) {
			res.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Buffalo Requires POST");
			PrintWriter out = res.getWriter();

			res.setContentType("text/html");
			out.println("<h1>Buffalo Requires POST</h1>");

			return;
		}

		InputStream is = this.printInput(request);
		String serviceName = request.getParameter("sid");
		String formBean = request.getParameter("formBean");
		String referer_url = request.getHeader("referer");
		
		response.reset();
		OutputStream os = response.getOutputStream();
		BurlapOutput out = new BurlapOutput(os) {
			public void startReply() throws IOException {
				print("<?xml version=\"1.0\" encoding=\"GBK\"?><burlap:reply xmlns:burlap=\"http://www.amowa.net/burlap/\">");
			}
		};
		BurlapInput in;
		// 插入Hook(begin)
		IHook iHook = null;
		long lBeginTime = 0;
		String serverName = "";
		if (AbstractHook.doHook()) {
			if (serviceName.startsWith("jsf:")) {
				serverName = serviceName.substring(4);
			} else {
				serverName = serviceName;
			}
			iHook = AbstractHook.getHook(AbstractHook.getServiceName(serverName, HookData.DEF_SERVER_FLAG_SERVLET_INIT));
			lBeginTime = System.currentTimeMillis();
		}
		try {
			// InputStream is =bi;// this.printInput( request );
			// //request.getInputStream();
			in = new BurlapInput(is);
		} catch (Throwable ex) {
			log.error("buffalo getSkeleteon failure: ", ex);
			out.startReply();
			out.writeFault("ServletException", ex.getMessage(), ex);
			out.completeReply();
			BSSPLoggerWriterProxy.recordGenaralLog(BSSPLoggerWriterProxy.WARNING_LEVEL, this.getClass().getName(), 131, referer_url+" -> "+ex.getMessage());
			return;
		}

		BurlapSkeleton skeleton;
		try {
			skeleton = this.getSkeleton(formBean, this.getServiceObj(serviceName));
		} catch (Throwable ex) {
			log.error("buffalo getSkeleteon failure: ", ex);
			out.startReply();
			out.writeFault("ServletException", ex.getMessage(), ex);
			out.completeReply();
			BSSPLoggerWriterProxy.recordGenaralLog(BSSPLoggerWriterProxy.WARNING_LEVEL, this.getClass().getName(), 143, referer_url+" -> "+ex.getMessage());
			return;
			// throw new ServletException(ex.getMessage());
		}
		// 插入Hook(end)
		if (AbstractHook.doHook()) {
			if (iHook != null) {
				long lEndTime = System.currentTimeMillis();
				String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
				// 服务名称
				aData[HookData.DEF_ARRAY_SERVER_NAME] = serverName;
				// 服务标识
				aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf(HookData.DEF_SERVER_FLAG_SERVLET_INIT);
				// 响应时间
				aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf(lEndTime - lBeginTime);
				// 处理时间
				aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format(DateTime.YYYY_MM_DD_HH_MI_SS_FLAG, DateTime.getDate());
				iHook.doSomething(aData);
			}
			lBeginTime = 0;
		}
		// 插入Hook(begin)
		if (AbstractHook.doHook()) {
			iHook = AbstractHook.getHook(AbstractHook.getServiceName(serverName, HookData.DEF_SERVER_FLAG_SERVLET));
			lBeginTime = System.currentTimeMillis();
		}
		
		try {
			in.startCall();
			/**
			 * 插入交易开始日志
			 */
			/*
			Enumeration e = request.getHeaderNames();
			while (e.hasMoreElements()) {
				String name = (String) e.nextElement();
				String value = request.getHeader(name);
				System.out.println(name + " = " + value);
			}
			*/
			try{
				OperLoginBean operBean = (OperLoginBean) request.getSession().getAttribute("OperLoginBean");
				String invokeName = serviceName + "." + in.getMethod();
				BSSPLoggerWriterProxy.recordDealBegin(operBean.getOperId(), operBean.getSource(), operBean.getHomeCity(), invokeName);
			}catch(Exception e){
				e.printStackTrace();
			}
			skeleton.invoke(in, out);

			BSSPLoggerWriterProxy.recordDealEnd("1", "0", "url:"+referer_url);
		} catch (BossException e) {
			BSSPLoggerWriterProxy.recordDealEnd("2", "8003", referer_url + " -> " + e.getMessage());
			log.error("buffalo skeleteon.invoke failure: ", e);
			out.startReply();
			out.writeFault("BossException", e.getMessage(), e);
			out.completeReply();			
			// throw new ServletException(e.getMessage());
		} catch (Throwable e) {
			BSSPLoggerWriterProxy.recordDealEnd("1", "9003", referer_url + " -> " + e.getMessage());
			log.error("buffalo skeleteon.invoke failure: ", e);
			out.startReply();
			out.writeFault("ServletException", e.getMessage(), e);
			out.completeReply();			
			// throw new ServletException(e.getMessage());
		}
		// 插入Hook(end)
		if (AbstractHook.doHook()) {
			if (iHook != null) {
				long lEndTime = System.currentTimeMillis();
				String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
				// 服务名称
				aData[HookData.DEF_ARRAY_SERVER_NAME] = serverName;
				// 服务标识
				aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf(HookData.DEF_SERVER_FLAG_SERVLET);
				// 响应时间
				aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf(lEndTime - lBeginTime);
				// 处理时间
				aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format(DateTime.YYYY_MM_DD_HH_MI_SS_FLAG, DateTime.getDate());
				iHook.doSomething(aData);
			}
		}
	}

	/**
	 * 从request里头，读取并打印输入流
	 * 
	 * @param request
	 *            ServletRequest
	 * @return InputStream
	 * @throws IOException
	 */
	private InputStream printInput(ServletRequest request) throws IOException {

		String sRequest = "";
		ServletInputStream ins = request.getInputStream();
		int iRequestLength = request.getContentLength();
		byte[] aRequest = new byte[0];
		if (iRequestLength > 0) {
			aRequest = new byte[iRequestLength];
			// ins.read(aRequest);
			int data = ins.read();
			int po = 0;
			while (data >= 0) {
				aRequest[po] = (byte) data;
				po++;
				data = ins.read();
			}
		}

		// log.debug(new String(in_b));
		java.io.ByteArrayInputStream bi = new java.io.ByteArrayInputStream(aRequest);
		return bi;
	}

	/**
	 * 根据请求，取得服务对象,目前分2种，一是普通的bean，二是JSF的bean
	 * 
	 * @return Object
	 */
	private Object getServiceObj(String serviceName) {
		/* 默认在JSF bean中查找 */
		Object bean = this.getJSFBean(serviceName);
		if (bean != null) {
			return bean;
		}

		Object service = null;
		try {
			String serviceClazz = getServiceClass(serviceName);
			service = Class.forName(serviceClazz).newInstance();
		} catch (Exception ex) {
			throw new RuntimeException("无法在Buffalo及JSF 配置文件里面找到Bean:" + serviceName);
		}
		return service;
	}

	private BurlapSkeleton getSkeleton(String formBean, Object service) {
		if (formBean != null) {
			JSFBurlapSkeleton jsfSkeleton = new JSFBurlapSkeleton(service);
			jsfSkeleton.setBackBeanName(formBean);
			// jsfSkeleton.setPropertyMap(this.testJSF());
			BurlapSkeleton _skeleton = (BurlapSkeleton) jsfSkeleton;
			return _skeleton;
		}
		return new BurlapSkeleton(service);

	}

	/**
	 * Get the service class name from the buffalo config file by the service
	 * name.
	 * 
	 * @param serviceName
	 *            the service name
	 * @return the service class name
	 * 
	 * @throws IOException
	 */
	private String getServiceClass(String serviceName) throws IOException {
		Properties prop = null;
		if (getServletContext().getAttribute(BUFFALO_SERVICE_KEY) == null) {
			prop = new Properties();
			InputStream in = getClass().getResourceAsStream("/buffalo-service.properties");
			prop.load(in);

			getServletContext().setAttribute(BUFFALO_SERVICE_KEY, prop);
		} else {
			prop = (Properties) (getServletContext().getAttribute(BUFFALO_SERVICE_KEY));
		}

		return prop.getProperty(serviceName);
	}

	/**
	 * 根据 如 jsf:demoBuffaloBean 获取jsf中的bean
	 * 
	 * @param mbean
	 *            String
	 * @return Object
	 */
	// -------如果是com.newland.xxx.xx则直接new,不仅jsf，包括普通调用
	private Object getJSFBean(String mbean) {
		if (mbean.startsWith("jsf:")) {
			mbean = mbean.substring(4); // 去除“jsf：”，取后面的bean名
		}
		try {
			return Util.getBindingMbean(mbean);
		} catch (Exception ex) {
			log.error("无法在 JSF 配置里面找到 bean： " + mbean);
			return null;
		}
	}

}
