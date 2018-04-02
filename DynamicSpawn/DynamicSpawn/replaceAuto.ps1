Param(
	[switch]$full
)
function startFn{
	$species= Int
	If($full){
		Write-Host "Does not include "-ForegroundColor Red -NoNewline
		Write-Host "vanilla defaults!"-ForegroundColor Green
	}
	Else{
		Write-Host "Includes vanilla defaults automatically"-ForegroundColor Green
	}
	$cont=@(
		@("apex","avian","floran","glitch","human","hylotl","novakid"),
		@("apex","avian","human","hylotl")
	)
	$val=@()
	For($i=0; $i -lt $cont.Length; $i++){
		Write-Host "Default: $($cont[$i])" -ForegroundColor Green
		Write-Host 'Type "end" to end the input' -ForegroundColor Yellow
		$val+=looping $cont[$i] $i
	}
	core $val
}

function Int{
	$species= Get-Content species.txt
	$species -Split '`n'
	return $species
}

function looping($array, $run){
	For($n=$array.Length+1; ; $n++){
		Write-Host $run -ForegroundColor Green -NoNewline
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
			Write-Host "ERROR: Invalid input" -ForegroundColor Red
			continue
		}
		If($array -contains $userInput){
			$n--
			Write-Host "ERROR: Duplicate input" -ForegroundColor Red
			continue
		}
		If(-not($species -contains $userInput)){
			Write-Host "ERROR: $($userInput) not found." -ForegroundColor Red
			Write-Host "S: Saves $($userInput) to species list
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
	Write-Host 'Action: ' -ForegroundColor Magenta -NoNewline
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
		startFn
		exit
	}
	ElseIf($key -like 'exit' -or $key -like 'abort'){
		exit
	}
	Else{
		Write-Host 'ERROR: Invalid selection' -ForegroundColor Red
		act $userInput
	}
}

function core($val){
	$item = Get-ChildItem . *.json.patch -rec
	$prev= Get-Content prevVal.txt
	$prev -Split '`n'
	$val= @("`"value`":`"$($val[0])`" //A", "`"value`":`"$($val[1])`" //B")

	foreach ($file in $item){
		For($r=0; $r -lt $val.Length; $r++){
			(Get-Content $file.PSPath) |
			Foreach-Object { $_ -replace $prev[$r], $val[$r] } |
			Set-Content $file.PSPath
		}
	}

	$val+="`n$($val2)"
	$val| Set-Content 'prevVal.txt'
	exit
}
startFn