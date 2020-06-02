import React from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import GoogleDrive from '@uppy/google-drive';
import Url from '@uppy/url';
import { Dashboard, ProgressBar } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/url/dist/style.css';

function Media() {
  const uppy = React.useRef(
    Uppy({ id: 'uppy1', autoProceed: true, debug: true })
      .use(AwsS3, { companionUrl: 'http://localhost:3020' })
      .use(Url, { companionUrl: 'http://localhost:3020' })
      .use(GoogleDrive, { companionUrl: 'http://localhost:3020' }),
  );

  React.useEffect(() => {
    return () => uppy.current.close();
  }, []);

  uppy.current.on('complete', (result) => {
    console.log('Upload complete! We’ve uploaded these files:', result);
  });

  return (
    <div>
      <Dashboard
        uppy={uppy.current}
        plugins={['GoogleDrive', 'Url']}
        metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
      />

      <h2>Progress Bar</h2>
      <ProgressBar uppy={uppy.current} hideAfterFinish={false} />
    </div>
  );
}

export default Media;

/*
{
  "successful": [
    {
      "source": "Url",
      "id": "uppy-uppy/dashboard/dark/mar/2020/png-1d-1d-1d-1d-1e-image/png-23250",
      "name": "uppy-dashboard-dark-mar-2020.png",
      "extension": "png",
      "meta": {
        "name": "uppy-dashboard-dark-mar-2020.png",
        "type": "image/png",
        "acl": "public-read",
        "key": "uppy-dashboard-dark-mar-2020.png",
        "success_action_status": "201",
        "content-type": "image/png",
        "bucket": "storage.degacms.com",
        "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
        "X-Amz-Credential": "GOOG1ERMPD4B7TNH4XWO7G3RFFBEL6STFGU4PYK5JL7HYTNFEUWCWBND5WYPQ/20200528/us-east-1/s3/aws4_request",
        "X-Amz-Date": "20200528T085503Z",
        "Policy": "eyJleHBpcmF0aW9uIjoiMjAyMC0wNS0yOFQwOTowMDowM1oiLCJjb25kaXRpb25zIjpbeyJhY2wiOiJwdWJsaWMtcmVhZCJ9LHsia2V5IjoidXBweS1kYXNoYm9hcmQtZGFyay1tYXItMjAyMC5wbmcifSx7InN1Y2Nlc3NfYWN0aW9uX3N0YXR1cyI6IjIwMSJ9LHsiY29udGVudC10eXBlIjoiaW1hZ2UvcG5nIn0seyJidWNrZXQiOiJzdG9yYWdlLmRlZ2FjbXMuY29tIn0seyJYLUFtei1BbGdvcml0aG0iOiJBV1M0LUhNQUMtU0hBMjU2In0seyJYLUFtei1DcmVkZW50aWFsIjoiR09PRzFFUk1QRDRCN1ROSDRYV083RzNSRkZCRUw2U1RGR1U0UFlLNUpMN0hZVE5GRVVXQ1dCTkQ1V1lQUS8yMDIwMDUyOC91cy1lYXN0LTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMDA1MjhUMDg1NTAzWiJ9XX0=",
        "X-Amz-Signature": "dc86f3d22b1d0695d52a0f8a39c391795e9363d03416d2f89bd02f751a09af25"
      },
      "type": "image/png",
      "data": {
        "size": 23250
      },
      "progress": {
        "uploadStarted": 1590656103145,
        "uploadComplete": true,
        "percentage": 100,
        "bytesUploaded": 23250,
        "bytesTotal": 23250
      },
      "size": 23250,
      "isRemote": true,
      "remote": {
        "companionUrl": "http://localhost:3020",
        "url": "http://localhost:3020/url/get",
        "body": {
          "fileId": "https://uppy.io/images/uppy-dashboard-dark-mar-2020.png",
          "url": "https://uppy.io/images/uppy-dashboard-dark-mar-2020.png"
        },
        "providerOptions": {
          "companionUrl": "http://localhost:3020"
        }
      },
      "xhrUpload": {
        "method": "post",
        "formData": true,
        "endpoint": "https://storage.googleapis.com/storage.degacms.com",
        "metaFields": [
          "acl",
          "key",
          "success_action_status",
          "content-type",
          "bucket",
          "X-Amz-Algorithm",
          "X-Amz-Credential",
          "X-Amz-Date",
          "Policy",
          "X-Amz-Signature"
        ]
      },
      "response": {
        "status": 201,
        "body": {
          "location": "http://storage.googleapis.com/storage.degacms.com/uppy-dashboard-dark-mar-2020.png",
          "bucket": "storage.degacms.com",
          "key": "uppy-dashboard-dark-mar-2020.png",
          "etag": "\"77644a88d22fa2cf4c2c9f130420351d\""
        },
        "uploadURL": "http://storage.googleapis.com/storage.degacms.com/uppy-dashboard-dark-mar-2020.png"
      },
      "uploadURL": "http://storage.googleapis.com/storage.degacms.com/uppy-dashboard-dark-mar-2020.png",
      "isPaused": false
    }
  ],
  "failed": [],
  "uploadID": "ckaqjko9z00023h5p1jy3nz1r"
}

*/
