package com.caucho.burlap.server;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.faces.application.ViewHandler;
import javax.faces.component.UIComponent;
import javax.faces.component.UIComponentBase;
import javax.faces.component.UIForm;
import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;
import javax.servlet.http.HttpServletRequest;

import com.caucho.burlap.io.BurlapInput;
import com.caucho.burlap.io.BurlapOutput;
import com.sun.faces.RIConstants;
import org.apache.commons.beanutils.PropertyUtils;
import com.sun.faces.util.Base64;
import org.apache.commons.beanutils.*;
import utils.BossException;
import com.newland.base.hook.*;
import com.newland.base.util.DateTime;

/**
 * <p>Title: </p>
 *
 * <p>Description: </p>
 *
 * <p>Copyright: Copyright (c) 2004</p>
 *
 * <p>Company: </p>
 *
 * @author jiangjz
 * @version 1.0
 */
public class JSFBurlapSkeleton extends BurlapSkeleton {
    private String backBeanName; //form所绑定的bean对象名
    private Map propertyMap = null; //字段映射，比如页面的 operator_name(key) 映射成 bean 的 name(value)
    private final String FACES_VIEW_STATE = RIConstants.FACES_PREFIX + "VIEW_STATE";
    private final String FACES_VIEW_LIST = RIConstants.FACES_PREFIX + "VIEW_LIST";
    private final String FACES_VIEW_STRING = RIConstants.FACES_PREFIX + "VIEW";
    /**
     * JSF context ，获取state状态等信息
     */
    private FacesContext faceContext ;

    public JSFBurlapSkeleton(Object service) {
        super(service);
    }

