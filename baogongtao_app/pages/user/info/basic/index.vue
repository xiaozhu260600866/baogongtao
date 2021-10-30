<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="p10 fc-9 fs-14">以下资料可更改</view>
			<view class="bg-f">
				<view :class="['weui-cell','weui-cell_input']">
					<view class="weui-cell__hd">
						<view class="weui-label fs14">头像</view>
					</view>
					<view class="weui-cell__bd text-right">
						<image :src="avatarUrl" mode="aspectFill" style="width: 30px;height: 30px;border-radius: 50%;" @click="uploadAvatar"></image>
						<view style="height: 1upx;overflow:hidden;"><avatar @upload="avatarUploaded" ref="avatar"></avatar></view>
					</view>
					<view class="weui-cell__ft">
						<text class="weui-cell__ft_in-access"></text>
					</view>
				</view>
				<weui-input v-model="liveName" label="现居" :placeholder="liveName" type="clickback" name="live_area" @clickBack="toggleTab('live')"></weui-input>
				<weui-input v-model="formData.height" label="身高" type="select" name="height" dataKey="heightArr" selectLabel="label" changeField="value" startKey="30"></weui-input>
			</view>

			<view class="p20">
				<form-submit :vaildate="false" @callBack="submit"></form-submit>
			</view>
			
			
			<view class="p10 fc-9 fs-14">以下为认证资料，不可更改</view>
			<view class="bg-f">
				<weui-input :value="sysUser.name" label="姓名" type="text" disabled></weui-input>
				<weui-input :value="sysUser.sexName" label="性别" type="text" disabled></weui-input>
				<weui-input :value="sysUser.birthday" label="出生年月" type="text" disabled></weui-input>
				<weui-input :value="sysUser.idcardno" label="身份证号码" type="text" disabled></weui-input>
			</view>
		</view>
		<w-picker mode="region" :value="liveValueCode" default-type="value" @confirm="pickerConfirm($event,'live')" ref="live" :timeout="true" themeColor="#34880b"></w-picker>
		<tui-loading :visible="submitLoading" text="提交中..."></tui-loading>
	</view>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {store as userStore} from "@/api/user";
import weuiInput from "@/components/tytrock/components/weui-input.vue";
import formSubmit from "@/components/tytrock/components/form-submit.vue";
import wPicker from "@/components/w-picker/w-picker.vue";
import avatar from "@/components/yq-avatar/yq-avatar.vue";
export default {
	components: {
		weuiInput,
		formSubmit,
		wPicker,
		avatar
	},
	data() {
		return {
			sysUser: uni.getStorageSync('sysUser'),
			liveName: '',
			liveValueCode: uni.getStorageSync('sysUser').live_pca_code?uni.getStorageSync('sysUser').live_pca_code.split(','):["440000","440700"],
			heightArr: [],
			formData:{
				live_province:uni.getStorageSync('sysUser').live_province?uni.getStorageSync('sysUser').live_province:'',
				live_city:uni.getStorageSync('sysUser').live_city?uni.getStorageSync('sysUser').live_city:'',
				live_area:uni.getStorageSync('sysUser').live_area?uni.getStorageSync('sysUser').live_area:'',
				live_code:uni.getStorageSync('sysUser').live_pca_code?uni.getStorageSync('sysUser').live_pca_code:'',
				height:uni.getStorageSync('sysUser').height?uni.getStorageSync('sysUser').height:'',
			},
			avatarUrl: uni.getStorageSync('sysUser').avatarUrl
		}
	},
	onLoad() {
		let heightTemp = [];
		for(let i=140;i<220;i++){
			heightTemp.push({label:i + 'cm',value:i});
		}
		this.heightArr = heightTemp;
	},
	onShow(){
		this.liveName = this.sysUser.live_area?this.sysUser.live_province + ' ' + this.sysUser.live_city + ' ' + this.sysUser.live_area:'请选择现居住地';
	},
	methods: {
		...mapMutations(['setUserInfo']),
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
					this.formData.avatar = dataObj.data.fileName;
					this.avatarUrl = rsp.path; //更新头像方式一
					//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
				}
			});
			
			
		},
		toggleTab(str){
			this.$refs[str].show();
		},
		pickerConfirm(res,type){
			console.log(res)
			if(type == 'live'){
				this.formData.live_province = res.obj.province.label;
				this.formData.live_city = res.obj.city.label;
				this.formData.live_area = res.obj.area.label;
				this.formData.live_code = res.value.join(',');
				this.liveName = res.obj.province.label + ' ' + res.obj.city.label + ' ' + res.obj.area.label;
				this.liveValueCode = res.value;
			}
		},
		submit: function(e) {
			this.submitLoading(this);
			userStore(this.formData).then((res)=>{
				let userInfo = {
					data: res.data.worker
				}
				this.setUserInfo(userInfo);
				this.submitLoading(this,false);
				this.tytMessage(this,'success',res.msg)
				setTimeout(()=>{uni.navigateBack()},1000)
			})
			
		}
	}
}
</script>

<style>
.tui-loading-center {
	width: 40upx;
	height: 40upx;
	border: 3px solid #fff;
	border-radius: 50%;
	margin: 0 6px;
	display: inline-block;
	vertical-align: middle;
	clip-path: polygon(0% 0%, 100% 0%, 100% 40%, 0% 40%);
	animation: rotate 1s linear infinite;
	margin-right: 20upx;
}
@-webkit-keyframes rotate {
	from {
		transform: rotatez(0deg);
	}

	to {
		transform: rotatez(360deg);
	}
}

@keyframes rotate {
	from {
		transform: rotatez(0deg);
	}

	to {
		transform: rotatez(360deg);
	}
}
</style>