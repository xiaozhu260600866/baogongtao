<template>
	<view v-if="shareDiv">
		<!-- <view style="margin: 20px"><button type="primary" @tap="shareFc()">文字海报</button></view> -->
		<!-- 生成海报 -->
		<div class="" v-if="shareBtn == true">
			<!-- <div class="share-overlay"></div> -->
			<div class="pshare-dig">
				<div class="pshare-group">
					<button hover-class="none" class="group-item p0" open-type="share">
						<p class="iconfont icon-pshare-wechat"></p>
						<p class="words">发给好友</p>
					</button>
					<div class="group-item" @tap="shareFc()">
						<p class="iconfont icon-pshare-save"></p>
						<p class="words">生成二维码海报</p>
					</div>
				</div>
				<div class="cancel-btn" @click="shareBtn = false">取消</div>
			</div>
		</div>
		<QSPopup ref="popup">
			<view class="flex_column">
				<view class="backgroundColor-white">
					<image :src="posterImage || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button  class="plr30" type="primary" size="medium" @tap.prevent.stop="saveImage()">保存图片</button>
					<!-- <button class="plr15" type="info" size="medium" @tap.prevent.stop="shareDiv = false">关闭</button> -->
				</view>
			</view>
		</QSPopup>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" id="default_PosterCanvasId2" canvas-id="default_PosterCanvasId2"
				:style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import QSPopup from '@/components/js_sdk/QS-popup.vue';
	import _app from '@/components/js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/components/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';
	export default {
		props: ["data", "posterFilePath", "qrcodeFilePath", "dis"],
		components: { 
			QSPopup
		},
		data() {
			return {
				shareBtn: false,
				shareDiv: true,
				getSiteName: this.getSiteName(),
				poster: {},
				posterImage: '',
				canvasId: 'default_PosterCanvasId2',
				count: 0,
				bgImg: 'https://456.doxinsoft.com/upload/images/product/K3c3VqDnU2.jpg'
			}
		},
		methods: {
			async shareFc() {
				console.log("posterFilePath",this.posterFilePath)
				let _this = this;
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					console.log(996999,_this.canvasId);
					console.log("二维码",_this.qrcodeFilePath);
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						canvasType: '2d',
						type: 'testShareType',
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						background: {
							height: 700,
							width: 700,
							backgroundColor: '#fff',
						},
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray: ({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) => {
							console.log(9999, bgObj.width * 0.3)
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([{
								type: 'text',
								id: 'position',
								text: '招聘：'+_this.data.job_position,
								color: '#000',
								fontWeight: 'bold',
								serialNum: 1, //序号
								allInfoCallback({drawArray}) {
									const content = drawArray.find(item => item.id === 'content')
									let width;
									let height;
									const contentW = getBgObj().width*0.9;
									const size = getBgObj().width * 0.04;
									const contentNum = Math.ceil(content.textLength*2.27/contentW);
									const contentH = getBgObj().width * 0.07*(contentNum+2);
									console.log(8955566336,content.textLength*2.27,contentNum,contentW,getBgObj().width,contentH,)
									setBgObj({
										width: getBgObj().width,
										height: getBgObj().height + contentH
									});
									return {
										size: getBgObj().width * 0.044,
										dx: getBgObj().width * .04,
										dy: getBgObj().width*0.08,
									}
								},
							},{
								type: 'text',
								id: 'companyName',
								text:'公司名称：'+_this.data.get_company.name,
								color: '#333',
								serialNum: 2, //序号 
								allInfoCallback({drawArray}) {
									return {
										size: getBgObj().width * 0.04,
										dx: getBgObj().width * .04,
										dy: getBgObj().width*0.15,
										lineFeed:{
											maxWidth:getBgObj().width*0.6,
											lineHeight:getBgObj().width * 0.06,
										}
									}
								}
							},
							{
								type: 'text',
								id: 'salary',
								text:'薪酬：'+ _this.data.salary,
								color: '#333',
								serialNum: 3, //序号
								allInfoCallback({drawArray}) {
									const companyName = drawArray.find(item => item.id === 'companyName')
									const companyNameW = getBgObj().width*0.58;
									const companyNameNum = Math.ceil(companyName.textLength/companyNameW);
									const companyNameH = getBgObj().width * 0.058*companyNameNum;
									console.log(59666955699,companyName.textLength,companyNameNum,companyNameW,getBgObj().width*0.04,companyNameH,companyName.size)
									let cNameH = companyNameH
									return {
										size: getBgObj().width * 0.04,
										dx: getBgObj().width * .04,
										dy: getBgObj().width*0.15+cNameH,
									}
								}
							},
							{
								type: 'text',
								id: 'education',
								text:'学历：'+ _this.data.education,
								color: '#333',
								serialNum: 4, //序号
								allInfoCallback({drawArray}) {
									const companyName = drawArray.find(item => item.id === 'companyName')
									const companyNameW = getBgObj().width*0.58;
									const companyNameNum = Math.ceil(companyName.textLength/companyNameW);
									const companyNameH = getBgObj().width * 0.058*companyNameNum;
									console.log(59666955699,companyName.textLength,companyNameNum,companyNameW,getBgObj().width*0.04,companyNameH,companyName.size)
									let cNameH = companyNameH
									return {
										size: getBgObj().width * 0.04,
										dx: getBgObj().width * .04,
										dy: getBgObj().width*0.21+cNameH,
									}
								}
							},
							{
								type: 'text',
								id: 'experience',
								text: '工作经验：'+_this.data.experience,
								color: '#333',
								serialNum: 5, //序号
								allInfoCallback({drawArray}) {
									const companyName = drawArray.find(item => item.id === 'companyName')
									const companyNameW = getBgObj().width*0.58;
									const companyNameNum = Math.ceil(companyName.textLength/companyNameW);
									const companyNameH = getBgObj().width * 0.058*companyNameNum;
									console.log(59666955699,companyName.textLength,companyNameNum,companyNameW,getBgObj().width*0.04,companyNameH,companyName.size)
									let cNameH = companyNameH
									return {
										size: getBgObj().width * 0.04,
										dx: getBgObj().width * .04,
										dy: getBgObj().width*0.27+cNameH,
									}
								}
							},
							{
								type: 'text',
								id: 'contactName',
								text:this.dis ?'联系人：'+ _this.dis.name :'联系人：'+ _this.data.contact_name,
								color: '#333',
								serialNum: 6, //序号
								allInfoCallback({drawArray}) {
									const companyName = drawArray.find(item => item.id === 'companyName')
									const companyNameW = getBgObj().width*0.58;
									const companyNameNum = Math.ceil(companyName.textLength/companyNameW);
									const companyNameH = getBgObj().width * 0.058*companyNameNum;
									console.log(59666955699,companyName.textLength,companyNameNum,companyNameW,getBgObj().width*0.04,companyNameH,companyName.size)
									let cNameH = companyNameH
									return {
										size: getBgObj().width * 0.04,
										dx: getBgObj().width * .04,
										dy: getBgObj().width*0.33+cNameH,
									}
								}
							},{
								type: 'text',
								id: 'contactPhone',
								text:this.dis ?'联系电话：'+ _this.dis.phone :'联系电话：'+ _this.data.contact_phone,
								color: '#333',
								serialNum: 7, //序号
								allInfoCallback({drawArray}) {
									const companyName = drawArray.find(item => item.id === 'companyName')
									const companyNameW = getBgObj().width*0.58
									const companyNameNum = Math.ceil(companyName.textLength/companyNameW);
									const companyNameH = getBgObj().width * 0.058*companyNameNum;
									let cNameH = companyNameH
									return {
										size: getBgObj().width * 0.04,
										dx: getBgObj().width * .04,
										dy: getBgObj().width*0.39+cNameH,
									}
								}
							},
							{
								type: 'image',
								url: _this.qrcodeFilePath,
								id:'qrocode',
								serialNum: 8, //序号
								allInfoCallback({drawArray}) {
									return {
										dx: getBgObj().width - getBgObj().width * 0.29,
										dy: getBgObj().width*0.04,
									}
								},
								infoCallBack(imageInfo) {
									return {
										dWidth: getBgObj().width * 0.24,
										dHeight: getBgObj().width * 0.24,
									}
								}
							},{
								type: 'text',
								id: 'tipsOne',
								text: '长按识别二维码',
								color: '#888',
								serialNum: 9, //序号
								allInfoCallback({drawArray}) {
									return {
										size: getBgObj().width * 0.028,
										dx: getBgObj().width - getBgObj().width * 0.265,
										dy: getBgObj().width * 0.31,
									}
								}
							},{
								type: 'text',
								id: 'tipsTwo',
								text: '查看详情',
								color: '#888',
								serialNum: 10, //序号
								allInfoCallback({drawArray}) {
									return {
										size: getBgObj().width * 0.028,
										dx: getBgObj().width - getBgObj().width * 0.225,
										dy: getBgObj().width * 0.35,
									}
								}
							},{
								type: 'text',
								id: 'content',
								text: _this.data.job_remark,
								color: '#333',
								serialNum: 11, //序号
								allInfoCallback({drawArray}) {
									const companyName = drawArray.find(item => item.id === 'companyName')
									const companyNameW = getBgObj().width*0.58
									const companyNameNum = Math.ceil(companyName.textLength/companyNameW);
									const companyNameH = getBgObj().width * 0.058*companyNameNum;
									let cNameH = companyNameH
									return {
										size: getBgObj().width * 0.04,
										dx: getBgObj().width * .04,
										dy: getBgObj().width * 0.52+cNameH,
										lineFeed:{
											maxWidth:getBgObj().width*0.9,
											lineHeight:getBgObj().width * 0.07,
										}
									}
								}
							}]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							_this.poster = bgObj;
						}
					});
					// uni.canvasToTempFilePath({
					// 	canvasId: this.canvasId,
					// 	success: res => {
					// 		this.posterImage = res.tempFilePath;
					// 		_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + res.tempFilePath);
					// 		this.$refs.popup.show()
					// 		this.shareBtn = false;
					// 	},
					// 	fail: err => {
					// 		console.log('生成异常', err)
					// 	}
					// })
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.posterImage = d.poster.tempFilePath;
					this.$refs.popup.show();
					this.shareBtn = false;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
				
			},
			offCanvas(){
				this.$refs.popup.hide()
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath:this.posterImage,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '',this.posterImage, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.$refs.popup.hide()
			}
		}
	}
