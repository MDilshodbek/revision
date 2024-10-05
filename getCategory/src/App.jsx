import { Button, Card, Form, Input, InputNumber, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
const { Meta } = Card;

const getCategory = () => {
  const [flowers, setFlowers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7`
      );

      const data = await response.json();

      setFlowers(data.data);
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    console.log(values);

    const shouldUpload = {
      title: values.title,
      main_image: values.main_image,
      price: values.price,
    };

    await fetch(
      "http://localhost:8080/apiflower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7"
    );
  };

  return (
    <div className="flex items-center justify-center m-auto flex-col gap-4">
      <Modal
        title="Adding new flower"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => setOpenModal(false)}
        footer={false}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Upload"
            name="main_image"
            rules={[{ required: true, message: "Please upload image" }]}
          >
            <Upload>
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button danger onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button htmlType="submit">Create</Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="absolute top-2 right-2">
        <Button onClick={() => setOpenModal(true)}>Add</Button>
      </div>
      {flowers.map(({ _id, main_image, title, short_description }) => {
        return (
          <div key={_id} className="mt-[20px]">
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={main_image} />}
            >
              <Meta title={title} description={short_description} />
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default getCategory;
