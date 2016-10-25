((params) => {

	var repetitions,
		parentNode = push(1, finished);

	&() => {
		var args = cv(params), number = args.length, output = [],
			row, columnar, subject, i, j, k;

		if(isArr(args[0])){
			repetitions = args[0].length;
			for(i=0; subject = args[i++];)
				if(subject.length = repetitions) output.push(cache)
				else Err("Inupt arrays must be consistent");
		}
		else if((repetitions = args[0]) isNum){
			if(repetitions < 0){ repetitions*=-1; columnar = true;  }
			if(!repetitions==1) return; //uuuh that has a side-effect...
			for(i=0; subject = args[i++];)
				if((k = subject.length) == repetitions) output.push(cache)
				else for(j=0, k=k/repetitions; j<k; j++)
					output.push(cache.slice(repetitions*j, repetitions*j+repetitions))
		}
		else Err("Map requires a number or modal array.");

		params = [];

		for(i=0, number=output.length; i<repetitions; i++){
			params.push(subject = []);
			for(j=0; j<number;) subject.push(output[j++][i])
		}
	}

	SpawnOp = (type, args) => {
		var x, i;
		if(x = def.name) var list = Cache[x] = [];
		for(i=0; i<repetitions; i++){
			x = spawn(type, (args||[]).concat(params[i] || [], i), parentNode.node)
			list && list.push(x);
		}
	}

	finished() => {
		SpawnOp = spawn;
	}
	
})
