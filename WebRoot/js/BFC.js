 /*
 * <p>Title: BFC js �����ռ�</p>
 *
 * <p>Description:BFC js �����ռ� </p>
 *
 * <p>Copyright (c) 2005-2007</p>
 *
 * <p>Company: fmcc&newland</p>
 *
 * @author chenjp
 * @version 1.0
 * �ο�YAHOO.js http://www.yahoo.com
 */


/**
 * @class The BFC ȫ����
 */
var BFC = function() {

    return {

        /**
         * BFC utils namespace ���ڹ����������������漰������ҵ������business���档
         */
        util: {},

        /**
         * �ض���ҵ���
         */
        biz: {},
		
		/**
		 *������
		 */
		 constant:{},
		 
        /**
         * Returns the namespace specified and creates it if it doesn't exist
         * �÷����£�
         * BFC.namespace("property.package");
         * BFC.namespace("BFC.property.package");
         *
         * ���淽�����������µ������ռ� BFC.property��BFC.property.package
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

            // Ĭ������£�BFC�������ռ�ĵ�һ�ڵ㡣�������ʡȥ��д��
            for (var i=(levels[0] == "BFC") ? 1 : 0; i<levels.length; ++i) {
                currentNS[levels[i]] = currentNS[levels[i]] || {};
                currentNS = currentNS[levels[i]];
            }

            return currentNS;

        }
    };

} ();

