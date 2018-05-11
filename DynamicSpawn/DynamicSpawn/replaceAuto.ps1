Param(
	[switch]$full
)
$red=@{"ForegroundColor"="Red"}
$yel=@{"ForegroundColor"="Yellow"}
$grn=@{"ForegroundColor"="Green"}
function startFn{
	$species=Int
	If($full){
		Write-Host "Does not include " @red -NoNewline
		Write-Host "vanilla defaults!" @yel
	}
	Else{
		Write-Host "Includes vanilla defaults automatically" @yel
	}
	#==
	$cont=@(
		@("apex","avian","floran","glitch","human","hylotl","novakid"),
		@("apex","avian","human","hylotl"),
		@("apex","avian","human","hylotl"),
		@("apex","avian","human","hylotl","novakid"),
		@("apex","avian","glitch","human","hylotl","novakid")
		#,@("apex","avian","floran","glitch","human","hylotl","novakid")
	)
	$des=@(
		"Generic NPC Spawn (Includes Space Station)",
		"Scientific NPC Spawn",
		"Cult NPC Spawn",
		"Pirate NPC Spawn",
		"Merchant NPC Spawn",
		"Random outpost Civilian"
	)
	$key=@(
		"A",
		"B",
		"C",
		"P",
		"M",
		"Outpost"
	)
	#==
	$val=@()
	For($i=0;$i -lt $cont.Length;$i++){
		Write-Host "Modifies: $($des[$i])" -ForegroundColor Cyan
		If(-not $full){
			Write-Host "Includes by default: " @yel -NoNewline
		}
		Else{
			Write-Host "Default: " @yel -NoNewline
		}
		Write-Host $cont[$i] @grn
		Write-Host '    Type "end" to end the input' @yel
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
	$species=Get-Content 'species.csv'
	return $species -Split '`n'
}

function looping($array,$run){
	For($n=$array.Length+1;;$n++){
		Write-Host $run @grn -NoNewline
		$uI=Read-Host " New Spawn Value $($n)"
		$uI=$uI -replace '(^\s+|\s+$)',''
		If($uI -like 'exit' -or $uI -like 'abort'){
			exit
		}
		If($uI -like 'end'){
			If($n -eq 1){
				Write-Host 'ERROR: Value 1 can not be blank' @red
				$n--
				continue
			}
			break
		}
		If($array -contains $uI){
			$n--
			Write-Host "`tERROR: Duplicate input" @red
			continue
		}
		If(-not($species -contains $uI)){
			Write-Host "    ERROR: $($uI) not found." @red
			Write-Host "      S: Saves $($uI) to species list
      I: Ignores $($uI)
      R: Removes $($uI) from change
      F: Forgets all values" @yel
			$do=act $uI
			If($do -eq 'R'){
				$n--
				continue
			}
		}
		$array+=$uI
	}
	Write-Host ''
	return $array -join ","
}

function act($uI){
	Write-Host "    Action: " -ForegroundColor Magenta -NoNewline
	$key=Read-Host
	If($key -like 'S'){
		Add-Content -Path "species.csv" -Value $uI
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
		Write-Host "      ERROR: Invalid selection" @red
		act $uI
	}
}

function core($valInt, $key){
	$item=Get-ChildItem . *.json.patch -rec
	$prev=Get-Content 'prevVal.csv'
	$prev -Split '`n'
	$val=@()
	For($i=0;$i -lt $valInt.Length;$i++){
		$val+="`"value`":`"$($valInt[$i])`" //$($key[$i])"
	}

	foreach ($file in $item){
		For($r=0;$r -lt $val.Length;$r++){
			(Get-Content $file.PSPath)|
			Foreach-Object{$_ -replace $prev[$r],$val[$r]} |
			Set-Content $file.PSPath
		}
	}
	$val -join "`n"| Set-Content 'prevVal.csv'
	exit
}
startFn