    public void invoke(BurlapInput in, BurlapOutput out) throws Throwable {
        //in.startCall();

        String methodName = in.getMethod();
        Method method = (Method) _methodMap.get(methodName);

        if (method != null) {
        } else if (methodName.equals("_burlap_getAttribute")) {
            getBurlapAttribute(in, out);
            return;
        } else {
            throw new IOException("服务端方法名不匹配:" + in.getMethod());
        }

        Class[] args = method.getParameterTypes();
        Object[] values = new Object[args.length];
        //插入Hook(begin)
        IHook iHook=null;
        long lBeginTime=0;
        if(AbstractHook.doHook()){
                iHook=AbstractHook.getHook(AbstractHook.getServiceName(methodName,HookData.DEF_SERVER_FLAG_BUSINESS_INIT));
                lBeginTime=System.currentTimeMillis();
        }
        //注意：最前面一个参数固定为jsf对应的form对象
        Object bindBeanObj;
        if (this.backBeanName == null || "".equals(this.backBeanName)) {
            bindBeanObj = super._service; //默认绑定它本身
        } else {
            bindBeanObj = PropertyUtils.getProperty(super._service,
                    this.backBeanName); //取得要赋值的formbean
        }

        try {
            Object formObj = in.readObject();//Map形式
            BeanUtils.copyProperties(bindBeanObj, formObj);
            //this.mapToObject(bindBeanObj,(Map)formObj);
            if (backBeanName==null || "".equals(backBeanName))//有传backBeanName参数，则绑定backBean，否则按JSF绑定
            {
                //this.bindBean(this.propertyMap, bindBeanObj, formObj);
                this.bindBean(this.testJSF((String)((Map)formObj).get(this.FACES_VIEW_STRING))
                              ,bindBeanObj, formObj);
            }

            for (int i = 0; i < args.length; i++) {
                values[i] = in.readObject(args[i]); //arg
            }
            in.completeCall();
        } catch (IOException ex) {
            throw new IllegalStateException("所调用方法[" + method.getName() +
                                            "]的参数不匹配，请检查客户端与服务端的一致性");
        }
        //插入Hook(end)
        if(AbstractHook.doHook()){
           if(iHook!=null){
             long lEndTime = System.currentTimeMillis();
             String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
             //服务名称
             aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
             //服务标识
             aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_BUSINESS_INIT );
             //响应时间
             aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
             //处理时间
             aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format( DateTime.YYYY_MM_DD_HH_MI_SS_FLAG,
                 DateTime.getDate() );
             iHook.doSomething( aData );
             lBeginTime=0;
           }
        }
        Object result = null;
        //插入Hook(begin)
        if(AbstractHook.doHook()){
                iHook=AbstractHook.getHook(AbstractHook.getServiceName(methodName,HookData.DEF_SERVER_FLAG_BUSINESS));
                lBeginTime=System.currentTimeMillis();
        }
        try {
            result = method.invoke(_service, values);
        }catch(BossException Bosse){
          out.startReply();
          out.writeFault( "ServiceException", Bosse.getMessage(), Bosse );
          out.completeReply();
          //插入Hook(end)
          if(AbstractHook.doHook()){
             if(iHook!=null){
               long lEndTime = System.currentTimeMillis();
               String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
               //服务名称
               aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
               //服务标识
               aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_BUSINESS );
               //响应时间
               aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
               //处理时间
               aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format( DateTime.YYYY_MM_DD_HH_MI_SS_FLAG,
                   DateTime.getDate() );
               iHook.doSomething( aData );
             }
          }
          return;
        }
        catch (Throwable e) {
            if (e instanceof InvocationTargetException) {
                e = ((InvocationTargetException) e).getTargetException();
            }
            out.startReply();
            out.writeFault("ServiceException", e.getMessage(), e);
            out.completeReply();
            //插入Hook(end)
            if(AbstractHook.doHook()){
               if(iHook!=null){
                 long lEndTime = System.currentTimeMillis();
                 String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
                 //服务名称
                 aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
                 //服务标识
                 aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_BUSINESS );
                 //响应时间
                 aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
                 //处理时间
                 aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format( DateTime.YYYY_MM_DD_HH_MI_SS_FLAG,
                     DateTime.getDate() );
                 iHook.doSomething( aData );
               }
            }
            return;
        }
        //插入Hook(end)
        if(AbstractHook.doHook()){
           if(iHook!=null){
             long lEndTime = System.currentTimeMillis();
             String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
             //服务名称
             aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
             //服务标识
             aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_BUSINESS );
             //响应时间
             aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
             //处理时间
             aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format( DateTime.YYYY_MM_DD_HH_MI_SS_FLAG,
                 DateTime.getDate() );
             iHook.doSomething( aData );
           }
        }
        //插入Hook(begin)
        if(AbstractHook.doHook()){
                iHook=AbstractHook.getHook(AbstractHook.getServiceName(methodName,HookData.DEF_SERVER_FLAG_SERVLET_WRITE));
                lBeginTime=System.currentTimeMillis();
        }
        out.startReply();

        out.writeObject(result);

        out.completeReply();
        //插入Hook(end)
        if(AbstractHook.doHook()){
           if(iHook!=null){
             long lEndTime = System.currentTimeMillis();
             String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
             //服务名称
             aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
             //服务标识
             aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_SERVLET_WRITE );
             //响应时间
             aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
             //处理时间
             aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format( DateTime.YYYY_MM_DD_HH_MI_SS_FLAG,
                 DateTime.getDate() );
             iHook.doSomething( aData );
           }
       }
    }

    public void setBackBeanName(String backBeanName) {
        this.backBeanName = backBeanName;
    }

    public void setPropertyMap(Map propertyMap) {
        this.propertyMap = propertyMap;
    }

    public void setFaceContext(FacesContext faceContext) {
        this.faceContext = faceContext;
    }

    public String getBackBeanName() {
        return backBeanName;
    }

    public Map getPropertyMap() {
        return propertyMap;
    }

    public FacesContext getFaceContext() {
        return faceContext;
    }

    /**
     * 从bean中取出子对象属性串，如funcTree.funcBean,返回
     * @param bean Object
     * @return Object
     */
    private String getBindBeanStr(String bindExpress) {
        bindExpress = bindExpress.substring(bindExpress.indexOf("#{")+2,
                      bindExpress.indexOf("}"));//#{}截取内部字符
        int index = bindExpress.indexOf('.');
        if (bindExpress.substring(0,index).equals(this.backBeanName)){
            throw new IllegalStateException("所绑定的bean必须在操作bean内部!");
        }
        return bindExpress.substring(index+1);
    }

