<form method="post" action="/apinew">
	<div>
		<label for="sentence">문장</label>
		<input type="text" name="sentence" id="sentence" required />
	</div>
	<div>
		<label for="title">제목</label>
		<input type="text" name="title" id="title" required />
	</div>
	<div>
		<label for="language">언어</label>
		<input type="text" name="language" id="language" />
	</div>
	<div>
		<label for="source">출처</label>
		<input type="text" name="source" id="source" />
	</div>
	<div>
		<label for="note">참고</label>
		<input type="text" name="notes" id="notes" />
	</div>
	<div>
		<label for="keywords">키워드</label>
		<input type="text" name="keywords" id="keywords" />
	</div>
	<button type="submit">제출</button>
</form>
