import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Spin, Collapse, Button, List, Popconfirm } from 'antd';
import deepEqual from 'deep-equal';
import { addPost, deletePost, getPosts } from '../../actions/posts';
import { Link, useHistory } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function Template() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { Meta } = Card;
  const { Panel } = Collapse;
  const page = 1;
  const [show, setShow] = React.useState(false);
  const { posts, loading } = useSelector((state) => {
    const node = state.posts.req.find((item) => {
      let query = {
        page,
        status: 'template',
      };

      return deepEqual(item.query, query);
    });

    if (node)
      return {
        posts: node.data.map((element) => state.posts.details[element]),
        total: node.total,
        loading: state.posts.loading,
      };
    return { posts: [], loading: state.posts.loading };
  });

  React.useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const fetchTemplates = () => {
    dispatch(getPosts({ page: page, status: 'template' }));
  };

  const genExtra = () => (
    <div onClick={(e) => e.stopPropagation()}>
      <Button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? 'show less' : 'show more'}
      </Button>
    </div>
  );

  if (loading) return <Spin style={{ marginLeft: '50%' }} />;

  if (posts.length === 0) return null;

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Templates" key="1" extra={genExtra()}>
        <List
          grid={{ gutter: 16, column: 5 }}
          dataSource={show ? posts : posts.slice(0, 5)}
          renderItem={(item) => (
            <List.Item>
              <Card
                cover={
                  <img
                    style={{ cursor: 'pointer' }}
                    alt="example"
                    src="https://www.wesa.fm/sites/wesa/files/styles/medium/public/201610/Fact-CheckGraphics-Template-08.png"
                    height="230"
                    onClick={() => {
                      dispatch(addPost({ ...item, status: null })).then((res) =>
                        history.push(`/posts/${res.id}/edit`),
                      );
                    }}
                  />
                }
                actions={[
                  <Link to={`/posts/${item.id}/edit`}>
                    <EditOutlined key="edit" />
                  </Link>,
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() =>
                      dispatch(deletePost(item.id))
                        .then(() => {
                          fetchTemplates();
                        })
                        .then(() => dispatch(getPosts({ page: 1, limit: 5 })))
                    }
                  >
                    <DeleteOutlined key="delete" />
                  </Popconfirm>,
                ]}
              >
                <Meta description={item.title} />
              </Card>
            </List.Item>
          )}
        />
      </Panel>
    </Collapse>
  );
}

export default Template;
