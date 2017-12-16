function testErrorFromFile() {
  (function demoClosure() {
    notFound();
  })();
}

function promiseUnhandle() {
  Promise.reject(new Error('woops'));
}
