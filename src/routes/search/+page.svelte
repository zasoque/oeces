<script lang="ts">
	import Sentence from '$lib/Sentence.svelte';

	const { data } = $props();
	const { results, q } = $derived(data);
</script>

<div class="yellow">{q}에 대한 검색 결과</div>
{#each results as result}
	<Sentence sentence={result} />
{/each}

<style>
	.yellow {
		background: #ffd;
		margin-bottom: 8px;
		border-top: 1px solid black;
	}
</style>
