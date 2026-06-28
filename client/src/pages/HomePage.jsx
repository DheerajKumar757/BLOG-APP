import AnimationWrapper from "../common/page-animation"
import InPageNavigation from "../components/InPageNavigation"

const HomePage = () => {
    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full">
                    <InPageNavigation
                        routes={["home", "trending blogs"]}
                        defaultHidden={["trending blogs"]}
                    >

                        <h1>Latest Blogs Here</h1>

                        <h1>Trending Blogs Here</h1>

                    </InPageNavigation>
                </div>

                {/* filters and trending blogs */}
                <div>
                    <p>Filters and trending blogs</p>
                </div>                
            </section>
        </AnimationWrapper>
    )
}

export default HomePage