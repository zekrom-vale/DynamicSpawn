$start={
	Write-Output "Ignores vanilla defaults"
	Write-Output 'Default: "apex, avian, floran, glitch, human, hylotl, novakid"'
	$val= Read-Host 'New Value'
	If($val -match '^\s*(?:\s*\w+\s*,)*\s*\w+\s*$'){
		&$start2
	}
	Write-Output 'ERROR: Invalid input'
	&$start
}
$start2={
	Write-Output 'Default: "apex, avian, human, hylotl"'
	$val2= Read-Host 'Second New Value'
	If($val2 -match '^\s*(?:\s*\w+\s*,)*\s*\w+\s*$'){
		&$core
	}
	Write-Output 'ERROR: Invalid input'
	&$start2
}
$core={
	$item = Get-ChildItem . *.json.patch -rec
	$prev= Get-Content prevVal.txt
	$prev -Split '`n'
	$val= "    `"value`":`"$($val)`""
	$val2= "`"value`":`"$($val2)`"    "

	foreach ($file in $item){
		(Get-Content $file.PSPath) |
		Foreach-Object { $_ -replace $prev[0], $val } |
		Set-Content $file.PSPath

		(Get-Content $file.PSPath) |
		Foreach-Object { $_ -replace $prev[1], $val2 } |
		Set-Content $file.PSPath
	}

	$val+="`n$($val2)"
	$val| Set-Content 'prevVal.txt'
	exit
}
&$start