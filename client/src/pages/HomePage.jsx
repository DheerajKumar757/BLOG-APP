import { act, useEffect } from "react"
import AnimationWrapper from "../common/page-animation"
import InPageNavigation from "../components/InPageNavigation"
import axios from 'axios'
import { useState } from "react"
import Loader from "../components/Loader"
import BlogPostCard from "../components/BlogPostCard"
import MinimalBlogPost from "../components/NoBannerBlogPost"
import { activeTabRef } from "../components/InPageNavigation"
import NoDataMessage from "../components/NoDataMessage"
import { filterPaginationData } from "../common/filter-pagination-data"
import LoadMoreDataBtn from "../components/LoadMoreDataBtn"

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
        "backend",
        "react",
        "tech",
        "node", 
        "test",
        "frontend"
    ];

    const fetchLatestBlogs = ({page = 1}) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
        .then( async ({ data }) => {
            let formatedData = await filterPaginationData({
                state: blogs, // blogs state which is already present.
                data: data.blogs, // new blog data to be appended.
                page, // requeseted page number whose data is being fetched.
                countRoute: "/all-latest-blogs-count"
            })
            setBlog(formatedData);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const fetchBlogsByCategory = ({ page = 1}) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag : pageState, page })
        .then( async ({ data }) => {
            let formatedData = await filterPaginationData({
                state: blogs, // blogs state which is already present.
                data: data.blogs, // new blog data to be appended.
                page, // requeseted page number whose data is being fetched.
                countRoute: "/search-blogs-count",
                data_to_send: { tag: pageState } // data to be sent to the countRoute to get the total number of documents with specified tag in the collection. 
            })
            setBlog(formatedData);
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
        activeTabRef.current.click();
        
        if(pageState == "home") {
            fetchLatestBlogs({ page: 1});
        }
        else {
            fetchBlogsByCategory({ page: 1 });
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
                                blogs == null ? (
                                    <Loader /> 
                                ) : (
                                    blogs.results.length ? (
                                        blogs.results.map((blog, i) => {
                                            return (
                                                <AnimationWrapper
                                                    transition={{
                                                        duration: 1,
                                                        delay:i*.1
                                                    }} 
                                                    keyValue={i}>
                                                    <BlogPostCard
                                                        content={blog}
                                                        author={blog.author.personal_info}
                                                    />
                                                </AnimationWrapper>
                                            )
                                        })
                                    ) : (
                                        <NoDataMessage message="No blogs available for this category" />
                                    )
                                )
                            }
                            <LoadMoreDataBtn 
                                state={blogs}
                                fetchDataFun={(pageState == "home" ? fetchLatestBlogs : fetchBlogsByCategory)}
                            />
                        </>

                        <>
                            {
                                trendingBlogs == null ? (
                                    <Loader />
                                ) : (
                                    trendingBlogs.length ? (
                                        trendingBlogs.map((blog, i) => {
                                            return (
                                                <AnimationWrapper
                                                    transition={{
                                                        duration: 1,
                                                        delay:i*.1 
                                                    }}
                                                    keyValue={-i}
                                                >
                                                    <MinimalBlogPost
                                                        blog={blog}
                                                        index={i} 
                                                    />
                                                </AnimationWrapper>
                                            )
                                        })
                                    ) : (
                                        <NoDataMessage message="No trending blogs available" />
                                    )
                                )
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
                                trendingBlogs == null ? (
                                    <Loader /> 
                                ) : (
                                    trendingBlogs.length ? (
                                        trendingBlogs.map((blog, i) => {
                                            return (
                                                <AnimationWrapper
                                                    transition={{
                                                        duration: 1,
                                                        delay:i*.1
                                                    }}
                                                    keyValue={-i}
                                                >
                                                    <MinimalBlogPost
                                                        blog={blog}
                                                        index={i}
                                                    />
                                                </AnimationWrapper>
                                            )
                                        })
                                    ) : (
                                        <NoDataMessage message="No trending blogs available" />
                                    )
                                )
                            }
                        </div>
                    
                    </div>

                </div>                
            </section>
        </AnimationWrapper>
    )
}

export default HomePage