import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import "./image.css"

export default function ImageUpload() {
  const [images, setImages] = useState(Array(9).fill(null));
  const [imagesState, setImagesState] = useState(Array(9).fill(false)); // false if there is no image, true if there is

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
    let newImagesState = [];
    for (var i in imageList) {
      newImagesState.push(imageList[i] !== null);
    }
    setImagesState(newImagesState);
  };

  const removeImage = (index: number) => {
    let newImagesState = [...imagesState];
    newImagesState[index] = false;
    setImagesState(newImagesState);
    let newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const imageCoords = [[182, 1125], [158, 1203],[277, 1230],[257, 1111],[338, 1112],[349, 1158],[342, 1203],[398, 1210],[403, 1120]]
  const imageSizes = [[29, 25], [33, 55],[24, 20],[64.5, 47],[19, 24],[20, 24],[48, 24],[22, 24],[63, 46]]

  
  return (
    <div className="image-upload">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={10}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) =>
          imageList.map((image, index) => {
            const left = `calc(calc(50vw + ${imageCoords[index][1]}px) - 800px)`
            return !imagesState[index] ? (
              <button
                className="image-button"
                style={
                  isDragging ? 
                  { color: "red",
                    top: imageCoords[index][0],
                    left: left,
                    width: imageSizes[index][0],
                    height: imageSizes[index][1],
                    borderRadius: index === 8 ? '60%': 0
                  } : 
                  {top: imageCoords[index][0],
                   left: left,
                   width: imageSizes[index][0],
                   height: imageSizes[index][1],
                   borderRadius: index === 8 ? '60%': 0
                  }
                }
                onClick={() => onImageUpdate(index)}
                {...dragProps}
              >
              </button>
            ) : (
              <div key={index} className="image-item"
                style={
                  { 
                    top: imageCoords[index][0],
                    left: left,
                    width: imageSizes[index][0],
                    height: imageSizes[index][1],
                    borderRadius: index === 8 ? '60%': 0,
                    overflow: index === 8 ? "hidden" : "inherit"
                  }}
              >
                <img className="image" src={image.dataURL} alt=""/>
                {/* <div className="image-item__btn-wrapper"> */}
                <button className="update-image" style={
                  { 
                    width: imageSizes[index][0],
                    height: imageSizes[index][1],
                    // borderRadius: index === 8 ? '60%': 0
                  }}
                
                onClick={() => onImageUpdate(index)}></button>
                <button  className="remove-image" onClick={() => removeImage(index)}>x</button>
                {/* </div> */}
              </div>
            );
          })
        }
      </ImageUploading>
    </div>
  );
}
