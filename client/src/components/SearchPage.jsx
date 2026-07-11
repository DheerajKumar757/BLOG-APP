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
import UserCard from './UserCard';

const SearchPage = () => {
    const { query } = useParams();

    let [blogs, setBlog] = useState(null);
    let [users, setUsers] = useState(null);
    

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

    const fetchUsers = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", {query})
        .then(({ data }) => {
            setUsers(data.users);
        })
    }

    const resetState = () => {
        setBlog(null);
        setUsers(null);
    }

    useEffect(() => {
        resetState();
        // note that even if blogs has been set to null `blogs` state is still not null.
        // that is why `create_new_arr` is set to true so that a new array will be created
        // within `filterPaginationData`. 
        searchBlogs({create_new_arr : true});
        fetchUsers();
    }, [query]);

    const UserCardWrapper = () => {
        return (
            <>
                {
                    users == null
                    ? <Loader />
                    : users.length
                        ? users.map((user, i) => {
                            return (
                                <AnimationWrapper
                                    key={i}
                                    transition={{ duration: 1, delay: i*0.08 }}
                                >
                                    <UserCard user={user} />
                                </AnimationWrapper>
                            )
                        })
                        : <NoDataMessage message='No user found'/>
                    
                }
            </>
        )
    }

    return (
        <section className='h-cover flex justify-center gap-10'>

            <div className='w-full lg:max-w-225'>

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
                        <LoadMoreDataBtn
                            state={blogs}
                            fetchDataFun={searchBlogs}
                        />
                    </>

                    {/* user card wrapper for mobile screen */}    
                    <UserCardWrapper />

                </InPageNavigation>

            </div>

            <div className='min-w-[40%] lg:min-w-[350px] max-w-min border-l border-gray-300 pl-8 pt-3 max-md:hidden'>
                <h2 className='flex font-medium text-xl mb-8 gap-2 items-center'>
                    User related to search <i className='fi fi-rr-user'></i>
                </h2>
                {/* user card wrapper for desktop screen */}
                <UserCardWrapper />
            </div>

        </section>
    )
}

export default SearchPage