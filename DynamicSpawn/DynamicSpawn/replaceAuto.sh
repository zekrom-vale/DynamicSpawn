Param(
	[switch]full
)
function startFn(){
	species= Int
	if [$full]
	then
		echo "Does not include "-ForegroundColor Red -NoNewline
		echo "vanilla defaults!"-ForegroundColor Green
	else
		echo "Includes vanilla defaults automatically"-ForegroundColor Green 
	fi
	echo "Default: ""apex, avian, floran, glitch, human, hylotl, novakid""" -ForegroundColor Green
	echo 'Type "end" to end the input' -ForegroundColor Yellow
	val=looping
	echo 'Default: "apex, avian, human, hylotl"' -ForegroundColor Green
	val2=looping
	core $val $val2
}

function Int(){
	species=Get-Content species.txt
	$species -Split '\n'
	return $species
}

function looping(){
	array=@()
	For(n=1; ; n++)do
		read -p "New Value ${n}" userInput
		userInput=$userInput -replace '\s',''
		if [$userInput -like 'end']
		then
			if [$n==1]
			then
				echo 'ERROR: Value 1 can not be blank' -ForegroundColor Red
				$n--
				continue
			fi
			break
		fi
		if [!($userInput -match '\w+')]
		then
			$n--
			echo "ERROR: Invalid input" -ForegroundColor Red
			continue
		fi
		if [!($species -contains $userInput)]
		then
			echo "ERROR: ${userInput} not found." -ForegroundColor Red
			echo "S: Saves ${userInput} to species list
I: Ignores ${userInput}
R: Removes ${userInput} from change
F: Forgets all values" -ForegroundColor Yellow
			action=act $userInput
			if [$action=='R']
			then
				$n--
				continue
			fi
		fi
		$array+= $userInput
	done
	array=$array -join ","
	echo ''
	return $array
}

function act($userInput){
	read -p 'Action' key
	if [$key -like 'S']
	then
		Add-Content -Path "species.txt" -Value $userInput
		return 'I'
	elif [$key -like 'I']
	then
		return 'I'
	then
	elif [$key -like 'R']
	then
		return 'R'
	elif [$key -like 'F']
	then
		startFn
		exit
	elif [$key -like 'exit' -or $key -like 'abort' -or $key -like 'A']
	then
		exit
	else
		echo 'ERROR: Invalid selection' -ForegroundColor Red
		act $userInput
	fi
}

function core($val, $val2){
	item=Get-ChildItem . *.json.patch -rec
	prev=Get-Content prevVal.txt
	$prev -Split '\n'
	if [$full]
	then
		cont=""
		cont2=""
	else
		cont="apex,avian,floran,glitch,human,hylotl,novakid,"
		cont2="apex,avian,human,hylotl,"
	}fi
	val="    \"value\":\"${cont}${val}\""
	val2="\"value\":\"${cont2}${val2}\"    "

	foreach ($file in $item) do
		(Get-Content $file.PSPath) |
		Foreach-Object { $_ -replace $prev[0], $val } |
		Set-Content $file.PSPath
		(Get-Content $file.PSPath) |
		Foreach-Object { $_ -replace $prev[1], $val2 } |
		Set-Content $file.PSPath
	done

	$val+="\n${val2}"
	$val| Set-Content 'prevVal.txt'
	exit
}
startFn