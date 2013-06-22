<?php
	// Setup each select option and email recipient
	$emails['Option 1'] = 'john@email.com';
	$emails['Option 2'] = 'jane@email.com';

	function multiSelect($name = 'select', $i = array(), $attrs = array()) {
		$s = "<select name=\"$name\" ";
		foreach($attrs as $key => $val) $s .= "$key=\"$val\" ";
		$s .= "/>";
		foreach($i as $a => $b) $s .= "<option value=\"$a\">$a</option>";
		$s .= "</select>";
		return $s;
	}
?>