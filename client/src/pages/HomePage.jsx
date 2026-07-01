import { useEffect } from "react"
import AnimationWrapper from "../common/page-animation"
import InPageNavigation from "../components/InPageNavigation"
import axios from 'axios'
import { useState } from "react"
import Loader from "../components/Loader"
import BlogPostCard from "../components/BlogPostCard"
import MinimalBlogPost from "../components/NoBannerBlogPost"

const HomePage = () => {

    let [ blogs, setBlog ] = useState(null);
    let [ trendingBlogs, setTrendingBlog ] = useState(null);

    const fetchLatestBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
        .then(({ data }) => {
            setBlog(data.blogs);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const fetchTrendingBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
        .then(({ data }) => {
            setTrendingBlog(data.blogs);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchLatestBlogs();
        fetchTrendingBlogs();
    }, [])

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full">
                    <InPageNavigation
                        routes={["home", "trending blogs"]}
                        defaultHidden={["trending blogs"]}
                    >

                        <>
                            {
                                blogs == null ? <Loader /> :
                                blogs.map((blog, i) => {
                                    return (
                                        <AnimationWrapper transition={{ duration: 1, delay:i*.1 }} keyValue={i}>
                                            <BlogPostCard content={blog} author={blog.author.personal_info} />
                                        </AnimationWrapper>
                                    )
                                })
                            }
                        </>

                        <>
                            {
                                trendingBlogs == null ? <Loader /> :
                                trendingBlogs.map((blog, i) => {
                                    return (
                                        <AnimationWrapper transition={{ duration: 1, delay:i*.1 }} keyValue={-i}>
                                            <MinimalBlogPost blog={blog} index={i} />
                                        </AnimationWrapper>
                                    )
                                })
                            }
                        </>

                    </InPageNavigation>
                </div>

                {/* filters and trending blogs */}
                <div className="min-w-[40%] lg:min-w-100 max-w-min border-l border-gray-300 pl-8 pt-3 max-md:hidden">

                    <div className="flex flex-col gap-10">
                        
                        <h2 className="font-medium text-xl mb-8">Stories from all interests</h2>

                    </div>

                    <div>
                        <h2 className="font-medium text-xl mb-8">
                            Trending <i className="fi fi-rr-arrow-trend-up"></i>
                        </h2>
                        {
                            trendingBlogs == null ? <Loader /> :
                            trendingBlogs.map((blog, i) => {
                                return (
                                    <AnimationWrapper transition={{ duration: 1, delay:i*.1 }} keyValue={-i}>
                                        <MinimalBlogPost blog={blog} index={i} />
                                    </AnimationWrapper>
                                )
                            })
                        }
                    </div>

                </div>                
            </section>
        </AnimationWrapper>
    )
}

export default HomePage