import { EZD64H } from "./config.js";

import EZD64HActor from "./ezd64h-actor.js";
import EZD64HItem from "./ezd64h-item.js";

import EZD64HItemSheet from "./sheets/ezd64h-item-sheet.js";
import EZD64HCharacterSheet from "./sheets/ezd64h-character-sheet.js";

Hooks.once("init", function() {

	console.log("EZD64H | Initializing EZD6: The Four Horsemen")
	
	CONFIG.EZD64H = EZD64H;

	CONFIG.Actor.documentClass = EZD64HActor;
	CONFIG.Item.documentClass = EZD64HItem;

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("ezd6fourhorsemen", EZD64HCharacterSheet, { makeDefault: true });

	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("ezd6fourhorsemen", EZD64HItemSheet, { makeDefault: true });
});