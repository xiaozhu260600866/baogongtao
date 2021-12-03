<template>
	<view>
		<page ref="page"></page>
		<view class="pb65" v-if="data.show">
			<view class="bg-f edit" v-if="step == 1">
				<view class="fs-12 pt15 pb5 plr15">人才，与你的距离只差一个职位</view>
				<weui-input v-model="ruleform.job_type" label="招聘类型" type="select" name="job_type" dataKey="jobTypeArr"
					changeField="label" datatype="require" block></weui-input>
				<weui-input v-model="ruleform.job_category" label="职位类型" name="job_category" type="manyselect"
					dataKey="positionCalss" splitWord="/" changeField="label" datatype="require" block></weui-input>
				<weui-input v-model="ruleform.job_position" label="职位名称" type="text" name="job_position"
					datatype="require" block ></weui-input>
				<weui-input v-model="ruleform.salary" label="薪资范围" placeholder="请选择合理的薪资范围" name="salary"
					changeField="label" type="manyselect" dataKey="emolumentArr" datatype="require" block splitWord="-"></weui-input>
				<view @click="goto('/pages/merchant/recruit/created_edit/layouts/label?tags='+ruleform.job_tab,1)">
					<weui-input v-model="ruleform.job_tab" label="职位标签(福利待遇)" type="emptySelect" name="job_tab" datatype="require"
						block placeholder="请用英文','分隔标签"></weui-input>
				</view>	
					
				<weui-input v-model="ruleform.job_remark" myclass="textarea" label="职位描述" type="textarea"
					name="job_remark" datatype="require" block></weui-input>

				<dxftButton type="primary" size="lg" @click="submit(1)">下一步</dxftButton>
			</view>
			<view class="bg-f edit" v-if="step == 2">
				<weui-input v-model="ruleform.experience" label="工作经验" type="select" name="experience"
					dataKey="experienceArr" changeField="label" datatype="require" block></weui-input>
				<weui-input v-model="ruleform.education" label="最低学历" placeholder="请选择学历" type="select" name="education"
					dataKey="educationArr" changeField="label" datatype="require" block></weui-input>

				<weui-input v-model="ruleform.age" label="年龄要求" name="age" type="manyselect" dataKey="ageArr"
					changeField="value" block splitWord="-"></weui-input>
				<dx-address v-model="ruleform.job_showArea" labeltxt="职位展示区域" datatype="require" ref="address" :addressHidden="true"
					 block :emptyValue="true" v-if="!ruleform.id"></dx-address>
				
				<view class="fs-12 fc-9 plr15">职位会在选择展示地区生效并展示~</view>


				<weui-input v-model="ruleform.work_place" label="工作地址" type="location" name="work_place"
					navClass="main-bg fc-white" datatype="require" block @callback="locationRes"></weui-input>


				<weui-input v-model="ruleform.contact_name" label="联系人姓名" type="text" name="contact_name"
					datatype="require" block></weui-input>
				<weui-input v-model="ruleform.contact_phone" label="联系号码" type="number" name="contact_phone"
					datatype="require" block></weui-input>
				<!-- <weui-input v-model="ruleform.work_place" label="工作区域" type="text" name="work_place" datatype="require"></weui-input>
				<weui-input v-model="ruleform.salary_date" label="发薪日期" type="text" name="salary_date"></weui-input>
				
				<weui-input v-model="ruleform.home_date" label="休假情况" placeholder="如：周末双休、月休四天等" type="text" name="home_date" datatype="require"></weui-input>
				<weui-input v-model="ruleform.work_hour" myclass="textarea" label="工时费" placeholder="工序+工时费(小时/天算)" type="textarea" name="work_hour"></weui-input>
				<weui-input v-model="ruleform.need" myclass="textarea" label="要求" placeholder="如：年龄要求，性别要求等" type="textarea" name="need"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.live" myclass="textarea" label="吃住情况" placeholder="如：包吃住或有补贴" type="textarea" name="live"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.interview" myclass="textarea" label="面试准备" placeholder="面试需要提供什么材料" type="textarea" name="interview"
				 datatype="require"></weui-input> -->
				<dxftButton type="primary" size="lg" @click="submit(2)">提交</dxftButton>
			</view>
			<view v-if="step == 3">
				<dx-results txt="职位发布成功" @click="goto('/pages/merchant/recruit/created_edit/lists',2)"></dx-results>
			</view>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import dxResults from "doxinui/components/results/results"
	import {
		attributes
	} from "@/api/base";
	import {
		userinfo,
		action,
		logout
	} from "@/api/user";
	export default {
		components: {
			dxftButton,
			dxResults
		},
		data() {
			return {
				vaildate: {},
				formAction: '/api/company/recruit-store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					age: '',
					job_showArea:'',
					job_tab:''
				},
				
				step: 1,
				positionCalss: [],
				remark_pic_company: [],
				experienceArr: [],
				educationArr: [],
				emolumentArr: [],
				ageArr: [],
				jobTypeArr: [{
						value: 1,
						label: '社招全职'
					},
					{
						value: 2,
						label: '社招兼职'
					},
					{
						value: 3,
						label: '校招全职'
					},
					{
						value: 4,
						label: '校招兼职'
					},
				],
				jobShowAreaArr: [{
						value: 1,
						label: '普通职位'
					},
					{
						value: 2,
						label: '跨区职位'
					},
				],
				needArr: [{
					label: '服务类',
					value: '服务类',
					children: [{
						label: '工商财税法律',
						value: '工商财税法律'
					}, ]
				}, {
					label: '产品类',
					value: '产品类',
					children: [{
						label: '电子电工',
						value: '7'
					}, ]
				}],
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
		onShow(){
			if(uni.getStorageSync('tags')){
				this.ruleform.job_tab = uni.getStorageSync('tags');
				uni.removeStorageSync("tags");
			}
		},
		onLoad(options) {
			let ageTemp = [];
			for (let i = 17; i < 60; i++) {
				let ageChildren = [];
				ageChildren.push({
					label: '不限',
					value: '不限',
			 });
				for (let j = i + 1; j < 60; j++) {
					ageChildren.push({
						label: j + '岁',
						value: j + '岁',
					});
				}
				if (i == 17) ageTemp.push({
					label: '不限',
					value: '不限',
					children: ageChildren
				});
				else ageTemp.push({
					label: i + '岁',
					value: i + '岁',
			  children: ageChildren
				});
			}
			this.ageArr = ageTemp;
			attributes({
				type: 10,
				source: 'app'
			}).then(res => {
				this.positionCalss = res.data.lists;
			})
			attributes({
				type: 11,
				source: 'app'
			}).then(res => {
				this.experienceArr = res.data.lists;
			})
			attributes({
				type: 12,
				source: 'app'
			}).then(res => {
				this.emolumentArr = res.data.lists;
			})
			attributes({
				type: 13,
				source: 'app'
			}).then(res => {
				this.educationArr = res.data.lists;
			})
			userinfo({
				token: uni.getStorageSync('token')
			}).then((res) => {
				//this.ruleform.work_place = res.data.company.address;
			})
			if (options.id) {
				this.ajax();
			}
			//this.getError("aaaqq")
			//this.ajax();
		},
		methods: {
			locationRes(res){
				console.log("aaa");
				this.$set(this.ruleform,"location_x",res.latitude);
				this.$set(this.ruleform,"location_y",res.longitude);
			},
			ajax() {
				this.getAjax(this, {
					token: uni.getStorageSync('token')
				}).then(msg => {
					this.ruleform = msg.data.data;
				});
			},
			submit(step) {
				
				this.ruleform.token = uni.getStorageSync('token');
				this.ruleform.company_id = uni.getStorageSync("sysCompany").id;
				this.vaildForm(this, res => {
					if (res) {
						if(step == 1){
							this.step =2;
						}else{
							this.postAjax(this.formAction, this.ruleform).then(msg => {
								if (msg.data.code == 0) {
									this.step  = 3;
								}
							});
						}
						
					}

				})
			},
		}
	}
</script>
<style lang="scss">
	page {
		background: $color-white;
	}

	@import "index.scss";
</style>
