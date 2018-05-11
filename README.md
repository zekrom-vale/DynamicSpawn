# Starbound mod: DynamicSpawn
Instead of creating 2.5E+27 mods just for the 91 listed species, this dynamic mod allows the user to add species to spawn in vanilla maps.  No, I have not looked into how to hack or use vanrabilities.  Feel free to look at the code and scan it with any antivirus/antimalware program.  Why Powershell?  This is the only script that I know of that can mass replace values in files so I can easly create a tool to change the JSON.patch files.
# How to use
1) Place this mod into the Starbound mod folder to make it work
2) Run `replaceAuto.ps1` to start adding species
	* You might have to right click and select `Run with PowerShell` to change the values
	* No policy change is required (`l` or `n`)
3) Chose the mode (Y: Full controll, N: Includes defults, M: Manualy input the string)
4) Enter the species separated by enters
5) If it is not valid you can type these letters
```
S: Saves <Value> to species list
I: Ignores <Value>
R: Removes <Value> from change
F: Forgets all values
exit or abort: Exits the script (Extra key for debug resons)
```
6) Type `end` to end the process
7) Go to step 3 until it quits

Reset to default values with `reset.ps1`.

# Community sharing
### To make it easy to include in modpacks you are allowed to publish on steam or chucklefish forums _if_ you
* Reference the __original author__ (zekrom_vale)
* Reference this mod by __adding a link__ to the [main page](https://github.com/zekrom-vale/DynamicSpawn) and tell users that they can create their own with this mod
* __Identify__ the species added (Use the required tab on the steam workshop or equivelent)
* _Please_ add required to the `metadeta` file of all the required mods to reduce issues
* Warn the user that this mod __and/or__ pack __requires all of the species__ added for DynamicSpawn to work.
* __Remove__ the `.ps1` and `.sh` files (PowerShell and shell)
* Redirect the issues [here](https://github.com/zekrom-vale/DynamicSpawn/issues).
* __Update the mod__ to the latest version in a timely manner (Unless it only changes the `.ps1` files)
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
### This is an incomplete list
#### Authors please comment with your species id on the latest commit of [This file](https://github.com/zekrom-vale/DynamicSpawn/blob/master/README.md) if your race is not on the list __AND__ the species uses the bace NPC file
Attarran

Canids

Eevee

Indix

Umbreon

agaran

albinopenguin

alicorn

alpaca

arachne

argonian

avali

avikan

avonian

batpony

blattra

bunnykin

callistan

cat

catus

changeling

chicken

clownkin

cryoguin

demon

dragon

droden

eeveetwo

elunite

everis

familiar

felin

fenerox

gardevan

greckan

gyrusen

inkling

kazdra

kemono

kineptic

lamia

lombax_pointed

lombax_striped

manicpenguin

mantizi

moogle

munari

neko

nightar

ningen

ooze

orcana

pegasus

peglaci

penguin

pengvolt

phantasm

phox

plaguin

ponex

pony

puffin

pygs

pyroguin

robopenguin

rockhopperpenguin

rodentia

saturn

scorsheep

sergal

shade

shadow2

skath

skelekin

slimeperson

su_gem

tauren

terrakin

tirastrolls

trink

troll

unicorn

vampyric

vanillapenguin

vespoid

viera

vulpes

wasphive

webber

woggle

zombie
