var wizard = {
	mana: 30,
	fireball: function() {
		console.log('Wizard casts a fireball with ' + this.mana + ' mana');
	}
};

wizard.fireball();
// 30 mana

var func = wizard.fireball;
func();
// undefined mana, context is rebound

/*
Since context binding is determined by the way you call this function, 
the context will change to window global variable.
*/
