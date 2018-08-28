 /*
 * <p>Title: BFC js 命名空间</p>
 *
 * <p>Description:BFC js 命名空间 </p>
 *
 * <p>Copyright (c) 2005-2007</p>
 *
 * <p>Company: fmcc&newland</p>
 *
 * @author chenjp
 * @version 1.0
 * 参考YAHOO.js http://www.yahoo.com
 */


/**
 * @class The BFC 全局类
 */
var BFC = function() {

    return {

        /**
         * BFC utils namespace 用于公共基本包，所有涉及到具体业务的请放business里面。
         */
        util: {},

        /**
         * 特定的业务包
         */
        biz: {},
		
		/**
		 *常量包
		 */
		 constant:{},
		 
        /**
         * Returns the namespace specified and creates it if it doesn't exist
         * 用法如下：
         * BFC.namespace("property.package");
         * BFC.namespace("BFC.property.package");
         *
         * 上面方法将创建如下的命名空间 BFC.property和BFC.property.package
         *
         * @param  {String} sNameSpace String representation of the desired
         *                             namespace
         * @return {Object}            A reference to the namespace object
         */
        namespace: function( sNameSpace ) {

            if (!sNameSpace || !sNameSpace.length) {
                return null;
            }

            var levels = sNameSpace.split(".");

            var currentNS = BFC;

            // 默认情况下，BFC是命名空间的第一节点。这个可以省去不写。
            for (var i=(levels[0] == "BFC") ? 1 : 0; i<levels.length; ++i) {
                currentNS[levels[i]] = currentNS[levels[i]] || {};
                currentNS = currentNS[levels[i]];
            }

            return currentNS;

        }
    };

} ();

