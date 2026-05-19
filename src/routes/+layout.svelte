<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<style>
		body {
			font-familiy:
				-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		}
	</style>
</svelte:head>

<div class="container">
	<header>
		<h1>OECES</h1>
		<p>Online Encyclopedia of Constructed language Example Sentences</p>
		<form method="get" action="/search">
			<input type="text" name="q" />
			<button type="submit">Search</button>
		</form>
	</header>
	{@render children()}
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
	}

	header {
		text-align: center;
		margin-bottom: 16px;
	}
</style>
