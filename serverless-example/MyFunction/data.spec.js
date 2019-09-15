function doAsync(callback1, callback2) {
  setTimeout(() => {
    callback1(true);
    setTimeout(() => {
      callback2(true);
    }, 2000);
  }, 2000);
}

test('doAsync calls both callbacks', done => {
  expect.assertions(2);
  function callback1(data) {
    expect(data).toBeTruthy();
  }
  function callback2(data) {
    expect(data).toBeTruthy();
    done();
  }
  doAsync(callback1, callback2);
});

