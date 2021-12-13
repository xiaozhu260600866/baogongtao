<template>
	<view>
		<page ref="page"></page>
		<view class="pb30">
			<view class="talents-info">
				<view class="head">
					<image class="img" :src="avatarUrl?avatarUrl:'https://www.baogongtao.com/images/user.png'"></image>
					<view class="sex">
						<view class="item man" v-if="ruleform.sex == 1"><text class="iconfont icon-man"></text></view>
						<view class="item women" v-if="ruleform.sex == 2"><text class="iconfont icon-women"></text></view>
					</view>
				</view>
				<view class="info">
					<view class="name">{{ruleform.name}}</view>
					<!-- <text class="dxi-icon dxi-icon-edit ml5" @click="goto('/pages/user/talents/resume',1)"></text> -->
					<view class="tag flex-wrap">
						<view class="item">{{ruleform.experience?ruleform.experience:'经验不限'}}</view>
						<view class="item">{{ruleform.birthday?ruleform.birthday:'暂无'}}</view>
						<view class="item">{{ruleform.education?ruleform.education:'暂无'}}</view>
					</view>
				</view>
				<view class="edit" @click="goto('/pages/user/talents/resume',1)">
					<dx-button type="primary" size="mini" myclass="plr10" icon="dxi-icon dxi-icon-edit2">编辑</dx-button>
					</view>
			</view>
			<view class="talents-item">
				<view class="item-name">求职意向</view>
				<view class="item-con">
					<view class="fs-16 fw-bold">
						<text v-if="ruleform.industry">{{ruleform.industry}}</text>
						<text class="pl10" v-if="ruleform.salary">{{ruleform.salary}}</text>
					</view>
					<view class="fs-15 fc-6 mt5">
						<text v-if="ruleform.address">{{ruleform.address}}</text>
						<text class="pl10" v-if="ruleform.position">{{ruleform.position}}</text>
					</view>
					<view v-if="!ruleform.industry && !ruleform.salary && !ruleform.address && !ruleform.position">暂无</view>
				</view>
				<!-- <view class="item-edit" @click="goto('/pages/user/talents/resume',1)"><text class="dxi-icon dxi-icon-edit2"></text></view> -->
			</view>
			<view class="talents-item">
				<view class="item-name">求职状态</view>
				<view class="item-con">
					<view v-if="ruleform.apply_status">{{ruleform.apply_status}}</view>
					<view v-else>暂无</view>
				</view>
			</view>
			<view class="talents-item">
				<view class="item-name">薪资要求</view>
				<view class="item-con">
					<view v-if="ruleform.salary">{{ruleform.salary}}</view>
					<view v-else>暂无</view>
				</view>
			</view>
			<view class="talents-item">
				<view class="item-name">个人职业标签</view>
				<view class="item-con">
					<view v-if="ruleform.tags">
						<view v-if="ruleform.tags.split(',').length">
							<dx-tag myclass="mr10 mb10" hollow v-for="item in ruleform.tags.split(',')">{{item}}</dx-tag>
						</view>
					</view>
					<view v-else>暂无</view>
				</view>
				<view class="item-edit" @click="goto('/pages/user/talents/layouts/label',1)"><text class="dxi-icon dxi-icon-add-circle"></text></view>
			</view>
			<view class="talents-item">
				<view class="item-name">个人简介</view>
				<view class="item-con">
					<view v-if="ruleform.remark">{{ruleform.remark}}</view>
					<view v-else>暂无</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
import {userinfo} from "@/api/user";
import {attributes } from "@/api/base";
import avatar from "@/components/yq-avatar/yq-avatar.vue";
import dxTag from "doxinui/components/tag/tag"
export default {
	components: {dxftButton,avatar,dxTag},
		data() {
			return {
				sysUser: uni.getStorageSync('sysUser'),
				vaildate: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				step: 1,
				avatarUrl:'',
				ruleform:{
					sex: 1,
					status: 1,
				},
				sexsArr: [
					{label: '男',value: 1},
					{label: '女',value: 2}
				],
				statusArr: [
					{label: '职场人',value: 1},
					{label: '学生',value: 2}
				],
				industryData:[],
				applyStatusArr:[
					{label:'离职-随时到岗',value: '离职-随时到岗'},
					{label:'在职-月内到岗',value: '在职-月内到岗'},
					{label:'在职-考虑机会',value: '在职-考虑机会'},
					{label:'在职-暂不考虑',value: '在职-暂不考虑'},
				],
				educationArr:[
					{label:'初中及以下',value: '初中及以下'},
					{label:'中专/中技',value: '中专/中技'},
					{label:'高中',value: '高中'},
					{label:'大专',value: '大专'},
					{label:'本科',value: '本科'},
					{label:'硕士',value: '硕士'},
					{label:'博士',value: '博士'},
				],
				emolumentArr:[
					{label:'不限',value: '不限'},
					{label:'1-3k',value: '1-3k'},
					{label:'3-6k',value: '3-6k'},
					{label:'6-8k',value: '6-8k'},
					{label:'8-10k',value: '8-10k'},
					{label:'10-15k',value: '10-15k'},
					{label:'15-20k',value: '15-20k'},
					{label:'20-30k',value: '20-30k'},
					{label:'面议',value: '面议'},
				],
				positionData:[
					{label:'技术员',value: '技术员'},
					{label:'文员',value: '文员'},
					{label:'机械工程师',value: '机械工程师'},
					{label:'行政管理',value: '行政管理'},
				],
				profession_tag:['前端开发','人事经理','文员'],
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			attributes({type:9,source:'app'}).then(res => {
				this.industryData = res.data.lists;
			})
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.ruleform = res.data.user.get_user_info;
				if(!this.ruleform.avatarUrl){
					this.avatarUrl = res.data.user.get_wechat_user ? res.data.user.get_wechat_user.avatarUrl : 'https://www.baogongtao.com/images/user.png';	
				}else{
					this.avatarUrl = this.ruleform.avatarUrl
				}
					
			})
			//this.ajax();
		},
		methods: {
			uploadAvatar(){
				this.$refs.avatar.fChooseImg(0,{
					selWidth: "300upx", selHeight: "300upx",
					expWidth: '260upx', expHeight: '260upx',
					canRotate: 'false'
				});
			},
			avatarUploaded(rsp) {
				//console.log(rsp)
				
				uni.uploadFile({
					url: this.$store.state.apiInterfaceUrl + '/base/upload',
					filePath: rsp.path,
					name: 'file',
					formData: {pathname:'user/' + this.sysUser.user_id,type:'image'},
					success: (uploadFileRes) => {
						let dataObj = JSON.parse(uploadFileRes.data);
						console.log(dataObj);
						if(dataObj.code!=0){
							return this.msgError(dataObj.msg);
						}
						this.ruleform.avatar = dataObj.data.fileName;
						this.avatarUrl = rsp.path; //更新头像方式一
						//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
					}
				});
			},
			submit(step){
				this.ruleform.token = uni.getStorageSync('token');
				this.vaildForm(this, res => {	
					if(res){
						if(step ==2){
							this.postAjax("/api/auth/user/update", this.ruleform).then(msg => {
								if (msg.data.code == 0) {
									return this.goto("/pages/user/index/index",2);
								}
							});
						}else{
							this.step =2;
						}
						
					}
					
				})
			},
		}
	}
</script>
<style lang="scss">
page{background-color: #fff;}
@import "index.scss";
</style>