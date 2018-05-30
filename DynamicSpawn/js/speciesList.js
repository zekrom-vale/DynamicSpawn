"use strict";
window.addEventListener("load",()=>{
	for(let i in speciesEl)elm.speciesList.append(speciesEl[i]);
});

class specieDefault{
	constructor(value,nameOverride){
		this.value=value;
		this.name=nameOverride||value.replace(/^[a-z]/,v=>v.toUpperCase()).replace(/_[a-z]/g,v=>" "+v.slice(1).toUpperCase());
		this.img=[`img/tab_other.png`,`img/tab_other_select.png`];
	}
}
class Species extends specieDefault{
	constructor(value,nameOverride){
		super(value,nameOverride);
		this.img=[`img/tab_${value}.png`,`img/tab_${value}_select.png`];
	}
}

const species=[
	new specieDefault("Attarran"),
	new specieDefault("Canids"),
	new specieDefault("Eevee"),
	new specieDefault("Indix"),
	new specieDefault("Umbreon"),
	new specieDefault("agaran"),
	new specieDefault("albinopenguin","Albino Penguin"),
	new specieDefault("alicorn"),
	new specieDefault("alpaca"),
	new Species("apex"),
	new specieDefault("arachne"),
	new specieDefault("argonian"),
	new specieDefault("avali"),
	new Species("avian"),
	new specieDefault("avikan"),
	new specieDefault("avonian"),
	new specieDefault("batpony"),
	new specieDefault("blattra"),
	new specieDefault("bunnykin"),
	new specieDefault("callistan"),
	new specieDefault("cat"),
	new specieDefault("catus"),
	new specieDefault("changeling"),
	new specieDefault("chicken"),
	new specieDefault("clownkin"),
	new specieDefault("cryoguin"),
	new specieDefault("demon"),
	new specieDefault("dragon"),
	new specieDefault("droden"),
	new specieDefault("eeveetwo","Eevee Two"),
	new specieDefault("elunite"),
	new specieDefault("everis"),
	new specieDefault("familiar"),
	new specieDefault("felin"),
	new specieDefault("fenerox"),
	new Species("floran"),
	new specieDefault("gardevan"),
	new Species("glitch"),
	new specieDefault("greckan"),
	new specieDefault("gyrusen"),
	new Species("human"),
	new Species("hylotl"),
	new specieDefault("inkling"),
	new Species("kazdra"),
	new specieDefault("kemono"),
	new specieDefault("kineptic"),
	new specieDefault("lamia"),
	new specieDefault("lombax_pointed"),
	new specieDefault("lombax_striped"),
	new specieDefault("manicpenguin"),
	new specieDefault("mantizi"),
	new specieDefault("moogle"),
	new specieDefault("munari"),
	new specieDefault("neko"),
	new specieDefault("nightar"),
	new specieDefault("ningen"),
	new specieDefault("novakid"),
	new specieDefault("ooze"),
	new specieDefault("orcana"),
	new specieDefault("pegasus"),
	new specieDefault("peglaci"),
	new specieDefault("penguin"),
	new specieDefault("pengvolt"),
	new specieDefault("phantasm"),
	new specieDefault("phox"),
	new specieDefault("plaguin"),
	new specieDefault("ponex"),
	new specieDefault("pony"),
	new specieDefault("puffin"),
	new specieDefault("pygs"),
	new specieDefault("pyroguin"),
	new specieDefault("robopenguin"),
	new specieDefault("rockhopperpenguin","Rock Hopper Penguin"),
	new specieDefault("rodentia"),
	new specieDefault("saturn"),
	new specieDefault("Speciesorsheep"),
	new specieDefault("sergal"),
	new specieDefault("shade"),
	new specieDefault("shadow2"),
	new specieDefault("skath"),
	new specieDefault("skelekin"),
	new specieDefault("slimeperson","Slime Person"),
	new specieDefault("su_gem"),
	new specieDefault("tauren"),
	new specieDefault("terrakin"),
	new specieDefault("tirastrolls","Tiras Trolls"),
	new specieDefault("trink"),
	new specieDefault("troll"),
	new specieDefault("unicorn"),
	new specieDefault("vampyric"),
	new specieDefault("vanillapenguin","Vanilla Penguin"),
	new specieDefault("vespoid"),
	new specieDefault("viera"),
	new specieDefault("vulpes"),
	new specieDefault("wasphive"),
	new specieDefault("webber"),
	new specieDefault("woggle"),
	new specieDefault("zombie")
];
Object.freeze(species);
const speciesEl={};
let[li,btn,img,img2,div]=baseLi;
for(let i in species){
	let el=li.cloneNode();
	el.setAttribute("value",species[i].value);
	el.id=species[i].value;
	let b=btn.cloneNode();
		b.innerHTML=species[i].name;
		let imgM=img.cloneNode();
			imgM.src=species[i].img[0];
		let imgM2=img2.cloneNode();
			imgM2.src=species[i].img[1];
			b.append(imgM,imgM2);
	el.append(b,div.cloneNode(true));
	speciesEl[species[i].value]=el;
}

Object.freeze(speciesEl);