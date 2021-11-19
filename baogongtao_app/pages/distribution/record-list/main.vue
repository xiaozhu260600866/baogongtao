<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="scroller">
				<div class="dis-record-list plr15 ptb10 mb8 bg-f" v-for="item in data.lists.data">
					<div class="group fs-15 flex-between">
						<p class="fs-15">提现</p>
						<p class="fs-15 Arial">-{{item.amount}}</p>
					</div>
					<div class="group fc-9 flex-between">
						<p class="fs-12 Arial">{{item.created_at}}</p>
						<p class="fs-12">{{item.getStatus}}</p>
					</div>
				</div>
			</div>
			<hasMore :parentData="data" source="nodata" message="暂无提现记录"></hasMore>

		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/dis/come-out-infos',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
