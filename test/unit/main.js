describe("basic_test", function() {
  it("should work", function() {
    expect(true).toBe(true);
  });
  
  it("returns person with lastName Howard", function() {
    var person = run();
    expect(person.lastName).toEqual("Howard");
  });
  
  it("returns person with firstName Jerome", function() {
    var person = run();
    expect(person.firstName).toEqual("Jerome");
  })
  
})