/*
 * Copyright (c) 2001-2002 Caucho Technology, Inc.  All rights reserved.
 *
 * The Apache Software License, Version 1.1
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 *
 * 3. The end-user documentation included with the redistribution, if
 *    any, must include the following acknowlegement:
 *       "This product includes software developed by the
 *        Caucho Technology (http://www.caucho.com/)."
 *    Alternately, this acknowlegement may appear in the software itself,
 *    if and wherever such third-party acknowlegements normally appear.
 *
 * 4. The names "Hessian", "Resin", and "Caucho" must not be used to
 *    endorse or promote products derived from this software without prior
 *    written permission. For written permission, please contact
 *    info@caucho.com.
 *
 * 5. Products derived from this software may not be called "Resin"
 *    nor may "Resin" appear in their names without prior written
 *    permission of Caucho Technology.
 *
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL CAUCHO TECHNOLOGY OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
 * OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
 * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author Scott Ferguson
 */

package com.caucho.burlap.server;

import java.io.*;


import java.util.*;
import java.net.*;
import java.lang.reflect.*;

import com.caucho.burlap.io.*;
import utils.BossException;
import com.newland.base.hook.*;
import com.newland.base.util.DateTime;

/**
 * Proxy class for Burlap services.
 */
public class BurlapSkeleton {
	HashMap _methodMap = new HashMap();
	Object _service;

	/**
	 * Create a new burlap skeleton.
	 * 
	 * @param service
	 *            the underlying service object.
	 */
	public BurlapSkeleton(Object service) {
		_service = service;
		Method[] methodList = service.getClass().getMethods();

		for (int i = 0; i < methodList.length; i++) {
			Method method = methodList[i];

			if (_methodMap.get(method.getName()) == null)
				_methodMap.put(method.getName(), methodList[i]);

			Class[] param = method.getParameterTypes();
			String mangledName = method.getName() + "__" + param.length;
			_methodMap.put(mangledName, methodList[i]);

			_methodMap.put(mangleName(method, false), methodList[i]);
		}
	}

	/**
	 * Creates a unique mangled method name based on the method name and the
	 * method parameters.
	 * 
	 * @param method
	 *            the method to mangle
	 * @param isFull
	 *            if true, mangle the full classname
	 * 
	 * @return a mangled string.
	 */
	protected String mangleName(Method method, boolean isFull) {
		StringBuffer sb = new StringBuffer();

		sb.append(method.getName());

		Class[] params = method.getParameterTypes();
		for (int i = 0; i < params.length; i++) {
			sb.append('_');
			mangleClass(sb, params[i], isFull);
		}

		return sb.toString();
	}

	/**
	 * Mangles a classname.
	 */
	private void mangleClass(StringBuffer sb, Class cl, boolean isFull) {
		String name = cl.getName();

		if (name.equals("boolean") || name.equals("java.lang.Boolean"))
			sb.append("boolean");
		else if (name.equals("int") || name.equals("java.lang.Integer") || name.equals("short") || name.equals("java.lang.Short")
				|| name.equals("byte") || name.equals("java.lang.Byte"))
			sb.append("int");
		else if (name.equals("long") || name.equals("java.lang.Long"))
			sb.append("long");
		else if (name.equals("float") || name.equals("java.lang.Float") || name.equals("double") || name.equals("java.lang.Double"))
			sb.append("double");
		else if (name.equals("java.lang.String") || name.equals("com.caucho.util.CharBuffer") || name.equals("char")
				|| name.equals("java.lang.Character") || name.equals("java.io.Reader"))
			sb.append("string");
		else if (name.equals("java.util.Date") || name.equals("com.caucho.util.QDate"))
			sb.append("date");
		else if (InputStream.class.isAssignableFrom(cl) || name.equals("[B"))
			sb.append("binary");
		else if (cl.isArray()) {
			sb.append("[");
			mangleClass(sb, cl.getComponentType(), isFull);
		} else if (name.equals("org.w3c.dom.Node") || name.equals("org.w3c.dom.Element") || name.equals("org.w3c.dom.Document"))
			sb.append("xml");
		else if (isFull)
			sb.append(name);
		else {
			int p = name.lastIndexOf('.');
			if (p > 0)
				sb.append(name.substring(p + 1));
			else
				sb.append(name);
		}
	}

