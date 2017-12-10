function testErrorFromFile() {
  (function demoClosure() {
    notFound();
  })();
}
