import React, { createContext, useContext, useState } from 'react'
import { UserContext } from '../App'
import { Navigate } from 'react-router-dom'
import BlogEditor from '../components/BlogEditor';
import PublishForm from '../components/PublishForm';

const blogStructure = {
  title : '',
  banner : '',
  conent : [],
  tags : [],
  des : "",
  author : { personal_info : {} }
}

export const EditorContext = createContext({ });

const Editor = () => {

  // when this Editor will get render the `blog` will be set to its default `blogStructure`
  const [ blog, setBlog ] = useState(blogStructure);

  const [ editorState, setEditorState ] = useState("editor");
  const [ textEditor, setTextEditor ] = useState({ isReady: false })

  let { userAuth: { access_token } }  = useContext(UserContext)

  return (
    <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}>
      {
        access_token === null ? <Navigate to="/signin"/>
        : editorState == "editor" ? <BlogEditor /> : <PublishForm />
      }
    </EditorContext.Provider>
  )
}

export default Editor