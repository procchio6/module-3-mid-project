$(document).ready(function () {
  $('#petSearchForm').on('submit', handlePetSearch)
  $('#petModal').on('show.bs.modal', handleShowPet)
  $('.has-clear input[type="text"]').on('input propertychange', function() {
    var $this = $(this);
    var visible = Boolean($this.val());
    $this.siblings('.form-control-clear').toggleClass('hidden', !visible);
  }).trigger('propertychange');
  $('.form-control-clear').click(function() {
    $(this).siblings('input[type="text"]').val('')
      .trigger('propertychange').focus();
    resetPage()
  });
  $('#loadMore').on('click', function (event) {
    getPets(zipCode, showPets)
  })
})

let zipCode

function handleShowPet(event) {
  let petID = $(event.relatedTarget).data('petid')
  let modal = $('#petModal')
  modal.find('.modal-title').text('')
  modal.find('.modal-body').empty()

  getPet(petID, showPetProfile)
}

function showPetProfile(pet) {
  let modal = $('#petModal')
  modal.find('.modal-title').text(`${pet.name}`)
  let petDescription = pet.description
  if (petDescription == undefined) {
    petDescription = '<p>Description not available!</p>'
  }
  modal.find('.modal-body').empty().append(
    `<p>${petDescription}</p>`
  )
}

function handlePetSearch(event) {
  event.preventDefault()
  resetPage()
  zipCode = $('#zipCode').val()
  getPets(zipCode, showPets)
}

function showPets(pets) {
  $('.jumbotron').hide()
  let $petResults = $('#petResults')
  pets.forEach((pet, idx) => {
    let petHTML = pet.render()

    if ((idx+1) % 3 === 0) {
      petHTML += '<div class="clearfix"></div>'
    }

    $petResults.append(petHTML)
    $('#loadMore').show()
  })
}

function renderError(message) {
  errorHTML = `
  <div class="errorAlert alert alert-danger alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>${message}</strong>
  </div>
  `
  $('#error').html(errorHTML)
}

function resetPage() {
  $('.jumbotron').show()
  $('#petResults').empty()
  $('#error').empty()
  $('#loadMore').hide()
  offset = 0
}
