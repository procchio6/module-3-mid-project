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
    $('#petResults').empty()
    offset = 0
    $('#loadMore').hide()
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
  modal.find('.modal-body').empty().append(
    `<p>${pet.description}</p>`
  )
}

function handlePetSearch(event) {
  event.preventDefault()
  $('#petResults').empty()
  offset = 0
  zipCode = $('#zipCode').val()
  getPets(zipCode, showPets)
}

function showPets(pets) {
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
