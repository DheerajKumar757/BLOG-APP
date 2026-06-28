import React, { useEffect, useRef, useState } from 'react'

const InPageNavigation = ({ routes, defaultHidden = [], defaultActiveIndex = 0, children }) => {

  let activeTabLineRef = useRef();
  let activeTabRef = useRef();

  let [ inPageNavIndex, setInPageNavIndex ] = useState(defaultActiveIndex);

  const changePageState = (btn, i) => {

    let { offsetWidth, offsetLeft } = btn; // button width and its left position is destructured

    activeTabLineRef.current.style.width = offsetWidth + "px"; // width of hr is set same as active button
    activeTabLineRef.current.style.left = offsetLeft + "px"; // left postion of hr is same as left position of button

    setInPageNavIndex(i);
  }

  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex)
  }, [])

  return (
    <>
      <div className='relative mb-8 bg-white border-b border-gray-200 flex flex-nowrap overflow-x-auto'>
        {
          routes.map((route, i) => {
            return (
              // key helps in differentiationg the button
              <button 
                ref={ i == defaultActiveIndex ? activeTabRef : null }
                key={i} 
                className={
                  'p-4 px-5 capitalize ' + 
                  ( inPageNavIndex == i ? "text-black " : "text-gray-700 ") +
                  ( defaultHidden.includes(route) ? "md:hidden" : " ")
                }
                onClick={(e) => { changePageState(e.target, i) }}
              >
                {route}
              </button>
            )
          })
        }

        <hr ref={activeTabLineRef} className='absolute  bottom-0 duration-300' />

      </div>

      { children }

    </>
  )
}

export default InPageNavigation