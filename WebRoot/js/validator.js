Validator = {
	/**
	 * NUMBER ������
	 * 
	 * @param value
	 *            �ؼ�ֵ
	 */
	NUMBER : "this._number(value);",

	_number : function(value) {
		var reg = /^[1-9]\d*$/;
		if (!reg.test(value)) {
			return "����Ϊ���֣�";
		} else {
			return null;
		}
	}

};

