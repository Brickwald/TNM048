queue()
  .defer(d3.csv,'Given_Newborn_Name_by_Year.csv')
  .await(draw);

var sp, pc, map;

function draw(error, data){
  if (error) throw error;

	pc = new graf(data);
}
