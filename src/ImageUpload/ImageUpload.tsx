import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

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
            return !imagesState[index] ? (
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={() => onImageUpdate(index)}
                {...dragProps}
              >
                Click or Drop here
              </button>
            ) : (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => removeImage(index)}>Remove</button>
                </div>
              </div>
            );
          })
        }
      </ImageUploading>
    </div>
  );
}
