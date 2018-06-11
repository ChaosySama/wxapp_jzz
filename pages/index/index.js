//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    catagory: false,
    winHeight: 0,
    inputnum: '-0',
    range: 10,
    date: '',
    datestart: '',
    inorout: '支出',
    totalout: 0,
    totalin: 0,
    toView: '',
    hidenew: 'none',
    hidedelete: 'none',
    hidefirst: true,
    hidelast: true,
    tapNew: false,
    posUp: 0,
    posDown: 0,
    loadup: false,
    loaddown: false,
    numzone: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+/-', '0', '.'],
    allcata: [],
    catazone: [],
    selectcata: '',
    selectdate: '',
    catapage: 0,
    itemsBack: [],
    dateshow:[],
    allItems: [
      { id: 1, type: '交通', price: '1.50', date: '2017-02-11'},
      { id: 2, type: '衣服', price: '-2.88', date: '2017-02-17' },
      { id: 3, type: '交通', price: '3.20', date: '2017-02-17' },
      { id: 4, type: '吃饭', price: '4.00', date: '2017-02-17' },
      { id: 5, type: '交通', price: '5.50', date: '2017-02-17' },
      { id: 6, type: '交通', price: '6.50', date: '2017-02-17' },
      { id: 7, type: '交通', price: '7.50', date: '2017-02-17' },
      { id: 8, type: '吃饭', price: '8.20', date: '2017-02-18' },
      { id: 9, type: '交通', price: '9.50', date: '2017-02-18' },
      { id: 10, type: '衣服', price: '10.88', date: '2017-02-18' },
      { id: 11, type: '交通', price: '11.20', date: '2017-02-18' },
      { id: 12, type: '吃饭', price: '12.00', date: '2017-02-18' },
      { id: 13, type: '交通', price: '13.50', date: '2017-02-18' },
      { id: 14, type: '交通', price: '14.50', date: '2017-02-18' },
      { id: 15, type: '交通', price: '15.50', date: '2017-02-18' },
      { id: 16, type: '吃饭', price: '16.20', date: '2017-02-19' },
      { id: 17, type: '交通', price: '17.50', date: '2017-02-19' },
      { id: 18, type: '交通', price: '18.50', date: '2017-02-19' },
      { id: 19, type: '交通', price: '19.50', date: '2017-02-19' },
      { id: 20, type: '吃饭', price: '20.20', date: '2017-02-19' },
      { id: 21, type: '交通', price: '2111111.50', date: '2017-02-20' },
      { id: 22, type: '衣服', price: '22222.88', date: '2017-02-20' },
      { id: 23, type: '交通', price: '23.20', date: '2017-02-20' },
      { id: 24, type: '吃饭', price: '24.00', date: '2017-02-20' },
      { id: 25, type: '交通', price: '25.50', date: '2017-02-20' },
      { id: 26, type: '交通', price: '26.50', date: '2017-02-20' },
      { id: 27, type: '交通', price: '27.50', date: '2017-02-20' },
      { id: 28, type: '吃饭2', price: '28.20', date: '2017-02-22' },
      { id: 29, type: '交通9', price: '29.50', date: '2017-02-22' },
      { id: 30, type: '衣服', price: '30.88', date: '2017-02-22' },
      { id: 31, type: '交通0', price: '31.20', date: '2017-02-22' },
      { id: 32, type: '吃饭0', price: '32.00', date: '2017-02-22' },
      { id: 33, type: '交通1', price: '33.50', date: '2017-02-22' },
      { id: 34, type: '交通2', price: '34.50', date: '2017-02-22' },
      { id: 35, type: '交通3', price: '35.50', date: '2017-02-22' },
      { id: 36, type: '吃饭4', price: '36.20', date: '2017-02-22' },
      { id: 37, type: '交通5', price: '37.50', date: '2017-02-22' },
      { id: 38, type: '交通6', price: '38.50', date: '2017-02-22' },
      { id: 39, type: '交通7', price: '39.50', date: '2017-02-23' },
      { id: 40, type: '吃饭', price: '40.20', date: '2017-02-24' },
    ],
    items: [],
    funcs: [
      { label: '日期跳转', method: '' },
      { label: '分类筛选', method: 'typeSelect' },
      { label: '新增', method: 'newItem' },
      { label: '删除', method: 'deleteItem' }
    ],
    catafuncs: [
      { label: '', method: '' },
      { label: '', method: '' },
      { label: '重置', method: 'resetCata' },
      { label: '返回', method: 'leaveCata' }
    ]
  },
  getDate: function(){
    var year = new Date().getFullYear(),
        month = new Date().getMonth() + 1,
        day = new Date().getDate(),
        str ='';
    if(month<10){
      month = '0'+month;
    }
    str = year+'-'+month+'-'+day;
    return str;
  },
  loadCata: function (){
    var selectdate = this.data.selectdate;
    var items;
    if(selectdate==''){
      items = this.data.itemsBack;
    }else {
      items = this.data.allItems;
    }
    var hash = {}, result = [], item;
    var selectcata = this.data.selectcata;
    var sepnum = 12;
    for (var i = 0, ilen = items.length; i < ilen; i++) {
      item = items[i];
      if (!hash[item.type]) {
        hash[item.type] = true;
        if(item.type != selectcata){
          result.unshift({cata:item.type, color:0});
        }else{
          result.unshift({ cata: item.type, color: 1 });
        }
      }
    }
    this.setData({ allcata: result });
    var page = this.data.catapage;
    var num = result.length;
    var tempcata = [];
    for (var i = sepnum * page, j = sepnum*(page+1);i<j && i<num;i++) {
      tempcata.push(result[i]);
    }
    this.setData({ catazone: tempcata });
    var totalpage = Math.ceil(result.length / sepnum)-1;
    var tempcatafunc = this.data.catafuncs;
    if(totalpage > 0 && page < totalpage) {
      tempcatafunc[1] = { label: '下一页', method: 'nextCata' };
    } else {
      tempcatafunc[1] = { label: '', method: '' };
    }
    if (page > 0 && page <= totalpage) {
      tempcatafunc[0] = { label: '上一页', method: 'lastCata' };
    } else {
      tempcatafunc[0] = { label: '', method: '' };
    } 
    this.setData({ catafuncs: tempcatafunc});
  },
  lastCata: function (){
    var page = this.data.catapage;
    page = parseInt(page) - 1;
    this.setData({catapage:page});
    this.loadCata();
  },
  nextCata: function () {
    var page = this.data.catapage;
    page = parseInt(page) + 1;
    this.setData({ catapage: page });
    this.loadCata();
  },
  cataTap: function (event) {
    var cata = event.currentTarget.dataset.cata;
    var idx = event.currentTarget.dataset.idx;
    var selectdate = this.data.selectdate;
    var flag = false;
    var allitems = this.data.itemsBack;
    var tempcata = this.data.allcata;
    var tempcatazone = this.data.catazone;
    var cataitems = [];
    for (var i = 0; i < allitems.length; i++) {
      if(selectdate==''){
        if (allitems[i].type == cata) {
          flag = true;
          cataitems.push(allitems[i]);
        }
      }else {
        if (allitems[i].type == cata && allitems[i].date == selectdate) {
          flag = true;
          cataitems.push(allitems[i]);
        }
      }
    }
    if(flag){
      this.setData({ selectcata: cata });
      for (var i = 0; i < tempcata.length; i++) {
        tempcata[i].color = 0;
        if (tempcata[i].cata == cata) {
          tempcata[i].color = 1;
        }
      }
      for (var i = 0; i < tempcatazone.length; i++) {
        tempcatazone[i].color = 0;
        if (tempcatazone[i].cata == cata) {
          tempcatazone[i].color = 1;
        }
      }
      this.setData({ allcata: tempcata, catazone: tempcatazone });
      this.setData({ allItems: cataitems });
      this.freshItem();
      this.freshTotal();
    }else {
      wx.showToast({
        title: '该分类下没有数据',
        icon: 'none',
        duration: 1500,
        mask: true
      });
    }
    
  },
  resetCata: function () {
    var tempcata = this.data.allcata;
    var tempcatazone = this.data.catazone;
    var selectc = this.data.selectcata;
    var selectdate = this.data.selectdate;
    var itemsback=[];
    for (var i = 0; i < tempcata.length; i++) {
      if(selectc == tempcata[i].cata) {
        tempcata[i].color = 0;
        break;
      }
    }
    for (var i = 0; i < tempcatazone.length; i++) {
      if (selectc == tempcatazone[i].cata) {
        tempcatazone[i].color = 0;
        break;
      }
    }
    this.setData({ allcata: tempcata , catazone:tempcatazone, selectcata:''});
    if(selectdate==''){
      itemsback = this.data.itemsBack;
    }else {
      var tempall = this.data.itemsBack;
      for(var i=0;i<tempall.length;i++){
        if (tempall[i].date == selectdate) {
          itemsback.push(tempall[i]);
        }
      }
    }
    this.setData({ allItems: itemsback });
    this.freshItem();
    this.freshTotal();
  },
  freshItem: function () {
    var range = this.data.range;
    var tempitems = this.data.allItems.slice(-range * 2);
    this.setData({ items: tempitems });
    var tempposup = tempitems[0].id - 1;
    var tempposdown = tempitems[tempitems.length - 1].id;
    this.setData({ posUp: tempposup, posDown: tempposdown });
  },
  numTap: function (event) {
    if (!this.data.tapNew) return;
    var curnum = event.currentTarget.dataset.num;
    if (curnum == '+/-') {
      this.pmTap();
      return;
    }
    var inum = this.data.inputnum;
    var havem = inum.indexOf('-') >= 0;
    var havedot = inum.indexOf('.') >= 0;
    var tempnum;
    this.setData({ toView: '' });
    this.setData({ toView: 'newitem' });
    if (havem) {
      inum = inum.slice(1);
    }
    if (curnum == '.') {
      if (havedot) return;
      tempnum = inum + '.';
    } else {
      if (havedot) {
        var dotpos = inum.indexOf('.');
        var length = inum.length;
        if (length - dotpos >= 3) return;
        tempnum = inum + curnum;
      } else {
        tempnum = (parseInt(inum) * 10 + parseInt(curnum)).toString();
      }
    }
    if (tempnum.length > 9) {
      wx.showToast({
        title: '金额数量过大',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return;
    }
    if (havem) {
      tempnum = '-' + tempnum;
    }
    this.setData({ inputnum: tempnum });
  },
  redoNumber: function () {
    if (!this.data.tapNew) return;
    var tempinum = this.data.inputnum;
    var tempinorout = this.data.inorout;
    tempinum = tempinum.substring(0, tempinum.length - 1);
    if (tempinum == '-' || tempinum == '') {
      tempinum = '-0';
      tempinorout = '支出';
    }
    this.setData({ inputnum: tempinum, inorout:tempinorout });
  },
  clearNumber: function () {
    if (!this.data.tapNew) return;
    this.setData({ inputnum: '-0', inputdot: false, inorout: '支出' });
  },
  confirmNumber: function () {
    var price = this.data.inputnum;
    if (parseFloat(price) == 0) {
      wx.showToast({
        title: '没有输入金额',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return;
    }
    var tempitems = this.data.items;
    var tempallitems = this.data.allItems;
    var backitems = this.data.itemsBack;
    var length = tempitems.length;
    var newid = parseInt(tempitems[length - 1].id) + 1;
    var tempposdown = this.data.posDown;
    tempposdown++;
    var tempitem = {
      id: newid,
      type: '未知',
      price: parseFloat(price).toFixed(2).toString(),
      date: this.data.date.toString()
    }
    tempitems.push(tempitem);
    tempallitems.push(tempitem);
    backitems.push(tempitem);
    var tempdate = this.data.dateshow;
    var datestr = tempitem.date.substr(-2, 2) + '日';
    tempdate.push(datestr);
    this.setData({ dateshow: tempdate });
    this.setData({ allItems: tempallitems, items: tempitems, itemsBack:backitems, inputnum: '-0', toView: '', posDown: tempposdown });
    this.setData({ toView: 'newitem' });
    this.freshTotal();
  },
  pmTap: function () {
    if (!this.data.tapNew) return;
    var inum = this.data.inputnum;
    var tempnum, tempinorout;
    if (inum.indexOf('-') < 0) {
      tempnum = '-' + inum;
    } else {
      tempnum = inum.slice(1);
    }
    tempinorout = this.data.inorout=='支出'?'收入':'支出';
    this.setData({ inputnum: tempnum, inorout: tempinorout });
  },
  typeSelect: function () {
    this.loadCata();
    this.setData({ catagory: true });
  },
  dateSelect: function(e) {
    var selectdate = e.detail.value;
    this.setData({selectdate: selectdate});
    this.freshDate();
  },
  freshDate: function () {
    var date = this.data.selectdate;
    var selectcata = this.data.selectcata;
    var allitems;
    if(selectcata==''){
      allitems = this.data.itemsBack;
    }else {
      allitems = this.data.allItems;
    }
    var dateitems = [];
    var flag = false;
    for (var i = 0; i < allitems.length; i++) {
      if (selectcata == '') {
        if (allitems[i].date == date) {
          flag = true;
          dateitems.push(allitems[i]);
        }
      } else {
        if (allitems[i].date == date && allitems[i].type == selectcata) {
          flag = true;
          dateitems.push(allitems[i]);
        }
      }
    }
    if(flag){
      this.setData({ allItems: dateitems });
      this.freshItem();
      this.freshTotal();
      var tempfuncs = [
        { label: '日期重置', method: 'resetDate' },
        { label: '分类筛选', method: 'typeSelect' },
        { label: '新增', method: 'newItem' },
        { label: '删除', method: 'deleteItem' }
      ];
      this.setData({ funcs: tempfuncs });
    }else {
      this.setData({ selectdate: '' });
      wx.showToast({
        title: '该日期下没有数据',
        icon: 'none',
        duration: 1500,
        mask: true
      });
    }
  },
  resetDate: function() {
    var tempfuncs = [
      { label: '日期跳转', method: '' },
      { label: '分类筛选', method: 'typeSelect' },
      { label: '新增', method: 'newItem' },
      { label: '删除', method: 'deleteItem' }
    ];
    this.setData({ funcs: tempfuncs, selectdate:'' });
    var selectcata = this.data.selectcata;
    var itemsback = [];
    if (selectcata == '') {
      itemsback = this.data.itemsBack;
    } else {
      var tempall = this.data.itemsBack;
      for (var i = 0; i < tempall.length; i++) {
        if (tempall[i].type == selectcata) {
          itemsback.push(tempall[i]);
        }
      }
    }
    this.setData({ allItems: itemsback });
    this.freshItem();
    this.freshTotal();
  },
  leaveCata: function () {
    this.setData({ catagory: false });
  },
  toOrigin: function () {
    var tempfuncs = [
      { label: '日期跳转', method: '' },
      { label: '分类筛选', method: 'typeSelect' },
      { label: '新增', method: 'newItem' },
      { label: '删除', method: 'deleteItem' }
    ];
    this.setData({ funcs: tempfuncs });
    var tapNewflag = this.data.tapNew;
    if (tapNewflag) {
      this.setData({ tapNew: false, hidenew: 'none' });
    }
    this.setData({ hidedelete: 'none' });
  },
  newItem: function () {
    this.freshItem();
    var tempfuncs = [
      { label: '确认', method: 'confirmNumber' },
      { label: '←', method: 'redoNumber' },
      { label: '清空', method: 'clearNumber' },
      { label: '返回', method: 'toOrigin' }
    ];
    this.setData({ tapNew: true, hidenew: 'flex', hidedelete: 'none' });
    this.setData({ toView: 'newitem' });
    this.setData({ funcs: tempfuncs });
  },
  deleteItem: function () {
    this.setData({ hidedelete: 'flex' });
    var tempfuncs = [
      { label: '', method: '' },
      { label: '', method: '' },
      { label: '', method: '' },
      { label: '返回', method: 'toOrigin' }
    ];
    this.setData({ funcs: tempfuncs });
  },
  deleteTap: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.idx;
    var id = event.currentTarget.dataset.id;
    wx.showModal({
      title: '',
      content: '确认删除此条记录？',
      success: function (res) {
        if (res.confirm) {
          var tempallitems = that.data.allItems;
          var tempitems = that.data.items;
          var backitems = that.data.itemsBack;
          tempallitems = that.deleteOne(tempallitems, id);
          tempitems = that.deleteOne(tempitems, id);
          backitems = that.deleteOne(backitems, id);
          var tempdate = that.data.dateshow;
          tempdate[id-1] = '';
          that.setData({ dateshow: tempdate });
          that.setData({ allItems: tempallitems, items: tempitems, itemsBack:backitems});
          that.freshTotal();
        } else if (res.cancel) {
          return
        }
      }
    });
  },
  deleteOne: function(items,id){
    for(var i=0, alen=items.length;i<alen;i++){
      if(items[i].id==id) {
        items.splice(i,1);
        break;
      }
    }
    return items;
  },
  onLoad: function () {
    var res = wx.getSystemInfoSync();
    var contentHeight = res.windowHeight;
    this.setData({ winHeight: contentHeight });
    this.freshItem();
    var allitems= this.data.allItems;
    this.setData({ itemsBack: allitems});
    var range = this.data.range;
    this.setData({ toView: 'id' + parseInt(range * 2 - 1) });
    this.freshTotal();
    var date = this.getDate();
    var datestart = allitems[0].date;
    this.setData({date:date, datestart:datestart});
    var tempdate = [];
    for (var i=0;i<allitems.length;i++){
      var datestr = allitems[i].date.substr(-2,2)+'日';
      tempdate.push(datestr);
    }
    this.setData({dateshow:tempdate});
  },
  freshTotal: function () {
    var totalout = Math.abs(this.totalOut());
    var totalin = Math.abs(this.totalIn());
    this.setData({ totalout: totalout, totalin: totalin });
  },
  totalOut: function () {
    var total = 0;
    var tempitems = this.data.allItems;
    for (var i = 0, ilen = tempitems.length; i < ilen; i++) {
      if (parseFloat(tempitems[i].price) < 0) {
        total = parseFloat(total) + parseFloat(tempitems[i].price);
      }
    }
    return total.toFixed(2);
  },
  totalIn: function () {
    var total = 0;
    var tempitems = this.data.allItems;
    for (var i = 0, ilen = tempitems.length; i < ilen; i++) {
      if (parseFloat(tempitems[i].price) > 0) {
        total = parseFloat(total) + parseFloat(tempitems[i].price);
      }
    }
    return total.toFixed(2);
  },
  upper: function () {
    if (this.data.loadup) return;
    //console.log('posUp:' + this.data.posUp + 'posDown:' + this.data.posDown);
    var pos = this.data.posUp;
    if (pos == 0) {
      this.setData({ hidefirst: false });
      setTimeout(function () {
        this.setData({ hidefirst: true });
      }.bind(this), 3000);
      return;
    }
    var itemlength = this.data.allItems.length;
    var range = this.data.range;
    if (itemlength < range * 2) {
      this.lessItem();
      return;
    }
    this.setData({ loadup: true });
    var posup, posdown;
    if (pos - range < 0) {
      posup = 0;
    } else {
      posup = pos - range;
    }
    if (posup == 0) {
      this.setData({ hidefirst: false });
      setTimeout(function () {
        this.setData({ hidefirst: true });
      }.bind(this), 3000);
    } else {
      this.setData({ hidefirst: true });
    }
    posdown = posup + range * 2;
    var tempitems = this.data.allItems.slice(posup, posdown);
    this.setData({ items: tempitems, posUp: posup, posDown: posdown });
    
    var tempView = 'id' + parseInt(range - 1).toString();
    this.setData({ toView: tempView });
    setTimeout(function () {
      this.setData({ loadup: false });
    }.bind(this), 1000);
  },
  lessItem: function () {
    var allitems = this.data.allItems;
    var length = this.data.allItems.length;
    this.setData({ posUp: 0, posDown: length, items: allitems });
    this.setData({ hidelast: false });
    setTimeout(function () {
      this.setData({ hidelast: true });
    }.bind(this), 3000);
  },
  lower: function (event) {
    if (this.data.loaddown) return;
    //console.log('posUp:' + this.data.posUp + 'posDown:' + this.data.posDown);
    var itemlength = this.data.allItems.length;
    var range = this.data.range;
    if (itemlength < range * 2) {
      this.lessItem();
      return;
    }
    this.setData({ loaddown: true });
    var pos = this.data.posDown;
    var posup, posdown;
    var length = this.data.allItems.length;
    if (pos + range > length) {
      posdown = length;
    } else {
      posdown = pos + range;
    }
    if (posdown == length) {
      this.setData({ hidelast: false });
      setTimeout(function () {
        this.setData({ hidelast: true });
      }.bind(this), 3000);
    } else {
      this.setData({ hidelast: true });
    }
    posup = posdown - range * 2;
    var tempitems = this.data.allItems.slice(posup, posdown);
    this.setData({ items: tempitems, posUp: posup, posDown: posdown });
    
    setTimeout(function () {
      this.setData({ loaddown: false });
    }.bind(this), 1000);
  },
  dateTap: function(event) {
    var id = event.currentTarget.dataset.id;
    var items = this.data.allItems;
    var tempdateshow = this.data.dateshow;
    var date = '';
    for (var i = 0, alen = items.length; i < alen; i++) {
      if (items[i].id == id) {
        date = items[i].date;
        break;
      }
    }
    if (tempdateshow[id-1].indexOf('日') > 0){
      tempdateshow[id-1] = date;
    } else {
      tempdateshow[id-1] = date.substr(-2,2)+'日';
    }
    this.setData({dateshow:tempdateshow});
  },
})
