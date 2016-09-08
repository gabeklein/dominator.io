macro isStr{ rule infix{ $d:expr |} => {typeof $d=="string"}}
macro isFun{ rule infix{ $d:expr |} => {typeof $d=="function"}}
macro isObj{ rule infix{ $d:expr |} => {typeof $d=="object"}}
macro isNum{ rule infix{ $d:expr |} => {typeof $d=="number"}}
macro isBool{rule infix{ $d:expr |} => {typeof $d=="boolean"}}

//macro (|>) {
//  rule infix { $lhs:expr | $rhs:expr ($arg:expr (,) ...) } => {
//    $rhs()
//  }
//}

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
	rule infix { $args | $b:body } => {
	  function $args $b
	}
	rule infix { $n $args | $b:body } => {
	  function $n $args $b
	}
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
	rule{ {$m:member ...} } => {{$m (,) ...}}
	rule{ $n $c:% } => {$n = $c}
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

export __args
export gets
export isStr
export isFun
export isObj
export isNum
export isBool
export %
export =>
//export |>
