/**
 * Module example
 */

function Classroom() {

  this.students = [ "Jim", "David", "Hunter", "Dustan", "Jason", "Bryan", "Christine", "Joshua" ];

}

Classroom.prototype = {

  getStudents: function getStudents(callback) {
    return callback(null, this.students);
  },

  getStudentById: function getStudentById(id, callback) {
    if (!this.students[id]) return callback(new Error("No student found with that id: " + id));

    return callback(null, this.students[id]);
  }

};


module.exports = new Classroom();