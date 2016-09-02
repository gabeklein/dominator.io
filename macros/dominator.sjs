//MAIN

	macro def{
		case { _ $id:ns_method $cls:dom_cls } => {
			for(var x=#{$id}, lol = "", i=x.length; i--;) lol = x[i].token.value + lol;
			letstx $path = [makeValue(lol, #{here})];
			return #{ define($path, $cls) }
		}
	 }
	 	macro ns_method {
			rule { $prop:ident $rest:ns_method }
			rule { . $rest:ns_method}
			rule { }
		 }

	macro bind {
		case { _ $id:ident() } => {
			letstx $memb = [makeValue(unwrapSyntax(#{$id}), #{here})];
			return #{this.binds($memb)}
		}
		case { _ $id:ident($arg:ident (,) ...) } => {
			letstx $memb = [makeValue(unwrapSyntax(#{$id}), #{here})];
			return #{this.binds($memb, $arg (,) ...)}
		}
		case { _ $id:ident } => {
			letstx $memb = [makeValue(unwrapSyntax(#{$id}), #{here})];
			return #{this.binds($memb)}
		}
	 }

export def
export bind

//SUPPORT

macro dom_cls{
	rule{ { $m:cls_memb ... } }=>{ { $m (,) ... } }
 }

macro cls_memb{

	rule{$id:ident{$m:cls_memb ...}} => {
		$id : { $m (,) ... }
	}

	rule{ $nm:ident $ag:args $by:body }
	  =>{ $nm : function $ag $by }

	rule{ $gs:accessor $nm:ident $ag:args $by:body }
	  =>{ $gs $nm $ag $by }

	rule{ $dom:parser }

	rule{ $id:ident[$cell (,) ...] } => {$id : [$cell (,) ...]}

	rule{ $name:ident : $value:expr }
 }

	macro accessor{
		rule{get}
		rule{set}
	}

	macro args{
		rule{ ($arg:ident (,) ...) }
	}

	macro body{
		rule{ {$body ...}  }
		rule{ $exp:expr    } => { {$exp       } }
		rule{ => $exp:expr } => { {return $exp} } 
	}


macro parser{
	rule{return $dom:expr}
	  =>{ DO:function($){return $dom} }

	rule{carrots} => {carrots:true}
	// rule{this{ $a ... do: $v:element ... ; $b ...}} => {ON:function(){ $a ... ;this.DO  $v ... .END; $b ...}}
	// rule{this: $v:element ... ;} => {DO:function(_){return _ $v ...}}
	// rule{return{  }} => {DO:function(_){return _ $v ...}}
}

	// macro element{
	// 	case{_ $e:e_type > $x:element} => {
	// 		// return #{element $e : $x;}
	// 		var e = #{$e};
	// 		e[e.length-1].token.inner.push(makePunc(',', #{here}), makeValue(1,#{here}))
	// 		letstx $n = e;
	// 		return #{$n $x}
	// 	}
	// 	case{_ $e:e_type : $x:element ... ;} => {
	// 		var i = #{($x) ...}.length, e = #{$e};
	// 		e[e.length-1].token.inner.push(makePunc(',', #{here}), makeValue(i,#{here}))
	// 		letstx $n = e;
	// 		return #{$n $x ...}
	// 	}
	// 	rule{$e:e_type} => {$e}
	//  }

		// macro e_type{
		// 	rule{ $name:ident ($x:e_args) } => { .$name $x }
		// 	case{ _ $name:e_thing [$x:e_args] } => {
		// 		var x = #{$x}, i=unwrapSyntax(x).inner, a=[makeValue(unwrapSyntax(#{$name}), #{here})];
		// 		if(i.length) a.push(makePunc(',', #{here}));
		// 		[].unshift.apply(i, a);
		// 		letstx $n = x;
		// 		return #{ $n } 
		// 	 }
		// 	case{ _ $name:e_thing } => {
		// 		for(var x=#{$name}, lol = "", i=x.length; i--;) lol = x[i].token.value + lol;
		// 		letstx $atrs = [makeValue(lol, #{here})];
		// 		return #{($atrs)}
		// 	 }
		//  }
		// macro element{
		// 	case{_ $e:e_type > $x:element} => {
		// 		// return #{element $e : $x;}
		// 		var e = #{$e};
		// 		e[e.length-1].token.inner.push(makePunc(',', #{here}), makeValue(1,#{here}))
		// 		letstx $n = e;
		// 		return #{$n $x}
		// 	}
		// 	case{_ $e:e_type : $x:element ... ;} => {
		// 		var i = #{($x) ...}.length, e = #{$e};
		// 		e[e.length-1].token.inner.push(makePunc(',', #{here}), makeValue(i,#{here}))
		// 		letstx $n = e;
		// 		return #{$n $x ...}
		// 	}
		// 	rule{$e:e_type} => {$e}
		//  }

			macro do_delim{
				rule{;}
				rule{-}
				rule{end}
			}
			macro e_token{
				rule{&}
				rule{#}
				rule{.}
				rule{@}
			}
			macro e_thing{
				rule{$x:lit}
				rule{$x:ident}
			}
	



	// macro e_name{
	// 	rule { $x:ident $r:e_atr}
	// 	rule { &$x:ident $r:e_atr}
	//  }
	// macro e_atr{
	// 	case {$x:e_token $y:ident $r:e_atr} => {
	// 		letstx $wat = [makeValue(unwrapSyntax($x) + unwrapSyntax($y) + unwrapSyntax($r), #{here})];
	// 		return #{$wat}
	// 	}
	// 	rule {}
	//  }




// macro e_args{
// 	case{ _ $a:e_arg (,) ... } => {
// 		var a = #{$a ...}, b, f=[];
// 		for(var i=0, j, p=[].push, c=makePunc(",", #{here}); j=a[i++];){
// 			if(j.token.value=="{}"){
// 				if(b) b.push(c); 
// 				else  f.push(c, makeDelim("{}", b=[], #{here}));
// 				p.apply(b, j.token.inner)
// 			} else {
// 				f.push(c, j);
// 			}
// 		}
// 		letstx $wat = [makeDelim("()", f.slice(1), #{here})];
// 		return #{ $wat }
// 	}
//  }
// macro e_arg {
// 	rule{$a:ident : $b:expr} => { {$a : $b} }
// 	rule{$d:expr} => {$d}
//  }
