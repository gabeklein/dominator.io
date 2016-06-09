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