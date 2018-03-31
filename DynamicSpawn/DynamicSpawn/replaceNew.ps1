$start={
	Write-Output "Ignores vanilla defaults"
	Write-Output 'Default: "apex, avian, floran, glitch, human, hylotl, novakid"'
	$val= @()
	$species= Get-Content species.txt
	$species -Split '`n'
	For($n=1; -not ($userInput -like 'end'); $n++){
		$userInput= Read-Host "New Value $($n)"
		$userInput= $userInput -replace '\s',''
		If($userInput -like 'end'){
			break
		}
		If(-not($userInput -match '\w+')){
			$n--
			Write-Output 'Invalid input'
			continue
		}
		If(-not($species -contains $userInput)){
			Write-Output "$($userInput) not found."
			Write-Output 'S: Ends the script'
			Write-Output "R: Remembers $($userInput) to species list"
			Write-Output "I: Ignores $($userInput)"
			Write-Output "E: Removes $($userInput) from change"
			$do= act $userInput
			If($do -eq 'R'){
				$n--
				continue
			}
		}
		$val+= $userInput
	}
	$val -Join ','

	$val2= @()
	Write-Output 'Default: "apex, avian, human, hylotl"'
	$userInput=''
	For($n=1; -not ($userInput -like 'end'); $n++){
		$userInput= Read-Host "New Value $($n)"
		$userInput= $userInput -replace '\s',''
		If($userInput -like 'end'){
			break
		}
		If(-not($userInput -match '\w+')){
			$n--
			Write-Output 'Invalid input'
			continue
		}
		If(-not($species -contains $userInput)){
			Write-Output "$($userInput) not found."
			Write-Output 'S: Ends the script'
			Write-Output "R: Remembers $($userInput) to species list"
			Write-Output "I: Ignores $($userInput)"
			Write-Output "E: Removes $($userInput) from change"
			$do= act $userInput
			If($do -eq 'R'){
				$n--
				continue
			}
		}
		$val2+= $userInput
	}
	$val2 -Join ','
	core $val $val2
}

function act($userInput){
	Write-Output $userInput
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
		Write-Output 'Invalid selection'
		return act $userInput
	}
}

function core($val, $val2){
	$item = Get-ChildItem . *.json.patch -rec
	$prev= Get-Content prevVal.txt
	$val= "    `"value`": `"apex, avian, floran, glitch, human, hylotl, novakid, $($val)`""
	$prev2= Get-Content prevVal2.txt
	$val2= "`"value`": `"apex, avian, human, hylotl, $($val2)`"    "

	foreach ($file in $item){
		(Get-Content $file.PSPath) |
		Foreach-Object { $_ -replace $prev, $val } |
		Set-Content $file.PSPath

		(Get-Content $file.PSPath) |
		Foreach-Object { $_ -replace $prev2, $val2 } |
		Set-Content $file.PSPath
	}

	$val| Set-Content 'prevVal.txt'
	$val2| Set-Content 'prevVal2.txt'
	exit
}

&$start