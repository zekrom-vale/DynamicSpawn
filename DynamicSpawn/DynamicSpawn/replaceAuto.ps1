Param(
	[switch]$full
)
function startFn{
	$species=Int
	If($full){
		Write-Host "Does not include "-ForegroundColor Red -NoNewline
		Write-Host "vanilla defaults!"-ForegroundColor Green
	}
	Else{
		Write-Host "Includes vanilla defaults automatically" -ForegroundColor Green
	}
	$cont=default
	$val=@()
	For($i=0; $i -lt $cont.Length; $i++){
		Write-Host "$($cont[$i][0]),
Default: $($cont[$i][2])" -ForegroundColor Green
		Write-Host 'Type "end" to end the input' -ForegroundColor Yellow
		If($full){
			$val+=looping @() $cont[$i][1]
		}
		Else{
			$val+=looping $cont[$i][2] $cont[$i][1]
		}
	}
	core $val
}
function Int{
	$species=Get-Content 'species.txt'
	$species -Split '`n'
	return $species
}
function default{
	#<text>:<key>:<array>
	#<text>:<key>:<array>
	#...
	$array=Get-Content 'default.txt'
	$array=$array -split '\n'
	For($i=0; $i -lt $array.Length; $i++){
		$array[$i]=$array[$i] -split ':'
		$array[$i][2]=$array[$i][2] -split ','
		Write-Host $array[$i]
	}
	return $array
}
function looping($array, $run){
	For($n=$array.Length+1;; $n++){
		Write-Host "$([char]$run)" -ForegroundColor Green -NoNewline
		$userInput=Read-Host " New Spawn Value $($n)"
		$userInput=$userInput -replace '\s',''
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
			$do=act $userInput
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
	$key=Read-Host
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
function core($valInt){
	$item=Get-ChildItem . *.json.patch -rec
	$prev=Get-Content 'prevVal.txt'
	$prev -Split '`n'
	$val=@()
	For($i=0; $i -lt $valInt.Length; $i++){
		$l=$i+65
		$val+= "`"value`":`"$($valInt[$i])`" //$([char]$l)"
	}
	foreach($file in $item){
		For($r=0; $r -lt $val.Length; $r++){
			(Get-Content $file.PSPath)|
			Foreach-Object{$_ -replace $prev[$r], $val[$r]}|
			Set-Content $file.PSPath
		}
	}
	$val=$val -join "`n"
	$val|Set-Content 'prevVal.txt'
	exit
}
startFn