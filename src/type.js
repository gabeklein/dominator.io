Type() => {
	(this.element = New(this.element)).type = this;
	this.defs = {};
	this.atrs = {};
	this.clss = [];
}

Type.prototype >> copyToForIn(%{

	didInsert(instance, args){
		if(this.ON){
			args = this.ON.apply(instance, args);
			if(args isFun) Build(args, instance)
		}
		if(this.DO && (!args || (args.length isNum))) Build(this.DO, instance, args)
	}

	get willClose(){
		var after = this.IN;
		return (instance, cache) => { after && after.call(instance, cache); }
	}

	element: @import "element.js";

});
