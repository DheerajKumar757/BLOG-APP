import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import InPageNavigation from './InPageNavigation';
import Loader from './Loader';
import AnimationWrapper from '../common/page-animation';
import NoDataMessage from './NoDataMessage';
import BlogPostCard from './BlogPostCard';
import LoadMoreDataBtn from './LoadMoreDataBtn';
import { filterPaginationData } from '../common/filter-pagination-data';
import axios from 'axios';

const SearchPage = () => {
    const { query } = useParams();

    const [blogs, setBlog] = useState(null);

    const searchBlogs = ({ page = 1, create_new_arr = false } = {}) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { query, page })
        .then( async ({ data }) => {
            let formatedData = await filterPaginationData({
                state: blogs,
                data: data.blogs, 
                page, 
                countRoute: "/search-blogs-count",
                data_to_send: { query },
                create_new_arr
            })
            setBlog(formatedData);
        })
        .catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {
        searchBlogs();
    }, [query]);

    return (
        <section className='h-cover flex justify-center gap-10'>

            <div className='w-full'>
                <InPageNavigation
                    routes={[`Search Results for "${query}"`, "Accounts Matched"]}
                    defaultHidden={"Accounts Matched"}
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
                        {/* <LoadMoreDataBtn
                            state={blogs}
                            fetchDataFun={}
                        /> */}
                    </>

                </InPageNavigation>

            </div>

        </section>
    )
}

export default SearchPage