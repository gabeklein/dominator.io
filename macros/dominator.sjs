macro contains {
	rule infix {
		App($arg:ident (,) ...){$init ...} | {$members:member ...}
	} => {
		l(function($arg (,) ...){ $init ... }, { $members (,) ... })
	}
	case infix { $name:ident($arg:ident (,) ...){$init ...} | contains {$members:member ...} } => {
		letstx $tag = [makeValue(unwrapSyntax(#{$name}), #{here})];
		return #{ l($tag, function($arg (,) ...){ $init ... }, { $members (,) ... }) }
	}
}

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

let % = macro{
	rule{   {$m:member ...} } => {     {$m (,) ...}}
	rule{ $n{$m:member ...} } => {$n = {$m (,) ...}}
	rule infix{ $x:expr | $y:expr} => {$x % $y}
}

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