Param(
	[switch]$full
)
function startFn{
	$species= Int
	If($full){
		Write-Host "Does not include "-ForegroundColor Red -NoNewline
		Write-Host "vanilla defaults!"-ForegroundColor Yellow
	}
	Else{
		Write-Host "Includes vanilla defaults automatically" -ForegroundColor Yellow
	}
	#===============================
	$cont=@(
		@("apex","avian","floran","glitch","human","hylotl","novakid"),
		@("apex","avian","human","hylotl")
	)
	$des=@(
		"Generic NPC Spawn",
		"Scientific and cult NPC Spawn"
	)
	$key=@(
		"A",
		"B"
	)
	#===============================
	$val=@()
	For($i=0; $i -lt $cont.Length; $i++){
		Write-Host "Modifies: $($des[$i])" -ForegroundColor Cyan
		Write-Host "Default: $($cont[$i])" -ForegroundColor Green
		Write-Host "    Type `"end`" to end the input" -ForegroundColor Yellow
		If($full){
			$val+=looping @() $key[$i]
		}
		Else{
			$val+=looping $cont[$i] $key[$i]
		}
	}
	core $val $key
}

function Int{
	$species= Get-Content 'species.txt'
	$species -Split '`n'
	return $species
}

function looping($array, $run){
	For($n=$array.Length+1;; $n++){
		Write-Host "$($run)" -ForegroundColor Green -NoNewline
		$userInput= Read-Host " New Spawn Value $($n)"
		$userInput= $userInput -replace '\s',''
		If($userInput -like '$exit'){
			exit
		}
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
			Write-Host "`tERROR: Invalid input" -ForegroundColor Red
			continue
		}
		If($array -contains $userInput){
			$n--
			Write-Host "`tERROR: Duplicate input" -ForegroundColor Red
			continue
		}
		If(-not($species -contains $userInput)){
			Write-Host "    ERROR: $($userInput) not found." -ForegroundColor Red
			Write-Host "      S: Saves $($userInput) to species list
      I: Ignores $($userInput)
      R: Removes $($userInput) from change
      F: Forgets all values" -ForegroundColor Yellow
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
	Write-Host "    Action: " -ForegroundColor Magenta -NoNewline
	$key= Read-Host
	If($key -like 'S'){
		Add-Content -Path "species.txt" -Value $userInput
		return 'I'
	}
	ElseIf($key -like 'I'){
		return 'I'
	}
	ElseIf($key -like 'R'){
		return 'R'
	}
	ElseIf($key -like 'F'){
		cls
		startFn
		exit
	}
	ElseIf($key -like 'exit' -or $key -like 'abort'){
		exit
	}
	Else{
		Write-Host "      ERROR: Invalid selection" -ForegroundColor Red
		act $userInput
	}
}

function core($valInt, $key){
	$item = Get-ChildItem . *.json.patch -rec
	$prev= Get-Content 'prevVal.txt'
	$prev -Split '`n'
	$val= @()
	For($i=0; $i -lt $valInt.Length; $i++){
		$l=$i+65
		$val+= "`"value`":`"$($valInt[$i])`" //$($key)"
	}

	foreach ($file in $item){
		For($r=0; $r -lt $val.Length; $r++){
			(Get-Content $file.PSPath) |
			Foreach-Object { $_ -replace $prev[$r], $val[$r] } |
			Set-Content $file.PSPath
		}
	}
	$val -join "`n"| Set-Content 'prevVal.txt'
	exit
}
startFn