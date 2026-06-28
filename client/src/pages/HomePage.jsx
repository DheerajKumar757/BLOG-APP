import AnimationWrapper from "../common/page-animation"
import InPageNavigation from "../components/InPageNavigation"

const HomePage = () => {
    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full">
                    <p>Latest Blogs</p>
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