	/**
	 * Invoke the object with the request from the input stream.
	 * 
	 * @param in
	 *            the Burlap input stream
	 * @param out
	 *            the Burlap output stream
	 */
	public void invoke(BurlapInput in, BurlapOutput out) throws Throwable {

		// in.startCall();

		String methodName = in.getMethod();
		Method method = (Method) _methodMap.get(methodName);

		if (method == null) {
			if ("_burlap_getAttribute".equals(methodName)) {
				getBurlapAttribute(in, out);
				return;
			} else {
				throw new IOException("服务端找不到此方法:" + in.getMethod());
			}
		}
		// 插入Hook(begin)
		IHook iHook = null;
		long lBeginTime = 0;
		if (AbstractHook.doHook()) {
			iHook = AbstractHook.getHook(AbstractHook.getServiceName(methodName, HookData.DEF_SERVER_FLAG_BUSINESS_INIT));
			lBeginTime = System.currentTimeMillis();
		}
		Class[] args = method.getParameterTypes();
		Object[] values = new Object[args.length];

		try {
			for (int i = 0; i < args.length; i++) {
				values[i] = in.readObject(args[i]);
			}
			in.completeCall();
		} catch (IOException ex) {
			throw new IOException("服务端已经找到此方法名，但匹配参数的时候出错。方法名:" + in.getMethod());
		}
		// 插入Hook(end)
		if (AbstractHook.doHook()) {
			if (iHook != null) {
				long lEndTime = System.currentTimeMillis();
				String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
				// 服务名称
				aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
				// 服务标识
				aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf(HookData.DEF_SERVER_FLAG_BUSINESS_INIT);
				// 响应时间
				aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf(lEndTime - lBeginTime);
				// 处理时间
				aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format(DateTime.YYYY_MM_DD_HH_MI_SS_FLAG, DateTime.getDate());
				iHook.doSomething(aData);
				lBeginTime = 0;
			}
		}
		Object result = null;
		// 插入Hook(begin)
		if (AbstractHook.doHook()) {
			iHook = AbstractHook.getHook(AbstractHook.getServiceName(methodName, HookData.DEF_SERVER_FLAG_BUSINESS));
			lBeginTime = System.currentTimeMillis();
		}
		try {
			result = method.invoke(_service, values);
		} catch (BossException Bosse) {
			throw new BossException(Bosse.getMessage());
		} catch (Throwable e) {
			if (e instanceof InvocationTargetException) {
				e = ((InvocationTargetException) e).getTargetException();
			}
			throw new Throwable(e.getMessage());
		}
		// 插入Hook(end)
		if (AbstractHook.doHook()) {
			if (iHook != null) {
				long lEndTime = System.currentTimeMillis();
				String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
				// 服务名称
				aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
				// 服务标识
				aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf(HookData.DEF_SERVER_FLAG_BUSINESS);
				// 响应时间
				aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf(lEndTime - lBeginTime);
				// 处理时间
				aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format(DateTime.YYYY_MM_DD_HH_MI_SS_FLAG, DateTime.getDate());
				iHook.doSomething(aData);
			}
		}
		// 插入Hook(begin)
		if (AbstractHook.doHook()) {
			iHook = AbstractHook.getHook(AbstractHook.getServiceName(methodName, HookData.DEF_SERVER_FLAG_SERVLET_WRITE));
			lBeginTime = System.currentTimeMillis();
		}
		out.startReply();

		out.writeObject(result);

		out.completeReply();
		// 插入Hook(end)
		if (AbstractHook.doHook()) {
			if (iHook != null) {
				long lEndTime = System.currentTimeMillis();
				String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
				// 服务名称
				aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
				// 服务标识
				aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf(HookData.DEF_SERVER_FLAG_SERVLET_WRITE);
				// 响应时间
				aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf(lEndTime - lBeginTime);
				// 处理时间
				aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format(DateTime.YYYY_MM_DD_HH_MI_SS_FLAG, DateTime.getDate());
				iHook.doSomething(aData);
			}
		}
	}

	/**
	 * Returns special attributes.
	 * 
	 * @param in
	 *            the Burlap input stream
	 * @param out
	 *            the Burlap output stream
	 */
	public void getBurlapAttribute(BurlapInput in, BurlapOutput out) throws IOException {
		String name = in.readString();
		in.completeCall();

		out.startReply();

		if (name.equals("home-class") || name.equals("remote-class")) {
			Class cl = _service.getClass();
			Class[] interfaces = cl.getInterfaces();

			String homeClass = null;

			for (int i = 0; i < interfaces.length; i++) {
				if (java.rmi.Remote.class.isAssignableFrom(interfaces[i]) && java.rmi.Remote.class != interfaces[i])
					homeClass = interfaces[i].getName();
			}

			if (homeClass == null)
				homeClass = cl.getName();

			out.writeString(homeClass);
		} else
			out.writeObject(null);

		out.completeReply();
	}
}
