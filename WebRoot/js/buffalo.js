/**
 * ���ļ��м����ࣺBuffalo��BuffaloReply��BuffaloCall
 * ʵ���� ������ýӿڣ�Э����������͵�
 *
 */
//����  Զ�̵���
function BuffaloCall(methodname){
	this.method = methodname;
	this.params = [];
	return this;
}


BuffaloCall