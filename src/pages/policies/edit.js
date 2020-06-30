import React from 'react';
import PolicyCreateForm from './components/PolicyCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { getPolicy, updatePolicy } from '../../actions/policies';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function EditPolicy() {
  const history = useHistory();
  const { id } = useParams();

  const dispatch = useDispatch();

  const { policy, loading } = useSelector((state) => {
    if (!state.policies.details[id])
      return {
        policy: null,
        loading: state.policies.loading,
      };

    return {
      policy: {
        ...state.policies.details[id],
        permissions: state.policies.details[id].permissions.reduce(
          (obj, item) => Object.assign(obj, { [item.resource]: item.actions }),
          {},
        ),
        users: state.policies.details[id].users
          ? state.policies.details[id].users.map((item) => parseInt(item.id))
          : [],
      },
      loading: state.policies.loading,
    };
  });

  React.useEffect(() => {
    dispatch(getPolicy(id));
  }, [dispatch, id]);

  if (loading) return <Skeleton />;

  const onUpdate = (values) => {
    dispatch(updatePolicy(values)).then(() => history.push('/policies'));
  };

  return <PolicyCreateForm data={policy} onCreate={onUpdate} />;
}

export default EditPolicy;