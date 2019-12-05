### 微信小程序翻牌抽奖效果及处理逻辑
写了一个翻牌的小程序代码，现在开源给大家，数据接口需要自己去写，这里只实现了前端部分

在真实环境中只需要改写以下函数就可以使用

```
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
}

```

#### 项目演示

<img width="400" src="http://lucky-other.meiweiyuxian.com/github/flop-demo.gif"/>

#### 项目地址

https://github.com/iamdarcy/flop-minicode
