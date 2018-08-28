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
    private String backBeanName; //form���󶨵�bean������
    private Map propertyMap = null; //�ֶ�ӳ�䣬����ҳ��� operator_name(key) ӳ��� bean �� name(value)
    private final String FACES_VIEW_STATE = RIConstants.FACES_PREFIX + "VIEW_STATE";
    private final String FACES_VIEW_LIST = RIConstants.FACES_PREFIX + "VIEW_LIST";
    private final String FACES_VIEW_STRING = RIConstants.FACES_PREFIX + "VIEW";
    /**
     * JSF context ����ȡstate״̬����Ϣ
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
            throw new IOException("����˷�������ƥ��:" + in.getMethod());
        }

        Class[] args = method.getParameterTypes();
        Object[] values = new Object[args.length];
        //����Hook(begin)
        IHook iHook=null;
        long lBeginTime=0;
        if(AbstractHook.doHook()){
                iHook=AbstractHook.getHook(AbstractHook.getServiceName(methodName,HookData.DEF_SERVER_FLAG_BUSINESS_INIT));
                lBeginTime=System.currentTimeMillis();
        }
        //ע�⣺��ǰ��һ�������̶�Ϊjsf��Ӧ��form����
        Object bindBeanObj;
        if (this.backBeanName == null || "".equals(this.backBeanName)) {
            bindBeanObj = super._service; //Ĭ�ϰ�������
        } else {
            bindBeanObj = PropertyUtils.getProperty(super._service,
                    this.backBeanName); //ȡ��Ҫ��ֵ��formbean
        }

        try {
            Object formObj = in.readObject();//Map��ʽ
            BeanUtils.copyProperties(bindBeanObj, formObj);
            //this.mapToObject(bindBeanObj,(Map)formObj);
            if (backBeanName==null || "".equals(backBeanName))//�д�backBeanName���������backBean������JSF��
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
            throw new IllegalStateException("�����÷���[" + method.getName() +
                                            "]�Ĳ�����ƥ�䣬����ͻ��������˵�һ����");
        }
        //����Hook(end)
        if(AbstractHook.doHook()){
           if(iHook!=null){
             long lEndTime = System.currentTimeMillis();
             String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
             //��������
             aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
             //�����ʶ
             aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_BUSINESS_INIT );
             //��Ӧʱ��
             aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
             //����ʱ��
             aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format( DateTime.YYYY_MM_DD_HH_MI_SS_FLAG,
                 DateTime.getDate() );
             iHook.doSomething( aData );
             lBeginTime=0;
           }
        }
        Object result = null;
        //����Hook(begin)
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
          //����Hook(end)
          if(AbstractHook.doHook()){
             if(iHook!=null){
               long lEndTime = System.currentTimeMillis();
               String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
               //��������
               aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
               //�����ʶ
               aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_BUSINESS );
               //��Ӧʱ��
               aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
               //����ʱ��
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
            //����Hook(end)
            if(AbstractHook.doHook()){
               if(iHook!=null){
                 long lEndTime = System.currentTimeMillis();
                 String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
                 //��������
                 aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
                 //�����ʶ
                 aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_BUSINESS );
                 //��Ӧʱ��
                 aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
                 //����ʱ��
                 aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format( DateTime.YYYY_MM_DD_HH_MI_SS_FLAG,
                     DateTime.getDate() );
                 iHook.doSomething( aData );
               }
            }
            return;
        }
        //����Hook(end)
        if(AbstractHook.doHook()){
           if(iHook!=null){
             long lEndTime = System.currentTimeMillis();
             String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
             //��������
             aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
             //�����ʶ
             aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_BUSINESS );
             //��Ӧʱ��
             aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
             //����ʱ��
             aData[HookData.DEF_ARRAY_SERVER_DATETIME] = DateTime.format( DateTime.YYYY_MM_DD_HH_MI_SS_FLAG,
                 DateTime.getDate() );
             iHook.doSomething( aData );
           }
        }
        //����Hook(begin)
        if(AbstractHook.doHook()){
                iHook=AbstractHook.getHook(AbstractHook.getServiceName(methodName,HookData.DEF_SERVER_FLAG_SERVLET_WRITE));
                lBeginTime=System.currentTimeMillis();
        }
        out.startReply();

        out.writeObject(result);

        out.completeReply();
        //����Hook(end)
        if(AbstractHook.doHook()){
           if(iHook!=null){
             long lEndTime = System.currentTimeMillis();
             String[] aData = new String[HookData.DEF_ARRAY_LENGTH];
             //��������
             aData[HookData.DEF_ARRAY_SERVER_NAME] = methodName;
             //�����ʶ
             aData[HookData.DEF_ARRAY_SERVER_FLAG] = String.valueOf( HookData.DEF_SERVER_FLAG_SERVLET_WRITE );
             //��Ӧʱ��
             aData[HookData.DEF_ARRAY_SERVER_DEALTIME] = String.valueOf( lEndTime - lBeginTime );
             //����ʱ��
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
     * ��bean��ȡ���Ӷ������Դ�����funcTree.funcBean,����
     * @param bean Object
     * @return Object
     */
    private String getBindBeanStr(String bindExpress) {
        bindExpress = bindExpress.substring(bindExpress.indexOf("#{")+2,
                      bindExpress.indexOf("}"));//#{}��ȡ�ڲ��ַ�
        int index = bindExpress.indexOf('.');
        if (bindExpress.substring(0,index).equals(this.backBeanName)){
            throw new IllegalStateException("���󶨵�bean�����ڲ���bean�ڲ�!");
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
     * ��source�������map������ӳ�䣬������target����
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
            String sourceKey = (String) item.getKey(); //ҳ���϶�Ӧ���ֶ�����
            String targetKey = (String) item.getValue(); //bean��Ӧ���ֶ�����
            try {
                Object targetValue = PropertyUtils.getProperty(source,sourceKey);
                BeanUtils.setProperty(target, this.getBindBeanStr(targetKey), targetValue);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    /**
     * ״̬�ӿͻ������õ�context
     * @param context FacesContext
     * @param bytes byte[] �ͻ����ֽ���
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
     * ȡ��jsf��ӳ��map��keyΪҳ��Ԫ������valueΪbean��������
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
                !viewId.startsWith(path)) { //��JSF����
                return null;
            }
            viewId = viewId.substring(path.length()); //��Ϊroot·������Ҫȥ��ǰ׺

        }
        UIComponent viewRoot = null;

        Map sessionMap = com.sun.faces.util.Util.getSessionMap(context);
        // viewList maintains a list of viewIds corresponding to
        // all the views stored in session.
        ArrayList viewList = (ArrayList) sessionMap.get(FACES_VIEW_LIST);//debug��

        //���״̬�洢�ڿͻ��ˣ����Ȼָ�״̬
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
     * ȡ�ý����ύ�ĵ�ǰform
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
        throw new RuntimeException("�޷���λJSF form ,id : "+formId);
    }
    /**
     * ȡ��form��Ԫ�صİ󶨱�����,����map
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
