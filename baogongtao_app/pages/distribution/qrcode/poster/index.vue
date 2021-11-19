<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="show">
			<img :src="posterFilePath" hidden @load="imageLoad" data-index="0" :style="'width: '+images[0].width+'px; height: '+images[0].height+'px;'">
			<div style="opacity: 0;">
				<canvas :style="'width: '+width+'px; height: '+height+'px;left:-1300px'" canvas-id="firstCanvas" v-if="!tempFilePath"></canvas>
			</div>
			<image :src="tempFilePath" v-if="tempFilePath"  @load="imageLoad2" :style="'width: '+images2[0].width+'px; height: '+images2[0].height+'px;'" @click="open(tempFilePath)"></image> 
			<view id="footer-btn" v-if="tempFilePath">
				<button class="f-dx-btn dx-btn-orange fs16" type="default" @click='savePhoto'>
					<text class="iconfont icon-count-plus fs18 pr5"></text><span class="fs16">点击保存图片</span>
				</button>
			</view>
			
		</div>
	</view>
</template>

<script>
	import "./index.css";
	const ctx = uni.createCanvasContext('firstCanvas')
	export default {
		data() {
			return {
				formAction: '/shop/product/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				height:0,
				width:0,
				show:false,
				canShow:false,
				tempFilePath:'',
				posterFilePath:'',
				qrcodeFilePath:'',
				web_logo:'',
				getSiteName: this.getSiteName(),
				images: [],
				images2:[],
				dis:{},
				product:{},
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		
		onLoad(options) {
			uni.getSystemInfo({
				success:res=> {
					this.width = res.windowWidth
					this.height = res.windowHeight
				   //this.height = res.screenHeight;
				}
			});

		

			this.data.show = true;
			this.ajax();
		},
		methods: {
			savePhoto(){
				wx.saveImageToPhotosAlbum({
					filePath:this.tempFilePath,
					success:res=>{
						this.getSuccess("保存成功");
					}
					
				})
			},
			imageLoad2(e){
				var $width = e.detail.width, //获取图片真实宽度
					$height = e.detail.height,
					ratio = $width / $height; //图片的真实宽高比例
				var viewWidth = this.width, //如:375 i6屏宽
					viewHeight = this.width / ratio; //计算的高度值
				var image = [];
				//将图片的datadata-index作为image对象的key,然后存储图片的宽高值
				image[0] = {
					width: viewWidth,
					height: viewHeight
				}
				console.log(image);
				console.log(124);
				this.images2 = image;	
			},
			imageLoad(e) {
				var $width = e.detail.width, //获取图片真实宽度
					$height = e.detail.height,
					ratio = $width / $height; //图片的真实宽高比例
				var viewWidth = this.width, //如:375 i6屏宽
					viewHeight = this.width / ratio; //计算的高度值
				var image = [];
				//将图片的datadata-index作为image对象的key,然后存储图片的宽高值
				image[e.target.dataset.index] = {
					width: viewWidth,
					height: viewHeight
				}
				console.log(image);
				this.images = image;
				
				//广告图
				ctx.drawImage(this.posterFilePath, 0, 0, this.width, this.images[0].height)
				
				this.height = this.images[0].height + 120 ;
				//脚部背景
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, this.images[0].height, this.width, 120)
				
				//二维码
				ctx.drawImage(this.qrcodeFilePath, 10, this.images[0].height+10, 100, 100)
				
				//商家名称
				ctx.setFontSize(20)
				ctx.setFillStyle('#F17E2A')
				if(this.data.product.takeMerchant){
					ctx.fillText(this.data.product.takeMerchant.userInfo.company_name, 120, this.images[0].height+42)
				}else{
					ctx.fillText('456商家', 120, this.images[0].height+42)
				}
				
				//长按扫码抢优惠
				ctx.setFontSize(13)
				ctx.setFillStyle('#333')
				ctx.fillText('长按扫码抢优惠', 120, this.images[0].height+66)
				
				//商家入驻
				ctx.setFontSize(12)
				ctx.setFillStyle('#999')
				ctx.fillText('商家入驻:0750-3336666', 120,  this.images[0].height+88)
				
				// 经销商名称
				ctx.setFontSize(12)
				ctx.setFillStyle('#999')
				let nameWidth = this.data.dis.name.length*12;
				//ctx.fillText(this.data.dis.name, this.width - nameWidth - 10, this.images[0].height+110)

				ctx.draw();
					setTimeout(()=>{
						uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',
						success:res=> {
							console.log(res);
							this.tempFilePath = res.tempFilePath;
							this.open(this.tempFilePath);
						},
						fail:res=>{
							console.log(res);
						}
					})
				},200)
			},
			open(url){
				uni.previewImage({
					current: url, // 当前显示图片的http链接
					urls: [url] // 需要预览的图片http链接列表
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/product/'+msg.product.poster_cover,
						success:res=>{
							this.posterFilePath = res.tempFilePath;
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/dis/'+msg.dis.id+'_'+msg.product.id+'.jpg',
						success:res=>{
							this.qrcodeFilePath = res.tempFilePath;
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/product/'+msg.siteConfig.web_logo,
						success:res=>{
							this.show = true;
							this.web_logo = res.tempFilePath;
						}
					});
				});
			}
		}
	}
</script>
