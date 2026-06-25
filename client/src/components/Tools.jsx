// importing tools from different editorJS packages
import Embed from "@editorjs/embed"
import List from "@editorjs/list"
import Image from "@editorjs/image"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker"
import InlineCode from "@editorjs/inline-code"
import { toast } from 'react-hot-toast'
import axios from 'axios'

const uploadImageByUrl = (e) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        }
        catch(err) {
            reject(err)
        }
    })

    return link.then(url => {
        return {
            success: 1,
            file: { url }
        }
    })
}

const uploadImageByFile = (img) => {
    if(img) {
        let formData = new FormData();
        formData.append('blog_banner', img);
        
        let loadingToast = toast.loading("Uploading...")
        return axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/blog-banner-url", formData)
        .then(({ data }) => {
            toast.dismiss(loadingToast)
            toast.success("Uploaded")
            return {
                success: 1,
                file: { url: data.blogBannerUrl }
            }
        })
        .catch(({ response }) => {
            console.log(response.data.message);
            toast.dismiss(loadingToast)
            toast.error("Failed to upload")
        });
    }    
}

export const tools ={
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImageByUrl,
                uploadByFile: uploadImageByFile
            }
        }
    },
    header: {
        class: Header,
        config: {
            placeholder: "Type Heading...",
            levels: [1, 2, 3],
            defaultLevel: 2
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: Marker,
    inlineCode: InlineCode
}
