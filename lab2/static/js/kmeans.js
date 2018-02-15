/**
* k means algorithm
* @param data
* @param k
* @return {Object}
*/

function kmeans(data, k) {

    //Implement the algorithm here..
    //Remember to reference any code that you have not implemented yourself! 
	
	var newError = 50000000000000;
	var oldError = 55000000000000;
	
	var keys = Object.keys(data[0]); //datans dimensioner
	
		
	//Randomly place K number of centroids
	  var clusters = [], indices = [], assignments = [];
	  for (var i = 0; i < k; ++i) {
		var pos = Math.random(0, data.length);
		
		var clone = Object.assign({}, data[pos]);
		clusters.push(clone);
		
	  }
	  
	  indices.push(pos);
	  

		  
		
	while(newError < oldError)
	{
		  oldError = newError;
		  
		  //Assign clusters
			 				
				for(var i=0; i<data.length;i++)
				{
					var nearestValue = Infinity, nearestIndex = -1;
					
					for(var j=0; j<k;j++)
					{
						var dist = Math.sqrt(squaredDiffSum(clusters[j], data[i]));
						
						if (dist < nearestValue) 
						{
							nearestValue = dist;
							nearestIndex = i;
						}
					}
					assignments[i] = nearestIndex;
				}

		  
		  //calculate new centroids
			
			var dimMedel;	  
			
			  for(var i=0; i<k;i++) //varje kluster
			  {
				  dimMedel = 0;
				  
				  for(var dim=0;dim<keys.length ;dim++)//varje dimension
				  {
					  for(var j=0;j<data.length; j++) //varje data entry
					  {
						  if(assignments[i] == dim)
							dimMedel += data[j][dim];
					  }
					 dimMedel = dimMedel/keys.length; //medelvärdet för varje dimension
					 
					 clusters[i][dim] = dimMedel; //assign new centroid
				  }				
			  }	
			  

		  
		  
		  
			
			
			var totalError = 0;
		  
			for(var i=0; i<k;i++) //varje kluster
			{
				  
				  var clusterError = 0;
				  var dimError;
				  
				  for(var dim=0;dim < keys.length ;dim++)//varje dimension
				  {
					  
					  dimError = 0;

					  for(var j=0;j<data.length; j++) //varje data entry
					  {
						  
						  dimError += squaredDiffSum(data[j],clusters[i][dim]);
						  //console.log("dimError= " + dimError[dim]);
					  }
					
					clusterError += dimError;
					console.log("clusterError= " + clusterError);
				  }
				  
				totalError += clusterError;  
				
			}	
			  
		

		var newError = totalError;
		console.log("newError= " + newError);
		console.log("oldError= " + oldError);
	}
		
		
	
	return assignments;
};


function squaredDiffSum(a, b) {
	  var valA = d3.values(a),
	      valB = d3.values(b);
	  var num = Math.max(valA.length, valB.length),
	      tot = 0;
	  for (var i = 0; i < num; ++i) {
	    var p = parseFloat(valA[i]) || 0,
	        q = parseFloat(valB[i]) || 0;
	    tot += Math.pow(p - q, 2);
	  }
	  return tot;
	}

