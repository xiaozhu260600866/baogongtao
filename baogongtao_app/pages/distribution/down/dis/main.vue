<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
			<section v-if="data.show">
				<div id="scroller">
					<div class="order-classify bgf mb8">
						<p :class="['nav-tab',lev == 0 ? 'selected' :'']" @click="changeLev(0)">一级</p>
						<p :class="['nav-tab',lev == 1 ? 'selected' :'']" @click="changeLev(1)">二级</p>
					</div>
					<div class="team-header fs-12 fc-9 plr15 ptb3">
						<p>成员信息</p>
						<p>TA的佣金/成员</p>
					</div>
					<div class="order-list mb8 bgf" v-for="item in data.lists">
						<div class="tInfo flex plr15 ptb10">
							<div class="limg pr10">
								<image class="img" :src="item.heder_img" />
							</div>
							<div class="rInfo flex1">
								<div class="group fs-15">
									<p>{{item.name}}</p>
									<p>收益：
										<span class="Arial fc-red">{{item.amount}}</span>
									</p>
								</div>
								<div class="group fs-12 fc-9">
									<p class="Arial">{{item.created_at}}</p>
									<p><span class="Arial">{{item.member}}</span>个成员</p>
								</div>
							</div>
						</div>
						<div class="infob plr15 ptb10 bd-te flex-right">
							<p class="dx-btn fs-12 fc-9" @click="goto('/pages/distribution/down/client/main?id='+item.id,1)">客户</p>
							<p class="dx-btn fs-12 fc-9" @click="goto('/pages/distribution/down/dis/main?id='+item.id,1)">下级</p>
						</div>
					</div>
				</div>
		
				<hasMore :parentData="data" source="nodata"></hasMore>
			
			</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/api/dis/team',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lev:0,
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
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this,{lev:this.lev,token:uni.getStorageSync('token')}).then(msg => {
					console.log(this.data);
				});
			},
			changeLev: function(lev) {
				this.lev = lev;
				this.ajax();
			},
		}
	}
</script>
