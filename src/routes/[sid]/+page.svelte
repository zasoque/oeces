<script>
	import Sentence from '$lib/Sentence.svelte';

	const { data } = $props();
	const { sentence } = $derived(data);
</script>

<Sentence {sentence} />
