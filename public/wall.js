(function generate_table() {

  // create table and append to body
  var body = document.getElementsByTagName("body")[0];
  var tbl = document.createElement("table");
  tbl.id = "table"
  var tblBody = document.createElement("tbody");
 
  // build the first row of builable bricks
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

  // add row (Function)
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

  // add row button (Event)
  $('#add-row').click(function() {
  	addRow();
  })

  // build a brick and make the brick above buildable (Event)
  $('.brick-buildable').on('click', function () {
  	$(this)[0].className = 'brick-built';
	  getBrickAbove.apply(this);
  });
  

  // make the brick above buildable (Function)
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

  // add 10 rows
  for (var t = 0; t < 12; t++) {
    addRow();
  };

})();