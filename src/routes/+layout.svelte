<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
	let { me, discordRedirectUri } = $derived(data);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<style>
		input {
			width: 100%;
			margin: 4px 0 8px 0;
		}
	</style>
	<title>The Online Encyclopedia of Constructed language Example Sentences (OECES)</title>
</svelte:head>

<div class="container">
	<header>
		<a href="/">
			<img src="/board.svg" alt="OECES Logo" class="board" />
		</a>
		<form method="get" action="/search">
			<input type="text" name="q" />
			<button type="submit">Search</button>
		</form>
	</header>
	{@render children()}
	<footer>
		<p>
			{#if me}
				{me.username}으로 로그인되어있음.
				<a href="/logout">Logout</a>
				<a href="/new">New Sentence</a>
			{:else}
				<a
					href="https://discord.com/oauth2/authorize?client_id=1506229078687223950&response_type=code&redirect_uri={encodeURIComponent(
						discordRedirectUri
					)}&scope=identify"
				>
					Login
				</a>
			{/if}
		</p>
	</footer>
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

	.board {
		max-width: 600px;
	}

	footer {
		margin-top: 32px;
	}
</style>
