//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    catagory: false,
    winHeight: 0,
    inputnum: '0',
    range: 10,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    totalout: 0,
    totalin: 0,
    toView: '',
    hidenew: 'none',
    hidedelete: 'none',
    tapNew: false,
    posUp: 0,
    posDown: 0,
    loadup: false,
    loaddown: false,
    numzone: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+/-', '0', '.'],
    allcata: [],
    catazone: [],
    catapage: 0,
    itemsBack: [],
    allItems: [
      { id: 1, type: '交通', price: '1.50', year: '2017', month: '2', day: '17' },
      { id: 2, type: '衣服', price: '-2.88', year: '2017', month: '2', day: '17' },
      { id: 3, type: '交通', price: '3.20', year: '2018', month: '2', day: '17' },
      { id: 4, type: '吃饭', price: '4.00', year: '2018', month: '2', day: '17' },
      { id: 5, type: '交通', price: '5.50', year: '2018', month: '2', day: '18' },
      { id: 6, type: '交通', price: '6.50', year: '2018', month: '2', day: '18' },
      { id: 7, type: '交通', price: '7.50', year: '2018', month: '2', day: '18' },
      { id: 8, type: '吃饭', price: '8.20', year: '2018', month: '2', day: '18' },
      { id: 9, type: '交通', price: '9.50', year: '2018', month: '2', day: '18' },
      { id: 10, type: '衣服', price: '10.88', year: '2018', month: '2', day: '19' },
      { id: 11, type: '交通', price: '11.20', year: '2018', month: '2', day: '19' },
      { id: 12, type: '吃饭', price: '12.00', year: '2018', month: '2', day: '19' },
      { id: 13, type: '交通', price: '13.50', year: '2018', month: '2', day: '19' },
      { id: 14, type: '交通', price: '14.50', year: '2018', month: '2', day: '19' },
      { id: 15, type: '交通', price: '15.50', year: '2018', month: '2', day: '20' },
      { id: 16, type: '吃饭', price: '16.20', year: '2018', month: '2', day: '20' },
      { id: 17, type: '交通', price: '17.50', year: '2018', month: '2', day: '20' },
      { id: 18, type: '交通', price: '18.50', year: '2018', month: '2', day: '20' },
      { id: 19, type: '交通', price: '19.50', year: '2018', month: '2', day: '20' },
      { id: 20, type: '吃饭', price: '20.20', year: '2018', month: '2', day: '20' },
      { id: 21, type: '交通', price: '2111111.50', year: '2018', month: '2', day: '17' },
      { id: 22, type: '衣服', price: '22222.88', year: '2018', month: '2', day: '17' },
      { id: 23, type: '交通', price: '23.20', year: '2018', month: '2', day: '17' },
      { id: 24, type: '吃饭', price: '24.00', year: '2018', month: '2', day: '17' },
      { id: 25, type: '交通', price: '25.50', year: '2018', month: '2', day: '18' },
      { id: 26, type: '交通', price: '26.50', year: '2018', month: '2', day: '18' },
      { id: 27, type: '交通', price: '27.50', year: '2018', month: '2', day: '18' },
      { id: 28, type: '吃饭2', price: '28.20', year: '2018', month: '2', day: '18' },
      { id: 29, type: '交通9', price: '29.50', year: '2018', month: '2', day: '18' },
      { id: 30, type: '衣服', price: '30.88', year: '2018', month: '2', day: '19' },
      { id: 31, type: '交通0', price: '31.20', year: '2018', month: '2', day: '19' },
      { id: 32, type: '吃饭0', price: '32.00', year: '2018', month: '2', day: '19' },
      { id: 33, type: '交通1', price: '33.50', year: '2018', month: '2', day: '19' },
      { id: 34, type: '交通2', price: '34.50', year: '2018', month: '2', day: '19' },
      { id: 35, type: '交通3', price: '35.50', year: '2018', month: '2', day: '20' },
      { id: 36, type: '吃饭4', price: '36.20', year: '2018', month: '2', day: '20' },
      { id: 37, type: '交通5', price: '37.50', year: '2018', month: '2', day: '20' },
      { id: 38, type: '交通6', price: '38.50', year: '2018', month: '2', day: '20' },
      { id: 39, type: '交通7', price: '39.50', year: '2018', month: '2', day: '20' },
      { id: 40, type: '吃饭', price: '40.20', year: '2018', month: '2', day: '20' },
    ],
    items: [],
    funcs: [
      { label: '日期跳转', method: 'toDate' },
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
  loadCata: function (){
    var items = this.data.itemsBack;
    var hash = {}, result = [], item;
    var acata = this.data.allcata;
    var sepnum = 12;
    for (var i = 0, ilen = acata.length; i < ilen; i++) {
      item = acata[i];
      hash[item.cata] = true;
      result.push(item);
    }
    for (var i = 0, ilen = items.length; i < ilen; i++) {
      item = items[i];
      if (!hash[item.type]) {
        hash[item.type] = true;
        result.unshift({cata:item.type, color:0});
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
    console.log(this.data.catazone);
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
    var tempcata = this.data.allcata;
    var tempcatazone = this.data.catazone;
    var allitems = this.data.itemsBack;
    var cataitems = [];
    for(var i=0; i<tempcata.length; i++){
      tempcata[i].color=(i==idx?1:0);
    }
    for (var i = 0; i < tempcatazone.length; i++) {
      tempcatazone[i].color = (i == idx ? 1 : 0);
    }
    this.setData({allcata : tempcata, catazone:tempcatazone});
    for (var i = 0; i < allitems.length; i++) {
      if(allitems[i].type == cata){
        cataitems.push(allitems[i]);
      }
    }
    this.setData({ allItems: cataitems });
    this.freshItem();
    this.freshTotal();
  },
  resetCata: function () {
    var tempcata = this.data.allcata;
    var tempcatazone = this.data.catazone;
    for (var i = 0; i < tempcata.length; i++) {
      tempcata[i].color = 0;
    }
    for (var i = 0; i < tempcatazone.length; i++) {
      tempcatazone[i].color = 0;
    }
    this.setData({ allcata: tempcata , catazone:tempcatazone});
    var itemsback = this.data.itemsBack;
    this.setData({ allItems: itemsback });
    this.freshItem();
    this.freshTotal();
  },
  freshItem: function () {
    var range = this.data.range;
    var tempitems = this.data.allItems.slice(-range * 2);
    this.setData({ items: tempitems });
    var tempposup = tempitems[0].id - 1;
    var tempposdown = tempitems[tempitems.length - 1].id - 1;
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
        title: 'huge money',
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
    tempinum = tempinum.substring(0, tempinum.length - 1);
    if (tempinum == '') {
      tempinum = '0';
      this.setData({ inputnum: tempinum });
      return;
    }
    this.setData({ inputnum: tempinum });
  },
  clearNumber: function () {
    if (!this.data.tapNew) return;
    this.setData({ inputnum: '0', inputdot: false });
  },
  confirmNumber: function () {
    var price = this.data.inputnum;
    if (parseFloat(price) == 0) {
      wx.showToast({
        title: 'no money',
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
      year: this.data.year.toString(),
      month: this.data.month.toString(),
      day: this.data.day.toString()
    }
    tempitems.push(tempitem);
    tempallitems.push(tempitem);
    backitems.push(tempitem);
    this.setData({ allItems: tempallitems, items: tempitems, itemsBack:backitems, inputnum: '0', toView: '', posDown: tempposdown });
    this.setData({ toView: 'newitem' });
    this.freshTotal();
  },
  pmTap: function () {
    if (!this.data.tapNew) return;
    var inum = this.data.inputnum;
    var tempnum;
    if (inum.indexOf('-') < 0) {
      tempnum = '-' + inum;
    } else {
      tempnum = inum.slice(1);
    }
    this.setData({ inputnum: tempnum });
  },
  typeSelect: function () {
    this.loadCata();
    this.setData({ catagory: true });
  },
  leaveCata: function () {
    this.setData({ catagory: false });
  },
  toOrigin: function () {
    var tempfuncs = [
      { label: '日期跳转', method: 'toDate' },
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
          // var posdown = that.data.posDown;
          // var range = that.data.range;
          // var pos = parseInt(posdown - (range * 2 - index));
          var tempallitems = that.data.allItems;
          var tempitems = that.data.items;
          var backitems = that.data.itemsBack;
          tempallitems = that.deleteOne(tempallitems, id);
          tempitems = that.deleteOne(tempitems, id);
          backitems = that.deleteOne(backitems, id);
          //tempallitems.splice(pos, 1);
          //tempitems.splice(index, 1);
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
  totalIn: function (year) {
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
    console.log('posUp:' + this.data.posUp);
    var pos = this.data.posUp;
    if (pos == 0) return;
    var itemlength = this.data.allItems.length;
    if (itemlength < 19) {
      this.lessItem();
      return;
    }
    this.setData({ loadup: true });
    var range = this.data.range;
    var posup, posdown;
    if (pos - range < 0) {
      posup = 0;
    } else {
      posup = pos - range;
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
  },
  lower: function (event) {
    if (this.data.loaddown) return;
    console.log('posUp:' + this.data.posUp + 'posDown:' + this.data.posDown);
    var itemlength = this.data.allItems.length;
    if (itemlength < 19) {
      this.lessItem();
      return;
    }
    this.setData({ loaddown: true });
    var pos = this.data.posDown;
    var range = this.data.range;
    var posup, posdown;
    var length = this.data.allItems.length;
    if (pos + range > length) {
      posdown = length;
    } else {
      posdown = pos + range;
    }
    posup = posdown - range * 2;
    var tempitems = this.data.allItems.slice(posup, posdown);
    this.setData({ items: tempitems, posUp: posup, posDown: posdown });
    setTimeout(function () {
      this.setData({ loaddown: false });
    }.bind(this), 1000);
  },
})
