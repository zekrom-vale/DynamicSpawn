$start={
	$species= Int

	Write-Host "Ignores vanilla defaults"
	Write-Host 'Default: "apex, avian, floran, glitch, human, hylotl, novakid"'
	$val=looping
	Write-Host ''
	Write-Host ''

	Write-Host 'Default: "apex, avian, human, hylotl"'
	$val2=looping
	Write-Host ''
	Write-Host ''
	core $val $val2
}

function Int{
	$species= Get-Content species.txt
	$species -Split '`n'
	return $species
}

function looping{
	$var= @()
	For($n=1; -not ($userInput -like 'end'); $n++){
		Write-Host ''
		$userInput= Read-Host "New Value $($n)"
		$userInput= $userInput -replace '\s',''
		If($userInput -like 'end'){
			break
		}
		If(-not($userInput -match '\w+')){
			$n--
			Write-Host 'ERROR-------------------'
			Write-Host 'Invalid input'
			continue
		}
		If(-not($species -contains $userInput)){
			Write-Host 'ERROR-------------------'
			Write-Host "$($userInput) not found."
			Write-Host 'S: Ends the script'
			Write-Host "R: Remembers $($userInput) to species list"
			Write-Host "I: Ignores $($userInput)"
			Write-Host "E: Removes $($userInput) from change"
			$do= act $userInput
			If($do -eq 'R'){
				$n--
				continue
			}
		}
		$var+= $userInput
	}
	$var -Join ','
	return $var
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
		Write-Host 'Invalid selection'
		return act $userInput
	}
}

function core($val, $val2){
	$item = Get-ChildItem . *.json.patch -rec
	$prev= Get-Content prevVal.txt
	$prev -Split '`n'
	$val= "    `"value`":`"apex,avian,floran,glitch,human,hylotl,novakid,$($val)`""
	$val2= "`"value`":`"apex,avian,human,hylotl,$($val2)`"    "

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