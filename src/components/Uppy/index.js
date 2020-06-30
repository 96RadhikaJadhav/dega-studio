import React from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import GoogleDrive from '@uppy/google-drive';
import Url from '@uppy/url';
import { Dashboard } from '@uppy/react';
import { useSelector } from 'react-redux';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/url/dist/style.css';

function UppyUploader({ onUpload }) {
  const space_slug = useSelector((state) => state.spaces.details[state.spaces.selected].slug);

  const uppy = Uppy({
    id: 'uppy-media',
    meta: { type: 'avatar' },
    allowedFileTypes: ['image/*'],
    autoProceed: false,
    onBeforeUpload: (files) => {
      const updatedFiles = {};
      Object.keys(files).forEach((fileID) => {
        updatedFiles[fileID] = {
          ...files[fileID],
          meta: {
            ...files[fileID].meta,
            name:
              'uppy/' +
              space_slug +
              '/' +
              new Date().getFullYear() +
              '/' +
              new Date().getMonth() +
              '/' +
              Date.now().toString() +
              '_' +
              files[fileID].meta.name,
          },
        };
      });
      return updatedFiles;
    },
  })
    .use(AwsS3, { companionUrl: 'http://localhost:3020' })
    .use(Url, { companionUrl: 'http://localhost:3020' })
    .use(GoogleDrive, { companionUrl: 'http://localhost:3020' });

  uppy.on('complete', (result) => {
    const successful = result.successful[0];
    const upload = {};

    upload['alt_text'] = successful.meta.caption;
    upload['caption'] = successful.meta.caption;
    upload['description'] = successful.meta.caption;
    upload['dimensions'] = '100x100';
    upload['file_size'] = successful.size;
    upload['name'] = successful.meta.name;
    upload['slug'] = successful.meta.caption;
    upload['title'] = successful.meta.caption;
    upload['type'] = successful.meta.type;
    upload['url'] = successful.uploadURL;

    onUpload(upload);
  });
  return (
    <Dashboard
      uppy={uppy}
      plugins={['GoogleDrive', 'Url']}
      metaFields={[
        { id: 'name', name: 'Name', placeholder: 'file name' },
        { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' },
      ]}
    />
  );
}

export default UppyUploader;