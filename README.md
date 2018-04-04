# Starbound mod: DynamicSpawn
Instead of creating 2.5E+27 mods just for the 91 listed species, this dynamic mod allows the user to add species to spawn in vanilla maps.  
# How to use
1) Place this mod into the Starbound mod folder to make it work
2) Run `replaceAuto.ps1` or `replaceAuto.ps1 - Full` to start adding species
3) Enter the species separated by enters
4) If it is not valid you can type these letters
```
S: Ends the script
R: Remembers <value> to species list
I: Ignores <value>
E: Removes <value> from change
```
5) Type `end` to end the process
6) Repeat for the next part

Reset to default values with `reset.ps1`.
### The old way `replaceManual.ps1`
1) Place this mod into the Starbound mod folder to make it work
2) Run `replace.ps1` (You might have to right click and select `Run with PowerShell`) to change the values.  No policy change is required.
3) Input a comma deliminated list (Ex: `kazdra, avali , sergal,dragon`)
4) The first value is to replace stuff like the spaceships and space station.
5) The second value is used in cultist and space labs.

Reset to default values with `reset.ps1`.

# Community sharing
### To make it easy to include in modpacks you are allowed to publish on steam or chucklefish forums _if_ you
* Reference the __original author__ (zekrom_vale)
* Reference this mod by __adding a link__ to the [main page](https://github.com/zekrom-vale/DynamicSpawn) and tell users that they can create their own with this mod
* __Identify__ the species added (Use the required tab on the steam workshop or equivelent)
* _Please_ add required to the `metadeta` file of all the required mods to reduce issues
* Warn the user that this mod __and/or__ pack __requires all of the species__ added for it to work.
* __Remove__ the `.ps1` and `.sh` files (PowerShell and shell)
* Remove `species.csv` or `species.txt` as it is no longer required
* Redirect the issues [here](https://github.com/zekrom-vale/DynamicSpawn/issues).
* __Update the mod__ to the latest version in a timely manner (Unless it only changes the `.ps1` files)
* __Never sell__ this mod
* __Never__ remove the `LICENCE` file from the mod!

# Bugs/Notes
* If you discover empty 'dungeons' like the space station and ships __it is a bug!__
  * You might have added invalid species or ones that are not installed.

# Get PowerShell for linux and macOS
https://github.com/PowerShell/PowerShell

# Races
### You MUST HAVE the corisponding MOD for it to WORK
### This is an incomplete list
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
