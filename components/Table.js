"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import Folder from "./Folder";
import { Input, Space } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  Button,
  Divider,
  Flex,
  Radio,
  Table,
  Tag,
  Form,
  Popconfirm,
} from "antd";

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
        <Tag color="gray">{tags}</Tag>
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

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const App = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      name: "Edward King 1",
      age: "32",
      address: "London, Park Lane no. 1",
    },
  ]);
  const [size, setSize] = useState("large"); // default is 'middle'
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
      editable:true
    },
    {
      title: "address",
      dataIndex: "address",
      
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

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
    <>
      <div className="flex flex-col md:flex-row gap-y-2 gap-x-2 items-center overflow-x-auto justify-center">
        <div className="flex">
          <Folder></Folder>
          <Search
            placeholder="블로그ID"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <div className="flex">
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
          {/* <Button
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
          /> */}
        </div>
      </div>
      <div>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
            backgroundColor:'skyblue'
          }}
        >
          Add a row
        </Button>
        <Table
        rowSelection={rowSelection}
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </>
  );
};
export default App;

// const App = () => {
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [size, setSize] = useState("large"); // default is 'middle'

//   const start = () => {
//     setLoading(true);
//     // ajax request after empty completing
//     setTimeout(() => {
//       setSelectedRowKeys([]);
//       setLoading(false);
//     }, 1000);
//   };
//   const onSelectChange = (newSelectedRowKeys) => {
//     console.log("selectedRowKeys changed: ", newSelectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);
//   };
//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };
//   const hasSelected = selectedRowKeys.length > 0;
//   return (
//     <>
//       <div className="flex flex-col md:flex-row gap-y-2 gap-x-2 items-center overflow-x-auto justify-center">
//         <div className="flex">
//           <Folder></Folder>
//           <Search
//             placeholder="블로그ID"
//             onSearch={onSearch}
//             style={{
//               width: 200,
//             }}
//           />
//         </div>
//         <div className="flex">
//           <Button
//             type="gray"
//             shape="round"
//             style={{ backgroundColor: "gray" }}
//             icon={<DownloadOutlined />}
//             size={size}
//           >
//             다운로드
//           </Button>
//           <Button
//             type="grayt"
//             shape="round"
//             style={{ backgroundColor: "skyblue" }}
//             icon={<UploadOutlined />}
//             size={size}
//           >
//             업로드
//           </Button>
//           <Button
//             type="primary"
//             shape="circle"
//             style={{ backgroundColor: "green" }}
//             icon={<PlusOutlined />}
//             size={size}
//           />
//           <Button
//             type="primary"
//             shape="circle"
//             style={{ backgroundColor: "red" }}
//             icon={<MinusOutlined />}
//             size={size}
//           />
//         </div>
//       </div>

//       <div style={{}}>
//         <span
//           style={{
//             marginLeft: 8,
//           }}
//         >
//           {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
//         </span>
//       </div>
//       <div className="overflow-x-auto">
//         <Table
//           rowSelection={rowSelection}
//           columns={columns}
//           dataSource={data}
//           bordered
//           pagination={{position:''}}
//         />
//       </div>
//     </>
//   );
// };
// export default App;
