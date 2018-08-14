# Starbound mod: DynamicSpawn
Instead of creating 2.5E+27 mods just for the 91 listed species, this dynamic mod allows the user to add species to spawn in vanilla maps.  No, I have not looked into how to hack or use vanrabilities.  Feel free to look at the code and scan it with any antivirus/antimalware program.  Why Powershell?  This is the only script that I know of that can mass replace values in files so I can easly create a tool to change the JSON.patch files.
# How to use
1) Go to [releases](https://github.com/zekrom-vale/DynamicSpawn/releases) and donload the latest version (5.0 or higher) and save to to your starbound mods folder (`C:\Program Files (x86)\Steam\steamapps\common\Starbound\mods\`)
2) Right click the file and click `Extract All` and then `OK`
2.1) Remove the .zip file
3) Open the new folder and run the .exe file
4) The program will open https://zekrom-vale.github.io/DynamicSpawn with the location of the .exe file to ease downloads
5) Follow directions on the website
5.1) Remove the .exe file

# Community sharing
### To make it easy to include in modpacks you are allowed to publish on steam or chucklefish forums _if_ you
* Reference the __original author__ (zekrom_vale)
* Reference this mod by __adding a link__ to the [main page](https://github.com/zekrom-vale/DynamicSpawn) and tell users that they can create their own with this mod
* __Identify__ the species added (Use the required tab on the steam workshop or equivelent)
* _Please_ add required to the `metadeta` file of all the required mods to reduce issues
* Warn the user that this mod __and/or__ pack __requires all of the species__ added for DynamicSpawn to work.
* __Remove__ the `.ps1` and `.sh` or `.exe` files (PowerShell and shell)
* Redirect the issues [here](https://github.com/zekrom-vale/DynamicSpawn/issues).
	* Unless it is an issue with a custom species
* __Update the mod__ to the latest version in a timely manner if the `.patch` files change.
* __Never sell__ this mod
* __Never__ remove the `LICENCE` file from the mod!

# Bugs/Notes
* If you discover empty 'dungeons' like the space station and ships __it is a bug!__  _HOWEVER,_
* You might have added invalid species or ones that are not installed.
* Manual mode does not check for errors

# Get PowerShell for linux and macOS
https://github.com/PowerShell/PowerShell

# Races
### You MUST HAVE the corisponding MOD for it to WORK
See the curent species at https://zekrom-vale.github.io/DynamicSpawn/?path=overide
#### Authors please comment on [This file](https://github.com/zekrom-vale/DynamicSpawn/blob/master/README.md) if your race is not on the list __AND__ the species uses the bace NPC file.
Fill out this
```
<mod name="" author="">
	<id steam="" sb=""/>
	<specie value="" name="">
		<imgOn src=""/>
		<imgOff src=""/>
	</specie>
	<!--OR-->
	<specie value="" name=""/>
	<!--...-->
</mod>
<!--...-->
```

