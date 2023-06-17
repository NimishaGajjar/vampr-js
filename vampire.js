
class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(Vampire) {
    return this.numberOfVampiresFromOriginal < Vampire.numberOfVampiresFromOriginal;
  }

  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;
    }
    let senior;
    let junior;
    if (this.isMoreSeniorThan(vampire)) {
      senior = this;
      junior = vampire;
    } else {
      junior = this;
      senior = vampire;
    }

    if (senior.isDirectAncestor(junior)) {
      return senior;
    } else {
      return senior.creator.closestCommonAncestor(junior);
    }

  }

  // is a direct ancestor
  // if they are one of my offspring
  //  ...or, they are a direct ancestor of one of my offspring

  isDirectAncestor(vampire) {
    if (this.offspring.includes(vampire)) {
      return true;
    } else {
      for (let v of this.offspring) {
        if (v.isDirectAncestor(vampire)) {
          return true;
        }
      }
    }
    return false;
  }

}


module.exports = Vampire;

