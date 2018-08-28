Validator = {
	/**
	 * NUMBER 正整数
	 * 
	 * @param value
	 *            控件值
	 */
	NUMBER : "this._number(value);",

	_number : function(value) {
		var reg = /^[1-9]\d*$/;
		if (!reg.test(value)) {
			return "必须为数字，";
		} else {
			return null;
		}
	}

};

