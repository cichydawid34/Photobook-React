import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { getUserByLoginAndPassword, getUserPosts } from './api/CallAPI'
import { useCookies } from 'react-cookie'
import Post from '../components/interfaces/post'
import User from '../components/interfaces/user'

export default function UserInfo() {
  const userLogin = useRef<HTMLInputElement>(null) // login = email
  const userPassword = useRef<HTMLInputElement>(null) // password = zipcode
  const [cookies, setCookie] = useCookies(['user'])
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Post[]>([])
  const [showPosts, setShowPosts] = useState<Boolean>(false)

  //Get User from cookie
  useEffect(() => {
    setUser(cookies.user)
  }, [])

  // Get user posts from API
  async function getPosts(e: SyntheticEvent) {
    e.preventDefault()
    setPosts(await getUserPosts(user))
    setShowPosts(true)
  }

  //Set Cookie of User
  useEffect(() => {
    if (user != null) {
      setCookie('user', user)
    }
  }, [user])

  return (
    <div className="max-w-2xl mx-auto loginPage">
      {user == null && (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          Log in
        </div>
      )}
      {user != null && (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="post p-6  bg-white rounded-lg text-gray-900 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h2>Hello {user.name}!</h2>
            <p className="mb-3">Name: {user.name}</p>
            <p className="mb-3">Username: {user.username}</p>
            <p className="mb-3">E-mail: {user.email}</p>
            <p className="mb-3">Phone: {user.phone}</p>
            <p className="mb-3">
              Website: <a href={'https://' + user.website}>{user.website}</a>
            </p>
            <h2>Address:</h2>
            <p className="mb-3">Street: {user.address?.street}</p>
            <p className="mb-3">Suite: {user.address?.suite}</p>
            <p className="mb-3">City: {user.address?.city}</p>
            <p className="mb-3">Zipcode: {user.address?.zipcode}</p>
            <h3>Geo:</h3>
            <p className="mb-3">lat: {user.address?.geo?.lat}</p>
            <p className="mb-3">lng: {user.address?.geo?.lng}</p>
            <h2>Company:</h2>
            <p className="mb-3">Name: {user.company?.name}</p>
            <p className="mb-3">Catch Phrase: {user.company?.catchPhrase}</p>
            <p className="mb-3">BS: {user.company?.bs}</p>
          </div>
          <h2 className="text-black">
            Your posts are listed below {user.name}!
          </h2>
          {!showPosts && (
            <div className="flex items-center justify-center h-5 ">
              <button
                type="submit"
                onClick={getPosts}
                className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Show your posts
              </button>
            </div>
          )}
          {showPosts &&
            posts.map((post: Post) => {
              return (
                <div
                  className="post p-6 bg-white rounded-lg text-gray-900 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                  key={post.id}
                >
                  <h2>{post.title}</h2>
                  <p className="mb-3">{post.body}</p>
                  <p className="mb-3 text-grey commentsPost float-right">
                    comments
                  </p>
                  <p className="mb-3  text-grey commentsPost float-left">
                    By {user.name}
                  </p>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
