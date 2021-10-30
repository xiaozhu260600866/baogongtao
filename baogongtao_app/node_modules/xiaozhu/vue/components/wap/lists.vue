<template>
	<section>
		<wv-group v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="xiaozhuLoading">
			<slot name="content" />
			<div class="tips1 mt10 hasMore text-center" v-if="!data.show">
				<div class="weui-loadmore">
					<i class="weui-loading"></i>
					<i class="weui-loadmore__tips fs12 font_grey">正在加载</i>
				</div>
			</div>
			<div class="tips1 mt10 hasMore text-center" v-if="data.show && data.lists.data && data.lists.data.length == 0">
				<i class="weui-loadmore__tips fs12 font_grey">没有更多了...</i>
			</div>
			<div class="tips1 mt10 hasMore text-center" v-if="data.show && data.lists && data.lists.length == 0">
				<i class="weui-loadmore__tips fs12 font_grey">没有更多了...</i>
			</div>
			<!-- 下拉加载 -->
			<div class="tips1 mt10 hasMore text-center" v-if="data.hasMore">
				<div class="weui-loadmore">
					<i class="weui-loading"></i>
					<i class="weui-loadmore__tips fs12 font_grey">正在加载</i>
				</div>
			</div>
			<div class="tips1 mt10 hasMore text-center" v-else-if="!data.hasMore && data.thisPage>1">
				<i class="weui-loadmore__tips fs12 font_grey">没有更多了...</i>
			</div>
		</wv-group>
	</section>
</template>
<script type="text/javascript">
export default {
	props: ["data", "otherData"],
	methods: {
		loadMore() {
			var thisFormAction = localStorage.getItem("formAction");
			if (this.data.canLoadMore && this.data.hasMore && thisFormAction == this.$parent.formAction) {
				this.data.nextPage += 1;
				this.$parent.ajax();
			}
		}
	}
}

</script>
<style type="text/css">
.xiaozhuLoading .weui-cells:before{
	border-top: 0!important;
}
.xiaozhuLoading .weui-cells:after{
	border-bottom: 0!important;
}
</style>