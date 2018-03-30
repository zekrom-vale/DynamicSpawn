Write-Output "Running"
$item = Get-ChildItem . *.json.patch -rec
$prev= Get-Content prevVal.txt
$val= "    `"value`": `"apex, avian, floran, glitch, human, hylotl, novakid`""
$prev2= Get-Content prevVal2.txt
$val2= "`"value`": `"apex, avian, human, hylotl`"    "

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