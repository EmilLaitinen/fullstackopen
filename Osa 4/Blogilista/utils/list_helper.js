const dummy = (blogs) => {
    return 1
  }


  const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => {
        likes += blog.likes
    }) 
     return likes
  }

  const mostBlogs = (blogs) => {
      let authors = []
      let blogss = []
      let index = 0
// Etsii kaikki uniikit kirjailijat
      blogs.forEach(blog => {
          if (!authors.includes(blog.author)) {
              authors.push(blog.author)
          }
      })
// Etsii kirjailijan yhteenlasketut blogit ja laittaa ne uuteen listaan samaan indeksiin kuin kirjailija
      while (index < authors.length) {
        blogs.forEach(blog => {
            if (authors[index] === blog.author) {
                if (!blogss[index]) {
                    blogss.push(1)
                } else {
                    blogss[index]++
                }
            }
        }) 
        index++
      }
      let mostBlogs = -1
      let mostBlogsAuthor = -1
      let index2 = 0
// Etsii kirjailijan jolla on eniten blogeja
      blogss.forEach(blog => {
          if (blog > mostBlogs) {
              mostBlogs = blog
              mostBlogsAuthor = index2
          } index2++
      })

      return {
        author: authors[mostBlogsAuthor],
        blogs: mostBlogs
    }
  }
  

  const favoriteBlog = (blogs) => {
    let maxLikes = 0
    blogs.forEach(blog => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
        }
    }) 
     return maxLikes
  }

  const mostLikes = (blogs) => {
      let authors = []
      let likes = []
      let index = 0
// Etsii kaikki uniikit kirjailijat
      blogs.forEach(blog => {
          if (!authors.includes(blog.author)) {
              authors.push(blog.author)
          }
      })
// Etsii kirjailijan yhteenlasketut tykkäykset ja laittaa ne uuteen listaan samaan indeksiin kuin kirjailija
      while (index < authors.length) {
        blogs.forEach(blog => {
            if (authors[index] === blog.author) {
                if (!likes[index]) {
                    likes.push(blog.likes)
                } else {
                    likes[index] += blog.likes
                }
            }
        }) 
        index++
      }
      let mostLikes = -1
      let mostLiked = -1
      let index2 = 0
// Etsii kirjailijan jolla on eniten tykkäyksiä
      likes.forEach(like => {
          if (like > mostLikes) {
              mostLikes = like
              mostLiked = index2
          } index2++
      })

      return {
        author: authors[mostLiked],
        likes: mostLikes
    }
  }

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
  }