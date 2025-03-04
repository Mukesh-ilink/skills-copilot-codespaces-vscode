function skillsMember() {
    return {
        name: 'John Doe',
        age: 30,
        skills: ['HTML', 'CSS', 'JS'],
        details: function() {
            return `Name: ${this.name}, Age: ${this.age}, Skills: ${this.skills.join(', ')}`
        }
    }
}