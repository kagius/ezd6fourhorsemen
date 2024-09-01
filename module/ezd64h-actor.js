export default class EZD64HActor extends Actor {

  _safePrepareData() {
    super._safePrepareData();
  }

  prepareBaseData() {
  }

  async addStrike() {
    const strikes = this.system.strikes;
    const newValue = strikes.value < strikes.max 
      ? strikes.value +1 
      : strikes.max;
    
    if (newValue !== strikes.value) {
      await this.update({"system.strikes.value": newValue});

      if (newValue == strikes.max)
        await this._onDeath();
    }
  }

  async removeStrike() {
    const strikes = this.system.strikes;
    const newValue = strikes.value > 0
      ? strikes.value -1 
      : 0;
    
    if (newValue !== strikes.value)
      await this.update({"system.strikes.value": newValue});
  }

  async addStress() {
    const strikes = this.system.strikes;
    const stress = this.system.stress;

    const newValue = stress.value < strikes.max 
      ? stress.value +1 
      : strikes.max;
    
      if (newValue == strikes.max){
        await this.update({"system.stress.value": 0});
        await this.addStrike();
        
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({actor: this}),
          content: game.i18n.format("EZD64H.StressDamage", { actorName : this.name })
        });
      }
      else if (newValue !== stress.value)
        await this.update({"system.stress.value": newValue});
  }

  async removeStress() {
    const stress = this.system.stress;
    const newValue = stress.value > 0
      ? stress.value -1 
      : 0;
    
    if (newValue !== stress.value)
      await this.update({"system.stress.value": newValue});
  }

  async _onDeath() {
    // Determine if this character has the Tough Bastard inclination

    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({actor: this}),
      content: game.i18n.format("EZD64H.Death", { actorName : this.name })
    });
  }
}