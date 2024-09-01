export default class EZD64HItem extends Item {

    _safePrepareData() {
      super._safePrepareData();
    }

    async _preCreate(data, options, userId) {
        await super._preCreate(data, options, userId);
    }

    async _preUpdate(changed, options, userId) {
        await super._preUpdate(changed, options, userId);
    }
}