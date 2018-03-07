//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    winHeight: 0,
    inputnum: '0',
    range: 10,
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
    day: new Date().getDate(),
    lastyearout: 0,
    lastyearin: 0,
    thisyearout: 0,
    thisyearin: 0,
    toView: '',
    hidenew: 'none',
    hidedelete: 'none',
    tapNew: false,
    posUp: 0,
    posDown: 0,
    loadup: false,
    loaddown: false,
    numzone:['1','2','3','4','5','6','7','8','9','+/-','0','.'],
    allItems: [
      { id: 1, type: '交通', price: '1.50', year: '2017', month: '2', day: '17' },
      { id: 2, type: '衣服', price: '-2.88', year: '2017', month: '2', day: '17' },
      { id: 3, type: '交通', price: '3.20', year: '2018', month: '2', day: '17' },
      { id: 4, type: '吃饭', price: '4.00', year: '2018', month: '2', day: '17' },
      { id: 5, type: '交通', price: '5.50', year: '2018', month:'2', day: '18' },
      { id: 6, type: '交通', price: '6.50', year: '2018', month:'2', day: '18' },
      { id: 7, type: '交通', price: '7.50', year: '2018', month:'2', day: '18' },
      { id: 8, type: '吃饭', price: '8.20', year: '2018', month:'2', day: '18' },
      { id: 9, type: '交通', price: '9.50', year: '2018', month:'2', day: '18' },
      { id: 10, type: '衣服', price: '10.88', year: '2018', month:'2', day: '19' },
      { id: 11, type: '交通', price: '11.20', year: '2018', month:'2', day: '19' },
      { id: 12, type: '吃饭', price: '12.00', year: '2018', month:'2', day: '19' },
      { id: 13, type: '交通', price: '13.50', year: '2018', month:'2', day: '19' },
      { id: 14, type: '交通', price: '14.50', year: '2018', month:'2', day: '19' },
      { id: 15, type: '交通', price: '15.50', year: '2018', month:'2', day: '20' },
      { id: 16, type: '吃饭', price: '16.20', year: '2018', month:'2', day: '20' },
      { id: 17, type: '交通', price: '17.50', year: '2018', month:'2', day: '20' },
      { id: 18, type: '交通', price: '18.50', year: '2018', month:'2', day: '20' },
      { id: 19, type: '交通', price: '19.50', year: '2018', month:'2', day: '20' },
      { id: 20, type: '吃饭', price: '20.20', year: '2018', month:'2', day: '20' },
      { id: 21, type: '交通', price: '2111111.50', year: '2018', month: '2', day: '17' },
      { id: 22, type: '衣服', price: '22222.88', year: '2018', month: '2', day: '17' },
      { id: 23, type: '交通', price: '23.20', year: '2018', month:'2', day: '17' },
      { id: 24, type: '吃饭', price: '24.00', year: '2018', month:'2', day: '17' },
      { id: 25, type: '交通', price: '25.50', year: '2018', month:'2', day: '18' },
      { id: 26, type: '交通', price: '26.50', year: '2018', month:'2', day: '18' },
      { id: 27, type: '交通', price: '27.50', year: '2018', month:'2', day: '18' },
      { id: 28, type: '吃饭', price: '28.20', year: '2018', month:'2', day: '18' },
      { id: 29, type: '交通', price: '29.50', year: '2018', month:'2', day: '18' },
      { id: 30, type: '衣服', price: '30.88', year: '2018', month:'2', day: '19' },
      { id: 31, type: '交通', price: '31.20', year: '2018', month:'2', day: '19' },
      { id: 32, type: '吃饭', price: '32.00', year: '2018', month:'2', day: '19' },
      { id: 33, type: '交通', price: '33.50', year: '2018', month:'2', day: '19' },
      { id: 34, type: '交通', price: '34.50', year: '2018', month:'2', day: '19' },
      { id: 35, type: '交通', price: '35.50', year: '2018', month:'2', day: '20' },
      { id: 36, type: '吃饭', price: '36.20', year: '2018', month:'2', day: '20' },
      { id: 37, type: '交通', price: '37.50', year: '2018', month:'2', day: '20' },
      { id: 38, type: '交通', price: '38.50', year: '2018', month:'2', day: '20' },
      { id: 39, type: '交通', price: '39.50', year: '2018', month:'2', day: '20' },
      { id: 40, type: '吃饭', price: '40.20', year: '2018', month:'2', day: '20' },
    ],
    items: [],
    funcs:[
      {label:'日期跳转', method:'toDate'},
      {label:'分类筛选', method:'typeSelect'},
      {label:'新增', method:'newItem'},
      {label:'删除', method:'deleteItem'}
    ]
  },
  numTap: function (event) {
    if(!this.data.tapNew) return;
    var curnum = event.currentTarget.dataset.num;
    if(curnum == '+/-') {
      this.pmTap();
      return;
    }
    var inum = this.data.inputnum;
    var havem = inum.indexOf('-') >= 0;
    var havedot = inum.indexOf('.') >= 0;
    var tempnum;
    this.setData({ toView: '' });
    this.setData({ toView: 'newitem' });
    if(havem) {
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
      tempnum = '-'+tempnum;
    }
    this.setData({ inputnum: tempnum });
  },
  redoNumber: function () {
    if (!this.data.tapNew) return;
    var tempinum = this.data.inputnum;
    tempinum = tempinum.substring(0, tempinum.length - 1);
    if (tempinum == '') {
      tempinum = '0';
      this.setData({inputnum:tempinum});
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
    this.setData({ allItems: tempallitems, items: tempitems, inputnum: '0', toView: '', posDown: tempposdown });
    this.setData({ toView: 'newitem' });
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
  toOrigin: function() {
    var tempfuncs = [
      { label: '日期跳转', method: 'toDate' },
      { label: '分类筛选', method: 'typeSelect' },
      { label: '新增', method: 'newItem' },
      { label: '删除', method: 'deleteItem' }
    ];
    this.setData({ funcs: tempfuncs });
    var tapNewflag = this.data.tapNew;
    if(tapNewflag){
      this.setData({ tapNew: false, hidenew: 'none' });
    }
    this.setData({ hidedelete: 'none' });
  },
  newItem: function() {
    var tempitems = this.data.allItems.slice(-20);
    this.setData({ items: tempitems });
    var tempposup = tempitems[0].id - 1;
    var tempposdown = tempitems[tempitems.length - 1].id-1;
    var tempfuncs = [
      { label: '确认', method: 'confirmNumber' },
      { label: '←', method: 'redoNumber' },
      { label: '清空', method: 'clearNumber' },
      { label: '返回', method: 'toOrigin' }
    ];
    this.setData({ posUp: tempposup, posDown: tempposdown });
    this.setData({ tapNew: true,hidenew:'flex',hidedelete:'none'});
    this.setData({ toView: 'newitem'});
    this.setData({ funcs: tempfuncs});
  },
  deleteItem: function() {
    this.setData({ hidedelete: 'flex' });
    var tempfuncs = this.data.funcs;
    tempfuncs[3] = {label: '返回', method: 'toOrigin'};
    this.setData({ funcs: tempfuncs });
  },
  deleteTap: function(event) {
    var index = event.currentTarget.dataset.idx;
    var posdown = this.data.posDown;
    var range = this.data.range;
    var pos = parseInt(posdown - (range * 2 - index));
    //console.log(this.data.allItems[pos]);
    var tempallitems = this.data.allItems;
    var tempitems = this.data.items;
    tempallitems.splice(pos,1);
    tempitems.splice(index,1);
    this.setData({allItems:tempallitems,items:tempitems});
  },
  onLoad: function () {
    var res = wx.getSystemInfoSync();
    var contentHeight = res.windowHeight;
    this.setData({ winHeight: contentHeight });
    var tempitems = this.data.allItems.slice(-20);
    this.setData({ items: tempitems});
    var tempposup = tempitems[0].id - 1;
    var tempposdown = tempitems[tempitems.length - 1].id - 1;
    var range = this.data.range;
    this.setData({ posUp: tempposup, posDown: tempposdown });
    console.log('posUp:' + this.data.posUp + ',posDown:' + this.data.posDown);
    this.setData({toView:'id'+parseInt(range*2-1)});
    this.freshTotal(this.data.year);
  },
  freshTotal: function (year){
    var totallastyearout = this.totalYearOut(year - 1);
    var totalthisyearout = this.totalYearOut(year);
    var totallastyearin = Math.abs(this.totalYearIn(year - 1));
    var totalthisyearin = Math.abs(this.totalYearIn(year));
    this.setData({lastyearout:totallastyearout,lastyearin:totallastyearin,thisyearout:totalthisyearout,thisyearin:totalthisyearin});
  },
  totalYearOut: function (year) {
    var total = 0;
    var tempitems = this.data.allItems;
    var length = tempitems.length;
    for (var i = 0; i < length; i++) {
      if (tempitems[i].year != year) continue;
      if (parseFloat(tempitems[i].price)>0) {
        total = parseFloat(total) + parseFloat(tempitems[i].price);
      }
    }
    return total.toFixed(2);
  }, 
  totalYearIn: function (year) {
    var total = 0;
    var tempitems = this.data.allItems;
    var length = tempitems.length;
    for (var i = 0; i < length; i++) {
      if (tempitems[i].year != year) continue;
      if (parseFloat(tempitems[i].price) < 0) {
        total = parseFloat(total) + parseFloat(tempitems[i].price);
      }
    }
    return total.toFixed(2);
  },
  upper: function () {
    if (this.data.loadup) return;
    console.log('posUp:' + this.data.posUp);
    var pos = this.data.posUp;
    if(pos == 0) return;
    var itemlength = this.data.allItems.length;
    if(itemlength<19) {
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
    }.bind(this), 1500);
  },
  lessItem: function () {
    var allitems = this.data.allItems;
    var length = this.data.allItems.length;
    this.setData({posUp: 0,posDown: length,items:allitems});
  },
  lower: function (event) {
    if (this.data.loaddown) return;
    console.log('posUp:' + this.data.posUp+'posDown:' + this.data.posDown);
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
    }.bind(this), 1500);
  },
})
