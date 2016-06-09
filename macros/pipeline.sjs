let (>>) = macro {

    case infix { $l:expr | _ $r:nested_ident[] } => {
        return #{$r[$l]};
    }

    case infix { $l:expr | _ $r:nested_ident() } => {
        return #{$r($l)};
    }

    case infix { $l:expr | _ $r:nested_ident($args (,) ...) } => {
        var referenced = false;
        var args = (function (list, refs) {
            var result = [];
            var length = list.length >>> 0;
            for (var i = 0; i < length; i++) {
                var item = list[i];
                if ('&' === item.token.value) {
                    referenced = true;
                    result.push.apply(result, refs);
                } else {
                    result.push(item);
                }
            }

            return result;
        })(#{$args...}, #{$l});

        letstx $args... = args;
        return referenced ? #{$r($args (,) ...)} : #{$r($args (,) ..., $l)};
    }


    case infix { $l:expr | _ $r:nested_ident } => {
        return #{$r($l)};
    }


}

macro nested_ident {
  rule { $prop:ident $rest:ns_prop }
 }
macro ns_prop {
  rule { . $prop:ident $rest:ns_prop }
  rule { }
 }


export >>