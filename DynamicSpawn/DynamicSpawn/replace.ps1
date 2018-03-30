Write-Output "Ignores vanilla defaults"
Write-Output 'Default: "apex, avian, floran, glitch, human, hylotl, novakid"'
$prev= Get-Content prevVal.txt
$val= Read-Host 'New Value'
$val= "    `"value`": `"apex, avian, floran, glitch, human, hylotl, novakid, $($val)`""
$item = Get-ChildItem . *.json.patch -rec

Write-Output 'Default: "apex, avian, human, hylotl"'
$prev2= Get-Content prevVal2.txt
$val2= Read-Host 'Second New Value'
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