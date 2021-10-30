<template>
	<view class="cl-message__wrap">
		<view
			v-for="(item, index) in list"
			:key="index"
			:class="[
				'cl-message',
				{
					'is-show': item.visible,
				},
			]"
			:style="{
				top: item.visible ? item.top : '-200rpx',
			}"
		>
			<icon
				class="cl-message__icon"
				:type="item.type"
				:size="item.iconSize"
				v-if="item.type"
			/>
			<slot>
				<text class="cl-message__content">{{ item.message }}</text>
			</slot>
		</view>
	</view>
</template>

<script>

let id = 0;

export default {
	data() {
		return {
			list: [],
		};
	},

	methods: {
		open(d) {
			let options = {
				id: id++,
				visible: false,
				closed: false,
				message: "",
				type: "success",
				duration: 3000,
				onClose: null,
				iconSize: 22,
				top: "120rpx",
			};

			if (this.isObject(d)) {
				Object.assign(options, d);
			} else {
				options.message = d;
			}

			this.list.push(options);

			setTimeout(() => {
				this.create(options);
			}, 50);
		},

		close(item) {
			item.visible = false;
			item.closed = true;

			if (this.isFunction(item.onClose)) {
				item.onClose(this);
			}
		},

		create(item) {
			const { duration } = item || {};

			if (duration > 0) {
				item.visible = true;
				setTimeout(() => {
					this.close(item);
				}, duration);
			}
		},
	},
};
</script>

<style lang="scss">
.cl-message__wrap {
	.cl-message {
		display: flex;
		align-items: center;
		min-width: auto;
		box-sizing: border-box;
		border-radius: 8rpx;
		position: fixed;
		left: 50%;
		top: -200rpx;
		transform: translateX(-50%);
		overflow: hidden;
		padding: 16rpx 40rpx 16rpx 30rpx;
		background-color: #fff;
		border: 1rpx solid #eee;
		z-index: 3030;
		opacity: 0;
		transition: all 0.4s ease-in-out;

		&.is-show {
			opacity: 1;
		}

		&__icon {
			margin-right: 20rpx;
		}

		&__content {
			padding: 0;
			font-size: 26rpx;
			line-height: 30upx;
			color: #666;
		}
	}
}

</style>