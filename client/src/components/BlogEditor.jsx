import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../imgs/logo.png"
import AnimationWrapper from '../common/page-animation'
import defaultBanner from "../imgs/blog banner.png"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRef } from 'react'



const BlogEditor = () => {

    let blogBannerRef = useRef()

    const handleBannerUpload = (e) => {
        console.log(e);
        let img = e.target.files[0]
        //let img = e.target.files[0].name

        if(img) {
            let formData = new FormData();
            formData.append('blog_banner', img);
            
            let loadingToast = toast.loading("Uploading...")
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/blog-banner-url", formData)
            .then(({ data }) => {
                blogBannerRef.current.src = data.blogBannerUrl;
                toast.dismiss(loadingToast)
                toast.success("Uploaded")
            })
            .catch(({ response }) => {
                console.log(response.data.message);
                toast.dismiss(loadingToast)
                toast.error("Failed to upload")
            });
        }
    }

  return (
    <>
        <nav className='navbar'>
            <Link to="/" className='flex-none w-10'>
                <img src={logo} />
            </Link>
            <p className='max-md:hidden text-black line-clamp-1 w-full'>
                New Blog
            </p>

            <div className='flex gap-4 ml-auto'>
                <button className='btn-dark py-2'>
                    Publish
                </button>
                <button className='btn-light py-2'>
                    Save Draft
                </button>
            </div>
        </nav>

        <AnimationWrapper>
            <section>
                <div className='mx-auto max-w-225 w-full'>
                    <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-gray-200'>
                        <label htmlFor='uploadBanner'>
                            <img 
                                ref={blogBannerRef}
                                src={defaultBanner}
                                className='z-20'
                            />
                            <input 
                                id="uploadBanner"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                hidden
                                onChange={handleBannerUpload}
                            />
                        </label>

                    </div>

                </div>
            </section>
        </AnimationWrapper>

        
    </>
    )
}

export default BlogEditor