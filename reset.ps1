Write-Output "Running"
$prev= Get-Content prevVal.txt
$val= "apex, avian, floran, glitch, human, hylotl, novakid"
$item = Get-ChildItem . *.json.patch -rec
Write-Output "."
foreach ($file in $item){
    (Get-Content $file.PSPath) |
    Foreach-Object { $_ -replace $prev, $val } |
    Set-Content $file.PSPath
}
Write-Output "."
$val| Set-Content 'prevVal.txt'

$prev= Get-Content prevVal2.txt
$val= "apex, avian, human, hylotl"
Write-Output "."
foreach ($file in $item){
    (Get-Content $file.PSPath) |
    Foreach-Object { $_ -replace $prev, $val } |
    Set-Content $file.PSPath
}
Write-Output "."
$val| Set-Content 'prevVal2.txt'