//    private void mapToObject(Object target,Map map){
//        if (null == map) {
//            return;
//        }
//        for (Iterator iter = map.entrySet().iterator(); iter.hasNext(); ) {
//            Map.Entry item = (Map.Entry) iter.next();
//            try {
//                BeanUtils.setProperty(target, (String)item.getKey(),item.getValue());
//            } catch (Exception ex) {
//                ex.printStackTrace();
//            }
//        }
//    }
    /**
     * 从source对象根据map的属性映射，拷贝到target对象
     * @param map Map
     * @param target Object
     * @param source Object
     */
    private void bindBean(Map map, Object target, Object source) {
        if (null == map){
            return;
        }

        for (Iterator iter = map.entrySet().iterator(); iter.hasNext(); ) {
            Map.Entry item = (Map.Entry) iter.next();
            String sourceKey = (String) item.getKey(); //页面上对应的字段名称
            String targetKey = (String) item.getValue(); //bean对应的字段名称
            try {
                Object targetValue = PropertyUtils.getProperty(source,sourceKey);
                BeanUtils.setProperty(target, this.getBindBeanStr(targetKey), targetValue);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    /**
     * 状态从客户端设置到context
     * @param context FacesContext
     * @param bytes byte[] 客户端字节流
     * @return Object
     */
    private Object getTreeStructureToRestore(FacesContext context,byte[] bytes ) {
        Object structure = null;
        Object state = null;

        Map requestParamMap = context.getExternalContext()
            .getRequestParameterMap();

//        String viewString = (String) requestParamMap.get(
//            RIConstants.FACES_VIEW);
//        if (viewString == null) {
//            return null;
//        }

        bytes = Base64.decode(bytes);
        try {
            ObjectInputStream ois = new ObjectInputStream(
                new ByteArrayInputStream(bytes));
            structure = ois.readObject();
            state = ois.readObject();
            Map requestMap = context.getExternalContext().getRequestMap();
            // store the state object temporarily in request scope until it is
            // processed by getComponentStateToRestore which resets it.
            requestMap.put(FACES_VIEW_STATE, state);
            ois.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return structure;
    }

    /**
     * 取得jsf得映射map，key为页面元素名，value为bean得属性名
     * @param viewString String
     * @return Map
     */
    private Map testJSF(String viewString) {
        FacesContext context = FacesContext.getCurrentInstance();
        String renderKitId = "";
        ViewHandler outerViewHandler =
                context.getApplication().getViewHandler();
        renderKitId =
                outerViewHandler.calculateRenderKitId(context);
        String viewId = "";
        Map requestMap = context.getExternalContext().getRequestMap();
        viewId = (String)
                 requestMap.get("javax.servlet.include.path_info");
        if (viewId == null) {
            viewId = context.getExternalContext().getRequestPathInfo();
        }
        // It could be that this request was mapped using
        // a prefix mapping in which case there would be no
        // path_info.  Query the servlet path.
        if (viewId == null) {
            viewId = (String)
                     requestMap.get("javax.servlet.include.servlet_path");
        }

        HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();
        request.setAttribute(this.FACES_VIEW_STRING,viewString);
        if (viewId == null) {
            //viewId = ((HttpServletRequest) request).getServletPath();
            viewId = request.getParameter("viewId");
            String path = ((HttpServletRequest) request).getContextPath();
            if (null == viewId || "".equals(viewId) ||
                !viewId.startsWith(path)) { //非JSF处理
                return null;
            }
            viewId = viewId.substring(path.length()); //不为root路径，需要去除前缀

        }
        UIComponent viewRoot = null;

        Map sessionMap = com.sun.faces.util.Util.getSessionMap(context);
        // viewList maintains a list of viewIds corresponding to
        // all the views stored in session.
        ArrayList viewList = (ArrayList) sessionMap.get(FACES_VIEW_LIST);//debug用

        //如果状态存储在客户端，则先恢复状态
        if ( com.sun.faces.util.Util.getStateManager(context).isSavingStateInClient(context) ){
            //this.getTreeStructureToRestore(context,viewString.getBytes());
            //request.put(RIConstants.FACES_VIEW,viewString);
        }

        viewRoot = com.sun.faces.util.Util.getStateManager(context).restoreView(
                    context, viewId, renderKitId);

        String formId =  request.getParameter("formId") ;
        UIForm theForm = this.getCurrentForm(viewRoot,formId);//(UIForm) viewRoot.getChildren().get(0);

        Map map = this.getFormElementBinding(theForm);
        return map;
    }


    /**
     * 取得界面提交的当前form
     * @param viewRoot UIComponent
     * @return UIForm
     */
    private UIForm getCurrentForm(UIComponent viewRoot,String formId){
        List elements = viewRoot.getChildren();
        for (int i = 0; i < elements.size(); i++) {
            Object item = elements.get(i);
            if (!(item instanceof UIForm))
              continue;
            UIForm theForm = (UIForm) elements.get(i);
            if (theForm.getId().equals(formId)){
                return theForm;
            }
        }
        throw new RuntimeException("无法定位JSF form ,id : "+formId);
    }
    /**
     * 取得form中元素的绑定变量名,放入map
     * @param form UIForm
     * @return String
     */
    private Map getFormElementBinding(UIForm form) {
        Map map = new HashMap();
        List elements = form.getChildren();
        for (int i = 0; i < elements.size(); i++) {
            UIComponentBase component = (UIComponentBase) elements.get(i);
            ValueBinding bind = component.getValueBinding("value");
            String bindExpress = null;
            if (bind != null) {
                bindExpress = bind.getExpressionString();
                map.put(component.getId(), bindExpress);
            }
        }
        return map;
    }

}
