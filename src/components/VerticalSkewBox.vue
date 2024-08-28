<template>
	<div class="vsb-parent">
		<div class="vsb-top" ref="vsbTop">
			<div style="position: fixed; z-index: -50">
				<Matrix :height="matrixHeight" :width="width" />
			</div>
			<div>
				<slot name="top"></slot>
			</div>
			<div class="vsb-middle"></div>
		</div>
		<div class="vsb-bottom">
			<div class="container">
				<slot name="bottom"></slot>
			</div>
		</div>
	</div>
</template>

<script>
import Matrix from "./Matrix.vue";
export default {
	components: {
		Matrix,
	},
	props: {
		height: {
			type: Number,
			default: 100,
		},
		width: {
			type: Number,
			default: 500,
		},
		bottomColor: {
			type: String,
			default: "#005f9f",
		},
	},
	data() {
		return {
			matrixHeight: 0,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.calculateMatrixHeight();
		});
	},
	updated() {
		this.$nextTick(() => {
			this.calculateMatrixHeight();
		});
	},
	methods: {
		calculateMatrixHeight() {
			const vsbTopHeight = this.$refs.vsbTop.clientHeight;
			this.matrixHeight = vsbTopHeight - 1;
		},
	},
};
</script>

<style>
.vsb-parent {
	--vsb-divider-height: 80px;
	--vsb-divider-height-num: 80;
	display: flex;
	flex-direction: column;
	width: 100vw;
}

.vsb-top {
	min-height: calc(100px + var(--vsb-divider-height));
	display: flex;
	flex-direction: column;
	height: fit-content;
}

.vsb-middle {
	min-height: 100px;
	overflow: auto;
	background-color: #00000000;
	background-image: -webkit-linear-gradient(
		calc(atan(calc(v-bind(width) / var(--vsb-divider-height-num)))),
		v-bind(bottomColor) 50%,
		var(--red) 50%,
		var(--red) 52%,
		#00000000 52%
	);
	margin-top: auto;
	margin-bottom: -1px;
	width: 100vw;
}

.vsb-bottom {
	min-height: 100px;
	background-color: v-bind(bottomColor);
	padding-top: 5px;
}
</style>