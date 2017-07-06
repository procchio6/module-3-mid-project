let baseURL = 'http://api.petfinder.com/'
let key = '2db7adf34e5bb3a97a4baae9f27579e5'

function getPets(zipCode, callback) {
  $.ajax({
    url: baseURL + `pet.find?format=json&key=${key}&location=${zipCode}&count=30`,
    method: 'GET',
    success: function (data) {
      callback(parsePets(data))
    }
  })
}

function getPet(petID, callback) {
  //use ajax to get a pet from api, then call parse pet
  $.ajax({
    url: baseURL + `pet.get?format=json&key=${key}&id=${petID}`,
    method: 'GET',
    success: function (data) {
      callback(parsePet(data.petfinder.pet))
    }
  })
}

function parsePet(petJSON) {
  //create pet object from json returned from get pet

  let owner = new Owner(
    petJSON.contact.phone.$t,
    petJSON.contact.email.$t,
    petJSON.contact.state.$t,
    petJSON.contact.city.$t,
    petJSON.contact.zip.$t
  )

  let newPet = new Pet(
    petJSON.id.$t,
    petJSON.name.$t,
    petJSON.animal.$t,
    petJSON.breeds.breed.$t,
    petJSON.sex.$t,
    petJSON.description.$t,
    null,
    owner
  )
  if (petJSON.media.hasOwnProperty("photos")) {
    newPet.photo = petJSON.media.photos.photo[2].$t
  }
  return newPet
}

function parsePets(data) {
  return data.petfinder.pets.pet.map(pet => {
    return parsePet(pet)
  })
}
