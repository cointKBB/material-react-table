import { useEffect, useState } from 'react';
import axios from 'axios';
import { CustomTable } from '../components/CustomTable';
import { MRT_ColumnDef } from 'material-react-table';

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

export default function SamplePage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 백엔드에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      // 임시 데이터
      const mockData: User[] = [
        { id: 1, name: '홍길동', email: 'hong@test.com', company: '테스트회사' },
        { id: 2, name: '김철수', email: 'kim@test.com', company: '예시회사' },
      ];
      setData(mockData);
      setLoading(false);
      // 실제 백엔드 연결 시 아래 코드 사용
      // const res = await axios.get<User[]>('/api/users');
      // setData(res.data);
      // setLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  const columns: MRT_ColumnDef<User>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: '이름' },
    { accessorKey: 'email', header: '이메일' },
    { accessorKey: 'company', header: '회사' },
  ];

  if (loading) return <div>로딩 중...</div>;

  return <CustomTable data={data} columns={columns} />;
}
