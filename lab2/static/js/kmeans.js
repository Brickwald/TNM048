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
	  var clusters = [], assignments = [];
	  for (var i = 0; i < k; ++i) {
		//var pos = Math.random(0, data.length);
		var pos = Math.floor((Math.random() * data.length));
		
		var clone = Object.assign({}, data[pos]);
		clusters.push(clone);
		
	  }
	  
	 
	  
	var datError = 1;
		  
		
	while(datError > 0.0001) //daterror blir negativ ibland
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
							nearestIndex = j;
							//console.log("nearest= " + nearestValue + " dist= " +dist + " j= " + j + " nearetIndex= "+ nearestIndex); 
						}
						//console.log("nearest= " + nearestIndex + " j= " +j); 
					}
					
					assignments[i] = nearestIndex;
				}

		  
		  //calculate new centroids
			
			var dimMedel;	  
			
			  for(var i=0; i<k;i++) //varje kluster
			  {
				  dimMedel = 0;
				  var counter = 0;
				  for(var dim=0;dim<keys.length ;dim++)//varje dimension
				  {
					  for(var j=0;j<data.length; j++) //varje data entry
					  {
					
						  if(assignments[j] == i)
						  {
							dimMedel += parseFloat(d3.values(data[j])[dim]);
							counter++;
						  }
					  }
					  
					  //console.log("counter" + counter); 
		  
					 dimMedel = dimMedel/counter; //medelvärdet för varje dimension
					 
					 
					 clusters[i][dim] = dimMedel; //assign new centroid
					 
					 //console.log(typeof clusters[i][dim]);
				  }
				  counter = 0;
				  
			  }	
			  
				//console.log("cluster= " + clusters[1][1]); 
		  
			
			var totalError = 0;
		  
			for(var i=0; i<k;i++) //varje kluster
			{
				  
				  var clusterError = 0;
				  
					  for(var j=0;j<data.length; j++) //varje data entry
					  {
						  if(assignments[j] == i)
							clusterError += squaredDiffSum(data[j],clusters[i]);
						  //console.log("dimerroe= "+ dimError);
					  }
					
					//console.log("clusterError= " + clusterError)
				  
				totalError += clusterError;  
				
			}	
			  
		

		var newError = totalError;
		//console.log("newError= " + newError);
		//console.log("oldError= " + oldError);
		
		datError = oldError - newError;
		console.log("datError= " + datError);
	}
		
		
	
	return assignments;
};


function squaredDiffSum(a, b) {
	  var valA = d3.values(a),
	      valB = d3.values(b);
	  var num = Math.max(valA.length, valB.length),
	      tot = 0;
	  for (var i = 0; i < num; ++i) {
	    var p = parseFloat(valA[i]),
	        q = parseFloat(valB[i]);
	    tot += Math.pow(p - q, 2);
	  }
	  return tot;
	}

