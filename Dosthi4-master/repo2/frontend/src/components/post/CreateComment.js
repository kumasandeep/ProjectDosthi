import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { comment } from "../../functions/post";
import SendIcon from '@mui/icons-material/Send';
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";
import CancelIcon from '@mui/icons-material/Cancel';
import {ClockLoader} from "react-spinners"
import Tooltip from '@mui/material/Tooltip';
import Comments from "./Comments";


export default function CreateComment({ user, postId ,setComments,setCount}) {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [cursor, setCursor] = useState();
  const [loading,setLoading] = useState(false)


  const textRef = useRef(null);
  useEffect(() => {
    textRef.current.selectionEnd = cursor;
  }, [cursor]);
  const imgInput = useRef(null);

// emoji handler
  const handleEmoji = ( { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursor(start.length + emoji.length);
  };

// comment Image handler 
  const handleImage = (e) => {
    let file = e.target.files[0];
    // if (
    //   file.type !== "image/jpeg" &&
    //   file.type !== "image/png" &&
    //   file.type !== "image/webp" &&
    //   file.type !== "image/gif"
    // ) {
    //   setError(`${file.name} format is not supported.`);
    //   return;
    // } else if (file.size > 1024 * 1024 * 5) {
    //   setError(`${file.name} is too large max 5mb allowed.`);
    //   return;
    // }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };


// total comment handler including img(emoji,image),text,em
  const handleComment = async (e) => {
    // if (e.key === "Enter") {
    //   console.log("clickd enter")
      if (commentImage !== "") {
        setLoading(true);

        const img = dataURItoBlob(commentImage)
        const path = `${user.username}/post_images/${postId}`;
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);
        const imgComment = await uploadImages(formData, path, user.token);
        console.log(imgComment);
        console.log(imgComment[0]);

        const newComment = await comment(postId, text, imgComment[0].url, user.token)

        // setComments(newComment)
        setCount((prev)=>++prev)
        setLoading(false);
        setText("")
        setCommentImage("")
        console.log(newComment)
      } else {
        setLoading(true)

        const newComment = await comment(postId, text, "", user.token)
        // setComments(newComment)
        setCount((prev)=>++prev)
        setLoading(false);
        setText("")
        setCommentImage("")
        console.log(newComment)
      }
    // }
  };
  const handleCommentCancel = () => {
    setText("")
    setCommentImage("")
  }


  return (
    <div className="create_comment_wrap">
      
      <div className="create_comment_1">
        <img src={user?.picture} alt="" />
        <div className="create_comment_1_comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImage}
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
            // onKeyUp={handleComment}
          />

          <ClockLoader color="black"  size={20} loading={loading}/>


        </div>
      </div>
        <div className="create_comment_2">
          
          <div className="create_comment_2_left">
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon" ></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon" ></i>
          </div>
        </div>
        <div className="create_comment_2_right">

            {/* <span className="hover2">comment</span> */}
            <div className="comment_circle_icon hover2" onClick={handleCommentCancel} >
            <Tooltip title="cancel">
            <CancelIcon  fontSize="small" />
            </Tooltip>

            </div>

          <div className="comment_circle_icon hover2" onClick={handleComment} >
            <Tooltip title="comment">
            <SendIcon  fontSize="small" />
            </Tooltip>
            </div>

          </div>
        
          {/* <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div> */}
          {/* <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div> */}
      </div>
      
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
      
    </div>
  );
}
