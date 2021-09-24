// pages/canvas/canvas.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bg: 'http://101.200.174.220:9000/png/image1626762918099.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20210924%2F%2Fs3%2Faws4_request&X-Amz-Date=20210924T142957Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=22157bf85218b3115119eb125231b19a31d3009a178778aa3fa87fb8be1b89f3',
        locBg: '/image/bg.png', //本地地址
    },

    init(res) {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio; //像素比
        this.setData({
            dpr,
            ctx,
            canvas
        })
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr); //横纵坐标会被缩放

        let _this = this;
        // wx.downloadFile({
        //     url: this.data.bg, //仅为示例，并非真实的资源
        //     success(res) {
        //         if (res.statusCode === 200) {
        //             _this.setData({
        //                 locBg: res.tempFilePath
        //             })
        //             wx.hideLoading()
        //             _this.render(canvas, ctx, res.tempFilePath)
        //         }
        //     }
        // })
        _this.render(canvas, ctx, this.data.locBg)

    },

    render(canvas, ctx, imgFile) {
        // this.drawCard(ctx, img)
        let img = canvas.createImage(); //创建img对象
        //如果需要向canvas里载入多张图片，则需要分别创建多个img对象
        //let img2=this.data.canvas.createImage()；
        //    img2.οnlοad=()=>{};
        //    img2.src="";
        img.onload = () => {
            //img.complete表示图片是否加载完成，结果返回true和false;
            console.log(img.complete); //true
            ctx.drawImage(img, 0, 0, canvas._width, canvas._height, 0, 0, canvas._width, canvas._height);
            this.drawCard(canvas, ctx)
        };
        img.src = imgFile;
    },
    drawCard(canvas, ctx) {
        let {
            dpr
        } = this.data;
        ctx.font = 20; //设置字体的字号
        ctx.fillStyle = '#fff';
        ctx.font = '600 20px PingFangSC-Semibold, PingFang SC'
        ctx.fillText('送靈街', 20, 60); //在画布上绘制被填充的文本

        ctx.font = '400 12px PingFangSC-Regular, PingFang SC'
        ctx.fillText('MASK密室逃脱', 20, 74); //在画布上绘制被填充的文本

        ctx.font = '500 19px PublicSans-BlackItalic, PublicSans'
        ctx.fillText('69', 20, 204); //在画布上绘制被填充的文本
        ctx.font = '400 11px PingFangSC-Regular, PingFang SC'
        ctx.fillText('元/人', 47, 204); //在画布上绘制被填充的文本

        ctx.fillStyle = '#64F23C';
        ctx.font = '600 14px PingFangSC-Semibold, PingFang SC'
        ctx.fillText('7月2日(周五)17:00-18:30', 20, 106); //在画布上绘制被填充的文本

        ctx.font = '600 12px PingFangSC-Semibold, PingFang SC'
        ctx.fillText('需6人开/', 20, 122); //在画布上绘制被填充的文本
        ctx.font = '300 12px PingFangSC-Light, PingFang SC'
        ctx.fillText('现有2人/还可加入8人', 68, 122); //在画布上绘制被填充的文本

        ctx.fillStyle = '#9CA0A2';
        ctx.font = '500 14px PublicSans-BlackItalic, PublicSans'
        ctx.fillText('299', 20, 220); //在画布上绘制被填充的文本
        ctx.font = '400 11px PingFangSC-Regular, PingFang SC'
        ctx.fillText('元/人', 49, 220); //在画布上绘制被填充的文本

        ctx.moveTo(20, 215)
        ctx.lineTo(47, 215)
        ctx.strokeStyle = '#9CA0A2';
        ctx.stroke()

        ctx.moveTo(49, 216)
        ctx.lineTo(77, 216)
        ctx.strokeStyle = '#9CA0A2';
        ctx.stroke()

        this.drawBtn(ctx, 160, 184, 120, 36, 6)
        ctx.fillStyle = '#101013';
        ctx.font = '600 16px PingFangSC-Semibold, PingFang SC'
        ctx.fillText('加入拼场', 188, 206); //在画布上绘制被填充的文本
        console.log(ctx)
    },
    /**
     * @param {CanvasContext} ctx canvas上下文
     * @param {number} x 圆角矩形选区的左上角 x坐标
     * @param {number} y 圆角矩形选区的左上角 y坐标
     * @param {number} w 圆角矩形选区的宽度
     * @param {number} h 圆角矩形选区的高度
     * @param {number} r 圆角的半径
     */
    // 绘制圆角矩形
    drawBtn(ctx, x, y, w, h, r) {
        // 开始绘制
        ctx.beginPath()
        // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
        // 这里是使用 fill 还是 stroke都可以，二选一即可
        ctx.fillStyle = '#64F23C'
        ctx.strokeStyle = '#64F23C';
        // 左上角
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

        // border-top
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        ctx.lineTo(x + w, y + r)
        // 右上角
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

        // border-right
        ctx.lineTo(x + w, y + h - r)
        ctx.lineTo(x + w - r, y + h)
        // 右下角
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

        // border-bottom
        ctx.lineTo(x + r, y + h)
        ctx.lineTo(x, y + h - r)
        // 左下角
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

        // border-left
        ctx.lineTo(x, y + r)
        ctx.lineTo(x + r, y)

        // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        // 剪切
        ctx.clip()
    },
    // 保存图片
    save() {
        let {
            ctx,
            dpr,
            canvas
        } = this.data;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: ctx.width,
            height: ctx.height,
            destWidth: ctx.width * dpr,
            destHeight: ctx.height * dpr,
            canvasId: 'myCanvas',
            canvas: canvas,
            success(res) {
                console.log(res.tempFilePath)
                wx.showShareImageMenu({
                    path: res.tempFilePath
                })
            },
            fail(err) {
                console.log(err)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const query = wx.createSelectorQuery()
        query.select('#myCanvas')
            .fields({
                node: true,
                size: true
            })
            .exec(this.init.bind(this))
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})