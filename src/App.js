import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./App.css";
import "./sigCanvas.css";
import { Breadcrumb, Button, Form, Input, Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  DesktopOutlined,
} from '@ant-design/icons';

function App() {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  const { Header, Content, Footer, Sider } = Layout;

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  }

  useEffect(() => {
    console.log("imageURL", imageURL);
  }, [imageURL])

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [getItem('Quản lí chữ ký', '1', <DesktopOutlined/>)]

  const [collapsed, setCollapsed] = useState(false);

  const colorBgContainer = "#FFFFFF"
    

  return (
    <div className="App">
      <Layout >
      <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ margin: 16}}></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className='header-layout'>
          <MenuFoldOutlined style={{marginTop:'10px'}} onClick={() => setCollapsed(!collapsed)}/>
          </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Form
            layout="vertical"
            >
              <Form.Item
                label='First Name and Last Name'>
                <Input></Input>
              </Form.Item>
              <Form.Item
                label='Organization'>
                <Input></Input>
              </Form.Item>
              <Form.Item
                label='Locality'>
                <Input></Input>
              </Form.Item>
              <Form.Item
                label='Province'>
                <Input></Input>
              </Form.Item>
              <Form.Item
                label='Unit'>
                <Input></Input>
              </Form.Item>
              <Form.Item
                label='Password'>
                <Input.Password></Input.Password>
              </Form.Item>
              <Button type="submit" className="btn-submit"><span style={{margin:"auto"}}>Submit</span></Button>
            </Form>
          <div className="layout-title">Quản lí chữ ký số </div>
            <SignaturePad
                     ref={sigCanvas}
                    canvasProps={{
                      className: "signatureCanvas"
                    }}
                  />
                  <button className="save-btn" onClick={save}>Lưu chữ ký</button>
                  <button className="clear-btn" onClick={clear}>Vẽ lại</button>
            {imageURL ? (
              <img
                className="signature-img"
                src={imageURL}
                alt="my signature"
                style={{
                  display: "block",
                  margin: "0 auto",
                  border: "1px solid black",
                  width: "150px"
                }}
              />
            ) : null}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by ...</Footer>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
