import { Dots, Feeling, Photo } from "../../svg";

import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
export default function AddToYourPost({ setShowPrev }) {
  return (
    <div className="addtoyourpost">
      <div className="addto_text"
        onClick={() => {
          setShowPrev(true);
        }}
        >
          <span>Add Images </span>
      
        {/* <Photo color="#45bd62" /> */}
        <PhotoSizeSelectActualIcon/>
      </div>
      {/* <div className="post_header_right hover1">
        <i className="tag_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <Feeling color="#f7b928" />
      </div>
      <div className="post_header_right hover1">
        <i className="maps_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <i className="microphone_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <Dots color="#65676b" />
      </div> */}
    </div>
  );
}
