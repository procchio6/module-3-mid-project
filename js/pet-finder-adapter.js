let baseURL = 'http://api.petfinder.com/'
let key = '2db7adf34e5bb3a97a4baae9f27579e5'
let offset = 0
let petCount = 30

function getPets(zipCode, callback) {
  $.ajax({
    url: baseURL + `pet.find?format=json&key=${key}&location=${zipCode}&count=${petCount}&offset=${offset}`,
    method: 'GET',
    success: function (data) {
      if (data.petfinder.header.status.code.$t != "100") {
        renderError(data.petfinder.header.status.message.$t + '!')
        return
      }
      offset = data.petfinder.lastOffset.$t
      let pets = data.petfinder.pets.pet.map(petJSON => {
        return new Pet(petJSON)
      })
      callback(pets)
    }
  })
}

function getPet(petID, callback) {
  //use ajax to get a pet from api, then call parse pet
  $.ajax({
    url: baseURL + `pet.get?format=json&key=${key}&id=${petID}`,
    method: 'GET',
    success: function (data) {
      let pet = new Pet(data.petfinder.pet)
      callback(pet)
    }
  })
}
