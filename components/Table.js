"use client";
import React, { useState } from "react";
import Folder from "./Folder";
import { Input, Space } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Button, Divider, Flex, Radio, Table, Tag } from "antd";

const { Search } = Input;

const columns = [
  {
    title: "폴더",
    dataIndex: "folder",
  },
  {
    title: "ID",
    dataIndex: "ID",
    render: (tags) => (
      <Link href={`/detail/${tags}`}>
        <Tag color="gray" >
          {tags}
        </Tag>
      </Link>
    ),
  },
  {
    title: "이름",
    dataIndex: "name",
  },
  {
    title: "방문자",
    dataIndex: "visitor",
  },
  {
    title: "목표",
    dataIndex: "target",
  },
  {
    title: "상태",
    dataIndex: "status",
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "red" : "green";
          if (tag === "불만족") {
            color = "volcano";
          } else {
            color = "blue";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    folder: "미남",
    ID: `kuy4835`,
    name: "영철",
    visitor: 4244,
    target: 8000,
    status: ["만족"],
    delete: "delete",
  });
}

const onSearch = (value, _e, info) => console.log(info?.source, value);

const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("large"); // default is 'middle'

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div className="flex gap-x-2 items-center">
        <Folder></Folder>
        <Search
          placeholder="블로그ID"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <Button
          type="gray"
          shape="round"
          style={{ backgroundColor: "gray" }}
          icon={<DownloadOutlined />}
          size={size}
        >
          다운로드
        </Button>
        <Button
          type="grayt"
          shape="round"
          style={{ backgroundColor: "skyblue" }}
          icon={<UploadOutlined />}
          size={size}
        >
          업로드
        </Button>
        <Button
          type="primary"
          shape="circle"
          style={{ backgroundColor: "green" }}
          icon={<PlusOutlined />}
          size={size}
        />
        <Button
          type="primary"
          shape="circle"
          style={{ backgroundColor: "red" }}
          icon={<MinusOutlined />}
          size={size}
        />
      </div>

      <div style={{}}>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
export default App;
