Param(
	[switch]full
)
function startFn{
	species=$(Int)
	if [$full]
	then
		echo -e "\e[31mDoes not include" > /dev/tty
		echo -e "\e[32mvanilla defaults!" > /dev/tty
	else
		echo -e "\e[32mIncludes vanilla defaults automatically" > /dev/tty
	fi
	echo -e "Default: \"apex, avian, floran, glitch, human, hylotl, novakid\""
	echo -e "\e[33mType \"end\" to end the input\e[0m"
	val=$(looping)
	echo "\e[32mDefault: \"apex, avian, human, hylotl\"\e[0m" > /dev/tty
	val2=$(looping)
	core "$val" "$val2"
}

function Int{
	species=Get-Content species.txt
	$species -Split '\n'
	echo $species
}

function looping{
	array=@()
	For(n=1; ; n++)do
		read -p "New Value ${n}" userInput
		userInput=$userInput -replace '\s',''
		if [$userInput -like 'end']
		then
			if [$n==1]
			then
				echo -e "\e[31mERROR: Value 1 can not be blank\e[0m" > /dev/tty
				$n--
				continue
			fi
			break
		fi
		if [!($userInput -match '\w+')]
		then
			$n--
			echo -e "\e[31mERROR: Invalid input\e[0m" > /dev/tty
			continue
		fi
		if [!($species -contains $userInput)]
		then
			echo -e "\e[31mERROR: ${userInput} not found."
			echo -e "\e[33mS: Saves ${userInput} to species list
I: Ignores ${userInput}
R: Removes ${userInput} from change
F: Forgets all values" > /dev/tty
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
	echo $array
}

function act{
	read -p 'Action' key
	if [$key -like 'S']
	then
		Add-Content -Path "species.txt" -Value $1
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
		echo -e '\e[31mERROR: Invalid selection\e[0m' > /dev/tty
		act $1
	fi
}

function core{
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
	fi
	val="    \"value\":\"${cont}${1}\""
	val2="\"value\":\"${cont2}${2}\"    "

	foreach ($file in $item) do
		(Get-Content $file.PSPath) |
		Foreach-Object { $_ -replace $prev[0], $1 } |
		Set-Content $file.PSPath
		(Get-Content $file.PSPath) |
		Foreach-Object { $_ -replace $prev[1], $2 } |
		Set-Content $file.PSPath
	done

	$1+="\n${2}"
	$1| Set-Content 'prevVal.txt'
	exit
}
startFn