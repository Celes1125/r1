const getUser = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users/1'
  const response = await fetch(url)
  const user = response.json()
  return user
}
export default getUser
