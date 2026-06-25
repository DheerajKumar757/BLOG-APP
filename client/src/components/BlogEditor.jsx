import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from "../imgs/logo.png"
import AnimationWrapper from '../common/page-animation'
import defaultBanner from "../imgs/blog banner.png"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { EditorContext } from '../pages/Editor'
import EditorJS from "@editorjs/editorjs"
import { tools } from './Tools'



const BlogEditor = () => {

    let { blog, blog : { title, banner, content, tags, des }, setBlog } = useContext(EditorContext);

    // useEffect
    const editorRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: "textEditor",
                data: {},
                tools: tools,
                placeholder: "Let's write an awesome story",
            });
        }

        return () => {
            if (editorRef.current && typeof editorRef.current.destroy === "function") {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);


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
                //blogBannerRef.current.src = data.blogBannerUrl;
                setBlog({ ...blog, banner: data.blogBannerUrl});
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

const handleTitleKeyDown = (e) => {
    //console.log(e);
    if(e.keyCode == 13) {
        e.preventDefault()
    }
}

const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value})
}

const handleError = (e) => {
    let img = e.target;
    img.src = defaultBanner;
}

  return (
    <>
        <nav className='navbar'>
            <Link to="/" className='flex-none w-10'>
                <img src={logo} />
            </Link>
            <p className='max-md:hidden text-black line-clamp-1 w-full'>
                { title.length ? title : "New Blog"}
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
                                src={banner.length ? banner : defaultBanner}
                                className='z-20'
                                onError={handleError}
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

                    <textarea
                    placeholder='Blog Title'
                    className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight overflow-hidden placeholder:opacity-40'
                    onKeyDown={handleTitleKeyDown}
                    onChange={handleTitleChange}
                    >

                    </textarea>

                    <hr className='w-full opacity-10 my-5'/>

                    <div id="textEditor" className='font-gelasio'></div>

                </div>
            </section>
        </AnimationWrapper>

        
    </>
    )
}

export default BlogEditor