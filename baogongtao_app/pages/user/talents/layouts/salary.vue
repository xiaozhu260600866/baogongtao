<template>
	<view>
		<page ref="page"></page>
		<view class="pb70 resume">
			<weui-input v-model="ruleform.salary" label="薪资要求" name="salary" changeField="value" type="manyselect" dataKey="emolumentArr"
			 block splitWord="-"></weui-input>
			<dxftButton type="primary" size="lg" @click="submit(2)">提交</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import {mapState, mapMutations, mapActions} from 'vuex'
	import {loginSentMsg, login, userinfo} from "@/api/user";
	import {attributes} from "@/api/base";
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			dxftButton,
			avatar
		},
		data() {
			return {
				sysUser: uni.getStorageSync('sysUser'),
				vaildate: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				step: 1,
				avatarUrl: '',
				ruleform: {
					sex: 1,
					status: 1,
					avatar:''
				},
				experienceYear: [],
				sexsArr: [
					{label: '男',value: 1},
					{label: '女',value: 2}
				],
				statusArr: [
					{label: '职场人',value: 1},
					{label: '学生',value: 2}
				],
				industryData: [],
				applyStatusArr: [
					{label: '离职-随时到岗',value: '离职-随时到岗'},
					{label: '在职-月内到岗',value: '在职-月内到岗'},
					{label: '在职-考虑机会',value: '在职-考虑机会'},
					{label: '在职-暂不考虑',value: '在职-暂不考虑'},
				],
				educationArr: [],
				emolumentArr: [],
				positionData: []
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
			
			attributes({
				type: 9,
				source: 'app'
			}).then(res => {
				this.industryData = res.data.lists;
			})
			attributes({type:13,source:'app'}).then(res => {
				this.educationArr = res.data.lists;
			})
			attributes({type:12,source:'app'}).then(res => {
				this.emolumentArr = res.data.lists;
			})
			attributes({type:10,source:'app'}).then(res => {
				this.positionData = res.data.lists;
			})
			attributes({type:11,source:'app'}).then(res => {
				this.experienceYear = res.data.lists;
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
				...mapMutations(['login','setUserInfo','setStaffInfo']),
			getPhoneNumber(e) {
				this.getAuthPhoneNumber(e, msg => {
					this.ruleform.phone = msg.data.phoneNumber;
				}, () => {

				});
			},
			uploadAvatar() {
				this.$refs.avatar.fChooseImg(0, {
					selWidth: "300upx",
					selHeight: "300upx",
					expWidth: '260upx',
					expHeight: '260upx',
					canRotate: 'false'
				});
			},
			avatarUploaded(rsp) {
				//console.log(rsp)

				uni.uploadFile({
					url: this.$store.state.apiInterfaceUrl + '/base/upload',
					filePath: rsp.path,
					name: 'file',
					formData: {
						pathname: 'user',
						type: 'image'
					},
					success: (uploadFileRes) => {
						let dataObj = JSON.parse(uploadFileRes.data);
						console.log(dataObj);
						if (dataObj.code != 0) {
							return this.msgError(dataObj.msg);
						}
						this.ruleform.avatarUrl = dataObj.data.filePath;
						this.avatarUrl = rsp.path; //更新头像方式一
						//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
					}
				});
			},
			submit(step) {
				this.ruleform.token = uni.getStorageSync('token');
				if(uni.getStorageSync('distribution')){
					this.ruleform.distribution = uni.getStorageSync('distribution')
				}
				this.vaildForm(this, res => {
					if (res) {
						if (step == 2) {
							this.postAjax("/api/auth/user/update", this.ruleform).then(msg => {
								if (msg.data.code == 0) {
								 return this.goto("/pages/user/talents/show",1);
								}
						    });
							
						} else {
							this.step = 2;
						}
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	page{background: #fff;}
	@import "../index.scss";
</style>
