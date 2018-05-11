Write-Output "This will reset ALL custom values!" -ForegroundColor "Red"
Read-Host "Press Enter to continue"
Write-Output "Running"
$item=Get-ChildItem . *.json.patch -rec
$prev=Get-Content prevVal.cvs
$prev -Split '`n'
$val=@(
	'"value":"apex,avian,floran,glitch,human,hylotl,novakid" //A',
	'"value":"apex,avian,human,hylotl" //B',
	'"value":"apex,avian,human,hylotl" //C',
	'"value":"apex,avian,human,hylotl,novakid" //P',
	'"value":"apex,avian,floran,glitch,human,hylotl,novakid" //M',
	'"value":"apex,avian,human,hylotl,novakid" //T'
)

foreach ($file in $item){
	For($r=0;$r -lt $val.Length;$r++){
		(Get-Content $file.PSPath)|
		Foreach-Object{$_ -replace $prev[$r],$val[$r]} |
		Set-Content $file.PSPath
	}
}
$val -join "`n"| Set-Content 'prevVal.csv'