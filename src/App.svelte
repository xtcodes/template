<script>
	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		width: 600px; 
                margin: 5em auto; 
                padding: 2em;
	}

	@media (max-width: 700px) {
		main {
			margin: auto;
                        width: auto;
		}
	}
</style>
