App = {

  init: async function() {
    // Load pets.
	fetch('/myserver/petSelect')
	.then(response => response.json() )
    .then(function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', "../"+data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initContract();
  },

  initContract: function() {
    App.markAdopted();
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    fetch('/myserver/adoptSelect')
    .then(response => response.json() )
	.then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        $('.panel-pet').eq(adopters[i]).find('button').text('Success').attr('disabled', true);
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
	let result = {
		id: petId,
		price: 3000000
	}

    fetch('/myserver/adoptInsert?id'+petId, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(result)
	})
	  .then(response => console.log(response))
	  .then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
