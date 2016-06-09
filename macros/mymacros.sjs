macro isStr{ rule infix{ $d:expr |} => {typeof $d=="string"}}
macro isFun{ rule infix{ $d:expr |} => {typeof $d=="function"}}
macro isObj{ rule infix{ $d:expr |} => {typeof $d=="object"}}
macro isNum{ rule infix{ $d:expr |} => {typeof $d=="number"}}
macro isBool{rule infix{ $d:expr |} => {typeof $d=="boolean"}}

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

 macro ARGS{
 	rule{($n:expr (,) ...)} => {cv(arguments, $n (,) ...)}
 	rule{} => {cv(arguments)}
  }

let % = macro{
	rule{ {$m:member ...} } => {{$m (,) ...}}
	rule{ $n $c:% } => {$n = $c}
	rule infix{ $x:expr | $y:expr } => { $x % $y }
 }

macro args{
	rule{ ($arg:ident (,) ...) }
}

macro member{

	rule{ $name:ident $a:args { $body ... }      
	}=>{  $name : function $a { $body ... }
	}

	rule{ $name:ident $a:args $exp:expr;       
	}=>{  $name : function $a { $exp } 
	}

	rule{ $name:ident $a:args => $exp:expr     
	}=>{  $name : function $a { return $exp } 
	}

	rule{ $name:ident : $value:expr } => { $name:$value }

	rule{ set $m:_member } => { set $m }
	rule{ get $m:_member } => { get $m }

}

macro _member{
	rule{ $name:ident($arg:ident (,) ...){ $body ...}
	}=>{  $name($arg (,) ...){ $body ...}
	}

	rule{ $name:ident($arg:ident (,) ...) => $exp:expr; 
	}=>{  $name($arg (,) ...) { return $exp } 
	}
 }

 let gets = macro{
 	case infix{
 		$obj:ident | gets $name:ident $a:ag {$body ...}
 	} => {
 		letstx $accessor = [makeValue(unwrapSyntax(#{$name}), #{here})];
 		return #{ def($obj, $accessor, {get:function( $a ){$body ...}}) }
 	}
  }

 macro ag{
 	rule{($a ...)} => {$a ...}
 	rule{}
 }

export ARGS
export gets
export isStr
export isFun
export isObj
export isNum
export isBool
export %
export =>