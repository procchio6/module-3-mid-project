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
  });
})

function handleShowPet(event) {
  let petID = $(event.relatedTarget).data('petid')
  let modal = $('#petModal')
  modal.find('.modal-title').text('')
  modal.find('.modal-body').empty()

  getPet(petID, renderPetProfile)
}

function renderPetProfile(pet) {
  console.log(pet);
  let modal = $('#petModal')
  modal.find('.modal-title').text(`${pet.name}`)
  modal.find('.modal-body').empty().append(
    `<p>${pet.description}</p>`
  )

}

function handlePetSearch(event) {
  event.preventDefault()
  let zipCode = $('#zipCode').val()
  getPets(zipCode, renderPets)
}

function renderPets(pets) {
  let $petResults = $('#petResults')
  $petResults.empty()
  pets.forEach((pet, idx) => {
    let petHTML = `
      <div class="col-sm-4">
        <a class="showPet" rel=${pet.id} data-toggle="modal" data-target="#petModal" data-petid=${pet.id}>
    `

    if (pet.photo != null) {
      petHTML += `<img src="${pet.photo}" class="img-responsive thumbnail">`
    } else {
      petHTML += '<img src="http://via.placeholder.com/300x300" class="img-responsive thumbnail">'
    }

    petHTML += `
        </a>
        <a class="showPet" rel=${pet.id} data-toggle="modal" data-target="#petModal" data-petid=${pet.id}>
          <h3>${pet.name}</h3>
        </a>
        <p>
          ${pet.breed == undefined ? '' : pet.breed} ${pet.species} ||
          ${pet.sex == 'M' ? 'Male' : 'Female'}
          <br>
          ${pet.owner.city}, ${pet.owner.state}
        </p>
      </div>
    `
    if ((idx+1) % 3 === 0) {
      petHTML += '<div class="clearfix"></div>'
    }
    $petResults.append(petHTML)
  })
}
