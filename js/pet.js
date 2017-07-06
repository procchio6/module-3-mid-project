class Pet {
  constructor(petJSON) {
    this.id = petJSON.id.$t
    this.name = petJSON.name.$t
    this.species = petJSON.animal.$t
    this.breed = petJSON.breeds.breed.$t
    this.sex = petJSON.sex.$t
    this.description = petJSON.description.$t
    this.owner = new Owner(petJSON)

    if (petJSON.media.hasOwnProperty("photos")) {
      this.photo = petJSON.media.photos.photo[2].$t
    } else {
      this.photo = null
    }
  }

  render() {
    let petHTML = `
      <div class="col-sm-4">
        <a class="showPet" rel=${this.id} data-toggle="modal" data-target="#petModal" data-petid=${this.id}>
    `

    if (this.photo != null) {
      petHTML += `<img src="${this.photo}" class="img-responsive thumbnail">`
    } else {
      petHTML += '<img src="http://via.placeholder.com/300x300" class="img-responsive thumbnail">'
    }

    petHTML += `
        </a>
        <a class="showPet" rel=${this.id} data-toggle="modal" data-target="#petModal" data-petid=${this.id}>
          <h3>${this.name}</h3>
        </a>
        <p>
          ${this.breed == undefined ? '' : this.breed} ${this.species} ||
          ${this.sex == 'M' ? 'Male' : 'Female'}
          <br>
          ${this.owner.city}, ${this.owner.state}
        </p>
      </div>
    `
    return petHTML
  }
}

class Owner {
  constructor(petJSON) {
    this.phone = petJSON.contact.phone.$t
    this.email = petJSON.contact.email.$t
    this.state = petJSON.contact.state.$t
    this.city = petJSON.contact.city.$t
    this.zipCode = petJSON.contact.zip.$t
  }
}
