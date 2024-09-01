import { EZD64H } from "../config.js";

export default class EZD64HCharacterSheet extends ActorSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
          classes: ["sheet", "actor"],
          template: "systems/ezd6fourhorsemen/templates/sheets/actors/actor-sheet.hbs",
          width: 600,
          height: 600,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
        });
      }

    get template() {
        return `systems/ezd6fourhorsemen/templates/sheets/actors/${this.actor.type}-sheet.hbs`;
    }

    getData(options) {
        const sheetData = super.getData(options);
        const actorData = this.actor.toObject(false);
        sheetData.actor = actorData;
        sheetData.system = actorData.system;
        sheetData.config = EZD64H;        
        sheetData.enrichedDescription = TextEditor.enrichHTML(actorData.system.description, {async: false});

        sheetData.armor = sheetData.items.filter(function(item){ return item.type === "armor" && item.system.isEquipped; });
        sheetData.weapons = sheetData.items.filter(function(item){ return item.type === "weapon" && item.system.isEquipped; });
        sheetData.features = sheetData.items.filter(function(item){ return item.type === "feature"; });

        sheetData.stash =  sheetData.items.filter(function(item){ 
            return ((item.type === "weapon" ||
                    item.type === "armor" ||
                    item.type === "shield" ||
                    item.type === "equipment"
                ) && !item.system.isEquipped); 
        });

        return sheetData;
    }

    activateListeners(html) {

        var actor = this.actor;

        html.find('.strikes-minus').click(this._onRemoveStrikeClicked.bind(this));
        html.find('.strikes-plus').click(this._onAddStrikeClicked.bind(this));

        html.find('.stress-minus').click(this._onRemoveStressClicked.bind(this));
        html.find('.stress-plus').click(this._onAddStressClicked.bind(this));

        html.find('.doEquip').click(this._onEquipClicked.bind(this));
        html.find('.doUnequip').click(this._onUnequipClicked.bind(this));
        html.find('.doReload').click(this._onReloadClicked.bind(this));
        html.find('.doDiscard').click(this._onDiscardClicked.bind(this));
    }

    async _onAddStrikeClicked(event) { this.actor.addStrike(); }
    async _onRemoveStrikeClicked(event) { this.actor.removeStrike(); }

    async _onAddStressClicked(event) { this.actor.addStress(); }
    async _onRemoveStressClicked(event) { this.actor.removeStress(); }

    async _onEquipClicked(event) { 
        switch (event.currentTarget.dataset.type) {
            case "armor":
                // Unequip current armor if any
                break;
            case "weapon":
                // Equip new weapon
                break;
        }

        await this.doEquip(event.currentTarget.dataset.id);
    }

    async _onUnequipClicked(event) { 
        await this.doUnequip(event.currentTarget.dataset.id);
    }

    async _onReloadClicked(event) { 
        await this.doReload(event.currentTarget.dataset.id);
    }

    async _onDiscardClicked(event) { 
        await this.doDiscard(event.currentTarget.dataset.id);
    }

    async doEquip(id){
        this.actor.items.get(id).update({ system:{isEquipped:true}});
    }

    async doUnequip(id){
        this.actor.items.get(id).update({ system:{isEquipped:false}});
    }

    async doReload(id){
        // Todo: If in combat treat as action.

        var item = this.actor.items.get(id);

        item.update({ system:{isLoaded:true}});

        ChatMessage.create({
            speaker: ChatMessage.getSpeaker({actor: this.actor}),
            content: game.i18n.format("EZD64H.Reloaded", { 
                actorName : this.actor.name, 
                itemName: item.name 
            })
        });
    }

    async doDiscard(id){
        // Todo: add confirmation
        this.actor.items.get(id).delete();
    }
}