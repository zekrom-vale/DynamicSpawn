Write-Output "Running"
$item = Get-ChildItem . *.json.patch -rec
$prev= Get-Content prevVal.txt
$prev -Split '`n'
$val= "    `"value`":`"apex,avian,floran,glitch,human,hylotl,novakid`""
$val2= "`"value`":`"apex,avian,human,hylotl`"    "

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