import { Button, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { INotes } from "./interface/note";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

function ListPage() {
  const queryClince = useQueryClient()
const { data, } = useQuery<INotes[]>({
    queryKey: ["getAllProduct"],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/notes')
      return res.data;
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async(id:number)=>{
   await axios.delete(`http://localhost:3000/notes/${id}`)
    },
    onSuccess : ()=>{
    queryClince.invalidateQueries({queryKey:["getAllProduct"]})
    }
  })
      const columns : ColumnsType<INotes>=[
      {title : "name", dataIndex : "title"},
      {title : "content", dataIndex : "content"},
      {title : "priority", dataIndex : "priority"},
      {title : "duration", dataIndex : "duration"},
      {title : "action",
      render : (_, record)=>(
        <div>
          <Link to ={`/edit/${record.id}`}>
          <Button
          type="primary"
          className="mr-3"
          >sửa</Button>
          </Link>
        <Popconfirm
        title = "xóa"
        description = "bạn chắc chắn muốn xóa chứ"
        onConfirm={()=>deleteMutation.mutate(record.id)}
        okText = "Xóa"
        cancelText = "Hủy"
        >
          <Button
          danger
      
          >
   xóa
          </Button>
        </Popconfirm>
        </div>
      )
    
      }
    ]

  return (

    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default ListPage;
