macro _member{
	rule{ $name:ident($arg:ident (,) ...){ $body ...}
	}=>{  $name($arg (,) ...){ $body ...}
	}

	rule{ $name:ident($arg:ident (,) ...) => $exp:expr; 
	}=>{  $name($arg (,) ...) { return $exp } 
	}
}

macro log{
	rule{$x:expr} => {console.log($x)}
}

macro member{

	rule{ $name:ident($arg:ident (,) ...){ $body ... }
	}=>{  $name : function($arg (,) ...){ $body ...}
	}

	rule{ $name:ident($arg:ident (,) ...) $exp:expr;
	}=>{  $name : function($arg (,) ...) { $exp } 
	}

	rule{ $name:ident($arg:ident (,) ...) => $exp:expr; 
	}=>{  $name : function($arg (,) ...) { return $exp } 
	}

	rule{ $name:ident : $value:expr } => { $name:$value }

	rule{ set $m:_member } => { set $m }
	rule{ get $m:_member } => { get $m }

}

macro => {

  rule infix { $[&]() | {$body ...} } => {
       (function() { $body ...  } ) ()
  }
  rule infix { $[&]( $($arg:ident = $val:expr) (,) ...) | {$body ...} } => {
       (function($arg (,) ...) { $body ...  } ) ($val (,) ...)
  }
  rule infix { $[&]() | $body:expr } => {
       (function() { return $body } ) ()
  }
  rule infix { $[&]( $($arg:ident = $val:expr) (,) ...) | $body:expr } => {
       (function($arg (,) ...) { return $body } ) ($val (,) ...)
  }
  rule infix { ($arg (,) ...) | {$body ...} } => {
      function($arg (,) ...) { $body ...  }
  }
  rule infix { ($arg (,) ...) | $exp:expr } => {
      function($arg (,) ...) { return $exp }
  }
  rule infix { $n($arg (,) ...) | {$body ...} } => {
      function $n($arg (,) ...) { $body ...  }
  }
  rule infix { $n($arg (,) ...) | $exp:expr } => {
      function $n($arg (,) ...) { return $exp }
  }
}

macro bind {
	case { _ $id:ident($arg:ident (,) ...) } => {
		letstx $memb = [makeValue(unwrapSyntax(#{$id}), #{here})];
		return #{this.binds($memb, $arg (,) ...)}
	}
	case { _ $id:ident } => {
		letstx $memb = [makeValue(unwrapSyntax(#{$id}), #{here})];
		return #{this.binds($memb)}
	}
 }

macro isStr{rule infix{ $d:expr |} => {typeof $d=="string"}}
macro isFun{rule infix{ $d:expr |} => {typeof $d=="function"}}
macro isObj{rule infix{ $d:expr |} => {typeof $d=="object"}}
macro isNum{rule infix{ $d:expr |} => {typeof $d=="number"}}
macro isBool{rule infix{ $d:expr |} => {typeof $d=="boolean"}}

macro dom{
	case { _ $id:ns_method $cls:dom_cls } => {
		for(var x=#{$id}, lol = "", i=x.length; i--;) lol = x[i].token.value + lol;
		letstx $path = [makeValue(lol, #{here})];
		return #{ define($path, $cls) }
	}
 }
macro ns_method {
  rule { $prop:ident $rest:ns_prop }
 }
macro ns_prop {
  rule { . $prop:ident $rest:ns_prop }
  rule { }
 }

let % = macro{
	rule{ {$m:member ...} } => {{$m (,) ...}}
	rule{ $n $c:% } => {$n = $c}
	rule infix{ $x:expr | $y:expr } => { $x % $y }
 }
macro dom_cls{
	rule{ { $($name:cls_name $body:cls_memb) ... } }=>{ { $($name : $body) (,) ... } }
 }
macro cls_name{
	rule{ self } => { _ }
	rule{ $x:ident } => { $x }
 }
macro cls_memb{
	rule{ $wtf:% } => { $wtf }
	rule{ {$m:member ...} } => { {$m (,) ...} }
	rule{ $cls:dom_cls ... } => { $cls (,) ... }
	rule{ ($args:ident (,) ...){$body ...} } => { function($args (,) ...){$body ...} }
 }



export dom
export %
export isStr
export isFun
export isObj
export isNum
export isBool
export OBJ
export when
export bind
export contains
export =>