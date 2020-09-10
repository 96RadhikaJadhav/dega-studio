import React from 'react';
import { Popconfirm, Button, Table, Select, Form, Space, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getClaims, deleteClaim } from '../../../actions/claims';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Selector from '../../../components/Selector';
import deepEqual from 'deep-equal';

function ClaimList() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState();
  const [form] = Form.useForm();
  const { Option } = Select;

  const { claims, total, loading } = useSelector((state) => {
    let query = {
      page,
    };
    if (filters) {
      query = { ...query, ...filters };
    }
    const node = state.claims.req.find((item) => {
      return deepEqual(item.query, query);
    });

    if (node) {
      const list = node.data.map((element) => {
        let claim = state.claims.details[element];
        claim.claimant = state.claimants.details[claim.claimant_id].name;
        claim.rating = state.ratings.details[claim.rating_id].name;
        return claim;
      });
      return {
        claims: list,
        total: node.total,
        loading: state.claims.loading,
      };
    }
    return { claims: [], total: 0, loading: state.claims.loading };
  });

  React.useEffect(() => {
    fetchClaims();
  }, [page, filters]);

  const fetchClaims = () => {
    dispatch(getClaims({ page: page, ...filters }));
  };

  const onSave = (values) => {
    let filterValue = {
      claimant: values.claimants,
      rating: values.ratings,
      sort_by: values.sort_by,
      q: values.q,
    };

    setFilters(filterValue);
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', width: '20%' },
    { title: 'Claimant', dataIndex: 'claimant', key: 'claimant', width: '20%' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating', width: '20%' },
    {
      title: 'Claim Date',
      dataIndex: 'claim_date',
      width: '20%',
      render: (_, record) => {
        return (
          <span title={record.claim_date}>
            {record.claim_date ? moment(record.claim_date).format('MMMM Do YYYY') : null}
          </span>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <span>
            <Link
              className="ant-dropdown-link"
              style={{
                marginRight: 8,
              }}
              to={`/claims/${record.id}/edit`}
            >
              <Button>Edit</Button>
            </Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => dispatch(deleteClaim(record.id)).then(() => fetchClaims())}
            >
              <Link to="" className="ant-dropdown-link">
                <Button>Delete</Button>
              </Link>
            </Popconfirm>
          </span>
        );
      },
      width: '20%',
    },
  ];

  return (
    <Space direction="vertical">
      <Form
        initialValues={filters}
        form={form}
        name="filters"
        layout="inline"
        onFinish={(values) => onSave(values)}
        style={{ maxWidth: '100%' }}
      >
        <Form.Item name="q" label="Query" style={{ width: '25%' }}>
          <Input placeholder="search post" />
        </Form.Item>
        <Form.Item name="sort" label="sort" style={{ width: '15%' }}>
          <Select>
            <Option value="desc">Latest</Option>
            <Option value="asc">Old</Option>
          </Select>
        </Form.Item>
        <Form.Item name="claimants" label="claimant" style={{ width: '15%' }}>
          <Selector mode="multiple" action="Claimants" />
        </Form.Item>
        <Form.Item name="ratings" label="ratings" style={{ width: '15%' }}>
          <Selector mode="multiple" action="Ratings" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table
        bordered
        columns={columns}
        dataSource={claims}
        loading={loading}
        rowKey={'id'}
        pagination={{
          total: total,
          current: page,
          pageSize: 5,
          onChange: (pageNumber, pageSize) => setPage(pageNumber),
        }}
      />
    </Space>
  );
}

export default ClaimList;
