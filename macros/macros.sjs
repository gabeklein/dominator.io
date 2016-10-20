macro isStr{ rule infix{ $d:expr |} => {typeof $d=="string"}}
macro isFun{ rule infix{ $d:expr |} => {typeof $d=="function"}}
macro isObj{ rule infix{ $d:expr |} => {typeof $d=="object"}}
macro isNum{ rule infix{ $d:expr |} => {typeof $d=="number"}}
macro isBool{rule infix{ $d:expr |} => {typeof $d=="boolean"}}

macro => {
	rule infix { $[&]() | $n:ident $b:body } => {
	   (function $n() $b ) ()
	}
	rule infix { $[&]() | $b:body } => {
	   (function() $b ) ()
	}
	rule infix { $[&]( $($arg:ident = $val:expr) (,) ...) | $n:ident $b:body } => {
	   (function $n($arg (,) ...) $b ) ($val (,) ...)
	}
	rule infix { $[&]( $($arg:ident = $val:expr) (,) ...) | $b:body } => {
	   (function($arg (,) ...) $b ) ($val (,) ...)
	}
	rule infix { $args | $b:body2 } => {
	  function $args $b
	}
	rule infix { $n $args | $b:body2 } => {
	  function $n $args $b
	}
 }

 macro body2{
 	rule{ {$body ...} }
 	rule{ $body:expr } => {{return $body}}
 	rule{ $body:expr } => {{$body}}
 }

macro body{
	rule{ {$body ...} }
	rule{ => $body:expr } => {{return $body}}
	rule{ $body:expr } => {{$body}}
}

macro __args {
 	rule{($n:expr (,) ...)} => {cv(arguments, $n (,) ...)}
 	rule{} => {cv(arguments)}
}

let % = macro{
	rule infix{ $n:ident | {$m:member ...} } => {var $n = {$m (,) ...}}
	rule{ {$m:member ...} } => {{$m (,) ...}}
	rule infix{ $x:expr | $y:expr } => { $x % $y }
 }

macro args{
	rule{ ($arg:ident (,) ...) }
}

macro member{

	rule{ $nm:ident $ag:args $by:body }
	  =>{ $nm : function $ag $by }

	rule{ $gs:accessor $nm:ident $ag:args $by:body }
	  =>{ $gs $nm $ag $by }


	rule{ get $nm:ident $by:body }
	  =>{ get $nm () $by }

	rule{ $name:ident : $value:expr }

	rule{ $id:ident[$cell (,) ...] } => {$id : [$cell (,) ...]}

}

macro accessor{
	rule{get}
	rule{set}
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

 macro ns_method {
 	rule { $prop:ident $rest:ns_method }
 	rule { . $rest:ns_method}
 	rule { }
 }

 macro (>>) {

 	case infix { $val:expr | _ $fn:ns_method($args (,) ...) }
		=> { return #{ $fn($val, $args (,) ...) } }

	case infix { $val:expr | _ $fn:ns_method }
		=> { return #{ $fn($val) } }

 }

//macro (|=) {
//	case infix {$assign:expr | _ $value:expr } => {
//		return #{$assign || ($assign = $value)}
//	}
//}

export __args
export gets
export isStr
export isFun
export isObj
export isNum
export isBool
export %
export =>
export >>
