import { useState } from "react";
import { Button, Upload, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const UploadImage = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);

  const handleBeforeUpload = (file: File) => {
    const isImage = ["image/jpeg", "image/png"].includes(file.type);
    const isSizeValid = file.size / 1024 / 1024 < 2; // Giới hạn 2MB

    if (!isImage) {
      message.error("Chỉ được phép upload file JPG/PNG!");
      return Upload.LIST_IGNORE;
    }

    if (!isSizeValid) {
      message.error("Kích thước file không được vượt quá 2MB!");
      return Upload.LIST_IGNORE;
    }

    // Đọc file bằng FileReader để hiển thị ảnh trước khi upload
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setFileList([file]); // Lưu file vào state
    return false; // Ngăn Ant Design tự động upload file
  };

  const handleSubmit = () => {
    if (!fileList.length) {
      message.error("Vui lòng chọn một hình ảnh để upload!");
      return;
    }
    message.success("Hình ảnh đã được chọn thành công!");
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} className="w-96 mx-auto p-5 border rounded-lg shadow-lg">
      <Form.Item label="Chọn hình ảnh">
        <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
      </Form.Item>
      {previewImage && (
        <div className="flex justify-center">
          <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-md border border-gray-300" />
        </div>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full mt-4">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
}
