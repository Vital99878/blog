import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Loader() {
  const spinStyle = { fontSize: 60, marginTop: '140px', color: 'lightgreen' };
  const antIcon = <LoadingOutlined style={spinStyle} spin />;
  return <Spin indicator={antIcon} />;
}

export default Loader;
