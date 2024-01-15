import Icons from "./Icons";
import { API_URL } from "@/api";
import { Modal, Image, Upload, UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/lib/upload";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function ImageUpload({
  uploadUrl = `${API_URL}/upload`,
  multiple,
  maxCount = 5,
  defaultImages,
  onUploadSuccess,
  onUploadError,
  onChangeFileList,
}: {
  multiple?: boolean;
  maxCount?: number;
  uploadUrl?: string;
  defaultImages?: UploadFile[];
  onUploadSuccess?: (url: string) => void;
  onUploadError?: () => void;
  onChangeFileList?: (fileList: UploadFile[]) => void;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ event, file, fileList: newFileList }) => {
    if (onUploadSuccess && newFileList[0]?.response) {
      onUploadSuccess(newFileList[0].response.file_url);
    }
    setFileList(newFileList);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const uploadButton = (
    <div className="flex flex-col items-center justify-center">
      <Icons.Plus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (defaultImages) {
      setFileList(defaultImages);
    }
  }, [defaultImages]);

  // useEffect(() => {
  //   onChangeFileList && onChangeFileList(fileList);
  // }, [fileList, onChangeFileList]);

  return (
    <div>
      <Upload
        maxCount={maxCount}
        multiple={multiple}
        action={uploadUrl}
        headers={{
          Authorization: `Bearer ${getCookie("token")}`,
        }}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <Image alt="example" style={{ width: "100%" }} src={previewImage} preview={false} />
      </Modal>
    </div>
  );
}

export default ImageUpload;
