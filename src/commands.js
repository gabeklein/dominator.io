var Commands = %{
	i(n){ this.$.is(n); return this;}
	o(name){ this.$.on(name); return this;}
	w(cond) {this.$.when(cond); return this;}
	m(){ this.$.map(arguments); return this;}
	M(){ this.a.$.map(arguments); return this;}
	get a(){
		this.$.expect(1); return this;
	}
	// get _(){
	// 	var c=this.$.Current;
	// 	if(c.i<0) this.$.Current.done();
	// }
	get END(){
		this.$.Current.done(); return this.$.cache;
	}
};