</script>

<style>
	.hideCanvasView {position: relative;}
	.hideCanvas {position: fixed;top: -99999upx;left: -99999upx;z-index: -99999;}
	.flex_row_c_c {display: flex;flex-direction: row;justify-content: center;align-items: center;}
	.modalView {width: 100%;height: 100%;position: fixed;top: 0;left: 0;right: 0;bottom: 0;opacity: 0;outline: 0;transform: scale(1.2);perspective: 2500upx;background: rgba(0, 0, 0, 0.6);transition: all .3s ease-in-out;pointer-events: none;backface-visibility: hidden;z-index: 999;}
	.modalView.show {opacity: 1;transform: scale(1);pointer-events: auto;}
	.flex_column {display: flex;flex-direction: column;}
	.backgroundColor-white {background-color: white;}
	.border_radius_10px {border-radius: 10px;}
	.padding1vh {padding: 1vh;}
	.posterImage {width: 86vw;}
	.flex_row {display: flex;flex-direction: row;}
	.marginTop2vh {margin-top: 2vh;}
	
	
	/* 分享按钮组 */
	.pshare-dig {position: fixed;width: 100%;background: #fff;left: 0;bottom: 0;z-index: 100;border-radius: 30px 30px 0 0;box-shadow: 0 0 10px 0 hsl(0deg 6% 58% / 60%);}
	.pshare-dig .pshare-group {background: #F3F3F5;display: flex;padding: 40px 10%;border-radius: 30px 30px 0 0;}
	.pshare-group .group-item {width: 100%;text-align: center;background: transparent;}
	.pshare-group .group-item .iconfont {font-size: 50px;line-height: 60px;}
	.pshare-group .group-item .words {font-size: 14px;color: #666;padding-top: 10px;line-height: 20px;}
	.pshare-dig .cancel-btn {height: 50px;line-height: 50px;color: #666;text-align: center;font-size: 15px;}
	.poster {display: flex;align-items: center;justify-content: center;}
</style>
