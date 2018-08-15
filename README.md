# Starbound mod: DynamicSpawn
## Using JavaScript, XSLT, CSS, HTML, XML, and C# to provide a smooth experiance.
Instead of creating 2.5E+27 mods just for the 91 listed species, this dynamic mod allows the user to add species to spawn in vanilla maps.  No, I have not looked into how to hack or use vanrabilities.  Feel free to look at the code and scan it with any antivirus/antimalware program.  Why C#?  This is the best script that I know of that can mass replace values in files so I can easly create a tool to change the JSON.patch files while interacting with the web component.  The web site uses advanced tequniques that I would have been unable to use in C# or any other language.

# How to use
1) Go to [releases](https://github.com/zekrom-vale/DynamicSpawn/releases) and donload the latest version (5.0 or higher) and save to to your starbound mods folder (`C:\Program Files (x86)\Steam\steamapps\common\Starbound\mods\`)
2) Right click the file and click `Extract All` and then `OK`
2.1) Remove the .zip file
3) Open the new folder and run the .exe file
4) The program will open https://zekrom-vale.github.io/DynamicSpawn with the location of the .exe file to ease downloads
5) Follow directions on the website
5.1) Remove the .exe file

# Features
* The tour tells you how to use the site, asynchronous
* Saves your progress automaticaly in Local Storage or Cookies (Backup)
* Save your options for later use and continue editing
* Aira support (For Screen Readers)
* XML used to reduce file sizes and improve editing ease
* Keyboard support for navigation
* CSS varables allow for easy to style themes
* Popups for more information
* Right column loads when in view to save data and processing
* Asynchronous and semi-parallel searching
* Regular Expresion search support
* Search options
* Uses hash to remember current tab
* Uses query string to pass the location

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

# Web Security
1) Strict CSP (Content Security Policy)
	* No inline Scripts allowed
	* Limited allowed script and CSS paths
	* Strict inlline CSS policy (Uses a XML randomly generated intager)
2) Only uses event Listeners instead of the old on* attrabute method
3) No person information is stored
4) Uses the new Local Sotrage method instead of the cookie

# Bugs/Notes
* If you discover empty 'dungeons' like the space station and ships __it is a bug!__  _HOWEVER,_
* You might have added invalid species or ones that are not installed.
* Manual mode does not check for errors

# linux and macOS
Sorry, but I do not know any language that would work on those systems.  Other than the web component (No editing files).

# Races
### You MUST HAVE the corisponding MOD for it to WORK
See the curent species at https://zekrom-vale.github.io/DynamicSpawn/?path=overide
#### Authors please comment on [This file](https://github.com/zekrom-vale/DynamicSpawn/blob/master/README.md) if your race is not on the list __AND__ the species uses the bace NPC file.
With this XML form (put answers in the `""`)
```
<mod name="" author="">
	<id steam="" sb=""/>
```
* name : The name of the mod
* steam : Your steam id (Exclude URL)
* sb : Starbound mod form (Include after the last slash in the URL)
```
	<specie value="" name="">
		<imgOn src=""/>
		<imgOff src=""/>
	</specie>
	<!--Ect-->
</mod>
```
* value : The species id
* name : The name of the species overide (Auto captlised and `_` to ` `)
* src : The name of the image.

If you have no image use `<specie value="" name=""/>` instead of `<specie value="" name="">...</specie>`

To-Do : Create a form for this
