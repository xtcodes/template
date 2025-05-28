<script>
	export let name;
</script>

<main>
	<div id="loading">Memuat...</div>
        <div class="alert">
        <h1>Selamat {name}!</h1>
        <p style="padding-top:10px;color:#000;">Ini adalah situs web tempat Anda dapat menambahkan foto ke bingkai.</p>
        <a href="#" class="close_btn"><i class="bi bi-x-square-fill"></i></a>
        </div>
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
