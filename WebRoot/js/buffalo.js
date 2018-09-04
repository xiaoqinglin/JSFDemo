/**
 * 此文件有几个类：Buffalo，BuffaloReply，BuffaloCall
 * 实现了 对外调用接口，协议解析、发送等
 *
 */
//方法  远程调用
function BuffaloCall(methodname){
	this.method = methodname;
	this.params = [];
	return this;
}