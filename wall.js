var jq = document.createElement('script');
jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.querySelector('head').appendChild(jq);

console.log('yoooo')
(function generate_table() {

  // variable setting for table elements
  var body = document.getElementsByTagName("body")[0];
  var tbl = document.createElement("table");
  tbl.id = "table"
  var tblBody = document.createElement("tbody");
 
  // build the table, specify row and column params
  var row = document.createElement("tr");
  row.id = 0;
 
  for (var j = 0; j <= 10; j++) {
    var brick = document.createElement("td");
    brick.id = 0 + "_" + j;
    brick.className = 'brick-buildable';
    row.appendChild(brick);
  }

  tblBody.insertBefore(row, tblBody.childNodes[0]);
  tbl.appendChild(tblBody);
  body.appendChild(tbl);


  // add a row when wall gets to high
  function addRow() {
  	rowId = Number(tblBody.childNodes[0].id)+1
  	var row = document.createElement("tr");
 	  row.id = rowId;

    for (var j = 0; j <= 10; j++) {
      var brick = document.createElement("td");
      brick.id = rowId + "_" + j;
      brick.className = 'brick';
      row.appendChild(brick);
    }
  	tblBody.insertBefore(row, tblBody.childNodes[0]);
  }


  // add row of bricks to top of wall
  $('#add-row').click(function() {
  	addRow();
  })

  // apply events on brick-clicking
  $('.brick-buildable').on('click', function () {
  	$(this)[0].className = 'brick-built';
	  getBrickAbove.apply(this);
  });
  

  function getBrickAbove() {
    column = $(this)[0].id.split('_')[1];
    row = Number($(this)[0].id.split('_')[0]) + 1;
    revealId = row.toString() + '_' + column;
    x = $('#' + revealId)
    x.attr('class','brick-buildable');
    x.on('click', function () {
      $(this)[0].className = 'brick-built';
      getBrickAbove.apply(this);
    });
  }

  for (var t = 0; t < 12; t++) {
    addRow();
  };

})();