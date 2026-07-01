import React from 'react'

const BlogPostCard = ({ content, author }) => {

    let { publishedAt, tags, title, des, banner, activity: {total_liks}, blog_id: id } = content;
    let { fullname, username, profile_img } = author;
  return (
    <div className='w-full'>
        <p>Blog Title : {title}</p>
    </div>
  )
}

export default BlogPostCard