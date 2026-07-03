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
    let [ pageState, setPageState ] = useState("home");

    let categories = [
        "programming",
        "technology",
        "gaming",
        "sports",
        "entertainment",
        "politics",
        "science",
        "health",
        "travel", 
        "food"
    ];

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

    const loadBlogByCategory = (e) => {
        let category = e.target.innerText.toLowerCase(); // returns the category name of button clicked

        setBlog(null); // reset the blogs state to null to show loader while fetching new data

        if(pageState == category) {
            setPageState("home");
            return;
        }

        setPageState(category);
    }

    useEffect(() => {
        if(pageState == "home") {
            fetchLatestBlogs();
        }
        if(!trendingBlogs) {
            fetchTrendingBlogs();
        }
    }, [pageState])

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full lg:max-w-225">
                    <InPageNavigation
                        routes={[pageState, "trending blogs"]}
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
                        
                        <div>
                            <h2 className="font-medium text-xl mb-8">Stories from all interests</h2>

                            <div className="flex gap-3 flex-wrap">
                                {
                                    categories.map((category, i) => {
                                        return (
                                            <button 
                                                onClick={loadBlogByCategory} 
                                                className={"tag " + (pageState == category ? " bg-black text-white " : " ")} 
                                                key={i}
                                            >
                                                { category }
                                            </button>
                                        )
                                    })
                                }
                            </div>
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

                </div>                
            </section>
        </AnimationWrapper>
    )
}

export default HomePage