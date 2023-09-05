import { Layout } from "antd";
import { Inter } from "next/font/google";
import React from "react";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout>
    <Header style={headerStyle}>Header</Header>
    <Layout hasSider>
      <Sider style={siderStyle}>Sider</Sider>
      <Content style={contentStyle}>Content</Content>
    </Layout>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>
);

export default AdminLayout;
