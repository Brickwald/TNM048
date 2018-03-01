queue()
  .defer(d3.csv,'Given_Newborn_Name_by_Year.csv')
  .await(draw);

var sp, pc, map, theList, selected = [];

function draw(error, data){
  if (error) throw error;
  
	
	selected = data; 
	theList = makeUL(data);
	pc = new graf(selected);
}


function makeUL(array) {
    // Create the list element:
    var list = document.getElementById('listan');
	console.log(1);
    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(d3.values(array[i])[0]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("listan");
    a = div.getElementsByTagName("li");
	console.log("a=" + a);
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

document.getElementById('listan').addEventListener('click',function(ev){

	var children = document.getElementById('listan').getElementsByTagName("li");
	for(var i=0; i<children.length; i++)
	{
		if(ev.target.innerText == children[i].innerText)
		{
			
		}
			console.log(i);
	}

	if(ev.target.tagName == 'LI')
	{
		
		console.log(ev.target.innerText);
	}
	
},false);