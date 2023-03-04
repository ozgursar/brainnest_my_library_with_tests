import Storage from '../storage'

test('Should be able to return empty array of books in local storage is not set', () => {
  expect(Storage.getBooks().length).toBe(0)
})
