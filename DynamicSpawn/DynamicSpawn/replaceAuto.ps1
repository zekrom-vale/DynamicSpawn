Param(
	[switch]$full
)
$start={
	$species= Int
	If($full){
		Write-Host "Ignores vanilla defaults"-ForegroundColor Green
	}
	Else{
		Write-Host "Does not ignore vanilla defaults!"-ForegroundColor Green
	}
	Write-Host "Default: ""apex, avian, floran, glitch, human, hylotl, novakid""" -ForegroundColor Green
	Write-Host 'Type "end" to end the input' -ForegroundColor Yellow
	$val=looping
	Write-Host 'Default: "apex, avian, human, hylotl"' -ForegroundColor Green
	$val2=looping
	core $val $val2
}

function Int{
	$species= Get-Content species.txt
	$species -Split '`n'
	return $species
}

function looping{
	$array= @()
	For($n=1; ; $n++){
		$userInput= Read-Host "New Value $($n)"
		$userInput= $userInput -replace '\s',''
		If($userInput -like 'end'){
			If($n -eq 1){
				Write-Host 'ERROR: Value 1 can not be blank' -ForegroundColor Red
				$n--
				continue
			}
			break
		}
		If(-not($userInput -match '\w+')){
			$n--
			Write-Host "ERROR: Invalid input" -ForegroundColor Red
			continue
		}
		If(-not($species -contains $userInput)){
			Write-Host "ERROR: $($userInput) not found." -ForegroundColor Red
			Write-Host "S: Ends the script
R: Remembers $($userInput) to species list
I: Ignores $($userInput)
E: Removes $($userInput) from change" -ForegroundColor Yellow
			$do= act $userInput
			If($do -eq 'R'){
				$n--
				continue
			}
		}
		$array+= $userInput
	}
	$array=$array -join ","
	Write-Host ''
	return $array
}

function act($userInput){
	$key= Read-Host 'Action'
	If($key -like 'S'){
		exit
	}
	ElseIf($key -like 'R'){
		Add-Content -Path "species.txt" -Value $userInput
		return 'I'
	}
	ElseIf($key -like 'I'){
		return 'I'
	}
	ElseIf($key -like 'E'){
		return 'R'
	}
	Else{
		Write-Host 'ERROR: Invalid selection' -ForegroundColor Red
		act $userInput
	}
}

function core($val, $val2){
	$item = Get-ChildItem . *.json.patch -rec
	$prev= Get-Content prevVal.txt
	$prev -Split '`n'
	If($full){
		$cont= ""
		$cont2= ""
	}
	Else{
		$cont= "apex,avian,floran,glitch,human,hylotl,novakid,"
		$cont2= "apex,avian,human,hylotl,"
	}
	$val= "    `"value`":`"$($cont)$($val)`""
	$val2= "`"value`":`"$($cont2)$($val2)`"    "

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