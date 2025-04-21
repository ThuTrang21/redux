import { ColumnType } from "antd/es/table";
import { DataType } from "./types";
import { Button } from "antd";
import { Link } from "react-router";

export const columns: ColumnType<DataType>[] = [
    {
      title: "Mã User",
      dataIndex: "userId",
      key: "userId",
      width: 150,
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 400,
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      width: 400,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex gap-2">
          <Link to={`/posts/${record.id}`}>
            <Button>Xem chi tiết</Button>
          </Link>
          <Button>Sửa</Button>
          <Button>Xóa</Button>
        </div>
      ),
      width: 200,
    },
  ];