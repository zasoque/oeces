<script lang="ts">
	const { sentence } = $props();
</script>

<div class="sentence">
	<div class="sentence-header">
		<div class="sentence-id"><a href="/{sentence.id}">S{sentence.id}</a></div>
		<div class="sentence-content">{sentence.content}</div>
	</div>
	<div class="row">
		<div class="row-title">제목</div>
		<div class="row-content">{sentence.title}</div>
	</div>
	<div class="row">
		<div class="row-title">언어</div>
		<div class="row-content">{sentence.language}</div>
	</div>
	{#if sentence.source}
		<div class="row">
			<div class="row-title">출처</div>
			<div class="row-content">{sentence.source}</div>
		</div>
	{/if}
	{#if sentence.notes}
		<div class="row">
			<div class="row-title">참고</div>
			<div class="row-content">{sentence.notes}</div>
		</div>
	{/if}
	<div class="row">
		<div class="row-title">저자</div>
		<div class="row-content">{sentence.username}</div>
	</div>
	<div class="row">
		<div class="row-title">날짜</div>
		<div class="row-content">{new Date(sentence.created_at).toLocaleString()}</div>
	</div>
</div>

<style>
	.sentence {
		border-top: 1px solid black;
		display: flex;
		flex-direction: column;
	}

	.sentence-header {
		display: flex;
		background-color: #eeeeff;
	}

	.sentence-id {
		width: 100px;
	}

	.row {
		padding-left: 16px;
		display: flex;
	}

	.row-title {
		font-weight: bold;
		width: 100px;
	}

	.row-content {
		flex: 1;
		padding-left: 16px;
		text-indent: -16px;
	}
</style>
