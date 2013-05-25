Ext.define('Ninja.window.CapInWindow', {
  extend: 'Ext.window.Window',
  constrainHeader: true,
  width: 250,
  height: 200,
  resizable: false,
  draggable: false,
  closeAction: 'hide',
  buttonAlign: 'center',
  closable: false,
  layout: 'form',
  title: ' ',

  formPanel: undefined,
  loginField: undefined,
  submitBtn: undefined,
  cancelBtn: undefined,

  initComponent: function(){
    var me = this;

    me.items = [
      me.createFormPanel()
    ];
    me.buttons = me.createButtons();

    me.callParent(arguments)
  },

  // 创建表单
  createFormPanel: function(){
    var me = this;
    
    // 帐号
    me.loginField = Ext.create('Ext.form.field.Text', {
      name: 'login',
      fieldLabel: '帐号',
      labelWidth: 40,
      labelAlign: 'right',
      padding: '10 0 10 0',
      maxLength: 30,
      anchor: '100%',
      readOnly: true,
      value: me.investorLogin
    });

    // 资金
    me.priceField = Ext.create('Ext.form.field.Number', {
       name: 'price',
       fieldLabel: '资金',
       anchor: '100%',
       maxLength: 30,
       labelWidth: 40,
       labelAlign: 'right',
       padding: '10 0 10 0',
       minValue: 0,
       hideTrigger: true,
       keyNavEnabled: false,
       mouseWheelEnabled: false,
       allowBlank: false
    });

    // 银行
    var bankCode = Ext.create('Ext.data.Store', {
      fields: ['code', 'name'],
      data: [
         {"code":"ICBC", "name":"工商银行"},{"code":"CMBCHINA", "name":"招商银行"},
         {"code":"ABC", "name":"中国农业银行"},{"code":"CCB", "name":"建设银行"},{"code":"BCCB", "name":"北京银行"},
         {"code":"CIB", "name":"兴业银行"},{"code":"NJCB", "name":"南京银行"},{"code":"CMBC", "name":"民生银行"},
         {"code":"CEB", "name":"光大银行"},{"code":"BOC", "name":"中国银行"},{"code":"PAB", "name":"平安银行"},
         {"code":"CBHB", "name":"渤海银行"},{"code":"HKBEA", "name":"东亚银行"},{"code":"NBCB", "name":"宁波银行"},
         {"code":"ECITIC", "name":"中信银行"},{"code":"SDB", "name":"深圳发展银行"},{"code":"GDB", "name":"广发银行"},
         {"code":"SHB", "name":"上海银行"},{"code":"POST", "name":"中国邮政"},{"code":"BJRCB", "name":"北京农村商业银行"},
         {"code":"HXB", "name":"华夏银行"},{"code":"SPDB", "name":"上海浦东银行"},{"code":"CZ", "name":"浙商银行"},
         {"code":"HZBANK", "name":"杭州银行"},{"code":"SRCB", "name":"上海农村商业银行"},{"code":"NCBBANK", "name":"南洋商业银行"},
         {"code":"SCCB", "name":"河北银行"},{"code":"ZJTLCB", "name":"泰隆银行"},{"code":"BOCO", "name":"交通银行"}
      ]
    });

    me.bankField = Ext.create('Ext.form.field.ComboBox', {
      name: 'bank',
      fieldLabel: '银行',
      editable: false,
      maxLength: 30,
      maxHeight: 150,
      labelWidth: 40,
      labelAlign: 'right',
      listConfig: { maxHeight: 80 },
      padding: '10 0 10 0',
      store: bankCode,
      displayField: 'name',
      valueField: 'code',
      value: 'ICBC'
    });

    // 表单控件
    me.formPanel = Ext.create('Ext.form.Panel', {
      region: 'center',
      bodyPadding: 5,
      header: false,
      border: false,
      bodyCls: 'framed-bgcolor',
      items: [
        me.loginField,
        me.priceField,
        me.bankField
      ]
    });
    return me.formPanel;
  },

  // 创建按钮
  createButtons: function(){
    var me = this;
    me.submitBtn = Ext.create('Ext.button.Button', {
      xtype: 'button',
      text: '确&nbsp;&nbsp;认',
      scale: 'medium',
      width: 40,
      handler: me.submitFn,
      scope: me
    });
    me.cancelBtn = Ext.create('Ext.button.Button', {
      xtype: 'button',
      text: '重&nbsp;&nbsp;置',
      scale: 'medium',
      width: 40,
      handler: me.cancelFn,
      scope: me
    });
    return [ me.submitBtn, me.cancelBtn ];
  },

  // 提交函数
  submitFn: function(){
    var me = this,
    form = me.formPanel.getForm();
    if(form.isValid()){
      //var url = 'http://210.83.84.92:9800/product/pay?' + form.getValues(true);
      var url = 'http://pay.lktz.net/product/pay?' + form.getValues(true);
      window.open(url,'','location=no,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes')
    }
  },

  // 取消函数
  cancelFn: function(){
    var me = this;
    me.formPanel.getForm().reset()
  }
});