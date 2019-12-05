//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        carWidth: '', //卡片宽度
        cardData: [],
        // 以下数据应该从服务器获取，本实例为了方便将数据存在本地
        moreData: [{
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false, // 控制翻转
                opacity: false, // 控制翻转过来以后的 opacity
                disabled: false, // disabled 属性，控制手速点击过快，导致多个牌被翻开, 默认为false 可以点击
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
        ],
        fourData: [{
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false, // 控制翻转
                opacity: false, // 控制翻转过来以后的 opacity
                disabled: false, // disabled 属性，控制手速点击过快，导致多个牌被翻开, 默认为false 可以点击
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            }
        ],
        twoData: [{
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false, // 控制翻转
                opacity: false, // 控制翻转过来以后的 opacity
                disabled: false, // disabled 属性，控制手速点击过快，导致多个牌被翻开, 默认为false 可以点击
            },
            {
                animationData: {},
                front: '/images/icon/front-img.png',
                back: '/images/icon/no-bingo-back.png',
                showClass: false,
                opacity: false,
                disabled: false,
            },
        ],
        oneFlopStatus: 0,
        twoFlopStatus: 0,
        threeFlopStatus: 0,
        fourFlopStatus: 0,
        opening: 0,
        number: 4,
        canOpen: 0,
        myMoney: 0,
        showDialog: 0,
        isBingo: 1,
        money: 0,
        bingoIndex: 0,
    },
    reset: function() {
        this.setData({
            oneFlopStatus: 0,
            twoFlopStatus: 0,
            threeFlopStatus: 0,
            fourFlopStatus: 0,
            number: 4,
            opening: 0
        })
        wx.setStorageSync('oneFlopStatus', 0)
        wx.setStorageSync('twoFlopStatus', 0)
        wx.setStorageSync('threeFlopStatus', 0)
        wx.setStorageSync('fourFlopStatus', 0)
    },
    startFlop: function(e) {
        let opening = this.data.opening;
        if (opening == 1) {
            wx.showToast({
                title: '宝箱正在开箱中',
                icon: 'none'
            })
            return false;
        }
        let btn = e.currentTarget.dataset.btn;
        console.log(btn)
        let cardData = [];
        if (btn == 1) {
            let oneFlopStatus = wx.getStorageSync('oneFlopStatus');
            if (oneFlopStatus == 0) {
                this.setData({
                    oneFlopStatus: 1,
                })
            }
            cardData = this.data.twoData;
        }
        if (btn == 2) {
            let twoFlopStatus = wx.getStorageSync('twoFlopStatus');
            if (twoFlopStatus == 0) {
                this.setData({
                    twoFlopStatus: 1,
                })
            }
            cardData = this.data.fourData;
        }
        if (btn == 3) {
            let threeFlopStatus = wx.getStorageSync('threeFlopStatus');
            if (threeFlopStatus == 0) {
                this.setData({
                    threeFlopStatus: 1,
                })
            }
            cardData = this.data.fourData;
        }
        if (btn == 4) {
            let fourFlopStatus = wx.getStorageSync('fourFlopStatus');
            if (fourFlopStatus == 0) {
                this.setData({
                    fourFlopStatus: 1,
                })
            }
            cardData = this.data.moreData;
        }
        this.addPosition(cardData); // 数组添加移动坐标位置
        this.setData({
            opening: 1,
            canOpen: 0,
            cardData: cardData,
        })
        this.allMove();
    },
    onLoad() {
        let carWidth = 0;
        wx.getSystemInfo({
            success(res) {
                carWidth = parseInt((res.windowWidth - 40) / 3);
            }
        })
        this.setData({
            carWidth: carWidth,
        })
        wx.setStorageSync('oneFlopStatus', 0)
        wx.setStorageSync('twoFlopStatus', 0)
        wx.setStorageSync('threeFlopStatus', 0)
        wx.setStorageSync('fourFlopStatus', 0)
    },
    // 数组添加移动坐标值 并且把所有的disabled 状态还原会false 
    addPosition(cardData) {
        let length = cardData.length;
        let lineTotals = 0;
        if (length > 4) {
            lineTotals = 3;
        } else {
            lineTotals = 2;
        }
        const lineTotal = lineTotals // 单行数
        cardData.map((item, index) => {
            let x = index % lineTotal
            let y = parseInt(index / lineTotal)
            item.twoArry = {
                x,
                y
            }
            item.disabled = false;
        })
        this.setData({
            cardData,
        })
    },
    //全部翻转
    allChange() {
        let cardData = this.data.cardData;
        cardData.map(item => {
            if (!item.showClass) {
                item.showClass = true;
            }
        })
        this.setData({
            cardData
        })
    },
    //洗牌
    allMove() {
        let cardData = this.data.cardData;
        let carWidth = this.data.carWidth;
        this.shuffle(carWidth);
        let timer = setTimeout(() => {
            this.addPosition(cardData)
            clearTimeout(timer)
            this.shuffle(0) // 间隔1秒钟，移动到原来位置
            this.setData({
                canOpen: 1,
            })
        }, 1000)
    },
    // 洗牌函数
    shuffle(translateUnit) {
        let cardData = this.data.cardData;
        cardData.map((item, index) => {
            let animation = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease'
            })
            animation.export()
            const translateUnitX = translateUnit * (1 - item.twoArry.x)
            const translateUnitY = translateUnit * (1 - item.twoArry.y)
            animation.translate(translateUnitX, translateUnitY).step()
            item.animationData = animation.export()
            item.opacity = false;
            if (item.showClass) {
                item.showClass = false;
            }
        })
        this.setData({
            cardData
        })
    },
    // // 打乱数组顺序
    // randomsort(a, b) {
    //     return Math.random() > .5 ? -1 : 1;
    //     //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    // },
    // 以下的函数用户从服务器得到用户的中奖情况，
    getRealData: function(index, length) {
        let cardData = this.data.cardData;
        // 去服务器查询，返回
        let res = {
            bIndex:1, // 服务器返回的中奖索引。
            money:0.4 // 服务器返回的中奖金额。
        }
        // 以上数据由服务器返回
        let bIndex = res.bIndex;
        cardData[bIndex].money = res.money;
        cardData[bIndex].back = '/images/icon/bingo-back.png',
            cardData[bIndex].bingoIndex = bIndex;
        return {
            cardData: cardData,
            bingoIndex: bIndex
        }
    },
    handleCurClick(event) {
        let index = event.currentTarget.dataset.index;
        let disabled = event.currentTarget.dataset.disabled;
        //如果为true 就返回不继续向下执行
        if (disabled) {
            return;
        }
        let length = this.data.cardData.length;
        let res = this.getRealData(index, length); // 这里就是从服务器取过来的数据。
        let cardData = res.cardData;
        let bingoIndex = res.bingoIndex;
        let number = this.data.number;
        let carWidth = this.data.carWidth;
        let money = '';
        cardData[index].showClass = true;
        for (const item in cardData) {
            if (item != index) {
                cardData[item].opacity = true;
            }
            if (cardData[item].bingoIndex == item) {
                this.setData({
                    money: cardData[item].money
                })
            }
            cardData[item].disabled = true;
        }
        number--;
        this.setData({
            cardData,
            number,
            bingoIndex: bingoIndex
        })
        setTimeout(() => {
            this.allChange()
        }, 1000);
        let _this = this;
        setTimeout(() => {
            if (index == bingoIndex) {
                this.setData({
                    isBingo: 1,
                    showDialog: 1
                })
            } else {
                this.setData({
                    isBingo: 0,
                    showDialog: 1
                })
            }
        }, 2200);
    },
    flopOver: function() {
        this.setData({
            opening: 0,
            showDialog: 0,
            isBingo: 0,
        })
    },
    getMoney: function() {
        let money = this.data.money;
        let myMoney = this.data.myMoney;
        let allMoney = Number(money) + Number(myMoney);
        this.setData({
            myMoney: allMoney,
            opening: 0,
            showDialog: 0,
            isBingo: 0,
        })
    }
})