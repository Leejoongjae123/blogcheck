import React from 'react';
import { Select, Space } from 'antd';

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const App = () => (
  <Space wrap>
    <Select
      
      defaultValue="전체"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: '전체',
          label: '전체',
        },
        {
          value: '미남',
          label: '미남',
        },
        {
          value: '미녀',
          label: '미녀',
        }
      ]}
    />
    
    
  </Space>
);
export default App;