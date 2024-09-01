import { EZD64H } from "../config.js";

export default class EZD64HItemSheet extends ItemSheet {
    get template() {
        return `systems/ezd6fourhorsemen/templates/sheets/items/${this.item.type}-sheet.hbs`;
    }

    getData(options) {
        const baseData = super.getData();
        const isOwned = (baseData.item.actor !== null)

        let sheetData = {
            owner: this.item.isOwner,
            editable: this.isEditable,
            item: baseData.item,
            system: baseData.item.system,
            isowned: isOwned,
            ezd64h: EZD64H
        }

        sheetData.itemType = game.i18n.localize(`ITEM.Type${sheetData.item.type.titleCase()}`)
        sheetData.enrichedDescription = TextEditor.enrichHTML(baseData.item.system.description, {async: false});

        return sheetData;
    }
}