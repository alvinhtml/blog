<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="author" content="alvin.yang">
<meta name=“viewport” content=“width=device-width; initial-scale=1.0”>
<title>响应式布局</title>
<style type="text/css">
textarea { width: 100%; max-width: 800px; display: block;}
</style>
</head>
<body>

	<form action="" method="post">
		<p><textarea name="htmlcode" id="htmlcode" cols="30" rows="10"><?php echo $_POST['htmlcode'] ?></textarea></p>
		<p><input type="submit" value="转化" /></p>
	</form>
	<p>
		<code><textarea name="newcode" id="newcode" cols="30" rows="10"><?php echo htmlentities($_POST['htmlcode']); ?></textarea></code>
	</p>
</body>
</html>