<script>
	export let name;
</script>

        <div id="loading">Memuat...</div>
        <div class="alert">
        <h1>Selamat {name}!</h1>
        <p style="padding-top:10px;color:#000;">Ini adalah situs web tempat Anda dapat menambahkan foto ke bingkai.</p>
        <a href="#" class="close_btn"><i class="bi bi-x-square-fill"></i></a>
        </div>

<main>
	<h1>Editor Twibbon</h1>
        <p><canvas id="canvas" width="1024" height="1024"></canvas></p>
        <p>
        <input type="file" id="upload" accept="image/*" />
        <button class="file-label" id="btnUploadUser"><i class="bi bi-camera"></i></button>
        <input type="file" id="uploadTwibbon" accept="image/*" />
        <button class="twibbon-label" onclick="selectTwibbon()"><i class="bi bi-layers"></i></button>
        <button class="btn" id="download"><i class="bi bi-download"></i></button>
        <button class="btn" id="share"><i class="bi bi-share"></i> Bagikan</button>
        </p>
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
